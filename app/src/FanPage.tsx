import { useEffect, useState } from 'react';
import QRCode from 'qrcode';
import { encodeRawTokenType, rawTokenType } from '@midnight-ntwrk/compact-runtime';
import { findDeployedContract } from '@midnight-ntwrk/midnight-js-contracts';
import { CompiledContract } from '@midnight-ntwrk/midnight-js-protocol/compact-js';
import { FetchZkConfigProvider } from '@midnight-ntwrk/midnight-js-fetch-zk-config-provider';
import { httpClientProofProvider } from '@midnight-ntwrk/midnight-js-http-client-proof-provider';
import * as Tkrw from '../../contract/src/managed/tkrw/contract/index.js';
import { DEPLOYMENT } from './deployment';
import { connectLace, joinAsFan, type FanContract } from './lace';
import { loadCredential, newCredential, nextFreeSlot, privateStateOf, saveCredential, type Credential } from './fan';
import { createPassKey, signPass, toHex, WINDOW_MS } from './gatepass';
import { useI18n } from './i18n';

const pad32 = (s: string) => {
  const o = new Uint8Array(32);
  o.set(new TextEncoder().encode(s));
  return o;
};

// Non-extractable pass keys persist in IndexedDB (CryptoKey objects are structured-cloneable).
const idb = () =>
  new Promise<IDBDatabase>((res, rej) => {
    const r = indexedDB.open('facevalue', 1);
    r.onupgradeneeded = () => r.result.createObjectStore('passes');
    r.onsuccess = () => res(r.result);
    r.onerror = () => rej(r.error);
  });
const putPass = async (show: string, v: unknown) => {
  const db = await idb();
  db.transaction('passes', 'readwrite').objectStore('passes').put(v, show);
};
const getPass = async (show: string) => {
  const db = await idb();
  return new Promise<{ keyPair: CryptoKeyPair; rawPublicKey: Uint8Array } | undefined>((res) => {
    const q = db.transaction('passes').objectStore('passes').get(show);
    q.onsuccess = () => res(q.result);
    q.onerror = () => res(undefined);
  });
};

