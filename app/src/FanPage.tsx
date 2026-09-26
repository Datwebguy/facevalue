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
    say(`${label}… ${ko ? '(증명 생성 중, 약 30–60초)' : '(proving, ~30–60 s)'}`);
    try {
      const r = await f();
      say(`✔ ${label}${r ? ` — tx ${r.public.txHash.slice(0, 16)}…` : ''}`);
    } catch (e) {
      say(`✖ ${label}: ${(e as Error).message}`);
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
    run(ko ? 'tKRW 1,000,000 받기' : 'Get 1,000,000 tKRW', async () => {
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
    run(ko ? '체크인 (입장 패스 등록)' : 'Check in (register gate pass)', async () => {
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
          ? '실제 트랜잭션입니다. 증명은 Lace에 설정된 증명 서버에서 생성되고, 수수료는 tDUST로 Lace가 지불합니다.'
          : 'These are real transactions. Proofs come from the proof server configured in Lace; Lace pays fees in tDUST.'}
      </p>

      <h3>1. {ko ? '내 기기 자격증명' : 'My device credential'}</h3>
      {!cred ? (
        <button onClick={() => setCred(newCredential())}>{ko ? '자격증명 만들기' : 'Create credential'}</button>
      ) : (
        <p className="small">
          {ko ? '발급자에게 전달할 레지스트리 리프 (비밀키가 아닌 해시):' : 'Registry leaf for the issuer (a hash, not your secret):'}
          <br />
          <code className="mono">{cred.leafHex}</code>
        </p>
      )}

      <h3>2. {ko ? '지갑' : 'Wallet'}</h3>
      {!lace ? (
        <button disabled={busy || !cred} onClick={connect}>{ko ? 'Lace 연결' : 'Connect Lace'}</button>
      ) : (
        <p className="small mono">shielded {lace.providers.walletProvider.getCoinPublicKey().slice(0, 24)}…</p>
      )}

      {fv && (
        <>
          <h3>3. {ko ? '티켓' : 'Tickets'}</h3>
          <div className="actions">
            <button disabled={busy} onClick={mint}>{ko ? 'tKRW 받기' : 'Get tKRW'}</button>
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
          <h3>{ko ? '입장 패스' : 'Gate pass'}</h3>
          <img className="qr" src={qr} alt="gate pass" />
        </>
      )}

      <ol className="log small mono">{log.map((l, i) => <li key={i}>{l}</li>)}</ol>
    </main>
  );
}

const fromHexB = (h: string) => Uint8Array.from(h.match(/.{2}/g) ?? [], (b) => parseInt(b, 16));
void toHex;
