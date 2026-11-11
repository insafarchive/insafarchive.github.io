import type { ArchiveRecord } from '../../../types/archive';

export const humanRightsRecords: ArchiveRecord[] = [
  // Muridke GT Road Clashes & Casualties (October 2021) - Draft / Research Backlog Record
  {
    schemaVersion: '1.0.0',
    id: 'rec-pk-event-muridke-clashes-2021',
    slug: 'muridke-gt-road-clashes-casualties-october-2021',
    domain: 'human_rights',
    recordType: 'human_rights_incident',
    title: {
      en: 'Muridke GT Road Clashes, Casualties & Law Enforcement Conflict (October 2021)',
      ur: 'مریدکے جی ٹی روڈ جھڑپیں، ہلاکتیں اور امن و امان تنازع (اکتوبر 2021ء)'
    },
    summary: {
      en: 'Violent confrontations along the Grand Trunk Road between law enforcement personnel and Tehreek-e-Labbaik Pakistan (TLP) marchers, resulting in documented police fatalities and contested civilian casualty figures.',
      ur: 'اکتوبر 2021ء میں جی ٹی روڈ پر مریدکے اور سادھوکے کے قریب قانون نافذ کرنے والے اداروں اور ٹی ایل پی مارچ کے درمیان پرتشدد جھڑپیں، پولیس اہلکاروں کی شہادتیں اور شہریوں کے جانی نقصانات۔'
    },
    narrative: {
      en: `### Background & Event Summary
In October 2021, Tehreek-e-Labbaik Pakistan organized a march towards Islamabad demanding the expulsion of the French ambassador and the release of detained leadership. As the rally moved along the Grand Trunk Road in Punjab, intense confrontations occurred near Muridke and Sadhoke.

### Documented Casualties
Official government statements and Punjab Police records confirmed the deaths of at least four police personnel and dozens injured due to firearm discharges and violent clashes. TLP representatives alleged multiple civilian fatalities among marchers.

### Research Backlog & Limitations
A comprehensive independent inquiry report or complete ballistics findings from the Punjab forensic laboratory have not been made publicly accessible. The precise sequence of firearms use and cross-claims regarding lethal force remain under active archival research, warranting draft status until verifiable primary judicial or medical findings are catalogued.`,
      ur: `### پس منظر اور واقعات
اکتوبر 2021ء میں ٹی ایل پی نے اسلام آباد کی جانب مارچ شروع کیا۔ پنجاب میں مریدکے اور سادھوکے کے قریب سیکیورٹی فورسز کے ساتھ شدید جھڑپیں ہوئیں۔

### مصدقہ جانی نقصانات
پنجاب پولیس کے ریکارڈ کے مطابق کم از کم 4 پولیس اہلکار شہید اور درجنوں زخمی ہوئے۔ دوسری جانب مظاہرین نے بھی ہلاکتوں کا دعویٰ کیا۔

### تحقیقاتی کمی اور نامکمل سوالات
اس واقعے پر کوئی جامع خودمختار عدالتی انکوائری رپورٹ یا مکمل فرانزک رپورٹ تاحال پبلک نہیں ہو سکی۔ اس لیے یہ ریکارڈ تصدیق شدہ حتمی نتائج کے انتظار میں ریسرچ بیک لاگ کا حصہ ہے۔`
    },
    date: {
      dateString: '2021-10-22',
      precision: 'day',
      formattedDisplay: { en: 'October 22–27, 2021', ur: '22 تا 27 اکتوبر 2021ء' }
    },
    location: {
      city: { en: 'Muridke / Sadhoke', ur: 'مریدکے / سادھوکے' },
      country: { en: 'Pakistan', ur: 'پاکستان' },
      district: { en: 'Sheikhupura', ur: 'شیخوپورہ' }
    },
    claims: [
      {
        claimId: 'clm-muridke-police-casualties',
        findingType: 'official_position',
        assertion: {
          en: 'Punjab Police and Interior Ministry reported that multiple police officers were killed and sustained bullet injuries during clashes on GT Road near Muridke.',
          ur: 'پنجاب پولیس اور وزارتِ داخلہ نے رپورٹ کیا کہ مریدکے کے قریب جی ٹی روڈ پر جھڑپوں کے دوران پولیس اہلکار شہید اور گولیوں سے زخمی ہوئے۔'
        },
        attributedParty: { en: 'Punjab Police Official Briefing', ur: 'پنجاب پولیس پریس بریفنگ' },
        sourceIds: ['src-punjab-police-statement-oct2021']
      },
      {
        claimId: 'clm-muridke-civilian-claim',
        findingType: 'unresolved_question',
        assertion: {
          en: 'Independent medical autopsy records establishing the precise number and cause of death of civilian protesters remain unverified in the public record.',
          ur: 'مظاہرین کی اموات کی درست تعداد اور وجوہات پر آزادانہ پوسٹ مارٹم رپورٹس عوامی ریکارڈ میں تاحال دستیاب نہیں۔'
        },
        attributedParty: { en: 'Human Rights Commission of Pakistan Monitoring', ur: 'ہیومن رائٹس کمیشن آف پاکستان' },
        sourceIds: ['src-hrcp-statement-oct2021']
      }
    ],
    sources: [
      {
        sourceId: 'src-punjab-police-statement-oct2021',
        sourceType: 'police_record',
        title: {
          en: 'Punjab Police Official Statement on Law and Order Situation on GT Road (October 2021)',
          ur: 'جی ٹی روڈ پر امن و امان کی صورتحال پر پنجاب پولیس کا بیان (اکتوبر 2021ء)'
        },
        publisher: { en: 'Punjab Police Public Relations', ur: 'پنجاب پولیس پبلک ریلیشنز' },
        publicationDate: { dateString: '2021-10-27', precision: 'day', formattedDisplay: { en: 'October 27, 2021', ur: '27 اکتوبر 2021ء' } },
        documentIdentifier: 'PP-PR-2021-10-27',
        language: 'both',
        verificationTier: 'secondary_corroborated',
        verificationStatus: 'source_reviewed'
      },
      {
        sourceId: 'src-hrcp-statement-oct2021',
        sourceType: 'human_rights_org',
        title: {
          en: 'Human Rights Commission of Pakistan Statement on Muridke Clashes and Use of Force',
          ur: 'مریدکے جھڑپوں اور طاقت کے استعمال پر ایچ آر سی پی کا بیان'
        },
        publisher: { en: 'Human Rights Commission of Pakistan', ur: 'ہیومن رائٹس کمیشن آف پاکستان' },
        publicationDate: { dateString: '2021-10-28', precision: 'day', formattedDisplay: { en: 'October 28, 2021', ur: '28 اکتوبر 2021ء' } },
        language: 'en',
        verificationTier: 'secondary_corroborated',
        verificationStatus: 'source_reviewed'
      }
    ],
    evidenceMedia: [],
    relationships: [],
    categories: ['Civil Liberties', 'Public Safety', 'Use of Force'],
    tags: {
      en: ['Muridke', 'TLP March', 'Police Casualties', 'GT Road', 'HRCP'],
      ur: ['مریدکے', 'ٹی ایل پی مارچ', 'پولیس شہادتیں', 'جی ٹی روڈ', 'انسانی حقوق']
    },
    verificationStatus: 'under_investigation',
    editorialStatus: 'draft',
    privacyClassification: 'public_sensitive',
    privacyFlags: {
      isSensitivePersonalData: true
    },
    version: 1,
    createdAt: '2021-11-01T00:00:00Z',
    updatedAt: '2024-05-01T00:00:00Z'
  }
];
