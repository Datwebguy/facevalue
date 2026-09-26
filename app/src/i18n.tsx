import { createContext, useContext, useState, type ReactNode } from 'react';

export type Lang = 'ko' | 'en';

const en = {
  navShows: 'Shows',
  navPass: 'My gate pass',
  navGate: 'Gate scanner',
  heroTitle1: 'Tickets at face value.',
  heroTitle2: 'Entry without showing your face.',
  heroBody:
    'Every FaceValue ticket holder is a verified, unique human — yet no issuer, organizer, venue or chain observer learns which human holds which ticket. There is no transfer button: the only way out of a ticket is a face-value refund back to the pool, so scalping has nowhere to happen.',
  liveOn: 'Live on Midnight',
  contract: 'contract',
  reading: 'Reading the public ledger…',
  enrolled: 'Verified fans in the registry',
  enrolledNote: 'the chain stores only hashed commitments; it cannot say who they are.',
  show: 'show',
  seats: 'Seats',
  entries: 'Draw entries',
  issued: 'Tickets issued',
  returned: 'Returned for refund',
  pool: 'In face-value pool',
  checkedIn: 'Checked in',
  maxPerFan: 'Max per fan',
  factHuman: 'every ticket held by a verified unique human',
  factCap: (n: string) => `nobody above ${n} tickets`,
  factFace: (p: string) => `every resale at exactly ${p}`,
  factSeed: 'draw seed was sealed before entries opened',
  publicTitle: 'Public (anyone can audit)',
  publicBody: 'Seats, entries, tickets issued, returns, pool size, check-ins, the draw seed and its commitment.',
  privateTitle: "Private (never leaves the fan's device)",
  privateBody: 'Who entered, who won, who holds which ticket, who returned one, the fan’s identity.',
  phases: ['Draw open', 'Entries closed', 'Winners claiming', 'Face-value pool open', 'Closed'],
  passTitle: 'My gate pass',
  passBody:
    "At check-in (from home, before the show) your ticket is spent on-chain and this device's key is registered as a one-time pass. At the door the gate only checks a signature — no ID, no face scan, no network.",
  showId: 'Show id',
  createKey: "Create this device's pass key",
  passKeyLabel: 'Pass key to register at check-in (sha-256 of the device public key):',
  resigns: (s: number) => `Re-signs in ${s}s — screenshots expire.`,
  gateTitle: 'Gate scanner',
  gateBody: 'Syncs the on-chain pass list before doors open, then works offline. It learns only “valid, not yet admitted” — never a name.',
  offline: 'offline',
  synced: (n: number) => `${n} pass keys synced from the chain`,
  addManual: 'Add pass keys manually (local demo)',
  startCamera: 'Start camera',
  admit: 'ADMIT',
  refuse: 'REFUSE',
  reasons: {
    malformed: 'not a FaceValue pass',
    'wrong show': 'pass is for another show',
    expired: 'expired code (screenshot?)',
    'bad signature': 'signature does not match the device key',
    'not checked in': 'this device never checked in',
    'already admitted': 'already admitted',
  } as Record<string, string>,
  footer: 'Built on Midnight for the Midnight Korea Hackathon 2026.',
};

type Dict = typeof en;

const ko: Dict = {
  navShows: '공연',
  navPass: '내 입장 패스',
  navGate: '입장 스캐너',
  heroTitle1: '티켓은 정가로.',
  heroTitle2: '입장은 얼굴 없이.',
  heroBody:
    'FaceValue의 모든 티켓 보유자는 인증된 유일한 사람입니다. 하지만 발급자, 주최자, 공연장, 블록체인 관찰자 누구도 어떤 사람이 어떤 티켓을 가졌는지 알 수 없습니다. 양도 기능은 없습니다. 티켓을 내놓는 유일한 방법은 정가 환불로 풀에 반납하는 것뿐이라 암표가 설 자리가 없습니다.',
  liveOn: 'Midnight에서 운영 중 ·',
  contract: '컨트랙트',
  reading: '공개 원장을 읽는 중…',
  enrolled: '레지스트리의 인증 팬 수',
  enrolledNote: '체인에는 해시된 커밋먼트만 저장되며, 누구인지는 알 수 없습니다.',
  show: '공연',
  seats: '좌석',
  entries: '추첨 응모',
  issued: '발행된 티켓',
  returned: '환불 반납',
  pool: '정가 풀 잔여',
  checkedIn: '체크인',
  maxPerFan: '1인 최대',
  factHuman: '모든 티켓은 인증된 유일한 사람이 보유',
  factCap: (n) => `누구도 ${n}매를 넘지 않음`,
  factFace: (p) => `모든 재판매는 정확히 ${p}`,
  factSeed: '추첨 시드는 응모 시작 전에 봉인됨',
  publicTitle: '공개 (누구나 감사 가능)',
  publicBody: '좌석 수, 응모 수, 발행 티켓, 반납, 풀 잔여, 체크인, 추첨 시드와 그 커밋먼트.',
  privateTitle: '비공개 (팬의 기기를 떠나지 않음)',
  privateBody: '누가 응모했는지, 누가 당첨됐는지, 누가 어떤 티켓을 가졌는지, 누가 반납했는지, 팬의 신원.',
  phases: ['추첨 응모 중', '응모 마감', '당첨자 구매 중', '정가 풀 판매 중', '종료'],
  passTitle: '내 입장 패스',
  passBody:
    '체크인(공연 전, 집에서)하면 티켓이 체인에서 사용 처리되고 이 기기의 키가 1회용 패스로 등록됩니다. 입구에서는 서명만 확인합니다. 신분증도, 얼굴 인식도, 네트워크도 필요 없습니다.',
  showId: '공연 ID',
  createKey: '이 기기의 패스 키 만들기',
  passKeyLabel: '체크인 때 등록할 패스 키 (기기 공개키의 sha-256):',
  resigns: (s) => `${s}초 후 재서명 — 스크린샷은 만료됩니다.`,
  gateTitle: '입장 스캐너',
  gateBody: '개장 전 체인의 패스 목록을 동기화한 뒤 오프라인으로 작동합니다. 알 수 있는 것은 “유효함, 아직 입장 안 함”뿐, 이름은 절대 알 수 없습니다.',
  offline: '오프라인',
  synced: (n) => `체인에서 패스 키 ${n}개 동기화됨`,
  addManual: '패스 키 직접 추가 (로컬 데모)',
  startCamera: '카메라 시작',
  admit: '입장 허용',
  refuse: '입장 거부',
  reasons: {
    malformed: 'FaceValue 패스가 아님',
    'wrong show': '다른 공연의 패스',
    expired: '만료된 코드 (스크린샷?)',
    'bad signature': '기기 키와 서명이 일치하지 않음',
    'not checked in': '체크인하지 않은 기기',
    'already admitted': '이미 입장함',
  },
  footer: 'Midnight Korea Hackathon 2026을 위해 Midnight 위에 구축했습니다.',
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
