import { CaseRecord } from '../../types';

export const case10: CaseRecord = {
  id: 'PK-SC-2023-0941',
  slug: 'katchi-abadi-anti-encroachment-rehabilitation-mandate',
  caseNumber: 'Civil Petition No. 941/2023',
  title: {
    en: 'Anjuman Falah-e-Behbood Katchi Abadi v. Municipal Development Authority & Province of Sindh',
    ur: 'انجمن فلاح و بہبود کچی آبادی بنام میونسپل ڈویلپمنٹ اتھارٹی و حکومتِ سندھ',
  },
  summary: {
    en: 'Supreme Court appellate judgment setting binding constitutional safeguards against arbitrary forced evictions of informal settlement residents without formal resettlement schemes under Article 9 and 14.',
    ur: 'کچی آبادیوں کے مکینوں کو بغیر متبادل آباد کاری کے جبری بے دخلی سے روکنے کے حوالے سے سپریم کورٹ کا اہم عدالتی فیصلہ۔',
  },
  factualBackground: {
    en: 'In mid-2023, municipal authorities commenced bulldozing informal housing settlements along railway buffer zones in Hyderabad without notice. Over two thousand families faced displacement. The High Court initially declined interim relief. Upon appeal, the Supreme Court stayed arbitrary demolitions, formulating a national resettlement doctrine requiring survey enumerations and designated rehabilitation plots before any lawful state eviction.',
    ur: 'سال 2023 کے وسط میں حیدرآباد میں ریلوے ٹریک کے قریب واقع کچی آبادی کے رہائشیوں کو بغیر نوٹس مسمار کرنے کا عمل شروع کیا گیا۔ ہائی کورٹ سے ریلیف نہ ملنے پر سپریم کورٹ میں اپیل دائر کی گئی۔ سپریم کورٹ نے انہدام روک دیا اور حکومت کو پابند کیا کہ متبادل رہائش کی فراہمی کے بغیر کسی شہری کی چھت نہ چھینی جائے۔',
  },
  recordType: 'judgment',
  categories: ['labour_poverty', 'court_judgments', 'public_interest_political'],
  location: {
    province: 'sindh',
    district: 'Hyderabad',
    city: 'Hyderabad',
    incidentLocation: {
      en: 'Phuleli Canal / Railway Buffer Settlement, Hyderabad',
      ur: 'پھلیلی کینال و ریلوے اراضی آبادی، حیدرآباد',
    },
  },
  incidentDate: '2023-05-18',
  filingDate: '2023-06-02',
  court: {
    en: 'Supreme Court of Pakistan',
    ur: 'سپریم کورٹ آف پاکستان',
  },
  courtLevel: 'supreme_court',
  bench: {
    en: 'Three-Member Appellate Bench (Hon. Senior Puisne Judge presiding)',
    ur: 'تین رکنی اپیلٹ بینچ (سربراہی سینئر ترین جج سپریم کورٹ)',
  },
  statutoryProvisions: [
    'Constitution of Pakistan, 1973: Article 9 (Security of Person & Right to Shelter)',
    'Constitution of Pakistan, 1973: Article 14 (Inviolability of Dignity of Man)',
    'Sindh Katchi Abadis Act, 1987: Sections 4 & 6',
  ],
  parties: [
    {
      id: 'pty-1001',
      name: { en: 'Anjuman Falah-e-Behbood Katchi Abadi Hyderabad', ur: 'انجمن فلاح و بہبود کچی آبادی حیدرآباد' },
      role: 'appellant',
    },
    {
      id: 'pty-1002',
      name: { en: 'Province of Sindh through Secretary Local Government & Municipal Corporation', ur: 'حکومتِ سندھ بذریعہ سیکریٹری بلدیات و میونسپل کارپوریشن' },
      role: 'respondent',
    },
  ],
  proceduralStatus: 'disposed_of',
  proceduralStatusNotes: {
    en: 'Disposed of with mandatory instructions to provincial government to complete socio-economic census and allocate alternate housing prior to clearance.',
    ur: 'حکومت کو متبادل پلاٹس اور جامع سروے مکمل کرنے کے لازمی احکامات جاری کر کے درخواست نمٹا دی گئی۔',
  },
  legalQuestion: {
    en: 'Does the constitutional guarantee of dignity and right to life encompass protection against forced eviction of low-income citizens from established informal settlements without reasonable resettlement?',
    ur: 'کیا آئین کے تحت زندگی اور انسانی وقار کے حق میں یہ تحفظ شامل ہے کہ کم آمدن شہریوں کو متبادل انتظام کے بغیر جبری طور پر بے دخل نہ کیا جائے؟',
  },
  timeline: [
    {
      id: 'tm-1001',
      date: '2023-06-02',
      event: { en: 'Civil Petition for Leave to Appeal moved in Supreme Court', ur: 'سپریم کورٹ میں اپیل کی اجازت کی درخواست دائر' },
      proceduralOutcome: { en: 'Immediate stay granted against bulldozer operations', ur: 'بلڈوزر آپریشن کے خلاف فوری حکمِ امتناع جاری' },
      statusEffect: 'pending_trial',
    },
    {
      id: 'tm-1002',
      date: '2023-11-29',
      event: { en: 'Final landmark judgment pronounced', ur: 'سپریم کورٹ کا تفصیلی حتمی فیصلہ جاری' },
      bench: { en: 'Supreme Court 3-Member Bench', ur: 'سپریم کورٹ کا تین رکنی بینچ' },
      proceduralOutcome: {
        en: 'Petition disposed of with binding directions; municipal master resettlement plan notified',
        ur: 'درخواست نمٹا دی گئی؛ حکومت کو ری سیٹلمنٹ پالیسی بنانے کا پابند کیا گیا',
      },
      statusEffect: 'disposed_of',
      documentId: 'doc-sc-941-resettlement',
    },
  ],
  evidenceItems: [
    {
      id: 'ev-1001',
      claimOrFact: {
        en: 'Municipal authorities claimed the settlement was an unregularized recent encroachment creating flood drainage hazards.',
        ur: 'بلدیہ کا دعویٰ تھا کہ آبادی حالیہ قبضہ ہے جس سے برساتی نالے بند ہو رہے ہیں۔',
      },
      nature: 'party_statement',
      sourceName: { en: 'Municipal Corporation Response Report in CP 941/2023', ur: 'میونسپل کارپوریشن کا تحریری جواب' },
      date: '2023-07-14',
      verifiedByCourt: false,
    },
    {
      id: 'ev-1002',
      claimOrFact: {
        en: 'Court verified that the settlement had continuous utility billing and census registrations dating back over 35 years.',
        ur: 'عدالتی ریکارڈ میں آبادی کے 35 سال پرانے یوٹیلیٹی بلز اور مردم شماری ریکارڈ کی تصدیق ہوئی۔',
      },
      nature: 'court_finding',
      sourceName: { en: 'Supreme Court Judgment, 2024 SCMR 410, Paras 11-14', ur: 'سپریم کورٹ کا تحریری فیصلہ 2024 SCMR 410' },
      date: '2023-11-29',
      citation: '2024 SCMR 410',
      verifiedByCourt: true,
    },
  ],
  connectedDocuments: [
    {
      id: 'doc-sc-941-resettlement',
      title: {
        en: 'Supreme Court Landmark Judgment on Right to Shelter & Resettlement',
        ur: 'حقِ رہائش و کچی آبادیوں کی آباد کاری پر سپریم کورٹ کا رہنما فیصلہ',
      },
      docketNumber: 'Civil Petition No. 941/2023',
      court: { en: 'Supreme Court of Pakistan', ur: 'سپریم کورٹ آف پاکستان' },
      date: '2023-11-29',
      citationFormat: '2024 SCMR 410',
      docType: 'judgment',
      certifiedCopy: true,
      pagesCount: 22,
      extractText: {
        en: '“The right to life enshrined under Article 9 does not signify mere animal existence; it encompasses the fundamental right to shelter and human dignity under Article 14. Eviction without rehabilitation reduces vulnerable citizens to state-sponsored destitution, which this Court cannot countenance.”',
        ur: '”آئین کے آرٹیکل 9 کے تحت زندگی کا حق محض سانس لینے کا نام نہیں بلکہ اس میں رہائش اور آرٹیکل 14 کے تحت انسانی وقار کا تحفظ بھی شامل ہے۔ بغیر متبادل کے شہریوں کو بے گھر کرنا ریاستی جبر کے مترادف ہے جس کی عدالت اجازت نہیں دے سکتی۔“',
      },
    },
  ],
  videoEvidence: [],
  sources: [],
  lastUpdated: '2023-11-29',
  editorialReviewStatus: 'verified_official_record',
  incompleteNotice: false,
  unverifiedNotice: false,
  relatedCaseIds: ['PK-BHC-2024-0033'],
  tags: ['Right to Shelter', 'Article 9', 'Article 14', 'Supreme Court', 'Katchi Abadi', 'Hyderabad'],
  isDemonstrationData: true,
  featured: true,
};
