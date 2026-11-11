import React, { useState } from 'react';
import {
  Language,
  CaseRecord,
  ProceduralStatus,
  ArchiveCategory,
  Province,
  CourtLevel,
  MediaType,
  EditorialReviewStatus,
  ProposedCaseSubmission,
  ProposedCorrectionSubmission,
  ProposedMediaSubmission,
} from '../types';
import { translations } from '../data/translations';
import { REPOSITORY_CONFIG } from '../config/repository';
import { validateProposedSubmission } from '../utils/validator';
import {
  FilePlus,
  Edit3,
  Video,
  CheckSquare,
  ShieldCheck,
  AlertTriangle,
  ExternalLink,
  Copy,
  Check,
  RotateCcw,
  BookOpen,
  Scale,
  Users,
  Lock,
  GitPullRequest,
  Send,
  Eye,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Clock,
  ArrowRight,
} from 'lucide-react';

interface ContributeViewProps {
  lang: Language;
  cases: CaseRecord[];
  initialCaseId?: string;
  initialTab?: string;
  onNavigate?: (page: string) => void;
  onSelectCase?: (caseItem: CaseRecord) => void;
}

export const ContributeView: React.FC<ContributeViewProps> = ({
  lang,
  cases,
  initialCaseId = '',
  initialTab = 'overview',
  onNavigate,
  onSelectCase,
}) => {
  const t = translations;
  const cp = t.contributePage;

  const [activeTab, setActiveTab] = useState<string>(initialTab);
  const [copiedText, setCopiedText] = useState(false);

  // --- Form 1: New Case Submission State ---
  const [newCaseData, setNewCaseData] = useState<ProposedCaseSubmission>({
    type: 'new_case',
    proposedId: '',
    title: { en: '', ur: '' },
    caseNumber: '',
    court: { en: '', ur: '' },
    courtLevel: 'high_court',
    province: 'punjab',
    proceduralStatus: 'pending_trial',
    category: 'court_judgments',
    summary: { en: '', ur: '' },
    factualBackground: { en: '', ur: '' },
    parties: [
      { id: 'pty-1', name: { en: '', ur: '' }, role: 'petitioner' },
      { id: 'pty-2', name: { en: 'State of Pakistan', ur: 'سرکارِ پاکستان' }, role: 'state' },
    ],
    evidenceBreakdown: {
      allegations: '',
      defensePosition: '',
      officialRecords: '',
      judicialFindings: '',
    },
    sources: '',
    incidentDate: '',
    filingDate: '',
    contributorName: '',
    contributorEmail: '',
    contributorAffiliation: '',
    checklistConfirmed: false,
  });

  // --- Form 2: Case Correction State ---
  const [correctionData, setCorrectionData] = useState<ProposedCorrectionSubmission>({
    type: 'case_correction',
    caseId: initialCaseId || (cases[0]?.id ?? 'PK-SC-2024-0102'),
    caseTitle: '',
    affectedSection: 'Procedural Status',
    currentText: '',
    proposedReplacement: '',
    reason: '',
    supportingEvidence: '',
    affectsProceduralStatus: false,
    proposedStatus: 'bail_granted',
    contributorName: '',
    contributorEmail: '',
    contributorAffiliation: '',
    checklistConfirmed: false,
  });

  // --- Form 3: Media Submission State ---
  const [mediaData, setMediaData] = useState<ProposedMediaSubmission>({
    type: 'media_submission',
    associatedCaseIds: initialCaseId ? [initialCaseId] : [cases[0]?.id ?? 'PK-SC-2024-0102'],
    mediaType: 'youtube_video',
    title: { en: '', ur: '' },
    sourcePublisher: { en: '', ur: '' },
    sourceUrl: '',
    eventDate: '',
    publicationDate: '',
    verificationStatus: 'verified_official_record',
    description: { en: '', ur: '' },
    videoTimestampsText: '',
    copyrightNotice: 'Public judicial record / Certified court broadcast',
    contributorName: '',
    contributorEmail: '',
    contributorAffiliation: '',
    checklistConfirmed: false,
  });

  // Copy helper
  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(true);
    setTimeout(() => setCopiedText(false), 2500);
  };

  // Pre-validate submissions
  const validationResultNewCase = validateProposedSubmission(newCaseData, cases);
  const validationResultCorrection = validateProposedSubmission(correctionData, cases);
  const validationResultMedia = validateProposedSubmission(mediaData, cases);

  // Markdown payload generator for New Case
  const generateNewCaseMarkdown = () => {
    return `### New Case Proposal: ${newCaseData.title.en || 'Untitled'} (${newCaseData.title.ur || 'بغیر عنوان'})
**Proposed Case ID**: \`${newCaseData.proposedId || 'Auto-assign'}\`
**Case Number / Docket**: \`${newCaseData.caseNumber}\`
**Court & Bench**: ${newCaseData.court.en} / ${newCaseData.court.ur} (${newCaseData.courtLevel})
**Jurisdiction**: ${newCaseData.province}
**Procedural Status**: \`${newCaseData.proceduralStatus}\`
**Category**: \`${newCaseData.category}\`

---

#### 1. Factual Summary
**English**:
${newCaseData.summary.en}

**Urdu**:
${newCaseData.summary.ur}

---

#### 2. Evidentiary Distinction
- **Unproven Allegations / Police Claims**:
${newCaseData.evidenceBreakdown?.allegations || 'None recorded'}

- **Party Statements / Defense**:
${newCaseData.evidenceBreakdown?.defensePosition || 'None recorded'}

- **Official Records & Order Sheets**:
${newCaseData.evidenceBreakdown?.officialRecords || 'None recorded'}

- **Judicial Findings & Rulings**:
${newCaseData.evidenceBreakdown?.judicialFindings || 'None recorded'}

---

#### 3. Primary Sources & Citations
${newCaseData.sources}

---

#### 4. Contributor Attestation
- **Submitted by**: ${newCaseData.contributorName} (${newCaseData.contributorAffiliation || 'Legal Observer'})
- **Email**: ${newCaseData.contributorEmail || 'Not provided'}
- **Statutory Privacy Confirmed**: ${newCaseData.checklistConfirmed ? 'YES (No minors/victims named, allegations distinguished)' : 'NO'}`;
  };

  // Markdown payload generator for Correction
  const generateCorrectionMarkdown = () => {
    return `### Proposed Correction for Case: \`${correctionData.caseId}\`
**Section to Update**: ${correctionData.affectedSection}
**Alters Procedural Status**: ${correctionData.affectsProceduralStatus ? `YES -> \`${correctionData.proposedStatus}\`` : 'NO'}

---

#### Current Information on Live Site:
> ${correctionData.currentText}

#### Proposed Corrected Information:
${correctionData.proposedReplacement}

---

#### Reason & Primary Evidence:
- **Rationale**: ${correctionData.reason}
- **Supporting Public Citation / Order Sheet**: ${correctionData.supportingEvidence}

---

#### Submitter Attestation:
- **Name**: ${correctionData.contributorName} (${correctionData.contributorAffiliation || 'Counsel of Record'})
- **Email**: ${correctionData.contributorEmail || 'Not provided'}`;
  };

  // Markdown payload generator for Media
  const generateMediaMarkdown = () => {
    return `### Media & Evidence Submission
