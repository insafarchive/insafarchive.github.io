# Insaf Archive — Part 5.2: Editorial Approval Workflow & Static Security Specification

## 1. Architectural Model: Static Hosting & Security Realism

Insaf Archive is strictly hosted as a **zero-backend, client-side static application on GitHub Pages**. 

### 1.1 Ban on Fake Client-Side Authentication
In many web prototypes, developers implement pseudo-security gates such as:
- Hard-coded passwords in client-side code (`if (password === 'admin123')`)
- Client-side token validation or base64 decoding
- LocalStorage flags (`localStorage.setItem('isAdmin', 'true')`)

**All such mechanisms are strictly prohibited on Insaf Archive.** In a static web environment, any user can inspect JavaScript source bundles, bypass client-side checks in the browser console, or edit localStorage. Pretending that client-side gates provide administrative security is a catastrophic security fallacy.

### 1.2 The Five-Tier Lifecycle of Archival Data

Because there is no mutable database or authenticated server API, Insaf Archive enforces data immutability and provenance through a transparent 5-tier lifecycle:

```
[1. Local Browser Draft]
       │
       ▼
[2. Exported Submission / Issue Payload]
       │
       ▼
[3. GitHub Issue / Pull Request (Public Peer Review)]
       │
       ▼
[4. Approved Repository Merge (main branch in Git)]
       │
       ▼
[5. Static Site Deployment (GitHub Actions CI/CD to GitHub Pages)]
```

1. **Local Browser Draft**: Editorial staging in browser memory (`localStorage` for temporary persistence of unsaved form fields only, never for security).
2. **Exported Submission**: The Editorial Workspace generates deterministic, structured JSON payloads and GitHub Issue / PR Markdown templates.
3. **GitHub Issue / Pull Request**: Actual editorial review occurs on GitHub. Subject-matter experts, legal counsel, and community contributors inspect diffs, verify citations, and post audit reviews.
4. **Approved Repository Data**: Only signed Git commits merged into the `main` branch by authorized repository maintainers alter the archival dataset.
5. **Published Static Site**: Automated GitHub Actions run `test`, `validate-data`, `typecheck`, and `build`, deploying the static bundle only if all integrity tests pass.

---

## 2. Editorial Status Finite State Machine

The Editorial Workflow defines six mutually exclusive states for dossiers and archive records:

```
        ┌──────────────────────────────────────────────┐
        │                                              ▼
    [ draft ] ────────► [ under_review ] ◄────► [ revision_requested ]
                                │
                                ▼
                           [ approved ]
                                │
                                ▼
                          [ published ] ◄────► [ withdrawn ]
```

### 2.1 State Definitions

| Status | Formal Definition | Public Site Visibility |
| :--- | :--- | :---: |
| `draft` | Initial compilation stage; sources, claims, or translations incomplete. | Internal only |
| `under_review` | Ready for editorial audit; claims and sources being cross-referenced. | Internal / Review banner |
| `revision_requested` | Audited by editorial reviewer; specific gaps, missing citations, or translation defects must be remediated. | Internal only |
| `approved` | All publication safeguards satisfied; certified for repository merge. | Merged in Git branch |
| `published` | Live in the active production dataset on GitHub Pages. | Publicly visible |
| `withdrawn` | Temporarily or permanently removed from public view due to legal stay, factual challenge, or privacy remediation. | Redacted with notice |

### 2.2 Allowed State Transitions

| From State | Allowed Target States | Required Action |
| :--- | :--- | :--- |
| `draft` | `under_review` | Submit for Review |
| `under_review` | `revision_requested`, `approved` | Request Revision OR Approve |
| `revision_requested` | `under_review` | Resubmit for Review |
| `approved` | `published`, `under_review` | Merge to Main OR Re-evaluate |
| `published` | `withdrawn` | Withdraw Record |
| `withdrawn` | `under_review` | Re-open for Remediation |

Any transition outside this matrix is rejected by `validateStatusTransition()`.

---

## 3. Publication Safeguards & Automated Gates

Under `src/utils/editorialWorkflow.ts`, the function `validatePublicationSafeguards()` rigorously blocks premature approvals.

### 3.1 Hard Publication Blockers

A dossier **CANNOT** be transitioned to `approved` or `published` if any of the following conditions are true:

1. **Unchecked Legal Citations**: If any referenced judgment or order has not been inspected by a legal reviewer (`inspectionType !== 'inspected'`).
2. **Stayed or Appealed Decisions**: If a cited judgment has an active stay order (e.g. SC Intra-Court Appeal stay in military courts) without prominent qualification and legal update notation.
3. **Unsupported or Partially Supported Claims**: If any material claim is marked `partially_supported`, `unsupported`, or `source_unavailable`.
4. **Investigation Pending**: If the dossier's verification status is `under_investigation` (e.g. Muridke clashes), reflecting absence of independent inquiry.
5. **Draft Editorial Status**: If the dossier is marked `draft`.
6. **Missing Claims or Sources**: If the dossier has zero claims or zero sources.
7. **Unresolved Claim Source References**: If any `claim.sourceId` does not strictly resolve to a registered source entry in `dossier.sources`.
8. **Incomplete Privacy Review**: If allegations name private individuals without certified court charge-sheets or redaction protocols.
9. **Bilingual Divergence**: If Urdu and English narrative claims convey materially divergent factual contentions.

### 3.2 Actionable Reason Feedback

When publication is blocked, the engine outputs explicit, actionable blocker messages detailing:
- Exact Claim ID and dossier ID
- Specific missing citation or source document
- Legal status check requirement

---

## 4. Immutable Audit Trail Specification

Every change to an archival record or dossier status must append an immutable entry conforming to `EditorialAuditTrailEntry`:

```typescript
export interface EditorialAuditTrailEntry {
  auditId: string;
  recordId: string;
  previousStatus: EditorialStatus;
  newStatus: EditorialStatus;
  action: EditorialAction;
  reviewerNote: string;
  changeSummary: string;
  timestamp: string; // ISO 8601 UTC timestamp
  gitReference?: {
    commitHash?: string;
    pullRequestUrl?: string;
    issueNumber?: number;
  };
}
```

### 4.1 Strict Provenance Rules
- **Mandatory Reviewer Notes**: No status change can be recorded without an explicit explanation of why the transition is justified.
- **Real Timestamps**: Generated at the exact moment of payload creation using `new Date().toISOString()`. Never backdated or simulated.
- **Git Linkage**: In production, every state transition merged into `src/data/dossiers/` is accompanied by its corresponding GitHub PR number and commit SHA.
