import { CaseRecord } from '../../types';

export const case09: CaseRecord = {
  id: 'PK-LHC-2024-0315',
  slug: 'womens-agricultural-land-inheritance-dispute-multan',
  caseNumber: 'Regular First Appeal No. 315/2024',
  title: {
    en: 'Maryam Bibi & 2 Others v. Muhammad Aslam & Revenue Authorities (Inheritance Rights)',
    ur: 'مریم بی بی وغیرہ بنام محمد اسلم و محکمہ مال (خواتین کے زرعی وراثتی حقوق)',
  },
  summary: {
    en: 'Civil appellate proceedings challenging fraudulent relinquishment deeds (Tamleek/Dastbardari) executed to deprive three female heirs of 48 acres of ancestral agricultural land in Khanewal district.',
    ur: 'خانیوال میں تین بہنوں کو زرعی اراضی کی وراثت سے محروم کرنے کے لیے تیار کی گئی جعلی دستبرداری دستاویزات کے خلاف سول اپیل۔',
  },
  factualBackground: {
    en: 'Following the demise of a landowner in Khanewal, his son allegedly orchestrated fraudulent mutation entries in revenue records claiming that his sisters had surrendered their statutory Shariah shares. The sisters approached civil courts under the Enforcement of Women’s Property Rights Act. The Senior Civil Judge dismissed their plea, prompting an appeal before the High Court Multan Bench.',
    ur: 'خانیوال کے زمیندار کے انتقال کے بعد بیٹے نے بہنوں کے حصے کی جعلی دستبرداری تیار کر کے محکمہ مال میں انتقال درج کروایا۔ بہنوں نے وراثتی حقوق کے تحفظ کے قانون کے تحت دعویٰ دائر کیا۔ سول کورٹ کے فیصلے کیخلاف ہائی کورٹ ملتان بینچ میں اپیل زیرِ سماعت ہے۔',
  },
  recordType: 'court_case',
  categories: ['women_children', 'civil_litigation', 'court_judgments'],
  location: {
    province: 'punjab',
    district: 'Khanewal',
    city: 'Multan',
    incidentLocation: {
      en: 'Tehsil Kabirwala, District Khanewal / LHC Multan Bench',
      ur: 'تحصیل کبیر والا، ضلع خانیوال و لاہور ہائی کورٹ ملتان بینچ',
    },
  },
  incidentDate: '2023-06-12',
  filingDate: '2024-01-20',
  court: {
    en: 'Lahore High Court, Multan Bench',
    ur: 'لاہور ہائی کورٹ، ملتان بینچ',
  },
  courtLevel: 'high_court',
  bench: {
    en: 'Division Bench (Hon. Justice T. Abbasi & Hon. Justice F. Niazi)',
    ur: 'ڈویژن بینچ (جسٹس ٹی۔ عباسی و مسٹر جسٹس ایف۔ نیازی)',
  },
  statutoryProvisions: [
    'Enforcement of Women’s Property Rights Act, 2020: Sections 3, 4 & 5',
    'Pakistan Penal Code (PPC) 1860: Section 498-A (Prohibition of Depriving Women from Inheriting Property)',
    'West Pakistan Land Revenue Act, 1967: Section 42 (Making of that part of periodic record relating to landowners)',
  ],
  parties: [
    {
      id: 'pty-901',
      name: { en: 'Maryam Bibi and Two Surviving Sisters', ur: 'مریم بی بی اور دو ہمشیرہ' },
      role: 'appellant',
      notes: {
        en: 'Protected vulnerable female litigants under provincial legal aid guidelines.',
        ur: 'قانونی امداد کے تحفظاتی قواعد کے تحت مدعی خواتین۔',
      },
    },
    {
      id: 'pty-902',
      name: { en: 'Muhammad Aslam (Brother) & Patwari Halqa Kabirwala', ur: 'محمد اسلم (بھائی) و پٹواری حلقہ کبیر والا' },
      role: 'respondent',
    },
  ],
  proceduralStatus: 'appealed',
  proceduralStatusNotes: {
    en: 'High Court stayed alienation, sale, and creation of third-party interest in the disputed agricultural parcels.',
    ur: 'لاہور ہائی کورٹ نے زمین کی فروخت یا کسی تیسرے فریق کو منتقلی پر حکمِ امتناع جاری کر رکھا ہے۔',
  },
  timeline: [
    {
      id: 'tm-901',
      date: '2024-01-20',
      event: { en: 'First Appeal registered against dismissal decree', ur: 'سول کورٹ کے فیصلے کے خلاف اپیل دائر' },
      proceduralOutcome: { en: 'Stay granted against third-party sale of land', ur: 'زمین کی فروخت پر فوری حکمِ امتناع جاری' },
      statusEffect: 'appealed',
    },
    {
      id: 'tm-902',
      date: '2024-02-18',
      event: { en: 'Forensic Science Agency thumbprint report requisitioned', ur: 'فارنزک سائنس ایجنسی سے انگوٹھوں کی تصدیقی رپورٹ طلب' },
      proceduralOutcome: { en: 'Revenue records summoned by High Court', ur: 'محکمہ مال کا پرانا ریکارڈ عدالت میں طلب' },
      statusEffect: 'appealed',
    },
  ],
  evidenceItems: [
    {
      id: 'ev-901',
      claimOrFact: {
        en: 'Appellant sisters assert they never appeared before the revenue officer and the relinquishment deed is a counterfeit forgery.',
        ur: 'بہنوں کا مؤقف ہے کہ وہ کبھی پٹواری کے روبرو پیش نہیں ہوئیں اور انگوٹھے جعلی لگائے گئے۔',
      },
      nature: 'party_statement',
      sourceName: { en: 'Appellate Memorandum RFA No. 315/2024', ur: 'اپیل کا تحریری مسودہ' },
      date: '2024-01-20',
      verifiedByCourt: false,
    },
    {
      id: 'ev-902',
      claimOrFact: {
        en: 'Punjab Forensic Science Agency (PFSA) preliminary analysis indicated thumb impressions did not match appellants’ biometric CNIC database cards.',
        ur: 'پنجاب فارنزک سائنس ایجنسی نے ابتدائی رپورٹ میں دستبرداری پر انگوٹھے کے نشانات کے غیر مطابقت پذیر ہونے کی نشاندہی کی۔',
      },
      nature: 'official_record',
      sourceName: { en: 'PFSA Document Examination Report PFSA-DOC-2024-192', ur: 'پی ایف ایس اے فنگر پرنٹ فارنزک رپورٹ' },
      date: '2024-02-28',
      verifiedByCourt: true,
    },
  ],
  connectedDocuments: [],
  videoEvidence: [],
  sources: [],
  lastUpdated: '2024-02-28',
  editorialReviewStatus: 'corroborated_reporting',
  incompleteNotice: false,
  unverifiedNotice: false,
  relatedCaseIds: [],
  tags: ['Inheritance Rights', 'Women Property Rights', 'Khanewal', 'Multan Bench', 'Forensic Evidence'],
  isDemonstrationData: true,
  featured: false,
};
