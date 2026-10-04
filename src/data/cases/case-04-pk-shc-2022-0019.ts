import { CaseRecord } from '../../types';

export const case04: CaseRecord = {
  id: 'PK-SHC-2022-0019',
  slug: 'state-v-shahid-akram-acquittal-anti-corruption',
  caseNumber: 'Spl. Case No. 19/2022',
  title: {
    en: 'The State v. Shahid Akram (Acquittal on Lack of Evidentiary Substance)',
    ur: 'سرکار بنام شاہد اکرم (عدم شواہد پر باضابطہ بریت کا حتمی فیصلہ)',
  },
  summary: {
    en: 'Final adjudication and acquittal under Section 249-A CrPC. The prosecution failed to produce primary tender records, audit discrepancies, or forensic accounting proof to substantiate claims of procurement kickbacks.',
    ur: 'ضابطہ فوجداری کی دفعہ 249-A کے تحت حتمی بریت۔ استغاثہ کرپشن یا مالی بے ضابطگی کا کوئی بھی بنیادی دستاویزی ثبوت یا فارنزک آڈٹ رپورٹ پیش کرنے میں ناکام رہا۔',
  },
  factualBackground: {
    en: 'In April 2022, anti-corruption authorities initiated proceedings against a municipal director alleging irregularities in hospital equipment procurement. During two years of trial, defense produced certified Auditor General reports demonstrating transparent competitive bidding. The Court acquitted the accused, noting that suspicion cannot substitute for statutory proof.',
    ur: 'اپریل 2022 میں اینٹی کرپشن نے ہسپتال مشینری کی خریداری میں بے ضابطگی کے الزام پر کارروائی کی۔ ٹرائل کے دوران دفاع نے آڈیٹر جنرل کی کلیئرنس رپورٹ پیش کی جس سے ثابت ہوا کہ ٹھیکہ شفاف بولی سے دیا گیا۔ عدالت نے ملزم کو تمام الزامات سے بری کیا۔',
  },
  recordType: 'judgment',
  categories: ['court_judgments', 'bail_acquittal', 'civil_litigation'],
  location: {
    province: 'sindh',
    district: 'Karachi South',
    city: 'Karachi',
    incidentLocation: {
      en: 'Sindh Secretariat / Civil Hospital, Karachi',
      ur: 'سندھ سیکریٹریٹ و سول ہسپتال، کراچی',
    },
  },
  incidentDate: '2022-03-10',
  filingDate: '2022-04-18',
  court: {
    en: 'Special Court (Anti-Corruption), Karachi',
    ur: 'خصوصی عدالت (اینٹی کرپشن)، کراچی',
  },
  courtLevel: 'special_tribunal',
  bench: {
    en: 'Special Judge (Anti-Corruption)',
    ur: 'خصوصی جج (اینٹی کرپشن)',
  },
  statutoryProvisions: [
    'Code of Criminal Procedure (CrPC) 1898: Section 249-A (Power to Acquit Accused at Any Stage)',
    'Prevention of Corruption Act 1947: Section 5(2)',
    'Pakistan Penal Code (PPC) 1860: Section 409 (Criminal Breach of Trust)',
  ],
  parties: [
    {
      id: 'pty-401',
      name: { en: 'The State through Anti-Corruption Establishment Sindh', ur: 'سرکار بذریعہ اینٹی کرپشن اسٹیبلشمنٹ سندھ' },
      role: 'state',
    },
    {
      id: 'pty-402',
      name: { en: 'Shahid Akram (Former Director Procurement)', ur: 'شاہد اکرم (سابق ڈائریکٹر پروکیورمنٹ)' },
      role: 'accused',
    },
  ],
  proceduralStatus: 'acquitted',
  proceduralStatusNotes: {
    en: 'Full acquittal under Section 249-A CrPC. Bail bonds canceled and surety discharged.',
    ur: 'دفعہ 249-A کے تحت باضابطہ اور مکمل بریت۔ تمام ضمانتی مچلکے واپس۔',
  },
  timeline: [
    {
      id: 'tm-401',
      date: '2022-04-18',
      event: { en: 'Challan submitted by prosecution', ur: 'استغاثہ کی جانب سے چالان پیش' },
      proceduralOutcome: { en: 'Charges framed; trial commenced', ur: 'فردِ جرم عائد؛ ٹرائل کا آغاز' },
      statusEffect: 'pending_trial',
    },
    {
      id: 'tm-402',
      date: '2024-01-15',
      event: { en: 'Final judgment of Acquittal entered under Section 249-A CrPC', ur: 'دفعہ 249-A کے تحت باضابطہ بریت کا فیصلہ' },
      bench: { en: 'Special Judge Anti-Corruption Karachi', ur: 'خصوصی جج اینٹی کرپشن کراچی' },
      proceduralOutcome: { en: 'Honorably acquitted; surety bonds released', ur: 'باعزت بری؛ ضمانتی مچلکے واپس' },
      statusEffect: 'acquitted',
      documentId: 'doc-ac-19-acquittal',
    },
  ],
  evidenceItems: [
    {
      id: 'ev-401',
      claimOrFact: {
        en: 'Prosecution alleged favoritism and kickbacks in tender evaluation.',
        ur: 'استغاثہ کا الزام تھا کہ ٹینڈر کی جانچ پڑتال میں جانبداری برتی گئی۔',
      },
      nature: 'allegation',
      sourceName: { en: 'Anti-Corruption Inquiry Report ACE-KHI-41', ur: 'اینٹی کرپشن انکوائری رپورٹ' },
      date: '2022-03-10',
      verifiedByCourt: false,
    },
    {
      id: 'ev-402',
      claimOrFact: {
        en: 'Auditor General of Pakistan audit cleared the bidding process as strictly conforming to SPPRA Rules.',
        ur: 'آڈیٹر جنرل نے ٹینڈر عمل کو رولز کے مطابق شفاف اور درست قرار دیا۔',
      },
      nature: 'official_record',
      sourceName: { en: 'Defense Exhibit D-4 admitted into trial record on 2023-09-14', ur: 'آڈٹ رپورٹ جو عدالتی ریکارڈ کا حصہ بنی' },
      date: '2023-09-14',
      verifiedByCourt: true,
    },
  ],
  connectedDocuments: [
    {
      id: 'doc-ac-19-acquittal',
      title: {
        en: 'Certified Judgment of Acquittal under Section 249-A CrPC',
        ur: 'دفعہ 249-A کے تحت بریت کا مصدقہ حتمی فیصلہ',
      },
      docketNumber: 'Spl. Case No. 19/2022',
      court: { en: 'Special Court (Anti-Corruption), Karachi', ur: 'خصوصی عدالت اینٹی کرپشن، کراچی' },
      date: '2024-01-15',
      citationFormat: '2024 CLD 218',
      docType: 'judgment',
      certifiedCopy: true,
      pagesCount: 14,
      extractText: {
        en: '“The prosecution case rests on conjecture and suspicion rather than verifiable evidentiary material. An acquittal under Section 249-A Cr.P.C. is entered as continuing the trial would amount to abuse of the process of Court.”',
        ur: '”استغاثہ کا مقدمہ ٹھوس شواہد کے بجائے قیاس آرائیوں پر مبنی ہے۔ مزید ٹرائل عدالتی عمل کا ضیاع ہو گا، لہٰذا ملزم کو دفعہ 249-A کے تحت فوری بری کیا جاتا ہے۔“',
      },
    },
  ],
  videoEvidence: [],
  sources: [
    {
      id: 'src-401',
      type: 'court_transcript',
      title: { en: 'Certified Copy of Judgment in Spl. Case 19/2022', ur: 'حتمی فیصلے کی تصدیق شدہ عدالتی نقل' },
      issuingInstitution: { en: 'Court of Special Judge Anti-Corruption Karachi', ur: 'خصوصی عدالت اینٹی کرپشن کراچی' },
      publicationDate: '2024-01-15',
    },
  ],
  lastUpdated: '2024-01-15',
  editorialReviewStatus: 'verified_official_record',
  incompleteNotice: false,
  unverifiedNotice: false,
  relatedCaseIds: [],
  tags: ['Section 249-A', 'Acquittal', 'Anti-Corruption', 'Karachi', 'SPPRA'],
  isDemonstrationData: true,
  featured: false,
};
