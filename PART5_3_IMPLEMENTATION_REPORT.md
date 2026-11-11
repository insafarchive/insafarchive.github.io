# Part 5.3 — Implementation & Engineering Report
## Insaf Archive — انصاف آرکائیو
**Release Version:** 1.3.0 (Part 5.3 Complete)  
**Verification Date:** 2026-11-01  
**Scope:** Primary Source Verification, Publication Policy Decoupling, Full Claim Coverage Registry, Editorial Workspace Enhancements, & Verification Test Suite

---

## 1. Executive Summary

Master Prompt Part 5.3 represents a comprehensive evidentiary and policy audit of the Insaf Archive. It systematically closes the gap between software validation and genuine factual verification.

### Key Milestones Delivered:
1. **Source Verification Fields**: Implemented 18 rigorous source traceability and authenticity verification attributes in `src/types/archive.ts` and `src/data/dossiers/dossiersData.ts` with controlled values (`sourceAvailability` and `authenticityStatus`).
2. **Textual Claim Discovery & 100% Registry Alignment**: Expanded the claim audit registry from 28 claims to **39 discrete material claims** across all 12 dossiers in `src/data/dossiers/dossierAudits.ts`, eliminating the false equivalence between a partial 28-claim registry and complete narrative coverage.
3. **Decoupled Publication Policy**: Corrected `validatePublicationSafeguards()` in `src/utils/editorialWorkflow.ts` to separate publication eligibility from sub judice legal status. An ongoing proceeding, pending appeal, or interim stay no longer functions as an automatic publication blocker, provided it is accompanied by a prominent pending-proceedings notice, review date, and clear separation of claims. Active reporting bans (`hasActiveReportingBan: true`), unredacted PII, or unsupported claims remain hard blockers.
4. **Individual Reassessment of the 6 Non-Published Dossiers**: Evaluated each non-published dossier independently on its evidentiary and legal merits.
5. **Editorial Workspace Enhancements**: Enriched the admin workspace (`src/components/admin/EditorialWorkspace.tsx`) with real-time audit metrics (Claim Coverage %, Primary Source Ratio %, Contradictory Evidence count, Legal Status Freshness check), sub judice disclosure banners, and an exportable audit and correction JSON payload.
6. **Robust Test Suite**: Expanded vitest tests in `src/test/dossiersAudit.test.ts` to 17 comprehensive test cases proving all 12 Section 9 requirements.
7. **Full Engineering Verification**: Verified `npm run test` (90 tests passing), `npm run validate-data` (58 tests passing), `npm run typecheck` (0 errors), and `npm run build` (production Vite bundle successfully generated).

---

## 2. Files Inspected

### Source Code & Data Modules:
- `src/data/dossiers/dossiersData.ts`
- `src/data/dossiers/dossierAudits.ts`
- `src/types/dossier.ts`
- `src/types/archive.ts`
- `src/utils/editorialWorkflow.ts`
- `src/components/admin/EditorialWorkspace.tsx`
- `src/test/dossiersAudit.test.ts`

### Documentation & Historical Audit Artifacts:
- `PART5_2_CLAIM_COVERAGE_AUDIT.md`
- `PART5_2_PUBLICATION_GAP_CLOSURE.md`
- `PART5_2_EDITORIAL_WORKFLOW_SPEC.md`
- `PART5_2_CORRECTION_WITHDRAWAL_POLICY.md`
- `PART5_2_IMPLEMENTATION_REPORT.md`
- `PART5_1_DOSSIER_SOURCE_AUDIT.md`
- `PART5_1_LEGAL_CITATION_AUDIT.md`
- `PART5_1_PUBLICATION_READINESS_MATRIX.md`

---

## 3. Files Created or Modified

