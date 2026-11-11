# INSAF ARCHIVE (انصاف آرکائیو)
# PART 4: CONSTITUTIONAL DATA DICTIONARY & SCHEMA SPECIFICATION
## Data Models for the 1973 Constitution of the Islamic Republic of Pakistan

**Document Identifier**: `IA-SPEC-CONST-DATA-01`  
**Version**: 1.0.0  
**Effective Date**: October 31, 2026  
**Implementation Target**: `src/types/constitution.ts` & `src/data/constitution/*`  

---

## 1. Structural Overview & Hierarchy

The Constitution data architecture follows a strict relational hierarchy:

```
ConstitutionalMetadata
  └── ConstitutionalPart (Parts I through XII)
        └── ConstitutionalChapter (Optional, within Parts)
              └── ConstitutionalArticle (Articles 1 through 280)
                    ├── ConstitutionalClause (Clauses 1, 2, 3...)
                    │     └── ConstitutionalSubClause ((a), (b), (c)...)
                    │           └── ConstitutionalExplanation / Proviso
                    ├── AmendmentRecord (Historical modifications)
                    └── LandmarkPrecedentRef (Supreme Court rulings)
  └── ConstitutionalSchedule (Schedules 1 through 5)
```

---

## 2. Naming Conventions & Stable Identifiers

All IDs are permanent, globally unique, human-readable strings that never mutate even if headings or text change.

| Entity | ID Format | Example | Description |
|---|---|---|---|
| Preamble | `PK-CONST-PRE` | `PK-CONST-PRE` | Preamble / Objectives Resolution |
| Part | `PK-CONST-P<Roman/Num>` | `PK-CONST-P01`, `PK-CONST-P02` | Part I (Introductory), Part II (Fundamental Rights) |
| Chapter | `PK-CONST-P<Num>-CH<Num>` | `PK-CONST-P02-CH01` | Part II, Chapter 1 (Fundamental Rights) |
| Article | `PK-CONST-A<Number>` | `PK-CONST-A009`, `PK-CONST-A010A`, `PK-CONST-A184` | Article 9 (Security of person), 10A (Fair trial) |
| Clause | `PK-CONST-A<Number>-C<Number>` | `PK-CONST-A010-C01`, `PK-CONST-A184-C03` | Article 10, Clause (1); Article 184, Clause (3) |
| Sub-clause | `PK-CONST-A<Number>-C<Num>-SC<Letter>` | `PK-CONST-A010-C01-SC-A` | Clause 1, Sub-clause (a) |
| Schedule | `PK-CONST-SCH-<Number>` | `PK-CONST-SCH-01`, `PK-CONST-SCH-04` | First Schedule, Fourth Schedule (Federal Legislative List) |
| Amendment | `PK-CONST-AMD-<Number>` | `PK-CONST-AMD-18`, `PK-CONST-AMD-26` | 18th Amendment Act 2010, 26th Amendment Act 2024 |
| Mapping | `PK-CMAP-<RecordID>-<ArticleID>` | `PK-CMAP-AS-KILLING-A009` | Link between Arshad Sharif Killing and Article 9 |

---

## 3. Entity Data Models (TypeScript Interface Definitions)

### 3.1 `ConstitutionalArticle`
Represents an individual constitutional Article.

| Field Name | Type | Required | Description |
|---|---|---|---|
| `id` | `string` | **Yes** | Permanent identifier (e.g. `PK-CONST-A009`). |
| `articleNumber` | `string` | **Yes** | Canonical number string (e.g. `"9"`, `"10A"`, `"19A"`, `"270AAA"`). |
| `partId` | `string` | **Yes** | Reference to parent `ConstitutionalPart.id` (e.g. `PK-CONST-P02`). |
| `chapterId` | `string` | No | Reference to parent `ConstitutionalChapter.id` (e.g. `PK-CONST-P02-CH01`). |
| `title` | `BilingualText` | **Yes** | Official heading in English and Urdu. |
| `originalStatutoryEnglish` | `string` | **Yes** | Exact text of the Article as currently consolidated. |
| `urduText` | `string` | **Yes** | Statutory or editorially translated Urdu text. |
| `urduStatus` | `'official_verified' \| 'editorial_translation'` | **Yes** | Designates if Urdu text is Gazette-verified or editorial. |
| `clauses` | `ConstitutionalClause[]` | **Yes** | Array of structured clauses. If no clauses, array contains 1 body clause. |
| `provisos` | `BilingualText[]` | No | Provisos, exceptions, or qualifications attached directly to the Article. |
| `explanations` | `BilingualText[]` | No | Statutory explanations appended to the Article. |
| `amendmentHistory` | `ArticleAmendmentRecord[]` | **Yes** | Chronological record of amendments modifying this Article. |
| `easyExplanation` | `BilingualText` | **Yes** | Educational plain-language summary for non-lawyers. |
| `landmarkPrecedents` | `LandmarkPrecedentRef[]` | **Yes** | Apex court judgments defining or interpreting the provision. |
| `relatedArticleIds` | `string[]` | **Yes** | Cross-references to other constitutional articles (e.g. Art 9 -> Art 10A, 14, 25). |
| `sourceCitationId` | `string` | **Yes** | Reference to source register identifier. |
| `status` | `'active' \| 'repealed' \| 'omitted' \| 'substituted'` | **Yes** | Current legal state of the provision. |
| `historicalWording` | `HistoricalArticleVersion[]` | No | Text before specific amendments. |
| `editorialNotes` | `string` | No | Internal scholarly or legal notes. |
| `lastReviewedAt` | `string` | **Yes** | ISO-8601 date of last legal verification. |

