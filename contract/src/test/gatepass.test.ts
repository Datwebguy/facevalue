import { describe, expect, it } from 'vitest';
import { createPassKey, signPass, toHex, verifyPass, WINDOW_MS } from '../../../app/src/gatepass.js';

const SHOW = 'ab'.repeat(32);

describe('gate pass (offline verification)', () => {
  it('admits a checked-in phone once, in milliseconds', async () => {
    const k = await createPassKey();
    const registered = new Set([toHex(k.passKey)]);
    const admitted = new Set<string>();
    const qr = await signPass(k.keyPair.privateKey, k.rawPublicKey, SHOW);
    const t0 = performance.now();
    expect(await verifyPass(qr, SHOW, registered, admitted)).toMatchObject({ ok: true });
    expect(performance.now() - t0).toBeLessThan(200);
    expect(await verifyPass(qr, SHOW, registered, admitted)).toEqual({ ok: false, reason: 'already admitted' });
  });

  it('rejects a phone that never checked in', async () => {
    const k = await createPassKey();
    const qr = await signPass(k.keyPair.privateKey, k.rawPublicKey, SHOW);
    expect(await verifyPass(qr, SHOW, new Set(), new Set())).toEqual({ ok: false, reason: 'not checked in' });
  });

  it('rejects an old screenshot', async () => {
    const k = await createPassKey();
    const qr = await signPass(k.keyPair.privateKey, k.rawPublicKey, SHOW, Date.now() - 5 * WINDOW_MS);
    expect(await verifyPass(qr, SHOW, new Set([toHex(k.passKey)]), new Set())).toEqual({ ok: false, reason: 'expired' });
  });

  it("rejects a pass signed by a different key than the registered one", async () => {
    const real = await createPassKey();
    const forger = await createPassKey();
    const qr = await signPass(forger.keyPair.privateKey, real.rawPublicKey, SHOW);
    expect(await verifyPass(qr, SHOW, new Set([toHex(real.passKey)]), new Set())).toEqual({ ok: false, reason: 'bad signature' });
  });

  it('rejects a pass for another show', async () => {
    const k = await createPassKey();
    const qr = await signPass(k.keyPair.privateKey, k.rawPublicKey, 'cd'.repeat(32));
    expect(await verifyPass(qr, SHOW, new Set([toHex(k.passKey)]), new Set())).toEqual({ ok: false, reason: 'wrong show' });
  });
});
