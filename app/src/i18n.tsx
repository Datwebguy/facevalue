import { createContext, useContext, useState, type ReactNode } from 'react';

export type Lang = 'ko' | 'en';

const en = {
  navShows: 'Shows',
  navFan: 'Get tickets',
  navPass: 'My entry pass',
  navGate: 'Door scanner',
  heroTitle1: 'Tickets at face value.',
  heroTitle2: 'Entry without showing your face.',
  heroBody:
    "Every FaceValue ticket belongs to a real, verified person — but nobody, not the ticket seller, the organizer, the venue or anyone watching, can tell which person holds which ticket. Tickets can't be passed to someone else. If you can't go, you get your money back and the seat goes to the next fan at the same price. That leaves scalpers nothing to sell.",
  liveOn: 'Live on Midnight',
  contract: 'View on the Midnight explorer',
  reading: 'Loading live show data…',
  enrolled: 'Verified fans',
  enrolledNote: 'we know how many, never who.',
  show: 'Show',
  seats: 'Seats',
  entries: 'Fans in the draw',
  issued: 'Tickets sold',
  returned: 'Returned for a refund',
  pool: 'Available at face value',
  checkedIn: 'Checked in',
  maxPerFan: 'Max per fan',
  factHuman: 'every ticket belongs to one verified person',
  factCap: (n: string) => `nobody holds more than ${n}`,
  factFace: (p: string) => `every resale is exactly ${p}`,
  factSeed: 'the draw was locked in before anyone entered',
  publicTitle: 'Anyone can check',
  publicBody: 'How many seats, entries, tickets sold, returned and used — and that the draw was fair.',
  privateTitle: 'Nobody can see',
  privateBody: 'Who entered, who won, who holds which ticket, who returned one, or who you are.',
  phases: ['Draw open', 'Draw closed', 'Winners buying', 'Returned seats on sale', 'Show closed'],
  passTitle: 'My entry pass',
  passBody:
    'Check in from home before the show. This phone then shows a code that changes every 30 seconds. At the door, staff scan it — no ID card, no face scan, no internet needed.',
  showId: 'Show',
  createKey: 'Set up this phone as my entry pass',
  passKeyLabel: 'This phone is ready. Check in to activate it for the show.',
  resigns: (s: number) => `New code in ${s}s — screenshots stop working.`,
  gateTitle: 'Door scanner',
  gateBody:
    "Load today's check-ins before doors open, then scan — it keeps working even without internet. It only ever learns “this ticket is valid”, never a name.",
  offline: 'No connection',
  synced: (n: number) => `${n} checked-in tickets ready at this door`,
  addManual: 'Add entry passes by hand (demo)',
  startCamera: 'Start camera',
  admit: 'WELCOME IN',
  refuse: 'NOT VALID',
  reasons: {
    malformed: 'this is not a FaceValue pass',
    'wrong show': 'this pass is for a different show',
    expired: 'old code — a screenshot?',
    'bad signature': 'code was not made by the checked-in phone',
    'not checked in': 'this phone has not checked in',
    'already admitted': 'already inside',
  } as Record<string, string>,
  footer: 'Built on Midnight for the Midnight Korea Hackathon 2026 · For developers: GitHub README',
};

type Dict = typeof en;

