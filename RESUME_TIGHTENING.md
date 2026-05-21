# Resume tightening — next moves

Status as of 2026-05-15.

## Working notes for a new agent

- **Read `src/data/resume.ts` before editing.** Adam adjusts punctuation between turns (em-dashes → hyphens, word choices like "sunset" → "legacy"). Possibly an autoformatter, possibly manual. Confirm exact strings before calling Edit or you'll hit "String to replace not found."
- **Don't fabricate metrics on Liberty work.** RMIS is in-flight — see memory `project_rmis_status.md` (foundations phase, no services fully migrated, Adam leads data side). P&T usage metrics aren't shareable due to NDA + strategic-initiative exposure. Default to placeholders Adam can fill, or use qualitative transformation framing ("consolidated X", "replaced Y") rather than impact metrics.
- **Adam's edit cadence:** discuss first, present options when there's a real judgment call, edit only when told ("take a stab"), pause after each edit for review. Don't batch large edits without confirmation. When there's a judgment call, give a short option menu (A/B with a stated lean), not an open "what do you think?"
- **Adam under-claims his own work.** Push back gently when he says "there's no story there" — he tends to undersell things that are actually concrete and shareable. Example this session: he initially dismissed the P&T story as "not a huge story." Once prompted, he described a clean transformation (vendor-tool sprawl → three unified platforms supporting Liberty's public "best place to work" priority) that became the lead P&T bullet.

## Already done this session

- Rewrote the three RMIS bullets in `src/data/resume.ts`. Each now ends in an outcome (or a clearly marked placeholder), framing scoped to "data layer" leadership and "foundations phase" — not full-platform lead, not migration-complete.
- Placeholders still to fill in those bullets:
  - `[N]` downstream consumers (bullet 2)
  - "concrete in-flight outcome" slot (bullet 3) — pilot service count, ADRs ratified, parallel workstreams unblocked, etc.
- Compressed the P&T section from four bullets to two — anchored to the consolidation-of-vendor-sprawl framing and Liberty's "best place to work" strategic priority. Kept the 40K-multilingual scope. Outcome stays qualitative ("systems each function actually adopted") since usage metrics aren't shareable.
- Added a standalone **Operating principles across both platforms** bullet at the end of the Senior SWE section (Option A). Surfaces "boring tools, explicit boundaries, small reversible shipments" as its own line rather than burying it as a tail clause. Tagline (`signature`) left as-is per Adam's recent change.

## Candidate moves, ranked

1. **Tighten the four pre-Liberty roles** (Trilogy, ATOM, Devine Millimet, Brown Rudnick). They take real space and the bullets are soft ("habits that separate working code from maintainable code," "Sharpened mentorship and technical-communication muscles"). Each role should be two lines: scope/scale, then quantified outcome or specific deliverable. These are the proof of the operator-turned-builder claim, but only if they read crisp.

2. **Cut `leadershipThemes` from the web page.** Third restatement of what `proofPoints` and positioning already cover. PDF doesn't render it; web page is the inconsistent one. Pure deletion in `ResumeContent.astro` (and optionally the field on `resumeData`).

3. **Compress signature + positioning + summary** so they stop repeating each other. "Apply AI where it creates real leverage" appears verbatim in `positioning` and `summary`. Same for "shape architecture" and "ambiguous business problems." Pick one home per phrase.

4. **Split Liberty into two role entries** in the data shape (Senior 2021–Present, SWE 2019–2021). Cleaner ATS parsing, lets each sub-role carry its own dates, removes the bolded-list-item-as-fake-header pattern in `achievements[]`.

## Tabled for later

- **Tagline (`signature` field).** Adam recently revised it and kept it as-is. Prior agent take, preserved for a future revisit: the tagline makes generic positive claims when it could stake a position only Adam can stake, and "Fortune 100 scale" is redundant with the impact strip directly below. The phrase "boring tools, explicit boundaries, small reversible shipments" — now living in the Operating Principles bullet — is a strong candidate if Adam ever wants to promote it to the tagline (Option B from the earlier conversation).
- **Headline rewrite.** "Senior Full-Stack Engineer | Enterprise Platforms & Applied AI" is what every senior FS engineer writes. The operator-turned-engineer angle isn't surfaced above the fold.
- **Hyphen → em-dash consistency pass** across `resume.ts`. Cosmetic but noticeable.
