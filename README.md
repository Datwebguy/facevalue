# FaceValue · 정가

**English** · [한국어](README.ko.md) · **Live site: https://tryfacevalue.xyz**

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
| **Fair draw** | The organizer sealed its seed before entries opened. Seed + every entrant's random contribution + a public beacon picks a capacity-sized window of winners. | Anyone can recheck the draw. The seed cannot be swapped after entries are seen. The beacon value is posted by the organizer and is checked against drand off-chain, not in the contract (see limitations). If the organizer never reveals, anyone may run the draw after the deadline, and the show is marked *organizer defaulted*. |
| **Claim at face value** | The winner pays exactly face value in **shielded** tKRW. A per-fan cap is enforced with nullifiers. | The payer's wallet and balance stay hidden. |
| **Return = the only exit** | There is **no transfer circuit**. A ticket can only go back to the pool for an exact face-value refund. The next verified fan buys it at face value. | No price above face value can pass through the contract, and a seller who hands over the secrets can claw the ticket back until the buyer checks in (see limitations). |
| **Check in at home, walk in instantly** | Check-in spends the ticket on-chain and registers a fresh device key. At the door the phone shows a QR code re-signed every 30 s. The gate checks the signature offline in milliseconds. | The venue learns "valid, not yet admitted". No name, no ID, no face. |

## What is live vs. illustrated

| Piece | Status |
|---|---|
| Compact contract (`contract/src/facevalue.compact`, 10 circuits) | **Live.** Compiled with real proving keys. |
| Full lifecycle with real ZK proofs on a Midnight network | **Live on a Local Devnet** (Midnight node, indexer, proof server), 18 transactions (`docs/evidence/local-run.json`). Reproduce with `npm run localnet && npm run e2e -- local`. A Preprod run is scripted (`.github/workflows/preprod.yml`) but the faucet payout did not reach the wallet within the job's time limit. |
| Shielded payment into the contract and refund out of it | **Live on a Local Devnet** with real proofs (`cli/src/spike-pay.ts`). |
| Attack scripts (resale clawback, bots, double entry, seed swap, above-face payment, double check-in) | **Live.** `npm run attack` runs the compiled circuits. Known gaps are pinned by tests in `contract/src/test/limits.test.ts`. |
| Show dashboard reading public contract state | **Built.** Reads straight from the Midnight indexer once a Preprod deployment is published. Until then the home page shows the recorded Local Devnet run, labelled as such. |
| Device-bound rotating gate pass and offline gate scanner | **Live** (WebCrypto P-256, non-extractable key). |
| Identity issuer | **Demo issuer key.** A real passport check (Self, *proof of human*) is the next integration. |
| tKRW | **Test token.** A shielded testnet stablecoin minted by anyone. |

### Known limitations (stated up front)

- **Refund addresses.** A refund, or the organizer's withdrawal, reveals the *receiving wallet's*
  shielded address on-chain. It does not reveal identity or which ticket. Fans should use a
  fresh wallet per refund.
- **Resale by handing over secrets.** A seller who gives a buyer the fan secret can claw the
  ticket back only until the buyer checks in. A buyer who checks in first binds the ticket to
  their own device, so a "check in, then pay" deal can still work off-chain. The seller also
  hands over their whole fan credential. Planned fix: open check-in only close to show time.
- **Beacon trust.** The organizer posts the drand beacon value at reveal. The contract checks
  the sealed seed, but not that the beacon matches the announced drand round, so anyone
  auditing the draw must compare it with drand. The recorded Local Devnet run used a fixed test
  value. If the organizer defaults, the draw uses entrant contributions only, which the last
  entrant can influence; such shows are publicly marked *organizer defaulted*.
- **Organizer controls the phases.** The organizer decides when the claim window ends and when
  the show closes. Closing early stops later check-ins and refunds. Planned fix: minimum
  durations enforced by the contract.
- **Gate codes.** A code is accepted for its own 30-second window and one either side, so a
  screenshot stops working 30 to 60 seconds after it was taken. Each offline scanner keeps its
  own admitted list, so separate gates should sync before doors open.
- **Contention.** Every purchase updates one treasury coin, so purchases in the same block
  conflict and one retries.

## Run it

```bash
npm install
npm test                 # 27 tests: contract simulator, gate-pass crypto, known limits
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
