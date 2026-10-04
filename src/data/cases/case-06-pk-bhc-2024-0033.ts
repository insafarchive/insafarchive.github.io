import { CaseRecord } from '../../types';

export const case06: CaseRecord = {
  id: 'PK-BHC-2024-0033',
  slug: 'balochistan-coal-mine-workers-occupational-safety-petition',
  caseNumber: 'Const. P. 33/2024',
  title: {
    en: 'Balochistan Mines Workers Federation v. Secretary Mines & Minerals & Others',
    ur: 'بلوچستان مائنز ورکرز فیڈریشن بنام سیکریٹری کان کنی و معدنیات وغیرہ',
  },
  summary: {
    en: 'Constitutional public interest litigation alleging hazardous working conditions, lack of methane gas detectors, and non-payment of minimum statutory wages in Duki and Sor Range coal mines.',
    ur: 'ڈکی اور سور رینج کی کوئلہ کانوں میں حفاظتی انتظامات کی عدم دستیابی، میتھین گیس ڈیٹیکٹرز کے فقدان اور قانونی کم از کم اجرت کی عدم ادائیگی کیخلاف آئینی مفادِ عامہ کی درخواست۔',
  },
  factualBackground: {
    en: 'Following repeated fatal methane explosions in deep shafts in Duki district, mine labour representatives petitioned the Balochistan High Court. The petition documents that private contractors routinely breach the Mines Act 1923, failing to provide ventilation shafts, emergency oxygen canisters, or statutory social security registrations for over 15,000 miners.',
    ur: 'ڈکی کے علاقے میں کوئلہ کانوں میں گیس دھماکوں کے پے در پے واقعات کے بعد مزدور تنظیموں نے ہائی کورٹ سے رجوع کیا۔ درخواست میں مائنز ایکٹ 1923 کی خلاف ورزیوں، آکسیجن ماسک اور سوشل سیکیورٹی کے بغیر کام کروانے کے سنگین الزامات لگائے گئے ہیں۔',
  },
  recordType: 'public_interest',
  categories: ['labour_poverty', 'public_interest_political', 'human_rights'],
  location: {
    province: 'balochistan',
    district: 'Duki',
    city: 'Quetta',
    incidentLocation: {
      en: 'Duki Coalfields & Balochistan High Court Quetta',
      ur: 'ڈکی کوئلہ فیلڈز و بلوچستان ہائی کورٹ کوئٹہ',
    },
  },
  incidentDate: '2024-01-18',
  filingDate: '2024-02-05',
  court: {
    en: 'High Court of Balochistan, Quetta',
    ur: 'بلوچستان ہائی کورٹ، کوئٹہ',
  },
  courtLevel: 'high_court',
  bench: {
    en: 'Division Bench (Hon. Chief Justice & Hon. Justice N. Mengal)',
    ur: 'ڈویژن بینچ (چیف جسٹس و مسٹر جسٹس این۔ مینگل)',
  },
  statutoryProvisions: [
    'Constitution of Pakistan, 1973: Article 9 (Security of Person & Right to Life)',
    'Mines Act, 1923: Sections 19, 20 & 21 (Safety Protocols)',
    'Balochistan Minimum Wages Act 2021',
  ],
  parties: [
    {
      id: 'pty-601',
      name: { en: 'Balochistan Mines Workers Federation', ur: 'بلوچستان مائنز ورکرز فیڈریشن' },
      role: 'petitioner',
    },
    {
      id: 'pty-602',
      name: { en: 'Government of Balochistan through Mines & Minerals Department', ur: 'حکومتِ بلوچستان بذریعہ محکمہ کان کنی و معدنیات' },
      role: 'respondent',
    },
    {
      id: 'pty-603',
      name: { en: 'Central Association of Mine Owners Balochistan', ur: 'مرکزی انجمنِ مالکان کوئلہ کانز بلوچستان' },
      role: 'respondent',
    },
  ],
  proceduralStatus: 'under_investigation',
  proceduralStatusNotes: {
    en: 'High Court constituted a statutory judicial inspection committee headed by District Judge Duki to conduct surprise audits of shaft safety equipment.',
    ur: 'ہائی کورٹ نے ڈسٹرکٹ جج ڈکی کی سربراہی میں عدالتی کمیشن قائم کر کے کانوں میں حفاظتی آلات کے معائنے کا حکم دیا ہے۔',
  },
  timeline: [
    {
      id: 'tm-601',
      date: '2024-02-05',
      event: { en: 'Constitutional petition admitted for regular hearing', ur: 'آئینی درخواست باقاعدہ سماعت کے لیے منظور' },
      proceduralOutcome: { en: 'Notices issued to Provincial Chief Inspector of Mines', ur: 'چیف انسپکٹر مائنز بلوچستان کو نوٹسز جاری' },
      statusEffect: 'pending_trial',
    },
    {
      id: 'tm-602',
      date: '2024-03-21',
      event: { en: 'Judicial Inspection Committee notified', ur: 'عدالتی معائنہ کمیٹی کا باضابطہ نوٹیفکیشن' },
      proceduralOutcome: { en: 'Interim report directed within six weeks; hazardous shafts sealed', ur: 'چھ ہفتوں میں رپورٹ طلب؛ خطرناک کانیں عارضی سیل' },
      statusEffect: 'under_investigation',
    },
  ],
  evidenceItems: [
    {
      id: 'ev-601',
      claimOrFact: {
        en: 'Workers allege contractors pay less than 50% of statutory minimum wage and maintain no casualty insurance.',
        ur: 'مزدوروں کا الزام ہے کہ قانونی کم از کم اجرت کی نصف رقم دی جاتی ہے اور کوئی لائف انشورنس نہیں۔',
      },
      nature: 'allegation',
      sourceName: { en: 'Petition Annexure B: Sworn Affidavits of 42 Miners', ur: '42 مزدوروں کے بیاناتِ حلفی' },
      date: '2024-02-05',
      verifiedByCourt: false,
    },
    {
      id: 'ev-602',
      claimOrFact: {
        en: 'Directorate of Mines inspection verified that 18 deep shafts lacked operational air monitoring apparatus.',
        ur: 'محکمہ کان کنی کی ابتدائی رپورٹ میں 18 کانوں میں گیس مانیٹرنگ آلات کی عدم موجودگی کی تصدیق ہوئی۔',
      },
      nature: 'official_record',
      sourceName: { en: 'Provincial Mines Inspection Report No. 112/2024', ur: 'صوبائی مائنز معائنہ رپورٹ نمبر 112/2024' },
      date: '2024-03-15',
      verifiedByCourt: true,
    },
  ],
  connectedDocuments: [],
  videoEvidence: [],
  sources: [
    {
      id: 'src-601',
      type: 'court_transcript',
      title: { en: 'Balochistan High Court Order Sheet Const. P. 33/2024', ur: 'بلوچستان ہائی کورٹ آرڈر شیٹ بتاریخ 21 مارچ 2024' },
      issuingInstitution: { en: 'High Court of Balochistan Registry', ur: 'رجسٹرار بلوچستان ہائی کورٹ' },
      publicationDate: '2024-03-21',
    },
  ],
  lastUpdated: '2024-03-21',
  editorialReviewStatus: 'corroborated_reporting',
  incompleteNotice: true,
  unverifiedNotice: false,
  relatedCaseIds: ['PK-SC-2023-0941'],
  tags: ['Balochistan', 'Labour Rights', 'Mines Act', 'Occupational Safety', 'Right to Life'],
  isDemonstrationData: true,
  featured: false,
};
