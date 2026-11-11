/**
 * INSAF ARCHIVE (انصاف آرکائیو)
 * Constitutional Batch D: Part III Chapter 3 (Articles 90–100) & Part IV Chapters 1 & 2 (Articles 101–128)
 * The Federal Government, Provincial Governors & Provincial Assemblies
 * Verbatim text from Official Gazette of Pakistan & Pakistan Code
 */

import type { ConstitutionalArticle } from '../../../types/constitution';

export const CONSTITUTION_BATCH_D: ConstitutionalArticle[] = [
  // =========================================================================
  // ARTICLE 90: Exercise of executive authority of the Federation
  // =========================================================================
  {
    id: 'PK-CONST-A090',
    articleNumber: '90',
    partId: 'PK-CONST-P03',
    chapterId: 'PK-CONST-P03-CH03',
    title: {
      en: 'Exercise of executive authority of the Federation',
      ur: 'وفاق کے انتظامی اختیارات کا استعمال',
    },
    originalStatutoryEnglish: `(1) Subject to the Constitution, the executive authority of the Federation shall be exercised in the name of the President by the Federal Government, consisting of the Prime Minister and the Federal Ministers, which shall act through the Prime Minister, who shall be the chief executive of the Federation.
(2) In the performance of his functions under the Constitution, the Prime Minister may act either directly or through the Federal Ministers.`,
    urduText: `(1) آئین کے تابع، وفاق کے انتظامی اختیارات صدر کے نام پر وفاقی حکومت استعمال کرے گی، جو وزیر اعظم اور وفاقی وزراء پر مشتمل ہوگی، اور وہ وزیر اعظم کے ذریعے عمل کرے گی جو وفاق کا چیف ایگزیکٹو ہوگا۔
(2) آئین کے تحت اپنے فرائض کی انجام دہی میں وزیر اعظم براہ راست یا وفاقی وزراء کے ذریعے کام کر سکتا ہے۔`,
    urduStatus: 'official_verified',
    clauses: [
      {
        id: 'PK-CONST-A090-C01',
        articleId: 'PK-CONST-A090',
        clauseNumber: '(1)',
        text: {
          en: 'Executive authority exercised in President\'s name by Federal Government consisting of PM and Federal Ministers; Prime Minister is chief executive.',
          ur: 'وفاقی حکومت (وزیر اعظم اور کابینہ) کی جانب سے صدر کے نام پر اختیارات کا استعمال؛ وزیر اعظم چیف ایگزیکٹو ہے۔',
        },
      },
    ],
    easyExplanation: {
      en: 'Defines the Prime Minister as the supreme Chief Executive of the Federation. Executive power belongs to the collective Federal Cabinet led by the Prime Minister, not to the President individually.',
      ur: 'وزیر اعظم کو وفاق کا چیف ایگزیکٹو قرار دیتا ہے۔ وفاق کا اصل انتظامی اختیار صدر کے پاس نہیں بلکہ منتخب وزیرِ اعظم اور اس کی کابینہ کے پاس ہوتا ہے۔',
    },
    landmarkPrecedents: [
      {
        citation: 'PLD 2016 SC 808',
        caseName: {
          en: 'Mustafa Impex v. The Government of Pakistan',
          ur: 'مصطفیٰ امپیکس بنام حکومتِ پاکستان',
        },
        judgmentDate: '2016-08-18',
        courtName: {
          en: 'Supreme Court of Pakistan',
          ur: 'سپریم کورٹ آف پاکستان',
        },
        principleEstablished: {
          en: 'Held that neither the Prime Minister alone nor an individual Minister constitutes the Federal Government. "Federal Government" means the collective Cabinet; any unilateral decision by the PM without prior Cabinet approval is null and void.',
          ur: 'سپریم کورٹ نے فیصلہ دیا کہ اکیلا وزیر اعظم وفاقی حکومت نہیں ہے؛ وفاقی حکومت سے مراد پوری کابینہ ہے اور کابینہ کی منظوری کے بغیر وزیر اعظم کا یکطرفہ فیصلہ قانونی طور پر کالعدم ہے۔',
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
          en: 'Explicitly defined the Prime Minister as the Chief Executive of the Federation and reconstituted the Federal Government as the PM and Cabinet.',
          ur: 'وزیر اعظم کو باضابطہ طور پر چیف ایگزیکٹو نامزد کیا اور وفاقی حکومت کو وزیر اعظم اور کابینہ کے مجموعے کے طور پر بحال کیا۔',
        },
        typeOfChange: 'substituted',
      },
    ],
    relatedArticleIds: ['PK-CONST-A048', 'PK-CONST-A091', 'PK-CONST-A099'],
    thematicCategories: ['Executive Power', 'Chief Executive', 'Cabinet Responsibility'],
    sourceCitationId: 'SRC-CONST-NA-ENG-2024',
    status: 'active',
    lastReviewedAt: '2026-10-31',
  },

  // =========================================================================
  // ARTICLE 91: The Cabinet
  // =========================================================================
  {
    id: 'PK-CONST-A091',
    articleNumber: '91',
    partId: 'PK-CONST-P03',
    chapterId: 'PK-CONST-P03-CH03',
    title: {
      en: 'The Cabinet',
      ur: 'کابینہ اور وزیرِ اعظم کا انتخاب',
    },
    originalStatutoryEnglish: `(1) There shall be a Cabinet of Ministers, with the Prime Minister at its head, to aid and advise the President in the exercise of his functions.
(2) The National Assembly shall meet on the twenty-first day following the day on which a general election to the Assembly is held, unless sooner summoned by the President.
(3) After the election of the Speaker and the Deputy Speaker, the National Assembly shall, to the exclusion of any other business, proceed to elect without debate one of its Muslim members to be the Prime Minister.
(4) The Prime Minister shall be elected by the votes of the majority of the total membership of the National Assembly:
Provided that, if no member secures such majority in the first poll, a second poll shall be held between the members who secure the two highest numbers of votes in the first poll and the member who secures a majority of votes of the members present and voting shall be declared to have been elected as Prime Minister.
(6) The Cabinet, together with the Ministers of State, shall be collectively responsible to the Senate and the National Assembly.`,
    urduText: `(1) صدر کو مشورہ دینے کے لیے وزراء پر مشتمل ایک کابینہ ہوگی جس کا سربراہ وزیر اعظم ہوگا۔
(2) عام انتخابات کے بعد اکیسویں روز قومی اسمبلی کا اجلاس لازماً منعقد ہوگا۔
(3) اسپیکر کے انتخاب کے بعد قومی اسمبلی بغیر کسی بحث کے اپنے مسلمان ارکان میں سے وزیر اعظم کا انتخاب کرے گی۔
(6) کابینہ سینیٹ اور قومی اسمبلی کے سامنے اجتماعی طور پر جوابدہ ہوگی۔`,
    urduStatus: 'official_verified',
    clauses: [
      {
        id: 'PK-CONST-A091-C03',
        articleId: 'PK-CONST-A091',
        clauseNumber: '(3)-(4)',
        text: {
          en: 'Prime Minister elected by majority vote of total membership of the National Assembly; runoff between top two candidates.',
          ur: 'قومی اسمبلی کی کل رکنیت کی اکثریت سے وزیر اعظم کا انتخاب؛ پہلے راؤنڈ میں اکثریت نہ ملنے پر ٹاپ دو میں مقابلہ۔',
        },
      },
      {
        id: 'PK-CONST-A091-C06',
        articleId: 'PK-CONST-A091',
        clauseNumber: '(6)',
        text: {
          en: 'Collective responsibility of the Cabinet to Parliament.',
          ur: 'کابینہ پارلیمنٹ کے دونوں ایوانوں کے سامنے اجتماعی طور پر جوابدہ ہے۔',
        },
      },
    ],
    easyExplanation: {
      en: 'Governs the election of the Prime Minister by the National Assembly and establishes the core Westminster principle that the Federal Cabinet is collectively accountable to Parliament.',
      ur: 'قومی اسمبلی کے ذریعے وزیرِ اعظم کے باضابطہ انتخاب کا فارمولا اور کابینہ کی پارلیمنٹ کے سامنے اجتماعی جوابدہی کا اصول مقرر کرتا ہے۔',
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
          en: 'Abolished presidential appointment of PM; made election by National Assembly mandatory; mandated assembly meeting on 21st day after general election.',
          ur: 'صدر کی جانب سے وزیر اعظم کی نامزدگی کا اختیار ختم کیا اور عام انتخابات کے بعد 21ویں روز اسمبلی اجلاس اور انتخاب لازمی کیا۔',
        },
        typeOfChange: 'substituted',
      },
    ],
    relatedArticleIds: ['PK-CONST-A090', 'PK-CONST-A092', 'PK-CONST-A095'],
    thematicCategories: ['The Cabinet', 'Prime Minister Election', 'Collective Responsibility'],
    sourceCitationId: 'SRC-CONST-NA-ENG-2024',
    status: 'active',
    lastReviewedAt: '2026-10-31',
  },

  // =========================================================================
  // ARTICLE 92: Federal Ministers and Ministers of State
  // =========================================================================
  {
    id: 'PK-CONST-A092',
    articleNumber: '92',
    partId: 'PK-CONST-P03',
    chapterId: 'PK-CONST-P03-CH03',
    title: {
      en: 'Federal Ministers and Ministers of State',
      ur: 'وفاقی وزراء اور وزرائے مملکت',
    },
    originalStatutoryEnglish: `(1) Subject to clauses (9) and (10) of Article 91, the President shall appoint Federal Ministers and Ministers of State from amongst the members of Majlis-e-Shoora (Parliament) on the advice of the Prime Minister:
Provided that the number of Federal Ministers and Ministers of State who are members of the Senate shall not at any time exceed one-fourth of the number of Federal Ministers:
Provided further that the total strength of the Cabinet, including Ministers of State, shall not exceed eleven percent of the total membership of Majlis-e-Shoora (Parliament).`,
    urduText: `(1) صدر وزیر اعظم کے مشورے پر پارلیمنٹ کے ارکان میں سے وفاقی وزراء اور وزرائے مملکت کا تقرر کرے گا:
بشرطیکہ سینیٹ سے وزراء کی تعداد ایک چوتھائی سے زیادہ نہ ہو؛
اور کابینہ کی کل تعداد پارلیمنٹ کی مجموعی رکنیت کے 11 فیصد سے زیادہ نہیں ہوگی۔`,
    urduStatus: 'official_verified',
    clauses: [
      {
        id: 'PK-CONST-A092-C01',
        articleId: 'PK-CONST-A092',
        clauseNumber: '(1)',
        text: {
          en: 'Appointed from Parliament on PM advice; Senate quota capped at 25%; total Cabinet size strictly capped at 11% of Parliament.',
          ur: 'وزراء کی تقرری پارلیمنٹ سے؛ سینیٹ کوٹہ 25 فیصد؛ کل کابینہ پارلیمنٹ کی تعداد کے 11 فیصد سے زیادہ نہیں ہو سکتی۔',
        },
      },
    ],
    easyExplanation: {
      en: 'Regulates Cabinet appointments. The 18th Amendment instituted a strict ceiling capping the federal cabinet at a maximum of 11% of total parliamentary strength (around 49 ministers) to prevent bloated patronage governments.',
      ur: 'کابینہ کے سائز پر قانونی قدغن۔ 18ویں ترمیم کے تحت وزراء کی کل تعداد پارلیمنٹ کے 11 فیصد (تقریباً 49 وزراء) سے زائد نہیں ہو سکتی تاکہ قومی خزانے پر بوجھ نہ پڑے۔',
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
          en: 'Introduced an 11% constitutional ceiling on the maximum size of the Federal Cabinet.',
          ur: 'وفاقی کابینہ کے حجم کو پارلیمنٹ کے 11 فیصد تک محدود کرنے کی آئینی شرط عائد کی۔',
        },
        typeOfChange: 'amended',
      },
    ],
    relatedArticleIds: ['PK-CONST-A090', 'PK-CONST-A091'],
    thematicCategories: ['Federal Cabinet', 'Cabinet Ceiling', 'Ministers'],
    sourceCitationId: 'SRC-CONST-NA-ENG-2024',
    status: 'active',
    lastReviewedAt: '2026-10-31',
  },

  // =========================================================================
  // ARTICLE 100: Attorney-General for Pakistan
  // =========================================================================
  {
    id: 'PK-CONST-A100',
    articleNumber: '100',
    partId: 'PK-CONST-P03',
    chapterId: 'PK-CONST-P03-CH03',
    title: {
      en: 'Attorney-General for Pakistan',
      ur: 'اٹارنی جنرل برائے پاکستان',
    },
    originalStatutoryEnglish: `(1) The President shall appoint a person, being a person qualified to be appointed a Judge of the Supreme Court, to be the Attorney-General for Pakistan.
(2) The Attorney-General shall hold office during the pleasure of the President and shall not engage in private practice so long as he holds the office of the Attorney-General.
(3) It shall be the duty of the Attorney-General to give advice to the Federal Government upon such legal matters, and to perform such other duties of a legal character, as may be referred or assigned to him by the Federal Government, and in the performance of his duties he shall have the right of audience in all courts and tribunals in Pakistan.`,
    urduText: `(1) صدر سپریم کورٹ کا جج بننے کے اہل کسی شخص کو اٹارنی جنرل برائے پاکستان مقرر کرے گا۔
(2) اٹارنی جنرل اپنے عہدے کے دوران نجی پریکٹس نہیں کرے گا۔
(3) اٹارنی جنرل کا یہ فرض ہوگا کہ وہ وفاقی حکومت کو قانونی امور پر مشورہ دے اور اسے پاکستان کی تمام عدالتوں اور ٹربیونلز میں پیش ہونے اور بات سننے کا حق حاصل ہوگا۔`,
    urduStatus: 'official_verified',
    clauses: [
      {
        id: 'PK-CONST-A100-C01',
        articleId: 'PK-CONST-A100',
        clauseNumber: '(1)',
        text: {
          en: 'Must be qualified to be appointed as a Judge of the Supreme Court.',
          ur: 'سپریم کورٹ کا جج بننے کی اہلیت کا حامل ہو۔',
        },
      },
      {
        id: 'PK-CONST-A100-C03',
        articleId: 'PK-CONST-A100',
        clauseNumber: '(3)',
        text: {
          en: 'Principal legal adviser to the Federal Government with right of audience in all courts and tribunals across Pakistan.',
          ur: 'وفاقی حکومت کا پرنسپل قانونی مشیر جس کو ملک بھر کی تمام عدالتوں میں پیش ہونے کا حق حاصل ہے۔',
        },
      },
    ],
    easyExplanation: {
      en: 'Establishes the highest constitutional law officer of the federal government. The Attorney-General represents the Federation in landmark constitutional cases, original references before the Supreme Court, and public interest matters.',
      ur: 'وفاق کا اعلیٰ ترین آئینی قانونی مشیر۔ اٹارنی جنرل پاکستان کی تمام عدالتوں اور سپریم کورٹ میں ریاست کا دفاع اور آئینی تشریح پیش کرنے کا مجاز ہوتا ہے۔',
    },
    landmarkPrecedents: [],
    amendmentHistory: [],
    relatedArticleIds: ['PK-CONST-A140', 'PK-CONST-A177'],
    thematicCategories: ['Attorney-General', 'Law Officers', 'Supreme Court'],
    sourceCitationId: 'SRC-CONST-NA-ENG-2024',
    status: 'active',
    lastReviewedAt: '2026-10-31',
  },

  // =========================================================================
  // ARTICLE 101: Appointment of Governor
  // =========================================================================
  {
    id: 'PK-CONST-A101',
    articleNumber: '101',
    partId: 'PK-CONST-P04',
    chapterId: 'PK-CONST-P04-CH01',
    title: {
      en: 'Appointment of Governor',
      ur: 'گورنر کا تقرر',
    },
    originalStatutoryEnglish: `(1) There shall be a Governor for each Province, who shall be appointed by the President on the advice of the Prime Minister.
(2) A person shall not be appointed a Governor unless he is qualified to be elected as a member of the National Assembly and is not less than thirty-five years of age and is a registered voter and resident of the Province concerned.
(3) The Governor shall hold office during the pleasure of the President.`,
    urduText: `(1) ہر صوبے کا ایک گورنر ہوگا جسے صدر وزیر اعظم کے مشورے پر مقرر کرے گا۔
(2) کوئی شخص گورنر مقرر نہیں ہوگا جب تک کہ وہ قومی اسمبلی کا رکن منتخب ہونے کا اہل نہ ہو، اس کی عمر 35 سال سے کم نہ ہو، اور وہ متعلقہ صوبے کا رجسٹرڈ ووٹر اور رہائشی ہو۔
(3) گورنر صدر کی خوشنودی تک اپنے عہدے پر فائز رہے گا۔`,
    urduStatus: 'official_verified',
    clauses: [
      {
        id: 'PK-CONST-A101-C01',
        articleId: 'PK-CONST-A101',
        clauseNumber: '(1)',
        text: {
          en: 'Governor appointed by President on binding advice of the Prime Minister.',
          ur: 'گورنر کا تقرر صدر وزیر اعظم کے مشورے پر کرے گا۔',
        },
      },
      {
        id: 'PK-CONST-A101-C02',
        articleId: 'PK-CONST-A101',
        clauseNumber: '(2)',
        text: {
          en: 'Must be a registered voter and resident of the province concerned and at least 35 years of age.',
          ur: 'لازمی طور پر متعلقہ صوبے کا رہائشی اور ووٹر ہو اور عمر 35 سال ہو۔',
        },
      },
    ],
    easyExplanation: {
      en: 'Regulates appointment of provincial Governors. Under the 18th Amendment, a Governor must be a registered voter and permanent resident of that province, ending the practice of posting non-local administrators.',
      ur: 'صوبائی گورنرز کی تقرری کا قانون۔ 18ویں ترمیم کے بعد گورنر کا اسی صوبے کا مستقل رہائشی اور ووٹر ہونا لازمی بنا دیا گیا تاکہ صوبائی حقوق کا تحفظ ہو۔',
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
          en: 'Mandated that the Governor must be a registered voter and resident of the concerned province.',
          ur: 'گورنر کے لیے متعلقہ صوبے کا رہائشی اور ووٹر ہونا لازمی قرار دیا۔',
        },
        typeOfChange: 'amended',
      },
    ],
    relatedArticleIds: ['PK-CONST-A105', 'PK-CONST-A130'],
    thematicCategories: ['Governors', 'Provincial Autonomy', 'Federation'],
    sourceCitationId: 'SRC-CONST-NA-ENG-2024',
    status: 'active',
    lastReviewedAt: '2026-10-31',
  },

  // =========================================================================
  // ARTICLE 105: Governor to act on advice, etc.
  // =========================================================================
  {
    id: 'PK-CONST-A105',
    articleNumber: '105',
    partId: 'PK-CONST-P04',
    chapterId: 'PK-CONST-P04-CH01',
    title: {
      en: 'Governor to act on advice, etc.',
      ur: 'گورنر کا وزیرِ اعلیٰ کے مشورے کے مطابق عمل کرنا',
    },
    originalStatutoryEnglish: `(1) Subject to Constitution, in the performance of his functions, the Governor shall act on and in accordance with the advice of the Cabinet or the Chief Minister:
Provided that, after the Cabinet or the Chief Minister has tendered advice, the Governor may require the Cabinet or, as the case may be, the Chief Minister, to reconsider such advice, either generally or otherwise, and the Governor shall, within fifteen days, act in accordance with the advice tendered after such reconsideration.
(2) The question whether any, and if so what, advice was tendered to the Governor by the Chief Minister or the Cabinet shall not be inquired into in, or by, any court, tribunal or other authority.
(3) Where the Governor dissolves the Provincial Assembly, he shall appoint a date, not later than ninety days from the date of dissolution, for the holding of a general election to the Assembly.`,
    urduText: `(1) اپنے فرائض کی انجام دہی میں، گورنر کابینہ یا وزیرِ اعلیٰ کے مشورے کے مطابق عمل کرے گا:
بشرطیکہ 15 دن میں نظرِ ثانی طلب کر سکے گا، جس کے بعد وہ عمل کا پابند ہوگا۔
(3) جب گورنر صوبائی اسمبلی تحلیل کرے تو وہ 90 دن کے اندر عام انتخابات کی تاریخ مقرر کرے گا۔`,
    urduStatus: 'official_verified',
    clauses: [
      {
        id: 'PK-CONST-A105-C01',
        articleId: 'PK-CONST-A105',
        clauseNumber: '(1)',
        text: {
          en: 'Governor acts on binding advice of Cabinet or Chief Minister; single 15-day reconsideration.',
          ur: 'گورنر وزیر اعلیٰ کے مشورے کا پابند ہے؛ صرف 15 دن کی نظرِ ثانی کی گنجائش۔',
        },
      },
      {
        id: 'PK-CONST-A105-C03',
        articleId: 'PK-CONST-A105',
        clauseNumber: '(3)',
        text: {
          en: 'Mandatory appointment of election date within ninety days of dissolution.',
          ur: 'صوبائی اسمبلی تحلیل ہونے پر 90 روز میں انتخابات کی تاریخ دینا لازمی آئینی فریضہ ہے۔',
        },
      },
    ],
    easyExplanation: {
      en: 'Mirrors Article 48 at the provincial level. The Governor is a constitutional figurehead and must act on the advice of the Chief Minister. Upon dissolution of a Provincial Assembly, the Governor must appoint a general election date within 90 days.',
      ur: 'صوبائی سطح پر پارلیمانی جمہوریت کا ضابطہ۔ گورنر ذاتی مرضی کا مجاز نہیں بلکہ وزیرِ اعلیٰ کے مشورے کا پابند ہے اور اسمبلی تحلیل ہونے کی صورت میں 90 دن میں الیکشن کی تاریخ دینے کا پابند ہے۔',
    },
    landmarkPrecedents: [],
    amendmentHistory: [],
    relatedArticleIds: ['PK-CONST-A048', 'PK-CONST-A112', 'PK-CONST-A130', 'PK-CONST-A224'],
    thematicCategories: ['Provincial Executive', 'Chief Minister Advice', 'Elections Within 90 Days'],
    sourceCitationId: 'SRC-CONST-NA-ENG-2024',
    status: 'active',
    lastReviewedAt: '2026-10-31',
  },

  // =========================================================================
  // ARTICLE 106: Constitution of Provincial Assemblies
  // =========================================================================
  {
    id: 'PK-CONST-A106',
    articleNumber: '106',
    partId: 'PK-CONST-P04',
    chapterId: 'PK-CONST-P04-CH02',
    title: {
      en: 'Constitution of Provincial Assemblies',
      ur: 'صوبائی اسمبلیوں کی تشکیل اور نشستیں',
    },
    originalStatutoryEnglish: `(1) Each Provincial Assembly shall consist of general seats and seats reserved for women and non-Muslims as specified herein below:
Balochistan: General 51, Women 11, Non-Muslims 3, Total 65;
Khyber Pakhtunkhwa: General 115, Women 26, Non-Muslims 4, Total 145;
Punjab: General 297, Women 66, Non-Muslims 8, Total 371;
Sindh: General 130, Women 29, Non-Muslims 9, Total 168.
(2) A person shall be entitled to vote if he is a citizen, not less than 18 years of age, and registered on the electoral roll.`,
    urduText: `(1) ہر صوبائی اسمبلی درج ذیل جنرل اور مخصوص نشستوں پر مشتمل ہوگی:
بلوچستان: جنرل 51، خواتین 11، غیر مسلم 3، کل 65؛
خیبر پختونخوا: جنرل 115، خواتین 26، غیر مسلم 4، کل 145؛
پنجاب: جنرل 297، خواتین 66، غیر مسلم 8، کل 371؛
سندھ: جنرل 130، خواتین 29، غیر مسلم 9، کل 168۔`,
    urduStatus: 'official_verified',
    clauses: [
      {
        id: 'PK-CONST-A106-C01',
        articleId: 'PK-CONST-A106',
        clauseNumber: '(1)',
        text: {
          en: 'Seat distribution across Punjab (371), Sindh (168), Khyber Pakhtunkhwa (145), and Balochistan (65).',
          ur: 'چاروں صوبائی اسمبلیوں کی نشستوں کی باضابطہ آئینی تقسیم۔',
        },
      },
    ],
    easyExplanation: {
      en: 'Specifies the exact constitutional strength of all four Provincial Assemblies (Punjab: 371, Sindh: 168, KP: 145, Balochistan: 65), including reserved seats for women and non-Muslims.',
      ur: 'پاکستان کی چاروں صوبائی اسمبلیوں کی نشستوں، خواتین اور اقلیتی کوٹے کی تفصیلات طے کرتا ہے۔',
    },
    landmarkPrecedents: [],
    amendmentHistory: [
      {
        amendmentId: 'PK-CONST-AMD-25',
        amendmentNumber: 25,
        actTitle: {
          en: 'Constitution (Twenty-fifth Amendment) Act, 2018',
          ur: 'آئین (پچیسویں ترمیم) ایکٹ، 2018ء',
        },
        year: 2018,
        effectiveDate: '2018-05-31',
        summaryOfChange: {
          en: 'Expanded Khyber Pakhtunkhwa Assembly to 145 seats to represent tribal districts.',
          ur: 'قبائلی اضلاع کے انضمام کے بعد خیبر پختونخوا اسمبلی کی نشستیں بڑھا کر 145 کیں۔',
        },
        typeOfChange: 'amended',
      },
    ],
    relatedArticleIds: ['PK-CONST-A051', 'PK-CONST-A112'],
    thematicCategories: ['Provincial Assemblies', 'Representation', 'Reserved Seats'],
    sourceCitationId: 'SRC-CONST-NA-ENG-2024',
    status: 'active',
    lastReviewedAt: '2026-10-31',
  },

  // =========================================================================
  // ARTICLE 112: Dissolution of Provincial Assembly
  // =========================================================================
  {
    id: 'PK-CONST-A112',
    articleNumber: '112',
    partId: 'PK-CONST-P04',
    chapterId: 'PK-CONST-P04-CH02',
    title: {
      en: 'Dissolution of Provincial Assembly',
      ur: 'صوبائی اسمبلی کی تحلیل',
    },
    originalStatutoryEnglish: `(1) The Governor shall dissolve the Provincial Assembly if so advised by the Chief Minister; and the Provincial Assembly shall, unless sooner dissolved, stand dissolved at the expiration of forty-eight hours after the Chief Minister has so advised.
Explanation.— Reference in this Article to "Chief Minister" shall not be construed to include reference to a Chief Minister against whom a notice of a resolution for a vote of no-confidence has been given in the Provincial Assembly but has not been voted upon or against whom such a resolution has been passed.
(2) The Governor may also dissolve the Provincial Assembly in his discretion where a vote of no-confidence having been passed against the Chief Minister, no other member of the Provincial Assembly commands the confidence of the majority of the members.`,
    urduText: `(1) گورنر صوبائی اسمبلی کو تحلیل کرے گا اگر وزیرِ اعلیٰ ایسا مشورہ دے؛ اور صوبائی اسمبلی مشورے کے 48 گھنٹے بعد خود بخود تحلیل ہو جائے گی۔
وضاحت: اس وزیر اعلیٰ کے مشورے پر اسمبلی تحلیل نہیں ہو سکتی جس کے خلاف تحریکِ عدم اعتماد جمع ہو چکی ہو۔`,
    urduStatus: 'official_verified',
    clauses: [
      {
        id: 'PK-CONST-A112-C01',
        articleId: 'PK-CONST-A112',
        clauseNumber: '(1)',
        text: {
          en: 'Dissolution on Chief Minister advice or automatic dissolution after 48 hours; bar during pending vote of no-confidence.',
          ur: 'وزیر اعلیٰ کے مشورے پر تحلیل یا 48 گھنٹے میں خود بخود تحلیل؛ عدم اعتماد کے دوران تحلیل کی ممانعت۔',
        },
      },
    ],
    easyExplanation: {
      en: 'Governs dissolution of provincial legislatures. The Assembly dissolves on the Chief Minister\'s advice or automatically within 48 hours. A CM facing a pending vote of no-confidence cannot advise dissolution.',
      ur: 'صوبائی اسمبلی کی تحلیل کا طریقہ کار۔ وزیر اعلیٰ کے مشورے کے 48 گھنٹے بعد اسمبلی خود بخود تحلیل ہو جاتی ہے؛ اگر عدم اعتماد جمع ہو تو اسمبلی نہیں توڑی جا سکتی۔',
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
          en: 'Repealed discretionary dissolution power of Governors under 112(2)(b).',
          ur: 'گورنرز کا صوابدیدی اسمبلیاں توڑنے کا اختیار ختم کیا۔',
        },
        typeOfChange: 'amended',
      },
    ],
    relatedArticleIds: ['PK-CONST-A058', 'PK-CONST-A105', 'PK-CONST-A130'],
    thematicCategories: ['Provincial Assemblies', 'Dissolution', 'No-Confidence'],
    sourceCitationId: 'SRC-CONST-NA-ENG-2024',
    status: 'active',
    lastReviewedAt: '2026-10-31',
  },

  // =========================================================================
  // ARTICLE 128: Power of Governor to promulgate Ordinances
  // =========================================================================
  {
    id: 'PK-CONST-A128',
    articleNumber: '128',
    partId: 'PK-CONST-P04',
    chapterId: 'PK-CONST-P04-CH02',
    title: {
      en: 'Power of Governor to promulgate Ordinances',
      ur: 'گورنر کا آرڈیننس جاری کرنے کا اختیار',
    },
    originalStatutoryEnglish: `(1) The Governor may, except when the Provincial Assembly is in session, if satisfied that circumstances exist which render it necessary to take immediate action, make and promulgate an Ordinance as the circumstances appear to him to require.
(2) An Ordinance promulgated under this Article shall have the same force and effect as an Act of the Provincial Assembly and shall stand repealed at the expiration of ninety days from its promulgation:
Provided that the Provincial Assembly may by a resolution extend the Ordinance for one further period of ninety days and it shall stand repealed at the expiration of the extended period:
Provided further that an Ordinance shall not be promulgated again on the same subject.`,
    urduText: `(1) جب صوبائی اسمبلی کا اجلاس نہ ہو رہا ہو، اور ہنگامی حالات کے تحت فوری اقدام ضروری ہو، تو گورنر آرڈیننس جاری کر سکتا ہے۔
(2) آرڈیننس جاری ہونے کے 90 دن بعد خود بخود ختم ہو جائے گا، الا یہ کہ اسمبلی قرارداد سے ایک بار مزید 90 دن کی توسیع دے؛
اور اسی موضوع پر دوبارہ آرڈیننس جاری نہیں کیا جائے گا۔`,
    urduStatus: 'official_verified',
    clauses: [
      {
        id: 'PK-CONST-A128-C01',
        articleId: 'PK-CONST-A128',
        clauseNumber: '(1)',
        text: {
          en: 'Promulgation permitted only during recess of Provincial Assembly for urgent matters.',
          ur: 'صوبائی اسمبلی کی چھٹی کے دوران ہنگامی امور پر آرڈیننس کا اجرا۔',
        },
      },
      {
        id: 'PK-CONST-A128-C02',
        articleId: 'PK-CONST-A128',
        clauseNumber: '(2)',
        text: {
          en: '90-day validity; single 90-day extension by Provincial Assembly; ban on re-promulgation.',
          ur: '90 دن کی میعاد؛ صرف ایک بار 90 دن کی توسیع؛ دوبارہ اجرا پر پابندی۔',
        },
      },
    ],
    easyExplanation: {
      en: 'Restricts provincial executive decrees. Provincial ordinances expire in 90 days, can only be extended once for 90 days, and re-promulgation on the same subject is barred.',
      ur: 'صوبائی آرڈیننس کا اختیار۔ آرڈیننس 90 دن میں ختم ہو جاتا ہے اور اسمبلی ایک بار 90 دن بڑھا سکتی ہے، دوبارہ اسی آرڈیننس کو لانا ممنوع ہے۔',
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
          en: 'Barred re-promulgation of provincial ordinances and limited life to 90 days.',
          ur: 'صوبائی آرڈیننس کے دوبارہ اجرا پر پابندی لگائی اور میعاد 90 دن تک محدود کی۔',
        },
        typeOfChange: 'amended',
      },
    ],
    relatedArticleIds: ['PK-CONST-A089', 'PK-CONST-A105'],
    thematicCategories: ['Provincial Decrees', 'Ordinances', 'Separation of Powers'],
    sourceCitationId: 'SRC-CONST-NA-ENG-2024',
    status: 'active',
    lastReviewedAt: '2026-10-31',
  },
];
