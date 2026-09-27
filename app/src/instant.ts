// "Try it now": runs the real compiled FaceValue circuits in the visitor's browser
// against an in-memory ledger. Every rule is the contract's own; nothing is saved on chain.
import {
  type CircuitContext,
  CostModel,
  QueryContext,
  createConstructorContext,
  sampleContractAddress,
} from '@midnight-ntwrk/compact-runtime';
import { Contract, ledger, pureCircuits } from '../../contract/src/managed/facevalue/contract/index.js';
import { type FaceValuePrivateState, createPrivateState, witnesses } from '../../contract/src/witnesses.js';
import { toHex } from './gatepass';

const rnd = (n = 32) => crypto.getRandomValues(new Uint8Array(n));

export type Actor = { name: string; state: FaceValuePrivateState; cpk: Uint8Array };
export const actor = (name: string): Actor => ({ name, state: createPrivateState(rnd(), rnd()), cpk: rnd() });

type Circuits = Contract<FaceValuePrivateState>['impureCircuits'];

export class Instant {
  readonly contract = new Contract<FaceValuePrivateState>(witnesses);
  readonly currency = rnd();
  readonly showId = rnd();
  readonly issuer = actor('Verifier');
  readonly organizer = actor('Organizer');
  readonly seed = BigInt(crypto.getRandomValues(new Uint32Array(1))[0]);
  readonly salt = rnd();
  ctx: CircuitContext<FaceValuePrivateState>;

  constructor(readonly capacity = 3n, readonly perFanCap = 2n, readonly face = 110_000n) {
    const init = this.contract.initialState(
      createConstructorContext(this.issuer.state, toHex(this.issuer.cpk)),
      pureCircuits.rolePk(this.issuer.state.roleSecret),
      this.currency,
    );
    this.ctx = {
      currentPrivateState: init.currentPrivateState,
      currentZswapLocalState: init.currentZswapLocalState,
      costModel: CostModel.initialCostModel(),
      currentQueryContext: new QueryContext(init.currentContractState.data, sampleContractAddress()),
    };
    this.as(this.organizer, (c, x) =>
      c.createShow(x, this.showId, face, capacity, perFanCap, pureCircuits.seedCommitment(this.seed, this.salt), 1n, 4_000_000_000n),
    );
  }

  get ledger() {
    return ledger(this.ctx.currentQueryContext.state);
  }
  get show() {
    return this.ledger.shows.lookup(this.showId);
  }

  /** Runs one circuit as `who`. Throws the contract's own error if a rule is broken. */
  as<R>(who: Actor, run: (c: Circuits, x: CircuitContext<FaceValuePrivateState>) => { context: CircuitContext<FaceValuePrivateState>; result: R }): R {
    const x = {
      ...this.ctx,
      currentPrivateState: who.state,
      currentZswapLocalState: { ...this.ctx.currentZswapLocalState, coinPublicKey: { bytes: who.cpk } },
    } as CircuitContext<FaceValuePrivateState>;
    const out = run(this.contract.impureCircuits, x);
    this.ctx = { ...out.context };
    return out.result;
  }

  coin(value = this.face) {
    return { nonce: rnd(), color: this.currency, value };
  }

  enroll(...fans: Actor[]) {
    const leaves = fans.map((f) => pureCircuits.fanLeaf(f.state.fanSecret));
    while (leaves.length % 4) leaves.push(new Uint8Array(32));
    for (let i = 0; i < leaves.length; i += 4) this.as(this.issuer, (c, x) => c.enrollBatch(x, leaves.slice(i, i + 4)));
  }

  won(indexOf: number) {
    const s = this.show;
    return pureCircuits.windowPosition(BigInt(indexOf), s.offset, s.entries) < s.capacity;
  }

  reveal() {
    this.as(this.organizer, (c, x) => c.advance(x, this.showId));
    this.as(this.organizer, (c, x) => c.revealDraw(x, this.showId, this.seed, this.salt, BigInt(crypto.getRandomValues(new Uint32Array(1))[0])));
  }
}

/** Turns a contract refusal into the rule it enforced. */
export const ruleOf = (e: unknown) => {
  const m = String((e as Error)?.message ?? e);
  const hit = m.match(/failed assert: (.*)/i);
  return (hit?.[1] ?? m).split('\n')[0];
};
