// Witnesses run on the user's own device. Nothing here is sent anywhere except
// through a zero-knowledge proof, and only the values the contract discloses
// (nullifiers, commitments, comparison results) become public.
import type { WitnessContext } from '@midnight-ntwrk/compact-runtime';
import { type Ledger, pureCircuits } from './managed/facevalue/contract/index.js';

export type FaceValuePrivateState = {
  /** Secret behind an issuer/organizer role key. */
  readonly roleSecret: Uint8Array;
  /** The fan's credential secret. Its hash is the fan's registry leaf. */
  readonly fanSecret: Uint8Array;
};

export const createPrivateState = (roleSecret: Uint8Array, fanSecret: Uint8Array): FaceValuePrivateState => ({
  roleSecret,
  fanSecret,
});

type Ctx = WitnessContext<Ledger, FaceValuePrivateState>;

const randomUint32 = (): bigint => {
  const b = new Uint32Array(1);
  crypto.getRandomValues(b);
  return BigInt(b[0]);
};

const eq = (a: Uint8Array, b: Uint8Array) => a.length === b.length && a.every((x, i) => x === b[i]);

export const witnesses = {
  roleSecret: ({ privateState }: Ctx): [FaceValuePrivateState, Uint8Array] => [privateState, privateState.roleSecret],

  fanSecret: ({ privateState }: Ctx): [FaceValuePrivateState, Uint8Array] => [privateState, privateState.fanSecret],

  fanPath: ({ privateState, ledger }: Ctx, leaf: Uint8Array) => {
    const path = ledger.fans.findPathForLeaf(leaf);
    if (!path) throw new Error('This fan is not in the verified registry yet');
    return [privateState, path] as [FaceValuePrivateState, typeof path];
  },

  ticketPath: ({ privateState, ledger }: Ctx, leaf: Uint8Array) => {
    const path = ledger.tickets.findPathForLeaf(leaf);
    if (!path) throw new Error('No such ticket for this fan');
    return [privateState, path] as [FaceValuePrivateState, typeof path];
  },

  entryContribution: ({ privateState }: Ctx): [FaceValuePrivateState, bigint] => [privateState, randomUint32()],

  entryIndexOf: ({ privateState, ledger }: Ctx, showId: Uint8Array, tag: Uint8Array): [FaceValuePrivateState, bigint] => {
    const entries = ledger.shows.lookup(showId).entries;
    for (let i = 0n; i < entries; i++) {
      const key = pureCircuits.entryKey(showId, i);
      if (ledger.entryAt.member(key) && eq(ledger.entryAt.lookup(key), tag)) return [privateState, i];
    }
    throw new Error('No draw entry found for this fan');
  },

  divRem: ({ privateState }: Ctx, total: bigint, n: bigint): [FaceValuePrivateState, [bigint, bigint]] => [
    privateState,
    [total / n, total % n],
  ],
};
