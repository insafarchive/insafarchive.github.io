# Part 5.3 — Corrected Publication Policy & Sub Judice Disclosure Framework
## Insaf Archive — انصاف آرکائیو
**Status:** Approved Policy Standard  
**Effective Date:** 2026-11-01  
**Scope:** Publication Safeguards, Decoupling Publication Eligibility from Legal Status, Sub Judice Disclosure, & Privacy Mandate

---

## 1. Core Principle: Decoupling Publication Eligibility from Sub Judice Status

Prior to Part 5.3, the publication workflow operated under an over-restrictive conflation: treating the existence of any ongoing or stayed judicial proceeding as an automatic statutory bar to publication.

In constitutional and public-interest documentation, **an ongoing legal proceeding is not a prohibition on publishing historical, factual, or judicial records about that proceeding**. Public hearings, reported interim orders, declassified asset declarations, and official gazetted records are matters of public record under Article 19A of the Constitution of Pakistan (Right to Information).

The Insaf Archive formally establishes a foundational distinction between two separate dimensions:
1. **Dimension A: Publication Eligibility** (Archival Quality & Safeguards)
2. **Dimension B: Legal Proceeding Status** (Sub Judice Classification)

```
                    ┌────────────────────────────────────────────────────────┐
                    │               PUBLICATION DECISION TREE                │
                    └────────────────────────────────────────────────────────┘
                                                │
                     Is there an active court gag order / reporting ban?
                                                │
                                ┌───────────────┴───────────────┐
                               Yes                              No
                                │                                │
                      [HARD BLOCK: Withhold]           Are claims supported by
                                                       adequate primary sources?
                                                                │
                                                ┌───────────────┴───────────────┐
                                               No                              Yes
                                                │                                │
                                      [HARD BLOCK: Draft]              Is PII redacted &
                                                                       allegations separated?
                                                                                │
                                                                ┌───────────────┴───────────────┐
                                                               No                              Yes
                                                                │                                │
                                                      [HARD BLOCK: Review]             What is the legal
                                                                                       proceeding status?
                                                                                                │
                                                ┌───────────────────────────────────────────────┴──────────┐
                                                │                                                          │
                                     Concluded / Settled                                     Ongoing / Pending Appeal / Stayed
                                                │                                                          │
                                      Eligible to Publish                                      Eligible to Publish ONLY WITH:
                                                                                               1. Prominent Pending Notice
                                                                                               2. Last Status Check Date (<365d)
                                                                                               3. Strict Neutrality / No Predictions
```

---

## 2. Dimension A: Publication Eligibility Criteria

A dossier is eligible for public dissemination only when all of the following evidentiary and editorial conditions are satisfied:

1. **Evidentiary Support of Defined Scope**:
   Every material factual claim asserted in the dossier text is backed by verified primary records or corroborated secondary sources in the audit registry (`CLAIM_SOURCE_AUDIT_DATA`). Unsupported claims block publication.
2. **Editorial Verification & Sign-off**:
   The dossier has passed formal editorial review (`editorialStatus: 'in_review'` transitioning to `'approved'` or `'published'`). No draft dossier may be auto-promoted without explicit human review.
3. **No Active Court Reporting Ban**:
   The dossier must have `hasActiveReportingBan: false`. If a competent court of record issues an injunctive order, gag order, or contempt warning restraining public reporting on a specific case, the affected dossier or section must be withheld.
4. **Bilingual Parity**:
   Substantive factual statements must match across Urdu and English. Incomplete translations must be flagged rather than filled with unreviewed machine placeholders.
5. **Separation of Factual Tiers**:
   Allegations, official executive defenses, police claims, and judicial determinations must be strictly distinguished in typography, metadata, and language.

---

## 3. Dimension B: Legal Proceeding Status Classifications

The underlying legal controversy or event may occupy one of seven controlled states:

