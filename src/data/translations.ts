import { Language, ProceduralStatus, ArchiveCategory, Province, CourtLevel, RecordType, EditorialReviewStatus, EvidentiaryNature } from '../types';

export const translations = {
  // Brand & Meta
  brandName: {
    en: 'Insaf Archive',
    ur: 'انصاف آرکائیو',
  },
  brandTagline: {
    en: 'Public Digital Legal Archive of Pakistan',
    ur: 'پاکستان کا عوامی ڈیجیٹل قانونی آرکائیو',
  },
  brandShortDesc: {
    en: 'A non-partisan digital repository documenting court judgments, legal case records, human-rights reports, and verifiable video evidence in Pakistan.',
    ur: 'پاکستان میں عدالتی فیصلوں، قانونی مقدمات کے ریکارڈز، انسانی حقوق کی رپورٹس اور تصدیق شدہ ویڈیو شواہد کو مرتب کرنے والا غیر جانبدارانہ ڈیجیٹل ذخیرہ۔',
  },

  // Navigation Links
  nav: {
    home: { en: 'Home', ur: 'صفحۂ اول' },
    cases: { en: 'Cases Archive', ur: 'مقدمات کا آرکائیو' },
    judgments: { en: 'Judgments & Orders', ur: 'عدالتی فیصلے و احکامات' },
    reports: { en: 'Human Rights Reports', ur: 'انسانی حقوق کی رپورٹس' },
    videos: { en: 'Video Archive', ur: 'ویڈیو آرکائیو' },
    dashboard: { en: 'Archive Statistics', ur: 'اعداد و شمار' },
    dataValidator: { en: 'Data Import & Validator', ur: 'ڈیٹا امپورٹ و تصدیق' },
    mediaArchive: { en: 'Evidence & Media', ur: 'شواہد و میڈیا آرکائیو' },
    documentsArchive: { en: 'Court Documents', ur: 'عدالتی دستاویزات' },
    methodology: { en: 'Editorial Methodology', ur: 'طریقۂ کار و ادارتی پالیسی' },
    corrections: { en: 'Corrections & Contact', ur: 'تصحیح و رابطہ' },
    contribute: { en: 'Contributor Workflow', ur: 'معاونین و وکلاء کا پورٹل' },
    submitUpdate: { en: 'Submit a Case Update', ur: 'مقدمہ یا تصحیح جمع کریں' },
    about: { en: 'About Archive', ur: 'آرکائیو کا تعارف' },
  },

  // Common UI Actions
  actions: {
    search: { en: 'Search Archive', ur: 'آرکائیو میں تلاش کریں' },
    searchPlaceholder: {
      en: 'Search by case title, ID, court, location, party, provision, or tag...',
      ur: 'عنوان، مقدمہ نمبر، عدالت، مقام، فریق، قانونی دفعہ یا ٹیگ سے تلاش کریں...',
    },
    quickSearch: { en: 'Quick Search', ur: 'فوری تلاش' },
    viewCase: { en: 'View Case Record', ur: 'مقدمے کا ریکارڈ دیکھیں' },
    readDocument: { en: 'Read Document', ur: 'دستاویز پڑھیں' },
    viewFullText: { en: 'View Full Text Extract', ur: 'مکمل عدالتی متن دیکھیں' },
    watchVideo: { en: 'Watch Verified Video', ur: 'تصدیق شدہ ویڈیو دیکھیں' },
    downloadCertifiedCopy: { en: 'Download Certified Extract', ur: 'مصدقہ عدالتی اقتباس حاصل کریں' },
    submitCorrection: { en: 'Request a Correction', ur: 'تصحیح کی درخواست دیں' },
    filter: { en: 'Filter Archive', ur: 'آرکائیو فلٹر کریں' },
    resetFilters: { en: 'Reset All Filters', ur: 'تمام فلٹرز ختم کریں' },
    close: { en: 'Close', ur: 'بند کریں' },
    backToArchive: { en: 'Back to Cases Archive', ur: 'مقدمات کی فہرست پر واپس' },
    share: { en: 'Share Case Record', ur: 'ریکارڈ کا لنک کاپی کریں' },
    copyCitation: { en: 'Copy Citation', ur: 'حوالہ نقل کریں' },
    citationCopied: { en: 'Citation copied to clipboard', ur: 'قانونی حوالہ کاپی ہو گیا ہے' },
    shareUrlCopied: { en: 'Case URL copied to clipboard', ur: 'مقدمے کا لنک کاپی ہو گیا ہے' },
    printDossier: { en: 'Print Legal Dossier', ur: 'مقدمے کا مسودہ پرنٹ کریں' },
    learnMore: { en: 'Learn More', ur: 'مزید جانیے' },
    openInNewTab: { en: 'Open in new tab', ur: 'نئی ونڈو میں کھولیں' },
    nextPage: { en: 'Next', ur: 'اگلا' },
    prevPage: { en: 'Previous', ur: 'پچھلا' },
    pageOf: { en: 'Page', ur: 'صفحہ' },
    ofPages: { en: 'of', ur: 'از' },
  },

  // Procedural Statuses (10 Legally Distinct States)
  statuses: {
    reported: {
      en: 'Reported / Initial FIR',
      ur: 'ابتدائی اطلاع / ایف آئی آر',
      desc: {
        en: 'Formal police complaint or incident reported. No judicial finding has occurred.',
        ur: 'پولیس میں باضابطہ شکایت یا اندراج۔ تاحال کوئی عدالتی کارروائی شروع نہیں ہوئی۔',
      },
    },
    under_investigation: {
      en: 'Under Investigation',
      ur: 'زیرِ تفتیش',
      desc: {
        en: 'Statutory investigation by police or specialized agency in progress prior to judicial challan.',
        ur: 'چالان عدالت میں پیش کیے جانے سے قبل تفتیشی اداروں کا قانونی عمل جاری ہے۔',
      },
    },
    pending_trial: {
      en: 'Pending Trial / Sub Judice',
      ur: 'زیرِ سماعت مقدمہ / ٹرائل',
      desc: {
        en: 'Charges framed; active legal proceedings sub judice before the competent court.',
        ur: 'فردِ جرم عائد ہو چکی ہے؛ متعلقہ عدالت کے روبرو فعال اور باقاعدہ سماعت جاری ہے۔',
      },
    },
    bail_granted: {
      en: 'Bail Granted (Pending Trial)',
      ur: 'ضمانت منظور (ٹرائل جاری)',
      desc: {
        en: 'Conditional interim or post-arrest release pending trial. This is NOT an acquittal or clearance of guilt.',
        ur: 'مقدمے کے فیصلے تک مشروط رہائی یا ضمانت۔ یہ ہرگز بریت یا بے گناہی کا حتمی ثبوت نہیں۔',
      },
    },
    acquitted: {
      en: 'Acquitted by Court',
      ur: 'باعزت بریت کا فیصلہ',
      desc: {
        en: 'Final judicial exoneration and dismissal of charges following trial or adjudication under Sec. 249-A/265-K CrPC.',
        ur: 'عدالتی سماعت کے بعد الزامات سے باضابطہ بریت اور مقدمہ کا قانونی خاتمہ۔',
      },
    },
    convicted: {
      en: 'Convicted (Subject to Appeal)',
      ur: 'سزا یافتہ (حقِ اپیل کے تابع)',
      desc: {
        en: 'Formal judicial finding of guilt by trial court, subject to constitutional and statutory rights of appeal.',
        ur: 'عدالت کی جانب سے باضابطہ جرم ثابت ہونے کا فیصلہ، جو قانونی اپیل کے تابع ہے۔',
      },
    },
    dismissed: {
      en: 'Dismissed / Discharged',
      ur: 'خارج شدہ / عدم شواہد اخراج',
      desc: {
        en: 'Case or petition dismissed on procedural grounds, lack of jurisdiction, or absence of prima facie material.',
        ur: 'عدم ثبوت، دائرہ اختیار کی کمی یا ضابطے کے تحت مقدمہ خارج کر دیا گیا۔',
      },
    },
    appealed: {
      en: 'Under Statutory Appeal',
      ur: 'اپیل زیرِ سماعت',
      desc: {
        en: 'Prior ruling or conviction challenged before the appellate High Court or Supreme Court.',
        ur: 'ماتحت عدالت کا فیصلہ اعلیٰ عدالتی فورم پر اپیل کے مرحلے میں زیرِ سماعت ہے۔',
      },
    },
    disposed_of: {
      en: 'Disposed of with Directives',
      ur: 'ہدایات کے ساتھ نمٹا دیا گیا',
      desc: {
        en: 'Proceedings concluded by the court with binding operational directions to administrative authorities.',
        ur: 'عدالت نے متعلقہ حکام کو پابند احکامات جاری کر کے کارروائی نمٹا دی۔',
      },
    },
    unknown: {
      en: 'Status Unverified / Pending Update',
      ur: 'غیر مصدقہ / کیفیت زیرِ تحقیق',
      desc: {
        en: 'Procedural disposition is currently under archival verification or subsequent order is awaited.',
        ur: 'آخری عدالتی کیفیت دستاویزی طور پر ابھی زیرِ تصدیق ہے۔',
      },
    },
  },

  // 12 Archive Categories
  categories: {
    court_judgments: {
      en: 'Court Judgments & Orders',
      ur: 'عدالتی فیصلے و احکامات',
      desc: {
        en: 'Substantive orders, landmark rulings, and constitutional holdings.',
        ur: 'اہم عدالتی فیصلے، نظائر اور باضابطہ احکامات۔',
      },
    },
    criminal_proceedings: {
      en: 'Criminal Proceedings',
      ur: 'فوجداری کارروائی',
      desc: {
        en: 'Criminal trials, FIR proceedings, and penal law adjudications.',
        ur: 'فوجداری مقدمات، ایف آئی آر کا اندراج اور تعزیراتی کارروائی۔',
      },
    },
    civil_litigation: {
      en: 'Civil Litigation',
      ur: 'دیوانی مقدمات',
      desc: {
        en: 'Property, administrative review, contractual, and statutory disputes.',
        ur: 'جائیداد، معاہدات اور قانونی حقوق سے متعلق دیوانی تنازعات۔',
      },
    },
    bail_acquittal: {
      en: 'Bail & Acquittal Records',
      ur: 'ضمانت و بریت ریکارڈز',
      desc: {
        en: 'Pre-arrest/post-arrest bail determinations and acquittal judgments.',
        ur: 'قبل از گرفتاری و بعد از گرفتاری ضمانت اور بریت کے احکامات۔',
      },
    },
    arrest_detention: {
      en: 'Arrest & Detention Reports',
      ur: 'گرفتاری و حراست رپورٹس',
      desc: {
        en: 'Preventive detention, Section 144 arrests, and remand documentation.',
        ur: 'حفاظتی حراست، دفعہ 144 کے نفاذ اور ریمانڈ کے دستاویزات۔',
      },
    },
    alleged_police_misconduct: {
      en: 'Alleged Police Misconduct & Custodial Inquiries',
      ur: 'پولیس زیادتی و حراستی شکایات',
      desc: {
        en: 'Documented complaints and judicial inquiries into custodial abuse.',
        ur: 'پولیس رویوں، تشدد کی شکایات اور عدالتی انکوائری رپورٹس۔',
      },
    },
    human_rights: {
      en: 'Human Rights Related Cases',
      ur: 'انسانی حقوق سے متعلق مقدمات',
      desc: {
        en: 'Fundamental freedoms, civil liberties, and equality protections.',
        ur: 'آئینی حقوق، شخصی آزادی اور شہری حقوق کے مقدمات۔',
      },
    },
    missing_persons: {
      en: 'Missing Persons & Habeas Corpus',
      ur: 'لاپتہ افراد و حبسِ بے جا',
      desc: {
        en: 'Writ petitions under Article 199 and statutory inquiries on disappearances.',
        ur: 'آرٹیکل 199 کے تحت حبسِ بے جا کی درخواستیں اور تفتیشی ریکارڈ۔',
      },
    },
    labour_poverty: {
      en: 'Labour & Poverty-Related Disputes',
      ur: 'مزدور و معاشی حقوق کے تنازعات',
      desc: {
        en: 'Worker compensation, unlawful evictions, and poverty-related legal claims.',
        ur: 'مزدور حقوق، بلاجواز بے دخلی اور معاشی قانونی چارہ جوئی۔',
      },
    },
    women_children: {
      en: "Women's & Children's Legal Rights",
      ur: 'خواتین و بچوں کے قانونی حقوق',
      desc: {
        en: 'Inheritance, juvenile justice, and gender protection with heightened privacy safeguards.',
        ur: 'وراثت، کم عمری کا انصاف اور خواتین کے حقوق برائے سخت رازداری۔',
      },
    },
    public_interest_political: {
      en: 'Public Interest & Political Cases',
      ur: 'مفادِ عامہ و سیاسی نوعیت کے مقدمات',
      desc: {
        en: 'Election disputes, constitutional governance, and public interest litigation (PIL).',
        ur: 'انتخابی تنازعات، آئینی حکمرانی اور عوامی مفاد کی درخواستیں۔',
      },
    },
    video_evidence: {
      en: 'Video & Documentary Evidence',
      ur: 'ویڈیو و دستاویزی شواہد',
      desc: {
        en: 'Verified court recordings, press briefings, and documentary evidence with timecodes.',
        ur: 'تصدیق شدہ عدالتی و صحافتی ویڈیوز اور دستاویزی شواہد۔',
      },
    },
  },

  // Provinces
  provinces: {
    punjab: { en: 'Punjab', ur: 'پنجاب' },
    sindh: { en: 'Sindh', ur: 'سندھ' },
    khyber_pakhtunkhwa: { en: 'Khyber Pakhtunkhwa', ur: 'خیبر پختونخوا' },
    balochistan: { en: 'Balochistan', ur: 'بلوچستان' },
    islamabad_ict: { en: 'Islamabad (ICT)', ur: 'اسلام آباد (وفاقی دارالحکومت)' },
    gilgit_baltistan: { en: 'Gilgit-Baltistan', ur: 'گلگت بلتستان' },
    azad_kashmir: { en: 'Azad Jammu & Kashmir', ur: 'آزاد جموں و کشمیر' },
    federal: { en: 'Federal Jurisdiction', ur: 'وفاقی دائرۂ اختیار' },
    unknown: { en: 'Location Unspecified', ur: 'مقام غیر متعین' },
  },

  // Court Levels
  courtLevels: {
    supreme_court: { en: 'Supreme Court of Pakistan', ur: 'سپریم کورٹ آف پاکستان' },
    high_court: { en: 'Provincial High Court', ur: 'صوبائی ہائی کورٹ' },
    district_sessions: { en: 'District & Sessions Court', ur: 'ضلعی و سیشن عدالت' },
    special_tribunal: { en: 'Special Court / Anti-Terrorism / Accountability', ur: 'خصوصی عدالت / احتساب / اے ٹی سی' },
    magistrate_court: { en: 'Judicial Magistrate', ur: 'علاقہ مجسٹریٹ' },
    unknown: { en: 'Forum Under Inquiry', ur: 'فورم غیر واضح' },
  },

  // Editorial Review Statuses
  editorialReview: {
    verified_official_record: {
      en: 'Verified Official Court Record',
      ur: 'سرکاری عدالتی ریکارڈ سے مصدقہ',
      badge: 'bg-emerald-950/60 border-emerald-500/40 text-emerald-200',
    },
    corroborated_reporting: {
      en: 'Corroborated by Verified Law Reports',
      ur: 'مستند قانونی رپورٹنگ سے تصدیق شدہ',
      badge: 'bg-sky-950/60 border-sky-500/40 text-sky-200',
    },
    preliminary_documentation: {
      en: 'Preliminary Archival Entry',
      ur: 'ابتدائی دستاویزی اندراج',
      badge: 'bg-amber-950/60 border-amber-500/40 text-amber-200',
    },
    under_editorial_review: {
      en: 'Under Editorial Verification',
      ur: 'زیرِ ادارتی جانچ پڑتال',
      badge: 'bg-violet-950/60 border-violet-500/40 text-violet-200',
    },
  },

  // Record Types
  recordTypes: {
    court_case: { en: 'Court Case Proceeding', ur: 'عدالتی مقدمہ' },
    judgment: { en: 'Final Court Judgment', ur: 'حتمی عدالتی فیصلہ' },
    incident_report: { en: 'Public Incident Report', ur: 'عوامی وقوعہ رپورٹ' },
    custodial_inquiry: { en: 'Custodial Legal Inquiry', ur: 'حراستی قانونی انکوائری' },
    public_interest: { en: 'Public Interest Petition', ur: 'مفادِ عامہ کی درخواست' },
  },

  // Evidentiary Nature
  evidentiaryNature: {
    allegation: {
      en: 'Unproven Allegation',
      ur: 'غیر ثابت شدہ الزام',
      desc: {
        en: 'Claim made by complainant or prosecution agency. Unverified until adjudicated.',
        ur: 'مدعی یا استغاثہ کا ابتدائی دعویٰ؛ عدالتی جانچ تک غیر ثابت شدہ تصور ہوتا ہے۔',
      },
    },
    party_statement: {
      en: 'Party Statement / Defense Reply',
      ur: 'فریق کا بیان / تحریری جواب',
      desc: {
        en: 'Formal assertion submitted by petitioner, defendant, or defense counsel.',
        ur: 'درخواست گزار یا وکیل صفائی کی جانب سے عدالت میں جمع کرایا گیا موقف۔',
      },
    },
    official_record: {
      en: 'Verified Official Record',
      ur: 'مصدقہ عدالتی / سرکاری ریکارڈ',
      desc: {
        en: 'Docket entry, certified order sheet, or institutional remand document.',
        ur: 'آرڈر شیٹ، ریمانڈ آرڈر یا باضابطہ تصدیق شدہ عدالتی کارروائی۔',
      },
    },
    court_finding: {
      en: 'Judicial Ruling & Court Finding',
      ur: 'عدالتی مشاہدہ و حتمی حکم',
      desc: {
        en: 'Operative finding, binding holding, or decree issued by the presiding bench.',
        ur: 'فاضل عدالت کا جاری کردہ حتمی حکم، قانونی نظیر یا مشاہدہ۔',
      },
    },
  },

  // Privacy Protection Notices
  privacyNotice: {
    protectedMinor: {
      en: '[Identity Protected — Juvenile Justice System Act 2018]',
      ur: '[محفوظ شناخت — جووینائل جسٹس سسٹم ایکٹ 2018]',
    },
    protectedWitness: {
      en: '[Identity Redacted for Witness / Victim Protection]',
      ur: '[گواہ یا متاثرہ فرد کے تحفظ کی خاطر شناخت صیغۂ راز میں رکھی گئی ہے]',
    },
  },

  // Dashboard Strings
  dashboard: {
    title: { en: 'Archive Holdings & Live Statistics', ur: 'آرکائیو اعداد و شمار و عدالتی اشاریہ' },
    subtitle: {
      en: 'Computed in real-time strictly from valid, published records currently indexed in the Insaf Archive.',
      ur: 'انصاف آرکائیو میں محفوظ شدہ تصدیق شدہ ریکارڈز کے اصل اعداد و شمار کی براہِ راست تفصیل۔',
    },
    disclaimer: {
      en: 'Editorial Rigor Notice: These counts reflect ONLY the records currently cataloged in this independent research repository. They do NOT purport to represent all nationwide proceedings in Pakistan.',
      ur: 'ادارتی نوٹ: یہ اعداد و شمار صرف اس آرکائیو میں درج مقدمات پر مبنی ہیں اور یہ پورے پاکستان کے تمام مقدمات کی نمائندگی کا دعویٰ نہیں کرتے۔',
    },
    totalRecords: { en: 'Published Records', ur: 'کل شائع شدہ ریکارڈز' },
    recordsWithDocs: { en: 'Records with Court Orders', ur: 'مصدقہ احکامات کے حامل مقدمات' },
    recordsWithVideo: { en: 'Records with Verified Video', ur: 'ویڈیو شواہد کے حامل ریکارڈز' },
    recentUpdatesCount: { en: 'Updated in Last 90 Days', ur: 'حالیہ 90 روز میں تجدید شدہ' },
    byCategory: { en: 'Records by Archive Category', ur: 'شعبہ جات کے مطابق تقسیم' },
    byProvince: { en: 'Records by Province / Region', ur: 'صوبائی دائرۂ اختیار کے مطابق تقسیم' },
    byStatus: { en: 'Records by Procedural Status', ur: 'قانونی کیفیت کے مطابق ریکارڈز' },
    byCourtLevel: { en: 'Records by Court Level', ur: 'عدالتی فورم کے مطابق ریکارڈز' },
    emptyNotice: { en: 'No records available in dataset.', ur: 'کوئی ریکارڈ دستیاب نہیں۔' },
  },

  // Data Validator Strings
  validator: {
    title: { en: 'Data Import & Schema Validator', ur: 'قانونی ریکارڈز امپورٹ و تصدیقی ٹول' },
    subtitle: {
      en: 'Validate incoming batch submissions against the Insaf Archive schema, verify stable IDs, check bilingual fidelity, and inspect duplicate identifiers prior to merging.',
      ur: 'آرکائیو میں نئے ریکارڈز شامل کرنے سے قبل ان کی قانونی و تکنیکی تصدیق، ڈپلیکیٹ آئی ڈیز کی جانچ اور زبان کے معیار کا جائزہ۔',
    },
    inputLabel: { en: 'Paste Case Records (JSON Array)', ur: 'قانونی ریکارڈز کا JSON ڈیٹا یہاں چسپاں کریں' },
    validateButton: { en: 'Validate Batch Schema', ur: 'ڈیٹا کی تصدیق کریں' },
    loadSampleButton: { en: 'Load Sample Batch Record', ur: 'نمونہ ڈیٹا لوڈ کریں' },
    mergeButton: { en: 'Merge Validated Records into Archive', ur: 'مصدقہ ریکارڈز آرکائیو میں شامل کریں' },
    exportButton: { en: 'Export Validated JSON', ur: 'تصدیق شدہ JSON ڈاؤنلوڈ کریں' },
    resultsTitle: { en: 'Validation Diagnostics', ur: 'تصدیقی رپورٹ و نتائج' },
    batchValid: { en: 'Batch is Valid and Schema-Compliant', ur: 'تمام ریکارڈز معیار کے مطابق اور درست ہیں' },
    batchInvalid: { en: 'Batch Contains Errors Requiring Correction', ur: 'ڈیٹا میں خامیاں موجود ہیں جن کی درستی درکار ہے' },
    errorsFound: { en: 'Critical Schema Errors', ur: 'بنیادی تکنیکی غلطیاں' },
    warningsFound: { en: 'Editorial Warnings', ur: 'ادارتی انتباہات' },
    recordsParsed: { en: 'Records Analyzed', ur: 'جانچ کردہ ریکارڈز' },
    mergeSuccess: {
      en: 'Records merged successfully into the active archive state.',
      ur: 'ریکارڈز کامیابی سے آرکائیو ڈیٹا بیس میں شامل کر دیے گئے۔',
    },
  },

  // Case Detail
  caseDetail: {
    docketNumber: { en: 'Case / Docket No.', ur: 'مقدمہ / درخواست نمبر' },
    filingDate: { en: 'Filing Date', ur: 'اندراج کی تاریخ' },
    incidentDate: { en: 'Incident Date', ur: 'وقوعہ کی تاریخ' },
    lastUpdated: { en: 'Last Updated', ur: 'آخری تجدید' },
    presidingBench: { en: 'Presiding Bench', ur: 'فاضل عدالتی بینچ' },
    jurisdiction: { en: 'Jurisdiction / Province', ur: 'صوبہ / دائرۂ اختیار' },
    courtLevel: { en: 'Court Level', ur: 'عدالتی درجہ' },
    proceduralStatus: { en: 'Procedural Status', ur: 'مقدمے کی قانونی کیفیت' },
    factualBackground: { en: 'Detailed Factual Background', ur: 'مقدمے کا تفصیلی پسِ منظر و حقائق' },
    provisions: { en: 'Relevant Statutory Provisions', ur: 'متعلقہ قانونی و آئینی دفعات' },
    parties: { en: 'Parties to the Proceedings', ur: 'مقدمے کے فریقین' },
    evidenceBreakdown: { en: 'Evidentiary Records & Claims Distinction', ur: 'شواہد، بیانات اور عدالتی احکامات کی تفریق' },
    timeline: { en: 'Procedural Timeline of Milestones', ur: 'کارروائی کے اہم مراحل اور عدالتی احکامات' },
    documents: { en: 'Connected Court Judgments & Orders', ur: 'منسلک عدالتی احکامات و آرڈر شیٹس' },
    videos: { en: 'Verifiable Audio-Visual Documentation', ur: 'تصدیق شدہ ویڈیو شواہد و عدالتی کارروائی' },
    sources: { en: 'Source Citations & References', ur: 'دستاویزی ماخذ اور حوالہ جات' },
    relatedCases: { en: 'Related Legal Dockets', ur: 'متعلقہ مقدمات کے ریکارڈز' },
    incompleteBanner: {
      en: 'Preliminary Record Notice: This docket is currently undergoing editorial verification. Some procedural milestone order sheets are pending certified retrieval.',
      ur: 'ابتدائی ریکارڈ کا نوٹس: یہ مقدمہ تاحال ادارتی جانچ کے مرحلے میں ہے۔ بعض عدالتی نقول اور مصدقہ آرڈرز کا انتظار ہے۔',
    },
    subJudiceBanner: {
      en: 'Sub Judice Notice: Active proceedings are sub judice before a court of law. All recorded allegations remain unproven claims until adjudicated.',
      ur: 'عدالتی سماعت کا نوٹس: یہ مقدمہ عدالت کے روبرو زیرِ سماعت ہے۔ تمام درج الزامات عدالتی فیصلے تک غیر ثابت شدہ دعوے ہیں۔',
    },
    editorialDisclaimer: {
      en: 'Editorial Notice: This record is maintained for public legal research and constitutional transparency. Allegations recorded herein are claims by prosecutorial or petitioning parties until adjudicated by a competent court of law.',
      ur: 'ادارتی وضاحتی نوٹ: یہ ریکارڈ خالصتاً قانونی تحقیق اور آئینی شفافیت کی غرض سے مرتب کیا گیا ہے۔ اس میں درج ابتدائی الزامات عدالتی فیصلے تک مدعی یا استغاثہ کے یکطرفہ دعوے سمجھے جائیں۔',
    },
  },

  // Home Page
  home: {
    heroKicker: {
      en: 'OFFICIAL PUBLIC ARCHIVE · INDEPENDENT LEGAL RECORD',
      ur: 'عوامی ریکارڈ · غیر جانبدارانہ قانونی آرکائیو',
    },
    heroHeading: {
      en: 'Documenting Justice, Legal Precedents & Public Records in Pakistan',
      ur: 'پاکستان میں عدالتی فیصلوں، قانونی نظائر اور عوامی ریکارڈ کی دستاویزی تحقیق',
    },
    heroDescription: {
      en: 'A meticulous, non-partisan repository cataloging constitutional petitions, high court orders, bail proceedings, human rights documentation, and verifiable video evidence with strict evidentiary standards.',
      ur: 'ایک جامع اور غیر جانبدارانہ ڈیجیٹل ذخیرہ جو سخت دستاویزی معیار کے ساتھ آئینی درخواستوں، عدالتی احکامات، ضمانت کے فیصلوں اور تصدیق شدہ شواہد کو ریکارڈ کرتا ہے۔',
    },
    stats: {
      documentedCases: { en: 'Documented Proceedings', ur: 'محفوظ شدہ مقدمات' },
      certifiedJudgments: { en: 'Certified Court Orders', ur: 'مصدقہ عدالتی احکامات' },
      humanRightsReports: { en: 'Institutional Reports', ur: 'انسانی حقوق رپورٹس' },
      verifiedMediaItems: { en: 'Verified Media Records', ur: 'تصدیق شدہ ویڈیو شواہد' },
    },
    featuredCasesTitle: {
      en: 'Key Featured Case Records',
      ur: 'اہم نمایاں مقدمات کا ریکارڈ',
    },
    featuredCasesSubtitle: {
      en: 'Cases involving significant constitutional questions, procedural rights, and precedent-setting judicial findings.',
      ur: 'وہ مقدمات جن میں اہم آئینی سوالات، قانونی حقوق اور اہم عدالتی نظائر شامل ہیں۔',
    },
    recentJudgmentsTitle: {
      en: 'Latest Certified Judgments & Orders',
      ur: 'تازہ ترین مصدقہ عدالتی فیصلے و احکامات',
    },
    recentJudgmentsSubtitle: {
      en: 'Direct extracts and law report citations from the Supreme Court and provincial High Courts.',
      ur: 'سپریم کورٹ اور صوبائی ہائی کورٹس کے براہِ راست عدالتی اقتباسات اور قانونی حوالہ جات۔',
    },
    archivePillarsTitle: {
      en: 'Our Editorial & Evidentiary Standard',
      ur: 'ہمارا ادارتی و دستاویزی معیار',
    },
    pillars: [
      {
        title: { en: 'Rigorous Claim Distinction', ur: 'الزامات اور فیصلوں میں واضح فرق' },
        desc: {
          en: 'We strictly distinguish between FIR allegations, procedural bail grants, convictions, and final acquittals to prevent misinformation.',
          ur: 'ہم ابتدائی ایف آئی آر، ضمانت کے عبوری احکامات، سزا اور حتمی بریت کے مابین واضح فرق برقرار رکھتے ہیں۔',
        },
      },
      {
        title: { en: 'Certified Document Citations', ur: 'مصدقہ نقول اور باضابطہ حوالہ جات' },
        desc: {
          en: 'Every milestone cites certified court copies, standard law reports (PLD, SCMR, PCrLJ), and official gazettes.',
          ur: 'ہر عدالتی کارروائی کو مصدقہ عدالتی نقول اور مستند لا جرنلز کے باضابطہ حوالوں سے منسلک کیا جاتا ہے۔',
        },
      },
      {
        title: { en: 'Right of Reply & Corrections', ur: 'حقِ وضاحت و باضابطہ تصحیح' },
        desc: {
          en: 'An open, transparent protocol for legal counsel and verified parties to request factual updates or submit missing documents.',
          ur: 'وکلاء اور متعلقہ فریقین کے لیے دستاویزات جمع کروانے اور حقائق کی تصحیح کا شفاف طریقہ کار۔',
        },
      },
    ],
  },

  // Video Archive Page
  videoPage: {
    title: { en: 'Verifiable Video Evidence & Proceedings', ur: 'تصدیق شدہ ویڈیو شواہد و عدالتی کارروائی' },
    subtitle: {
      en: 'Cataloged court hearings, verified legal briefings, and relevant public video documentation with timestamped factual context.',
      ur: 'عدالتی سماعتیں، باضابطہ پریس بریفنگز اور اہم عوامی ویڈیو شواہد جن کی مکمل وقت اور حقائق کے ساتھ تصدیق کی گئی ہے۔',
    },
    verificationBadge: {
      certified_stream: { en: 'Official Judicial Broadcast', ur: 'باضابطہ عدالتی نشریات' },
      official_briefing: { en: 'Official Legal Press Briefing', ur: 'وکلاء کی باضابطہ پریس کانفرنس' },
      verified_reporting: { en: 'Verified Court Reporting', ur: 'مستند عدالتی رپورٹنگ' },
    },
    recordedOn: { en: 'Recorded on', ur: 'ریکارڈنگ کی تاریخ' },
    keyPoints: { en: 'Key Points in Record', ur: 'ویڈیو کے اہم نکات' },
    verificationNotes: { en: 'Verification & Context Notes', ur: 'تصدیق و ادارتی وضاحتی نوٹس' },
  },

  // Reports Page
  reportsPage: {
    title: { en: 'Human Rights & Legal Observer Reports', ur: 'انسانی حقوق و قانونی مبصرین کی رپورٹس' },
    subtitle: {
      en: 'Independent documentation by recognized domestic and international bodies on due process, civil liberties, and the rule of law in Pakistan.',
      ur: 'پاکستان میں قانون کی حکمرانی، آئینی حقوق اور شفاف ٹرائل پر قومی اور بین الاقوامی غیر جانبدار اداروں کی تحقیقی رپورٹس۔',
    },
    publishedBy: { en: 'Published by', ur: 'شائع کردہ ادارہ' },
    executiveSummary: { en: 'Executive Summary', ur: 'خلاصۂ رپورٹ' },
    keyFindings: { en: 'Key Documented Findings', ur: 'اہم دستاویزی نتائج' },
    readOriginalReport: { en: 'Access Source Document', ur: 'اصل دستاویز ملاحظہ کریں' },
  },

  // Judgments Page
  judgmentsPage: {
    title: { en: 'Court Judgments, Rulings & Bail Orders', ur: 'عدالتی فیصلے، نظائر اور ضمانت کے احکامات' },
    subtitle: {
      en: 'Primary source judicial orders from the Supreme Court and High Courts with authenticated citations and operative extracts.',
      ur: 'سپریم کورٹ اور صوبائی ہائی کورٹس کے اصل عدالتی احکامات، قانونی نظائر اور اہم فیصلوں کے اقتباسات۔',
    },
    certifiedOnly: { en: 'Certified Copies Only', ur: 'صرف مصدقہ نقول' },
    allCourts: { en: 'All Jurisdictions', ur: 'تمام عدالتیں' },
  },

  // Editorial Methodology Page
  methodologyPage: {
    title: { en: 'Editorial Methodology & Verification Framework', ur: 'ادارتی طریقۂ کار اور تصدیقی ضابطہ' },
    subtitle: {
      en: 'The archival guidelines, legal standards, and neutral documentation principles governing the Insaf Archive.',
      ur: 'انصاف آرکائیو کے غیر جانبدارانہ، دستاویزی اور قانونی طریقہ کار کی تفصیلی وضاحتی گائیڈ۔',
    },
    presumptionOfInnocence: {
      en: 'Inclusion of any individual or proceeding within the Insaf Archive does not constitute an imputation or finding of guilt. Under Article 10-A, all individuals are presumed innocent until proven guilty by a competent court.',
      ur: 'انصاف آرکائیو میں کسی بھی مقدمے یا فرد کے اندراج کا مطلب جرم یا بے گناہی کا ثبوت نہیں۔ آرٹیکل 10-A کے تحت ہر شہری تب تک بے گناہ ہے جب تک عدالت جرم ثابت نہ کرے۔',
    },
    bailNotAcquittal: {
      en: 'The grant of bail under Section 497/498 CrPC is interim procedural relief pending trial and strictly does not constitute an acquittal or finding of innocence.',
      ur: 'دفعہ 497/498 ضابطہ فوجداری کے تحت ضمانت کی منظوری محض عبوری قانونی ریلیف ہے، یہ ہرگز حتمی بریت یا بے گناہی کا پروانہ نہیں ہے۔',
    },
  },

  // Corrections & Contact Page
  correctionsPage: {
    title: { en: 'Corrections Protocol & Public Inquiry', ur: 'تصحیح کا طریقہ کار و عوامی رابطہ' },
    subtitle: {
      en: 'We uphold an exacting standard of accuracy. Legal counsel, parties, and researchers may request factual updates or report discrepancies here.',
      ur: 'ہم مکمل درستی اور سچائی کے پابند ہیں۔ وکلاء، فریقین اور محققین کسی بھی غلطی کی تصحیح یا دستاویزی ثبوت یہاں جمع کروا سکتے ہیں۔',
    },
    formTitle: { en: 'Submit a Formal Correction or Document Request', ur: 'باضابطہ تصحیح یا دستاویز کی فراہمی کا فارم' },
    applicantName: { en: 'Full Legal Name', ur: 'مکمل نام' },
    applicantEmail: { en: 'Contact Email Address', ur: 'ای میل ایڈریس' },
    applicantRole: { en: 'Your Role / Standing', ur: 'آپ کی قانونی حیثیت / تعلق' },
    caseReference: { en: 'Case Docket or Document Number', ur: 'مقدمہ نمبر یا متعلقہ دستاویز کا حوالہ' },
    description: { en: 'Factual Discrepancy & Requested Revision', ur: 'نشاندہی کردہ غلطی اور مطلوبہ درستی کی تفصیل' },
    supportingEvidence: { en: 'Supporting Citation or Certified Copy Link', ur: 'مصدقہ عدالتی نقل کا لنک یا قانونی حوالہ' },
    submitButton: { en: 'Submit Correction Request', ur: 'درخواست جمع کروائیں' },
    successMessage: {
      en: 'Your correction request has been recorded. Our editorial and legal verification panel reviews submissions alongside certified court transcripts within 48 hours.',
      ur: 'آپ کی درخواست موصول ہو گئی ہے۔ ہمارا قانونی اور ادارتی پینل مصدقہ عدالتی دستاویزات کی روشنی میں 48 گھنٹوں کے اندر جائزہ لے گا۔',
    },
  },

  // Contributor Guidance & Review Workflow (Phase 4)
  contributePage: {
    title: {
      en: 'Lawyer & Contributor Submission Portal',
      ur: 'وکلاء و قانونی معاونین کا باضابطہ پورٹل',
    },
    subtitle: {
      en: 'A free, approval-based collaborative workflow for legal practitioners, researchers, and court observers to submit new proceedings, provide verified judgments, and propose factual corrections.',
      ur: 'وکلاء، محققین اور عدالتی مبصرین کے لیے مفت اور تصدیق پر مبنی باضابطہ طریقہ کار تاکہ نئے مقدمات، عدالتی احکامات اور شواہد کی جانچ کے بعد اشاعت کی جا سکے۔',
    },
    kicker: {
      en: 'Free GitHub-Based Approval & Verification Workflow · Zero Mandatory Cost',
      ur: 'گٹ ہب پر مبنی مفت اور شفاف ادارتی جائزہ · بلا معاوضہ عوامی آرکائیو',
    },
    statusFlowTitle: {
      en: 'The 7-Step Archival Review & Publication Flow',
      ur: 'ادارتی جانچ اور اشاعت کے 7 مراحل',
    },
    statusFlowDesc: {
      en: 'Submissions NEVER alter the public website directly. Every proposal undergoes peer review, primary source verification, and automated invariant tests before deliberate administrator merging.',
      ur: 'کوئی بھی تجویز براہِ راست لائیو ویب سائٹ پر شائع نہیں ہوتی۔ ہر اندراج کی باضابطہ عدالتی نقول سے تصدیق اور تیکنیکی جانچ کے بعد ہی اشاعت کی جاتی ہے۔',
    },
    statusFlow: {
      draft: {
        en: '1. Draft',
        ur: '1۔ ابتدائی مسودہ (Draft)',
        desc: {
          en: 'Contributor gathers docket numbers, certified order sheets, and bilingual summaries.',
          ur: 'معاون یا وکیل مقدمے کے حقائق، نقول اور عدالتی نمبرز جمع کرتا ہے۔',
        },
      },
      submitted: {
        en: '2. Submitted',
        ur: '2۔ ارسال شدہ (Submitted)',
        desc: {
          en: 'Formal issue opened via structured template with full primary references and privacy confirmation.',
          ur: 'باضابطہ ٹیمپلیٹ کے ذریعے گٹ ہب ایشو یا فارم کے ذریعے تجاویز جمع کرائی جاتی ہیں۔',
        },
      },
      under_review: {
        en: '3. Under Review',
        ur: '3۔ زیرِ جائزہ (Under Review)',
        desc: {
          en: 'Editorial panel inspects primary court order sheets, validates dates, and checks for minor protection.',
          ur: 'ادارتی پینل اصل عدالتی نقول، تاریخوں اور قانونی دفعات کی جانچ کرتا ہے۔',
        },
      },
      changes_requested: {
        en: '4. Changes Requested',
        ur: '4۔ ترامیم درکار (Changes Requested)',
        desc: {
          en: 'Feedback provided to submitter if citations are unverified or claims lack documentary distinction.',
          ur: 'اگر کسی حوالے یا الزام کی تصدیق نامکمل ہو تو معاون سے وضاحت طلب کی جاتی ہے۔',
        },
      },
      approved: {
        en: '5. Approved',
        ur: '5۔ منظور شدہ (Approved)',
        desc: {
          en: 'Legal vetting complete; structured record staged for automated test suite execution.',
          ur: 'قانونی جانچ مکمل؛ ریکارڈ کو ٹیسٹ سوٹ کی جانچ کے لیے تیار کیا جاتا ہے۔',
        },
      },
      published: {
        en: '6. Published',
        ur: '6۔ شائع شدہ (Published)',
        desc: {
          en: 'Merged into Git main branch; automated GitHub Actions deploys update to GitHub Pages.',
          ur: 'کوڈ ریپازٹری میں باضابطہ شامل ہو کر لائیو ویب سائٹ پر شائع ہو جاتا ہے۔',
        },
      },
      rejected: {
        en: '7. Rejected',
        ur: '7۔ مسترد شدہ (Rejected)',
        desc: {
          en: 'Rejected if uncorroborated, non-verifiable, defamatory, or breaching lawyer-client privilege.',
          ur: 'اگر ثبوت غیر مصدقہ ہو، وکالت کے راز کی خلاف ورزی ہو یا توہین آمیز مواد ہو تو مسترد کر دیا جاتا ہے۔',
        },
      },
    },
    rolesTitle: {
      en: 'Roles & Trust Architecture (No Client-Side Passwords)',
      ur: 'ذمہ داریوں کی تقسیم اور سیکیورٹی ماڈل',
    },
    rolesDesc: {
      en: 'We do NOT use fake frontend logins or insecure client-side passwords. Repository-level GitHub permissions and branch protection strictly govern write and merge access.',
      ur: 'ہم کوئی فرضی لاگ ان یا براؤزر میں پاس ورڈ کا نظام استعمال نہیں کرتے۔ گٹ ہب ریپازٹری کی باضابطہ سیکیورٹی اور برانچ پروٹیکشن ڈیٹا کو محفوظ رکھتی ہے۔',
    },
    roles: {
      super_admin: {
        title: { en: 'Super Admin (Repository Owner)', ur: 'سپر ایڈمن (ریپازٹری کا مالک)' },
        desc: {
          en: 'Holds cryptographic maintainer access, enforces branch protection, and possesses sole merge authority into main.',
          ur: 'ریپازٹری کا حتمی نگراں؛ برانچ پروٹیکشن نافذ کرتا ہے اور مرکزی ڈیٹا میں تبدیلی کا مجاز ہے۔',
        },
      },
      reviewer: {
        title: { en: 'Editorial Reviewer', ur: 'ادارتی و قانونی مبصر (Reviewer)' },
        desc: {
          en: 'Assigned legal practitioner or researcher who cross-references court journals and inspects primary documents.',
          ur: 'قانونی محقق جو عدالتی فیصلوں کے حوالہ جات اور نقول کی تصدیق کر کے منظوری کی سفارش کرتا ہے۔',
        },
      },
      contributor: {
        title: { en: 'Authorized Contributor (Lawyer/Observer)', ur: 'معاون (وکیل یا مبصر)' },
        desc: {
          en: 'Submits structured proposals via GitHub Issues or offline forms without direct write access to production code.',
          ur: 'باضابطہ ٹیمپلیٹ کے ذریعے مقدمات اور ویڈیوز تجویز کرتا ہے؛ اسے لائیو سائٹ میں براہِ راست تبدیلی کی اجازت نہیں ہوتی۔',
        },
      },
      public_reader: {
        title: { en: 'Public Reader', ur: 'عوامی قاری (Public Reader)' },
        desc: {
          en: 'Read-only access to published, verified, and redacted legal dossiers on the open web.',
          ur: 'عوامی سطح پر شائع شدہ مصدقہ ریکارڈز کا مفت اور آزادانہ مطالعہ کر سکتا ہے۔',
        },
      },
    },
    tabs: {
      overview: { en: 'Workflow & Standards', ur: 'طریقۂ کار و معیار' },
      newCase: { en: 'Propose New Case', ur: 'نیا مقدمہ تجویز کریں' },
      correction: { en: 'Propose Case Correction', ur: 'مقدمے میں تصحیح' },
      mediaDoc: { en: 'Submit Media & Orders', ur: 'ویڈیو یا حکم نامہ' },
      checklist: { en: 'Administrator Checklist', ur: 'ایڈمن جائزہ چیک لسٹ' },
      security: { en: 'Permissions & Security', ur: 'سیکیورٹی و برانچ رولز' },
    },
  },

  // Super Admin Workspace & Case Management (Phase 6)
  adminDashboard: {
    title: { en: 'Super Admin Workspace & Case Studio', ur: 'ایڈمن ورک اسپیس و قانونی مسودہ پینل' },
    subtitle: {
      en: 'Administrative staging workspace for entering, drafting, validating, and preparing verified case dossiers and media items for repository review.',
      ur: 'مقدمات کے اندراج، تدوین، تصدیق اور اشاعت کی تیاری کے لیے باضابطہ ایڈمن اسٹوڈیو۔',
    },
    disclaimer: {
      en: 'Administrative Workspace Notice: This is a static-compatible client-side staging environment. Drafts and local additions are stored in your browser session and are NOT publicly deployed until reviewed, validated, and merged into the main Git branch.',
      ur: 'انتظامی انتباہ: یہ ایک محفوظ کلائنٹ سائیڈ ورک اسپیس ہے۔ یہاں تیار کردہ ڈرافٹس آپ کے براؤزر کے لوکل سیشن میں رہتے ہیں اور جب تک گٹ ہب پر جانچ کے بعد شامل نہ کیے جائیں، لائیو ویب سائٹ پر شائع نہیں ہوتے۔',
    },
    tabs: {
      overview: { en: 'Overview', ur: 'ڈیش بورڈ جائزہ' },
      cases: { en: 'Case Catalog', ur: 'مقدمات کی فہرست' },
      caseForm: { en: 'Case Editor', ur: 'مقدمہ ایڈیٹر' },
      media: { en: 'Media & Evidence', ur: 'شواہد و دستاویزات' },
      review: { en: 'Review & Diff', ur: 'جائزہ و موازنہ' },
      export: { en: 'Export Manifest', ur: 'ایکسپورٹ ڈیٹا' },
    },
    metrics: {
      totalCases: { en: 'Total Archive Cases', ur: 'کل عدالتی مقدمات' },
      publishedCases: { en: 'Verified & Published', ur: 'مصدقہ و شائع شدہ' },
      totalMedia: { en: 'Media & Evidence Records', ur: 'شواہد و ویڈیو ریکارڈز' },
      activeDrafts: { en: 'Active Local Drafts', ur: 'محفوظ شدہ ڈرافٹس' },
      validationStatus: { en: 'Archive Schema Health', ur: 'اسکیما صحت و تصدیق' },
      preparedForReview: { en: 'Ready for PR Review', ur: 'جائزہ کے لیے تیار' },
    },
    actions: {
      addNewCase: { en: 'Add New Case', ur: 'نیا مقدمہ درج کریں' },
      editCase: { en: 'Edit Record', ur: 'ترمیم کریں' },
      addMedia: { en: 'Add Media Record', ur: 'نیا میڈیا ریکارڈ درج کریں' },
      previewCase: { en: 'Preview Case Dossier', ur: 'عدالتی مسودہ کا پریویو' },
      saveDraft: { en: 'Save Local Draft', ur: 'لوکل ڈرافٹ محفوظ کریں' },
      clearDraft: { en: 'Discard Draft', ur: 'ڈرافٹ ختم کریں' },
      validateNow: { en: 'Validate Schema Now', ur: 'اسکیما کی تصدیق کریں' },
      exportJson: { en: 'Export Validated JSON', ur: 'تصدیق شدہ JSON ایکسپورٹ کریں' },
      copyJson: { en: 'Copy JSON to Clipboard', ur: 'JSON کاپی کریں' },
      copyMarkdown: { en: 'Copy PR Markdown', ur: 'PR مارک ڈاؤن کاپی کریں' },
      openPrUrl: { en: 'Open GitHub Issue / PR Template', ur: 'گٹ ہب پر جمع کروائیں' },
      reviewDiff: { en: 'Review Proposed Diff', ur: 'تبدیلیوں کا موازنہ دیکھیں' },
      cancelEdit: { en: 'Cancel Editing', ur: 'ترمیم منسوخ کریں' },
    },
  },

  // Footer & Disclaimer
  footer: {
    legalDisclaimer: {
      en: 'Legal Disclaimer: Insaf Archive is a digital public legal archive compiled strictly for scholarly research, civil liberties documentation, and public interest transparency. The archive does not provide legal representation or legal advice. Case records distinguish allegations from judicial findings.',
      ur: 'قانونی وضاحتی نوٹ: انصاف آرکائیو خالصتاً قانونی و آئینی تحقیق، شہری آزادیوں اور مفادِ عامہ کی شفافیت کے لیے بنایا گیا ایک معلوماتی پلیٹ فارم ہے۔ یہ ادارہ کوئی قانونی مشاورت یا وکالت فراہم نہیں کرتا۔',
    },
    githubRepo: {
      en: 'Public Repository: github.com/insafarchive',
      ur: 'عوامی کوڈ ریپازٹری: github.com/insafarchive',
    },
    rights: {
      en: 'All court judgments, constitutional petitions, and gazette notices remain public domain materials under Pakistani law.',
      ur: 'تمام عدالتی فیصلے، آئینی درخواستیں اور سرکاری احکامات ملکی قوانین کے تحت عوامی ملکیت ہیں۔',
    },
  },
};
