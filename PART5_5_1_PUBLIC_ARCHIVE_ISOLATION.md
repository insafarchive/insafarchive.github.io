# Part 5.5.1 Public Archive Isolation Verification Report
## Insaf Archive — انصاف آرکائیو
### Verification of Zero-Leakage Architecture Between Local Staging Drafts and Public Datasets

**Audit Date**: November 2026  
**Target Invariant**: Local drafts created in Admin Studio NEVER alter published archive datasets without a reviewed Git Pull Request.  
**Audited Modules**: `AdminStudio.tsx`, `adminStudioStorage.ts`, `ArchiveContext.tsx`, `dossiersData.ts`, `dossierAudits.ts`  
**Status**: 100% Isolated • Zero Runtime Mutability • Zero Canonical Data Contamination  

---

## 1. Architectural Separation Overview

Insaf Archive's public-interest architecture enforces strict, unidirectional separation between the browser's device-local staging environment and the published public archive:

```
[ Browser Client ]
┌────────────────────────────────────────────────────────┐
│  Admin Editorial Studio                                │
│  (LocalStorage: insaf_archive_admin_studio_bundle_v1)  │
└────────────────────────┬───────────────────────────────┘
                         │ (Export JSON Payload)
                         ▼
┌────────────────────────────────────────────────────────┐
│  GitHub Pull Request / Issue Submission                │
│  (Human Editorial Review & Verification Checklists)    │
└────────────────────────┬───────────────────────────────┘
                         │ (Maintainer Approval & Git Merge)
                         ▼
┌────────────────────────────────────────────────────────┐
│  Canonical Repository Source Files                     │
│  - src/data/dossiers/dossiersData.ts                   │
│  - src/data/dossiers/dossierAudits.ts                  │
└────────────────────────┬───────────────────────────────┘
                         │ (Vite Build: Static Bundle)
                         ▼
┌────────────────────────────────────────────────────────┐
│  Public Archive UI Views (Read-Only)                   │
│  - DossiersView, ExploreView, ConstitutionView         │
└────────────────────────────────────────────────────────┘
```

---

## 2. Six Isolation Invariants Verified

| Invariant ID | Tested Assertion | Verification Status | Observed Result |
| :--- | :--- | :--- | :--- |
| **ISO-01** | LocalStorage drafts are not added to canonical archive arrays | **Verified by automated test** (`QA-5`) | `ALL_ARCHIVAL_DOSSIERS.length` remains 12; `CLAIM_SOURCE_AUDIT_DATA.length` remains 28 before and after saving drafts. |
| **ISO-02** | Local drafts do not appear in public dossier listings, search, or explore pages | **Verified by code inspection** & **Verified by automated test** | `ArchiveContext.tsx` reads directly from compiled constants; it does not read or query `LocalStorage`. |
| **ISO-03** | Exporting a bundle does not publish it | **Verified by automated test** (`QA-5`, `QA-10`) | `buildExportBundle()` creates an in-memory JSON snapshot; canonical arrays are not mutated. |
| **ISO-04** | Importing a bundle does not publish it | **Verified by automated test** (`QA-10`, `QA-11`) | `handleImportBundle()` updates `LocalStorage` draft state only; zero interaction with production datasets. |
| **ISO-05** | QA-only identifiers do not exist in canonical production files | **Verified by automated test** (`QA-5`) & **Verified by code inspection** | Grep search for `qa-only-2026-11` across `src/data/` returns zero matches. |
| **ISO-06** | Only an intentional, reviewed repository change can alter published archive data | **Verified by code inspection** | Static site distribution (`dist/`) is immutable at runtime; deployment requires GitHub Actions build. |

---

## 3. Direct Code Inspection of Public Route Dependencies

Inspection of the primary public archive view components demonstrates that no public UI component imports or references `adminStudioStorage.ts` or `insaf_archive_admin_studio_bundle_v1`:

1. [`src/context/ArchiveContext.tsx`](file:///g:/Development/insafarchive/src/context/ArchiveContext.tsx):
   - Consumes canonical data exclusively from `ALL_ARCHIVAL_DOSSIERS` and registry helpers.
   - Does not have subscriptions, listeners, or state readers for `localStorage`.
2. [`src/components/dossiers/DossiersView.tsx`](file:///g:/Development/insafarchive/src/components/dossiers/DossiersView.tsx):
   - Renders dossiers passed from `ArchiveContext`.
   - Filters out unapproved items based strictly on compile-time `editorialStatus`.
3. [`src/components/explore/ArchiveExplorer.tsx`](file:///g:/Development/insafarchive/src/components/explore/ArchiveExplorer.tsx):
   - Search index is constructed at build/initialization time from canonical records.
   - Local drafts are completely invisible to search indexes.

---

## 4. Automated Proof Summary

In `src/test/adminStudioQA.test.ts`:
- **`QA-5`**: Injects `dos-pk-qa-only-isolated-test` into `saveStudioBundle()`. Confirms `ALL_ARCHIVAL_DOSSIERS.some(d => d.id === 'dos-pk-qa-only-isolated-test') === false`.
- **`QA-10`**: Exports and re-imports complete `qa-only-2026-11` bundle (dossier, claim, source, media). Confirms canonical constants remain 100% unaltered.

**Conclusion**: The Admin Studio achieves complete and verifiable public archive isolation.
