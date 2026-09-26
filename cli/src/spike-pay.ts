// Real-network payment spike: mint shielded tKRW, pay it into a contract treasury,
// pay again (merge), then refund from the treasury. Proves contract-held shielded coins work.
import { deployContract } from '@midnight-ntwrk/midnight-js-contracts';
import { CompiledContract } from '@midnight-ntwrk/midnight-js-protocol/compact-js';
import { encodeRawTokenType, rawTokenType } from '@midnight-ntwrk/compact-runtime';
import { NodeZkConfigProvider } from '@midnight-ntwrk/midnight-js-node-zk-config-provider';
import { httpClientProofProvider } from '@midnight-ntwrk/midnight-js-http-client-proof-provider';
import path from 'node:path';
import * as Pay from '../../contract/src/managed/pay/contract/index.js';
import { GENESIS_SEED, SeedWallet, buildProviders, environments, logger, waitForDust, waitForSync, zkConfigPath } from './network.js';

const env = environments[(process.argv[2] ?? 'local') as 'local' | 'preprod'];
const payZk = path.resolve(zkConfigPath, '..', 'pay');
const pad32 = (s: string) => {
  const o = new Uint8Array(32);
  o.set(new TextEncoder().encode(s));
  return o;
};

const Compiled = CompiledContract.make<Pay.Contract<undefined>>('Pay', Pay.Contract<undefined>).pipe(
  CompiledContract.withVacantWitnesses,
  CompiledContract.withCompiledFileAssets(payZk),
);

const w = await SeedWallet.build(env, process.env.FV_SEED ?? GENESIS_SEED);
await w.start();
await waitForSync(w);
await waitForDust(w);
const zk = new NodeZkConfigProvider<string>(payZk);
const providers = { ...buildProviders(w, `pay-spike-${Date.now()}`), zkConfigProvider: zk, proofProvider: httpClientProofProvider(env.proofServer, zk) };

const t = Date.now();
const c = (await deployContract(providers as never, { compiledContract: Compiled } as never)) as never as {
  deployTxData: { public: { contractAddress: string } };
  callTx: Record<string, (...a: unknown[]) => Promise<{ public: { txHash: string } }>>;
};
const addr = c.deployTxData.public.contractAddress;
logger.info(`✔ deployed pay spike at ${addr} (${Date.now() - t} ms)`);
const color = encodeRawTokenType(rawTokenType(pad32('facevalue:tKRW'), addr as never));
const coin = (v: bigint) => ({ nonce: crypto.getRandomValues(new Uint8Array(32)), color, value: v });
const step = async (name: string, f: () => Promise<{ public: { txHash: string } }>) => {
  const s = Date.now();
  const r = await f();
  logger.info(`✔ ${name} in ${((Date.now() - s) / 1000).toFixed(1)}s tx ${r.public.txHash}`);
};
await step('faucet 1,000,000 tKRW', () => c.callTx.faucet(1_000_000n));
await step('pay 110,000 (first coin → treasury)', () => c.callTx.pay(coin(110_000n)));
await step('pay 110,000 (merge into treasury)', () => c.callTx.pay(coin(110_000n)));
await step('refund 110,000 from treasury', () => c.callTx.refund(110_000n));
const st = Pay.ledger((await providers.publicDataProvider.queryContractState(addr))!.data);
logger.info(`treasury value ${st.treasury.value}, mt_index ${st.treasury.mt_index}, paidIn ${st.paidIn}, refundedOut ${st.refundedOut}`);
logger.info('PAYMENT SPIKE PASSED');
await w.stop();
process.exit(0);
