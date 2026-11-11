/**
 * INSAF ARCHIVE (انصاف آرکائیو)
 * Master Constitutional Parts (Parts I through XII & Preamble)
 */

import type { ConstitutionalPart } from '../../types/constitution';

export const CONSTITUTION_PARTS: ConstitutionalPart[] = [
  {
    id: 'PK-CONST-P00',
    partNumber: 'Preamble',
    title: {
      en: 'Preamble & Objectives Resolution',
      ur: 'تمہید و قراردادِ مقاصد',
    },
    articleRange: { start: 'Preamble', end: 'Preamble' },
    description: {
      en: 'Foundational sovereignty declaration establishing that sovereignty over the entire Universe belongs to Almighty Allah alone, delegating authority to the people of Pakistan to be exercised through their chosen representatives within the limits prescribed by Him.',
      ur: 'بنیادی حاکمیت کا اعلان جس کی رو سے کائنات پر حاکمیتِ مطلقہ اللہ تعالیٰ کی ہے، اور ریاست کے اختیارات عوام کے منتخب نمائندوں کے ذریعے اس کی مقرر کردہ حدود کے اندر استعمال کیے جائیں گے۔',
    },
  },
  {
    id: 'PK-CONST-P01',
    partNumber: 'I',
    title: {
      en: 'Introductory',
      ur: 'ابتدائیہ',
    },
    articleRange: { start: '1', end: '6' },
    description: {
      en: 'Defines the Republic and its territories, Islam as the State religion, elimination of exploitation, the inviolable obligation of loyalty to the State, and high treason (Article 6).',
      ur: 'جمہوریہ اور اس کے علاقوں کا تعین، اسلام بطور ریاستی مذہب، استحصال کا خاتمہ، ریاست سے وفاداری کا لازمی فرض اور سنگین غداری (آرٹیکل 6)۔',
    },
  },
  {
    id: 'PK-CONST-P02',
    partNumber: 'II',
    title: {
      en: 'Fundamental Rights and Principles of Policy',
      ur: 'بنیادی حقوق اور حکمتِ عملی کے اصول',
    },
    articleRange: { start: '7', end: '40' },
    description: {
      en: 'Guarantees justiciable fundamental rights (Articles 8–28) binding upon the State, including security of person, safeguards as to arrest/detention, fair trial, freedom of speech, information, and equality, alongside directive Principles of Policy (Articles 29–40).',
      ur: 'عدالتی طور پر قابلِ نفاذ بنیادی حقوق (آرٹیکل 8 تا 28) جن میں تحفظِ جان، گرفتاری و حراست کا تحفظ، منصفانہ ٹرائل، آزادی اظہار، معلومات تک رسائی اور مساوات شامل ہیں، بمعہ پالیسی ساز اصول (آرٹیکل 29 تا 40)۔',
    },
  },
  {
    id: 'PK-CONST-P03',
    partNumber: 'III',
    title: {
      en: 'The Federation of Pakistan',
      ur: 'وفاقِ پاکستان',
    },
    articleRange: { start: '41', end: '100' },
    description: {
      en: 'Governs the executive authority of the President and Prime Minister, the composition and powers of the bicameral Majlis-e-Shoora (National Assembly and Senate), legislative procedures, and federal financial allocations.',
      ur: 'صدر اور وزیرِ اعظم کے اختیارات، دو ایوانی پارلیمنٹ (قومی اسمبلی اور سینیٹ) کی تشکیل، قانون سازی کا طریقہ کار اور وفاقی مالیاتی امور کا احاطہ۔',
    },
  },
  {
    id: 'PK-CONST-P04',
    partNumber: 'IV',
    title: {
      en: 'Provinces',
      ur: 'صوبے',
    },
    articleRange: { start: '101', end: '140A' },
    description: {
      en: 'Establishes provincial executive and legislative governance through Governors, Provincial Assemblies, Chief Ministers, and mandatory devolution to Local Governments (Article 140A).',
      ur: 'گورنرز، صوبائی اسمبلیوں، وزرائے اعلیٰ کے اختیارات اور مقامی حکومتوں کو اختیارات کی لازمی منتقلی (آرٹیکل 140A)۔',
    },
  },
  {
    id: 'PK-CONST-P05',
    partNumber: 'V',
    title: {
      en: 'Relations Between Federation and Provinces',
      ur: 'وفاق اور صوبوں کے درمیان تعلقات',
    },
    articleRange: { start: '141', end: '159' },
    description: {
      en: 'Delineates legislative competence following the 18th Amendment devolution, administrative coordination, the Council of Common Interests (CCI), National Economic Council, and natural resources management.',
      ur: '18ویں ترمیم کے بعد قانون سازی کے دائرہ اختیار کی تقسیم، مشترکہ مفادات کونسل (CCI)، قومی اقتصادی کونسل اور قدرتی وسائل کا انتظام۔',
    },
  },
  {
    id: 'PK-CONST-P06',
    partNumber: 'VI',
    title: {
      en: 'Finance, Property, Contracts and Suits',
      ur: 'مالیات، جائیداد، معاہدات اور دعوے',
    },
    articleRange: { start: '160', end: '174' },
    description: {
      en: 'Constitutes the National Finance Commission (NFC) Award, consolidated revenue funds, public borrowing constraints, state commercial contracts, and sovereign property immunities.',
      ur: 'قومی مالیاتی کمیشن (این ایف سی) ایوارڈ، وفاقی و صوبائی کنسولیڈیٹڈ فنڈز، پبلک قرضے، حکومتی معاہدات اور ریاستی ملکیت کے اصول۔',
    },
  },
  {
    id: 'PK-CONST-P07',
    partNumber: 'VII',
    title: {
      en: 'The Judicature',
      ur: 'عدلیہ',
    },
    articleRange: { start: '175', end: '212' },
    description: {
      en: 'Guarantees the separation of the Judiciary from the Executive, the Judicial Commission of Pakistan (Article 175A), original, appellate, and advisory jurisdictions of the Supreme Court (Articles 184–186), Constitutional Benches (26th Amendment), High Courts (Article 199), Federal Shariat Court, and Administrative Tribunals.',
      ur: 'عدلیہ کی آزادی اور انتظامیہ سے علیحدگی، جوڈیشل کمیشن (آرٹیکل 175A)، سپریم کورٹ کے اختیارات (آرٹیکلز 184 تا 186)، آئینی بینچز (26ویں ترمیم)، ہائی کورٹس کا رٹ دائرہ اختیار (آرٹیکل 199) اور وفاقی شرعی عدالت۔',
    },
  },
  {
    id: 'PK-CONST-P08',
    partNumber: 'VIII',
    title: {
      en: 'Elections',
      ur: 'انتخابات',
    },
    articleRange: { start: '213', end: '226' },
    description: {
      en: 'Regulates the Chief Election Commissioner, the permanent Election Commission of Pakistan (ECP), electoral rolls, caretaker governments (Article 224/224A), and the mandate for honest, just, and fair elections according to law (Article 218(3)).',
      ur: 'چیف الیکشن کمشنر، الیکشن کمیشن آف پاکستان کے اختیارات، نگران حکومتوں کی تشکیل (آرٹیکل 224/224A) اور شفاف انتخابات کا آئینی تقاضا (آرٹیکل 218(3))۔',
    },
  },
  {
    id: 'PK-CONST-P09',
    partNumber: 'IX',
    title: {
      en: 'Islamic Provisions',
      ur: 'اسلامی دفعات',
    },
    articleRange: { start: '227', end: '231' },
    description: {
      en: 'Requires that all existing laws shall be brought in conformity with the Injunctions of Islam as laid down in the Holy Quran and Sunnah, and governs the Council of Islamic Ideology (CII).',
      ur: 'تمام مروجہ قوانین کو قرآن و سنت کے مطابق ڈھالنے کا تقاضا اور اسلامی نظریاتی کونسل کی تشکیل اور فرائض۔',
    },
  },
  {
    id: 'PK-CONST-P10',
    partNumber: 'X',
    title: {
      en: 'Emergency Provisions',
      ur: 'ہنگامی حالت سے متعلق دفعات',
    },
    articleRange: { start: '232', end: '237' },
    description: {
      en: 'Governs Presidential proclamations of emergency on account of war or internal disturbance, proclamation in case of financial emergency, suspension of fundamental rights enforcement, and parliamentary ratification requirements.',
      ur: 'جنگ یا داخلی خلفشار کی صورت میں ہنگامی حالت (ایمرجنسی) کے نفاذ، بنیادی حقوق کی معطلی کے ضوابط اور پارلیمانی منظوری کے تقاضے۔',
    },
  },
  {
    id: 'PK-CONST-P11',
    partNumber: 'XI',
    title: {
      en: 'Amendment of Constitution',
      ur: 'آئین میں ترمیم',
    },
    articleRange: { start: '238', end: '239' },
    description: {
      en: 'Specifies the sovereign parliamentary procedure for constitutional amendments, requiring a two-thirds majority in both Houses of Parliament, and provincial assembly consent for provincial boundary alterations.',
      ur: 'آئین میں ترمیم کا طریقہ کار، دونوں ایوانوں میں دو تہائی اکثریت کی لازمی شرط اور صوبائی حدود کی تبدیلی پر متعلقہ اسمبلی کی توثیق۔',
    },
  },
  {
    id: 'PK-CONST-P12',
    partNumber: 'XII',
    title: {
      en: 'Miscellaneous',
      ur: 'متفرق دفعات',
    },
    articleRange: { start: '240', end: '280' },
    description: {
      en: 'Covers the civil services, command of the Armed Forces (Article 243) and Armed Forces calling in aid of civil power (Article 245), legal protections for the President and Governors (Article 248), constitutional definitions (Article 260), and transitional provisions.',
      ur: 'سول سروسز، مسلح افواج کی کمان (آرٹیکل 243)، سول طاقت کی مدد کے لیے فوج کی طلبی (آرٹیکل 245)، صدر و گورنرز کا استثنیٰ (آرٹیکل 248) اور جامع آئینی تعریفات (آرٹیکل 260)۔',
    },
  },
];
