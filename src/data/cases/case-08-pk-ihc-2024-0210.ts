import { CaseRecord } from '../../types';

export const case08: CaseRecord = {
  id: 'PK-IHC-2024-0210',
  slug: 'habeas-corpus-inquiry-human-rights-defender-detention',
  caseNumber: 'Writ Petition No. 210/2024',
  title: {
    en: 'Civil Society Alliance v. Federal Capital Administration & Law Enforcement Agencies',
    ur: 'سول سوسائٹی الائنس بنام انتظامیہ وفاقی دارالحکومت و سیکیورٹی ادارے',
  },
  summary: {
    en: 'Constitutional habeas corpus petition seeking whereabouts and production of an environmental activist reported missing following a community seminar in Islamabad.',
    ur: 'اسلام آباد میں ماحولیاتی کارکن کی گمشدگی کیخلاف آرٹیکل 199 کے تحت حبسِ بے جا کی رٹ پٹیشن جس میں بازیابی اور عدالت میں پیشی کی استدعا کی گئی ہے۔',
  },
  factualBackground: {
    en: 'In March 2024, colleagues of an environmental researcher reported that he failed to return home after organizing a seminar regarding land acquisition in the Margalla foothills. The petitioner alliance approached the High Court. The Court issued direct notices to the Inspector General of Police and federal security divisions to produce call data records and safe city camera footage.',
    ur: 'مارچ 2024 میں ماحولیاتی سیمینار کے بعد ایک ریسرچر کی گمشدگی پر ہائی کورٹ سے رجوع کیا گیا۔ عدالتِ عالیہ نے آئی جی پولیس اور وفاقی اداروں کو نوٹس جاری کر کے سیف سٹی کیمروں اور کال ریکارڈز کا جائزہ لینے کا حکم دیا۔',
  },
  recordType: 'court_case',
  categories: ['missing_persons', 'human_rights', 'public_interest_political'],
  location: {
    province: 'islamabad_ict',
    city: 'Islamabad',
    incidentLocation: {
      en: 'F-8 / Margalla Road intersection, Islamabad',
      ur: 'ایف-8 و مارگلہ روڈ چوک، اسلام آباد',
    },
  },
  incidentDate: '2024-03-04',
  filingDate: '2024-03-07',
  court: {
    en: 'Islamabad High Court',
    ur: 'اسلام آباد ہائی کورٹ',
  },
  courtLevel: 'high_court',
  bench: {
    en: 'Single Bench (Hon. Justice B. Kakar)',
    ur: 'سنگل بینچ (فاضل جج جناب جسٹس بی۔ کاکڑ)',
  },
  statutoryProvisions: [
    'Constitution of Pakistan, 1973: Article 9 (Security of Person)',
    'Constitution of Pakistan, 1973: Article 199(1)(b)(i) (Habeas Corpus Jurisdiction)',
    'Police Order 2002: Article 156 (Neglect of Duty Penalties)',
  ],
  parties: [
    {
      id: 'pty-801',
      name: { en: 'Civil Society Alliance for Environmental Justice', ur: 'سول سوسائٹی الائنس فار انوائرمنٹل جسٹس' },
      role: 'petitioner',
    },
    {
      id: 'pty-802',
      name: { en: 'Inspector General of Police Islamabad & Joint Investigation Team', ur: 'آئی جی اسلام آباد پولیس و مشترکہ تحقیقاتی ٹیم' },
      role: 'respondent',
    },
    {
      id: 'pty-803',
      name: {
        en: '[Identity Withheld — Environmental Researcher S.K.]',
        ur: '[محفوظ شناخت — ماحولیاتی محقق ایس۔ کے]',
      },
      role: 'victim',
      isProtectedOrMinor: false,
      redacted: true,
      notes: {
        en: 'Identity temporarily withheld upon family written application to mitigate intimidation risks pending production.',
        ur: 'متاثرہ خاندان کی درخواست پر ممکنہ خطرات کے پیش نظر نام عارضی صیغۂ راز میں رکھا گیا ہے۔',
      },
    },
  ],
  proceduralStatus: 'pending_trial',
  proceduralStatusNotes: {
    en: 'Court ordered formation of a high-level JIT headed by SSP Investigation with weekly compliance reports to the Registrar.',
    ur: 'عدالت نے ایس ایس پی انویسٹی گیشن کی سربراہی میں جے آئی ٹی قائم کر کے ہفتہ وار پیش رفت رپورٹ طلب کی ہے۔',
  },
  timeline: [
    {
      id: 'tm-801',
      date: '2024-03-07',
      event: { en: 'Habeas petition instituted in High Court', ur: 'ہائی کورٹ میں حبسِ بے جا کی رٹ دائر' },
      proceduralOutcome: { en: 'Urgent notices issued for next day production', ur: 'اگلے روز پیشی کے لیے ہنگامی نوٹسز جاری' },
      statusEffect: 'pending_trial',
    },
    {
      id: 'tm-802',
      date: '2024-03-25',
      event: { en: 'Safe City CCTV logs produced before High Court', ur: 'سیف سٹی فوٹیج کا عدالتی ریکارڈ میں اندراج' },
      proceduralOutcome: { en: 'Unregistered vehicle trace directed; JIT deadline extended', ur: 'بغیر نمبر پلیٹ گاڑی کی جانچ کی ہدایت' },
      statusEffect: 'pending_trial',
    },
  ],
  evidenceItems: [
    {
      id: 'ev-801',
      claimOrFact: {
        en: 'Petitioners assert the researcher was intercepted by masked individuals in an unmarked double-cabin vehicle.',
        ur: 'درخواست گزاروں کا مؤقف ہے کہ نقاب پوش افراد نے بغیر نمبر پلیٹ ڈالے میں محقق کو روکا۔',
      },
      nature: 'allegation',
      sourceName: { en: 'Writ Petition No. 210/2024 Affidavit', ur: 'رٹ پٹیشن نمبر 210/2024 کا بیانِ حلفی' },
      date: '2024-03-07',
      verifiedByCourt: false,
    },
    {
      id: 'ev-802',
      claimOrFact: {
        en: 'Islamabad Safe City Authority confirmed that two intersections on the route experienced camera feed dropouts during the reported hour.',
        ur: 'سیف سٹی اتھارٹی نے اعتراف کیا کہ متعلقہ وقت میں روٹ کے دو کیمروں کی ریکارڈنگ بند تھی۔',
      },
      nature: 'official_record',
      sourceName: { en: 'Safe City Technical Report submitted to High Court', ur: 'ہائی کورٹ میں جمع شدہ سیف سٹی رپورٹ' },
      date: '2024-03-25',
      verifiedByCourt: true,
    },
  ],
  connectedDocuments: [],
  videoEvidence: [],
  sources: [],
  lastUpdated: '2024-03-25',
  editorialReviewStatus: 'under_editorial_review',
  incompleteNotice: true,
  unverifiedNotice: true,
  relatedCaseIds: ['PK-IHC-2023-0892'],
  tags: ['Habeas Corpus', 'Missing Persons', 'Safe City', 'Islamabad High Court', 'Margalla'],
  isDemonstrationData: true,
  featured: false,
};
