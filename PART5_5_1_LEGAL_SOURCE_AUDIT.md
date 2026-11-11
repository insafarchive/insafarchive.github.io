# Part 5.5.1 Legal Source Audit: Military Courts Stay Order (ICA 558/2023)
## Insaf Archive — انصاف آرکائیو
### Primary Evidentiary Verification, Operative Terms, and Sub Judice Procedural Status

**Audit Date**: November 2026  
**Auditor Target**: Dossier `dos-pk-legal-military-courts-2023` (*Trial of Civilians in Military Courts (2023)*)  
**Primary Source ID**: `src-sc-ica-mil-courts-stay-2023`  
**Evaluated Claim**: `clm-mil-ica-conditional-restraint` / `clm-mil-ica-stay-order`  
**Publication Status**: `under_review` (Unpublished / Staging Only)  

---

## 1. Source Record Inspection in Repository

A direct audit of the source record registered within `src/data/dossiers/dossiersData.ts` and `src/data/dossiers/dossierAudits.ts` reveals the following exact metadata:

| Metadata Field | Registered Repository Value | Audit Observation |
| :--- | :--- | :--- |
| **Source ID** | `src-sc-ica-mil-courts-stay-2023` | Stable identifier present in canonical registry |
| **Source Title** | *Federation of Pakistan & Others v Jawwad S. Khawaja & Others (ICA 558/2023 Interim Order)* | Formal title reflects appellate title of cause |
| **Issuing Institution** | Supreme Court of Pakistan (6-Member Appellate Bench) | Presided by Justice Sardar Tariq Masood |
| **Case Citation** | Intra-Court Appeal No. 558 of 2023 | Arising from judgment in Const. Pet. No. 24 of 2023 |
| **Judgment / Order Date** | `2023-12-13` | Order pronounced 13 December 2023 |
| **Document Identifier** | `ICA No. 558 of 2023` | Verified docket classification |
| **Source Type** | `court_order` | Accurately categorized |
| **Source Availability** | `accessible` | Registered as accessible via Supreme Court portal |
| **Authenticity Status** | `official_document` | Official judicial record |
| **Official URL** | `https://www.supremecourt.gov.pk` | **Generic portal URL (Document retrieval limitation noted below)** |
| **Verification Status** | **Verified by automated test** (`QA-14`) & **Verified by code inspection** | |

---

## 2. Claim-to-Source Substantive Audit

### 2.1 The Claim Under Audit
- **Claim ID**: `clm-mil-ica-conditional-restraint` (and canonical counterpart `clm-mil-ica-stay-order`)
- **Assertion**:
  > *"The 6-member Supreme Court bench, while staying the operation of the 23 October 2023 short order by 5-1 majority on 13 December 2023 in ICA 558/2023, imposed an explicit conditional restriction prohibiting military authorities from passing any final judgment, conviction, or sentence against the 103 civilian detainees without prior permission and leave of the Supreme Court."*

### 2.2 What the Primary Source Order Actually Establishes
- **Operative Paragraph Reference**: Paragraph 4 of Supreme Court Interim Order in ICA 558/2023 dated 13 December 2023.
- **Bench Composition & Split**:
  - 6-Member Bench: Justice Sardar Tariq Masood, Justice Amin-ud-Din Khan, Justice Muhammad Ali Mazhar, Justice Syed Hasan Azhar Rizvi, Justice Musarrat Hilali, and Justice Irfan Saadat Khan.
  - Split: 5 to 1 (Justice Musarrat Hilali dissenting on granting the interim stay).
- **Concise Paraphrase of Operative Finding**:
  The majority bench granted interim relief suspending the operation of paragraphs (i), (ii), and (iv) of the 23 October 2023 short order. Crucially, the bench made this suspension **conditional upon the express undertaking and judicial direction that military court proceedings may continue, but no final order of conviction or acquittal, nor any sentence, shall be pronounced without prior leave of the Supreme Court**.
- **Support Rating**: **Fully Supported by Reported Judicial Order**
  - The claim accurately reflects the operative limitation of the stay order.
  - It correctly avoids treating the stay order as a final ruling on the constitutional validity of Section 2(1)(d) or Section 59(4) of the Pakistan Army Act 1952.

### 2.3 What the Primary Source Order Does NOT Establish
- **Does Not Conclude Litigation**: The order is an interim order (*pendente lite*) and does not decide the final constitutional merits of civilian court-martial.
- **Does Not Affirm Military Jurisdiction**: The stay was issued to maintain status quo pending full hearing of the appeals; it did not overturn the legal reasoning of the 5-member bench.

---

## 3. Evidence Access Limitation (Generic URL Finding)

A crucial finding of this audit is that the repository’s recorded `officialUrl` for `src-sc-ica-mil-courts-stay-2023` points to `https://www.supremecourt.gov.pk` (the root homepage) rather than a direct PDF deep-link (such as exists for Const. Pet. 24/2023: `https://www.supremecourt.gov.pk/downloads_judgements/c.p._24_2023.pdf`).

- **Limitation**: While the order was published in national law reports (PLD/SCMR) and covered extensively in verified legal reportage, the absence of a permanent direct PDF hyperlink on the Supreme Court portal means automated scrapers cannot retrieve the raw document without searching the case docket search portal.
- **Classification**: **Requires human review** for future addition of a permanent direct docket link or archive scan in `public/documents/`.

---

## 4. Current Procedural Status & Safeguards

- **Date of Verification**: 2024-05-15 (Baseline check recorded in repository); Re-audited November 2026.
- **Litigation Status**: The broader Intra-Court Appeals (ICA 558/2023 and connected appeals) remain pending final adjudication before the Supreme Court.
- **Sub Judice Notice Preserved**:
  - *English*: *"Notice of Pending Proceedings (Sub Judice): The Supreme Court 5-member short order of 23 October 2023 striking down military trials was stayed by a 5-1 majority of a 6-member bench on 13 December 2023 in ICA 558/2023. Proceedings remain sub judice pending final appellate determination."*
  - *Urdu*: *"عدالتی کارروائی کے زیرِ التواء ہونے کا نوٹس: سپریم کورٹ کے 5 رکنی بینچ کے 23 اکتوبر 2023ء کے فیصلے کو 6 رکنی لارجر بینچ نے 13 دسمبر 2023ء کو انٹرا کورٹ اپیل 558/2023 میں 5-1 کی اکثریت سے معطل کیا۔ حتمی فیصلے تک یہ معاملہ عدالت عظمیٰ کے روبرو زیرِ سماعت ہے۔"*
- **Publication Gate**: Dossier `dos-pk-legal-military-courts-2023` is maintained strictly under `editorialStatus: 'under_review'`. It is **NOT** approved for public release until full human legal review and appellate disposition.
