// Read-only view of FaceValue contract state, straight from a Midnight indexer.
// No wallet needed: everything shown here is public by design.
import { ContractState } from '@midnight-ntwrk/compact-runtime';
import { ledger, Phase, type Ledger } from '../../contract/src/managed/facevalue/contract/index.js';
import { toHex } from './gatepass';

export const NETWORKS = {
  preprod: 'https://indexer.preprod.midnight.network/api/v4/graphql',
  local: 'http://127.0.0.1:8088/api/v4/graphql',
} as const;
export type NetworkName = keyof typeof NETWORKS;

const fromHex = (h: string) => Uint8Array.from(h.match(/.{2}/g) ?? [], (b) => parseInt(b, 16));

export async function readLedger(network: NetworkName, address: string): Promise<Ledger> {
  const res = await fetch(NETWORKS[network], {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({
      query: 'query($a: HexEncoded!) { contractAction(address: $a) { state } }',
      variables: { a: address },
    }),
  });
  const json = await res.json();
  const state = json?.data?.contractAction?.state;
  if (!state) throw new Error(`No FaceValue contract found at ${address} on ${network}`);
  return ledger(ContractState.deserialize(fromHex(state)).data);
}

export const phaseName: Record<number, string> = {
  [Phase.draw]: 'Draw open',
  [Phase.closing]: 'Entries closed',
  [Phase.drawn]: 'Winners claiming',
  [Phase.sale]: 'Face-value pool open',
  [Phase.closed]: 'Closed',
};

export type ShowView = ReturnType<typeof showsOf>[number];

export function showsOf(l: Ledger) {
  return [...l.shows].map(([id, s]) => ({
    id: toHex(id),
    ...s,
    live: s.issued - s.returned - s.checkedIn,
  }));
}

/** Pass keys registered on-chain for a show (what an offline gate syncs before doors open). */
export function passKeysFor(l: Ledger, showIdHex: string): Set<string> {
  const out = new Set<string>();
  for (const [pk, show] of l.passes) if (toHex(show) === showIdHex) out.add(toHex(pk));
  return out;
}