### 3.2 `ConstitutionalClause`
Represents an individual clause within an Article.

| Field Name | Type | Required | Description |
|---|---|---|---|
| `id` | `string` | **Yes** | Permanent identifier (e.g. `PK-CONST-A010A-C01`). |
| `articleId` | `string` | **Yes** | Parent Article identifier. |
| `clauseNumber` | `string` | **Yes** | Clause number (e.g. `"(1)"`, `"(2)"`). |
| `text` | `BilingualText` | **Yes** | Exact statutory text of this clause. |
| `subClauses` | `ConstitutionalSubClause[]` | No | Sub-clauses (e.g. (a), (b), (c)). |
| `provisos` | `BilingualText[]` | No | Specific proviso applicable to this clause. |

### 3.3 `ConstitutionalPart`
Represents one of the 12 Parts of the Constitution.

| Field Name | Type | Required | Description |
|---|---|---|---|
| `id` | `string` | **Yes** | Permanent identifier (e.g. `PK-CONST-P01`). |
| `partNumber` | `string` | **Yes** | Roman numeral (e.g. `"I"`, `"II"`, `"VII"`). |
| `title` | `BilingualText` | **Yes** | Official title in English and Urdu. |
| `articleRange` | `{ start: string; end: string }` | **Yes** | Article span (e.g. `{ start: "8", end: "28" }`). |
| `description` | `BilingualText` | **Yes** | Overview summary of scope and legal significance. |
| `chapters` | `ConstitutionalChapter[]` | No | Child chapters if the Part is divided into chapters. |

### 3.4 `ConstitutionalSchedule`
Represents one of the 5 Schedules.

| Field Name | Type | Required | Description |
|---|---|---|---|
| `id` | `string` | **Yes** | Permanent identifier (e.g. `PK-CONST-SCH-01`). |
| `scheduleNumber` | `string` | **Yes** | `"First"`, `"Second"`, `"Third"`, `"Fourth"`, `"Fifth"`. |
| `title` | `BilingualText` | **Yes** | Official title (e.g. Oaths of Office, Legislative Lists). |
| `governingArticles` | `string[]` | **Yes** | Articles citing this schedule (e.g. Art. 42, 91 for Third Schedule). |
| `summary` | `BilingualText` | **Yes** | Summary of statutory purpose. |

### 3.5 `ConstitutionalAmendment`
Represents one of the 26 enacted Constitutional Amendments.

| Field Name | Type | Required | Description |
|---|---|---|---|
| `id` | `string` | **Yes** | Permanent identifier (e.g. `PK-CONST-AMD-18`). |
| `number` | `number` | **Yes** | 1 through 26. |
| `title` | `BilingualText` | **Yes** | Official title (e.g. "The Constitution (Eighteenth Amendment) Act, 2010"). |
| `actNumber` | `string` | **Yes** | Parliamentary Act number (e.g. "Act X of 2010"). |
| `assentDate` | `string` | **Yes** | ISO-8601 date of Presidential assent. |
| `commencementDate` | `string` | **Yes** | ISO-8601 date of commencement / gazette publication. |
| `summary` | `BilingualText` | **Yes** | Concise summary of major reforms introduced. |
| `amendedArticleIds` | `string[]` | **Yes** | IDs of all Articles altered by this amendment. |
| `sourceId` | `string` | **Yes** | Source Register identifier. |

---

## 4. Separation of Statutory Text from Educational Explanation

To prevent confusion between legal statutes and commentary:
1. **`originalStatutoryEnglish`**: The exact verbatim legal text from the official Gazette. No simplifications, modernizations, or subjective edits.
2. **`easyExplanation`**: An educational summary in plain Urdu and English, explicitly presented in the UI under an **"Educational Explanation / تعلیمی وضاحت"** container marked with an information badge:
   > *Note: This explanation is provided solely for public civic understanding and educational purposes. It does not constitute statutory text or formal legal advice.*
3. **`landmarkPrecedents`**: Primary judicial citations linking to the exact case law where the Supreme Court interpreted the provision.
