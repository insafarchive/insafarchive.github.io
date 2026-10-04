import { CaseRecord } from '../../types';

export const case03: CaseRecord = {
  id: 'PK-IHC-2023-0892',
  slug: 'habeas-corpus-missing-citizen-custodial-safeguards',
  caseNumber: 'Writ Petition No. 892/2023',
  title: {
    en: 'Zahida Parveen v. Inspector General of Police & Others (Habeas Corpus & Due Process)',
    ur: 'زاہدہ پروین بنام انسپکٹر جنرل پولیس وغیرہ (حبسِ بے جا و شفاف تحقیقاتی طریقہ کار)',
  },
  summary: {
    en: 'Habeas corpus writ petition filed under Article 199 alleging unacknowledged detention of a student. Upon stringent judicial monitoring and summons of senior officials, the citizen was produced and all charges discharged by Judicial Magistrate under Section 63 CrPC.',
    ur: 'آئین کے آرٹیکل 199 کے تحت حبسِ بے جا کی رٹ پٹیشن۔ عدالتی احکامات اور پولیس افسران کی طلبی کے بعد شہری کو پیش کر دیا گیا اور جوڈیشل مجسٹریٹ نے عدم شواہد پر دفعہ 63 ضابطہ فوجداری کے تحت شہری کو مقدمے سے خارج کیا۔',
  },
  factualBackground: {
    en: 'In August 2023, the petitioner filed a habeas corpus plea stating her son was picked up without warrant. The police initially submitted reports denying custody. Following High Court directives warning of contempt and personal appearances of police commanders, the detainee was brought to court and discharged for total absence of incriminating evidence.',
    ur: 'اگست 2023 میں درخواست گزار نے اپنے بیٹے کی بلا وارنٹ گمشدگی کیخلاف رٹ دائر کی۔ پولیس نے ابتدا میں لاعلمی ظاہر کی۔ ہائی کورٹ کے سخت احکامات پر شہری کو پیش کیا گیا اور مجسٹریٹ نے تمام الزامات سے اخراج کا حکم جاری کیا۔',
  },
  recordType: 'custodial_inquiry',
  categories: ['missing_persons', 'human_rights', 'alleged_police_misconduct'],
  location: {
    province: 'islamabad_ict',
    city: 'Islamabad',
    incidentLocation: {
      en: 'Sector G-10, Islamabad',
      ur: 'سیکٹر جی-10، اسلام آباد',
    },
  },
  incidentDate: '2023-08-08',
  filingDate: '2023-08-11',
  court: {
    en: 'Islamabad High Court',
    ur: 'اسلام آباد ہائی کورٹ',
  },
  courtLevel: 'high_court',
  bench: {
    en: 'Chief Justice Bench, Islamabad High Court',
    ur: 'چیف جسٹس بینچ، اسلام آباد ہائی کورٹ',
  },
  statutoryProvisions: [
    'Constitution of Pakistan, 1973: Article 199 (Writ of Habeas Corpus)',
    'Constitution of Pakistan, 1973: Article 10 (Safeguards as to Arrest and Detention)',
    'Code of Criminal Procedure (CrPC) 1898: Section 63 (Discharge of Person Apprehended)',
  ],
  parties: [
    {
      id: 'pty-301',
      name: { en: 'Zahida Parveen (Mother)', ur: 'زاہدہ پروین (والدہ)' },
      role: 'petitioner',
    },
    {
      id: 'pty-302',
      name: { en: 'Inspector General of Police Islamabad & Ministry of Interior', ur: 'آئی جی اسلام آباد پولیس و وزارتِ داخلہ' },
      role: 'respondent',
    },
    {
      id: 'pty-303',
      name: { en: 'Ahmed Bilal (Student)', ur: 'احمد بلال (طالب علم)' },
      role: 'victim',
    },
  ],
  proceduralStatus: 'disposed_of',
  proceduralStatusNotes: {
    en: 'Disposed of with directives following safe production and formal Section 63 CrPC judicial discharge.',
    ur: 'شہری کی بحفاظت پیشی اور مجسٹریٹ کی جانب سے دفعہ 63 کے تحت اخراج کے بعد درخواست نمٹا دی گئی۔',
  },
  legalQuestion: {
    en: 'Whether detention of a citizen without production before a Magistrate within twenty-four hours violates mandatory injunctions of Article 10 of the Constitution.',
    ur: 'کیا 24 گھنٹے کے اندر مجسٹریٹ کے سامنے پیش کیے بغیر شہری کو زیرِ حراست رکھنا آئین کے آرٹیکل 10 کے لازمی تقاضوں کی خلاف ورزی ہے؟',
  },
  timeline: [
    {
      id: 'tm-301',
      date: '2023-08-11',
      event: { en: 'Habeas Corpus Petition filed in High Court', ur: 'ہائی کورٹ میں حبسِ بے جا کی رٹ پٹیشن دائر' },
      proceduralOutcome: { en: 'Notices issued to sector commanders', ur: 'پولیس اور متعلقہ افسران کو نوٹسز جاری' },
      statusEffect: 'pending_trial',
    },
    {
      id: 'tm-302',
      date: '2023-10-24',
      event: { en: 'Citizen produced; formal discharge order entered', ur: 'شہری کو پیش کیا گیا اور مقدمہ مکمل خارج ہوا' },
      bench: { en: 'IHC Chief Justice', ur: 'چیف جسٹس اسلام آباد ہائی کورٹ' },
      proceduralOutcome: { en: 'Discharged from all police files; writ petition disposed with costs', ur: 'تمام الزامات سے اخراج اور درخواست نمٹا دی گئی' },
      statusEffect: 'disposed_of',
      documentId: 'doc-ihc-892-final',
    },
  ],
  evidenceItems: [
    {
      id: 'ev-301',
      claimOrFact: {
        en: 'Initial police report stated that no agency had taken the citizen into custody.',
        ur: 'پولیس کی ابتدائی رپورٹ میں مؤقف اپنایا گیا تھا کہ شہری کسی تفتیش میں مطلوب نہیں۔',
      },
      nature: 'official_record',
      sourceName: { en: 'Police Report dated 2023-08-15', ur: 'پولیس رپورٹ بتاریخ 15 اگست 2023' },
      date: '2023-08-15',
      verifiedByCourt: false,
    },
    {
      id: 'ev-302',
      claimOrFact: {
        en: 'Magistrate discharged the detainee under Section 63 CrPC due to zero incriminating material.',
        ur: 'علاقہ مجسٹریٹ نے کسی بھی جرم کے ثبوت نہ ہونے پر شہری کو دفعہ 63 کے تحت مقدمے سے خارج کر دیا۔',
      },
      nature: 'court_finding',
      sourceName: { en: 'Magisterial Discharge Order in 2024 PCrLJ 89', ur: 'مجسٹریٹ کا اخراجِ مقدمہ کا حکمنامہ' },
      date: '2023-10-24',
      citation: '2024 PCrLJ 89',
      verifiedByCourt: true,
    },
  ],
  connectedDocuments: [
    {
      id: 'doc-ihc-892-final',
      title: {
        en: 'Disposal Judgment on Custodial Liberties and Article 10 Mandates',
        ur: 'شہری آزادیوں اور آرٹیکل 10 کے نفاذ سے متعلق حتمی عدالتی فیصلہ',
      },
      docketNumber: 'W.P. No. 892/2023',
      court: { en: 'Islamabad High Court', ur: 'اسلام آباد ہائی کورٹ' },
      date: '2023-10-24',
      citationFormat: '2024 PCrLJ 89',
      docType: 'judgment',
      certifiedCopy: true,
      pagesCount: 12,
      extractText: {
        en: '“Enforced disappearances strike at the very root of the social contract. An officer executing arrest must identify himself, assign reasons, and promptly notify next of kin. Secret detentions are unknown to the law of Pakistan.”',
        ur: '”کسی بھی شہری کو لاپتہ کرنا بنیادی آئینی حقوق اور ریاست کے عمرانی معاہدے پر حملہ ہے۔ گرفتاری کرنے والے افسر پر لازم ہے کہ وہ اپنی شناخت ظاہر کرے اور وجوہات درج کرے۔ خفیہ حراست پاکستان کے قانون میں قطعی ناپید ہے۔“',
      },
    },
  ],
  videoEvidence: [],
  sources: [
    {
      id: 'src-301',
      type: 'court_transcript',
      title: { en: '2024 PCrLJ 89 Certified Copy', ur: '2024 پی سی آر ایل جے 89 مصدقہ نقل' },
      issuingInstitution: { en: 'Pakistan Criminal Law Journal', ur: 'پاکستان کرمنل لا جرنل' },
      publicationDate: '2024-01-20',
    },
  ],
  lastUpdated: '2023-10-24',
  editorialReviewStatus: 'verified_official_record',
  incompleteNotice: false,
  unverifiedNotice: false,
  relatedCaseIds: ['PK-IHC-2024-0210'],
  tags: ['Habeas Corpus', 'Article 10', 'Islamabad High Court', 'Due Process', 'Missing Persons'],
  isDemonstrationData: true,
  featured: true,
};
