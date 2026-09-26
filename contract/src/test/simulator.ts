// In-process simulator: runs the compiled circuits against an in-memory ledger.
// Used by unit tests and by the adversarial "attack" scripts.
import {
  type CircuitContext,
  CostModel,
  QueryContext,
  createConstructorContext,
  sampleContractAddress,
} from '@midnight-ntwrk/compact-runtime';
import { Contract, type Ledger, ledger, pureCircuits } from '../managed/facevalue/contract/index.js';
import { type FaceValuePrivateState, createPrivateState, witnesses } from '../witnesses.js';

export const randomBytes = (n: number): Uint8Array => {
  const b = new Uint8Array(n);
  crypto.getRandomValues(b);
  return b;
};

export type Actor = { name: string; state: FaceValuePrivateState; coinPublicKey: string };

export const makeActor = (name: string): Actor => ({
  name,
  state: createPrivateState(randomBytes(32), randomBytes(32)),
  coinPublicKey: Buffer.from(randomBytes(32)).toString('hex'),
});

export class FaceValueSim {
  readonly contract = new Contract<FaceValuePrivateState>(witnesses);
  ctx: CircuitContext<FaceValuePrivateState>;

  constructor(readonly issuer: Actor) {
    const init = this.contract.initialState(
      createConstructorContext(issuer.state, issuer.coinPublicKey),
      pureCircuits.rolePk(issuer.state.roleSecret),
    );
    this.ctx = {
      currentPrivateState: init.currentPrivateState,
      currentZswapLocalState: init.currentZswapLocalState,
      costModel: CostModel.initialCostModel(),
      currentQueryContext: new QueryContext(init.currentContractState.data, sampleContractAddress()),
    };
  }

  get ledger(): Ledger {
    return ledger(this.ctx.currentQueryContext.state);
  }

  /** Runs one circuit as `actor`. Throws if any assertion in the circuit fails. */
  as<R>(actor: Actor, run: (c: typeof this.contract.impureCircuits, ctx: CircuitContext<FaceValuePrivateState>) => { context: CircuitContext<FaceValuePrivateState>; result: R }): R {
    const ctx = {
      ...this.ctx,
      currentPrivateState: actor.state,
      currentZswapLocalState: { ...this.ctx.currentZswapLocalState, coinPublicKey: { bytes: Buffer.from(actor.coinPublicKey, 'hex') } },
    } as CircuitContext<FaceValuePrivateState>;
    const out = run(this.contract.impureCircuits, ctx);
    this.ctx = { ...out.context };
    return out.result;
  }

  show(id: Uint8Array) {
    return this.ledger.shows.lookup(id);
  }

  tkrw(): Uint8Array {
    return this.as(this.issuer, (c, ctx) => c.tkrwColor(ctx));
  }

  /** A fresh shielded coin of `value` tKRW, as a wallet would build it for a payment. */
  coin(value: bigint) {
    return { nonce: randomBytes(32), color: this.tkrw(), value };
  }
}
