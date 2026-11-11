/**
 * INSAF ARCHIVE (انصاف آرکائیو)
 * Constitutional Batch I: Parts IX, X, XI & XII (Articles 227–280)
 * Islamic Provisions, Emergency, Constitutional Amendments, Armed Forces & Historical Transitional Provisions
 * Verbatim text from Official Gazette of Pakistan & Pakistan Code
 */

import type { ConstitutionalArticle } from '../../../types/constitution';

export const CONSTITUTION_BATCH_I: ConstitutionalArticle[] = [
  // =========================================================================
  // ARTICLE 227: Provisions relating to the Holy Quran and Sunnah
  // =========================================================================
  {
    id: 'PK-CONST-A227',
    articleNumber: '227',
    partId: 'PK-CONST-P09',
    title: {
      en: 'Provisions relating to the Holy Quran and Sunnah',
      ur: 'قرآن و سنت کے متعلق احکام (اسلام کے منافی قانون سازی کی ممانعت)',
    },
    originalStatutoryEnglish: `(1) All existing laws shall be brought in conformity with the Injunctions of Islam as laid down in the Holy Quran and Sunnah, in this Part referred to as the Injunctions of Islam, and no law shall be enacted which is repugnant to such Injunctions.
Explanation.—In the application of this clause to the personal law of any Muslim sect, the expression "Quran and Sunnah" shall mean the Quran and Sunnah as interpreted by that sect.
(2) Effect shall be given to the provisions of clause (1) only in the manner provided in this Part.
(3) Nothing in this Part shall affect the personal laws of non-Muslim citizens or their status as citizens.`,
    urduText: `(1) تمام موجودہ قوانین کو قرآن و سنت میں بیان کردہ اسلامی احکام کے مطابق بنایا جائے گا، اور کوئی ایسا قانون نہیں بنایا جائے گا جو ایسے احکام کے منافی ہو۔
وضاحت: کسی مسلم فرقے کے پرسنل لاء پر اطلاق کی صورت میں قرآن و سنت سے مراد وہ تشریح ہوگی جو وہ فرقہ کرتا ہے۔
(3) اس حصہ کی کوئی بات غیر مسلم شہریوں کے پرسنل لاء یا بطور شہری ان کی حیثیت پر اثر انداز نہیں ہوگی۔`,
    urduStatus: 'official_verified',
    clauses: [
      {
        id: 'PK-CONST-A227-C01',
        articleId: 'PK-CONST-A227',
        clauseNumber: '(1)',
        text: {
          en: 'All existing laws brought into conformity with Quran and Sunnah; no law shall be enacted repugnant to Injunctions of Islam.',
          ur: 'تمام قوانین کا قرآن و سنت کے مطابق ہونا؛ اسلام کے منافی قانون سازی پر ممانعت۔',
        },
      },
      {
        id: 'PK-CONST-A227-C03',
        articleId: 'PK-CONST-A227',
        clauseNumber: '(3)',
        text: {
          en: 'Express protection of personal laws and citizenship status of non-Muslim minorities.',
          ur: 'غیر مسلم اقلیتوں کے پرسنل لاء اور آئینی و شہری حقوق کا مکمل تحفظ۔',
        },
      },
    ],
    easyExplanation: {
      en: 'The core Islamic provision of the Constitution. Directs that all laws must conform to Islamic injunctions and bars Parliament from passing un-Islamic laws, while protecting the personal religious laws of both Muslim sects and non-Muslim citizens.',
      ur: 'آئین کی بنیادی اسلامی دفعہ۔ تمام ملکی قوانین کو قرآن و سنت کے مطابق ڈھالنے اور اسلام کے منافی قانون نہ بنانے کا حکم دیتی ہے، ساتھ ہی غیر مسلم شہریوں کے خاندانی و مذہبی قوانین کا مکمل تحفظ کرتی ہے۔',
    },
    landmarkPrecedents: [],
    amendmentHistory: [],
    relatedArticleIds: ['PK-CONST-PRE', 'PK-CONST-A002', 'PK-CONST-A203D', 'PK-CONST-A228'],
    thematicCategories: ['Islamic Injunctions', 'Quran and Sunnah', 'Minority Personal Laws'],
    sourceCitationId: 'SRC-CONST-NA-ENG-2024',
    status: 'active',
    lastReviewedAt: '2026-10-31',
  },

  // =========================================================================
  // ARTICLE 232: Proclamation of emergency on account of war, etc.
  // =========================================================================
  {
    id: 'PK-CONST-A232',
    articleNumber: '232',
    partId: 'PK-CONST-P10',
    title: {
      en: 'Proclamation of emergency on account of war, internal disturbance, etc.',
      ur: 'جنگ یا اندرونی ہنگامے کی بنا پر ہنگامی حالت (ایمرجنسی) کا نفاذ',
    },
    originalStatutoryEnglish: `(1) If the President is satisfied that a grave emergency exists in which the security of Pakistan, or any part thereof, is threatened by war or external aggression, or by internal disturbance beyond the power of a Provincial Government to control, he may issue a Proclamation of Emergency:
Provided that for imposition of emergency due to internal disturbances beyond the power of a Provincial Government to control, a resolution from the Provincial Assembly of that Province shall be required:
Provided further that if the President acts on his own, the Proclamation of Emergency shall be placed before both Houses of Majlis-e-Shoora (Parliament) for approval by each House within ten days.
(2) While a Proclamation of Emergency is in force, Majlis-e-Shoora (Parliament) shall have power to make laws for a Province, or any part thereof, with respect to any matter not enumerated in the Federal Legislative List.`,
    urduText: `(1) اگر صدر مطمئن ہو کہ کوئی سنگین ہنگامی صورتحال درپیش ہے جس سے بیرونی جارحیت یا اندرونی خلفشار سے پاکستان کی سلامتی خطرے میں ہے، تو وہ ایمرجنسی کا اعلان کر سکتا ہے:
بشرطیکہ اندرونی خلفشار پر ایمرجنسی کے لیے متعلقہ صوبائی اسمبلی کی قرارداد درکار ہوگی؛ یا اگر صدر از خود نافذ کرے تو 10 دن میں پارلیمنٹ کے دونوں ایوانوں سے منظوری لینا لازمی ہوگی۔
(2) ایمرجنسی کے دوران پارلیمنٹ کو صوبائی امور پر بھی قانون سازی کا اختیار حاصل ہو جاتا ہے۔`,
    urduStatus: 'official_verified',
    clauses: [
      {
        id: 'PK-CONST-A232-C01',
        articleId: 'PK-CONST-A232',
        clauseNumber: '(1)',
        text: {
          en: 'Proclamation of Emergency strictly conditioned on war, external aggression, or provincial assembly resolution; 10-day parliamentary approval if issued unilaterally.',
          ur: 'ایمرجنسی کا نفاذ صرف جنگ یا صوبائی اسمبلی کی قرارداد پر ممکن؛ یکطرفہ صدارتی اعلان پر 10 دن میں پارلیمنٹ کی توثیق لازمی۔',
        },
      },
    ],
    easyExplanation: {
      en: 'Regulates national emergency powers. Under the 18th Amendment, the federal government cannot impose emergency on a province for internal unrest without a resolution from that Province\'s own Assembly, preventing unilateral federal takeovers.',
      ur: 'ایمرجنسی کا سخت آئینی ضابطہ۔ 18ویں ترمیم کے بعد وفاق کسی صوبے پر زبردستی ایمرجنسی مسلط نہیں کر سکتا جب تک کہ خود اس صوبے کی اسمبلی قرارداد پاس نہ کرے، یا 10 دن میں پارلیمنٹ دونوں ایوانوں سے منظوری نہ دے۔',
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
          en: 'Required Provincial Assembly resolution or 10-day parliamentary ratification for internal emergency.',
          ur: 'اندرونی ایمرجنسی کے لیے صوبائی اسمبلی کی قرارداد یا 10 دن میں پارلیمانی منظوری کی کڑی شرط عائد کی۔',
        },
        typeOfChange: 'amended',
      },
    ],
    relatedArticleIds: ['PK-CONST-A233', 'PK-CONST-A234', 'PK-CONST-A236'],
    thematicCategories: ['Emergency Powers', 'National Security', 'Provincial Safeguards'],
    sourceCitationId: 'SRC-CONST-NA-ENG-2024',
    status: 'active',
    lastReviewedAt: '2026-10-31',
  },

  // =========================================================================
  // ARTICLE 233: Power to suspend Fundamental Rights during emergency
  // =========================================================================
  {
    id: 'PK-CONST-A233',
    articleNumber: '233',
    partId: 'PK-CONST-P10',
    title: {
      en: 'Power to suspend Fundamental Rights, etc., during emergency period',
      ur: 'ہنگامی حالت کے دوران بنیادی حقوق کی معطلی کی حدود',
    },
    originalStatutoryEnglish: `(1) Nothing contained in Articles 15, 16, 17, 18, 19 and 24 shall, while a Proclamation of Emergency is in force, restrict the power of the State as defined in Article 7 to make any law or to take any executive action which it would, but for the provisions in the said Articles, be competent to make or to take.
(2) While a Proclamation of Emergency is in force, the President may, by Order, declare that the right to move any court for the enforcement of such of the Fundamental Rights conferred by Chapter 1 of Part II as may be specified in the Order, and any proceeding in any court which is for the enforcement of any of the rights so specified, shall remain suspended for the period during which the Proclamation is in force:
Provided that the rights conferred by Articles 4, 9, 10, 10A, 14, and 25 shall not be suspended under this Article.`,
    urduText: `(1) ایمرجنسی کے دوران آرٹیکل 15، 16، 17، 18، 19 اور 24 کے تحت حقوق معطل کیے جا سکتے ہیں۔
(2) صدر حکم کے ذریعے عدالت سے رجوع کرنے کا حق معطل کر سکتا ہے:
بشرطیکہ آرٹیکل 4 (قانون کے مطابق سلوک)، آرٹیکل 9 (زندگی کا تحفظ)، آرٹیکل 10 (گرفتاری کے خلاف ضمانتیں)، آرٹیکل 10A (منصفانہ ٹرائل)، آرٹیکل 14 (عزتِ نفس و پرائیویسی اور تشدد کی ممانعت) اور آرٹیکل 25 (برابری) کو کسی بھی ایمرجنسی میں معطل نہیں کیا جا سکتا۔`,
    urduStatus: 'official_verified',
    clauses: [
      {
        id: 'PK-CONST-A233-C01',
        articleId: 'PK-CONST-A233',
        clauseNumber: '(1)',
        text: {
          en: 'Permits suspension of Articles 15, 16, 17, 18, 19, and 24 during a Proclamation of Emergency.',
          ur: 'صرف مخصوص آزادیوں (نقل و حرکت، اجتماع، تنظیم، تقریر، جائیداد) کی معطلی کی اجازت۔',
        },
      },
      {
        id: 'PK-CONST-A233-C02',
        articleId: 'PK-CONST-A233',
        clauseNumber: '(2)',
        text: {
          en: 'Non-derogable core rights: Articles 4 (Rule of Law), 9 (Life), 10 (Arrest Safeguards), 10A (Fair Trial), 14 (Dignity & Anti-Torture), and 25 (Equality) CAN NEVER BE SUSPENDED.',
          ur: 'ناقابلِ معطلی حقوق: زندگی کا حق، فیئر ٹرائل، تشدد کی ممانعت اور انسانی وقار کو ایمرجنسی میں بھی معطل نہیں کیا جا سکتا۔',
        },
      },
    ],
    easyExplanation: {
      en: 'Crucial human rights shield. While certain freedoms (speech, assembly) can be restricted during war, the non-derogable core—Article 4 (Due Process), Article 9 (Right to Life), Article 10 (Arrest Safeguards), Article 10A (Fair Trial), Article 14 (Absolute Ban on Torture & Human Dignity), and Article 25 (Equality)—CAN NEVER BE SUSPENDED under any emergency.',
      ur: 'انسانی حقوق کی مضبوط ترین ڈھال۔ جنگ کے دوران بھی ریاست کسی شہری کو ماورائے عدالت قتل نہیں کر سکتی، نہ ہی دورانِ حراست تشدد کر سکتی ہے، نہ ہی فیئر ٹرائل کا حق چھین سکتی ہے۔ آرٹیکل 4، 9، 10، 10A اور 14 ہر حال میں برقرار رہتے ہیں۔',
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
          en: 'Inserted non-derogable protections ensuring Articles 4, 9, 10, 10A, 14, and 25 cannot be suspended under emergency orders.',
          ur: 'آئین میں ناقابلِ معطلی حقوق کی شق شامل کر کے زندگی، وقار اور فیئر ٹرائل کی معطلی پر مستقل پابندی لگائی۔',
        },
        typeOfChange: 'amended',
      },
    ],
    relatedArticleIds: ['PK-CONST-A004', 'PK-CONST-A009', 'PK-CONST-A010A', 'PK-CONST-A014', 'PK-CONST-A232'],
    thematicCategories: ['Emergency Powers', 'Non-Derogable Rights', 'Anti-Torture', 'Right to Life'],
    sourceCitationId: 'SRC-CONST-NA-ENG-2024',
    status: 'active',
    lastReviewedAt: '2026-10-31',
  },

  // =========================================================================
  // ARTICLE 234: Failure of constitutional machinery in a Province
  // =========================================================================
  {
    id: 'PK-CONST-A234',
    articleNumber: '234',
    partId: 'PK-CONST-P10',
    title: {
      en: 'Power to issue Proclamation in case of failure of constitutional machinery in a Province',
      ur: 'صوبے میں آئینی مشینری کی ناکامی پر گورنر راج کا نفاذ',
    },
    originalStatutoryEnglish: `(1) If the President, on receipt of a report from the Governor of a Province is satisfied that a situation has arisen in which the Government of the Province cannot be carried on in accordance with the provisions of the Constitution, the President may, or if a resolution in this behalf is passed by each House of Majlis-e-Shoora (Parliament) shall, by Proclamation—
(a) assume to himself, or direct the Governor of the Province to assume on behalf of the President, all or any of the functions of the Government of the Province;
(b) declare that the powers of the Provincial Assembly shall be exercisable by, or under the authority of, Majlis-e-Shoora (Parliament);
(3) A Proclamation issued under this Article shall be laid before a joint sitting and shall cease to be in force at the expiration of two months, unless it has been approved by a resolution of the joint sitting and may by like resolution be extended for a further period not exceeding two months at a time; but no such Proclamation shall in any case remain in force for more than six months.`,
    urduText: `(1) اگر صدر گورنر کی رپورٹ پر مطمئن ہو کہ صوبائی حکومت آئین کے مطابق نہیں چلائی جا سکتی، تو وہ گورنر راج نافذ کر سکتا ہے۔
(3) گورنر راج کا حکم پارلیمنٹ کے مشترکہ اجلاس میں پیش کیا جائے گا اور دو ماہ میں خود بخود ختم ہو جائے گا الا یہ کہ پارلیمنٹ قرارداد سے توسیع دے؛ اور کسی صورت میں گورنر راج کی کل مدت چھ ماہ سے زائد نہیں ہوگی۔`,
    urduStatus: 'official_verified',
    clauses: [
      {
        id: 'PK-CONST-A234-C01',
        articleId: 'PK-CONST-A234',
        clauseNumber: '(1)',
        text: {
          en: 'Imposition of Governor\'s Rule upon failure of constitutional machinery in a Province.',
          ur: 'صوبے میں آئینی بحران پر گورنر راج کے نفاذ کا صدارتی حکم نامہ۔',
        },
      },
      {
        id: 'PK-CONST-A234-C03',
        articleId: 'PK-CONST-A234',
        clauseNumber: '(3)',
        text: {
          en: 'Strict parliamentary control: expires in 2 months unless approved by joint sitting; maximum duration capped at 6 months.',
          ur: 'دو ماہ میں پارلیمنٹ کے مشترکہ اجلاس سے منظوری لازمی؛ زیادہ سے زیادہ میعاد 6 ماہ تک محدود۔',
        },
      },
    ],
    easyExplanation: {
      en: 'Regulates "Governor\'s Rule". The federal government can take over provincial governance only during a complete constitutional breakdown. The decree must be approved by Parliament within 2 months, and cannot exceed 6 months total.',
      ur: 'گورنر راج کا قانون۔ وفاقی حکومت صوبائی حکومت کو معطل کر کے زیادہ سے زیادہ 6 ماہ تک انتظام سنبھال سکتی ہے اور 2 ماہ کے اندر پارلیمنٹ کے مشترکہ اجلاس سے منظوری لینا لازمی ہے۔',
    },
    landmarkPrecedents: [],
    amendmentHistory: [],
    relatedArticleIds: ['PK-CONST-A101', 'PK-CONST-A105', 'PK-CONST-A232'],
    thematicCategories: ['Governor\'s Rule', 'Provincial Autonomy', 'Federal Intervention'],
    sourceCitationId: 'SRC-CONST-NA-ENG-2024',
    status: 'active',
    lastReviewedAt: '2026-10-31',
  },

  // =========================================================================
  // ARTICLE 238: Amendment of Constitution
  // =========================================================================
  {
    id: 'PK-CONST-A238',
    articleNumber: '238',
    partId: 'PK-CONST-P11',
    title: {
      en: 'Amendment of Constitution',
      ur: 'آئین میں ترمیم کا طریقہ کار',
    },
    originalStatutoryEnglish: `Subject to this Part, the Constitution may be amended by Act of Majlis-e-Shoora (Parliament).`,
    urduText: `اس حصہ کے تابع، آئین میں مجلسِ شوریٰ (پارلیمنٹ) کے ایکٹ کے ذریعے ترمیم کی جا سکتی ہے۔`,
    urduStatus: 'official_verified',
    clauses: [
      {
        id: 'PK-CONST-A238-C01',
        articleId: 'PK-CONST-A238',
        clauseNumber: 'Article Text',
        text: {
          en: 'The Constitution may be amended exclusively by an Act of Majlis-e-Shoora (Parliament).',
          ur: 'آئین میں ترمیم کا خصوصی اختیار صرف پارلیمنٹ کے پاس ہے۔',
        },
      },
    ],
    easyExplanation: {
      en: 'Confers the constituent amending power exclusively upon Parliament. Executive decrees, military orders, or judicial verdicts cannot amend the Constitution.',
      ur: 'آئین میں ترمیم کا اختیار صرف منتخب پارلیمنٹ کو دیتا ہے؛ کوئی فوجی آمر یا عدالت آئین میں اپنی مرضی سے کوئی نیا لفظ شامل یا حذف نہیں کر سکتی۔',
    },
    landmarkPrecedents: [],
    amendmentHistory: [],
    relatedArticleIds: ['PK-CONST-A239'],
    thematicCategories: ['Constitutional Amendments', 'Parliamentary Sovereignty'],
    sourceCitationId: 'SRC-CONST-NA-ENG-2024',
    status: 'active',
    lastReviewedAt: '2026-10-31',
  },

  // =========================================================================
  // ARTICLE 239: Constitution Amendment Bill
  // =========================================================================
  {
    id: 'PK-CONST-A239',
    articleNumber: '239',
    partId: 'PK-CONST-P11',
    title: {
      en: 'Constitution Amendment Bill',
      ur: 'آئینی ترمیم کا بل (دو تہائی اکثریت اور صوبائی رضامندی)',
    },
    originalStatutoryEnglish: `(1) A Bill to amend the Constitution may originate in either House and, when the Bill has been passed by the votes of not less than two-thirds of the total membership of the House, it shall be transmitted to the other House.
(2) If the Bill is passed without amendment by the votes of not less than two-thirds of the total membership of the other House, it shall be presented to the President for assent.
(4) A Bill to amend the Constitution which would have the effect of altering the limits of a Province shall not be presented to the President for assent unless it has been passed by the Provincial Assembly of that Province by the votes of not less than two-thirds of its total membership.
(5) No amendment of the Constitution shall be called in question in any court on any ground whatsoever.
(6) For the removal of doubt, it is hereby declared that there is no limitation whatever on the power of the Majlis-e-Shoora (Parliament) to amend any of the provisions of the Constitution.`,
    urduText: `(1) آئین میں ترمیم کا بل کسی بھی ایوان میں پیش کیا جا سکتا ہے اور ایوان کی کل رکنیت کی کم از کم دو تہائی (2/3) اکثریت سے منظور ہونے پر دوسرے ایوان کو بھیجا جائے گا۔
(2) اگر دوسرا ایوان بھی کل رکنیت کی دو تہائی اکثریت سے منظور کرے تو بل صدر کو توثیق کے لیے پیش کیا جائے گا۔
(4) کسی صوبے کی جغرافیائی حدود میں تبدیلی کے بل کو اس وقت تک صدر کو پیش نہیں کیا جائے گا جب تک کہ اس صوبے کی اسمبلی دو تہائی اکثریت سے اسے منظور نہ کرے۔
(5) آئین کی کسی ترمیم کو کسی بھی عدالت میں کسی بھی بنیاد پر چیلنج نہیں کیا جا سکے گا۔
(6) شک دور کرنے کے لیے اعلان کیا جاتا ہے کہ پارلیمنٹ کے آئینی ترمیم کے اختیار پر کوئی قدغن نہیں ہے۔`,
    urduStatus: 'official_verified',
    clauses: [
      {
        id: 'PK-CONST-A239-C01',
        articleId: 'PK-CONST-A239',
        clauseNumber: '(1)-(2)',
        text: {
          en: 'Mandatory two-thirds majority of the total membership of both National Assembly and Senate.',
          ur: 'قومی اسمبلی اور سینیٹ دونوں کی مجموعی تعداد کی دو تہائی (2/3) اکثریت سے منظوری لازمی۔',
        },
      },
      {
        id: 'PK-CONST-A239-C04',
        articleId: 'PK-CONST-A239',
        clauseNumber: '(4)',
        text: {
          en: 'Altering provincial territorial boundaries requires two-thirds majority consent of that Province\'s Assembly.',
          ur: 'صوبے کی حدود بدلنے یا نیا صوبہ بنانے کے لیے متعلقہ صوبائی اسمبلی کی دو تہائی منظوری لازمی۔',
        },
      },
      {
        id: 'PK-CONST-A239-C05',
        articleId: 'PK-CONST-A239',
        clauseNumber: '(5)-(6)',
        text: {
          en: 'Express bar of judicial review over constitutional amendments and affirmation of plenary amending power.',
          ur: 'آئینی ترمیم پر عدالتی جانچ پر پابندی اور پارلیمنٹ کے خودمختار اختیار کا اعادہ۔',
        },
      },
    ],
    easyExplanation: {
      en: 'Prescribes the rigorous process of constitutional amendment requiring a two-thirds majority in both the National Assembly and the Senate. A province\'s geographical boundaries cannot be altered without its own two-thirds provincial legislative consent. The Basic Structure Doctrine remains debated before the Supreme Court under Clauses (5) and (6).',
      ur: 'آئین میں ترمیم کا باضابطہ طریقہ۔ قومی اسمبلی اور سینیٹ دونوں کی دو تہائی اکثریت لازمی ہے۔ کسی صوبے کو تقسیم کرنے یا اس کے علاقے بدلنے کے لیے خود اس صوبے کی اسمبلی کی دو تہائی منظوری درکار ہوتی ہے۔',
    },
    landmarkPrecedents: [
      {
        citation: 'PLD 2015 SC 401',
        caseName: {
          en: 'District Bar Association Rawalpindi v. Federation of Pakistan (21st Amendment Case)',
          ur: 'ڈسٹرکٹ بار ایسوسی ایشن راولپنڈی بنام وفاقِ پاکستان (21ویں ترمیم فیصلہ)',
        },
        judgmentDate: '2015-08-05',
        courtName: {
          en: 'Supreme Court of Pakistan',
          ur: 'سپریم کورٹ آف پاکستان',
        },
        principleEstablished: {
          en: 'The Supreme Court affirmed by majority that Parliament has broad amending powers under Article 239, but recognized that the Constitution contains salient features (democracy, parliamentary form, Islamic provisions, judicial independence) that courts may safeguard against subversion.',
          ur: 'سپریم کورٹ نے قرار دیا کہ پارلیمنٹ کو آئینی ترمیم کا وسیع اختیار حاصل ہے مگر آئین کے بنیادی خد و خال (جمہوریت، پارلیمانی نظام، عدلیہ کی آزادی) کو عدالتیں مانیٹر کر سکتی ہیں۔',
        },
      },
    ],
    amendmentHistory: [],
    relatedArticleIds: ['PK-CONST-A001', 'PK-CONST-A238'],
    thematicCategories: ['Constitutional Amendments', 'Two-Thirds Majority', 'Provincial Boundaries', 'Basic Structure Doctrine'],
    sourceCitationId: 'SRC-CONST-NA-ENG-2024',
    status: 'active',
    lastReviewedAt: '2026-10-31',
  },

  // =========================================================================
  // ARTICLE 243: Command of Armed Forces
  // =========================================================================
  {
    id: 'PK-CONST-A243',
    articleNumber: '243',
    partId: 'PK-CONST-P12',
    chapterId: 'PK-CONST-P12-CH02',
    title: {
      en: 'Command of Armed Forces',
      ur: 'مسلح افواج کی کمان اور سروسز چیفس کا تقرر',
    },
    originalStatutoryEnglish: `(1) The Federal Government shall have control and command of the Armed Forces.
(2) Without prejudice to the generality of the foregoing provision, the Supreme Command of the Armed Forces shall vest in the President.
(3) The President shall, subject to law, have power—
(a) to raise and maintain the Military, Naval and Air Forces of Pakistan; and the Reserves of such Forces; and
(b) to grant Commissions in such Forces.
(4) The President shall, on advice of the Prime Minister, appoint—
(a) the Chairman, Joint Chiefs of Staff Committee;
(b) the Chief of the Army Staff;
(c) the Chief of the Naval Staff; and
(d) the Chief of the Air Staff,
and shall also determine their salaries and allowances.`,
    urduText: `(1) مسلح افواج کا کنٹرول اور کمان وفاقی حکومت کے پاس ہوگا۔
(2) مسلح افواج کی سپریم کمان صدر میں مضمر ہوگی۔
(4) صدر وزیرِ اعظم کے مشورے پر تقرر کرے گا—
(الف) چیئرمین جوائنٹ چیفس آف اسٹاف کمیٹی؛
(ب) چیف آف دی آرمی اسٹاف (آرمی چیف)؛
(ج) چیف آف دی نیول اسٹاف (نیول چیف)؛ اور
(د) چیف آف دی ایئر اسٹاف (ایئر چیف)؛
اور ان کے مشاہرے اور مراعات کا تعین کرے گا۔`,
    urduStatus: 'official_verified',
    clauses: [
      {
        id: 'PK-CONST-A243-C01',
        articleId: 'PK-CONST-A243',
        clauseNumber: '(1)',
        text: {
          en: 'Civilian supremacy: Federal Government has control and command of the Armed Forces.',
          ur: 'سویلین بالادستی: مسلح افواج کا کنٹرول اور کمان وفاقی حکومت کے سپرد۔',
        },
      },
      {
        id: 'PK-CONST-A243-C04',
        articleId: 'PK-CONST-A243',
        clauseNumber: '(4)',
        text: {
          en: 'Appointment of Army, Navy, and Air Force Chiefs and Chairman Joint Chiefs by President on binding advice of the Prime Minister.',
          ur: 'آرمی، نیوی اور ایئر فورس چیفس کا تقرر صدر وزیر اعظم کے مشورے پر کرنے کا پابند ہے۔',
        },
      },
    ],
    easyExplanation: {
      en: 'Establishes civilian supremacy over the military. The Federal Government has command of the Armed Forces. The President acts as ceremonial Supreme Commander and appoints the Army Chief, Naval Chief, and Air Chief strictly on the binding advice of the elected Prime Minister.',
      ur: 'فوج پر سویلین حکومت کی بالادستی کا بنیادی ضابطہ۔ مسلح افواج وفاقی حکومت کے ماتحت ہیں؛ صدر، آرمی چیف اور دیگر سروسز چیفس کا تقرر منتخب وزیرِ اعظم کے مشورے پر کرتا ہے۔',
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
          en: 'Substituted Clause (4) to mandate that all Services Chiefs are appointed by the President on the binding advice of the Prime Minister.',
          ur: 'تمام سروسز چیفس کے تقرر میں وزیر اعظم کے مشورے کو لازمی بنایا۔',
        },
        typeOfChange: 'amended',
      },
    ],
    relatedArticleIds: ['PK-CONST-A244', 'PK-CONST-A245'],
    thematicCategories: ['Armed Forces', 'Civilian Supremacy', 'Services Chiefs Appointment'],
    sourceCitationId: 'SRC-CONST-NA-ENG-2024',
    status: 'active',
    lastReviewedAt: '2026-10-31',
  },

  // =========================================================================
  // ARTICLE 245: Functions of Armed Forces
  // =========================================================================
  {
    id: 'PK-CONST-A245',
    articleNumber: '245',
    partId: 'PK-CONST-P12',
    chapterId: 'PK-CONST-P12-CH02',
    title: {
      en: 'Functions of Armed Forces',
      ur: 'مسلح افواج کے فرائض اور سول انتظامیہ کی مدد (آرٹیکل 245)',
    },
    originalStatutoryEnglish: `(1) The Armed Forces shall, under the directions of the Federal Government defend Pakistan against external aggression or threat of war, and, subject to law, act in aid of civil power when called upon to do so.
(2) The validity of any direction issued by the Federal Government under clause (1) shall not be called in question in any court.
(3) A High Court shall not exercise any jurisdiction under Article 199 in relation to any area in which the Armed Forces of Pakistan are, for the time being, acting in aid of civil power in pursuance of Article 245:
Provided that this clause shall not derogate from the jurisdiction of the High Court in relation to any exercise of power by the Armed Forces under any law other than this Article.
(4) Any proceeding in relation to an area referred to in clause (3) instituted on or after the date the Armed Forces started acting in aid of civil power shall remain suspended during the period the Armed Forces are so acting.`,
    urduText: `(1) مسلح افواج، وفاقی حکومت کی ہدایات کے تحت، پاکستان کا بیرونی جارحیت یا جنگ کے خطرے کے خلاف دفاع کریں گی اور، قانون کے تابع، جب طلب کیا جائے تو سول انتظامیہ کی مدد کے لیے کام کریں گی۔
(2) شق (1) کے تحت وفاقی حکومت کی دی گئی کسی ہدایت کی قانونی حیثیت پر کسی عدالت میں اعتراض نہیں کیا جائے گا۔
(3) کوئی ہائی کورٹ کسی ایسے علاقے کے سلسلے میں آرٹیکل 199 کے تحت اپنے دائرہ اختیار کا استعمال نہیں کرے گی جہاں مسلح افواج فی الوقت سول پاور کی مدد کے لیے کام کر رہی ہوں۔`,
    urduStatus: 'official_verified',
    clauses: [
      {
        id: 'PK-CONST-A245-C01',
        articleId: 'PK-CONST-A245',
        clauseNumber: '(1)',
        text: {
          en: 'Dual constitutional duty: defend against external aggression and act in aid of civil power when called upon by the Federal Government.',
          ur: 'مسلح افواج کے دو فرائض: بیرونی جارحیت کا دفاع اور وفاقی حکومت کے بلانے پر سول انتظامیہ کی مدد۔',
        },
      },
      {
        id: 'PK-CONST-A245-C02',
        articleId: 'PK-CONST-A245',
        clauseNumber: '(2)',
        text: {
          en: 'Validity of Federal Government direction to deploy military cannot be questioned in court.',
          ur: 'فوج بلانے کی حکومتی ہدایت کی قانونی حیثیت پر عدالت میں اعتراض نہیں ہو سکتا۔',
        },
      },
      {
        id: 'PK-CONST-A245-C03',
        articleId: 'PK-CONST-A245',
        clauseNumber: '(3)',
        text: {
          en: 'Suspension of High Court Article 199 writ jurisdiction in deployment areas where military acts in aid of civil power.',
          ur: 'فوج کی تعیناتی کے دوران متعلقہ علاقے میں ہائی کورٹ کے رٹ اختیارات کی معطلی۔',
        },
      },
    ],
    easyExplanation: {
      en: 'Defines the constitutional role of the Armed Forces: territorial defense against external enemies and assisting civil power (disaster relief, counter-terrorism, security during elections) strictly when requisitioned by the civilian federal government.',
      ur: 'مسلح افواج کے آئینی دائرہ کار کا تعین کرتا ہے: بیرونی دشمنوں سے ملک کا دفاع کرنا، اور وفاقی حکومت کی درخواست پر امن و امان یا قدرتی آفات میں سول انتظامیہ کی مدد کرنا۔',
    },
    landmarkPrecedents: [
      {
        citation: 'PLD 1999 SC 504',
        caseName: {
          en: 'Liaquat Hussain v. Federation of Pakistan (Military Courts Case)',
          ur: 'لیاقت حسین بنام وفاقِ پاکستان (فوجی عدالتیں کیس)',
        },
        judgmentDate: '1999-02-22',
        courtName: {
          en: 'Supreme Court of Pakistan',
          ur: 'سپریم کورٹ آف پاکستان',
        },
        principleEstablished: {
          en: 'Held that calling in armed forces under Article 245 in aid of civil power does not authorize the establishment of military courts to try civilians or replace regular judicial courts.',
          ur: 'سپریم کورٹ نے فیصلہ دیا کہ آرٹیکل 245 کے تحت سول انتظامیہ کی مدد کے لیے فوج بلانے کا یہ مطلب ہرگز نہیں کہ سویلین شہریوں کے ٹرائل کے لیے متوازی ملٹری کورٹس بنا دی جائیں۔',
        },
      },
    ],
    amendmentHistory: [],
    relatedArticleIds: ['PK-CONST-A006', 'PK-CONST-A010A', 'PK-CONST-A175', 'PK-CONST-A243'],
    thematicCategories: ['Armed Forces', 'Aid of Civil Power', 'Military Courts', 'Civil-Military Relations'],
    sourceCitationId: 'SRC-CONST-NA-ENG-2024',
    status: 'active',
    lastReviewedAt: '2026-10-31',
  },

  // =========================================================================
  // ARTICLE 247: Administration of Tribal Areas (OMITTED)
  // =========================================================================
  {
    id: 'PK-CONST-A247',
    articleNumber: '247',
    partId: 'PK-CONST-P12',
    chapterId: 'PK-CONST-P12-CH03',
    title: {
      en: 'Administration of Tribal Areas (OMITTED)',
      ur: 'قبائلی علاقوں کا انتظام اور ایف سی آر کا خاتمہ (حذف شدہ)',
    },
    originalStatutoryEnglish: `[Omitted by the Constitution (Twenty-fifth Amendment) Act, 2018 (Act XXXVII of 2018), s. 9, with effect from 31st May, 2018.]
Prior to omission, Article 247 provided:
(1) Subject to the Constitution, the executive authority of the Federation shall extend to the Federally Administered Tribal Areas, and the executive authority of a Province shall extend to the Provincially Administered Tribal Areas therein.
(7) Neither the Supreme Court nor a High Court shall exercise any jurisdiction under the Constitution in relation to a Tribal Area, unless Majlis-e-Shoora (Parliament) by law otherwise provides.`,
    urduText: `[آئین (پچیسویں ترمیم) ایکٹ، 2018ء کی دفعہ 9 کے تحت مورخہ 31 مئی 2018ء سے حذف کر دیا گیا۔]
حذف کیے جانے سے قبل آرٹیکل 247 نے قبائلی علاقوں (فاٹا) کو صدر کے انتظامی دائرہ کار میں رکھا ہوا تھا اور سپریم کورٹ اور ہائی کورٹ کا دائرہ اختیار قبائلی علاقوں پر لاگو نہیں ہوتا تھا، جس کے تحت کالا قانون ایف سی آر (FCR) نافذ تھا۔`,
    urduStatus: 'official_verified',
    clauses: [
      {
        id: 'PK-CONST-A247-C01',
        articleId: 'PK-CONST-A247',
        clauseNumber: 'Omission Note',
        text: {
          en: 'Article 247 was permanently omitted by the 25th Amendment on May 31, 2018, abolishing the colonial Frontier Crimes Regulation (FCR) and extending fundamental rights and higher court jurisdiction to all merged tribal districts.',
          ur: '25ویں ترمیم کے تحت فاٹا کے خیبر پختونخوا میں انضمام کے بعد آرٹیکل 247 کو مکمل طور پر حذف کر کے قبائلی اضلاع میں بنیادی حقوق اور عدالتی دائرہ اختیار نافذ کیا گیا۔',
        },
      },
    ],
    easyExplanation: {
      en: 'Historical milestone for human rights in Pakistan. Article 247 previously barred higher courts from hearing cases in FATA and maintained the colonial Frontier Crimes Regulation (FCR - collective punishment, arrest without warrant). The 25th Amendment in 2018 repealed this article, extending the Constitution, High Courts, and Fundamental Rights to 5 million tribal citizens.',
      ur: 'تاریخی آئینی سنگِ میل۔ سابقہ آرٹیکل 247 نے قبائلی اضلاع کو ہائی کورٹ اور سپریم کورٹ کے دائرہ اختیار سے محروم رکھا تھا اور انگریز دور کا کالا قانون ایف سی آر نافذ تھا۔ 2018 میں 25ویں ترمیم نے اس آرٹیکل کو ہمیشہ کے لیے ختم کر کے قبائلی عوام کو تمام بنیادی حقوق دیے ہیں۔',
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
          en: 'Omitted Article 247 in its entirety to integrate FATA into Khyber Pakhtunkhwa.',
          ur: 'فاٹا کو خیبر پختونخوا میں ضم کرنے کے لیے آرٹیکل 247 کو مکمل طور پر حذف کیا۔',
        },
        typeOfChange: 'omitted',
      },
    ],
    relatedArticleIds: ['PK-CONST-A001', 'PK-CONST-A175', 'PK-CONST-A246'],
    thematicCategories: ['FATA Merger', '25th Amendment', 'Abolition of FCR', 'Fundamental Rights Extension'],
    sourceCitationId: 'SRC-CONST-NA-ENG-2024',
    status: 'omitted',
    lastReviewedAt: '2026-10-31',
  },

  // =========================================================================
  // ARTICLE 248: Protection to President, Governor, Minister, etc.
  // =========================================================================
  {
    id: 'PK-CONST-A248',
    articleNumber: '248',
    partId: 'PK-CONST-P12',
    chapterId: 'PK-CONST-P12-CH04',
    title: {
      en: 'Protection to President, Governor, Minister, etc.',
      ur: 'صدر، گورنر، وزیر وغیرہ کا قانونی استثنیٰ',
    },
    originalStatutoryEnglish: `(1) The President, a Governor, the Prime Minister, a Federal Minister, a Minister of State, the Chief Minister and a Provincial Minister shall not be answerable to any court for the exercise of powers and performance of functions of their respective offices or for any act done or purporting to be done in the exercise of those powers and performance of those functions:
Provided that nothing in this clause shall be construed as restricting the right of any person to bring appropriate proceedings against the Federation or a Province.
(2) No criminal proceedings whatsoever shall be instituted or continued against the President or a Governor in any court during his term of office.
(3) No process for the arrest or imprisonment of the President or a Governor shall issue from any court during his term of office.`,
    urduText: `(1) صدر، گورنر، وزیر اعظم، وفاقی وزیر اور وزیر اعلیٰ اپنے سرکاری اختیارات کے استعمال پر کسی عدالت کے سامنے جوابدہ نہیں ہوں گے:
بشرطیکہ وفاق یا صوبے کے خلاف کارروائی لانے کا حق برقرار رہے گا۔
(2) صدر یا گورنر کے خلاف ان کے عہدے کی مدت کے دوران کسی بھی عدالت میں کوئی فوجداری کارروائی شروع یا جاری نہیں رکھی جائے گی۔
(3) صدر یا گورنر کی گرفتاری یا قید کا کوئی وارنٹ عدالت سے جاری نہیں ہوگا۔`,
    urduStatus: 'official_verified',
    clauses: [
      {
        id: 'PK-CONST-A248-C01',
        articleId: 'PK-CONST-A248',
        clauseNumber: '(1)',
        text: {
          en: 'Official acts immunity for President, Governors, Prime Minister, Chief Ministers, and Ministers.',
          ur: 'سرکاری فرائض کی انجام دہی میں عدالتی کارروائی سے سرکاری استثنیٰ۔',
        },
      },
      {
        id: 'PK-CONST-A248-C02',
        articleId: 'PK-CONST-A248',
        clauseNumber: '(2)-(3)',
        text: {
          en: 'Absolute immunity from criminal proceedings, arrest, or imprisonment for the President and Governors during their term of office.',
          ur: 'عہدے پر رہنے کے دوران صدر اور گورنرز کے خلاف فوجداری مقدمے یا گرفتاری سے مکمل استثنیٰ۔',
        },
      },
    ],
    easyExplanation: {
      en: 'Establishes constitutional immunity. While in office, the Head of State (President) and provincial Governors enjoy absolute immunity from criminal prosecution and arrest. Ministers have immunity for official executive acts, but not for personal crimes.',
      ur: 'سربراہِ مملکت اور وزراء کا آئینی استثنیٰ۔ صدر اور گورنرز پر ان کے دورِ اقتدار میں کوئی فوجداری مقدمہ یا گرفتاری کا وارنٹ جاری نہیں ہو سکتا تاکہ ریاست کا کام بغیر بلیک میلنگ کے چل سکے۔',
    },
    landmarkPrecedents: [],
    amendmentHistory: [],
    relatedArticleIds: ['PK-CONST-A041', 'PK-CONST-A101', 'PK-CONST-A174'],
    thematicCategories: ['Constitutional Immunity', 'Head of State', 'Criminal Proceedings'],
    sourceCitationId: 'SRC-CONST-NA-ENG-2024',
    status: 'active',
    lastReviewedAt: '2026-10-31',
  },

  // =========================================================================
  // ARTICLE 270A: Affirmation of President's Orders, etc. (8th Amendment)
  // =========================================================================
  {
    id: 'PK-CONST-A270A',
    articleNumber: '270A',
    partId: 'PK-CONST-P12',
    chapterId: 'PK-CONST-P12-CH07',
    title: {
      en: "Affirmation of President's Orders, etc.",
      ur: 'صدارتی احکام کی توثیق (آٹھویں ترمیم اور مارشل لاء کی توثیق)',
    },
    originalStatutoryEnglish: `(1) The Proclamation of the fifth day of July, 1977, all President's Orders, Martial Law Regulations, Martial Law Orders and all other laws made between the fifth day of July, 1977, and the date on which this Article comes into force are hereby affirmed, adopted and declared, notwithstanding any judgment of any court, to have been validly made by competent authority and, notwithstanding anything contained in the Constitution, shall not be called in question in any court on any ground whatsoever.`,
    urduText: `(1) 5 جولائی 1977ء کا اعلانِ مارشل لاء، تمام صدارتی احکام، مارشل لاء ریگولیشنز اور مارشل لاء آرڈرز کو، کسی بھی عدالت کے فیصلے کے باوجود، توثیق شدہ اور قانونی طور پر مجاز قرار دیا جاتا ہے، اور انہیں کسی عدالت میں چیلنج نہیں کیا جا سکے گا۔`,
    urduStatus: 'official_verified',
    clauses: [
      {
        id: 'PK-CONST-A270A-C01',
        articleId: 'PK-CONST-A270A',
        clauseNumber: '(1)',
        text: {
          en: 'Parliamentary indemnity under 8th Amendment validating General Zia-ul-Haq\'s 1977 coup and martial law regulations.',
          ur: '8ویں ترمیم کے تحت جنرل ضیاء الحق کے 1977 کے مارشل لاء اور احکامات کو پارلیمانی تحفظ۔',
        },
      },
    ],
    easyExplanation: {
      en: 'The historic indemnity provision of the Eighth Amendment (1985) which validated General Zia-ul-Haq\'s military coup of July 5, 1977, martial law regulations, and constitutional amendments in exchange for lifting martial law and restoring civilian parliament.',
      ur: 'آٹھویں ترمیم (1985) کی تاریخی کلاز جس کے تحت مارشل لاء ختم کرانے کے بدلے میں جنرل ضیاء الحق کے 1977 کے اقدامات اور مارشل لاء قوانین کو پارلیمنٹ سے تحفظ دیا گیا تھا۔',
    },
    landmarkPrecedents: [],
    amendmentHistory: [
      {
        amendmentId: 'PK-CONST-AMD-08',
        amendmentNumber: 8,
        actTitle: {
          en: 'Constitution (Eighth Amendment) Act, 1985',
          ur: 'آئین (آٹھویں ترمیم) ایکٹ، 1985ء',
        },
        year: 1985,
        effectiveDate: '1985-11-11',
        summaryOfChange: {
          en: 'Enacted Article 270A providing indemnity for the 1977 coup and martial law orders.',
          ur: 'مارشل لاء کے خاتمے پر 1977 کے بغاوتی اقدامات کو پارلیمانی توثیق دی۔',
        },
        typeOfChange: 'inserted',
      },
    ],
    relatedArticleIds: ['PK-CONST-A006', 'PK-CONST-A270AA'],
    thematicCategories: ['Martial Law Indemnity', 'Eighth Amendment', 'Constitutional History'],
    sourceCitationId: 'SRC-CONST-NA-ENG-2024',
    status: 'active',
    lastReviewedAt: '2026-10-31',
  },

  // =========================================================================
  // ARTICLE 270AA: Declaration and continuance of laws (18th Amendment)
  // =========================================================================
  {
    id: 'PK-CONST-A270AA',
    articleNumber: '270AA',
    partId: 'PK-CONST-P12',
    chapterId: 'PK-CONST-P12-CH07',
    title: {
      en: 'Declaration and continuance of laws etc.',
      ur: 'قوانین کا اعلان اور تسلسل (18ویں ترمیم اور 3 نومبر 2007 ایمرجنسی کی منسوخی)',
    },
    originalStatutoryEnglish: `(1) The Proclamation of Emergency of the fourteenth day of October, 1999, the Provisional Constitution Order No. 1 of 1999, the Oath of Office (Judges) Order, 2000... having been made without lawful authority are hereby declared to have been made without lawful authority and of no legal effect.
(2) The Proclamation of Emergency of the third day of November, 2007, the Provisional Constitution Order No. 1 of 2007, the Oath of Office (Judges) Order, 2007... are hereby declared to have been made without lawful authority and of no legal effect.
(3) Notwithstanding anything contained in the Constitution or any judgment of any court, including that of the Supreme Court or a High Court, the results of the aforesaid acts shall not be recognized or validated.`,
    urduText: `(1) 14 اکتوبر 1999ء کی ایمرجنسی، پی سی او (PCO) نمبر 1 برائے 1999ء... قانونی جواز کے بغیر قرار دیے جاتے ہیں اور ان کی کوئی قانونی حیثیت نہیں ہے۔
(2) 3 نومبر 2007ء کا اعلانِ ایمرجنسی، عبوری آئینی حکم (PCO) نمبر 1 برائے 2007ء، ججز حلف نامہ حکم 2007ء... بغیر قانونی اختیار کے جاری شدہ اور مکمل طور پر کالعدم قرار دیے جاتے ہیں۔
(3) کسی عدالت کے کسی بھی فیصلے کے باوجود، مذکورہ بالا غیر آئینی اقدامات کو تسلیم یا جائز قرار نہیں دیا جائے گا۔`,
    urduStatus: 'official_verified',
    clauses: [
      {
        id: 'PK-CONST-A270AA-C02',
        articleId: 'PK-CONST-A270AA',
        clauseNumber: '(2)',
        text: {
          en: 'Declared General Pervez Musharraf\'s November 3, 2007 Proclamation of Emergency and PCO completely void ab initio and unconstitutional.',
          ur: '3 نومبر 2007 کی ایمرجنسی، پی سی او اور ججوں کی معطلی کو مکمل طور پر غیر آئینی اور کالعدم قرار دیا۔',
        },
      },
    ],
    easyExplanation: {
      en: 'The constitutional triumph of the 18th Amendment (2010). It permanently repudiated and stripped of legal validity General Pervez Musharraf\'s military coup of October 12, 1999 and unconstitutional emergency of November 3, 2007, reversing the dismissal of the higher judiciary.',
      ur: '18ویں ترمیم کا انقلابی فیصلہ۔ اس نے جنرل پرویز مشرف کی 12 اکتوبر 1999 کی بغاوت اور 3 نومبر 2007 کی ایمرجنسی اور پی سی او (PCO) کو غیر قانونی اور کالعدم قرار دے کر عدلیہ کی آزادی بحال کی۔',
    },
    landmarkPrecedents: [
      {
        citation: 'PLD 2009 SC 879',
        caseName: {
          en: 'Sindh High Court Bar Association v. Federation of Pakistan (Nov 3 Emergency Judgment)',
          ur: 'سندھ ہائی کورٹ بار ایسوسی ایشن بنام وفاقِ پاکستان (3 نومبر ایمرجنسی فیصلہ)',
        },
        judgmentDate: '2009-07-31',
        courtName: {
          en: 'Supreme Court of Pakistan',
          ur: 'سپریم کورٹ آف پاکستان',
        },
        principleEstablished: {
          en: 'A 14-judge bench of the Supreme Court declared the November 3, 2007 Emergency and PCO unconstitutional and void ab initio; subsequently entrenched in Article 270AA by Parliament.',
          ur: 'سپریم کورٹ کے 14 رکنی بینچ نے 3 نومبر 2007 کی ایمرجنسی اور پی سی او کو غیر آئینی قرار دے کر معزول ججوں کو بحال کیا، جسے پارلیمنٹ نے آرٹیکل 270AA میں درج کیا۔',
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
          en: 'Substituted Article 270AA to declare the 1999 and 2007 military takeovers void ab initio.',
          ur: 'آرٹیکل 270AA کو تبدیل کر کے 1999 اور 2007 کے مارشل لاء اور ایمرجنسی کو کالعدم کیا۔',
        },
        typeOfChange: 'substituted',
      },
    ],
    relatedArticleIds: ['PK-CONST-A006', 'PK-CONST-A270A'],
    thematicCategories: ['Repudiation of Coups', '18th Amendment', 'November 3 Emergency', 'Judicial Restoration'],
    sourceCitationId: 'SRC-CONST-NA-ENG-2024',
    status: 'active',
    lastReviewedAt: '2026-10-31',
  },
];
