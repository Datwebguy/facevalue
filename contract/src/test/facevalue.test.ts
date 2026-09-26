import { describe, expect, it, beforeEach } from 'vitest';
import { pureCircuits, Phase } from '../managed/facevalue/contract/index.js';
import { FaceValueSim, makeActor, randomBytes, type Actor } from './simulator.js';

const FACE = 110_000n; // ₩110,000
const SEED = 424242n;
const SALT = randomBytes(32);
const BEACON = 987654321n;

const setup = (fanCount: number, capacity = 3n, perFanCap = 2n) => {
  const issuer = makeActor('issuer');
  const organizer = makeActor('organizer');
  const sim = new FaceValueSim(issuer);
  const fans: Actor[] = Array.from({ length: fanCount }, (_, i) => makeActor(`fan${i}`));
  sim.enroll(...fans);
  const showId = randomBytes(32);
  sim.as(organizer, (c, ctx) =>
    c.createShow(ctx, showId, FACE, capacity, perFanCap, pureCircuits.seedCommitment(SEED, SALT), 5_000_000n),
  );
  return { sim, issuer, organizer, fans, showId };
};

const runDraw = (t: ReturnType<typeof setup>, entrants: Actor[]) => {
  for (const f of entrants) t.sim.as(f, (c, ctx) => c.enterDraw(ctx, t.showId));
  t.sim.as(t.organizer, (c, ctx) => c.advance(ctx, t.showId));
  t.sim.as(t.organizer, (c, ctx) => c.revealDraw(ctx, t.showId, SEED, SALT, BEACON));
  const s = t.sim.show(t.showId);
  const winners: Actor[] = [];
  const losers: Actor[] = [];
  entrants.forEach((f, i) => {
    const won = pureCircuits.windowPosition(BigInt(i), s.offset, s.entries) < s.capacity;
    (won ? winners : losers).push(f);
  });
  return { winners, losers };
};

describe('registry', () => {
  it('only the issuer can enroll fans', () => {
    const { sim } = setup(0);
    const mallory = makeActor('mallory');
    expect(() => sim.as(mallory, (c, ctx) => c.enrollBatch(ctx, [pureCircuits.fanLeaf(mallory.state.fanSecret), new Uint8Array(32), new Uint8Array(32), new Uint8Array(32)]))).toThrow(
      /not authorized/,
    );
  });

  it('batch enrollment skips empty leaves', () => {
    const { sim, issuer } = setup(0);
    const a = makeActor('a');
    const b = makeActor('b');
    const zero = new Uint8Array(32);
    sim.as(issuer, (c, ctx) =>
      c.enrollBatch(ctx, [pureCircuits.fanLeaf(a.state.fanSecret), zero, pureCircuits.fanLeaf(b.state.fanSecret), zero]),
    );
    expect(sim.ledger.enrolled).toBe(2n);
  });
});

describe('draw', () => {
  it('rejects unverified fans and double entries', () => {
    const t = setup(2);
    const outsider = makeActor('bot');
    expect(() => t.sim.as(outsider, (c, ctx) => c.enterDraw(ctx, t.showId))).toThrow(/not in the verified registry/);
    t.sim.as(t.fans[0], (c, ctx) => c.enterDraw(ctx, t.showId));
    expect(() => t.sim.as(t.fans[0], (c, ctx) => c.enterDraw(ctx, t.showId))).toThrow(/one entry per verified fan/);
  });

  it('the organizer cannot open a different seed than it committed to', () => {
    const t = setup(3);
    for (const f of t.fans) t.sim.as(f, (c, ctx) => c.enterDraw(ctx, t.showId));
    t.sim.as(t.organizer, (c, ctx) => c.advance(ctx, t.showId));
    expect(() => t.sim.as(t.organizer, (c, ctx) => c.revealDraw(ctx, t.showId, SEED + 1n, SALT, BEACON))).toThrow(
      /does not match its commitment/,
    );
  });

  it('only the organizer can advance the show', () => {
    const t = setup(1);
    expect(() => t.sim.as(t.fans[0], (c, ctx) => c.advance(ctx, t.showId))).toThrow(/not authorized/);
  });

  it('picks exactly `capacity` winners out of the entrants', () => {
    const t = setup(8, 3n);
    const { winners, losers } = runDraw(t, t.fans);
    expect(winners).toHaveLength(3);
    expect(losers).toHaveLength(5);
    expect(t.sim.show(t.showId).phase).toBe(Phase.drawn);
  });
});

