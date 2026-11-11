# PART3_IMPLEMENTATION_PLAN.md

## A. Existing Architecture (as of 2026-10-31)

### 1. Core data model
- **`src/types/archive.ts`** defines the canonical **`ArchiveRecord`** interface (schemaVersion `1.0.0`).
- Fields include bilingual `title`, `summary`, `narrative`, `date`, `location`, `claims`, `sources`, `evidenceMedia`, `relationships`, `categories`, `tags`, `verificationStatus`, `editorialStatus`, `privacyClassification`, etc.
- No separate models for *dossiers*, *claims*, *sources* – they are embedded within the `ArchiveRecord` structure.

### 2. Data storage
- All seed data lives in a **single monolithic file**: `src/data/seedRecords.ts` exporting `SEED_ARCHIVE_RECORDS: ArchiveRecord[]` (≈1200 lines, ~75 KB).
- Tests import this array directly for validation, search and graph utilities.

### 3. Search & Graph
- **Search** (`src/util/searchEngine.ts`) works on an in‑memory array; supports simple text query, domain filter, year range, etc.
- **Graph utilities** (`src/util/graphUtils.ts`) build a lightweight adjacency map (`Map<string, Set<string>>`) on demand – O(N) build, O(1) look‑ups.
- No persisted index; the whole dataset is traversed at runtime.

### 4. Publication / Privacy gateway
- `src/util/publicationGateway.ts` (or similar) exports `isPubliclyPublished(record)` which checks `editorialStatus` (`published`) and `privacyClassification` (`public`).
- Draft / review records are excluded from the public build.

### 5. Editorial Studio (initial version)
- Very minimal UI under `src/pages/editorial/*` – a simple dashboard with a list of records and a basic edit form.
- Uses the same data files as the public site (no separation of draft vs. published bundles).

### 6. CI / Build
- **Vite** for bundling (`vite.config.ts`).
- GitHub Actions workflow (`.github/workflows/ci.yml`) runs `npm ci`, `npm run lint`, `npm test`, and `npm run build`.
- No data‑validation step beyond TypeScript type‑checking.

### 7. Tests
- Unit tests under `src/test/` covering:
  - Search (`searchEngine.test.ts`)
  - Graph utilities (`graphUtils.test.ts`)
  - Data integrity (`dataIntegrity.test.ts`)
- Tests import the monolithic `SEED_ARCHIVE_RECORDS` directly.

### 8. Routing & Pages
- Public routes are generated via Vite‑React router; domain landing pages are **not** present – all records are rendered through a generic list/detail view.
- No dedicated dossier pages.

## B. Part 3 Gaps

| Area | Missing / Incomplete Feature |
|------|------------------------------|
| **Modular data architecture** | All records live in one file; no domain‑specific directories or deterministic registries. |
| **Master registry** | No composition of domain modules; duplicate‑ID detection absent. |
| **Dossier model** | No separate dossier type; dossiers would have to be duplicated as records. |
| **Evidence & claim granularity** | Claims are embedded in records without a stand‑alone model, no explicit claim‑type taxonomy, no counter‑claims or denials. |
| **Source manager** | Sources are only objects inside a record; no centralized source registry, no support for physical sources without URLs. |
| **Editorial Studio** | UI only edits records; no dedicated editors for sources, claims, relationships, timelines, media, or dossiers. |
| **Publication workflow** | No explicit draft → review → publish pipeline; validation is minimal. |
| **Import/Export** | No JSON/CSV import/export utilities, no change‑package generation. |
| **Domain landing pages** | No public pages scoped per domain; statistics are hard‑coded if present. |
| **Dossier pages** | No public dossier rendering. |
| **Search integration** | Search only knows about `ArchiveRecord`; dossiers and new entities are invisible. |
| **Graph integration** | Graph utilities only index records; new entities (dossiers, claims) would be ignored. |
| **Timeline editor** | No UI for uncertain dates or cross‑domain chronology. |
| **Media manager** | Media metadata exists only ad‑hoc inside records; no centralized manager or rights handling. |
| **Validation engine** | Limited to TypeScript; no business‑rule validation (duplicate IDs, relationship integrity, claim‑type → source matching, privacy rules, bilingual completeness). |
| **Testing coverage** | No tests for modular registries, dossiers, claim‑source validation, import/export, or the expanded editorial UI. |
| **CI steps** | No data‑validation step, no secret‑scan, no lint for new TypeScript modules. |
| **Security** | No automated secret scan; UI may allow raw HTML injection via markdown fields. |
| **Performance** | Whole‑dataset load on every page; future >10k records would degrade without lazy loading. |

