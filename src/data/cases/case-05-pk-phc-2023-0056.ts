import { CaseRecord } from '../../types';

export const case05: CaseRecord = {
  id: 'PK-PHC-2023-0056',
  slug: 'election-disqualification-statutory-appeal',
  caseNumber: 'Election Appeal No. 56/2023',
  title: {
    en: 'Haji Gulzar Khan v. Returning Officer & Election Commission of Pakistan',
    ur: 'حاجی گلزار خان بنام ریٹرننگ آفیسر و الیکشن کمیشن آف پاکستان',
  },
  summary: {
    en: 'Appellate tribunal sustained disqualification order of candidate under Section 62 of Elections Act 2017 due to non-disclosure of offshore bank assets in nomination declaration.',
    ur: 'انتخابی ٹریبونل نے گوشواروں میں غیر ملکی اثاثے چھپانے کے الزام میں ریٹرننگ آفیسر کا نااہلی کا فیصلہ برقرار رکھا۔ سپریم کورٹ میں اپیل دائر ہے۔',
  },
  factualBackground: {
    en: 'During scrutiny of nomination forms for NA-31 Peshawar, an objection was sustained regarding an undisclosed foreign commercial account. The Election Appellate Tribunal upheld the Returning Officer’s rejection. The appellant has approached the Supreme Court under constitutional review.',
    ur: 'این اے-31 پشاور کے کاغذاتِ نامزدگی کی جانچ پڑتال کے دوران بیرونی بینک اکاؤنٹ چھپانے پر ریٹرننگ آفیسر کا فیصلہ برقرار رکھا گیا۔ امیدوار نے سپریم کورٹ سے رجوع کر رکھا ہے۔',
  },
  recordType: 'court_case',
  categories: ['public_interest_political', 'court_judgments'],
  location: {
    province: 'khyber_pakhtunkhwa',
    district: 'Peshawar',
    city: 'Peshawar',
    incidentLocation: {
      en: 'Election Appellate Tribunal, High Court Building, Peshawar',
      ur: 'الیکشن اپیلٹ ٹریبونل، ہائی کورٹ بلڈنگ، پشاور',
    },
  },
  incidentDate: '2023-12-24',
  filingDate: '2023-12-28',
  court: {
    en: 'Peshawar High Court, Election Appellate Tribunal',
    ur: 'پشاور ہائی کورٹ، انتخابی اپیلٹ ٹریبونل',
  },
  courtLevel: 'high_court',
  bench: {
    en: 'Tribunal Judge (Hon. Justice S. Arbab)',
    ur: 'ٹریبونل جج (فاضل جج جناب جسٹس ایس۔ ارباب)',
  },
  statutoryProvisions: [
    'Elections Act 2017: Section 62 (Scrutiny of Nomination Papers)',
    'Constitution of Pakistan, 1973: Article 62(1)(f) (Qualifications for Membership of Parliament)',
  ],
  parties: [
    {
      id: 'pty-501',
      name: { en: 'Haji Gulzar Khan (Candidate NA-31)', ur: 'حاجی گلزار خان (امیدوار این اے-31)' },
      role: 'appellant',
    },
    {
      id: 'pty-502',
      name: { en: 'Returning Officer & Election Commission of Pakistan', ur: 'ریٹرننگ آفیسر و الیکشن کمیشن آف پاکستان' },
      role: 'respondent',
    },
  ],
  proceduralStatus: 'appealed',
  proceduralStatusNotes: {
    en: 'Tribunal sustained disqualification; constitutional appeal sub judice before the Supreme Court of Pakistan.',
    ur: 'ٹریبونل نے نااہلی برقرار رکھی؛ سپریم کورٹ میں آئینی نظرِ ثانی کی اپیل زیرِ سماعت ہے۔',
  },
  timeline: [
    {
      id: 'tm-501',
      date: '2023-12-28',
      event: { en: 'Appeal filed against Returning Officer order', ur: 'ریٹرننگ آفیسر کے فیصلے کیخلاف اپیل دائر' },
      proceduralOutcome: { en: 'Continuous arguments concluded', ur: 'دلائل مکمل کیے گئے' },
      statusEffect: 'pending_trial',
    },
    {
      id: 'tm-502',
      date: '2024-01-10',
      event: { en: 'Disqualification upheld by Appellate Tribunal', ur: 'اپیلٹ ٹریبونل نے نااہلی کا فیصلہ برقرار رکھا' },
      bench: { en: 'Hon. Justice S. Arbab', ur: 'جسٹس ایس۔ ارباب' },
      proceduralOutcome: { en: 'Nomination rejected; statutory appeal filed in Supreme Court', ur: 'کاغذات نامزدگی مسترد؛ سپریم کورٹ میں اپیل زیرِ سماعت' },
      statusEffect: 'appealed',
      documentId: 'doc-el-56-ruling',
    },
  ],
  evidenceItems: [
    {
      id: 'ev-501',
      claimOrFact: {
        en: 'Candidate asserted the overseas account was dormant and omitted without fraudulent intent.',
        ur: 'امیدوار کا مؤقف تھا کہ اکاؤنٹ غیر فعال تھا اور غلطی سے رہ گیا تھا۔',
      },
      nature: 'party_statement',
      sourceName: { en: 'Appellant Written Statement dated 2024-01-02', ur: 'اپیل کنندہ کا تحریری بیان' },
      date: '2024-01-02',
      verifiedByCourt: false,
    },
    {
      id: 'ev-502',
      claimOrFact: {
        en: 'Financial Monitoring Unit verified candidate was active signatory holding offshore deposit balances.',
        ur: 'مالیاتی مانیٹرنگ یونٹ نے امیدوار کے فعال دستخط کنندہ ہونے کی تصدیق کی۔',
      },
      nature: 'official_record',
      sourceName: { en: 'State Bank Financial Monitoring Unit Report', ur: 'اسٹیٹ بینک رپورٹ' },
      date: '2024-01-05',
      verifiedByCourt: true,
    },
  ],
  connectedDocuments: [
    {
      id: 'doc-el-56-ruling',
      title: {
        en: 'Appellate Tribunal Ruling on Candidate Asset Disclosure',
        ur: 'امیدوار کے اثاثہ جات کی جانچ پر انتخابی ٹریبونل کا فیصلہ',
      },
      docketNumber: 'Election Appeal No. 56/2023',
      court: { en: 'Peshawar High Court Election Tribunal', ur: 'پشاور ہائی کورٹ الیکشن ٹریبونل' },
      date: '2024-01-10',
      citationFormat: '2024 CLC 490',
      docType: 'judgment',
      certifiedCopy: true,
      pagesCount: 9,
      extractText: {
        en: '“The disclosure mandates in nomination filings are designed to ensure public probity. A candidate cannot claim clerical oversight where material offshore assets are established on the record.”',
        ur: '”کاغذات نامزدگی میں اثاثوں کی شفافیت عوامی اعتماد کی ضامن ہے۔ ٹھوس غیر ملکی اثاثوں کے ریکارڈ پر موجود ہونے کے بعد اسے محض کلیریکل غلطی نہیں کہا جا سکتا۔“',
      },
    },
  ],
  videoEvidence: [],
  sources: [],
  lastUpdated: '2024-01-10',
  editorialReviewStatus: 'corroborated_reporting',
  incompleteNotice: false,
  unverifiedNotice: false,
  relatedCaseIds: [],
  tags: ['Election Law', 'Peshawar High Court', 'Article 62(1)(f)', 'Nomination Papers'],
  isDemonstrationData: true,
  featured: false,
};