describe('claiming and payment', () => {
  it('winners claim at face value; losers cannot', () => {
    const t = setup(6, 2n);
    const { winners, losers } = runDraw(t, t.fans);
    for (const w of winners) t.sim.as(w, (c, ctx) => c.claimTicket(ctx, t.showId, 0n, t.sim.coin(FACE)));
    expect(t.sim.show(t.showId).issued).toBe(2n);
    expect(t.sim.show(t.showId).revenue).toBe(2n * FACE);
    expect(() => t.sim.as(losers[0], (c, ctx) => c.claimTicket(ctx, t.showId, 0n, t.sim.coin(FACE)))).toThrow(/not drawn/);
  });

  it('rejects any price other than face value', () => {
    const t = setup(1);
    const { winners } = runDraw(t, t.fans);
    expect(() => t.sim.as(winners[0], (c, ctx) => c.claimTicket(ctx, t.showId, 0n, t.sim.coin(FACE * 10n)))).toThrow(
      /exactly face value/,
    );
  });

  it('a seat can only be claimed once', () => {
    const t = setup(1);
    const { winners } = runDraw(t, t.fans);
    t.sim.as(winners[0], (c, ctx) => c.claimTicket(ctx, t.showId, 0n, t.sim.coin(FACE)));
    expect(() => t.sim.as(winners[0], (c, ctx) => c.claimTicket(ctx, t.showId, 1n, t.sim.coin(FACE)))).toThrow(
      /already claimed/,
    );
  });
});

describe('face-value pool', () => {
  let t: ReturnType<typeof setup>;
  let buyer: Actor;
  beforeEach(() => {
    t = setup(4, 2n, 2n);
    const { winners } = runDraw(t, t.fans.slice(0, 3));
    for (const w of winners) t.sim.as(w, (c, ctx) => c.claimTicket(ctx, t.showId, 0n, t.sim.coin(FACE)));
    buyer = t.fans[3];
  });

  it('a returned ticket is refunded and goes back to the pool', () => {
    const seller = t.fans.find((f) => {
      try {
        t.sim.as(f, (c, ctx) => c.returnTicket(ctx, t.showId, 0n));
        return true;
      } catch {
        return false;
      }
    })!;
    expect(seller).toBeDefined();
    const s = t.sim.show(t.showId);
    expect(s.pool).toBe(1n);
    expect(s.returned).toBe(1n);
    expect(s.revenue).toBe(FACE);
    // the returned ticket is dead: it can be neither returned again nor used at the gate
    expect(() => t.sim.as(seller, (c, ctx) => c.returnTicket(ctx, t.showId, 0n))).toThrow(/already returned or used/);
    expect(() => t.sim.as(seller, (c, ctx) => c.checkIn(ctx, t.showId, 0n, randomBytes(32)))).toThrow(
      /already returned or used/,
    );
  });

  it('pool sales happen only at face value, only to verified fans, within the per-fan cap', () => {
    t.sim.as(t.organizer, (c, ctx) => c.advance(ctx, t.showId));
    expect(t.sim.show(t.showId).pool).toBe(0n); // both seats were claimed
    const holder = t.fans.slice(0, 3).find((f) => {
      try {
        t.sim.as(f, (c, ctx) => c.returnTicket(ctx, t.showId, 0n));
        return true;
      } catch {
        return false;
      }
    })!;
    expect(holder).toBeDefined();
    const bot = makeActor('bot');
    expect(() => t.sim.as(bot, (c, ctx) => c.buyFromPool(ctx, t.showId, 0n, t.sim.coin(FACE)))).toThrow(
      /not in the verified registry/,
    );
    expect(() => t.sim.as(buyer, (c, ctx) => c.buyFromPool(ctx, t.showId, 0n, t.sim.coin(FACE * 2n)))).toThrow(
      /exactly face value/,
    );
    t.sim.as(buyer, (c, ctx) => c.buyFromPool(ctx, t.showId, 0n, t.sim.coin(FACE)));
    expect(t.sim.show(t.showId).pool).toBe(0n);
    expect(() => t.sim.as(buyer, (c, ctx) => c.buyFromPool(ctx, t.showId, 1n, t.sim.coin(FACE)))).toThrow(/no seats/);
  });

  it('a fan can never exceed the per-fan cap, whatever slot numbers they try', () => {
    t.sim.as(t.organizer, (c, ctx) => c.advance(ctx, t.showId));
    // free up seats
    for (const f of t.fans.slice(0, 3)) {
      try {
        t.sim.as(f, (c, ctx) => c.returnTicket(ctx, t.showId, 0n));
      } catch {
        /* this fan had no ticket */
      }
    }
    t.sim.as(buyer, (c, ctx) => c.buyFromPool(ctx, t.showId, 0n, t.sim.coin(FACE)));
    t.sim.as(buyer, (c, ctx) => c.buyFromPool(ctx, t.showId, 1n, t.sim.coin(FACE)));
    expect(() => t.sim.as(buyer, (c, ctx) => c.buyFromPool(ctx, t.showId, 1n, t.sim.coin(FACE)))).toThrow(
      /slot already used|no seats/,
    );
    expect(() => t.sim.as(buyer, (c, ctx) => c.buyFromPool(ctx, t.showId, 2n, t.sim.coin(FACE)))).toThrow(
      /per-fan ticket cap reached|no seats/,
    );
  });
});

