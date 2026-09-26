import type * as __compactRuntime from '@midnight-ntwrk/compact-runtime';

export enum Phase { draw = 0, closing = 1, drawn = 2, sale = 3, closed = 4 }

export type Show = { organizer: Uint8Array;
                     faceValue: bigint;
                     capacity: bigint;
                     perFanCap: bigint;
                     phase: Phase;
                     seedCommit: Uint8Array;
                     beaconRound: bigint;
                     revealBy: bigint;
                     organizerDefaulted: boolean;
                     beacon: bigint;
                     seed: bigint;
                     entropy: bigint;
                     entries: bigint;
                     offset: bigint;
                     issued: bigint;
                     pool: bigint;
                     returned: bigint;
                     checkedIn: bigint;
                     revenue: bigint
                   };

export type Witnesses<PS> = {
  roleSecret(context: __compactRuntime.WitnessContext<Ledger, PS>): [PS, Uint8Array];
  fanSecret(context: __compactRuntime.WitnessContext<Ledger, PS>): [PS, Uint8Array];
  fanPath(context: __compactRuntime.WitnessContext<Ledger, PS>,
          leaf_0: Uint8Array): [PS, { leaf: Uint8Array,
                                      path: { sibling: { field: bigint },
                                              goes_left: boolean
                                            }[]
                                    }];
  ticketPath(context: __compactRuntime.WitnessContext<Ledger, PS>,
             leaf_0: Uint8Array): [PS, { leaf: Uint8Array,
                                         path: { sibling: { field: bigint },
                                                 goes_left: boolean
                                               }[]
                                       }];
  entryContribution(context: __compactRuntime.WitnessContext<Ledger, PS>): [PS, bigint];
  entryIndexOf(context: __compactRuntime.WitnessContext<Ledger, PS>,
               showId_0: Uint8Array,
               tag_0: Uint8Array): [PS, bigint];
  divRem(context: __compactRuntime.WitnessContext<Ledger, PS>,
         total_0: bigint,
         n_0: bigint): [PS, [bigint, bigint]];
}

export type ImpureCircuits<PS> = {
  enrollBatch(context: __compactRuntime.CircuitContext<PS>,
              leaves_0: Uint8Array[]): __compactRuntime.CircuitResults<PS, []>;
  createShow(context: __compactRuntime.CircuitContext<PS>,
             showId_0: Uint8Array,
             faceValue_0: bigint,
             capacity_0: bigint,
             perFanCap_0: bigint,
             seedCommit_0: Uint8Array,
             beaconRound_0: bigint,
             revealBy_0: bigint): __compactRuntime.CircuitResults<PS, []>;
  revealDraw(context: __compactRuntime.CircuitContext<PS>,
             showId_0: Uint8Array,
             seed_0: bigint,
             salt_0: Uint8Array,
             beacon_0: bigint): __compactRuntime.CircuitResults<PS, []>;
  advance(context: __compactRuntime.CircuitContext<PS>, showId_0: Uint8Array): __compactRuntime.CircuitResults<PS, []>;
  withdraw(context: __compactRuntime.CircuitContext<PS>, showId_0: Uint8Array): __compactRuntime.CircuitResults<PS, []>;
  enterDraw(context: __compactRuntime.CircuitContext<PS>, showId_0: Uint8Array): __compactRuntime.CircuitResults<PS, []>;
  claimTicket(context: __compactRuntime.CircuitContext<PS>,
              showId_0: Uint8Array,
              slot_0: bigint,
              coin_0: { nonce: Uint8Array, color: Uint8Array, value: bigint }): __compactRuntime.CircuitResults<PS, []>;
  buyFromPool(context: __compactRuntime.CircuitContext<PS>,
              showId_0: Uint8Array,
              slot_0: bigint,
              coin_0: { nonce: Uint8Array, color: Uint8Array, value: bigint }): __compactRuntime.CircuitResults<PS, []>;
  returnTicket(context: __compactRuntime.CircuitContext<PS>,
               showId_0: Uint8Array,
               slot_0: bigint): __compactRuntime.CircuitResults<PS, []>;
  checkIn(context: __compactRuntime.CircuitContext<PS>,
          showId_0: Uint8Array,
          slot_0: bigint,
          passKey_0: Uint8Array): __compactRuntime.CircuitResults<PS, []>;
}

