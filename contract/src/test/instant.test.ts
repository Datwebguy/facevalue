import { describe, expect, it } from 'vitest';
import { actor, Instant } from '../../../app/src/instant.js';

describe('Try it now engine', () => {
  it('runs the full story with the real circuits, whichever way the draw falls', () => {
    const w = new Instant();
    const you = actor('you');
    const others = [1, 2, 3, 4, 5].map((i) => actor(`f${i}`));
    w.enroll(you, ...others);
    for (const f of [you, ...others]) w.as(f, (c, x) => c.enterDraw(x, w.showId));
    w.reveal();
    if (w.won(0)) w.as(you, (c, x) => c.claimTicket(x, w.showId, 0n, w.coin()));
    else {
      const winners = others.filter((_, i) => w.won(i + 1));
      for (const f of winners) w.as(f, (c, x) => c.claimTicket(x, w.showId, 0n, w.coin()));
      w.as(winners[0], (c, x) => c.returnTicket(x, w.showId, 0n));
      w.as(w.organizer, (c, x) => c.advance(x, w.showId));
      w.as(you, (c, x) => c.buyFromPool(x, w.showId, 0n, w.coin()));
    }
    w.as(you, (c, x) => c.checkIn(x, w.showId, 0n, crypto.getRandomValues(new Uint8Array(32))));
    expect(w.show.checkedIn).toBe(1n);
  });
});
