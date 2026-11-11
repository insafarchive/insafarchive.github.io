/**
 * INSAF ARCHIVE (انصاف آرکائیو)
 * Constitutional Batch G: Part VII (Articles 175–212) — The Judicature
 * Supreme Court, High Courts, Judicial Commission, 26th Amendment & Supreme Judicial Council
 * Verbatim text from Official Gazette of Pakistan & Pakistan Code
 */

import type { ConstitutionalArticle } from '../../../types/constitution';

export const CONSTITUTION_BATCH_G: ConstitutionalArticle[] = [
  // =========================================================================
  // ARTICLE 175: Establishment and jurisdiction of courts
  // =========================================================================
  {
    id: 'PK-CONST-A175',
    articleNumber: '175',
    partId: 'PK-CONST-P07',
    chapterId: 'PK-CONST-P07-CH01',
    title: {
      en: 'Establishment and jurisdiction of courts',
      ur: 'عدالتوں کا قیام، دائرہ اختیار اور انتظامیہ سے علیحدگی',
    },
    originalStatutoryEnglish: `(1) There shall be a Supreme Court of Pakistan, a High Court for each Province and a High Court for the Islamabad Capital Territory and such other courts as may be established by law.
Explanation.—The words "High Court" include the High Court for the Islamabad Capital Territory.
(2) No court shall have any jurisdiction save as is or may be conferred on it by the Constitution or by or under any law.
(3) The Judiciary shall be separated progressively from the Executive within fourteen years from the commencing day.`,
    urduText: `(1) پاکستان کی ایک سپریم کورٹ ہوگی، ہر صوبے کے لیے ایک ہائی کورٹ، اور اسلام آباد وفاقی دارالحکومت کے لیے ایک ہائی کورٹ ہوگی اور ایسی دیگر عدالتیں ہوں گی جو قانون کے ذریعے قائم کی جائیں۔
(2) کسی عدالت کو کوئی ایسا دائرہ اختیار حاصل نہیں ہوگا جو آئین یا قانون نے اسے عطا نہ کیا ہو۔
(3) عدلیہ کو آئین کے نفاذ کے چودہ سال کے اندر بتدریج انتظامیہ سے الگ کیا جائے گا۔`,
    urduStatus: 'official_verified',
    clauses: [
      {
        id: 'PK-CONST-A175-C01',
        articleId: 'PK-CONST-A175',
        clauseNumber: '(1)',
        text: {
          en: 'Establishes the Supreme Court, Provincial High Courts, and Islamabad High Court.',
          ur: 'سپریم کورٹ، صوبائی ہائی کورٹس اور اسلام آباد ہائی کورٹ کا قیام۔',
        },
      },
      {
        id: 'PK-CONST-A175-C02',
        articleId: 'PK-CONST-A175',
        clauseNumber: '(2)',
        text: {
          en: 'Courts exercise only jurisdiction conferred expressly by the Constitution or statutory law.',
          ur: 'عدالتیں صرف وہی اختیار استعمال کر سکتی ہیں جو آئین یا قانون نے دیا ہو۔',
        },
      },
      {
        id: 'PK-CONST-A175-C03',
        articleId: 'PK-CONST-A175',
        clauseNumber: '(3)',
        text: {
          en: 'Mandatory separation of Judiciary from Executive authority.',
          ur: 'عدلیہ کو انتظامیہ کے کنٹرول سے مکمل اور آزادانہ طور پر الگ کرنے کا آئینی حکم۔',
        },
      },
    ],
    easyExplanation: {
      en: 'The constitutional fountainhead for the independence of the judiciary. Mandates the institutional separation of judicial functions from the executive government and sets the structure of higher courts.',
      ur: 'عدلیہ کی آزادی کا سب سے بڑا آئینی ستون۔ ڈپٹی کمشنروں اور انتظامی افسران سے عدالتی اختیارات چھین کر آزاد ججوں کے ماتحت کرنے اور عدلیہ کو ایگزیکٹو کے دباؤ سے الگ کرنے کا حکم دیتا ہے۔',
    },
    landmarkPrecedents: [
      {
        citation: 'PLD 1996 SC 324',
        caseName: {
          en: 'Al-Jehad Trust v. Federation of Pakistan (Judges Case)',
          ur: 'الجہاد ٹرسٹ بنام وفاقِ پاکستان (ججز کیس)',
        },
        judgmentDate: '1996-03-20',
        courtName: {
          en: 'Supreme Court of Pakistan',
          ur: 'سپریم کورٹ آف پاکستان',
        },
        principleEstablished: {
          en: 'Independence of the judiciary is an entrenched basic feature of the Constitution. Executive consultation in judicial appointments must be meaningful, purposeful, and consensus-oriented.',
          ur: 'عدلیہ کی آزادی آئین کا بنیادی اور ناقابلِ تنسیخ ستون ہے؛ ججوں کی تقرری میں چیف جسٹس کی رائے کو فوقیت حاصل ہے۔',
        },
      },
    ],
    amendmentHistory: [],
    relatedArticleIds: ['PK-CONST-A175A', 'PK-CONST-A177', 'PK-CONST-A193'],
    thematicCategories: ['Judicial Independence', 'Separation of Powers', 'Court Hierarchy'],
    sourceCitationId: 'SRC-CONST-NA-ENG-2024',
    status: 'active',
    lastReviewedAt: '2026-10-31',
  },

  // =========================================================================
  // ARTICLE 175A: Appointment of Judges
  // =========================================================================
  {
    id: 'PK-CONST-A175A',
    articleNumber: '175A',
    partId: 'PK-CONST-P07',
    chapterId: 'PK-CONST-P07-CH01',
    title: {
      en: 'Appointment of Judges to Supreme Court, High Courts and the Federal Shariat Court',
      ur: 'سپریم کورٹ، ہائی کورٹس اور شریعت کورٹ کے ججوں کی تقرری (جوڈیشل کمیشن اور 26ویں ترمیم)',
    },
    originalStatutoryEnglish: `(1) There shall be a Judicial Commission of Pakistan, hereinafter in this Article referred to as the Commission, for appointment of Judges of the Supreme Court, High Courts and the Federal Shariat Court, as hereinafter provided.
(2) For appointment of Judges of the Supreme Court, the Commission shall consist of—
(i) Chief Justice of Pakistan (Chairman);
(ii) three senior-most Judges of the Supreme Court;
(iii) a former Chief Justice or former Judge of the Supreme Court;
(iv) Federal Minister for Law and Justice;
(v) Attorney-General for Pakistan;
(vi) a Senior Advocate of the Supreme Court nominated by the Pakistan Bar Council;
(vii) two members of the Senate and two members of the National Assembly; and
(viii) a woman or non-Muslim, nominated by the Speaker.
(3) The Chief Justice of Pakistan shall be appointed by the Special Parliamentary Committee from amongst the three senior-most Judges of the Supreme Court.
(8) The Commission shall nominate one person for each vacancy of a Judge in the Supreme Court or a High Court.`,
    urduText: `(1) سپریم کورٹ، ہائی کورٹس اور فیڈرل شریعت کورٹ کے ججوں کے تقرر کے لیے ایک جوڈیشل کمیشن آف پاکستان ہوگا۔
(2) سپریم کورٹ کے ججوں کی تقرری کے لیے کمیشن چیف جسٹس آف پاکستان، سینئر ججز، وزیرِ قانون، اٹارنی جنرل، پاکستان بار کونسل کے نمائندے، اور پارلیمانی ارکان پر مشتمل ہوگا۔
(3) چیف جسٹس آف پاکستان کا تقرر تین سینئر ترین ججوں میں سے خصوصی پارلیمانی کمیٹی کی سفارش پر کیا جائے گا (26ویں ترمیم)۔`,
    urduStatus: 'official_verified',
    clauses: [
      {
        id: 'PK-CONST-A175A-C01',
        articleId: 'PK-CONST-A175A',
        clauseNumber: '(1)',
        text: {
          en: 'Establishes Judicial Commission of Pakistan (JCP) for superior judicial appointments.',
          ur: 'اعلیٰ عدالتوں کے ججوں کی تقرری کے لیے جوڈیشل کمیشن آف پاکستان کا قیام۔',
        },
      },
      {
        id: 'PK-CONST-A175A-C03',
        articleId: 'PK-CONST-A175A',
        clauseNumber: '(3)',
        text: {
          en: 'Appointment of Chief Justice of Pakistan by Special Parliamentary Committee from top three senior judges (26th Amendment).',
          ur: '26ویں ترمیم کے تحت تین سینئر ترین ججوں میں سے پارلیمانی کمیٹی کے ذریعے چیف جسٹس آف پاکستان کا انتخاب۔',
        },
      },
    ],
    easyExplanation: {
      en: 'Regulates judicial appointments. Inserted by the 18th Amendment (2010) and heavily restructured by the 26th Amendment (2024). Establishes the Judicial Commission with judicial, executive, bar, and parliamentary representation, and introduces parliamentary nomination of the Chief Justice from among the three senior-most judges.',
      ur: 'ججوں کی تقرری کا جدید ترین طریقہ کار۔ 18ویں ترمیم کے بعد 26ویں آئینی ترمیم (اکتوبر 2024) کے تحت چیف جسٹس کے تقرر کا اختیار تین سینئر ترین ججوں میں سے 12 رکنی پارلیمانی کمیٹی کو دیا گیا اور جوڈیشل کمیشن میں پارلیمنٹ کی نمائندگی بڑھائی گئی۔',
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
          en: 'Introduced Article 175A establishing Judicial Commission and Parliamentary Committee.',
          ur: 'آرٹیکل 175A شامل کر کے ججوں کی تقرری کے لیے جوڈیشل کمیشن اور پارلیمانی کمیٹی قائم کی۔',
        },
        typeOfChange: 'inserted',
      },
      {
        amendmentId: 'PK-CONST-AMD-26',
        amendmentNumber: 26,
        actTitle: {
          en: 'Constitution (Twenty-sixth Amendment) Act, 2024',
          ur: 'آئین (چھبیسویں ترمیم) ایکٹ، 2024ء',
        },
        year: 2024,
        effectiveDate: '2024-10-21',
        summaryOfChange: {
          en: 'Reconstituted JCP with equal parliamentary members and established appointment of CJP from three senior-most judges by a Special Parliamentary Committee.',
          ur: 'جوڈیشل کمیشن کی تشکیل نو کی اور خصوصی پارلیمانی کمیٹی کے ذریعے تین سینئر ترین ججوں میں سے چیف جسٹس کا انتخاب نافذ کیا۔',
        },
        typeOfChange: 'amended',
      },
    ],
    relatedArticleIds: ['PK-CONST-A175', 'PK-CONST-A177', 'PK-CONST-A193'],
    thematicCategories: ['Judicial Appointments', '26th Amendment', 'Chief Justice Selection', 'Judicial Commission'],
    sourceCitationId: 'SRC-CONST-SENATE-AMD26',
    status: 'active',
    lastReviewedAt: '2026-10-31',
  },

  // =========================================================================
  // ARTICLE 184: Original Jurisdiction of Supreme Court (PIL & Suo Motu)
  // =========================================================================
  {
    id: 'PK-CONST-A184',
    articleNumber: '184',
    partId: 'PK-CONST-P07',
    chapterId: 'PK-CONST-P07-CH02',
    title: {
      en: 'Original Jurisdiction of Supreme Court',
      ur: 'سپریم کورٹ کا بنیادی دائرہ اختیار (آرٹیکل 184/3 از خود نوٹس و بنیادی حقوق)',
    },
    originalStatutoryEnglish: `(1) The Supreme Court shall, to the exclusion of every other court, have original jurisdiction in any dispute between any two or more Governments.
(2) In the exercise of the jurisdiction conferred on it by clause (1), the Supreme Court shall pronounce declaratory judgments only.
(3) Without prejudice to the provisions of Article 199, the Supreme Court shall, if it considers that a question of public importance with reference to the enforcement of any of the Fundamental Rights conferred by Chapter 1 of Part II is involved, have the power to make an order of the nature mentioned in the said Article.`,
    urduText: `(1) سپریم کورٹ کو، دیگر تمام عدالتوں کے اخراج کے ساتھ، کسی دو یا زائد حکومتوں (وفاق اور صوبوں) کے درمیان کسی بھی تنازعے میں بنیادی دائرہ اختیار حاصل ہوگا۔
(2) شق (1) میں سپریم کورٹ صرف اعلانیہ (ڈیکلیریٹری) فیصلے صادر کرے گی۔
(3) آرٹیکل 199 کے احکام کو متاثر کیے بغیر، اگر سپریم کورٹ یہ سمجھے کہ بنیادی حقوق کے نفاذ کے حوالے سے عوامی اہمیت کا کوئی سوال درپیش ہے، تو اسے ایسا کوئی بھی حکم جاری کرنے کا اختیار ہوگا جس کی نوعیت مذکورہ آرٹیکل میں بیان کی گئی ہے۔`,
    urduStatus: 'official_verified',
    clauses: [
      {
        id: 'PK-CONST-A184-C01',
        articleId: 'PK-CONST-A184',
        clauseNumber: '(1)',
        text: {
          en: 'Exclusive original jurisdiction in inter-governmental disputes between Federation and Provinces.',
          ur: 'وفاق اور صوبوں کے درمیان تنازعات میں سپریم کورٹ کا خصوصی بنیادی اختیار۔',
        },
      },
      {
        id: 'PK-CONST-A184-C03',
        articleId: 'PK-CONST-A184',
        clauseNumber: '(3)',
        text: {
          en: 'Public Interest Litigation (PIL) and Suo Motu jurisdiction for enforcement of Fundamental Rights on questions of public importance.',
          ur: 'عوامی اہمیت اور بنیادی حقوق کے نفاذ کے لیے سپریم کورٹ کا مفادِ عامہ اور از خود نوٹس (Suo Motu) کا اختیار۔',
        },
      },
    ],
    easyExplanation: {
      en: 'The legendary provision empowering the Supreme Court to intervene in matters of public importance involving the enforcement of Fundamental Rights. Has been used for human rights enforcement, investigating disappearances, halting arbitrary privatizations, and striking down unlawful executive decrees.',
      ur: 'سپریم کورٹ کے مشہورِ زمانہ از خود نوٹس (Suo Motu) اور مفادِ عامہ کی رٹ کا ماخذ۔ عوامی اہمیت اور بنیادی حقوق کی پامالی پر سپریم کورٹ بغیر کسی فیس یا رسمی درخواست کے براہِ راست مداخلت کر کے انصاف فراہم کر سکتی ہے۔',
    },
    landmarkPrecedents: [
      {
        citation: 'PLD 1988 SC 416',
        caseName: {
          en: 'Benazir Bhutto v. Federation of Pakistan (PIL Locus Standi)',
          ur: 'بینظیر بھٹو بنام وفاقِ پاکستان (مفادِ عامہ کا حقِ دعویٰ)',
        },
        judgmentDate: '1988-10-05',
        courtName: {
          en: 'Supreme Court of Pakistan',
          ur: 'سپریم کورٹ آف پاکستان',
        },
        principleEstablished: {
          en: 'Traditional rules of locus standi (standing) are relaxed under Article 184(3). Any public-spirited citizen or political party may petition the Supreme Court to enforce fundamental human rights.',
          ur: 'آرٹیکل 184(3) میں متاثرہ فریق ہونے کی روایتی شرط نرم کر دی گئی؛ کوئی بھی باضمیر شہری مفادِ عامہ اور انسانی حقوق کے تحفظ کے لیے سپریم کورٹ سے رجوع کر سکتا ہے۔',
        },
      },
      {
        citation: 'PLD 2006 SC 697',
        caseName: {
          en: 'Watan Party v. Federation of Pakistan (Pakistan Steel Mills Case)',
          ur: 'وطن پارٹی بنام وفاقِ پاکستان (پاکستان اسٹیل ملز نجکاری کیس)',
        },
        judgmentDate: '2006-06-23',
        courtName: {
          en: 'Supreme Court of Pakistan',
          ur: 'سپریم کورٹ آف پاکستان',
        },
        principleEstablished: {
          en: 'Under Article 184(3), the Supreme Court struck down the privatization of Pakistan Steel Mills due to procedural haste, undervaluation, and lack of transparency.',
          ur: 'سپریم کورٹ نے آرٹیکل 184(3) کے تحت اسٹیل ملز کی غیر شفاف نجکاری کو مفادِ عامہ کے خلاف ہونے کی بنیاد پر منسوخ کیا۔',
        },
      },
    ],
    amendmentHistory: [],
    relatedArticleIds: ['PK-CONST-A008', 'PK-CONST-A009', 'PK-CONST-A187', 'PK-CONST-A199'],
    thematicCategories: ['Public Interest Litigation', 'Suo Motu', 'Fundamental Rights', 'Judicial Review'],
    sourceCitationId: 'SRC-CONST-NA-ENG-2024',
    status: 'active',
    lastReviewedAt: '2026-10-31',
  },

  // =========================================================================
  // ARTICLE 189: Decisions of Supreme Court binding on other Courts
  // =========================================================================
  {
    id: 'PK-CONST-A189',
    articleNumber: '189',
    partId: 'PK-CONST-P07',
    chapterId: 'PK-CONST-P07-CH02',
    title: {
      en: 'Decisions of Supreme Court binding on other Courts',
      ur: 'سپریم کورٹ کے فیصلوں کا تمام عدالتوں پر لازم ہونا (نظیر / پریسیڈنٹ)',
    },
    originalStatutoryEnglish: `Any decision of the Supreme Court shall, to the extent that it decides a question of law or is based upon or enunciates a principle of law, be binding on all other courts in Pakistan.`,
    urduText: `سپریم کورٹ کا کوئی بھی فیصلہ، جہاں تک کہ وہ کسی قانونی سوال کا تصفیہ کرے یا قانون کے کسی اصول پر مبنی ہو یا اسے وضع کرے، پاکستان کی تمام دیگر عدالتوں پر واجب التعمیل (لازم) ہوگا۔`,
    urduStatus: 'official_verified',
    clauses: [
      {
        id: 'PK-CONST-A189-C01',
        articleId: 'PK-CONST-A189',
        clauseNumber: 'Article Text',
        text: {
          en: 'Any legal principle or question of law decided by Supreme Court is binding on all High Courts and subordinate courts across Pakistan.',
          ur: 'سپریم کورٹ کا طے کردہ ہر قانونی اصول ملک کی تمام ہائی کورٹس اور ماتحت عدالتوں پر لازم ہے۔',
        },
      },
    ],
    easyExplanation: {
      en: 'Constitutional doctrine of judicial precedent (stare decisis). Principles of law enunciated by the Supreme Court constitute binding law for all High Courts, trial courts, and judicial tribunals in Pakistan.',
      ur: 'عدالتی نظیر (پریسیڈنٹ) کا لازمی آئینی اصول۔ سپریم کورٹ جو قانونی تشریح طے کر دے، ملک کی ہر ہائی کورٹ، سیشن کورٹ اور ٹربیونل اس پر من و عن عمل کرنے کی پابند ہے۔',
    },
    landmarkPrecedents: [],
    amendmentHistory: [],
    relatedArticleIds: ['PK-CONST-A190', 'PK-CONST-A201'],
    thematicCategories: ['Judicial Precedent', 'Stare Decisis', 'Rule of Law'],
    sourceCitationId: 'SRC-CONST-NA-ENG-2024',
    status: 'active',
    lastReviewedAt: '2026-10-31',
  },

  // =========================================================================
  // ARTICLE 190: Action in aid of Supreme Court
  // =========================================================================
  {
    id: 'PK-CONST-A190',
    articleNumber: '190',
    partId: 'PK-CONST-P07',
    chapterId: 'PK-CONST-P07-CH02',
    title: {
      en: 'Action in aid of Supreme Court',
      ur: 'سپریم کورٹ کی معاونت میں عمل درآمد',
    },
    originalStatutoryEnglish: `All executive and judicial authorities throughout Pakistan shall act in aid of the Supreme Court.`,
    urduText: `پورے پاکستان میں تمام انتظامی اور عدالتی حکام سپریم کورٹ کی معاونت میں کام کریں گے (اور اس کے احکامات کی تعمیل کے پابند ہوں گے)۔`,
    urduStatus: 'official_verified',
    clauses: [
      {
        id: 'PK-CONST-A190-C01',
        articleId: 'PK-CONST-A190',
        clauseNumber: 'Article Text',
        text: {
          en: 'All executive, law enforcement, and judicial authorities across Pakistan are constitutionally bound to implement and assist in execution of Supreme Court orders.',
          ur: 'ملک کے تمام انتظامی اور پولیس و سیکیورٹی ادارے سپریم کورٹ کے احکامات پر عمل درآمد کرانے کے پابند ہیں۔',
        },
      },
    ],
    easyExplanation: {
      en: 'Constitutional enforcement command. Every civil, military, administrative, and law-enforcement body in Pakistan (including the Prime Minister, Police, FIA, NAB, and Armed Forces) is bound by the Constitution to execute the lawful orders of the Supreme Court.',
      ur: 'آئینی نفاذ کا حکم۔ حکومت، پولیس، رینجرز اور تمام ریاستی ادارے سپریم کورٹ کے فیصلوں اور احکامات پر عمل درآمد کرانے کے پابند ہیں؛ انکار کرنا آئین شکنی اور توہینِ عدالت ہے۔',
    },
    landmarkPrecedents: [],
    amendmentHistory: [],
    relatedArticleIds: ['PK-CONST-A187', 'PK-CONST-A189', 'PK-CONST-A204'],
    thematicCategories: ['Judicial Enforcement', 'Executive Compliance', 'Rule of Law'],
    sourceCitationId: 'SRC-CONST-NA-ENG-2024',
    status: 'active',
    lastReviewedAt: '2026-10-31',
  },

  // =========================================================================
  // ARTICLE 199: Jurisdiction of High Court (Writ Jurisdiction)
  // =========================================================================
  {
    id: 'PK-CONST-A199',
    articleNumber: '199',
    partId: 'PK-CONST-P07',
    chapterId: 'PK-CONST-P07-CH03',
    title: {
      en: 'Jurisdiction of High Court',
      ur: 'ہائی کورٹ کا رٹ دائرہ اختیار (حبسِ بے جا، مینڈامس اور بنیادی حقوق)',
    },
    originalStatutoryEnglish: `(1) Subject to the Constitution, a High Court may, if it is satisfied that no other adequate remedy is provided by law,—
(a) on the application of any aggrieved party, make an order—
(i) directing a person performing functions in connection with the affairs of the Federation, a Province or a local authority to refrain from doing that which he is not permitted by law to do, or to do that which he is required by law to do (Prohibition & Mandamus); or
(ii) declaring that any act done or proceeding taken by a person performing functions in connection with the affairs of the Federation, a Province or a local authority has been done or taken without lawful authority and is of no legal effect (Certiorari); or
(b) on the application of any person, make an order—
(i) directing that a person in custody within the territorial jurisdiction of the Court be brought before it so that the Court may satisfy itself that he is not being held in custody without lawful authority or in an unlawful manner (Habeas Corpus); or
(ii) requiring a person holding or purporting to hold a public office to show under what authority of law he claims to hold that office (Quo Warranto); or
(c) on the application of any aggrieved person, make an order giving such directions to any person or authority for the enforcement of any of the Fundamental Rights.`,
    urduText: `(1) آئین کے تابع، ہائی کورٹ اگر مطمئن ہو کہ قانون میں کوئی اور مناسب علاج موجود نہیں ہے تو—
(الف) کسی متاثرہ فریق کی درخواست پر غیر قانونی اقدام کو روکنے (Prohibition) یا قانونی فریضہ پورا کرنے (Mandamus) یا کسی فیصلے کو غیر قانونی قرار دینے (Certiorari) کا حکم دے سکتی ہے؛
(ب) کسی بھی شخص کی درخواست پر—
(1) حبسِ بے جا (Habeas Corpus): حراست میں لیے گئے کسی شخص کو عدالت میں پیش کرنے کا حکم تاکہ دیکھا جا سکے کہ حراست غیر قانونی تو نہیں؛
(2) کو وارنٹو (Quo Warranto): کسی پبلک آفس ہولڈر سے اختیارات اور قانونی جواز طلب کرنا؛ اور
(ج) بنیادی حقوق کے نفاذ کے لیے کوئی بھی باضابطہ حکم جاری کرنا۔`,
    urduStatus: 'official_verified',
    clauses: [
      {
        id: 'PK-CONST-A199-C01',
        articleId: 'PK-CONST-A199',
        clauseNumber: '(1)(a)-(c)',
        text: {
          en: 'Empowers High Courts to issue prerogative writs: Mandamus, Prohibition, Certiorari, Habeas Corpus, Quo Warranto, and enforcement of Fundamental Rights.',
          ur: 'ہائی کورٹس کے پانچوں بنیادی رٹ اختیارات: حبس بے جا، مینڈامس، پروہبیشن، سرٹیوراری اور کو وارنٹو۔',
        },
      },
    ],
    easyExplanation: {
      en: 'The foremost constitutional safeguard against executive tyranny. High Courts protect citizens by issuing writs: freeing citizens from illegal police detention or enforced disappearances (Habeas Corpus), striking down illegal government orders (Certiorari), compelling civil servants to do their statutory duty (Mandamus), and disqualifying unauthorized public officials (Quo Warranto).',
      ur: 'عوام کا ریاست اور پولیس کے ظلم کے خلاف سب سے موثر آئینی ہتھیار۔ ہائی کورٹ شہریوں کو غیر قانونی حراست اور جبری گمشدگی سے بازیاب کرانے (حبسِ بے جا)، غیر قانونی حکومتی احکامات کو منسوخ کرنے اور بنیادی حقوق نافذ کرنے کے لیے رٹ جاری کرتی ہے۔',
    },
    landmarkPrecedents: [],
    amendmentHistory: [],
    relatedArticleIds: ['PK-CONST-A004', 'PK-CONST-A009', 'PK-CONST-A010', 'PK-CONST-A184'],
    thematicCategories: ['Writ Jurisdiction', 'Habeas Corpus', 'Enforced Disappearances', 'High Courts', 'Fundamental Rights'],
    sourceCitationId: 'SRC-CONST-NA-ENG-2024',
    status: 'active',
    lastReviewedAt: '2026-10-31',
  },

  // =========================================================================
  // ARTICLE 204: Contempt of Court
  // =========================================================================
  {
    id: 'PK-CONST-A204',
    articleNumber: '204',
    partId: 'PK-CONST-P07',
    chapterId: 'PK-CONST-P07-CH04',
    title: {
      en: 'Contempt of Court',
      ur: 'توہینِ عدالت',
    },
    originalStatutoryEnglish: `(1) In this Article, "Court" means the Supreme Court or a High Court.
(2) A Court shall have power to punish any person who—
(a) abuses, interferes with or obstructs the process of the Court in any way or disobeys any order of the Court;
(b) scandalizes the Court or otherwise does anything which tends to bring the Court or a Judge of the Court into hatred, ridicule or contempt;
(c) does anything which tends to prejudice the determination of a matter pending before the Court; or
(d) does any other thing which, by law, constitutes contempt of the Court.
(3) The exercise of the power conferred on a Court by this Article may be regulated by law and, subject to law, by rules made by the Court.`,
    urduText: `(1) اس آرٹیکل میں "عدالت" سے مراد سپریم کورٹ یا ہائی کورٹ ہے۔
(2) عدالت کو کسی بھی ایسے شخص کو سزا دینے کا اختیار ہوگا جو—
(الف) عدالت کی کارروائی میں رکاوٹ ڈالے یا عدالتی حکم کی نافرمانی کرے؛
(ب) عدالت کو بدنام کرے یا جج کو تضحیک یا نفرت کا نشانہ بنائے؛ یا
(ج) عدالت میں زیرِ سماعت مقدمے پر اثر انداز ہونے کی کوشش کرے۔`,
    urduStatus: 'official_verified',
    clauses: [
      {
        id: 'PK-CONST-A204-C02',
        articleId: 'PK-CONST-A204',
        clauseNumber: '(2)',
        text: {
          en: 'Power of Supreme Court and High Courts to punish for disobedience of orders, scandalizing the judiciary, or obstruction of justice.',
          ur: 'عدالتی احکامات کی خلاف ورزی یا ججوں کی تضحیک پر سزا دینے کا سپریم کورٹ اور ہائی کورٹس کا اختیار۔',
        },
      },
    ],
    easyExplanation: {
      en: 'Empowers higher courts to punish individuals who disobey lawful court orders or obstruct the administration of justice. In 2012, Prime Minister Yousuf Raza Gillani was convicted of contempt under Article 204 for refusing to write a letter to Swiss authorities.',
      ur: 'عدالتی احکامات کی حکم عدولی پر سزا کا اختیار۔ 2012 میں سابق وزیر اعظم یوسف رضا گیلانی کو عدالتی فیصلے پر عمل نہ کرنے پر توہینِ عدالت میں سزا دے کر نااہل قرار دیا گیا تھا۔',
    },
    landmarkPrecedents: [
      {
        citation: 'PLD 2012 SC 553',
        caseName: {
          en: 'Suo Motu Contempt Proceedings against Syed Yousaf Raza Gillani, Prime Minister of Pakistan',
          ur: 'سید یوسف رضا گیلانی بنام توہینِ عدالت کارروائی',
        },
        judgmentDate: '2012-04-26',
        courtName: {
          en: 'Supreme Court of Pakistan',
          ur: 'سپریم کورٹ آف پاکستان',
        },
        principleEstablished: {
          en: 'Willful defiance of a binding order of the Supreme Court constitutes contempt under Article 204, disqualifying an elected Prime Minister from holding public office under Article 63(1)(g).',
          ur: 'سپریم کورٹ کے فیصلے پر دانستہ عمل نہ کرنا توہینِ عدالت ہے جس کے تحت وزیر اعظم کو سزا اور نااہلی کا سامنا کرنا پڑا۔',
        },
      },
    ],
    amendmentHistory: [],
    relatedArticleIds: ['PK-CONST-A063', 'PK-CONST-A187', 'PK-CONST-A190'],
    thematicCategories: ['Contempt of Court', 'Judicial Power', 'Enforcement of Decrees'],
    sourceCitationId: 'SRC-CONST-NA-ENG-2024',
    status: 'active',
    lastReviewedAt: '2026-10-31',
  },

  // =========================================================================
  // ARTICLE 209: Supreme Judicial Council
  // =========================================================================
  {
    id: 'PK-CONST-A209',
    articleNumber: '209',
    partId: 'PK-CONST-P07',
    chapterId: 'PK-CONST-P07-CH04',
    title: {
      en: 'Supreme Judicial Council',
      ur: 'سپریم جوڈیشل کونسل (ججوں کا احتساب اور برطرفی)',
    },
    originalStatutoryEnglish: `(1) There shall be a Supreme Judicial Council of Pakistan, in this Chapter referred to as the Council.
(2) The Council shall consist of—
(a) the Chief Justice of Pakistan;
(b) the two next most senior Judges of the Supreme Court; and
(c) the two most senior Chief Justices of High Courts.
(5) If, on information from any source, the Council or the President is of the opinion that a Judge of the Supreme Court or of a High Court—
(a) may be incapable of properly performing the duties of his office by reason of physical or mental incapacity; or
(b) may have been guilty of misconduct,
the President shall direct the Council to, or the Council may, on its own motion, inquire into the matter.
(6) If, after inquiring into the matter, the Council reports to the President that it is of the opinion that the Judge is incapable of performing the duties of his office or has been guilty of misconduct, and that he should be removed from office, the President may remove the Judge from office.
(7) A Judge of the Supreme Court or of a High Court shall not be removed from office except as provided by this Article.`,
    urduText: `(1) پاکستان کی ایک سپریم جوڈیشل کونسل ہوگی۔
(2) کونسل چیف جسٹس آف پاکستان، سپریم کورٹ کے دو اگلے سینئر ترین ججز، اور ہائی کورٹس کے دو سینئر ترین چیف جسٹس صاحبان پر مشتمل ہوگی۔
(5) اگر کونسل یا صدر کو معلوم ہو کہ کوئی جج جسمانی یا ذہنی نااہلی یا مس کنڈکٹ (بدعنوانی/بدعنوانی) کا مرتکب ہوا ہے تو کونسل تحقیقات کرے گی۔
(6) اگر کونسل جج کو مس کنڈکٹ کا مرتکب پائے تو وہ صدر کو جج کو عہدے سے ہٹانے کی سفارش کرے گی جس پر صدر جج کو برطرف کر سکے گا۔
(7) سپریم کورٹ یا ہائی کورٹ کے کسی جج کو اس آرٹیکل کے سوا کسی اور طریقے سے برطرف نہیں کیا جا سکتا۔`,
    urduStatus: 'official_verified',
    clauses: [
      {
        id: 'PK-CONST-A209-C02',
        articleId: 'PK-CONST-A209',
        clauseNumber: '(2)',
        text: {
          en: 'SJC composition: Chief Justice of Pakistan, two senior-most Supreme Court Judges, and two senior-most High Court Chief Justices.',
          ur: 'کونسل کی تشکیل: چیف جسٹس، دو سینئر ترین سپریم کورٹ ججز، اور دو سینئر ترین ہائی کورٹ چیف جسٹس۔',
        },
      },
      {
        id: 'PK-CONST-A209-C05',
        articleId: 'PK-CONST-A209',
        clauseNumber: '(5)',
        text: {
          en: 'Inquiry into judicial misconduct or incapacity either on Presidential reference or on Council\'s own motion.',
          ur: 'ججوں کے مس کنڈکٹ پر صدارتی ریفرنس یا کونسل کے از خود نوٹس پر شفاف احتساب۔',
        },
      },
      {
        id: 'PK-CONST-A209-C07',
        articleId: 'PK-CONST-A209',
        clauseNumber: '(7)',
        text: {
          en: 'Exclusive constitutional forum for removal of superior court judges; protects judicial independence.',
          ur: 'اعلیٰ عدلیہ کے ججوں کی برطرفی کا واحد آئینی فورم؛ بلا جواز حکومتی برطرفیوں سے تحفظ۔',
        },
      },
    ],
    easyExplanation: {
      en: 'The sole constitutional disciplinary body for superior court judges. Superior judges cannot be fired by the Prime Minister or Parliament; they can only be removed following an open inquiry by their judicial peers in the SJC for proved misconduct or incapacity.',
      ur: 'اعلیٰ عدلیہ کے ججوں کے احتساب کا واحد ادارہ۔ کوئی حکومت، فوج یا پارلیمنٹ کسی جج کو براہ راست برطرف نہیں کر سکتی؛ صرف سپریم جوڈیشل کونسل کی تحقیقات اور مس کنڈکٹ ثابت ہونے پر ہی جج کو ہٹایا جا سکتا ہے۔',
    },
    landmarkPrecedents: [
      {
        citation: 'PLD 2021 SC 1',
        caseName: {
          en: 'Justice Qazi Faez Isa v. President of Pakistan (SJC Reference Case)',
          ur: 'جسٹس قاضی فائز عیسیٰ بنام صدرِ پاکستان (سپریم جوڈیشل کونسل ریفرنس کیس)',
        },
        judgmentDate: '2020-06-19',
        courtName: {
          en: 'Supreme Court of Pakistan',
          ur: 'سپریم کورٹ آف پاکستان',
        },
        principleEstablished: {
          en: 'The Supreme Court quashed the Presidential reference against Justice Qazi Faez Isa, ruling that unlawful intelligence surveillance and flawed asset allegations against a sitting judge violate due process and judicial independence under Article 209.',
          ur: 'سپریم کورٹ کے 10 رکنی بینچ نے جسٹس قاضی فائز عیسیٰ کے خلاف صدارتی ریفرنس کو بدنیتی اور غیر قانونی نگرانی پر مبنی قرار دے کر کالعدم کیا۔',
        },
      },
    ],
    amendmentHistory: [],
    relatedArticleIds: ['PK-CONST-A175', 'PK-CONST-A179', 'PK-CONST-A195'],
    thematicCategories: ['Supreme Judicial Council', 'Judicial Accountability', 'Misconduct Inquiries', 'Removal of Judges'],
    sourceCitationId: 'SRC-CONST-NA-ENG-2024',
    status: 'active',
    lastReviewedAt: '2026-10-31',
  },
];
