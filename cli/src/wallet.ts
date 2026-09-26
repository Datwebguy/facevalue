// Dedicated project wallet for Preprod.
//   npx tsx cli/src/wallet.ts create   # new seed → .wallet/preprod.json (gitignored), prints address only
//   npx tsx cli/src/wallet.ts fund     # request free tNIGHT from the Preprod faucet, wait for it
//   npx tsx cli/src/wallet.ts dust     # register tNIGHT for tDUST generation (fees), wait for DUST
//   npx tsx cli/src/wallet.ts status   # balances
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import * as Rx from 'rxjs';
import { FaucetClient } from '@midnight-ntwrk/testkit-js';
import { UnshieldedAddress } from '@midnight-ntwrk/wallet-sdk-address-format';
import { getNetworkId } from '@midnight-ntwrk/midnight-js-network-id';
import { unshieldedToken } from '@midnight-ntwrk/midnight-js-protocol/ledger';
import { SeedWallet, environments, isSynced, logger, waitForSync } from './network.js';

const file = '.wallet/preprod.json';
const env = environments.preprod;
const cmd = process.argv[2] ?? 'status';

const loadSeed = () => {
  if (!existsSync(file)) throw new Error(`No wallet yet. Run: npx tsx cli/src/wallet.ts create`);
  return JSON.parse(readFileSync(file, 'utf8')).seed as string;
};

if (cmd === 'create') {
  if (existsSync(file)) throw new Error(`${file} already exists — refusing to overwrite a funded wallet`);
  const seed = Buffer.from(crypto.getRandomValues(new Uint8Array(32))).toString('hex');
  mkdirSync('.wallet', { recursive: true });
  writeFileSync(file, JSON.stringify({ network: 'preprod', seed, createdAt: new Date().toISOString() }, null, 2));
}

const w = await SeedWallet.build(env, loadSeed());
await w.start();
const st = await Rx.firstValueFrom(w.wallet.state());
const address = UnshieldedAddress.codec.encode(getNetworkId(), st.unshielded.address).toString();
logger.info(`project wallet unshielded address: ${address}`);

const balances = (s: typeof st) => ({
  tNIGHT: s.unshielded.balances[unshieldedToken().raw] ?? 0n,
  tDUST: s.dust.balance(new Date()),
  shielded: s.shielded.balances,
});

if (cmd === 'fund') {
  await new FaucetClient(env.faucet!, logger).requestTokens(address);
  logger.info('faucet request sent; waiting for tNIGHT…');
  const s = await Rx.firstValueFrom(
    w.wallet.state().pipe(Rx.throttleTime(3000), Rx.filter((x) => isSynced(x) && (x.unshielded.balances[unshieldedToken().raw] ?? 0n) > 0n)),
  );
  logger.info(`funded: ${JSON.stringify(balances(s), (_, v) => (typeof v === 'bigint' ? v.toString() : v))}`);
}

if (cmd === 'dust') {
  const s = await waitForSync(w);
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
  const d = await Rx.firstValueFrom(w.wallet.state().pipe(Rx.throttleTime(3000), Rx.filter((x) => x.dust.balance(new Date()) > 0n)));
  logger.info(`tDUST available: ${d.dust.balance(new Date())}`);
}

if (cmd === 'status') {
  const s = await waitForSync(w);
  logger.info(JSON.stringify(balances(s), (_, v) => (typeof v === 'bigint' ? v.toString() : v)));
}
await w.stop();
process.exit(0);