| File Path | Action | Description of Modifications |
|---|---|---|
| `src/types/archive.ts` | Modified | Added `SourceAvailability` and `AuthenticityStatus` type unions; expanded `SourceCitation` with all 18 Part 5.3 source verification attributes. |
| `src/types/dossier.ts` | Modified | Added `LegalProceedingStatus`, `ClaimClassification`, `ClaimVerificationState`; added `legalProceedingStatus`, `hasActiveReportingBan`, `pendingProceedingsNotice`, `lastLegalStatusChecked` to `ArchivalDossier`; enriched `ClaimSourceAuditEntry` with both Part 5.3 fields and backward-compatible aliases. |
| `src/utils/editorialWorkflow.ts` | Modified | Refactored `validatePublicationSafeguards()` to decouple publication eligibility from sub judice status, enforce pending notices, active reporting bans, and claim support blockers; added `isStale` to `checkLegalStatusFreshness()`; overloaded `validateClaimIntegrity()`. |
| `src/data/dossiers/dossiersData.ts` | Modified | Enriched all 12 dossiers with `legalProceedingStatus`, `hasActiveReportingBan`, `pendingProceedingsNotice`, and `lastLegalStatusChecked`; formalized all 39 material claims; added Part 5.3 source verification fields across all source records; added missing `src-punjab-sec144-notification-may2022`. |
| `src/data/dossiers/dossierAudits.ts` | Modified | Expanded `CLAIM_SOURCE_AUDIT_DATA` from 28 to 39 claims, providing comprehensive audit coverage of every material statement in the dossier narratives with controlled classifications, verification states, and source linkages. |
| `src/components/admin/EditorialWorkspace.tsx` | Modified | Enhanced Tab 3 inspector panel with live metrics (Claim Coverage %, Primary Source %, Contradictory Evidence count, Freshness status), sub judice disclosure notices, gag order warnings, and an exportable JSON payload feature. |
| `src/test/dossiersAudit.test.ts` | Modified | Rewritten and expanded to 17 test cases covering all 12 Section 9 requirements and full 39-claim registry integrity. |
| `PART5_3_PRIMARY_SOURCE_AUDIT.md` | Created | Comprehensive audit of all 26 source instruments, availability status, and authenticity tiers. |
| `PART5_3_CLAIM_COVERAGE_REPORT.md` | Created | Detailed 39-claim coverage report comparing actual dossier text vs registry. |
| `PART5_3_PUBLICATION_POLICY.md` | Created | Formal policy document establishing the decoupling of publication eligibility from sub judice legal status and setting strict disclosure rules. |
| `PART5_3_SIX_DOSSIER_REASSESSMENT.md` | Created | Structured 8-point assessment of the six non-published dossiers. |
| `PART5_3_EDITORIAL_QUALITY_AUDIT.md` | Created | Bilingual parity, neutrality, and human review audit across all 12 dossiers. |
| `PART5_3_IMPLEMENTATION_REPORT.md` | Created | Comprehensive final engineering report. |

---

## 4. Evidentiary & Claim Metrics

1. **Material Claims Identified in Actual Dossier Text:** **39 claims**
2. **Claims Formally Registered and Audited:** **39 claims (100% coverage)**
3. **Claims Supported by Inspected Primary Sources:** **34 claims (87.2%)**
4. **Claims Corroborated by Multiple Sources:** **4 claims (10.2%)**
5. **Claims Supported Only by Secondary / Partially Supported:** **1 claim (2.6%)** (`clm-muridke-tlp-fatalities`)
6. **Claims with Contradictory or Qualifying Evidence Disclosed:** **4 claims (10.3%)**
7. **Claims Requiring Active Legal / Sub Judice Monitoring:** **8 claims (20.5%)**
8. **Claims Missing Citations:** **0 claims (0%)**

---

## 5. Publication Eligibility Reassessment of the Six Dossiers

| Dossier ID & Slug | Editorial Status | Legal Proceeding Status | Publication Recommendation |
|---|---|---|---|
| `dos-pk-legal-military-courts-2023`<br>`military-courts` | `in_review` | `stayed` | **Eligible to Publish with Mandatory Stay Notice** disclosing that the 23 October 2023 order was stayed by 6-member bench on 13 December 2023 pending ICAs. |
| `dos-pk-event-may-09-2023`<br>`may-09` | `draft` | `ongoing` | **Retain in Draft (Do Not Publish)**: Active ATC criminal trials, unredacted private citizen PII, lack of forensic trial conclusions. |
| `dos-pk-event-may-26-2022`<br>`may-26` | `in_review` | `unresolved` | **Eligible to Publish with Unresolved Inquiry Notice** disclosing that no formal judicial inquiry was gazetted while recording documented police containment and SC orders. |
| `dos-pk-journalism-press-attacks-impunity`<br>`press-attacks` | `in_review` | `ongoing` | **Eligible to Publish with High Court Habeas Notice** documenting established High Court jurisprudence under Article 19 separate from the Arshad Sharif killing. |
| `dos-pk-soe-pia-crisis-privatization`<br>`pia-crisis` | `in_review` | `concluded` | **Eligible to Publish (Recommended for Approval)**: Historical audited debt (PKR 713bn) and EASA safety bans are verified public records; waiting for future privatization transactions is not required. |
| `dos-pk-event-muridke-tragedy-2021`<br>`muridke-tragedy` | `draft` | `unresolved` | **Retain in Draft (Do Not Publish)**: High primary source deficit; missing official autopsy and ballistics records; conflicting casualty claims. |

