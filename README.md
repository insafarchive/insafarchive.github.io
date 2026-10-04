# Insaf Archive | انصاف آرکائیو

**Public Digital Legal Archive of Pakistan — Phase 3 Evidence, Documents & Media Archive System**  
*Repository:* [insafarchive](https://github.com/insafarchive)

---

## 1. Overview & Institutional Mandate

**Insaf Archive** is an open, non-partisan digital legal research platform and public repository documenting court judgments, constitutional petitions, human rights reports, certified procedural records, and verified audio-visual evidence in Pakistan.

The archive strictly addresses public legal literacy and prevents the conflation of preliminary allegations with judicial findings. Every case record adheres to a strict evidentiary standard distinguishing:
1. **Unproven Allegations & FIR Claims**: Statements recorded by prosecuting agencies or private complainants.
2. **Party Statements & Defense Replies**: Written submissions by defendants or petitioners under oath.
3. **Verified Procedural Records**: Facts documented in certified court order sheets, judicial magistrate remand records, or institutional inspection reports.
4. **Signed Judicial Orders & Rulings**: Operative findings, constitutional precedents, and holdings signed by presiding benches of the Supreme Court and High Courts.
5. **Verifiable Documentary & Media Evidence**: Primary source YouTube open-court broadcasts, certified high court order sheets, archival register photographs, and institutional forensic science reports.

---

## 2. Normalized Data Architecture & Field Schema

Legal case records are normalized under the `CaseRecord` TypeScript interface (`src/types/index.ts`):

| Field | Type | Description |
|---|---|---|
| `id` | `string` | Stable unique identifier (e.g., `PK-SC-2024-0102`, `PK-LHC-2023-0451`). |
| `slug` | `string` | URL-safe slug for deep-linking. |
| `caseNumber` | `string` | Official court docket, petition, or FIR reference (e.g., `Const. P. 102/2024`). |
| `title` | `{ en: string, ur: string }` | Bilingual title in English and Urdu. |
| `summary` | `{ en: string, ur: string }` | Concise bilingual summary of proceedings. |
| `factualBackground` | `{ en: string, ur: string }` | Detailed neutral background of facts and procedural posture. |
| `recordType` | `RecordType` | Enum: `court_case`, `judgment`, `incident_report`, `custodial_inquiry`, `public_interest`. |
| `categories` | `ArchiveCategory[]` | Array of 12 supported legal categories (see taxonomy below). |
| `location` | `Object` | Contains `province`, optional `district`, `city`, and `incidentLocation`. |
| `incidentDate` / `filingDate` | `string` (ISO `YYYY-MM-DD`) | Known dates of occurrence or judicial registration. |
| `court` | `{ en: string, ur: string }` | Name of the presiding judicial forum. |
| `courtLevel` | `CourtLevel` | Enum: `supreme_court`, `high_court`, `district_sessions`, `special_tribunal`, `magistrate_court`, `unknown`. |
| `bench` | `{ en: string, ur: string }` | Composition of the bench or presiding judicial officer. |
| `statutoryProvisions` | `string[]` | Relevant statutes (e.g. `Constitution Art. 19`, `CrPC Sec. 497`). |
| `parties` | `Party[]` | Name, role, `isProtectedOrMinor`, and `redacted` flags for sensitive parties. |
| `proceduralStatus` | `ProceduralStatus` | 10 legally distinct procedural states (see below). |
| `timeline` | `ProceduralMilestone[]` | Chronological procedural milestone events with dates and outcomes. |
| `evidenceItems` | `EvidentiaryItem[]` | Tripartite/4-tier breakdown (`allegation`, `party_statement`, `official_record`, `court_finding`). |
| `connectedDocuments`| `ConnectedDocument[]` | Certified court orders, citations (SCMR/PLD), and full-text extracts. |
| `videoEvidence` | `VideoEvidenceItem[]` | YouTube IDs, channel credits, durations, and timestamped takeaways. |
| `mediaItems` | `MediaItem[]` | Linked multimodal evidence items (`youtube_video`, `document`, `image`, `external_source`). |
| `sources` | `SourceReference[]` | Issuing institutions, citations, and verification audit notes. |
| `lastUpdated` | `string` (ISO `YYYY-MM-DD`) | Date of most recent procedural audit. |
| `editorialReviewStatus` | `EditorialReviewStatus`| `verified_official_record`, `corroborated_reporting`, `preliminary_documentation`, `under_editorial_review`. |
| `relatedCaseIds` | `string[]` | Cross-referenced case IDs within the archive. |
| `tags` | `string[]` | Searchable index tags. |
| `isDemonstrationData` | `boolean` | Flag indicating synthetic/educational demonstration records. |

---

## 3. Media & Evidence Data Model (Phase 3)

The archive includes a first-class `MediaItem` schema (`src/data/media/index.ts` and `src/types/index.ts`) for managing audiovisual and documentary evidence linked to case records:

- **Stable Media Identifiers**: `MED-VID-01`, `MED-DOC-01`, `MED-IMG-01`, `MED-EXT-01`.
- **Media Types**:
  - `youtube_video`: Verified judicial hearings, bar council briefings, and press conferences.
  - `document`: Certified court orders, bail judgments, and reported judicial citations (SCMR, PLD, CLD).
  - `image`: High-resolution photographs of archival court folios, judicial stamps, and physical dockets.
  - `external_source`: Institutional forensic reports (e.g., Punjab Forensic Science Agency - PFSA) and regulatory determinations.
- **Separate Date Tracking**: Event/hearing date (`eventDate`) is strictly separated from broadcast upload date (`publicationDate`) and archive ingestion date (`dateAdded`).
- **Interactive Timestamps**: Video records include timestamped notes with second offsets (`timeInSeconds`) and bilingual descriptions. Clicking a timestamp directly cues playback to that moment.
- **Privacy-Enhanced Embedding**: All YouTube embeds leverage `https://www.youtube-nocookie.com/embed/...` with `rel=0` and no autoplay, respecting visitor privacy.
- **Direct Case Dossier Navigation**: All media cards include linked case buttons that immediately navigate to the complete case dossier.

---

## 4. Legally Distinct Procedural Statuses (10 States)

To prevent misrepresenting procedural concessions as findings of innocence, the archive maintains 10 strictly separate statuses:

1. **`reported`** (ابتدائی اطلاع / ایف آئی آر): Police complaint or FIR registered; no judicial examination.
2. **`under_investigation`** (زیرِ تفتیش): Statutory agency investigation in progress before challan submission.
3. **`pending_trial`** (زیرِ سماعت مقدمہ / ٹرائل): Charges framed; active trial sub judice before a competent court.
4. **`bail_granted`** (ضمانت منظور - ٹرائل جاری): Conditional interim or post-arrest bail under Sections 497/498 CrPC. **Explicitly noted as NOT an acquittal.**
5. **`acquitted`** (باعزت بریت کا فیصلہ): Final judicial exoneration under Sections 249-A or 265-K CrPC following trial.
6. **`convicted`** (سزا یافتہ - حقِ اپیل کے تابع): Formal judicial finding of guilt, subject to statutory appeal rights.
7. **`dismissed`** (خارج شدہ / عدم شواہد اخراج): Dismissed on preliminary procedural or jurisdictional grounds.
8. **`appealed`** (اپیل زیرِ سماعت): Prior ruling challenged before an appellate High Court or the Supreme Court.
9. **`disposed_of`** (ہدایات کے ساتھ نمٹا دیا گیا): Concluded with binding operational directions to administrative authorities.
10. **`unknown`** (غیر مصدقہ / کیفیت زیرِ تحقیق): Disposition status pending certified archival retrieval.

---

## 4. Archive Categories (12 Disciplines)

1. `court_judgments`: Court Judgments & Orders (عدالتی فیصلے و احکامات)
2. `criminal_proceedings`: Criminal Proceedings (فوجداری کارروائی)
3. `civil_litigation`: Civil Litigation (دیوانی مقدمات)
4. `bail_acquittal`: Bail & Acquittal Records (ضمانت و بریت ریکارڈز)
5. `arrest_detention`: Arrest & Detention Reports (گرفتاری و حراست رپورٹس)
6. `alleged_police_misconduct`: Alleged Police Misconduct & Custodial Inquiries (پولیس زیادتی و حراستی شکایات)
7. `human_rights`: Human Rights Related Cases (انسانی حقوق سے متعلق مقدمات)
8. `missing_persons`: Missing Persons & Habeas Corpus (لاپتہ افراد و حبسِ بے جا)
9. `labour_poverty`: Labour & Poverty-Related Disputes (مزدور و معاشی حقوق کے تنازعات)
10. `women_children`: Women's & Children's Legal Rights (خواتین و بچوں کے قانونی حقوق)
11. `public_interest_political`: Public Interest & Political Cases (مفادِ عامہ و سیاسی نوعیت کے مقدمات)
12. `video_evidence`: Video & Documentary Evidence (ویڈیو و دستاویزی شواہد)

---

## 5. Adding & Editing Records

### Adding a Single Case
1. Create a new file in `src/data/cases/` following the naming convention:
   `case-[number]-pk-[court]-[year]-[id].ts`
2. Export a `CaseRecord` object conforming to `src/types/index.ts`.
3. Import and add the record into `allCaseRecords` in `src/data/cases/index.ts`.
4. Run `npm test` to verify that the new record satisfies all schema invariants and has unique IDs.

### Importing a Batch via In-App Validator
1. Navigate to **Data Import & Validator** (`/` or click the menu).
2. Paste a JSON array of `CaseRecord` objects into the editor.
3. Click **Validate Batch Schema**:
   - Checks required fields, stable IDs, ISO dates, valid statuses, provinces, and bilingual completeness.
   - Detects internal duplicates and collisions against existing archive records.
4. Click **Merge Validated Records into Archive**:
   - Merges records by stable ID without overwriting unrelated cases.
   - Persists verified additions in client storage.
5. Export validated records as clean JSON using **Export Validated JSON**.

### Adding Source Documents & YouTube Video Evidence
- **Court Documents**: Populate the `connectedDocuments` array with docket number, certified copy flag, pages count, citation reporter (e.g. `2024 SCMR 301`), and translated operative extracts.
- **YouTube Videos**: Add items to `videoEvidence` specifying the YouTube video ID, channel name, recorded date, duration, verification badge (`certified_stream`, `official_briefing`, `verified_reporting`), and timestamped takeaway notes.

---

## 6. Advanced Bilingual Search & Text Normalization

The archive implements client-side token search with Urdu text normalization (`src/utils/urduNormalize.ts`):
- **Yeh Variant Normalization**: Arabic Yeh (`ي`), Alef Maksura (`ى`), and Barree Yeh (`ے`) are unified to standard Urdu Chhoti Yeh (`ی`).
- **Kaf & Heh Normalization**: Arabic Kaf (`ك`) maps to Urdu Kaf (`ک`); Teh Marbuta (`ة`) and Arabic Ha (`ه`) map to Urdu Gol Heh (`ہ`).
- **Diacritics Stripping**: Removes Aarab / Harkat (Zabar, Zer, Pesh, Tashdeed, Tanween, Sukun/Jazm).
- **English Matching**: Case-insensitive substring and token matching across title, docket number, parties, court, province, district, statutory provisions, and tags.
- **URL Parameter Reflection**: Search queries and active filters are mirrored in URL search parameters (`?q=...&status=...&province=...&cat=...&page=...`) for shareable, bookmarkable deep links on static GitHub Pages.

---

## 7. Running Tests & Production Build

### Running the Automated Test Suite

```bash
npm test
```
The test suite (`test/validate-records.ts`) validates:
- Schema conformance of all registered records via `validateBatch`.
- Absence of duplicate IDs.
- Bilingual completeness of Urdu and English titles, summaries, and backgrounds.
- Definition and translation of all 10 procedural statuses and 12 categories.
- Urdu character normalization and diacritics stripping.
- Multi-faceted filter execution (status, province, category).
- Privacy protection safeguards (mandatory redactions for minors and protected witnesses).

### Production Build

```bash
npm run build
```
Builds the optimized production bundle in `dist/`.

---

## 8. Deployment on GitHub Pages

The application is built with relative asset links (`base: './'` in `vite.config.ts`), making it compatible with GitHub Pages repository subpaths (e.g. `https://<username>.github.io/insafarchive/`) as well as custom domains.

### Automated GitHub Actions Workflow
The workflow `.github/workflows/deploy.yml` triggers on every push to `main`:
1. Checks out repository.
2. Sets up Node.js 20 with npm caching.
3. Installs dependencies (`npm ci`).
4. Compiles TypeScript and builds bundle (`npm run build`).
5. Deploys the `./dist` folder to GitHub Pages via official actions.

---

## 9. Free Collaborative Review & Approval Workflow (Phase 4)

Insaf Archive implements an approval-based editorial workflow powered natively by GitHub Issues, Pull Requests, and automated CI tests. This maintains **100% free hosting and zero mandatory financial cost** without introducing paid external databases or insecure client-side authentication.

### The 7-Step Archival Lifecycle
```
[1. Draft] ➔ [2. Submitted] ➔ [3. Under Review] ➔ [4. Changes Requested]
                                       │
                                       ▼
                       [5. Approved] ➔ [6. Published] (or [7. Rejected])
```

1. **`Draft`**: The contributor (lawyer, researcher, or observer) compiles public docket numbers, certified court copies, and bilingual summaries.
2. **`Submitted`**: Contributor opens a standardized GitHub Issue or uses the website's in-app submission builder (`/contribute`).
3. **`Under Review`**: Assigned editorial reviewer cross-references the cited law journal (SCMR/PLD) or official court docket.
4. **`Changes Requested`**: Feedback provided if citations are incomplete, allegations are conflated with judicial findings, or minor redactions are required.
5. **`Approved`**: Primary source authenticated and factual review completed; staged for automated validation.
6. **`Published`**: Merged into `main` branch data files; GitHub Actions validates tests and deploys to GitHub Pages.
7. **`Rejected`**: Discarded if unverified, speculative, defamatory, or violating lawyer-client privilege.

---

### Standardized Submission Templates (`.github/ISSUE_TEMPLATE/`)

The repository includes structured GitHub Issue Forms:
1. **`1_new_case_submission.yml`**: Propose a new legal proceeding (case ID, bilingual title, court, docket, status, summary, allegations vs. official findings, primary citations, privacy attestation).
2. **`2_case_correction_update.yml`**: Propose updates or subsequent milestone orders for an existing case (target case ID, affected section, current text, proposed revision, supporting order sheet, status change flag).
3. **`3_media_document_submission.yml`**: Submit YouTube open-court broadcasts with timestamps, certified decrees, archival photos, or forensic reports under the Phase 3 `MediaItem` schema.
4. **`pull_request_template.md`**: Review checklist for maintainers before merging code.

---

### Roles & Trust Model (Strictly No Client-Side Passwords)

We do **not** simulate authentication using insecure client-side passwords, PINs, or localStorage tokens. Instead, GitHub repository permissions and branch protections govern write access:

| Role | Repository Access | Responsibilities |
|---|---|---|
| **Super Admin** | Repository Owner / Admin | Cryptographic maintainer access; enforces branch rules; sole merge authority into `main`. |
| **Reviewer** | Write / Triage Collaborator | Legal practitioner or editor who cross-references court journals and inspects primary order sheets. |
| **Contributor** | Issue & PR Contributor | Submits structured proposals via Issues or PRs; no direct push access to `main`. |
| **Public Reader** | Anonymous Web Access | Read-only access to published, verified, and redacted legal dossiers on GitHub Pages. |

---

### Administrator 9-Step Verification & Review Protocol

Every contribution must be audited against this protocol before merging:

1. **Receive Contribution**: Acknowledge the GitHub Issue or PR. Check that all mandatory fields are populated.
2. **Primary Source Inspection**: Directly open the provided primary source link or cross-reference the cited law journal (SCMR, PLD, CLC, PCrLJ). Never rely on second-hand social media screenshots.
3. **Procedural Status Verification**: Ensure bail orders are strictly categorized as interim relief (`bail_granted`) and NOT described as acquittals. Verify that convictions cite statutory provisions.
4. **Date & Timeline Precision**: Verify that all dates adhere to ISO `YYYY-MM-DD`. For media, ensure `eventDate` is documented separately from broadcast upload date (`publicationDate`).
5. **Statutory Privacy & Redaction Audit**: Confirm zero exposure of minors (Juvenile Justice System Act 2018), victims of gender offenses, or privileged lawyer-client files. Enforce `redacted: true` where required.
6. **Automated Schema & Invariant Testing**: Execute `npm test` locally or in CI. Ensure 100% pass (38/38 tests clean) across `validateBatch`, `validateMediaRecord`, duplicate ID checks, source URL validations, privacy safeguards, and bilingual text integrity.
7. **Request Changes or Reject**: If discrepancies exist or primary sources cannot be authenticated, mark the issue as `Changes Requested` or `Rejected` with a clear written explanation.
8. **Deliberate Merge into Git**: Maintainer merges the PR into the `main` branch. GitHub Actions automatically executes tests, builds the production bundle, and deploys.
9. **Post-Deployment Audit**: Inspect the live GitHub Pages site to verify that the new record renders cleanly in both English and Urdu RTL without regressions.

---

### Recommended Free GitHub Repository Settings

To maximize repository integrity on the free GitHub plan:
1. **Branch Protection on `main`**: Navigate to *Settings* → *Branches* → *Add branch ruleset* for `main`.
2. **Require Pull Request Reviews**: Enable "Require a pull request before merging" with at least 1 approval.
3. **Require Status Checks to Pass**: Enable "Require status checks to pass before merging" for the `build-and-deploy` workflow.
4. **Restrict Direct Pushes**: Prevent direct pushes to `main` so all changes pass through PR reviews.
5. **Least-Privilege Collaborators**: Invite outside legal contributors as *Triage* or *Read* collaborators, requiring all submissions via Issues or forks.
6. **Zero Secrets in Source**: Never store personal access tokens, private keys, or passwords in repository files or frontend code.

---

### Takedown & Urgent Correction Procedure

If any published record contains a factual error, unredacted juvenile identity, or confidential filing:
- **Email**: `corrections@insafarchive.org`
- **Issue**: Open an issue labeled `takedown-request`
- Immediate redaction or review is conducted within 24–48 hours upon receipt of verified legal representation.

---

## 10. Static Site Architectural Considerations & Limitations

1. **Static Client Environment**:
   - The application is hosted as a pure client-side Single Page Application (SPA) on GitHub Pages with zero mandatory server costs.
   - There is no server-side database or authenticated backend API.
   - Record additions, modifications, and editorial approvals are managed through git version control (pull requests, code reviews, and the automated schema validation suite).
2. **URL Routing on GitHub Pages**:
   - Navigation utilizes query-based state (`?case=...`, `?page=...`, `?tab=...`) synchronized with the browser history (`pushState` / `popstate`).
   - Refreshing or bookmarking URLs retains the active page and case without 404 errors.
   - A dedicated `404.html` in the root distribution handles deep subpath routing redirects and displays an accessible bilingual fallback screen if an invalid route is accessed.
3. **SEO & Social Previews Limitation**:
   - Pre-rendered meta tags and Schema.org JSON-LD structured data (`WebSite`, `Organization`, `Dataset`) are embedded in `index.html`.
   - Dynamic client-side title and meta description updates occur on route transitions. Because this is a static Single Page Application (SPA) without server-side rendering (SSR), social media scrapers that do not execute client-side JavaScript will receive the canonical site metadata from `index.html`.
   - A static `sitemap.xml` and `robots.txt` are provided in `public/` and built into `dist/` for search crawlers.
4. **Data Indexing & Linguistic Scope**:
   - Pre-computed lightweight index entries (`CaseIndexEntry`) allow rapid searching across thousands of records without loading heavy dossier payloads on the home page.
   - Text normalization unifies Arabic/Urdu Yeh variants (`ي`, `ى`, `ے` ➔ `ی`), Kaf/Heh variants, and strips diacritics (Harkat/Aarab). It does not perform morphological stemming for inflected Urdu verb endings.
5. **Demonstration Data Notice**:
   - Records included in this repository are formatted demonstration records illustrating the legal schema. They are clearly marked with `isDemonstrationData: true` and are not intended as legal advice or representation.

---

## 11. Phase 5: Production Readiness, Security & Data Backup

### Data Backup & Snapshot Procedure

The repository provides an automated zero-secret backup command that validates all published cases and media against strict schema invariants and exports standalone JSON manifests:

```bash
# Execute local data backup
npm run backup
```

This generates:
- `backups/cases-latest.json`: All validated case records.
- `backups/media-latest.json`: All validated media and documentary evidence records.
- `backups/cases-backup-[TIMESTAMP].json`: Point-in-time timestamped archival snapshot.
- `backups/media-backup-[TIMESTAMP].json`: Point-in-time timestamped media snapshot.

### Disaster Recovery & Rollback Procedure

If corrupt records, invalid data, or accidental edits are ever merged into `main`:

1. **Identify Known-Good Git Commit**:
   ```bash
   git log --oneline -n 10
   ```
2. **Restore Data Files from Commit**:
   ```bash
   git checkout <commit-hash-or-tag> -- src/data/
   ```
3. **Verify Restored Invariants**:
   ```bash
   npm test
   npm run lint
   npm run build
   ```
4. **Push Rollback Commit**:
   ```bash
   git commit -m "fix(revert): restore legal dataset from known-good commit <commit-hash>"
   git push origin main
   ```
   GitHub Actions will automatically validate all 38 tests and redeploy the verified dataset to GitHub Pages.

---

## 12. Security & Redaction Audit Safeguards

* **Zero Hardcoded Secrets**: Scanned and verified zero API keys, passwords, or tokens in client code.
* **External Link Hardening**: All 12 external links with `target="_blank"` strictly enforce `rel="noopener noreferrer"`.
* **Zero Unsafe HTML**: No use of `dangerouslySetInnerHTML` or unsanitized DOM sinks.
* **Juvenile Privacy (JJSA 2018)**: Automated test invariant ensures zero unredacted minors or vulnerable witnesses appear in public records.
* **Isolated Public Dataset**: Contribution submissions from the web UI generate GitHub Issues or PRs, preventing unvetted data from entering the production build.

