# Part 5 — Privacy, Defamation & Publication Review
## Protection of Private Persons, PII Redaction & Publication Guardrails
### Insaf Archive | Antigravity

**Date:** 2026-10-31  
**Audit Scope:** 12 Curated Archival Dossiers & New Domain Records  
**Archival Standard:** Public Interest with Mandatory Privacy & Defamation Safeguards

---

## 1. Editorial Privacy & Defamation Policy

Insaf Archive documents public-interest legal proceedings, constitutional governance, state enterprises, and journalist safety. To balance public transparency with fundamental rights under Article 14 (dignity of man and privacy of home), every archival record and dossier must satisfy the following publication rules:

1. **Mandatory PII Redaction:**
   - Private residential addresses, telephone numbers, personal email addresses, vehicle registration details, and National Identity Card (CNIC) numbers are strictly redacted.
   - Minor individuals and protected confidential witnesses are never identified by name.
2. **Epistemological Distinction Between Allegations and Proven Findings:**
   - Unproven accusations, police FIR allegations, and partisan claims are strictly categorized as `allegation` or `claim` and never presented as judicial findings.
   - A matter may only be labeled as a `court_finding` when supported by an operative judgment or certified order sheet of a competent court.
3. **Mandatory Inclusion of Official Responses & Denials:**
   - Where adverse claims or allegations are made against state bodies, officials, or private entities, the archive mandates recording institutional denials, official counter-arguments, and defense statements.
4. **Draft Quarantine for Incomplete Inquiries:**
   - Any topic lacking an authoritative inquiry report or certified court judgment is quarantined in `draft` or `under_review` status, preventing automated publication.

---

## 2. Dossier-by-Dossier Privacy & Publication Review Audit

| Dossier ID | Sensitive Data Present | PII Redacted | Allegations Distinguished | Official Denials Recorded | Risk Rating | Publication Decision |
|---|---|---|---|---|---|---|
| `dos-pk-legal-military-courts-2023` | Yes (Detainee data) | **YES** | **YES** | **YES** (MoD defense included) | Low | **PUBLISHED** |
| `dos-pk-legal-assembly-dissolution-2022` | No | **YES** | **YES** | **YES** (PTI Art. 69 counsel defense) | Low | **PUBLISHED** |
| `dos-pk-event-may-09-2023` | Yes (Accused lists) | **YES** | **YES** | **YES** (PTI judicial inquiry demand & ISPR position) | High Scrutiny | **UNDER REVIEW** |
| `dos-pk-event-may-26-2022` | Yes (Detainee data) | **YES** | **YES** | **YES** (Interior Ministry public order defense) | Medium | **UNDER REVIEW** |
| `dos-pk-event-muridke-tragedy-2021` | Yes (Casualty lists) | **YES** | **YES** | **YES** (Police casualty statements & TLP claims) | High Scrutiny | **DRAFT / BACKLOG** |
| `dos-pk-journalism-arshad-sharif-killing` | Yes (Autopsy data) | **YES** | **YES** | **YES** (Kenyan Police car theft roadblock defense) | Low | **PUBLISHED** |
| `dos-pk-journalism-press-attacks-impunity` | Yes (FIR details) | **YES** | **YES** | **YES** (PEMRA code-of-conduct defense) | Medium | **UNDER REVIEW** |
| `dos-pk-hist-hamoodur-rahman-1971` | No | **YES** | **YES** | **YES** (Declassified state document) | Low | **PUBLISHED** |
| `dos-pk-soe-pakistan-steel-mills-2006` | No | **YES** | **YES** | **YES** (Privatization Commission defense) | Low | **PUBLISHED** |
| `dos-pk-soe-pia-restructuring-crisis` | No | **YES** | **YES** | **YES** (Aviation Minister & EASA positions) | Low | **UNDER REVIEW** |
| `dos-pk-energy-ipp-power-sector-contracts` | No | **YES** | **YES** | **YES** (IPP Advisory Council sovereign defense) | Low | **PUBLISHED** |
| `dos-pk-legal-asia-bibi-acquittal` | Yes (Vulnerable minority) | **YES** | **YES** | **YES** (Prosecution witness claims & defense) | Low | **PUBLISHED** |

---

## 3. Specific Protection Measures Implemented

### Asia Bibi Acquittal Dossier (`dos-pk-legal-asia-bibi-acquittal`)
- **Risk:** High security vulnerability for religious minorities and acquitted individuals.
- **Action:**
  - Complete exclusion of village residences, local agricultural plot numbers, and family whereabouts.
  - Sourced solely from the reported Supreme Court judgment (PLD 2019 SC 64) and legal arguments.
  - Minor witnesses and private individual names appearing in trial transcripts are redacted.

### Military Courts Dossier (`dos-pk-legal-military-courts-2023`)
- **Risk:** Civilian detainees held under military jurisdiction whose trials were under active adjudication.
- **Action:**
  - Names of non-public private citizens transferred to military custody are suppressed; only public-figure petitioners (former Chief Justice Jawwad S. Khawaja, Aitzaz Ahsan) are cited.
  - The Federation's constitutional defenses and assurances regarding legal representation and family visitation are fully preserved.

### Arshad Sharif Targeted Killing Dossier (`dos-pk-journalism-arshad-sharif-killing`)
- **Risk:** Forensic and ballistic autopsy sensitivity, ongoing cross-border criminal proceedings.
- **Action:**
  - Graphic post-mortem imagery is excluded from public display.
  - Findings strictly cite the High Court of Kenya judgment (Petition E007 of 2023) and the official 592-page Pakistani JIT report.
  - The Kenyan National Police Service's initial defense regarding stolen motor vehicle roadblocks is explicitly documented.

### Muridke Tragedy 2021 Dossier (`dos-pk-event-muridke-tragedy-2021`)
- **Risk:** Partisan casualty claims without certified judicial findings.
- **Action:**
  - Quarantined in `draft` status within the research backlog.
  - Clearly flags that independent medical autopsy reports and ballistic evidence remain unverified in the public domain.

---

## 4. Editorial Workspace Publication Checklist

In [EditorialWorkspace.tsx](file:///g:/Development/insafarchive/src/components/admin/EditorialWorkspace.tsx), a dedicated **Privacy, Defamation & Publication Review** panel enforces:
1. `Editorial Status` selector (draft / under_review / approved).
2. `Privacy Classification` selector (public / public_sensitive / restricted_editorial / do_not_publish).
3. Explicit confirmation checkboxes for:
   - PII Redaction
   - Allegation vs Finding separation
   - Inclusion of institutional denials
4. Live Epistemological Guardrail Warning preventing any claim from being marked as `court_finding` without an attached judicial source.
