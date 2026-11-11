/**
 * INSAF ARCHIVE (انصاف آرکائیو)
 * Master Archival Dataset — Comprehensive Multidomain Seed Records
 */

import type { ArchiveRecord } from '../types/archive';

export const SEED_ARCHIVE_RECORDS: ArchiveRecord[] = [
  // =========================================================================
  // 1. ARSHAD SHARIF MULTI-RECORD DOSSIER (Journalism, Legal, Human Rights)
  // =========================================================================
  {
    schemaVersion: '1.0.0',
    id: 'rec-pk-journalist-arshad-sharif-profile',
    slug: 'arshad-sharif-journalist-profile',
    domain: 'journalism_media',
    recordType: 'journalist_profile',
    title: {
      en: 'Arshad Sharif — Investigative Journalist Profile',
      ur: 'ارشد شریف — تحقیقاتی صحافی کا پروفائل',
    },
    summary: {
      en: 'Comprehensive professional biography and investigative record of Pakistani journalist, anchor, and documentary filmmaker Arshad Sharif (1973–2022).',
      ur: 'پاکستانی تحقیقاتی صحافی، اینکر پرسن اور ڈاکومنٹری فلم ساز ارشد شریف (1973ء تا 2022ء) کی صحافتی زندگی اور کام کا جامع دستاویزی ریکارڈ۔',
    },
    narrative: {
      en: `### Professional Overview
Arshad Sharif (22 February 1973 – 23 October 2022) was one of Pakistan's most prominent investigative journalists and current affairs television anchors. Known for hosting the flagship program *Power Play* on ARY News, Sharif specialized in defense reporting, political corruption investigations, public procurement scrutiny, and constitutional governance.

### Career Timeline
* **1993–1999**: Commenced journalistic career covering crime and local governance for English-language print dailies including *The News* and *Dawn*.
* **2000–2012**: Bureau Chief for Dunya News and defense correspondent. Winner of the Agahi Award for investigative journalism.
* **2014–2022**: Host of *Power Play* on ARY News. Investigated major public finance transactions, energy contracts, asset disclosures, and political developments.
* **2019**: Awarded the *Pride of Performance* by the President of Pakistan for contributions to journalism.
* **August 2022**: Departed Pakistan following multiple criminal FIRs registered in various jurisdictions, traveling to the United Arab Emirates and subsequently to Kenya.

### Key Investigative Themes
1. **Public Asset Disclosures**: In-depth analysis of parliamentary declarations and offshore assets.
2. **Military & Defense Procurement**: Scrutiny of defense policy, regional security dynamics, and border management.
3. **Independent Documentary Production**: Production of the investigative documentary *Behind Closed Doors*.`,
      ur: `### پیشہ ورانہ تعارف
ارشد شریف (22 فروری 1973ء تا 23 اکتوبر 2022ء) پاکستان کے صف اول کے تحقیقاتی صحافی اور اینکر پرسن تھے۔ وہ اے آر وائی نیوز پر اپنے پروگرام *پاور پلے* کے ذریعے عوامی فنانس، دفاعی امور، احتساب اور آئینی حکمرانی کے موضوعات پر تحقیقاتی رپورٹنگ کے لیے جانے جاتے تھے۔

### صحافتی کیریئر کے اہم سنگِ میل
* **1993ء تا 1999ء**: انگریزی اخبارات (*دی نیوز* اور *ڈان*) سے کرائم اور عدالتی رپورٹنگ کا آغاز کیا۔
* **2000ء تا 2012ء**: دنیا نیوز کے بیورو چیف اور دفاعی نامہ نگار رہے۔ بہترین تحقیقاتی صحافت پر آگاہی ایوارڈ حاصل کیا۔
* **2014ء تا 2022ء**: اے آر وائی نیوز پر تحقیقاتی پروگرام *پاور پلے* کی میزبانی کی۔
* **2019ء**: صحافتی خدمات کے اعتراف میں صدرِ پاکستان کی جانب سے *تمغہ حسنِ کارکردگی* (پرائیڈ آف پرفارمنس) سے نوازا گیا۔
* **اگست 2022ء**: مختلف شہروں میں درجنوں ایف آئی آرز درج ہونے کے بعد پاکستان سے متحدہ عرب امارات اور بعد ازاں کینیا روانہ ہوئے۔`,
    },
    date: {
      dateString: '1973-02-22',
      precision: 'day',
      formattedDisplay: {
        en: 'February 22, 1973',
        ur: '22 فروری 1973ء',
      },
    },
    location: {
      city: { en: 'Islamabad', ur: 'اسلام آباد' },
      country: { en: 'Pakistan', ur: 'پاکستان' },
    },
    claims: [
      {
        claimId: 'clm-as-award',
        findingType: 'documented_fact',
        assertion: {
          en: 'Awarded Presidential Pride of Performance for Investigative Journalism on 23 March 2019.',
          ur: '23 مارچ 2019ء کو صدرِ پاکستان کی جانب سے تمغہ حسنِ کارکردگی سے نوازا گیا۔',
        },
        attributedParty: { en: 'Cabinet Division Gazette of Pakistan', ur: 'کابینہ ڈویژن، گزٹ آف پاکستان' },
        sourceIds: ['src-gov-gazette-2019-awards'],
      },
      {
        claimId: 'clm-as-firs',
        findingType: 'documented_fact',
        assertion: {
          en: 'At least 16 separate FIRs and complaints were registered against Arshad Sharif across Sindh, Balochistan, and Islamabad in May–August 2022.',
          ur: 'مئی تا اگست 2022ء کے دوران اسلام آباد، سندھ اور بلوچستان کے مختلف تھانوں میں ارشد شریف کے خلاف کم از کم 16 ایف آئی آرز درج کی گئیں۔',
        },
        attributedParty: { en: 'Islamabad High Court Record (W.P. 2933/2022)', ur: 'اسلام آباد ہائی کورٹ ریکارڈ' },
        sourceIds: ['src-ihc-wp-2933-2022'],
      },
    ],
    sources: [
      {
        sourceId: 'src-gov-gazette-2019-awards',
        sourceType: 'gazette',
        title: {
          en: 'Gazette of Pakistan — Civil Awards Notification 2019',
          ur: 'گزٹ آف پاکستان — سول ایوارڈز نوٹیفکیشن 2019ء',
        },
        publisher: { en: 'Printing Corporation of Pakistan Press', ur: 'پرنٹنگ کارپوریشن آف پاکستان' },
        publicationDate: {
          dateString: '2019-03-23',
          precision: 'day',
          formattedDisplay: { en: 'March 23, 2019', ur: '23 مارچ 2019ء' },
        },
        documentIdentifier: 'F. No. 1/1/2019-Awards',
        language: 'en',
        verificationTier: 'primary_verified',
        verificationStatus: 'primary_source',
      },
      {
        sourceId: 'src-ihc-wp-2933-2022',
        sourceType: 'high_court_record',
        title: {
          en: 'Islamabad High Court Order — Arshad Sharif vs Federation of Pakistan',
          ur: 'اسلام آباد ہائی کورٹ آرڈر — ارشد شریف بنام وفاقِ پاکستان',
        },
        publisher: { en: 'Islamabad High Court', ur: 'اسلام آباد ہائی کورٹ' },
        publicationDate: {
          dateString: '2022-08-11',
          precision: 'day',
          formattedDisplay: { en: 'August 11, 2022', ur: '11 اگست 2022ء' },
        },
        documentIdentifier: 'Writ Petition No. 2933/2022',
        language: 'en',
        verificationTier: 'primary_verified',
        verificationStatus: 'primary_source',
      },
    ],
    evidenceMedia: [
      {
        mediaId: 'med-as-profile-photo',
        mediaType: 'photograph',
        title: { en: 'Arshad Sharif Official Portrait', ur: 'ارشد شریف آفیشل تصویر' },
        fileUrl: 'https://upload.wikimedia.org/wikipedia/commons/4/4e/Arshad_Sharif.jpg',
        mimeType: 'image/jpeg',
        privacy: 'public',
      },
    ],
    relationships: [
      {
        relationshipId: 'rel-as-to-killing',
        targetRecordId: 'rec-pk-2022-arshad-sharif-killing',
        predicate: 'subjectOf',
        description: {
          en: 'Subject of the Kenya targeted killing investigation.',
          ur: 'کینیا میں ٹارگٹڈ قتل کے واقعے کے مرکزی مقتول۔',
        },
      },
      {
        relationshipId: 'rel-as-to-jit',
        targetRecordId: 'rec-pk-2022-arshad-sharif-jit-report',
        predicate: 'documentedBy',
        description: {
          en: 'Detailed in the 592-page Pakistani Special JIT Fact Finding Report.',
          ur: 'پاکستانی اسپیشل جے آئی ٹی فیکٹ فائنڈنگ رپورٹ میں تفصیلی احاطہ۔',
        },
      },
    ],
    categories: ['Journalism', 'Investigative Media', 'Press Freedom', 'Profiles'],
    tags: {
      en: ['Arshad Sharif', 'Investigative Journalism', 'Power Play', 'ARY News', 'Media Freedom'],
      ur: ['ارشد شریف', 'تحقیقاتی صحافت', 'پاور پلے', 'آزادی صحافت', 'صحافتی پروفائل'],
    },
    domainMetadata: {
      journalistMedia: {
        organizationAffiliation: [{ en: 'ARY News', ur: 'اے آر وائی نیوز' }, { en: 'Dunya News', ur: 'دنیا نیوز' }],
        medium: ['Television Broadcast', 'Investigative Print', 'Documentary Film'],
        investigationFocus: [{ en: 'Public Finance & Sovereign Guarantees', ur: 'عوامی فنانس اور حکومتی ضمانتیں' }],
      },
    },
    verificationStatus: 'verified',
    editorialStatus: 'published',
    privacyClassification: 'public',
    privacyFlags: {},
    version: 1,
    createdAt: '2022-10-24T00:00:00Z',
    updatedAt: '2024-03-01T00:00:00Z',
  },

  {
    schemaVersion: '1.0.0',
    id: 'rec-pk-2022-arshad-sharif-killing',
    slug: 'arshad-sharif-killing-kenya-2022',
    domain: 'journalism_media',
    recordType: 'journalist_killing',
    title: {
      en: 'Killing of Journalist Arshad Sharif in Kajiado, Kenya (23 October 2022)',
      ur: 'کینیا میں صحافی ارشد شریف کا قتل (23 اکتوبر 2022ء)',
    },
    summary: {
      en: 'Comprehensive evidentiary dossier on the fatal shooting of Pakistani journalist Arshad Sharif on the Magadi-Nairobi highway by Kenyan General Service Unit (GSU) officers.',
      ur: 'کینیا کی مگاڈی-نیروبی شاہراہ پر کینین پولیس جنرل سروس یونٹ کے ہاتھوں صحافی ارشد شریف کو گولیاں مار کر شہید کرنے کے واقعے کی مکمل دستاویزی فائل۔',
    },
    narrative: {
      en: `### Incident Summary
On the night of Sunday, 23 October 2022, Pakistani investigative journalist Arshad Sharif was shot dead while traveling in a motor vehicle (Registration KDG 200M) driven by Khurram Ahmed along the Magadi-Nairobi highway at a makeshift roadblock in Kajiado County, Kenya.

### Competing Accounts & Key Findings

#### 1. Initial National Police Service (Kenya) Account
The Kenyan Police Service initially stated that the vehicle was intercepted pursuant to a "mistaken identity" report regarding a stolen motor vehicle (KDJ 700F) in Pangani, Nairobi, and claimed the vehicle failed to stop at a roadblock, prompting officers to discharge nine rounds.

#### 2. Pakistani Fact-Finding Team Findings (December 2022)
A two-member government fact-finding team (FIA Director Athar Waheed and Intelligence Bureau Deputy DG Omar Shahid Hamid) traveled to Kenya and published a 592-page report concluding:
* The killing was a **planned targeted assassination** rather than a case of mistaken identity.
* The bullet trajectory (fired from close proximity and penetrating from the rear skull) contradicted the official drive-by barrier narrative.
* Multiple hand injuries indicated possible close-range contact or struggle before death.
* Key electronic devices (laptop, mobile phones) belonging to Sharif were withheld or altered.

#### 3. Kenyan High Court Ruling (July 2024)
On 8 July 2024, the High Court of Kenya at Kajiado (Justice Stella Mutuku) delivered judgment in Petition No. E007 of 2023 filed by Sharif's widow Javeria Siddique:
* Ruled the killing **unlawful, arbitrary, and a violation of the right to life** under Article 26 of the Kenyan Constitution.
* Found the Kenyan National Police Service acted with excessive and disproportionate force.
* Ordered the Kenyan government to pay 10 million Kenyan Shillings ($78,000) in compensation to the family.
* Directed the Attorney General and Director of Public Prosecutions to conclude criminal investigations and prosecute responsible officers.`,
      ur: `### واقعے کی تفصیل
23 اکتوبر 2022ء کی رات کینیا کی کاجیادو کاؤنٹی میں مگاڈی-نیروبی روڈ پر پاکستانی صحافی ارشد شریف کو اس وقت فائرنگ کر کے قتل کیا گیا جب وہ خرم احمد کے ہمراہ گاڑی میں سفر کر رہے تھے۔

### متضاد بیانات اور اہم نتائج

#### 1۔ کینین پولیس کا ابتدائی مؤقف
کینین پولیس نے مؤقف اختیار کیا کہ نیروبی سے ایک گاڑی چوری ہونے کی اطلاع پر ناکابندی کی گئی تھی، اور ارشد شریف کی گاڑی کو مشتبہ سمجھتے ہوئے غلط فہمی (مس ٹیکن آئیڈینٹیٹی) میں فائرنگ کی گئی۔

#### 2۔ پاکستانی فیکٹ فائنڈنگ ٹیم کی رپورٹ (دسمبر 2022ء)
ایف آئی اے اور آئی بی کے افسران پر مشتمل دو رکنی تحقیقاتی ٹیم نے 592 صفحات پر مشتمل رپورٹ میں مندرجہ ذیل نتائج پیش کیے:
* یہ واقعہ غلط فہمی نہیں بلکہ ایک منصوبہ بند اور ٹارگٹڈ قتل تھا۔
* ارشد شریف کے جسم پر گولیوں کے نشانات اور زاویہ (قریب سے سر کے پچھلے حصے پر گولی لگنا) پولیس کے ناکے پر چلتی گاڑی پر فائرنگ کے دعوے سے میل نہیں کھاتا۔
* ارشد شریف کے لیپ ٹاپ اور فونز کے ڈیٹا کے ساتھ چھیڑ چھاڑ کی گئی۔

#### 3۔ کینین ہائی کورٹ کا تاریخی فیصلہ (جولائی 2024ء)
8 جولائی 2024ء کو کینیا کی ہائی کورٹ کاجیادو نے ارشد شریف کی بیوہ جویریہ صدیق کی آئینی پٹیشن پر فیصلہ سناتے ہوئے:
* قتل کو مکمل طور پر غیر قانونی اور آئین کے آرٹیکل 26 (حقِ زندگی) کی خلاف ورزی قرار دیا۔
* کینین پولیس کو ماورائے عدالت اور غیر متناسب طاقت کے استعمال کا مرتکب ٹھہرایا۔
* کینین حکومت کو ارشد شریف کے اہلخانہ کو 10 ملین کینین شلنگ ہرجانہ ادا کرنے کا حکم دیا۔`,
    },
    date: {
      dateString: '2022-10-23',
      precision: 'exact_time',
      formattedDisplay: {
        en: 'October 23, 2022',
        ur: '23 اکتوبر 2022ء',
      },
    },
    location: {
      city: { en: 'Kajiado', ur: 'کاجیادو' },
      district: { en: 'Magadi Road', ur: 'مگاڈی روڈ' },
      country: { en: 'Kenya', ur: 'کینیا' },
      specificVenue: { en: 'Tinga Stoney Athi Roadblock', ur: 'ٹِنگا ناکہ' },
    },
    claims: [
      {
        claimId: 'clm-as-kenya-unlawful',
        findingType: 'court_finding',
        assertion: {
          en: 'High Court of Kenya ruled that the killing of Arshad Sharif by Kenyan GSU police was arbitrary, unconstitutional, and unlawful.',
          ur: 'کینیا کی ہائی کورٹ نے فیصلہ دیا کہ کینین پولیس کے ہاتھوں ارشد شریف کا قتل غیر قانونی، ماورائے آئین اور حقِ زندگی کی خلاف ورزی تھا۔',
        },
        attributedParty: { en: 'High Court of Kenya at Kajiado (Justice Stella Mutuku)', ur: 'کینیا ہائی کورٹ کاجیادو' },
        sourceIds: ['src-kenya-hc-judgment-2024'],
      },
      {
        claimId: 'clm-as-jit-targeted',
        findingType: 'commission_finding',
        assertion: {
          en: 'Pakistani Fact-Finding Team concluded the incident was a targeted murder involving planning across multiple jurisdictions.',
          ur: 'پاکستانی فیکٹ فائنڈنگ ٹیم نے نتیجہ اخذ کیا کہ یہ واقعہ غلط فہمی نہیں بلکہ ایک منصوبہ بند ٹارگٹ کلنگ تھا۔',
        },
        attributedParty: { en: 'FIA & Intelligence Bureau Joint Fact-Finding Team', ur: 'ایف آئی اے اور آئی بی جوائنٹ فیکٹ فائنڈنگ ٹیم' },
        sourceIds: ['src-pk-jit-report-592'],
      },
      {
        claimId: 'clm-as-police-mistaken-id',
        findingType: 'official_position',
        assertion: {
          en: 'Kenyan National Police initially asserted the shooting occurred during a mistaken-identity response to a car theft alert.',
          ur: 'کینین پولیس نے ابتدائی مؤقف دیا کہ فائرنگ کار چوری کی اطلاع پر غلط فہمی کے نتیجے میں کی گئی۔',
        },
        attributedParty: { en: 'National Police Service of Kenya Press Release', ur: 'نیشنل پولیس سروس کینیا' },
        sourceIds: ['src-kenya-nps-press-2022'],
      },
      {
        claimId: 'clm-as-unresolved-mastermind',
        findingType: 'unresolved_question',
        assertion: {
          en: 'The identities of the ultimate orchestrators and financial planners of the operation remain unprosecuted.',
          ur: 'اس کارروائی کے منصوبہ سازوں اور سہولت کاروں کی حتمی شناخت اور عدالتی ٹرائل ابھی تک تشنہ تکمیل ہے۔',
        },
        attributedParty: { en: 'Insaf Archive Evidentiary Synthesis', ur: 'انصاف آرکائیو ادارتی جائزہ' },
        sourceIds: ['src-pk-sc-suo-motu-2022', 'src-kenya-hc-judgment-2024'],
      },
    ],
    sources: [
      {
        sourceId: 'src-kenya-hc-judgment-2024',
        sourceType: 'court_judgment',
        title: {
          en: 'Javeria Siddique v Attorney General & 5 Others [2024] KEHC (Kajiado)',
          ur: 'جویریہ صدیق بنام اٹارنی جنرل و دیگر — ہائی کورٹ آف کینیا فیصلہ',
        },
        publisher: { en: 'Judiciary of Kenya / Kenya Law Reports', ur: 'عدلیہ کینیا / کینیا لاء رپورٹس' },
        publicationDate: {
          dateString: '2024-07-08',
          precision: 'day',
          formattedDisplay: { en: 'July 8, 2024', ur: '8 جولائی 2024ء' },
        },
        documentIdentifier: 'High Court Petition No. E007 of 2023',
        originalUrl: 'https://kenyalaw.org/caselaw/cases/view/269151/',
        language: 'en',
        verificationTier: 'primary_verified',
        verificationStatus: 'primary_source',
      },
      {
        sourceId: 'src-pk-jit-report-592',
        sourceType: 'commission_report',
        title: {
          en: 'Fact-Finding Report into the Murder of Arshad Sharif (592 Pages)',
          ur: 'ارشد شریف قتل کیس پر فیکٹ فائنڈنگ انکوائری رپورٹ (592 صفحات)',
        },
        publisher: { en: 'Government of Pakistan / Federal Investigation Agency', ur: 'حکومت پاکستان / ایف آئی اے' },
        publicationDate: {
          dateString: '2022-12-06',
          precision: 'day',
          formattedDisplay: { en: 'December 6, 2022', ur: '6 دسمبر 2022ء' },
        },
        documentIdentifier: 'FIA/HQ/FFT-AS/2022',
        language: 'en',
        verificationTier: 'primary_verified',
        verificationStatus: 'primary_source',
      },
      {
        sourceId: 'src-kenya-nps-press-2022',
        sourceType: 'government_document',
        title: {
          en: 'National Police Service Statement on Fatal Shooting of Pakistani National',
          ur: 'کینین پولیس کا پاکستانی شہری کے قتل پر باضابطہ بیان',
        },
        publisher: { en: 'National Police Service Headquarters, Nairobi', ur: 'نیشنل پولیس سروس ہیڈکوارٹرز نیروبی' },
        publicationDate: {
          dateString: '2022-10-24',
          precision: 'day',
          formattedDisplay: { en: 'October 24, 2022', ur: '24 اکتوبر 2022ء' },
        },
        documentIdentifier: 'NPS/PR/24/10/2022',
        language: 'en',
        verificationTier: 'primary_verified',
        verificationStatus: 'primary_source',
      },
      {
        sourceId: 'src-pk-sc-suo-motu-2022',
        sourceType: 'supreme_court_record',
        title: {
          en: 'Supreme Court of Pakistan Suo Motu Case No. 8 of 2022',
          ur: 'سپریم کورٹ آف پاکستان ازخود نوٹس کیس نمبر 8 برائے 2022ء',
        },
        publisher: { en: 'Supreme Court of Pakistan', ur: 'سپریم کورٹ آف پاکستان' },
        publicationDate: {
          dateString: '2022-12-06',
          precision: 'day',
          formattedDisplay: { en: 'December 6, 2022', ur: '6 دسمبر 2022ء' },
        },
        documentIdentifier: 'SMC No. 08/2022',
        language: 'en',
        verificationTier: 'primary_verified',
        verificationStatus: 'primary_source',
      },
    ],
    evidenceMedia: [
      {
        mediaId: 'med-as-kenya-vehicle',
        mediaType: 'photograph',
        title: { en: 'Forensic Photo of Motor Vehicle KDG 200M', ur: 'گاڑی KDG 200M کی فرانزک تصاویر' },
        fileUrl: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=1200&q=80',
        caption: { en: 'Vehicle inspection scene documenting bullet penetration points.', ur: 'گاڑی پر گولیوں کے نشانات کی فرانزک تصویر۔' },
        mimeType: 'image/jpeg',
        privacy: 'public',
      },
    ],
    relationships: [
      {
        relationshipId: 'rel-killing-to-profile',
        targetRecordId: 'rec-pk-journalist-arshad-sharif-profile',
        predicate: 'involvesPerson',
        description: { en: 'Victim of the targeted killing.', ur: 'قتل کے مقتول صحافی۔' },
      },
      {
        relationshipId: 'rel-killing-to-jit',
        targetRecordId: 'rec-pk-2022-arshad-sharif-jit-report',
        predicate: 'investigatedBy',
        description: { en: 'Investigated by Pakistan Fact-Finding Team.', ur: 'پاکستانی فیکٹ فائنڈنگ ٹیم کی تحقیقات۔' },
      },
      {
        relationshipId: 'rel-killing-to-sc',
        targetRecordId: 'rec-pk-2022-arshad-sharif-sc-suomotu',
        predicate: 'challengedBy',
        description: { en: 'Subject of Supreme Court 5-member bench Suo Motu proceedings.', ur: 'سپریم کورٹ کے 5 رکنی بینچ کے ازخود نوٹس کا موضوع۔' },
      },
    ],
    categories: ['Journalist Killing', 'Impunity', 'Extrajudicial Murder', 'Kenya', 'Forensic Evidence'],
    tags: {
      en: ['Arshad Sharif', 'Kenya Police', 'Targeted Killing', 'GSU', 'Javeria Siddique', 'Forensics'],
      ur: ['ارشد شریف', 'کینیا پولیس', 'ٹارگٹ کلنگ', 'ماورائے عدالت قتل', 'جویریہ صدیق', 'فرانزک شواہد'],
    },
    verificationStatus: 'verified',
    editorialStatus: 'published',
    privacyClassification: 'public',
    privacyFlags: {},
    version: 1,
    createdAt: '2022-10-24T00:00:00Z',
    updatedAt: '2024-07-15T00:00:00Z',
  },

  {
    schemaVersion: '1.0.0',
    id: 'rec-pk-2022-arshad-sharif-jit-report',
    slug: 'arshad-sharif-592-page-fact-finding-report',
    domain: 'evidence_media',
    recordType: 'commission_report',
    title: {
      en: 'Pakistani Fact-Finding Inquiry Report on the Murder of Arshad Sharif',
      ur: 'صحافی ارشد شریف کے قتل پر پاکستانی فیکٹ فائنڈنگ انکوائری رپورٹ',
    },
    summary: {
      en: 'The 592-page evidentiary inquiry report submitted to the Supreme Court by the joint FIA-Intelligence Bureau fact-finding committee.',
      ur: 'ایف آئی اے اور انٹیلی جنس بیورو کی مشترکہ فیکٹ فائنڈنگ کمیٹی کی جانب سے سپریم کورٹ میں جمع کرائی گئی 592 صفحات پر مشتمل تفصیلی انکوائری رپورٹ۔',
    },
    narrative: {
      en: `### Report Overview
Submitted on 6 December 2022, this 592-page official inquiry is the primary evidentiary compilation produced by the Government of Pakistan's Fact-Finding Team (Athar Waheed and Omar Shahid Hamid) following their field mission to Kenya and the UAE.

### Critical Documented Sections:
1. **Visa and Travel Timeline**: Analysis of Sharif's departure from Islamabad to Dubai on 10 August 2022, visa expiration interventions, and subsequent departure to Nairobi.
2. **Forensic Autopsy Discrepancies**: Comparison of the Nairobi Chiromo Mortuary post-mortem report with the PIMS Islamabad medical board findings, noting bullet trajectories and blunt force trauma indicators.
3. **Ballistics & Reconstruction**: Detailed mathematical trajectory calculations showing that the fatal shot was fired from approximately 1–3 meters, conflicting with Kenyan police claims of distance fire.
4. **Electronic Evidence**: Documentation of missing mobile phones, deleted data traces, and communications logs of hosts in Nairobi (Waqar Ahmed and Khurram Ahmed).`,
      ur: `### رپورٹ کا جائزہ
6 دسمبر 2022ء کو سپریم کورٹ میں جمع کرائی گئی یہ 592 صفحات پر مشتمل رپورٹ ایف آئی اے اور آئی بی کے افسران کی کینیا اور یو اے ای میں تحقیقات کا بنیادی دستاویزی ریکارڈ ہے۔

### رپورٹ کے اہم نکات:
1. **سفری دستاویزات**: 10 اگست 2022ء کو اسلام آباد سے دبئی اور بعد ازاں نیروبی روانگی کی وجوہات اور ویزا کی تفصیلات۔
2. **پوسٹ مارٹم تقابل**: کینیا کے چیرو مو مورچری کے پوسٹ مارٹم اور پمز اسلام آباد کے 8 رکنی میڈیکل بورڈ کے نتائج کا تقابل۔
3. **بیلسٹک و فرانزک تجزیہ**: گاڑی اور گولیوں کے زاویوں کا سائنسی جائزہ جس نے ثابت کیا کہ گولی بہت قریب سے ماری گئی۔
4. **غائب شدہ الیکٹرانک شواہد**: ارشد شریف کے موبائل فونز، لیپ ٹاپ اور میزبانوں (وقار احمد اور خرم احمد) کے بیانات کا تفصیلی ریکارڈ۔`,
    },
    date: {
      dateString: '2022-12-06',
      precision: 'day',
      formattedDisplay: { en: 'December 6, 2022', ur: '6 دسمبر 2022ء' },
    },
    location: {
      city: { en: 'Islamabad', ur: 'اسلام آباد' },
      country: { en: 'Pakistan', ur: 'پاکستان' },
    },
    claims: [
      {
        claimId: 'clm-jit-contradiction',
        findingType: 'police_finding',
        assertion: {
          en: 'Report documents that Kenyan GSU officers fired at the vehicle from stationary positions at angles incompatible with an evasive moving car scenario.',
          ur: 'رپورٹ نے ثابت کیا کہ کینین پولیس کے فائرنگ کے زاویے ناکے سے بھاگتی گاڑی کی کہانی سے میل نہیں کھاتے۔',
        },
        attributedParty: { en: 'Athar Waheed (Director FIA) & Omar Shahid Hamid (Deputy DG IB)', ur: 'اطہر وحید (ڈائریکٹر ایف آئی اے) و عمر شاہد حامد (ڈپٹی ڈی جی آئی بی)' },
        sourceIds: ['src-pk-jit-report-592'],
      },
    ],
    sources: [
      {
        sourceId: 'src-pk-jit-report-592',
        sourceType: 'commission_report',
        title: {
          en: 'Fact-Finding Report into the Murder of Arshad Sharif (592 Pages)',
          ur: 'ارشد شریف قتل کیس پر فیکٹ فائنڈنگ انکوائری رپورٹ (592 صفحات)',
        },
        publisher: { en: 'Federal Investigation Agency', ur: 'وفاقی تحقیقاتی ادارہ' },
        publicationDate: {
          dateString: '2022-12-06',
          precision: 'day',
          formattedDisplay: { en: 'December 6, 2022', ur: '6 دسمبر 2022ء' },
        },
        language: 'en',
        verificationTier: 'primary_verified',
        verificationStatus: 'primary_source',
      },
    ],
    evidenceMedia: [],
    relationships: [
      {
        relationshipId: 'rel-jit-to-killing',
        targetRecordId: 'rec-pk-2022-arshad-sharif-killing',
        predicate: 'sourceFor',
        description: { en: 'Primary investigation into the killing.', ur: 'واقعہ کی بنیادی تحقیقاتی دستاویز۔' },
      },
    ],
    categories: ['Inquiry Reports', 'Forensics', 'Journalist Safety', 'State Documents'],
    tags: {
      en: ['JIT Report', 'FIA', 'Intelligence Bureau', 'Autopsy', 'Ballistics'],
      ur: ['جے آئی ٹی رپورٹ', 'ایف آئی اے', 'انٹیلی جنس بیورو', 'پوسٹ مارٹم', 'فرانزک تجزیہ'],
    },
    verificationStatus: 'verified',
    editorialStatus: 'published',
    privacyClassification: 'public',
    privacyFlags: {},
    version: 1,
    createdAt: '2022-12-06T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },

  {
    schemaVersion: '1.0.0',
    id: 'rec-pk-2022-arshad-sharif-sc-suomotu',
    slug: 'supreme-court-suo-motu-arshad-sharif-killing',
    domain: 'legal',
    recordType: 'suo_motu_proceeding',
    title: {
      en: 'Supreme Court Suo Motu Case on the Targeted Killing of Arshad Sharif (SMC 8/2022)',
      ur: 'سپریم کورٹ ازخود نوٹس — صحافی ارشد شریف کے قتل کی عدالتی کارروائی (SMC 8/2022)',
    },
    summary: {
      en: 'Proceedings before a 5-member bench of the Supreme Court of Pakistan taking suo motu notice of the killing of journalist Arshad Sharif.',
      ur: 'چیف جسٹس آف پاکستان کی سربراہی میں 5 رکنی لارجر بینچ کے سامنے ارشد شریف کے قتل پر ازخود نوٹس کی عدالتی کارروائی اور احکامات۔',
    },
    narrative: {
      en: `### Supreme Court Bench & Proceedings
On 6 December 2022, Chief Justice of Pakistan Umar Ata Bandial constituted a 5-member larger bench (comprising CJP Umar Ata Bandial, Justice Ijaz ul Ahsan, Justice Jamal Khan Mandokhail, Justice Sayyed Mazahar Ali Akbar Naqvi, and Justice Mohammad Ali Mazhar) under Article 184(3) of the Constitution of Pakistan.

### Key Orders & Directives:
1. **Registration of Murder FIR**: Ordered the Islamabad Police to register a formal FIR for the murder of Arshad Sharif (FIR No. 492/2022 registered at PS Ramna).
2. **Special JIT Formation**: Ordered the reconstitution of a broader Special JIT comprising members from police, FIA, ISI, and IB.
3. **Mutual Legal Assistance (MLA)**: Directed the Ministry of Foreign Affairs to initiate formal MLA requests under the UN Convention against Transnational Organized Crime with Kenya and the UAE.`,
      ur: `### عدالتی بینچ اور کارروائی
6 دسمبر 2022ء کو چیف جسٹس عمر عطا بندیال نے آئین کے آرٹیکل 184(3) کے تحت 5 رکنی لارجر بینچ تشکیل دیا جس نے ارشد شریف کے قتل کا ازخود نوٹس لیا۔

### اہم عدالتی احکامات:
1. **قتل کی ایف آئی آر کا اندراج**: اسلام آباد پولیس کو ارشد شریف کے قتل کی باضابطہ ایف آئی آر درج کرنے کا حکم دیا گیا (تھانہ رمنا میں ایف آئی آر 492/2022 درج ہوئی)۔
2. **اسپیشل جے آئی ٹی کی تشکیل**: عدالتی حکم پر پولیس، ایف آئی اے، آئی ایس آئی اور آئی بی کے نمائندوں پر مشتمل نئی جے آئی ٹی بنائی گئی۔
3. **کینیا سے قانونی معاونت**: وزارتِ خارجہ کو کینیا اور متحدہ عرب امارات سے بین الاقوامی قانونی معاونت (MLA) حاصل کرنے کی ہدایات جاری کی گئیں۔`,
    },
    date: {
      dateString: '2022-12-06',
      precision: 'day',
      formattedDisplay: { en: 'December 6, 2022', ur: '6 دسمبر 2022ء' },
    },
    location: {
      city: { en: 'Islamabad', ur: 'اسلام آباد' },
      country: { en: 'Pakistan', ur: 'پاکستان' },
      specificVenue: { en: 'Supreme Court of Pakistan', ur: 'سپریم کورٹ آف پاکستان' },
    },
    claims: [
      {
        claimId: 'clm-sc-fir-order',
        findingType: 'court_finding',
        assertion: {
          en: 'Supreme Court bench ordered the immediate registration of an FIR for the killing of Arshad Sharif under Pakistani criminal law.',
          ur: 'سپریم کورٹ نے پاکستانی فوجداری قانون کے تحت ارشد شریف کے قتل کی فوری ایف آئی آر درج کرنے کا حکم دیا۔',
        },
        attributedParty: { en: 'Supreme Court 5-Member Bench Order', ur: 'سپریم کورٹ 5 رکنی بینچ کا تحریری حکم نامہ' },
        sourceIds: ['src-pk-sc-suo-motu-2022'],
      },
    ],
    sources: [
      {
        sourceId: 'src-pk-sc-suo-motu-2022',
        sourceType: 'supreme_court_record',
        title: {
          en: 'Supreme Court Order Sheet — Suo Motu Case No. 8 of 2022',
          ur: 'سپریم کورٹ آرڈر شیٹ — ازخود نوٹس کیس نمبر 8 برائے 2022ء',
        },
        publisher: { en: 'Supreme Court of Pakistan', ur: 'سپریم کورٹ آف پاکستان' },
        publicationDate: {
          dateString: '2022-12-06',
          precision: 'day',
          formattedDisplay: { en: 'December 6, 2022', ur: '6 دسمبر 2022ء' },
        },
        documentIdentifier: 'SMC 08/2022',
        language: 'en',
        verificationTier: 'primary_verified',
        verificationStatus: 'primary_source',
      },
    ],
    evidenceMedia: [],
    relationships: [
      {
        relationshipId: 'rel-sc-to-killing',
        targetRecordId: 'rec-pk-2022-arshad-sharif-killing',
        predicate: 'cites',
        description: { en: 'Judicial oversight of the murder investigation.', ur: 'قتل کی تفتیش کی عدالتی نگرانی۔' },
      },
    ],
    categories: ['Constitutional Law', 'Supreme Court', 'Suo Motu', 'Article 184(3)', 'Judicial Orders'],
    tags: {
      en: ['Supreme Court', 'Article 184(3)', 'Suo Motu', 'Bandial', 'FIR 492/2022'],
      ur: ['سپریم کورٹ', 'آرٹیکل 184(3)', 'ازخود نوٹس', 'عمر عطا بندیال', 'ایف آئی آر'],
    },
    domainMetadata: {
      legal: {
        caseNumber: 'SMC No. 08/2022',
        courtName: { en: 'Supreme Court of Pakistan', ur: 'سپریم کورٹ آف پاکستان' },
        statutesCited: ['Article 184(3) of the Constitution', 'Section 154 CrPC'],
      },
    },
    verificationStatus: 'verified',
    editorialStatus: 'published',
    privacyClassification: 'public',
    privacyFlags: {},
    version: 1,
    createdAt: '2022-12-06T00:00:00Z',
    updatedAt: '2023-06-01T00:00:00Z',
  },

  // =========================================================================
  // 2. CONSTITUTIONAL & LEGAL LANDMARK RECORDS
  // =========================================================================
  {
    schemaVersion: '1.0.0',
    id: 'rec-pk-legal-military-courts-civilians-2023',
    slug: 'supreme-court-judgment-military-courts-civilians-2023',
    domain: 'legal',
    recordType: 'court_judgment',
    title: {
      en: 'Supreme Court Judgment on Military Court Trials of Civilians (Const. Pet. 24/2023)',
      ur: 'سپریم کورٹ کا عام شہریوں کے فوجی عدالتوں میں ٹرائل کے خلاف تاریخی فیصلہ (2023ء)',
    },
    summary: {
      en: 'Landmark judgment by the Supreme Court of Pakistan declaring the trial of civilians under the Pakistan Army Act 1952 unconstitutional and ultra vires.',
      ur: 'سپریم کورٹ آف پاکستان کا تاریخی فیصلہ جس میں عام شہریوں کے پاکستان آرمی ایکٹ 1952ء کے تحت کورٹ مارشل کو غیر آئینی اور کالعدم قرار دیا گیا۔',
    },
    narrative: {
      en: `### Procedural History
Following the events of 9 May 2023, over 103 civilian citizens were detained and handed over to military authorities for trial under Section 2(1)(d) and Section 59(4) of the Pakistan Army Act, 1952, read with the Official Secrets Act, 1923.

Multiple constitutional petitions were filed under Article 184(3) of the Constitution by former Chief Justice Jawwad S. Khawaja, Aitzaz Ahsan, Karamat Ali, the Pakistan Institute of Labour Education and Research (PILER), and the Supreme Court Bar Association.

### The Landmark 5-Judge Ruling (23 October 2023)
A 5-member bench headed by Justice Ijaz ul Ahsan (with Justices Munib Akhtar, Yahya Afridi, Sayyed Mazahar Ali Akbar Naqvi, and Ayesha A. Malik) unanimously held:
1. **Unconstitutionality of Section 2(1)(d)**: Declared Section 2(1)(d)(i) & (ii) and Section 59(4) of the Army Act unconstitutional to the extent that they brought civilians under the jurisdiction of military courts.
2. **Fundamental Rights**: Held that military court trials of civilians violate Article 9 (Security of Person), Article 10A (Right to Fair Trial and Due Process), Article 25 (Equality before Law), and Article 175 (Separation of Judiciary from Executive).
3. **Ordinary Criminal Jurisdiction**: Directed that all civilian accused in custody be transferred to ordinary criminal courts of competent jurisdiction.`,
      ur: `### مقدمے کا پس منظر
9 مئی 2023ء کے واقعات کے بعد 103 سے زائد عام شہریوں کو پاکستان آرمی ایکٹ 1952ء کی دفعہ 2(1)(d) اور آفیشل سیکرٹس ایکٹ کے تحت فوجی عدالتوں (کورٹ مارشل) کے حوالے کیا گیا۔

سابق چیف جسٹس جواد ایس خواجہ، چوہدری اعتزاز احسن، کرامت علی اور سپریم کورٹ بار نے آئین کے آرٹیکل 184(3) کے تحت پٹیشنز دائر کیں۔

### 5 رکنی بینچ کا فیصلہ (23 اکتوبر 2023ء)
جسٹس اعجاز الاحسن، جسٹس منیب اختر، جسٹس یحییٰ آفریدی، جسٹس مظاہر نقوی اور جسٹس عائشہ ملک پر مشتمل بینچ نے متفقہ فیصلہ دیا:
1. **آرمی ایکٹ کی دفعات کالعدم**: آرمی ایکٹ کی دفعہ 2(1)(d) اور دفعہ 59(4) کو اس حد تک غیر آئینی قرار دیا گیا جس کے تحت عام شہریوں کا کورٹ مارشل کیا جا سکتا تھا۔
2. **بنیادی حقوق کا تحفظ**: عدالت نے قرار دیا کہ فوجی عدالتوں میں سویلین کا ٹرائل آئین کے آرٹیکل 9 (تحفظِ جان)، آرٹیکل 10A (منصفانہ ٹرائل کا حق)، آرٹیکل 25 (مساوات) اور آرٹیکل 175 (عدلیہ کی آزادی) کے منافی ہے۔
3. **کیسز کی منتقلی**: تمام سویلین قیدیوں کے کیسز عام فوجداری عدالتوں کو منتقل کرنے کا حکم دیا گیا۔`,
    },
    date: {
      dateString: '2023-10-23',
      precision: 'day',
      formattedDisplay: { en: 'October 23, 2023', ur: '23 اکتوبر 2023ء' },
    },
    location: {
      city: { en: 'Islamabad', ur: 'اسلام آباد' },
      country: { en: 'Pakistan', ur: 'پاکستان' },
      specificVenue: { en: 'Supreme Court of Pakistan', ur: 'سپریم کورٹ آف پاکستان' },
    },
    claims: [
      {
        claimId: 'clm-mil-trial-unconst',
        findingType: 'court_finding',
        assertion: {
          en: 'Supreme Court held that civilian trials under military court-martial violate fundamental rights guaranteed under Articles 9, 10A, and 25 of the Constitution.',
          ur: 'سپریم کورٹ نے قرار دیا کہ فوجی عدالتوں میں عام شہریوں کا ٹرائل آئین کے آرٹیکل 9، 10A اور 25 کے تحت دیے گئے بنیادی حقوق کی سنگین خلاف ورزی ہے۔',
        },
        attributedParty: { en: 'Supreme Court of Pakistan (Short Order 23 Oct 2023)', ur: 'سپریم کورٹ آف پاکستان کا مختصر حکمنامہ' },
        sourceIds: ['src-sc-mil-courts-2023-order'],
      },
    ],
    sources: [
      {
        sourceId: 'src-sc-mil-courts-2023-order',
        sourceType: 'court_judgment',
        title: {
          en: 'Jawwad S. Khawaja & Others v Federation of Pakistan (Const. Pet. 24 of 2023)',
          ur: 'جواد ایس خواجہ و دیگر بنام وفاقِ پاکستان — آئینی پٹیشن 24 برائے 2023ء',
        },
        publisher: { en: 'Supreme Court of Pakistan', ur: 'سپریم کورٹ آف پاکستان' },
        publicationDate: {
          dateString: '2023-10-23',
          precision: 'day',
          formattedDisplay: { en: 'October 23, 2023', ur: '23 اکتوبر 2023ء' },
        },
        documentIdentifier: 'Const. Petition No. 24/2023',
        originalUrl: 'https://www.supremecourt.gov.pk',
        language: 'en',
        verificationTier: 'primary_verified',
        verificationStatus: 'primary_source',
      },
    ],
    evidenceMedia: [],
    relationships: [],
    categories: ['Constitutional Law', 'Supreme Court', 'Due Process', 'Military Courts', 'Article 10A'],
    tags: {
      en: ['Military Courts', 'Article 10A', 'Due Process', 'Jawwad S Khawaja', 'Aitzaz Ahsan', 'Army Act 1952'],
      ur: ['فوجی عدالتیں', 'آرٹیکل 10A', 'منصفانہ ٹرائل', 'جواد ایس خواجہ', 'اعتزاز احسن', 'آرمی ایکٹ'],
    },
    domainMetadata: {
      legal: {
        caseNumber: 'Const. Petition No. 24/2023',
        courtName: { en: 'Supreme Court of Pakistan', ur: 'سپریم کورٹ آف پاکستان' },
        bench: [
          { en: 'Justice Ijaz ul Ahsan', ur: 'جسٹس اعجاز الاحسن' },
          { en: 'Justice Munib Akhtar', ur: 'جسٹس منیب اختر' },
          { en: 'Justice Yahya Afridi', ur: 'جسٹس یحییٰ آفریدی' },
          { en: 'Justice Sayyed Mazahar Ali Akbar Naqvi', ur: 'جسٹس مظاہر نقوی' },
          { en: 'Justice Ayesha A. Malik', ur: 'جسٹس عائشہ اے ملک' },
        ],
        statutesCited: ['Pakistan Army Act 1952', 'Constitution of Pakistan Articles 9, 10A, 25, 175'],
        disposition: { en: 'Petitions Allowed; Section 2(1)(d) ultra vires', ur: 'درخواستیں منظور؛ دفعہ 2(1)(d) کالعدم' },
      },
    },
    verificationStatus: 'verified',
    editorialStatus: 'published',
    privacyClassification: 'public',
    privacyFlags: {},
    version: 1,
    createdAt: '2023-10-24T00:00:00Z',
    updatedAt: '2024-02-01T00:00:00Z',
  },

  // =========================================================================
  // 3. ENERGY, IPP & PUBLIC FINANCE ARCHIVE
  // =========================================================================
  {
    schemaVersion: '1.0.0',
    id: 'rec-pk-energy-ipp-power-policy-1994-2002',
    slug: 'pakistan-ipp-power-policy-capacity-payment-framework',
    domain: 'economic_public_policy',
    recordType: 'ipp_record',
    title: {
      en: 'Pakistan IPP Contract Framework, Capacity Payments & Sovereign Guarantees (1994–Present)',
      ur: 'پاکستان آئی پی پی معاہدات، کیپسٹی پیمنٹس اور حکومتی ضمانتوں کا جامع دستاویزی ریکارڈ',
    },
    summary: {
      en: 'Comprehensive analytical and documentary dossier on Pakistan’s Independent Power Producer (IPP) contractual architecture, dollar-indexed capacity payments, fuel pass-through mechanisms, and circular debt accumulation.',
      ur: 'پاکستان کی نجی بجلی گھروں (آئی پی پیز) کی پالیسیوں (1994ء و 2002ء)، ڈالر سے منسلک کیپسٹی ادائیگیوں، فیول کاسٹ اور گردشی قرضے کا مکمل دستاویزی و قانونی تجزیہ۔',
    },
    narrative: {
      en: `### Structural Overview of the IPP Model
Beginning with the 1994 Power Policy and expanded through the 2002 Power Policy and CPEC power additions (2015–2020), Pakistan established a "Take-or-Pay" Single-Buyer single-market model managed by the Central Power Purchasing Agency (CPPA-G).

### Mandatory Contractual Distinctions:
Under standard Power Purchase Agreements (PPAs) approved by NEPRA:
1. **Capacity Purchase Price (CPP)**: Contractual payment owed to the power producer for making generation capacity available, covering debt service, capital return, fixed O&M, and insurance, regardless of whether CPPA-G dispatches electricity.
2. **Energy Purchase Price (EPP)**: Variable payment covering the actual fuel consumed and variable operations when the plant is dispatched onto the grid.
3. **Dollar Indexation & Sovereign Guarantees**: Return on Equity (ROE) and debt service components are legally pegged to the US Dollar and secured by sovereign Government of Pakistan guarantees.

### Key Documented Findings & Audits
* **Audit Committee Report on the Power Sector (2020)** headed by Muhammad Ali: Documented substantial overpayments, excess profits exceeding the NEPRA-approved ROE cap, fuel heat-rate savings retained by plants, and miscalculated setup costs in early determinations.
* **Circular Debt Accumulation**: Circular debt in the power sector rose from PKR 450 billion in 2013 to over PKR 2.6 trillion by 2024, driven by capacity payments, transmission bottlenecks, distribution line losses, and non-recovery of bills.`,
      ur: `### آئی پی پی ماڈل کا بنیادی ڈھانچہ
1994ء اور 2002ء کی پاور پالیسیوں کے تحت پاکستان نے "ٹیک اور پے" (Take-or-Pay) فارمولے پر مبنی بجلی کی خریداری کا نظام نافذ کیا جس کی نگراں سی پی پی اے (CPPA-G) اور نیپرا ہیں۔

### اہم قانونی و معاشی فرق:
معاہدوں کے تحت دو الگ ادائیگیاں کی جاتی ہیں:
1. **کیپسٹی پرچیز پرائس (CPP)**: پلانٹ کی دستیابی کی مد میں واجب الادا مقررہ رقم جو قرض کی واپسی، انویسٹمنٹ پر منافع اور فکسڈ اخراجات کا احاطہ کرتی ہے، خواہ حکومت بجلی خریدے یا نہ خریدے۔
2. **انرجی پرچیز پرائس (EPP)**: درحقیقت پیدا کی جانے والی بجلی پر خرچ ہونے والے ایندھن (فیول) کی قیمت۔
3. **ڈالر انڈیکسیشن اور حکومتی ضمانتیں**: سرمایہ کاروں کے منافع کو ڈالر کی قیمت سے منسلک کیا گیا ہے اور وفاقی حکومت کی خودمختار ضمانت حاصل ہے۔

### محمد علی کمیٹی رپورٹ (2020ء) کے انکشافات:
* پاور سیکٹر پر تحقیقاتی کمیٹی نے انکشاف کیا کہ متعدد نجی بجلی گھروں نے منظور شدہ حد سے زائد منافع کمایا، فیول ہیٹ ریٹ کے نقصانات اور ابتدائی لاگت میں تضادات موجود تھے۔
* پاور سیکٹر کا گردشی قرضہ 2013ء کے 450 ارب روپے سے بڑھ کر 2024ء میں 2600 ارب روپے (2.6 ٹریلین) سے تجاوز کر گیا۔`,
    },
    date: {
      dateString: '1994-03-01',
      precision: 'year',
      formattedDisplay: { en: '1994–2024', ur: '1994ء تا 2024ء' },
    },
    location: {
      city: { en: 'Islamabad', ur: 'اسلام آباد' },
      country: { en: 'Pakistan', ur: 'پاکستان' },
    },
    claims: [
      {
        claimId: 'clm-ipp-capacity-contract',
        findingType: 'documented_fact',
        assertion: {
          en: 'Capacity payments are a contractual requirement under approved PPAs to service capital debt and plant availability, distinct from variable fuel energy generation payments.',
          ur: 'کیپسٹی ادائیگیاں پلانٹ کے سرمائے اور دستیابی کی مد میں منظور شدہ پی پی اے کا باضابطہ معاہداتی حصہ ہیں، جن کا تعلق اصل بجلی کی کھپت والے فیول سے الگ ہے۔',
        },
        attributedParty: { en: 'NEPRA State of the Industry Report', ur: 'نیپرا اسٹیٹ آف دی انڈسٹری رپورٹ' },
        sourceIds: ['src-nepra-state-industry-2023'],
      },
      {
        claimId: 'clm-ipp-audit-2020',
        findingType: 'audit_finding',
        assertion: {
          en: 'The 2020 Power Sector Inquiry Committee documented instances of excess heat-rate profits and miscalculated setup costs across several private power producers.',
          ur: '2020ء کی پاور سیکٹر انکوائری کمیٹی نے نجی بجلی گھروں میں اضافی ہیٹ ریٹ منافع اور پلانٹ لاگت کے غلط تخمینوں کی نشان دہی کی۔',
        },
        attributedParty: { en: 'Committee for Power Sector Audit (Muhammad Ali Report)', ur: 'پاور سیکٹر آڈٹ کمیٹی رپورٹ (محمد علی کمیٹی)' },
        sourceIds: ['src-gov-power-audit-2020'],
      },
    ],
    sources: [
      {
        sourceId: 'src-nepra-state-industry-2023',
        sourceType: 'official_statistics',
        title: {
          en: 'NEPRA State of the Industry Report 2023',
          ur: 'نیپرا اسٹیٹ آف دی انڈسٹری رپورٹ 2023ء',
        },
        publisher: { en: 'National Electric Power Regulatory Authority', ur: 'نیشنل الیکٹرک پاور ریگولیٹری اتھارٹی' },
        publicationDate: {
          dateString: '2023-09-30',
          precision: 'day',
          formattedDisplay: { en: 'September 30, 2023', ur: '30 ستمبر 2023ء' },
        },
        language: 'en',
        verificationTier: 'primary_verified',
        verificationStatus: 'primary_source',
      },
      {
        sourceId: 'src-gov-power-audit-2020',
        sourceType: 'audit_report',
        title: {
          en: 'Report of the Committee for Power Sector Audit, Circular Debt Resolution and Future Roadmap',
          ur: 'پاور سیکٹر آڈٹ، گردشی قرضہ اور آئندہ لائحہ عمل پر انکوائری کمیٹی رپورٹ',
        },
        publisher: { en: 'Government of Pakistan / Prime Minister Inspection Commission', ur: 'حکومت پاکستان' },
        publicationDate: {
          dateString: '2020-03-01',
          precision: 'month',
          formattedDisplay: { en: 'March 2020', ur: 'مارچ 2020ء' },
        },
        language: 'en',
        verificationTier: 'primary_verified',
        verificationStatus: 'primary_source',
      },
    ],
    evidenceMedia: [],
    relationships: [],
    categories: ['Energy Policy', 'Economy', 'IPPs', 'Capacity Payments', 'Circular Debt', 'NEPRA'],
    tags: {
      en: ['IPPs', 'NEPRA', 'Capacity Payments', 'Circular Debt', 'Power Tariffs', 'Muhammad Ali Report'],
      ur: ['آئی پی پیز', 'نیپرا', 'کیپسٹی پیمنٹس', 'گردشی قرضہ', 'بجلی ٹیرف', 'محمد علی رپورٹ'],
    },
    domainMetadata: {
      economicIpp: {
        tariffModel: { en: 'Cost-Plus with Dollar Return Indexation', ur: 'کاسٹ پلس بمعہ ڈالر انڈیکسیشن' },
        nepraReference: 'NEPRA/TRF/PPA-Framework',
      },
    },
    verificationStatus: 'verified',
    editorialStatus: 'published',
    privacyClassification: 'public',
    privacyFlags: {},
    version: 1,
    createdAt: '2023-01-01T00:00:00Z',
    updatedAt: '2024-04-01T00:00:00Z',
  },

  // =========================================================================
  // 4. HUMAN RIGHTS & BLASPHEMY LAW ARCHIVE
  // =========================================================================
  {
    schemaVersion: '1.0.0',
    id: 'rec-pk-legal-asia-bibi-acquittal-2018',
    slug: 'asia-bibi-supreme-court-acquittal-pld-2019-sc-64',
    domain: 'human_rights',
    recordType: 'blasphemy_case_record',
    title: {
      en: 'Supreme Court Acquittal of Asia Bibi (PLD 2019 SC 64)',
      ur: 'سپریم کورٹ کا آسیہ بی بی کی بریت کا تاریخی فیصلہ (PLD 2019 SC 64)',
    },
    summary: {
      en: 'Historic Supreme Court judgment acquitting Christian woman Asia Bibi after nine years on death row, laying down strict evidentiary standards and warning against false witness testimony in Section 295-C PPC cases.',
      ur: 'سپریم کورٹ آف پاکستان کا تاریخی فیصلہ جس میں توہینِ مذہب کے الزام میں 9 سال تک سزائے موت کی منتظر مسیحی خاتون آسیہ بی بی کو ناکافی و متضاد شواہد کی بنیاد پر باعزت بری کیا گیا۔',
    },
    narrative: {
      en: `### Factual Background
In June 2009, Asia Bibi (Aasiya Noreen), a Christian agricultural laborer in Ittan Wali village, Nankana Sahib, was accused of blasphemy under Section 295-C of the Pakistan Penal Code following a dispute with co-workers over sharing water. An FIR was registered five days later, and in November 2010 she was sentenced to death by the trial court, a decision upheld by the Lahore High Court in 2014.

### The Supreme Court Landmark Judgment (Criminal Appeal 39-L of 2015)
On 31 October 2018, a three-member bench of the Supreme Court headed by Chief Justice Mian Saqib Nisar (with Justice Asif Saeed Khan Khosa and Justice Mazhar Alam Khan Miankhel) unanimously acquitted Asia Bibi.

### Critical Legal Principles Established:
1. **Evidentiary Threshold**: The Court reiterated that the prosecution must prove its case beyond a shadow of reasonable doubt; emotional sensitivities cannot displace criminal jurisprudence.
2. **Fabrication & Delays**: Found an unexplained 5-day delay in lodging the FIR, severe contradictions between prosecution eyewitnesses, and documented that the allegation arose out of a personal quarrel.
3. **Protection of Islamic Jurisprudence**: In a concurring note, Justice Asif Saeed Khosa cited Islamic jurisprudential principles emphasizing that false testimony is a grave sin and that Islam mandates strict justice for religious minorities.`,
      ur: `### واقعے کا پس منظر
جون 2009ء میں ننکانہ صاحب کے گاؤں اٹن والی میں فالسے کے باغ میں پانی پینے کے تنازع پر مسیحی خاتون آسیہ بی بی پر دفعہ 295-C کے تحت الزام لگایا گیا۔ پانچ روز بعد ایف آئی آر درج ہوئی اور نومبر 2010ء میں ٹرائل کورٹ نے سزائے موت سنائی جس کی 2014ء میں لاہور ہائی کورٹ نے توثیق کی۔

### سپریم کورٹ کا فیصلہ (31 اکتوبر 2018ء)
چیف جسٹس میاں ثاقب نثار، جسٹس آصف سعید خان کھوسہ اور جسٹس مظہر عالم میاں خیل پر مشتمل 3 رکنی بینچ نے متفقہ فیصلے کے ذریعے آسیہ بی بی کو بری کیا۔

### عدالتی اصول:
1. **ثبوت کا اعلیٰ معیار**: عدالت نے قرار دیا کہ قانونِ شہادت کے تقاضے پورے کیے بغیر کسی بھی الزام پر سزا نہیں دی جا سکتی۔
2. **تضادات اور تاخیر**: ایف آئی آر میں 5 دن کی بلاجواز تاخیر اور گواہان کے بیانات میں سنگین تضادات پائے گئے۔
3. **اسلامی اصولِ انصاف**: جسٹس آصف سعید کھوسہ نے اپنے اضافی نوٹ میں اسلامی تاریخ اور احادیث کے حوالوں سے واضح کیا کہ جھوٹی گواہی دینا سنگین جرم ہے اور اسلام اقلیتوں کے مکمل تحفظ کا حکم دیتا ہے۔`,
    },
    date: {
      dateString: '2018-10-31',
      precision: 'day',
      formattedDisplay: { en: 'October 31, 2018', ur: '31 اکتوبر 2018ء' },
    },
    location: {
      city: { en: 'Nankana Sahib', ur: 'ننکانہ صاحب' },
      provinceState: { en: 'Punjab', ur: 'پنجاب' },
      country: { en: 'Pakistan', ur: 'پاکستان' },
    },
    claims: [
      {
        claimId: 'clm-asia-bibi-acquittal',
        findingType: 'court_finding',
        assertion: {
          en: 'Supreme Court unanimously acquitted Asia Bibi, holding that the prosecution failed to prove charges due to material contradictions, delayed FIR, and fabricated eyewitness accounts.',
          ur: 'سپریم کورٹ نے متفقہ طور پر آسیہ بی بی کو بری کرتے ہوئے قرار دیا کہ استغاثہ گواہوں کے تضادات اور تاخیر کی وجہ سے جرم ثابت کرنے میں ناکام رہا۔',
        },
        attributedParty: { en: 'Supreme Court of Pakistan (PLD 2019 SC 64)', ur: 'سپریم کورٹ آف پاکستان' },
        sourceIds: ['src-sc-asia-bibi-judgment-2018'],
      },
    ],
    sources: [
      {
        sourceId: 'src-sc-asia-bibi-judgment-2018',
        sourceType: 'court_judgment',
        title: {
          en: 'Mst. Asia Bibi v. The State and another (PLD 2019 SC 64)',
          ur: 'مسماۃ آسیہ بی بی بنام ریاست و دیگر (PLD 2019 SC 64)',
        },
        publisher: { en: 'Pakistan Law Decisions (PLD) / Supreme Court of Pakistan', ur: 'پاکستان لاء ڈیسیژنز (PLD)' },
        publicationDate: {
          dateString: '2018-10-31',
          precision: 'day',
          formattedDisplay: { en: 'October 31, 2018', ur: '31 اکتوبر 2018ء' },
        },
        documentIdentifier: 'Criminal Appeal No. 39-L of 2015',
        language: 'en',
        verificationTier: 'primary_verified',
        verificationStatus: 'primary_source',
      },
    ],
    evidenceMedia: [],
    relationships: [],
    categories: ['Human Rights', 'Religious Minorities', 'Blasphemy Law', 'Supreme Court', 'Due Process'],
    tags: {
      en: ['Asia Bibi', 'Section 295-C', 'Religious Minorities', 'Justice Asif Saeed Khosa', 'PLD 2019 SC 64'],
      ur: ['آسیہ بی بی', 'دفعہ 295-C', 'اقلیتی حقوق', 'جسٹس آصف سعید کھوسہ', 'سپریم کورٹ فیصلہ'],
    },
    domainMetadata: {
      legal: {
        caseNumber: 'Criminal Appeal No. 39-L of 2015',
        courtName: { en: 'Supreme Court of Pakistan', ur: 'سپریم کورٹ آف پاکستان' },
        bench: [
          { en: 'Chief Justice Mian Saqib Nisar', ur: 'چیف جسٹس میاں ثاقب نثار' },
          { en: 'Justice Asif Saeed Khan Khosa', ur: 'جسٹس آصف سعید خان کھوسہ' },
          { en: 'Justice Mazhar Alam Khan Miankhel', ur: 'جسٹس مظہر عالم میاں خیل' },
        ],
        statutesCited: ['Section 295-C Pakistan Penal Code', 'Qanun-e-Shahadat Order 1984'],
        disposition: { en: 'Appeal Allowed, Conviction Set Aside, Acquitted', ur: 'اپیل منظور، سزائے موت کالعدم، باعزت بریت' },
      },
    },
    verificationStatus: 'verified',
    editorialStatus: 'published',
    privacyClassification: 'public',
    privacyFlags: {},
    version: 1,
    createdAt: '2018-11-01T00:00:00Z',
    updatedAt: '2023-01-01T00:00:00Z',
  },

  // =========================================================================
  // 5. HISTORICAL & STATE FORMATION ARCHIVE
  // =========================================================================
  {
    schemaVersion: '1.0.0',
    id: 'rec-pk-hist-hamoodur-rahman-commission-1971',
    slug: 'hamoodur-rahman-commission-report-1971-declassified',
    domain: 'historical',
    recordType: 'commission_report',
    title: {
      en: 'Hamoodur Rahman Commission Inquiry Report on the 1971 War & East Pakistan',
      ur: 'حمود الرحمٰن کمیشن انکوائری رپورٹ — 1971ء کی جنگ اور مشرقی پاکستان کی علیحدگی',
    },
    summary: {
      en: 'The judicial inquiry report authored by Chief Justice Hamoodur Rahman investigating the military surrender, political breakdown, and events leading to the separation of East Pakistan.',
      ur: 'چیف جسٹس حمود الرحمٰن کی سربراہی میں قائم عدالتی کمیشن کی رپورٹ جس نے 1971ء کے فوجی ہتھیار ڈالنے، سیاسی بحران اور سقوطِ مشرقی پاکستان کے اسباب کا احاطہ کیا۔',
    },
    narrative: {
      en: `### Mandate & Formation
Constituted in December 1971 by the Government of Pakistan under Chief Justice Hamoodur Rahman (along with Justice Anwarul Haq and Justice Tufail Ali Abdul Rehman), the Commission was tasked with inquiring into the circumstances leading to the military surrender of the Eastern Command on 16 December 1971.

### Key Documented Findings:
1. **Political Breakdown**: Concluded that the failure to respect the democratic electoral mandate of the December 1970 general elections created an insurmountable political crisis.
2. **Military Strategy & Command Failures**: Criticized the military leadership for operational overextension and lack of strategic coordination between the Western and Eastern theaters.
3. **Surrender Terms**: Detailed the circumstances surrounding the signing of the Instrument of Surrender at Dhaka Racecourse by Lt. Gen. A. A. K. Niazi.
4. **Declassification**: The supplementary report was formally declassified and released by the Government of Pakistan in December 2000.`,
      ur: `### کمیشن کا قیام اور دائرہ کار
دسمبر 1971ء میں چیف جسٹس حمود الرحمٰن کی سربراہی میں جسٹس انوار الحق اور جسٹس طفیل علی پر مشتمل انکوائری کمیشن قائم کیا گیا تاکہ مشرقی کمانڈ کے ہتھیار ڈالنے کے اسباب کی تحقیقات کی جا سکیں۔

### رپورٹ کے اہم نتائج:
1. **جمہوری مینڈیٹ کی ناکامی**: کمیشن نے قرار دیا کہ 1970ء کے عام انتخابات کے جمہوری نتائج کو تسلیم نہ کرنا سنگین ترین سیاسی بحران کا باعث بنا۔
2. **عسکری حکمتِ عملی کی خامیاں**: مشرقی کمانڈ کی عسکری قیادت کے فیصلوں اور دفاعی منصوبہ بندی کی خامیوں پر تفصیلی تنقید۔
3. **ہتھیار ڈالنے کی دستاویز**: ڈھاکہ میں 16 دسمبر 1971ء کو دستخط ہونے والی دستاویزِ ہتھیار کے حالات کا مکمل ریکارڈ۔
4. **رپورٹ کا اجرا**: حکومتِ پاکستان نے دسمبر 2000ء میں رپورٹ کو باضابطہ طور پر ڈی کلاسیفائی کر کے عام کیا۔`,
    },
    date: {
      dateString: '1974-10-23',
      precision: 'year',
      formattedDisplay: { en: '1974 (Declassified 2000)', ur: '1974ء (ڈی کلاسیفائی 2000ء)' },
    },
    location: {
      city: { en: 'Dhaka / Islamabad', ur: 'ڈھاکہ / اسلام آباد' },
      country: { en: 'Pakistan', ur: 'پاکستان' },
    },
    claims: [
      {
        claimId: 'clm-hrc-declassified',
        findingType: 'commission_finding',
        assertion: {
          en: 'The Commission documented severe political mismanagement and command lapses leading to the military surrender in East Pakistan.',
          ur: 'کمیشن نے مشرقی پاکستان میں عسکری ناکامی کے پیچھے سیاسی بدانتظامی اور کمانڈ کی خامیوں کا دستاویزی ثبوت فراہم کیا۔',
        },
        attributedParty: { en: 'Hamoodur Rahman Judicial Commission Report', ur: 'حمود الرحمٰن جوڈیشل کمیشن رپورٹ' },
        sourceIds: ['src-hrc-report-doc-2000'],
      },
    ],
    sources: [
      {
        sourceId: 'src-hrc-report-doc-2000',
        sourceType: 'commission_report',
        title: {
          en: 'Hamoodur Rahman Commission Supplementary Report (Cabinet Division)',
          ur: 'حمود الرحمٰن کمیشن ضمنی رپورٹ (کابینہ ڈویژن ڈی کلاسیفائیڈ)',
        },
        publisher: { en: 'Government of Pakistan', ur: 'حکومت پاکستان' },
        publicationDate: {
          dateString: '2000-12-01',
          precision: 'month',
          formattedDisplay: { en: 'December 2000', ur: 'دسمبر 2000ء' },
        },
        language: 'en',
        verificationTier: 'primary_verified',
        verificationStatus: 'primary_source',
      },
    ],
    evidenceMedia: [],
    relationships: [],
    categories: ['History', '1971 War', 'Inquiry Commissions', 'Constitutional History', 'Declassified'],
    tags: {
      en: ['1971', 'Hamoodur Rahman', 'East Pakistan', 'Declassified Report', 'History of Pakistan'],
      ur: ['1971ء', 'حمود الرحمٰن کمیشن', 'سقوط مشرقی پاکستان', 'تاریخِ پاکستان', 'انکوائری رپورٹ'],
    },
    verificationStatus: 'verified',
    editorialStatus: 'published',
    privacyClassification: 'public',
    privacyFlags: {},
    version: 1,
    createdAt: '2000-12-01T00:00:00Z',
    updatedAt: '2022-01-01T00:00:00Z',
  },

  // =========================================================================
  // 6. PUBLIC ASSETS & STATE-OWNED ENTERPRISES ARCHIVE
  // =========================================================================
  {
    schemaVersion: '1.0.0',
    id: 'rec-pk-asset-pakistan-steel-mills-privatization-2006',
    slug: 'pakistan-steel-mills-privatization-supreme-court-pld-2006-sc-697',
    domain: 'economic_public_policy',
    recordType: 'privatization_record',
    title: {
      en: 'Pakistan Steel Mills Privatization Reference & Judgment (PLD 2006 SC 697)',
      ur: 'پاکستان سٹیل ملز نجکاری ریفرنس و سپریم کورٹ فیصلہ (PLD 2006 SC 697)',
    },
    summary: {
      en: 'Supreme Court 9-judge unanimous judgment annulling the $362 million privatization transaction of Pakistan Steel Mills due to procedural violations and undervaluation.',
      ur: 'سپریم کورٹ کے 9 رکنی بینچ کا متفقہ فیصلہ جس میں پاکستان سٹیل ملز کی 362 ملین ڈالر میں نجکاری کے معاہدے کو طریقہ کار کی بے ضابطگیوں اور کم قیمت پر فروخت کی بنیاد پر منسوخ کیا گیا۔',
    },
    narrative: {
      en: `### The 2006 Privatization Transaction
In March 2006, the Privatization Commission accepted a bid of PKR 21.68 billion ($362 million) from a tripartite consortium (Magnitogorsk Iron & Steel Works, Tuwairqi Steel, and Arif Habib Securities) for a 75% equity stake in Pakistan Steel Mills Corporation (PSMC).

### The Supreme Court Judgment (PLD 2006 SC 697)
A 9-member bench headed by Chief Justice Iftikhar Muhammad Chaudhry unanimously struck down the sale:
1. **Procedural Violations**: Found the Council of Common Interests (CCI) had not approved the transaction as constitutionally mandated under Article 153/154.
2. **Asset Valuation**: Noted that over 4,400 acres of prime industrial land and inventory had not been properly appraised, resulting in substantial undervaluation.
3. **Transparency**: Declared the process rushed and lacking competitive integrity.`,
      ur: `### 2006ء کا نجکاری معاہدہ
مارچ 2006ء میں نجکاری کمیشن نے پاکستان سٹیل ملز کے 75 فیصد حصص ایک کنسورشیم کو 21.68 ارب روپے میں فروخت کرنے کی منظوری دی۔

### سپریم کورٹ کا فیصلہ
چیف جسٹس افتخار محمد چوہدری کی سربراہی میں 9 رکنی بینچ نے متفقہ طور پر یہ نجکاری کالعدم قرار دی:
1. **آئینی بے ضابطگی**: عدالت نے قرار دیا کہ مشترکہ مفادات کونسل (سی سی آئی) سے باضابطہ منظوری نہیں لی گئی تھی۔
2. **اثاثہ جات کا کم تخمینہ**: سٹیل ملز کی 4400 ایکڑ سے زائد قیمتی اراضی اور خام مال کی مالیت کا درست تخمینہ نہیں لگایا گیا تھا۔
3. **شفافیت کی کمی**: نجکاری کے عمل کو غیر شفاف اور جلد بازی پر مبنی قرار دیا گیا۔`,
    },
    date: {
      dateString: '2006-06-23',
      precision: 'day',
      formattedDisplay: { en: 'June 23, 2006', ur: '23 جون 2006ء' },
    },
    location: {
      city: { en: 'Karachi', ur: 'کراچی' },
      country: { en: 'Pakistan', ur: 'پاکستان' },
    },
    claims: [
      {
        claimId: 'clm-psm-void',
        findingType: 'court_finding',
        assertion: {
          en: 'Supreme Court 9-member bench declared the privatization of Pakistan Steel Mills void ab initio due to constitutional and valuation violations.',
          ur: 'سپریم کورٹ کے 9 رکنی بینچ نے آئینی اور مالیاتی بے ضابطگیوں کی بنیاد پر سٹیل ملز کی نجکاری کو کالعدم قرار دیا۔',
        },
        attributedParty: { en: 'Supreme Court of Pakistan (PLD 2006 SC 697)', ur: 'سپریم کورٹ آف پاکستان' },
        sourceIds: ['src-sc-psm-judgment-2006'],
      },
    ],
    sources: [
      {
        sourceId: 'src-sc-psm-judgment-2006',
        sourceType: 'court_judgment',
        title: {
          en: 'Wattan Party and others v. Federation of Pakistan (PLD 2006 SC 697)',
          ur: 'وطن پارٹی و دیگر بنام وفاقِ پاکستان (PLD 2006 SC 697)',
        },
        publisher: { en: 'Pakistan Law Decisions', ur: 'پاکستان لاء ڈیسیژنز' },
        publicationDate: {
          dateString: '2006-06-23',
          precision: 'day',
          formattedDisplay: { en: 'June 23, 2006', ur: '23 جون 2006ء' },
        },
        documentIdentifier: 'Const. Pet. No. 9 of 2006',
        language: 'en',
        verificationTier: 'primary_verified',
        verificationStatus: 'primary_source',
      },
    ],
    evidenceMedia: [],
    relationships: [],
    categories: ['State-Owned Enterprises', 'Privatization', 'Supreme Court', 'Steel Mills', 'Public Finance'],
    tags: {
      en: ['Pakistan Steel Mills', 'Privatization', 'CCI', 'PLD 2006 SC 697', 'Public Assets'],
      ur: ['پاکستان سٹیل ملز', 'نجکاری', 'مشترکہ مفادات کونسل', 'سپریم کورٹ', 'سرکاری اثاثے'],
    },
    verificationStatus: 'verified',
    editorialStatus: 'published',
    privacyClassification: 'public',
    privacyFlags: {},
    version: 1,
    createdAt: '2006-06-24T00:00:00Z',
    updatedAt: '2023-01-01T00:00:00Z',
  },

  // =========================================================================
  // 7. KEY INSTITUTIONAL PROFILES
  // =========================================================================
  {
    schemaVersion: '1.0.0',
    id: 'rec-pk-inst-supreme-court',
    slug: 'supreme-court-of-pakistan-institution-profile',
    domain: 'people_institutions',
    recordType: 'institution_profile',
    title: {
      en: 'Supreme Court of Pakistan — Institutional Profile & Powers',
      ur: 'سپریم کورٹ آف پاکستان — ادارہ جاتی تعارف اور آئینی اختیارات',
    },
    summary: {
      en: 'Apex judicial authority of the Islamic Republic of Pakistan established under Part VII, Chapter 2 of the 1973 Constitution.',
      ur: '1973ء کے آئین کے تحت قائم کردہ اسلامی جمہوریہ پاکستان کا اعلیٰ ترین عدالتی ادارہ۔',
    },
    narrative: {
      en: `### Constitutional Mandate
The Supreme Court of Pakistan sits at the apex of the judicial hierarchy with original, appellate, and advisory jurisdictions under Articles 184, 185, and 186 of the Constitution of Pakistan.

### Key Jurisdictions:
1. **Original Jurisdiction (Article 184(3))**: Enforcement of fundamental rights on matters of public importance.
2. **Appellate Jurisdiction (Article 185)**: Final appellate court hearing appeals from all five High Courts.
3. **Advisory Jurisdiction (Article 186)**: Presidential references on questions of law.`,
      ur: `### آئینی دائرہ کار
سپریم کورٹ آف پاکستان آئین کے آرٹیکل 184، 185 اور 186 کے تحت ابتدائی، اپیلٹ اور مشاورتی اختیارات کی حامل ہے۔

### اہم آئینی اختیارات:
1. **ابتدائی دائرہ اختیار (آرٹیکل 184(3))**: عوامی اہمیت کے معاملات میں بنیادی حقوق کا نفاذ۔
2. **اپیلٹ دائرہ اختیار (آرٹیکل 185)**: پانچوں ہائی کورٹس کے فیصلوں کے خلاف حتمی اپیل کا فورم۔
3. **مشاورتی اختیار (آرٹیکل 186)**: صدرِ پاکستان کی جانب سے قانونی سوالات پر رائے کا اظہار۔`,
    },
    date: {
      dateString: '1956-03-23',
      precision: 'year',
      formattedDisplay: { en: 'Established 1956', ur: 'قیام 1956ء' },
    },
    location: {
      city: { en: 'Islamabad', ur: 'اسلام آباد' },
      country: { en: 'Pakistan', ur: 'پاکستان' },
    },
    claims: [],
    sources: [],
    evidenceMedia: [],
    relationships: [],
    categories: ['Institutions', 'Judiciary', 'Constitutional Bodies'],
    tags: {
      en: ['Supreme Court', 'Judiciary', 'Article 184(3)', 'Constitution of Pakistan'],
      ur: ['سپریم کورٹ', 'عدلیہ', 'آرٹیکل 184(3)', 'آئینِ پاکستان'],
    },
    verificationStatus: 'verified',
    editorialStatus: 'published',
    privacyClassification: 'public',
    privacyFlags: {},
    version: 1,
    createdAt: '2023-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
];
