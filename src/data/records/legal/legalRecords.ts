import type { ArchiveRecord } from '../../../types/archive';

export const legalRecords: ArchiveRecord[] = [
  // Supreme Court Landmark Judgment on National Assembly Dissolution (PLD 2022 SC 574)
  {
    schemaVersion: '1.0.0',
    id: 'rec-pk-legal-assembly-dissolution-2022',
    slug: 'supreme-court-judgment-assembly-dissolution-pld-2022-sc-574',
    domain: 'legal',
    recordType: 'court_judgment',
    title: {
      en: 'Supreme Court Judgment on National Assembly Dissolution (Suo Motu Case 1/2022 / PLD 2022 SC 574)',
      ur: 'قومی اسمبلی کی تحلیل پر سپریم کورٹ کا تاریخی متفقہ فیصلہ (ازخود نوٹس 1/2022ء / PLD 2022 SC 574)'
    },
    summary: {
      en: 'Unanimous 5-0 judgment of the Supreme Court of Pakistan setting aside Deputy Speaker Qasim Suri\'s Article 5 ruling and restoring the dissolved National Assembly.',
      ur: 'سپریم کورٹ آف پاکستان کے 5 رکنی لارجر بینچ کا متفقہ فیصلہ جس نے ڈپٹی اسپیکر کی رولنگ اور صدر کی اسمبلی تحلیل کو کالعدم قرار دے کر قومی اسمبلی بحال کی۔'
    },
    narrative: {
      en: `### Procedural History
On 3 April 2022, during proceedings on the motion for a vote of no-confidence against Prime Minister Imran Khan, Deputy Speaker Qasim Suri dismissed the motion citing Article 5 of the Constitution. Shortly thereafter, the President dissolved the National Assembly on the Prime Minister's advice.

### Supreme Court Suo Motu Proceedings
Chief Justice Umar Ata Bandial took suo motu notice of the dissolution under Article 184(3). A 5-member bench heard arguments from the Attorney-General, political party counsel, and amicus curiae over five consecutive days.

### Ruling & Operative Orders (7 April 2022)
1. The Deputy Speaker's ruling of 3 April 2022 was declared contrary to the Constitution and of no legal effect.
2. The advice tendered by the Prime Minister to dissolve the Assembly was declared void ab initio.
3. The National Assembly was ordered restored immediately.
4. The Speaker was directed to summon the Assembly session on 9 April 2022 to conduct the no-confidence vote without adjournment until conclusion.`,
      ur: `### کارروائی کا پس منظر
3 اپریل 2022ء کو وزیر اعظم عمران خان کے خلاف تحریکِ عدم اعتماد پر ووٹنگ کے دوران ڈپٹی اسپیکر قاسم سوری نے آئین کے آرٹیکل 5 کا حوالہ دے کر تحریک مسترد کر دی، جس کے فوری بعد وزیر اعظم کے مشورے پر صدر نے اسمبلی تحلیل کر دی۔

### سپریم کورٹ کی ازخود کارروائی
چیف جسٹس عمر عطا بندیال نے آرٹیکل 184(3) کے تحت ازخود نوٹس لیا۔ 5 رکنی لارجر بینچ نے اٹارنی جنرل، سیاسی جماعتوں کے وکلاء اور عدالتی معاونین کے دلائل سنے۔

### متفقہ عدالتی فیصلہ (7 اپریل 2022ء)
1. ڈپٹی اسپیکر کی 3 اپریل کی رولنگ کو غیر آئینی اور کالعدم قرار دیا گیا۔
2. وزیر اعظم کی اسمبلی تحلیل کی سمری کو غیر قانونی قرار دیا گیا۔
3. قومی اسمبلی کو فوری بحال کرنے کا حکم دیا گیا۔
4. اسپیکر کو 9 اپریل 2022ء کو اجلاس بلا کر تحریکِ عدم اعتماد پر کارروائی مکمل کرنے کی ہدایت کی گئی۔`
    },
    date: {
      dateString: '2022-04-07',
      precision: 'day',
      formattedDisplay: { en: 'April 7, 2022', ur: '7 اپریل 2022ء' }
    },
    location: {
      city: { en: 'Islamabad', ur: 'اسلام آباد' },
      country: { en: 'Pakistan', ur: 'پاکستان' },
      specificVenue: { en: 'Supreme Court of Pakistan', ur: 'سپریم کورٹ آف پاکستان' }
    },
    claims: [
      {
        claimId: 'clm-sc-dissolution-unconst',
        findingType: 'court_finding',
        assertion: {
          en: 'Supreme Court unanimously held that the Prime Minister could not advise dissolution during the pendency of a no-confidence motion under Article 58(1) Explanation.',
          ur: 'سپریم کورٹ نے متفقہ طور پر قرار دیا کہ آئین کے آرٹیکل 58(1) کی وضاحت کے تحت عدم اعتماد کی تحریک کے دوران وزیر اعظم اسمبلی تحلیل کی ایڈوائس نہیں دے سکتے۔'
        },
        attributedParty: { en: 'Supreme Court 5-Member Bench (PLD 2022 SC 574)', ur: 'سپریم کورٹ 5 رکنی لارجر بینچ (PLD 2022 SC 574)' },
        sourceIds: ['src-sc-assembly-dissolution-judgment-2022']
      },
      {
        claimId: 'clm-sc-speaker-ruling-void',
        findingType: 'court_finding',
        assertion: {
          en: 'Supreme Court held that Article 69 does not immunize parliamentary proceedings that violate mandatory constitutional provisions.',
          ur: 'سپریم کورٹ نے قرار دیا کہ آرٹیکل 69 پارلیمانی کارروائی کو ایسی صورت میں استثنیٰ نہیں دیتا جب وہ صریحاً آئینی احکامات کی خلاف ورزی ہو۔'
        },
        attributedParty: { en: 'Supreme Court 5-Member Bench (PLD 2022 SC 574)', ur: 'سپریم کورٹ 5 رکنی بینچ' },
        sourceIds: ['src-sc-assembly-dissolution-judgment-2022']
      }
    ],
    sources: [
      {
        sourceId: 'src-sc-assembly-dissolution-judgment-2022',
        sourceType: 'court_judgment',
        title: {
          en: 'Suo Motu Case No. 1 of 2022 (Short Order and Detailed Judgment: PLD 2022 SC 574)',
          ur: 'ازخود نوٹس کیس نمبر 1 برائے 2022ء (مختصر حکم اور تفصیلی فیصلہ: PLD 2022 SC 574)'
        },
        publisher: { en: 'Supreme Court of Pakistan', ur: 'سپریم کورٹ آف پاکستان' },
        publicationDate: { dateString: '2022-04-07', precision: 'day', formattedDisplay: { en: 'April 7, 2022', ur: '7 اپریل 2022ء' } },
        documentIdentifier: 'PLD 2022 SC 574',
        originalUrl: 'https://www.supremecourt.gov.pk',
        language: 'en',
        verificationTier: 'primary_verified',
        verificationStatus: 'primary_source'
      }
    ],
    evidenceMedia: [],
    relationships: [],
    categories: ['Constitutional Law', 'Supreme Court', 'Parliamentary Procedure'],
    tags: {
      en: ['Assembly Dissolution', 'Article 58', 'Article 69', 'No-Confidence Motion', 'PLD 2022 SC 574'],
      ur: ['اسمبلی کی تحلیل', 'آرٹیکل 58', 'آرٹیکل 69', 'عدم اعتماد', 'سپریم کورٹ']
    },
    domainMetadata: {
      legal: {
        caseNumber: 'Suo Motu Case No. 1 of 2022',
        courtName: { en: 'Supreme Court of Pakistan', ur: 'سپریم کورٹ آف پاکستان' },
        statutesCited: ['Constitution of Pakistan, 1973 (Articles 5, 58, 69, 95, 184(3))']
      }
    },
    verificationStatus: 'verified',
    editorialStatus: 'published',
    privacyClassification: 'public',
    privacyFlags: {},
    version: 1,
    createdAt: '2022-04-08T00:00:00Z',
    updatedAt: '2022-07-15T00:00:00Z'
  }
];
