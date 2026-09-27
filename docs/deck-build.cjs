const pptxgen = require('pptxgenjs');
const path = require('path');

const BRAND = path.join(__dirname, 'brand');
const OUT = path.join(__dirname, 'FaceValue-deck.pptx');

const C = {
  bg: '07081A', panel: '14163A', ink: 'F4F1FF', muted: 'A7A5C8',
  pink: 'FF4D8D', violet: '7B61FF', teal: '19D3C5', ok: '2EE59D', no: 'FF5470', cream: 'FFF7EA', dark: '1A1233',
};
const H = 'Arial';
const B = 'Arial';

const pres = new pptxgen();
pres.layout = 'LAYOUT_WIDE'; // 13.33 x 7.5
pres.title = 'FaceValue 정가';

const base = () => {
  const s = pres.addSlide();
  s.background = { color: C.bg };
  s.addImage({ path: `${BRAND}/icon-512.png`, x: 12.35, y: 0.35, w: 0.5, h: 0.5 });
  return s;
};
const kicker = (s, t, y = 0.55) =>
  s.addText(t.toUpperCase(), { x: 0.7, y, w: 9, h: 0.35, fontFace: B, fontSize: 12, bold: true, color: C.pink, charSpacing: 4, margin: 0, isTextBox: true });
const title = (s, t, y = 0.95, size = 38) =>
  s.addText(t, { x: 0.7, y, w: 11.5, h: 1.2, fontFace: H, fontSize: size, bold: true, color: C.ink, margin: 0, valign: 'top', isTextBox: true });
const card = (s, x, y, w, h, fill = C.panel) =>
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x, y, w, h, fill: { color: fill }, line: { color: '262B55', width: 0.75 }, rectRadius: 0.18 });

// 1. Title
{
  const s = pres.addSlide();
  s.background = { color: C.bg };
  s.addShape(pres.shapes.OVAL, { x: -2, y: -2.5, w: 7, h: 7, fill: { color: C.violet, transparency: 70 }, line: { type: 'none' } });
  s.addShape(pres.shapes.OVAL, { x: 9, y: 4, w: 6, h: 6, fill: { color: C.pink, transparency: 75 }, line: { type: 'none' } });
  s.addImage({ path: `${BRAND}/icon-512.png`, x: 0.8, y: 1.1, w: 1.3, h: 1.3, rotate: -8 });
  s.addText([{ text: 'FaceValue ', options: { color: C.ink } }, { text: '정가', options: { color: C.pink } }], {
    x: 2.4, y: 1.2, w: 9, h: 1.1, fontFace: H, fontSize: 54, bold: true, margin: 0, isTextBox: true,
  });
  s.addText('Tickets at face value.', { x: 0.8, y: 3.0, w: 11.5, h: 0.9, fontFace: H, fontSize: 44, bold: true, color: C.ink, margin: 0, isTextBox: true });
  s.addText('Entry without showing your face.', { x: 0.8, y: 3.85, w: 11.5, h: 0.9, fontFace: H, fontSize: 44, bold: true, color: C.teal, margin: 0, isTextBox: true });
  s.addText('Anti-scalping concert tickets on Midnight. Every fan verified, nobody learns who.', {
    x: 0.8, y: 5.05, w: 11, h: 0.5, fontFace: B, fontSize: 18, color: C.muted, margin: 0, isTextBox: true,
  });
  s.addText('tryfacevalue.xyz  ·  github.com/Datwebguy/facevalue', { x: 0.8, y: 6.5, w: 11, h: 0.4, fontFace: B, fontSize: 14, color: C.muted, margin: 0, isTextBox: true });
  s.addNotes('FaceValue: concert tickets that stay at face value, where every fan is verified but nobody learns who they are. Built on Midnight.');
}

