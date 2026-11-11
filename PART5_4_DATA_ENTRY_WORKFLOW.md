# Part 5.4 — Editorial Data Entry & Curation Workflow
## Insaf Archive — انصاف آرکائیو
**Status:** Approved Standard Operating Procedure  
**Effective Date:** 2026-11-01  
**Scope:** Step-by-Step Editorial Procedure for Authoring, Verifying, and Submitting Archival Records

---

## 1. Overview of the Curation Workflow

The Insaf Archive editorial workflow is structured around the principle that **evidence precedes narrative**. Editors and contributors must verify the existence and content of primary documents before drafting factual claims or dossier summaries.

```
   [Phase 1: Source Discovery] ───► [Phase 2: Source Registration]
                 │                                  │
                 ▼                                  ▼
   [Phase 3: Material Claims]  ───► [Phase 4: Dossier Synthesis]
                 │                                  │
                 ▼                                  ▼
   [Phase 5: Media / Documents] ──► [Phase 6: Local Validation & PR]
```

---

## 2. Phase-by-Phase Step-by-Step Procedure

### Phase 1 & 2: Primary Source Verification & Registration
1. **Identify Primary Records:** Obtain certified court orders, official gazette notifications, declassified commission reports, or statutory audit statements.
2. **Access the Source Editor:** In the Admin Editorial Studio, navigate to the **Sources** tab.
3. **Register Identifiers & Metadata:**
   - Click *Auto-Generate* to generate a stable, collision-safe ID (e.g. `src-sc-mil-courts-2023-order`).
   - Enter the official title in English and Urdu.
   - Enter the publisher or issuing sovereign authority (e.g. `Supreme Court of Pakistan`).
   - Select the controlled instrument type (`court_order`, `court_judgment`, `police_fir`, etc.).
4. **Record Provenance & Permanent Links:**
   - Enter the institutional URL if online. *Never invent or guess URLs.*
   - If available, enter a permanent web archive snapshot (Archive.org or Perma.cc).
   - If referencing an internal/local file, enter the relative path (e.g. `docs/judgments/order.pdf`). The Studio will automatically display a **Privacy Caution** reminder.
5. **Classify Availability & Authenticity:**
   - Set `sourceAvailability` (`accessible`, `archived_copy_available`, `unavailable`, `broken_link`, `not_checked`).
   - Set `authenticityStatus` (`official_document`, `publisher_verified`, `corroborated`, `unverified`, `disputed`).
   - *Rule:* Never mark an uninspected (`not_checked`) source as `official_document`.
6. **Save Draft:** Click *Save Source*. The item is logged into the local Review Queue.

---

### Phase 3: Drafting Material Factual Claims
1. **Navigate to the Claims Tab:** Open the **Claims** module in the Studio.
2. **Assign Parent Dossier:** Select the associated dossier from the searchable dropdown.
3. **Draft Bilingual Proposition:**
   - Enter the exact factual proposition in English (LTR).
   - Enter the substantive translation in Urdu (RTL).
4. **Assign Controlled Classification:**
   - Select the exact classification: `judicial_finding`, `commission_finding`, `official_position`, `documented_fact`, `reported_allegation`, `contested_claim`, `editorial_analysis`, or `unresolved_question`.
   - *Epistemological Guard:* Do not classify an allegation or official press release as a judicial finding.
5. **Link Verified Sources:**
   - Select one or more supporting source IDs registered in Phase 2.
   - If counter-evidence or official denials exist, select the qualifying source IDs under *Contradictory / Qualifying Sources*.
6. **Define Evidentiary Bounds:**
   - In *What the Evidence Establishes*, describe the verified factual finding.
   - In *What the Evidence Does NOT Establish*, describe the limitations (e.g. "Does not establish individual criminal liability").
7. **Save Draft:** Click *Save Claim*.

---

### Phase 4: Dossier Synthesis & Governance Metadata
1. **Navigate to the Dossiers Tab:** Select **Dossiers**.
2. **Select Mode:** Choose an existing dossier to update in-place, or select *-- Create New Dossier --*.
3. **Author Overview & Scope:**
   - Provide an objective, dispassionate summary in English and Urdu.
   - Select the primary domain (`constitutional_legal`, `major_public_events`, etc.).
4. **Assess Legal Proceeding Status:**
   - Choose the controlled state: `concluded`, `ongoing`, `pending_appeal`, `stayed`, `under_investigation`, `unresolved`, or `unknown`.
   - If the proceeding is not concluded, the Studio mandates entering a **Pending Proceedings Notice** in English and Urdu.
5. **Check Court Reporting Bans:**
   - If an active court injunction or gag order exists, toggle *Active Court Reporting Ban*. The Studio will enforce a hard block on publishing.
6. **Log Docket Freshness:** Enter the date court records were last checked (`lastLegalStatusChecked`).
7. **Complete Privacy Review:**
   - Confirm whether sensitive personal data is present.
   - Certify that personal identification numbers (CNIC), private addresses, and bystander identities are redacted (`piiRedacted: true`).
8. **Save Draft:** Click *Save Draft*.

---

### Phase 5: Attaching Media & Document Records
1. **Navigate to Media / Documents Tab:**
2. **Enter Document Metadata:** Provide title, document category, platform/publisher, and original/archived URLs.
3. **Link Relationships:** Associate the media item with its parent dossier and specific claim IDs.
4. **Review Privacy & Rights:** Ensure fair use/public interest copyright terms and confirm that raw files containing unredacted PII are not marked for public export.
5. **Save Draft:** Click *Save Media*.

---

### Phase 6: Local Queue Audit & Export
1. **Navigate to Review Queue:**
   - Inspect all queued proposals.
   - Review validation error badges. Any item with errors must be edited and corrected.
2. **Navigate to Export & GitHub PR:**
   - Inspect the compiled change bundle.
   - Click *Download .json File* to save the payload locally.
   - Click *Copy Issue Text* or *Copy PR Checklist* to prepare the GitHub pull request submission.
