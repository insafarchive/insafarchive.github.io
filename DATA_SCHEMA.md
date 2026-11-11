# INSAF ARCHIVE (انصاف آرکائیو)
## Canonical Data Schema Specification
**Schema Version:** `1.0.0`  
**Status:** Canonical Production Standard  
**Last Updated:** 2026-10-04

---

## 1. Schema Design Philosophy

The INSAF ARCHIVE data model is grounded in three non-negotiable principles:

1. **Epistemological Integrity (Claim vs. Fact vs. Finding)**: Allegations, court orders, and investigative findings are never conflated. Every assertion carries an explicit evidentiary finding type and mandatory source references.
2. **First-Class Bilingualism**: Native LTR/RTL bilingual structures (`BilingualText`) for titles, summaries, narratives, categories, locations, and source metadata.
3. **Graph-Relational Interconnectivity**: Universal multi-predicate relationships with reversible traversal semantics.

---

## 2. Core Entity Definitions

### 2.1 Master `ArchiveRecord`
```typescript
export interface ArchiveRecord {
  // Schema Identity & Versioning
  schemaVersion: '1.0.0';
  id: string; // Stable identifier (e.g., "rec-pk-2022-arshad-sharif-killing" or "IA-AR-000101")
  slug: string;
  domain: ArchiveDomain;
  recordType: RecordType;
  
  // Bilingual Content Core
  title: BilingualText;
  summary: BilingualText;
  narrative: BilingualText; // Markdown formatted
  
  // Temporal & Spatial Anchor
  date: ArchiveDate;
  endDate?: ArchiveDate;
  dates?: RecordDates;
  location?: ArchiveLocation;
  
  // Evidentiary Matrix & Provenance
  claims: EvidentiaryClaim[];
  sources: SourceCitation[];
  evidenceMedia: EvidenceMediaItem[];
  relationships: RecordRelationship[];
  
  // Taxonomy & Metadata
  categories: string[];
  tags: {
    en: string[];
    ur: string[];
  };
  domainMetadata?: DomainMetadata;
  
  // Governance, Verification & Privacy
  verificationStatus: VerificationStatus;
  editorialStatus: EditorialStatus;
  privacyClassification: PrivacyClassification;
  privacyFlags: PrivacyFlags;
  
  // Audit Trail & Version Control
  version: number;
  previousVersionId?: string;
  createdAt: string; // ISO 8601
  updatedAt: string; // ISO 8601
  publishedAt?: string;
  lastReviewedAt?: string;
  reviewedBy?: string;
  editorialNotes?: string;
}
```

---

### 2.2 Evidentiary Claim (`EvidentiaryClaim`)
```typescript
export interface EvidentiaryClaim {
  claimId: string; // Stable identifier (e.g., "clm-as-001")
  findingType: EvidentiaryFindingType;
  assertion: BilingualText;
  attributedParty?: BilingualText; // Person, Institution, or Source making assertion
  date?: ArchiveDate;
  sourceIds: string[]; // References to SourceCitation.sourceId (Strictly mandatory)
  corroboratingSourceIds?: string[];
  disputingClaimIds?: string[];
  editorialAssessment?: BilingualText;
}
```

---

### 2.3 Source Citation (`SourceCitation`)
```typescript
export interface SourceCitation {
  sourceId: string; // Stable identifier (e.g., "src-sc-2022-pld-101")
  sourceType: SourceType;
  title: BilingualText;
  publisher?: BilingualText;
  authorOrCreator?: BilingualText;
  publicationDate?: ArchiveDate;
  originalUrl?: string; // Optional - Physical files supported without fake URLs
  archiveUrl?: string; // Wayback / Perma.cc snapshot
  documentIdentifier?: string; // e.g. "PLD 2019 SC 64", "FIR 492/2022"
  pageOrParagraph?: string;
  mediaTimestamp?: string;
  language: 'en' | 'ur' | 'both' | 'other';
  verificationStatus: SourceVerificationStatus;
  verificationTier?: 'primary_verified' | 'secondary_corroborated' | 'single_source' | 'unverified';
  accessDate?: string;
  copyrightNotice?: string;
  notes?: BilingualText;
}
```

