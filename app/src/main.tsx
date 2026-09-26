import { StrictMode, useEffect, useMemo, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import QRCode from 'qrcode';
import jsQR from 'jsqr';
import { NETWORKS, passKeysFor, phaseName, readLedger, showsOf, type NetworkName, type ShowView } from './chain';
import { createPassKey, signPass, toHex, verifyPass, WINDOW_MS, type GateVerdict } from './gatepass';
import { DEPLOYMENT } from './deployment';
import './styles.css';

const won = (n: bigint) => `₩${Number(n).toLocaleString('ko-KR')}`;

function useRoute() {
  const [r, setR] = useState(location.hash.slice(1) || '/');
  useEffect(() => {
    const f = () => setR(location.hash.slice(1) || '/');
    addEventListener('hashchange', f);
    return () => removeEventListener('hashchange', f);
  }, []);
  return r;
}

function useLedger(network: NetworkName, address: string) {
  const [shows, setShows] = useState<ShowView[] | null>(null);
  const [ledger, setLedger] = useState<Awaited<ReturnType<typeof readLedger>> | null>(null);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    let live = true;
    const tick = () =>
      readLedger(network, address)
        .then((l) => live && (setLedger(l), setShows(showsOf(l)), setError(null)))
        .catch((e) => live && setError(String(e.message ?? e)));
    tick();
    const t = setInterval(tick, 10_000);
    return () => ((live = false), clearInterval(t));
  }, [network, address]);
  return { shows, ledger, error };
}

function Nav() {
  return (
    <nav className="nav">
      <a href="#/" className="brand">
        FaceValue <span className="kr">정가</span>
      </a>
      <a href="#/">Shows</a>
      <a href="#/pass">My gate pass</a>
      <a href="#/gate">Gate scanner</a>
    </nav>
  );
}

