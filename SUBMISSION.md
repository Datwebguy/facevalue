# Submission answers (Midnight Korea Hackathon 2026)

Copy each block into the Tally form. The **[you]** fields must match what you entered on Luma.

## Team info
**[you]** Name / email / role, exactly as on Luma. Individual entry.

## Contact
**[you]** Email or Discord handle.

## GitHub repository
https://github.com/Datwebguy/facevalue (public, topic `midnightntwrk` added)

## Project name
FaceValue (정가)

## One-line description
Anti-scalping concert tickets on Midnight: every fan is verified, nobody learns who they are, and tickets can only ever change hands at face value.

## Project description
Korea's anti-scalping law (in force 28 August 2026) requires ticket platforms to verify buyers. So far the industry has answered with more personal data: real-name ID checks at the gate, and HYBE's Face Pass facial recognition. That data became a liability once the amended PIPA took effect, and after Coupang's record ₩624.7 billion breach penalty.

FaceValue verifies fans without collecting anything:
1. **Verify once.** An issuer confirms a fan is a unique person and adds only a hashed commitment to a Merkle registry on Midnight.
2. **Fair draw instead of a speed race.** Each verified fan can enter a show's draw once, so bots and extra accounts are useless. The organizer seals its seed before entries open. The winners are a fair window of entries, chosen from that seed, every entrant's random contribution and a public drand beacon. If the organizer never reveals its seed, anyone can run the draw after the deadline.
3. **Face value only.** Winners pay exactly face value in shielded tKRW. A per-fan cap is enforced with nullifiers.
4. **No transfer function at all.** The only way out of a ticket is a face-value refund back to the pool, and the next verified fan buys that seat at face value. A scalper can never deliver a seat to a buyer: whoever holds the secrets can always claw the ticket back, so the black market cannot work.
5. **Walk straight in.** The fan checks in from home, which spends the ticket and registers a one-time device key. At the door the phone shows a QR code re-signed every 30 seconds, and the gate verifies it offline in milliseconds. No ID, no face scan.

Core flow: Organizer opens the box office and announces a show → fan creates a private fan ID → issuer verifies the fan → fan enters the draw → winners buy at face value → a fan who can't go returns the ticket for a refund → another fan buys it at face value → fans check in → staff scan at the door.

## How Midnight is used
**What Compact proves (10 circuits, `contract/src/facevalue.compact`):**
- membership in the verified-fan registry, via a private Merkle path
- one entry per person per show, via entry tags
- that a fan was drawn: the seed commitment is opened, and the integer division is checked in-circuit
- the per-fan ticket cap, via slot nullifiers, with the slot number kept private
- ownership of an unspent ticket, via a Merkle path and nullifier
- an exact face-value payment

**What is disclosed:** counts (seats, entries, tickets issued, returned and checked in), the draw seed after reveal, nullifiers and commitments, and the price. Anyone can audit that the draw was fair and that nobody paid above face value.

**What stays private:** who entered, who won, who holds which ticket, who returned one, and the fan's identity.

**Shielded tokens:** payments go into a contract-held treasury (`receiveShielded`, `mergeCoinImmediate`), and refunds go out with `sendShielded`. This was proven on-chain with real proofs.

**Why privacy is needed:** the law demands identity-bound tickets. Without zero knowledge, identity-bound means a database of who went to which concert. Midnight lets the platform prove compliance publicly while knowing nothing about any individual fan.

## Project deck (Google Slides link)
**[you]** Import `docs/FaceValue-deck.pptx` into Google Slides (File → Import slides, or open the file from Google Drive), set sharing to "Anyone with the link can view", and paste the link here.

## Demo video
**[you]** YouTube or Loom link (3 minutes or less).

## Demo URL
https://tryfacevalue.xyz

## How to run / demo flow
```bash
git clone https://github.com/Datwebguy/facevalue && cd facevalue
npm install
npm test          # 22 tests
npm run attack    # scalping attacks blocked by the compiled circuits
npm run localnet  # local Midnight node + indexer + proof server (Docker)
npm run e2e -- local   # full lifecycle with real proofs, 18 transactions
```
The compiled contract is committed. To recompile: `npm run compact` (Compact 0.31.1).

Live on Preprod: open https://tryfacevalue.xyz with Lace on Preprod, with the proof server set to local (`docker run -p 6300:6300 midnightntwrk/proof-server:8.0.3 midnight-proof-server`).

## Midnight Academy certificates
**[you]** Upload the Stage 1 (Explorer) and Stage 2 (Scholar) certificates. They add +1 point each.
