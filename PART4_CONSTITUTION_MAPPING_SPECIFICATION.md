# INSAF ARCHIVE (انصاف آرکائیو)
# PART 4: CONSTITUTIONAL MAPPING SPECIFICATION & ALERT SYSTEM
## Epistemological Framework for Linking Archive Records to the Constitution of Pakistan

**Document Identifier**: `IA-SPEC-CONST-MAP-01`  
**Version**: 1.0.0  
**Effective Date**: October 31, 2026  
**Implementation Target**: `src/types/constitution.ts`, `src/utils/constitutionalMapper.ts` & `src/data/constitution/constitutionalMappings.ts`  

---

## 1. Purpose & Epistemological Standards

The **Constitutional Mapping Engine** is the core bridge connecting statutory constitutional guarantees with real-world events, court proceedings, public interest litigation, investigative reporting, and human rights dossiers.

### Core Rule of Legal Neutrality
An archive record linked to an Article of the Constitution **must never be presumed to be a proven violation**. 
- Keyword matching alone must NEVER designate a violation.
- Every mapping requires:
  1. A specific factual nexus.
  2. A verified evidentiary claim citing primary sources.
  3. A defined relationship type reflecting legal reality.
  4. Explicit review status (`suggested`, `under_review`, `approved`, `rejected`).

---

## 2. Mapping Relationship Taxonomy

Mappings are categorized into 9 distinct relationship types:

| Relationship Type | Legal Meaning | Evidentiary Standard Required | Example in Archive |
|---|---|---|---|
| `potential_constitutional_concern` | Factual events raise serious constitutional questions requiring independent legal assessment. | Documented incident report, investigative journalism, or official inquiry citing facts. | Prolonged preventive detention or arbitrary internet blackouts. |
| `constitutional_question` | A novel or unresolved legal question concerning the scope or interpretation of an Article. | Submissions or questions framed before an appellate or constitutional bench. | Scope of Article 63A party voting directions; Presidential powers under Art. 48. |
| `alleged_violation` | A party (petitioner, complainant, or defense) formally alleges a violation of constitutional rights. | Pleadings, writ petition, FIR, or human rights complaint filed in court. | Writ petition alleging Article 19A access-to-information denial. |
| `officially_disputed` | State authorities or opposing respondents explicitly deny or challenge the alleged constitutional violation. | Official written reply, parawise comments, or government press release. | Government counter-affidavit claiming restrictions were lawful under Art. 19 proviso. |
| `court_examined` | An apex or constitutional bench formally heard arguments and reviewed facts under the Article. | Order sheet, bench formation, or admission order under Article 184(3) or 199. | Supreme Court SMC 8/2022 examining jurisdiction over extra-territorial killing. |
| `court_found_violation` | A court of competent jurisdiction definitively declared that an action violated the Article. | Operative court judgment or short order from High Court or Supreme Court. | Supreme Court declaring military trials of civilians violative of Articles 9, 10A, 25 (*Const. Pet. 24/2023*). |
| `court_rejected_violation_claim` | A court examined the constitutional challenge and dismissed it, upholding the constitutionality of the action. | Final judgment dismissing constitutional petition. | Court upholding validity of regulatory tariff determination under economic policy. |
| `constitutional_compliance` | State authorities, legislation, or administrative actions acted in direct accordance with constitutional mandates. | Gazette notification, parliamentary election, or commission formed per constitutional procedure. | Judicial Commission of Pakistan appointment process per Article 175A. |
| `historical_constitutional_context` | A historical event, amendment, or proclamation that shaped or amended the Article. | Historical state document, commission report, or declassified proceedings. | 1971 Hamoodur Rahman Commission report establishing context for 1973 constitutional governance. |

---

## 3. Constitutional Alert & Warning Visual Framework

The interface renders constitutional connections using an unmistakable 4-color status system accompanied by plain-language legal badges:

```
[RED]    🔴 Serious Potential Constitutional Concern (Documented factual scenario demanding legal scrutiny)
[ORANGE] 🟠 Constitutional Concern Under Review (Facts documented, legal assessment in progress)
[BLUE]   🔵 Constitutional Question / Legal Dispute (Active legal proceeding or competing constitutional claims)
[GREEN]  🟢 Court Finding / Judicial Determination (Adjudicated by competent court; includes operative verdict)
```

### Critical Rules for GREEN Indicators:
- A green badge **does not signify approval or innocent compliance**. It signifies **judicial adjudication**.
- It must explicitly specify the sub-outcome:
  - `[GREEN - VIOLATION FOUND]`: The court invalidated the government action.
  - `[GREEN - PETITION DISMISSED]`: The court rejected the violation challenge.
  - `[GREEN - INTERPRETATION ISSUED]`: The court defined legal standards (e.g. *Asia Bibi* on Section 295-C evidence).

---

## 4. `ConstitutionalMappingEntry` Data Model

```typescript
export interface ConstitutionalMappingEntry {
  mappingId: string; // e.g. "PK-CMAP-AS-KILLING-A009"
  archiveRecordId: string; // e.g. "rec-pk-2022-arshad-sharif-killing"
  articleId: string; // e.g. "PK-CONST-A009"
  clauseId?: string; // Optional: specific clause (e.g. "PK-CONST-A010-C01")
  
  relationshipType: ConstitutionalRelationshipType;
  alertLevel: 'red' | 'orange' | 'blue' | 'green';
  
  factualSummary: BilingualText; // Specific factual issue engaging the Article
  legalAnalysis: BilingualText; // Epistemological justification for the connection
  
  courtRulingSummary?: {
    courtName: BilingualText;
    caseCitation: string;
    judgmentDate: string;
    findingOutcome: 'violation_found' | 'claim_rejected' | 'guidelines_issued' | 'pending';
    operativeText: BilingualText;
  };
  
  supportingClaimIds: string[]; // references EvidentiaryClaim.claimId in ArchiveRecord
  supportingSourceIds: string[]; // references SourceCitation.sourceId
  
  applicablePeriod?: {
    startDate?: string;
    endDate?: string;
    historicalEra?: string;
  };
  
  reviewStatus: 'suggested' | 'under_review' | 'approved' | 'rejected';
  reviewedBy?: string;
  reviewedAt?: string;
  editorialNotes?: string;
}
```

---

## 5. Review & Approval Protocol

1. **Automated Suggestion Stage**:
   - The system or contributor identifies potential Article tags based on keywords or subject taxonomy.
   - Initial status: `suggested`. Visual indicator: Dimmed / grey with badge "Automated Suggestion — Awaiting Legal Review".
2. **Fact & Citation Check**:
   - Editorial contributor verifies that claims in the archive record explicitly cite primary evidence (court transcripts, FIRs, official statements).
3. **Legal Review & Classification**:
   - Legal editor assigns `relationshipType` and `alertLevel`.
   - If a court finding is claimed, the exact judgment citation and operative clause must be entered.
4. **Approval & Publication**:
   - Upon sign-off, status transitions to `approved`.
   - The mapping is indexed into the graph adjacency list and becomes visible across both the Article page and the Record detail view.
