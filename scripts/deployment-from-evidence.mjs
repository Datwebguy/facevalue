// Points the web app at the contracts recorded in docs/evidence/<network>-run.json
// (or <network>-partial.json when a run stopped after deploying and creating the show).
// Only the PUBLISHED block of app/src/deployment.ts changes.
import { existsSync, readFileSync, writeFileSync } from 'node:fs';
const net = process.argv[2] ?? 'preprod';
const file = [`docs/evidence/${net}-run.json`, `docs/evidence/${net}-partial.json`].find(existsSync);
if (!file) throw new Error(`no evidence for ${net}`);
const r = JSON.parse(readFileSync(file, 'utf8'));
if (!r.contractAddress || !r.tkrwContract || !r.showId) {
  console.log(`${file} has no complete deployment yet; app unchanged`);
  process.exit(0);
}
const target = 'app/src/deployment.ts';
const src = readFileSync(target, 'utf8');
const block = `const PUBLISHED: Deployment = {
  network: '${net}',
  contract: '${r.contractAddress}',
  tkrwContract: '${r.tkrwContract}',
  faceValue: '${r.finalShow?.faceValue ?? '110000'}',
  showId: '${r.showId}',
  explorer: 'https://explorer.preprod.midnight.network/contracts/',
};`;
const next = src.replace(/const PUBLISHED: Deployment = \{[\s\S]*?\n\};/, block);
if (next === src && !src.includes(block)) throw new Error('PUBLISHED block not found in deployment.ts');
writeFileSync(target, next);
console.log(`app now reads ${net} contract ${r.contractAddress} (from ${file})`);
