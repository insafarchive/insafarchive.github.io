# Part 5.1: Dossier Privacy, Defamation & Vulnerable Person Audit Results
**Insaf Archive (انصاف آرکائیو)**  
**Audit Date:** 31 October 2026  
**Auditor:** Antigravity Data Protection, Defamation & Privacy Subsystem  
**Scope:** Actual Content Inspection of all 12 Dossiers and Supporting Archive Records

---

## 1. Executive Summary

This document presents the content-level audit of personally identifiable information (PII), vulnerable person protections, official denials, and defamation safeguards across the Insaf Archive codebase.

The audit was conducted directly on the raw TypeScript data structures in `src/data/dossiers/dossiersData.ts`, `src/data/dossiers/dossierAudits.ts`, and referenced archive records in `src/data/records/`. 

### Key Audit Findings
1. **Zero PII Exposure:** 0 instances of Computerized National Identity Card (CNIC) numbers, phone numbers, private residential street addresses, or personal financial account details exist in the dataset.
2. **Protection of Vulnerable Witnesses & Accused Persons:** In sensitive criminal and blasphemy cases (e.g., Asia Bibi, Muridke, 9 May), individual accused persons, minor witnesses, and complainant residential details have been withheld or replaced with institutional or published court titles.
3. **Equitable Balancing / Right of Reply:** Every contested dossier includes explicit `officialPositions` recording the institutional or defense response, ensuring no party is accused without their defense position on record.
4. **Presumption of Innocence:** Wording across all 12 dossiers strictly separates allegations, executive claims, and trial charges from conclusive judicial findings.

---

## 2. Granular Dossier-by-Dossier Privacy & Defamation Inspection

### 1. `dos-pk-legal-military-courts-2023` (Military Court Trials of Civilians)
- **PII / Identity Check:** No names or CNICs of the 103 civilian detainees are disclosed. Mention is restricted to senior advocates on record (Jawwad S. Khawaja, Aitzaz Ahsan) and public officials (Attorney-General Mansoor Usman Awan).
- **Allegation vs. Finding:** Differentiates between executive notifications under the Army Act and judicial adjudication by the Supreme Court.
- **Official Position Recorded:** Federation of Pakistan / Ministry of Defence defense statement dated 18 July 2023 (`pos-fed-defense-mil-courts`) is included.
- **Defamation Risk Assessment:** Low.

### 2. `dos-pk-legal-assembly-dissolution-2022` (National Assembly Dissolution)
- **PII / Identity Check:** Named individuals are constitutional office holders acting in their official capacities (Deputy Speaker Qasim Suri, Prime Minister Imran Khan, President Arif Alvi, Chief Justice Umar Ata Bandial).
- **Allegation vs. Finding:** Diplomatic cable ("Cypher") allegations are attributed strictly as party assertions under Article 5; Supreme Court's unanimous finding under Article 58(1) Explanation is recorded as binding holding.
- **Official Position Recorded:** PTI legal counsel and government defense argument regarding Article 69 parliamentary immunity (`pos-pti-cypher-defense`) is explicitly recorded.
- **Defamation Risk Assessment:** Low.

### 3. `dos-pk-event-may-09-2023` (9 May Protests & Detentions)
- **PII / Identity Check:** All civilian detainees and protestors arrested across Punjab and KP remain anonymous. Only public political leaders and statutory spokespersons are identified.
- **Allegation vs. Finding:** High scrutiny enforced. Arson and trespassing on military property are classified as contested events under trial; ISPR communiqués are labeled `official_position`; Supreme Court order on arrest execution is classified as `court_finding`.
- **Official Position Recorded:** Both the ISPR communiqué (`pos-ispr-9may`) and the PTI leadership denial/demand for a judicial commission (`pos-pti-denial-9may`) are fully catalogued.
- **Defamation Risk Assessment:** High scrutiny maintained. Kept `under_review` while trial court proceedings continue.

### 4. `dos-pk-event-may-26-2022` (25–26 May 2022 Azadi March)
- **PII / Identity Check:** Protesting workers and detained lawyers are referenced generically without private identity data.
- **Allegation vs. Finding:** Police roadblocks, tear gas usage, and Red Zone entry claims are documented from Supreme Court order sheets rather than unilateral partisan claims.
- **Official Position Recorded:** Ministry of Interior's public order and security defense (`pos-interior-may26`) is recorded.
- **Defamation Risk Assessment:** Low.

### 5. `dos-pk-event-muridke-tragedy-2021` (Muridke GT Road Clashes)
- **PII / Identity Check:** Deceased police constables and injured personnel are referenced by rank and official tally, avoiding personal family details. Civilian casualty claims are kept generalized without unverifiable names.
- **Allegation vs. Finding:** Strict draft containment. The absence of certified medical and ballistic reports is explicitly highlighted.
- **Official Position Recorded:** Interior Ministry / Punjab Police law enforcement account (`pos-interior-tlp-oct2021`) is catalogued.
- **Defamation Risk Assessment:** High. Withheld from publication in `draft` status.

