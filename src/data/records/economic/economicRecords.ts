import type { ArchiveRecord } from '../../../types/archive';

export const economicRecords: ArchiveRecord[] = [
  // Pakistan International Airlines (PIA) Institutional Decline & 2020 Fake License Crisis
  {
    schemaVersion: '1.0.0',
    id: 'rec-pk-soe-pia-institutional-crisis',
    slug: 'pia-institutional-decline-fake-license-crisis-restructuring',
    domain: 'economic_public_policy',
    recordType: 'soe_institutional_record',
    title: {
      en: 'Pakistan International Airlines (PIA) Institutional Decline, 2020 License Controversy & Restructuring',
      ur: 'پاکستان انٹرنیشنل ایئرلائنز (پی آئی اے) ادارہ جاتی تنزلی، جعلی پائلٹ لائسنس تنازع اور نجکاری عمل'
    },
    summary: {
      en: 'Analysis of the financial insolvency, governance failures, May 2020 PK-8303 crash fallout, Parliamentary statement on suspected pilot licenses, international flight bans, and subsequent sovereign debt restructuring.',
      ur: 'قومی ایئرلائن کے مالیاتی خسارے، حادثات کی تحقیقات (PK-8303)، پارلیمنٹ میں مشکوک پائلٹ لائسنسز کے بیان کے بین الاقوامی اثرات اور پی آئی اے کی نجکاری و ری اسٹرکچرنگ کا دستاویزی احاطہ۔'
    },
    narrative: {
      en: `### Historical & Financial Context
Pakistan International Airlines (PIA), once a pioneering carrier in international civil aviation, accumulated over PKR 700 billion in sovereign-guaranteed debt and operating liabilities by 2023, requiring continuous multi-billion rupee federal bailouts to maintain fleet operations.

### The 2020 PK-8303 Crash & Aviation Minister Statement
On 22 May 2020, PIA flight PK-8303 crashed near Karachi airport, killing 97 passengers and crew. Following preliminary investigation discussions, Aviation Minister Ghulam Sarwar Khan presented a statement on the floor of the National Assembly on 24 June 2020 claiming that 262 of Pakistan's 860 active pilots held "dubious" or fake licenses.

### International Repercussions
1. The European Union Aviation Safety Agency (EASA) suspended PIA's authorization to operate in EU member states in July 2020.
2. The United States Federal Aviation Administration (FAA) downgraded Pakistan's civil aviation safety rating to Category 2.
3. The UK Civil Aviation Authority suspended direct PIA operations to British airports, severing the carrier's most lucrative transatlantic routes.
4. Subsequent civil aviation inquiries established that while procedural exam irregularities existed in CAA examination systems, the broad public figure damaged Pakistan's global aviation standing.`,
      ur: `### مالیاتی و ادارہ جاتی پس منظر
پی آئی اے پر 2023ء تک 700 ارب روپے سے زائد کے قرضے اور واجبات جمع ہو چکے تھے، جن کی وجہ سے ادارے کو چلانے کے لیے سالانہ اربوں روپے کے حکومتی بیل آؤٹ کی ضرورت پڑتی رہی۔

### 2020ء کا طیارہ حادثہ اور پارلیمانی بیان
22 مئی 2020ء کو پی آئی اے کا طیارہ PK-8303 کراچی میں حادثے کا شکار ہوا جس میں 97 افراد جاں بحق ہوئے۔ 24 جون 2020ء کو وزیر ہوا بازی غلام سرور خان نے قومی اسمبلی کے فلور پر بیان دیا کہ 860 پائلٹس میں سے 262 کے لائسنس مشتبہ ہیں۔

### بین الاقوامی اثرات
1. یورپی یونین ایوی ایشن سیفٹی ایجنسی (EASA) نے جولائی 2020ء میں پی آئی اے کی پروازوں پر پابندی عائد کر دی۔
2. امریکی ایوی ایشن ریگولیٹر (FAA) نے پاکستان کی ریٹنگ کم کر دی۔
3. برطانیہ نے پی آئی اے کی تمام پروازیں معطل کر دیں جس سے ادارے کو سالانہ اربوں روپے کا معاشی نقصان پہنچا۔
4. بعد ازاں تحقیقات سے ثابت ہوا کہ سول ایوی ایشن کے امتحانی نظام میں خامیاں تھیں مگر غیر محتاط عوامی بیان نے ملک کی ساکھ کو شدید نقصان پہنچایا۔`
    },
    date: {
      dateString: '2020-06-24',
      precision: 'day',
      formattedDisplay: { en: 'June 24, 2020', ur: '24 جون 2020ء' }
    },
    location: {
      city: { en: 'Islamabad / Karachi', ur: 'اسلام آباد / کراچی' },
      country: { en: 'Pakistan', ur: 'پاکستان' }
    },
    claims: [
      {
        claimId: 'clm-pia-parliamentary-statement',
        findingType: 'official_position',
        assertion: {
          en: 'Aviation Minister announced on the floor of the National Assembly that 262 pilots possessed suspect examination credentials.',
          ur: 'وزیر ہوا بازی نے قومی اسمبلی کے فلور پر باضابطہ بیان دیا کہ 262 پائلٹس کے امتحانی ریکارڈ میں بے ضابطگیاں پائی گئیں۔'
        },
        attributedParty: { en: 'Federal Minister for Aviation (National Assembly Speech)', ur: 'وفاقی وزیر ہوا بازی (قومی اسمبلی تقریر)' },
        sourceIds: ['src-na-proceedings-24june2020']
      },
      {
        claimId: 'clm-easa-suspension-order',
        findingType: 'documented_fact',
        assertion: {
          en: 'EASA suspended third-country operator authorization for PIA due to safety oversight concerns arising from regulatory admissions.',
          ur: 'یورپی یونین ایوی ایشن سیفٹی ایجنسی نے پی آئی اے کے آپریٹنگ اجازت نامے کو معطل کر دیا۔'
        },
        attributedParty: { en: 'European Union Aviation Safety Agency (EASA Notice)', ur: 'یورپی یونین ایوی ایشن سیفٹی ایجنسی' },
        sourceIds: ['src-easa-suspension-notice-2020']
      }
    ],
    sources: [
      {
        sourceId: 'src-na-proceedings-24june2020',
        sourceType: 'parliamentary_record',
        title: {
          en: 'National Assembly of Pakistan Official Debates (24 June 2020)',
          ur: 'قومی اسمبلی آف پاکستان باضابطہ کارروائی (24 جون 2020ء)'
        },
        publisher: { en: 'National Assembly Secretariat', ur: 'قومی اسمبلی سیکرٹریٹ' },
        publicationDate: { dateString: '2020-06-24', precision: 'day', formattedDisplay: { en: 'June 24, 2020', ur: '24 جون 2020ء' } },
        documentIdentifier: 'NA-DEB-2020-06-24',
        language: 'en',
        verificationTier: 'primary_verified',
        verificationStatus: 'primary_source'
      },
      {
        sourceId: 'src-easa-suspension-notice-2020',
        sourceType: 'international_organization',
        title: {
          en: 'EASA Decision to Suspend Third Country Operator Authorization (TCO) for PIA',
          ur: 'یورپی ایوی ایشن سیفٹی ایجنسی کا پی آئی اے معطلی کا فیصلہ'
        },
        publisher: { en: 'European Union Aviation Safety Agency', ur: 'یورپی یونین ایوی ایشن سیفٹی ایجنسی' },
        publicationDate: { dateString: '2020-07-01', precision: 'day', formattedDisplay: { en: 'July 1, 2020', ur: '1 جولائی 2020ء' } },
        documentIdentifier: 'EASA-TCO-2020-PIA',
        language: 'en',
        verificationTier: 'primary_verified',
        verificationStatus: 'primary_source'
      }
    ],
    evidenceMedia: [],
    relationships: [],
    categories: ['State-Owned Enterprises', 'Civil Aviation', 'Public Finance'],
    tags: {
      en: ['PIA', 'Civil Aviation', 'EASA Ban', 'Pilot Licenses', 'SOE Restructuring'],
      ur: ['پی آئی اے', 'سول ایوی ایشن', 'ایاسا پابندی', 'پائلٹ لائسنس', 'نجکاری']
    },
    verificationStatus: 'corroborated',
    editorialStatus: 'published',
    privacyClassification: 'public',
    privacyFlags: {},
    version: 1,
    createdAt: '2020-07-15T00:00:00Z',
    updatedAt: '2024-02-01T00:00:00Z'
  }
];
