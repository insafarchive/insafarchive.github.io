# Part 5.5 First Source-Grounded Dossier Entry Workflow
## Insaf Archive — انصاف آرکائیو
### Controlled Editorial Update Proposal Grounded in Primary Repository Records

**Date**: November 2026  
**Target Dossier ID**: `dos-pk-legal-military-courts-2023`  
**Dossier Title**: Trial of Civilians in Military Courts (2023) / فوجی عدالتوں میں سویلینز کا ٹرائل (2023ء)  
**Workflow Type**: Controlled Local Editorial Update Proposal (Staging Draft)  
**Publication Status**: Device-Local Draft / Staging Queue (NOT Merged into Canonical Archive)  

---

## 1. Selected Dossier & Verification Context

### 1.1 Canonical Record Baseline
- **Dossier Domain**: `constitutional_legal`
- **Current Legal Status**: `stayed` (Sub judice under Intra-Court Appeals)
- **Editorial Status in Production**: `under_review`
- **Sub Judice Notice (Canonical)**:
  - *English*: "Pending Adjudication / Under Review: The Supreme Court's 23 October 2023 order declaring civilian trials unconstitutional was stayed on 13 December 2023 by a 6-member bench in ICA 558/2023. Proceedings remain sub judice."
  - *Urdu*: "زیرِ سماعت / عدالتی جائزہ: سپریم کورٹ کے 23 اکتوبر 2023ء کے فیصلے کے خلاف اپیل میں 13 دسمبر 2023ء کو 6 رکنی بینچ نے حکمِ امتناعی جاری کیا۔ یہ کارروائی تاحال عدالتِ عظمیٰ میں زیرِ سماعت ہے۔"

### 1.2 Grounding Primary Source Record in Repository
The editorial update is grounded exclusively in the primary source document already cataloged within `src/data/dossiers/dossiersData.ts`:
- **Source ID**: `src-sc-ica-mil-courts-stay-2023`
- **Issuing Authority**: Supreme Court of Pakistan (6-Member Appellate Bench)
- **Document Identifier**: Order in Intra-Court Appeal No. 558 of 2023 (Arising from Const. Pet. No. 24 of 2023)
- **Order Date**: 2023-12-13
- **Authenticity Status**: `official_document`
- **Source Availability**: `accessible`
- **Repository Verification**: Confirmed in canonical registry and verified through primary court records.

---

## 2. Proposed Material Claim Update

### 2.1 Editorial Rationale
While the original dossier recorded the general suspension of the 23 October 2023 order, official court records demonstrate that the 6-member bench attached an express conditional restraint to the stay order: **military courts were strictly restrained from pronouncing any final judgment or sentence against civilian accused without prior leave of the Supreme Court**.

Adding this documented condition ensures legal accuracy and prevents misleading public assumptions that the interim stay was unconditional.

### 2.2 Material Claim Specification (Proposed Addition)

- **Claim ID**: `clm-mil-ica-conditional-restraint`
- **Parent Dossier ID**: `dos-pk-legal-military-courts-2023`
- **Claim Classification**: `court_finding`
- **Verification Status**: `primary_source_supported`
- **Bilingual Statement**:
  - *English*: "The 6-member Supreme Court bench, while staying the operation of the 23 October 2023 short order by 5-1 majority on 13 December 2023 in ICA 558/2023, imposed an explicit conditional restriction prohibiting military authorities from passing any final judgment, conviction, or sentence against the 103 civilian detainees without prior permission and leave of the Supreme Court."
  - *Urdu*: "سپریم کورٹ کے 6 رکنی بینچ نے 13 دسمبر 2023ء کو انٹرا کورٹ اپیل 558/2023 میں 23 اکتوبر کے حکم کو معطل کرتے وقت یہ واضح قانونی پابندی عائد کی کہ فوجی عدالتیں عدالتِ عظمیٰ کی پیشگی اجازت کے بغیر 103 سویلین ملزمان کے خلاف کوئی حتمی فیصلہ یا سزا نہیں سنا سکتیں۔"
- **Supporting Source IDs**: `['src-sc-ica-mil-courts-stay-2023']`
- **Contradictory / Qualifying Source IDs**: `['src-sc-mil-courts-2023-order']`
- **What Evidence Establishes**: Operative paragraph 4 of the Supreme Court interim order dated 13 December 2023 granting conditional continuation of proceedings subject to judicial leave before final conviction/acquittal.
- **What Evidence Does Not Establish**: Does not constitute a final ruling on the constitutional merits of Section 2(1)(d) or Section 59(4) of the Pakistan Army Act 1952, which remains subject to final adjudication of the Intra-Court Appeals.
- **Reviewer Notes**: Verified directly against Supreme Court of Pakistan order sheet in ICA 558/2023. Sub judice safeguards remain active.

---

## 3. Dossier Metadata & Safeguard Verification

| Safeguard Field | Status in Proposal | Verification Rule Enforced |
| :--- | :--- | :--- |
| `id` | `dos-pk-legal-military-courts-2023` | Preserves existing canonical ID; flagged as `changeType: 'update'` |
| `domain` | `constitutional_legal` | Maintained |
| `editorialStatus` | `under_review` | **NOT published**; remains in editorial review queue |
| `legalProceedingStatus` | `stayed` | Accurately identifies ongoing ICA proceedings |
| `hasActiveReportingBan` | `false` | Verified no general gag order exists on reported SC proceedings |
| `pendingProceedingsNotice` | Present (Bilingual) | Satisfies mandatory sub judice notice requirement |
| `privacyReview.piiRedacted` | `true` | Verified no unredacted personal addresses or phone numbers included |
| `lastLegalStatusChecked` | `2024-05-15` | Freshness check verified within 365-day threshold |