| Controlled Status | Legal Meaning | Publication Requirement When Eligible |
|---|---|---|
| `concluded` | Final judgment entered; appellate remedies exhausted or time-barred (e.g. PSMC PLD 2006 SC 697). | Standard publication. Periodic review for historical accuracy. |
| `ongoing` | Active trial before a competent court (e.g. Model Town private complaint or ATC trials). | **Mandatory Pending Proceedings Notice**; last-checked review date; no speculative predictions on verdict. |
| `pending_appeal` | Lower court order entered but challenged before High Court or Supreme Court (e.g. Toshakhana sentence suspension). | **Mandatory Pending Proceedings Notice**; explicit disclosure of appeal stage and interim orders. |
| `stayed` | Operation of a judicial finding or executive action suspended by an appellate bench (e.g. Military Courts ICA stay). | **Mandatory Interim Stay Notice**; forbidden to describe stayed order as operative law. |
| `under_investigation` | Criminal or departmental investigation underway; no final charge sheet / trial conclusion (e.g. Arshad Sharif murder). | **Mandatory Investigation Notice**; strict attribution of JIT findings as investigative claims, not convictions. |
| `unresolved` | Incident occurred but official investigation was never gazetted or finalized (e.g. Muridke 2021 clashes). | **Mandatory Unresolved Status Notice**; explicit disclosure of absence of judicial commission. |
| `unknown` | Legal status of proceedings cannot be ascertained through public gazettes or high court cause lists. | Editorial review blocker; requires status verification before publication. |

---

## 4. Mandatory Requirements for Publishing Ongoing Proceedings

When a dossier concerning an `ongoing`, `pending_appeal`, `stayed`, or `under_investigation` case is approved for publication:

1. **Prominent Pending-Proceedings Notice (`pendingProceedingsNotice`)**:
   Must display at the top of the dossier in both English and Urdu, cautioning the reader that proceedings are active and sub judice.
   - *Example*: "Notice of Pending Appeal: On 13 December 2023, a 6-member Supreme Court bench stayed the operative order of the 23 October 2023 judgment by a 5-1 majority pending decision on Intra-Court Appeals."
2. **Freshness Date (`lastLegalStatusChecked`)**:
   Must record the calendar date when court dockets and cause lists were last checked. If the check date is older than 365 days, automated audit triggers a `STALE_LEGAL_STATUS` warning.
3. **No Speculative Predictions**:
   Editors must never predict trial outcomes, guilt, innocence, or judicial motives.
4. **Fair Defense & Institutional Denials**:
   Official responses, defense affidavits, and institutional positions must be documented alongside allegations.

---

## 5. What Does NOT Block Publication

The archive explicitly clarifies that the following common conditions do **not** disqualify a dossier from publication, provided its published factual scope is verified:
- **No Final Judgment**: A dossier documenting a registered FIR, arrest, and high court bail order is publishable even if the final trial will take years.
- **Pending Appeal**: An authoritative High Court order is publishable immediately, accompanied by disclosure of the filed appeal.
- **Ongoing Restructuring or Privatization**: Documenting the verified historical debt of PIA (PKR 713bn) or past EASA regulatory bans does not require waiting for future airline bidding or re-certification to conclude.
- **Absence of a Formal Inquiry**: Documenting verified police hospital admissions and Section 144 notifications during protests does not require waiting for an inquiry commission that may never be appointed.

---

## 6. Privacy & Redaction Policy (Article 14 Compliance)

1. **Private Citizens & Bystanders**:
   Personal identification numbers (CNIC), residential addresses, telephone contacts, medical records, and names of juvenile family members or uncharged bystanders must be permanently redacted (`piiRedacted: true`).
2. **Public Officials in Official Capacity**:
   Judges, prosecutors, statutory regulators, police chiefs, and cabinet ministers acting in their official public capacities are not redacted, provided claims relate strictly to public duties and verified official records.
3. **Victims of Sexual or Gender-Based Violence**:
   Absolute identification ban. Names and identifying circumstances are strictly withheld in accordance with statutory privacy protections.
