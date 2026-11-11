## Insaf Archive — Administrator & Reviewer Checklist

### Submission Reference
- **Related Issue**: Closes #
- **Submission Type**: [ ] New Case Record [ ] Case Correction/Update [ ] Media/Document Evidence
- **Target Case ID(s)**: `PK-...`
- **Contributor**: @

---

### Step-by-Step Editorial Review & Verification Protocol

- [ ] **1. Source Material Provenance**: Certified copy, official court website docket, or reported law journal (PLD, SCMR, CLD, PCrLJ) has been inspected.
- [ ] **2. Procedural Status Distinction**:
  - [ ] Bail is strictly categorized as interim relief (`bail_granted`) and NOT conflated with acquittal.
  - [ ] Acquittals cite statutory grounds (e.g., Sec. 249-A or 265-K CrPC) or final appellate judgments.
  - [ ] FIR allegations are strictly labeled as unproven claims by the state/complainant.
- [ ] **3. Date & Timeline Verification**:
  - [ ] Filing dates, incident dates, and order dates are strictly in ISO format (`YYYY-MM-DD`).
  - [ ] For media records: Event date (`eventDate`) is separated from upload date (`publicationDate`).
- [ ] **4. Privacy & Statutory Safeguards**:
  - [ ] No minors or juveniles under 18 are named (Juvenile Justice System Act 2018 compliance).
  - [ ] No victims of gender-based or sexual violence are named or identifiable.
  - [ ] No unredacted national identity cards (CNIC), personal phone numbers, or residential addresses.
  - [ ] No privileged lawyer-client communications or non-public investigation records.
- [ ] **5. Copyright & Public Domain Notice**:
  - [ ] Primary judicial order or public broadcast verified under open-access guidelines.
- [ ] **6. Automated Schema & Invariant Testing**:
  - [ ] `npm test` runs cleanly with 0 failures (`validateBatch`, `validateMediaRecord`, duplicate ID checks).
  - [ ] `npm run lint` passes without TypeScript or syntax errors.
  - [ ] Bundle builds cleanly via `npm run build`.
- [ ] **7. Bilingual Completeness**:
  - [ ] Urdu text is formatted for right-to-left Nastaliq rendering with correct legal terminology.
  - [ ] English text is grammatically sound, neutral, and devoid of partisan rhetoric.
- [ ] **8. Post-Merge Deployment Audit**:
  - [ ] GitHub Actions workflow completed successfully (`Deploy to GitHub Pages`).
  - [ ] Live page verified on GitHub Pages without broken embeds or rendering anomalies.
