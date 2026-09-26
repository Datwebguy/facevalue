// Network plumbing shared by the CLI, e2e run and attack scripts:
// environments (local devnet / preprod), a seed-based wallet, and midnight-js providers.
// Adapted from midnightntwrk/example-bboard (Apache-2.0).
import { WebSocket } from 'ws';
import * as Rx from 'rxjs';
import pino, { type Logger } from 'pino';
import {
  DustSecretKey,
  LedgerParameters,
  ZswapSecretKeys,
  type CoinPublicKey,
  type EncPublicKey,
  type FinalizedTransaction,
} from '@midnight-ntwrk/midnight-js-protocol/ledger';
import type { MidnightProvider, UnboundTransaction, WalletProvider } from '@midnight-ntwrk/midnight-js-types';
import { ttlOneHour } from '@midnight-ntwrk/midnight-js-utils';
import { setNetworkId } from '@midnight-ntwrk/midnight-js-network-id';
import { type DustWalletOptions, type EnvironmentConfiguration, FluentWalletBuilder } from '@midnight-ntwrk/testkit-js';
import type { FacadeState, WalletFacade } from '@midnight-ntwrk/wallet-sdk-facade';
import { levelPrivateStateProvider } from '@midnight-ntwrk/midnight-js-level-private-state-provider';
import { indexerPublicDataProvider } from '@midnight-ntwrk/midnight-js-indexer-public-data-provider';
import { httpClientProofProvider } from '@midnight-ntwrk/midnight-js-http-client-proof-provider';
import { NodeZkConfigProvider } from '@midnight-ntwrk/midnight-js-node-zk-config-provider';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

(globalThis as unknown as { WebSocket: typeof WebSocket }).WebSocket = WebSocket;

export const logger: Logger = pino({ level: process.env.LOG_LEVEL ?? 'info', transport: { target: 'pino-pretty' } });

const here = path.dirname(fileURLToPath(import.meta.url));
export const zkConfigPath = path.resolve(here, '..', '..', 'contract', 'src', 'managed', 'facevalue');

/** Genesis-funded seed of the local dev node (standalone networks only). */
export const GENESIS_SEED = '0000000000000000000000000000000000000000000000000000000000000001';

export const environments: Record<'local' | 'preprod', EnvironmentConfiguration> = {
  local: {
    walletNetworkId: 'undeployed',
    networkId: 'undeployed',
    indexer: 'http://127.0.0.1:8088/api/v4/graphql',
    indexerWS: 'ws://127.0.0.1:8088/api/v4/graphql/ws',
    node: 'http://127.0.0.1:9944',
    nodeWS: 'ws://127.0.0.1:9944',
    proofServer: 'http://127.0.0.1:6300',
  } as EnvironmentConfiguration,
  preprod: {
    walletNetworkId: 'preprod',
    networkId: 'preprod',
    indexer: 'https://indexer.preprod.midnight.network/api/v4/graphql',
    indexerWS: 'wss://indexer.preprod.midnight.network/api/v4/graphql/ws',
    node: 'https://rpc.preprod.midnight.network',
    nodeWS: 'wss://rpc.preprod.midnight.network',
    faucet: 'https://midnight-tmnight-preprod.nethermind.dev/',
    proofServer: process.env.PROOF_SERVER ?? 'http://127.0.0.1:6300',
  } as EnvironmentConfiguration,
};

type UnshieldedKeystore = { getPublicKey(): unknown; signData(payload: Uint8Array): string };

export class SeedWallet implements MidnightProvider, WalletProvider {
  private constructor(
    readonly env: EnvironmentConfiguration,
    readonly wallet: WalletFacade,
    readonly zswapSecretKeys: ZswapSecretKeys,
    readonly dustSecretKey: DustSecretKey,
    readonly keystore: UnshieldedKeystore,
    readonly seed: string,
  ) {}

  getCoinPublicKey(): CoinPublicKey {
    return this.zswapSecretKeys.coinPublicKey;
  }
  getEncryptionPublicKey(): EncPublicKey {
    return this.zswapSecretKeys.encryptionPublicKey;
  }
  async balanceTx(tx: UnboundTransaction, ttl: Date = ttlOneHour()): Promise<FinalizedTransaction> {
    const recipe = await this.wallet.balanceUnboundTransaction(
      tx,
      { shieldedSecretKeys: this.zswapSecretKeys, dustSecretKey: this.dustSecretKey },
      { ttl },
    );
    const signed = await this.wallet.signRecipe(recipe, (payload) => this.keystore.signData(payload));
    return this.wallet.finalizeRecipe(signed);
  }
  submitTx(tx: FinalizedTransaction): Promise<string> {
    return this.wallet.submitTransaction(tx);
  }
  async start() {
    await this.wallet.start(this.zswapSecretKeys, this.dustSecretKey);
  }
  stop() {
    return this.wallet.stop();
  }

