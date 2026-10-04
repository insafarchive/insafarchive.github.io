import { MediaItem } from '../../types';

export const allMediaRecords: MediaItem[] = [
  // 1. YouTube Video: Supreme Court Open Court Audio-Visual Proceedings
  {
    id: 'MED-VID-01',
    title: {
      en: 'Supreme Court Full Bench Audio-Visual Hearing on Article 19 & Digital Speech',
      ur: 'آزادی اظہارِ رائے و آرٹیکل 19 پر سپریم کورٹ کے لارجر بینچ کی باضابطہ سماعت',
    },
    mediaType: 'youtube_video',
    associatedCaseIds: ['PK-SC-2024-0102'],
    associatedCaseSlugs: ['freedom-of-speech-digital-media-contempt-petition'],
    sourceUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    sourcePublisher: {
      en: 'Supreme Court of Pakistan Judicial Channel',
      ur: 'سپریم کورٹ آف پاکستان باضابطہ عدالتی نشریات',
    },
    eventDate: '2024-04-15', // Hearing date
    publicationDate: '2024-04-16', // Broadcast archive upload date
    dateAdded: '2024-04-20',
    description: {
      en: 'Official open-court proceedings of the Three-Member Constitutional Bench hearing petitions challenging executive summonses under Section 20 of PECA.',
      ur: 'پیکا ایکٹ کی دفعہ 20 کے تحت صحافیوں کو بلا وارنٹ سمن جاری کرنے کے خلاف سپریم کورٹ کے تین رکنی بینچ کی براہِ راست نشریاتی کارروائی۔',
    },
    contextNotes: {
      en: 'Recorded under Supreme Court Open Justice Directives. The Attorney General made crucial concessions regarding investigative guidelines during minute 18:40.',
      ur: 'کھلی عدالتی کارروائی کی پالیسی کے تحت ریکارڈ شدہ۔ اٹارنی جنرل نے 18ویں منٹ میں تفتیشی طریقہ کار پر نظرِ ثانی کی یقین دہانی کروائی۔',
    },
    videoMetadata: {
      youtubeId: 'dQw4w9WgXcQ',
      duration: '42:15',
      privacyEnhancedEmbedUrl: 'https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ',
      embedAllowed: true,
      timestamps: [
        {
          timeInSeconds: 252,
          timecode: '04:12',
          label: {
            en: 'Chief Justice questions Federal Counsel on threshold of summons',
            ur: 'چیف جسٹس کا وفاقی وکیل سے صحافیوں کی طلبی کے قانونی جواز پر استفسار',
          },
          note: {
            en: 'Bench questions whether preliminary inquiries require judicial magistrate endorsement.',
            ur: 'بینچ نے استفسار کیا کہ کیا عدالتی اجازت کے بغیر سمن قانونی ہے؟',
          },
        },
        {
          timeInSeconds: 1120,
          timecode: '18:40',
          label: {
            en: 'Senior Advocate presents comparative jurisprudence on digital press freedoms',
            ur: 'سینئر وکیل کے ڈیجیٹل آزادیِ صحافت پر بین الاقوامی عدالتی نظائر کے دلائل',
          },
        },
        {
          timeInSeconds: 1990,
          timecode: '33:10',
          label: {
            en: 'Directive issued to FIA to submit codified procedural guidelines within 14 days',
            ur: 'تفتیشی ادارے کو 14 روز کے اندر تفتیش کا شفاف ضابطہ جمع کرانے کی ہدایت',
          },
        },
      ],
    },
    verificationStatus: 'verified_official_record',
    editorialReviewDate: '2024-04-22',
    copyrightNotice: {
      en: 'Public judicial record broadcast under Supreme Court open access policy.',
      ur: 'سپریم کورٹ کی کھلی عدالتی پالیسی کے تحت پبلک ڈومین ریکارڈ۔',
    },
    visibility: 'public',
    isDemonstrationData: true,
    category: 'court_judgments',
    tags: ['Supreme Court', 'PECA', 'Article 19', 'Digital Freedom', 'Live Hearing'],
  },

  // 2. YouTube Video: High Court Bar Defense Counsel Briefing on Post-Arrest Bail
  {
    id: 'MED-VID-02',
    title: {
      en: 'Defense Counsel Briefing on Lahore High Court Bail Precedents (Sec 497 CrPC)',
      ur: 'لاہور ہائی کورٹ کے ضمانت کے فیصلے پر وکلاء کی تفصیلی پریس بریفنگ (دفعہ 497)',
    },
    mediaType: 'youtube_video',
    associatedCaseIds: ['PK-LHC-2023-0451'],
    associatedCaseSlugs: ['post-arrest-bail-peaceful-protest-assembly-charges'],
    sourceUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    sourcePublisher: {
      en: 'High Court Bar Association Legal Desk',
      ur: 'ہائی کورٹ بار ایسوسی ایشن لیگل ڈیسک',
    },
    eventDate: '2023-12-19', // Date of bail pronouncement
    publicationDate: '2023-12-19',
    dateAdded: '2023-12-22',
    description: {
      en: 'Senior defense counsel addresses media outside Rawalpindi Bench following the release order for 15 civic demonstrators under Section 497 CrPC.',
      ur: 'لاہور ہائی کورٹ راولپنڈی بینچ سے 15 پرامن مظاہرین کی ضمانت منظور ہونے کے بعد وکلاء صفائی کی اہم پریس کانفرنس۔',
    },
    contextNotes: {
      en: 'Defense clarifies the critical legal distinction that bail is an interim procedural relief ensuring liberty pending trial and does NOT constitute an acquittal.',
      ur: 'وکیل صفائی نے واضح کیا کہ ضمانت ایک عبوری ریلیف ہے اور ٹرائل ابھی سیشن کورٹ میں جاری ہے۔',
    },
    videoMetadata: {
      youtubeId: 'dQw4w9WgXcQ',
      duration: '14:30',
      privacyEnhancedEmbedUrl: 'https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ',
      embedAllowed: true,
      timestamps: [
        {
          timeInSeconds: 110,
          timecode: '01:50',
          label: {
            en: 'Reading of operative paragraphs of High Court Bail Judgment (PLD 2024 Lah 115)',
            ur: 'لاہور ہائی کورٹ کے تحریری فیصلے کے اہم اقتباسات کی تلاوت',
          },
        },
        {
          timeInSeconds: 440,
          timecode: '07:20',
          label: {
            en: 'Verification of PKR 100,000 surety bonds before Trial Magistrate',
            ur: 'ایک لاکھ روپے کے ضمانتی مچلکوں کی مجسٹریٹ کے روبرو تصدیق کا عمل',
          },
        },
      ],
    },
    verificationStatus: 'corroborated_reporting',
    editorialReviewDate: '2023-12-21',
    visibility: 'public',
    isDemonstrationData: true,
    category: 'bail_acquittal',
    tags: ['Lahore High Court', 'Bail Order', 'Section 497', 'Rawalpindi', 'Peaceful Assembly'],
  },

  // 3. Document: Certified Supreme Court Interim Order Sheet (2024 SCMR 301)
  {
    id: 'MED-DOC-01',
    title: {
      en: 'Certified Interim Order Sheet: Right to Information & Digital Inquiry Thresholds',
      ur: 'مصدقہ عدالتی عبوری حکم نامہ: حقِ معلومات و ڈیجیٹل تفتیش کے قانونی ضوابط',
    },
    mediaType: 'document',
    associatedCaseIds: ['PK-SC-2024-0102'],
    associatedCaseSlugs: ['freedom-of-speech-digital-media-contempt-petition'],
    sourceUrl: 'https://supremecourt.gov.pk',
    sourcePublisher: {
      en: 'Registrar, Supreme Court of Pakistan',
      ur: 'رجسٹرار، سپریم کورٹ آف پاکستان',
    },
    eventDate: '2024-03-12', // Date order was signed
    publicationDate: '2024-03-14', // Date certified copy was made public
    dateAdded: '2024-03-15',
    description: {
      en: 'Official eight-page signed order sheet granting protective relief to petitioners and outlining the constitutional doctrine under Articles 19 and 19-A.',
      ur: 'سپریم کورٹ کا دستخط شدہ آٹھ صفحات پر مشتمل باضابطہ عبوری حکم نامہ جس میں صحافیوں کو گرفتاری سے تحفظ دیا گیا۔',
    },
    contextNotes: {
      en: 'Certified copy issued by the Supreme Court Copying Branch under seal. Forms the binding basis for the interim stay against Section 20 coercive summons.',
      ur: 'سپریم کورٹ برانچ سے باضابطہ مہر کے ساتھ جاری کردہ مصدقہ نقل۔',
    },
    documentMetadata: {
      docType: 'court_order',
      citationFormat: '2024 SCMR 301 (Interim)',
      certifiedCopyStatus: 'certified_official',
      pagesCount: 8,
      paragraphReference: 'Paragraphs 4 to 9',
      downloadAuthorized: true,
      extractText: {
        en: '“Article 19 and 19-A are the bedrock of democratic accountability. The coercive apparatus of the State cannot be lightly deployed to muzzle critical inquiry without rigorous adherence to statutory due process under Article 10-A.”',
        ur: '”آئین کے آرٹیکلز 19 اور 19-A جمہوری احتساب کی بنیاد ہیں۔ قانون کی منشا اور شفاف ٹرائل کے تقاضوں کے بغیر ریاستی طاقت کو تنقیدی آوازوں کو دبانے کے لیے استعمال نہیں کیا جا سکتا۔“',
      },
    },
    verificationStatus: 'verified_official_record',
    editorialReviewDate: '2024-03-16',
    visibility: 'public',
    isDemonstrationData: true,
    category: 'court_judgments',
    tags: ['Certified Order', 'SCMR', 'Supreme Court', 'Interim Relief', 'Article 19'],
  },

  // 4. Document: Certified Post-Arrest Bail Judgment (PLD 2024 Lah 115)
  {
    id: 'MED-DOC-02',
    title: {
      en: 'Certified Bail Judgment under Section 497 CrPC in Political Demonstration Charges',
      ur: 'پرامن مظاہرین کی بعد از گرفتاری ضمانت کا مصدقہ عدالتی فیصلہ (دفعہ 497)',
    },
    mediaType: 'document',
    associatedCaseIds: ['PK-LHC-2023-0451'],
    associatedCaseSlugs: ['post-arrest-bail-peaceful-protest-assembly-charges'],
    sourceUrl: 'https://lhc.gov.pk',
    sourcePublisher: {
      en: 'Lahore High Court Rawalpindi Bench Registry',
      ur: 'لاہور ہائی کورٹ راولپنڈی بینچ رجسٹرار آفس',
    },
    eventDate: '2023-12-19',
    publicationDate: '2024-01-05',
    dateAdded: '2024-01-08',
    description: {
      en: 'Reported High Court judgment authored by Hon. Justice K. Mahmood establishing that violations of administrative Section 144 orders are bailable.',
      ur: 'لاہور ہائی کورٹ کا تفصیلی فیصلہ جس میں قرار دیا گیا کہ دفعہ 144 کی خلاف ورزی ایک قابلِ ضمانت جرم ہے۔',
    },
    contextNotes: {
      en: 'Published in Pakistan Law Decisions (PLD). Establishes judicial precedent for non-violent political rally cases across Punjab.',
      ur: 'پی ایل ڈی لا جرنل میں شائع شدہ؛ پنجاب بھر میں پرامن سیاسی کارکنوں کی ضمانتوں کے لیے رہنما نظیر۔',
    },
    documentMetadata: {
      docType: 'judgment',
      citationFormat: 'PLD 2024 Lah 115',
      certifiedCopyStatus: 'certified_official',
      pagesCount: 6,
      paragraphReference: 'Paras 5, 8 & 11',
      downloadAuthorized: true,
      extractText: {
        en: '“Grant of bail is the rule and refusal an exception in cases not falling within the prohibitory clause of Section 497 Cr.P.C. Peaceful citizens exercising political assembly cannot be subjected to punitive pre-trial incarceration.”',
        ur: '”ایسے جرائم جن پر دفعہ 497 کی ممنوعہ شق کا اطلاق نہ ہو، ان میں ضمانت حق اور انکار استثنا ہے۔ پرامن سیاسی اجتماع میں شریک شہریوں کو قبل از ٹرائل سزا کے طور پر جیل میں نہیں رکھا جا سکتا۔“',
      },
    },
    verificationStatus: 'verified_official_record',
    editorialReviewDate: '2024-01-10',
    visibility: 'public',
    isDemonstrationData: true,
    category: 'bail_acquittal',
    tags: ['Lahore High Court', 'PLD', 'Section 497', 'Bail Jurisprudence'],
  },

  // 5. Document: Supreme Court Landmark Judgment on Katchi Abadi Shelter Rights (2024 SCMR 410)
  {
    id: 'MED-DOC-03',
    title: {
      en: 'Supreme Court Landmark Judgment on Informal Settlements & Right to Shelter',
      ur: 'کچی آبادیوں کے مکینوں کے حقِ رہائش پر سپریم کورٹ کا تاریخی عدالتی فیصلہ',
    },
    mediaType: 'document',
    associatedCaseIds: ['PK-SC-2023-0941'],
    associatedCaseSlugs: ['katchi-abadi-anti-encroachment-rehabilitation-mandate'],
    sourceUrl: 'https://supremecourt.gov.pk',
    sourcePublisher: {
      en: 'Supreme Court Law Reports Bureau',
      ur: 'سپریم کورٹ لا رپورٹس شعبہ',
    },
    eventDate: '2023-11-29',
    publicationDate: '2024-02-10',
    dateAdded: '2024-02-15',
    description: {
      en: 'Twenty-two page landmark judgment barring municipal demolition of informal settlements without socio-economic surveys and structured rehabilitation schemes.',
      ur: 'سپریم کورٹ کا 22 صفحات پر مشتمل فیصلہ جس میں متبادل رہائش اور سروے کے بغیر کچی آبادیوں کے انہدام پر پابندی عائد کی گئی۔',
    },
    contextNotes: {
      en: 'Authored by Senior Puisne Judge. Clarifies that the Article 9 right to life strictly encompasses human dignity and shelter under Article 14.',
      ur: 'عدالتِ عظمیٰ نے قرار دیا کہ آرٹیکل 9 کے تحت زندگی کے حق میں رہائش کا حق بھی شامل ہے۔',
    },
    documentMetadata: {
      docType: 'judgment',
      citationFormat: '2024 SCMR 410',
      certifiedCopyStatus: 'certified_official',
      pagesCount: 22,
      paragraphReference: 'Paras 11 to 16',
      downloadAuthorized: true,
      extractText: {
        en: '“The right to life enshrined under Article 9 does not signify mere animal existence; it encompasses the fundamental right to shelter and human dignity under Article 14. Eviction without rehabilitation reduces vulnerable citizens to state-sponsored destitution, which this Court cannot countenance.”',
        ur: '”آئین کے آرٹیکل 9 کے تحت زندگی کا حق محض سانس لینے کا نام نہیں بلکہ اس میں رہائش اور آرٹیکل 14 کے تحت انسانی وقار کا تحفظ بھی شامل ہے۔ بغیر متبادل کے شہریوں کو بے گھر کرنا ریاستی جبر کے مترادف ہے جس کی عدالت اجازت نہیں دے سکتی۔“',
      },
    },
    verificationStatus: 'verified_official_record',
    editorialReviewDate: '2024-02-18',
    visibility: 'public',
    isDemonstrationData: true,
    category: 'labour_poverty',
    tags: ['Right to Shelter', 'Article 9', 'SCMR', 'Katchi Abadi', 'Supreme Court'],
  },

  // 6. Photograph / Documentary Image: Official High Court Order Sheet Register
  {
    id: 'MED-IMG-01',
    title: {
      en: 'Official Archival Case Folio & Order Sheet Register',
      ur: 'ہائی کورٹ عدالتی رجسٹر و آرڈر شیٹ کی مصدقہ دستاویزی تصویر',
    },
    mediaType: 'image',
    associatedCaseIds: ['PK-LHC-2023-0451', 'PK-SC-2024-0102'],
    associatedCaseSlugs: ['post-arrest-bail-peaceful-protest-assembly-charges'],
    sourceUrl: './assets/images/court_bench_dockets_1791017417795.jpg',
    sourcePublisher: {
      en: 'Insaf Archive Legal Preservation Team',
      ur: 'انصاف آرکائیو لیگل پریزرویشن ٹیم',
    },
    eventDate: '2023-12-19',
    publicationDate: '2024-01-02',
    dateAdded: '2024-01-05',
    description: {
      en: 'Archival photographic preservation of the certified bench docket register and official judicial seals.',
      ur: 'مصدقہ عدالتی فولیو اور سرکاری مہروں کی تاریخی دستاویزی تصویر۔',
    },
    contextNotes: {
      en: 'Photographed with permission of High Court copying division for public legal scholarship.',
      ur: 'قانونی تحقیق کے مقصد کے لیے عدالتی ریکارڈ کی اجازت سے محفوظ شدہ تصویر۔',
    },
    imageMetadata: {
      alt: {
        en: 'Archival legal dockets and court bench order books',
        ur: 'عدالتی مسودات اور سرکاری آرڈر شیٹ فائلز',
      },
      caption: {
        en: 'Certified courtroom dockets on display in judicial archive registry.',
        ur: 'عدالتی ریکارڈ روم میں محفوظ شدہ مصدقہ مسودات۔',
      },
      resolution: '1920x1440',
      isAuthorizedPublicRecord: true,
      thumbnailUrl: './assets/images/court_bench_dockets_1791017417795.jpg',
      largeUrl: './assets/images/court_bench_dockets_1791017417795.jpg',
    },
    verificationStatus: 'verified_official_record',
    visibility: 'public',
    isDemonstrationData: true,
    category: 'court_judgments',
    tags: ['Court Docket', 'Official Record', 'High Court'],
  },

  // 7. Photograph: Archival Vault Preservation Ribbon & Certified Stamp
  {
    id: 'MED-IMG-02',
    title: {
      en: 'Public Legal Repository Certified Archival Document Seals',
      ur: 'عوامی قانونی آرکائیو کی مصدقہ مہر و دستاویزی ربن',
    },
    mediaType: 'image',
    associatedCaseIds: ['PK-IHC-2023-0892', 'PK-SHC-2022-0019'],
    associatedCaseSlugs: ['habeas-corpus-missing-citizen-custodial-safeguards'],
    sourceUrl: './assets/images/archival_records_vault_1791017430345.jpg',
    sourcePublisher: {
      en: 'Insaf Archive Verification Vault',
      ur: 'انصاف آرکائیو تصدیقی والٹ',
    },
    eventDate: '2023-10-24',
    publicationDate: '2023-11-01',
    dateAdded: '2023-11-05',
    description: {
      en: 'Documentary preservation photograph of sealed discharge order and statutory inquiry dockets.',
      ur: 'اخراجِ مقدمہ کے مہر شدہ عدالتی حکمنامے اور تفتیشی مسودے کی تصویری دستاویز۔',
    },
    contextNotes: {
      en: 'Preserved under standard museum archival guidelines for constitutional documentation.',
      ur: 'آئینی و قانونی تحقیق کے لیے مروجہ آرکائیو معیار کے مطابق محفوظ کی گئی۔',
    },
    imageMetadata: {
      alt: {
        en: 'Archival records vault containing certified court decrees and ribbons',
        ur: 'عدالتی احکامات اور سرکاری مہروں سے مزین آرکائیو والٹ',
      },
      caption: {
        en: 'Physical archive vault repository housing verified case decree copies.',
        ur: 'مصدقہ عدالتی احکامات کو محفوظ رکھنے والا عوامی ذخیرہ۔',
      },
      resolution: '1920x1440',
      isAuthorizedPublicRecord: true,
      thumbnailUrl: './assets/images/archival_records_vault_1791017430345.jpg',
      largeUrl: './assets/images/archival_records_vault_1791017430345.jpg',
    },
    verificationStatus: 'verified_official_record',
    visibility: 'public',
    isDemonstrationData: true,
    category: 'missing_persons',
    tags: ['Archival Seal', 'Habeas Corpus', 'Certified Record'],
  },

  // 8. Document: Special Anti-Corruption Trial Final Acquittal Decree (2024 CLD 218)
  {
    id: 'MED-DOC-04',
    title: {
      en: 'Certified Judgment of Acquittal under Section 249-A CrPC (State v. Shahid Akram)',
      ur: 'دفعہ 249-A کے تحت بریت کا باضابطہ مصدقہ فیصلہ (سرکار بنام شاہد اکرم)',
    },
    mediaType: 'document',
    associatedCaseIds: ['PK-SHC-2022-0019'],
    associatedCaseSlugs: ['state-v-shahid-akram-acquittal-anti-corruption'],
    sourceUrl: 'https://sindhhighcourt.gov.pk',
    sourcePublisher: {
      en: 'Special Court Anti-Corruption Karachi',
      ur: 'خصوصی عدالت اینٹی کرپشن کراچی',
    },
    eventDate: '2024-01-15',
    publicationDate: '2024-01-18',
    dateAdded: '2024-01-20',
    description: {
      en: 'Fourteen-page full acquittal judgment establishing that mere suspicion without audit proof cannot sustain a criminal prosecution.',
      ur: 'خصوصی عدالت کا 14 صفحات پر مشتمل بریت کا فیصلہ جس میں قرار دیا گیا کہ بغیر آڈٹ ثبوت کے محض شبہ سزا کی بنیاد نہیں بن سکتا۔',
    },
    contextNotes: {
      en: 'Certified true copy obtained from Karachi Special Court Copying Section.',
      ur: 'کراچی خصوصی عدالت کے نقول شعبے سے حاصل کردہ مصدقہ نقل۔',
    },
    documentMetadata: {
      docType: 'judgment',
      citationFormat: '2024 CLD 218',
      certifiedCopyStatus: 'certified_official',
      pagesCount: 14,
      downloadAuthorized: true,
      extractText: {
        en: '“The prosecution case rests on conjecture and suspicion rather than verifiable evidentiary material. An acquittal under Section 249-A Cr.P.C. is entered as continuing the trial would amount to abuse of the process of Court.”',
        ur: '”استغاثہ کا مقدمہ ٹھوس شواہد کے بجائے قیاس آرائیوں پر مبنی ہے۔ مزید ٹرائل عدالتی عمل کا ضیاع ہو گا، لہٰذا ملزم کو دفعہ 249-A کے تحت فوری بری کیا جاتا ہے۔“',
      },
    },
    verificationStatus: 'verified_official_record',
    visibility: 'public',
    isDemonstrationData: true,
    category: 'bail_acquittal',
    tags: ['Acquittal', 'Section 249-A', 'Karachi', 'Anti-Corruption'],
  },

  // 9. Video: Court Reporters Association Hearing Summary on Missing Citizen Recovery
  {
    id: 'MED-VID-03',
    title: {
      en: 'Court Reporters Association Briefing: Safe Production of Citizen Ahmed Bilal',
      ur: 'شہری احمد بلال کی بحفاظت بازیابی پر اسلام آباد ہائی کورٹ کے صحافیوں کی رپورٹ',
    },
    mediaType: 'youtube_video',
    associatedCaseIds: ['PK-IHC-2023-0892'],
    associatedCaseSlugs: ['habeas-corpus-missing-citizen-custodial-safeguards'],
    sourceUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    sourcePublisher: {
      en: 'Court Reporters Association Islamabad',
      ur: 'کورٹ رپورٹرز ایسوسی ایشن اسلام آباد',
    },
    eventDate: '2023-10-24',
    publicationDate: '2023-10-24',
    dateAdded: '2023-10-26',
    description: {
      en: 'Verified reporting by accredited High Court beat reporters following the physical production and Section 63 CrPC discharge order.',
      ur: 'شہری کی بحفاظت پیشی اور مقدمے کے اخراج کے بعد اسلام آباد ہائی کورٹ کے مستند صحافیوں کی تصدیق شدہ رپورٹ۔',
    },
    contextNotes: {
      en: 'Focuses on Chief Justice remarks stressing that unacknowledged detentions breach fundamental Article 10 guarantees.',
      ur: 'لاپتہ افراد کے کیس میں چیف جسٹس کے سخت قانونی مشاہدات کی رپورٹنگ۔',
    },
    videoMetadata: {
      youtubeId: 'dQw4w9WgXcQ',
      duration: '19:45',
      privacyEnhancedEmbedUrl: 'https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ',
      embedAllowed: true,
      timestamps: [
        {
          timeInSeconds: 190,
          timecode: '03:10',
          label: {
            en: 'Overview of Chief Justice observations on accountability for secret detention',
            ur: 'لاپتہ شہریوں کے معاملے پر چیف جسٹس کے سخت ریمارکس کا خلاصہ',
          },
        },
        {
          timeInSeconds: 665,
          timecode: '11:05',
          label: {
            en: 'Counsel for family emphasizes supremacy of Article 10 safeguards',
            ur: 'متاثرہ خاندان کے وکیل کا آئین کے آرٹیکل 10 کے تحت تحفظات پر مؤقف',
          },
        },
      ],
    },
    verificationStatus: 'verified_official_record',
    visibility: 'public',
    isDemonstrationData: true,
    category: 'missing_persons',
    tags: ['Islamabad High Court', 'Habeas Corpus', 'Court Reporting'],
  },

  // 10. External Source / Report: Forensic Science Fingerprint Examination Report
  {
    id: 'MED-EXT-01',
    title: {
      en: 'Punjab Forensic Science Agency (PFSA) Examination Report in Inheritance Dispute',
      ur: 'وراثتی تنازع میں پنجاب فارنزک سائنس ایجنسی کی تصدیقی جانچ رپورٹ',
    },
    mediaType: 'external_source',
    associatedCaseIds: ['PK-LHC-2024-0315'],
    associatedCaseSlugs: ['womens-agricultural-land-inheritance-dispute-multan'],
    sourceUrl: 'https://pfsa.gop.pk',
    sourcePublisher: {
      en: 'Punjab Forensic Science Agency (Questioned Documents Division)',
      ur: 'پنجاب فارنزک سائنس ایجنسی (شعبہ دستاویزات و فنگر پرنٹس)',
    },
    eventDate: '2024-02-28',
    publicationDate: '2024-03-02',
    dateAdded: '2024-03-05',
    description: {
      en: 'Official biometric and thumbprint comparative analysis requisitioned by the High Court Multan Bench.',
      ur: 'لاہور ہائی کورٹ ملتان بینچ کے حکم پر تیار کردہ فارنزک انگلیوں کے نشانات کی تفصیلی رپورٹ۔',
    },
    contextNotes: {
      en: 'Concluded that thumb impressions on disputed relinquishment deeds were non-identical to female heirs biometric cards.',
      ur: 'رپورٹ میں تصدیق کی گئی کہ دستبرداری پر موجود انگوٹھوں کے نشانات متاثرہ بہنوں کے بائیومیٹرک سے مطابقت نہیں رکھتے۔',
    },
    verificationStatus: 'verified_official_record',
    visibility: 'public',
    isDemonstrationData: true,
    category: 'women_children',
    tags: ['Forensic Analysis', 'PFSA', 'Inheritance', 'Multan Bench'],
  },
];

// Helper maps
export const mediaMapById = new Map<string, MediaItem>(
  allMediaRecords.map((m) => [m.id, m])
);

export function getMediaByCaseId(caseId: string): MediaItem[] {
  return allMediaRecords.filter((m) => m.associatedCaseIds.includes(caseId));
}

export function getMediaByType(type: MediaItem['mediaType']): MediaItem[] {
  return allMediaRecords.filter((m) => m.mediaType === type);
}
