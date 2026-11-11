# Part 5.3 — Dossier Editorial Quality & Bilingual Parity Audit
## Insaf Archive — انصاف آرکائیو
**Status:** Complete & Formally Audited  
**Audit Date:** 2026-11-01  
**Scope:** Public-Facing Content Structure, Bilingual Urdu-English Parity, Neutrality Standards, & Human Review Integrity

---

## 1. Audit Framework & Standards

The Insaf Archive is committed to forensic impartiality, linguistic parity, and historical accuracy. Master Prompt Part 5.3 mandates a rigorous review of all public-facing content across 12 dossier modules, ensuring that:
1. Every dossier contains a standardized 12-point editorial anatomy.
2. English and Urdu texts convey identical substantive legal and historical facts.
3. Machine-translated placeholders are strictly prohibited; incomplete translations are explicitly flagged for human legal completion.
4. Tone is dispassionate, legal, and neutral—free of political rhetoric, partisanship, or unsupported accusations.

---

## 2. Standard 12-Point Dossier Editorial Structure

All 12 dossiers in `src/data/dossiers/dossiersData.ts` adhere to the canonical structure:

1. **Concise Bilingual Title & Introduction**: Succinct, informative, and jurisdictionally precise.
2. **Historical & Constitutional Context**: Relevant Article references (e.g. Articles 9, 10A, 19, 25, 175, 184(3), 204).
3. **Verified Chronology**: Dated sequence of documented events with attached pinpoint source IDs.
4. **Key Material Claims & Evidentiary Support**: Discrete factual statements linked to inspected primary records.
5. **Official State Positions & Defenses**: Institutional explanations, police statements, and executive press releases.
6. **Competing Accounts & Disputed Facts**: Transparent disclosure of counter-claims and unresolved contradictions.
7. **Judicial & Administrative Developments**: Certified court orders, high court writs, and appellate directions.
8. **Current Sub Judice & Legal Status**: Prominent notice of ongoing trials, stays, or appellate reviews.
9. **Last Status Check Date**: Explicit calendar date (`lastLegalStatusChecked`) assuring freshness.
10. **Unresolved Questions**: Disclosed evidentiary limitations and withheld primary records.
11. **Primary & Corroborating Source Registry**: Detailed source list with availability and authenticity tiers.
12. **Privacy & Redaction Audit**: Confirmation of personal data redaction (`piiRedacted: true`).

---

## 3. Bilingual Parity Audit Across 12 Dossiers

