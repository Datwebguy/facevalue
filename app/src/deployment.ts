// Which live deployment the app reads.
// The organizer's "Open the box office" page stores a fresh Preprod deployment in this
// browser; the published defaults below are filled in once that deployment exists.
export type Deployment = {
  network: 'local' | 'preprod';
  contract: string;
  tkrwContract: string;
  faceValue: string;
  showId: string;
  explorer: string;
};

const PUBLISHED: Deployment = {
  network: 'preprod',
  contract: '1cf78af9c4c69d0b32bb3bd4cdd1d00ee2ae89d9ce2031f484c19665e5dd3179',
  tkrwContract: 'cfa973d92e5d2690d62d66724e12c9359a7c2fe159685e12c7a69a4c13760c91',
  faceValue: '110000',
  showId: '852c2cd4f7727e58c6eb8670cc91cbf81d46e24886aa8f6c669aecf2716ef59a',
  explorer: 'https://explorer.preprod.midnight.network/contracts/',
};

const local = (): Partial<Deployment> => {
  try {
    return JSON.parse(localStorage.getItem('fv-deployment') ?? '{}');
  } catch {
    return {};
  }
};

export const DEPLOYMENT: Deployment = { ...PUBLISHED, ...local() };

/** The box office this browser opened itself (the organizer holds its keys); empty until then. */
export const ownDeployment = (): Partial<Deployment> => local();

export function saveDeployment(d: Partial<Deployment>) {
  const next = { ...local(), ...d };
  try {
    localStorage.setItem('fv-deployment', JSON.stringify(next));
  } catch {
    /* storage blocked */
  }
  Object.assign(DEPLOYMENT, next);
}
