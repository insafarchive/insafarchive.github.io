# Insaf Archive — Part 5.2: Correction & Withdrawal Policy

## 1. Principles of Archival Integrity & Transparency

As a public-interest historical and legal archive, Insaf Archive adheres to three fundamental integrity rules:
1. **No Silent Corrections**: When a factual assertion, citation, or date is corrected, the modification is recorded openly in the dossier audit trail and Git commit history.
2. **Traceable Reversibility**: Any decision to withdraw, suspend, or republish a dossier must reference the exact triggering event (e.g. appellate stay order, judicial inquiry findings, or privacy complaint).
3. **Evidence-Based Amendments**: Changes to established records require primary supporting documentation—mere press conjecture or political rhetoric cannot trigger archival revisions.

---

## 2. Standard Correction Workflows

### 2.1 Correcting Factual Errors (Dates, Quotations, Attributions)
- **Trigger**: Discovery of a typographical discrepancy, inaccurate date, misattributed statement, or misquoted statutory provision.
- **Procedure**:
  1. File a GitHub Issue using the `Factual Correction Request` template.
  2. Provide the exact contradictory primary source (e.g. National Assembly official debate transcript or certified court order).
  3. Submit a Pull Request modifying the data in `src/data/dossiers/dossiersData.ts` and updating the claim audit in `src/data/dossiers/dossierAudits.ts`.
  4. Append an entry to `auditTrail` with `action: 'request_revision'` or `action: 'approve'`, recording the previous erroneous text, corrected text, and primary source citation.

### 2.2 Updating Legal Status (Stays, Appeals, Reversals)
- **Trigger**: A lower court judgment cited in the archive is stayed by a High Court or Supreme Court bench, or an appeal results in acquittal/remand.
- **Procedure**:
  1. Immediately update `legalUpdateSensitivity` to reflect the active appeal (`high_pending_appeal` or `moderate_pending_investigation`).
  2. Record the exact date in `lastLegalStatusChecked`.
  3. Update `whatSourceDoesNotEstablish` to explicitly document that the lower court finding is suspended and lacks final legal effect.
  4. If the dossier was published, assess whether publication safeguards remain satisfied. If the core contention is rendered misleading by the stay, transition the dossier from `published` to `withdrawn` or `under_review`.

### 2.3 Incorporating Official State Responses or Rebuttals
- **Trigger**: Issuance of a formal rebuttal, press conference transcript, or institutional rejoinder by an affected statutory body (e.g. ISPR, ECP, PEMRA, or Ministry of Law).
- **Procedure**:
  1. Ingest the response into the dossier's `sources` list as an official institutional document.
  2. Update the `officialPosition` object in `dossiersData.ts` to reflect the current stance.
  3. Re-evaluate claim attributions to ensure balanced representation under archival neutrality guidelines.

### 2.4 Privacy Remediation & Redaction
- **Trigger**: Identification of an un-redacted minor, victim of sexual violence, vulnerable witness, or private citizen not charged with a public offense.
- **Procedure**:
  1. High-priority expedited review initiated via designated privacy channel.
  2. Redact identifying details (full name replaced with initials, residential address, telephone numbers, vehicle numbers).
  3. Commit the change with the commit message `fix(privacy): remediate personal identifier in [DossierID] [Reason]`.
  4. Document the redaction in the dossier's `privacyReviewNotes` without republishing the redacted data.

---

## 3. Dossier Withdrawal & Restoration Protocols

### 3.1 Temporary Dossier Withdrawal
- **Valid Grounds for Withdrawal**:
  - A binding court injunction or stay order fundamentally undermines the primary factual contention.
  - Credible evidence emerges indicating a primary source document was forged or fabricated.
  - Substantial risk of contempt of court or compromise of an ongoing criminal trial.
  - Critical privacy breach requiring thorough scrubbing across repository history.
- **Operational Steps**:
  1. In `dossiersData.ts`, change `editorialStatus` from `'published'` to `'withdrawn'`.
  2. Set `verificationStatus` to `'requires_legal_review'`.
  3. The static site replaces the dossier details with a prominent **Archival Withdrawal Notice**:
     - *Dossier Title and ID*
     - *Date of Withdrawal*
     - *Specific Legal / Factual Ground for Withdrawal*
     - *Repository Issue Reference*
  4. The record content is retained in the Git repository history for archival accountability.

### 3.2 Restoration of a Corrected Record
- **Conditions for Restoration**:
  - The underlying legal dispute is resolved (e.g. disposal of an Intra-Court Appeal).
  - Independent inquiry report is released providing definitive factual clarification.
  - All publication safeguards pass without any warning or blocker flags.
- **Operational Steps**:
  1. Status transition: `withdrawn` ➔ `under_review` ➔ `approved` ➔ `published`.
  2. The withdrawal notice is archived into the historical change log.
  3. The restored dossier displays an **Editorial Notice of Restoration and Revision** detailing the timeline of withdrawal and subsequent re-verification.