## C. Implementation Strategy

### 1. Reuse / Extend Existing Components
- **`ArchiveRecord`** – keep unchanged; all domain modules will export `ArchiveRecord[]` arrays.
- **Search engine** – extend its index builder to accept an array of records *and* dossiers.
- **Graph utils** – refactor to accept multiple entity collections (records, dossiers, claims) but keep the current adjacency‑map approach.
- **Publication gateway** – add helper `isDraft(record)` and `isDemo(record)`; keep existing `isPubliclyPublished`.
- **CI workflow** – add steps for `npm run validate-data` (new script) and `npm run secret-scan` (use `git secrets` or a simple regex scan).
- **Tests** – augment existing test suites rather than replace them.

### 2. New Modules (to be added)
| Module | Purpose | File location |
|--------|---------|---------------|
| **Domain registries** | One file per domain exporting a typed array of `ArchiveRecord`. | `src/data/records/<domain>/<domain>Records.ts` |
| **Master registry** | Imports all domain arrays, concatenates, performs duplicate‑ID & relationship validation, re‑exports `ALL_ARCHIVE_RECORDS`. | `src/data/records/index.ts` |
| **Dossier types** | Interface `Dossier` with metadata, chronology, people, institutions, claims, sources, media, relationships. | `src/types/dossier.ts` |
| **Dossier registries** | Domain‑specific dossier arrays (e.g., `src/data/dossiers/journalism/arshadSharifDossier.ts`). | `src/data/dossiers/<domain>/<dossierName>.ts` |
| **Source manager** | Central registry of all sources (`Source[]`), utility functions to find by `sourceId`. | `src/data/sources/index.ts` |
| **Claim model** | Stand‑alone `Claim` interface and utilities for validation, counter‑claims, denials. | `src/types/claim.ts` |
| **Media manager** | Types for `DocumentMeta`, `PhotoMeta`, `VideoMeta`, `InterviewMeta` and a registry. | `src/types/media.ts` |
| **Import/Export service** | Functions `exportArchiveJSON()`, `importArchiveJSON()`, `generateChangePackage()`. | `src/util/io.ts` |
| **Editorial UI components** | RecordEditor, SourceEditor, ClaimEditor, RelationshipEditor, TimelineEditor, MediaManager, DossierEditor, Dashboard. | `src/components/editorial/*` |
| **Domain landing pages** | Dynamic pages that read the domain registry and compute stats at build‑time. | `src/pages/domain/<domain>.tsx` |
| **Dossier public pages** | Generic dossier renderer that consumes `Dossier` data. | `src/pages/dossier/[slug].tsx` |
| **Validation engine** | `src/util/validate.ts` exposing `validateArchive(allRecords, allDossiers, allSources)` returning an array of `ValidationError`. | `src/util/validate.ts` |
| **Timeline editor** | UI component that builds chronology entries with uncertain dates. | `src/components/editorial/TimelineEditor.tsx` |
| **Secret scanner** | Simple script scanning the repo for patterns (`AKIA`, `ghp_`, etc.). | `scripts/secret-scan.js` |

