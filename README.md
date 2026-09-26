# FaceValue · 정가

**English** · [한국어](README.ko.md)

**Anti-scalping tickets on Midnight. Every fan is verified. Nobody learns who they are.**

Korea's anti-scalping law took effect on **28 August 2026**. Ticket platforms must now verify
buyers, and resale above face value is illegal. The industry's answers so far all collect more
personal data: real-name ID checks at the gate, HYBE's *Face Pass* facial recognition, iris-scanning orbs.
They land just as the amended Personal Information Protection Act (in force 11 Sep 2026) and
Coupang's record ₩624.7 billion ($409M) data-breach penalty made holding that data a liability.

FaceValue does the verification **without collecting anything**:

| Step | What happens | Who learns what |
|---|---|---|
| **Enroll once** | An issuer checks the fan is a unique human and adds a *hashed commitment* to a Merkle registry on Midnight. | The issuer learns "one new human". The chain stores a hash. |
| **Enter the draw** | The fan proves in zero knowledge that they are *some* registry member, once per show. No speed race, so macros are useless. | Everyone sees the entry count, not who entered. |
| **Fair draw** | The organizer sealed its seed before entries opened. Seed + every entrant's random contribution + a public beacon picks a capacity-sized window of winners. | Anyone can recheck the draw. The organizer cannot steer it. If it never reveals, anyone may run the draw after the deadline, and the show is marked *organizer defaulted*. |
| **Claim at face value** | The winner pays exactly face value in **shielded** tKRW. A per-fan cap is enforced with nullifiers. | The payer's wallet and balance stay hidden. |
| **Return = the only exit** | There is **no transfer circuit**. A ticket can only go back to the pool for an exact face-value refund. The next verified fan buys it at face value. | A scalper can't deliver a seat to a buyer: whoever holds the secrets can always claw the ticket back. |
| **Check in at home, walk in instantly** | Check-in spends the ticket on-chain and registers a fresh device key. At the door the phone shows a QR code re-signed every 30 s. The gate checks the signature offline in milliseconds. | The venue learns "valid, not yet admitted". No name, no ID, no face. |

## What is live vs. illustrated

| Piece | Status |
|---|---|
| Compact contract (`contract/src/facevalue.compact`, 10 circuits) | **Live.** Compiled with real proving keys. |
| Full lifecycle with real ZK proofs on a Midnight network | **Live on a local Midnight network**, 19 transactions (`docs/evidence/local-run.json`). Preprod run in progress. |
| Shielded payment into the contract and refund out of it | **Live.** Proven on-chain (`cli/src/spike-pay.ts`). |
| Attack scripts (resale clawback, bots, double entry, rigged draw, above-face payment, double admission) | **Live.** `npm run attack` runs the compiled circuits. |
| Show dashboard reading public contract state | **Live.** Reads straight from the Midnight indexer. |
| Device-bound rotating gate pass and offline gate scanner | **Live** (WebCrypto P-256, non-extractable key). |
| Identity issuer | **Demo issuer key.** A real passport check (Self, *proof of human*) is the next integration. |
| tKRW | **Test token.** A shielded testnet stablecoin minted by anyone. |

### Known limitations (stated up front)

- **Refund addresses.** A refund, or the organizer's withdrawal, reveals the *receiving wallet's*
  shielded address on-chain. It does not reveal identity or which ticket. Fans should use a
  fresh wallet per refund.
- **Handing over the phone.** Anyone holding the fan's secrets *and* device can enter. Selling
  them is still pointless, because the seller can always claw the ticket back.
- **Contention.** Every purchase updates one treasury coin, so purchases in the same block
  conflict and one retries.

## Run it

```bash
npm install
npm test                 # 22 tests: contract simulator + gate-pass crypto
npm run attack           # adversarial scripts against the compiled circuits
npm run localnet         # local Midnight node, indexer, proof server (Docker)
npm run e2e -- local     # full lifecycle with real proofs, writes docs/evidence/local-run.json
npm run dev -w app       # web app: dashboard, gate pass, gate scanner
```

The contracts are compiled with Compact **0.31.1**: `npm run compact`. This uses the `compact` toolchain
if installed, otherwise the pinned Linux compiler in Docker. The compiled output is committed, so
tests run without the compiler.

## How Midnight is used

- **Compact proves**: registry membership (Merkle path, private), one entry per human per show
  (entry tags), winner status (seed commitment + integer draw, with the division checked in-circuit), the
  per-fan cap (slot nullifiers, slot number private), ownership of an unspent ticket (Merkle path +
  nullifier), and an exact face-value payment.
- **Disclosed**: counts, the draw seed after reveal, nullifiers and commitments, the price.
- **Shielded tokens**: payments into a contract-held treasury (`receiveShielded`, `mergeCoinImmediate`),
  refunds with `sendShielded`.
- **Why privacy is required**: the law demands identity-bound tickets. Without zero knowledge,
  identity-bound means a database of who went to which concert.
