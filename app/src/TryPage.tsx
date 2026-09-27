import { useMemo, useRef, useState } from 'react';
import QRCode from 'qrcode';
import { actor, Instant, ruleOf } from './instant';
import { createPassKey, signPass, toHex, verifyPass, WINDOW_MS } from './gatepass';
import { useI18n } from './i18n';

type Line = { ok: boolean; text: string };

export function TryPage() {
  const { lang } = useI18n();
  const L = (en: string, ko: string) => (lang === 'ko' ? ko : en);
  const [world, setWorld] = useState(() => new Instant());
  const you = useMemo(() => actor('You'), [world]);
  const others = useMemo(() => ['Joon', 'Seoyeon', 'Minji', 'Haru', 'Dami'].map(actor), [world]);
  const [step, setStep] = useState(0);
  const [lines, setLines] = useState<Line[]>([]);
  const [slot, setSlot] = useState(0n);
  const [qr, setQr] = useState('');
  const pass = useRef<Awaited<ReturnType<typeof createPassKey>> | null>(null);
  const admitted = useRef(new Set<string>());
  const [, tick] = useState(0);

  const log = (ok: boolean, text: string) => setLines((l) => [{ ok, text }, ...l]);
  const tryRule = (label: string, f: () => void) => {
    try {
      f();
      log(false, `${label}: ${L('allowed', '허용됨')}`);
    } catch (e) {
      log(true, `${L('Blocked', '차단됨')}: ${label}. ${L('Contract says', '컨트랙트')}: “${ruleOf(e)}”`);
    }
  };
  const next = () => (setStep((s) => s + 1), tick((n) => n + 1));

  const restart = () => {
    setWorld(new Instant());
    setStep(0);
    setLines([]);
    setQr('');
    setSlot(0n);
    pass.current = null;
    admitted.current = new Set();
  };

  const s = world.show;
  const youIndex = 0;

  const steps: { title: string; body: string; action: string; run: () => void | Promise<void> }[] = [
    {
      title: L('Get verified', '인증 받기'),
      body: L('You and five other fans prove you are real people. The chain only stores a scrambled code for each.', '당신과 다른 팬 다섯 명이 실제 사람임을 증명합니다. 체인에는 각자의 암호화된 코드만 저장됩니다.'),
      action: L('Verify me', '인증하기'),
      run: () => {
        world.enroll(you, ...others);
        log(true, L(`${world.ledger.enrolled} verified fans. Nobody knows who is who.`, `인증된 팬 ${world.ledger.enrolled}명. 누가 누구인지는 아무도 모릅니다.`));
        const bot = actor('bot');
        tryRule(L('a bot enters the draw', '봇이 추첨에 응모'), () => world.as(bot, (c, x) => c.enterDraw(x, world.showId)));
      },
    },
    {
      title: L('Enter the draw', '추첨 응모'),
      body: L('One entry per person. There is no speed race to win.', '한 사람당 한 번. 속도 경쟁은 없습니다.'),
      action: L('Enter the draw', '응모하기'),
      run: () => {
        world.as(you, (c, x) => c.enterDraw(x, world.showId));
        for (const o of others) world.as(o, (c, x) => c.enterDraw(x, world.showId));
        log(true, L(`${world.show.entries} fans entered for ${world.show.capacity} seats.`, `좌석 ${world.show.capacity}개에 팬 ${world.show.entries}명 응모.`));
        tryRule(L('you enter a second time', '두 번째 응모'), () => world.as(you, (c, x) => c.enterDraw(x, world.showId)));
      },
    },
    {
      title: L('The draw', '추첨'),
      body: L('The organizer sealed its seed before anyone entered. Mixed with every entry, it picks the winners. Nobody can steer it.', '주최자는 응모 전에 시드를 봉인했습니다. 모든 응모와 섞여 당첨자를 정하며, 아무도 조작할 수 없습니다.'),
      action: L('Run the draw', '추첨하기'),
      run: () => {
        world.reveal();
        log(true, world.won(youIndex) ? L('You won a seat!', '당첨되었습니다!') : L('Not drawn this time. Wait for a returned seat.', '이번엔 당첨되지 않았습니다. 반납 좌석을 기다리세요.'));
      },
    },
    {
      title: L('Pay face value', '정가 결제'),
      body: world.won(youIndex)
        ? L('Winners pay the printed price. Try paying more.', '당첨자는 표시된 가격을 냅니다. 더 내 보세요.')
        : L('A winner cannot go and returns the ticket for a full refund. The seat comes back at face value.', '당첨자 한 명이 못 가게 되어 전액 환불받고 반납합니다. 좌석은 정가로 돌아옵니다.'),
      action: L('Buy my seat', '좌석 구매'),
      run: () => {
        if (world.won(youIndex)) {
          tryRule(L('you pay ₩10,370,000 (scalper price)', '₩10,370,000 결제 (암표 가격)'), () =>
            world.as(you, (c, x) => c.claimTicket(x, world.showId, 0n, world.coin(10_370_000n))),
          );
          world.as(you, (c, x) => c.claimTicket(x, world.showId, 0n, world.coin()));
        } else {
          const winners = others.filter((_, i) => world.won(i + 1));
          for (const w of winners) world.as(w, (c, x) => c.claimTicket(x, world.showId, 0n, world.coin()));
          world.as(winners[0], (c, x) => c.returnTicket(x, world.showId, 0n));
          log(true, L(`${winners[0].name} returned a ticket and got ₩110,000 back.`, `${winners[0].name}님이 티켓을 반납하고 ₩110,000을 돌려받았습니다.`));
          world.as(world.organizer, (c, x) => c.advance(x, world.showId));
          world.as(you, (c, x) => c.buyFromPool(x, world.showId, 0n, world.coin()));
        }
        setSlot(0n);
        log(true, L('You hold a ticket. Paid exactly ₩110,000.', '티켓 보유. 정확히 ₩110,000 결제.'));
      },
    },
    {
      title: L('Try to scalp it', '되팔기 시도'),
      body: L('There is no transfer button in the contract. The only way out is a refund at face value.', '컨트랙트에는 양도 기능이 없습니다. 유일한 출구는 정가 환불입니다.'),
      action: L('Try to cheat', '부정 시도'),
      run: () => {
        tryRule(L('a stranger uses your ticket without your secret', '비밀값 없이 남이 사용'), () =>
          world.as(actor('stranger'), (c, x) => c.checkIn(x, world.showId, 0n, crypto.getRandomValues(new Uint8Array(32)))),
        );
        tryRule(L('you grab a second seat', '두 번째 좌석 확보'), () => world.as(you, (c, x) => c.claimTicket(x, world.showId, 1n, world.coin())));
      },
    },
    {
      title: L('Check in from home', '집에서 체크인'),
      body: L('Your phone makes a key that can never leave it. The ticket is used up on chain and the key becomes your entry pass.', '휴대폰이 절대 밖으로 나가지 않는 키를 만듭니다. 티켓은 체인에서 사용 처리되고 이 키가 입장 패스가 됩니다.'),
      action: L('Check in', '체크인'),
      run: async () => {
        const k = await createPassKey();
        pass.current = k;
        world.as(you, (c, x) => c.checkIn(x, world.showId, slot, k.passKey));
        const draw = async () => setQr(await QRCode.toDataURL(await signPass(k.keyPair.privateKey, k.rawPublicKey, toHex(world.showId)), { margin: 1, width: 260 }));
        await draw();
        setInterval(() => Date.now() % WINDOW_MS < 1000 && draw(), 1000);
        log(true, L('Checked in. Your code changes every 30 seconds.', '체크인 완료. 코드는 30초마다 바뀝니다.'));
      },
    },
    {
      title: L('Walk in', '입장'),
      body: L('Staff scan your code. The scanner never learns your name.', '직원이 코드를 스캔합니다. 스캐너는 이름을 알 수 없습니다.'),
      action: L('Scan at the door', '입구에서 스캔'),
      run: async () => {
        const k = pass.current!;
        const registered = new Set([...world.ledger.passes].map(([pk]) => toHex(pk)));
        const qrText = await signPass(k.keyPair.privateKey, k.rawPublicKey, toHex(world.showId));
        const v = await verifyPass(qrText, toHex(world.showId), registered, admitted.current);
        log(v.ok, v.ok ? L('WELCOME IN', '입장하세요') : String(v.reason));
        const again = await verifyPass(qrText, toHex(world.showId), registered, admitted.current);
        log(!again.ok, L('Same code again: refused, already inside.', '같은 코드 재사용: 거부, 이미 입장함.'));
        const old = await signPass(k.keyPair.privateKey, k.rawPublicKey, toHex(world.showId), Date.now() - 5 * WINDOW_MS);
        const shot = await verifyPass(old, toHex(world.showId), registered, new Set());
        log(!shot.ok, L('Old screenshot: refused.', '오래된 스크린샷: 거부.'));
      },
    },
  ];

  const current = steps[step];
  const doStep = async () => {
    try {
      await current.run();
      next();
    } catch (e) {
      log(false, ruleOf(e));
    }
  };

  return (
    <main className="page try">
      <p className="kicker">{L('No wallet needed', '지갑 필요 없음')}</p>
      <h1 className="page-title">{L('Try it now', '지금 체험하기')}</h1>
      <p className="lede">{L('The real FaceValue contract, running in your browser.', '실제 FaceValue 컨트랙트가 브라우저에서 실행됩니다.')}</p>

      <ol className="progress">
        {steps.map((st, i) => (
          <li key={i} className={i < step ? 'done' : i === step ? 'now' : ''}>
            <span>{i < step ? '✓' : i + 1}</span>
            <em>{st.title}</em>
          </li>
        ))}
      </ol>

      {current ? (
        <section className="fan-step now-card" key={step}>
          <h3>
            <span className="dot">{step + 1}</span>
            {current.title}
          </h3>
          <p className="muted">{current.body}</p>
          <button className="btn" onClick={doStep}>{current.action}</button>
        </section>
      ) : (
        <section className="fan-step now-card">
          <h3>{L('That is FaceValue.', '이것이 FaceValue입니다.')}</h3>
          <p className="muted">{L('Verified fans, fair draw, face value only, no names at the door.', '인증된 팬, 공정한 추첨, 오직 정가, 입구에서 이름 없음.')}</p>
          <div className="fan-actions">
            <button className="btn ghost" onClick={restart}>{L('Play again', '다시 하기')}</button>
            <a className="btn" href="#/fan">{L('Use it for real', '실제로 사용하기')}</a>
          </div>
        </section>
      )}

      {qr && (
        <section className="pass-card">
          <img className="qr" src={qr} alt="" />
        </section>
      )}

      <div className="chainview">
        <div>
          <b>{s.entries.toString()}</b>
          <small>{L('entries', '응모')}</small>
        </div>
        <div>
          <b>{s.issued.toString()}</b>
          <small>{L('sold', '판매')}</small>
        </div>
        <div>
          <b>{s.returned.toString()}</b>
          <small>{L('returned', '반납')}</small>
        </div>
        <div>
          <b>{s.checkedIn.toString()}</b>
          <small>{L('checked in', '체크인')}</small>
        </div>
      </div>

      <ol className="rulelog">
        {lines.map((l, i) => (
          <li key={lines.length - i} className={l.ok ? 'ok' : 'no'}>
            {l.text}
          </li>
        ))}
      </ol>
      <p className="muted small">{L('Runs the real contract in your browser. Nothing is saved on chain.', '실제 컨트랙트를 브라우저에서 실행합니다. 체인에는 저장되지 않습니다.')}</p>
    </main>
  );
}
