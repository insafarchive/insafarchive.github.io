import { LocalizedString } from '../types';

export interface JudgmentItem {
  id: string;
  title: LocalizedString;
  citation: string;
  court: LocalizedString;
  bench: LocalizedString;
  date: string;
  category: 'constitutional' | 'bail' | 'due_process' | 'media_freedom' | 'electoral';
  certified: boolean;
  pagesCount: number;
  summary: LocalizedString;
  operativeExtract: LocalizedString;
  keyPrinciples: LocalizedString[];
  relatedCaseId?: string;
}

export const demonstrationJudgments: JudgmentItem[] = [
  {
    id: 'j-2024-scmr-301',
    title: {
      en: 'In re Fundamental Rights to Free Press & Digital Inquiries',
      ur: 'ازخود نوٹس / آئینی جائزہ: آزادی صحافت و ڈیجیٹل ذرائع ابلاغ',
    },
    citation: '2024 SCMR 301',
    court: {
      en: 'Supreme Court of Pakistan',
      ur: 'سپریم کورٹ آف پاکستان',
    },
    bench: {
      en: 'Three-Member Constitutional Bench (CJP presiding)',
      ur: 'تین رکنی آئینی بینچ (سربراہی چیف جسٹس آف پاکستان)',
    },
    date: '2024-03-12',
    category: 'constitutional',
    certified: true,
    pagesCount: 18,
    summary: {
      en: 'Landmark interim ruling examining the constitutional boundary between lawful cyber investigation and the fundamental guarantee of freedom of expression under Articles 19 and 19-A.',
      ur: 'آئین کے آرٹیکلز 19 اور 19-A کے تحت بنیادی حقوق، صحافتی آزادی اور سائبر کرائم قوانین کی حدود کا تعین کرنے والا تاریخی عبوری فیصلہ۔',
    },
    operativeExtract: {
      en: '“The right to freedom of speech and expression is not a concession granted by the executive but an inalienable constitutional entitlement. Prior restraint on speech or punitive summons directed at investigative reporting must satisfy the tests of statutory necessity and proportionality.”',
      ur: '”آزادی اظہار رائے انتظامیہ کی دی گئی کوئی خیرات نہیں بلکہ ایک ناقابلِ تنسیخ آئینی حق ہے۔ صحافیوں کو حراساں کرنے یا قبل از وقت پابندی عائد کرنے کے اقدامات کو شفافیت اور قانونی ضرورت کے کڑے معیار پر پورا اترنا ہو گا۔“',
    },
    keyPrinciples: [
      {
        en: 'Investigative agencies cannot bypass judicial magistrates when issuing coercive notices to journalists.',
        ur: 'تفتیشی ادارے صحافیوں کو طلب کرنے کے لیے عدالتی مجسٹریٹ کے لازمی طریقہ کار کو نظر انداز نہیں کر سکتے۔',
      },
      {
        en: 'Blanket gag directives violate the proportionality standard required under Article 19.',
        ur: 'عام سنسرشپ اور مکمل پابندی کے احکامات آئین کے آرٹیکل 19 کی روح کے صریح خلاف ہیں۔',
      },
    ],
    relatedCaseId: 'case-const-102-2024',
  },
  {
    id: 'j-pld-2024-lah-115',
    title: {
      en: 'Malik Tariq v. The State (Precedential Bail Principles in Political Protests)',
      ur: 'ملک طارق بنام سرکار (سیاسی احتجاج کے مقدمات میں ضمانت کے بنیادی اصول)',
    },
    citation: 'PLD 2024 Lah 115',
    court: {
      en: 'Lahore High Court',
      ur: 'لاہور ہائی کورٹ',
    },
    bench: {
      en: 'Hon. Justice K. Mahmood',
      ur: 'فاضل جج جناب جسٹس کے۔ محمود',
    },
    date: '2023-12-19',
    category: 'bail',
    certified: true,
    pagesCount: 8,
    summary: {
      en: 'Clarified the scope of Section 497 CrPC, reaffirming that bail is not to be withheld as a measure of pre-trial punishment in political assembly cases.',
      ur: 'ضابطہ فوجداری کی دفعہ 497 کی تفصیلی تشریح؛ قرار دیا گیا کہ سیاسی مقدمات میں ٹرائل سے پہلے شہریوں کو بطور سزا جیل میں رکھنا قانون کے اصولوں کے خلاف ہے۔',
    },
    operativeExtract: {
      en: '“Pre-trial incarceration is an extraordinary deprivation of liberty. Where no weapon recovery or physical harm is attributed directly to an applicant, refusal of bail based on omnibus allegations would defeat the ends of justice.”',
      ur: '”ٹرائل سے قبل قید رکھنا بنیادی آزادی چھیننے کے مترادف ہے۔ جب تک ملزم سے کسی اسلحہ کی برآمدگی یا کسی پر براہِ راست حملے کا ثبوت نہ ہو، عمومی الزامات کی بنیاد پر ضمانت مسترد کرنا انصاف کا قتل ہے۔“',
    },
    keyPrinciples: [
      {
        en: 'Bail is the fundamental rule; custody is the statutory exception.',
        ur: 'ضمانت بنیادی اصول ہے اور قید قانون کا استثنا۔',
      },
      {
        en: 'Section 144 CrPC violation is a bailable offense under Schedule II of Criminal Procedure Code.',
        ur: 'دفعہ 144 کی خلاف ورزی ضابطہ فوجداری کے دوسرے شیڈول کے تحت قابلِ ضمانت جرم ہے۔',
      },
    ],
    relatedCaseId: 'case-crl-451-2023',
  },
  {
    id: 'j-2024-pcrlj-89',
    title: {
      en: 'Zahida Parveen v. IG Police (Jurisprudence on Unlawful Custodial Detention)',
      ur: 'زاہدہ پروین بنام آئی جی پولیس (غیر قانونی حراست اور حبسِ بے جا پر رہنما فیصلہ)',
    },
    citation: '2024 PCrLJ 89',
    court: {
      en: 'Islamabad High Court',
      ur: 'اسلام آباد ہائی کورٹ',
    },
    bench: {
      en: 'Hon. Chief Justice Bench',
      ur: 'فاضل چیف جسٹس بینچ، اسلام آباد ہائی کورٹ',
    },
    date: '2023-10-24',
    category: 'due_process',
    certified: true,
    pagesCount: 14,
    summary: {
      en: 'Affirmed strict procedural requirements under Article 10 of the Constitution: every arrested citizen must be produced before a judicial magistrate within 24 hours, and unrecorded detention constitutes severe constitutional misconduct.',
      ur: 'آئین کے آرٹیکل 10 کے تحت لازمی احکامات کا اعادہ: ہر گرفتار شخص کو 24 گھنٹے میں مجسٹریٹ کے سامنے پیش کرنا لازم ہے، اور لاپتہ کرنا سنگین آئینی جرم ہے۔',
    },
    operativeExtract: {
      en: '“No agency, civil or military, enjoys immunity from the writ of habeas corpus. The sanctuary of constitutional liberty cannot be breached under the guise of classified investigations.”',
      ur: '”کوئی بھی ادارہ حبسِ بے جا کی عدالتی رٹ سے بالاتر نہیں۔ خفیہ تفتیش کی آڑ میں آئین کے دیے گئے تحفظات اور بنیادی آزادی کو پامال نہیں کیا جا سکتا۔“',
    },
    keyPrinciples: [
      {
        en: 'Production before Magistrate within 24 hours is a non-derogable constitutional command.',
        ur: '24 گھنٹوں کے اندر مجسٹریٹ کے روبرو پیشی ایک ناقابلِ سمجھوتہ آئینی تقاضا ہے۔',
      },
      {
        en: 'Official concealment of citizen custody entails direct personal civil and criminal liability for arresting officers.',
        ur: 'حراست چھپانے پر متعلقہ افسران کی ذاتی فوجداری اور محکمانہ جوابدہی ہو گی۔',
      },
    ],
    relatedCaseId: 'case-wp-892-2023',
  },
  {
    id: 'j-2024-cld-218',
    title: {
      en: 'State v. Shahid Akram (Standards of Proof in Statutory Anti-Corruption Trials)',
      ur: 'سرکار بنام شاہد اکرم (اینٹی کرپشن مقدمات میں قانونی ثبوت کے لازمی تقاضے)',
    },
    citation: '2024 CLD 218',
    court: {
      en: 'Special Court (Anti-Corruption), Karachi',
      ur: 'خصوصی عدالت (اینٹی کرپشن)، کراچی',
    },
    bench: {
      en: 'Special Judge (Anti-Corruption)',
      ur: 'خصوصی جج (اینٹی کرپشن)',
    },
    date: '2024-01-15',
    category: 'due_process',
    certified: true,
    pagesCount: 16,
    summary: {
      en: 'Detailed jurisprudence on Section 249-A CrPC acquittal: prosecution must present primary verified financial trails, and suspicion alone cannot substitute for statutory proof beyond reasonable doubt.',
      ur: 'دفعہ 249-A ضابطہ فوجداری کے تحت بریت پر اہم فیصلہ: استغاثہ کو ٹھوس مالیاتی ثبوت پیش کرنا ہوں گے، محض شبہ شک سے بالا تر ثبوت کا نعم البدل نہیں ہو سکتا۔',
    },
    operativeExtract: {
      en: '“Suspicion, however grave, cannot take the place of legal proof. The presumption of innocence is the golden thread running through the fabric of criminal jurisprudence.”',
      ur: '”شبہ کتنا ہی گہرا کیوں نہ ہو، کبھی بھی قانونی ثبوت کا متبادل نہیں بن سکتا۔ ملزم کی بے گناہی کا مفروضہ فوجداری قانون کا سنہری اصول ہے۔“',
    },
    keyPrinciples: [
      {
        en: 'Presumption of innocence remains unbroken unless rebuttal is established beyond reasonable doubt.',
        ur: 'ملزم کی بے گناہی کا مفروضہ اس وقت تک برقرار رہتا ہے جب تک شک سے بالاتر ثبوت نہ دیا جائے۔',
      },
    ],
    relatedCaseId: 'case-spl-19-2022',
  },
];