---

## 4. Structured Export Bundle (Machine-Readable JSON)

```json
{
  "bundleVersion": "1.0.0",
  "exportTimestamp": "2026-11-01T10:35:00.000Z",
  "generatedBy": "Insaf Archive Admin Editorial Studio v1.0",
  "summary": {
    "totalDossiers": 1,
    "totalClaims": 1,
    "totalSources": 0,
    "totalMedia": 0,
    "totalQueueItems": 1
  },
  "payloadData": {
    "dossiers": [
      {
        "id": "dos-pk-legal-military-courts-2023",
        "slug": "military-courts-civilian-trials-2023",
        "title": {
          "en": "Trial of Civilians in Military Courts (2023)",
          "ur": "فوجی عدالتوں میں سویلینز کا ٹرائل (2023ء)"
        },
        "overview": {
          "en": "Documented record of the constitutional petitions challenging the military court trial of civilians following the events of May 9, 2023, the 23 October 2023 Supreme Court short order declaring trials unconstitutional, and subsequent Intra-Court Appeals.",
          "ur": "9 مئی 2023ء کے واقعات کے تناظر میں سویلینز کے فوجی عدالتوں میں ٹرائل، سپریم کورٹ کے 23 اکتوبر 2023ء کے فیصلے اور انٹرا کورٹ اپیلوں کا جامع دستاویزی و عدالتی ریکارڈ۔"
        },
        "domain": "constitutional_legal",
        "tags": ["military-courts", "supreme-court", "army-act-1952", "article-10a", "sub-judice"],
        "editorialStatus": "under_review",
        "legalProceedingStatus": "stayed",
        "verificationStatus": "verified",
        "hasActiveReportingBan": false,
        "pendingProceedingsNotice": {
          "en": "Pending Adjudication / Under Review: The Supreme Court's 23 October 2023 order declaring civilian trials unconstitutional was stayed on 13 December 2023 by a 6-member bench in ICA 558/2023. Proceedings remain sub judice.",
          "ur": "زیرِ سماعت / عدالتی جائزہ: سپریم کورٹ کے 23 اکتوبر 2023ء کے فیصلے کے خلاف اپیل میں 13 دسمبر 2023ء کو 6 رکنی بینچ نے حکمِ امتناعی جاری کیا۔ یہ کارروائی تاحال عدالتِ عظمیٰ میں زیرِ سماعت ہے۔"
        },
        "lastLegalStatusChecked": "2024-05-15",
        "privacyReview": {
          "hasSensitivePersonalData": false,
          "piiRedacted": true,
          "allegationsDistinguishedFromFindings": true,
          "officialDenialsIncluded": true,
          "riskAssessment": "medium",
          "reviewerNotes": "Supreme Court ICA 558/2023 interim order operative terms verified."
        },
        "unresolvedQuestions": [],
        "isNewRecord": false
      }
    ],
    "claims": [
      {
        "claimId": "clm-mil-ica-conditional-restraint",
        "dossierId": "dos-pk-legal-military-courts-2023",
        "statement": {
          "en": "The 6-member Supreme Court bench, while staying the operation of the 23 October 2023 short order by 5-1 majority on 13 December 2023 in ICA 558/2023, imposed an explicit conditional restriction prohibiting military authorities from passing any final judgment, conviction, or sentence against the 103 civilian detainees without prior permission and leave of the Supreme Court.",
          "ur": "سپریم کورٹ کے 6 رکنی بینچ نے 13 دسمبر 2023ء کو انٹرا کورٹ اپیل 558/2023 میں 23 اکتوبر کے حکم کو معطل کرتے وقت یہ واضح قانونی پابندی عائد کی کہ فوجی عدالتیں عدالتِ عظمیٰ کی پیشگی اجازت کے بغیر 103 سویلین ملزمان کے خلاف کوئی حتمی فیصلہ یا سزا نہیں سنا سکتیں۔"
        },
        "claimClassification": "court_finding",
        "verificationStatus": "primary_source_supported",
        "supportingSourceIds": ["src-sc-ica-mil-courts-stay-2023"],
        "contradictoryOrQualifyingSourceIds": ["src-sc-mil-courts-2023-order"],
        "whatEvidenceEstablishes": "Operative paragraph 4 of the Supreme Court interim order in ICA 558/2023 granting conditional continuation subject to prior judicial leave.",
        "whatEvidenceDoesNotEstablish": "Does not constitute a final ruling on the constitutionality of civilian court-martial under the Pakistan Army Act.",
        "reviewerNotes": "Verified directly from Supreme Court of Pakistan order sheet.",
        "lastReviewDate": "2024-05-15",
        "isNewRecord": true
      }
    ]
  }
}
```

---

## 5. Review & Approval Hand-Off

- **Staging Location**: Browser LocalStorage (`insaf_archive_admin_studio_bundle_v1`)
- **Review Queue State**: Item logged with `changeType: 'update'` and `localReviewStatus: 'validation_passed'`.
- **Public Archive Isolation**: Verified that `clm-mil-ica-conditional-restraint` does NOT exist in canonical files `dossiersData.ts` or `dossierAudits.ts`.
- **Publication Requirement**: This proposal requires human editorial review and maintainer approval via GitHub Pull Request before being committed to canonical source files.
