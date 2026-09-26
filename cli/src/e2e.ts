// End-to-end run of the whole FaceValue lifecycle on a real Midnight network,
// with real zero-knowledge proofs from the proof server.
//
//   npx tsx cli/src/e2e.ts local      # local devnet (npm run localnet)
//   npx tsx cli/src/e2e.ts preprod    # Midnight Preprod (needs FV_SEED of a funded wallet with DUST)
//
// Every transaction hash and timing is written to docs/evidence/<network>-run.json.
import { deployContract, findDeployedContract } from '@midnight-ntwrk/midnight-js-contracts';
import { encodeRawTokenType, rawTokenType } from '@midnight-ntwrk/compact-runtime';
import { CompiledContract } from '@midnight-ntwrk/midnight-js-protocol/compact-js';
import { NodeZkConfigProvider } from '@midnight-ntwrk/midnight-js-node-zk-config-provider';
import { httpClientProofProvider } from '@midnight-ntwrk/midnight-js-http-client-proof-provider';
import * as Tkrw from '../../contract/src/managed/tkrw/contract/index.js';
import { writeFileSync, mkdirSync } from 'node:fs';
import path from 'node:path';
import {
  CompiledFaceValue,
  createPrivateState,
  ledger as readLedger,
  pureCircuits,
  type FaceValuePrivateState,
} from '../../contract/src/index.js';
import { GENESIS_SEED, SeedWallet, buildProviders, environments, logger, waitForDust, waitForSync, zkConfigPath } from './network.js';

const net = (process.argv[2] ?? 'local') as 'local' | 'preprod';
const env = environments[net];

const rnd = (n = 32) => crypto.getRandomValues(new Uint8Array(n));
const hex = (b: Uint8Array) => Buffer.from(b).toString('hex');
const pad32 = (s: string) => {
  const out = new Uint8Array(32);
  out.set(new TextEncoder().encode(s));
  return out;
};

type Step = { step: string; actor: string; txHash?: string; blockHeight?: number; ms: number; note?: string };
const steps: Step[] = [];

const FACE = 110_000n;
const CAPACITY = 2n;
const PER_FAN_CAP = 2n;
const SEED = BigInt(new DataView(rnd(4).buffer).getUint32(0));
const SALT = rnd();
const BEACON_ROUND = 5_000_000n;
const BEACON = 123_456_789n;

