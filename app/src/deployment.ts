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
  contract: '',
  tkrwContract: '',
  faceValue: '110000',
  showId: '',
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

export function saveDeployment(d: Partial<Deployment>) {
  const next = { ...local(), ...d };
  try {
    localStorage.setItem('fv-deployment', JSON.stringify(next));
  } catch {
    /* storage blocked */
  }
  Object.assign(DEPLOYMENT, next);
}