// 2. The problem
{
  const s = base();
  kicker(s, 'The problem');
  title(s, 'Scalping is out of control, and the fix so far is surveillance');
  const stats = [
    ['40×', 'BTS seats: ₩264,000 face value listed at ₩10,370,000'],
    ['1,868', 'BTS scalping posts flagged by the Ministry'],
    ['28 Aug 2026', 'New law: platforms must verify every buyer'],
  ];
  stats.forEach(([n, l], i) => {
    const x = 0.7 + i * 4.1;
    card(s, x, 2.55, 3.8, 2.1);
    s.addText(n, { x: x + 0.3, y: 2.8, w: 3.3, h: 0.9, fontFace: H, fontSize: 40, bold: true, color: i === 0 ? C.pink : C.ink, margin: 0, isTextBox: true });
    s.addText(l, { x: x + 0.3, y: 3.7, w: 3.3, h: 0.8, fontFace: B, fontSize: 14, color: C.muted, margin: 0, valign: 'top', isTextBox: true });
  });
  card(s, 0.7, 4.95, 12, 1.75, '1B0F2E');
  s.addText(
    [
      { text: 'Today’s answers collect more personal data: ', options: { color: C.ink, bold: true } },
      { text: 'ID checks at the gate, HYBE’s Face Pass facial recognition, iris scans. The same year Coupang was fined ₩624.7 billion for a data breach, and the amended privacy law made executives accountable.', options: { color: C.muted } },
    ],
    { x: 1.0, y: 5.15, w: 11.4, h: 1.35, fontFace: B, fontSize: 16, margin: 0, valign: 'middle', isTextBox: true },
  );
  s.addNotes('The law now forces identity checks; the industry answers with ID and face scans, which creates exactly the data that privacy law punishes.');
}

// 3. Insight
{
  const s = base();
  kicker(s, 'The insight');
  title(s, 'Scalping is a transfer problem', 0.95, 44);
  s.addText('The only strong fix is binding each ticket to one real person. Done naively, that is a database of who went to which concert. Done with zero knowledge, nobody learns anything.', {
    x: 0.7, y: 2.2, w: 7.2, h: 2.2, fontFace: B, fontSize: 20, color: C.muted, margin: 0, valign: 'top', isTextBox: true,
  });
  const rows = [
    ['Real name ID check', 'Collects IDs', C.no],
    ['Facial recognition', 'Collects faces', C.no],
    ['FaceValue on Midnight', 'Collects nothing', C.ok],
  ];
  rows.forEach(([a, b, col], i) => {
    const y = 2.2 + i * 1.2;
    card(s, 8.3, y, 4.4, 1.0);
    s.addText(a, { x: 8.55, y: y + 0.12, w: 4, h: 0.4, fontFace: H, fontSize: 16, bold: true, color: C.ink, margin: 0, isTextBox: true });
    s.addText(b, { x: 8.55, y: y + 0.52, w: 4, h: 0.35, fontFace: B, fontSize: 14, bold: true, color: col, margin: 0, isTextBox: true });
  });
  s.addNotes('Every anti-scalping system needs identity. FaceValue gets the identity guarantee without holding identity data.');
}

// 4. How it works
{
  const s = base();
  kicker(s, 'How it works');
  title(s, 'Four steps from sofa to stage');
  const steps = [
    ['1', 'Verify once', 'Prove you are one real person. Only a scrambled code goes on chain.'],
    ['2', 'Enter the draw', 'One entry per person. The draw seed is sealed before entries open.'],
    ['3', 'Pay face value', 'Exact price in shielded tokens. Can’t go? Full refund, seat goes back to the pool.'],
    ['4', 'Walk in', 'Check in from home. The phone shows a code that changes every 30 seconds.'],
  ];
  s.addShape(pres.shapes.LINE, { x: 1.2, y: 3.0, w: 10.9, h: 0, line: { color: '3A3F74', width: 2, dashType: 'dash' } });
  steps.forEach(([n, h, b], i) => {
    const x = 0.7 + i * 3.05;
    s.addShape(pres.shapes.OVAL, { x: x + 0.2, y: 2.6, w: 0.8, h: 0.8, fill: { color: C.bg }, line: { color: C.pink, width: 2.5 } });
    s.addText(n, { x: x + 0.2, y: 2.6, w: 0.8, h: 0.8, fontFace: H, fontSize: 22, bold: true, color: C.pink, align: 'center', valign: 'middle', margin: 0, isTextBox: true });
    s.addText(h, { x, y: 3.75, w: 2.8, h: 0.5, fontFace: H, fontSize: 20, bold: true, color: C.ink, margin: 0, isTextBox: true });
    s.addText(b, { x, y: 4.3, w: 2.75, h: 1.6, fontFace: B, fontSize: 14, color: C.muted, margin: 0, valign: 'top', isTextBox: true });
  });
  s.addText('There is no transfer button. The only way out of a ticket is a face value refund.', {
    x: 0.7, y: 6.3, w: 12, h: 0.5, fontFace: B, fontSize: 16, bold: true, color: C.teal, margin: 0, isTextBox: true,
  });
}

