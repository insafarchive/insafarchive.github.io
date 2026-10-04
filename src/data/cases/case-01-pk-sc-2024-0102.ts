import { CaseRecord } from '../../types';

export const case01: CaseRecord = {
  id: 'PK-SC-2024-0102',
  slug: 'freedom-of-speech-digital-media-contempt-petition',
  caseNumber: 'Const. P. 102/2024',
  title: {
    en: 'Federation of Pakistan v. Digital Journalists Coalition (Freedom of Expression Review)',
    ur: 'وفاقِ پاکستان بنام ڈیجیٹل جرنلسٹس کولیشن (آزادی اظہارِ رائے پر نظرِ ثانی درخواست)',
  },
  summary: {
    en: 'Constitutional petition under Article 184(3) challenging executive content moderation directives and arbitrary summons issued to investigative reporters under Section 20 of PECA.',
    ur: 'آئین کے آرٹیکل 184(3) کے تحت دائر کی گئی آئینی درخواست جس میں پیکا ایکٹ کی دفعہ 20 کے تحت صحافیوں کو جاری کیے گئے غیر قانونی نوٹسز اور انٹرنیٹ سنسرشپ کے اقدامات کو چیلنج کیا گیا ہے۔',
  },
  factualBackground: {
    en: 'In early 2024, investigative reporters and independent digital journalists filed a joint constitutional review challenging summonses issued by cybercrime authorities without prior judicial warrants. The petition contends that criminal defamation provisions cannot be deployed to stifle legitimate constitutional inquiry.',
    ur: 'سال 2024 کے اوائل میں تفتیشی صحافیوں نے عدالتی وارنٹ کے بغیر جاری کیے گئے سمنز کیخلاف سپریم کورٹ میں رٹ دائر کی۔ درخواست گزاروں کے مطابق ہتکِ عزت کے فوجداری قوانین کو صحافتی فرائض کی راہ میں رکاوٹ نہیں بنایا جا سکتا۔',
  },
  recordType: 'court_case',
  categories: ['court_judgments', 'human_rights', 'public_interest_political'],
  location: {
    province: 'islamabad_ict',
    city: 'Islamabad',
    incidentLocation: {
      en: 'Supreme Court Principal Seat, Islamabad',
      ur: 'سپریم کورٹ پرنسپل سیٹ، اسلام آباد',
    },
  },
  incidentDate: '2024-02-14',
  filingDate: '2024-02-14',
  court: {
    en: 'Supreme Court of Pakistan',
    ur: 'سپریم کورٹ آف پاکستان',
  },
  courtLevel: 'supreme_court',
  bench: {
    en: 'Three-Member Constitutional Bench (CJP presiding)',
    ur: 'تین رکنی آئینی بینچ (سربراہی چیف جسٹس آف پاکستان)',
  },
  statutoryProvisions: [
    'Constitution of Pakistan, 1973: Article 19 (Freedom of Speech)',
    'Constitution of Pakistan, 1973: Article 19-A (Right to Information)',
    'Prevention of Electronic Crimes Act (PECA) 2016: Section 20',
  ],
  parties: [
    {
      id: 'pty-01',
      name: {
        en: 'Digital Journalists Coalition of Pakistan',
        ur: 'ڈیجیٹل جرنلسٹس کولیشن آف پاکستان',
      },
      role: 'petitioner',
    },
    {
      id: 'pty-02',
      name: {
        en: 'Federation of Pakistan through Ministry of Interior & FIA Cybercrime Wing',
        ur: 'وفاقِ پاکستان بذریعہ وزارتِ داخلہ و سائبر کرائم ونگ',
      },
      role: 'respondent',
    },
  ],
  proceduralStatus: 'pending_trial',
  proceduralStatusNotes: {
    en: 'Interim restraining order in field barring coercive summons pending disposal.',
    ur: 'کارروائی مکمل ہونے تک ہراساں کرنے اور گرفتاری پر حکمِ امتناع برقرار ہے۔',
  },
  legalQuestion: {
    en: 'Whether executive agencies possess statutory authority to issue criminal defamation summons to accredited journalists without prior judicial warrant under Articles 19 and 19-A.',
    ur: 'کیا آئین کے آرٹیکل 19 اور 19-A کے تحت سرکاری ادارے عدالتی اجازت کے بغیر صحافیوں کو فوجداری سمن جاری کرنے کا قانونی اختیار رکھتے ہیں؟',
  },
  timeline: [
    {
      id: 'tm-01',
      date: '2024-02-14',
      event: {
        en: 'Constitutional petition filed under Article 184(3)',
        ur: 'آرٹیکل 184(3) کے تحت آئینی درخواست دائر',
      },
      proceduralOutcome: {
        en: 'Registrar cleared objections; placed before Bench',
        ur: 'رجسٹرار نے اعتراضات دور کر کے بینچ کے سامنے مقرر کی',
      },
      statusEffect: 'pending_trial',
    },
    {
      id: 'tm-02',
      date: '2024-03-12',
      event: {
        en: 'Interim protective injunction granted',
        ur: 'حفاظتی عبوری حکم نامہ جاری',
      },
      bench: {
        en: 'Supreme Court 3-Member Bench',
        ur: 'سپریم کورٹ کا تین رکنی بینچ',
      },
      proceduralOutcome: {
        en: 'Coercive action stayed; notices issued to Federal Government',
        ur: 'گرفتاری سے روک دیا گیا؛ وفاقی حکومت کو نوٹس جاری',
      },
      statusEffect: 'pending_trial',
      documentId: 'doc-sc-102-interim',
    },
  ],
  evidenceItems: [
    {
      id: 'ev-01',
      claimOrFact: {
        en: 'Federal Agency alleges online broadcasts circulated malicious disinformation intended to subvert public confidence.',
        ur: 'ایف آئی اے کا الزام ہے کہ آن لائن ویڈیوز میں اداروں کے خلاف منفی پروپیگنڈا کیا گیا۔',
      },
      nature: 'allegation',
      sourceName: {
        en: 'FIA Cybercrime Wing Investigation Report',
        ur: 'ایف آئی اے سائبر کرائم رپورٹ',
      },
      date: '2024-02-28',
      verifiedByCourt: false,
    },
    {
      id: 'ev-02',
      claimOrFact: {
        en: 'Attorney General conceded in open court that Section 20 operational summons mechanisms required formal guidelines.',
        ur: 'اٹارنی جنرل نے کھلی عدالت میں تسلیم کیا کہ دفعہ 20 کے تحت سمن بھیجنے کا طریقہ کار واضح نہیں۔',
      },
      nature: 'court_finding',
      sourceName: {
        en: 'Official Supreme Court Stenographic Hearing Record',
        ur: 'سپریم کورٹ کی تحریری عدالتی کارروائی',
      },
      date: '2024-04-15',
      citation: '2024 SCMR 301 (Interim)',
      verifiedByCourt: true,
    },
  ],
  connectedDocuments: [
    {
      id: 'doc-sc-102-interim',
      title: {
        en: 'Interim Order Sheet on Fundamental Rights to Freedom of Information',
        ur: 'آزادی معلومات و بنیادی حقوق پر عبوری آرڈر شیٹ',
      },
      docketNumber: 'Const. P. 102/2024',
      court: { en: 'Supreme Court of Pakistan', ur: 'سپریم کورٹ آف پاکستان' },
      date: '2024-03-12',
      citationFormat: '2024 SCMR 301 (Interim)',
      docType: 'order_sheet',
      certifiedCopy: true,
      pagesCount: 8,
      extractText: {
        en: '“Article 19 and 19-A are the bedrock of democratic accountability. The coercive apparatus of the State cannot be lightly deployed to muzzle critical inquiry without rigorous adherence to statutory due process under Article 10-A.”',
        ur: '”آئین کے آرٹیکلز 19 اور 19-A جمہوری احتساب کی بنیاد ہیں۔ قانون کی منشا اور شفاف ٹرائل کے تقاضوں کے بغیر ریاستی طاقت کو تنقیدی آوازوں کو دبانے کے لیے استعمال نہیں کیا جا سکتا۔“',
      },
    },
  ],
  videoEvidence: [
    {
      id: 'vid-01',
      title: {
        en: 'Supreme Court Hearing Audio-Visual Proceedings (Official Live Stream Archive)',
        ur: 'سپریم کورٹ کی سماعت کی باضابطہ ویڈیو و صوتی ریکارڈنگ',
      },
      youtubeId: 'dQw4w9WgXcQ',
      channel: 'Supreme Court of Pakistan Official Public Broadcast',
      recordedDate: '2024-04-15',
      duration: '42:15',
      verificationNotes: {
        en: 'Official live-stream feed broadcast through the Supreme Court of Pakistan website portal pursuant to open court directives.',
        ur: 'سپریم کورٹ کی کھلی عدالت کی کارروائی کا باضابطہ لائیو نشریاتی ریکارڈ۔',
      },
      keyTranscriptPoints: [
        {
          en: '04:12 - Chief Justice questions Federal Counsel on threshold of summons issuance under Section 20.',
          ur: '04:12 - چیف جسٹس نے استفسار کیا کہ کن شواہد کی بنیاد پر صحافیوں کو طلب کیا گیا۔',
        },
        {
          en: '18:40 - Senior Advocate presents comparative constitutional jurisprudence on digital speech.',
          ur: '18:40 - سینئر وکیل نے آزادی اظہار رائے پر بین الاقوامی عدالتی نظائر پیش کیں۔',
        },
      ],
      verificationBadge: 'certified_stream',
    },
  ],
  sources: [
    {
      id: 'src-01',
      type: 'court_transcript',
      title: {
        en: 'Supreme Court Order Sheet Const. P. 102/2024',
        ur: 'سپریم کورٹ آرڈر شیٹ درخواست نمبر 102/2024',
      },
      issuingInstitution: {
        en: 'Supreme Court Registry',
        ur: 'رجسٹرار سپریم کورٹ آف پاکستان',
      },
      publicationDate: '2024-03-12',
      verificationNotes: {
        en: 'Certified document examined and verified against official gazette copy.',
        ur: 'مصدقہ عدالتی نقل کی جانچ پڑتال مکمل ہے۔',
      },
    },
  ],
  lastUpdated: '2024-09-18',
  editorialReviewStatus: 'verified_official_record',
  incompleteNotice: false,
  unverifiedNotice: false,
  relatedCaseIds: ['PK-LHC-2023-0451'],
  tags: ['Article 19', 'PECA', 'Freedom of Expression', 'Supreme Court', 'Journalism Rights'],
  isDemonstrationData: true,
  featured: true,
};
