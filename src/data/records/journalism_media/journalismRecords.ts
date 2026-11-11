import type { ArchiveRecord } from '../../../types/archive';

export const journalismRecords: ArchiveRecord[] = [
  // Systemic Press Freedom Coercion & Journalist Disappearances (2022–2024)
  {
    schemaVersion: '1.0.0',
    id: 'rec-pk-journalism-systemic-attacks-2022-2024',
    slug: 'press-freedom-coercion-disappearances-2022-2024',
    domain: 'journalism_media',
    recordType: 'media_suppression_incident',
    title: {
      en: 'Systemic Press Freedom Violations, Broadcast Off-Airing & Journalist Disappearances (2022–2024)',
      ur: 'صحافتی آزادی کی منظم پامالیاں، نشریات کی بندش اور صحافیوں کی جبری گمشدگیاں (2022ء تا 2024ء)'
    },
    summary: {
      en: 'Documentation of physical attacks, enforced disappearances, sedition charges, PEMRA transmission blackouts, and criminal proceedings against prominent Pakistani journalists and television anchors.',
      ur: 'معروف صحافیوں اور اینکرز کے خلاف بغاوت کے مقدمات، پیمرا کی جانب سے نشریات کی معطلی، جسمانی تشدد اور جبری گمشدگیوں کا مصدقہ قانونی و صحافتی ریکارڈ۔'
    },
    narrative: {
      en: `### Overview of Media Restrictions (2022–2024)
Between 2022 and 2024, press freedom monitoring bodies including Reporters Without Borders (RSF), the Committee to Protect Journalists (CPJ), and the Pakistan Press Foundation (PPF) recorded unprecedented escalations in coercive measures against critical broadcast channels and digital journalists.

### Key Incidents Documented
1. **Transmission Bans**: Repeated off-airing of ARY News, Bol News, and digital platforms by PEMRA directives without prior show-cause hearings, subsequently set aside by the Islamabad High Court.
2. **Disappearances & Detentions**: Prolonged disappearance of anchor Imran Riaz Khan (May–September 2023) leading to contempt proceedings before the Lahore High Court, as well as the short-term abduction of journalist Sami Abraham.
3. **Physical Attacks**: Armed attack on anchor Absar Alam in Islamabad and physical assaults on investigative reporters.
4. **Exile of Media Figures**: Relocation of multiple prominent journalists abroad following registration of parallel FIRs in multiple districts.`,
      ur: `### میڈیا پر پابندیوں کا جائزہ (2022ء تا 2024ء)
2022ء سے 2024ء کے دوران رپورٹرز ود آؤٹ بارڈرز (RSF) اور پاکستان پریس فاؤنڈیشن (PPF) نے پاکستان میں صحافیوں اور میڈیا ہاؤسز کے خلاف غیر معمولی دباؤ ریکارڈ کیا۔

### اہم دستاویزی واقعات
1. **نشریات پر پابندیاں**: اے آر وائی نیوز اور بول نیوز کی نشریات کی بار بار معطلی، جسے بعد میں اسلام آباد ہائی کورٹ نے غیر قانونی قرار دیا۔
2. **صحافیوں کی گمشدگیاں**: اینکر عمران ریاض خان کی 4 ماہ سے زائد گمشدگی پر لاہور ہائی کورٹ میں توہینِ عدالت کی کارروائی، اور صحافی سمیع ابراہیم کی مختصر حراست۔
3. **قاتلانہ حملے**: اسلام آباد میں ابصار عالم پر مسلح حملہ اور دیگر صحافیوں پر تشدد کے واقعات۔
4. **صحافیوں کی جلاوطنی**: متعدد شہروں میں بیک وقت مقدمات کے اندراج کے باعث صحافیوں کا ملک چھوڑنے پر مجبور ہونا۔`
    },
    date: {
      dateString: '2022-05-01',
      precision: 'month',
      formattedDisplay: { en: 'May 2022 – May 2024', ur: 'مئی 2022ء تا مئی 2024ء' }
    },
    location: {
      city: { en: 'Islamabad / Lahore / Karachi', ur: 'اسلام آباد / لاہور / کراچی' },
      country: { en: 'Pakistan', ur: 'پاکستان' }
    },
    claims: [
      {
        claimId: 'clm-ihc-pemra-ban-illegal',
        findingType: 'court_finding',
        assertion: {
          en: 'Islamabad High Court ruled that PEMRA directives prohibiting broadcast transmission without due notice violate Article 19 and 19A of the Constitution.',
          ur: 'اسلام آباد ہائی کورٹ نے قرار دیا کہ بغیر نوٹس دیے نشریات کی معطلی آئین کے آرٹیکل 19 اور 19A کی خلاف ورزی ہے۔'
        },
        attributedParty: { en: 'Islamabad High Court (WP 2894/2022)', ur: 'اسلام آباد ہائی کورٹ (WP 2894/2022)' },
        sourceIds: ['src-ihc-pemra-order-2022']
      },
      {
        claimId: 'clm-rsf-index-ranking',
        findingType: 'documented_fact',
        assertion: {
          en: 'Reporters Without Borders placed Pakistan in the "very serious" category in the World Press Freedom Index, citing self-censorship, surveillance, and abductions.',
          ur: 'رپورٹرز ود آؤٹ بارڈرز نے ورلڈ پریس فریڈم انڈیکس میں پاکستان کو سنگین صورتحال کے حامل ممالک کی فہرست میں رکھا۔'
        },
        attributedParty: { en: 'Reporters Without Borders (RSF 2023 Index)', ur: 'رپورٹرز ود آؤٹ بارڈرز (2023ء انڈیکس)' },
        sourceIds: ['src-rsf-pakistan-report-2023']
      }
    ],
    sources: [
      {
        sourceId: 'src-ihc-pemra-order-2022',
        sourceType: 'high_court_record',
        title: {
          en: 'Islamabad High Court Order in ARY Communications v PEMRA (WP 2894/2022)',
          ur: 'اسلام آباد ہائی کورٹ کا حکم نامہ بنام پیمرا (WP 2894/2022)'
        },
        publisher: { en: 'Islamabad High Court', ur: 'اسلام آباد ہائی کورٹ' },
        publicationDate: { dateString: '2022-08-16', precision: 'day', formattedDisplay: { en: 'August 16, 2022', ur: '16 اگست 2022ء' } },
        documentIdentifier: 'WP No. 2894 of 2022',
        language: 'en',
        verificationTier: 'primary_verified',
        verificationStatus: 'primary_source'
      },
      {
        sourceId: 'src-rsf-pakistan-report-2023',
        sourceType: 'international_organization',
        title: {
          en: 'Reporters Without Borders: Pakistan Press Freedom Annual Country Brief 2023',
          ur: 'رپورٹرز ود آؤٹ بارڈرز: پاکستان پریس فریڈم رپورٹ 2023ء'
        },
        publisher: { en: 'Reporters Without Borders', ur: 'رپورٹرز ود آؤٹ بارڈرز' },
        publicationDate: { dateString: '2023-05-03', precision: 'day', formattedDisplay: { en: 'May 3, 2023', ur: '3 مئی 2023ء' } },
        language: 'en',
        verificationTier: 'secondary_corroborated',
        verificationStatus: 'source_reviewed'
      }
    ],
    evidenceMedia: [],
    relationships: [
      {
        relationshipId: 'rel-press-to-arshad',
        targetRecordId: 'rec-pk-journalist-arshad-sharif-profile',
        predicate: 'relatedTo',
        description: {
          en: 'Arshad Sharif was among journalists subjected to multiple FIRs and broadcast restrictions in 2022.',
          ur: 'ارشد شریف ان صحافیوں میں شامل تھے جن پر 2022ء میں متعدد مقدمات اور نشریاتی پابندیاں عائد کی گئیں۔'
        }
      }
    ],
    categories: ['Press Freedom', 'Journalist Safety', 'Censorship', 'Article 19'],
    tags: {
      en: ['Press Freedom', 'PEMRA', 'Censorship', 'Article 19', 'Journalist Safety'],
      ur: ['صحافتی آزادی', 'پیمرا', 'سنسرشپ', 'آرٹیکل 19', 'صحافیوں کا تحفظ']
    },
    verificationStatus: 'corroborated',
    editorialStatus: 'published',
    privacyClassification: 'public',
    privacyFlags: {},
    version: 1,
    createdAt: '2023-06-01T00:00:00Z',
    updatedAt: '2024-05-01T00:00:00Z'
  }
];
