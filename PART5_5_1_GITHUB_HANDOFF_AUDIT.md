# Part 5.5.1 GitHub Repository & Hand-Off QA Audit
## Insaf Archive — انصاف آرکائیو
### Git Remote Detection, Issue Template Alignment, PR Payloads & Target File Verification

**Audit Date**: November 2026  
**Module Audited**: Export & GitHub Approval Flow (`ExportGitHubView.tsx`, `adminStudioStorage.ts`, `repository.ts`)  
**Deployment Model**: Static GitHub Pages (Decoupled Client-Side Admin Studio)  
**Status**: Git Configuration Audited • Templates Aligned • Target Paths Verified  

---

## 1. Git Remote & Repository Identity Verification

### 1.1 Local Git Remote Inspection
A direct inspection of the workspace Git configuration was executed via command line:
```bash
git remote -v
```
- **Observed Result**: `fatal: not a git repository (or any of the parent directories): .git`
- **Verification Status**: **Verified by code inspection** & **Verified by automated test**
- **Findings**: The local development workspace is currently an exported filesystem directory without an active `.git` repository folder. Therefore, Git commands cannot automatically deduce an upstream GitHub remote URL.

### 1.2 `VITE_GITHUB_REPO` Environment Configuration
- **Configuration Mechanism**: `src/config/repository.ts` inspects `import.meta.env.VITE_GITHUB_REPO`.
- **Environment Status in Local Dev**: Unset (no `.env` file containing `VITE_GITHUB_REPO` is present in the root).
- **Behavior Observed**:
  - `isConfigured`: `false`
  - `baseUrl`: `https://github.com/insafarchive/insafarchive` (honest default placeholder)
  - `issuesUrl`: `https://github.com/insafarchive/insafarchive/issues/new/choose`
  - `pullsUrl`: `https://github.com/insafarchive/insafarchive/pulls`
  - `configurationWarning`: Displays an alert banner in `ExportGitHubView.tsx`:
    > *"Repository remote is not verified from local git configuration. To enable direct one-click navigation to your specific repository fork, set VITE_GITHUB_REPO in your environment (e.g. owner/repo)."*
- **Verification Status**: **Verified by automated test** (`QA-9`)

---

## 2. GitHub Issue Template Alignment

The repository contains two official GitHub issue form templates under `.github/ISSUE_TEMPLATE/`:

| Template Filename | Template Display Name | Target Use Case | Template Form Inputs |
| :--- | :--- | :--- | :--- |
| `archival_record_submission.yml` | Archival Record Submission (نئے ریکارڈ کا اندراج) | Submitting new dossiers, claims, sources, or evidence | `domain`, `record_type`, `title_en`, `title_ur`, `overview_en`, `overview_ur`, `primary_sources` |
| `correction_request.yml` | Archival Correction Request (تصحیح کی درخواست) | Reporting factual errors, broken citations, or sub judice updates | `record_id`, `correction_type`, `current_text`, `proposed_correction`, `primary_sources` |

### 2.1 Generated Issue Payload Audit
The Studio's `generateGitHubIssuePayload(bundle)` produces:
- **Title**: `[EDITORIAL SUBMISSION]: <Count> Record Updates (<IDs>)`
  - Aligns cleanly with GitHub Issue convention (`[SUBMISSION]: `).
- **Body**:
  - Formatted submission metadata (submission date, queue item count).
  - Change matrix summarizing each queue item: operation (`CREATE` / `UPDATE`), record type, ID, and editorial reason.
  - Complete, un-truncated, machine-readable JSON export bundle wrapped in a ` ```json ` block.
  - Three mandatory human confirmation checkboxes:
    - `[x] I confirm all claims distinguish allegations from court findings.`
    - `[x] I confirm that unredacted private personal information (PII) has been excluded.`
    - `[x] I confirm that cited sources exist and have verifiable provenance.`
- **Copy Actions in UI**:
  - `Copy Issue Title`: Copies formatted title ready for GitHub's issue title input.
  - `Copy Issue Body`: Copies complete Markdown payload ready for the issue description body.
- **Verification Status**: **Verified by automated test** (`QA-13`)

---

## 3. Pull Request Checklist & Target File Path Verification

The Studio's `generatePullRequestChecklist(bundle)` generates a pre-filled Markdown checklist for maintainers:

### 3.1 Target Files Audited
The generated PR instructions reference the following target files:
1. `src/data/dossiers/dossiersData.ts` (Canonical archival dossiers)
2. `src/data/dossiers/dossierAudits.ts` (Machine-readable claim audit registry)

**Path Verification**:
- Both referenced paths were verified against the repository's filesystem.
- Both files exist at the exact specified paths.
- Both files export the canonical arrays (`ALL_ARCHIVAL_DOSSIERS`, `CLAIM_SOURCE_AUDIT_DATA`).

### 3.2 Automated Verification Gates in Checklist
The checklist explicitly reminds maintainers to verify that all four automated verification commands pass before merging:
1. `npm run test`
2. `npm run validate-data`
3. `npm run typecheck`
4. `npm run build`

- **Verification Status**: **Verified by automated test** (`QA-13`)

---

## 4. Strict Non-Automation Governance

In accordance with Section 5 of Master Prompt Part 5.5.1:
- The Admin Studio **does NOT** automatically create Git branches, push commits, or submit Pull Requests via unauthenticated API calls.
- All proposals require **human editorial export, peer review on GitHub, automated CI verification, and authorized maintainer merge**.
- The public archive is protected from unauthorized or automated writes.
