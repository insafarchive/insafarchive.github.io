/**
 * INSAF ARCHIVE (انصاف آرکائیو)
 * Master Constitutional Mappings Registry
 * Bidirectional linkages connecting Archive Records to Constitutional Articles
 */

import type { ConstitutionalMappingEntry } from '../../types/constitution';

export const CONSTITUTIONAL_MAPPINGS: ConstitutionalMappingEntry[] = [
  // =========================================================================
  // 1. ARSHAD SHARIF KILLING -> ARTICLE 9 & ARTICLE 19
  // =========================================================================
  {
    mappingId: 'PK-CMAP-AS-KILLING-A009',
    archiveRecordId: 'rec-pk-2022-arshad-sharif-killing',
    articleId: 'PK-CONST-A009',
    clauseId: 'PK-CONST-A009-C01',
    relationshipType: 'court_found_violation',
    alertLevel: 'green',
    factualSummary: {
      en: 'Fatal targeted shooting of investigative journalist Arshad Sharif on the Magadi-Nairobi highway by Kenyan General Service Unit police officers.',
      ur: 'کینیا میں پولیس کے ہاتھوں صحافی ارشد شریف کو گولیاں مار کر شہید کرنے کا ماورائے عدالت واقعہ۔',
    },
    legalAnalysis: {
      en: 'The High Court of Kenya at Kajiado in Petition E007 of 2023 expressly determined that the state police action was unlawful, arbitrary, and an unconstitutional violation of the right to life, mirroring Article 9 protections.',
      ur: 'کینین ہائی کورٹ نے باضابطہ فیصلے میں قرار دیا کہ صحافی کا قتل غیر قانونی، ماورائے آئین اور حقِ زندگی کی صریح پامالی تھا۔',
    },
    courtRulingSummary: {
      courtName: { en: 'High Court of Kenya at Kajiado', ur: 'ہائی کورٹ آف کینیا کاجیادو' },
      caseCitation: 'Petition No. E007 of 2023 (Judgment 8 July 2024)',
      judgmentDate: '2024-07-08',
      findingOutcome: 'violation_found',
      operativeText: {
        en: 'The killing of Arshad Sharif was unlawful, arbitrary and a violation of the right to life; state ordered to pay compensation and prosecute responsible officers.',
        ur: 'ارشد شریف کا قتل غیر قانونی اور حقِ زندگی کی خلاف ورزی قرار، کینین حکومت کو ہرجانہ ادا کرنے اور ذمہ دار افسران پر مقدمہ چلانے کا حکم۔',
      },
    },
    supportingClaimIds: ['clm-as-kenya-unlawful'],
    supportingSourceIds: ['src-kenya-hc-judgment-2024'],
    reviewStatus: 'approved',
    reviewedBy: 'Insaf Archive Legal Review Board',
    reviewedAt: '2024-07-20',
  },
  {
    mappingId: 'PK-CMAP-AS-KILLING-A019',
    archiveRecordId: 'rec-pk-2022-arshad-sharif-killing',
    articleId: 'PK-CONST-A019',
    clauseId: 'PK-CONST-A019-C01',
    relationshipType: 'potential_constitutional_concern',
    alertLevel: 'red',
    factualSummary: {
      en: 'Registration of 16 criminal FIRs against Arshad Sharif in mid-2022 leading to his forced departure from Pakistan prior to his assassination.',
      ur: 'ارشد شریف کے خلاف ملک بھر میں درج درجنوں ایف آئی آرز اور صحافتی آواز کو بند کرنے کے لیے پیدا کی گئی سنگین صورتحال۔',
    },
    legalAnalysis: {
      en: 'Investigative reporting and national television broadcasting scrutinized sovereign state decisions; using multi-jurisdictional FIRs to suppress journalistic reporting directly engages Article 19 freedom of the press guarantees.',
      ur: 'صحافتی رپورٹنگ پر درجنوں شہروں میں بیک وقت مقدمات کا اندراج آرٹیکل 19 کے تحت صحافت اور آزادی اظہار پر سنگین حملہ ہے۔',
    },
    supportingClaimIds: ['clm-as-firs'],
    supportingSourceIds: ['src-ihc-wp-2933-2022'],
    reviewStatus: 'approved',
    reviewedBy: 'Insaf Archive Legal Review Board',
    reviewedAt: '2024-07-20',
  },

  // =========================================================================
  // 2. SUPREME COURT SUO MOTU ON ARSHAD SHARIF -> ARTICLE 184(3)
  // =========================================================================
  {
    mappingId: 'PK-CMAP-AS-SUOMOTU-A184',
    archiveRecordId: 'rec-pk-2022-arshad-sharif-sc-suomotu',
    articleId: 'PK-CONST-A184',
    clauseId: 'PK-CONST-A184-C03',
    relationshipType: 'court_examined',
    alertLevel: 'green',
    factualSummary: {
      en: '5-member Supreme Court bench constituted under Article 184(3) taking suo motu notice of the transnational murder of a Pakistani journalist.',
      ur: 'صحافی ارشد شریف کے قتل پر چیف جسٹس کی سربراہی میں 5 رکنی لارجر بینچ کی ازخود نوٹس کارروائی۔',
    },
    legalAnalysis: {
      en: 'The Supreme Court directly exercised Article 184(3) original public interest jurisdiction to order murder FIR registration and direct international Mutual Legal Assistance (MLA).',
      ur: 'سپریم کورٹ نے بنیادی حقوق کے نفاذ کے لیے آرٹیکل 184(3) کے تحت اپنے دائرہ اختیار کا استعمال کرتے ہوئے ایف آئی آر اور جے آئی ٹی تشکیل کے احکامات دیے۔',
    },
    courtRulingSummary: {
      courtName: { en: 'Supreme Court of Pakistan', ur: 'سپریم کورٹ آف پاکستان' },
      caseCitation: 'Suo Motu Case No. 8 of 2022',
      judgmentDate: '2022-12-06',
      findingOutcome: 'guidelines_issued',
      operativeText: {
        en: 'Supreme Court ordered immediate registration of murder FIR under CrPC Section 154 and mandated reconstitution of Special JIT.',
        ur: 'سپریم کورٹ نے ارشد شریف کے قتل کی باضابطہ ایف آئی آر کے اندراج اور نئی اسپیشل جے آئی ٹی بنانے کا حکم دیا۔',
      },
    },
    supportingClaimIds: ['clm-sc-fir-order'],
    supportingSourceIds: ['src-pk-sc-suo-motu-2022'],
    reviewStatus: 'approved',
    reviewedBy: 'Insaf Archive Legal Review Board',
    reviewedAt: '2024-07-20',
  },

  // =========================================================================
  // 3. MILITARY COURTS TRIAL OF CIVILIANS -> ARTICLE 10A, 9, 25 & 175
  // =========================================================================
  {
    mappingId: 'PK-CMAP-MILCOURTS-A010A',
    archiveRecordId: 'rec-pk-legal-military-courts-civilians-2023',
    articleId: 'PK-CONST-A010A',
    clauseId: 'PK-CONST-A010A-C01',
    relationshipType: 'court_found_violation',
    alertLevel: 'green',
    factualSummary: {
      en: 'Handing over of 103 civilian citizens to military authorities for court-martial under the Pakistan Army Act 1952 following 9 May 2023 events.',
      ur: '9 مئی 2023ء کے واقعات کے بعد 103 عام شہریوں کو فوجی عدالتوں (کورٹ مارشل) کے حوالے کرنے کا اقدام۔',
    },
    legalAnalysis: {
      en: 'The Supreme Court held unanimously that military courts do not constitute independent judicial bodies satisfying Article 10A fair trial and due process standards; Section 2(1)(d) was declared unconstitutional and ultra vires.',
      ur: 'سپریم کورٹ کے 5 رکنی بینچ نے متفقہ طور پر قرار دیا کہ فوجی عدالتیں آئین کے آرٹیکل 10A کے تحت منصفانہ ٹرائل کا تقاضا پورا نہیں کرتیں، اس لیے آرمی ایکٹ کی دفعہ 2(1)(d) کالعدم ہے۔',
    },
    courtRulingSummary: {
      courtName: { en: 'Supreme Court of Pakistan', ur: 'سپریم کورٹ آف پاکستان' },
      caseCitation: 'Const. Petition No. 24 of 2023 (Judgment 23 October 2023)',
      judgmentDate: '2023-10-23',
      findingOutcome: 'violation_found',
      operativeText: {
        en: 'Section 2(1)(d)(i) & (ii) and Section 59(4) of the Pakistan Army Act 1952 are unconstitutional and of no legal effect; civilian accused ordered transferred to ordinary criminal courts.',
        ur: 'پاکستان آرمی ایکٹ کی دفعات سویلین کے حوالے سے غیر آئینی اور کالعدم قرار دی گئیں؛ تمام سویلین ملزمان کو عام فوجداری عدالتوں میں منتقل کرنے کا حکم۔',
      },
    },
    supportingClaimIds: ['clm-mil-trial-unconst'],
    supportingSourceIds: ['src-sc-mil-courts-2023-order'],
    reviewStatus: 'approved',
    reviewedBy: 'Insaf Archive Legal Review Board',
    reviewedAt: '2023-11-01',
  },
  {
    mappingId: 'PK-CMAP-MILCOURTS-A175',
    archiveRecordId: 'rec-pk-legal-military-courts-civilians-2023',
    articleId: 'PK-CONST-A175',
    clauseId: 'PK-CONST-A175-C03',
    relationshipType: 'court_found_violation',
    alertLevel: 'green',
    factualSummary: {
      en: 'Creation of a parallel military judicial forum to adjudicate civilian offenses outside the Article 175 judicial hierarchy.',
      ur: 'آرٹیکل 175 کے تحت قائم آئینی عدالتی نظام کے متوازی فوجی ٹربیونلز کے ذریعے سویلین کے ٹرائل کا تنازع۔',
    },
    legalAnalysis: {
      en: 'The Supreme Court confirmed that under Article 175, judicial power can only be exercised by courts established under the Constitution and regular law; establishing military courts to try civilians violates judicial independence.',
      ur: 'سپریم کورٹ نے قرار دیا کہ عدالتی اختیارات صرف آئین کے تحت قائم آزاد عدالتیں استعمال کر سکتی ہیں؛ سویلین کے لیے فوجی عدالتوں کا قیام عدلیہ کی آزادی پر ضرب ہے۔',
    },
    courtRulingSummary: {
      courtName: { en: 'Supreme Court of Pakistan', ur: 'سپریم کورٹ آف پاکستان' },
      caseCitation: 'Const. Petition No. 24 of 2023 (PLD 2024 SC 1)',
      judgmentDate: '2023-10-23',
      findingOutcome: 'violation_found',
      operativeText: {
        en: 'The Supreme Court ruled that parallel military judicial forums for civilians infringe upon the separation and independence of the judiciary guaranteed under Article 175.',
        ur: 'سپریم کورٹ نے فیصلہ دیا کہ سویلین شہریوں کے ٹرائل کے لیے متوازی ملٹری ٹربیونلز کا قیام آرٹیکل 175 کے تحت عدلیہ کی آزادی کے منافی ہے۔',
      },
    },
    supportingClaimIds: ['clm-mil-trial-unconst'],
    supportingSourceIds: ['src-sc-mil-courts-2023-order'],
    reviewStatus: 'approved',
    reviewedBy: 'Insaf Archive Legal Review Board',
    reviewedAt: '2023-11-01',
  },

  // =========================================================================
  // 4. ASIA BIBI ACQUITTAL -> ARTICLE 10A & ARTICLE 25
  // =========================================================================
  {
    mappingId: 'PK-CMAP-ASIABIBI-A010A',
    archiveRecordId: 'rec-pk-legal-asia-bibi-acquittal-2018',
    articleId: 'PK-CONST-A010A',
    clauseId: 'PK-CONST-A010A-C01',
    relationshipType: 'court_found_violation',
    alertLevel: 'green',
    factualSummary: {
      en: 'Nine-year detention on death row under Section 295-C PPC based on conflicting and delayed eyewitness testimony.',
      ur: 'متضاد بیانات اور تاخیر سے درج ایف آئی آر پر مسیحی خاتون آسیہ بی بی کی سزائے موت اور 9 سالہ قید۔',
    },
    legalAnalysis: {
      en: 'The Supreme Court ruled that capital conviction on fabricated or severely contradictory evidence violates the fundamental right to fair trial and due process guaranteed by Article 10A.',
      ur: 'سپریم کورٹ نے فیصلہ دیا کہ ناقابلِ اعتبار اور متضاد بیانات پر سزائے موت دینا آئین کے آرٹیکل 10A اور منصفانہ ٹرائل کے تقاضوں کی خلاف ورزی ہے۔',
    },
    courtRulingSummary: {
      courtName: { en: 'Supreme Court of Pakistan', ur: 'سپریم کورٹ آف پاکستان' },
      caseCitation: 'Criminal Appeal No. 39-L of 2015 (PLD 2019 SC 64)',
      judgmentDate: '2018-10-31',
      findingOutcome: 'violation_found',
      operativeText: {
        en: 'Conviction and death sentence set aside; appellant acquitted of all charges due to failure of the prosecution to prove its case beyond reasonable doubt.',
        ur: 'سزائے موت کالعدم قرار، استغاثہ کی جانب سے جرم ثابت کرنے میں ناکامی پر ملزمہ کی باعزت بریت۔',
      },
    },
    supportingClaimIds: ['clm-asia-bibi-acquittal'],
    supportingSourceIds: ['src-sc-asia-bibi-judgment-2018'],
    reviewStatus: 'approved',
    reviewedBy: 'Insaf Archive Legal Review Board',
    reviewedAt: '2023-11-01',
  },

  // =========================================================================
  // 5. STEEL MILLS PRIVATIZATION ANNULMENT -> ARTICLE 184(3)
  // =========================================================================
  {
    mappingId: 'PK-CMAP-STEELMILLS-A184',
    archiveRecordId: 'rec-pk-asset-pakistan-steel-mills-privatization-2006',
    articleId: 'PK-CONST-A184',
    clauseId: 'PK-CONST-A184-C03',
    relationshipType: 'court_found_violation',
    alertLevel: 'green',
    factualSummary: {
      en: 'Annulling the $362 million privatization transaction of Pakistan Steel Mills due to omission of mandatory Council of Common Interests (CCI) approval.',
      ur: 'مشترکہ مفادات کونسل (CCI) کی منظوری کے بغیر پاکستان سٹیل ملز کی 362 ملین ڈالر میں نجکاری کو کالعدم قرار دینا۔',
    },
    legalAnalysis: {
      en: 'The Supreme Court 9-member bench held that selling key public industrial assets without constitutional inter-provincial oversight (Article 153/154) was void ab initio and directly justiciable under Article 184(3).',
      ur: 'سپریم کورٹ نے قرار دیا کہ آئینی تقاضوں کو نظر انداز کر کے سرکاری اثاثوں کی فروخت عوامی مفاد اور وفاقی ہم آہنگی کے منافی ہے۔',
    },
    courtRulingSummary: {
      courtName: { en: 'Supreme Court of Pakistan', ur: 'سپریم کورٹ آف پاکستان' },
      caseCitation: 'Const. Pet. No. 9 of 2006 (PLD 2006 SC 697)',
      judgmentDate: '2006-06-23',
      findingOutcome: 'violation_found',
      operativeText: {
        en: 'Privatization process declared unconstitutional, lacking transparency, and void ab initio.',
        ur: 'نجکاری کے عمل کو غیر آئینی، غیر شفاف اور آغاز ہی سے کالعدم قرار دیا گیا۔',
      },
    },
    supportingClaimIds: ['clm-psm-void'],
    supportingSourceIds: ['src-sc-psm-judgment-2006'],
    reviewStatus: 'approved',
    reviewedBy: 'Insaf Archive Legal Review Board',
    reviewedAt: '2023-11-01',
  },

  // =========================================================================
  // 6. HAMOODUR RAHMAN COMMISSION REPORT -> PREAMBLE & ARTICLE 6
  // =========================================================================
  {
    mappingId: 'PK-CMAP-HRC-PRE',
    archiveRecordId: 'rec-pk-hist-hamoodur-rahman-commission-1971',
    articleId: 'PK-CONST-PRE',
    clauseId: 'PK-CONST-PRE-C01',
    relationshipType: 'historical_constitutional_context',
    alertLevel: 'blue',
    factualSummary: {
      en: 'Judicial inquiry investigating the military surrender, breakdown of democratic transfer of power after 1970 elections, and separation of East Pakistan.',
      ur: '1970ء کے انتخابات کے بعد اقتدار کی منتقلی میں ناکامی اور مشرقی پاکستان کی علیحدگی پر چیف جسٹس حمود الرحمٰن کی تحقیقاتی رپورٹ۔',
    },
    legalAnalysis: {
      en: 'The Commission established that subverting the democratic electoral mandate caused state disintegration, directly inspiring the 1973 Constitution Preamble and anti-coup Article 6.',
      ur: 'کمیشن نے ثابت کیا کہ عوامی مینڈیٹ کو تسلیم نہ کرنا ملکی المیے کا سبب بنا، جس نے 1973ء کے آئین کی تمہید اور آرٹیکل 6 کی بنیاد رکھی۔',
    },
    supportingClaimIds: ['clm-hrc-declassified'],
    supportingSourceIds: ['src-hrc-report-doc-2000'],
    reviewStatus: 'approved',
    reviewedBy: 'Insaf Archive Legal Review Board',
    reviewedAt: '2023-11-01',
  },

  // =========================================================================
  // 7. IPP CONTRACTS & POWER POLICY -> ARTICLE 19A
  // =========================================================================
  {
    mappingId: 'PK-CMAP-IPP-A019A',
    archiveRecordId: 'rec-pk-energy-ipp-power-policy-1994-2002',
    articleId: 'PK-CONST-A019A',
    clauseId: 'PK-CONST-A019A-C01',
    relationshipType: 'potential_constitutional_concern',
    alertLevel: 'orange',
    factualSummary: {
      en: 'Secrecy surrounding sovereign dollar-indexed capacity purchase payments, audit reports, and circular debt accumulation.',
      ur: 'آئی پی پیز کی کیپسٹی ادائیگیوں اور آڈٹ رپورٹس کو عوامی نظروں سے اوجھل رکھنے اور شفافیت کا فقدان۔',
    },
    legalAnalysis: {
      en: 'Sovereign guarantees and trillion-rupee tariff additions directly affect public finance and citizen cost of living; withholding contract audit details engages Article 19A public access to information rights.',
      ur: 'عوامی فنانس اور کھربوں روپے کے گردشی قرضے سے متعلق مالیاتی معلومات اور آڈٹ رپورٹس کا چھپایا جانا آرٹیکل 19A کے تحت تشویش پیدا کرتا ہے۔',
    },
    supportingClaimIds: ['clm-ipp-capacity-contract', 'clm-ipp-audit-2020'],
    supportingSourceIds: ['src-nepra-state-industry-2023', 'src-gov-power-audit-2020'],
    reviewStatus: 'under_review',
    reviewedBy: 'Insaf Archive Legal Review Board',
    reviewedAt: '2024-04-10',
  },
];