  static async build(env: EnvironmentConfiguration, seed?: string): Promise<SeedWallet> {
    setNetworkId(env.networkId as never);
    const dustOptions: DustWalletOptions = {
      ledgerParams: LedgerParameters.initialParameters(),
      additionalFeeOverhead: env.walletNetworkId === 'undeployed' ? 500_000_000_000_000_000n : 1_000n,
      feeBlocksMargin: 5,
    };
    const builder = FluentWalletBuilder.forEnvironment(env).withDustOptions(dustOptions);
    const built = (seed ? await builder.withSeed(seed).buildWithoutStarting() : await builder.withRandomSeed().buildWithoutStarting()) as unknown as {
      wallet: WalletFacade;
      seeds: { masterSeed: string; shielded: Uint8Array; dust: Uint8Array };
      keystore: UnshieldedKeystore;
    };
    return new SeedWallet(
      env,
      built.wallet,
      ZswapSecretKeys.fromSeed(built.seeds.shielded),
      DustSecretKey.fromSeed(built.seeds.dust),
      built.keystore,
      built.seeds.masterSeed,
    );
  }
}

const strictlyComplete = (p: unknown) =>
  !!p && typeof (p as { isStrictlyComplete?: unknown }).isStrictlyComplete === 'function' &&
  (p as { isStrictlyComplete: () => boolean }).isStrictlyComplete();

export const isSynced = (s: FacadeState) =>
  strictlyComplete(s.shielded.state.progress) && strictlyComplete(s.dust.state.progress) && strictlyComplete(s.unshielded.progress);

export const waitForSync = (w: SeedWallet) =>
  Rx.firstValueFrom(w.wallet.state().pipe(Rx.throttleTime(1_000), Rx.filter(isSynced)));

/** Waits until the wallet can pay fees (has DUST). */
export const waitForDust = (w: SeedWallet) =>
  Rx.firstValueFrom(w.wallet.state().pipe(Rx.throttleTime(1_000), Rx.filter((s) => isSynced(s) && s.dust.balance(new Date()) > 0n)));

export const buildProviders = <PS>(w: SeedWallet, storeName: string) => {
  const zkConfigProvider = new NodeZkConfigProvider<string>(zkConfigPath);
  return {
    privateStateProvider: levelPrivateStateProvider<string, PS>({
      privateStateStoreName: storeName,
      signingKeyStoreName: `${storeName}-signing-keys`,
      privateStoragePasswordProvider: () => process.env.FV_STORE_PASSWORD ?? 'FaceValue-Local-Dev-2026!',
      accountId: w.seed,
    }),
    publicDataProvider: indexerPublicDataProvider(w.env.indexer, w.env.indexerWS),
    zkConfigProvider,
    proofProvider: httpClientProofProvider(w.env.proofServer, zkConfigProvider),
    walletProvider: w,
    midnightProvider: w,
  };
};

/**
 * Preprod: make sure the wallet has tNIGHT (free faucet) and tDUST (fees), in one session.
 * Local devnet: the genesis wallet already has both.
 */
export async function ensureFunded(w: SeedWallet): Promise<void> {
  const { FaucetClient } = await import('@midnight-ntwrk/testkit-js');
  const { UnshieldedAddress } = await import('@midnight-ntwrk/wallet-sdk-address-format');
  const { getNetworkId } = await import('@midnight-ntwrk/midnight-js-network-id');
  const { unshieldedToken } = await import('@midnight-ntwrk/midnight-js-protocol/ledger');
  let s = await waitForSync(w);
  const night = () => s.unshielded.balances[unshieldedToken().raw] ?? 0n;
  if (night() === 0n && w.env.faucet) {
    const address = UnshieldedAddress.codec.encode(getNetworkId(), s.unshielded.address).toString();
    logger.info(`requesting tNIGHT from the faucet for ${address}`);
    await new FaucetClient(w.env.faucet, logger).requestTokens(address);
    s = await Rx.firstValueFrom(
      w.wallet.state().pipe(Rx.throttleTime(3000), Rx.filter((x) => isSynced(x) && (x.unshielded.balances[unshieldedToken().raw] ?? 0n) > 0n)),
    );
  }
  logger.info(`tNIGHT balance ${night()}`);
  if (s.dust.balance(new Date()) === 0n) {
    const utxos = s.unshielded.availableCoins.filter((c) => !c.meta.registeredForDustGeneration);
    if (utxos.length) {
      const dustState = await w.wallet.dust.waitForSyncedState();
      const recipe = await w.wallet.registerNightUtxosForDustGeneration(
        utxos,
        w.keystore.getPublicKey() as never,
        (p) => w.keystore.signData(p),
        dustState.address,
      );
      const tx = await w.wallet.finalizeRecipe(recipe);
      logger.info(`dust registration tx ${await w.wallet.submitTransaction(tx)}`);
    }
    await waitForDust(w);
  }
  logger.info('wallet has tDUST for fees');
}
