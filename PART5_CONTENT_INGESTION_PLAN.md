# Part 5 — Evidence-Based Archive Content Ingestion & Editorial Publication Workflow
## Implementation Plan | Insaf Archive (`insafarchive`)

**Date:** 2026-10-31  
**Repository State:** Post-Part 4.3 (Complete Constitutional Corpus & Mapping Engine)  
**Host Environment:** Static GitHub Pages (zero backend / zero-secret client-side)

---

### 1. Executive Summary & Repository Audit

An audit of the repository confirms:
1. **Existing Architecture:**
   - Universal record schema (`ArchiveRecord` v1.0.0 in [archive.ts](file:///g:/Development/insafarchive/src/types/archive.ts)) supporting claims, sources, evidence media, relationships, and privacy flags.
   - Master Archive Registry in [src/data/records/index.ts](file:///g:/Development/insafarchive/src/data/records/index.ts) exporting `ALL_ARCHIVE_RECORDS` with automated duplicate detection (`validateRegistryDuplicates`).
   - Legacy Seed Records in [src/data/seedRecords.ts](file:///g:/Development/insafarchive/src/data/seedRecords.ts) containing 10 thoroughly sourced records (Arshad Sharif profile, killing, JIT report, Supreme Court suo motu; military courts judgment; IPP contracts; Asia Bibi acquittal; Hamoodur Rahman commission report; Pakistan Steel Mills privatization judgment; Supreme Court institution profile).
   - Complete Constitutional Library (Parts 4.1–4.3) comprising all 280 Articles, Schedules 1–5, Amendments 1–26, and the Constitutional Mapping Engine.
   - Static client-side Editorial Workspace in [EditorialWorkspace.tsx](file:///g:/Development/insafarchive/src/components/admin/EditorialWorkspace.tsx) with JSON download and GitHub Issue submission.

2. **Content Phase Objectives:**
   - Establish formal dossier schema conforming to the 13-point standard in Section 7.
   - Build a curated set of 12 dossiers spanning the 6 target thematic areas.
   - Create accompanying domain records for missing anchors without ID collisions.
   - Implement rigorous referential integrity, evidence attribution, and privacy/defamation checks.
   - Enhance the Editorial Workspace with a Publication & Privacy Review checklist.
   - Maintain 100% static hosting compatibility on GitHub Pages.

---

### 2. The 13-Point Archival Dossier Standard

Every substantive dossier will follow the unified structure defined in `src/types/dossier.ts`:
1. **Bilingual Overview:** Comprehensive narrative contextualizing the matter in English and Urdu.
2. **Scope & Terminology Note:** Clear boundaries defining what is and is not covered, with objective terminology.
3. **Sourced Chronology:** Chronological events with dates and primary/secondary source citations.
4. **Key Actors & Institutions:** Impartial descriptions of individuals, departments, courts, and state bodies.
5. **Claim-by-Claim Evidence Table:** Granular claims categorized by finding type (`documented_fact`, `allegation`, `official_position`, `court_finding`, `reported_claim`, `unresolved_question`).
6. **Official Positions & Responses:** Institutional replies, government press conferences, and official denials.
7. **Court Proceedings & Findings:** Operative orders, citations, and bench compositions (where applicable).
8. **Media & Document Archive:** Primary PDFs, gazette notifications, judgments, or video links with checksums/verification notes.
9. **Related Constitutional Provisions:** Specific Articles of the 1973 Constitution linked via the mapping engine.
10. **Related Records:** Interlinked archive records within the Insaf Archive dataset.
11. **Unresolved Questions & Known Limitations:** Transparent identification of missing documents or unresolved factual disputes.
12. **Sources & Verification Notes:** Full bibliographic metadata, verification status, and limitations.
13. **Editorial Review & Privacy Safety Review:** Explicit classification (`published`, `under_review`, `draft`), PII removal, and defamation guardrails.

---

### 3. Initial Target Dossiers (12 Curated Topics)

| # | Dossier ID | Title | Domain | Editorial Status | Primary Source Anchor |
|---|---|---|---|---|---|
| 1 | `dos-pk-legal-military-courts-2023` | Military Court Trials of Civilians | Constitutional & Legal | `published` | Const. Pet. 24/2023 Order |
| 2 | `dos-pk-legal-assembly-dissolution-2022` | National Assembly Dissolution & Restoration | Constitutional & Legal | `published` | PLD 2022 SC 574 |
| 3 | `dos-pk-event-may-09-2023` | 9 May Protests, Arrests & Legal Aftermath | Major Public Events | `under_review` | High Court Bail Orders & FIRs |
| 4 | `dos-pk-event-may-26-2022` | May 25–26 Azadi March & Red Zone Orders | Major Public Events | `under_review` | Supreme Court SMC 1/2022 |
| 5 | `dos-pk-event-muridke-tragedy-2021` | Muridke GT Road Clashes & Casualties | Major Public Events | `draft` (Backlog) | Human Rights Comm. Reports |
| 6 | `dos-pk-journalism-arshad-sharif-killing` | Arshad Sharif Killing & Investigation | Journalism & Press | `published` | 592-p JIT & Kenya HC 2024 |
| 7 | `dos-pk-journalism-press-attacks-impunity` | Systemic Press Coercion & Abductions | Journalism & Press | `under_review` | IHC Petitions & PEMRA Directives |
| 8 | `dos-pk-hist-hamoodur-rahman-1971` | Hamoodur Rahman Commission on 1971 Crisis | Historical Records | `published` | Declassified Inquiry Report |
| 9 | `dos-pk-soe-pakistan-steel-mills-2006` | Pakistan Steel Mills Privatization Annulment | Historical & SOE | `published` | PLD 2006 SC 697 |
| 10 | `dos-pk-soe-pia-restructuring-crisis` | PIA Institutional Decline & 2020 License Crisis | Public Enterprises | `under_review` | PK-8303 Inquiry & Aviation Reports |
| 11 | `dos-pk-energy-ipp-power-sector-contracts` | IPP Contracts, Capacity Payments & Tariffs | Energy & Public Finance | `published` | 1994/2002 PPAs & 2020 Inquiry |
| 12 | `dos-pk-legal-asia-bibi-acquittal` | Asia Bibi Acquittal & Blasphemy Due Process | Due Process & Rights | `published` | PLD 2019 SC 64 |

---

### 4. Implementation Steps

1. **Schema & Types:**
   - Define `src/types/dossier.ts` with complete 13-point data structures and privacy review metadata.
2. **Domain Records Addition:**
   - Add new supporting records in `src/data/records/legal/legalRecords.ts`, `src/data/records/political/politicalRecords.ts`, `src/data/records/journalism_media/journalismRecords.ts`, and `src/data/records/economic/economicRecords.ts`.
   - Update `src/data/records/index.ts` to include non-colliding new records in `ALL_ARCHIVE_RECORDS` and verify duplicate registry validation.
3. **Master Dossier Registry:**
   - Create `src/data/dossiers/dossiersData.ts` containing the 12 comprehensive dossiers.
   - Create `src/data/dossiers/index.ts` with query and lookup utilities.
4. **UI Integration:**
   - Update `src/views/DossiersView.tsx` to display complete dossiers, filter by domain/status, and support opening modal/expanded dossier views detailing all 13 components.
   - Enhance `EditorialWorkspace.tsx` with privacy checklist and court-finding validation warnings.
5. **Testing & Validation:**
   - Create `src/test/dossiers.test.ts` validating ID uniqueness, 13-point structure completeness, referential integrity of sources, claims, and constitutional mappings, and strict privacy review compliance.
   - Update `npm run validate-data` script in `package.json`.
6. **Deliverable Reports:**
   - Compile all 5 required markdown reports.
   - Run and document actual results of test, validation, typecheck, and build commands.
