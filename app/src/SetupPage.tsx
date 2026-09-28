import { useState } from 'react';
import { encodeRawTokenType, rawTokenType } from '@midnight-ntwrk/compact-runtime';
import { deployContract, findDeployedContract } from '@midnight-ntwrk/midnight-js-contracts';
import { CompiledContract } from '@midnight-ntwrk/midnight-js-protocol/compact-js';
import { FetchZkConfigProvider } from '@midnight-ntwrk/midnight-js-fetch-zk-config-provider';
import { httpClientProofProvider } from '@midnight-ntwrk/midnight-js-http-client-proof-provider';
import * as Tkrw from '../../contract/src/managed/tkrw/contract/index.js';
import { CompiledFaceValue, createPrivateState, pureCircuits } from '../../contract/src/index';
import { DEPLOYMENT, ownDeployment, saveDeployment } from './deployment';
import { connectLace, type FanContract } from './lace';
import { toHex } from './gatepass';
import { useI18n } from './i18n';
import { noWalletDevice } from './passstore';

const fromHex = (h: string) => Uint8Array.from(h.match(/.{2}/g) ?? [], (b) => parseInt(b, 16));
const pad32 = (s: string) => {
  const o = new Uint8Array(32);
  o.set(new TextEncoder().encode(s));
  return o;
};

type Admin = { roleSecret: string; fanSecret: string; seed: number; salt: string; beaconRound: number };
const loadAdmin = (): Admin => {
  try {
    const a = JSON.parse(localStorage.getItem('fv-admin') ?? 'null');
    if (a) return a;
  } catch {
    /* fresh */
  }
  const a: Admin = {
    roleSecret: toHex(crypto.getRandomValues(new Uint8Array(32))),
    fanSecret: toHex(crypto.getRandomValues(new Uint8Array(32))),
    seed: crypto.getRandomValues(new Uint32Array(1))[0],
    salt: toHex(crypto.getRandomValues(new Uint8Array(32))),
    beaconRound: 0,
  };
  localStorage.setItem('fv-admin', JSON.stringify(a));
  return a;
};
const saveAdmin = (a: Admin) => localStorage.setItem('fv-admin', JSON.stringify(a));

// drand quicknet: a public randomness beacon, one value every 3 seconds.
const DRAND = 'https://api.drand.sh/52db9ba70e0cc0f6eaf7803dd07447a1f5477735fd3f661792ba94600c84e971';

