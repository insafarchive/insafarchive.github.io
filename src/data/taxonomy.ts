/**
 * INSAF ARCHIVE (انصاف آرکائیو)
 * Taxonomy Registry & Bilingual Labels
 */

import type {
  ArchiveDomain,
  RecordType,
  EvidentiaryFindingType,
  VerificationStatus,
} from '../types/archive';

export interface DomainInfo {
  id: ArchiveDomain;
  label: { en: string; ur: string };
  description: { en: string; ur: string };
  color: string;
  badgeBg: string;
  iconName: string;
}

export const DOMAIN_REGISTRY: Record<ArchiveDomain, DomainInfo> = {
  legal: {
    id: 'legal',
    label: { en: 'Law & Courts', ur: 'قانون و عدالتیں' },
    description: {
      en: 'Judicial records, court orders, judgments, petitions, FIRs, and due-process proceedings.',
      ur: 'عدالتی فیصلے، احکامات، درخواستیں، ایف آئی آرز اور آئینی و فوجداری کارروائیاں۔',
    },
    color: '#3B82F6',
    badgeBg: 'rgba(59, 130, 246, 0.15)',
    iconName: 'Scale',
  },
  human_rights: {
    id: 'human_rights',
    label: { en: 'Human Rights', ur: 'انسانی حقوق' },
    description: {
      en: 'Arrests, detentions, disappearances, minority rights, and due process incidents.',
      ur: 'گرفتاریاں، حبس بے جا، لاپتہ افراد، اقلیتی حقوق اور انسانی حقوق کے واقعات۔',
    },
    color: '#EF4444',
    badgeBg: 'rgba(239, 68, 68, 0.15)',
    iconName: 'ShieldAlert',
  },
  journalism_media: {
    id: 'journalism_media',
    label: { en: 'Media Freedom & Journalists', ur: 'صحافت و آزادی صحافت' },
    description: {
      en: 'Journalist profiles, attacks, killings, media suppression, and investigative dossiers.',
      ur: 'صحافیوں کے خاکے، حملے، شہادتیں، میڈیا پابندیاں اور تحقیقاتی دستاویزی فائلیں۔',
    },
    color: '#F59E0B',
    badgeBg: 'rgba(245, 158, 11, 0.15)',
    iconName: 'Newspaper',
  },
  political_constitutional: {
    id: 'political_constitutional',
    label: { en: 'Political & Constitutional', ur: 'سیاسی و آئینی تاریخ' },
    description: {
      en: 'Constitutional crises, transitions of power, parliamentary events, and regime changes.',
      ur: 'آئینی بحران، اقتدار کی منتقلی، پارلیمانی واقعات اور حکومتی فیصلے و ترامیم۔',
    },
    color: '#8B5CF6',
    badgeBg: 'rgba(139, 92, 246, 0.15)',
    iconName: 'Landmark',
  },
  historical: {
    id: 'historical',
    label: { en: 'Historical Events', ur: 'تاریخی واقعات' },
    description: {
      en: 'Major historical periods, conflicts, national transitions, and state formation events.',
      ur: 'اہم تاریخی ادوار، تنازعات، قومی موڑ اور ریاست کے تشکیلاتی واقعات۔',
    },
    color: '#10B981',
    badgeBg: 'rgba(16, 185, 129, 0.15)',
    iconName: 'History',
  },
  economic_public_policy: {
    id: 'economic_public_policy',
    label: { en: 'Energy, Economy & IPPs', ur: 'توانائی، معیشت و سرکاری اثاثے' },
    description: {
      en: 'IPP contracts, capacity payments, circular debt, subsidies, and state-owned enterprises.',
      ur: 'آئی پی پی معاہدات، کیپسٹی ادائیگیاں، گردشی قرضہ، سبسڈیز اور ریاستی ادارے (پی آئی اے، سٹیل ملز)۔',
    },
    color: '#06B6D4',
    badgeBg: 'rgba(6, 182, 212, 0.15)',
    iconName: 'TrendingUp',
  },
  people_institutions: {
    id: 'people_institutions',
    label: { en: 'People & Institutions', ur: 'شخصیات و ریاستی ادارے' },
    description: {
      en: 'Key public figures, institutional profiles, state regulators, and civil society bodies.',
      ur: 'اہم شخصیات، حکومتی محکمے، ریاستی ادارے، ریگولیٹرز اور شہری تنظیمیں۔',
    },
    color: '#EC4899',
    badgeBg: 'rgba(236, 72, 153, 0.15)',
    iconName: 'Users',
  },
  evidence_media: {
    id: 'evidence_media',
    label: { en: 'Documents & Evidence', ur: 'دستاویزات، ویڈیوز و شواہد' },
    description: {
      en: 'Inquiry reports, court decrees, gazettes, audio/video recordings, and primary datasets.',
      ur: 'انکوائری رپورٹس، عدالتی حکمنامے، سرکاری گزٹ، ویڈیو ثبوت اور بنیادی ریکارڈ۔',
    },
    color: '#6366F1',
    badgeBg: 'rgba(99, 102, 241, 0.15)',
    iconName: 'FolderArchive',
  },
};

