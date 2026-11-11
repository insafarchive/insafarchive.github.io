import { CaseRecord } from '../../types';

export const case07: CaseRecord = {
  id: 'PK-ATC-2023-0118',
  slug: 'custodial-torture-inquiry-gujranwala-special-court',
  caseNumber: 'Crl. Inquiry No. 118/2023',
  title: {
    en: 'In re Alleged Custodial Torture of Minor Detainee at Thana Sabzi Mandi',
    ur: 'ازخود نوٹس / عدالتی انکوائری: تھانہ سبزی منڈی میں زیرِ حراست کم سن پر مبینہ تشدد',
  },
  summary: {
    en: 'Judicial inquiry under Torture and Custodial Death (Prevention and Punishment) Act 2022 initiated following allegations of physical abuse against a 16-year-old apprentice in police lockup.',
    ur: 'انسدادِ تشدد و حراستی اموات ایکٹ 2022 کے تحت جوڈیشل انکوائری؛ تھانے میں 16 سالہ کم سن پر پولیس اہلکاروں کے مبینہ بہیمانہ تشدد کی تحقیقات۔',
  },
  factualBackground: {
    en: 'In October 2023, during routine inspection of police station lockups, an Additional Sessions Judge discovered an undocumented 16-year-old detainee bearing contusions and severe bodily trauma. The detainee had been picked up without registration of an FIR. The Court invoked the Torture and Custodial Death Act 2022, ordering an independent medical board and lodging departmental show-cause notices.',
    ur: 'اکتوبر 2023 میں ایڈیشنل سیشن جج نے تھانے کے معائنے کے دوران ایک 16 سالہ لڑکے کو غیر قانونی حراست میں پایا جس کے جسم پر تشدد کے نشانات تھے۔ عدالت نے تشدد روک تھام کے قانون کے تحت ایف آئی اے اور آزاد میڈیکل بورڈ کو تحقیقات سونپیں۔',
  },
  recordType: 'custodial_inquiry',
  categories: ['alleged_police_misconduct', 'women_children', 'criminal_proceedings', 'human_rights'],
  location: {
    province: 'punjab',
    district: 'Gujranwala',
    city: 'Gujranwala',
    incidentLocation: {
      en: 'Police Station Sabzi Mandi, Gujranwala',
      ur: 'تھانہ سبزی منڈی، گوجرانوالہ',
    },
  },
  incidentDate: '2023-10-14',
  filingDate: '2023-10-17',
  court: {
    en: 'Court of Additional Sessions Judge / Inquiring Magistrate, Gujranwala',
    ur: 'عدالت ایڈیشنل سیشن جج / انکوائری مجسٹریٹ، گوجرانوالہ',
  },
  courtLevel: 'district_sessions',
  bench: {
    en: 'Hon. Additional Sessions Judge (Presiding Officer)',
    ur: 'فاضل ایڈیشنل سیشن جج (انکوائری افسر)',
  },
  statutoryProvisions: [
    'Torture and Custodial Death (Prevention and Punishment) Act, 2022: Sections 3, 4, 8 & 9',
    'Juvenile Justice System Act (JJSA) 2018: Section 6 & 8 (Protective Detention Rules)',
    'Pakistan Penal Code (PPC) 1860: Section 337 (Hurt Incurred)',
  ],
  parties: [
    {
      id: 'pty-701',
      name: {
        en: '[Identity Protected — Juvenile Citizen M.A., Age 16]',
        ur: '[محفوظ نام — کم سن شہری ایم۔ اے، عمر 16 سال، تحفظ جووینائل ایکٹ 2018]',
      },
      role: 'victim',
      isProtectedOrMinor: true,
      redacted: true,
      notes: {
        en: 'Protected under Section 13 of Juvenile Justice System Act 2018. True name and residential address permanently redacted.',
        ur: 'جووینائل جسٹس سسٹم ایکٹ کی دفعہ 13 کے تحت اصل نام اور رہائشی پتہ صیغۂ راز میں ہے۔',
      },
    },
    {
      id: 'pty-702',
      name: {
        en: 'Station House Officer (SHO) & 3 Constables, PS Sabzi Mandi',
        ur: 'ایس ایچ او و 3 کانسٹیبلز، تھانہ سبزی منڈی گوجرانوالہ',
      },
      role: 'accused',
    },
  ],
  proceduralStatus: 'reported',
  proceduralStatusNotes: {
    en: 'Inquiry ongoing; accused officers suspended from duty; medical board findings submitted to Sessions Court.',
    ur: 'انکوائری جاری؛ متعلقہ اہلکار معطل؛ میڈیکل بورڈ کی رپورٹ سیشن عدالت میں جمع۔',
  },
  timeline: [
    {
      id: 'tm-701',
      date: '2023-10-14',
      event: { en: 'Surprise inspection by Additional Sessions Judge', ur: 'ایڈیشنل سیشن جج کا تھانے کا اچانک معائنہ' },
      proceduralOutcome: { en: 'Undocumented minor recovered; immediate hospitalization directed', ur: 'کم سن بازیاب؛ فوری ہسپتال منتقلی کا حکم' },
      statusEffect: 'reported',
    },
    {
      id: 'tm-702',
      date: '2023-10-28',
      event: { en: 'District Medico-Legal Board submits clinical report', ur: 'ڈسٹرکٹ میڈیکو لیگل بورڈ کی رپورٹ جمع' },
      proceduralOutcome: { en: 'Multiple blunt force trauma contusions confirmed', ur: 'جسم پر تشدد کے 9 نشانات کی میڈیکل تصدیق' },
      statusEffect: 'under_investigation',
    },
  ],
  evidenceItems: [
    {
      id: 'ev-701',
      claimOrFact: {
        en: 'Complainant family alleges police demanded illegal gratification and subjected minor to nocturnal physical beatings.',
        ur: 'متاثرہ خاندان کا الزام ہے کہ رشوت طلب کی گئی اور بچے کو رات کے وقت بہیمانہ تشدد کا نشانہ بنایا گیا۔',
      },
      nature: 'allegation',
      sourceName: { en: 'Complaint under Section 22-A CrPC filed by Family', ur: 'دفعہ 22-A کے تحت سیشن عدالت میں دائر درخواست' },
      date: '2023-10-16',
      verifiedByCourt: false,
    },
    {
      id: 'ev-702',
      claimOrFact: {
        en: 'District Health Authority Special Medical Board verified multiple contusions and blunt injuries consistent with physical trauma.',
        ur: 'ڈسٹرکٹ میڈیکل بورڈ نے تصدیق کی کہ جسم پر پائے جانے والے نشانات تشدد سے مطابقت رکھتے ہیں۔',
      },
      nature: 'official_record',
      sourceName: { en: 'Medical Board Report DHA-GUJ-2023-88', ur: 'میڈیکل بورڈ رپورٹ ڈی ایچ اے گوجرانوالہ' },
      date: '2023-10-28',
      verifiedByCourt: true,
    },
  ],
  connectedDocuments: [],
  videoEvidence: [],
  sources: [],
  lastUpdated: '2023-11-10',
  editorialReviewStatus: 'preliminary_documentation',
  incompleteNotice: true,
  unverifiedNotice: false,
  relatedCaseIds: ['PK-IHC-2023-0892'],
  tags: ['Custodial Torture', 'Juvenile Justice Act', 'Gujranwala', 'Police Misconduct', 'Punjab'],
  isDemonstrationData: true,
  featured: false,
};