---

### 2.4 Relational Link (`RecordRelationship`)
```typescript
export interface RecordRelationship {
  relationshipId: string;
  targetRecordId: string;
  predicate: RelationshipPredicate;
  description?: BilingualText;
  weight?: number;
}
```

---

## 3. Epistemological Classification Taxonomy

| Finding Type | Editorial Definition | Evidentiary Standard |
| :--- | :--- | :--- |
| `documented_fact` | Corroborated official record or undisputed physical fact | Minimum 2 independent primary records |
| `primary_source_record` | Direct text from gazette, statute, or contract | Certified copy or official gazette |
| `court_finding` | Finding established in an operative judicial decree | Trial or High Court final decree |
| `appellate_court_finding` | Superior appellate bench ruling (Supreme Court) | Supreme Court / High Court appellate bench |
| `audit_finding` | Finding of the Auditor General of Pakistan | Official AGP / Forensic audit report |
| `commission_finding` | Inquiry commission fact-finding result | Declassified or officially released report |
| `police_finding` | Conclusion from police investigation / JIT report | Formal police chalan or JIT dossier |
| `official_position` | Government / departmental communiqué | Official spokesperson or press release |
| `claim` | Assertion made without conclusive resolution | Attributed statement |
| `allegation` | Contested accusation in a complaint or FIR | Requires judicial / investigative proof |
| `counter_claim` | Formal response by the opposing party | Rebuttal statement |
| `denial` | Formal rejection of an accusation | Formal denial communiqué |
| `investigative_finding` | Finding uncovered by investigative journalism | Documented investigative media report |
| `academic_research_finding` | Peer-reviewed study or macroeconomic model | Published academic/think-tank study |
| `editorial_note` | Synthesis by Insaf Archive editors | Clarification of context |
| `unresolved_question` | Documented evidentiary contradiction | Open investigative inquiry |

---

## 4. Relationship Predicate Ontology

| Predicate | Inverted Predicate | Semantic Meaning |
| :--- | :--- | :--- |
| `relatedTo` | `relatedTo` | General non-directional relation |
| `causedBy` | `resultedIn` | Causal dependency |
| `followedBy` | `precededBy` | Chronological succession |
| `precededBy` | `followedBy` | Chronological antecedence |
| `partOf` | `encompasses` | Sub-component of larger dossier/event |
| `involvesPerson` | `subjectOf` | Links event/case to individual profile |
| `involvesInstitution`| `subjectOf` | Links event/case to institutional profile |
| `documentedBy` | `sourceFor` | Primary documentary source for record |
| `investigatedBy` | `investigatedRecord`| Formal investigation into event |
| `challengedBy` | `respondedTo` | Legal/public challenge against decision |
| `contradicts` | `contradicts` | Competing findings / accounts |
| `confirms` | `confirms` | Corroborating findings |
| `cites` | `citedBy` | Citation in court decree or report |
| `supersedes` | `supersededBy` | Overruling judgment or amendment |

---

## 5. Non-Fabrication Rules & Quality Constraints

1. **Mandatory Citation Rule**: Every `EvidentiaryClaim` MUST contain at least one valid `sourceId` pointing to an existing `SourceCitation` in the same record.
2. **Stable ID Rule**: Record IDs must be lowercase alphanumeric with hyphens (e.g. `rec-pk-2022-arshad-sharif-killing` or `IA-AR-000101`).
3. **Bilingual Parity Rule**: English and Urdu titles and summaries are mandatory for all public records.
4. **Publication Filter Rule**: Only records with `editorialStatus === 'published'` and `privacyClassification === 'public' | 'public_sensitive'` can be exposed in public views or exports.