export const RECORD_TYPE_LABELS: Record<RecordType, { en: string; ur: string }> = {
  court_case: { en: 'Court Case', ur: 'عدالتی مقدمہ' },
  court_judgment: { en: 'Court Judgment', ur: 'عدالتی فیصلہ' },
  court_order: { en: 'Court Order', ur: 'عدالتی حکم' },
  petition: { en: 'Petition', ur: 'درخواست' },
  constitutional_petition: { en: 'Constitutional Petition', ur: 'آئینی پٹیشن' },
  fir_criminal_proceeding: { en: 'FIR / Criminal Proceeding', ur: 'ایف آئی آر / فوجداری کارروائی' },
  bail_proceeding: { en: 'Bail Proceeding', ur: 'ضمانت کی کارروائی' },
  appeal: { en: 'Appeal', ur: 'اپیل' },
  review: { en: 'Review', ur: 'نظرثانی' },
  suo_motu_proceeding: { en: 'Suo Motu Proceeding', ur: 'ازخود نوٹس کارروائی' },
  legal_document: { en: 'Legal Document', ur: 'قانونی دستاویز' },
  human_rights_incident: { en: 'Human Rights Incident', ur: 'انسانی حقوق کا واقعہ' },
  arrest: { en: 'Arrest', ur: 'گرفتاری' },
  detention: { en: 'Detention', ur: 'حبس / حراست' },
  disappearance: { en: 'Enforced Disappearance', ur: 'جبری گمشدگی' },
  torture_allegation: { en: 'Torture Allegation', ur: 'تشدد کا الزام' },
  extrajudicial_killing_allegation: { en: 'Extrajudicial Killing Allegation', ur: 'ماورائے عدالت قتل کا الزام' },
  religious_minority_incident: { en: 'Religious Minority Rights Incident', ur: 'مذہبی اقلیتوں کے حقوق کا واقعہ' },
  freedom_of_expression_incident: { en: 'Freedom of Expression Incident', ur: 'آزادی اظہار کا واقعہ' },
  freedom_of_press_incident: { en: 'Press Freedom Incident', ur: 'آزادی صحافت کا واقعہ' },
  blasphemy_case_record: { en: 'Blasphemy Law Case Record', ur: 'توہین مذہب قانون سے متعلق مقدمہ' },
  journalist_profile: { en: 'Journalist Profile', ur: 'صحافی کا خاکہ' },
  journalist_killing: { en: 'Journalist Killing', ur: 'صحافی کی شہادت' },
  journalist_attack: { en: 'Journalist Attack', ur: 'صحافی پر حملہ' },
  journalist_threat: { en: 'Journalist Threat', ur: 'صحافی کو دھمکی' },
  journalist_detention: { en: 'Journalist Detention', ur: 'صحافی کی حراست' },
  media_suppression_incident: { en: 'Media Suppression Incident', ur: 'میڈیا پر سنسرشپ / قدغن' },
  investigative_report: { en: 'Investigative Report', ur: 'تحقیقاتی رپورٹ' },
  interview_record: { en: 'Interview Record', ur: 'انٹرویو ریکارڈ' },
  documentary_record: { en: 'Documentary Record', ur: 'دستاویزی فلم' },
  news_investigation: { en: 'News Investigation', ur: 'صحافتی تحقیقات' },
  political_event: { en: 'Political Event', ur: 'سیاسی واقعہ' },
  constitutional_event: { en: 'Constitutional Event', ur: 'آئینی واقعہ' },
  constitutional_crisis: { en: 'Constitutional Crisis', ur: 'آئینی بحران' },
  government_decision: { en: 'Government Decision', ur: 'حکومتی فیصلہ' },
  parliamentary_event: { en: 'Parliamentary Event', ur: 'پارلیمانی کارروائی' },
  election_event: { en: 'Election Event', ur: 'انتخابی واقعہ' },
  change_of_government: { en: 'Change of Government', ur: 'حکومت کی تبدیلی' },
  transfer_of_power: { en: 'Transfer of Power', ur: 'اقتدار کی منتقلی' },
  military_takeover: { en: 'Military Takeover', ur: 'مارشل لاء / فوجی مداخلت' },
  martial_law_emergency: { en: 'State of Emergency', ur: 'ہنگامی حالت (ایمرجنسی)' },
  constitutional_amendment: { en: 'Constitutional Amendment', ur: 'آئینی ترمیم' },
  historical_event: { en: 'Historical Event', ur: 'تاریخی واقعہ' },
  historical_period: { en: 'Historical Period', ur: 'تاریخی دور' },
  conflict_event: { en: 'Conflict / War', ur: 'جنگ / تنازع' },
  separation_territorial_event: { en: 'Separation / Territorial Event', ur: 'علاقائی / علیحدگی کا واقعہ' },
  state_formation_event: { en: 'State Formation Event', ur: 'تشکیلِ ریاست کا واقعہ' },
  major_national_event: { en: 'Major National Event', ur: 'اہم قومی واقعہ' },
  public_policy: { en: 'Public Policy', ur: 'پبلک پالیسی' },
  economic_policy: { en: 'Economic Policy', ur: 'معاشی پالیسی' },
  energy_policy: { en: 'Energy Policy', ur: 'توانائی پالیسی' },
  ipp_record: { en: 'IPP Contract Record', ur: 'آئی پی پی معاہدہ ریکارڈ' },
  tariff_determination: { en: 'Tariff Determination', ur: 'ٹیرف کا تعین' },
  subsidy_record: { en: 'Subsidy Record', ur: 'سبسڈی ریکارڈ' },
  circular_debt_record: { en: 'Circular Debt Record', ur: 'گردشی قرضہ ریکارڈ' },
  privatization_record: { en: 'Privatization Record', ur: 'نجکاری ریکارڈ' },
  soe_institutional_record: { en: 'State Enterprise Record', ur: 'سرکاری ادارہ (SOE) ریکارڈ' },
  infrastructure_project: { en: 'Infrastructure Project', ur: 'بنیادی ڈھانچے کا منصوبہ' },
  person_profile: { en: 'Person Profile', ur: 'شخصیت کا خاکہ' },
  institution_profile: { en: 'Institution Profile', ur: 'ادارے کا تعارف' },
  government_department: { en: 'Government Department', ur: 'حکومتی محکمہ' },
  political_organization: { en: 'Political Organization', ur: 'سیاسی جماعت / تنظیم' },
  state_institution: { en: 'State Institution', ur: 'ریاستی ادارہ' },
  corporate_entity: { en: 'Corporate Entity', ur: 'کارپوریٹ کمپنی' },
  civil_society_org: { en: 'Civil Society Organization', ur: 'شہری حقوق کی تنظیم' },
  international_organization: { en: 'International Organization', ur: 'بین الاقوامی ادارہ' },
  court_document: { en: 'Court Document', ur: 'عدالتی دستاویز' },
  government_document: { en: 'Government Document', ur: 'سرکاری دستاویز' },
  parliamentary_record: { en: 'Parliamentary Record', ur: 'پارلیمانی ریکارڈ' },
  commission_report: { en: 'Commission Report', ur: 'کمیشن رپورٹ' },
  audit_report: { en: 'Audit Report', ur: 'آڈٹ رپورٹ' },
  photograph_record: { en: 'Photograph Record', ur: 'تصویری ثبوت' },
  video_record: { en: 'Video Record', ur: 'ویڈیو ثبوت' },
  audio_record: { en: 'Audio Record', ur: 'آڈیو ثبوت' },
  archival_document: { en: 'Archival Document', ur: 'تاریخی دستاویز' },
  dataset_record: { en: 'Dataset Record', ur: 'ڈیٹا سیٹ' },
};

