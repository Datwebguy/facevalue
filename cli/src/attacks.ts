// Judge-runnable attacks against the real compiled FaceValue circuits (in-process simulator).
//   npm run attack            # all
//   npm run attack -- resell  # one
// Each attack prints what the attacker tried and whether the contract stopped it.
import { pureCircuits } from '../../contract/src/managed/facevalue/contract/index.js';
import { FaceValueSim, makeActor, randomBytes, type Actor } from '../../contract/src/test/simulator.js';

const FACE = 110_000n;
const SEED = 777n;
const SALT = randomBytes(32);
const REVEAL_BY = 2_000_000_000n; // block time (seconds) after which anyone may run the draw

const world = (fanCount: number, capacity = 2n) => {
  const issuer = makeActor('issuer');
  const organizer = makeActor('organizer');
  const sim = new FaceValueSim(issuer);
  const fans: Actor[] = Array.from({ length: fanCount }, (_, i) => makeActor(`fan${i}`));
  sim.enroll(...fans);
  const showId = randomBytes(32);
  sim.as(organizer, (c, ctx) => c.createShow(ctx, showId, FACE, capacity, 2n, pureCircuits.seedCommitment(SEED, SALT), 1n, REVEAL_BY));
  const draw = (entrants: Actor[]) => {
    for (const f of entrants) sim.as(f, (c, ctx) => c.enterDraw(ctx, showId));
    sim.as(organizer, (c, ctx) => c.advance(ctx, showId));
    sim.as(organizer, (c, ctx) => c.revealDraw(ctx, showId, SEED, SALT, 42n));
    const s = sim.show(showId);
    return entrants.filter((_, i) => pureCircuits.windowPosition(BigInt(i), s.offset, s.entries) < s.capacity);
  };
  return { sim, issuer, organizer, fans, showId, draw };
};

const blocked = (label: string, fn: () => unknown) => {
  try {
    fn();
    console.log(`   ✖ NOT BLOCKED: ${label}`);
    return false;
  } catch (e) {
    console.log(`   ✔ blocked: ${label}\n       → "${(e as Error).message.split('\n')[0]}"`);
    return true;
  }
};

const attacks: Record<string, { title: string; run: () => boolean }> = {
  resell: {
    title: 'Scalper sells a ticket off-chain, then claws it back',
    run: () => {
      const w = world(3);
      const [scalper] = w.draw(w.fans);
      w.sim.as(scalper, (c, ctx) => c.claimTicket(ctx, w.showId, 0n, w.sim.coin(FACE)));
      // The only way to "deliver" a FaceValue ticket off-chain is to hand over the secrets.
      const buyer: Actor = { ...makeActor('black-market buyer'), state: scalper.state };
      console.log('   scalper sells secrets for ₩10,370,000 to a buyer, then returns the ticket for a ₩110,000 refund');
      w.sim.as(scalper, (c, ctx) => c.returnTicket(ctx, w.showId, 0n));
      return blocked('buyer tries to enter with the purchased ticket', () =>
        w.sim.as(buyer, (c, ctx) => c.checkIn(ctx, w.showId, 0n, randomBytes(32))),
      );
    },
  },
  'bot-army': {
    title: 'Macro bots flood the draw',
    run: () => {
      const w = world(1);
      const bots = Array.from({ length: 5 }, (_, i) => makeActor(`bot${i}`));
      return bots.every((b) => blocked(`${b.name} enters without a verified credential`, () => w.sim.as(b, (c, ctx) => c.enterDraw(ctx, w.showId))));
    },
  },
  'double-entry': {
    title: 'One human enters the draw twice / exceeds the per-fan cap',
    run: () => {
      const w = world(2);
      w.sim.as(w.fans[0], (c, ctx) => c.enterDraw(ctx, w.showId));
      const a = blocked('second draw entry by the same fan', () => w.sim.as(w.fans[0], (c, ctx) => c.enterDraw(ctx, w.showId)));
      const [winner] = w.draw([w.fans[1]]);
      w.sim.as(winner, (c, ctx) => c.claimTicket(ctx, w.showId, 0n, w.sim.coin(FACE)));
      const b = blocked('claiming a second seat with a different slot number', () =>
        w.sim.as(winner, (c, ctx) => c.claimTicket(ctx, w.showId, 1n, w.sim.coin(FACE))),
      );
      return a && b;
    },
  },
  'rig-draw': {
    title: 'Organizer tries to change the seed after seeing the entries',
    run: () => {
      const w = world(4);
      for (const f of w.fans) w.sim.as(f, (c, ctx) => c.enterDraw(ctx, w.showId));
      w.sim.as(w.organizer, (c, ctx) => c.advance(ctx, w.showId));
      return blocked('reveal with a different seed than the sealed one', () =>
        w.sim.as(w.organizer, (c, ctx) => c.revealDraw(ctx, w.showId, SEED + 1n, SALT, 42n)),
      );
    },
  },
  'above-face': {
    title: 'Selling a seat above face value through the contract',
    run: () => {
      const w = world(1);
      const [f] = w.draw(w.fans);
      return blocked('paying ₩10,370,000 for a ₩110,000 seat', () =>
        w.sim.as(f, (c, ctx) => c.claimTicket(ctx, w.showId, 0n, w.sim.coin(10_370_000n))),
      );
    },
  },
  'double-entry-gate': {
    title: 'Using one ticket twice at the gate',
    run: () => {
      const w = world(1);
      const [f] = w.draw(w.fans);
      w.sim.as(f, (c, ctx) => c.claimTicket(ctx, w.showId, 0n, w.sim.coin(FACE)));
      w.sim.as(f, (c, ctx) => c.checkIn(ctx, w.showId, 0n, randomBytes(32)));
      return blocked('second check-in with a new pass key', () => w.sim.as(f, (c, ctx) => c.checkIn(ctx, w.showId, 0n, randomBytes(32))));
    },
  },
};

const pick = process.argv[2];
let ok = true;
for (const [k, a] of Object.entries(attacks)) {
  if (pick && pick !== k) continue;
  console.log(`\n▶ attack:${k} — ${a.title}`);
  ok = a.run() && ok;
}
console.log(ok ? '\nAll attacks were stopped by the contract.' : '\nSome attacks were NOT stopped.');
process.exit(ok ? 0 : 1);
