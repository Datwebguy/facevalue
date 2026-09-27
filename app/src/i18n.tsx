import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';

export type Lang = 'ko' | 'en';

const en = {
  navHow: 'How it works',
  navTry: 'Try it now',
  ctaTry: 'Try it now',
  navFans: 'For fans',
  navPass: 'My pass',
  navStaff: 'For venue staff',
  navOrg: 'For organizers',
  heroKicker: 'Concert tickets, finally fair',
  heroWords: ['Tickets', 'at', 'face', 'value.'],
  heroWords2: ['Entry', 'without', 'showing', 'your', 'face.'],
  heroBody:
    'Real fans. Real prices. Nobody sees who.',
  ctaFan: 'Get a ticket',
  ctaStaff: 'Scan at the door',
  marquee: ['No scalpers', 'No ID checks', 'No face scans', 'Face value only', 'One fan, one ticket', 'Private by design'],
  ticketVerified: 'VERIFIED FAN',
  ticketHidden: 'NAME HIDDEN',
  ticketSeat: 'SEAT',
  ticketPrice: 'FACE VALUE',
  howKicker: 'The journey',
  howTitle: 'Four steps from sofa to stage',
  steps: [
    ['Verify once', 'One real person, one private ID.', 'Start', '#/fan'],
    ['Enter the draw', 'One entry each. Bots lose.', 'Enter', '#/fan'],
    ['Pay face value', 'Can’t go? Full refund.', 'Buy', '#/fan'],
    ['Walk in', 'A code, not your ID.', 'Door scanner', '#/gate'],
  ] as [string, string, string, string][],
  liveKicker: 'Live now',
  liveTitle: 'On sale right now',
  recordedKicker: 'Recorded run',
  recordedTitle: 'A full show on a local Midnight devnet',
  explorer: 'View every step on Midnight',
  reading: 'Loading the show…',
  enrolled: 'verified fans',
  enrolledNote: 'Never who.',
  show: 'Show',
  seatsLeft: (a: string, b: string) => `${a} of ${b} seats taken`,
  entries: 'Fans in the draw',
  issued: 'Tickets sold',
  returned: 'Returned for a refund',
  pool: 'Available at face value',
  checkedIn: 'Already checked in',
  maxPerFan: 'Tickets per fan',
  factHuman: 'Every ticket belongs to one verified person',
  factCap: (n: string) => `Nobody holds more than ${n}`,
  factFace: (p: string) => `Every resale is exactly ${p}`,
  factSeed: 'The draw was locked in before anyone entered',
  phases: ['Draw open', 'Draw closed', 'Winners buying', 'Returned seats on sale', 'Show over'],
  splitKicker: 'Privacy, made visible',
  publicTitle: 'Anyone can check',
  publicItems: ['How many seats exist', 'How many fans entered', 'Tickets sold, returned and used', 'That the draw was fair', 'That nobody paid over face value'],
  privateTitle: 'Nobody can see',
  privateItems: ['Who entered', 'Who won', 'Who holds which ticket', 'Who returned one', 'Who you are'],
  recordedNote: 'Every step below was a real transaction with a real proof on a local Midnight devnet. No public deployment is live yet.',
  recordedAt: (d: string) => `Recorded ${d}`,
  passTitle: 'Your entry pass',
  passBody:
    'Check in at home. Show the code at the door.',
  showId: 'Show',
  createKey: 'Make this phone my entry pass',
  passKeyLabel: 'Ready. Check in to switch it on.',
  resigns: (s: number) => `New code in ${s}s. Screenshots stop working.`,
  gateTitle: 'Door scanner',
  gateBody:
    'Scan codes. Works offline. Never sees names.',
  offline: 'No connection',
  synced: (n: number) => `${n} checked in tickets ready at this door`,
  addManual: 'Add entry passes by hand',
  startCamera: 'Start camera',
  admit: 'WELCOME IN',
  refuse: 'NOT VALID',
  reasons: {
    malformed: 'This is not a FaceValue pass',
    'wrong show': 'This pass is for a different show',
    expired: 'This code is old. A screenshot?',
    'bad signature': 'This code was not made by the checked in phone',
    'not checked in': 'This phone has not checked in',
    'already admitted': 'Already inside',
  } as Record<string, string>,
  footer: 'FaceValue · Fair tickets, private fans · Built on Midnight',
  themeLight: 'Light',
  themeDark: 'Dark',
};

type Dict = typeof en;