// 5. Privacy made visible
{
  const s = base();
  kicker(s, 'Privacy, made visible');
  title(s, 'What the chain shows, and what it never can');
  const col = (x, head, color, items, fill) => {
    card(s, x, 2.2, 5.9, 4.6, fill);
    s.addText(head, { x: x + 0.35, y: 2.4, w: 5.2, h: 0.6, fontFace: H, fontSize: 24, bold: true, color, margin: 0, isTextBox: true });
    s.addText(items.map((t, i) => ({ text: t, options: { bullet: true, breakLine: i < items.length - 1 } })), {
      x: x + 0.35, y: 3.15, w: 5.3, h: 3.4, fontFace: B, fontSize: 17, color: C.ink, paraSpaceAfter: 8, margin: 0, valign: 'top', isTextBox: true,
    });
  };
  col(0.7, 'Anyone can check', C.teal, ['How many seats and entries', 'Tickets sold, returned, used', 'That the draw was fair', 'That nobody paid over face value', 'That each fan stayed under the cap'], '0F2A33');
  col(6.8, 'Nobody can see', C.pink, ['Who entered', 'Who won', 'Who holds which ticket', 'Who returned one', 'Who you are'], '2A1030');
  s.addNotes('Regulators can audit compliance of a whole show without a single name. That is compliance by construction.');
}

// 6. What Compact proves
{
  const s = base();
  kicker(s, 'Built on Midnight');
  title(s, 'Ten Compact circuits do the enforcing');
  const items = [
    ['Verified fan', 'Merkle membership proof. The registry entry used stays private.'],
    ['One entry each', 'Entry tag per fan per show blocks double entries.'],
    ['Fair draw', 'Sealed seed + every entrant’s randomness + drand beacon. Division checked in circuit.'],
    ['Ticket cap', 'Slot nullifiers. Nobody can hold more than the cap, the slot number stays private.'],
    ['Face value only', 'Shielded tKRW paid into a contract treasury. Refunds with sendShielded.'],
    ['Stall proof', 'If the organizer never reveals, anyone can run the draw after the deadline.'],
  ];
  items.forEach(([h, b], i) => {
    const x = 0.7 + (i % 3) * 4.1;
    const y = 2.2 + Math.floor(i / 3) * 2.3;
    card(s, x, y, 3.85, 2.05);
    s.addText(h, { x: x + 0.3, y: y + 0.2, w: 3.3, h: 0.5, fontFace: H, fontSize: 18, bold: true, color: C.ink, margin: 0, isTextBox: true });
    s.addText(b, { x: x + 0.3, y: y + 0.75, w: 3.3, h: 1.2, fontFace: B, fontSize: 13, color: C.muted, margin: 0, valign: 'top', isTextBox: true });
  });
}

