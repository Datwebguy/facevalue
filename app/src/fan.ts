// The fan's device credential. The fan secret never leaves this browser except
// inside zero-knowledge proofs; only its hash (the registry leaf) is given to the issuer.
import { createPrivateState, pureCircuits, type FaceValuePrivateState } from '../../contract/src/index';
import { toHex } from './gatepass';

const KEY = 'fv-credential-v1';
const fromHex = (h: string) => Uint8Array.from(h.match(/.{2}/g) ?? [], (b) => parseInt(b, 16));

export type Credential = { fanSecretHex: string; leafHex: string; slotsUsed: Record<string, number[]> };

export function loadCredential(): Credential | null {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as Credential) : null;
  } catch {
    return null;
  }
}

export function saveCredential(c: Credential) {
  try {
    localStorage.setItem(KEY, JSON.stringify(c));
  } catch {
    /* storage blocked: credential lives for this tab only */
  }
}

export function newCredential(): Credential {
  const secret = crypto.getRandomValues(new Uint8Array(32));
  const c = { fanSecretHex: toHex(secret), leafHex: toHex(pureCircuits.fanLeaf(secret)), slotsUsed: {} };
  saveCredential(c);
  return c;
}

export const privateStateOf = (c: Credential): FaceValuePrivateState =>
  // A fan has no role key; a random one keeps the witness shape uniform.
  createPrivateState(crypto.getRandomValues(new Uint8Array(32)), fromHex(c.fanSecretHex));

export const nextFreeSlot = (c: Credential, showId: string) => {
  const used = c.slotsUsed[showId] ?? [];
  let s = 0;
  while (used.includes(s)) s++;
  return s;
};
