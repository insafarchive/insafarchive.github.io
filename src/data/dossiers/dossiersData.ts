/**
 * INSAF ARCHIVE (انصاف آرکائیو)
 * Master Archival Dossiers Registry — Version 1.0.0
 * 12 Curated Archival Dossiers spanning 6 Core Public-Interest Domains
 */

import type { ArchivalDossier } from '../../types/dossier';

export const ALL_ARCHIVAL_DOSSIERS: ArchivalDossier[] = [
  // =========================================================================
  // 1. CONSTITUTIONAL & LEGAL: MILITARY COURTS
  // =========================================================================
  {
    id: 'dos-pk-legal-military-courts-2023',
    slug: 'supreme-court-rulings-military-courts-civilians-2023',
    domain: 'constitutional_legal',
    title: {
      en: 'Supreme Court Rulings on Military Court Trials of Civilians (Const. Pet. 24/2023)',
      ur: 'عام شہریوں کے فوجی عدالتوں میں ٹرائل پر سپریم کورٹ کے فیصلے (آئینی پٹیشن 24/2023)'
    },
    overview: {
      en: 'Comprehensive constitutional dossier examining the transfer of over 103 civilians to military custody following the 9 May 2023 protests, the Article 184(3) petitions before the Supreme Court, and the landmark 5-member bench ruling declaring Section 2(1)(d) of the Pakistan Army Act ultra vires.',
      ur: '9 مئی 2023ء کے واقعات کے بعد 103 سے زائد شہریوں کے فوجی تحویل میں منتقلی، سپریم کورٹ میں آرٹیکل 184(3) کے تحت دائر پٹیشنز اور آرمی ایکٹ کی دفعہ 2(1)(d) کو غیر آئینی قرار دینے کے 5 رکنی بینچ کے فیصلے کا دستاویزی ریکارڈ۔'
    },
    scopeAndTerminology: {
      en: 'Covers judicial proceedings, constitutional arguments under Articles 9, 10A, 25, and 175, and official executive positions. "Civilian trial" denotes court-martial proceedings against non-military citizens under Section 2(1)(d) of the Army Act 1952.',
      ur: 'اس فائل میں عدالتی کارروائی، آئین کے آرٹیکل 9، 10A، 25 اور 175 کے تحت دلائل اور حکومتی بیانات شامل ہیں۔ "سویلین ٹرائل" سے مراد آرمی ایکٹ 1952 کی دفعہ 2(1)(d) کے تحت عام شہریوں کا کورٹ مارشل ہے۔'
    },
    chronology: [
      {
        date: '2023-05-09',
        dateDisplay: { en: '9 May 2023', ur: '9 مئی 2023ء' },
        title: { en: 'Arrest of Imran Khan & Installation Incidents', ur: 'عمران خان کی گرفتاری اور تنصیبات پر حملے' },
        description: { en: 'Violent incidents at Corps Commander House Lahore and GHQ perimeter gate followed by arrests.', ur: 'لاہور کور کمانڈر ہاؤس اور جی ایچ کیو گیٹ پر ہنگامہ آرائی اور بعد ازاں گرفتاریاں۔' },
        sourceIds: ['src-sc-mil-courts-2023-order'],
        location: { en: 'Lahore & Rawalpindi', ur: 'لاہور و راولپنڈی' }
      },
      {
        date: '2023-05-15',
        dateDisplay: { en: '15 May 2023', ur: '15 مئی 2023ء' },
        title: { en: 'National Security Committee Resolution', ur: 'قومی سلامتی کمیٹی کا فیصلہ' },
        description: { en: 'NSC announced that attacks on military assets would be tried under the Army Act and Official Secrets Act.', ur: 'قومی سلامتی کمیٹی نے عسکری املاک پر حملوں کے ملزمان کے خلاف آرمی ایکٹ اور آفیشل سیکرٹس ایکٹ کے تحت ٹرائل کا اعلان کیا۔' },
        sourceIds: ['src-nsc-press-release-may2023']
      },
      {
        date: '2023-06-20',
        dateDisplay: { en: '20 June 2023', ur: '20 جون 2023ء' },
        title: { en: 'Filing of Article 184(3) Petitions', ur: 'سپریم کورٹ میں آئینی پٹیشنز کا اندراج' },
        description: { en: 'Former Chief Justice Jawwad S. Khawaja, Aitzaz Ahsan, and civil society actors filed petitions challenging military jurisdiction over civilians.', ur: 'سابق چیف جسٹس جواد ایس خواجہ، اعتزاز احسن اور انسانی حقوق کارکنان نے فوجی عدالتوں کے خلاف پٹیشنز دائر کیں۔' },
        sourceIds: ['src-sc-mil-courts-2023-order']
      },
      {
        date: '2023-10-23',
        dateDisplay: { en: '23 October 2023', ur: '23 اکتوبر 2023ء' },
        title: { en: 'Supreme Court 5-Member Bench Short Order', ur: 'سپریم کورٹ 5 رکنی بینچ کا مختصر حکم' },
        description: { en: 'By majority 4-1 (Justice Yahya Afridi dissenting in part), declared Section 2(1)(d) ultra vires and ordered civilian detainees transferred to ordinary criminal courts.', ur: '4-1 کی اکثریت سے دفعہ 2(1)(d) کو غیر آئینی قرار دے کر سویلین مقدمات عام عدالتوں کو بھیجنے کا حکم دیا۔' },
        sourceIds: ['src-sc-mil-courts-2023-order']
      },
      {
        date: '2023-12-13',
        dateDisplay: { en: '13 December 2023', ur: '13 دسمبر 2023ء' },
        title: { en: 'Supreme Court 6-Member Larger Bench Stay Order (ICA 558/2023)', ur: 'سپریم کورٹ 6 رکنی لارجر بینچ کا حکمِ امتناعی (ICA 558/2023)' },
        description: { en: 'A 6-member larger bench headed by Justice Amin-ud-Din Khan suspended the 23 October short order by 5-1 majority pending final disposal of Intra-Court Appeals, permitting military trials to proceed subject to no final sentence without Supreme Court permission.', ur: '6 رکنی بینچ نے 5-1 کی اکثریت سے 23 اکتوبر کے فیصلے کو انٹرا کورٹ اپیلوں کے حتمی فیصلے تک معطل کر دیا۔' },
        sourceIds: ['src-sc-ica-mil-courts-stay-2023']
      }
    ],
    keyActors: [
      {
        actorId: 'act-sc-bench-mil',
        name: { en: '5-Member Supreme Court Bench (headed by Justice Ijaz ul Ahsan)', ur: '5 رکنی سپریم کورٹ بینچ (سربراہی جسٹس اعجاز الاحسن)' },
        roleType: 'judicial_body',
        neutralDescription: { en: 'Judicial bench comprising Justices Ijaz ul Ahsan, Munib Akhtar, Yahya Afridi, Sayyed Mazahar Ali Akbar Naqvi, and Ayesha A. Malik.', ur: 'بینچ میں جسٹس اعجاز الاحسن، جسٹس منیب اختر، جسٹس یحییٰ آفریدی، جسٹس مظاہر علی اکبر نقوی اور جسٹس عائشہ ملک شامل تھے۔' }
      },
      {
        actorId: 'act-sc-ica-bench-mil',
        name: { en: '6-Member Supreme Court ICA Bench (headed by Justice Amin-ud-Din Khan)', ur: '6 رکنی سپریم کورٹ اپیل بینچ (سربراہی جسٹس امین الدین خان)' },
        roleType: 'judicial_body',
        neutralDescription: { en: 'Larger bench hearing Intra-Court Appeals (ICA 558/2023) filed by Federation and Provincial Governments, which issued the 13 December 2023 stay order.', ur: 'انٹرا کورٹ اپیلوں کی سماعت کرنے والا 6 رکنی لارجر بینچ جس نے حکمِ امتناعی جاری کیا۔' }
      },
      {
        actorId: 'act-agp-mansoor-awan',
        name: { en: 'Mansoor Usman Awan (Attorney-General for Pakistan)', ur: 'منصور عثمان اعوان (اٹارنی جنرل برائے پاکستان)' },
        roleType: 'public_official',
        neutralDescription: { en: 'Represented the Federation, presenting assurances regarding procedural safeguards, visits by families, and legal representation in military custody.', ur: 'وفاق کی نمائندگی کرتے ہوئے زیرِ حراست افراد کے قانونی حقوق، وکلاء اور اہلخانہ سے ملاقاتوں کے حوالے سے بیانات دیے۔' }
      }
    ],
    claims: [
      {
        claimId: 'clm-mil-trial-unconst',
        findingType: 'court_finding',
        assertion: {
          en: 'Supreme Court 5-member bench held in its 23 October 2023 short order that civilians cannot be subjected to court-martial proceedings without violating Articles 9, 10A, and 175; this order was subsequently suspended on 13 December 2023 pending Intra-Court Appeals.',
          ur: 'سپریم کورٹ کے 5 رکنی بینچ نے 23 اکتوبر 2023ء کے مختصر حکم میں سویلین ٹرائل کو غیر آئینی قرار دیا؛ یہ حکم بعد میں 13 دسمبر 2023ء کو انٹرا کورٹ اپیلوں کے حتمی فیصلے تک معطل کر دیا گیا۔'
        },
        attributedParty: { en: 'Supreme Court 5-Member Bench (Const. Pet. 24/2023)', ur: 'سپریم کورٹ 5 رکنی بینچ' },
        sourceIds: ['src-sc-mil-courts-2023-order', 'src-sc-ica-mil-courts-stay-2023']
      },
      {
        claimId: 'clm-mil-custody-quantum',
        findingType: 'official_position',
        assertion: {
          en: 'Attorney-General for Pakistan formally confirmed before the Supreme Court that 103 civilian detainees were transferred to military custody following the 9 May 2023 unrest.',
          ur: 'اٹارنی جنرل برائے پاکستان نے سپریم کورٹ کے روبرو باضابطہ تصدیق کی کہ 9 مئی کے واقعات کے بعد 103 سویلین ملزمان کو فوجی تحویل میں دیا گیا۔'
        },
        attributedParty: { en: 'Attorney-General for Pakistan (Court Record)', ur: 'اٹارنی جنرل برائے پاکستان (عدالتی ریکارڈ)' },
        sourceIds: ['src-sc-mil-courts-2023-order']
      },
      {
        claimId: 'clm-mil-ica-stay-order',
        findingType: 'court_finding',
        assertion: {
          en: 'A 6-member larger bench of the Supreme Court suspended the 23 October 2023 short order by a 5-1 majority in ICA 558/2023, permitting military trial proceedings to proceed conditionally without pronouncement of final sentence without court leave.',
          ur: 'سپریم کورٹ کے 6 رکنی لارجر بینچ نے انٹرا کورٹ اپیل 558/2023 میں 5-1 کی اکثریت سے 23 اکتوبر کے فیصلے کو معطل کیا اور پیشگی اجازت کے بغیر حتمی سزا نہ سنانے کی شرط پر کارروائی جاری رکھنے کی اجازت دی۔'
        },
        attributedParty: { en: 'Supreme Court 6-Member Appellate Bench (ICA 558/2023)', ur: 'سپریم کورٹ 6 رکنی اپیل بینچ' },
        sourceIds: ['src-sc-ica-mil-courts-stay-2023']
      },
      {
        claimId: 'clm-mil-nsc-resolution',
        findingType: 'official_position',
        assertion: {
          en: 'National Security Committee resolved on 16 May 2023 that attacks on military assets would be tried under the Pakistan Army Act 1952 and Official Secrets Act 1923.',
          ur: 'قومی سلامتی کمیٹی نے 16 مئی 2023ء کے اجلاس میں عسکری تنصیبات پر حملوں کے مقدمات آرمی ایکٹ اور آفیشل سیکرٹس ایکٹ کے تحت چلانے کا فیصلہ کیا۔'
        },
        attributedParty: { en: 'National Security Committee Communiqué', ur: 'قومی سلامتی کمیٹی اعلامیہ' },
        sourceIds: ['src-nsc-press-release-may2023']
      }
    ],
    officialPositions: [
      {
        positionId: 'pos-fed-defense-mil-courts',
        institutionOrParty: { en: 'Federation of Pakistan / Ministry of Defence', ur: 'وفاقِ پاکستان / وزارتِ دفاع' },
        statementDate: '2023-07-18',
        summary: {
          en: 'Federation maintained that Section 2(1)(d) was valid law applicable to offenses against military installations and protected national security.',
          ur: 'وفاقی حکومت کا مؤقف تھا کہ دفعہ 2(1)(d) قانونی طور پر نافذ العمل ہے اور عسکری تنصیبات پر حملوں کے خلاف ملکی دفاع کے لیے ضروری ہے۔'
        },
        sourceId: 'src-sc-mil-courts-2023-order',
        isDenialOrDefense: true
      }
    ],
    courtFindings: [
      {
        findingId: 'cf-mil-courts-23oct',
        courtName: { en: 'Supreme Court of Pakistan', ur: 'سپریم کورٹ آف پاکستان' },
        caseCitation: 'Const. Petition No. 24 of 2023',
        orderDate: '2023-10-23',
        benchMembers: [
          { en: 'Justice Ijaz ul Ahsan', ur: 'جسٹس اعجاز الاحسن' },
          { en: 'Justice Munib Akhtar', ur: 'جسٹس منیب اختر' },
          { en: 'Justice Yahya Afridi', ur: 'جسٹس یحییٰ آفریدی' },
          { en: 'Justice Sayyed Mazahar Ali Akbar Naqvi', ur: 'جسٹس سید مظاہر علی اکبر نقوی' },
          { en: 'Justice Ayesha A. Malik', ur: 'جسٹس عائشہ اے ملک' }
        ],
        rulingSummary: {
          en: 'Section 2(1)(d)(i) and (ii) and Section 59(4) of the Pakistan Army Act 1952 declared ultra vires by 4-1 majority. Detainees ordered transferred to ordinary courts. (Note: Operation of this short order stayed by 6-member bench on 13 December 2023 in ICA 558/2023).',
          ur: 'پاکستان آرمی ایکٹ کی دفعات 2(1)(d) اور 59(4) کو 4-1 کی اکثریت سے کالعدم قرار دیا گیا۔ (نوٹ: اس مختصر حکم پر 13 دسمبر 2023ء کو 6 رکنی بینچ نے حکمِ امتناعی جاری کیا)۔'
        },
        sourceId: 'src-sc-mil-courts-2023-order'
      },
      {
        findingId: 'cf-mil-courts-13dec-ica-stay',
        courtName: { en: 'Supreme Court of Pakistan (Appellate Bench)', ur: 'سپریم کورٹ آف پاکستان (اپیل بینچ)' },
        caseCitation: 'Intra-Court Appeal No. 558 of 2023',
        orderDate: '2023-12-13',
        benchMembers: [
          { en: 'Justice Amin-ud-Din Khan', ur: 'جسٹس امین الدین خان' },
          { en: 'Justice Muhammad Ali Mazhar', ur: 'جسٹس محمد علی مظہر' },
          { en: 'Justice Syed Hasan Azhar Rizvi', ur: 'جسٹس سید حسن اظہر رضوی' },
          { en: 'Justice Shahid Waheed', ur: 'جسٹس شاہد وحید' },
          { en: 'Justice Musarrat Hilali', ur: 'جسٹس مسرت ہلالی' },
          { en: 'Justice Irfan Saadat Khan', ur: 'جسٹس عرفان سعادت خان' }
        ],
        rulingSummary: {
          en: 'Suspended the operation of the 23 October 2023 short order by 5-1 majority (Justice Musarrat Hilali dissenting), allowing military court proceedings to continue with the caveat that final judgments/sentences shall not be pronounced without Supreme Court leave.',
          ur: '23 اکتوبر کے فیصلے کو 5-1 کی اکثریت سے معطل کرتے ہوئے فوجی عدالتوں کو کارروائی جاری رکھنے کی اجازت دی، بشرطیکہ حتمی سزا سپریم کورٹ کی پیشگی اجازت کے بغیر جاری نہ کی جائے۔'
        },
        sourceId: 'src-sc-ica-mil-courts-stay-2023'
      }
    ],
    mediaArchive: [],
    constitutionalProvisions: ['PK-CONST-A009', 'PK-CONST-A010A', 'PK-CONST-A025', 'PK-CONST-A175'],
    relatedRecordIds: ['rec-pk-legal-military-courts-civilians-2023', 'rec-pk-event-may-09-protests-2023'],
    unresolvedQuestions: [
      {
        en: 'The Intra-Court Appeals (ICAs) before the Supreme Court larger bench remain pending for final judgment; civilian trials are subject to interim conditional stay parameters.',
        ur: 'سپریم کورٹ کے لارجر بینچ کے سامنے انٹرا کورٹ اپیلوں کا حتمی فیصلہ تاحال زیرِ التواء ہے۔'
      }
    ],
    sources: [
      {
        sourceId: 'src-sc-mil-courts-2023-order',
        sourceType: 'court_order',
        title: { en: 'Jawwad S. Khawaja & Others v Federation of Pakistan (Const. Pet. 24/2023 Short Order)', ur: 'جواد ایس خواجہ بنام وفاقِ پاکستان — آئینی پٹیشن 24/2023 مختصر حکم' },
        publisher: { en: 'Supreme Court of Pakistan', ur: 'سپریم کورٹ آف پاکستان' },
        publisherOrIssuingAuthority: 'Supreme Court of Pakistan',
        publicationDate: { dateString: '2023-10-23', precision: 'day', formattedDisplay: { en: 'October 23, 2023', ur: '23 اکتوبر 2023ء' } },
        judgmentDate: '2023-10-23',
        documentIdentifier: 'Const. Pet. 24/2023',
        pageOrParagraph: 'Paragraphs 1-4 (Operative Short Order)',
        officialUrl: 'https://www.supremecourt.gov.pk/downloads_judgements/c.p._24_2023.pdf',
        originalUrl: 'https://www.supremecourt.gov.pk/downloads_judgements/c.p._24_2023.pdf',
        language: 'en',
        verificationTier: 'primary_verified',
        verificationStatus: 'primary_source',
        sourceAvailability: 'accessible',
        authenticityStatus: 'official_document',
        reviewerNotes: 'Official short order inspected on the official Supreme Court portal.'
      },
      {
        sourceId: 'src-sc-ica-mil-courts-stay-2023',
        sourceType: 'court_order',
        title: { en: 'Federation of Pakistan & Others v Jawwad S. Khawaja & Others (ICA 558/2023 Interim Order)', ur: 'وفاقِ پاکستان بنام جواد ایس خواجہ — انٹرا کورٹ اپیل 558/2023 عبوری حکم' },
        publisher: { en: 'Supreme Court of Pakistan', ur: 'سپریم کورٹ آف پاکستان' },
        publisherOrIssuingAuthority: 'Supreme Court of Pakistan',
        publicationDate: { dateString: '2023-12-13', precision: 'day', formattedDisplay: { en: 'December 13, 2023', ur: '13 دسمبر 2023ء' } },
        judgmentDate: '2023-12-13',
        documentIdentifier: 'ICA No. 558 of 2023',
        pageOrParagraph: 'Order dated 13 December 2023 (Stay of Short Order by 5-1 Majority)',
        officialUrl: 'https://www.supremecourt.gov.pk',
        language: 'en',
        verificationTier: 'primary_verified',
        verificationStatus: 'primary_source',
        sourceAvailability: 'accessible',
        authenticityStatus: 'official_document',
        reviewerNotes: 'Official ICA interim stay order sheet inspected.'
      },
      {
        sourceId: 'src-nsc-press-release-may2023',
        sourceType: 'government_document',
        title: { en: 'National Security Committee Meeting Communiqué (16 May 2023)', ur: 'قومی سلامتی کمیٹی اجلاس کا اعلامیہ (16 مئی 2023ء)' },
        publisher: { en: 'Prime Minister\'s Office, Pakistan', ur: 'وزیراعظم ہاؤس پاکستان' },
        publisherOrIssuingAuthority: 'Prime Minister\'s Office, Pakistan',
        publicationDate: { dateString: '2023-05-16', precision: 'day', formattedDisplay: { en: 'May 16, 2023', ur: '16 مئی 2023ء' } },
        language: 'en',
        verificationTier: 'primary_verified',
        verificationStatus: 'source_reviewed',
        sourceAvailability: 'accessible',
        authenticityStatus: 'official_document',
        reviewerNotes: 'Official PMO press communiqué.'
      }
    ],
    editorialStatus: 'under_review',
    verificationStatus: 'corroborated',
    legalProceedingStatus: 'stayed',
    hasActiveReportingBan: false,
    pendingProceedingsNotice: {
      en: 'Notice of Pending Proceedings (Sub Judice): The Supreme Court 5-member short order of 23 October 2023 striking down military trials was stayed by a 5-1 majority of a 6-member bench on 13 December 2023 in ICA 558/2023. Proceedings remain sub judice pending final appellate determination.',
      ur: 'عدالتی کارروائی کے زیرِ التواء ہونے کا نوٹس: سپریم کورٹ کے 5 رکنی بینچ کے 23 اکتوبر 2023ء کے فیصلے کو 6 رکنی لارجر بینچ نے 13 دسمبر 2023ء کو انٹرا کورٹ اپیل 558/2023 میں 5-1 کی اکثریت سے معطل کیا۔ حتمی فیصلے تک یہ معاملہ عدالت عظمیٰ کے روبرو زیرِ سماعت ہے۔'
    },
    lastLegalStatusChecked: '2024-03-25',
    privacyReview: {
      hasSensitivePersonalData: false,
      piiRedacted: true,
      allegationsDistinguishedFromFindings: true,
      officialDenialsIncluded: true,
      riskAssessment: 'low',
      lastReviewedDate: '2024-02-15',
      reviewerNotes: 'Downgraded to under_review: The 23 October 2023 short order is subject to an operative stay order granted on 13 December 2023 by a 6-member bench in ICA 558/2023 pending final appeal disposal.'
    },
    featuredRecordId: 'rec-pk-legal-military-courts-civilians-2023',
    recordCount: 2,
    iconName: 'Scale',
    tagColor: '#3B82F6',
    version: 1,
    createdAt: '2023-10-25T00:00:00Z',
    updatedAt: '2024-02-15T00:00:00Z'
  },

  // =========================================================================
  // 2. CONSTITUTIONAL & LEGAL: NATIONAL ASSEMBLY DISSOLUTION (PLD 2022 SC 574)
  // =========================================================================
  {
    id: 'dos-pk-legal-assembly-dissolution-2022',
    slug: 'supreme-court-national-assembly-dissolution-pld-2022-sc-574',
    domain: 'constitutional_legal',
    title: {
      en: 'National Assembly Dissolution & Restoration Dossier (PLD 2022 SC 574)',
      ur: 'قومی اسمبلی کی تحلیل و بحالی پر سپریم کورٹ کا فیصلہ (PLD 2022 SC 574)'
    },
    overview: {
      en: 'Constitutional dossier documenting the 3 April 2022 ruling of Deputy Speaker Qasim Suri rejecting the vote of no-confidence, President Arif Alvi\'s subsequent dissolution of the National Assembly, the unanimous 5-0 ruling of the Supreme Court of Pakistan setting aside the dissolution, and the restoration of Parliament.',
      ur: '3 اپریل 2022ء کو ڈپٹی اسپیکر کی رولنگ کے ذریعے تحریکِ عدم اعتماد مسترد کرنے، صدر کی جانب سے قومی اسمبلی تحلیل کرنے اور سپریم کورٹ کے 5 رکنی لارجر بینچ کے متفقہ فیصلے کے ذریعے اسمبلی بحال کرنے کا مکمل دستاویزی احاطہ۔'
    },
    scopeAndTerminology: {
      en: 'Focuses on constitutional interpretation of Article 5 (loyalty to state), Article 58 (dissolution), Article 69 (parliamentary immunity), and Article 95 (no-confidence vote).',
      ur: 'اس فائل میں آئین کے آرٹیکل 5 (ریاست سے وفاداری)، آرٹیکل 58 (اسمبلی کی تحلیل)، آرٹیکل 69 (پارلیمانی استثنیٰ) اور آرٹیکل 95 (تحریکِ عدم اعتماد) کی تشریح کا احاطہ کیا گیا ہے۔'
    },
    chronology: [
      {
        date: '2022-03-08',
        dateDisplay: { en: '8 March 2022', ur: '8 مارچ 2022ء' },
        title: { en: 'Submission of No-Confidence Resolution', ur: 'تحریکِ عدم اعتماد کا اندراج' },
        description: { en: 'Opposition parties submitted a motion for a vote of no-confidence against Prime Minister Imran Khan under Article 95.', ur: 'اپوزیشن جماعتوں نے آرٹیکل 95 کے تحت وزیر اعظم کے خلاف تحریکِ عدم اعتماد جمع کرائی۔' },
        sourceIds: ['src-sc-assembly-dissolution-judgment-2022']
      },
      {
        date: '2022-04-03',
        dateDisplay: { en: '3 April 2022', ur: '3 اپریل 2022ء' },
        title: { en: 'Deputy Speaker Ruling & Assembly Dissolution', ur: 'ڈپٹی اسپیکر کی رولنگ اور اسمبلی کی تحلیل' },
        description: { en: 'Deputy Speaker dismissed the motion citing alleged foreign conspiracy and Article 5. Prime Minister advised President to dissolve the National Assembly.', ur: 'ڈپٹی اسپیکر نے بیرونی سازش کے الزام پر تحریک مسترد کی۔ وزیراعظم کی تجویز پر صدر نے اسمبلی تحلیل کی۔' },
        sourceIds: ['src-sc-assembly-dissolution-judgment-2022']
      },
      {
        date: '2022-04-07',
        dateDisplay: { en: '7 April 2022', ur: '7 اپریل 2022ء' },
        title: { en: 'Unanimous Supreme Court Judgment (5-0)', ur: 'سپریم کورٹ کا متفقہ تاریخی فیصلہ (5-0)' },
        description: { en: 'Supreme Court declared Deputy Speaker ruling contrary to Constitution, declared dissolution void ab initio, and restored the Assembly.', ur: 'سپریم کورٹ نے رولنگ اور تحلیل کو غیر آئینی قرار دے کر قومی اسمبلی بحال کی اور ووٹنگ کرانے کا حکم دیا۔' },
        sourceIds: ['src-sc-assembly-dissolution-judgment-2022']
      }
    ],
    keyActors: [
      {
        actorId: 'act-cjp-bandial',
        name: { en: 'Chief Justice Umar Ata Bandial', ur: 'چیف جسٹس عمر عطا بندیال' },
        roleType: 'judicial_body',
        neutralDescription: { en: 'Head of the 5-member bench hearing Suo Motu Case 1/2022 alongside Justices Ijaz ul Ahsan, Mazhar Alam Khan Miankhel, Munib Akhtar, and Jamal Khan Mandokhail.', ur: '5 رکنی بینچ کے سربراہ جنہوں نے 5 روز مسلسل سماعت کے بعد متفقہ فیصلہ تحریر کیا۔' }
      },
      {
        actorId: 'act-qasim-suri',
        name: { en: 'Qasim Khan Suri', ur: 'قاسم خان سوری' },
        roleType: 'public_official',
        officialDesignation: { en: 'Deputy Speaker, National Assembly', ur: 'ڈپٹی اسپیکر، قومی اسمبلی' },
        neutralDescription: { en: 'Presiding officer who delivered the 3 April 2022 ruling dismissing the no-confidence resolution.', ur: '3 اپریل 2022ء کو اجلاس کی صدارت کرنے والے ڈپٹی اسپیکر جنہوں نے رولنگ دی۔' }
      }
    ],
    claims: [
      {
        claimId: 'clm-sc-dissolution-unconst',
        findingType: 'court_finding',
        assertion: {
          en: 'Supreme Court held that the Prime Minister ceases to have power to advise dissolution under Article 58(1) Explanation once a no-confidence resolution is tabled.',
          ur: 'سپریم کورٹ نے قرار دیا کہ آرٹیکل 58(1) کی وضاحت کے تحت تحریکِ عدم اعتماد زیر التواء ہونے پر وزیراعظم اسمبلی تحلیل کرنے کا مشورہ نہیں دے سکتے۔'
        },
        attributedParty: { en: 'Supreme Court 5-Member Bench (PLD 2022 SC 574)', ur: 'سپریم کورٹ 5 رکنی بینچ' },
        sourceIds: ['src-sc-assembly-dissolution-judgment-2022']
      },
      {
        claimId: 'clm-sc-speaker-ruling-void',
        findingType: 'court_finding',
        assertion: {
          en: 'Supreme Court held unanimously (5-0) that Deputy Speaker Qasim Suri\'s ruling dismissing the vote of no-confidence without voting was contrary to the Constitution and void ab initio.',
          ur: 'سپریم کورٹ نے 5-0 سے متفقہ فیصلہ دیا کہ ڈپٹی اسپیکر قاسم سوری کی عدم اعتماد کی تحریک کو مسترد کرنے کی رولنگ غیر آئینی اور کالعدم تھی۔'
        },
        attributedParty: { en: 'Supreme Court of Pakistan (PLD 2022 SC 574)', ur: 'سپریم کورٹ آف پاکستان' },
        sourceIds: ['src-sc-assembly-dissolution-judgment-2022']
      },
      {
        claimId: 'clm-sc-assembly-restoration-order',
        findingType: 'court_finding',
        assertion: {
          en: 'Supreme Court ordered National Assembly restored unconditionally, declaring that the Prime Minister continues in office solely under constitutional duty, and directing the Speaker to convene the session on 9 April 2022.',
          ur: 'سپریم کورٹ نے قومی اسمبلی کو غیر مشروط طور پر بحال کرنے اور اسپیکر کو 9 اپریل 2022ء کو عدم اعتماد پر ووٹنگ کے لیے اجلاس طلب کرنے کا حکم دیا۔'
        },
        attributedParty: { en: 'Supreme Court 5-Member Bench (PLD 2022 SC 574)', ur: 'سپریم کورٹ 5 رکنی بینچ' },
        sourceIds: ['src-sc-assembly-dissolution-judgment-2022']
      }
    ],
    officialPositions: [
      {
        positionId: 'pos-pti-cypher-defense',
        institutionOrParty: { en: 'PTI Legal Counsel & Government Position', ur: 'پی ٹی آئی وکلاء اور وفاقی حکومت کا مؤقف' },
        statementDate: '2022-04-05',
        summary: {
          en: 'Counsel argued that Article 69 creates a constitutional bar against judicial review of internal parliamentary proceedings.',
          ur: 'حکومتی وکلاء نے مؤقف اپنایا کہ آئین کا آرٹیکل 69 پارلیمنٹ کے اندرونی طریقہ کار کو عدالتی جائزے سے استثنیٰ فراہم کرتا ہے۔'
        },
        sourceId: 'src-sc-assembly-dissolution-judgment-2022',
        isDenialOrDefense: true
      }
    ],
    courtFindings: [
      {
        findingId: 'cf-assembly-restoration',
        courtName: { en: 'Supreme Court of Pakistan', ur: 'سپریم کورٹ آف پاکستان' },
        caseCitation: 'PLD 2022 SC 574',
        orderDate: '2022-04-07',
        rulingSummary: {
          en: 'Unanimously ruled Deputy Speaker ruling void, assembly dissolution nullity in law, and ordered National Assembly summoned for no-confidence vote on 9 April 2022.',
          ur: 'ڈپٹی اسپیکر کی رولنگ کالعدم، اسمبلی تحلیل باطل اور 9 اپریل کو قومی اسمبلی کا اجلاس طلب کر کے عدم اعتماد کی ووٹنگ مکمل کرنے کا حکم۔'
        },
        sourceId: 'src-sc-assembly-dissolution-judgment-2022'
      }
    ],
    mediaArchive: [],
    constitutionalProvisions: ['PK-CONST-A005', 'PK-CONST-A058', 'PK-CONST-A069', 'PK-CONST-A095', 'PK-CONST-A184'],
    relatedRecordIds: ['rec-pk-legal-assembly-dissolution-2022'],
    unresolvedQuestions: [
      {
        en: 'The underlying diplomatic cable (Cypher) was subsequently subject to separate Official Secrets Act criminal proceedings before special courts.',
        ur: 'سفارتی مراسلے (سائفر) پر بعد میں آفیشل سیکرٹس ایکٹ کے تحت الگ خصوصی عدالتوں میں مقدمات چلائے گئے۔'
      }
    ],
    sources: [
      {
        sourceId: 'src-sc-assembly-dissolution-judgment-2022',
        sourceType: 'court_judgment',
        title: { en: 'Suo Motu Case No. 1 of 2022 (PLD 2022 SC 574)', ur: 'ازخود نوٹس کیس نمبر 1 برائے 2022ء (PLD 2022 SC 574)' },
        publisher: { en: 'Supreme Court of Pakistan', ur: 'سپریم کورٹ آف پاکستان' },
        publisherOrIssuingAuthority: 'Supreme Court of Pakistan',
        publicationDate: { dateString: '2022-04-07', precision: 'day', formattedDisplay: { en: 'April 7, 2022', ur: '7 اپریل 2022ء' } },
        judgmentDate: '2022-04-07',
        documentIdentifier: 'PLD 2022 SC 574',
        pageOrParagraph: 'Paragraphs 12-16 & 22-25 (Per Bandial, C.J.)',
        officialUrl: 'https://www.supremecourt.gov.pk/downloads_judgements/s.m.c._1_2022.pdf',
        language: 'en',
        verificationTier: 'primary_verified',
        verificationStatus: 'primary_source',
        sourceAvailability: 'accessible',
        authenticityStatus: 'official_document',
        reviewerNotes: 'Official judgment PLD 2022 SC 574 inspected on Supreme Court portal.'
      }
    ],
    editorialStatus: 'published',
    verificationStatus: 'verified',
    legalProceedingStatus: 'concluded',
    hasActiveReportingBan: false,
    lastLegalStatusChecked: '2024-01-10',
    privacyReview: {
      hasSensitivePersonalData: false,
      piiRedacted: true,
      allegationsDistinguishedFromFindings: true,
      officialDenialsIncluded: true,
      riskAssessment: 'low',
      lastReviewedDate: '2024-01-10',
      reviewerNotes: 'Primary official judgment PLD 2022 SC 574 fully recorded.'
    },
    featuredRecordId: 'rec-pk-legal-assembly-dissolution-2022',
    recordCount: 1,
    iconName: 'Scale',
    tagColor: '#3B82F6',
    version: 1,
    createdAt: '2022-04-10T00:00:00Z',
    updatedAt: '2024-01-10T00:00:00Z'
  },

  // =========================================================================
  // 3. MAJOR PUBLIC EVENTS: 9 MAY PROTESTS & ARRESTS
  // =========================================================================
  {
    id: 'dos-pk-event-may-09-2023',
    slug: 'events-may-09-2023-protests-arrests-legal-aftermath',
    domain: 'major_public_events',
    title: {
      en: '9 May 2023 Protests, Installation Attacks & Mass Detentions Dossier',
      ur: '9 مئی 2023ء کے احتجاج، تنصیبات پر حملے اور قانونی کارروائیوں کی فائل'
    },
    overview: {
      en: 'Exhaustive archival documentation of the countrywide civil unrest following the arrest of Imran Khan on 9 May 2023, attacks on sensitive installations, invocation of Article 245, police mass arrests, bail proceedings before High Courts, and ongoing trials.',
      ur: '9 مئی 2023ء کو عمران خان کی گرفتاری کے بعد ہونے والے ملک گیر احتجاج، حساس تنصیبات پر حملوں، آئین کے آرٹیکل 245 کے نفاذ، پولیس کی گرفتاریوں اور ہائی کورٹس میں ضمانتوں کا جامع دستاویزی احاطہ۔'
    },
    scopeAndTerminology: {
      en: 'Maintains strict distinction between documented vandalism, official state accusations, political party denials, and judicial findings by High Courts granting bail.',
      ur: 'تنصیبات میں توڑ پھوڑ کے دستاویزی حقائق، حکومتی الزامات، سیاسی جماعت کے مؤقف اور ضمانت کے عدالتی فیصلوں کے مابین سخت تفریق رکھی گئی ہے۔'
    },
    chronology: [
      {
        date: '2023-05-09',
        dateDisplay: { en: '9 May 2023 (14:30 PKT)', ur: '9 مئی 2023ء (دوپہر ڈھائی بجے)' },
        title: { en: 'Arrest of Imran Khan from IHC', ur: 'اسلام آباد ہائی کورٹ سے عمران خان کی گرفتاری' },
        description: { en: 'Pakistan Rangers arrested Imran Khan from within the biometrics branch of the Islamabad High Court.', ur: 'رینجرز نے اسلام آباد ہائی کورٹ کے بائیو میٹرک برانچ سے عمران خان کو گرفتار کیا۔' },
        sourceIds: ['src-sc-order-arrest-11may2023'],
        location: { en: 'Islamabad High Court', ur: 'اسلام آباد ہائی کورٹ' }
      },
      {
        date: '2023-05-09',
        dateDisplay: { en: '9 May 2023 (Evening)', ur: '9 مئی 2023ء (شام)' },
        title: { en: 'Crowds Enter Jinnah House & GHQ Gate', ur: 'جناح ہاؤس اور جی ایچ کیو پر مظاہرین کا داخلہ' },
        description: { en: 'Protest crowds gathered outside and entered Corps Commander House Lahore; clashes occurred at GHQ gate Rawalpindi.', ur: 'لاہور میں کور کمانڈر ہاؤس پر ہنگامہ آرائی اور راولپنڈی میں جی ایچ کیو گیٹ پر پتھراؤ۔' },
        sourceIds: ['src-ispr-press-release-10may2023'],
        location: { en: 'Lahore & Rawalpindi', ur: 'لاہور و راولپنڈی' }
      },
      {
        date: '2023-05-10',
        dateDisplay: { en: '10 May 2023', ur: '10 مئی 2023ء' },
        title: { en: 'Article 245 Military Requisitioning', ur: 'آرٹیکل 245 کے تحت فوج کی طلبی' },
        description: { en: 'Federal Ministry of Interior approved deployment of armed forces in aid of civil power in Punjab, KP, and Islamabad.', ur: 'وزارتِ داخلہ نے پنجاب، خیبر پختونخوا اور اسلام آباد میں فوج کی تعیناتی کا نوٹیفکیشن جاری کیا۔' },
        sourceIds: ['src-interior-ministry-art245-notification']
      },
      {
        date: '2023-05-11',
        dateDisplay: { en: '11 May 2023', ur: '11 مئی 2023ء' },
        title: { en: 'Supreme Court Rules Arrest Unlawful', ur: 'سپریم کورٹ کا گرفتاری غیر قانونی قرار دینے کا فیصلہ' },
        description: { en: 'Supreme Court 3-member bench ruled the arrest from court premises unlawful and invalid.', ur: 'سپریم کورٹ کے 3 رکنی بینچ نے عدالتی احاطے سے گرفتاری کو غیر قانونی قرار دیا۔' },
        sourceIds: ['src-sc-order-arrest-11may2023']
      }
    ],
    keyActors: [
      {
        actorId: 'act-ispr-spokesperson',
        name: { en: 'Inter-Services Public Relations (ISPR)', ur: 'پاک فوج کا شعبہ تعلقاتِ عامہ (آئی ایس پی آر)' },
        roleType: 'institution',
        neutralDescription: { en: 'Military communications directorate that issued official communiqués on the damage to military property.', ur: 'عسکری املاک کو پہنچنے والے نقصانات پر سرکاری پریس ریلیزز جاری کیں۔' }
      },
      {
        actorId: 'act-pti-leadership',
        name: { en: 'PTI Central Leadership', ur: 'تحریک انصاف کی مرکزی قیادت' },
        roleType: 'political_party',
        neutralDescription: { en: 'Stated that party policy called for peaceful assembly and alleged that non-party elements instigated violence.', ur: 'مؤقف اپنایا کہ جماعت کا منشور پُرامن احتجاج ہے اور پرتشدد واقعات میں بیرونی عناصر ملوث تھے۔' }
      }
    ],
    claims: [
      {
        claimId: 'clm-may09-sc-unlawful-arrest',
        findingType: 'court_finding',
        assertion: {
          en: 'Supreme Court ruled that execution of the arrest warrant inside court premises violated the right of access to justice under Article 10A.',
          ur: 'سپریم کورٹ نے قرار دیا کہ عدالتی احاطے کے اندر گرفتاری کا عمل آرٹیکل 10A کے تحت انصاف تک رسائی کے بنیادی حق کی خلاف ورزی تھا۔'
        },
        attributedParty: { en: 'Supreme Court Order (11 May 2023)', ur: 'سپریم کورٹ کا حکم نامہ (11 مئی 2023ء)' },
        sourceIds: ['src-sc-order-arrest-11may2023']
      },
      {
        claimId: 'clm-may09-ispr-allegation',
        findingType: 'official_position',
        assertion: {
          en: 'ISPR characterized 9 May as an organized attack on national military installations.',
          ur: 'آئی ایس پی آر نے 9 مئی کے واقعات کو ملکی عسکری تنصیبات پر باضابطہ منظم حملہ قرار دیا۔'
        },
        attributedParty: { en: 'ISPR Official Statement', ur: 'آئی ایس پی آر سرکاری بیان' },
        sourceIds: ['src-ispr-press-release-10may2023']
      },
      {
        claimId: 'clm-may09-art245-requisition',
        findingType: 'official_position',
        assertion: {
          en: 'Federal Ministry of Interior requisitioned armed forces in aid of civil power under Article 245 of the Constitution in Punjab, Khyber Pakhtunkhwa, and Islamabad.',
          ur: 'وفاقی وزارتِ داخلہ نے آئین کے آرٹیکل 245 کے تحت پنجاب، خیبر پختونخوا اور اسلام آباد میں فوج طلب کرنے کا باضابطہ نوٹیفکیشن جاری کیا۔'
        },
        attributedParty: { en: 'Ministry of Interior, Government of Pakistan', ur: 'وزارتِ داخلہ، حکومتِ پاکستان' },
        sourceIds: ['src-interior-ministry-art245-notification']
      },
      {
        claimId: 'clm-may09-judicial-commission-call',
        findingType: 'official_position',
        assertion: {
          en: 'Imran Khan and PTI central leadership denied party involvement in arson, condemned violence, and petitioned for a Supreme Court judicial commission.',
          ur: 'عمران خان اور تحریک انصاف کی قیادت نے جلاؤ گھیراؤ سے لاتعلقی ظاہر کی اور چیف جسٹس کی سربراہی میں عدالتی کمیشن بنانے کا مطالبہ کیا۔'
        },
        attributedParty: { en: 'Imran Khan / PTI Central Media Cell', ur: 'عمران خان / تحریکِ انصاف' },
        sourceIds: ['src-pti-press-statement-13may2023']
      },
      {
        claimId: 'clm-may09-mass-detentions',
        findingType: 'official_position',
        assertion: {
          en: 'Provincial home departments and police authorities detained over 4,000 citizens across Pakistan under Section 3 of the Maintenance of Public Order (MPO) and Anti-Terrorism Act provisions following the 9 May protests.',
          ur: 'صوبائی محکمہ داخلہ اور پولیس نے 9 مئی کے احتجاج کے بعد مینٹیننس آف پبلک آرڈر (MPO) اور انسدادِ دہشت گردی ایکٹ کے تحت 4,000 سے زائد شہریوں کو حراست میں لیا۔'
        },
        attributedParty: { en: 'Provincial Home Departments & Police Logs', ur: 'صوبائی محکمہ داخلہ و پولیس' },
        sourceIds: ['src-interior-ministry-art245-notification']
      }
    ],
    officialPositions: [
      {
        positionId: 'pos-ispr-9may',
        institutionOrParty: { en: 'Inter-Services Public Relations (ISPR)', ur: 'شعبہ تعلقاتِ عامہ (آئی ایس پی آر)' },
        statementDate: '2023-05-10',
        summary: {
          en: 'Condemned breaches of military installations and announced stern action under the Army Act and Official Secrets Act.',
          ur: 'عسکری تنصیبات پر حملوں کی مذمت کرتے ہوئے آرمی ایکٹ کے تحت سخت کارروائی کا عندیہ دیا۔'
        },
        sourceId: 'src-ispr-press-release-10may2023',
        isDenialOrDefense: false
      },
      {
        positionId: 'pos-pti-denial-9may',
        institutionOrParty: { en: 'Imran Khan / Pakistan Tehreek-e-Insaf', ur: 'عمران خان / پاکستان تحریکِ انصاف' },
        statementDate: '2023-05-13',
        summary: {
          en: 'Condemned violence, called for an independent judicial commission headed by the Chief Justice, and denied party involvement in arson.',
          ur: 'تشدد کے واقعات کی مذمت کی، چیف جسٹس کی سربراہی میں عدالتی کمیشن کا مطالبہ کیا اور جلاؤ گھیراؤ سے لاتعلقی کا اظہار کیا۔'
        },
        sourceId: 'src-pti-press-statement-13may2023',
        isDenialOrDefense: true
      }
    ],
    courtFindings: [
      {
        findingId: 'cf-sc-11may-arrest',
        courtName: { en: 'Supreme Court of Pakistan', ur: 'سپریم کورٹ آف پاکستان' },
        caseCitation: 'Cr.P. 299/2023',
        orderDate: '2023-05-11',
        rulingSummary: {
          en: 'Arrest of Imran Khan from the High Court biometrics room declared unlawful; directed him to approach Islamabad High Court for pre-arrest bail.',
          ur: 'اسلام آباد ہائی کورٹ سے گرفتاری کو غیر قانونی قرار دے کر ہائی کورٹ سے ضمانت قبل از گرفتاری رجوع کرنے کی ہدایت۔'
        },
        sourceId: 'src-sc-order-arrest-11may2023'
      }
    ],
    mediaArchive: [],
    constitutionalProvisions: ['PK-CONST-A009', 'PK-CONST-A010A', 'PK-CONST-A016', 'PK-CONST-A245'],
    relatedRecordIds: ['rec-pk-event-may-09-protests-2023', 'rec-pk-legal-military-courts-civilians-2023'],
    unresolvedQuestions: [
      {
        en: 'The appointment of a judicial commission comprising Supreme Court judges requested by petitioners has not materialized.',
        ur: 'درخواست گزاروں کی جانب سے سپریم کورٹ کے ججز پر مشتمل آزادانہ عدالتی تحقیقاتی کمیشن کے قیام کا مطالبہ تاحال پورا نہیں ہو سکا۔'
      },
      {
        en: 'CCTV footage and forensic chain of custody across various installation sites remain subjects of ongoing trial disputes.',
        ur: 'مختلف تنصیبات کی سی سی ٹی وی فوٹیج اور فرانزک شواہد کی حتمی رپورٹ عدالتوں میں زیرِ سماعت ہے۔'
      }
    ],
    sources: [
      {
        sourceId: 'src-sc-order-arrest-11may2023',
        sourceType: 'court_order',
        title: { en: 'Supreme Court Order in Cr.P. 299/2023 (11 May 2023)', ur: 'سپریم کورٹ آرڈر شیٹ — 11 مئی 2023ء' },
        publisher: { en: 'Supreme Court of Pakistan', ur: 'سپریم کورٹ آف پاکستان' },
        publisherOrIssuingAuthority: 'Supreme Court of Pakistan',
        publicationDate: { dateString: '2023-05-11', precision: 'day', formattedDisplay: { en: 'May 11, 2023', ur: '11 مئی 2023ء' } },
        judgmentDate: '2023-05-11',
        documentIdentifier: 'Cr.P. 299/2023',
        officialUrl: 'https://www.supremecourt.gov.pk',
        language: 'en',
        verificationTier: 'primary_verified',
        verificationStatus: 'primary_source',
        sourceAvailability: 'accessible',
        authenticityStatus: 'official_document',
        reviewerNotes: 'Official Supreme Court order sheet inspected.'
      },
      {
        sourceId: 'src-ispr-press-release-10may2023',
        sourceType: 'government_document',
        title: { en: 'ISPR Official Statement on 9 May Incidents', ur: '9 مئی کے واقعات پر آئی ایس پی آر کا باضابطہ اعلامیہ' },
        publisher: { en: 'Inter-Services Public Relations', ur: 'شعبہ تعلقاتِ عامہ (آئی ایس پی آر)' },
        publisherOrIssuingAuthority: 'Inter-Services Public Relations',
        publicationDate: { dateString: '2023-05-10', precision: 'day', formattedDisplay: { en: 'May 10, 2023', ur: '10 مئی 2023ء' } },
        documentIdentifier: 'PR-MAY09-2023',
        language: 'en',
        verificationTier: 'primary_verified',
        verificationStatus: 'source_reviewed',
        sourceAvailability: 'accessible',
        authenticityStatus: 'official_document',
        reviewerNotes: 'Official ISPR press release statement.'
      },
      {
        sourceId: 'src-interior-ministry-art245-notification',
        sourceType: 'gazette',
        title: { en: 'Ministry of Interior Notification on Requisition of Armed Forces under Article 245', ur: 'وزارتِ داخلہ کا آرٹیکل 245 کے تحت فوج کی طلبی کا نوٹیفکیشن' },
        publisher: { en: 'Ministry of Interior, Government of Pakistan', ur: 'وزارتِ داخلہ، حکومتِ پاکستان' },
        publisherOrIssuingAuthority: 'Ministry of Interior, Government of Pakistan',
        publicationDate: { dateString: '2023-05-10', precision: 'day', formattedDisplay: { en: 'May 10, 2023', ur: '10 مئی 2023ء' } },
        documentIdentifier: 'F.No. 2/1/2023-Police',
        language: 'en',
        verificationTier: 'primary_verified',
        verificationStatus: 'primary_source',
        sourceAvailability: 'accessible',
        authenticityStatus: 'official_document',
        reviewerNotes: 'Official gazette statutory notification.'
      },
      {
        sourceId: 'src-pti-press-statement-13may2023',
        sourceType: 'reputable_journalism',
        title: { en: 'Imran Khan Address and Press Release Calling for Judicial Commission', ur: 'عمران خان کا عدالتی کمیشن کے قیام کے مطالبے کا بیان' },
        publisher: { en: 'Dawn / Express Tribune', ur: 'روزنامہ ڈان / ایکسپریس ٹریبیون' },
        publisherOrIssuingAuthority: 'Dawn Media Group',
        publicationDate: { dateString: '2023-05-13', precision: 'day', formattedDisplay: { en: 'May 13, 2023', ur: '13 مئی 2023ء' } },
        language: 'both',
        verificationTier: 'secondary_corroborated',
        verificationStatus: 'source_reviewed',
        sourceAvailability: 'accessible',
        authenticityStatus: 'publisher_verified',
        reviewerNotes: 'Corroborated across national press reporting.'
      }
    ],
    editorialStatus: 'under_review',
    verificationStatus: 'corroborated',
    legalProceedingStatus: 'ongoing',
    hasActiveReportingBan: false,
    pendingProceedingsNotice: {
      en: 'Notice of Pending Proceedings (Sub Judice): Criminal prosecutions, anti-terrorism court (ATC) trials, and bail appeals related to 9 May 2023 remain actively sub judice across multiple provinces. Official allegations are strictly distinguished from judicial determinations.',
      ur: 'عدالتی کارروائی کے زیرِ التواء ہونے کا نوٹس: 9 مئی کے واقعات پر انسداد دہشت گردی عدالتوں میں مقدمات زیرِ سماعت ہیں۔ سرکاری الزامات کو حتمی عدالتی فیصلوں سے الگ رکھا گیا ہے۔'
    },
    lastLegalStatusChecked: '2024-03-01',
    privacyReview: {
      hasSensitivePersonalData: true,
      piiRedacted: true,
      allegationsDistinguishedFromFindings: true,
      officialDenialsIncluded: true,
      riskAssessment: 'high_scrutiny',
      lastReviewedDate: '2024-03-01',
      reviewerNotes: 'Under review due to ongoing trials; all accused civilian identities redacted except senior public figures named in reported petitions.'
    },
    featuredRecordId: 'rec-pk-event-may-09-protests-2023',
    recordCount: 2,
    iconName: 'AlertTriangle',
    tagColor: '#EF4444',
    version: 1,
    createdAt: '2023-05-15T00:00:00Z',
    updatedAt: '2024-03-01T00:00:00Z'
  },

  // =========================================================================
  // 4. MAJOR PUBLIC EVENTS: MAY 25–26 AZADI MARCH
  // =========================================================================
  {
    id: 'dos-pk-event-may-26-2022',
    slug: 'events-may-25-26-2022-azadi-march-red-zone',
    domain: 'major_public_events',
    title: {
      en: '25–26 May 2022 Azadi March, Roadblockades & Red Zone Orders Dossier',
      ur: '25 تا 26 مئی 2022ء آزادی مارچ، راستوں کی بندش اور سپریم کورٹ احکامات کی فائل'
    },
    overview: {
      en: 'Archival dossier documenting the PTI long march towards Islamabad on 25–26 May 2022, the nationwide deployment of shipping containers, Section 144 orders, police tear-gassing, Supreme Court emergency directives allocating the H-9/G-9 ground, and subsequent contempt petitions regarding Red Zone entry.',
      ur: '25 تا 26 مئی 2022ء کو اسلام آباد کی جانب لانگ مارچ، کنٹینرز کے ذریعے شاہراہیں بند کرنے، آنسو گیس کی شیلنگ، سپریم کورٹ کی جانب سے جلسہ گاہ کی تخصیص اور بعد ازاں ریڈ زون داخلے پر توہینِ عدالت کی کارروائی کا دستاویزی احاطہ۔'
    },
    scopeAndTerminology: {
      en: 'Covers fundamental right of peaceful assembly under Article 16, public order restrictions under Section 144 CrPC, and the Supreme Court\'s adjudication under Article 184(3).',
      ur: 'آئین کے آرٹیکل 16 کے تحت پُرامن اجتماع کے حق، ضابطہ فوجداری کی دفعہ 144 کے نفاذ اور سپریم کورٹ کے احکامات کا احاطہ کرتا ہے۔'
    },
    chronology: [
      {
        date: '2022-05-24',
        dateDisplay: { en: '24 May 2022', ur: '24 مئی 2022ء' },
        title: { en: 'Government Imposes Section 144 & Barricades', ur: 'حکومت کی جانب سے دفعہ 144 اور کنٹینرز کی رکاوٹیں' },
        description: { en: 'Federal and Punjab governments blocked major motorways with containers and initiated arrests of political workers.', ur: 'وفاقی و پنجاب حکومت نے موٹرویز اور جی ٹی روڈ پر کنٹینرز کھڑے کیے اور کارکنوں کی پکڑ دھکڑ کی۔' },
        sourceIds: ['src-sc-order-may25-2022']
      },
      {
        date: '2022-05-25',
        dateDisplay: { en: '25 May 2022', ur: '25 مئی 2022ء' },
        title: { en: 'Supreme Court Designates H-9/G-9 Ground', ur: 'سپریم کورٹ کی جانب سے H-9/G-9 گراؤنڈ کی تخصیص' },
        description: { en: 'A 3-member bench directed administration to allow the rally at H-9/G-9 and ordered the release of detained lawyers and workers.', ur: 'سپریم کورٹ کے 3 رکنی بینچ نے H-9/G-9 گراؤنڈ جلسے کے لیے مختص کرنے اور قیدیوں کو رہا کرنے کا حکم دیا۔' },
        sourceIds: ['src-sc-order-may25-2022']
      },
      {
        date: '2022-05-26',
        dateDisplay: { en: '26 May 2022', ur: '26 مئی 2022ء' },
        title: { en: 'Arrival at D-Chowk & 6-Day Ultimatum', ur: 'ڈی چوک آمد اور 6 دن کی ڈیڈ لائن' },
        description: { en: 'Marchers reached D-Chowk; Imran Khan addressed the gathering in the morning, giving the government a 6-day deadline to announce elections before calling off the sit-in.', ur: 'مظاہرین ڈی چوک پہنچے جہاں عمران خان نے صبح خطاب کر کے انتخابات کے اعلان کے لیے 6 دن کی مہلت دی اور دھرنا ختم کیا۔' },
        sourceIds: ['src-sc-order-may25-2022']
      }
    ],
    keyActors: [
      {
        actorId: 'act-sc-bench-may26',
        name: { en: 'Supreme Court 3-Member Bench (headed by Justice Ijaz ul Ahsan)', ur: '3 رکنی سپریم کورٹ بینچ (سربراہی جسٹس اعجاز الاحسن)' },
        roleType: 'judicial_body',
        neutralDescription: { en: 'Heard the urgent petition of the Islamabad High Court Bar Association on 25 May 2022.', ur: '25 مئی کو ہنگامی سماعت کر کے دونوں فریقین کو پابند کیا۔' }
      },
      {
        actorId: 'act-rana-sanaullah',
        name: { en: 'Rana Sanaullah Khan', ur: 'رانا ثناء اللہ خاں' },
        roleType: 'public_official',
        officialDesignation: { en: 'Federal Minister for Interior', ur: 'وفاقی وزیرِ داخلہ' },
        neutralDescription: { en: 'Oversaw law enforcement deployment, container barricades, and security operations in the capital.', ur: 'دارالحکومت میں سیکیورٹی اور رکاوٹوں کے حکومتی اقدامات کی نگرانی کی۔' }
      }
    ],
    claims: [
      {
        claimId: 'clm-may26-sc-venue-order',
        findingType: 'court_finding',
        assertion: {
          en: 'Supreme Court balanced public assembly rights under Article 16 with public order obligations by designating an alternative venue.',
          ur: 'سپریم کورٹ نے متبادل جلسہ گاہ مختص کر کے آرٹیکل 16 کے تحت اجتماع کے حق اور امن و امان کے مابین توازن قائم کرنے کا حکم دیا۔'
        },
        attributedParty: { en: 'Supreme Court 3-Member Bench (Const. Pet. 19/2022)', ur: 'سپریم کورٹ 3 رکنی بینچ' },
        sourceIds: ['src-sc-order-may25-2022']
      },
      {
        claimId: 'clm-may26-sec144-blockades',
        findingType: 'official_position',
        assertion: {
          en: 'Federal and provincial authorities blocked major national highways with shipping containers and promulgated Section 144 CrPC orders prohibiting political gatherings in Islamabad.',
          ur: 'وفاقی و صوبائی انتظامیہ نے کنٹینرز کے ذریعے قومی شاہراہیں بند کیں اور ضابطہ فوجداری کی دفعہ 144 نافذ کر کے جلسے جلوسوں پر پابندی عائد کی۔'
        },
        attributedParty: { en: 'Ministry of Interior / Islamabad Capital Territory Administration', ur: 'وزارتِ داخلہ / ضلعی انتظامیہ اسلام آباد' },
        sourceIds: ['src-sc-order-may25-2022']
      },
      {
        claimId: 'clm-may26-dchowk-shelling',
        findingType: 'documented_fact',
        assertion: {
          en: 'Police and law enforcement deployed extensive tear gas shelling and physical barricades along Jinnah Avenue and D-Chowk Islamabad on the night of 25–26 May 2022 to disperse incoming march convoys.',
          ur: 'پولیس اور قانون نافذ کرنے والے اداروں نے 25 اور 26 مئی 2022ء کی درمیانی رات اسلام آباد کے جناح ایونیو اور ڈی چوک پر مارچ کے شرکاء کو منتشر کرنے کے لیے بڑے پیمانے پر آنسو گیس کی شیلنگ کی۔'
        },
        attributedParty: { en: 'Independent Media & ICT Police Reports', ur: 'آزاد میڈیا و پولیس رپورٹس' },
        sourceIds: ['src-sc-order-may25-2022']
      }
    ],
    officialPositions: [
      {
        positionId: 'pos-interior-may26',
        institutionOrParty: { en: 'Federal Ministry of Interior', ur: 'وفاقی وزارتِ داخلہ' },
        statementDate: '2022-05-25',
        summary: {
          en: 'Maintained that Section 144 was necessary to prevent violence, protect diplomatic missions, and secure government buildings.',
          ur: 'مؤقف اختیار کیا کہ سفارتی مشنز اور سرکاری املاک کے تحفظ کے لیے دفعہ 144 کا نفاذ ناگزیر تھا۔'
        },
        sourceId: 'src-sc-order-may25-2022',
        isDenialOrDefense: true
      }
    ],
    mediaArchive: [],
    constitutionalProvisions: ['PK-CONST-A015', 'PK-CONST-A016', 'PK-CONST-A184'],
    relatedRecordIds: ['rec-pk-event-may-26-azadi-march'],
    unresolvedQuestions: [
      {
        en: 'Subsequent contempt of court petitions regarding whether PTI leadership violated court undertaking by proceeding towards D-Chowk were disposed of without findings of deliberate defiance.',
        ur: 'عدالتی یقین دہانی کے برعکس ڈی چوک جانے پر دائر توہینِ عدالت کی درخواستوں پر عدالت نے دانستہ خلاف ورزی کا فیصلہ نہیں دیا۔'
      }
    ],
    sources: [
      {
        sourceId: 'src-sc-order-may25-2022',
        sourceType: 'court_order',
        title: { en: 'Supreme Court Order in Islamabad High Court Bar Association v Federation (Const. Pet. 19/2022)', ur: 'سپریم کورٹ حکم نامہ — 25 مئی 2022ء' },
        publisher: { en: 'Supreme Court of Pakistan', ur: 'سپریم کورٹ آف پاکستان' },
        publisherOrIssuingAuthority: 'Supreme Court of Pakistan',
        publicationDate: { dateString: '2022-05-25', precision: 'day', formattedDisplay: { en: 'May 25, 2022', ur: '25 مئی 2022ء' } },
        judgmentDate: '2022-05-25',
        documentIdentifier: 'Const. Pet. 19/2022',
        officialUrl: 'https://www.supremecourt.gov.pk',
        language: 'en',
        verificationTier: 'primary_verified',
        verificationStatus: 'primary_source',
        sourceAvailability: 'accessible',
        authenticityStatus: 'official_document',
        reviewerNotes: 'Official Supreme Court order sheet inspected.'
      },
      {
        sourceId: 'src-punjab-sec144-notification-may2022',
        sourceType: 'gazette',
        title: { en: 'Government of Punjab Home Department Section 144 Notification', ur: 'محکمہ داخلہ حکومت پنجاب کا دفعہ 144 کا نوٹیفکیشن' },
        publisher: { en: 'Home Department, Government of Punjab', ur: 'محکمہ داخلہ حکومت پنجاب' },
        publisherOrIssuingAuthority: 'Home Department, Government of Punjab',
        publicationDate: { dateString: '2022-05-24', precision: 'day', formattedDisplay: { en: 'May 24, 2022', ur: '24 مئی 2022ء' } },
        documentIdentifier: 'SO(IS-II)1-1/2022',
        officialUrl: 'https://homedepartment.punjab.gov.pk',
        language: 'en',
        verificationTier: 'primary_verified',
        verificationStatus: 'primary_source',
        sourceAvailability: 'accessible',
        authenticityStatus: 'official_document',
        reviewerNotes: 'Official executive order promulgating Section 144.'
      }
    ],
    editorialStatus: 'under_review',
    verificationStatus: 'corroborated',
    legalProceedingStatus: 'unresolved',
    hasActiveReportingBan: false,
    pendingProceedingsNotice: {
      en: 'Notice: Supreme Court proceedings on the 25 May 2022 march undertaking were disposed of with observations; related police investigations remain unadjudicated by independent commission.',
      ur: 'نوٹس: 25 مئی 2022ء کے جلسے کی یقین دہانی پر سپریم کورٹ کی کارروائی احکامات کے ساتھ نمٹائی گئی جبکہ آزاد عدالتی انکوائری تشکیل نہیں دی گئی۔'
    },
    lastLegalStatusChecked: '2023-12-01',
    privacyReview: {
      hasSensitivePersonalData: false,
      piiRedacted: true,
      allegationsDistinguishedFromFindings: true,
      officialDenialsIncluded: true,
      riskAssessment: 'medium',
      lastReviewedDate: '2023-12-01',
      reviewerNotes: 'Focuses on judicial orders and institutional communications.'
    },
    featuredRecordId: 'rec-pk-event-may-26-azadi-march',
    recordCount: 1,
    iconName: 'AlertTriangle',
    tagColor: '#F59E0B',
    version: 1,
    createdAt: '2022-05-30T00:00:00Z',
    updatedAt: '2023-12-01T00:00:00Z'
  },

  // =========================================================================
  // 5. MAJOR PUBLIC EVENTS: MURIDKE TRAGEDY 2021 (RESEARCH BACKLOG / DRAFT)
  // =========================================================================
  {
    id: 'dos-pk-event-muridke-tragedy-2021',
    slug: 'events-muridke-gt-road-clashes-october-2021',
    domain: 'major_public_events',
    title: {
      en: 'Muridke GT Road Clashes & Casualties Dossier (October 2021)',
      ur: 'مریدکے جی ٹی روڈ پرتشدد جھڑپیں اور جانی نقصانات کی تحقیقاتی فائل (اکتوبر 2021ء)'
    },
    overview: {
      en: 'Archival research dossier cataloguing the October 2021 clashes on the Grand Trunk Road near Muridke and Sadhoke between law enforcement personnel and TLP marchers, documenting police fatalities, contested protester casualties, and the absence of a comprehensive declassified judicial inquiry.',
      ur: 'اکتوبر 2021ء میں جی ٹی روڈ پر مریدکے اور سادھوکے کے مقام پر پولیس اور مظاہرین کے مابین جھڑپوں، پولیس اہلکاروں کی شہادتوں اور غیر مصدقہ سویلین ہلاکتوں پر ریسرچ فائل، جو جامع عدالتی تحقیقاتی رپورٹ کے نہ ہونے کے باعث ڈرافٹ کی صورت میں ہے۔'
    },
    scopeAndTerminology: {
      en: 'Maintained strictly in draft/research status due to significant evidentiary limitations, lack of independent ballistic reports, and reliance on unverified partisan claims.',
      ur: 'آزادانہ فرانزک رپورٹ اور عدالتی انکوائری رپورٹ کی عدم دستیابی کے سبب یہ فائل تحقیقاتی بیک لاگ اور ڈرافٹ اسٹیٹس میں رکھی گئی ہے۔'
    },
    chronology: [
      {
        date: '2021-10-22',
        dateDisplay: { en: '22 October 2021', ur: '22 اکتوبر 2021ء' },
        title: { en: 'TLP March Commences from Lahore', ur: 'لاہور سے لانگ مارچ کا آغاز' },
        description: { en: 'Demonstrators commenced march towards Islamabad along the GT Road.', ur: 'مظاہرین نے جی ٹی روڈ کے راستے اسلام آباد کی جانب مارچ شروع کیا۔' },
        sourceIds: ['src-punjab-police-statement-oct2021']
      },
      {
        date: '2021-10-27',
        dateDisplay: { en: '27 October 2021', ur: '27 اکتوبر 2021ء' },
        title: { en: 'Fatal Clashes Near Sadhoke & Muridke', ur: 'سادھوکے اور مریدکے کے قریب پرتشدد جھڑپیں' },
        description: { en: 'Heavy clashes with law enforcement personnel resulting in multiple police deaths from firearm wounds.', ur: 'سیکیورٹی فورسز اور مظاہرین کے درمیان شدید جھڑپیں، فائرنگ کے نتیجے میں پولیس اہلکاروں کی شہادتیں ہوئیں۔' },
        sourceIds: ['src-punjab-police-statement-oct2021', 'src-hrcp-statement-oct2021']
      }
    ],
    keyActors: [
      {
        actorId: 'act-punjab-police',
        name: { en: 'Punjab Police Command', ur: 'پنجاب پولیس کمانڈ' },
        roleType: 'law_enforcement',
        neutralDescription: { en: 'Reported casualties among frontline constabulary and officers during containment operations.', ur: 'مظاہرین کو روکنے کے دوران پولیس اہلکاروں کی شہادتوں اور زخمیوں کا ریکارڈ جاری کیا۔' }
      }
    ],
    claims: [
      {
        claimId: 'clm-muridke-police-casualties',
        findingType: 'official_position',
        assertion: {
          en: 'Punjab Police verified that multiple police officers sustained fatal bullet wounds during confrontations on the GT Road.',
          ur: 'پنجاب پولیس نے تصدیق کی کہ جی ٹی روڈ پر جھڑپوں کے دوران متعدد اہلکار فائرنگ سے شہید ہوئے۔'
        },
        attributedParty: { en: 'Punjab Police Public Relations', ur: 'پنجاب پولیس پریس بریفنگ' },
        sourceIds: ['src-punjab-police-statement-oct2021']
      },
      {
        claimId: 'clm-muridke-civilian-claim',
        findingType: 'unresolved_question',
        assertion: {
          en: 'Accurate verifiable civilian casualty figures and independent post-mortem documents have not been officially published in the public domain.',
          ur: 'مظاہرین میں جانی نقصانات کے مصدقہ اعداد و شمار اور پوسٹ مارٹم رپورٹس تاحال پبلک ڈومین میں موجود نہیں۔'
        },
        attributedParty: { en: 'HRCP Investigation Note', ur: 'ہیومن رائٹس کمیشن آف پاکستان' },
        sourceIds: ['src-hrcp-statement-oct2021']
      },
      {
        claimId: 'clm-muridke-political-accord',
        findingType: 'official_position',
        assertion: {
          en: 'Government of Pakistan and TLP leadership signed an unpublicized political accord on 31 October 2021 ending the march, with subsequent de-proscription under the Anti-Terrorism Act.',
          ur: 'حکومتِ پاکستان اور ٹی ایل پی قیادت نے 31 اکتوبر 2021ء کو لانگ مارچ کے خاتمے کا غیر شائع شدہ سیاسی معاہدہ کیا، جس کے بعد کالعدم تنظیم کی فہرست سے نام نکالا گیا۔'
        },
        attributedParty: { en: 'Cabinet Committee & Foreign Minister Qureshi Briefing', ur: 'کابینہ کمیٹی و سرکاری بریفنگ' },
        sourceIds: ['src-punjab-police-statement-oct2021']
      }
    ],
    officialPositions: [
      {
        positionId: 'pos-interior-tlp-oct2021',
        institutionOrParty: { en: 'Ministry of Interior (Minister Sheikh Rasheed Ahmad)', ur: 'وزارتِ داخلہ (وزیرِ داخلہ شیخ رشید احمد)' },
        statementDate: '2021-10-28',
        summary: {
          en: 'Stated that while negotiations were conducted, armed clashes against police officers crossed acceptable legal boundaries.',
          ur: 'بیان دیا کہ مذاکرات کے ساتھ ساتھ قانون نافذ کرنے والے اہلکاروں پر فائرنگ کسی صورت برداشت نہیں کی جا سکتی۔'
        },
        sourceId: 'src-punjab-police-statement-oct2021',
        isDenialOrDefense: false
      }
    ],
    mediaArchive: [],
    constitutionalProvisions: ['PK-CONST-A009', 'PK-CONST-A016'],
    relatedRecordIds: ['rec-pk-event-muridke-clashes-2021'],
    unresolvedQuestions: [
      {
        en: 'Absence of an independent judicial inquiry report examining the origin of firearms used on both sides.',
        ur: 'دونوں جانب سے اسلحے کے استعمال اور فائرنگ کے آغاز پر کسی خودمختار عدالتی کمیشن کی رپورٹ کا نہ ہونا۔'
      },
      {
        en: 'The financial settlements and legal status of registered FIRs following subsequent political agreements between the government and TLP remain partially opaque.',
        ur: 'حکومت اور ٹی ایل پی کے درمیان بعد ازاں ہونے والے معاہدے کے نتیجے میں مقدمات اور بریت کے قانونی عمل پر دستاویزی کمی۔'
      }
    ],
    sources: [
      {
        sourceId: 'src-punjab-police-statement-oct2021',
        sourceType: 'police_record',
        title: { en: 'Punjab Police Law & Order Report (October 2021)', ur: 'پنجاب پولیس لا اینڈ آرڈر رپورٹ (اکتوبر 2021ء)' },
        publisher: { en: 'Punjab Police', ur: 'پنجاب پولیس' },
        publisherOrIssuingAuthority: 'Punjab Police Inspector General Office',
        publicationDate: { dateString: '2021-10-27', precision: 'day', formattedDisplay: { en: 'October 27, 2021', ur: '27 اکتوبر 2021ء' } },
        documentIdentifier: 'PP-PR-2021-10-27',
        language: 'both',
        verificationTier: 'secondary_corroborated',
        verificationStatus: 'source_reviewed',
        sourceAvailability: 'accessible',
        authenticityStatus: 'official_document',
        reviewerNotes: 'Official police casualty and incident press record.'
      },
      {
        sourceId: 'src-hrcp-statement-oct2021',
        sourceType: 'human_rights_org',
        title: { en: 'HRCP Statement on Muridke Clashes and Protests', ur: 'مریدکے جھڑپوں پر ایچ آر سی پی کا بیان' },
        publisher: { en: 'Human Rights Commission of Pakistan', ur: 'ہیومن رائٹس کمیشن آف پاکستان' },
        publisherOrIssuingAuthority: 'Human Rights Commission of Pakistan',
        publicationDate: { dateString: '2021-10-28', precision: 'day', formattedDisplay: { en: 'October 28, 2021', ur: '28 اکتوبر 2021ء' } },
        language: 'en',
        verificationTier: 'secondary_corroborated',
        verificationStatus: 'source_reviewed',
        sourceAvailability: 'accessible',
        authenticityStatus: 'publisher_verified',
        reviewerNotes: 'HRCP fact-finding assessment on civilian access and hospital admissions.'
      }
    ],
    editorialStatus: 'draft',
    verificationStatus: 'under_investigation',
    legalProceedingStatus: 'unresolved',
    hasActiveReportingBan: false,
    pendingProceedingsNotice: {
      en: 'Notice: No independent judicial inquiry commission was constituted for the October 2021 Muridke GT Road clashes. Casualty figures and secret political pact clauses remain unverified by public judicial records.',
      ur: 'نوٹس: اکتوبر 2021ء کے مریدکے جی ٹی روڈ تصادم پر کوئی آزاد عدالتی کمیشن تشکیل نہیں دیا گیا۔ جانی نقصانات اور خفیہ سیاسی معاہدے کی شقیں تاحال غیر مصدقہ ہیں۔'
    },
    lastLegalStatusChecked: '2024-04-10',
    privacyReview: {
      hasSensitivePersonalData: true,
      piiRedacted: true,
      allegationsDistinguishedFromFindings: true,
      officialDenialsIncluded: true,
      riskAssessment: 'high_scrutiny',
      lastReviewedDate: '2024-04-10',
      reviewerNotes: 'RESEARCH BACKLOG: Not for publication until primary ballistic and medical records are catalogued.'
    },
    featuredRecordId: 'rec-pk-event-muridke-clashes-2021',
    recordCount: 1,
    iconName: 'FileText',
    tagColor: '#6B7280',
    version: 1,
    createdAt: '2021-11-05T00:00:00Z',
    updatedAt: '2024-04-10T00:00:00Z'
  },

  // =========================================================================
  // 6. JOURNALISM & PRESS FREEDOM: ARSHAD SHARIF KILLING DOSSIER
  // =========================================================================
  {
    id: 'dos-pk-journalism-arshad-sharif-killing',
    slug: 'arshad-sharif-killing-investigation-jit-kenya-high-court',
    domain: 'journalism_press_freedom',
    title: {
      en: 'Arshad Sharif Targeted Killing & Kenya Investigation Dossier',
      ur: 'ارشد شریف ٹارگٹ کلنگ و کینیا تحقیقاتی فائل'
    },
    overview: {
      en: 'Comprehensive multi-record documentary dossier connecting the targeted shooting of investigative journalist Arshad Sharif on Magadi Road in Kenya on 23 October 2022, the 592-page Pakistani Special Fact-Finding JIT Report, Kenyan High Court 2024 judgment finding state police responsibility, and Supreme Court of Pakistan Suo Motu Case 8/2022 proceedings.',
      ur: '23 اکتوبر 2022ء کو کینیا کی مگاڈی روڈ پر معروف تحقیقاتی صحافی ارشد شریف کے قتل، 592 صفحات پر مشتمل پاکستانی فیکٹ فائنڈنگ جے آئی ٹی رپورٹ، کینین ہائی کورٹ کے جولائی 2024ء کے فیصلے اور سپریم کورٹ آف پاکستان کی ازخود کارروائی کا جامع دستاویزی احاطہ۔'
    },
    scopeAndTerminology: {
      en: 'Distinguishes clearly between documented forensic autopsy findings, the Kenyan High Court judicial order awarding damages for constitutional violations, the Pakistani JIT investigative conclusions, and unresolved extradition and motive inquiries.',
      ur: 'اس فائل میں پوسٹ مارٹم کے فرانزک حقائق، کینین ہائی کورٹ کے فیصلے، پاکستانی جے آئی ٹی کے نتائج اور نامکمل سازش و محرکات کی تحقیقات کو سختی سے الگ رکھا گیا ہے۔'
    },
    chronology: [
      {
        date: '2022-08-10',
        dateDisplay: { en: '10 August 2022', ur: '10 اگست 2022ء' },
        title: { en: 'Departure from Pakistan Following Parallel FIRs', ur: 'درجنوں ایف آئی آرز کے بعد پاکستان سے روانگی' },
        description: { en: 'Following registration of sedition and criminal FIRs across multiple provinces, Sharif departed Pakistan for Dubai.', ur: 'ملک کے مختلف شہروں میں بغاوت کے مقدمات درج ہونے کے بعد ارشد شریف دبئی روانہ ہوئے۔' },
        sourceIds: ['src-pk-arshad-jit-report-2022']
      },
      {
        date: '2022-10-23',
        dateDisplay: { en: '23 October 2022 (Night)', ur: '23 اکتوبر 2022ء (رات)' },
        title: { en: 'Fatal Shooting on Magadi Road, Kajiado County', ur: 'مگاڈی روڈ، کینیا پر گاڑی پر فائرنگ اور شہادت' },
        description: { en: 'Sharif was fatally shot while traveling in a vehicle intercepted by Kenyan General Service Unit (GSU) officers.', ur: 'کینیا کی مگاڈی روڈ پر پولیس چوکی کے قریب جی ایس یو اہلکاروں کی فائرنگ سے ارشد شریف شہید ہوئے۔' },
        sourceIds: ['src-pk-arshad-jit-report-2022', 'src-kenya-high-court-ruling-2024'],
        location: { en: 'Magadi Road, Kajiado County, Kenya', ur: 'مگاڈی روڈ، کینیا' }
      },
      {
        date: '2022-12-06',
        dateDisplay: { en: '6 December 2022', ur: '6 دسمبر 2022ء' },
        title: { en: 'Supreme Court Suo Motu Case No. 8/2022', ur: 'سپریم کورٹ ازخود نوٹس کیس 8/2022' },
        description: { en: 'Chief Justice Bandial initiated Article 184(3) proceedings, ordering FIR registration and Special JIT constitution.', ur: 'سپریم کورٹ نے ازخود نوٹس لے کر اسلام آباد میں قتل کی ایف آئی آر درج کرنے اور جے آئی ٹی بنانے کا حکم دیا۔' },
        sourceIds: ['src-pk-sc-suo-motu-2022']
      },
      {
        date: '2024-07-08',
        dateDisplay: { en: '8 July 2024', ur: '8 جولائی 2024ء' },
        title: { en: 'Kenya High Court Judgment (Machakos HC)', ur: 'کینین ہائی کورٹ کا تاریخی فیصلہ' },
        description: { en: 'High Court ruled that the shooting of Arshad Sharif by Kenyan police officers was unlawful, unconstitutional, and violated his fundamental right to life, awarding 10 million KES compensation to his widow.', ur: 'کینین ہائی کورٹ نے فیصلہ دیا کہ پولیس کی فائرنگ غیر قانونی اور ماورائے آئین تھی جس سے حقِ زندگی پامال ہوا، اور بیوہ کو معاوضہ دینے کا حکم دیا۔' },
        sourceIds: ['src-kenya-high-court-ruling-2024']
      }
    ],
    keyActors: [
      {
        actorId: 'act-arshad-sharif',
        name: { en: 'Arshad Sharif', ur: 'ارشد شریف' },
        roleType: 'journalist',
        neutralDescription: { en: 'Pakistani investigative journalist and former host of Power Play on ARY News (1973–2022).', ur: 'پاکستانی تحقیقاتی صحافی اور اینکر پرسن جنہیں کینیا میں فائرنگ کر کے قتل کیا گیا۔' }
      },
      {
        actorId: 'act-judge-stella-mutuku',
        name: { en: 'Justice Stella Mutuku', ur: 'جسٹس اسٹیلا مٹوکو' },
        roleType: 'judicial_body',
        neutralDescription: { en: 'High Court Judge at Machakos, Kenya who adjudicated the constitutional petition filed by Sharif\'s widow Javeria Siddique.', ur: 'کینین ہائی کورٹ کی جج جنہوں نے بیوہ جویریہ صدیق کی آئینی پٹیشن پر تاریخی فیصلہ دیا۔' }
      }
    ],
    claims: [
      {
        claimId: 'clm-kenya-hc-unlawful-killing',
        findingType: 'court_finding',
        assertion: {
          en: 'Kenya High Court ruled that the shooting of Arshad Sharif by Kenyan police officers was arbitrary, unconstitutional, and violated Article 26(1) of the Constitution of Kenya.',
          ur: 'کینین ہائی کورٹ نے فیصلہ دیا کہ کینین پولیس کی جانب سے ارشد شریف پر فائرنگ ماورائے آئین اور حقِ زندگی کی صریح خلاف ورزی تھی۔'
        },
        attributedParty: { en: 'High Court of Kenya at Machakos (Petition E007 of 2023)', ur: 'کینین ہائی کورٹ ماچاکوس' },
        sourceIds: ['src-kenya-high-court-ruling-2024']
      },
      {
        claimId: 'clm-jit-targeted-assassination',
        findingType: 'investigative_finding',
        assertion: {
          en: 'Pakistani 2-member Fact-Finding JIT concluded that the killing was a pre-planned targeted assassination rather than a case of mistaken identity.',
          ur: 'پاکستانی 2 رکنی فیکٹ فائنڈنگ کمیٹی نے نتیجہ اخذ کیا کہ یہ قتل غلط شناخت کا حادثہ نہیں بلکہ باضابطہ ٹارگٹ کلنگ تھی۔'
        },
        attributedParty: { en: 'Pakistani Fact-Finding Team Report (December 2022)', ur: 'پاکستانی فیکٹ فائنڈنگ جے آئی ٹی رپورٹ' },
        sourceIds: ['src-pk-arshad-jit-report-2022']
      },
      {
        claimId: 'clm-arshad-sc-suomotu-fir',
        findingType: 'court_finding',
        assertion: {
          en: 'Supreme Court of Pakistan invoked Article 184(3) in Suo Motu Case 8/2022, ordering registration of a first information report (FIR) in Islamabad and directing the federal government to constitute a special joint investigation team.',
          ur: 'سپریم کورٹ آف پاکستان نے ازخود نوٹس کیس 8/2022 میں اسلام آباد میں قتل کی ایف آئی آر درج کرنے اور خصوصی جے آئی ٹی تشکیل دینے کا حکم دیا۔'
        },
        attributedParty: { en: 'Supreme Court 5-Member Bench (SMC 8/2022)', ur: 'سپریم کورٹ 5 رکنی بینچ' },
        sourceIds: ['src-pk-sc-suo-motu-2022']
      }
    ],
    officialPositions: [
      {
        positionId: 'pos-kenya-police-initial',
        institutionOrParty: { en: 'National Police Service (Kenya)', ur: 'کینین نیشنل پولیس سروس' },
        statementDate: '2022-10-24',
        summary: {
          en: 'Initial police statement claimed officers opened fire after the vehicle breached a roadblock set up following a reported car theft in Nairobi.',
          ur: 'ابتدائی پولیس بیان میں مؤقف اپنایا گیا کہ فائرنگ گاڑی چوری کے شبہ میں ناکے پر گاڑی نہ روکنے کے بعد کی گئی۔'
        },
        sourceId: 'src-pk-arshad-jit-report-2022',
        isDenialOrDefense: true
      }
    ],
    courtFindings: [
      {
        findingId: 'cf-kenya-hc-2024',
        courtName: { en: 'High Court of Kenya (Machakos Law Courts)', ur: 'ہائی کورٹ آف کینیا (ماچاکوس)' },
        caseCitation: 'Petition No. E007 of 2023',
        orderDate: '2024-07-08',
        rulingSummary: {
          en: 'Declared use of lethal force unlawful; issued order of mandamus for independent investigation; ordered Kenyan government to pay 10,000,000 KES in constitutional damages.',
          ur: 'مہلک طاقت کے استعمال کو غیر قانونی قرار دیا، آزادانہ تحقیقات کا حکم دیا اور کینین حکومت کو ایک کروڑ شلنگ ہرجانہ ادا کرنے کا حکم دیا۔'
        },
        sourceId: 'src-kenya-high-court-ruling-2024'
      }
    ],
    mediaArchive: [],
    constitutionalProvisions: ['PK-CONST-A009', 'PK-CONST-A010A', 'PK-CONST-A019', 'PK-CONST-A184'],
    relatedRecordIds: [
      'rec-pk-journalist-arshad-sharif-profile',
      'rec-pk-2022-arshad-sharif-killing',
      'rec-pk-2022-arshad-sharif-jit-report',
      'rec-pk-2022-arshad-sharif-sc-suomotu'
    ],
    unresolvedQuestions: [
      {
        en: 'The identities and roles of individuals in Pakistan and the UAE who allegedly facilitated Sharif\'s travel and lodging arrangements in Kenya remain unprosecuted.',
        ur: 'پاکستان اور متحدہ عرب امارات میں ارشد شریف کے سفر اور کینیا میں قیام کا بندوبست کرنے والے افراد کے قانونی ٹرائل اور محرکات ابھی تک حل طلب ہیں۔'
      },
      {
        en: 'Formal bilateral mutual legal assistance (MLA) and extradition of key persons of interest between Kenya and Pakistan remain unexecuted.',
        ur: 'کینیا اور پاکستان کے درمیان قانونی معاونت (MLA) اور مشکوک افراد کی حوالگی کا عمل تاحال مکمل نہیں ہو سکا۔'
      }
    ],
    sources: [
      {
        sourceId: 'src-kenya-high-court-ruling-2024',
        sourceType: 'court_judgment',
        title: { en: 'Javeria Siddique & Others v Attorney General of Kenya & Others (Petition E007/2023)', ur: 'جویریہ صدیق بنام اٹارنی جنرل کینیا — کینین ہائی کورٹ فیصلہ (2024ء)' },
        publisher: { en: 'High Court of Kenya at Machakos', ur: 'ہائی کورٹ آف کینیا' },
        publisherOrIssuingAuthority: 'High Court of Kenya at Machakos',
        publicationDate: { dateString: '2024-07-08', precision: 'day', formattedDisplay: { en: 'July 8, 2024', ur: '8 جولائی 2024ء' } },
        judgmentDate: '2024-07-08',
        documentIdentifier: 'Petition No. E007 of 2023',
        pageOrParagraph: 'Machakos Petition E007/2023, Paragraphs 58-64 (Finding State Responsibility & 10m KES Award)',
        officialUrl: 'http://kenyalaw.org/caselaw/cases/view/256789/',
        language: 'en',
        verificationTier: 'primary_verified',
        verificationStatus: 'primary_source',
        sourceAvailability: 'accessible',
        authenticityStatus: 'official_document',
        reviewerNotes: 'Official judgment from Kenya Law official judicial database.'
      },
      {
        sourceId: 'src-pk-arshad-jit-report-2022',
        sourceType: 'commission_report',
        title: { en: 'Fact Finding Report into the Murder of Mr. Arshad Sharif (592 Pages)', ur: 'ارشد شریف قتل کیس کی 592 صفحات پر مشتمل فیکٹ فائنڈنگ رپورٹ' },
        publisher: { en: 'Government of Pakistan Special Fact-Finding Committee', ur: 'حکومتِ پاکستان خصوصی فیکٹ فائنڈنگ کمیٹی' },
        publisherOrIssuingAuthority: 'Special Fact-Finding Committee, Ministry of Interior, Pakistan',
        publicationDate: { dateString: '2022-12-07', precision: 'day', formattedDisplay: { en: 'December 7, 2022', ur: '7 دسمبر 2022ء' } },
        language: 'en',
        verificationTier: 'primary_verified',
        verificationStatus: 'primary_source',
        sourceAvailability: 'accessible',
        authenticityStatus: 'official_document',
        reviewerNotes: 'Official 592-page executive investigative report submitted to Supreme Court.'
      },
      {
        sourceId: 'src-pk-sc-suo-motu-2022',
        sourceType: 'supreme_court_record',
        title: { en: 'Supreme Court of Pakistan Suo Motu Case No. 8 of 2022 Proceedings', ur: 'سپریم کورٹ ازخود نوٹس کیس 8 برائے 2022ء کی کارروائی' },
        publisher: { en: 'Supreme Court of Pakistan', ur: 'سپریم کورٹ آف پاکستان' },
        publisherOrIssuingAuthority: 'Supreme Court of Pakistan',
        publicationDate: { dateString: '2022-12-06', precision: 'day', formattedDisplay: { en: 'December 6, 2022', ur: '6 دسمبر 2022ء' } },
        judgmentDate: '2022-12-06',
        documentIdentifier: 'SMC 8/2022',
        officialUrl: 'https://www.supremecourt.gov.pk',
        language: 'en',
        verificationTier: 'primary_verified',
        verificationStatus: 'primary_source',
        sourceAvailability: 'accessible',
        authenticityStatus: 'official_document',
        reviewerNotes: 'Official Supreme Court order sheet.'
      }
    ],
    editorialStatus: 'published',
    verificationStatus: 'verified',
    legalProceedingStatus: 'under_investigation',
    hasActiveReportingBan: false,
    pendingProceedingsNotice: {
      en: 'Notice of Ongoing Proceedings: While the High Court of Kenya ruled the police shooting unconstitutional on 8 July 2024, the Supreme Court of Pakistan Suo Motu Case (SMC 8/2022) and Kenyan criminal investigations into named shooters remain active.',
      ur: 'زیرِ سماعت کارروائی کا نوٹس: کینیا ہائی کورٹ نے 8 جولائی 2024ء کو فائرنگ کو غیر آئینی قرار دیا، تاہم سپریم کورٹ پاکستان کا ازخود نوٹس کیس (SMC 8/2022) اور ملزمان کے خلاف تحقیقات زیرِ التواء ہیں۔'
    },
    lastLegalStatusChecked: '2024-07-15',
    privacyReview: {
      hasSensitivePersonalData: false,
      piiRedacted: true,
      allegationsDistinguishedFromFindings: true,
      officialDenialsIncluded: true,
      riskAssessment: 'low',
      lastReviewedDate: '2024-07-15',
      reviewerNotes: 'Anchored by the authoritative judgment of the High Court of Kenya and official JIT records.'
    },
    featuredRecordId: 'rec-pk-2022-arshad-sharif-killing',
    recordCount: 4,
    iconName: 'Newspaper',
    tagColor: '#F59E0B',
    version: 1,
    createdAt: '2022-12-08T00:00:00Z',
    updatedAt: '2024-07-15T00:00:00Z'
  },

  // =========================================================================
  // 7. JOURNALISM & PRESS FREEDOM: ATTACKS ON JOURNALISTS & COERCION
  // =========================================================================
  {
    id: 'dos-pk-journalism-press-attacks-impunity',
    slug: 'journalism-attacks-coercion-disappearances-impunity-2022-2024',
    domain: 'journalism_press_freedom',
    title: {
      en: 'Attacks on Journalists, Broadcast Blackouts & Impunity Dossier (2022–2024)',
      ur: 'صحافیوں پر حملے، نشریاتی بلیک آؤٹ اور عدم احتساب کی فائل (2022ء تا 2024ء)'
    },
    overview: {
      en: 'Systematic documentation of physical assaults, prolonged enforced disappearances, parallel sedition FIRs, and regulatory channel off-airings targeting media workers and journalists in Pakistan between 2022 and 2024, examining legal remedies before High Courts and persistent impunity.',
      ur: '2022ء سے 2024ء کے دوران صحافیوں پر حملوں، جبری گمشدگیوں، بغاوت کے مقدمات اور ٹی وی چینلز کی نشریات کی بندش کا قانونی ریکارڈ، ہائی کورٹس میں دائر پٹیشنز اور عدم احتساب کا جائزہ۔'
    },
    scopeAndTerminology: {
      en: 'Restricted to documented cases involving active legal proceedings, High Court habeas corpus orders, and published statements by independent monitoring bodies (CPJ, RSF, HRCP).',
      ur: 'ہائی کورٹس میں حبسِ بے جا کی پٹیشنز، عدالتی احکامات اور بین الاقوامی صحافتی تنظیموں کے مصدقہ ریکارڈ تک محدود ہے۔'
    },
    chronology: [
      {
        date: '2022-05-15',
        dateDisplay: { en: 'May 2022', ur: 'مئی 2022ء' },
        title: { en: 'Multiple Sedition FIRs Registered Across Districts', ur: 'مختلف اضلاع میں صحافیوں کے خلاف بغاوت کے مقدمات' },
        description: { en: 'Simultaneous identical criminal complaints lodged in distant jurisdictions against prominent television journalists.', ur: 'مختلف صوبوں کے دور دراز اضلاع میں صحافیوں کے خلاف ایک جیسے مقدمات کا اندراج۔' },
        sourceIds: ['src-ihc-pemra-order-2022']
      },
      {
        date: '2022-08-10',
        dateDisplay: { en: 'August 2022', ur: 'اگست 2022ء' },
        title: { en: 'Suspension of ARY News Broadcast Transmission', ur: 'اے آر وائی نیوز کی نشریات کی معطلی' },
        description: { en: 'PEMRA ordered cable operators to cease transmission; Islamabad High Court subsequently ruled the blanket action unlawful.', ur: 'پیمرا نے نشریات بند کرائیں جسے بعد ازاں اسلام آباد ہائی کورٹ نے غیر قانونی قرار دیا۔' },
        sourceIds: ['src-ihc-pemra-order-2022']
      },
      {
        date: '2023-05-11',
        dateDisplay: { en: '11 May 2023', ur: '11 مئی 2023ء' },
        title: { en: 'Disappearance of Anchor Imran Riaz Khan', ur: 'اینکر عمران ریاض خان کی گرفتاری اور گمشدگی' },
        description: { en: 'Arrested at Sialkot airport; subsequently disappeared for over four months before safe recovery following LHC contempt warnings.', ur: 'سیالکوٹ ایئرپورٹ سے گرفتاری کے بعد 4 ماہ تک گمشدگی اور لاہور ہائی کورٹ کے احکامات کے بعد بازیابی۔' },
        sourceIds: ['src-rsf-pakistan-report-2023']
      }
    ],
    keyActors: [
      {
        actorId: 'act-cjp-bhatti',
        name: { en: 'Chief Justice Muhammad Ameer Bhatti (LHC)', ur: 'چیف جسٹس محمد امیر بھٹی (لاہور ہائی کورٹ)' },
        roleType: 'judicial_body',
        neutralDescription: { en: 'Presided over habeas corpus proceedings regarding missing journalists, summoning senior police leadership.', ur: 'لاہور ہائی کورٹ میں حبسِ بے جا کی درخواستوں پر سماعت کر کے پولیس سربراہ کو طلب کیا۔' }
      },
      {
        actorId: 'act-pemra',
        name: { en: 'Pakistan Electronic Media Regulatory Authority (PEMRA)', ur: 'پیمرا (پاکستان الیکٹرانک میڈیا ریگولیٹری اتھارٹی)' },
        roleType: 'institution',
        neutralDescription: { en: 'Statutory broadcast regulatory authority that issued off-airing directives and transmission bans.', ur: 'نشریات کی معطلی اور پروگرامز پر پابندی کے نوٹس جاری کرنے والا ادارہ۔' }
      }
    ],
    claims: [
      {
        claimId: 'clm-ihc-pemra-ban-illegal',
        findingType: 'court_finding',
        assertion: {
          en: 'Islamabad High Court ruled that regulatory off-airing without due process violates freedom of expression under Article 19.',
          ur: 'اسلام آباد ہائی کورٹ نے فیصلہ دیا کہ بغیر شفاف کارروائی نشریات بند کرنا آئین کے آرٹیکل 19 کی خلاف ورزی ہے۔'
        },
        attributedParty: { en: 'Islamabad High Court (WP 2894/2022)', ur: 'اسلام آباد ہائی کورٹ' },
        sourceIds: ['src-ihc-pemra-order-2022']
      },
      {
        claimId: 'clm-press-parallel-firs',
        findingType: 'official_position',
        assertion: {
          en: 'Judicial records before the High Courts documented the simultaneous registration of multiple identical sedition and criminal complaints across disparate police stations in different provinces against critical media anchors.',
          ur: 'ہائی کورٹس کے عدالتی ریکارڈ کے مطابق مختلف صوبوں کے دور دراز تھانوں میں اینکرز اور صحافیوں کے خلاف ایک ہی نوعیت کے بغاوت کے متعدد مقدمات بیک وقت درج کیے گئے۔'
        },
        attributedParty: { en: 'High Court Record / Judicial Observations', ur: 'ہائی کورٹ ریکارڈ / عدالتی کارروائی' },
        sourceIds: ['src-ihc-pemra-order-2022']
      },
      {
        claimId: 'clm-press-enforced-disappearance',
        findingType: 'documented_fact',
        assertion: {
          en: 'Judicial habeas corpus petitions before the Lahore High Court documented the unacknowledged detention and disappearance of television commentator Imran Riaz Khan for over 140 days following his arrest at Sialkot Airport in May 2023.',
          ur: 'لاہور ہائی کورٹ میں دائر حبس بے جا کی پٹیشنز کے مطابق ٹی وی اینکر عمران ریاض خان کو مئی 2023ء میں سیالکوٹ ایئرپورٹ سے گرفتاری کے بعد 140 سے زائد دنوں تک نامعلوم تحویل میں رکھا گیا۔'
        },
        attributedParty: { en: 'Lahore High Court Habeas Corpus Proceedings', ur: 'لاہور ہائی کورٹ عدالتی کارروائی' },
        sourceIds: ['src-ihc-pemra-order-2022', 'src-rsf-pakistan-report-2023']
      }
    ],
    officialPositions: [
      {
        positionId: 'pos-pemra-defense',
        institutionOrParty: { en: 'PEMRA Legal Counsel', ur: 'پیمرا قانونی ٹیم' },
        statementDate: '2022-08-15',
        summary: {
          en: 'Maintained that regulatory notices were issued to enforce the Electronic Media Code of Conduct regarding unverified commentary against institutions.',
          ur: 'مؤقف پیش کیا کہ اداروں کے خلاف بیانات پر میڈیا ضابطہ اخلاق کے تحت نوٹس جاری کیے گئے۔'
        },
        sourceId: 'src-ihc-pemra-order-2022',
        isDenialOrDefense: true
      }
    ],
    mediaArchive: [],
    constitutionalProvisions: ['PK-CONST-A009', 'PK-CONST-A010A', 'PK-CONST-A019', 'PK-CONST-A019A'],
    relatedRecordIds: ['rec-pk-journalism-systemic-attacks-2022-2024'],
    unresolvedQuestions: [
      {
        en: 'The perpetrators behind physical attacks and abductions of journalists in the federal capital have not been identified or convicted in competent courts.',
        ur: 'دارالحکومت میں صحافیوں پر حملوں اور اغوا کے ذمہ داران کا عدالتوں میں ٹرائل اور سزا کا عمل تاحال نامکمل ہے۔'
      }
    ],
    sources: [
      {
        sourceId: 'src-ihc-pemra-order-2022',
        sourceType: 'high_court_record',
        title: { en: 'IHC Order in ARY Communications v PEMRA (WP 2894/2022)', ur: 'اسلام آباد ہائی کورٹ کا حکم نامہ بنام پیمرا (WP 2894/2022)' },
        publisher: { en: 'Islamabad High Court', ur: 'اسلام آباد ہائی کورٹ' },
        publisherOrIssuingAuthority: 'Islamabad High Court',
        publicationDate: { dateString: '2022-08-16', precision: 'day', formattedDisplay: { en: 'August 16, 2022', ur: '16 اگست 2022ء' } },
        judgmentDate: '2022-08-16',
        documentIdentifier: 'WP No. 2894 of 2022',
        officialUrl: 'https://mis.ihc.gov.pk',
        language: 'en',
        verificationTier: 'primary_verified',
        verificationStatus: 'primary_source',
        sourceAvailability: 'accessible',
        authenticityStatus: 'official_document',
        reviewerNotes: 'Official high court operative order inspected.'
      },
      {
        sourceId: 'src-rsf-pakistan-report-2023',
        sourceType: 'international_organization',
        title: { en: 'Reporters Without Borders: Pakistan Press Freedom Annual Report 2023', ur: 'رپورٹرز ود آؤٹ بارڈرز پاکستان پریس فریڈم رپورٹ 2023ء' },
        publisher: { en: 'Reporters Without Borders', ur: 'رپورٹرز ود آؤٹ بارڈرز' },
        publisherOrIssuingAuthority: 'Reporters Without Borders (RSF)',
        publicationDate: { dateString: '2023-05-03', precision: 'day', formattedDisplay: { en: 'May 3, 2023', ur: '3 مئی 2023ء' } },
        language: 'en',
        verificationTier: 'secondary_corroborated',
        verificationStatus: 'source_reviewed',
        sourceAvailability: 'accessible',
        authenticityStatus: 'publisher_verified',
        reviewerNotes: 'Annual international media rights assessment report.'
      }
    ],
    editorialStatus: 'under_review',
    verificationStatus: 'corroborated',
    legalProceedingStatus: 'ongoing',
    hasActiveReportingBan: false,
    pendingProceedingsNotice: {
      en: 'Notice of Ongoing Matters: Regulatory appeals regarding television off-airing and subordinate court FIRs against media personnel remain subject to ongoing High Court and trial court proceedings.',
      ur: 'زیرِ التواء معاملات کا نوٹس: ٹی وی نشریات بندش اور صحافیوں پر مقدمات سے متعلق درخواستیں ہائی کورٹس میں زیرِ سماعت ہیں۔'
    },
    lastLegalStatusChecked: '2024-05-01',
    privacyReview: {
      hasSensitivePersonalData: true,
      piiRedacted: true,
      allegationsDistinguishedFromFindings: true,
      officialDenialsIncluded: true,
      riskAssessment: 'medium',
      lastReviewedDate: '2024-05-01',
      reviewerNotes: 'Protected witnesses and non-public complainant identities redacted; only judicial orders cited.'
    },
    featuredRecordId: 'rec-pk-journalism-systemic-attacks-2022-2024',
    recordCount: 1,
    iconName: 'Newspaper',
    tagColor: '#F59E0B',
    version: 1,
    createdAt: '2023-06-15T00:00:00Z',
    updatedAt: '2024-05-01T00:00:00Z'
  },

  // =========================================================================
  // 8. HISTORICAL RECORDS: 1971 SEPARATION OF EAST PAKISTAN
  // =========================================================================
  {
    id: 'dos-pk-hist-hamoodur-rahman-1971',
    slug: 'hamoodur-rahman-commission-1971-east-pakistan-transition',
    domain: 'historical_institutional',
    title: {
      en: 'Hamoodur Rahman Commission & 1971 East Pakistan Transition Dossier',
      ur: 'حمود الرحمٰن کمیشن رپورٹ اور 1971ء کے تاریخی واقعات کی فائل'
    },
    overview: {
      en: 'Authoritative historical dossier examining the declassified findings of the Commission of Inquiry appointed under Chief Justice Hamoodur Rahman to investigate the 1971 political crisis, military operations in East Pakistan, surrender at Dhaka, and structural institutional lessons.',
      ur: 'چیف جسٹس حمود الرحمٰن کی سربراہی میں قائم جوڈیشل انکوائری کمیشن کی ڈی کلاسیفائیڈ رپورٹ کا تاریخی احاطہ، جس میں 1971ء کے سیاسی بحران، مشرقی پاکستان میں فوجی آپریشن، ہتھیار ڈالنے کے اسباب اور ادارہ جاتی اصلاحات کا جائزہ لیا گیا۔'
    },
    scopeAndTerminology: {
      en: 'Based directly upon the official declassified Supplementary Report of the Hamoodur Rahman Commission, avoiding retrospective political interpretations.',
      ur: 'کمیشن کی باضابطہ ڈی کلاسیفائیڈ سپلیمنٹری رپورٹ پر مبنی ہے جس میں گواہوں کے بیانات اور عدالتی نتائج شامل ہیں۔'
    },
    chronology: [
      {
        date: '1971-03-25',
        dateDisplay: { en: '25 March 1971', ur: '25 مارچ 1971ء' },
        title: { en: 'Launch of Operation Searchlight', ur: 'آپریشن سرچ لائٹ کا آغاز' },
        description: { en: 'Military operation launched in East Pakistan following postponement of the National Assembly session.', ur: 'قومی اسمبلی کا اجلاس ملتوی ہونے کے بعد مشرقی پاکستان میں فوجی کارروائی کا آغاز۔' },
        sourceIds: ['src-pk-hist-hamoodur-report-1974']
      },
      {
        date: '1971-12-16',
        dateDisplay: { en: '16 December 1971', ur: '16 دسمبر 1971ء' },
        title: { en: 'Surrender at Dhaka Racecourse', ur: 'ڈھاکہ میں ہتھیار ڈالنے کا معاہدہ' },
        description: { en: 'Eastern Command signed the instrument of surrender following the Indo-Pakistani War of 1971.', ur: '1971ء کی جنگ کے بعد ایسٹرن کمانڈ نے ہتھیار ڈالنے کے دستاویز پر دستخط کیے۔' },
        sourceIds: ['src-pk-hist-hamoodur-report-1974']
      },
      {
        date: '1971-12-26',
        dateDisplay: { en: '26 December 1971', ur: '26 دسمبر 1971ء' },
        title: { en: 'Constitution of Commission of Inquiry', ur: 'حمود الرحمٰن کمیشن کا قیام' },
        description: { en: 'President Zulfikar Ali Bhutto appointed Chief Justice Hamoodur Rahman to head the inquiry commission.', ur: 'صدر ذوالفقارعلی بھٹو نے چیف جسٹس حمود الرحمٰن کی سربراہی میں انکوائری کمیشن قائم کیا۔' },
        sourceIds: ['src-pk-hist-hamoodur-report-1974']
      },
      {
        date: '2000-08-15',
        dateDisplay: { en: 'August 2000', ur: 'اگست 2000ء' },
        title: { en: 'Declassification of Supplementary Report', ur: 'سپلیمنٹری رپورٹ کو پبلک کیا جانا' },
        description: { en: 'Government of Pakistan formally declassified the Supplementary Report following press leaks.', ur: 'حکومتِ پاکستان نے حمود الرحمٰن کمیشن کی سپلیمنٹری رپورٹ کو باضابطہ طور پر ڈی کلاسیفائی کیا۔' },
        sourceIds: ['src-pk-hist-hamoodur-report-1974']
      }
    ],
    keyActors: [
      {
        actorId: 'act-hamoodur-rahman',
        name: { en: 'Chief Justice Hamoodur Rahman', ur: 'چیف جسٹس حمود الرحمٰن' },
        roleType: 'judicial_body',
        neutralDescription: { en: 'Chief Justice of Pakistan from 1968 to 1975, jurist of Bengali origin who headed the inquiry commission.', ur: 'چیف جسٹس آف پاکستان جنہوں نے غیر جانبدارانہ عدالتی انکوائری رپورٹ مرتب کی۔' }
      }
    ],
    claims: [
      {
        claimId: 'clm-hamoodur-political-failure',
        findingType: 'commission_finding',
        assertion: {
          en: 'The Commission concluded that the separation of East Pakistan was the culmination of prolonged political disenfranchisement and catastrophic military command failure.',
          ur: 'کمیشن نے نتیجہ اخذ کیا کہ سقوطِ مشرقی پاکستان طویل سیاسی ناانصافی اور عسکری قیادت کی تباہ کن حکمتِ عملی کا نتیجہ تھا۔'
        },
        attributedParty: { en: 'Hamoodur Rahman Commission Supplementary Report', ur: 'حمود الرحمٰن کمیشن سپلیمنٹری رپورٹ' },
        sourceIds: ['src-pk-hist-hamoodur-report-1974']
      },
      {
        claimId: 'clm-hamoodur-declass-2000',
        findingType: 'official_position',
        assertion: {
          en: 'Government of Pakistan formally declassified the Supplementary Report of the Hamoodur Rahman Commission in August 2000, confirming its official authenticity.',
          ur: 'حکومتِ پاکستان نے اگست 2000ء میں حمود الرحمٰن کمیشن کی سپلیمنٹری رپورٹ کو باضابطہ طور پر ڈی کلاسیفائی کر کے اس کی سرکاری صداقت کی تصدیق کی۔'
        },
        attributedParty: { en: 'Cabinet Division, Government of Pakistan', ur: 'کابینہ ڈویژن، حکومتِ پاکستان' },
        sourceIds: ['src-pk-hist-hamoodur-report-1974']
      },
      {
        claimId: 'clm-hamoodur-court-martial-recom',
        findingType: 'commission_finding',
        assertion: {
          en: 'The Commission formally recommended trial by public court-martial of senior military commanders including General A.A.K. Niazi for operational surrenders, personal misconduct, and atrocities committed in East Pakistan.',
          ur: 'کمیشن نے جنرل اے اے کے نیازی سمیت اعلیٰ عسکری کمانڈرز کے خلاف محاذ چھوڑنے، ذاتی بدعنوانی اور مظالم پر پبلک کورٹ مارشل کی باضابطہ سفارش کی۔'
        },
        attributedParty: { en: 'Hamoodur Rahman Commission Supplementary Report', ur: 'حمود الرحمٰن کمیشن رپورٹ' },
        sourceIds: ['src-pk-hist-hamoodur-report-1974']
      }
    ],
    officialPositions: [
      {
        positionId: 'pos-hamoodur-declass',
        institutionOrParty: { en: 'Government of Pakistan (Cabinet Division)', ur: 'حکومتِ پاکستان (کابینہ ڈویژن)' },
        statementDate: '2000-08-20',
        summary: {
          en: 'Cabinet Division released the declassified supplementary report confirming its authenticity and historical significance.',
          ur: 'کابینہ ڈویژن نے رپورٹ کو پبلک کر کے اس کی تاریخی حیثیت اور صداقت کی تصدیق کی۔'
        },
        sourceId: 'src-pk-hist-hamoodur-report-1974',
        isDenialOrDefense: false
      }
    ],
    mediaArchive: [],
    constitutionalProvisions: ['PK-CONST-A001', 'PK-CONST-A005'],
    relatedRecordIds: ['rec-pk-hist-hamoodur-rahman-commission-1971'],
    unresolvedQuestions: [
      {
        en: 'The original primary volume of testimony records remains classified in sensitive national archives.',
        ur: 'گواہوں کے تفصیلی بیانات پر مشتمل مرکزی جلدوں کا کچھ حصہ تاحال قومی آرکائیو میں کلاسیفائیڈ ہے۔'
      }
    ],
    sources: [
      {
        sourceId: 'src-pk-hist-hamoodur-report-1974',
        sourceType: 'commission_report',
        title: { en: 'The Report of the Hamoodur Rahman Commission of Inquiry into the 1971 War', ur: '1971ء کی جنگ پر حمود الرحمٰن انکوائری کمیشن کی سپلیمنٹری رپورٹ' },
        publisher: { en: 'Government of Pakistan', ur: 'حکومتِ پاکستان' },
        publisherOrIssuingAuthority: 'Government of Pakistan (Cabinet Division)',
        publicationDate: { dateString: '2000-08-15', precision: 'day', formattedDisplay: { en: 'August 15, 2000', ur: '15 اگست 2000ء' } },
        documentIdentifier: 'HRC-SUPP-1974',
        language: 'en',
        verificationTier: 'primary_verified',
        verificationStatus: 'primary_source',
        sourceAvailability: 'archived_copy_available',
        authenticityStatus: 'official_document',
        reviewerNotes: 'Official declassified Supplementary Report printed and published by Government of Pakistan.'
      }
    ],
    editorialStatus: 'published',
    verificationStatus: 'verified',
    legalProceedingStatus: 'concluded',
    hasActiveReportingBan: false,
    lastLegalStatusChecked: '2023-08-01',
    privacyReview: {
      hasSensitivePersonalData: false,
      piiRedacted: true,
      allegationsDistinguishedFromFindings: true,
      officialDenialsIncluded: true,
      riskAssessment: 'low',
      lastReviewedDate: '2023-08-01',
      reviewerNotes: 'Official declassified government inquiry report.'
    },
    featuredRecordId: 'rec-pk-hist-hamoodur-rahman-commission-1971',
    recordCount: 1,
    iconName: 'History',
    tagColor: '#10B981',
    version: 1,
    createdAt: '2023-08-01T00:00:00Z',
    updatedAt: '2023-08-01T00:00:00Z'
  },

  // =========================================================================
  // 9. PUBLIC INSTITUTIONS & SOEs: PAKISTAN STEEL MILLS (PLD 2006 SC 697)
  // =========================================================================
  {
    id: 'dos-pk-soe-pakistan-steel-mills-2006',
    slug: 'pakistan-steel-mills-privatization-annulment-pld-2006-sc-697',
    domain: 'historical_institutional',
    title: {
      en: 'Pakistan Steel Mills 2006 Privatization Annulment Reference (PLD 2006 SC 697)',
      ur: 'پاکستان سٹیل ملز نجکاری منسوخی ریفرنس 2006ء (PLD 2006 SC 697)'
    },
    overview: {
      en: 'Constitutional and public assets dossier detailing the unanimous 9-judge Supreme Court of Pakistan judgment annulling the proposed privatization of Pakistan Steel Mills Corporation (PSMC) due to omission of Council of Common Interests (CCI) approval, asset undervaluation, and procedural haste.',
      ur: 'پاکستان سٹیل ملز کی نجکاری کے عمل کو مشترکہ مفادات کونسل (سی سی آئی) کی منظوری کے بغیر، اثاثوں کی کم قیمت اور جلد بازی پر مبنی قرار دے کر کالعدم کرنے کے سپریم کورٹ کے 9 رکنی بینچ کے تاریخی فیصلے کا احاطہ۔'
    },
    scopeAndTerminology: {
      en: 'Covers constitutional jurisdiction of the Council of Common Interests under Articles 153 and 154, public asset valuation standards, and Article 184(3) judicial review.',
      ur: 'مشترکہ مفادات کونسل کے آئینی اختیارات (آرٹیکل 153، 154)، سرکاری املاک کے تخمینہ قیمت اور عدالتی جائزے کا احاطہ کرتا ہے۔'
    },
    chronology: [
      {
        date: '2006-03-31',
        dateDisplay: { en: '31 March 2006', ur: '31 مارچ 2006ء' },
        title: { en: 'Privatization Commission Auction', ur: 'نجکاری کمیشن کی نیلامی' },
        description: { en: 'Privatization Commission approved the sale of 75% equity of Pakistan Steel Mills to a 3-party consortium for PKR 21.68 billion.', ur: 'نجکاری کمیشن نے سٹیل ملز کے 75 فیصد حصص 21.68 ارب روپے میں فروخت کرنے کی منظوری دی۔' },
        sourceIds: ['src-sc-steel-mills-judgment-2006']
      },
      {
        date: '2006-06-23',
        dateDisplay: { en: '23 June 2006', ur: '23 جون 2006ء' },
        title: { en: 'Unanimous 9-Judge Supreme Court Ruling', ur: 'سپریم کورٹ کے 9 رکنی بینچ کا متفقہ فیصلہ' },
        description: { en: 'Supreme Court declared the Share Purchase Agreement void ab initio, ruling that PSMC was an enterprise governed by the CCI.', ur: 'سپریم کورٹ نے نجکاری معاہدے کو کالعدم قرار دے کر فیصلہ دیا کہ مشترکہ مفادات کونسل کی منظوری لازمی تھی۔' },
        sourceIds: ['src-sc-steel-mills-judgment-2006']
      }
    ],
    keyActors: [
      {
        actorId: 'act-cjp-chaudhry',
        name: { en: 'Chief Justice Iftikhar Muhammad Chaudhry', ur: 'چیف جسٹس افتخار محمد چوہدری' },
        roleType: 'judicial_body',
        neutralDescription: { en: 'Head of the 9-judge larger bench that heard the constitutional petitions against the privatization.', ur: '9 رکنی بینچ کے سربراہ جنہوں نے متفقہ فیصلہ دیا۔' }
      }
    ],
    claims: [
      {
        claimId: 'clm-steel-mills-cci-mandatory',
        findingType: 'court_finding',
        assertion: {
          en: 'Supreme Court held that the privatization of an enterprise falling in the Federal Legislative List Part II requires prior approval and policy direction from the Council of Common Interests.',
          ur: 'سپریم کورٹ نے فیصلہ دیا کہ فیڈرل لیجسلیٹو لسٹ پارٹ ٹو کے تحت مشترکہ مفادات کونسل کی پیشگی منظوری کے بغیر نجکاری غیر آئینی ہے۔'
        },
        attributedParty: { en: 'Supreme Court of Pakistan (PLD 2006 SC 697)', ur: 'سپریم کورٹ آف پاکستان' },
        sourceIds: ['src-sc-steel-mills-judgment-2006']
      },
      {
        claimId: 'clm-steel-mills-spa-annulled',
        findingType: 'court_finding',
        assertion: {
          en: 'Supreme Court unanimously declared the Letter of Acceptance and Share Purchase Agreement (selling 75% equity for PKR 21.68 billion) void ab initio due to valuation flaws, procedural haste, and disregard of statutory advice.',
          ur: 'سپریم کورٹ نے 75 فیصد حصص کی 21.68 ارب روپے میں فروخت اور معاہدہ بیع کو اثاثوں کی کم قیمت اور طریقہ کار کی بے ضابطگیوں پر آغاز ہی سے باطل قرار دیا۔'
        },
        attributedParty: { en: 'Supreme Court 9-Judge Bench (PLD 2006 SC 697)', ur: 'سپریم کورٹ 9 رکنی بینچ' },
        sourceIds: ['src-sc-steel-mills-judgment-2006']
      },
      {
        claimId: 'clm-steel-mills-land-valuation',
        findingType: 'court_finding',
        assertion: {
          en: 'Supreme Court recorded that the privatization transaction failed to properly value 4,457 acres of core operational land and deep-sea jetty assets belonging to Pakistan Steel Mills, resulting in a gross undervaluation against the public interest.',
          ur: 'سپریم کورٹ نے قرار دیا کہ نجکاری کے عمل میں پاکستان اسٹیل کی 4,457 ایکڑ اراضی اور جیٹی اثاثوں کی منصفانہ قیمت کا تعین نہیں کیا گیا جس سے قومی خزانے کو نقصان پہنچا۔'
        },
        attributedParty: { en: 'Supreme Court 9-Member Bench (PLD 2006 SC 697)', ur: 'سپریم کورٹ 9 رکنی بینچ' },
        sourceIds: ['src-sc-steel-mills-judgment-2006']
      }
    ],
    officialPositions: [
      {
        positionId: 'pos-privatization-comm-2006',
        institutionOrParty: { en: 'Privatization Commission of Pakistan', ur: 'نجکاری کمیشن آف پاکستان' },
        statementDate: '2006-05-10',
        summary: {
          en: 'Argued that the Cabinet Committee on Privatization possessed statutory power under the Privatization Commission Ordinance 2000.',
          ur: 'مؤقف اپنایا کہ نجکاری آرڈیننس 2000 کے تحت کابینہ کمیٹی کو فروخت کا مکمل قانونی اختیار حاصل تھا۔'
        },
        sourceId: 'src-sc-steel-mills-judgment-2006',
        isDenialOrDefense: true
      }
    ],
    courtFindings: [
      {
        findingId: 'cf-steel-mills-annulment',
        courtName: { en: 'Supreme Court of Pakistan', ur: 'سپریم کورٹ آف پاکستان' },
        caseCitation: 'PLD 2006 SC 697',
        orderDate: '2006-06-23',
        rulingSummary: {
          en: 'Letter of Acceptance and Share Purchase Agreement declared void ab initio; process held to be infected with procedural irregularities.',
          ur: 'لیٹر آف ایکسیپٹنس اور معاہدہ بیع کو غیر آئینی قرار دے کر کالعدم کیا گیا؛ اثاثوں کی مالیت کے تعین میں بے ضابطگیوں کی نشاندہی کی گئی۔'
        },
        sourceId: 'src-sc-steel-mills-judgment-2006'
      }
    ],
    mediaArchive: [],
    constitutionalProvisions: ['PK-CONST-A153', 'PK-CONST-A154', 'PK-CONST-A184'],
    relatedRecordIds: ['rec-pk-asset-pakistan-steel-mills-privatization-2006'],
    unresolvedQuestions: [
      {
        en: 'Following the annulment, the mill ceased operations in 2015 due to accumulated gas arrears and operating deficits, creating unresolved restructuring debt obligations.',
        ur: 'فیصلے کے بعد سٹیل ملز مالیاتی خسارے اور گیس کے بقایا جات کے سبب 2015ء میں بند ہو گئی، جس سے ری اسٹرکچرنگ کا حل تاحال تشنہ ہے۔'
      }
    ],
    sources: [
      {
        sourceId: 'src-sc-steel-mills-judgment-2006',
        sourceType: 'court_judgment',
        title: { en: 'Watan Party & Others v Federation of Pakistan (PLD 2006 SC 697)', ur: 'وطن پارٹی بنام وفاقِ پاکستان — پی ایل ڈی 2006ء سپریم کورٹ 697' },
        publisher: { en: 'Supreme Court of Pakistan', ur: 'سپریم کورٹ آف پاکستان' },
        publisherOrIssuingAuthority: 'Supreme Court of Pakistan',
        publicationDate: { dateString: '2006-06-23', precision: 'day', formattedDisplay: { en: 'June 23, 2006', ur: '23 جون 2006ء' } },
        judgmentDate: '2006-06-23',
        documentIdentifier: 'PLD 2006 SC 697',
        pageOrParagraph: 'Paragraphs 45-52 & Operative Order (Per Chaudhry, C.J.)',
        officialUrl: 'https://www.supremecourt.gov.pk',
        language: 'en',
        verificationTier: 'primary_verified',
        verificationStatus: 'primary_source',
        sourceAvailability: 'accessible',
        authenticityStatus: 'official_document',
        reviewerNotes: 'Authoritative reported judgment PLD 2006 SC 697.'
      }
    ],
    editorialStatus: 'published',
    verificationStatus: 'verified',
    legalProceedingStatus: 'concluded',
    hasActiveReportingBan: false,
    lastLegalStatusChecked: '2023-09-01',
    privacyReview: {
      hasSensitivePersonalData: false,
      piiRedacted: true,
      allegationsDistinguishedFromFindings: true,
      officialDenialsIncluded: true,
      riskAssessment: 'low',
      lastReviewedDate: '2023-09-01',
      reviewerNotes: 'Authoritative reported judgment PLD 2006 SC 697.'
    },
    featuredRecordId: 'rec-pk-asset-pakistan-steel-mills-privatization-2006',
    recordCount: 1,
    iconName: 'Scale',
    tagColor: '#EC4899',
    version: 1,
    createdAt: '2023-09-01T00:00:00Z',
    updatedAt: '2023-09-01T00:00:00Z'
  },

  // =========================================================================
  // 10. PUBLIC INSTITUTIONS & SOEs: PIA INSTITUTIONAL CRISIS
  // =========================================================================
  {
    id: 'dos-pk-soe-pia-restructuring-crisis',
    slug: 'pia-institutional-decline-fake-pilot-license-crisis-restructuring',
    domain: 'historical_institutional',
    title: {
      en: 'PIA Institutional Decline, 2020 Pilot License Controversy & Restructuring Dossier',
      ur: 'پی آئی اے ادارہ جاتی تنزلی، پائلٹ لائسنس تنازع اور ری اسٹرکچرنگ فائل'
    },
    overview: {
      en: 'In-depth archival dossier examining the financial accumulation of liabilities in Pakistan International Airlines exceeding PKR 700 billion, the PK-8303 crash inquiry in Karachi, the Aviation Minister\'s Parliamentary speech on suspect pilot credentials, resulting EASA and FAA international bans, and ongoing bifurcation into core and non-core operating companies.',
      ur: 'پی آئی اے پر 700 ارب روپے سے زائد کے قرضوں، کراچی میں طیارہ حادثے (PK-8303)، وزیر ہوا بازی کے پائلٹ لائسنسز کے حوالے سے پارلیمانی بیان، یورپی و امریکی ایوی ایشن پابندیوں اور نجکاری کے لیے کمپنی کی تقسیم کے عمل کا دستاویزی جائزہ۔'
    },
    scopeAndTerminology: {
      en: 'Focuses on parliamentary records, EASA safety directives, official financial audit numbers, and regulatory admissions.',
      ur: 'قومی اسمبلی کی کارروائی، ایاسا (EASA) کے حفاظتی احکامات اور مالیاتی آڈٹ رپورٹس کا احاطہ کرتا ہے۔'
    },
    chronology: [
      {
        date: '2020-05-22',
        dateDisplay: { en: '22 May 2020', ur: '22 مئی 2020ء' },
        title: { en: 'PIA PK-8303 Crash in Karachi', ur: 'کراچی میں پی آئی اے طیارہ حادثہ (PK-8303)' },
        description: { en: 'Airbus A320 operating flight PK-8303 crashed during a go-around near Karachi Airport, resulting in 97 fatalities.', ur: 'کراچی ایئرپورٹ کے قریب لینڈنگ کے دوران طیارہ حادثے کا شکار ہوا جس میں 97 مسافر جاں بحق ہوئے۔' },
        sourceIds: ['src-na-proceedings-24june2020']
      },
      {
        date: '2020-06-24',
        dateDisplay: { en: '24 June 2020', ur: '24 جون 2020ء' },
        title: { en: 'Parliamentary Speech on Pilot Licenses', ur: 'قومی اسمبلی میں پائلٹ لائسنسز سے متعلق بیان' },
        description: { en: 'Federal Minister for Aviation stated on the floor of the National Assembly that 262 active Pakistani pilots held suspect exam credentials.', ur: 'وفاقی وزیر ہوا بازی نے پارلیمنٹ میں بیان دیا کہ 262 پائلٹس کے امتحانی ریکارڈ میں گڑبڑ پائی گئی۔' },
        sourceIds: ['src-na-proceedings-24june2020']
      },
      {
        date: '2020-07-01',
        dateDisplay: { en: '1 July 2020', ur: '1 جولائی 2020ء' },
        title: { en: 'EASA Suspends European Flights', ur: 'یورپی یونین کی جانب سے پروازوں کی معطلی' },
        description: { en: 'EASA suspended PIA third-country operator authorization for EU member states, followed by UK and US regulatory restrictions.', ur: 'ایاسا نے پی آئی اے کے آپریٹنگ اجازت نامے کو معطل کر دیا جس کے بعد برطانیہ اور امریکہ نے بھی پروازیں روک دیں۔' },
        sourceIds: ['src-easa-suspension-notice-2020']
      }
    ],
    keyActors: [
      {
        actorId: 'act-ghulam-sarwar',
        name: { en: 'Ghulam Sarwar Khan', ur: 'غلام سرور خان' },
        roleType: 'public_official',
        officialDesignation: { en: 'Federal Minister for Aviation (2019–2022)', ur: 'وفاقی وزیرِ ہوا بازی' },
        neutralDescription: { en: 'Delivered the 24 June 2020 National Assembly statement disclosing internal inquiry findings regarding CAA examination irregularities.', ur: 'قومی اسمبلی میں مشکوک پائلٹ امتحانات کے بارے میں باضابطہ بیان دیا۔' }
      }
    ],
    claims: [
      {
        claimId: 'clm-pia-parliamentary-statement',
        findingType: 'official_position',
        assertion: {
          en: 'Aviation Minister publicly announced that out of 860 commercial pilots in Pakistan, 262 possessed suspect exam qualifications.',
          ur: 'وزیر ہوا بازی نے پارلیمنٹ کے فلور پر باضابطہ بیان دیا کہ 860 پائلٹس میں سے 262 کے لائسنسز کے امتحانات میں بے ضابطگیاں تھیں۔'
        },
        attributedParty: { en: 'Federal Minister for Aviation', ur: 'وفاقی وزیر ہوا بازی' },
        sourceIds: ['src-na-proceedings-24june2020']
      },
      {
        claimId: 'clm-pia-easa-tco-suspension',
        findingType: 'official_position',
        assertion: {
          en: 'European Union Aviation Safety Agency (EASA) suspended PIA\'s Third Country Operator (TCO) authorization across all EU member states on 1 July 2020, citing concerns over regulatory oversight by the Pakistan Civil Aviation Authority.',
          ur: 'یورپی یونین ایوی ایشن سیفٹی ایجنسی (ایاسا) نے پاکستان سول ایوی ایشن اتھارٹی کے ریگولیٹری نظام پر عدم اطمینان کی بنا پر یکم جولائی 2020ء کو پی آئی اے کا فلائٹ آپریشن معطل کیا۔'
        },
        attributedParty: { en: 'European Union Aviation Safety Agency (EASA)', ur: 'یورپی یونین ایوی ایشن سیفٹی ایجنسی' },
        sourceIds: ['src-easa-suspension-notice-2020']
      },
      {
        claimId: 'clm-pia-pilots-exoneration',
        findingType: 'official_position',
        assertion: {
          en: 'Subsequent Civil Aviation Authority inquiry boards and High Court petitions exonerated dozens of commercial pilots whose names were initially included in the suspect list announced before Parliament.',
          ur: 'سول ایوی ایشن اتھارٹی کے انکوائری بورڈز اور ہائی کورٹس کے احکامات کے تحت پارلیمنٹ میں پیش کی گئی لسٹ میں شامل درجنوں پائلٹس کو الزامات سے بری کیا گیا۔'
        },
        attributedParty: { en: 'Civil Aviation Authority Inquiry Board & High Court Orders', ur: 'سول ایوی ایشن اتھارٹی انکوائری بورڈ و ہائی کورٹ' },
        sourceIds: ['src-na-proceedings-24june2020']
      }
    ],
    officialPositions: [
      {
        positionId: 'pos-easa-suspension',
        institutionOrParty: { en: 'European Union Aviation Safety Agency', ur: 'یورپی یونین ایوی ایشن سیفٹی ایجنسی' },
        statementDate: '2020-07-01',
        summary: {
          en: 'Stated that third-country operator authorization could not continue in the absence of verified Civil Aviation Authority regulatory oversight integrity.',
          ur: 'مؤقف اپنایا کہ ریگولیٹری اوور سائٹ میں کمزوریوں کے خاتمے تک پروازیں بحال نہیں ہو سکتیں۔'
        },
        sourceId: 'src-easa-suspension-notice-2020',
        isDenialOrDefense: false
      }
    ],
    mediaArchive: [],
    constitutionalProvisions: ['PK-CONST-A153', 'PK-CONST-A154'],
    relatedRecordIds: ['rec-pk-soe-pia-institutional-crisis'],
    unresolvedQuestions: [
      {
        en: 'The precise commercial revenue loss resulting from prolonged suspension of direct flights to the UK and EU between 2020 and 2024 has not been independently audited.',
        ur: 'یورپ اور برطانیہ کے لیے پروازوں کی معطلی سے ہونے والے مجموعی تجارتی نقصان کا خودمختار آڈٹ تاحال مکمل نہیں ہوا۔'
      }
    ],
    sources: [
      {
        sourceId: 'src-na-proceedings-24june2020',
        sourceType: 'parliamentary_record',
        title: { en: 'National Assembly of Pakistan Official Debates (24 June 2020)', ur: 'قومی اسمبلی کی باضابطہ کارروائی — 24 جون 2020ء' },
        publisher: { en: 'National Assembly Secretariat', ur: 'قومی اسمبلی سیکرٹریٹ' },
        publisherOrIssuingAuthority: 'National Assembly Secretariat, Pakistan',
        publicationDate: { dateString: '2020-06-24', precision: 'day', formattedDisplay: { en: 'June 24, 2020', ur: '24 جون 2020ء' } },
        documentIdentifier: 'NA-DEB-2020-06-24',
        officialUrl: 'https://na.gov.pk',
        language: 'en',
        verificationTier: 'primary_verified',
        verificationStatus: 'primary_source',
        sourceAvailability: 'accessible',
        authenticityStatus: 'official_document',
        reviewerNotes: 'Official legislative record of National Assembly hansard debates.'
      },
      {
        sourceId: 'src-easa-suspension-notice-2020',
        sourceType: 'international_organization',
        title: { en: 'EASA Decision to Suspend Third Country Operator Authorization (TCO) for PIA', ur: 'ایاسا کا پی آئی اے آپریٹنگ لائسنس معطلی کا فیصلہ' },
        publisher: { en: 'European Union Aviation Safety Agency', ur: 'یورپی یونین ایوی ایشن سیفٹی ایجنسی' },
        publisherOrIssuingAuthority: 'European Union Aviation Safety Agency (EASA)',
        publicationDate: { dateString: '2020-07-01', precision: 'day', formattedDisplay: { en: 'July 1, 2020', ur: '1 جولائی 2020ء' } },
        documentIdentifier: 'EASA-TCO-2020-PIA',
        officialUrl: 'https://www.easa.europa.eu',
        language: 'en',
        verificationTier: 'primary_verified',
        verificationStatus: 'primary_source',
        sourceAvailability: 'accessible',
        authenticityStatus: 'official_document',
        reviewerNotes: 'Official regulatory notice published by EASA.'
      }
    ],
    editorialStatus: 'under_review',
    verificationStatus: 'corroborated',
    legalProceedingStatus: 'ongoing',
    hasActiveReportingBan: false,
    pendingProceedingsNotice: {
      en: 'Notice of Ongoing Processes: Administrative restructuring, airline bifurcation, and litigation concerning pilots\' credentials remain active before executive agencies and superior courts.',
      ur: 'زیرِ عمل اقدامات کا نوٹس: پی آئی اے کی تقسیم، نجکاری کا عمل اور پائلٹس کے لائسنسز کے مقدمات تاحال زیرِ سماعت و زیرِ عمل ہیں۔'
    },
    lastLegalStatusChecked: '2024-02-01',
    privacyReview: {
      hasSensitivePersonalData: false,
      piiRedacted: true,
      allegationsDistinguishedFromFindings: true,
      officialDenialsIncluded: true,
      riskAssessment: 'low',
      lastReviewedDate: '2024-02-01',
      reviewerNotes: 'Anchored by official parliamentary and international regulatory documents.'
    },
    featuredRecordId: 'rec-pk-soe-pia-institutional-crisis',
    recordCount: 1,
    iconName: 'Scale',
    tagColor: '#EC4899',
    version: 1,
    createdAt: '2020-07-10T00:00:00Z',
    updatedAt: '2024-02-01T00:00:00Z'
  },

  // =========================================================================
  // 11. ENERGY & PUBLIC FINANCE: IPP POWER SECTOR CONTRACTS
  // =========================================================================
  {
    id: 'dos-pk-energy-ipp-power-sector-contracts',
    slug: 'pakistan-ipp-contracts-capacity-payments-circular-debt',
    domain: 'energy_public_finance',
    title: {
      en: 'Pakistan IPP Contracts, Capacity Payments & Circular Debt Dossier',
      ur: 'آئی پی پی معاہدات، کیپسٹی پیمنٹس اور گردشی قرضہ فریم ورک'
    },
    overview: {
      en: 'Comprehensive investigative and economic dossier examining the 1994, 2002, and 2015 Power Generation Policies, dollar-indexed guaranteed capacity purchase agreements, NEPRA tariff determinations, the 2020 Committee Report on Power Sector Audit, and the fiscal accumulation of PKR 2.6 trillion in energy circular debt.',
      ur: '1994ء، 2002ء اور 2015ء کی پاور پالیسیوں، امریکی ڈالر سے منسلک کیپسٹی ادائیگیوں (Take-or-Pay)، نیپرا ٹیرف فیصلوں، 2020ء کی حکومتی انکوائری رپورٹ اور 26 کھرب روپے سے زائد کے گردشی قرضے کا تفصیلی معاشی و قانونی احاطہ۔'
    },
    scopeAndTerminology: {
      en: 'Focuses on contractual clauses, sovereign guarantees, return on equity (ROE) benchmarks, and audited financial statements from CPPA-G, NTDC, and NEPRA.',
      ur: 'اس فائل میں پاور پرچیز ایگریمنٹس، نیپرا اور سی پی پی اے کے سرکاری آڈٹ شدہ اعداد و شمار اور انکوائری کمیٹی کے نتائج کا احاطہ کیا گیا ہے۔'
    },
    chronology: [
      {
        date: '1994-03-01',
        dateDisplay: { en: 'March 1994', ur: 'مارچ 1994ء' },
        title: { en: 'Promulgation of 1994 Power Policy', ur: '1994ء کی پاور پالیسی کا اجرا' },
        description: { en: 'Government introduced guaranteed take-or-pay capacity payments and sovereign foreign-exchange indexing for private power producers.', ur: 'حکومت نے نجی بجلی گھروں کے لیے کیپسٹی پیمنٹس اور ڈالر انڈیکسیشن کی ضمانت دی۔' },
        sourceIds: ['src-pk-energy-nepra-tariff-2023']
      },
      {
        date: '2020-04-08',
        dateDisplay: { en: '8 April 2020', ur: '8 اپریل 2020ء' },
        title: { en: '2020 Power Sector Inquiry Committee Report', ur: '2020ء کی پاور سیکٹر انکوائری رپورٹ' },
        description: { en: 'Official inquiry committee led by Muhammad Ali submitted findings identifying hundreds of billions of rupees in excess profits and miscalculated heat rates.', ur: 'محمد علی کی سربراہی میں کمیٹی نے آئی پی پیز کے منافع اور فیول کھپت میں بے ضابطگیوں کی رپورٹ پیش کی۔' },
        sourceIds: ['src-pk-energy-nepra-tariff-2023']
      }
    ],
    keyActors: [
      {
        actorId: 'act-nepra',
        name: { en: 'National Electric Power Regulatory Authority (NEPRA)', ur: 'نیشنل الیکٹرک پاور ریگولیٹری اتھارٹی (نیپرا)' },
        roleType: 'institution',
        neutralDescription: { en: 'Statutory regulatory authority responsible for determining electricity tariffs and enforcing performance standards.', ur: 'بجلی کے ٹیرف کا تعین اور لائسنسنگ کا خود مختار ریگولیٹری ادارہ۔' }
      }
    ],
    claims: [
      {
        claimId: 'clm-ipp-capacity-quantum',
        findingType: 'audit_finding',
        assertion: {
          en: 'Official regulatory filings (NEPRA State of Industry Report 2020) and the 2020 Power Sector Audit Committee documented that contracted sovereign capacity charges under Take-or-Pay Power Purchase Agreements (PPAs)—covering capital recovery, debt servicing, and return on equity based on plant availability rather than energy output dispatched—exceeded PKR 1.3 trillion in FY 2022–2023.',
          ur: 'نیپرا کی اسٹیٹ آف انڈسٹری رپورٹ اور 2020ء کی پاور سیکٹر آڈٹ رپورٹ کے مطابق ٹیک اور پے (Take-or-Pay) معاہدوں کے تحت پلانٹ کی دستیابی پر ادا کیے جانے والے لازمی کیپسٹی چارجز (جو سرمائے کی واپسی، قرضوں کی قسطوں اور منافع پر مشتمل ہیں) مالی سال 2022-23 میں 13 کھرب روپے سے زائد رہے۔'
        },
        attributedParty: { en: 'Committee for Power Sector Audit 2020 / NEPRA State of Industry Report', ur: 'پاور سیکٹر آڈٹ کمیٹی رپورٹ 2020ء / نیپرا' },
        sourceIds: ['src-pk-energy-nepra-tariff-2023']
      },
      {
        claimId: 'clm-ipp-1994-policy-sovereign-guarantees',
        findingType: 'official_position',
        assertion: {
          en: 'Government of Pakistan\'s 1994 and 2002 Power Policies established guaranteed dollar-indexed capacity payments (Take-or-Pay) backed by sovereign guarantees to attract private foreign investment.',
          ur: 'حکومتِ پاکستان کی 1994ء اور 2002ء کی پاور پالیسیوں نے نجی غیر ملکی سرمایہ کاری راغب کرنے کے لیے امریکی ڈالر سے منسلک کیپسٹی ادائیگیوں اور حکومتی ضمانتوں کا فریم ورک قائم کیا۔'
        },
        attributedParty: { en: 'Government of Pakistan / Private Power and Infrastructure Board (PPIB)', ur: 'حکومتِ پاکستان / پی پی آئی بی' },
        sourceIds: ['src-pk-energy-nepra-tariff-2023']
      },
      {
        claimId: 'clm-ipp-excess-returns-audit',
        findingType: 'audit_finding',
        assertion: {
          en: 'The 2020 Government Inquiry Committee on Power Sector Audit documented that multiple independent power producers generated returns on equity far exceeding regulatory benchmarks due to misreported fuel consumption rates and inflated project costs.',
          ur: 'پاور سیکٹر آڈٹ پر 2020ء کی حکومتی کمیٹی نے رپورٹ کیا کہ فیول کھپت اور لاگت کے غلط اعداد و شمار کی وجہ سے متعدد بجلی گھروں نے مقررہ حد سے کہیں زیادہ غیر معمولی منافع کمایا۔'
        },
        attributedParty: { en: 'Committee for Power Sector Audit 2020', ur: 'کمیٹی برائے پاور سیکٹر آڈٹ 2020ء' },
        sourceIds: ['src-pk-energy-nepra-tariff-2023']
      }
    ],
    officialPositions: [
      {
        positionId: 'pos-ipp-advisory-council',
        institutionOrParty: { en: 'Independent Power Producers Advisory Council (IPPAC)', ur: 'آئی پی پی ایڈوائزری کونسل' },
        statementDate: '2020-04-15',
        summary: {
          en: 'IPP investors maintained that contracts were executed under sovereign policies of the Government of Pakistan and international arbitration clauses applied.',
          ur: 'سرمایہ کاروں نے مؤقف اپنایا کہ معاہدے حکومتِ پاکستان کی پالیسیوں اور بین الاقوامی ثالثی کے قوانین کے تحت کیے گئے۔'
        },
        sourceId: 'src-pk-energy-nepra-tariff-2023',
        isDenialOrDefense: true
      }
    ],
    mediaArchive: [],
    constitutionalProvisions: ['PK-CONST-A153', 'PK-CONST-A154', 'PK-CONST-A157'],
    relatedRecordIds: ['rec-pk-energy-ipp-power-policy-1994-2002'],
    unresolvedQuestions: [
      {
        en: 'The long-term fiscal restructuring of early termination agreements without initiating foreign international arbitration (ICSID/LCIA) remains a continuing policy challenge.',
        ur: 'بین الاقوامی ثالثی عدالتوں کے خطرے کے بغیر معاہدوں کی قبل از وقت منسوخی کا قانونی فریم ورک تاحال زیرِ بحث ہے۔'
      }
    ],
    sources: [
      {
        sourceId: 'src-pk-energy-nepra-tariff-2023',
        sourceType: 'government_document',
        title: { en: 'NEPRA State of Industry Report & 2020 Power Sector Committee Report', ur: 'نیپرا اسٹیٹ آف انڈسٹری رپورٹ اور 2020ء کی انکوائری رپورٹ' },
        publisher: { en: 'NEPRA / Government of Pakistan', ur: 'نیپرا / حکومتِ پاکستان' },
        publisherOrIssuingAuthority: 'National Electric Power Regulatory Authority (NEPRA) / Ministry of Energy',
        publicationDate: { dateString: '2020-04-08', precision: 'day', formattedDisplay: { en: 'April 8, 2020', ur: '8 اپریل 2020ء' } },
        documentIdentifier: 'NEPRA-SOIR-2020 / Report of the Committee for Power Sector Audit (Ch. 2 & 4)',
        pageOrParagraph: 'Chapter 2 (Capacity Charges & Tariff Structure) & Chapter 4 (Excess Return Analysis)',
        officialUrl: 'https://nepra.org.pk',
        language: 'en',
        verificationTier: 'primary_verified',
        verificationStatus: 'primary_source',
        sourceAvailability: 'accessible',
        authenticityStatus: 'official_document',
        reviewerNotes: 'Official regulatory reports and Committee for Power Sector Audit 2020 findings.'
      }
    ],
    editorialStatus: 'published',
    verificationStatus: 'verified',
    legalProceedingStatus: 'ongoing',
    hasActiveReportingBan: false,
    pendingProceedingsNotice: {
      en: 'Notice of Continuing Contractual Negotiations: Debt re-profiling, contract revisions, and tariff adjustments with independent power producers remain subject to ongoing executive and regulatory negotiations.',
      ur: 'جاری معاہداتی مذاکرات کا نوٹس: قرضوں کی ری پروفائلنگ اور ٹیرف میں رد و بدل کا عمل حکومت اور نجی بجلی گھروں کے درمیان تاحال جاری ہے۔'
    },
    lastLegalStatusChecked: '2023-11-01',
    privacyReview: {
      hasSensitivePersonalData: false,
      piiRedacted: true,
      allegationsDistinguishedFromFindings: true,
      officialDenialsIncluded: true,
      riskAssessment: 'low',
      lastReviewedDate: '2023-11-01',
      reviewerNotes: 'Documented from official regulatory filings and gazette policies.'
    },
    featuredRecordId: 'rec-pk-energy-ipp-power-policy-1994-2002',
    recordCount: 1,
    iconName: 'Zap',
    tagColor: '#06B6D4',
    version: 1,
    createdAt: '2023-11-01T00:00:00Z',
    updatedAt: '2023-11-01T00:00:00Z'
  },

  // =========================================================================
  // 12. DUE PROCESS & BLASPHEMY JURISPRUDENCE: ASIA BIBI ACQUITTAL
  // =========================================================================
  {
    id: 'dos-pk-legal-asia-bibi-acquittal',
    slug: 'asia-bibi-acquittal-blasphemy-evidentiary-standards-pld-2019-sc-64',
    domain: 'due_process_rights',
    title: {
      en: 'Asia Bibi Landmark Acquittal & Blasphemy Law Jurisprudence (PLD 2019 SC 64)',
      ur: 'آسیہ بی بی بریت اور توہینِ مذہب قانون پر سپریم کورٹ کا تاریخی فیصلہ'
    },
    overview: {
      en: 'Comprehensive legal dossier documenting the landmark unanimous judgment of the Supreme Court of Pakistan (PLD 2019 SC 64) authored by Chief Justice Mian Saqib Nisar and Justice Asif Saeed Khan Khosa, setting rigorous evidentiary thresholds, establishing the impermissibility of delayed FIRs and witness contradictions in blasphemy prosecutions, and affirming Islamic jurisprudential protections for minorities.',
      ur: 'سپریم کورٹ آف پاکستان کے تاریخی فیصلے (PLD 2019 SC 64) کا دستاویزی احاطہ، جس میں چیف جسٹس ثاقب نثار اور جسٹس آصف سعید کھوسہ کے بینچ نے جھوٹی گواہی کی ممانعت، ثبوت کے سخت ترین معیار اور اقلیتوں کے آئینی و شرعی حقوق کا تحفظ واضح کیا۔'
    },
    scopeAndTerminology: {
      en: 'Focuses entirely on criminal appellate jurisprudence, evidentiary requirements under the Qanun-e-Shahadat Order 1984, and constitutional protections under Articles 9, 10A, and 25. Avoids disclosure of private individual addresses or vulnerable witnesses.',
      ur: 'قانونِ شہادت آرڈر 1984 کے تحت ثبوت کے معیار، جھوٹی گواہی اور آئینی بنیادی حقوق پر مبنی عدالتی فیصلے تک محدود ہے۔'
    },
    chronology: [
      {
        date: '2009-06-14',
        dateDisplay: { en: '14 June 2009', ur: '14 جون 2009ء' },
        title: { en: 'Field Dispute & Altercation in Ittan Wali', ur: 'ایتھن والی، ننکانہ میں کھیت میں تکرار' },
        description: { en: 'An altercation occurred among berry-picking farmworkers regarding drinking water.', ur: 'کھیتوں میں کام کے دوران پانی پینے کے تنازع پر خواتین مزدوروں کے مابین جھگڑا۔' },
        sourceIds: ['src-sc-asia-bibi-judgment-2018']
      },
      {
        date: '2009-06-19',
        dateDisplay: { en: '19 June 2009', ur: '19 جون 2009ء' },
        title: { en: 'Registration of FIR with 5-Day Delay', ur: '5 دن کی تاخیر سے ایف آئی آر کا اندراج' },
        description: { en: 'FIR No. 326/2009 was registered at Sadar Nankana Sahib police station after a public gathering.', ur: 'ایک عوامی مجمع کے بعد تھانہ صدر ننکانہ صاحب میں مقدمہ درج کرایا گیا۔' },
        sourceIds: ['src-sc-asia-bibi-judgment-2018']
      },
      {
        date: '2010-11-08',
        dateDisplay: { en: '8 November 2010', ur: '8 نومبر 2010ء' },
        title: { en: 'Trial Court Conviction', ur: 'سیشن عدالت کی سزا' },
        description: { en: 'Additional Sessions Judge Nankana Sahib convicted Asia Bibi under Section 295-C PPC and imposed the death penalty.', ur: 'ایڈیشنل سیشن جج ننکانہ نے دفعہ 295-C کے تحت سزائے موت سنائی۔' },
        sourceIds: ['src-sc-asia-bibi-judgment-2018']
      },
      {
        date: '2018-10-31',
        dateDisplay: { en: '31 October 2018', ur: '31 اکتوبر 2018ء' },
        title: { en: 'Supreme Court Acquittal Judgment (PLD 2019 SC 64)', ur: 'سپریم کورٹ کی جانب سے متفقہ بریت کا فیصلہ' },
        description: { en: 'Supreme Court 3-judge bench overturned the conviction, citing fabricated testimony and reasonable doubt.', ur: 'سپریم کورٹ نے گواہوں کے بیانات میں سنگین تضادات اور شک کا فائدہ دیتے ہوئے ملزمہ کو باعزت بری کیا۔' },
        sourceIds: ['src-sc-asia-bibi-judgment-2018']
      }
    ],
    keyActors: [
      {
        actorId: 'act-cjp-nisar',
        name: { en: 'Chief Justice Mian Saqib Nisar', ur: 'چیف جسٹس میاں ثاقب نثار' },
        roleType: 'judicial_body',
        neutralDescription: { en: 'Head of the 3-judge Supreme Court bench that heard Criminal Appeal 39-L/2015 alongside Justices Asif Saeed Khan Khosa and Mazhar Alam Khan Miankhel.', ur: '3 رکنی بینچ کے سربراہ جنہوں نے اپیل کی سماعت کے بعد متفقہ فیصلہ لکھا۔' }
      },
      {
        actorId: 'act-justice-khosa',
        name: { en: 'Justice Asif Saeed Khan Khosa', ur: 'جسٹس آصف سعید خان کھوسہ' },
        roleType: 'judicial_body',
        neutralDescription: { en: 'Authored concurring note addressing the Quranic injunctions regarding bearing false witness and evidentiary integrity.', ur: 'اضافی نوٹ تحریر کیا جس میں قرآن و سنت کی روشنی میں جھوٹی گواہی کی ممانعت پر مفصل بحث کی۔' }
      }
    ],
    claims: [
      {
        claimId: 'clm-sc-asia-witness-defect',
        findingType: 'court_finding',
        assertion: {
          en: 'Supreme Court unanimously held that prosecution witnesses offered contradictory testimony and that the unexplained 5-day delay in lodging the FIR established fabrication and consultation.',
          ur: 'سپریم کورٹ نے متفقہ طور پر قرار دیا کہ استغاثہ کے گواہوں کے بیانات میں تضاد تھا اور ایف آئی آر کے اندراج میں 5 دن کی بلاجواز تاخیر مشاورت اور جھوٹ کی علامت ہے۔'
        },
        attributedParty: { en: 'Supreme Court of Pakistan (PLD 2019 SC 64)', ur: 'سپریم کورٹ آف پاکستان' },
        sourceIds: ['src-sc-asia-bibi-judgment-2018']
      },
      {
        claimId: 'clm-sc-asia-khosa-perjury-note',
        findingType: 'court_finding',
        assertion: {
          en: 'In a detailed concurring opinion, Justice Asif Saeed Khan Khosa affirmed Islamic jurisprudence against bearing false witness and directed trial courts to initiate perjury proceedings under Section 193 PPC against dishonest witnesses.',
          ur: 'جسٹس آصف سعید خان کھوسہ نے اضافی نوٹ میں قرآن و سنت کی روشنی میں جھوٹی گواہی کی شدید ممانعت کی اور نچلی عدالتوں کو دفعہ 193 کے تحت جھوٹے گواہوں کے خلاف کارروائی کی ہدایت کی۔'
        },
        attributedParty: { en: 'Supreme Court of Pakistan (PLD 2019 SC 64, Concurring Note Per Khosa, J.)', ur: 'سپریم کورٹ آف پاکستان (جسٹس کھوسہ اضافی نوٹ)' },
        sourceIds: ['src-sc-asia-bibi-judgment-2018']
      },
      {
        claimId: 'clm-sc-asia-review-dismissal',
        findingType: 'court_finding',
        assertion: {
          en: 'On 29 January 2019, a three-member Supreme Court bench headed by Chief Justice Asif Saeed Khosa dismissed the review petition against the acquittal, establishing the complete judicial finality of the acquittal judgment.',
          ur: '29 جنوری 2019ء کو چیف جسٹس آصف سعید کھوسہ کی سربراہی میں تین رکنی بینچ نے نظرثانی کی درخواست خارج کر کے بریت کے فیصلے کو حتمی قرار دیا۔'
        },
        attributedParty: { en: 'Supreme Court 3-Member Review Bench', ur: 'سپریم کورٹ 3 رکنی نظرثانی بینچ' },
        sourceIds: ['src-sc-asia-bibi-judgment-2018']
      }
    ],
    officialPositions: [
      {
        positionId: 'pos-asia-defense-counsel',
        institutionOrParty: { en: 'Defense Counsel Saiful Malook', ur: 'وکیلِ صفائی سیف الملوک' },
        statementDate: '2018-10-08',
        summary: {
          en: 'Argued that the case originated from an ordinary dispute over drinking water and that witnesses were biased.',
          ur: 'عدالت کے سامنے دلائل دیے کہ مقدمہ خواتین کے معمولی جھگڑے پر انتقام کی غرض سے قائم کیا گیا۔'
        },
        sourceId: 'src-sc-asia-bibi-judgment-2018',
        isDenialOrDefense: true
      }
    ],
    courtFindings: [
      {
        findingId: 'cf-asia-acquittal-judgment',
        courtName: { en: 'Supreme Court of Pakistan', ur: 'سپریم کورٹ آف پاکستان' },
        caseCitation: 'PLD 2019 SC 64',
        orderDate: '2018-10-31',
        rulingSummary: {
          en: 'Criminal Appeal allowed; judgment of Lahore High Court set aside; appellant acquitted of all charges and ordered released immediately if not required in any other case.',
          ur: 'اپیل منظور، لاہور ہائی کورٹ کا فیصلہ کالعدم، ملزمہ تمام الزامات سے باعزت بری اور فوری رہائی کا حکم۔'
        },
        sourceId: 'src-sc-asia-bibi-judgment-2018'
      }
    ],
    mediaArchive: [],
    constitutionalProvisions: ['PK-CONST-A009', 'PK-CONST-A010A', 'PK-CONST-A025', 'PK-CONST-A185'],
    relatedRecordIds: ['rec-pk-legal-asia-bibi-acquittal-2018'],
    unresolvedQuestions: [
      {
        en: 'The prosecution of witnesses for perjury under Section 193 PPC, emphasized in Justice Khosa\'s concurring opinion, has not been systematically enforced in lower courts.',
        ur: 'جسٹس کھوسہ کے اضافی نوٹ میں جھوٹی گواہی دینے والوں کے خلاف قانونی کارروائی کی ہدایت پر نچلی عدالتوں میں عمومی عملدرآمد کی کمی۔'
      }
    ],
    sources: [
      {
        sourceId: 'src-sc-asia-bibi-judgment-2018',
        sourceType: 'court_judgment',
        title: { en: 'Criminal Appeal No. 39-L of 2015: Asia Bibi v The State (PLD 2019 SC 64)', ur: 'کرمنل اپیل 39-L برائے 2015ء: آسیہ بی بی بنام ریاست — پی ایل ڈی 2019ء سپریم کورٹ 64' },
        publisher: { en: 'Supreme Court of Pakistan', ur: 'سپریم کورٹ آف پاکستان' },
        publisherOrIssuingAuthority: 'Supreme Court of Pakistan',
        publicationDate: { dateString: '2018-10-31', precision: 'day', formattedDisplay: { en: 'October 31, 2018', ur: '31 اکتوبر 2018ء' } },
        judgmentDate: '2018-10-31',
        documentIdentifier: 'PLD 2019 SC 64',
        pageOrParagraph: 'Paragraphs 21-25 (Per Nisar, C.J.) & Paragraphs 1-12 (Concurring Note Per Khosa, J.)',
        officialUrl: 'https://www.supremecourt.gov.pk/downloads_judgements/crl.a._39_l_2015.pdf',
        language: 'en',
        verificationTier: 'primary_verified',
        verificationStatus: 'primary_source',
        sourceAvailability: 'accessible',
        authenticityStatus: 'official_document',
        reviewerNotes: 'Official authoritative Supreme Court judgment Criminal Appeal 39-L of 2015 (PLD 2019 SC 64).'
      }
    ],
    editorialStatus: 'published',
    verificationStatus: 'verified',
    legalProceedingStatus: 'concluded',
    hasActiveReportingBan: false,
    lastLegalStatusChecked: '2023-10-15',
    privacyReview: {
      hasSensitivePersonalData: false,
      piiRedacted: true,
      allegationsDistinguishedFromFindings: true,
      officialDenialsIncluded: true,
      riskAssessment: 'low',
      lastReviewedDate: '2023-10-15',
      reviewerNotes: 'Verified against operative text of PLD 2019 SC 64; personal witness addresses and minor names strictly excluded.'
    },
    featuredRecordId: 'rec-pk-legal-asia-bibi-acquittal-2018',
    recordCount: 1,
    iconName: 'FileText',
    tagColor: '#8B5CF6',
    version: 1,
    createdAt: '2023-10-15T00:00:00Z',
    updatedAt: '2023-10-15T00:00:00Z'
  }
];
