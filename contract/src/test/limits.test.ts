// Known limits of the current contract, pinned as tests so they stay visible.
// Each test shows behaviour that the README lists under "Known limitations".
// When a planned contract change closes a gap, flip that test to expect a refusal.
import { describe, expect, it } from 'vitest';
import { pureCircuits } from '../managed/facevalue/contract/index.js';
import { FaceValueSim, makeActor, randomBytes } from './simulator.js';

const FACE = 110_000n;
const SEED = 777n;
const SALT = randomBytes(32);

const world = (fanCount: number, capacity = 2n) => {
  const issuer = makeActor('issuer');
  const organizer = makeActor('organizer');
  const sim = new FaceValueSim(issuer);
  const fans = Array.from({ length: fanCount }, (_, i) => makeActor(`fan${i}`));
  sim.enroll(...fans);
  const showId = randomBytes(32);
  sim.as(organizer, (c, ctx) => c.createShow(ctx, showId, FACE, capacity, 2n, pureCircuits.seedCommitment(SEED, SALT), 1n, 2_000_000_000n));
  return { sim, organizer, fans, showId };
};

describe('known limits', () => {
  it('resale: a buyer who checks in first keeps the seat, so the seller can no longer claw it back', () => {
    const w = world(1, 1n);
    const [seller] = w.fans;
    w.sim.as(seller, (c, ctx) => c.enterDraw(ctx, w.showId));
    w.sim.as(w.organizer, (c, ctx) => c.advance(ctx, w.showId));
    w.sim.as(w.organizer, (c, ctx) => c.revealDraw(ctx, w.showId, SEED, SALT, 42n));
    w.sim.as(seller, (c, ctx) => c.claimTicket(ctx, w.showId, 0n, w.sim.coin(FACE)));
    const buyer = { ...makeActor('buyer'), state: seller.state };
    const buyerPassKey = randomBytes(32);
    w.sim.as(buyer, (c, ctx) => c.checkIn(ctx, w.showId, 0n, buyerPassKey));
    expect(() => w.sim.as(seller, (c, ctx) => c.returnTicket(ctx, w.showId, 0n))).toThrow(/already returned or used/);
    expect(w.sim.ledger.passes.member(buyerPassKey)).toBe(true);
  });

  it('beacon: the contract does not check the beacon value, so the organizer can choose the winning window', () => {
    const w = world(10, 1n);
    for (const f of w.fans) w.sim.as(f, (c, ctx) => c.enterDraw(ctx, w.showId));
    w.sim.as(w.organizer, (c, ctx) => c.advance(ctx, w.showId));
    const s = w.sim.show(w.showId);
    const target = 7n;
    const beacon = (target - ((SEED + s.entropy) % s.entries) + s.entries) % s.entries;
    w.sim.as(w.organizer, (c, ctx) => c.revealDraw(ctx, w.showId, SEED, SALT, beacon));
    expect(w.sim.show(w.showId).offset).toBe(target);
  });

  it('phases: the organizer can close the show early; holders who have not checked in cannot check in or return', () => {
    const w = world(2, 2n);
    for (const f of w.fans) w.sim.as(f, (c, ctx) => c.enterDraw(ctx, w.showId));
    w.sim.as(w.organizer, (c, ctx) => c.advance(ctx, w.showId));
    w.sim.as(w.organizer, (c, ctx) => c.revealDraw(ctx, w.showId, SEED, SALT, 1n));
    const [holder] = w.fans;
    w.sim.as(holder, (c, ctx) => c.claimTicket(ctx, w.showId, 0n, w.sim.coin(FACE)));
    w.sim.as(w.organizer, (c, ctx) => c.advance(ctx, w.showId));
    w.sim.as(w.organizer, (c, ctx) => c.advance(ctx, w.showId));
    expect(() => w.sim.as(holder, (c, ctx) => c.checkIn(ctx, w.showId, 0n, randomBytes(32)))).toThrow(/check-in is closed/);
    expect(() => w.sim.as(holder, (c, ctx) => c.returnTicket(ctx, w.showId, 0n))).toThrow(/returns are closed/);
  });

  it('phases: the organizer can end the claim window straight after the draw', () => {
    const w = world(3, 1n);
    for (const f of w.fans) w.sim.as(f, (c, ctx) => c.enterDraw(ctx, w.showId));
    w.sim.as(w.organizer, (c, ctx) => c.advance(ctx, w.showId));
    w.sim.as(w.organizer, (c, ctx) => c.revealDraw(ctx, w.showId, SEED, SALT, 1n));
    w.sim.as(w.organizer, (c, ctx) => c.advance(ctx, w.showId));
    const s = w.sim.show(w.showId);
    const winner = w.fans.find((_, i) => pureCircuits.windowPosition(BigInt(i), s.offset, s.entries) < s.capacity)!;
    expect(() => w.sim.as(winner, (c, ctx) => c.claimTicket(ctx, w.showId, 0n, w.sim.coin(FACE)))).toThrow(/not in the claim window/);
  });
});
