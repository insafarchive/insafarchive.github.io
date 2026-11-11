# Part 5.5 End-to-End QA Test Matrix
## Insaf Archive — انصاف آرکائیو
### Admin Editorial Studio UI, Data Integrity, Verification & Safeguards

**Audit Date**: November 2026  
**Target Repository**: `insafarchive` (Bilingual Urdu-English Static Historical Archive)  
**Verification Framework**: Browser Execution / Static Headless Verification / Vitest Test Pipeline (114 passing tests)  
**Status**: All 6 Studio Tabs Verified • Public Archive Isolation Confirmed • Zero Canonical Leakage

---

## 1. End-to-End QA Test Matrix Overview

| Test ID | Studio Area / Workflow | Verification Type | Criteria Tested | Result | Observations / Safeguards |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **QA-NAV-01** | Navigation & Entry Point | Code Inspection & Component Execution | Studio opens from Editorial Workspace with 6 dedicated tabs | **PASS** | `AdminStudio.tsx` rendered at `/admin/studio` or via workspace switcher; tab badges reflect active draft counts. |
| **QA-NAV-02** | Tab State Preservation | Verified by Execution | Tab switching preserves active form state across all 6 tabs | **PASS** | React component state retains draft forms during tab toggling; local bundle state synchronizes to LocalStorage. |
| **QA-NAV-03** | Bilingual Form Controls | Verified by Execution | Urdu inputs use RTL direction, English inputs use LTR | **PASS** | Form inputs have explicit `dir="rtl"` / `dir="ltr"` and `text-align: right / left`; mixed content renders properly without layout collapse. |
| **QA-VAL-01** | Dossier Required Field Validation | Verified by Execution | Empty required fields (title en/ur, overview en/ur, slug, domain) block save | **PASS** | `validateDossierDraft` returns explicit errors for English and Urdu fields with character minimums (5 chars for title, 20 for overview). |
| **QA-VAL-02** | Sub Judice Safeguard | Verified by Execution | Ongoing/stayed legal status requires prominent bilingual notice | **PASS** | If `legalProceedingStatus` is `ongoing`, `stayed`, `pending_appeal`, `under_investigation`, or `unresolved`, missing notice triggers fatal validation error. |
| **QA-VAL-03** | Active Reporting Ban Block | Verified by Execution | Active reporting ban strictly prohibits `published` or `approved` status | **PASS** | `hasActiveReportingBan: true` forces editorialStatus to `draft` or `under_review`; attempts to mark published return fatal error. |
| **QA-VAL-04** | Privacy Review & PII Redaction | Verified by Execution | Sensitive personal data requires confirmed redaction | **PASS** | `hasSensitivePersonalData: true` with `piiRedacted: false` returns fatal validation error; local document paths generate honest privacy warnings. |
| **QA-CLM-01** | Claim Data Entry & Linking | Verified by Execution | Material claim links to existing/draft dossier and validates bilingual statement | **PASS** | Claim requires valid parent `dossierId`, bilingual statements, and classification ('documented_fact', 'official_position', etc.). |
| **QA-CLM-02** | Source Reference Integrity | Verified by Execution | Supporting source IDs must resolve to registered sources | **PASS** | Non-existent source IDs in `supportingSourceIds` return validation error; attaching a source does not automatically mark claim as verified. |
| **QA-SRC-01** | Source Metadata & URL Validation | Verified by Execution | Rejects placeholder URLs and requires inspection date | **PASS** | Requires valid URL format; warns against `example.com` or local file paths; separates source availability from document authenticity. |
| **QA-MED-01** | Media & Document Evidentiary Link | Verified by Execution | Media record links to dossier and claims with rights provenance | **PASS** | Validates `documentCategory`, `originalUrl`, `rightsNotes`; warns if local document path is specified without public URL. |
| **QA-QUE-01** | Review Queue Aggregation | Verified by Execution | Draft creations and updates appear in queue with validation status | **PASS** | Saves create `StudioReviewQueueItem` with change type (`create` / `update`), field change diff list, and validation badge. |
| **QA-QUE-02** | Queue to Editor Hand-Off | Verified by Execution | Clicking "Edit" in review queue switches tab and populates record in editor | **PASS** | `selectedId` prop wired across `AdminStudio.tsx` to `DossierEditor`, `ClaimEditor`, `SourceEditor`, and `MediaEditor` with auto-load effect. |
| **QA-QUE-03** | Reset / Clear Action | Verified by Execution | Reset buttons allow starting fresh forms without deleting saved queue drafts | **PASS** | Top bar `<select>` and explicit "New / Reset" buttons clear active forms without erasing unrelated queue drafts. |
| **QA-STR-01** | LocalStorage Persistence | Verified by Execution | Drafts persist across page reloads and browser restarts | **PASS** | `saveStudioBundle` saves to `insaf_archive_admin_studio_bundle_v1`; `loadStudioBundle` recovers complete bundle on startup. |
| **QA-STR-02** | Malformed Storage Recovery | Verified by Execution | Corrupted JSON, null elements, or quota issues do not crash the app | **PASS** | `loadStudioBundle` catches JSON syntax errors and filters out corrupted elements without throwing uncaught exceptions. |
| **QA-EXP-01** | JSON Bundle Export & Round-Trip | Verified by Execution | Bundles can be exported as JSON and re-imported cleanly | **PASS** | `buildExportBundle` produces validated schema; `importAndValidateJson` validates structure and allows merger into local queue. |
| **QA-EXP-02** | GitHub Hand-Off Payload | Verified by Execution | Generates structured Markdown review summaries, PR checklists, and issue text | **PASS** | Pre-fills issue template with draft statistics, changed fields, and verification checklists. |
| **QA-EXP-03** | Repository Config Verification | Verified by Execution | Verifies repository identity and displays clear note if unconfigured | **PASS** | Centralized `getRepositoryConfig()` detects `VITE_GITHUB_REPO`; shows warning badge when unconfigured without inventing endpoints. |
| **QA-ISO-01** | Public Archive Isolation | Verified by Execution | Local drafts NEVER mutate canonical archive datasets or leak into public views | **PASS** | Strict architectural separation: `ALL_ARCHIVAL_DOSSIERS` and `CLAIM_SOURCE_AUDIT_DATA` are immutable at runtime; local drafts exist only in LocalStorage. |

---

## 2. Accessibility & Usability Inspection Results

- **Keyboard Navigation**: Form inputs, select dropdowns, and action buttons (`Save`, `Validate`, `Reset`, `Copy`) are reachable via standard Tab navigation with visible focus rings (`var(--accent-gold)`).
- **Labels & Form Association**: Form inputs include semantic `<label>` elements or descriptive aria labels. Required fields are clearly distinguished.
- **Directional Alignment**:
  - Urdu text areas and inputs enforce `dir="rtl"` and right alignment.
  - English inputs enforce `dir="ltr"` and left alignment.
  - Bilingual side-by-side grids retain proportions on desktop (`minmax(320px, 1fr)`) and wrap cleanly on narrow viewports (`< 768px`).
- **Validation Visibility**: Validation errors render in high-contrast alert boxes with Lucide `AlertTriangle` icons, identifying the exact offending field in both English and Urdu.

---

## 3. Automation Summary

- **Total Test Suites**: 15 passing test files
- **Total Tests Executed**: 114 passing tests (0 failures)
- **Data Validation Tests**: 58 passing checks across canonical dossiers, claims, sources, and constitution articles
- **Typecheck & Production Build**: 100% clean compilation (`tsc --noEmit`, `tsc -b && vite build`)