### 3. Refactoring Steps
1. **Move `seedRecords.ts` content** into domain modules (e.g., legal, journalism, economic_public_policy). Keep a copy for reference.
2. **Create master registry** that imports each module and runs a validation step (duplicate IDs, missing sources, invalid relationships). Export `ALL_ARCHIVE_RECORDS`.
3. **Introduce `src/data/sources/index.ts`** – extract all `sources` objects from the existing records into a central list; each record will reference source IDs.
4. **Extract `claims`** from records into a top‑level `claims` registry; update `ArchiveRecord` to reference `claimIds` instead of embedding full objects.
5. **Define `src/types/claim.ts`** with fields required in the prompt (claimId, statement, urduStatement, claimType, sourceIds, recordIds, dossierIds, status, confidence, timestamps).
6. **Create dossier interfaces** and a few starter dossiers (Arshad Sharif, an IPP example, a blasphemy case) using only existing seed data; mark them as `draft`/`demo` as appropriate.
7. **Implement validation engine** that runs as part of `npm run validate-data` and is also invoked in CI.
8. **Build Editorial Studio** using the existing design system; add navigation tabs for Records, Sources, Claims, Dossiers, Media, Timeline, Dashboard.
9. **Add import/export commands** (`npm run export`, `npm run import`) that produce/consume JSON and generate a `change/` package.
10. **Update routing** – public routes now include `/legal`, `/journalism`, `/dossiers/[slug]` etc.; each page pulls data from the master registry.
11. **Enhance search** – extend the indexing function to include dossiers and claim metadata; preserve the 10 k‑record performance by lazy‑loading domain bundles.
12. **Add CI steps** – lint, type‑check, run `npm run validate-data`, run `scripts/secret-scan.js`.
13. **Write documentation** – `DOSSIER_ARCHITECTURE.md`, `EDITORIAL_WORKFLOW.md`, `EVIDENCE_MODEL.md`, `DATA_IMPORT_GUIDE.md`.

### 4. Timeline & Performance
- **Lazy‑load domain bundles** via dynamic `import()` when a user navigates to a domain page; this keeps the initial bundle < 500 KB.
- **Static generation** of domain landing pages at build‑time using Vite’s prerender capability, so GitHub Pages serves pre‑built HTML.
- **Memoized graph index** – recompute only when source data changes (handled by the build step).

### 5. Security & Accessibility
- Strip any raw HTML from markdown fields before rendering (use a sanitizer like DOMPurify).
- Ensure all form inputs have proper `label` elements, keyboard focus order, and sufficient colour contrast (use the existing design tokens).
- Run secret‑scan as part of CI; the script will fail the build if any secret‑like pattern is found.

### 6. Testing Additions
- **Registry tests** – verify each domain file loads, duplicate IDs cause a failure.
- **Dossier tests** – ensure dossier references resolve, chronology ordering works, demo records are excluded from public build.
- **Claim validation tests** – claim‑type ↔ source‑type enforcement.
- **Import/Export round‑trip test** – export JSON, import back, compare structures.
- **Performance benchmark** – load all domain bundles and run a sample search; assert response < 200 ms.

### 7. Deliverables (files to be created / modified)
- `src/data/records/<domains>/...` (multiple new files)
- `src/data/records/index.ts` (master registry)
- `src/types/dossier.ts`, `src/types/claim.ts`, `src/types/media.ts`
- `src/data/dossiers/...` (example dossiers)
- `src/data/sources/index.ts`
- `src/util/validate.ts`, `src/util/io.ts`
- Editorial UI component directory `src/components/editorial/*`
- New pages under `src/pages/domain/` and `src/pages/dossier/`
- Updated CI workflow `.github/workflows/ci.yml`
- New scripts `scripts/secret-scan.js`
- Documentation files `DOSSIER_ARCHITECTURE.md`, `EDITORIAL_WORKFLOW.md`, `EVIDENCE_MODEL.md`, `DATA_IMPORT_GUIDE.md`
- Updated test suite under `src/test/`

---

**Next actions** (Phase 3 onward):
1. Split the monolithic seed file into domain modules (legal, journalism, etc.).
2. Build the master registry with validation.
3. Define the `Claim` and `Source` models and refactor existing records to reference them.
4. Implement the dossier architecture and create the representative dossiers.
5. Expand the Editorial Studio UI to support the new editors.
6. Integrate the new registries into search, graph, and timeline pipelines.
7. Add import/export utilities and CI validation steps.
8. Write the supporting documentation.
9. Run the full test & build cycle and produce `PART3_IMPLEMENTATION_REPORT.md`.

*All subsequent work will follow the phased order defined in the master prompt.*
