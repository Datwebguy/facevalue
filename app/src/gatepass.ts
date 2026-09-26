// Gate passes: a per-ticket device key (ECDSA P-256, non-extractable in the browser).
// At check-in, sha256(rawPublicKey) is registered on-chain as the pass key.
// At the gate, the phone shows a QR re-signed every 30 s:
//     FV1.<showIdHex>.<window>.<rawPubKey b64url>.<signature b64url>
// The gate verifies the signature, that the window is fresh, that sha256(pubKey)
// is in the synced on-chain pass list for this show, and that it has not been used.
// No network, no identity, milliseconds.

export const WINDOW_MS = 30_000;
const subtle = globalThis.crypto.subtle;

const b64url = (b: Uint8Array) =>
  btoa(String.fromCharCode(...b)).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
const fromB64url = (s: string): Uint8Array<ArrayBuffer> =>
  Uint8Array.from(atob(s.replace(/-/g, '+').replace(/_/g, '/') + '==='.slice((s.length + 3) % 4)), (c) => c.charCodeAt(0));
export const toHex = (b: Uint8Array) => Array.from(b, (x) => x.toString(16).padStart(2, '0')).join('');

const message = (showIdHex: string, window: number) => new TextEncoder().encode(`facevalue-gate|${showIdHex}|${window}`);

export async function createPassKey(): Promise<{ keyPair: CryptoKeyPair; passKey: Uint8Array; rawPublicKey: Uint8Array }> {
  // extractable=false: the private key can be used for signing but never read out by page code.
  const keyPair = await subtle.generateKey({ name: 'ECDSA', namedCurve: 'P-256' }, false, ['sign', 'verify']);
  const rawPublicKey = new Uint8Array(await subtle.exportKey('raw', keyPair.publicKey));
  return { keyPair, rawPublicKey, passKey: await passKeyOf(rawPublicKey) };
}

export async function passKeyOf(rawPublicKey: Uint8Array): Promise<Uint8Array> {
  rawPublicKey = new Uint8Array(rawPublicKey);
  return new Uint8Array(await subtle.digest("SHA-256", rawPublicKey as Uint8Array<ArrayBuffer>));
}

export async function signPass(privateKey: CryptoKey, rawPublicKey: Uint8Array, showIdHex: string, now = Date.now()) {
  const window = Math.floor(now / WINDOW_MS);
  const sig = new Uint8Array(await subtle.sign({ name: 'ECDSA', hash: 'SHA-256' }, privateKey, message(showIdHex, window)));
  return `FV1.${showIdHex}.${window}.${b64url(rawPublicKey)}.${b64url(sig)}`;
}

export type GateVerdict =
  | { ok: true; passKeyHex: string }
  | { ok: false; reason: 'malformed' | 'wrong show' | 'expired' | 'bad signature' | 'not checked in' | 'already admitted' };

export async function verifyPass(
  qr: string,
  expectedShowIdHex: string,
  registeredPassKeys: Set<string>,
  admitted: Set<string>,
  now = Date.now(),
): Promise<GateVerdict> {
  const parts = qr.trim().split('.');
  if (parts.length !== 5 || parts[0] !== 'FV1') return { ok: false, reason: 'malformed' };
  const [, showIdHex, w, pubB64, sigB64] = parts;
  if (showIdHex !== expectedShowIdHex) return { ok: false, reason: 'wrong show' };
  const window = Number(w);
  const current = Math.floor(now / WINDOW_MS);
  if (!Number.isInteger(window) || window < current - 1 || window > current + 1) return { ok: false, reason: 'expired' };
  let raw: Uint8Array<ArrayBuffer>, sig: Uint8Array<ArrayBuffer>;
  try {
    raw = fromB64url(pubB64);
    sig = fromB64url(sigB64);
  } catch {
    return { ok: false, reason: 'malformed' };
  }
  let valid = false;
  try {
    const pub = await subtle.importKey('raw', raw, { name: 'ECDSA', namedCurve: 'P-256' }, false, ['verify']);
    valid = await subtle.verify({ name: 'ECDSA', hash: 'SHA-256' }, pub, sig, message(showIdHex, window));
  } catch {
    return { ok: false, reason: 'malformed' };
  }
  if (!valid) return { ok: false, reason: 'bad signature' };
  const passKeyHex = toHex(await passKeyOf(raw));
  if (!registeredPassKeys.has(passKeyHex)) return { ok: false, reason: 'not checked in' };
  if (admitted.has(passKeyHex)) return { ok: false, reason: 'already admitted' };
  admitted.add(passKeyHex);
  return { ok: true, passKeyHex };
}