describe('gate check-in', () => {
  it('a ticket checks in once and registers a one-time pass key', () => {
    const t = setup(1);
    const { winners } = runDraw(t, t.fans);
    const w = winners[0];
    t.sim.as(w, (c, ctx) => c.claimTicket(ctx, t.showId, 0n, t.sim.coin(FACE)));
    const pass = randomBytes(32);
    t.sim.as(w, (c, ctx) => c.checkIn(ctx, t.showId, 0n, pass));
    expect(t.sim.ledger.passes.member(pass)).toBe(true);
    expect(t.sim.show(t.showId).checkedIn).toBe(1n);
    expect(() => t.sim.as(w, (c, ctx) => c.checkIn(ctx, t.showId, 0n, randomBytes(32)))).toThrow(/already returned or used/);
    expect(() => t.sim.as(w, (c, ctx) => c.returnTicket(ctx, t.showId, 0n))).toThrow(/already returned or used/);
  });

  it("nobody else can use a fan's ticket without the fan's secret", () => {
    const t = setup(2);
    const { winners } = runDraw(t, t.fans.slice(0, 1));
    t.sim.as(winners[0], (c, ctx) => c.claimTicket(ctx, t.showId, 0n, t.sim.coin(FACE)));
    expect(() => t.sim.as(t.fans[1], (c, ctx) => c.checkIn(ctx, t.showId, 0n, randomBytes(32)))).toThrow(/No such ticket/);
  });
});

describe('organizer revenue', () => {
  it('revenue is locked until the show is closed', () => {
    const t = setup(1);
    const { winners } = runDraw(t, t.fans);
    t.sim.as(winners[0], (c, ctx) => c.claimTicket(ctx, t.showId, 0n, t.sim.coin(FACE)));
    expect(() => t.sim.as(t.organizer, (c, ctx) => c.withdraw(ctx, t.showId))).toThrow(/close the show first/);
    t.sim.as(t.organizer, (c, ctx) => c.advance(ctx, t.showId));
    expect(() => t.sim.as(winners[0], (c, ctx) => c.withdraw(ctx, t.showId))).toThrow(/not authorized/);
  });
});
