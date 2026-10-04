import { CaseRecord } from '../../types';

export const case02: CaseRecord = {
  id: 'PK-LHC-2023-0451',
  slug: 'post-arrest-bail-peaceful-protest-assembly-charges',
  caseNumber: 'Crl. Misc. No. 451-B/2023',
  title: {
    en: 'Malik Tariq & 14 Others v. The State (Post-Arrest Bail in Public Order Case)',
    ur: 'ملک طارق وغیرہ بنام سرکار (امن و امان کے مقدمے میں بعد از گرفتاری ضمانت)',
  },
  summary: {
    en: 'Petitioners arrested during a peaceful civil liberties march were granted post-arrest bail under Section 497 CrPC. The Court held that Section 144 restrictions do not justify indefinite preventive incarceration without overt violence.',
    ur: 'پرامن ریلی میں شریک 14 افراد کی دفعہ 497 کے تحت بعد از گرفتاری ضمانت منظور۔ عدالت نے قرار دیا کہ دفعہ 144 کے نفاذ کی آڑ میں شہریوں کو بلاجواز قید نہیں رکھا جا سکتا۔',
  },
  factualBackground: {
    en: 'In November 2023, local law enforcement apprehended fifteen demonstration organizers following an unapproved civic rights march in Rawalpindi. The trial magistrate refused bail under Section 188 PPC. Upon approaching the High Court, defense counsel demonstrated that no firearms or weapon recoveries were alleged and video footage showed peaceful assembly.',
    ur: 'نومبر 2023 میں راولپنڈی میں پرامن مظاہرے کے منتظمین کو حراست میں لیا گیا۔ مجسٹریٹ نے ضمانت مسترد کی جس پر ہائی کورٹ سے رجوع کیا گیا۔ عدالتِ عالیہ کے سامنے ثابت ہوا کہ مظاہرین سے کوئی اسلحہ برآمد نہیں ہوا اور احتجاج پرامن تھا۔',
  },
  recordType: 'court_case',
  categories: ['bail_acquittal', 'arrest_detention', 'human_rights'],
  location: {
    province: 'punjab',
    district: 'Rawalpindi',
    city: 'Rawalpindi',
    incidentLocation: {
      en: 'Murree Road / Press Club Area, Rawalpindi',
      ur: 'مری روڈ و پریس کلب ایریا، راولپنڈی',
    },
  },
  incidentDate: '2023-11-02',
  filingDate: '2023-11-04',
  court: {
    en: 'Lahore High Court, Rawalpindi Bench',
    ur: 'لاہور ہائی کورٹ، راولپنڈی بینچ',
  },
  courtLevel: 'high_court',
  bench: {
    en: 'Single Bench (Hon. Justice K. Mahmood)',
    ur: 'سنگل بینچ (فاضل جج جناب جسٹس کے۔ محمود)',
  },
  statutoryProvisions: [
    'Code of Criminal Procedure (CrPC) 1898: Section 497 (Bail Provisions)',
    'Pakistan Penal Code (PPC) 1860: Section 188 (Disobedience to Order)',
    'Constitution of Pakistan, 1973: Article 16 (Freedom of Assembly)',
  ],
  parties: [
    {
      id: 'pty-201',
      name: {
        en: 'Malik Tariq and 14 Civic Rally Organizers',
        ur: 'ملک طارق اور پرامن ریلی کے 14 منتظمین',
      },
      role: 'accused',
    },
    {
      id: 'pty-202',
      name: {
        en: 'The State through District Police Officer & Local Administration',
        ur: 'سرکار بذریعہ ڈسٹرکٹ پولیس آفیسر و ضلعی انتظامیہ',
      },
      role: 'state',
    },
  ],
  proceduralStatus: 'bail_granted',
  proceduralStatusNotes: {
    en: 'Post-arrest bail granted subject to surety bonds of PKR 100,000 each. Trial on the merits remains pending before Sessions Court.',
    ur: 'ضمانتی مچلکوں پر بعد از گرفتاری ضمانت منظور۔ اصل ٹرائل سیشن عدالت میں تاحال زیرِ سماعت ہے۔',
  },
  legalQuestion: {
    en: 'Whether participation in an unregistered peaceful political demonstration entails non-bailable penal liability under Sections 186 and 188 of Pakistan Penal Code.',
    ur: 'کیا غیر رجسٹرڈ ریلی میں پرامن شرکت پر تعزیراتِ پاکستان کی دفعہ 186 اور 188 کے تحت ناقابلِ ضمانت حراست میں رکھا جا سکتا ہے؟',
  },
  timeline: [
    {
      id: 'tm-201',
      date: '2023-11-02',
      event: { en: 'FIR registered and petitioners taken into custody', ur: 'ایف آئی آر کا اندراج اور 14 افراد کی حراست' },
      proceduralOutcome: { en: 'Remanded to judicial lockup', ur: 'عدالتی تحویل میں جیل بھیجا گیا' },
      statusEffect: 'under_investigation',
    },
    {
      id: 'tm-202',
      date: '2023-12-19',
      event: { en: 'Post-arrest bail granted by Lahore High Court', ur: 'لاہور ہائی کورٹ سے بعد از گرفتاری ضمانت منظور' },
      bench: { en: 'Hon. Justice K. Mahmood', ur: 'جسٹس کے۔ محمود' },
      proceduralOutcome: {
        en: 'Release ordered upon surety bonds; trial on merits continues before Sessions Court',
        ur: 'ضمانتی مچلکے داخل کرنے پر رہائی؛ سیشن عدالت میں اصل ٹرائل تاحال جاری',
      },
      statusEffect: 'bail_granted',
      documentId: 'doc-lhc-451-bail',
    },
  ],
  evidenceItems: [
    {
      id: 'ev-201',
      claimOrFact: {
        en: 'Prosecution claimed protesters blocked major highway and obstructed public servants in performance of duty.',
        ur: 'استغاثہ کا الزام تھا کہ مظاہرین نے سڑک بلاک کی اور سرکاری اہلکاروں کی کار سرکار میں مداخلت کی۔',
      },
      nature: 'allegation',
      sourceName: { en: 'FIR No. 342/2023, Civil Lines Police Station', ur: 'ایف آئی آر نمبر 342/2023، تھانہ سول لائنز' },
      date: '2023-11-02',
      verifiedByCourt: false,
    },
    {
      id: 'ev-202',
      claimOrFact: {
        en: 'High Court verified that petitioners carried peaceful placards with no weapons recovery or physical injury to police.',
        ur: 'ہائی کورٹ کے سامنے ثابت ہوا کہ مظاہرین کے پاس بینرز تھے اور کوئی اسلحہ برآمد نہیں ہوا۔',
      },
      nature: 'court_finding',
      sourceName: { en: 'High Court Bail Order, PLD 2024 Lah 115, Para 6', ur: 'لاہور ہائی کورٹ ضمانت کا تحریری فیصلہ' },
      date: '2023-12-19',
      citation: 'PLD 2024 Lah 115',
      verifiedByCourt: true,
    },
  ],
  connectedDocuments: [
    {
      id: 'doc-lhc-451-bail',
      title: {
        en: 'Certified Bail Order under Section 497 CrPC',
        ur: 'دفعہ 497 ضابطہ فوجداری کے تحت مصدقہ ضمانت کا آرڈر',
      },
      docketNumber: 'Crl. Misc. No. 451-B/2023',
      court: { en: 'Lahore High Court', ur: 'لاہور ہائی کورٹ' },
      date: '2023-12-19',
      citationFormat: 'PLD 2024 Lah 115',
      docType: 'bail_order',
      certifiedCopy: true,
      pagesCount: 6,
      extractText: {
        en: '“Grant of bail is the rule and refusal an exception in cases not falling within the prohibitory clause of Section 497 Cr.P.C. Peaceful citizens exercising political assembly cannot be subjected to punitive pre-trial incarceration.”',
        ur: '”ایسے جرائم جن پر دفعہ 497 کی ممنوعہ شق کا اطلاق نہ ہو، ان میں ضمانت حق اور انکار استثنا ہے۔ پرامن سیاسی اجتماع میں شریک شہریوں کو قبل از ٹرائل سزا کے طور پر جیل میں نہیں رکھا جا سکتا۔“',
      },
    },
  ],
  videoEvidence: [
    {
      id: 'vid-201',
      title: {
        en: 'Legal Counsel Briefing outside High Court following Bail Verdict',
        ur: 'ہائی کورٹ کے باہر ضمانت کے فیصلے کے بعد وکلاء کی پریس بریفنگ',
      },
      youtubeId: 'dQw4w9WgXcQ',
      channel: 'High Court Bar Association Legal Desk',
      recordedDate: '2023-12-19',
      duration: '14:30',
      verificationNotes: {
        en: 'Recorded outside Lahore High Court Rawalpindi Bench. Defense counsel clarifies distinction that bail is an interim procedural relief and the trial remains pending.',
        ur: 'لاہور ہائی کورٹ بینچ کے باہر ریکارڈ شدہ بیان۔ وکیل صفائی نے واضح کیا کہ ضمانت ایک عبوری ریلیف ہے اور ٹرائل ابھی باقی ہے۔',
      },
      keyTranscriptPoints: [
        {
          en: '02:15 - Counsel summarizes judge’s remarks regarding the right to peaceful protest under Article 16.',
          ur: '02:15 - وکیل نے آئین کے آرٹیکل 16 کے تحت حقِ احتجاج پر عدالت کے ریمارکس کی وضاحت کی۔',
        },
      ],
      verificationBadge: 'official_briefing',
    },
  ],
  sources: [
    {
      id: 'src-201',
      type: 'court_transcript',
      title: { en: 'PLD 2024 Lahore 115 Certified Copy', ur: 'پی ایل ڈی 2024 لاہور 115 مصدقہ نقل' },
      issuingInstitution: { en: 'Pakistan Law Decisions', ur: 'پاکستان لا ڈیسیزنز' },
      publicationDate: '2024-01-10',
    },
  ],
  lastUpdated: '2023-12-19',
  editorialReviewStatus: 'verified_official_record',
  incompleteNotice: false,
  unverifiedNotice: false,
  relatedCaseIds: ['PK-SC-2024-0102'],
  tags: ['Section 497', 'Bail', 'Article 16', 'Lahore High Court', 'Peaceful Assembly'],
  isDemonstrationData: true,
  featured: true,
};