// 7. Attacks
{
  const s = base();
  kicker(s, 'Tried and blocked');
  title(s, 'Every scalping trick fails');
  const rows = [
    ['Sell the ticket off chain', 'The seller can always claw it back with a refund'],
    ['Bot army enters the draw', 'Not in the verified registry'],
    ['Enter twice, buy past the cap', 'Nullifiers refuse the second try'],
    ['Organizer rigs the draw', 'Seed does not match its sealed commitment'],
    ['Pay above face value', 'Pay exactly face value'],
    ['Use one ticket twice at the door', 'Already used; screenshots expire in 30 s'],
  ];
  rows.forEach(([a, b], i) => {
    const y = 2.25 + i * 0.72;
    card(s, 0.7, y, 12, 0.6);
    s.addText('✕', { x: 0.9, y, w: 0.4, h: 0.6, fontFace: B, fontSize: 16, bold: true, color: C.no, valign: 'middle', margin: 0, isTextBox: true });
    s.addText(a, { x: 1.35, y, w: 5.2, h: 0.6, fontFace: B, fontSize: 15, bold: true, color: C.ink, valign: 'middle', margin: 0, isTextBox: true });
    s.addText(b, { x: 6.6, y, w: 6, h: 0.6, fontFace: B, fontSize: 14, color: C.muted, valign: 'middle', margin: 0, isTextBox: true });
  });
  s.addText('npm run attack', { x: 0.7, y: 6.7, w: 6, h: 0.4, fontFace: 'Courier New', fontSize: 14, color: C.teal, margin: 0, isTextBox: true });
}

// 8. Proof it works
{
  const s = base();
  kicker(s, 'It works');
  title(s, 'Real proofs, real transactions');
  const stats = [
    ['18', 'real ZK transactions: full lifecycle on a Midnight Local Devnet'],
    ['22', 'tests plus attack scripts, run on every push'],
    ['0', 'setup needed for “Try it now” in any browser, phone included'],
  ];
  stats.forEach(([n, l], i) => {
    const x = 0.7 + i * 4.1;
    card(s, x, 2.3, 3.8, 2.4);
    s.addText(n, { x: x + 0.3, y: 2.5, w: 3.3, h: 1.1, fontFace: H, fontSize: 60, bold: true, color: [C.pink, C.violet, C.teal][i], margin: 0, isTextBox: true });
    s.addText(l, { x: x + 0.3, y: 3.6, w: 3.3, h: 1.0, fontFace: B, fontSize: 14, color: C.muted, margin: 0, valign: 'top', isTextBox: true });
  });
  s.addText(
    [
      { text: 'Live site  ', options: { bold: true, color: C.ink } },
      { text: 'tryfacevalue.xyz', options: { color: C.teal, breakLine: true } },
      { text: 'Code  ', options: { bold: true, color: C.ink } },
      { text: 'github.com/Datwebguy/facevalue', options: { color: C.teal } },
    ],
    { x: 0.7, y: 5.2, w: 12, h: 1.2, fontFace: B, fontSize: 18, margin: 0, isTextBox: true },
  );
}

// 9. Where it goes
{
  const s = base();
  kicker(s, 'What’s next');
  title(s, 'From first show to every show');
  const cols = [
    ['One tap for fans', 'Organizer sponsors the fees, proofs made on the phone, card or KRW stablecoin checkout.'],
    ['Real identity', 'Passport or mobile ID check once (Self, Korean mobile ID), reused silently for every show.'],
    ['Who pays', 'Ticket platforms and agencies facing the new law. Per ticket fee, no biometric liability.'],
  ];
  cols.forEach(([h, b], i) => {
    const x = 0.7 + i * 4.1;
    card(s, x, 2.3, 3.8, 3.2);
    s.addText(h, { x: x + 0.3, y: 2.55, w: 3.3, h: 0.6, fontFace: H, fontSize: 20, bold: true, color: C.ink, margin: 0, isTextBox: true });
    s.addText(b, { x: x + 0.3, y: 3.25, w: 3.3, h: 2.1, fontFace: B, fontSize: 15, color: C.muted, margin: 0, valign: 'top', isTextBox: true });
  });
  s.addImage({ path: `${BRAND}/icon-512.png`, x: 0.7, y: 6.0, w: 0.7, h: 0.7, rotate: -8 });
  s.addText([{ text: 'FaceValue ', options: { color: C.ink } }, { text: '정가', options: { color: C.pink } }], {
    x: 1.55, y: 6.05, w: 6, h: 0.6, fontFace: H, fontSize: 26, bold: true, margin: 0, isTextBox: true,
  });
  s.addText('Fair tickets, private fans.', { x: 7, y: 6.1, w: 5.7, h: 0.5, fontFace: B, fontSize: 16, color: C.muted, align: 'right', margin: 0, isTextBox: true });
}

pres.writeFile({ fileName: OUT }).then(() => console.log('wrote', OUT));
