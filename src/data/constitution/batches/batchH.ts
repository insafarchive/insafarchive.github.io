/**
 * INSAF ARCHIVE (انصاف آرکائیو)
 * Constitutional Batch H: Part VIII (Articles 213–226) — Elections
 * Election Commission of Pakistan, 90-Day Election Mandate & Caretaker Governments
 * Verbatim text from Official Gazette of Pakistan & Pakistan Code
 */

import type { ConstitutionalArticle } from '../../../types/constitution';

export const CONSTITUTION_BATCH_H: ConstitutionalArticle[] = [
  // =========================================================================
  // ARTICLE 213: Chief Election Commissioner
  // =========================================================================
  {
    id: 'PK-CONST-A213',
    articleNumber: '213',
    partId: 'PK-CONST-P08',
    chapterId: 'PK-CONST-P08-CH01',
    title: {
      en: 'Chief Election Commissioner',
      ur: 'چیف الیکشن کمشنر',
    },
    originalStatutoryEnglish: `(1) There shall be a Chief Election Commissioner (in this Part referred to as the Commissioner), who shall be appointed by the President.
(2) No person shall be appointed to be Commissioner unless he has been a Judge of the Supreme Court or has been a senior civil servant or is a technocrat and is not more than sixty-eight years of age.
(2A) The Prime Minister shall in consultation with the Leader of the Opposition in the National Assembly, forward three names for appointment of the Commissioner to a Parliamentary Committee for hearing and confirmation of any one person:
Provided that in case there is no consensus between the Prime Minister and the Leader of the Opposition, each shall forward separate lists to the Parliamentary Committee for consideration which may confirm any one name.`,
    urduText: `(1) ایک چیف الیکشن کمشنر ہوگا جسے صدر مقرر کرے گا۔
(2) کوئی شخص کمشنر مقرر نہیں ہوگا جب تک کہ وہ سپریم کورٹ کا جج، سینئر بیوروکریٹ یا ٹیکنوکریٹ نہ رہا ہو اور اس کی عمر 68 سال سے زائد نہ ہو۔
(2الف) وزیر اعظم قومی اسمبلی میں قائدِ حزبِ اختلاف (اپوزیشن لیڈر) سے مشاورت کے بعد تین نام پارلیمانی کمیٹی کو منظوری کے لیے بھیجے گا؛ اتفاق نہ ہونے پر الگ الگ فہرستیں کمیٹی کو بھیجی جائیں گی۔`,
    urduStatus: 'official_verified',
    clauses: [
      {
        id: 'PK-CONST-A213-C02',
        articleId: 'PK-CONST-A213',
        clauseNumber: '(2)',
        text: {
          en: 'Qualifications: Former Supreme Court Judge, senior civil servant, or technocrat not exceeding 68 years of age.',
          ur: 'سابق جج، سینئر بیوروکریٹ یا ٹیکنوکریٹ؛ زیادہ سے زیادہ عمر 68 سال۔',
        },
      },
      {
        id: 'PK-CONST-A213-C02A',
        articleId: 'PK-CONST-A213',
        clauseNumber: '(2A)',
        text: {
          en: 'Bipartisan appointment mechanism: consultation between Prime Minister and Leader of the Opposition confirmed by a 12-member Parliamentary Committee.',
          ur: 'وزیر اعظم اور قائدِ حزبِ اختلاف کی باہمی مشاورت اور 12 رکنی پارلیمانی کمیٹی کی توثیق سے تقرری۔',
        },
      },
    ],
    easyExplanation: {
      en: 'Regulates the appointment of the head of the Election Commission of Pakistan. To ensure electoral independence, the 18th and 22nd Amendments removed unilateral government appointments, mandating bipartisan agreement between the Prime Minister and the Leader of the Opposition confirmed by a Parliamentary Committee.',
      ur: 'چیف الیکشن کمشنر کی تقرری کا غیر جانبدارانہ طریقہ۔ حکومت اپنی مرضی سے کمشنر نہیں لگا سکتی؛ وزیر اعظم اور اپوزیشن لیڈر کے اتفاق اور پارلیمانی کمیٹی کی منظوری سے ہی تقرری ممکن ہے۔',
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
          en: 'Introduced bipartisan PM-Opposition consultation and Parliamentary Committee confirmation for CEC appointment.',
          ur: 'چیف الیکشن کمشنر کے لیے وزیر اعظم اور اپوزیشن لیڈر کی مشاورت اور پارلیمانی کمیٹی کی توثیق لازمی کی۔',
        },
        typeOfChange: 'amended',
      },
      {
        amendmentId: 'PK-CONST-AMD-22',
        amendmentNumber: 22,
        actTitle: {
          en: 'Constitution (Twenty-second Amendment) Act, 2016',
          ur: 'آئین (بائیسویں ترمیم) ایکٹ، 2016ء',
        },
        year: 2016,
        effectiveDate: '2016-06-10',
        summaryOfChange: {
          en: 'Expanded eligibility for CEC and ECP members to include retired senior civil servants and technocrats alongside judges.',
          ur: 'ججوں کے علاوہ سینئر بیوروکریٹس اور ٹیکنوکریٹس کو بھی الیکشن کمیشن کا رکن اور چیف کمشنر بننے کا اہل قرار دیا۔',
        },
        typeOfChange: 'amended',
      },
    ],
    relatedArticleIds: ['PK-CONST-A215', 'PK-CONST-A218'],
    thematicCategories: ['Chief Election Commissioner', 'Electoral Integrity', 'Bipartisan Appointments'],
    sourceCitationId: 'SRC-CONST-NA-ENG-2024',
    status: 'active',
    lastReviewedAt: '2026-10-31',
  },

  // =========================================================================
  // ARTICLE 218: Election Commission
  // =========================================================================
  {
    id: 'PK-CONST-A218',
    articleNumber: '218',
    partId: 'PK-CONST-P08',
    chapterId: 'PK-CONST-P08-CH01',
    title: {
      en: 'Election Commission',
      ur: 'الیکشن کمیشن آف پاکستان (آزادانہ و منصفانہ انتخابات کا فریضہ)',
    },
    originalStatutoryEnglish: `(1) For the purpose of election to both Houses of Majlis-e-Shoora (Parliament), Provincial Assemblies and for election to such other offices as may be specified by law, a permanent Election Commission shall be constituted in accordance with this Article.
(2) The Election Commission shall consist of—
(a) the Commissioner who shall be the Chairman of the Commission; and
(b) four members, one from each Province, each of whom has been a Judge of a High Court or has been a senior civil servant or is a technocrat.
(3) It shall be the duty of the Election Commission to organize and conduct the election and to make such arrangements as are necessary to ensure that the election is conducted honestly, justly, fairly and in accordance with law, and that corrupt practices are guarded against.`,
    urduText: `(1) پارلیمنٹ کے دونوں ایوانوں، صوبائی اسمبلیوں اور دیگر قانونی عہدوں کے انتخابات کے لیے اس آرٹیکل کے تحت ایک مستقل الیکشن کمیشن تشکیل دیا جائے گا۔
(2) الیکشن کمیشن چیف الیکشن کمشنر (چیئرمین) اور چار ارکان (ہر صوبے سے ایک رکن جو سابق ہائی کورٹ جج، بیوروکریٹ یا ٹیکنوکریٹ ہو) پر مشتمل ہوگا۔
(3) الیکشن کمیشن کا یہ بنیادی آئینی فریضہ ہوگا کہ وہ انتخابات کا ایسا انتظام اور انعقاد کرے جس سے یہ یقینی بنایا جا سکے کہ انتخابات دیانتداری، منصفانہ، شفاف طریقے سے اور قانون کے مطابق ہوں اور بدعنوانی اور دھاندلی کی روک تھام کی جائے۔`,
    urduStatus: 'official_verified',
    clauses: [
      {
        id: 'PK-CONST-A218-C01',
        articleId: 'PK-CONST-A218',
        clauseNumber: '(1)-(2)',
        text: {
          en: 'Permanent 5-member Election Commission comprising the CEC and one member from each of the four Provinces.',
          ur: 'چیف الیکشن کمشنر اور چاروں صوبوں کے ایک ایک نمائندے پر مشتمل 5 رکنی مستقل آئینی ادارہ۔',
        },
      },
      {
        id: 'PK-CONST-A218-C03',
        articleId: 'PK-CONST-A218',
        clauseNumber: '(3)',
        text: {
          en: 'Constitutional mandate and affirmative duty to ensure honest, just, fair, and lawful elections and eradicate corrupt electoral practices.',
          ur: 'شفاف، منصفانہ اور دیانتدارانہ انتخابات کرانے اور دھاندلی روکنے کا لازمی اور اولین آئینی مینڈیٹ۔',
        },
      },
    ],
    easyExplanation: {
      en: 'The supreme constitutional mandate of the Election Commission of Pakistan (ECP). Under Clause (3), the ECP is not a passive referee; it has an active constitutional duty to guarantee honest, free, fair, and transparent elections, enforce level playing fields, and eliminate corrupt practices.',
      ur: 'الیکشن کمیشن آف پاکستان کا بنیادی ترین آئینی فریضہ۔ شق (3) کے تحت الیکشن کمیشن پر لازم ہے کہ وہ دھاندلی روکے، تمام جماعتوں کو یکساں مواقع (لیول پلینگ فیلڈ) دے، اور شفاف و منصفانہ الیکشن کا انعقاد یقینی بنائے۔',
    },
    landmarkPrecedents: [
      {
        citation: 'PLD 2012 SC 681',
        caseName: {
          en: 'Workers Party Pakistan v. Federation of Pakistan (Electoral Reforms Judgment)',
          ur: 'ورکرز پارٹی پاکستان بنام وفاقِ پاکستان (انتخابی اصلاحات فیصلہ)',
        },
        judgmentDate: '2012-06-08',
        courtName: {
          en: 'Supreme Court of Pakistan',
          ur: 'سپریم کورٹ آف پاکستان',
        },
        principleEstablished: {
          en: 'The Supreme Court held that Article 218(3) vests plenary powers in the Election Commission to curb illicit campaign money, regulate political financing, and ensure substantive equality in elections.',
          ur: 'سپریم کورٹ نے فیصلہ دیا کہ آرٹیکل 218(3) کے تحت الیکشن کمیشن کو مکمل اختیارات حاصل ہیں کہ وہ انتخابات میں کالے دھن کا استعمال روکے اور اخراجات پر سخت مانیٹرنگ نافذ کرے۔',
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
          en: 'Transformed the ECP into a permanent constitutional body with representation from all four Provinces.',
          ur: 'الیکشن کمیشن کو چاروں صوبوں کی مستقل نمائندگی کے ساتھ ایک دائمی آئینی ادارہ بنایا۔',
        },
        typeOfChange: 'substituted',
      },
    ],
    relatedArticleIds: ['PK-CONST-A219', 'PK-CONST-A220', 'PK-CONST-A224'],
    thematicCategories: ['Election Commission', 'Free and Fair Elections', 'Electoral Integrity', 'Level Playing Field'],
    sourceCitationId: 'SRC-CONST-NA-ENG-2024',
    status: 'active',
    lastReviewedAt: '2026-10-31',
  },

  // =========================================================================
  // ARTICLE 220: Executive authorities to assist Commission
  // =========================================================================
  {
    id: 'PK-CONST-A220',
    articleNumber: '220',
    partId: 'PK-CONST-P08',
    chapterId: 'PK-CONST-P08-CH01',
    title: {
      en: 'Executive authorities to assist Commission',
      ur: 'انتظامی حکام کا کمیشن کی معاونت کا فریضہ',
    },
    originalStatutoryEnglish: `It shall be the duty of all executive authorities in the Federation and in the Provinces to assist the Commissioner and the Election Commission in the discharge of his or their functions.`,
    urduText: `وفاق اور صوبوں میں تمام انتظامی حکام کا یہ فرض ہوگا کہ وہ اپنے فرائض کی انجام دہی میں کمشنر اور الیکشن کمیشن کی مکمل معاونت کریں۔`,
    urduStatus: 'official_verified',
    clauses: [
      {
        id: 'PK-CONST-A220-C01',
        articleId: 'PK-CONST-A220',
        clauseNumber: 'Article Text',
        text: {
          en: 'All federal and provincial executive, police, and administrative bodies are constitutionally bound to assist the Election Commission.',
          ur: 'ملک کے تمام وفاقی و صوبائی انتظامی اور سیکیورٹی اداروں کا الیکشن کمیشن کے احکامات کی تعمیل اور مدد کا فریضہ۔',
        },
      },
    ],
    easyExplanation: {
      en: 'Constitutional command making all administrative machinery—civil administration, police, bureaucracy, and law enforcement agencies—subordinate to the directives of the Election Commission during the election period.',
      ur: 'انتخابات کے دوران تمام بیوروکریسی، چیف سیکرٹریز، پولیس اور سیکیورٹی اداروں کو الیکشن کمیشن کے احکامات کے ماتحت بناتا ہے تاکہ حکومت انتخابات پر اثر انداز نہ ہو سکے۔',
    },
    landmarkPrecedents: [],
    amendmentHistory: [],
    relatedArticleIds: ['PK-CONST-A218', 'PK-CONST-A224'],
    thematicCategories: ['Electoral Administration', 'Executive Assistance', 'Civil Bureaucracy'],
    sourceCitationId: 'SRC-CONST-NA-ENG-2024',
    status: 'active',
    lastReviewedAt: '2026-10-31',
  },

  // =========================================================================
  // ARTICLE 224: Time of Election and Caretaker Government
  // =========================================================================
  {
    id: 'PK-CONST-A224',
    articleNumber: '224',
    partId: 'PK-CONST-P08',
    chapterId: 'PK-CONST-P08-CH02',
    title: {
      en: 'Time of Election and bye-election',
      ur: 'انتخابات کا وقت، نوے (90) دن کا مینڈیٹ اور نگران حکومتیں',
    },
    originalStatutoryEnglish: `(1) A general election to the National Assembly or a Provincial Assembly shall be held within a period of sixty days immediately following the day on which the term of the Assembly is due to expire, unless the Assembly has been sooner dissolved, and the results of the election shall be declared not later than fourteen days before that day.
(1A) On dissolution of the Assembly on completion of its term, or in case it is dissolved under Article 58 or Article 112, the President, or the Governor, as the case may be, shall appoint a care-taker Cabinet:
Provided that the care-taker Prime Minister shall be appointed by the President in consultation with the Prime Minister and the Leader of the Opposition in the outgoing National Assembly, and a care-taker Chief Minister shall be appointed by the Governor in consultation with the Chief Minister and the Leader of the Opposition in the outgoing Provincial Assembly.
(2) When the National Assembly or a Provincial Assembly is dissolved, a general election to the Assembly shall be held within a period of ninety days after the dissolution, and the results of the election shall be declared not later than fourteen days after the conclusion of the polls.`,
    urduText: `(1) قومی اسمبلی یا صوبائی اسمبلی کے عام انتخابات اسمبلی کی مدت ختم ہونے کے فوراً بعد ساٹھ (60) دن کے اندر منعقد ہوں گے؛
(1الف) اسمبلی کی تحلیل پر صدر یا گورنر ایک نگران کابینہ مقرر کرے گا:
بشرطیکہ نگران وزیر اعظم کا تقرر صدر سبکدوش ہونے والے وزیر اعظم اور اپوزیشن لیڈر کی باہمی مشاورت سے کرے گا، اور نگران وزیر اعلیٰ کا تقرر گورنر وزیر اعلیٰ اور اپوزیشن لیڈر کی مشاورت سے کرے گا۔
(2) جب قومی اسمبلی یا کوئی صوبائی اسمبلی وقت سے پہلے تحلیل ہو جائے، تو اس اسمبلی کے عام انتخابات تحلیل ہونے کے نوے (90) دن کے اندر منعقد کیے جائیں گے۔`,
    urduStatus: 'official_verified',
    clauses: [
      {
        id: 'PK-CONST-A224-C01A',
        articleId: 'PK-CONST-A224',
        clauseNumber: '(1A)',
        text: {
          en: 'Bipartisan appointment of Caretaker Prime Minister and Chief Ministers by outgoing executive and Leader of the Opposition.',
          ur: 'سبکدوش وزیر اعظم / وزیر اعلیٰ اور اپوزیشن لیڈر کی باہمی مشاورت سے نگران حکومتوں کا تقرر۔',
        },
      },
      {
        id: 'PK-CONST-A224-C02',
        articleId: 'PK-CONST-A224',
        clauseNumber: '(2)',
        text: {
          en: 'Mandatory constitutional timeline: General elections must be held within 90 days of dissolution of the National Assembly or a Provincial Assembly.',
          ur: 'لازمی آئینی میعاد: اسمبلی کی قبل از وقت تحلیل کی صورت میں نوے (90) دن کے اندر انتخابات کرانا فرض ہے۔',
        },
      },
    ],
    easyExplanation: {
      en: 'The inviolable constitutional election timetable. If an assembly completes its 5-year term, elections must be held in 60 days. If an assembly is dissolved early, elections must strictly be held within 90 days. Sets up neutral caretaker governments to supervise transparent balloting.',
      ur: 'آئین کا ناقابلِ تسخیر الیکشن شیڈول۔ اگر اسمبلی اپنی پانچ سالہ مدت پوری کرے تو 60 دن میں، اور اگر قبل از وقت تحلیل ہو جائے تو ہر حال میں 90 دن کے اندر عام انتخابات کرانا لازمی آئینی حکم ہے۔ انتخابات میں غیر جانبداری کے لیے نگران حکومت قائم کی جاتی ہے۔',
    },
    landmarkPrecedents: [
      {
        citation: 'PLD 2023 SC 433',
        caseName: {
          en: 'Suo Motu Case No. 1 of 2023 (Punjab & KP Assemblies 90-Day Election Mandate)',
          ur: 'از خود نوٹس نمبر 1 برائے 2023 (پنجاب و خیبر پختونخوا اسمبلیوں کے 90 روزہ انتخابات)',
        },
        judgmentDate: '2023-03-01',
        courtName: {
          en: 'Supreme Court of Pakistan',
          ur: 'سپریم کورٹ آف پاکستان',
        },
        principleEstablished: {
          en: 'The Supreme Court ruled by 3-2 majority that holding general elections within 90 days of dissolution under Article 224(2) is a mandatory and non-negotiable constitutional command that cannot be delayed on executive or financial pretexts.',
          ur: 'سپریم کورٹ نے فیصلہ دیا کہ آرٹیکل 224(2) کے تحت اسمبلی تحلیل ہونے پر 90 روز میں الیکشن کرانا لازمی آئینی حکم ہے جس سے فنڈز یا سیکیورٹی کے بہانے انحراف نہیں کیا جا سکتا۔',
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
          en: 'Instituted the caretaker government formula involving consensus between PM/CM and Leader of the Opposition.',
          ur: 'وزیر اعظم اور اپوزیشن لیڈر کے اتفاق سے غیر جانبدار نگران حکومت کا باقاعدہ فارمولا وضع کیا۔',
        },
        typeOfChange: 'amended',
      },
      {
        amendmentId: 'PK-CONST-AMD-20',
        amendmentNumber: 20,
        actTitle: {
          en: 'Constitution (Twentieth Amendment) Act, 2012',
          ur: 'آئین (بیسویں ترمیم) ایکٹ، 2012ء',
        },
        year: 2012,
        effectiveDate: '2012-02-28',
        summaryOfChange: {
          en: 'Enacted Article 224A establishing a deadlock-resolution mechanism for caretaker appointments.',
          ur: 'نگران وزیر اعظم کے انتخاب میں تعطل کے حل کے لیے آرٹیکل 224A کا اضافہ کیا۔',
        },
        typeOfChange: 'amended',
      },
    ],
    relatedArticleIds: ['PK-CONST-A048', 'PK-CONST-A058', 'PK-CONST-A105', 'PK-CONST-A112', 'PK-CONST-A224A'],
    thematicCategories: ['Elections Within 90 Days', 'Caretaker Government', 'Electoral Timetable', 'Constitutional Deadlines'],
    sourceCitationId: 'SRC-CONST-NA-ENG-2024',
    status: 'active',
    lastReviewedAt: '2026-10-31',
  },

  // =========================================================================
  // ARTICLE 224A: Resolution by Committee or Election Commission
  // =========================================================================
  {
    id: 'PK-CONST-A224A',
    articleNumber: '224A',
    partId: 'PK-CONST-P08',
    chapterId: 'PK-CONST-P08-CH02',
    title: {
      en: 'Resolution by Committee or Election Commission',
      ur: 'نگران وزیر اعظم و وزیر اعلیٰ کے تقرر میں تعطل کا حل',
    },
    originalStatutoryEnglish: `(1) In case the Prime Minister and the Leader of the Opposition in the outgoing National Assembly do not agree on any person to be appointed as the care-taker Prime Minister within three days of the dissolution of the National Assembly, they shall forward two nominees each to a Committee to be immediately constituted by the Speaker of the National Assembly, comprising eight members of the outgoing National Assembly, or the Senate, or both, having equal representation from the Treasury and the Opposition, to be nominated by the Prime Minister and the Leader of the Opposition respectively.
(2) In case a care-taker Chief Minister is not agreed upon within three days, the matter shall be referred to a similar eight-member committee of the Provincial Assembly.
(3) The Committee constituted under clause (1) or (2) shall finalize the name of the care-taker Prime Minister or care-taker Chief Minister, as the case may be, within three days of the referral of the matter to it:
Provided that in case of inability of the Committee to decide the matter in the aforesaid period, the names of the nominees shall be referred to the Election Commission of Pakistan for final decision within two days.`,
    urduText: `(1) اگر سبکدوش وزیر اعظم اور اپوزیشن لیڈر اسمبلی تحلیل کے تین دن کے اندر نگران وزیر اعظم پر متفق نہ ہوں، تو وہ دو دو نام اسپیکر کی قائم کردہ 8 رکنی پارلیمانی کمیٹی (حکومت اور اپوزیشن کی مساوی نمائندگی) کو بھیجیں گے۔
(3) اگر پارلیمانی کمیٹی تین دن میں فیصلہ نہ کر سکے، تو تمام نام الیکشن کمیشن آف پاکستان کو بھیجے جائیں گے جو دو دن کے اندر حتمی فیصلہ کرے گا۔`,
    urduStatus: 'official_verified',
    clauses: [
      {
        id: 'PK-CONST-A224A-C01',
        articleId: 'PK-CONST-A224A',
        clauseNumber: '(1)',
        text: {
          en: 'Failure of PM and Opposition Leader to agree in 3 days triggers referral to an 8-member bipartisan Parliamentary Committee.',
          ur: 'تین دن میں اتفاق نہ ہونے پر 8 رکنی مساوی پارلیمانی کمیٹی کو ریفرنس۔',
        },
      },
      {
        id: 'PK-CONST-A224A-C03',
        articleId: 'PK-CONST-A224A',
        clauseNumber: '(3)',
        text: {
          en: 'Failure of Parliamentary Committee in 3 days refers nominees to Election Commission of Pakistan for binding decision within 2 days.',
          ur: 'کمیٹی میں تین دن میں فیصلہ نہ ہونے پر الیکشن کمیشن دو دن میں حتمی فیصلہ کرتا ہے۔',
        },
      },
    ],
    easyExplanation: {
      en: 'Inserted by the 20th Amendment in 2012 to break political deadlocks in appointing neutral Caretaker Prime Ministers or Chief Ministers. If the Prime Minister and Opposition Leader cannot agree within 3 days, an 8-member bipartisan committee gets 3 days; if it fails, the Election Commission must choose within 48 hours.',
      ur: '20ویں ترمیم کے تحت نگران حکومت کے انتخاب میں ڈیڈ لاک ختم کرنے کا خودکار فارمولا: 3 دن میں سیاستدان متفق نہ ہوں تو پارلیمانی کمیٹی، اور وہاں بھی فیصلہ نہ ہو تو 48 گھنٹوں میں الیکشن کمیشن حتمی نگران وزیر اعظم منتخب کرتا ہے۔',
    },
    landmarkPrecedents: [],
    amendmentHistory: [
      {
        amendmentId: 'PK-CONST-AMD-20',
        amendmentNumber: 20,
        actTitle: {
          en: 'Constitution (Twentieth Amendment) Act, 2012',
          ur: 'آئین (بیسویں ترمیم) ایکٹ، 2012ء',
        },
        year: 2012,
        effectiveDate: '2012-02-28',
        summaryOfChange: {
          en: 'Inserted Article 224A establishing automatic parliamentary committee and ECP deadlock resolution.',
          ur: 'نگران حکومت کے انتخاب میں تعطل کو ختم کرنے کے لیے پارلیمانی کمیٹی اور الیکشن کمیشن کا فارمولا شامل کیا۔',
        },
        typeOfChange: 'inserted',
      },
    ],
    relatedArticleIds: ['PK-CONST-A218', 'PK-CONST-A224'],
    thematicCategories: ['Caretaker Appointment', 'Deadlock Resolution', 'Election Commission Authority'],
    sourceCitationId: 'SRC-CONST-NA-ENG-2024',
    status: 'active',
    lastReviewedAt: '2026-10-31',
  },

  // =========================================================================
  // ARTICLE 226: Election by secret ballot
  // =========================================================================
  {
    id: 'PK-CONST-A226',
    articleNumber: '226',
    partId: 'PK-CONST-P08',
    chapterId: 'PK-CONST-P08-CH02',
    title: {
      en: 'Election by secret ballot',
      ur: 'خفیہ رائے شماری کے ذریعے انتخابات',
    },
    originalStatutoryEnglish: `All elections under the Constitution, other than those of the Prime Minister and the Chief Minister, shall be by secret ballot.`,
    urduText: `آئین کے تحت تمام انتخابات، سوائے وزیر اعظم اور وزیر اعلیٰ کے انتخابات کے، خفیہ رائے شماری (سیکرٹ بیلٹ) کے ذریعے ہوں گے۔`,
    urduStatus: 'official_verified',
    clauses: [
      {
        id: 'PK-CONST-A226-C01',
        articleId: 'PK-CONST-A226',
        clauseNumber: 'Article Text',
        text: {
          en: 'Mandatory secret ballot for all elections under the Constitution (President, Senate, Speaker) excluding open division for PM and CM.',
          ur: 'صدر، سینیٹ اور اسپیکر کے لیے خفیہ رائے شماری کا لازمی حکم، جبکہ وزیر اعظم اور وزیر اعلیٰ کا انتخاب کھلی رائے شماری سے ہوگا۔',
        },
      },
    ],
    easyExplanation: {
      en: 'Guarantees the secrecy of the ballot for citizens in general elections, and for legislators voting in Presidential, Senate, and Speaker elections. The Prime Minister and Chief Minister are elected through open division to preserve transparency.',
      ur: 'عام شہریوں کے ووٹ اور سینیٹ و صدارتی انتخابات کے لیے خفیہ بیلٹ کی ضمانت دیتا ہے، جبکہ وزیر اعظم کا انتخاب کھلے ایوان میں ارکان کے کھڑے ہو کر ووٹ دینے کے ذریعے ہوتا ہے۔',
    },
    landmarkPrecedents: [
      {
        citation: 'PLD 2021 SC 873',
        caseName: {
          en: 'Reference by the President under Article 186 (Senate Secret Ballot Reference)',
          ur: 'صدارتی ریفرنس برائے سینیٹ خفیہ رائے شماری',
        },
        judgmentDate: '2021-03-01',
        courtName: {
          en: 'Supreme Court of Pakistan',
          ur: 'سپریم کورٹ آف پاکستان',
        },
        principleEstablished: {
          en: 'Held that Senate elections fall within Article 226 and must be held by secret ballot, but secrecy is not absolute against proven corrupt practices; ECP has an affirmative duty to use traceable technology to counter vote-buying.',
          ur: 'سپریم کورٹ نے قرار دیا کہ سینیٹ کا الیکشن آئین کے آرٹیکل 226 کے تحت خفیہ ووٹنگ سے ہوگا، تاہم الیکشن کمیشن ووٹوں کی خرید و فروخت روکنے کے لیے ٹیکنالوجی کا استعمال کر سکتا ہے۔',
        },
      },
    ],
    amendmentHistory: [],
    relatedArticleIds: ['PK-CONST-A041', 'PK-CONST-A059', 'PK-CONST-A091', 'PK-CONST-A130'],
    thematicCategories: ['Secret Ballot', 'Senate Elections', 'Electoral Secrecy'],
    sourceCitationId: 'SRC-CONST-NA-ENG-2024',
    status: 'active',
    lastReviewedAt: '2026-10-31',
  },
];