export function SetupPage() {
  const { lang } = useI18n();
  const L = (en: string, ko: string) => (lang === 'ko' ? ko : en);
  const [admin, setAdmin] = useState(loadAdmin);
  const [lace, setLace] = useState<Awaited<ReturnType<typeof connectLace>> | null>(null);
  const [busy, setBusy] = useState(false);
  const [log, setLog] = useState<string[]>([]);
  const [codes, setCodes] = useState('');
  const [, force] = useState(0);
  const say = (m: string) => setLog((l) => [`${new Date().toLocaleTimeString()} ${m}`, ...l]);
  const state = () => createPrivateState(fromHex(admin.roleSecret), fromHex(admin.fanSecret));
  // Only a box office opened from this browser can be run here: the published one's keys are not ours.
  const mine = ownDeployment();

  const run = async (label: string, f: () => Promise<unknown>) => {
    setBusy(true);
    say(`${label}…`);
    try {
      await f();
      say(`✓ ${label}`);
    } catch (e) {
      console.error(label, e);
      say(`✖ ${label}: ${(e as Error).message.slice(0, 160)}`);
    } finally {
      setBusy(false);
      force((n) => n + 1);
    }
  };

  const fv = async () =>
    (await findDeployedContract(lace!.providers as never, {
      contractAddress: mine.contract,
      compiledContract: CompiledFaceValue,
      privateStateId: 'organizer',
      initialPrivateState: state(),
    } as never)) as unknown as FanContract;

  const tkrwProviders = () => {
    const zk = new FetchZkConfigProvider<string>(new URL('tkrw', location.href).href, fetch.bind(window));
    return { ...lace!.providers, zkConfigProvider: zk, proofProvider: httpClientProofProvider(lace!.proverServerUri!, zk) };
  };
  const compiledTkrw = CompiledContract.make<Tkrw.Contract<undefined>>('Tkrw', Tkrw.Contract<undefined>).pipe(
    CompiledContract.withVacantWitnesses,
    CompiledContract.withCompiledFileAssets('./managed/tkrw'),
  );

  const steps: [string, boolean, () => Promise<unknown>][] = [
    [L('Connect Lace (Preprod)', 'Lace 연결 (Preprod)'), !!lace, async () => setLace(await connectLace('preprod'))],
    [
      L('Open the ticket currency', '티켓 결제 통화 개설'),
      !!mine.tkrwContract,
      async () => {
        const d = (await deployContract(tkrwProviders() as never, { compiledContract: compiledTkrw } as never)) as unknown as {
          deployTxData: { public: { contractAddress: string } };
        };
        saveDeployment({ network: 'preprod', tkrwContract: d.deployTxData.public.contractAddress, contract: '', showId: '' });
      },
    ],
    [
      L('Open the box office', '매표소 열기'),
      !!mine.contract,
      async () => {
        const color = encodeRawTokenType(rawTokenType(pad32('facevalue:tKRW'), mine.tkrwContract as never));
        const d = (await deployContract(lace!.providers as never, {
          compiledContract: CompiledFaceValue,
          args: [pureCircuits.rolePk(fromHex(admin.roleSecret)), color],
          privateStateId: 'organizer',
          initialPrivateState: state(),
        } as never)) as unknown as { deployTxData: { public: { contractAddress: string } } };
        saveDeployment({ contract: d.deployTxData.public.contractAddress, showId: '' });
      },
    ],
    [
      L('Announce the show (draw sealed)', '공연 발표 (추첨 봉인)'),
      !!mine.showId,
      async () => {
        const latest = await (await fetch(`${DRAND}/public/latest`)).json();
        const beaconRound = Number(latest.round) + 1200; // about an hour ahead
        const showId = crypto.getRandomValues(new Uint8Array(32));
        const revealBy = BigInt(Math.floor(Date.now() / 1000) + 7 * 86400);
        await (await fv()).callTx.createShow(
          showId,
          BigInt(DEPLOYMENT.faceValue),
          100n,
          2n,
          pureCircuits.seedCommitment(BigInt(admin.seed), fromHex(admin.salt)),
          BigInt(beaconRound),
          revealBy,
        );
        const a = { ...admin, beaconRound };
        saveAdmin(a);
        setAdmin(a);
        saveDeployment({ showId: toHex(showId) });
      },
    ],
  ];

  const enroll = () =>
    run(L('Verify fans', '팬 인증'), async () => {
      const leaves = codes
        .split(/\s+/)
        .map((c) => c.trim().toLowerCase())
        .filter((c) => /^[0-9a-f]{64}$/.test(c));
      if (!leaves.length) throw new Error(L('Paste at least one fan code', '팬 코드를 하나 이상 붙여 넣으세요'));
      const c = await fv();
      for (let i = 0; i < leaves.length; i += 4) {
        const batch = leaves.slice(i, i + 4).map(fromHex);
        while (batch.length < 4) batch.push(new Uint8Array(32));
        await c.callTx.enrollBatch(batch);
      }
      setCodes('');
    });

  const advance = (label: string) => run(label, async () => (await fv()).callTx.advance(fromHex(mine.showId!)));
  const reveal = () =>
    run(L('Reveal the draw', '추첨 공개'), async () => {
      const r = await fetch(`${DRAND}/public/${admin.beaconRound}`);
      if (!r.ok) throw new Error(L('The beacon round is not out yet. Try again soon.', '비콘 값이 아직 나오지 않았습니다. 잠시 후 다시 시도하세요.'));
      const beacon = parseInt((await r.json()).randomness.slice(0, 8), 16);
      await (await fv()).callTx.revealDraw(fromHex(mine.showId!), BigInt(admin.seed), fromHex(admin.salt), BigInt(beacon));
    });

  const ready = !!mine.showId && !!lace;
  return (
    <main className="page">
      <h1 className="page-title">{L('Open the box office', '매표소 열기')}</h1>
      <p className="lede">{L('For organizers. Each step asks Lace to approve.', '주최자용. 단계마다 Lace 승인이 필요합니다.')}</p>
      {noWalletDevice() && (
        <p className="pill">{L('Open this page on a computer with the Lace wallet.', 'Lace 지갑이 있는 컴퓨터에서 이 페이지를 여세요.')}</p>
      )}

      {steps.map(([label, done, f], i) => (
        <section className="fan-step" key={i}>
          <h3>
            <span className="dot">{done ? '✓' : i + 1}</span>
            {label}
          </h3>
          {!done && (
            <button className="btn" disabled={busy || (i > 0 && !steps[i - 1][1])} onClick={() => run(label, f)}>
              {L('Go', '실행')}
            </button>
          )}
        </section>
      ))}

      {ready && (
        <>
          <section className="fan-step">
            <h3>
              <span className="dot">5</span>
              {L('Verify fans', '팬 인증')}
            </h3>
            <p className="muted">{L('Paste fan codes from the fan page, one per line.', '팬 페이지의 팬 코드를 한 줄에 하나씩 붙여 넣으세요.')}</p>
            <textarea className="mono" rows={4} value={codes} onChange={(e) => setCodes(e.target.value)} />
            <div className="fan-actions" style={{ marginTop: 10 }}>
              <button className="btn" disabled={busy} onClick={enroll}>{L('Verify', '인증')}</button>
            </div>
          </section>
          <section className="fan-step">
            <h3>
              <span className="dot">6</span>
              {L('Run the show', '공연 진행')}
            </h3>
            <div className="fan-actions">
              <button className="btn ghost" disabled={busy} onClick={() => advance(L('Close the draw', '응모 마감'))}>{L('Close the draw', '응모 마감')}</button>
              <button className="btn" disabled={busy} onClick={reveal}>{L('Reveal winners', '당첨자 공개')}</button>
              <button className="btn ghost" disabled={busy} onClick={() => advance(L('Sell returned seats', '반납 좌석 판매'))}>{L('Sell returned seats', '반납 좌석 판매')}</button>
              <button className="btn ghost" disabled={busy} onClick={() => advance(L('End the show', '공연 종료'))}>{L('End the show', '공연 종료')}</button>
            </div>
          </section>
        </>
      )}

      {mine.contract && (
        <details>
          <summary>{L('Box office details', '매표소 정보')}</summary>
          <code>{JSON.stringify({ contract: mine.contract, tkrwContract: mine.tkrwContract, showId: mine.showId }, null, 1)}</code>
        </details>
      )}
      <ol className="log">{log.map((l, i) => <li key={i}>{l}</li>)}</ol>
    </main>
  );
}
