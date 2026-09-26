import { StrictMode, useEffect, useMemo, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import QRCode from 'qrcode';
import jsQR from 'jsqr';
import { NETWORKS, passKeysFor, readLedger, showsOf, type NetworkName, type ShowView } from './chain';
import { createPassKey, signPass, toHex, verifyPass, WINDOW_MS, type GateVerdict } from './gatepass';
import { DEPLOYMENT } from './deployment';
import { FanPage } from './FanPage';
import { I18nProvider, LangToggle, useI18n } from './i18n';
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
  const { t } = useI18n();
  return (
    <nav className="nav">
      <a href="#/" className="brand">
        FaceValue <span className="kr">정가</span>
      </a>
      <a href="#/">{t.navShows}</a>
      <a href="#/fan">{t.navFan}</a>
      <a href="#/pass">{t.navPass}</a>
      <a href="#/gate">{t.navGate}</a>
      <LangToggle />
    </nav>
  );
}

function Home() {
  const { t } = useI18n();
  const { shows, ledger, error } = useLedger(DEPLOYMENT.network, DEPLOYMENT.contract);
  return (
    <main>
      <section className="hero">
        <h1>
          {t.heroTitle1}
          <br />
          {t.heroTitle2}
        </h1>
        <p>{t.heroBody}</p>
      </section>

      <section>
        <h2>{t.liveOn} {DEPLOYMENT.network}</h2>
        <p className="small">
          <a href={`${DEPLOYMENT.explorer}${DEPLOYMENT.contract}`} target="_blank" rel="noreferrer">{t.contract} ↗</a>
        </p>
        {error && <p className="warn">{error}</p>}
        {!shows && !error && <p>{t.reading}</p>}
        {ledger && (
          <p className="small">
            {t.enrolled}: <b>{String(ledger.enrolled)}</b> — {t.enrolledNote}
          </p>
        )}
        <div className="grid">
          {shows?.map((s) => (
            <article key={s.id} className="card">
              <header>
                <span className="phase">{t.phases[s.phase]}</span>
                <span className="small">{t.show} #{s.id.slice(0, 4).toUpperCase()}</span>
              </header>
              <div className="price">{won(s.faceValue)}</div>
              <dl>
                <dt>{t.seats}</dt><dd>{String(s.capacity)}</dd>
                <dt>{t.entries}</dt><dd>{String(s.entries)}</dd>
                <dt>{t.issued}</dt><dd>{String(s.issued)}</dd>
                <dt>{t.returned}</dt><dd>{String(s.returned)}</dd>
                <dt>{t.pool}</dt><dd>{String(s.pool)}</dd>
                <dt>{t.checkedIn}</dt><dd>{String(s.checkedIn)}</dd>
                <dt>{t.maxPerFan}</dt><dd>{String(s.perFanCap)}</dd>
              </dl>
              <ul className="facts">
                <li>✔ {t.factHuman}</li>
                <li>✔ {t.factCap(String(s.perFanCap))}</li>
                <li>✔ {t.factFace(won(s.faceValue))}</li>
                <li>✔ {t.factSeed}</li>
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="split">
        <div>
          <h3>{t.publicTitle}</h3>
          <p>{t.publicBody}</p>
        </div>
        <div>
          <h3>{t.privateTitle}</h3>
          <p>{t.privateBody}</p>
        </div>
      </section>
    </main>
  );
}

// --- fan: rotating gate pass -------------------------------------------------

function Pass() {
  const { t } = useI18n();
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
      <h2>{t.passTitle}</h2>
      <p>{t.passBody}</p>
      <details>
        <summary className="small">{t.showId} #{show.slice(0, 4).toUpperCase()}</summary>
        <input className="mono" value={show} onChange={(e) => setShow(e.target.value.trim())} />
      </details>
      {!key ? (
        <button onClick={async () => setKey(await createPassKey())}>{t.createKey}</button>
      ) : (
        <>
          <p className="small">
            {t.passKeyLabel}
          </p>
          {qr && <img className="qr" src={qr} alt="gate pass QR" />}
          <p className="small">{t.resigns(left)}</p>
        </>
      )}
    </main>
  );
}

// --- gate: offline scanner ---------------------------------------------------

function Gate() {
  const { t } = useI18n();
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
      <h2>{t.gateTitle}</h2>
      <p>{t.gateBody}</p>
      <details>
        <summary className="small">{t.showId} #{show.slice(0, 4).toUpperCase()}</summary>
        <input className="mono" value={show} onChange={(e) => setShow(e.target.value.trim())} />
      </details>
      <p className="small">
        {error ? <span className="warn">{t.offline}: {error}</span> : t.synced(registered.size)}
      </p>
      <details>
        <summary className="small">{t.addManual}</summary>
        <textarea className="mono" rows={3} value={extra} onChange={(e) => setExtra(e.target.value)} />
      </details>
      {!scanning ? <button onClick={() => setScanning(true)}>{t.startCamera}</button> : <video ref={video} className="cam" muted playsInline />}
      {verdict && (
        <div className={`verdict ${verdict.ok ? 'ok' : 'no'}`}>
          {verdict.ok ? t.admit : `${t.refuse} — ${t.reasons[verdict.reason]}`}
          <span className="small"> · {verdict.ms < 1000 ? `${verdict.ms} ms` : ''}</span>
        </div>
      )}
    </main>
  );
}

function App() {
  const { t } = useI18n();
  const route = useRoute();
  return (
    <>
      <Nav />
      {route === '/fan' ? <FanPage /> : route === '/pass' ? <Pass /> : route === '/gate' ? <Gate /> : <Home />}
      <footer>
        {t.footer} · {Object.keys(NETWORKS).join(' · ')}
      </footer>
    </>
  );
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <I18nProvider>
      <App />
    </I18nProvider>
  </StrictMode>,
);
