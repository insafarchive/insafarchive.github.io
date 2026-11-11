/**
 * INSAF ARCHIVE (انصاف آرکائیو)
 * Master Constitutional Chapters
 */

import type { ConstitutionalChapter } from '../../types/constitution';

export const CONSTITUTION_CHAPTERS: ConstitutionalChapter[] = [
  // Part II: Fundamental Rights and Principles of Policy
  {
    id: 'PK-CONST-P02-CH01',
    partId: 'PK-CONST-P02',
    chapterNumber: '1',
    title: {
      en: 'Fundamental Rights',
      ur: 'بنیادی حقوق',
    },
    articleRange: { start: '8', end: '28' },
    description: {
      en: 'Inviolable fundamental rights guaranteed to citizens and individuals within Pakistan, declaring laws inconsistent with or in derogation of fundamental rights void (Article 8).',
      ur: 'شہریوں کو حاصل ناقابلِ تنسیخ بنیادی حقوق اور بنیادی حقوق کے منافی تمام قوانین کو کالعدم قرار دینے کا اصول (آرٹیکل 8)۔',
    },
  },
  {
    id: 'PK-CONST-P02-CH02',
    partId: 'PK-CONST-P02',
    chapterNumber: '2',
    title: {
      en: 'Principles of Policy',
      ur: 'حکمتِ عملی کے اصول',
    },
    articleRange: { start: '29', end: '40' },
    description: {
      en: 'Directive principles guiding state organs in social justice, promotion of Islamic way of life, protection of minorities, and eradication of social evils.',
      ur: 'ریاستی پالیسی کے رہنما اصول جن میں اسلامی طرزِ زندگی کا فروغ، اقلیتوں کا تحفظ اور سماجی انصاف کا قیام شامل ہے۔',
    },
  },

  // Part III: The Federation of Pakistan
  {
    id: 'PK-CONST-P03-CH01',
    partId: 'PK-CONST-P03',
    chapterNumber: '1',
    title: {
      en: 'The President',
      ur: 'صدرِ مملکت',
    },
    articleRange: { start: '41', end: '49' },
  },
  {
    id: 'PK-CONST-P03-CH02',
    partId: 'PK-CONST-P03',
    chapterNumber: '2',
    title: {
      en: 'Majlis-e-Shoora (Parliament)',
      ur: 'مجلسِ شوریٰ (پارلیمنٹ)',
    },
    articleRange: { start: '50', end: '89' },
  },
  {
    id: 'PK-CONST-P03-CH03',
    partId: 'PK-CONST-P03',
    chapterNumber: '3',
    title: {
      en: 'The Federal Government',
      ur: 'وفاقی حکومت',
    },
    articleRange: { start: '90', end: '100' },
  },

  // Part IV: Provinces
  {
    id: 'PK-CONST-P04-CH01',
    partId: 'PK-CONST-P04',
    chapterNumber: '1',
    title: {
      en: 'The Governors',
      ur: 'گورنرز',
    },
    articleRange: { start: '101', end: '105' },
  },
  {
    id: 'PK-CONST-P04-CH02',
    partId: 'PK-CONST-P04',
    chapterNumber: '2',
    title: {
      en: 'Provincial Assemblies',
      ur: 'صوبائی اسمبلیاں',
    },
    articleRange: { start: '106', end: '128' },
  },
  {
    id: 'PK-CONST-P04-CH03',
    partId: 'PK-CONST-P04',
    chapterNumber: '3',
    title: {
      en: 'The Provincial Governments',
      ur: 'صوبائی حکومتیں',
    },
    articleRange: { start: '129', end: '140A' },
  },

  // Part VII: The Judicature
  {
    id: 'PK-CONST-P07-CH01',
    partId: 'PK-CONST-P07',
    chapterNumber: '1',
    title: {
      en: 'The Courts',
      ur: 'عدالتیں',
    },
    articleRange: { start: '175', end: '175A' },
  },
  {
    id: 'PK-CONST-P07-CH02',
    partId: 'PK-CONST-P07',
    chapterNumber: '2',
    title: {
      en: 'The Supreme Court of Pakistan',
      ur: 'سپریم کورٹ آف پاکستان',
    },
    articleRange: { start: '176', end: '191A' },
  },
  {
    id: 'PK-CONST-P07-CH03',
    partId: 'PK-CONST-P07',
    chapterNumber: '3',
    title: {
      en: 'The High Courts',
      ur: 'ہائی کورٹس',
    },
    articleRange: { start: '192', end: '203' },
  },
  {
    id: 'PK-CONST-P07-CH03A',
    partId: 'PK-CONST-P07',
    chapterNumber: '3A',
    title: {
      en: 'Federal Shariat Court',
      ur: 'وفاقی شرعی عدالت',
    },
    articleRange: { start: '203A', end: '203J' },
  },
  {
    id: 'PK-CONST-P07-CH04',
    partId: 'PK-CONST-P07',
    chapterNumber: '4',
    title: {
      en: 'General Provisions Relating to the Judicature',
      ur: 'عدلیہ سے متعلق عمومی دفعات',
    },
    articleRange: { start: '204', end: '212' },
  },

  // Part V: Relations Between Federation and Provinces
  {
    id: 'PK-CONST-P05-CH01',
    partId: 'PK-CONST-P05',
    chapterNumber: '1',
    title: {
      en: 'Distribution of Legislative Powers',
      ur: 'قانون سازی کے اختیارات کی تقسیم',
    },
    articleRange: { start: '141', end: '144' },
  },
  {
    id: 'PK-CONST-P05-CH02',
    partId: 'PK-CONST-P05',
    chapterNumber: '2',
    title: {
      en: 'Administrative Relations Between Federation and Provinces',
      ur: 'وفاق اور صوبوں کے درمیان انتظامی تعلقات',
    },
    articleRange: { start: '145', end: '152' },
  },
  {
    id: 'PK-CONST-P05-CH03',
    partId: 'PK-CONST-P05',
    chapterNumber: '3',
    title: {
      en: 'Special Provisions',
      ur: 'خصوصی احکام',
    },
    articleRange: { start: '153', end: '159' },
  },

  // Part VI: Finance, Property, Contracts and Suits
  {
    id: 'PK-CONST-P06-CH01',
    partId: 'PK-CONST-P06',
    chapterNumber: '1',
    title: {
      en: 'Finance',
      ur: 'مالیات',
    },
    articleRange: { start: '160', end: '165A' },
  },
  {
    id: 'PK-CONST-P06-CH02',
    partId: 'PK-CONST-P06',
    chapterNumber: '2',
    title: {
      en: 'Borrowing and Audit',
      ur: 'قرضے اور آڈٹ',
    },
    articleRange: { start: '166', end: '171' },
  },
  {
    id: 'PK-CONST-P06-CH03',
    partId: 'PK-CONST-P06',
    chapterNumber: '3',
    title: {
      en: 'Property, Contracts, Liabilities and Suits',
      ur: 'جائیداد، معاہدات، واجبات اور دعوے',
    },
    articleRange: { start: '172', end: '174' },
  },

  // Part VIII: Elections
  {
    id: 'PK-CONST-P08-CH01',
    partId: 'PK-CONST-P08',
    chapterNumber: '1',
    title: {
      en: 'Chief Election Commissioner and Election Commission',
      ur: 'چیف الیکشن کمشنر اور الیکشن کمیشن',
    },
    articleRange: { start: '213', end: '221' },
  },
  {
    id: 'PK-CONST-P08-CH02',
    partId: 'PK-CONST-P08',
    chapterNumber: '2',
    title: {
      en: 'Electoral Laws and Conduct of Elections',
      ur: 'انتخابی قوانین اور انتخابات کا انعقاد',
    },
    articleRange: { start: '222', end: '226' },
  },

  // Part XII: Miscellaneous
  {
    id: 'PK-CONST-P12-CH01',
    partId: 'PK-CONST-P12',
    chapterNumber: '1',
    title: {
      en: 'Services',
      ur: 'سروسز',
    },
    articleRange: { start: '240', end: '242' },
  },
  {
    id: 'PK-CONST-P12-CH02',
    partId: 'PK-CONST-P12',
    chapterNumber: '2',
    title: {
      en: 'Armed Forces',
      ur: 'مسلح افواج',
    },
    articleRange: { start: '243', end: '245' },
  },
  {
    id: 'PK-CONST-P12-CH03',
    partId: 'PK-CONST-P12',
    chapterNumber: '3',
    title: {
      en: 'Tribal Areas',
      ur: 'قبائلی علاقے',
    },
    articleRange: { start: '246', end: '247' },
  },
  {
    id: 'PK-CONST-P12-CH04',
    partId: 'PK-CONST-P12',
    chapterNumber: '4',
    title: {
      en: 'General',
      ur: 'متفرق عمومی احکام',
    },
    articleRange: { start: '248', end: '264' },
  },
  {
    id: 'PK-CONST-P12-CH05',
    partId: 'PK-CONST-P12',
    chapterNumber: '5',
    title: {
      en: 'Interpretation',
      ur: 'تعبیر و تشریح',
    },
    articleRange: { start: '265', end: '266' },
  },
  {
    id: 'PK-CONST-P12-CH06',
    partId: 'PK-CONST-P12',
    chapterNumber: '6',
    title: {
      en: 'Title, Commencement and Repeal',
      ur: 'عنوان، نفاذ اور تنسیخ',
    },
    articleRange: { start: '267', end: '267B' },
  },
  {
    id: 'PK-CONST-P12-CH07',
    partId: 'PK-CONST-P12',
    chapterNumber: '7',
    title: {
      en: 'Transitional Provisions',
      ur: 'عبوری احکام',
    },
    articleRange: { start: '268', end: '280' },
  },
];