function Home() {
  const { shows, ledger, error } = useLedger(DEPLOYMENT.network, DEPLOYMENT.contract);
  return (
    <main>
      <section className="hero">
        <h1>
          Tickets at face value.
          <br />
          Entry without showing your face.
        </h1>
        <p>
          Every FaceValue ticket holder is a verified, unique human — yet no issuer, organizer, venue or chain observer
          learns <em>which</em> human holds <em>which</em> ticket. There is no transfer button: the only way out of a
          ticket is a face-value refund back to the pool, so scalping has nowhere to happen.
        </p>
      </section>

      <section>
        <h2>Live on Midnight {DEPLOYMENT.network}</h2>
        <p className="mono small">
          contract <a href={`${DEPLOYMENT.explorer}${DEPLOYMENT.contract}`} target="_blank">{DEPLOYMENT.contract}</a>
        </p>
        {error && <p className="warn">{error}</p>}
        {!shows && !error && <p>Reading the public ledger…</p>}
        {ledger && (
          <p className="small">
            Verified fans in the registry: <b>{String(ledger.enrolled)}</b> — the chain stores only hashed commitments;
            it cannot say who they are.
          </p>
        )}
        <div className="grid">
          {shows?.map((s) => (
            <article key={s.id} className="card">
              <header>
                <span className="phase">{phaseName[s.phase]}</span>
                <span className="mono small">show {s.id.slice(0, 10)}…</span>
              </header>
              <div className="price">{won(s.faceValue)}</div>
              <dl>
                <dt>Seats</dt><dd>{String(s.capacity)}</dd>
                <dt>Draw entries</dt><dd>{String(s.entries)}</dd>
                <dt>Tickets issued</dt><dd>{String(s.issued)}</dd>
                <dt>Returned for refund</dt><dd>{String(s.returned)}</dd>
                <dt>In face-value pool</dt><dd>{String(s.pool)}</dd>
                <dt>Checked in</dt><dd>{String(s.checkedIn)}</dd>
                <dt>Max per fan</dt><dd>{String(s.perFanCap)}</dd>
              </dl>
              <ul className="facts">
                <li>✔ every ticket held by a verified unique human</li>
                <li>✔ nobody above {String(s.perFanCap)} tickets</li>
                <li>✔ every resale at exactly {won(s.faceValue)}</li>
                <li>✔ draw seed was sealed before entries opened</li>
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="split">
        <div>
          <h3>Public (anyone can audit)</h3>
          <p>Seats, entries, tickets issued, returns, pool size, check-ins, the draw seed and its commitment.</p>
        </div>
        <div>
          <h3>Private (never leaves the fan's device)</h3>
          <p>Who entered, who won, who holds which ticket, who returned one, the fan's identity.</p>
        </div>
      </section>
    </main>
  );
}

// --- fan: rotating gate pass -------------------------------------------------

function Pass() {
  const [key, setKey] = useState<Awaited<ReturnType<typeof createPassKey>> | null>(null);
  const [show, setShow] = useState(DEPLOYMENT.showId);
  const [qr, setQr] = useState('');
  const [left, setLeft] = useState(0);
  useEffect(() => {
    if (!key) return;
    const draw = async () => {
      const text = await signPass(key.keyPair.privateKey, key.rawPublicKey, show);
      setQr(await QRCode.toDataURL(text, { margin: 1, width: 320 }));
    };
    draw();
    const t = setInterval(() => {
      const ms = WINDOW_MS - (Date.now() % WINDOW_MS);
      setLeft(Math.ceil(ms / 1000));
      if (ms > WINDOW_MS - 1000) draw();
    }, 1000);
    return () => clearInterval(t);
  }, [key, show]);
  return (
    <main className="narrow">
      <h2>My gate pass</h2>
      <p>
        At check-in (from home, before the show) your ticket is spent on-chain and this device's key is registered as a
        one-time pass. At the door the gate only checks a signature — no ID, no face scan, no network.
      </p>
      <label>
        Show id <input className="mono" value={show} onChange={(e) => setShow(e.target.value.trim())} />
      </label>
      {!key ? (
        <button onClick={async () => setKey(await createPassKey())}>Create this device's pass key</button>
      ) : (
        <>
          <p className="small">
            Pass key to register at check-in (sha-256 of the device public key):
            <br />
            <code className="mono">{toHex(key.passKey)}</code>
          </p>
          {qr && <img className="qr" src={qr} alt="gate pass QR" />}
          <p className="small">Re-signs in {left}s — screenshots expire.</p>
        </>
      )}
    </main>
  );
}

// --- gate: offline scanner ---------------------------------------------------

function Gate() {
  const { ledger, error } = useLedger(DEPLOYMENT.network, DEPLOYMENT.contract);
  const [show, setShow] = useState(DEPLOYMENT.showId);
  const [extra, setExtra] = useState('');
  const registered = useMemo(() => {
    const s = ledger ? passKeysFor(ledger, show) : new Set<string>();
    extra.split(/\s+/).filter(Boolean).forEach((k) => s.add(k.toLowerCase()));
    return s;
  }, [ledger, show, extra]);
  const admitted = useRef(new Set<string>());
  const [verdict, setVerdict] = useState<(GateVerdict & { ms: number }) | null>(null);
  const video = useRef<HTMLVideoElement>(null);
  const [scanning, setScanning] = useState(false);
  const busy = useRef(false);

  const check = async (text: string) => {
    if (busy.current) return;
    busy.current = true;
    const t0 = performance.now();
    const v = await verifyPass(text, show, registered, admitted.current);
    setVerdict({ ...v, ms: Math.round(performance.now() - t0) });
    setTimeout(() => (busy.current = false), 1500);
  };

  useEffect(() => {
    if (!scanning) return;
    let stream: MediaStream | undefined;
    let raf = 0;
    const canvas = document.createElement('canvas');
    navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } }).then((s) => {
      stream = s;
      video.current!.srcObject = s;
      video.current!.play();
      const loop = () => {
        const v = video.current;
        if (v && v.readyState === v.HAVE_ENOUGH_DATA) {
          canvas.width = v.videoWidth;
          canvas.height = v.videoHeight;
          const ctx = canvas.getContext('2d', { willReadFrequently: true })!;
          ctx.drawImage(v, 0, 0);
          const code = jsQR(ctx.getImageData(0, 0, canvas.width, canvas.height).data, canvas.width, canvas.height);
          if (code?.data.startsWith('FV1.')) check(code.data);
        }
        raf = requestAnimationFrame(loop);
      };
      loop();
    });
    return () => {
      cancelAnimationFrame(raf);
      stream?.getTracks().forEach((t) => t.stop());
    };
  }, [scanning, registered]);

  return (
    <main className="narrow">
      <h2>Gate scanner</h2>
      <p>
        Syncs the on-chain pass list before doors open, then works offline. It learns only “valid, not yet admitted” —
        never a name.
      </p>
      <label>
        Show id <input className="mono" value={show} onChange={(e) => setShow(e.target.value.trim())} />
      </label>
      <p className="small">
        {error ? <span className="warn">offline: {error}</span> : `${registered.size} pass keys synced from the chain`}
      </p>
      <details>
        <summary className="small">Add pass keys manually (local demo)</summary>
        <textarea className="mono" rows={3} value={extra} onChange={(e) => setExtra(e.target.value)} />
      </details>
      {!scanning ? <button onClick={() => setScanning(true)}>Start camera</button> : <video ref={video} className="cam" muted playsInline />}
      {verdict && (
        <div className={`verdict ${verdict.ok ? 'ok' : 'no'}`}>
          {verdict.ok ? 'ADMIT' : `REFUSE — ${verdict.reason}`}
          <span className="small"> · {verdict.ms} ms</span>
        </div>
      )}
    </main>
  );
}

function App() {
  const route = useRoute();
  return (
    <>
      <Nav />
      {route === '/pass' ? <Pass /> : route === '/gate' ? <Gate /> : <Home />}
      <footer>
        Built on Midnight for the Midnight Korea Hackathon 2026. Networks: {Object.keys(NETWORKS).join(' · ')}.
      </footer>
    </>
  );
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