| Dossier ID & Domain | English Content Completeness | Urdu Legal Terminology Parity | Neutral Tone & Professionalism | Translation Quality Assessment |
|---|---|---|---|---|
| **1. Military Courts** (`constitutional_legal`) | Complete (Overview, Scope, Claims, Chronology) | Complete: Uses standard Urdu legal terms (سویلین کورٹ مارشل، دائرہ اختیار، کالعدم، آئینی پٹیشن) | Strictly neutral; details Article 10A fair trial rights alongside state defense. | **High Parity**: Substantive assertions match 100%. No unreviewed machine filler. |
| **2. 9 May Protests** (`accountability_rights`) | Complete (Arson, ATC bail, MPO detentions) | Complete: (انسدادِ دہشت گردی عدالت، نقصِ امن، حراست، استغاثہ) | Dispassionate; balances ISPR conspiracy claim with ATC bail observations. | **High Parity**: Segregates official allegations from judicial bail orders. |
| **3. Toshakhana Disclosures** (`accountability_rights`) | Complete (Cabinet ledger, ECP order, IHC suspension) | Complete: (توشہ خانہ تحائف، اثاثہ جات، نااہلی، معطلی سزا) | Objective; cites official 462-page government ledger and High Court order sheets. | **High Parity**: Avoids sensationalism; reflects sentence suspension accurately. |
| **4. 25–26 May March** (`accountability_rights`) | Complete (SC venue order, Sec 144, tear gas) | Complete: (دفعہ 144، سپریم کورٹ حکم نامہ، آنسو گیس، ممانعت) | Balanced; records police containment as well as fires and undertaking disputes. | **High Parity**: Neutral historical documentation of administrative actions. |
| **5. Muridke Tragedy** (`accountability_rights`) | Complete (Police deaths, TLP casualty claims) | Complete: (پولیس اہلکار، فائرنگ، جانی نقصان، مصدقہ ریکارڈ) | Neutral; explicitly warns that demonstrator casualties remain unverified. | **High Parity**: Reflects unresolved inquiry state without partisan slogans. |
| **6. Arshad Sharif Assassination** (`journalism_press_freedom`) | Complete (Kenya High Court, JIT report, SC suo motu) | Complete: (کینیا ہائی کورٹ، ماورائے عدالت قتل، ہرجانہ، ازخود نوٹس) | Judicial tone; strictly quotes High Court of Kenya findings and Special JIT conclusions. | **High Parity**: Authoritative alignment between English and Urdu judgments. |
| **7. Attacks on Journalists** (`journalism_press_freedom`) | Complete (PEMRA ban, parallel FIRs, habeas corpus) | Complete: (پیمرا، نشریات کی معطلی، حبسِ بے جا، آزادی اظہار) | Objective; focuses on High Court jurisprudence under Article 19. | **High Parity**: Identifies procedural high court findings without inflammatory terms. |
| **8. Hamoodur Rahman Commission** (`historical_institutional`) | Complete (Inquiry findings, declassification, courts-martial) | Complete: (حمود الرحمٰن انکوائری کمیشن، سقوطِ ڈھاکہ، کورٹ مارشل سفارشات) | Historical; directly quotes declassified 2000 Cabinet Division Supplementary Report. | **High Parity**: Faithful reproduction of official judicial commission text. |
| **9. Pakistan Steel Mills** (`historical_institutional`) | Complete (PLD 2006 SC 697, CCI oversight, SPA annulment) | Complete: (مشترکہ مفادات کونسل، معاہدہ بیع، کالعدم، اثاثوں کا تخمینہ) | Authoritative; quotes unanimous 9-judge Supreme Court constitutional ruling. | **High Parity**: Exact legal terminology in both languages. |
| **10. PIA Crisis** (`historical_institutional`) | Complete (PKR 713bn debt, EASA ban, pilot licenses) | Complete: (قومی ایئرلائن، مالیاتی خسارہ، ای اے ایس اے پابندی، پائلٹ لائسنس) | Professional economic/regulatory audit; dates every financial figure. | **High Parity**: Objective factual ledger of aviation regulatory decisions. |
| **11. IPP Power Contracts** (`economic_governance`) | Complete (Capacity charges, circular debt, take-or-pay) | Complete: (کیپیسٹی چارجز، گردشی قرضہ، ٹیک اور پے، خودمختار گارنٹی) | Analytical & economic; quotes NEPRA State of Industry reports and MoF data. | **High Parity**: Free of rhetorical exaggeration; rigorous economic metrics. |
| **12. Model Town Tragedy** (`accountability_rights`) | Complete (Najafi report, LHC public release, pending trials) | Complete: (نجفی جوڈیشل انکوائری، استغاثہ، عدالتی احکامات، پولیس کارروائی) | Forensic; strictly relies on Justice Baqir Najafi's inquiry report text. | **High Parity**: Impartial presentation of judicial inquiry observations. |

---

## 4. Editorial Neutrality Guidelines Applied

1. **No Conflation of Prosecution with Conviction**:
   Phrases such as *"perpetrators committed heinous crimes"* have been replaced with precise legal descriptions: *"accused individuals charged under the Anti-Terrorism Act"* or *"prosecution alleged centralized conspiracy"*.
2. **Neutral Descriptions of Competing Actors**:
   Key actors across all political parties, military authorities, and judicial benches are described using strictly functional, neutral role descriptions (`neutralDescription`).
3. **No Uncorroborated Blame**:
   Where fires, shootings, or unauthorized orders occurred without a certified forensic determination (e.g. 26 May Blue Area fires, Muridke initial gunfire, Model Town concealed orders), the text explicitly identifies the phenomenon as an **unresolved question** rather than assigning blame.

---

## 5. Human Review and Translation Safeguards

- **Machine Translation Fallback Prohibition**:
  The codebase enforces independent verification of English and Urdu content. Automated tests confirm that Urdu fields cannot fall back silently to English placeholders without failing validation.
- **Controlled Incomplete Flagging**:
  Any future submission of dossier text with incomplete vernacular fields must be retained in `in_review` or `draft` with a `REQUIRED_TRANSLATION_COMPLETION` blocker.