export type ProvableCircuits<PS> = {
  enrollBatch(context: __compactRuntime.CircuitContext<PS>,
              leaves_0: Uint8Array[]): __compactRuntime.CircuitResults<PS, []>;
  createShow(context: __compactRuntime.CircuitContext<PS>,
             showId_0: Uint8Array,
             faceValue_0: bigint,
             capacity_0: bigint,
             perFanCap_0: bigint,
             seedCommit_0: Uint8Array,
             beaconRound_0: bigint,
             revealBy_0: bigint): __compactRuntime.CircuitResults<PS, []>;
  revealDraw(context: __compactRuntime.CircuitContext<PS>,
             showId_0: Uint8Array,
             seed_0: bigint,
             salt_0: Uint8Array,
             beacon_0: bigint): __compactRuntime.CircuitResults<PS, []>;
  advance(context: __compactRuntime.CircuitContext<PS>, showId_0: Uint8Array): __compactRuntime.CircuitResults<PS, []>;
  withdraw(context: __compactRuntime.CircuitContext<PS>, showId_0: Uint8Array): __compactRuntime.CircuitResults<PS, []>;
  enterDraw(context: __compactRuntime.CircuitContext<PS>, showId_0: Uint8Array): __compactRuntime.CircuitResults<PS, []>;
  claimTicket(context: __compactRuntime.CircuitContext<PS>,
              showId_0: Uint8Array,
              slot_0: bigint,
              coin_0: { nonce: Uint8Array, color: Uint8Array, value: bigint }): __compactRuntime.CircuitResults<PS, []>;
  buyFromPool(context: __compactRuntime.CircuitContext<PS>,
              showId_0: Uint8Array,
              slot_0: bigint,
              coin_0: { nonce: Uint8Array, color: Uint8Array, value: bigint }): __compactRuntime.CircuitResults<PS, []>;
  returnTicket(context: __compactRuntime.CircuitContext<PS>,
               showId_0: Uint8Array,
               slot_0: bigint): __compactRuntime.CircuitResults<PS, []>;
  checkIn(context: __compactRuntime.CircuitContext<PS>,
          showId_0: Uint8Array,
          slot_0: bigint,
          passKey_0: Uint8Array): __compactRuntime.CircuitResults<PS, []>;
}

export type PureCircuits = {
  rolePk(sk_0: Uint8Array): Uint8Array;
  fanLeaf(fsk_0: Uint8Array): Uint8Array;
  entryTag(showId_0: Uint8Array, fsk_0: Uint8Array): Uint8Array;
  entryKey(showId_0: Uint8Array, index_0: bigint): Uint8Array;
  slotNullifier(showId_0: Uint8Array, fsk_0: Uint8Array, slot_0: bigint): Uint8Array;
  ticketCommit(showId_0: Uint8Array, fsk_0: Uint8Array, slot_0: bigint): Uint8Array;
  ticketNullifier(showId_0: Uint8Array, fsk_0: Uint8Array, slot_0: bigint): Uint8Array;
  seedCommitment(seed_0: bigint, salt_0: Uint8Array): Uint8Array;
  windowPosition(index_0: bigint, offset_0: bigint, n_0: bigint): bigint;
}

export type Circuits<PS> = {
  rolePk(context: __compactRuntime.CircuitContext<PS>, sk_0: Uint8Array): __compactRuntime.CircuitResults<PS, Uint8Array>;
  fanLeaf(context: __compactRuntime.CircuitContext<PS>, fsk_0: Uint8Array): __compactRuntime.CircuitResults<PS, Uint8Array>;
  entryTag(context: __compactRuntime.CircuitContext<PS>,
           showId_0: Uint8Array,
           fsk_0: Uint8Array): __compactRuntime.CircuitResults<PS, Uint8Array>;
  entryKey(context: __compactRuntime.CircuitContext<PS>,
           showId_0: Uint8Array,
           index_0: bigint): __compactRuntime.CircuitResults<PS, Uint8Array>;
  slotNullifier(context: __compactRuntime.CircuitContext<PS>,
                showId_0: Uint8Array,
                fsk_0: Uint8Array,
                slot_0: bigint): __compactRuntime.CircuitResults<PS, Uint8Array>;
  ticketCommit(context: __compactRuntime.CircuitContext<PS>,
               showId_0: Uint8Array,
               fsk_0: Uint8Array,
               slot_0: bigint): __compactRuntime.CircuitResults<PS, Uint8Array>;
  ticketNullifier(context: __compactRuntime.CircuitContext<PS>,
                  showId_0: Uint8Array,
                  fsk_0: Uint8Array,
                  slot_0: bigint): __compactRuntime.CircuitResults<PS, Uint8Array>;
  seedCommitment(context: __compactRuntime.CircuitContext<PS>,
                 seed_0: bigint,
                 salt_0: Uint8Array): __compactRuntime.CircuitResults<PS, Uint8Array>;
  windowPosition(context: __compactRuntime.CircuitContext<PS>,
                 index_0: bigint,
                 offset_0: bigint,
                 n_0: bigint): __compactRuntime.CircuitResults<PS, bigint>;
  enrollBatch(context: __compactRuntime.CircuitContext<PS>,
              leaves_0: Uint8Array[]): __compactRuntime.CircuitResults<PS, []>;
  createShow(context: __compactRuntime.CircuitContext<PS>,
             showId_0: Uint8Array,
             faceValue_0: bigint,
             capacity_0: bigint,
             perFanCap_0: bigint,
             seedCommit_0: Uint8Array,
             beaconRound_0: bigint,
             revealBy_0: bigint): __compactRuntime.CircuitResults<PS, []>;
  revealDraw(context: __compactRuntime.CircuitContext<PS>,
             showId_0: Uint8Array,
             seed_0: bigint,
             salt_0: Uint8Array,
             beacon_0: bigint): __compactRuntime.CircuitResults<PS, []>;
  advance(context: __compactRuntime.CircuitContext<PS>, showId_0: Uint8Array): __compactRuntime.CircuitResults<PS, []>;
  withdraw(context: __compactRuntime.CircuitContext<PS>, showId_0: Uint8Array): __compactRuntime.CircuitResults<PS, []>;
  enterDraw(context: __compactRuntime.CircuitContext<PS>, showId_0: Uint8Array): __compactRuntime.CircuitResults<PS, []>;
  claimTicket(context: __compactRuntime.CircuitContext<PS>,
              showId_0: Uint8Array,
              slot_0: bigint,
              coin_0: { nonce: Uint8Array, color: Uint8Array, value: bigint }): __compactRuntime.CircuitResults<PS, []>;
  buyFromPool(context: __compactRuntime.CircuitContext<PS>,
              showId_0: Uint8Array,
              slot_0: bigint,
              coin_0: { nonce: Uint8Array, color: Uint8Array, value: bigint }): __compactRuntime.CircuitResults<PS, []>;
  returnTicket(context: __compactRuntime.CircuitContext<PS>,
               showId_0: Uint8Array,
               slot_0: bigint): __compactRuntime.CircuitResults<PS, []>;
  checkIn(context: __compactRuntime.CircuitContext<PS>,
          showId_0: Uint8Array,
          slot_0: bigint,
          passKey_0: Uint8Array): __compactRuntime.CircuitResults<PS, []>;
}

