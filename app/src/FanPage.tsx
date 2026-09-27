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

import { getPass, noWalletDevice, putPass } from './passstore';

export function FanPage() {
  const { lang } = useI18n();
  const ko = lang === 'ko';
  const [cred, setCred] = useState<Credential | null>(loadCredential);
  const [lace, setLace] = useState<Awaited<ReturnType<typeof connectLace>> | null>(null);
  const [fv, setFv] = useState<FanContract | null>(null);
  const [log, setLog] = useState<string[]>([]);
  const [busy, setBusy] = useState(false);
  const [qr, setQr] = useState('');
  const [phoneCode, setPhoneCode] = useState('');
  const mobile = noWalletDevice();
  const show = DEPLOYMENT.showId;
  const say = (m: string) => setLog((l) => [`${new Date().toLocaleTimeString()} ${m}`, ...l]);

  const run = async (label: string, f: () => Promise<{ public: { txHash: string } } | void>) => {
    setBusy(true);
    say(`${label}… ${ko ? '(약 1분)' : '(about a minute)'}`);
    try {
      const r = await f();
      say(`✓ ${label}`);
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
    run(ko ? '연습용 원화 ₩1,000,000 충전' : 'Top up ₩1,000,000 practice won', async () => {
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
    run(fromPool ? (ko ? '반납 좌석 구매' : 'Buy a returned seat') : ko ? '당첨 좌석 구매' : 'Buy my seat', async () => {
      const slot = nextFreeSlot(cred!, show);
      const face = BigInt(DEPLOYMENT.faceValue);
      const r = await (fromPool ? fv!.callTx.buyFromPool(fromHexB(show), BigInt(slot), coin(face)) : fv!.callTx.claimTicket(fromHexB(show), BigInt(slot), coin(face)));
      recordSlot(slot, true);
      setHeld(slot);
      return r;
    });

  const giveBack = () =>
    run(ko ? '반납하고 환불' : 'Return for refund', async () => {
      const r = await fv!.callTx.returnTicket(fromHexB(show), BigInt(heldSlot()!));
      setHeld(undefined);
      return r;
    });

  const checkIn = () =>
    run(ko ? '체크인' : 'Check in', async () => {
      const code = phoneCode.trim().toLowerCase();
      if (code && !/^[0-9a-f]{64}$/.test(code)) throw new Error(ko ? '휴대폰 연결 코드가 올바르지 않습니다' : 'That phone code is not valid');
      const k = code ? null : await createPassKey();
      const r = await fv!.callTx.checkIn(fromHexB(show), BigInt(heldSlot()!), code ? fromHexB(code) : k!.passKey);
      if (k) await putPass(show, k);
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

  const L = (en: string, k: string) => (ko ? k : en);
  return (
    <main className="page">
      <h1 className="page-title">{L('Get your ticket', '티켓 받기')}</h1>
      <p className="lede">{L('Four taps. Face value. Nobody sees who.', '네 번의 탭. 정가 그대로. 누구인지는 비공개.')}</p>
      {mobile && (
        <section className="fan-step handoff">
          <h3>{L('Buying works on a computer', '구매는 컴퓨터에서')}</h3>
          <p className="muted">{L('Midnight wallets run on desktop browsers for now. Use this phone as your entry pass.', 'Midnight 지갑은 아직 데스크톱 브라우저에서만 작동합니다. 이 휴대폰은 입장 패스로 쓰세요.')}</p>
          <div className="fan-actions">
            <a className="btn" href="#/pass">{L('Set up my phone pass', '휴대폰 패스 설정')}</a>
            <button className="btn ghost" onClick={() => navigator.clipboard?.writeText(location.href.split('#')[0] + '#/fan')}>{L('Copy link for computer', '컴퓨터용 링크 복사')}</button>
          </div>
        </section>
      )}
      {!DEPLOYMENT.contract && <p className="pill">{L('The box office opens soon.', '매표소가 곧 열립니다.')}</p>}

      <section className="fan-step">
        <h3><span className="dot">1</span>{L('Your fan ID', '내 팬 ID')}</h3>
        {!cred ? (
          <button className="btn" onClick={() => setCred(newCredential())}>{L('Create on this phone', '이 휴대폰에 만들기')}</button>
        ) : (
          <>
            <p className="muted">✓ {L('Saved on this phone only.', '이 휴대폰에만 저장됨.')}</p>
            <details>
              <summary>{L('Code for the verifier', '인증용 코드')}</summary>
              <code>{cred.leafHex}</code>
            </details>
          </>
        )}
      </section>

      <section className="fan-step">
        <h3><span className="dot">2</span>{L('Wallet', '지갑')}</h3>
        {!lace ? (
          <button className="btn" disabled={busy || !cred || !DEPLOYMENT.contract} onClick={connect}>{L('Connect Lace', 'Lace 연결')}</button>
        ) : (
          <p className="muted">✓ {L('Connected', '연결됨')}</p>
        )}
      </section>

      {fv && (
        <section className="fan-step">
          <h3><span className="dot">3</span>{L('Tickets', '티켓')}</h3>
          <div className="fan-actions">
            <button className="btn ghost" disabled={busy} onClick={mint}>{L('Top up practice won', '연습용 원화 충전')}</button>
            <button className="btn" disabled={busy} onClick={() => run(L('Enter draw', '추첨 응모'), () => fv.callTx.enterDraw(fromHexB(show)))}>{L('Enter draw', '추첨 응모')}</button>
            <button className="btn" disabled={busy} onClick={() => claim(false)}>{L('Buy my seat', '당첨 좌석 구매')}</button>
            <button className="btn ghost" disabled={busy} onClick={() => claim(true)}>{L('Buy a returned seat', '반납 좌석 구매')}</button>
            <button className="btn ghost" disabled={busy || heldSlot() === undefined} onClick={giveBack}>{L('Return for refund', '반납하고 환불')}</button>
            <input className="mono phone-code" placeholder={L('Phone code (optional)', '휴대폰 코드 (선택)')} value={phoneCode} onChange={(e) => setPhoneCode(e.target.value)} />
            <button className="btn" disabled={busy || heldSlot() === undefined} onClick={checkIn}>{L('Check in', '체크인')}</button>
          </div>
        </section>
      )}

      {qr && (
        <section className="pass-card">
          <h3>{L('Show this at the door', '입구에서 보여주세요')}</h3>
          <img className="qr" src={qr} alt="" />
        </section>
      )}

      <ol className="log">{log.map((l, i) => <li key={i}>{l}</li>)}</ol>
    </main>
  );
}

function friendly(m: string, ko: boolean): string {
  const map: [RegExp, string, string][] = [
    [/not in the verified registry/i, 'You are not a verified fan yet.', '아직 인증된 팬이 아닙니다.'],
    [/one entry per verified fan/i, 'You already entered this draw.', '이미 이 추첨에 응모했습니다.'],
    [/not drawn/i, 'Not drawn this time.', '아쉽지만 이번에는 당첨되지 않았습니다.'],
    [/already claimed/i, 'You already bought your seat.', '이미 좌석을 구매했습니다.'],
    [/cap reached|slot already used/i, 'Ticket limit reached.', '이 공연의 1인 구매 한도에 도달했습니다.'],
    [/no seats in the pool/i, 'No returned seats yet.', '지금은 반납된 좌석이 없습니다.'],
    [/exactly face value/i, 'Tickets can only be paid at face value.', '티켓은 정가로만 결제할 수 있습니다.'],
    [/already returned or used/i, 'This ticket was already used or returned.', '이미 사용했거나 반납한 티켓입니다.'],
    [/Lace wallet not found/i, 'Install the Lace wallet to continue.', 'Lace 지갑을 설치해 주세요.'],
  ];
  for (const [re, en, k] of map) if (re.test(m)) return ko ? k : en;
  return ko ? '문제가 발생했습니다. 다시 시도해 주세요.' : 'Something went wrong. Try again.';
}

const fromHexB = (h: string) => Uint8Array.from(h.match(/.{2}/g) ?? [], (b) => parseInt(b, 16));
void toHex;
