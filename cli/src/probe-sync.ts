// Prints how much ledger history a fresh wallet must sync on a network.
import * as Rx from 'rxjs';
import { SeedWallet, environments, logger } from './network.js';
const net = process.argv[2] as 'preprod' | 'preview';
const w = await SeedWallet.build(environments[net]);
await w.start();
const s = await Rx.firstValueFrom(w.wallet.state().pipe(Rx.filter((x) => Number((x.dust.state.progress as { highestRelevantWalletIndex?: bigint }).highestRelevantWalletIndex ?? 0) > 0), Rx.timeout(120_000)));
const p = (o: unknown) => (o as { highestRelevantWalletIndex?: bigint }).highestRelevantWalletIndex;
logger.info(`${net}: shielded history ${p(s.shielded.state.progress)}, dust history ${p(s.dust.state.progress)}`);
process.exit(0);