export const FINDING_TYPE_CONFIG: Record<
  EvidentiaryFindingType,
  { label: { en: string; ur: string }; badgeClass: string; description: { en: string; ur: string } }
> = {
  documented_fact: {
    label: { en: 'Documented Fact', ur: 'ثابت شدہ حقیقت' },
    badgeClass: 'badge-fact',
    description: {
      en: 'Fact established by corroborated official, gazette, or primary institutional records.',
      ur: 'مصدقہ اور بنیادی سرکاری دستاویزات سے ثابت شدہ امر۔',
    },
  },
  primary_source_record: {
    label: { en: 'Primary Source Record', ur: 'بنیادی دستاویزی ماخذ' },
    badgeClass: 'badge-primary-source',
    description: {
      en: 'Direct original text from gazette, statute, contract, or institutional minute.',
      ur: 'اصل سرکاری گزٹ، قانون، معاہدے یا دفتری ریکارڈ کا براہِ راست متن۔',
    },
  },
  court_finding: {
    label: { en: 'Court Finding', ur: 'عدالتی نتیجہ / فیصلہ' },
    badgeClass: 'badge-court-finding',
    description: {
      en: 'Judicial ruling or determination entered in an operative court decree.',
      ur: 'عدالتی حکم نامے یا حتمی فیصلے میں دیا گیا عدالتی نتیجہ۔',
    },
  },
  appellate_court_finding: {
    label: { en: 'Appellate Finding', ur: 'اپیلٹ عدالت کا فیصلہ' },
    badgeClass: 'badge-court-finding',
    description: {
      en: 'Determination by a superior or appellate bench (High Court / Supreme Court).',
      ur: 'ہائی کورٹ یا سپریم کورٹ کی اپیل میں طے شدہ عدالتی رائے۔',
    },
  },
  audit_finding: {
    label: { en: 'Audit Finding', ur: 'آڈٹ رپورٹ کا نتیجہ' },
    badgeClass: 'badge-audit-finding',
    description: {
      en: 'Finding of the Auditor General of Pakistan or independent forensic audit committee.',
      ur: 'آڈیٹر جنرل آف پاکستان یا فرانزک آڈٹ ٹیم کا دستاویزی اعتراض/نتیجہ۔',
    },
  },
  commission_finding: {
    label: { en: 'Commission Finding', ur: 'انکوائری کمیشن کا نتیجہ' },
    badgeClass: 'badge-commission',
    description: {
      en: 'Finding of a judicial or government fact-finding inquiry commission.',
      ur: 'عدالتی یا حکومتی انکوائری کمیشن کی فیکٹ فائنڈنگ رپورٹ کا نتیجہ۔',
    },
  },
  police_finding: {
    label: { en: 'Police Investigation Finding', ur: 'پولیس / تفتیشی نتیجہ' },
    badgeClass: 'badge-police',
    description: {
      en: 'Statement or conclusion from formal police investigation / JIT report.',
      ur: 'پولیس چالان، جے آئی ٹی یا تفتیشی ادارے کی تحقیقاتی رپورٹ۔',
    },
  },
  official_position: {
    label: { en: 'Official Position', ur: 'سرکاری مؤقف' },
    badgeClass: 'badge-official',
    description: {
      en: 'Formal statement, gazette release, or spokesperson communiqué from state institution.',
      ur: 'حکومتی ترجمان، وزارت یا ریاستی ادارے کا باضابطہ جاری کردہ مؤقف۔',
    },
  },
  claim: {
    label: { en: 'Claim / Assertion', ur: 'دعویٰ / مؤقف' },
    badgeClass: 'badge-claim',
    description: {
      en: 'Assertion made by an individual or party without definitive institutional resolution.',
      ur: 'کسی فریق یا شخصیت کا بیان یا مؤقف جس پر تاحال حتمی عدالتی فیصلہ نہ ہوا ہو۔',
    },
  },
  allegation: {
    label: { en: 'Allegation', ur: 'الزام' },
    badgeClass: 'badge-allegation',
    description: {
      en: 'Contested accusation made in a complaint, FIR, or public report requiring proof.',
      ur: 'ایف آئی آر یا شکایت میں لگایا گیا الزام جس کا عدالتی ثبوت درکار ہو۔',
    },
  },
  counter_claim: {
    label: { en: 'Counter-Claim', ur: 'جوابی دعویٰ' },
    badgeClass: 'badge-counter-claim',
    description: {
      en: 'Rebuttal or competing assertion submitted by the opposing party.',
      ur: 'مخالف فریق کی جانب سے پیش کردہ جوابی وضاحت یا دعویٰ۔',
    },
  },
  denial: {
    label: { en: 'Denial / Rebuttal', ur: 'تردید / انکار' },
    badgeClass: 'badge-denial',
    description: {
      en: 'Formal rejection of an accusation by the accused person or institution.',
      ur: 'ملزم شخص، ادارے یا کمپنی کی جانب سے الزام کی باضابطہ تردید۔',
    },
  },
  investigative_finding: {
    label: { en: 'Journalistic Investigation Finding', ur: 'تحقیقاتی صحافت کا نتیجہ' },
    badgeClass: 'badge-journalism',
    description: {
      en: 'Finding uncovered by investigative journalists with documented public sources.',
      ur: 'دستاویزی شواہد کی بنیاد پر صحافتی تحقیقات کے ذریعے سامنے لایا گیا انکشاف۔',
    },
  },
  academic_research_finding: {
    label: { en: 'Academic / Policy Finding', ur: 'تحقیقی و تعلیمی نتیجہ' },
    badgeClass: 'badge-academic',
    description: {
      en: 'Peer-reviewed scholarly study, macroeconomic model, or think-tank research.',
      ur: 'معاشی ماہرین، تھنک ٹینک یا تعلیمی تحقیق کے نتائج۔',
    },
  },
  editorial_note: {
    label: { en: 'Editorial Context Note', ur: 'ادارتی وضاحتی نوٹ' },
    badgeClass: 'badge-editorial',
    description: {
      en: 'Contextual synthesis by Insaf Archive editors explaining evidentiary nuances.',
      ur: 'انصاف آرکائیو کے مدیران کا وضاحتی نوٹ برائے سیاق و سباق۔',
    },
  },
  unresolved_question: {
    label: { en: 'Unresolved Question', ur: 'غیر حل شدہ سوال' },
    badgeClass: 'badge-unresolved',
    description: {
      en: 'Critical question where evidence remains contradictory or withheld.',
      ur: 'اہم ترین تشنہ سوال جس پر شواہد نامکمل یا متضاد ہوں۔',
    },
  },
};

export const VERIFICATION_STATUS_CONFIG: Record<
  VerificationStatus,
  { label: { en: string; ur: string }; color: string }
> = {
  verified: {
    label: { en: 'Primary Verified', ur: 'بنیادی مصدقہ' },
    color: '#10B981',
  },
  corroborated: {
    label: { en: 'Corroborated by Multiple Sources', ur: 'متعدد ذرائع سے تائید شدہ' },
    color: '#3B82F6',
  },
  under_investigation: {
    label: { en: 'Under Investigation / Active Litigation', ur: 'زیرِ تفتیش / زیرِ سماعت' },
    color: '#F59E0B',
  },
  disputed: {
    label: { en: 'Disputed Accounts', ur: 'متنازعہ / متضاد مؤقف' },
    color: '#EF4444',
  },
  unverified: {
    label: { en: 'Unverified Public Source', ur: 'غیر تصدیق شدہ' },
    color: '#9CA3AF',
  },
};