async function main() {
  logger.info(`FaceValue e2e on ${net} — proof server ${env.proofServer}, zk assets ${zkConfigPath}`);
  const wallet = await SeedWallet.build(env, process.env.FV_SEED ?? (net === 'local' ? GENESIS_SEED : undefined));
  await wallet.start();
  logger.info('syncing wallet…');
  await waitForSync(wallet);
  await waitForDust(wallet);
  logger.info('wallet synced with DUST for fees');

  const providers = buildProviders<FaceValuePrivateState>(wallet, `facevalue-${net}-${Date.now()}`);

  // Actors. On a real deployment each is a different device; here one wallet pays
  // fees for all of them, but each actor has its own private state (its own secrets).
  const actors = {
    issuer: createPrivateState(rnd(), rnd()),
    organizer: createPrivateState(rnd(), rnd()),
    minji: createPrivateState(rnd(), rnd()),
    joon: createPrivateState(rnd(), rnd()),
    seoyeon: createPrivateState(rnd(), rnd()),
  };

  const timed = async <T extends { public: { txHash: string; blockHeight?: number } }>(
    step: string,
    actor: string,
    fn: () => Promise<T>,
    note?: string,
  ) => {
    const t0 = Date.now();
    const r = await fn();
    const s: Step = { step, actor, txHash: r.public.txHash, blockHeight: r.public.blockHeight, ms: Date.now() - t0, note };
    steps.push(s);
    logger.info(`✔ ${step} (${actor}) in ${(s.ms / 1000).toFixed(1)}s — tx ${s.txHash}`);
    return r;
  };

  // tKRW: the shielded test-won stablecoin tickets are priced in (its own contract).
  const tkrwZk = path.resolve(zkConfigPath, '..', 'tkrw');
  const tkrwZkProvider = new NodeZkConfigProvider<string>(tkrwZk);
  const tkrwProviders = { ...providers, zkConfigProvider: tkrwZkProvider, proofProvider: httpClientProofProvider(env.proofServer, tkrwZkProvider) };
  const CompiledTkrw = CompiledContract.make<Tkrw.Contract<undefined>>('Tkrw', Tkrw.Contract<undefined>).pipe(
    CompiledContract.withVacantWitnesses,
    CompiledContract.withCompiledFileAssets(tkrwZk),
  );
  let t0 = Date.now();
  const tkrw = (await deployContract(tkrwProviders as never, { compiledContract: CompiledTkrw } as never)) as never as {
    deployTxData: { public: { contractAddress: string; txHash: string } };
    callTx: Record<string, (...a: unknown[]) => Promise<{ public: { txHash: string; blockHeight?: number } }>>;
  };
  const tkrwAddress = tkrw.deployTxData.public.contractAddress;
  steps.push({ step: 'deploy tKRW stablecoin', actor: 'issuer', txHash: tkrw.deployTxData.public.txHash, ms: Date.now() - t0 });
  logger.info(`✔ deployed tKRW at ${tkrwAddress}`);
  const color = encodeRawTokenType(rawTokenType(pad32('facevalue:tKRW'), tkrwAddress as never));

  t0 = Date.now();
  const deployed = await deployContract(providers, {
    compiledContract: CompiledFaceValue,
    args: [pureCircuits.rolePk(actors.issuer.roleSecret), color],
    privateStateId: 'issuer',
    initialPrivateState: actors.issuer,
  } as never);
  const address = (deployed as { deployTxData: { public: { contractAddress: string; txHash: string } } }).deployTxData.public.contractAddress;
  steps.push({ step: 'deploy FaceValue', actor: 'issuer', txHash: (deployed as never as { deployTxData: { public: { txHash: string } } }).deployTxData.public.txHash, ms: Date.now() - t0 });
  logger.info(`✔ deployed FaceValue at ${address}`);

  const join = async (id: keyof typeof actors) =>
    (await findDeployedContract(providers, {
      contractAddress: address,
    tkrwContract: tkrwAddress,
      compiledContract: CompiledFaceValue,
      privateStateId: id,
      initialPrivateState: actors[id],
    } as never)) as unknown as { callTx: Record<string, (...a: unknown[]) => Promise<{ public: { txHash: string; blockHeight?: number } }>> };

  const issuer = deployed as unknown as Awaited<ReturnType<typeof join>>;
  const organizer = await join('organizer');
  const fans = { minji: await join('minji'), joon: await join('joon'), seoyeon: await join('seoyeon') };

  const coin = (value: bigint) => ({ nonce: rnd(), color, value });

  const state = async () => readLedger((await providers.publicDataProvider.queryContractState(address))!.data);

  // 1. test currency
  await timed('mint 1,000,000 shielded tKRW to the wallet', 'minji', () => tkrw.callTx.mint(1_000_000n));

  // 2. enroll three verified fans in one batch
  await timed('enrollBatch (3 verified fans)', 'issuer', () =>
    issuer.callTx.enrollBatch([
      pureCircuits.fanLeaf(actors.minji.fanSecret),
      pureCircuits.fanLeaf(actors.joon.fanSecret),
      pureCircuits.fanLeaf(actors.seoyeon.fanSecret),
      new Uint8Array(32),
    ]),
  );

  // 3. show with a sealed seed
  const showId = rnd();
  await timed('createShow (sealed seed committed)', 'organizer', () =>
    organizer.callTx.createShow(showId, FACE, CAPACITY, PER_FAN_CAP, pureCircuits.seedCommitment(SEED, SALT), BEACON_ROUND),
  );

  // 4. draw
  for (const [name, f] of Object.entries(fans)) await timed('enterDraw', name, () => f.callTx.enterDraw(showId));
  await timed('advance: close entries', 'organizer', () => organizer.callTx.advance(showId));
  await timed('revealDraw', 'organizer', () => organizer.callTx.revealDraw(showId, SEED, SALT, BEACON));

  let s = (await state()).shows.lookup(showId);
  const order = Object.keys(fans) as (keyof typeof fans)[];
  const won = order.filter((_, i) => pureCircuits.windowPosition(BigInt(i), s.offset, s.entries) < s.capacity);
  const lost = order.filter((n) => !won.includes(n));
  logger.info(`draw offset ${s.offset}: winners ${won.join(', ')} · not drawn ${lost.join(', ')}`);

  // 5. winners pay face value in shielded tKRW
  for (const n of won) await timed('claimTicket (pay ₩110,000 shielded)', n, () => fans[n].callTx.claimTicket(showId, 0n, coin(FACE)));

  // 6. a winner returns their ticket: refunded, seat goes to the pool
  await timed('returnTicket (refund at face value)', won[0], () => fans[won[0]].callTx.returnTicket(showId, 0n));
  await timed('advance: open face-value pool', 'organizer', () => organizer.callTx.advance(showId));

  // 7. the fan who was not drawn buys the returned seat at face value
  await timed('buyFromPool (face value only)', lost[0], () => fans[lost[0]].callTx.buyFromPool(showId, 0n, coin(FACE)));

  // 8. check in at home with a one-time pass key; the gate only verifies a signature later
  const passKey = rnd();
  await timed('checkIn (register gate pass)', won[1], () => fans[won[1]].callTx.checkIn(showId, 0n, passKey));

  // 9. close and withdraw
  await timed('advance: close show', 'organizer', () => organizer.callTx.advance(showId));
  await timed('withdraw (organizer revenue)', 'organizer', () => organizer.callTx.withdraw(showId));

  s = (await state()).shows.lookup(showId);
  const summary = {
    network: net,
    contractAddress: address,
    tkrwContract: tkrwAddress,
    showId: hex(showId),
    finalShow: Object.fromEntries(Object.entries(s).map(([k, v]) => [k, v instanceof Uint8Array ? hex(v) : String(v)])),
    passRegistered: (await state()).passes.member(passKey),
    steps,
    ranAt: new Date().toISOString(),
  };
  const out = path.resolve('docs', 'evidence');
  mkdirSync(out, { recursive: true });
  writeFileSync(path.join(out, `${net}-run.json`), JSON.stringify(summary, null, 2));
  logger.info(`all ${steps.length} transactions succeeded — evidence written to docs/evidence/${net}-run.json`);
  await wallet.stop();
  process.exit(0);
}

main().catch((e) => {
  logger.error(e instanceof Error ? `${e.message}\n${e.stack}` : String(e));
  process.exit(1);
});
