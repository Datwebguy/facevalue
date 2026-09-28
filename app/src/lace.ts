// Browser providers backed by the Midnight Lace wallet (DApp connector API v4).
// Proofs are produced by the proof server Lace is configured with; Lace balances
// fees (tDUST) and submits. Adapted from midnightntwrk/example-bboard (Apache-2.0).
import { type ConnectedAPI, type InitialAPI } from '@midnight-ntwrk/dapp-connector-api';
import { FetchZkConfigProvider } from '@midnight-ntwrk/midnight-js-fetch-zk-config-provider';
import { httpClientProofProvider } from '@midnight-ntwrk/midnight-js-http-client-proof-provider';
import { indexerPublicDataProvider } from '@midnight-ntwrk/midnight-js-indexer-public-data-provider';
import { fromHex, toHex } from '@midnight-ntwrk/midnight-js-protocol/compact-runtime';
import { type FinalizedTransaction, Transaction } from '@midnight-ntwrk/midnight-js-protocol/ledger';
import { setNetworkId } from '@midnight-ntwrk/midnight-js-network-id';
import { findDeployedContract } from '@midnight-ntwrk/midnight-js-contracts';
import semver from 'semver';
import { CompiledFaceValue, type FaceValuePrivateState } from '../../contract/src/index';

const findWallet = (): InitialAPI | undefined =>
  Object.values((window as unknown as { midnight?: Record<string, unknown> }).midnight ?? {}).find(
    (w): w is InitialAPI => !!w && typeof w === 'object' && 'apiVersion' in w && semver.satisfies((w as InitialAPI).apiVersion, '4.x'),
  );

/** Keeps private state in memory only; the fan secret itself lives in this browser (see fan.ts). */
function memoryPrivateState<PS>() {
  const states = new Map<string, PS>();
  const keys = new Map<string, unknown>();
  let addr = '';
  return {
    setContractAddress: (a: string) => void (addr = a),
    get: async (id: string) => states.get(`${addr}:${id}`) ?? null,
    set: async (id: string, s: PS) => void states.set(`${addr}:${id}`, s),
    remove: async (id: string) => void states.delete(`${addr}:${id}`),
    clear: async () => states.clear(),
    getSigningKey: async (a: string) => (keys.get(a) as never) ?? null,
    setSigningKey: async (a: string, k: unknown) => void keys.set(a, k),
    removeSigningKey: async (a: string) => void keys.delete(a),
    clearSigningKeys: async () => keys.clear(),
    exportPrivateStates: async () => ({}) as never,
    importPrivateStates: async () => ({}) as never,
    exportSigningKeys: async () => ({}) as never,
    importSigningKeys: async () => ({}) as never,
  };
}

export type FanContract = {
  callTx: Record<string, (...a: unknown[]) => Promise<{ public: { txHash: string } }>>;
};

export async function connectLace(network: 'preprod' | 'local') {
  const initial = findWallet();
  if (!initial) throw new Error('Midnight Lace wallet not found. Install the Lace extension and enable Midnight.');
  setNetworkId((network === 'local' ? 'undeployed' : network) as never);
  // Some mobile browsers with extensions (e.g. Mises) never show Lace's approval popup, so connect()
  // never settles; give up with a hint instead of waiting forever.
  let timer: ReturnType<typeof setTimeout> | undefined;
  const api: ConnectedAPI = await Promise.race([
    initial.connect(network === 'local' ? 'undeployed' : network),
    new Promise<never>((_, reject) => {
      timer = setTimeout(
        () => reject(new Error('Lace did not answer. Open Lace from the browser extensions menu, approve the connection, then tap Go again. If no request shows there, use Chrome or Brave on a computer.')),
        60_000,
      );
    }),
  ]).finally(() => clearTimeout(timer));
  const config = await api.getConfiguration();
  const addresses = await api.getShieldedAddresses();
  const zk = new FetchZkConfigProvider<string>(new URL('facevalue', location.href).href.replace(/\/$/, ''), fetch.bind(window));
  const providers = {
    privateStateProvider: memoryPrivateState<FaceValuePrivateState>(),
    zkConfigProvider: zk,
    proofProvider: httpClientProofProvider(config.proverServerUri!, zk),
    publicDataProvider: indexerPublicDataProvider(config.indexerUri, config.indexerWsUri),
    walletProvider: {
      getCoinPublicKey: () => addresses.shieldedCoinPublicKey,
      getEncryptionPublicKey: () => addresses.shieldedEncryptionPublicKey,
      balanceTx: async (tx: { serialize(): Uint8Array }) => {
        const r = await api.balanceUnsealedTransaction(toHex(tx.serialize()));
        return Transaction.deserialize('signature', 'proof', 'binding', fromHex(r.tx));
      },
    },
    midnightProvider: {
      submitTx: async (tx: FinalizedTransaction) => {
        await api.submitTransaction(toHex(tx.serialize()));
        return tx.identifiers()[0];
      },
    },
  };
  return { api, providers, proverServerUri: config.proverServerUri };
}

export async function joinAsFan(
  providers: Awaited<ReturnType<typeof connectLace>>['providers'],
  contractAddress: string,
  state: FaceValuePrivateState,
): Promise<FanContract> {
  return (await findDeployedContract(providers as never, {
    contractAddress,
    compiledContract: CompiledFaceValue,
    privateStateId: 'fan',
    initialPrivateState: state,
  } as never)) as unknown as FanContract;
}