---

## 6. Summary of Changes to Publication Safeguards

In `src/utils/editorialWorkflow.ts`:
- **Decoupled Proceeding Status**: Removed check that automatically failed dossiers with `ongoing`, `stayed`, or `pending_appeal` statuses.
- **Mandatory Pending Proceedings Notice**: Introduced requirement that any dossier with non-concluded legal status must include a bilingual `pendingProceedingsNotice` before publication.
- **Hard Blocker on Gag Orders**: Added strict validation checking `hasActiveReportingBan: true`, immediately withholding any affected dossier or claim.
- **Unsupported Claim Blocker**: Every claim must resolve against verified sources; any unverified or missing source generates a hard publication blocker.
- **Freshness Warning**: Verification review dates older than 365 days trigger automated freshness warnings without corrupting historical records.

---

## 7. Verification & Build Results

All automated verification gates passed with zero regressions:

### 1. Test Suite (`npm run test`)
```text
✓ src/test/schemaValidator.test.ts (3 tests)
✓ src/test/claimsAndSources.test.ts (3 tests)
✓ src/test/legacyAdapter.test.ts (2 tests)
✓ src/test/privacyFilter.test.ts (8 tests)
✓ src/test/dataIntegrity.test.ts (6 tests)
✓ src/test/searchEngine.test.ts (4 tests)
✓ src/test/registry.test.ts (3 tests)
✓ src/test/dossiersAudit.test.ts (17 tests)
✓ src/test/graphUtils.test.ts (2 tests)
✓ src/test/urduNormalize.test.ts (7 tests)
✓ src/test/dossiers.test.ts (11 tests)
✓ src/test/constitution.test.ts (21 tests)
✓ src/test/syntheticScale.test.ts (3 tests)

Test Files: 13 passed (13)
Tests:      90 passed (90)
```

### 2. Data Validation (`npm run validate-data`)
```text
Test Files: 5 passed (5)
Tests:      58 passed (58)
```

### 3. TypeScript Typecheck (`npm run typecheck`)
```text
> tsc --noEmit
Exit Code: 0 (Zero errors)
```

### 4. Production Build (`npm run build`)
```text
> tsc -b && vite build
✓ built in 500ms
dist/index.html                           1.72 kB
dist/assets/index-B2KDAgwt.css            6.87 kB
dist/assets/rolldown-runtime-CbXtAM7H.js  0.58 kB
dist/assets/ConstitutionView-DzJx7AlT.js 76.71 kB
dist/assets/index-bQwXKZLl.js         1,338.73 kB
Exit Code: 0
```

---

## 8. Remaining Legal, Factual, Privacy, and Editorial Blockers

1. **Sub Judice Appellate Determinations**:
   The Supreme Court's Intra-Court Appeals regarding Military Courts trials of civilians remain pending. Editors must re-check cause lists every 90 days.
2. **Ongoing Criminal Trials (9 May 2023)**:
   Over 50 Anti-Terrorism Court trials are active. Until certified judgments or official trial transcripts are completed, `may-09` must remain in `draft`.
3. **Forensic & Ballistics Deficit (Muridke 2021)**:
   Neither an independent judicial inquiry report nor post-mortem/ballistics records have been made publicly available. Demonstrator casualty figures cannot be verified as factual without state or court records.
4. **Permanent Archival Snapshots for High Court Portals**:
   Pakistani provincial high court MIS portals (`mis.ihc.gov.pk`, `data.lhc.gov.pk`) occasionally undergo maintenance or URL re-indexing. Editors must continuously mirror certified copies to Archive.org / Perma.cc.
5. **No Automatic Promotions**:
   In strict compliance with editorial policy, no non-published dossier was automatically promoted to `published`. Eligible dossiers (`military-courts`, `may-26`, `press-attacks`, `pia-crisis`) require formal editorial review and pull request sign-off.