export type Ledger = {
  readonly issuer: Uint8Array;
  readonly payToken: Uint8Array;
  fans: {
    isFull(): boolean;
    checkRoot(rt_0: { field: bigint }): boolean;
    root(): __compactRuntime.MerkleTreeDigest;
    firstFree(): bigint;
    pathForLeaf(index_0: bigint, leaf_0: Uint8Array): __compactRuntime.MerkleTreePath<Uint8Array>;
    findPathForLeaf(leaf_0: Uint8Array): __compactRuntime.MerkleTreePath<Uint8Array> | undefined;
    history(): Iterator<__compactRuntime.MerkleTreeDigest>
  };
  readonly enrolled: bigint;
  shows: {
    isEmpty(): boolean;
    size(): bigint;
    member(key_0: Uint8Array): boolean;
    lookup(key_0: Uint8Array): Show;
    [Symbol.iterator](): Iterator<[Uint8Array, Show]>
  };
  entryTags: {
    isEmpty(): boolean;
    size(): bigint;
    member(elem_0: Uint8Array): boolean;
    [Symbol.iterator](): Iterator<Uint8Array>
  };
  entryAt: {
    isEmpty(): boolean;
    size(): bigint;
    member(key_0: Uint8Array): boolean;
    lookup(key_0: Uint8Array): Uint8Array;
    [Symbol.iterator](): Iterator<[Uint8Array, Uint8Array]>
  };
  claimed: {
    isEmpty(): boolean;
    size(): bigint;
    member(elem_0: Uint8Array): boolean;
    [Symbol.iterator](): Iterator<Uint8Array>
  };
  slots: {
    isEmpty(): boolean;
    size(): bigint;
    member(elem_0: Uint8Array): boolean;
    [Symbol.iterator](): Iterator<Uint8Array>
  };
  tickets: {
    isFull(): boolean;
    checkRoot(rt_0: { field: bigint }): boolean;
    root(): __compactRuntime.MerkleTreeDigest;
    firstFree(): bigint;
    pathForLeaf(index_0: bigint, leaf_0: Uint8Array): __compactRuntime.MerkleTreePath<Uint8Array>;
    findPathForLeaf(leaf_0: Uint8Array): __compactRuntime.MerkleTreePath<Uint8Array> | undefined;
    history(): Iterator<__compactRuntime.MerkleTreeDigest>
  };
  spent: {
    isEmpty(): boolean;
    size(): bigint;
    member(elem_0: Uint8Array): boolean;
    [Symbol.iterator](): Iterator<Uint8Array>
  };
  passes: {
    isEmpty(): boolean;
    size(): bigint;
    member(key_0: Uint8Array): boolean;
    lookup(key_0: Uint8Array): Uint8Array;
    [Symbol.iterator](): Iterator<[Uint8Array, Uint8Array]>
  };
  readonly treasury: { nonce: Uint8Array,
                       color: Uint8Array,
                       value: bigint,
                       mt_index: bigint
                     };
  readonly hasTreasury: boolean;
}

export type ContractReferenceLocations = any;

export declare const contractReferenceLocations : ContractReferenceLocations;

export declare class Contract<PS = any, W extends Witnesses<PS> = Witnesses<PS>> {
  witnesses: W;
  circuits: Circuits<PS>;
  impureCircuits: ImpureCircuits<PS>;
  provableCircuits: ProvableCircuits<PS>;
  constructor(witnesses: W);
  initialState(context: __compactRuntime.ConstructorContext<PS>,
               issuerKey_0: Uint8Array,
               currency_0: Uint8Array): __compactRuntime.ConstructorResult<PS>;
}

export declare function ledger(state: __compactRuntime.StateValue | __compactRuntime.ChargedState): Ledger;
export declare const pureCircuits: PureCircuits;
