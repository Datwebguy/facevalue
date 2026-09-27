import './polyfills';
import { StrictMode, useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import { createRoot } from 'react-dom/client';
import QRCode from 'qrcode';
import jsQR from 'jsqr';
import { passKeysFor, readLedger, showsOf, type NetworkName, type ShowView } from './chain';
import { createPassKey, signPass, toHex, verifyPass, WINDOW_MS, type GateVerdict } from './gatepass';
import { getPass, putPass, type StoredPass } from './passstore';
import { DEPLOYMENT } from './deployment';
import { FanPage } from './FanPage';
import { SetupPage } from './SetupPage';
import { TryPage } from './TryPage';
import evidence from '../../docs/evidence/local-run.json';
import { I18nProvider, LangToggle, ThemeToggle, useI18n } from './i18n';
import './styles.css';

const won = (n: bigint | string) => `₩${Number(n).toLocaleString('ko-KR')}`;

const STEP_LABELS: [RegExp, string, string][] = [
  [/deploy tKRW/, 'Ticket currency opened', '티켓 결제 통화 개설'],
  [/deploy FaceValue/, 'Box office opened', '매표소 오픈'],
  [/^mint/, 'A fan topped up ₩1,000,000 practice won', '팬이 연습용 원화 ₩1,000,000 충전'],
  [/enrollBatch/, 'Three fans verified as real people', '팬 3명이 실제 사람으로 인증됨'],
  [/createShow/, 'Show announced, draw result sealed in advance', '공연 발표, 추첨 결과 미리 봉인'],
  [/enterDraw/, 'A fan entered the draw', '팬 1명 추첨 응모'],
  [/close entries/, 'Draw closed', '응모 마감'],
  [/revealDraw/, 'Draw revealed: two winners', '추첨 공개: 당첨자 2명'],
  [/claimTicket/, 'A winner bought a seat at ₩110,000', '당첨자가 ₩110,000에 좌석 구매'],
  [/returnTicket/, 'A fan returned a ticket for a full refund', '팬이 티켓을 반납하고 전액 환불'],
  [/open face-value pool/, 'The returned seat went back on sale at face value', '반납 좌석이 정가로 다시 판매됨'],
  [/buyFromPool/, 'Another fan bought that seat at ₩110,000', '다른 팬이 그 좌석을 ₩110,000에 구매'],
  [/checkIn/, 'A fan checked in from home', '팬이 집에서 체크인'],
  [/close show/, 'Show over', '공연 종료'],
  [/withdraw/, 'The organizer collected ticket revenue', '주최자가 티켓 수익 정산'],
];
const stepLabel = (step: string, lang: string) => {
  const hit = STEP_LABELS.find(([re]) => re.test(step));
  return hit ? (lang === 'ko' ? hit[2] : hit[1]) : step;
};

function useRoute() {
  const [r, setR] = useState(location.hash.slice(1) || '/');
  useEffect(() => {
    const f = () => {
      setR(location.hash.slice(1) || '/');
      window.scrollTo({ top: 0 });
    };
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

/** Fades and lifts children into view as they scroll in. */
function Reveal({ children, delay = 0, as: Tag = 'div', className = '' }: { children: ReactNode; delay?: number; as?: 'div' | 'li' | 'section'; className?: string }) {
  const ref = useRef<HTMLElement>(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => e.isIntersecting && (setShown(true), io.disconnect()), { threshold: 0.15 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <Tag ref={ref as never} className={`reveal ${shown ? 'in' : ''} ${className}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </Tag>
  );
}

function Nav() {
  const { t } = useI18n();
  const route = useRoute();
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const f = () => setScrolled(scrollY > 8);
    addEventListener('scroll', f, { passive: true });
    return () => removeEventListener('scroll', f);
  }, []);
  const link = (href: string, label: string) => (
    <a href={href} className={route === href.slice(1) || (href === '#/' && route === '/') ? 'active' : ''}>
      {label}
    </a>
  );
  return (
    <header className={`nav ${scrolled ? 'scrolled' : ''}`}>
      <a href="#/" className="brand">
        <img className="brand-mark" src="logo-mark.svg" alt="" width="34" height="34" />
        FaceValue <span className="kr">정가</span>
      </a>
      <nav className="links">
        {link('#/', t.navHow)}
        {link('#/try', t.navTry)}
        {link('#/fan', t.navFans)}
        {link('#/pass', t.navPass)}
        {link('#/gate', t.navStaff)}
        {link('#/setup', t.navOrg)}
      </nav>
      <div className="controls">
        <LangToggle />
        <ThemeToggle />
      </div>
    </header>
  );
}

function HeroTicket() {
  const { t } = useI18n();
  return (
    <div className="ticket-stage" aria-hidden>
      <div className="ticket">
        <div className="ticket-main">
          <div className="ticket-top">
            <span className="ticket-live">● LIVE</span>
            <span>SEOUL · 2026</span>
          </div>
          <div className="ticket-title">
            FACE<br />VALUE
          </div>
          <div className="ticket-row">
            <div>
              <small>{t.ticketSeat}</small>
              <b>F · 12</b>
            </div>
            <div>
              <small>{t.ticketPrice}</small>
              <b>₩110,000</b>
            </div>
          </div>
          <div className="ticket-holo" />
        </div>
        <div className="ticket-stub">
          <span className="stamp">{t.ticketVerified}</span>
          <span className="blurred">KIM MIN JI</span>
          <small>{t.ticketHidden}</small>
        </div>
      </div>
    </div>
  );
}

function Marquee() {
  const { t } = useI18n();
  const items = [...t.marquee, ...t.marquee];
  return (
    <div className="marquee" aria-hidden>
      <div className="marquee-track">
        {items.map((m, i) => (
          <span key={i}>
            {m} <em>✦</em>
          </span>
        ))}
      </div>
    </div>
  );
}

function Home() {
  const { t, lang } = useI18n();
  const { shows, ledger, error } = useLedger(DEPLOYMENT.network, DEPLOYMENT.contract);
  const words = [...t.heroWords.map((w) => [w, 'a']), ...t.heroWords2.map((w) => [w, 'b'])];
  const recorded = evidence.finalShow;
  return (
    <main className="home">
      <section className="hero">
        <div className="glow g1" />
        <div className="glow g2" />
        <div className="hero-copy">
          <p className="kicker">{t.heroKicker}</p>
          <h1 key={lang}>
            {words.map(([w, line], i) => (
              <span key={i}>
                {i === t.heroWords.length && <span className="br" />}
                <span className={`word ${line}`} style={{ animationDelay: `${120 + i * 90}ms` }}>
                  {w}
                </span>
              </span>
            ))}
          </h1>
          <p className="lede">{t.heroBody}</p>
          <div className="actions">
            <a className="btn" href="#/try">
              {t.ctaTry} <span aria-hidden>→</span>
            </a>
            <a className="btn ghost" href="#/fan">
              {t.ctaFan}
            </a>
            <a className="btn ghost" href="#/gate">
              {t.ctaStaff}
            </a>
          </div>
        </div>
        <HeroTicket />
      </section>

      <Marquee />

      <section className="band">
        <Reveal>
          <p className="kicker">{t.howKicker}</p>
          <h2>{t.howTitle}</h2>
        </Reveal>
        <ol className="journey">
          {t.steps.map((st, i) => (
            <Reveal as="li" key={i} delay={i * 120} className="stop">
              <span className="dot">{i + 1}</span>
              <h3>{st[0]}</h3>
              <p>{st[1]}</p>
              <a href={st[3]} className="more">
                {st[2]} <span aria-hidden>→</span>
              </a>
            </Reveal>
          ))}
        </ol>
      </section>

      <section className="band">
        <Reveal>
          <p className="kicker">{error ? t.recordedKicker : t.liveKicker}</p>
          <h2>{error ? t.recordedTitle : t.liveTitle}</h2>
        </Reveal>
        {!shows && !error && <p className="muted">{t.reading}</p>}
        {shows?.map((s) => <ShowBoard key={s.id} s={s} enrolled={ledger ? String(ledger.enrolled) : undefined} />)}
        {error && (
          <Reveal className="board">
            <ShowBoardBody
              phase={Number(recorded.phase)}
              face={recorded.faceValue}
              capacity={recorded.capacity}
              issued={recorded.issued}
              returned={recorded.returned}
              pool={recorded.pool}
              checkedIn={recorded.checkedIn}
              entries={recorded.entries}
              cap={recorded.perFanCap}
            />
            <div className="replay">
              <p>{t.recordedNote}</p>
              <ol>
                {evidence.steps.map((st, i) => (
                  <li key={i} style={{ animationDelay: `${i * 70}ms` }}>
                    <span className="tick">✓</span> {stepLabel(st.step, lang)}
                  </li>
                ))}
              </ol>
              <p className="muted small">{t.recordedAt(new Date(evidence.ranAt).toLocaleString(lang === 'ko' ? 'ko-KR' : 'en-GB'))}</p>
            </div>
          </Reveal>
        )}
      </section>

      <section className="band">
        <Reveal>
          <p className="kicker">{t.splitKicker}</p>
        </Reveal>
        <div className="split">
          <Reveal className="side open">
            <h3>{t.publicTitle}</h3>
            <ul>
              {t.publicItems.map((x) => (
                <li key={x}>{x}</li>
              ))}
            </ul>
          </Reveal>
          <Reveal className="side sealed" delay={150}>
            <h3>{t.privateTitle}</h3>
            <ul>
              {t.privateItems.map((x) => (
                <li key={x}>
                  <span className="veil">{x}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>
    </main>
  );
}

function ShowBoardBody(p: {
  phase: number;
  face: bigint | string;
  capacity: bigint | string;
  issued: bigint | string;
  returned: bigint | string;
  pool: bigint | string;
  checkedIn: bigint | string;
  entries: bigint | string;
  cap: bigint | string;
}) {
  const { t } = useI18n();
  const taken = Math.max(0, Number(p.issued) - Number(p.returned));
  const pct = Math.min(100, (taken / Math.max(1, Number(p.capacity))) * 100);
  return (
    <div className="board-body">
      <div className="board-head">
        <span className="phase">{t.phases[p.phase]}</span>
        <span className="price">{won(p.face)}</span>
      </div>
      <div className="meter" aria-label={t.seatsLeft(String(taken), String(p.capacity))}>
        <span style={{ width: `${pct}%` }} />
      </div>
      <p className="muted small">{t.seatsLeft(String(taken), String(p.capacity))}</p>
      <dl className="stats">
        <div><dt>{t.entries}</dt><dd>{String(p.entries)}</dd></div>
        <div><dt>{t.issued}</dt><dd>{String(p.issued)}</dd></div>
        <div><dt>{t.returned}</dt><dd>{String(p.returned)}</dd></div>
        <div><dt>{t.pool}</dt><dd>{String(p.pool)}</dd></div>
        <div><dt>{t.checkedIn}</dt><dd>{String(p.checkedIn)}</dd></div>
        <div><dt>{t.maxPerFan}</dt><dd>{String(p.cap)}</dd></div>
      </dl>
      <ul className="facts">
        <li>{t.factHuman}</li>
        <li>{t.factCap(String(p.cap))}</li>
        <li>{t.factFace(won(p.face))}</li>
        <li>{t.factSeed}</li>
      </ul>
    </div>
  );
}

function ShowBoard({ s, enrolled }: { s: ShowView; enrolled?: string }) {
  const { t } = useI18n();
  return (
    <Reveal className="board">
      <ShowBoardBody
        phase={s.phase}
        face={s.faceValue}
        capacity={s.capacity}
        issued={s.issued}
        returned={s.returned}
        pool={s.pool}
        checkedIn={s.checkedIn}
        entries={s.entries}
        cap={s.perFanCap}
      />
      {enrolled && (
        <p className="muted small">
          <b>{enrolled}</b> {t.enrolled}. {t.enrolledNote}
        </p>
      )}
      <a className="more" href={`${DEPLOYMENT.explorer}${DEPLOYMENT.contract}`} target="_blank" rel="noreferrer">
        {t.explorer} <span aria-hidden>↗</span>
      </a>
    </Reveal>
  );
}

// Fan: rotating entry pass

function Pass() {
  const { t, lang } = useI18n();
  const L = (en: string, ko: string) => (lang === 'ko' ? ko : en);
  const show = DEPLOYMENT.showId;
  const [key, setKey] = useState<StoredPass | null>(null);
  const [qr, setQr] = useState('');
  const [pairQr, setPairQr] = useState('');
  const [left, setLeft] = useState(0);
  const [copied, setCopied] = useState(false);
  const { ledger } = useLedger(DEPLOYMENT.network, DEPLOYMENT.contract);
  const code = key ? toHex(key.passKey) : '';
  const active = !!(ledger && code && passKeysFor(ledger, show).has(code));

  useEffect(() => {
    getPass('device').then((p) => p && setKey(p));
  }, []);
  useEffect(() => {
    if (code) QRCode.toDataURL(code, { margin: 1, width: 260 }).then(setPairQr);
  }, [code]);
  useEffect(() => {
    if (!key) return;
    const draw = async () => setQr(await QRCode.toDataURL(await signPass(key.keyPair.privateKey, key.rawPublicKey, show), { margin: 1, width: 320 }));
    draw();
    const timer = setInterval(() => {
      const ms = WINDOW_MS - (Date.now() % WINDOW_MS);
      setLeft(Math.ceil(ms / 1000));
      if (ms > WINDOW_MS - 1000) draw();
    }, 1000);
    return () => clearInterval(timer);
  }, [key, show]);

  const create = async () => {
    const k = await createPassKey();
    await putPass('device', k);
    setKey(k);
  };

  return (
    <main className="page">
      <Reveal>
        <h1 className="page-title">{t.passTitle}</h1>
        <p className="lede">{t.passBody}</p>
      </Reveal>
      {!key ? (
        <button className="btn" onClick={create}>{t.createKey}</button>
      ) : active ? (
        <Reveal className="pass-card">
          <p className="pill ok-pill">✓ {L('Checked in. Show this at the door.', '체크인 완료. 입구에서 보여주세요.')}</p>
          {qr && <img className="qr" src={qr} alt="" />}
          <div className="countdown" style={{ ['--p' as string]: `${(left / 30) * 100}%` }}>
            <span>{t.resigns(left)}</span>
          </div>
        </Reveal>
      ) : (
        <Reveal className="pass-card">
          <h3>{L('Pair this phone', '이 휴대폰 연결')}</h3>
          <p className="muted">{L('At check in on your computer, paste this phone code. This screen then turns into your entry pass.', '컴퓨터에서 체크인할 때 이 휴대폰 코드를 붙여 넣으세요. 그러면 이 화면이 입장 패스로 바뀝니다.')}</p>
          {pairQr && <img className="qr" src={pairQr} alt="" />}
          <code className="pair-code">{code}</code>
          <button className="btn ghost" onClick={() => navigator.clipboard?.writeText(code).then(() => setCopied(true))}>
            {copied ? L('Copied', '복사됨') : L('Copy phone code', '휴대폰 코드 복사')}
          </button>
        </Reveal>
      )}
    </main>
  );
}

// Venue staff: offline door scanner

function Gate() {
  const { t } = useI18n();
  const { ledger, error } = useLedger(DEPLOYMENT.network, DEPLOYMENT.contract);
  const show = DEPLOYMENT.showId;
  const registered = useMemo(() => (ledger ? passKeysFor(ledger, show) : new Set<string>()), [ledger, show]);
  const admitted = useRef(new Set<string>());
  const [verdict, setVerdict] = useState<GateVerdict | null>(null);
  const video = useRef<HTMLVideoElement>(null);
  const [scanning, setScanning] = useState(false);
  const busy = useRef(false);

  const check = async (text: string) => {
    if (busy.current) return;
    busy.current = true;
    setVerdict(await verifyPass(text, show, registered, admitted.current));
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
      stream?.getTracks().forEach((tr) => tr.stop());
    };
  }, [scanning, registered]);

  return (
    <main className="page">
      <Reveal>
        <h1 className="page-title">{t.gateTitle}</h1>
        <p className="lede">{t.gateBody}</p>
        <p className="pill">{error ? t.offline : t.synced(registered.size)}</p>
      </Reveal>
      <div className="scanner">
        {!scanning ? (
          <button className="btn" onClick={() => setScanning(true)}>
            {t.startCamera}
          </button>
        ) : (
          <>
            <video ref={video} className="cam" muted playsInline />
            <span className="scan-line" aria-hidden />
          </>
        )}
      </div>
      {verdict && (
        <div key={Math.random()} className={`verdict ${verdict.ok ? 'ok' : 'no'}`}>
          <b>{verdict.ok ? t.admit : t.refuse}</b>
          {!verdict.ok && <span>{t.reasons[verdict.reason]}</span>}
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
      {route === '/try' ? <TryPage /> : route === '/setup' ? <SetupPage /> : route === '/fan' ? <FanPage /> : route === '/pass' ? <Pass /> : route === '/gate' ? <Gate /> : <Home />}
      <footer>{t.footer}</footer>
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