export function FanPage() {
  const { lang } = useI18n();
  const ko = lang === 'ko';
  const [cred, setCred] = useState<Credential | null>(loadCredential);
  const [lace, setLace] = useState<Awaited<ReturnType<typeof connectLace>> | null>(null);
  const [fv, setFv] = useState<FanContract | null>(null);
  const [log, setLog] = useState<string[]>([]);
  const [busy, setBusy] = useState(false);
  const [qr, setQr] = useState('');
  const show = DEPLOYMENT.showId;
  const say = (m: string) => setLog((l) => [`${new Date().toLocaleTimeString()} ${m}`, ...l]);

  const run = async (label: string, f: () => Promise<{ public: { txHash: string } } | void>) => {
    setBusy(true);
    say(`${label}… ${ko ? '(비공개로 처리 중, 약 30–60초)' : '(working privately, about 30–60 s)'}`);
    try {
      const r = await f();
      say(`✔ ${label}${r ? (ko ? ' — Midnight에 기록됨' : ' — recorded on Midnight') : ''}`);
    } catch (e) {
      console.error(label, e);
      say(`✖ ${label}: ${friendly((e as Error).message, ko)}`);
    } finally {
      setBusy(false);
    }
  };

  const connect = () =>
    run(ko ? 'Lace 연결' : 'Connect Lace', async () => {
      const l = await connectLace(DEPLOYMENT.network);
      setLace(l);
      if (cred) setFv(await joinAsFan(l.providers, DEPLOYMENT.contract, privateStateOf(cred)));
    });

  useEffect(() => {
    if (lace && cred && !fv) joinAsFan(lace.providers, DEPLOYMENT.contract, privateStateOf(cred)).then(setFv);
  }, [lace, cred, fv]);

  const color = () => encodeRawTokenType(rawTokenType(pad32('facevalue:tKRW'), DEPLOYMENT.tkrwContract as never));
  const coin = (v: bigint) => ({ nonce: crypto.getRandomValues(new Uint8Array(32)), color: color(), value: v });

  const mint = () =>
    run(ko ? '테스트 원화 ₩1,000,000 받기' : 'Get ₩1,000,000 test won', async () => {
      const base = new URL('tkrw', location.href).href;
      const zk = new FetchZkConfigProvider<string>(base, fetch.bind(window));
      const compiled = CompiledContract.make<Tkrw.Contract<undefined>>('Tkrw', Tkrw.Contract<undefined>).pipe(
        CompiledContract.withVacantWitnesses,
        CompiledContract.withCompiledFileAssets('./managed/tkrw'),
      );
      const t = (await findDeployedContract({ ...lace!.providers, zkConfigProvider: zk, proofProvider: httpClientProofProvider(lace!.proverServerUri!, zk) } as never, {
        contractAddress: DEPLOYMENT.tkrwContract,
        compiledContract: compiled,
      } as never)) as unknown as FanContract;
      return t.callTx.mint(1_000_000n);
    });

  const recordSlot = (slot: number, holds: boolean) => {
    const c = { ...cred!, slotsUsed: { ...cred!.slotsUsed } };
    const used = new Set(c.slotsUsed[show] ?? []);
    if (holds) used.add(slot);
    c.slotsUsed[show] = [...used];
    saveCredential(c);
    setCred(c);
  };
  const heldSlot = () => (cred?.slotsUsed[`${show}:held`] ?? [])[0];
  const setHeld = (slot: number | undefined) => {
    const c = { ...cred!, slotsUsed: { ...cred!.slotsUsed, [`${show}:held`]: slot === undefined ? [] : [slot] } };
    saveCredential(c);
    setCred(c);
  };

  const claim = (fromPool: boolean) =>
    run(fromPool ? (ko ? '정가 풀에서 구매' : 'Buy from face-value pool') : ko ? '당첨 좌석 구매' : 'Claim my drawn seat', async () => {
      const slot = nextFreeSlot(cred!, show);
      const face = BigInt(DEPLOYMENT.faceValue);
      const r = await (fromPool ? fv!.callTx.buyFromPool(fromHexB(show), BigInt(slot), coin(face)) : fv!.callTx.claimTicket(fromHexB(show), BigInt(slot), coin(face)));
      recordSlot(slot, true);
      setHeld(slot);
      return r;
    });

  const giveBack = () =>
    run(ko ? '정가 환불로 반납' : 'Return for face-value refund', async () => {
      const r = await fv!.callTx.returnTicket(fromHexB(show), BigInt(heldSlot()!));
      setHeld(undefined);
      return r;
    });

  const checkIn = () =>
    run(ko ? '체크인' : 'Check in', async () => {
      const k = await createPassKey();
      const r = await fv!.callTx.checkIn(fromHexB(show), BigInt(heldSlot()!), k.passKey);
      await putPass(show, { keyPair: k.keyPair, rawPublicKey: k.rawPublicKey });
      setHeld(undefined);
      return r;
    });

  useEffect(() => {
    let t: ReturnType<typeof setInterval>;
    getPass(show).then((p) => {
      if (!p) return;
      const draw = async () => setQr(await QRCode.toDataURL(await signPass(p.keyPair.privateKey, p.rawPublicKey, show), { margin: 1, width: 300 }));
      draw();
      t = setInterval(() => Date.now() % WINDOW_MS < 1000 && draw(), 1000);
    });
    return () => clearInterval(t);
  }, [log.length]);

  return (
    <main className="narrow">
      <h2>{ko ? '팬' : 'Fan'}</h2>
      <p className="small">
        {ko
          ? '모든 단계가 실제로 Midnight에 기록됩니다. Lace 지갑이 필요합니다.'
          : 'Every step is really recorded on Midnight. You need the Lace wallet.'}
      </p>

      <h3>1. {ko ? '팬 인증' : 'Become a verified fan'}</h3>
      {!cred ? (
        <button onClick={() => setCred(newCredential())}>{ko ? '이 휴대폰에 팬 ID 만들기' : 'Create my fan ID on this phone'}</button>
      ) : (
        <p className="small">
          {ko
            ? '팬 ID가 이 휴대폰에만 저장되었습니다. 인증 기관은 당신이 실제 사람이라는 것만 확인하며, 어떤 공연에 가는지는 알 수 없습니다.'
            : 'Your fan ID is stored only on this phone. The verifier only confirms you are a real person — it never learns which shows you go to.'}
          <details>
            <summary>{ko ? '인증 기관에 보낼 코드' : 'Code to send to the verifier'}</summary>
            <code className="mono">{cred.leafHex}</code>
          </details>
        </p>
      )}

      <h3>2. {ko ? '지갑' : 'Wallet'}</h3>
      {!lace ? (
        <button disabled={busy || !cred} onClick={connect}>{ko ? 'Lace 연결' : 'Connect Lace'}</button>
      ) : (
        <p className="small">✔ {ko ? '지갑 연결됨' : 'Wallet connected'}</p>
      )}

      {fv && (
        <>
          <h3>3. {ko ? '티켓' : 'Tickets'}</h3>
          <div className="actions">
            <button disabled={busy} onClick={mint}>{ko ? '테스트 원화 받기' : 'Get test won'}</button>
            <button disabled={busy} onClick={() => run(ko ? '추첨 응모' : 'Enter draw', () => fv.callTx.enterDraw(fromHexB(show)))}>{ko ? '추첨 응모' : 'Enter draw'}</button>
            <button disabled={busy} onClick={() => claim(false)}>{ko ? '당첨 좌석 구매' : 'Claim seat'}</button>
            <button disabled={busy} onClick={() => claim(true)}>{ko ? '정가 풀 구매' : 'Buy from pool'}</button>
            <button disabled={busy || heldSlot() === undefined} onClick={giveBack}>{ko ? '반납·환불' : 'Return & refund'}</button>
            <button disabled={busy || heldSlot() === undefined} onClick={checkIn}>{ko ? '체크인' : 'Check in'}</button>
          </div>
        </>
      )}

      {qr && (
        <>
          <h3>{ko ? '입장 패스 — 입구에서 보여주세요' : 'Entry pass — show this at the door'}</h3>
          <img className="qr" src={qr} alt="gate pass" />
        </>
      )}

      <ol className="log small">{log.map((l, i) => <li key={i}>{l}</li>)}</ol>
    </main>
  );
}

