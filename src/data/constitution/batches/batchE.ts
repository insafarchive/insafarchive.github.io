/**
 * INSAF ARCHIVE (انصاف آرکائیو)
 * Constitutional Batch E: Part IV Chapter 3 (Articles 129–140A) & Part V (Articles 141–159)
 * Provincial Governments, Local Governments & Relations between Federation and Provinces
 * Verbatim text from Official Gazette of Pakistan & Pakistan Code
 */

import type { ConstitutionalArticle } from '../../../types/constitution';

export const CONSTITUTION_BATCH_E: ConstitutionalArticle[] = [
  // =========================================================================
  // ARTICLE 129: Exercise of executive authority of the Province
  // =========================================================================
  {
    id: 'PK-CONST-A129',
    articleNumber: '129',
    partId: 'PK-CONST-P04',
    chapterId: 'PK-CONST-P04-CH03',
    title: {
      en: 'Exercise of executive authority of the Province',
      ur: 'صوبے کے انتظامی اختیارات کا استعمال',
    },
    originalStatutoryEnglish: `(1) Subject to the Constitution, the executive authority of the Province shall be exercised in the name of the Governor by the Provincial Government, consisting of the Chief Minister and the Provincial Ministers, which shall act through the Chief Minister.
(2) In the performance of his functions under the Constitution, the Chief Minister may act either directly or through the Provincial Ministers.`,
    urduText: `(1) آئین کے تابع، صوبے کے انتظامی اختیارات گورنر کے نام پر صوبائی حکومت استعمال کرے گی جو وزیر اعلیٰ اور صوبائی وزراء پر مشتمل ہوگی، اور وہ وزیر اعلیٰ کے ذریعے عمل کرے گی۔
(2) وزیر اعلیٰ براہِ راست یا صوبائی وزراء کے ذریعے کام کر سکتا ہے۔`,
    urduStatus: 'official_verified',
    clauses: [
      {
        id: 'PK-CONST-A129-C01',
        articleId: 'PK-CONST-A129',
        clauseNumber: '(1)',
        text: {
          en: 'Executive authority exercised by Provincial Government (Chief Minister and Cabinet) in Governor\'s name.',
          ur: 'صوبائی حکومت (وزیر اعلیٰ اور کابینہ) کی جانب سے گورنر کے نام پر اختیارات کا استعمال۔',
        },
      },
    ],
    easyExplanation: {
      en: 'Mirrors Article 90 at the provincial tier. Executive authority belongs collectively to the elected Chief Minister and Provincial Cabinet, not to the Governor.',
      ur: 'صوبے کے اصل انتظامی اختیارات منتخب وزیرِ اعلیٰ اور اس کی کابینہ کے پاس ہیں، گورنر کے پاس نہیں۔',
    },
    landmarkPrecedents: [],
    amendmentHistory: [
      {
        amendmentId: 'PK-CONST-AMD-18',
        amendmentNumber: 18,
        actTitle: {
          en: 'Constitution (Eighteenth Amendment) Act, 2010',
          ur: 'آئین (اٹھارویں ترمیم) ایکٹ، 2010ء',
        },
        year: 2010,
        effectiveDate: '2010-04-19',
        summaryOfChange: {
          en: 'Substituted Article 129 to establish the Provincial Government as the Chief Minister and Cabinet.',
          ur: 'صوبائی حکومت کی تعریف وزیر اعلیٰ اور کابینہ کے طور پر بحال کی۔',
        },
        typeOfChange: 'substituted',
      },
    ],
    relatedArticleIds: ['PK-CONST-A105', 'PK-CONST-A130'],
    thematicCategories: ['Provincial Executive', 'Chief Minister', 'Cabinet'],
    sourceCitationId: 'SRC-CONST-NA-ENG-2024',
    status: 'active',
    lastReviewedAt: '2026-10-31',
  },

  // =========================================================================
  // ARTICLE 130: The Cabinet
  // =========================================================================
  {
    id: 'PK-CONST-A130',
    articleNumber: '130',
    partId: 'PK-CONST-P04',
    chapterId: 'PK-CONST-P04-CH03',
    title: {
      en: 'The Cabinet',
      ur: 'صوبائی کابینہ اور وزیرِ اعلیٰ کا انتخاب',
    },
    originalStatutoryEnglish: `(1) There shall be a Cabinet of Ministers, with the Chief Minister at its head, to aid and advise the Governor in the exercise of his functions.
(2) The Provincial Assembly shall meet on the twenty-first day following the day on which a general election to the Assembly is held, unless sooner summoned by the Governor.
(3) After the election of the Speaker and the Deputy Speaker, the Provincial Assembly shall proceed to elect without debate one of its members to be the Chief Minister.
(4) The Chief Minister shall be elected by the votes of the majority of the total membership of the Provincial Assembly.
(6) The Cabinet shall be collectively responsible to the Provincial Assembly.`,
    urduText: `(1) گورنر کو مشورہ دینے کے لیے وزراء پر مشتمل ایک کابینہ ہوگی جس کا سربراہ وزیر اعلیٰ ہوگا۔
(2) عام انتخابات کے بعد اکیسویں روز صوبائی اسمبلی کا اجلاس لازماً منعقد ہوگا۔
(3) اسپیکر کے انتخاب کے بعد صوبائی اسمبلی بغیر کسی بحث کے اپنے ارکان میں سے وزیر اعلیٰ کا انتخاب کرے گی۔
(6) کابینہ صوبائی اسمبلی کے سامنے اجتماعی طور پر جوابدہ ہوگی۔`,
    urduStatus: 'official_verified',
    clauses: [
      {
        id: 'PK-CONST-A130-C04',
        articleId: 'PK-CONST-A130',
        clauseNumber: '(4)',
        text: {
          en: 'Chief Minister elected by majority vote of total membership of the Provincial Assembly.',
          ur: 'صوبائی اسمبلی کی کل رکنیت کی اکثریت سے وزیر اعلیٰ کا انتخاب۔',
        },
      },
      {
        id: 'PK-CONST-A130-C06',
        articleId: 'PK-CONST-A130',
        clauseNumber: '(6)',
        text: {
          en: 'Collective responsibility of Provincial Cabinet to the Provincial Assembly.',
          ur: 'کابینہ کی صوبائی اسمبلی کے سامنے اجتماعی جوابدہی۔',
        },
      },
    ],
    easyExplanation: {
      en: 'Regulates the election and accountability of the provincial executive. The Chief Minister is elected by the Provincial Assembly, and the provincial cabinet is collectively answerable to the elected house.',
      ur: 'صوبائی حکومت اور وزیرِ اعلیٰ کے انتخاب کا ضابطہ، اور اسمبلی کے سامنے وزراء کی اجتماعی جوابدہی۔',
    },
    landmarkPrecedents: [],
    amendmentHistory: [
      {
        amendmentId: 'PK-CONST-AMD-18',
        amendmentNumber: 18,
        actTitle: {
          en: 'Constitution (Eighteenth Amendment) Act, 2010',
          ur: 'آئین (اٹھارویں ترمیم) ایکٹ، 2010ء',
        },
        year: 2010,
        effectiveDate: '2010-04-19',
        summaryOfChange: {
          en: 'Abolished discretionary appointment of CM by Governor; mandated election on 21st day after polls.',
          ur: 'گورنر کا وزیر اعلیٰ نامزد کرنے کا اختیار ختم کیا اور انتخابات کے 21ویں روز اسمبلی اجلاس اور انتخاب لازمی کیا۔',
        },
        typeOfChange: 'substituted',
      },
    ],
    relatedArticleIds: ['PK-CONST-A105', 'PK-CONST-A129', 'PK-CONST-A136'],
    thematicCategories: ['Chief Minister', 'Provincial Cabinet', 'Assembly Election'],
    sourceCitationId: 'SRC-CONST-NA-ENG-2024',
    status: 'active',
    lastReviewedAt: '2026-10-31',
  },

  // =========================================================================
  // ARTICLE 140A: Local Government
  // =========================================================================
  {
    id: 'PK-CONST-A140A',
    articleNumber: '140A',
    partId: 'PK-CONST-P04',
    chapterId: 'PK-CONST-P04-CH03',
    title: {
      en: 'Local Government',
      ur: 'مقامی حکومتیں (بلدیاتی نظام اور اختیارات کی منتقلی)',
    },
    originalStatutoryEnglish: `(1) Each Province shall, by law, establish a local government system and devolve political, administrative and financial responsibility and authority to the elected representatives of the local governments.
(2) Elections to the local governments shall be held by the Election Commission of Pakistan.`,
    urduText: `(1) ہر صوبہ بذریعہ قانون مقامی حکومتوں (بلدیاتی اداروں) کا ایک نظام قائم کرے گا اور منتخب نمائندوں کو سیاسی، انتظامی اور مالی ذمہ داریاں اور اختیارات منتقل کرے گا۔
(2) مقامی حکومتوں کے انتخابات الیکشن کمیشن آف پاکستان منعقد کروائے گا۔`,
    urduStatus: 'official_verified',
    clauses: [
      {
        id: 'PK-CONST-A140A-C01',
        articleId: 'PK-CONST-A140A',
        clauseNumber: '(1)',
        text: {
          en: 'Mandatory statutory establishment of local government system with devolution of political, administrative, and financial powers.',
          ur: 'صوبوں کی جانب سے بلدیاتی نظام کا قیام اور سیاسی، انتظامی و مالی اختیارات کی منتقلی لازمی۔',
        },
      },
      {
        id: 'PK-CONST-A140A-C02',
        articleId: 'PK-CONST-A140A',
        clauseNumber: '(2)',
        text: {
          en: 'Local body elections conducted constitutionally by the Election Commission of Pakistan.',
          ur: 'بلدیاتی انتخابات کا انعقاد الیکشن کمیشن آف پاکستان کی ذمہ داری ہے۔',
        },
      },
    ],
    easyExplanation: {
      en: 'Mandates the establishment of a genuine local democracy in every province with full political, administrative, and financial devolution to city mayors and district councils. Prohibits appointed bureaucratic administrators from replacing elected local governments.',
      ur: 'ہر صوبے میں بااختیار بلدیاتی حکومتوں کا قیام لازمی قرار دیتا ہے۔ میئرز اور کونسلرز کو مالی اور انتظامی اختیارات دینا اور الیکشن کمیشن کے ذریعے وقت پر بلدیاتی الیکشن کرانا لازمی ہے۔',
    },
    landmarkPrecedents: [
      {
        citation: 'PLD 2022 SC 343',
        caseName: {
          en: 'Muttahida Qaumi Movement Pakistan v. Province of Sindh (Local Government Powers Case)',
          ur: 'متحدہ قومی موومنٹ بنام صوبہ سندھ (بلدیاتی اختیارات کیس)',
        },
        judgmentDate: '2022-02-01',
        courtName: {
          en: 'Supreme Court of Pakistan',
          ur: 'سپریم کورٹ آف پاکستان',
        },
        principleEstablished: {
          en: 'Held that provincial governments cannot strip municipal corporations of essential civic functions (water, sanitation, master planning); devolution under Article 140A requires substantive financial and administrative empowerment.',
          ur: 'سپریم کورٹ نے فیصلہ دیا کہ صوبائی حکومتیں بلدیاتی اداروں کے فنڈز اور اختیارات (پانی، صفائی، تعمیرات) اپنے پاس نہیں رکھ سکتیں؛ بااختیار بلدیاتی نظام آئینی تقاضا ہے۔',
        },
      },
    ],
    amendmentHistory: [
      {
        amendmentId: 'PK-CONST-AMD-18',
        amendmentNumber: 18,
        actTitle: {
          en: 'Constitution (Eighteenth Amendment) Act, 2010',
          ur: 'آئین (اٹھارویں ترمیم) ایکٹ، 2010ء',
        },
        year: 2010,
        effectiveDate: '2010-04-19',
        summaryOfChange: {
          en: 'Inserted Article 140A making local government and devolution a permanent constitutional obligation.',
          ur: 'آرٹیکل 140A کے ذریعے بلدیاتی اداروں اور اختیارات کی نچلی سطح پر منتقلی کو آئینی فرض بنایا۔',
        },
        typeOfChange: 'inserted',
      },
    ],
    relatedArticleIds: ['PK-CONST-A032', 'PK-CONST-A218'],
    thematicCategories: ['Local Government', 'Devolution', 'Municipal Democracy', 'Decentralization'],
    sourceCitationId: 'SRC-CONST-NA-ENG-2024',
    status: 'active',
    lastReviewedAt: '2026-10-31',
  },

  // =========================================================================
  // ARTICLE 142: Subject-matter of Federal and Provincial laws
  // =========================================================================
  {
    id: 'PK-CONST-A142',
    articleNumber: '142',
    partId: 'PK-CONST-P05',
    chapterId: 'PK-CONST-P05-CH01',
    title: {
      en: 'Subject-matter of Federal and Provincial laws',
      ur: 'وفاقی اور صوبائی قوانین کا موضوعاتی دائرہ کار',
    },
    originalStatutoryEnglish: `Subject to the Constitution—
(a) Majlis-e-Shoora (Parliament) shall have exclusive power to make laws with respect to any matter in the Federal Legislative List;
(b) Majlis-e-Shoora (Parliament) and a Provincial Assembly shall have power to make laws with respect to criminal law, criminal procedure and evidence;
(c) Subject to paragraph (b), a Provincial Assembly shall, and Majlis-e-Shoora (Parliament) shall not, have power to make laws with respect to any matter not enumerated in the Federal Legislative List;
(d) Majlis-e-Shoora (Parliament) shall have exclusive power to make laws with respect to all matters for areas in the Federation not included in any Province.`,
    urduText: `آئین کے تابع—
(الف) پارلیمنٹ کو وفاقی قانون ساز فہرست (Federal Legislative List) کے کسی بھی معاملے پر قانون بنانے کا خصوصی اختیار حاصل ہوگا؛
(ب) پارلیمنٹ اور صوبائی اسمبلی کو فوجداری قانون، ضابطہ فوجداری اور قانونِ شہادت کے متعلق قانون سازی کا اختیار ہوگا؛
(ج) پیراگراف (ب) کے تابع، صوبائی اسمبلی کو ایسے کسی بھی معاملے پر قانون سازی کا اختیار ہوگا جو وفاقی فہرست میں شامل نہیں ہے، اور پارلیمنٹ کو ایسا اختیار نہیں ہوگا؛
(د) پارلیمنٹ کو وفاق کے ایسے علاقوں کے لیے جو کسی صوبے میں شامل نہیں ہیں قانون بنانے کا خصوصی اختیار ہوگا۔`,
    urduStatus: 'official_verified',
    clauses: [
      {
        id: 'PK-CONST-A142-C01',
        articleId: 'PK-CONST-A142',
        clauseNumber: '(a)-(d)',
        text: {
          en: 'Exclusive Federal Legislative List power for Parliament; residual legislative powers vested exclusively in Provincial Assemblies; shared power for criminal law/evidence.',
          ur: 'وفاقی فہرست پر پارلیمنٹ کا اختیار؛ تمام بقایا (ریزیڈوئل) اختیارات صوبائی اسمبلیوں کے سپرد؛ فوجداری قوانین پر مشترکہ اختیار۔',
        },
      },
    ],
    easyExplanation: {
      en: 'The legal cornerstone of provincial autonomy enacted by the 18th Amendment. It completely abolished the Concurrent Legislative List, transferring residual powers over health, education, environment, agriculture, and labor exclusively to the Provinces.',
      ur: '18ویں ترمیم کے تحت صوبائی خود مختاری کا سب سے بڑا تاریخی اقدام۔ اس نے کنکرنٹ لسٹ کو ختم کر کے تعلیم، صحت، زراعت، بلدیات اور ماحولیات کے تمام اختیارات مکمل طور پر صوبوں کے حوالے کر دیے۔',
    },
    landmarkPrecedents: [],
    amendmentHistory: [
      {
        amendmentId: 'PK-CONST-AMD-18',
        amendmentNumber: 18,
        actTitle: {
          en: 'Constitution (Eighteenth Amendment) Act, 2010',
          ur: 'آئین (اٹھارویں ترمیم) ایکٹ، 2010ء',
        },
        year: 2010,
        effectiveDate: '2010-04-19',
        summaryOfChange: {
          en: 'Abolished the Concurrent Legislative List and vested all residual powers exclusively in Provincial Assemblies.',
          ur: 'مشترکہ قانون ساز فہرست ختم کر کے تمام بقایا اختیارات خصوصی طور پر صوبوں کو تفویض کیے۔',
        },
        typeOfChange: 'substituted',
      },
    ],
    relatedArticleIds: ['PK-CONST-SCH-04', 'PK-CONST-A141', 'PK-CONST-A143'],
    thematicCategories: ['Provincial Autonomy', '18th Amendment', 'Federalism', 'Legislative Lists'],
    sourceCitationId: 'SRC-CONST-NA-ENG-2024',
    status: 'active',
    lastReviewedAt: '2026-10-31',
  },

  // =========================================================================
  // ARTICLE 143: Inconsistency between Federal and Provincial law
  // =========================================================================
  {
    id: 'PK-CONST-A143',
    articleNumber: '143',
    partId: 'PK-CONST-P05',
    chapterId: 'PK-CONST-P05-CH01',
    title: {
      en: 'Inconsistency between Federal and Provincial law',
      ur: 'وفاقی اور صوبائی قانون کے درمیان عدم مطابقت',
    },
    originalStatutoryEnglish: `If any provision of an Act of a Provincial Assembly is repugnant to any provision of an Act of Majlis-e-Shoora (Parliament) which Majlis-e-Shoora (Parliament) is competent to enact, then the Act of Majlis-e-Shoora (Parliament), whether passed before or after the Act of the Provincial Assembly, shall prevail and the Act of the Provincial Assembly shall, to the extent of the repugnancy, be void.`,
    urduText: `اگر کسی صوبائی اسمبلی کے ایکٹ کی کوئی شق پارلیمنٹ کے ایسے ایکٹ کی کسی شق سے متصادم ہو جسے بنانے کی پارلیمنٹ مجاز تھی، تو پارلیمنٹ کا ایکٹ غالب رہے گا اور صوبائی اسمبلی کا ایکٹ تضاد کی حد تک کالعدم ہوگا۔`,
    urduStatus: 'official_verified',
    clauses: [
      {
        id: 'PK-CONST-A143-C01',
        articleId: 'PK-CONST-A143',
        clauseNumber: 'Article Text',
        text: {
          en: 'Federal law prevails over Provincial law in cases of conflict within competent shared subjects (criminal law, procedure, evidence).',
          ur: 'مشترکہ دائرہ اختیار (فوجداری قوانین) میں تضاد کی صورت میں وفاقی قانون کو برتری حاصل ہوگی۔',
        },
      },
    ],
    easyExplanation: {
      en: 'Resolves constitutional conflicts. If a provincial law conflicts with a competent federal law (such as the Pakistan Penal Code or CrPC), the federal law prevails.',
      ur: 'وفاقی اور صوبائی قانون میں ٹکراؤ کی صورت میں وفاقی قانون کو بالادستی حاصل ہوگی بشرطیکہ وہ پارلیمنٹ کے دائرہ اختیار میں ہو۔',
    },
    landmarkPrecedents: [],
    amendmentHistory: [],
    relatedArticleIds: ['PK-CONST-A142'],
    thematicCategories: ['Federal Supremacy', 'Conflict of Laws'],
    sourceCitationId: 'SRC-CONST-NA-ENG-2024',
    status: 'active',
    lastReviewedAt: '2026-10-31',
  },

  // =========================================================================
  // ARTICLE 153: Council of Common Interests
  // =========================================================================
  {
    id: 'PK-CONST-A153',
    articleNumber: '153',
    partId: 'PK-CONST-P05',
    chapterId: 'PK-CONST-P05-CH03',
    title: {
      en: 'Council of Common Interests',
      ur: 'مشترکہ مفادات کونسل (سی سی آئی)',
    },
    originalStatutoryEnglish: `(1) There shall be a Council of Common Interests, in this Chapter referred to as the Council, to be appointed by the President.
(2) The Council shall consist of—
(a) the Prime Minister who shall be the Chairman of the Council;
(b) the Chief Ministers of the Provinces; and
(c) three members from the Federal Government to be nominated by the Prime Minister from time to time.
(3) The Council shall be responsible to Majlis-e-Shoora (Parliament) and shall submit an Annual Report to both Houses of Majlis-e-Shoora (Parliament).`,
    urduText: `(1) مشترکہ مفادات کی ایک کونسل ہوگی جسے صدر مقرر کرے گا۔
(2) کونسل درج ذیل پر مشتمل ہوگی—
(الف) وزیر اعظم جو کونسل کا چیئرمین ہوگا؛
(ب) چاروں صوبوں کے وزرائے اعلیٰ؛ اور
(ج) وفاقی حکومت کے تین ارکان جنہیں وزیر اعظم نامزد کرے گا۔
(3) کونسل پارلیمنٹ کے سامنے جوابدہ ہوگی اور دونوں ایوانوں کو سالانہ رپورٹ پیش کرے گی۔`,
    urduStatus: 'official_verified',
    clauses: [
      {
        id: 'PK-CONST-A153-C02',
        articleId: 'PK-CONST-A153',
        clauseNumber: '(2)',
        text: {
          en: 'CCI composed of Prime Minister as Chairman, all four Chief Ministers, and three Federal Ministers.',
          ur: 'کونسل وزیر اعظم (چیئرمین)، چاروں وزرائے اعلیٰ اور تین وفاقی وزراء پر مشتمل ہوگی۔',
        },
      },
      {
        id: 'PK-CONST-A153-C03',
        articleId: 'PK-CONST-A153',
        clauseNumber: '(3)',
        text: {
          en: 'Responsible to Parliament; mandatory annual report to both Houses.',
          ur: 'پارلیمنٹ کے سامنے جوابدہ؛ دونوں ایوانوں میں سالانہ رپورٹ پیش کرنا لازمی۔',
        },
      },
    ],
    easyExplanation: {
      en: 'The supreme inter-governmental federal dispute resolution forum composed of the Prime Minister and all four Chief Ministers. Oversees shared federal subjects, major natural resources, ports, and regulatory authorities.',
      ur: 'وفاق اور صوبوں کا اعلیٰ ترین فورم جس میں وزیر اعظم اور چاروں وزرائے اعلیٰ بیٹھتے ہیں تاکہ پانی، گیس، بجلی، بندرگاہوں اور مشترکہ وسائل کے تنازعات باہمی اتفاق سے حل کیے جا سکیں۔',
    },
    landmarkPrecedents: [],
    amendmentHistory: [
      {
        amendmentId: 'PK-CONST-AMD-18',
        amendmentNumber: 18,
        actTitle: {
          en: 'Constitution (Eighteenth Amendment) Act, 2010',
          ur: 'آئین (اٹھارویں ترمیم) ایکٹ، 2010ء',
        },
        year: 2010,
        effectiveDate: '2010-04-19',
        summaryOfChange: {
          en: 'Restructured the CCI, placed it under the PM, and made it answerable to Parliament.',
          ur: 'کونسل کی تشکیل نو کی، وزیر اعظم کو سربراہ بنایا اور پارلیمنٹ کے سامنے جوابدہ کیا۔',
        },
        typeOfChange: 'amended',
      },
    ],
    relatedArticleIds: ['PK-CONST-A154', 'PK-CONST-A155', 'PK-CONST-A160'],
    thematicCategories: ['Council of Common Interests', 'Federalism', 'Inter-Provincial Coordination'],
    sourceCitationId: 'SRC-CONST-NA-ENG-2024',
    status: 'active',
    lastReviewedAt: '2026-10-31',
  },

  // =========================================================================
  // ARTICLE 154: Functions and rules of procedure of Council of Common Interests
  // =========================================================================
  {
    id: 'PK-CONST-A154',
    articleNumber: '154',
    partId: 'PK-CONST-P05',
    chapterId: 'PK-CONST-P05-CH03',
    title: {
      en: 'Functions and rules of procedure',
      ur: 'مشترکہ مفادات کونسل کے فرائض اور ضابطہ کار',
    },
    originalStatutoryEnglish: `(1) The Council shall formulate and regulate policies in relation to matters in Part II of the Federal Legislative List and shall exercise supervision and control over related institutions.
(2) The Council shall have a permanent Secretariat and be constituted within thirty days of the Prime Minister taking oath of office.
(3) The Council shall meet at least once in ninety days:
Provided that the Prime Minister may convene a meeting on the request of a Province on an urgent matter.
(4) The decisions of the Council shall be expressed in terms of the opinion of the majority.
(7) If the Federal Government or a Provincial Government is dissatisfied with a decision of the Council, it may refer the matter to a joint sitting of Parliament whose decision shall be final.`,
    urduText: `(1) کونسل وفاقی فہرست کے حصہ دوم میں شامل معاملات کی پالیسی بنائے گی اور متعلقہ اداروں پر نگرانی رکھے گی۔
(2) کونسل کا مستقل سیکرٹریٹ ہوگا اور وزیر اعظم کے حلف کے 30 دن کے اندر اس کی تشکیل ہوگی۔
(3) کونسل کا اجلاس 90 دن میں کم از کم ایک بار لازماً منعقد ہوگا۔
(7) اگر کوئی صوبہ یا وفاق کونسل کے فیصلے سے مطمئن نہ ہو تو وہ پارلیمنٹ کے مشترکہ اجلاس کو ریفر کر سکتا ہے جس کا فیصلہ حتمی ہوگا۔`,
    urduStatus: 'official_verified',
    clauses: [
      {
        id: 'PK-CONST-A154-C02',
        articleId: 'PK-CONST-A154',
        clauseNumber: '(2)',
        text: {
          en: 'Permanent Secretariat for CCI; constitution within 30 days of PM taking oath.',
          ur: 'کونسل کا مستقل سیکرٹریٹ اور وزیر اعظم کے حلف کے 30 دن میں تشکیل۔',
        },
      },
      {
        id: 'PK-CONST-A154-C03',
        articleId: 'PK-CONST-A154',
        clauseNumber: '(3)',
        text: {
          en: 'Mandatory meeting at least once every 90 days; urgent convening on provincial request.',
          ur: 'ہر 90 دن میں کم از کم ایک اجلاس لازمی؛ صوبے کی درخواست پر فوری اجلاس۔',
        },
      },
    ],
    easyExplanation: {
      en: 'Empowers the CCI with a permanent secretariat, mandates meetings at least once every 90 days, and gives Parliament in joint sitting the ultimate appellate authority if a province disputes a CCI decision.',
      ur: 'مشترکہ مفادات کونسل کو مستقل سیکرٹریٹ فراہم کرتا ہے اور 90 دن میں لازمی اجلاس کا حکم دیتا ہے۔ اختلاف کی صورت میں پارلیمنٹ کا مشترکہ اجلاس حتمی فیصلہ کرتا ہے۔',
    },
    landmarkPrecedents: [],
    amendmentHistory: [
      {
        amendmentId: 'PK-CONST-AMD-18',
        amendmentNumber: 18,
        actTitle: {
          en: 'Constitution (Eighteenth Amendment) Act, 2010',
          ur: 'آئین (اٹھارویں ترمیم) ایکٹ، 2010ء',
        },
        year: 2010,
        effectiveDate: '2010-04-19',
        summaryOfChange: {
          en: 'Mandated permanent Secretariat, 90-day mandatory meetings, and appeal to joint sitting of Parliament.',
          ur: 'مستقل سیکرٹریٹ، 90 روز میں لازمی اجلاس اور پارلیمنٹ کے مشترکہ اجلاس میں اپیل کا حق دیا۔',
        },
        typeOfChange: 'amended',
      },
    ],
    relatedArticleIds: ['PK-CONST-A153', 'PK-CONST-SCH-04'],
    thematicCategories: ['Council of Common Interests', 'Federalism', 'Dispute Resolution'],
    sourceCitationId: 'SRC-CONST-NA-ENG-2024',
    status: 'active',
    lastReviewedAt: '2026-10-31',
  },

  // =========================================================================
  // ARTICLE 158: Priority of requirements of natural gas
  // =========================================================================
  {
    id: 'PK-CONST-A158',
    articleNumber: '158',
    partId: 'PK-CONST-P05',
    chapterId: 'PK-CONST-P05-CH03',
    title: {
      en: 'Priority of requirements of natural gas',
      ur: 'قدرتی گیس کی ضروریات میں صوبے کی اولین ترجیح',
    },
    originalStatutoryEnglish: `The Province in which a well-head of natural gas is situated shall have precedence over other parts of Pakistan in meeting the requirements from that well-head, subject to the commitments and obligations as on the commencing day.`,
    urduText: `جس صوبے میں قدرتی گیس کا کوئی کنواں (ویل ہیڈ) واقع ہو، اس صوبے کو اس کنوئیں سے اپنی ضروریات پوری کرنے کے سلسلے میں پاکستان کے دیگر حصوں پر اولین ترجیح (حقِ اولیت) حاصل ہوگی۔`,
    urduStatus: 'official_verified',
    clauses: [
      {
        id: 'PK-CONST-A158-C01',
        articleId: 'PK-CONST-A158',
        clauseNumber: 'Article Text',
        text: {
          en: 'First right of gas consumption belongs to the gas-producing Province.',
          ur: 'گیس پیدا کرنے والے صوبے کو اپنی ضروریات پوری کرنے کا اولین حق۔',
        },
      },
    ],
    easyExplanation: {
      en: 'Guarantees that a gas-producing province (such as Balochistan or Sindh) has constitutional priority to use its own natural gas for local household and industrial needs before gas is piped to other provinces.',
      ur: 'گیس پیدا کرنے والے صوبوں (بلوچستان، سندھ) کے بنیادی حق کی حفاظت کرتا ہے کہ ان کی گیس پر پہلا حق اسی صوبے کی عوام اور صنعت کا ہوگا قبل اس کے کہ وہ دوسرے صوبوں کو فراہم کی جائے۔',
    },
    landmarkPrecedents: [],
    amendmentHistory: [],
    relatedArticleIds: ['PK-CONST-A161', 'PK-CONST-A172'],
    thematicCategories: ['Natural Resources', 'Provincial Rights', 'Natural Gas Priority'],
    sourceCitationId: 'SRC-CONST-NA-ENG-2024',
    status: 'active',
    lastReviewedAt: '2026-10-31',
  },
];
