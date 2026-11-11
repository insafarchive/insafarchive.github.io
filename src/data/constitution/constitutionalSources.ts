/**
 * INSAF ARCHIVE (انصاف آرکائیو)
 * Authoritative Constitutional Sources Register
 */

import type { SourceCitation } from '../../types/archive';

export const CONSTITUTIONAL_SOURCES: SourceCitation[] = [
  {
    sourceId: 'SRC-CONST-NA-ENG-2024',
    sourceType: 'parliamentary_record',
    title: {
      en: 'The Constitution of the Islamic Republic of Pakistan (As modified up to 31 May 2024)',
      ur: 'دستورِ اسلامی جمہوریہ پاکستان (ترمیم شدہ تا 31 مئی 2024ء)',
    },
    publisher: {
      en: 'National Assembly of Pakistan',
      ur: 'قومی اسمبلی پاکستان',
    },
    originalUrl: 'https://na.gov.pk/uploads/documents/1716982977_840.pdf',
    publicationDate: {
      dateString: '2024-05-31',
      precision: 'day',
      formattedDisplay: { en: 'May 31, 2024', ur: '31 مئی 2024ء' },
    },
    documentIdentifier: 'F. No. 2(1)/2024-Legis',
    language: 'en',
    verificationStatus: 'primary_source',
    verificationTier: 'primary_verified',
  },
  {
    sourceId: 'SRC-CONST-PAKCODE-2024',
    sourceType: 'government_document',
    title: {
      en: 'Pakistan Code — The Constitution of the Islamic Republic of Pakistan, 1973',
      ur: 'پاکستان کوڈ — دستورِ اسلامی جمہوریہ پاکستان، 1973ء',
    },
    publisher: {
      en: 'Ministry of Law and Justice, Government of Pakistan',
      ur: 'وزارتِ قانون و انصاف، حکومتِ پاکستان',
    },
    originalUrl: 'https://pakistancode.gov.pk/english/UY2FqaJw1-apaUY2Fqa-cJA%3D%3D-sg-jjjjjjjjjjjjj',
    publicationDate: {
      dateString: '2024-06-01',
      precision: 'day',
      formattedDisplay: { en: 'June 1, 2024', ur: '1 جون 2024ء' },
    },
    language: 'en',
    verificationStatus: 'primary_source',
    verificationTier: 'primary_verified',
  },
  {
    sourceId: 'SRC-CONST-NA-UR-2022',
    sourceType: 'parliamentary_record',
    title: {
      en: 'Official Urdu Text of the Constitution of Pakistan (National Assembly Secretariat)',
      ur: 'دستورِ اسلامی جمہوریہ پاکستان کا باضابطہ اردو متن (قومی اسمبلی سیکرٹریٹ)',
    },
    publisher: {
      en: 'National Assembly Secretariat, Islamabad',
      ur: 'قومی اسمبلی سیکرٹریٹ، اسلام آباد',
    },
    originalUrl: 'https://na.gov.pk/uploads/documents/urdu_constitution.pdf',
    publicationDate: {
      dateString: '2022-04-01',
      precision: 'day',
      formattedDisplay: { en: 'April 2022', ur: 'اپریل 2022ء' },
    },
    language: 'ur',
    verificationStatus: 'primary_source',
    verificationTier: 'primary_verified',
  },
  {
    sourceId: 'SRC-CONST-SENATE-AMD26',
    sourceType: 'gazette',
    title: {
      en: 'The Constitution (Twenty-sixth Amendment) Act, 2024 (Act No. XXVI of 2024)',
      ur: 'دستور (چھبیسویں ترمیم) ایکٹ، 2024ء (ایکٹ نمبر XXVI برائے 2024ء)',
    },
    publisher: {
      en: 'Printing Corporation of Pakistan Press / Senate of Pakistan',
      ur: 'پرنٹنگ کارپوریشن آف پاکستان / سینیٹ آف پاکستان',
    },
    originalUrl: 'https://senate.gov.pk/uploads/documents/1729497424_899.pdf',
    publicationDate: {
      dateString: '2024-10-21',
      precision: 'day',
      formattedDisplay: { en: 'October 21, 2024', ur: '21 اکتوبر 2024ء' },
    },
    documentIdentifier: 'Act No. XXVI of 2024',
    language: 'en',
    verificationStatus: 'primary_source',
    verificationTier: 'primary_verified',
  },
  {
    sourceId: 'SRC-CONST-AMD18-ACT-2010',
    sourceType: 'gazette',
    title: {
      en: 'The Constitution (Eighteenth Amendment) Act, 2010 (Act No. X of 2010)',
      ur: 'دستور (اٹھارویں ترمیم) ایکٹ، 2010ء (ایکٹ نمبر X برائے 2010ء)',
    },
    publisher: {
      en: 'Gazette of Pakistan (Extraordinary)',
      ur: 'گزٹ آف پاکستان (ایکسٹرا آرڈینری)',
    },
    publicationDate: {
      dateString: '2010-04-20',
      precision: 'day',
      formattedDisplay: { en: 'April 20, 2010', ur: '20 اپریل 2010ء' },
    },
    documentIdentifier: 'Act No. X of 2010',
    language: 'en',
    verificationStatus: 'primary_source',
    verificationTier: 'primary_verified',
  },
  {
    sourceId: 'SRC-CONST-AMD25-ACT-2018',
    sourceType: 'gazette',
    title: {
      en: 'The Constitution (Twenty-fifth Amendment) Act, 2018 (Act No. XXXVII of 2018)',
      ur: 'دستور (پچیسویں ترمیم) ایکٹ، 2018ء (ایکٹ نمبر XXXVII برائے 2018ء)',
    },
    publisher: {
      en: 'Gazette of Pakistan (Extraordinary)',
      ur: 'گزٹ آف پاکستان (ایکسٹرا آرڈینری)',
    },
    originalUrl: 'https://na.gov.pk/uploads/documents/1527834375_525.pdf',
    publicationDate: {
      dateString: '2018-05-31',
      precision: 'day',
      formattedDisplay: { en: 'May 31, 2018', ur: '31 مئی 2018ء' },
    },
    documentIdentifier: 'Act No. XXXVII of 2018',
    language: 'en',
    verificationStatus: 'primary_source',
    verificationTier: 'primary_verified',
  },
];