### 6. `dos-pk-journalism-arshad-sharif-killing` (Arshad Sharif Targeted Killing)
- **PII / Identity Check:** Family addresses, private lodging details, and unverified third-party names in Kenya are strictly omitted. Only legal representatives, petitioner Javeria Siddique, and judicial officers are identified.
- **Allegation vs. Finding:** Kenyan High Court judicial findings (unlawful lethal force, violation of Article 26(1)) are separated from Pakistani executive JIT findings (pre-planned targeted killing) and Kenyan police initial claims (stolen vehicle pursuit).
- **Official Position Recorded:** National Police Service of Kenya's initial roadblock statement (`pos-kenya-police-initial`) is recorded.
- **Defamation Risk Assessment:** Low. Grounded in certified court judgment of High Court of Kenya.

### 7. `dos-pk-journalism-press-attacks-impunity` (Attacks on Journalists & Impunity)
- **PII / Identity Check:** Non-public complainants in police FIRs and confidential sources are excluded. Only public television journalists whose cases were litigated before High Courts are referenced.
- **Allegation vs. Finding:** Distinguishes verified judicial orders of IHC setting aside PEMRA bans from unprosecuted assault allegations.
- **Official Position Recorded:** PEMRA legal counsel defense regarding broadcast code of conduct (`pos-pemra-defense`) is documented.
- **Defamation Risk Assessment:** Medium. Retained `under_review`.

### 8. `dos-pk-hist-hamoodur-rahman-1971` (Hamoodur Rahman Commission)
- **PII / Identity Check:** Fully historical public records declassified by the Cabinet Division. No private individual data exposed.
- **Allegation vs. Finding:** Commission findings and recommendations are cited as official inquiry determinations.
- **Official Position Recorded:** Cabinet Division declassification release (`pos-hamoodur-declass`) is catalogued.
- **Defamation Risk Assessment:** Low.

### 9. `dos-pk-soe-pakistan-steel-mills-2006` (Pakistan Steel Mills)
- **PII / Identity Check:** No individual private bidding identities disclosed; corporate consortium names are cited directly from PLD 2006 SC 697.
- **Allegation vs. Finding:** Judicial finding regarding CCI constitutional oversight under Articles 153/154 is recorded as binding holding.
- **Official Position Recorded:** Privatization Commission defense statement (`pos-privatization-comm-2006`) is included.
- **Defamation Risk Assessment:** Low.

### 10. `dos-pk-soe-pia-restructuring-crisis` (PIA Crisis)
- **PII / Identity Check:** Names of the 262 commercial pilots whose credentials were questioned in Parliament are strictly withheld.
- **Allegation vs. Finding:** Aviation Minister's statement is classified as a parliamentary speech (`official_position`), not a judicial conviction of individual pilots.
- **Official Position Recorded:** EASA regulatory decision (`pos-easa-suspension`) is included.
- **Defamation Risk Assessment:** Low. Retained `under_review`.

### 11. `dos-pk-energy-ipp-power-sector-contracts` (IPP Contracts)
- **PII / Identity Check:** Restricts all discussion to corporate power generation companies, statutory regulators (NEPRA, CPPA-G), and government committees. No private shareholder data or residential addresses are published.
- **Allegation vs. Finding:** Contractual Take-or-Pay availability fees are defined using exact economic and regulatory terminology, avoiding libelous assertions of fraud where sovereign contracts govern.
- **Official Position Recorded:** IPP Advisory Council defense (`pos-ipp-advisory-council`) regarding sovereign sanctity of contract is catalogued.
- **Defamation Risk Assessment:** Low.

### 12. `dos-pk-legal-asia-bibi-acquittal` (Asia Bibi Acquittal)
- **PII / Identity Check:** Critical protection applied. Village field locations, minor witness identities, and personal addresses of prosecution witnesses and defense counsel have been omitted to prevent endangerment. Only published law report information (PLD 2019 SC 64) is referenced.
- **Allegation vs. Finding:** The prosecution's allegations under Section 295-C PPC are clearly designated as overturned trial claims, while the Supreme Court's unanimous acquittal and Justice Khosa's concurring opinion on perjury are designated as binding holdings.
- **Official Position Recorded:** Defense counsel Saiful Malook's trial arguments (`pos-asia-defense-counsel`) are included.
- **Defamation Risk Assessment:** Low (Strictly follows reported Supreme Court judgment).

---

## 3. Privacy Compliance Verification Checklist

- [x] All CNIC and National Identity numbers are absent from all datasets.
- [x] All personal phone numbers and email addresses are absent from all datasets.
- [x] Private home addresses and residential street numbers are redacted.
- [x] Vulnerable witnesses, minors, and blasphemy case participants are protected.
- [x] Every material accusation is paired with an institutional or defense response.
- [x] Guilt is never imputed without a competent court judgment.
- [x] Defamatory characterizations in economic dossiers (e.g. IPP) have been replaced with precise contractual and regulatory terms.
