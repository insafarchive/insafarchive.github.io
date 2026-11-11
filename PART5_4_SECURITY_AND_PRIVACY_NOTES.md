# Part 5.4 — Security, Privacy, and Honest Architecture Notes
## Insaf Archive — انصاف آرکائیو
**Status:** Canonical Policy Standard  
**Effective Date:** 2026-11-01  
**Scope:** Client-Side Security Model, Browser LocalStorage Safeguards, Article 14 Privacy Mandate, & Anti-Fabrication Constraints

---

## 1. Honest Architecture & Client-Side Security Model

In many static web projects, developers implement cosmetic "admin" screens with client-side passwords, fake authentication tokens stored in `localStorage`, or boolean `isAdmin = true` flags.

**Insaf Archive strictly rejects all deceptive security patterns:**

1. **No Fake Authentication:**
   The Admin Editorial Studio does not implement client-side password dialogs or pseudo-login screens that falsely imply server-side protection. Any code executing in a user's web browser is fully inspectable by the client.
2. **Device-Local Draft Scope:**
   Draft dossiers, claims, sources, and media records created in the Studio are stored strictly in the client's browser `localStorage` under key `insaf_archive_admin_studio_bundle_v1`. They do not synchronize across devices and are not accessible to other users until exported and merged via git.
3. **No Automatic Database Sync:**
   The Studio makes no deceptive claims of "auto-syncing to cloud database".
4. **Zero Secret Footprint:**
   No personal access tokens, GitHub API bearer secrets, or private SSH keys are stored in client-side code, environment variables bundled into Vite output, or LocalStorage.

---

## 2. Privacy & Personal Data Safeguards (Article 14 Compliance)

Article 14(1) of the Constitution of Pakistan guarantees that *"the dignity of man and, subject to law, the privacy of home, shall be inviolable."* In criminal, human-rights, and public-interest documentation, public accountability must be balanced with individual privacy rights.

### Mandatory Redaction Rules:

| Data Category | Retention Rule | Justification & Safeguard |
|---|---|---|
| **National ID (CNIC) Numbers** | **Strictly Redacted** | Prevents identity theft and financial fraud. |
| **Residential Addresses** | **Strictly Redacted** | Protects physical safety of individuals and families. |
| **Personal Telephone / Email** | **Strictly Redacted** | Prevents harassment and doxxing. |
| **Uncharged Bystanders & Civilians** | **Strictly Redacted** | Protects innocent third parties from collateral stigma. |
| **Juveniles & Minors** | **Strictly Redacted** | Statutory compliance with juvenile justice frameworks. |
| **Victims of Gender-Based / Sexual Violence** | **Strictly Redacted** | Absolute statutory identity protection. |
| **Public Officials in Official Duty** | **Public Record** | Judges, prosecutors, ministers, and police chiefs acting in their official public capacities are not redacted, provided claims are strictly anchored to verified public records. |

---

## 3. Local Document Path & File Export Warnings

The Studio includes specific metadata fields for `localDocumentPath`. Because Insaf Archive is hosted on GitHub Pages, **the application cannot and does not upload local binary files from the user's hard drive to a remote server**.

To prevent inadvertent leakage:
1. **Local Path Privacy Caution:** Whenever a local path (e.g. `C:/Users/.../file.pdf`) is entered, the Studio displays a prominent warning reminding the editor that the file will not be uploaded and to ensure the path contains no personal or confidential directory names.
2. **Relative Path Standardization:** When committing genuine public-record documents (such as court judgments or commission reports), files must be manually placed in the repository's public directory using clean, standardized relative paths (e.g. `docs/judgments/sc-cp24-2023.pdf`).
3. **No Unredacted Media Export:** Photographs, videos, and scanned records containing unredacted private citizen PII are blocked from publication.

---

## 4. Anti-Fabrication & Evidentiary Integrity Controls

1. **No Invented URLs:** The Studio enforces regular expression validation on `officialUrl` and `archivedUrl`, and strictly rejects placeholder domains (e.g. `example.com`, `todo`, `test.com`) from being marked as verified.
2. **No False Official Designations:** A source whose availability is marked as `not_checked` cannot be labeled with `official_document` authenticity.
3. **No Conversion of Allegations to Findings:** The Studio actively scans claim texts; if an allegation or official statement attempts to characterize an unadjudicated assertion as a judicial conviction or decree, the validation engine flags an `Allegation Conflation` error.
4. **Docket Freshness Audits:** If the date of last legal status review exceeds 365 days, automated warnings alert editors that court cause lists and appellate dockets must be re-checked before publication.
