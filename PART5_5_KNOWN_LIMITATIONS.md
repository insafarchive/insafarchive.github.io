# Part 5.5 Known Limitations & Technical Governance
## Insaf Archive — انصاف آرکائیو
### Honest Architecture, Security Model, and Editorial Boundaries

**Date**: November 2026  
**System Architecture**: Static Single-Page Application (SPA) deployed to GitHub Pages  
**Runtime**: Client-side React 19 + TypeScript  
**Persistence Model**: Browser-Local Storage (`LocalStorage`) + Git-based Pull Request Review  

---

## 1. Architectural Boundaries & Static Deployment Model

### 1.1 No Server-Side Backend or Centralized Database
- **Design Principle**: Insaf Archive is architected as an immutable, censorship-resistant static public-interest archive deployed via GitHub Pages.
- **Operational Reality**: There is **no Node/Express server, no Python/Django backend, no PostgreSQL database, and no server-side API**.
- **Draft Storage**: All drafts created or edited in the Admin Editorial Studio are stored **strictly within the user's browser `LocalStorage`**.
- **Implication**: Drafts created on one computer, browser profile, or device **do not automatically sync** to other editorial machines. Collaboration occurs exclusively through **exported JSON bundles or Git branches/Pull Requests**.

### 1.2 LocalStorage Capacity Limits
- **Storage Quota**: Browsers typically allocate 5MB to 10MB of `LocalStorage` per origin.
- **Current Footprint**: A typical Insaf Archive draft bundle (10-20 dossiers, claims, sources) consumes less than 150KB, well within safe thresholds.
- **Limitation**: Storing large volumes of unstructured media transcripts or multiple extensive draft bundles could approach quota boundaries. The system includes quota error trapping (`saveStudioBundle` returns `false` gracefully rather than throwing fatal crashes), but editors are advised to export bundles regularly.

---

## 2. Authentication & Access Control Truth in Advertising

### 2.1 Absence of Fake Client-Side "Logins"
- **Honest Security Posture**: In accordance with strict static-site governance, the application **does not implement fake client-side passwords, pseudo-tokens, or deceptive "admin login" prompts**.
- **Security Reality**: On a static website, any JavaScript-enforced client-side password can be easily bypassed by inspecting network traffic or viewing source code.
- **True Access Control**: The repository's true access control exists at the **GitHub repository level**:
  - Branch protection rules on `main`.
  - Required peer reviews from authorized maintainers.
  - Automated CI test passing (`npm run test`, `validate-data`, `typecheck`, `build`).
  - GPG/SSH commit signature verification.

### 2.2 Public Archive Isolation by Design
- **Draft Staging**: The public archive reads exclusively from compile-time TypeScript constants (`ALL_ARCHIVAL_DOSSIERS`, `CLAIM_SOURCE_AUDIT_DATA`, `CONSTITUTIONAL_ARTICLES`).
- **Isolation Guarantee**: Changes made in Admin Studio live in `LocalStorage` and have zero access to mutate the static JS bundle. A draft can **never alter what the general public sees** until a pull request is merged and GitHub Actions redeploys the site.

---

## 3. Media & Document Evidentiary Upload Boundaries

### 3.1 No Direct Binary Uploads to GitHub Pages
- **Technical Restriction**: Static browser clients cannot execute git push commands or upload multi-megabyte PDF/video files to GitHub without authenticated API tokens.
- **Honest Warning**: If an editor enters a local file path (e.g. `C:\Users\Admin\Documents\order.pdf`), the studio generates an explicit warning:
  > *"Local file paths are only accessible on your local computer and cannot be viewed by archive readers. Please provide a verified public URL or archive document reference."*
- **Workflow Requirement**: Evidentiary PDFs or media must either be officially published by the relevant court/department, archived on the Wayback Machine, or committed directly to the repository's `public/documents/` folder via Git.

---

## 4. Repository Identity & Configuration Detection

### 4.1 Local Repository Remote Absence
- In local development environments without an active `.git` repository folder (e.g., zip extractions or sandboxed IDE workspaces), git commands (`git remote -v`) cannot determine the upstream GitHub URL.
- **Honest Fallback**: The application does not assume or fabricate repository identity. `src/config/repository.ts` inspects `import.meta.env.VITE_GITHUB_REPO`. If unset, it displays a clear configuration banner informing the editor that the repository remote is unverified and providing instructions to set `VITE_GITHUB_REPO=owner/repo`.

---

## 5. Sub Judice & Freshness Boundaries

### 5.1 Static Snapshot vs. Real-Time Court Dockets
- **Court Proceedings Evolve**: Pakistan's constitutional courts (Supreme Court, High Courts) issue orders, adjourments, and bench reconstitutions on active dockets.
- **Automated Freshness Safeguard**: The Studio enforces a 365-day freshness check (`lastLegalStatusChecked`). If an entry has not been re-verified within a year, the editor is flagged with an error.
- **Human Review Obligation**: The archive cannot replace active legal docket inspection. Any change in legal status (e.g. vacation of a stay order or pronouncement of final judgment) requires human legal verification with precise court citation and date.
