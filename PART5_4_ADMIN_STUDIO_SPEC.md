# Part 5.4 — Admin Editorial Studio Specification
## Insaf Archive — انصاف آرکائیو
**Status:** Approved & Formally Tested  
**Version:** 1.4.0 (Admin Editorial Studio Release)  
**Date:** 2026-11-01  
**Scope:** Studio Architecture, Data Models, Modular Editors, Local Queue & Governance Framework

---

## 1. Executive Summary & Purpose

The Insaf Archive Admin Editorial Studio is a dedicated, zero-secret data-entry and review workbench integrated into the archive application. Built specifically for an evidence-first, bilingual (Urdu-English) static public-interest repository, it provides editors and contributors with structured forms for authoring and validating:
1. **Archival Dossiers** (13-Point canonical schema, sub judice notices, legal status checks)
2. **Material Claims** (Classification, evidentiary bounds, supporting/opposing source linkage)
3. **Primary & Corroborating Sources** (Controlled availability, authenticity tiers, URL validation)
4. **Media & Court Documents** (Metadata, rights, transcripts, privacy redactions)
5. **Local Review Queue** (Draft proposals, change tracking, field validation audits)
6. **Export & GitHub Hand-off** (Machine-readable JSON bundles, human-readable markdown summaries, PR checklists)

---

## 2. Architecture & Security Model

The Editorial Studio operates within the constraints of a **static client-side architecture** deployed via GitHub Pages:
- **No Synthetic Backend:** The studio does not pretend to have a server-side authentication system, database daemon, or private API keys.
- **Device-Local Storage:** Active drafting sessions are saved strictly in browser `localStorage` under key `insaf_archive_admin_studio_bundle_v1`.
- **Epistemological Integrity:** Draft changes created in the browser **do not** automatically mutate canonical public data (`ALL_ARCHIVAL_DOSSIERS` or `CLAIM_SOURCE_AUDIT_DATA`).
- **Honest Authorization:** Authoritative changes to the public archive occur exclusively through GitHub Pull Requests and peer review by authorized repository maintainers.

---

## 3. Modular Studio Component Hierarchy

```
src/components/admin/
├── EditorialWorkspace.tsx                <-- Master Top-Level Container
└── studio/
    ├── AdminStudio.tsx                   <-- Studio Shell (Tab Router & Storage Manager)
    ├── DossierEditor.tsx                 <-- Module A: Bilingual Dossier Editor
    ├── ClaimEditor.tsx                   <-- Module B: Evidentiary Claim Editor
    ├── SourceEditor.tsx                  <-- Module C: Primary Source Editor
    ├── MediaEditor.tsx                   <-- Module D: Media & Document Editor
    ├── ReviewQueueView.tsx               <-- Module E: Local Review Queue & Diff Tracker
    └── ExportGitHubView.tsx              <-- Module F: JSON Bundle Export & GitHub Hand-off
```

Supporting utilities and types:
- `src/types/adminStudio.ts`: Controlled type definitions for drafts, queues, errors, and export bundles.
- `src/utils/adminStudioStorage.ts`: LocalStorage persistence, collision-safe ID generation, schema validators, Markdown/Issue generators.

---

## 4. Detailed Specification of Studio Modules

### Module A: Dossier Editor (`DossierEditor.tsx`)
- **Identification:** Stable `id` (e.g. `dos-pk-legal-military-courts-2023`) with collision-safe auto-generator; URL routing `slug`.
- **Bilingual Content:** English title & overview (LTR); Urdu title & overview (RTL).
- **Taxonomy:** Domain selector (`constitutional_legal`, `major_public_events`, `journalism_press_freedom`, `historical_institutional`, `energy_public_finance`, `due_process_rights`); tags chip-manager.
- **Legal Proceeding Status:** Controlled selector (`concluded`, `ongoing`, `pending_appeal`, `stayed`, `under_investigation`, `unresolved`, `unknown`).
- **Sub Judice Disclosure:** Automatically activates mandatory bilingual `pendingProceedingsNotice` whenever a non-concluded legal status is selected.
- **Reporting Ban Guard:** Hard toggle for `hasActiveReportingBan`; prevents Approved or Published status if an active court gag order exists.
- **Docket Freshness:** Calendar date picker for `lastLegalStatusChecked`; issues freshness warning if older than 365 days.
- **Privacy & Safeguards:** Checkboxes for sensitive personal data, confirmed PII redaction, separation of allegations from findings.
- **Unresolved Questions:** Interactive manager for recording disclosed evidentiary gaps in both languages.

