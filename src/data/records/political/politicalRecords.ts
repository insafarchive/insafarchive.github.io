import type { ArchiveRecord } from '../../../types/archive';

export const politicalRecords: ArchiveRecord[] = [
  // 9 May 2023 Protests & Legal Aftermath
  {
    schemaVersion: '1.0.0',
    id: 'rec-pk-event-may-09-protests-2023',
    slug: 'events-protests-arrests-may-09-2023',
    domain: 'political_constitutional',
    recordType: 'political_event',
    title: {
      en: '9 May 2023 Countrywide Protests, Installation Attacks & Mass Arrests',
      ur: '9 مئی 2023ء کے ملک گیر احتجاج، تنصیبات پر حملے اور وسیع پیمانے پر گرفتاریاں'
    },
    summary: {
      en: 'Widespread civil unrest and violent attacks on civilian and military installations following the arrest of former Prime Minister Imran Khan from the Islamabad High Court premises.',
      ur: 'اسلام آباد ہائی کورٹ سے سابق وزیر اعظم عمران خان کی گرفتاری کے بعد ملک بھر میں ہونے والے احتجاجی مظاہرے، عسکری و سول تنصیبات پر حملے اور بعد ازاں قانونی کارروائیاں۔'
    },
    narrative: {
      en: `### Incident Overview
On 9 May 2023, former Prime Minister Imran Khan was arrested by Rangers personnel from within the premises of the Islamabad High Court in connection with the Al-Qadir Trust case. The manner and location of the arrest provoked immediate, widespread protests across major cities including Lahore, Rawalpindi, Peshawar, Karachi, and Quetta.

### Installation Breaches & Damage
Protesters entered and damaged several sensitive public and military locations, notably the Corps Commander House (Jinnah House) in Lahore, the General Headquarters (GHQ) perimeter gate in Rawalpindi, and Radio Pakistan in Peshawar.

### Institutional Response & Legal Proceedings
1. The federal government requisitioned armed forces in aid of civil power under Article 245 in Punjab, Khyber Pakhtunkhwa, and Islamabad.
2. The Supreme Court of Pakistan on 11 May declared the arrest from court premises unlawful and ordered Khan's release into police guest house custody until appearance before the High Court.
3. Law enforcement agencies registered hundreds of FIRs under the Anti-Terrorism Act and Pakistan Penal Code, resulting in thousands of detentions.
4. Over 100 civilians were transferred to military custody for trial under the Pakistan Army Act, an action subsequently declared unconstitutional by a 5-member Supreme Court bench on 23 October 2023.`,
      ur: `### واقعاتی پس منظر
9 مئی 2023ء کو رینجرز نے سابق وزیر اعظم عمران خان کو القادر ٹرسٹ کیس میں اسلام آباد ہائی کورٹ کے احاطے سے گرفتار کیا۔ اس گرفتاری کے طریقہ کار پر ملک کے تمام بڑے شہروں (لاہور، راولپنڈی، پشاور، کراچی، کوئٹہ) میں شدید احتجاج شروع ہوا۔

### تنصیبات پر حملے اور نقصانات
مظاہرین نے لاہور میں کور کمانڈر ہاؤس (جناح ہاؤس)، راولپنڈی میں جی ایچ کیو کے مرکزی گیٹ اور پشاور میں ریڈیو پاکستان کی عمارت میں توڑ پھوڑ کی۔

### ریاستی ردعمل اور عدالتی احکامات
1. وفاقی حکومت نے آئین کے آرٹیکل 245 کے تحت فوج طلب کی۔
2. سپریم کورٹ نے 11 مئی کو عدالتی احاطے سے گرفتاری کو غیر قانونی قرار دیا۔
3. انسدادِ دہشت گردی ایکٹ اور تعزیراتِ پاکستان کے تحت سینکڑوں مقدمات درج کر کے ہزاروں افراد کو گرفتار کیا گیا۔
4. 100 سے زائد شہریوں کو فوجی عدالتوں کے حوالے کیا گیا، جسے بعد ازاں 23 اکتوبر 2023ء کو سپریم کورٹ نے غیر آئینی قرار دیا۔`
    },
    date: {
      dateString: '2023-05-09',
      precision: 'day',
      formattedDisplay: { en: 'May 9, 2023', ur: '9 مئی 2023ء' }
    },
    location: {
      city: { en: 'Multiple Cities', ur: 'متعدد شہر' },
      country: { en: 'Pakistan', ur: 'پاکستان' }
    },
    claims: [
      {
        claimId: 'clm-may09-sc-unlawful-arrest',
        findingType: 'court_finding',
        assertion: {
          en: 'Supreme Court bench headed by CJP Bandial ruled that the execution of the arrest warrant inside the High Court premises violated judicial sanctity and was unlawful.',
          ur: 'چیف جسٹس بندیال کی سربراہی میں سپریم کورٹ بینچ نے قرار دیا کہ ہائی کورٹ کے احاطے سے گرفتاری عدالتی تقدس کے منافی اور غیر قانونی تھی۔'
        },
        attributedParty: { en: 'Supreme Court of Pakistan Order (11 May 2023)', ur: 'سپریم کورٹ آف پاکستان کا حکم (11 مئی 2023ء)' },
        sourceIds: ['src-sc-order-arrest-11may2023']
      },
      {
        claimId: 'clm-may09-official-ispr-statement',
        findingType: 'official_position',
        assertion: {
          en: 'Inter-Services Public Relations (ISPR) issued an official statement describing 9 May as a "black chapter" involving pre-planned coordination against military installations.',
          ur: 'آئی ایس پی آر نے سرکاری بیان جاری کرتے ہوئے 9 مئی کو "سیاہ باب" قرار دیا اور تنصیبات پر حملوں کو منظم سازش قرار دیا۔'
        },
        attributedParty: { en: 'Inter-Services Public Relations (ISPR Press Release)', ur: 'پاک فوج کا شعبہ تعلقات عامہ (آئی ایس پی آر)' },
        sourceIds: ['src-ispr-press-release-10may2023']
      }
    ],
    sources: [
      {
        sourceId: 'src-sc-order-arrest-11may2023',
        sourceType: 'court_order',
        title: {
          en: 'Supreme Court Order in Imran Khan Arrest Petitions (11 May 2023)',
          ur: 'عمران خان گرفتاری کیس میں سپریم کورٹ کا حکم نامہ (11 مئی 2023ء)'
        },
        publisher: { en: 'Supreme Court of Pakistan', ur: 'سپریم کورٹ آف پاکستان' },
        publicationDate: { dateString: '2023-05-11', precision: 'day', formattedDisplay: { en: 'May 11, 2023', ur: '11 مئی 2023ء' } },
        documentIdentifier: 'Cr.P. 299/2023',
        language: 'en',
        verificationTier: 'primary_verified',
        verificationStatus: 'primary_source'
      },
      {
        sourceId: 'src-ispr-press-release-10may2023',
        sourceType: 'government_document',
        title: {
          en: 'ISPR Official Statement on 9 May Incidents',
          ur: '9 مئی کے واقعات پر آئی ایس پی آر کا باضابطہ اعلامیہ'
        },
        publisher: { en: 'Inter-Services Public Relations', ur: 'شعبہ تعلقات عامہ (آئی ایس پی آر)' },
        publicationDate: { dateString: '2023-05-10', precision: 'day', formattedDisplay: { en: 'May 10, 2023', ur: '10 مئی 2023ء' } },
        documentIdentifier: 'PR-MAY09-2023',
        language: 'en',
        verificationTier: 'secondary_corroborated',
        verificationStatus: 'source_reviewed'
      }
    ],
    evidenceMedia: [],
    relationships: [
      {
        relationshipId: 'rel-may09-to-mil-courts',
        targetRecordId: 'rec-pk-legal-military-courts-civilians-2023',
        predicate: 'resultedIn',
        description: {
          en: 'Arrests of civilians following 9 May led to trials under Army Act, challenged in CP 24/2023.',
          ur: '9 مئی کے بعد شہریوں کی گرفتاریوں کے بعد ملٹری کورٹس کے ٹرائلز کو سپریم کورٹ میں چیلنج کیا گیا۔'
        }
      }
    ],
    categories: ['Political Unrest', 'Civil Liberties', 'Article 245'],
    tags: {
      en: ['9 May', 'Protests', 'Article 245', 'ISPR Statement', 'Civilian Detention'],
      ur: ['9 مئی', 'احتجاج', 'آرٹیکل 245', 'آئی ایس پی آر بیان', 'گرفتاریاں']
    },
    verificationStatus: 'corroborated',
    editorialStatus: 'published',
    privacyClassification: 'public',
    privacyFlags: {},
    version: 1,
    createdAt: '2023-05-12T00:00:00Z',
    updatedAt: '2023-11-01T00:00:00Z'
  },

  // 25–26 May 2022 Azadi March
  {
    schemaVersion: '1.0.0',
    id: 'rec-pk-event-may-26-azadi-march',
    slug: 'events-azadi-march-red-zone-may-25-26-2022',
    domain: 'political_constitutional',
    recordType: 'political_event',
    title: {
      en: '25–26 May 2022 Azadi March, Roadblockades & Supreme Court Venue Directives',
      ur: '25 تا 26 مئی 2022ء آزادی مارچ، روڈ بلاکیڈز اور سپریم کورٹ کی جلسہ گاہ ہدایات'
    },
    summary: {
      en: 'Political protest march towards Islamabad marked by Section 144 impositions, shipping-container blockades, police tear-gas operations, and emergency Supreme Court orders regarding public assembly rights.',
      ur: 'اسلام آباد کی جانب سیاسی احتجاجی مارچ جس کے دوران دفعہ 144 کا نفاذ، کنٹینرز کی رکاوٹیں، آنسو گیس کی شیلنگ اور پُرامن اجتماع کے حق پر سپریم کورٹ کے ہنگامی احکامات سامنے آئے۔'
    },
    narrative: {
      en: `### Procedural & Political Context
Following the change in federal government in April 2022, Pakistan Tehreek-e-Insaf (PTI) announced a long march to Islamabad demanding immediate general elections. The federal government imposed Section 144 CrPC, placed shipping containers across highways connecting Punjab and Khyber Pakhtunkhwa, and arrested numerous political workers.

### Supreme Court Emergency Orders (25 May 2022)
The Islamabad High Court Bar Association filed a petition before the Supreme Court under Article 184(3). A 3-member bench directed the government to remove barricades and allocate the H-9 / G-9 ground for the rally, while directing the PTI leadership to ensure that workers would not enter the Red Zone or D-Chowk.

### Events of the Night & Morning (26 May 2022)
Despite court directives, convoys encountered intense tear-gas confrontations at multiple interchange points. Protesters entered D-Chowk, where tree-burning and tear-gas exchanges occurred. In the early morning of 26 May, Imran Khan gave a 6-day ultimatum for elections and called off the sit-in.`,
      ur: `### سیاسی و قانونی پس منظر
اپریل 2022ء میں حکومت کی تبدیلی کے بعد پی ٹی آئی نے فوری عام انتخابات کے مطالبے کے لیے اسلام آباد لانگ مارچ کا اعلان کیا۔ وفاقی حکومت نے دفعہ 144 نافذ کر کے پنجاب اور خیبر پختونخوا کے راستوں پر کنٹینرز کھڑے کر دیے اور سیاسی کارکنوں کی پکڑ دھکڑ شروع کی۔

### سپریم کورٹ کے ہنگامی احکامات (25 مئی 2022ء)
اسلام آباد ہائی کورٹ بار ایسوسی ایشن کی درخواست پر سپریم کورٹ کے 3 رکنی بینچ نے حکومت کو رکاوٹیں ہٹانے اور H-9 / G-9 گراؤنڈ مختص کرنے کی ہدایت کی، جبکہ پی ٹی آئی کو ریڈ زون میں داخل نہ ہونے کا پابند کیا۔

### 26 مئی کی رات کے واقعات
عدالتی احکامات کے باوجود مختلف مقامات پر شدید آنسو گیس کی شیلنگ ہوئی۔ مظاہرین ڈی چوک پہنچے جہاں جھڑپیں ہوئیں۔ 26 مئی کی صبح عمران خان نے انتخابات کے لیے 6 دن کی ڈیڈ لائن دے کر دھرنا ختم کرنے کا اعلان کیا۔`
    },
    date: {
      dateString: '2022-05-25',
      precision: 'day',
      formattedDisplay: { en: 'May 25–26, 2022', ur: '25 تا 26 مئی 2022ء' }
    },
    location: {
      city: { en: 'Islamabad', ur: 'اسلام آباد' },
      country: { en: 'Pakistan', ur: 'پاکستان' },
      specificVenue: { en: 'D-Chowk & Srinagar Highway', ur: 'ڈی چوک و سری نگر ہائی وے' }
    },
    claims: [
      {
        claimId: 'clm-may26-sc-venue-order',
        findingType: 'court_finding',
        assertion: {
          en: 'Supreme Court 3-member bench directed the Chief Commissioner Islamabad to designate H-9/G-9 ground for the protest rally and ordered the release of detained lawyers and political activists.',
          ur: 'سپریم کورٹ نے چیف کمشنر اسلام آباد کو جلسے کے لیے H-9/G-9 گراؤنڈ مختص کرنے اور زیر حراست وکلاء اور سیاسی کارکنوں کو رہا کرنے کا حکم دیا۔'
        },
        attributedParty: { en: 'Supreme Court 3-Member Bench (Const. Pet. 19/2022)', ur: 'سپریم کورٹ 3 رکنی بینچ' },
        sourceIds: ['src-sc-order-may25-2022']
      }
    ],
    sources: [
      {
        sourceId: 'src-sc-order-may25-2022',
        sourceType: 'court_order',
        title: {
          en: 'Supreme Court Order in Islamabad High Court Bar Association v Federation (Const. Pet. 19/2022)',
          ur: 'اسلام آباد ہائی کورٹ بار ایسوسی ایشن کیس میں سپریم کورٹ کا حکم نامہ (25 مئی 2022ء)'
        },
        publisher: { en: 'Supreme Court of Pakistan', ur: 'سپریم کورٹ آف پاکستان' },
        publicationDate: { dateString: '2022-05-25', precision: 'day', formattedDisplay: { en: 'May 25, 2022', ur: '25 مئی 2022ء' } },
        documentIdentifier: 'Const. Petition No. 19/2022',
        language: 'en',
        verificationTier: 'primary_verified',
        verificationStatus: 'primary_source'
      }
    ],
    evidenceMedia: [],
    relationships: [],
    categories: ['Political Assembly', 'Article 16', 'Supreme Court'],
    tags: {
      en: ['Azadi March', 'Section 144', 'Article 16', 'Red Zone', 'Supreme Court'],
      ur: ['آزادی مارچ', 'دفعہ 144', 'آرٹیکل 16', 'ریڈ زون', 'سپریم کورٹ']
    },
    verificationStatus: 'corroborated',
    editorialStatus: 'published',
    privacyClassification: 'public',
    privacyFlags: {},
    version: 1,
    createdAt: '2022-05-27T00:00:00Z',
    updatedAt: '2022-06-15T00:00:00Z'
  }
];