const ko: Dict = {
  navHow: '이용 방법',
  navTry: '지금 체험',
  ctaTry: '지금 체험하기',
  navFans: '팬',
  navPass: '내 패스',
  navStaff: '공연장 직원',
  navOrg: '주최자',
  heroKicker: '드디어 공정한 공연 티켓',
  heroWords: ['티켓은', '정가로.'],
  heroWords2: ['입장은', '얼굴', '없이.'],
  heroBody:
    '진짜 팬. 정가 그대로. 누구인지는 아무도 모릅니다.',
  ctaFan: '티켓 받기',
  ctaStaff: '입구에서 스캔하기',
  marquee: ['암표 없음', '신분증 확인 없음', '얼굴 인식 없음', '오직 정가', '한 사람, 한 티켓', '처음부터 비공개'],
  ticketVerified: '인증된 팬',
  ticketHidden: '이름 비공개',
  ticketSeat: '좌석',
  ticketPrice: '정가',
  howKicker: '이용 흐름',
  howTitle: '소파에서 무대 앞까지, 네 단계',
  steps: [
    ['한 번 인증', '한 사람, 비공개 ID 하나.', '시작', '#/fan'],
    ['추첨 응모', '1인 1응모. 봇은 탈락.', '응모', '#/fan'],
    ['정가 결제', '못 가면 전액 환불.', '구매', '#/fan'],
    ['입장', '신분증 대신 코드.', '입구 스캐너', '#/gate'],
  ],
  liveKicker: '지금',
  liveTitle: '지금 판매 중',
  recordedKicker: '기록된 실행',
  recordedTitle: '로컬 Midnight 데브넷에서 진행한 공연 전체',
  explorer: 'Midnight에서 모든 단계 보기',
  reading: '공연 정보를 불러오는 중…',
  enrolled: '명의 인증된 팬',
  enrolledNote: '누구인지는 모릅니다.',
  show: '공연',
  seatsLeft: (a, b) => `${b}석 중 ${a}석 판매`,
  entries: '추첨 응모자',
  issued: '판매된 티켓',
  returned: '환불 반납',
  pool: '정가 구매 가능',
  checkedIn: '체크인 완료',
  maxPerFan: '1인 최대',
  factHuman: '모든 티켓은 인증된 한 사람의 것',
  factCap: (n) => `누구도 ${n}매를 넘게 가질 수 없음`,
  factFace: (p) => `모든 재판매는 정확히 ${p}`,
  factSeed: '추첨 결과는 응모 전에 이미 봉인됨',
  phases: ['추첨 응모 중', '응모 마감', '당첨자 구매 중', '반납 좌석 판매 중', '공연 종료'],
  splitKicker: '눈에 보이는 프라이버시',
  publicTitle: '누구나 확인 가능',
  publicItems: ['좌석이 몇 개인지', '몇 명이 응모했는지', '판매, 반납, 사용된 티켓 수', '추첨이 공정했는지', '아무도 정가 이상 내지 않았는지'],
  privateTitle: '아무도 볼 수 없음',
  privateItems: ['누가 응모했는지', '누가 당첨됐는지', '누가 어떤 티켓을 가졌는지', '누가 반납했는지', '당신이 누구인지'],
  recordedNote: '아래 모든 단계는 로컬 Midnight 데브넷에서 실제 증명과 함께 실행된 실제 트랜잭션입니다. 공개 배포는 아직 없습니다.',
  recordedAt: (d) => `기록 시각 ${d}`,
  passTitle: '내 입장 패스',
  passBody:
    '집에서 체크인. 입구에서 코드만 보여주세요.',
  showId: '공연',
  createKey: '이 휴대폰을 입장 패스로 만들기',
  passKeyLabel: '준비 완료. 체크인하면 켜집니다.',
  resigns: (s) => `${s}초 후 새 코드. 스크린샷은 작동하지 않습니다.`,
  gateTitle: '입구 스캐너',
  gateBody: '코드만 스캔. 오프라인 작동. 이름은 모름.',
  offline: '연결 없음',
  synced: (n) => `이 입구에서 확인 가능한 체크인 티켓 ${n}장`,
  addManual: '입장 패스 직접 추가',
  startCamera: '카메라 시작',
  admit: '입장하세요',
  refuse: '유효하지 않음',
  reasons: {
    malformed: 'FaceValue 패스가 아닙니다',
    'wrong show': '다른 공연의 패스입니다',
    expired: '오래된 코드입니다. 스크린샷인가요?',
    'bad signature': '체크인한 휴대폰에서 만든 코드가 아닙니다',
    'not checked in': '체크인하지 않은 휴대폰입니다',
    'already admitted': '이미 입장했습니다',
  },
  footer: 'FaceValue · 공정한 티켓, 보호받는 팬 · Midnight 기반',
  themeLight: '라이트',
  themeDark: '다크',
};

const dicts: Record<Lang, Dict> = { en, ko };

const read = (k: string) => {
  try {
    return localStorage.getItem(k);
  } catch {
    return null;
  }
};
const write = (k: string, v: string) => {
  try {
    localStorage.setItem(k, v);
  } catch {
    /* storage blocked */
  }
};

type Theme = 'light' | 'dark';
const Ctx = createContext<{ lang: Lang; t: Dict; setLang: (l: Lang) => void; theme: Theme; setTheme: (t: Theme) => void }>({
  lang: 'en',
  t: en,
  setLang: () => {},
  theme: 'dark',
  setTheme: () => {},
});

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(() => {
    const s = read('fv-lang');
    return s === 'ko' || s === 'en' ? s : navigator.language.startsWith('ko') ? 'ko' : 'en';
  });
  const [theme, setThemeState] = useState<Theme>(() => {
    const s = read('fv-theme');
    if (s === 'light' || s === 'dark') return s;
    return matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
  });
  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);
  const setLang = (l: Lang) => (setLangState(l), write('fv-lang', l));
  const setTheme = (t: Theme) => (setThemeState(t), write('fv-theme', t));
  return <Ctx.Provider value={{ lang, t: dicts[lang], setLang, theme, setTheme }}>{children}</Ctx.Provider>;
}

export const useI18n = () => useContext(Ctx);

export function LangToggle() {
  const { lang, setLang } = useI18n();
  return (
    <div className="seg" role="group" aria-label="Language">
      <button className={lang === 'ko' ? 'on' : ''} onClick={() => setLang('ko')}>Kor</button>
      <button className={lang === 'en' ? 'on' : ''} onClick={() => setLang('en')}>Eng</button>
    </div>
  );
}

export function ThemeToggle() {
  const { theme, setTheme, t } = useI18n();
  const next = theme === 'dark' ? 'light' : 'dark';
  const label = next === 'light' ? t.themeLight : t.themeDark;
  return (
    <button className="theme" onClick={() => setTheme(next)} aria-label={label} title={label}>
      <span className="sun" aria-hidden>☀</span>
      <span className="moon" aria-hidden>☾</span>
    </button>
  );
}