### Module B: Claim Editor (`ClaimEditor.tsx`)
- **Identification:** Stable `claimId` (e.g. `clm-mil-courts-civilians-103`).
- **Parent Dossier:** Searchable picker populated with canonical dossiers and in-progress draft dossiers.
- **Bilingual Statement:** Explicit assertion text in English (LTR) and Urdu (RTL).
- **Claim Classification:** Controlled tier (`judicial_finding`, `commission_finding`, `official_position`, `documented_fact`, `reported_allegation`, `contested_claim`, `editorial_analysis`, `unresolved_question`).
- **Verification State:** Controlled tier (`primary_source_supported`, `multiple_sources_corroborated`, `secondary_source_only`, `partially_supported`, `contradicted`, `source_unavailable`, `requires_human_review`).
- **Source Linkage:** Searchable multi-selector linking verified supporting source IDs; dedicated picker for contradictory or qualifying sources.
- **Evidentiary Bounds:** Mandatory dual fields defining **what the evidence establishes** versus **what the evidence does not establish**.
- **Allegation Conflation Guard:** Prevents official positions or reported allegations from using phrases claiming they are court findings.

### Module C: Source Editor (`SourceEditor.tsx`)
- **Identification:** Stable `sourceId` (e.g. `src-sc-mil-courts-2023-order`).
- **Title & Publisher:** Bilingual source title; publisher or sovereign issuing authority (e.g. Supreme Court of Pakistan).
- **Source Type:** Controlled instrument type (`court_order`, `court_judgment`, `police_fir`, `commission_report`, `gazette_notification`, `financial_audit`, etc.).
- **URL Provenance:** Official institutional URL; permanent web archive URL (Archive.org, Perma.cc). Rejects malformed and placeholder URLs (`example.com`, `todo`).
- **Local Path Warning:** Emits explicit privacy warning when a local path is provided to prevent exposing personal machine files.
- **Availability vs Authenticity:** Controlled availability (`accessible`, `archived_copy_available`, `unavailable`, `broken_link`, `not_checked`) and authenticity (`official_document`, `publisher_verified`, `corroborated`, `unverified`, `disputed`). Enforces rule that `not_checked` sources cannot claim `official_document` status.

### Module D: Media & Document Editor (`MediaEditor.tsx`)
- **Identification:** Stable `mediaId` (e.g. `med-sc-cp24-order-pdf`).
- **Document Category:** Court orders, official notifications, inquiry reports, document PDFs, photographs, broadcasts, interviews.
- **Platform / Authority:** Publisher or broadcast network.
- **Association:** Relational links to parent dossier ID and specific material claim IDs.
- **Rights & Descriptions:** Copyright/fair use metadata; bilingual descriptions/transcripts.
- **Privacy Shield:** Warns user that the static web application does not auto-upload files to public repositories.

### Module E: Local Review Queue (`ReviewQueueView.tsx`)
- **Queue Overview:** Central table of all in-flight proposals across dossiers, claims, sources, and media.
- **Diff Tracking:** Tracks change type (`create`, `update`, `withdraw`), fields modified, reason for proposal, and timestamp.
- **Validation Audit:** Badges items as `validation_passed` (Ready for PR) or `validation_failed` (with pinpoint field error lists).
- **Editor Navigation:** Single-click "Edit" button jumps directly to the corresponding editor pre-populated with the draft record.

### Module F: Export & GitHub Hand-off (`ExportGitHubView.tsx`)
- **Standardized JSON Bundle:** Compiles full `StudioExportBundle` with complete metadata and security disclosure.
- **Copy & Download:** Direct one-click clipboard copy and `.json` file download.
- **Human-Readable Markdown:** Formatted executive proposal summary ready for maintainer inspection.
- **GitHub Issue Payload:** Pre-formatted issue text with automated checklists and embedded JSON payload.
- **Pull Request Checklist:** Step-by-step verification gates (bilingual parity, source linkage, command validation).
- **JSON Importer:** Schema-validated import engine for merging existing proposals into local storage.

---

## 5. UI/UX & Bilingual Styling Standards

- **Color Palette:** Preserves the core Insaf Archive visual identity (Deep Navy `#0A0F1D`, Surface `#0F172A`, Accent Gold `#D97706` / `#F59E0B`, Electric Blue `#38BDF8`, Emerald `#10B981`, Crimson Alert `#EF4444`).
- **Directional Fluidity:** English inputs render strictly with `dir="ltr"` and sans-serif typography; Urdu inputs render with `dir="rtl"` and Nastaliq/Urdu-optimized fonts.
- **Responsive Layout:** Adaptive CSS grids ensure all editor sections scale cleanly from 320px mobile screens to wide desktop monitors.
- **Keyboard Friendliness:** All dropdowns, inputs, buttons, and modal panels are fully tabbable with visible focus rings.