**Media Type**: \`${mediaData.mediaType}\`
**Associated Case ID(s)**: \`${mediaData.associatedCaseIds.join(', ')}\`
**Title (En)**: ${mediaData.title.en}
**Title (Ur)**: ${mediaData.title.ur}
**Source Publisher**: ${mediaData.sourcePublisher.en} / ${mediaData.sourcePublisher.ur}
**Source URL**: ${mediaData.sourceUrl}
**Event / Hearing Date**: \`${mediaData.eventDate}\`
**Publication / Upload Date**: \`${mediaData.publicationDate || 'N/A'}\`
**Verification Tier**: \`${mediaData.verificationStatus}\`

---

#### Description:
- **English**: ${mediaData.description.en}
- **Urdu**: ${mediaData.description.ur}

#### Timestamped Takeaways:
${mediaData.videoTimestampsText || 'N/A'}

#### Copyright & Terms:
${mediaData.copyrightNotice}

---

#### Submitter:
- **Name**: ${mediaData.contributorName} (${mediaData.contributorAffiliation || 'Researcher'})
- **Email**: ${mediaData.contributorEmail || 'Not provided'}`;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10 text-left rtl:text-right">
      {/* 1. Header Banner */}
      <div className="border-b border-slate-800 pb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#C5A85C] uppercase tracking-wider mb-1 font-urdu-ui">
            <Scale size={14} />
            <span>{cp.kicker[lang]}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white font-legal-display font-urdu-ui">
            {cp.title[lang]}
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-3xl font-urdu-ui leading-relaxed">
            {cp.subtitle[lang]}
          </p>
        </div>

        {/* GitHub direct repo badge */}
        <div className="flex flex-wrap items-center gap-2">
          <a
            href={REPOSITORY_CONFIG.repoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-[#111C3A] hover:bg-[#172346] border border-[#C5A85C]/30 text-[#E0C57A] text-xs font-mono transition-colors"
          >
            <span>{REPOSITORY_CONFIG.owner}/{REPOSITORY_CONFIG.repo}</span>
            <ExternalLink size={12} />
          </a>
          <a
            href={REPOSITORY_CONFIG.issuesUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-[#C5A85C] hover:bg-[#E0C57A] text-[#0B132B] font-semibold text-xs transition-colors font-urdu-ui"
          >
            <span>{lang === 'en' ? 'Open GitHub Issues' : 'گٹ ہب پر ایشوز کھولیں'}</span>
            <ExternalLink size={12} />
          </a>
        </div>
      </div>

      {/* 2. Navigation Tabs */}
      <div className="flex flex-wrap items-center gap-2 border-b border-slate-800 pb-2">
        <button
          onClick={() => setActiveTab('overview')}
          className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium font-urdu-ui transition-colors ${
            activeTab === 'overview'
              ? 'bg-[#C5A85C] text-[#0B132B] font-bold shadow-xs'
              : 'text-slate-300 hover:text-white hover:bg-[#111C3A]'
          }`}
        >
          <BookOpen size={14} />
          <span>{cp.tabs.overview[lang]}</span>
        </button>

        <button
          onClick={() => setActiveTab('newCase')}
          className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium font-urdu-ui transition-colors ${
            activeTab === 'newCase'
              ? 'bg-[#C5A85C] text-[#0B132B] font-bold shadow-xs'
              : 'text-slate-300 hover:text-white hover:bg-[#111C3A]'
          }`}
        >
          <FilePlus size={14} />
          <span>{cp.tabs.newCase[lang]}</span>
        </button>

        <button
          onClick={() => setActiveTab('correction')}
          className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium font-urdu-ui transition-colors ${
            activeTab === 'correction'
              ? 'bg-[#C5A85C] text-[#0B132B] font-bold shadow-xs'
              : 'text-slate-300 hover:text-white hover:bg-[#111C3A]'
          }`}
        >
          <Edit3 size={14} />
          <span>{cp.tabs.correction[lang]}</span>
        </button>

        <button
          onClick={() => setActiveTab('mediaDoc')}
          className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium font-urdu-ui transition-colors ${
            activeTab === 'mediaDoc'
              ? 'bg-[#C5A85C] text-[#0B132B] font-bold shadow-xs'
              : 'text-slate-300 hover:text-white hover:bg-[#111C3A]'
          }`}
        >
          <Video size={14} />
          <span>{cp.tabs.mediaDoc[lang]}</span>
        </button>

        <button
          onClick={() => setActiveTab('checklist')}
          className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium font-urdu-ui transition-colors ${
            activeTab === 'checklist'
              ? 'bg-[#C5A85C] text-[#0B132B] font-bold shadow-xs'
              : 'text-slate-300 hover:text-white hover:bg-[#111C3A]'
          }`}
        >
          <CheckSquare size={14} />
          <span>{cp.tabs.checklist[lang]}</span>
        </button>

        <button
          onClick={() => setActiveTab('security')}
          className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium font-urdu-ui transition-colors ${
            activeTab === 'security'
              ? 'bg-[#C5A85C] text-[#0B132B] font-bold shadow-xs'
              : 'text-slate-300 hover:text-white hover:bg-[#111C3A]'
          }`}
        >
          <ShieldCheck size={14} />
          <span>{cp.tabs.security[lang]}</span>
        </button>
      </div>

      {/* ============================================================ */}
      {/* TAB 1: OVERVIEW & 7-STEP STATUS FLOW                          */}
      {/* ============================================================ */}
      {activeTab === 'overview' && (
        <div className="space-y-8">
          {/* Status Flow Section */}
          <div className="bg-[#0E1738] border border-slate-800 rounded-xl p-6 sm:p-8 space-y-6">
            <div>
              <div className="text-xs font-mono text-[#E0C57A] uppercase mb-1">
                Lifecycle & Review Architecture
              </div>
              <h2 className="text-lg sm:text-xl font-bold text-white font-urdu-ui">
                {cp.statusFlowTitle[lang]}
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-3xl font-urdu-ui leading-relaxed">
                {cp.statusFlowDesc[lang]}
              </p>
            </div>

            {/* 7-Step Progression Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {(
                [
                  'draft',
                  'submitted',
                  'under_review',
                  'changes_requested',
                  'approved',
                  'published',
                  'rejected',
                ] as const
              ).map((stKey, idx) => {
                const item = cp.statusFlow[stKey];
                const isFinal = stKey === 'published';
                const isReject = stKey === 'rejected';

                return (
                  <div
                    key={stKey}
                    className={`p-4 rounded-xl border flex flex-col justify-between space-y-3 ${
                      isFinal
                        ? 'bg-emerald-950/30 border-emerald-500/50'
                        : isReject
                        ? 'bg-rose-950/20 border-rose-500/40'
                        : 'bg-[#111C3A] border-slate-800'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-1">
                        <span className="text-[#E0C57A] font-bold">Step {idx + 1}</span>
                        {isFinal && <CheckCircle2 size={15} className="text-emerald-400" />}
                        {isReject && <XCircle size={15} className="text-rose-400" />}
                      </div>
                      <h3 className="text-sm font-bold text-white font-urdu-ui mb-1.5">
                        {item[lang]}
                      </h3>
                      <p className="text-xs text-slate-300 font-urdu-ui leading-relaxed">
                        {item.desc[lang]}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Lawyer Submission Guidelines */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-[#0E1738] border border-slate-800 rounded-xl p-6 space-y-4">
              <div className="flex items-center gap-2 text-[#E0C57A]">
                <Scale size={18} />
                <h3 className="text-base font-bold text-white font-urdu-ui">
                  {lang === 'en'
                    ? 'How Authorized Lawyers Submit Information'
                    : 'وکلاء و قانونی معاونین کے لیے رہنمائی'}
                </h3>
              </div>
              <ul className="text-xs text-slate-300 font-urdu-ui space-y-2.5 list-disc pl-4 rtl:pl-0 rtl:pr-4 leading-relaxed">
                <li>
                  {lang === 'en'
                    ? 'Submissions are accepted via GitHub Issues using standardized templates, or by direct secure email to editorial@insafarchive.org.'
                    : 'تجاویز باضابطہ گٹ ہب ایشوز کے ذریعے یا ادارتی ای میل پر مصدقہ نقول کے ہمراہ جمع کروائی جا سکتی ہیں۔'}
                </li>
                <li>
                  {lang === 'en'
                    ? 'Lawyers must distinguish between initial FIR allegations, interim bail orders, trial proceedings, and final acquittals.'
                    : 'وکلاء پر لازم ہے کہ وہ ایف آئی آر کے ابتدائی الزامات، عبوری ضمانت، ٹرائل اور حتمی بریت کے مابین واضح فرق کریں۔'}
                </li>
                <li>
                  {lang === 'en'
                    ? 'Never upload unredacted identity documents (CNIC), personal phone numbers, or juvenile details.'
                    : 'شناختی کارڈز، ذاتی فون نمبرز یا کمسن ملزمان کی تفصیلات ہرگز شامل نہ کریں۔'}
                </li>
                <li>
                  {lang === 'en'
                    ? 'Submissions are cross-referenced with official law journals (PLD, SCMR, CLD) before merge.'
                    : 'اشاعت سے قبل لا جرنلز اور عدالتی ریکارڈ روم سے دستاویزات کی تصدیق کی جاتی ہے۔'}
                </li>
              </ul>
            </div>

            <div className="bg-[#0E1738] border border-slate-800 rounded-xl p-6 space-y-4">
              <div className="flex items-center gap-2 text-amber-400">
                <AlertTriangle size={18} />
                <h3 className="text-base font-bold text-white font-urdu-ui">
                  {lang === 'en' ? 'Non-Negotiable Editorial Prohibitions' : 'سخت ادارتی ممانعتیں'}
                </h3>
              </div>
              <ul className="text-xs text-slate-300 font-urdu-ui space-y-2.5 list-disc pl-4 rtl:pl-0 rtl:pr-4 leading-relaxed">
                <li>
                  <strong>Bail is NOT an Acquittal:</strong> Conflating bail grants with clearance of guilt is strictly prohibited.
                </li>
                <li>
                  <strong>No Privileged Communications:</strong> Never disclose confidential lawyer-client discussions or unreleased internal memos.
                </li>
                <li>
                  <strong>Public Document Permission Notice:</strong> Public availability of a document does NOT automatically establish permission to republish. We review copyright and judicial restrictions.
                </li>
                <li>
                  <strong>Takedowns & Inquiries:</strong> Any verified party may request immediate redaction or review by emailing <code className="text-[#E0C57A]">corrections@insafarchive.org</code>.
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* TAB 2: PROPOSE NEW CASE BUILDER                              */}
      {/* ============================================================ */}
      {activeTab === 'newCase' && (
        <div className="bg-[#0E1738] border border-slate-800 rounded-xl p-6 sm:p-8 space-y-6">
          <div className="border-b border-slate-800 pb-4">
            <h2 className="text-lg font-bold text-white font-urdu-ui">
              {lang === 'en' ? 'Structured New Case Proposal Form' : 'نئے مقدمے کے اندراج کا باضابطہ فارم'}
            </h2>
            <p className="text-xs text-slate-400 mt-1 font-urdu-ui">
              {lang === 'en'
                ? 'Fill in the structured fields below. You can directly open a pre-filled GitHub Issue or copy the formatted submission text.'
                : 'درج ذیل فارم پُر کر کے براہِ راست گٹ ہب ایشو بنائیں یا فارمیٹ شدہ مسودہ کاپی کریں۔'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            {/* Proposed ID */}
            <div>
              <label className="block text-slate-400 mb-1 font-mono">Proposed Stable ID (Optional)</label>
              <input
                type="text"
                value={newCaseData.proposedId || ''}
                onChange={(e) => setNewCaseData({ ...newCaseData, proposedId: e.target.value })}
                placeholder="e.g. PK-SC-2024-0105"
                className="w-full bg-[#111C3A] border border-slate-700 rounded px-3 py-2 text-white font-mono focus:border-[#C5A85C] focus:outline-none"
              />
            </div>

            {/* Case Number */}
            <div>
              <label className="block text-slate-400 mb-1 font-urdu-ui">Docket / Petition / FIR Number *</label>
              <input
                type="text"
                value={newCaseData.caseNumber}
                onChange={(e) => setNewCaseData({ ...newCaseData, caseNumber: e.target.value })}
                placeholder="e.g. Const. P. 104/2024"
                className="w-full bg-[#111C3A] border border-slate-700 rounded px-3 py-2 text-white font-mono focus:border-[#C5A85C] focus:outline-none"
              />
            </div>

            {/* English Title */}
            <div>
              <label className="block text-slate-400 mb-1 font-urdu-ui">Case Title (English) *</label>
              <input
                type="text"
                value={newCaseData.title.en}
                onChange={(e) =>
                  setNewCaseData({ ...newCaseData, title: { ...newCaseData.title, en: e.target.value } })
                }
                placeholder="e.g. Journalists Protection Petition under Article 19"
                className="w-full bg-[#111C3A] border border-slate-700 rounded px-3 py-2 text-white focus:border-[#C5A85C] focus:outline-none"
              />
            </div>

            {/* Urdu Title */}
            <div>
              <label className="block text-slate-400 mb-1 font-urdu-ui">Case Title (Urdu) *</label>
              <input
                type="text"
                dir="rtl"
                value={newCaseData.title.ur}
                onChange={(e) =>
                  setNewCaseData({ ...newCaseData, title: { ...newCaseData.title, ur: e.target.value } })
                }
                placeholder="مثلاً: آزادیِ اظہارِ رائے و تحفظِ صحافیان آئینی درخواست"
                className="w-full bg-[#111C3A] border border-slate-700 rounded px-3 py-2 text-white font-urdu-ui focus:border-[#C5A85C] focus:outline-none"
              />
            </div>

            {/* Court */}
            <div>
              <label className="block text-slate-400 mb-1 font-urdu-ui">Court & Bench (English) *</label>
              <input
                type="text"
                value={newCaseData.court.en}
                onChange={(e) =>
                  setNewCaseData({ ...newCaseData, court: { ...newCaseData.court, en: e.target.value } })
                }
                placeholder="Supreme Court of Pakistan"
                className="w-full bg-[#111C3A] border border-slate-700 rounded px-3 py-2 text-white focus:border-[#C5A85C] focus:outline-none"
              />
            </div>

            {/* Urdu Court */}
            <div>
              <label className="block text-slate-400 mb-1 font-urdu-ui">Court & Bench (Urdu) *</label>
              <input
                type="text"
                dir="rtl"
                value={newCaseData.court.ur}
                onChange={(e) =>
                  setNewCaseData({ ...newCaseData, court: { ...newCaseData.court, ur: e.target.value } })
                }
                placeholder="عدالتِ عظمیٰ پاکستان (سپریم کورٹ)"
                className="w-full bg-[#111C3A] border border-slate-700 rounded px-3 py-2 text-white font-urdu-ui focus:border-[#C5A85C] focus:outline-none"
              />
            </div>

            {/* Status */}
            <div>
              <label className="block text-slate-400 mb-1 font-urdu-ui">Procedural Status *</label>
              <select
                value={newCaseData.proceduralStatus}
                onChange={(e) =>
                  setNewCaseData({ ...newCaseData, proceduralStatus: e.target.value as ProceduralStatus })
                }
                className="w-full bg-[#111C3A] border border-slate-700 rounded px-3 py-2 text-white focus:border-[#C5A85C] focus:outline-none"
              >
                <option value="pending_trial">pending_trial (Pending Trial / Sub Judice)</option>
                <option value="bail_granted">bail_granted (Bail Granted - NOT an acquittal)</option>
                <option value="reported">reported (Reported / Initial FIR)</option>
                <option value="under_investigation">under_investigation (Under investigation)</option>
                <option value="acquitted">acquitted (Acquitted following trial)</option>
                <option value="convicted">convicted (Convicted - Subject to appeal)</option>
                <option value="dismissed">dismissed (Dismissed on threshold grounds)</option>
                <option value="appealed">appealed (Appealed to superior court)</option>
                <option value="disposed_of">disposed_of (Disposed of with directions)</option>
              </select>
            </div>

            {/* Category */}
            <div>
              <label className="block text-slate-400 mb-1 font-urdu-ui">Archive Category *</label>
              <select
                value={newCaseData.category}
                onChange={(e) =>
                  setNewCaseData({ ...newCaseData, category: e.target.value as ArchiveCategory })
                }
                className="w-full bg-[#111C3A] border border-slate-700 rounded px-3 py-2 text-white focus:border-[#C5A85C] focus:outline-none"
              >
                <option value="court_judgments">Court Judgments & Orders</option>
                <option value="criminal_proceedings">Criminal Proceedings</option>
                <option value="civil_litigation">Civil Litigation</option>
                <option value="bail_acquittal">Bail & Acquittal Records</option>
                <option value="arrest_detention">Arrest & Detention Reports</option>
                <option value="alleged_police_misconduct">Alleged Police Misconduct</option>
                <option value="human_rights">Human Rights Related Cases</option>
                <option value="missing_persons">Missing Persons & Habeas Corpus</option>
                <option value="labour_poverty">Labour & Poverty Disputes</option>
                <option value="women_children">Women & Children Legal Rights</option>
                <option value="public_interest_political">Public Interest & Political</option>
                <option value="video_evidence">Video & Documentary Evidence</option>
              </select>
            </div>

            {/* Province */}
            <div>
              <label className="block text-slate-400 mb-1 font-urdu-ui">Province / Jurisdiction *</label>
              <select
                value={newCaseData.province}
                onChange={(e) =>
                  setNewCaseData({ ...newCaseData, province: e.target.value as Province })
                }
                className="w-full bg-[#111C3A] border border-slate-700 rounded px-3 py-2 text-white focus:border-[#C5A85C] focus:outline-none"
              >
                <option value="punjab">Punjab</option>
                <option value="sindh">Sindh</option>
                <option value="khyber_pakhtunkhwa">Khyber Pakhtunkhwa</option>
                <option value="balochistan">Balochistan</option>
                <option value="islamabad_ict">Islamabad ICT</option>
                <option value="federal">Federal Jurisdiction</option>
                <option value="azad_kashmir">Azad Kashmir</option>
                <option value="gilgit_baltistan">Gilgit Baltistan</option>
              </select>
            </div>

            {/* Filing Date */}
            <div>
              <label className="block text-slate-400 mb-1 font-mono">Filing Date (YYYY-MM-DD)</label>
              <input
                type="text"
                value={newCaseData.filingDate || ''}
                onChange={(e) => setNewCaseData({ ...newCaseData, filingDate: e.target.value })}
                placeholder="2024-03-15"
                className="w-full bg-[#111C3A] border border-slate-700 rounded px-3 py-2 text-white font-mono focus:border-[#C5A85C] focus:outline-none"
              />
            </div>
          </div>

          {/* Bilingual Summaries */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block text-slate-400 mb-1 font-urdu-ui">English Summary *</label>
              <textarea
                rows={3}
                value={newCaseData.summary.en}
                onChange={(e) =>
                  setNewCaseData({ ...newCaseData, summary: { ...newCaseData.summary, en: e.target.value } })
                }
                placeholder="Concise factual summary in English..."
                className="w-full bg-[#111C3A] border border-slate-700 rounded p-2.5 text-white focus:border-[#C5A85C] focus:outline-none leading-relaxed"
              />
            </div>
            <div>
              <label className="block text-slate-400 mb-1 font-urdu-ui">Urdu Summary (خلاصۂ مقدمہ) *</label>
              <textarea
                rows={3}
                dir="rtl"
                value={newCaseData.summary.ur}
                onChange={(e) =>
                  setNewCaseData({ ...newCaseData, summary: { ...newCaseData.summary, ur: e.target.value } })
                }
                placeholder="اردو میں مقدمے کا غیر جانبدارانہ خلاصہ درج کریں..."
                className="w-full bg-[#111C3A] border border-slate-700 rounded p-2.5 text-white font-urdu-ui focus:border-[#C5A85C] focus:outline-none leading-relaxed"
              />
            </div>
          </div>

          {/* Evidentiary Distinction */}
          <div className="space-y-2 text-xs">
            <label className="block text-slate-300 font-semibold font-urdu-ui">
              Evidentiary Distinction: Allegations vs. Official Findings
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <textarea
                rows={2}
                value={newCaseData.evidenceBreakdown?.allegations || ''}
                onChange={(e) =>
                  setNewCaseData({
                    ...newCaseData,
                    evidenceBreakdown: {
                      ...newCaseData.evidenceBreakdown!,
                      allegations: e.target.value,
                    },
                  })
                }
                placeholder="Unproven Allegations / Police Claims..."
                className="w-full bg-[#111C3A] border border-slate-700 rounded p-2 text-slate-200 focus:border-[#C5A85C] focus:outline-none text-[11px]"
              />
              <textarea
                rows={2}
                value={newCaseData.evidenceBreakdown?.judicialFindings || ''}
                onChange={(e) =>
                  setNewCaseData({
                    ...newCaseData,
                    evidenceBreakdown: {
                      ...newCaseData.evidenceBreakdown!,
                      judicialFindings: e.target.value,
                    },
                  })
                }
                placeholder="Binding Judicial Rulings / Orders Signed by Court..."
                className="w-full bg-[#111C3A] border border-slate-700 rounded p-2 text-slate-200 focus:border-[#C5A85C] focus:outline-none text-[11px]"
              />
            </div>
          </div>

          {/* Sources */}
          <div className="text-xs">
            <label className="block text-slate-400 mb-1 font-urdu-ui">
              Primary Source URLs & Law Citations *
            </label>
            <input
              type="text"
              value={newCaseData.sources}
              onChange={(e) => setNewCaseData({ ...newCaseData, sources: e.target.value })}
              placeholder="e.g. 2024 SCMR 301, https://supremecourt.gov.pk/..."
              className="w-full bg-[#111C3A] border border-slate-700 rounded px-3 py-2 text-white focus:border-[#C5A85C] focus:outline-none"
            />
          </div>

          {/* Submitter Info & Checklist */}
          <div className="bg-[#111C3A] p-4 rounded-lg space-y-3 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <input
                type="text"
                value={newCaseData.contributorName}
                onChange={(e) => setNewCaseData({ ...newCaseData, contributorName: e.target.value })}
                placeholder="Your Full Name / Bar Membership Number *"
                className="bg-[#0B132B] border border-slate-700 rounded px-3 py-1.5 text-white"
              />
              <input
                type="email"
                value={newCaseData.contributorEmail || ''}
                onChange={(e) => setNewCaseData({ ...newCaseData, contributorEmail: e.target.value })}
                placeholder="Contact Email (Optional)"
                className="bg-[#0B132B] border border-slate-700 rounded px-3 py-1.5 text-white"
              />
            </div>

            <label className="flex items-start gap-2 text-slate-300 cursor-pointer pt-1 font-urdu-ui">
              <input
                type="checkbox"
                checked={newCaseData.checklistConfirmed}
                onChange={(e) => setNewCaseData({ ...newCaseData, checklistConfirmed: e.target.checked })}
                className="mt-0.5 rounded border-slate-700 text-[#C5A85C] focus:ring-[#C5A85C]"
              />
              <span>
                I confirm that no minors are named unredacted, allegations are distinguished from findings,
                and no privileged lawyer-client material is included.
              </span>
            </label>
          </div>

          {/* Validation Diagnostics Banner */}
          {!validationResultNewCase.valid && (
            <div className="p-3.5 rounded bg-amber-950/40 border border-amber-500/40 text-xs text-amber-200 space-y-1 font-urdu-ui">
              <div className="font-semibold flex items-center gap-1.5 text-amber-300">
                <AlertTriangle size={14} />
                <span>Pre-Submission Schema Diagnostics:</span>
              </div>
              <ul className="list-disc pl-4 space-y-0.5 text-[11px]">
                {validationResultNewCase.errors.map((err, idx) => (
                  <li key={idx}>{err}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Actions: Direct GitHub Issue vs Copy Markdown */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-800">
            <button
              onClick={() => handleCopy(generateNewCaseMarkdown())}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded bg-[#111C3A] hover:bg-[#172346] border border-slate-700 text-slate-200 text-xs font-urdu-ui transition-colors"
            >
              {copiedText ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
              <span>{copiedText ? 'Markdown Copied!' : 'Copy Formatted Markdown'}</span>
            </button>

            <a
              href={`${REPOSITORY_CONFIG.newCaseTemplateUrl}${encodeURIComponent(newCaseData.title.en || 'New Case')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded bg-[#C5A85C] hover:bg-[#E0C57A] text-[#0B132B] font-bold text-xs transition-colors font-urdu-ui shadow-sm"
            >
              <span>{lang === 'en' ? 'Open in GitHub Issues (Pre-filled)' : 'گٹ ہب پر ایشو بنائیں'}</span>
              <ExternalLink size={13} />
            </a>
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* TAB 3: PROPOSE CASE CORRECTION                               */}
      {/* ============================================================ */}
      {activeTab === 'correction' && (
        <div className="bg-[#0E1738] border border-slate-800 rounded-xl p-6 sm:p-8 space-y-6">
          <div className="border-b border-slate-800 pb-4">
            <h2 className="text-lg font-bold text-white font-urdu-ui">
              {lang === 'en' ? 'Propose Correction to an Existing Case' : 'موجودہ مقدمے کے ریکارڈ میں تصحیح کی تجویز'}
            </h2>
            <p className="text-xs text-slate-400 mt-1 font-urdu-ui">
              {lang === 'en'
                ? 'Suggest updates, bail milestones, or factual revisions backed by certified court order sheets.'
                : 'مصدقہ عدالتی احکامات اور نقول کی بنیاد پر ریکارڈ میں تصحیح یا نئے مرحلے کا اندراج کروائیں۔'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            {/* Target Case Selector */}
            <div>
              <label className="block text-slate-400 mb-1 font-mono">Target Case ID *</label>
              <select
                value={correctionData.caseId}
                onChange={(e) => setCorrectionData({ ...correctionData, caseId: e.target.value })}
                className="w-full bg-[#111C3A] border border-slate-700 rounded px-3 py-2 text-white font-mono focus:border-[#C5A85C] focus:outline-none"
              >
                {cases.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.id} — {c.title[lang]}
                  </option>
                ))}
              </select>
            </div>

            {/* Affected Section */}
            <div>
              <label className="block text-slate-400 mb-1 font-urdu-ui">Section Requiring Correction *</label>
              <select
                value={correctionData.affectedSection}
                onChange={(e) => setCorrectionData({ ...correctionData, affectedSection: e.target.value })}
                className="w-full bg-[#111C3A] border border-slate-700 rounded px-3 py-2 text-white focus:border-[#C5A85C] focus:outline-none"
              >
                <option value="Procedural Status">Procedural Status (Subsequent bail, disposal, etc.)</option>
                <option value="Factual Background">Factual Background & Claims</option>
                <option value="Parties & Redaction">Parties / Privacy Redaction</option>
                <option value="Court Citation">Court Citation or Decree Reference</option>
                <option value="Timeline Milestone">Procedural Timeline Milestone Addition</option>
                <option value="Translation">Bilingual Translation Error</option>
              </select>
            </div>
          </div>

          {/* Current vs Proposed Replacement */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block text-slate-400 mb-1 font-urdu-ui">Current Text on Live Site *</label>
              <textarea
                rows={3}
                value={correctionData.currentText}
                onChange={(e) => setCorrectionData({ ...correctionData, currentText: e.target.value })}
                placeholder="Quote the specific text or status currently shown..."
                className="w-full bg-[#111C3A] border border-slate-700 rounded p-2.5 text-white focus:border-[#C5A85C] focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-slate-400 mb-1 font-urdu-ui">Proposed Replacement Text *</label>
              <textarea
                rows={3}
                value={correctionData.proposedReplacement}
                onChange={(e) =>
                  setCorrectionData({ ...correctionData, proposedReplacement: e.target.value })
                }
                placeholder="Exact proposed corrected text..."
                className="w-full bg-[#111C3A] border border-slate-700 rounded p-2.5 text-white focus:border-[#C5A85C] focus:outline-none"
              />
            </div>
          </div>

          {/* Reason & Supporting Evidence */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block text-slate-400 mb-1 font-urdu-ui">Factual Rationale / Reason *</label>
              <input
                type="text"
                value={correctionData.reason}
                onChange={(e) => setCorrectionData({ ...correctionData, reason: e.target.value })}
                placeholder="e.g. High Court granted post-arrest bail on 2024-03-12"
                className="w-full bg-[#111C3A] border border-slate-700 rounded px-3 py-2 text-white focus:border-[#C5A85C] focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-slate-400 mb-1 font-urdu-ui">Supporting Citation / Order Link *</label>
              <input
                type="text"
                value={correctionData.supportingEvidence}
                onChange={(e) => setCorrectionData({ ...correctionData, supportingEvidence: e.target.value })}
                placeholder="e.g. Certified Order Sheet Crl. Misc. No. 412/2024"
                className="w-full bg-[#111C3A] border border-slate-700 rounded px-3 py-2 text-white focus:border-[#C5A85C] focus:outline-none"
              />
            </div>
          </div>

          {/* Status Effect Toggle */}
          <div className="p-3.5 rounded bg-[#111C3A] text-xs space-y-2">
            <label className="flex items-center gap-2 cursor-pointer font-urdu-ui">
              <input
                type="checkbox"
                checked={correctionData.affectsProceduralStatus}
                onChange={(e) =>
                  setCorrectionData({ ...correctionData, affectsProceduralStatus: e.target.checked })
                }
                className="rounded border-slate-700 text-[#C5A85C] focus:ring-[#C5A85C]"
              />
              <span className="text-white font-medium">
                This correction changes the case's formal procedural status
              </span>
            </label>

            {correctionData.affectsProceduralStatus && (
              <div className="pt-2">
                <label className="block text-slate-400 mb-1 font-urdu-ui">New Procedural Status</label>
                <select
                  value={correctionData.proposedStatus || 'bail_granted'}
                  onChange={(e) =>
                    setCorrectionData({
                      ...correctionData,
                      proposedStatus: e.target.value as ProceduralStatus,
                    })
                  }
                  className="bg-[#0B132B] border border-slate-700 rounded px-3 py-1.5 text-white"
                >
                  <option value="bail_granted">bail_granted (Bail Granted - NOT an acquittal)</option>
                  <option value="acquitted">acquitted (Acquitted following trial)</option>
                  <option value="convicted">convicted (Convicted - Subject to appeal)</option>
                  <option value="dismissed">dismissed (Dismissed on procedural grounds)</option>
                  <option value="disposed_of">disposed_of (Concluded with directions)</option>
                </select>
              </div>
            )}
          </div>

          {/* Submitter & Checklist */}
          <div className="bg-[#111C3A] p-4 rounded-lg space-y-3 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <input
                type="text"
                value={correctionData.contributorName}
                onChange={(e) => setCorrectionData({ ...correctionData, contributorName: e.target.value })}
                placeholder="Your Full Name / Counsel Role *"
                className="bg-[#0B132B] border border-slate-700 rounded px-3 py-1.5 text-white"
              />
              <input
                type="email"
                value={correctionData.contributorEmail || ''}
                onChange={(e) => setCorrectionData({ ...correctionData, contributorEmail: e.target.value })}
                placeholder="Email Address"
                className="bg-[#0B132B] border border-slate-700 rounded px-3 py-1.5 text-white"
              />
            </div>
            <label className="flex items-start gap-2 text-slate-300 cursor-pointer font-urdu-ui">
              <input
                type="checkbox"
                checked={correctionData.checklistConfirmed}
                onChange={(e) =>
                  setCorrectionData({ ...correctionData, checklistConfirmed: e.target.checked })
                }
                className="mt-0.5 rounded border-slate-700 text-[#C5A85C] focus:ring-[#C5A85C]"
              />
              <span>I confirm that this proposed correction is supported by verifiable primary legal records.</span>
            </label>
          </div>

          {/* Diagnostics */}
          {!validationResultCorrection.valid && (
            <div className="p-3.5 rounded bg-amber-950/40 border border-amber-500/40 text-xs text-amber-200 space-y-1 font-urdu-ui">
              <div className="font-semibold flex items-center gap-1.5 text-amber-300">
                <AlertTriangle size={14} />
                <span>Pre-Submission Checks:</span>
              </div>
              <ul className="list-disc pl-4 space-y-0.5 text-[11px]">
                {validationResultCorrection.errors.map((err, idx) => (
                  <li key={idx}>{err}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Actions */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-800">
            <button
              onClick={() => handleCopy(generateCorrectionMarkdown())}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded bg-[#111C3A] hover:bg-[#172346] border border-slate-700 text-slate-200 text-xs font-urdu-ui transition-colors"
            >
              {copiedText ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
              <span>{copiedText ? 'Copied!' : 'Copy Formatted Markdown'}</span>
            </button>

            <a
              href={`${REPOSITORY_CONFIG.caseCorrectionTemplateUrl}${encodeURIComponent(correctionData.caseId)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded bg-[#C5A85C] hover:bg-[#E0C57A] text-[#0B132B] font-bold text-xs transition-colors font-urdu-ui shadow-sm"
            >
              <span>{lang === 'en' ? 'Open in GitHub Issues (Pre-filled)' : 'گٹ ہب پر ایشو بنائیں'}</span>
              <ExternalLink size={13} />
            </a>
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* TAB 4: SUBMIT MEDIA & ORDERS                                 */}
      {/* ============================================================ */}
      {activeTab === 'mediaDoc' && (
        <div className="bg-[#0E1738] border border-slate-800 rounded-xl p-6 sm:p-8 space-y-6">
          <div className="border-b border-slate-800 pb-4">
            <h2 className="text-lg font-bold text-white font-urdu-ui">
              {lang === 'en'
                ? 'Submit Audio-Visual Evidence & Court Orders'
                : 'ویڈیو شواہد و عدالتی دستاویزات جمع کرائیں'}
            </h2>
            <p className="text-xs text-slate-400 mt-1 font-urdu-ui">
              {lang === 'en'
                ? 'Supports YouTube open court broadcasts, certified decrees, archival photos, and forensic science reports.'
                : 'سپریم کورٹ و ہائی کورٹ کے عدالتی بیانات، مصدقہ نقول اور فارنزک رپورٹس کا اندراج۔'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            {/* Target Case ID */}
            <div>
              <label className="block text-slate-400 mb-1 font-mono">Associated Case ID *</label>
              <select
                value={mediaData.associatedCaseIds[0] || ''}
                onChange={(e) => setMediaData({ ...mediaData, associatedCaseIds: [e.target.value] })}
                className="w-full bg-[#111C3A] border border-slate-700 rounded px-3 py-2 text-white font-mono focus:border-[#C5A85C] focus:outline-none"
              >
                {cases.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.id} — {c.title[lang]}
                  </option>
                ))}
              </select>
            </div>

            {/* Media Type */}
            <div>
              <label className="block text-slate-400 mb-1 font-urdu-ui">Media Type *</label>
              <select
                value={mediaData.mediaType}
                onChange={(e) => setMediaData({ ...mediaData, mediaType: e.target.value as MediaType })}
                className="w-full bg-[#111C3A] border border-slate-700 rounded px-3 py-2 text-white focus:border-[#C5A85C] focus:outline-none"
              >
                <option value="youtube_video">YouTube Video (Official Hearing / Press Briefing)</option>
                <option value="document">Certified Court Document / Order Sheet</option>
                <option value="image">Archival Registry Photograph / Sealed Folio</option>
                <option value="external_source">Institutional Forensic Report / Official Gazette</option>
              </select>
            </div>

            {/* Title En */}
            <div>
              <label className="block text-slate-400 mb-1 font-urdu-ui">Media Title (English) *</label>
              <input
                type="text"
                value={mediaData.title.en}
                onChange={(e) =>
                  setMediaData({ ...mediaData, title: { ...mediaData.title, en: e.target.value } })
                }
                placeholder="e.g. Supreme Court Full Bench Audio-Visual Hearing on Article 19"
                className="w-full bg-[#111C3A] border border-slate-700 rounded px-3 py-2 text-white focus:border-[#C5A85C] focus:outline-none"
              />
            </div>

            {/* Title Ur */}
            <div>
              <label className="block text-slate-400 mb-1 font-urdu-ui">Media Title (Urdu) *</label>
              <input
                type="text"
                dir="rtl"
                value={mediaData.title.ur}
                onChange={(e) =>
                  setMediaData({ ...mediaData, title: { ...mediaData.title, ur: e.target.value } })
                }
                placeholder="اردو عنوان درج کریں..."
                className="w-full bg-[#111C3A] border border-slate-700 rounded px-3 py-2 text-white font-urdu-ui focus:border-[#C5A85C] focus:outline-none"
              />
            </div>

            {/* Source Publisher */}
            <div>
              <label className="block text-slate-400 mb-1 font-urdu-ui">Source Publisher / Authority *</label>
              <input
                type="text"
                value={mediaData.sourcePublisher.en}
                onChange={(e) =>
                  setMediaData({
                    ...mediaData,
                    sourcePublisher: { en: e.target.value, ur: e.target.value },
                  })
                }
                placeholder="e.g. Supreme Court of Pakistan Judicial Channel"
                className="w-full bg-[#111C3A] border border-slate-700 rounded px-3 py-2 text-white focus:border-[#C5A85C] focus:outline-none"
              />
            </div>

            {/* Source URL */}
            <div>
              <label className="block text-slate-400 mb-1 font-mono">Source URL (YouTube / Public Link) *</label>
              <input
                type="text"
                value={mediaData.sourceUrl}
                onChange={(e) => setMediaData({ ...mediaData, sourceUrl: e.target.value })}
                placeholder="https://www.youtube.com/watch?v=..."
                className="w-full bg-[#111C3A] border border-slate-700 rounded px-3 py-2 text-white font-mono focus:border-[#C5A85C] focus:outline-none"
              />
            </div>

            {/* Event Date */}
            <div>
              <label className="block text-slate-400 mb-1 font-mono">Event / Hearing Date (YYYY-MM-DD) *</label>
              <input
                type="text"
                value={mediaData.eventDate}
                onChange={(e) => setMediaData({ ...mediaData, eventDate: e.target.value })}
                placeholder="2024-04-15"
                className="w-full bg-[#111C3A] border border-slate-700 rounded px-3 py-2 text-white font-mono focus:border-[#C5A85C] focus:outline-none"
              />
            </div>

            {/* Publication Date */}
            <div>
              <label className="block text-slate-400 mb-1 font-mono">Upload / Broadcast Date (YYYY-MM-DD)</label>
              <input
                type="text"
                value={mediaData.publicationDate || ''}
                onChange={(e) => setMediaData({ ...mediaData, publicationDate: e.target.value })}
                placeholder="2024-04-16"
                className="w-full bg-[#111C3A] border border-slate-700 rounded px-3 py-2 text-white font-mono focus:border-[#C5A85C] focus:outline-none"
              />
            </div>
          </div>

          {/* Bilingual Description */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block text-slate-400 mb-1 font-urdu-ui">Description (English) *</label>
              <textarea
                rows={2}
                value={mediaData.description.en}
                onChange={(e) =>
                  setMediaData({ ...mediaData, description: { ...mediaData.description, en: e.target.value } })
                }
                placeholder="Context of this recording or document..."
                className="w-full bg-[#111C3A] border border-slate-700 rounded p-2 text-white focus:border-[#C5A85C] focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-slate-400 mb-1 font-urdu-ui">Description (Urdu) *</label>
              <textarea
                rows={2}
                dir="rtl"
                value={mediaData.description.ur}
                onChange={(e) =>
                  setMediaData({ ...mediaData, description: { ...mediaData.description, ur: e.target.value } })
                }
                placeholder="اردو میں وضاحتی تفصیل درج کریں..."
                className="w-full bg-[#111C3A] border border-slate-700 rounded p-2 text-white font-urdu-ui focus:border-[#C5A85C] focus:outline-none"
              />
            </div>
          </div>

          {/* Timestamps */}
          {mediaData.mediaType === 'youtube_video' && (
            <div className="text-xs">
              <label className="block text-slate-400 mb-1 font-urdu-ui">
                Timestamped Notes (e.g. 04:12 - Chief Justice questions counsel)
              </label>
              <textarea
                rows={2}
                value={mediaData.videoTimestampsText || ''}
                onChange={(e) => setMediaData({ ...mediaData, videoTimestampsText: e.target.value })}
                placeholder="04:12 - First key argument&#10;18:40 - Operative concession by state counsel"
                className="w-full bg-[#111C3A] border border-slate-700 rounded p-2 text-white font-mono text-[11px] focus:border-[#C5A85C] focus:outline-none"
              />
            </div>
          )}

          {/* Submitter & Checklist */}
          <div className="bg-[#111C3A] p-4 rounded-lg space-y-3 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <input
                type="text"
                value={mediaData.contributorName}
                onChange={(e) => setMediaData({ ...mediaData, contributorName: e.target.value })}
                placeholder="Your Full Name *"
                className="bg-[#0B132B] border border-slate-700 rounded px-3 py-1.5 text-white"
              />
              <input
                type="email"
                value={mediaData.contributorEmail || ''}
                onChange={(e) => setMediaData({ ...mediaData, contributorEmail: e.target.value })}
                placeholder="Email Address"
                className="bg-[#0B132B] border border-slate-700 rounded px-3 py-1.5 text-white"
              />
            </div>
            <label className="flex items-start gap-2 text-slate-300 cursor-pointer font-urdu-ui">
              <input
                type="checkbox"
                checked={mediaData.checklistConfirmed}
                onChange={(e) => setMediaData({ ...mediaData, checklistConfirmed: e.target.checked })}
                className="mt-0.5 rounded border-slate-700 text-[#C5A85C] focus:ring-[#C5A85C]"
              />
              <span>
                I confirm that this media does NOT identify juveniles or victims of sensitive crimes and respects public legal access terms.
              </span>
            </label>
          </div>

          {/* Diagnostics */}
          {!validationResultMedia.valid && (
            <div className="p-3.5 rounded bg-amber-950/40 border border-amber-500/40 text-xs text-amber-200 space-y-1 font-urdu-ui">
              <div className="font-semibold flex items-center gap-1.5 text-amber-300">
                <AlertTriangle size={14} />
                <span>Pre-Submission Checks:</span>
              </div>
              <ul className="list-disc pl-4 space-y-0.5 text-[11px]">
                {validationResultMedia.errors.map((err, idx) => (
                  <li key={idx}>{err}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Actions */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-800">
            <button
              onClick={() => handleCopy(generateMediaMarkdown())}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded bg-[#111C3A] hover:bg-[#172346] border border-slate-700 text-slate-200 text-xs font-urdu-ui transition-colors"
            >
              {copiedText ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
              <span>{copiedText ? 'Copied!' : 'Copy Formatted Markdown'}</span>
            </button>

            <a
              href={`${REPOSITORY_CONFIG.mediaSubmissionTemplateUrl}${encodeURIComponent(mediaData.title.en || 'Media Submission')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded bg-[#C5A85C] hover:bg-[#E0C57A] text-[#0B132B] font-bold text-xs transition-colors font-urdu-ui shadow-sm"
            >
              <span>{lang === 'en' ? 'Open in GitHub Issues (Pre-filled)' : 'گٹ ہب پر ایشو بنائیں'}</span>
              <ExternalLink size={13} />
            </a>
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* TAB 5: ADMINISTRATOR & REVIEWER CHECKLIST                    */}
      {/* ============================================================ */}
      {activeTab === 'checklist' && (
        <div className="bg-[#0E1738] border border-slate-800 rounded-xl p-6 sm:p-8 space-y-6">
          <div className="border-b border-slate-800 pb-4">
            <div className="text-xs font-mono text-[#E0C57A] uppercase mb-1">
              Maintainer Quality Control Standard
            </div>
            <h2 className="text-lg sm:text-xl font-bold text-white font-urdu-ui">
              {lang === 'en' ? 'Administrator & Reviewer 9-Step Verification Protocol' : 'ایڈمن اور مبصرین کے لیے 9 نکاتی دستاویزی چیک لسٹ'}
            </h2>
            <p className="text-xs text-slate-400 mt-1 font-urdu-ui">
              {lang === 'en'
                ? 'Every contribution must be audited against these checks before being merged into the codebase.'
                : 'مرکزی کوڈ ریپازٹری میں کسی بھی تبدیلی سے قبل اس معیار کی تسلی لازمی ہے۔'}
            </p>
          </div>

          <div className="space-y-4">
            {[
              {
                step: '1. Receive Contribution',
                desc: 'Acknowledge the GitHub Issue or PR. Check that the submission has populated all mandatory fields and assigned a unique case ID.',
              },
              {
                step: '2. Primary Source Inspection',
                desc: 'Directly open the provided primary source link or cross-reference the cited law journal (SCMR, PLD, CLC, PCrLJ). Never rely on second-hand social media screenshots.',
              },
              {
                step: '3. Procedural Status Verification',
                desc: 'Ensure bail orders are strictly categorized as interim relief (bail_granted) and NOT described as acquittals. Check that convictions cite the statutory charge.',
              },
              {
                step: '4. Date & Timeline Precision',
                desc: 'Verify that all dates adhere to ISO YYYY-MM-DD. For media, ensure eventDate is documented separately from broadcast upload date.',
              },
              {
                step: '5. Statutory Privacy & Redaction Audit',
                desc: 'Confirm zero exposure of minors (Juvenile Justice System Act 2018), victims of gender offenses, or privileged lawyer-client files. Enforce redacted=true where required.',
              },
              {
                step: '6. Automated Schema & Invariant Testing',
                desc: 'Execute `npm test` locally or in CI. Ensure 100% pass across validateBatch, duplicate ID checks, and bilingual text integrity.',
              },
              {
                step: '7. Request Changes or Reject',
                desc: 'If discrepancies exist or primary sources cannot be authenticated, mark the issue as `Changes Requested` or `Rejected` with a clear written explanation.',
              },
              {
                step: '8. Deliberate Merge into Git',
                desc: 'Maintainer merges the PR into the `main` branch. GitHub Actions automatically builds the production bundle and runs automated tests.',
              },
              {
                step: '9. Post-Deployment Audit',
                desc: 'Inspect the live GitHub Pages site to verify that the new record renders cleanly in both English and Urdu RTL without regressions.',
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="p-4 rounded-lg bg-[#111C3A] border border-slate-800 space-y-1.5"
              >
                <div className="flex items-center gap-2">
                  <span className="font-mono text-[#E0C57A] font-bold text-xs bg-[#0B132B] px-2 py-0.5 rounded border border-slate-700">
                    Step {idx + 1}
                  </span>
                  <h3 className="text-sm font-bold text-white font-urdu-ui">{item.step}</h3>
                </div>
                <p className="text-xs text-slate-300 font-urdu-ui leading-relaxed pl-8 rtl:pl-0 rtl:pr-8">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* TAB 6: PERMISSIONS & TRUST ARCHITECTURE                     */}
      {/* ============================================================ */}
      {activeTab === 'security' && (
        <div className="space-y-6">
          <div className="bg-[#0E1738] border border-slate-800 rounded-xl p-6 sm:p-8 space-y-6">
            <div>
              <div className="text-xs font-mono text-[#E0C57A] uppercase mb-1">
                Zero-Trust & Free Governance Architecture
              </div>
              <h2 className="text-lg sm:text-xl font-bold text-white font-urdu-ui">
                {cp.rolesTitle[lang]}
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-3xl font-urdu-ui leading-relaxed">
                {cp.rolesDesc[lang]}
              </p>
            </div>

            {/* Role Definitions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {(['super_admin', 'reviewer', 'contributor', 'public_reader'] as const).map((rKey) => {
                const role = cp.roles[rKey];
                return (
                  <div
                    key={rKey}
                    className="p-5 rounded-xl bg-[#111C3A] border border-slate-800 space-y-2 text-xs"
                  >
                    <div className="flex items-center gap-2 font-bold text-[#E0C57A] font-urdu-ui">
                      <Lock size={14} />
                      <span>{role.title[lang]}</span>
                    </div>
                    <p className="text-slate-300 font-urdu-ui leading-relaxed">
                      {role.desc[lang]}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* GitHub Repository Security Guidelines */}
          <div className="bg-[#0E1738] border border-slate-800 rounded-xl p-6 sm:p-8 space-y-4">
            <div className="flex items-center gap-2 text-[#E0C57A]">
              <ShieldCheck size={18} />
              <h3 className="text-base font-bold text-white font-urdu-ui">
                {lang === 'en'
                  ? 'Recommended Free GitHub Repository Protections'
                  : 'گٹ ہب ریپازٹری کے مفت اور محفوظ ترتیبات'}
              </h3>
            </div>

            <div className="text-xs text-slate-300 space-y-3 font-urdu-ui leading-relaxed">
              <p>
                To maintain complete data integrity without paid tools, archive maintainers should configure these native GitHub settings:
              </p>
              <ul className="list-disc pl-5 rtl:pl-0 rtl:pr-5 space-y-2">
                <li>
                  <strong>Branch Protection on `main`:</strong> Under Repository Settings → Branches, enable branch protection for <code className="text-[#E0C57A]">main</code>.
                </li>
                <li>
                  <strong>Require Pull Request Reviews:</strong> Require at least 1 approving review from an authorized maintainer before merging.
                </li>
                <li>
                  <strong>Require Status Checks to Pass:</strong> Ensure the GitHub Actions deployment workflow tests pass before merge.
                </li>
                <li>
                  <strong>Least-Privilege Collaborators:</strong> Invite outside lawyers as <em>Triage</em> or <em>Read</em> contributors only, requiring all submissions via Issues/PRs.
                </li>
                <li>
                  <strong>Zero Secrets in Client Code:</strong> Never store personal access tokens, private keys, or passwords in repository files or frontend code.
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