const ko: Dict = {
  navShows: '공연',
  navFan: '티켓 받기',
  navPass: '내 입장 패스',
  navGate: '입구 스캐너',
  heroTitle1: '티켓은 정가로.',
  heroTitle2: '입장은 얼굴 없이.',
  heroBody:
    'FaceValue의 모든 티켓은 인증된 실제 사람의 것입니다. 하지만 판매처도, 주최자도, 공연장도, 누구도 어떤 사람이 어떤 티켓을 가졌는지 알 수 없습니다. 티켓은 다른 사람에게 넘길 수 없습니다. 못 가게 되면 전액 환불받고, 좌석은 같은 가격으로 다음 팬에게 갑니다. 그래서 암표상이 팔 것이 없습니다.',
  liveOn: 'Midnight에서 운영 중 ·',
  contract: 'Midnight 탐색기에서 보기',
  reading: '공연 정보를 불러오는 중…',
  enrolled: '인증된 팬',
  enrolledNote: '몇 명인지는 알지만, 누구인지는 절대 모릅니다.',
  show: '공연',
  seats: '좌석',
  entries: '추첨 응모자',
  issued: '판매된 티켓',
  returned: '환불 반납',
  pool: '정가 구매 가능',
  checkedIn: '체크인',
  maxPerFan: '1인 최대',
  factHuman: '모든 티켓은 인증된 한 사람의 것',
  factCap: (n) => `누구도 ${n}매를 넘게 가질 수 없음`,
  factFace: (p) => `모든 재판매는 정확히 ${p}`,
  factSeed: '추첨 결과는 응모 전에 이미 봉인됨',
  publicTitle: '누구나 확인 가능',
  publicBody: '좌석 수, 응모 수, 판매·반납·사용된 티켓 수, 그리고 추첨이 공정했는지.',
  privateTitle: '아무도 볼 수 없음',
  privateBody: '누가 응모했는지, 누가 당첨됐는지, 누가 어떤 티켓을 가졌는지, 누가 반납했는지, 당신이 누구인지.',
  phases: ['추첨 응모 중', '응모 마감', '당첨자 구매 중', '반납 좌석 판매 중', '공연 종료'],
  passTitle: '내 입장 패스',
  passBody:
    '공연 전에 집에서 체크인하세요. 그러면 이 휴대폰에 30초마다 바뀌는 코드가 표시됩니다. 입구에서 직원이 스캔합니다. 신분증도, 얼굴 인식도, 인터넷도 필요 없습니다.',
  showId: '공연',
  createKey: '이 휴대폰을 입장 패스로 설정',
  passKeyLabel: '이 휴대폰이 준비되었습니다. 체크인하면 공연용으로 활성화됩니다.',
  resigns: (s) => `${s}초 후 새 코드 — 스크린샷은 작동하지 않습니다.`,
  gateTitle: '입구 스캐너',
  gateBody:
    '개장 전에 오늘의 체크인 목록을 불러온 뒤 스캔하세요. 인터넷이 없어도 작동합니다. 알 수 있는 것은 “유효한 티켓”이라는 사실뿐, 이름은 절대 알 수 없습니다.',
  offline: '연결 없음',
  synced: (n) => `이 입구에서 확인 가능한 체크인 티켓 ${n}장`,
  addManual: '입장 패스 직접 추가 (데모)',
  startCamera: '카메라 시작',
  admit: '입장하세요',
  refuse: '유효하지 않음',
  reasons: {
    malformed: 'FaceValue 패스가 아닙니다',
    'wrong show': '다른 공연의 패스입니다',
    expired: '오래된 코드 — 스크린샷인가요?',
    'bad signature': '체크인한 휴대폰에서 만든 코드가 아닙니다',
    'not checked in': '체크인하지 않은 휴대폰입니다',
    'already admitted': '이미 입장했습니다',
  },
  footer: 'Midnight Korea Hackathon 2026을 위해 Midnight 위에 구축 · 개발자용 정보: GitHub README',
};

const dicts: Record<Lang, Dict> = { en, ko };

const initial = (): Lang => {
  try {
    const saved = localStorage.getItem('fv-lang');
    if (saved === 'ko' || saved === 'en') return saved;
  } catch {
    /* storage blocked */
  }
  return navigator.language.startsWith('ko') ? 'ko' : 'en';
};

const Ctx = createContext<{ lang: Lang; t: Dict; setLang: (l: Lang) => void }>({ lang: 'en', t: en, setLang: () => {} });

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, set] = useState<Lang>(initial);
  const setLang = (l: Lang) => {
    set(l);
    document.documentElement.lang = l;
    try {
      localStorage.setItem('fv-lang', l);
    } catch {
      /* storage blocked */
    }
  };
  return <Ctx.Provider value={{ lang, t: dicts[lang], setLang }}>{children}</Ctx.Provider>;
}

export const useI18n = () => useContext(Ctx);

export function LangToggle() {
  const { lang, setLang } = useI18n();
  return (
    <div className="lang" role="group" aria-label="Language">
      <button className={lang === 'ko' ? 'on' : ''} onClick={() => setLang('ko')}>Kor</button>
      <button className={lang === 'en' ? 'on' : ''} onClick={() => setLang('en')}>Eng</button>
    </div>
  );
}