function friendly(m: string, ko: boolean): string {
  const map: [RegExp, string, string][] = [
    [/not in the verified registry/i, 'You are not a verified fan yet.', '아직 인증된 팬이 아닙니다.'],
    [/one entry per verified fan/i, 'You already entered this draw.', '이미 이 추첨에 응모했습니다.'],
    [/not drawn/i, 'Sorry — you were not drawn this time.', '아쉽지만 이번에는 당첨되지 않았습니다.'],
    [/already claimed/i, 'You already bought your seat.', '이미 좌석을 구매했습니다.'],
    [/cap reached|slot already used/i, 'You reached the ticket limit for this show.', '이 공연의 1인 구매 한도에 도달했습니다.'],
    [/no seats in the pool/i, 'No returned seats right now — check back soon.', '지금은 반납된 좌석이 없습니다.'],
    [/exactly face value/i, 'Tickets can only be paid at face value.', '티켓은 정가로만 결제할 수 있습니다.'],
    [/already returned or used/i, 'This ticket was already used or returned.', '이미 사용했거나 반납한 티켓입니다.'],
    [/Lace wallet not found/i, 'Install the Lace wallet to continue.', 'Lace 지갑을 설치해 주세요.'],
  ];
  for (const [re, en, k] of map) if (re.test(m)) return ko ? k : en;
  return ko ? '문제가 발생했습니다. 다시 시도해 주세요.' : 'Something went wrong — please try again.';
}

const fromHexB = (h: string) => Uint8Array.from(h.match(/.{2}/g) ?? [], (b) => parseInt(b, 16));
void toHex;
