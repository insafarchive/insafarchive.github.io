import React, { useState, useEffect } from 'react';
import {
  Language,
  CaseRecord,
  MediaItem,
  ProceduralStatus,
  ArchiveCategory,
  Province,
  CourtLevel,
  RecordType,
  EditorialReviewStatus,
  EvidentiaryNature,
  Party,
  EvidentiaryItem,
  ConnectedDocument,
  SourceReference,
  MediaType,
  VideoTimestamp,
} from '../types';
import { translations } from '../data/translations';
import { REPOSITORY_CONFIG } from '../config/repository';
import { allMediaRecords } from '../data/media/index';
import { validateCaseRecord, validateMediaRecord, validateBatch } from '../utils/validator';
import { normalizeSearchText } from '../utils/urduNormalize';
import { ScalesLogo } from '../components/ScalesLogo';
import { StatusBadge } from '../components/StatusBadge';
import { CaseDetailView } from './CaseDetailView';
import {
  ShieldAlert,
  Plus,
  Edit,
  Eye,
  Download,
  Copy,
  Check,
  AlertTriangle,
  FileText,
  Video,
  Database,
  ArrowRight,
  RotateCcw,
  CheckCircle2,
  GitPullRequest,
  ExternalLink,
  Trash2,
  Search,
  Filter,
  Layers,
  Sparkles,
  Info,
} from 'lucide-react';

interface AdminDashboardViewProps {
  cases: CaseRecord[];
  lang: Language;
  onNavigate: (page: string, params?: { caseId?: string; tab?: string }) => void;
  onSelectCase: (caseItem: CaseRecord) => void;
}

const DEFAULT_NEW_CASE: CaseRecord = {
  id: '',
  slug: '',
  caseNumber: '',
  title: { en: '', ur: '' },
  summary: { en: '', ur: '' },
  factualBackground: { en: '', ur: '' },
  recordType: 'court_case',
  categories: ['court_judgments'],
  location: {
    province: 'punjab',
    district: '',
    city: '',
  },
  incidentDate: new Date().toISOString().split('T')[0],
  filingDate: new Date().toISOString().split('T')[0],
  court: { en: 'High Court of Sindh', ur: 'سندھ ہائی کورٹ' },
  courtLevel: 'high_court',
  bench: { en: 'Division Bench', ur: 'ڈویژن بینچ' },
  statutoryProvisions: [],
  parties: [
    {
      id: 'pty-01',
      name: { en: 'Petitioner / Accused Name', ur: 'درخواست گزار / ملزم کا نام' },
      role: 'petitioner',
      isProtectedOrMinor: false,
      redacted: false,
    },
  ],
  proceduralStatus: 'pending_trial',
  proceduralStatusNotes: { en: '', ur: '' },
  legalQuestion: { en: '', ur: '' },
  timeline: [
    {
      id: 'tm-01',
      date: new Date().toISOString().split('T')[0],
      event: { en: 'Petition instituted and registered', ur: 'درخواست دائر اور رجسٹر کی گئی' },
      proceduralOutcome: { en: 'Notices issued to statutory respondents', ur: 'فریقین کو نوٹس جاری' },
      statusEffect: 'pending_trial',
    },
  ],
  evidenceItems: [
    {
      id: 'ev-01',
      claimOrFact: { en: 'FIR allegation recorded by prosecution', ur: 'استغاثہ کی ابتدائی ایف آئی آر کا دعویٰ' },
      nature: 'allegation',
      sourceName: { en: 'Police Report / FIR Record', ur: 'پولیس رپورٹ و ابتدائی اطلاع' },
      date: new Date().toISOString().split('T')[0],
      verifiedByCourt: false,
    },
  ],
  connectedDocuments: [],
  videoEvidence: [],
  sources: [],
  lastUpdated: new Date().toISOString().split('T')[0],
  editorialReviewStatus: 'under_editorial_review',
  incompleteNotice: false,
  unverifiedNotice: false,
  relatedCaseIds: [],
  tags: [],
  isDemonstrationData: false,
  featured: false,
};

const DEFAULT_NEW_MEDIA: MediaItem = {
  id: '',
  title: { en: '', ur: '' },
  mediaType: 'youtube_video',
  associatedCaseIds: [],
  sourceUrl: '',
  sourcePublisher: { en: '', ur: '' },
  publicationDate: new Date().toISOString().split('T')[0],
  eventDate: new Date().toISOString().split('T')[0],
  dateAdded: new Date().toISOString().split('T')[0],
  description: { en: '', ur: '' },
  contextNotes: { en: '', ur: '' },
  videoMetadata: {
    youtubeId: '',
    duration: '10:00',
    timestamps: [],
  },
  verificationStatus: 'under_editorial_review',
  visibility: 'public',
  tags: [],
};

export const AdminDashboardView: React.FC<AdminDashboardViewProps> = ({
  cases,
  lang,
  onNavigate,
  onSelectCase,
}) => {
  const t = translations;
  const adminT = t.adminDashboard;

  // Active workspace tab
  const [activeTab, setActiveTab] = useState<
    'overview' | 'cases' | 'caseForm' | 'media' | 'review' | 'export'
  >('overview');

  // Case Editing State
  const [caseDraft, setCaseDraft] = useState<CaseRecord>(() => {
    try {
      const saved = localStorage.getItem('insaf_admin_case_draft');
      if (saved) return JSON.parse(saved);
    } catch {
      // Fallback
    }
    return DEFAULT_NEW_CASE;
  });

  const [editingOriginalCase, setEditingOriginalCase] = useState<CaseRecord | null>(null);
  const [isEditingExistingCase, setIsEditingExistingCase] = useState<boolean>(false);

  // Media Editing State
  const [mediaDraft, setMediaDraft] = useState<MediaItem>(() => {
    try {
      const saved = localStorage.getItem('insaf_admin_media_draft');
      if (saved) return JSON.parse(saved);
    } catch {
      // Fallback
    }
    return DEFAULT_NEW_MEDIA;
  });
  const [isEditingExistingMedia, setIsEditingExistingMedia] = useState<boolean>(false);

  // Validation States
  const [caseValidation, setCaseValidation] = useState<{ errors: string[]; warnings: string[] }>({
    errors: [],
    warnings: [],
  });
  const [mediaValidation, setMediaValidation] = useState<{ errors: string[]; warnings: string[] }>({
    errors: [],
    warnings: [],
  });

  // UI helpers
  const [notification, setNotification] = useState<string | null>(null);
  const [copiedState, setCopiedState] = useState<string | null>(null);
  const [previewCase, setPreviewCase] = useState<CaseRecord | null>(null);

  // Search & Filters in Case Catalog
  const [catalogSearch, setCatalogSearch] = useState('');
  const [catalogStatusFilter, setCatalogStatusFilter] = useState<string>('all');
  const [catalogCategoryFilter, setCatalogCategoryFilter] = useState<string>('all');

  // Search in Media Catalog
  const [mediaSearch, setMediaSearch] = useState('');
  const [mediaTypeFilter, setMediaTypeFilter] = useState<string>('all');

  // New item inputs in Case Form
  const [statuteInput, setStatuteInput] = useState('');
  const [tagInput, setTagInput] = useState('');

  // Validate on draft changes
  useEffect(() => {
    if (caseDraft.id) {
      const existingIds = new Set(
        cases.map((c) => c.id).filter((id) => (isEditingExistingCase ? id !== editingOriginalCase?.id : true))
      );
      const res = validateCaseRecord(caseDraft, existingIds);
      setCaseValidation(res);
    }
  }, [caseDraft, cases, isEditingExistingCase, editingOriginalCase]);

  // Autosave to localStorage
  const handleSaveCaseDraft = () => {
    try {
      localStorage.setItem('insaf_admin_case_draft', JSON.stringify(caseDraft));
      setNotification(lang === 'en' ? 'Case draft saved to browser storage.' : 'ڈرافٹ براؤزر میں محفوظ ہو گیا۔');
      setTimeout(() => setNotification(null), 3000);
    } catch {
      // Storage issue
    }
  };

  const handleClearCaseDraft = () => {
    if (
      window.confirm(
        lang === 'en'
          ? 'Are you sure you want to discard this case draft? Unsaved changes will be lost.'
          : 'کیا آپ واقعی اس مسودے کو ختم کرنا چاہتے ہیں؟'
      )
    ) {
      localStorage.removeItem('insaf_admin_case_draft');
      setCaseDraft(DEFAULT_NEW_CASE);
      setEditingOriginalCase(null);
      setIsEditingExistingCase(false);
      setNotification(lang === 'en' ? 'Draft discarded.' : 'ڈرافٹ منسوخ کر دیا گیا۔');
      setTimeout(() => setNotification(null), 2500);
    }
  };

  const handleSaveMediaDraft = () => {
    try {
      localStorage.setItem('insaf_admin_media_draft', JSON.stringify(mediaDraft));
      setNotification(lang === 'en' ? 'Media draft saved to browser storage.' : 'میڈیا ڈرافٹ محفوظ ہو گیا۔');
      setTimeout(() => setNotification(null), 3000);
    } catch {
      // Storage issue
    }
  };

  const handleClearMediaDraft = () => {
    if (window.confirm(lang === 'en' ? 'Discard media draft?' : 'میڈیا ڈرافٹ ختم کریں؟')) {
      localStorage.removeItem('insaf_admin_media_draft');
      setMediaDraft(DEFAULT_NEW_MEDIA);
      setIsEditingExistingMedia(false);
    }
  };

  // Select a case for editing
  const handleStartEditCase = (caseItem: CaseRecord) => {
    const cloned = JSON.parse(JSON.stringify(caseItem));
    setCaseDraft(cloned);
    setEditingOriginalCase(caseItem);
    setIsEditingExistingCase(true);
    setActiveTab('caseForm');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Start new case from scratch
  const handleStartNewCase = () => {
    setCaseDraft({
      ...DEFAULT_NEW_CASE,
      id: `PK-HC-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`,
      slug: `new-case-docket-${Date.now()}`,
    });
    setEditingOriginalCase(null);
    setIsEditingExistingCase(false);
    setActiveTab('caseForm');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Auto generate URL slug from English title
  const handleGenerateSlug = () => {
    if (!caseDraft.title.en) return;
    const generated = caseDraft.title.en
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '')
      .slice(0, 60);
    setCaseDraft((prev) => ({ ...prev, slug: generated || `case-${prev.id.toLowerCase()}` }));
  };

  // Copy helper
  const handleCopyText = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedState(label);
    setTimeout(() => setCopiedState(null), 2500);
  };

  // Download JSON file
  const handleDownloadJson = (data: any, filename: string) => {
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Filtered cases catalog
  const filteredCasesCatalog = cases.filter((c) => {
    const matchesSearch =
      catalogSearch === '' ||
      normalizeSearchText(`${c.id} ${c.caseNumber} ${c.title.en} ${c.title.ur} ${c.court?.en || ''}`).includes(
        normalizeSearchText(catalogSearch)
      );
    const matchesStatus = catalogStatusFilter === 'all' || c.proceduralStatus === catalogStatusFilter;
    const matchesCategory =
      catalogCategoryFilter === 'all' || c.categories.includes(catalogCategoryFilter as ArchiveCategory);
    return matchesSearch && matchesStatus && matchesCategory;
  });

  // Filtered media catalog
  const filteredMediaCatalog = allMediaRecords.filter((m) => {
    const matchesSearch =
      mediaSearch === '' ||
      normalizeSearchText(`${m.id} ${m.title.en} ${m.title.ur} ${m.sourcePublisher.en}`).includes(
        normalizeSearchText(mediaSearch)
      );
    const matchesType = mediaTypeFilter === 'all' || m.mediaType === mediaTypeFilter;
    return matchesSearch && matchesType;
  });

  // Metrics (computed dynamically, zero hardcoding)
  const publishedCasesCount = cases.filter((c) => c.editorialReviewStatus === 'verified_official_record').length;
  const underReviewCasesCount = cases.filter(
    (c) => c.editorialReviewStatus === 'under_editorial_review' || c.editorialReviewStatus === 'preliminary_documentation'
  ).length;
  const batchHealth = validateBatch(cases);

  // Generate GitHub PR Markdown text
  const generatePrMarkdown = (): string => {
    const isEdit = isEditingExistingCase;
    return `### Case Dossier Submission: ${caseDraft.id} (${caseDraft.caseNumber})

**Submission Type**: ${isEdit ? 'Case Correction / Milestone Update' : 'New Case Record'}
**Title (EN)**: ${caseDraft.title.en}
**Title (UR)**: ${caseDraft.title.ur}
**Forum / Court**: ${caseDraft.court?.en} (${caseDraft.courtLevel})
**Procedural Status**: \`${caseDraft.proceduralStatus}\`
**Editorial Review Status**: \`${caseDraft.editorialReviewStatus}\`

#### Evidentiary Breakdown
- Allegations / Party Statements: ${caseDraft.evidenceItems.filter((e) => e.nature === 'allegation' || e.nature === 'party_statement').length}
- Official Records & Findings: ${caseDraft.evidenceItems.filter((e) => e.nature === 'official_record' || e.nature === 'court_finding').length}
- Connected Documents: ${caseDraft.connectedDocuments.length}
- Primary Sources: ${caseDraft.sources.length}

#### Compliance Confirmation
- [x] Presumption of Innocence respected (bail is NOT marked as acquittal).
- [x] Minors / Protected Witnesses redacted under Juvenile Justice System Act 2018.
- [x] Primary source citations or official docket links documented.
- [x] Schema tested against automated validator suite (\`npm test\`).

\`\`\`json
// JSON Payload for ${caseDraft.id}
${JSON.stringify(caseDraft, null, 2)}
\`\`\`
`;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* 1. Header & Institutional Notice */}
      <div className="border-b border-slate-800 pb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#111C3A] border border-[#C5A85C]/40 text-[#E0C57A] text-xs font-semibold uppercase tracking-wider mb-2 font-urdu-ui">
            <ScalesLogo size={14} />
            <span>{adminT.title[lang]}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white font-legal-display font-urdu-ui">
            {adminT.title[lang]}
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl font-urdu-ui">
            {adminT.subtitle[lang]}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={handleStartNewCase}
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#C5A85C] hover:bg-[#E0C57A] text-[#0B132B] font-bold text-xs rounded transition-colors font-urdu-ui shadow-sm"
          >
            <Plus size={15} />
            <span>{adminT.actions.addNewCase[lang]}</span>
          </button>
          <a
            href={REPOSITORY_CONFIG.newCaseTemplateUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-2 bg-[#111C3A] hover:bg-[#18254B] border border-slate-700 text-slate-200 text-xs rounded transition-colors font-urdu-ui"
          >
            <ExternalLink size={13} className="text-[#C5A85C]" />
            <span>GitHub Issue Form</span>
          </a>
        </div>
      </div>

      {/* 2. Critical Staging Workspace Disclaimer Banner */}
      <div className="bg-[#111C3A]/90 border-l-4 rtl:border-l-0 rtl:border-r-4 border-[#C5A85C] p-4 rounded-r-lg rtl:rounded-r-none rtl:rounded-l-lg shadow-md space-y-2">
        <div className="flex items-center gap-2 text-xs font-bold text-[#E0C57A] font-urdu-ui">
          <ShieldAlert size={16} />
          <span>{lang === 'en' ? 'Administrative Isolation Protocol' : 'انتظامی تحفظ کا ضابطہ'}</span>
        </div>
        <p className="text-xs text-slate-300 leading-relaxed font-urdu-ui">
          {adminT.disclaimer[lang]}
        </p>
        <div className="flex flex-wrap items-center justify-between gap-2 pt-1 text-[11px] text-slate-400">
          <span>
            {lang === 'en'
              ? 'Local Storage Workspace · Zero Secrets · Git Peer-Review Required for Deployment'
              : 'محفوظ لوکل براؤزر میموری · پبلک ڈیٹا میں فوری شمولیت ممنوع · گٹ ہب پیئر ریویو لازمی ہے'}
          </span>
          <button
            onClick={handleClearCaseDraft}
            className="text-amber-400 hover:text-amber-300 hover:underline font-medium font-urdu-ui inline-flex items-center gap-1"
          >
            <RotateCcw size={11} />
            <span>{adminT.actions.clearDraft[lang]}</span>
          </button>
        </div>
      </div>

      {/* 3. Notification Toast */}
      {notification && (
        <div className="bg-emerald-950/80 border border-emerald-500/40 text-emerald-200 px-4 py-2.5 rounded-lg text-xs flex items-center justify-between font-urdu-ui animate-fadeIn">
          <div className="flex items-center gap-2">
            <CheckCircle2 size={16} className="text-emerald-400 shrink-0" />
            <span>{notification}</span>
          </div>
          <button onClick={() => setNotification(null)} className="text-emerald-400 hover:text-white">
            ✕
          </button>
        </div>
      )}

      {/* 4. Tab Navigation Bar */}
      <div className="border-b border-slate-800 flex overflow-x-auto gap-2 pb-px font-urdu-ui scrollbar-none">
        <button
          onClick={() => setActiveTab('overview')}
          className={`px-4 py-2.5 text-xs font-semibold whitespace-nowrap transition-colors border-b-2 flex items-center gap-2 ${
            activeTab === 'overview'
              ? 'border-[#C5A85C] text-[#E0C57A]'
              : 'border-transparent text-slate-400 hover:text-white'
          }`}
        >
          <Layers size={14} />
          <span>{adminT.tabs.overview[lang]}</span>
        </button>

        <button
          onClick={() => setActiveTab('cases')}
          className={`px-4 py-2.5 text-xs font-semibold whitespace-nowrap transition-colors border-b-2 flex items-center gap-2 ${
            activeTab === 'cases'
              ? 'border-[#C5A85C] text-[#E0C57A]'
              : 'border-transparent text-slate-400 hover:text-white'
          }`}
        >
          <Database size={14} />
          <span>{adminT.tabs.cases[lang]}</span>
          <span className="text-[10px] bg-slate-800 px-1.5 py-0.5 rounded-full text-slate-300">
            {cases.length}
          </span>
        </button>

        <button
          onClick={() => setActiveTab('caseForm')}
          className={`px-4 py-2.5 text-xs font-semibold whitespace-nowrap transition-colors border-b-2 flex items-center gap-2 ${
            activeTab === 'caseForm'
              ? 'border-[#C5A85C] text-[#E0C57A]'
              : 'border-transparent text-slate-400 hover:text-white'
          }`}
        >
          <Edit size={14} />
          <span>{adminT.tabs.caseForm[lang]}</span>
          {isEditingExistingCase ? (
            <span className="text-[10px] bg-amber-900/60 text-amber-300 px-1.5 py-0.2 rounded">
              Edit: {caseDraft.id}
            </span>
          ) : (
            <span className="text-[10px] bg-emerald-900/60 text-emerald-300 px-1.5 py-0.2 rounded">
              New
            </span>
          )}
        </button>

        <button
          onClick={() => setActiveTab('media')}
          className={`px-4 py-2.5 text-xs font-semibold whitespace-nowrap transition-colors border-b-2 flex items-center gap-2 ${
            activeTab === 'media'
              ? 'border-[#C5A85C] text-[#E0C57A]'
              : 'border-transparent text-slate-400 hover:text-white'
          }`}
        >
          <Video size={14} />
          <span>{adminT.tabs.media[lang]}</span>
          <span className="text-[10px] bg-slate-800 px-1.5 py-0.5 rounded-full text-slate-300">
            {allMediaRecords.length}
          </span>
        </button>

        <button
          onClick={() => setActiveTab('review')}
          className={`px-4 py-2.5 text-xs font-semibold whitespace-nowrap transition-colors border-b-2 flex items-center gap-2 ${
            activeTab === 'review'
              ? 'border-[#C5A85C] text-[#E0C57A]'
              : 'border-transparent text-slate-400 hover:text-white'
          }`}
        >
          <GitPullRequest size={14} />
          <span>{adminT.tabs.review[lang]}</span>
          {caseValidation.errors.length === 0 ? (
            <span className="text-[10px] bg-emerald-950 text-emerald-300 px-1.5 py-0.2 rounded border border-emerald-800">
              Valid
            </span>
          ) : (
            <span className="text-[10px] bg-red-950 text-red-300 px-1.5 py-0.2 rounded border border-red-800">
              {caseValidation.errors.length} err
            </span>
          )}
        </button>

        <button
          onClick={() => setActiveTab('export')}
          className={`px-4 py-2.5 text-xs font-semibold whitespace-nowrap transition-colors border-b-2 flex items-center gap-2 ${
            activeTab === 'export'
              ? 'border-[#C5A85C] text-[#E0C57A]'
              : 'border-transparent text-slate-400 hover:text-white'
          }`}
        >
          <Download size={14} />
          <span>{adminT.tabs.export[lang]}</span>
        </button>
      </div>

      {/* ============================================================== */}
      {/* TAB 1: OVERVIEW & HEALTH METRICS                              */}
      {/* ============================================================== */}
      {activeTab === 'overview' && (
        <div className="space-y-8 animate-fadeIn">
          {/* Summary Cards */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            <div className="p-4 rounded-xl bg-[#111C3A] border border-slate-800 space-y-1">
              <span className="text-[11px] text-slate-400 font-urdu-ui uppercase tracking-wider block">
                {adminT.metrics.totalCases[lang]}
              </span>
              <div className="text-2xl font-bold text-white font-legal-display">{cases.length}</div>
              <span className="text-[10px] text-emerald-400 font-urdu-ui">Active Catalog</span>
            </div>

            <div className="p-4 rounded-xl bg-[#111C3A] border border-slate-800 space-y-1">
              <span className="text-[11px] text-slate-400 font-urdu-ui uppercase tracking-wider block">
                {adminT.metrics.publishedCases[lang]}
              </span>
              <div className="text-2xl font-bold text-emerald-400 font-legal-display">
                {publishedCasesCount}
              </div>
              <span className="text-[10px] text-slate-400 font-urdu-ui">Official Benches</span>
            </div>

            <div className="p-4 rounded-xl bg-[#111C3A] border border-slate-800 space-y-1">
              <span className="text-[11px] text-slate-400 font-urdu-ui uppercase tracking-wider block">
                {adminT.metrics.totalMedia[lang]}
              </span>
              <div className="text-2xl font-bold text-sky-400 font-legal-display">
                {allMediaRecords.length}
              </div>
              <span className="text-[10px] text-slate-400 font-urdu-ui">Videos & Documents</span>
            </div>

            <div className="p-4 rounded-xl bg-[#111C3A] border border-slate-800 space-y-1">
              <span className="text-[11px] text-slate-400 font-urdu-ui uppercase tracking-wider block">
                {adminT.metrics.activeDrafts[lang]}
              </span>
              <div className="text-2xl font-bold text-amber-400 font-legal-display">
                {caseDraft.id ? 1 : 0}
              </div>
              <span className="text-[10px] text-slate-400 font-urdu-ui">Local Session</span>
            </div>

            <div className="p-4 rounded-xl bg-[#111C3A] border border-slate-800 space-y-1">
              <span className="text-[11px] text-slate-400 font-urdu-ui uppercase tracking-wider block">
                {adminT.metrics.validationStatus[lang]}
              </span>
              <div className="text-2xl font-bold text-emerald-400 font-legal-display">
                {batchHealth.valid ? '100%' : 'Audit'}
              </div>
              <span className="text-[10px] text-slate-400 font-urdu-ui">
                {batchHealth.valid ? 'Zero Errors' : `${batchHealth.errors.length} Issues`}
              </span>
            </div>

            <div className="p-4 rounded-xl bg-[#111C3A] border border-slate-800 space-y-1">
              <span className="text-[11px] text-slate-400 font-urdu-ui uppercase tracking-wider block">
                {adminT.metrics.preparedForReview[lang]}
              </span>
              <div className="text-2xl font-bold text-[#E0C57A] font-legal-display">
                {underReviewCasesCount}
              </div>
              <span className="text-[10px] text-slate-400 font-urdu-ui">Awaiting Citation</span>
            </div>
          </div>

          {/* Quick Action Shortcuts Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div
              onClick={handleStartNewCase}
              className="p-5 rounded-xl bg-[#0E1738] border border-[#C5A85C]/30 hover:border-[#C5A85C] cursor-pointer transition-all group"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="p-2 rounded bg-[#172346] text-[#C5A85C] group-hover:scale-105 transition-transform">
                  <Plus size={20} />
                </div>
                <ArrowRight size={16} className="text-slate-500 group-hover:text-[#E0C57A] group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-all" />
              </div>
              <h3 className="text-sm font-bold text-white font-urdu-ui">{adminT.actions.addNewCase[lang]}</h3>
              <p className="text-xs text-slate-400 mt-1 font-urdu-ui">
                {lang === 'en'
                  ? 'Launch the case editor to compile a bilingual proceeding dossier with procedural milestones.'
                  : 'نیا مقدمہ، دستاویزی ثبوت اور عدالتی مراحل درج کرنے کے لیے ایڈیٹر کھولیں۔'}
              </p>
            </div>

            <div
              onClick={() => setActiveTab('cases')}
              className="p-5 rounded-xl bg-[#0E1738] border border-slate-800 hover:border-slate-600 cursor-pointer transition-all group"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="p-2 rounded bg-[#172346] text-sky-400 group-hover:scale-105 transition-transform">
                  <Database size={20} />
                </div>
                <ArrowRight size={16} className="text-slate-500 group-hover:text-sky-300 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-all" />
              </div>
              <h3 className="text-sm font-bold text-white font-urdu-ui">{adminT.tabs.cases[lang]}</h3>
              <p className="text-xs text-slate-400 mt-1 font-urdu-ui">
                {lang === 'en'
                  ? 'Search, filter, edit, and preview all 10 documented court proceedings in the archive.'
                  : 'آرکائیو میں موجود تمام عدالتی ریکارڈز تلاش کریں، ان کا جائزہ لیں اور ترمیم کریں۔'}
              </p>
            </div>

            <div
              onClick={() => setActiveTab('media')}
              className="p-5 rounded-xl bg-[#0E1738] border border-slate-800 hover:border-slate-600 cursor-pointer transition-all group"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="p-2 rounded bg-[#172346] text-emerald-400 group-hover:scale-105 transition-transform">
                  <Video size={20} />
                </div>
                <ArrowRight size={16} className="text-slate-500 group-hover:text-emerald-300 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-all" />
              </div>
              <h3 className="text-sm font-bold text-white font-urdu-ui">{adminT.tabs.media[lang]}</h3>
              <p className="text-xs text-slate-400 mt-1 font-urdu-ui">
                {lang === 'en'
                  ? 'Manage open-court YouTube video broadcasts, certified orders, and archival dockets.'
                  : 'عدالتی نشریات، تصدیق شدہ آرڈر شیٹس اور دستاویزی تصاویر کا انتظام کریں۔'}
              </p>
            </div>
          </div>

          {/* Editorial Audit Alerts (from Phase 5 findings) */}
          <div className="p-5 rounded-xl bg-[#111C3A] border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <AlertTriangle size={18} className="text-amber-400" />
                <h3 className="text-sm font-bold text-white font-urdu-ui">
                  {lang === 'en' ? 'Phase 5 Editorial Audit Queue' : 'ادارتی جائزہ و ثبوتی تقاضوں کی فہرست'}
                </h3>
              </div>
              <span className="text-xs text-slate-400 font-urdu-ui">
                {lang === 'en' ? 'Records awaiting primary court citations' : 'عدالتی ریکارڈز جن کی تصدیق درکار ہے'}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded bg-[#0B132B] border border-slate-800 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[#E0C57A] font-bold">PK-PHC-2023-0056</span>
                  <span className="text-[10px] text-amber-300 bg-amber-950/80 px-2 py-0.5 rounded">
                    Missing Primary Sources
                  </span>
                </div>
                <p className="text-slate-300 font-urdu-ui">Election Appeal No. 56/2023 — Peshawar High Court</p>
                <div className="pt-2">
                  <button
                    onClick={() => {
                      const matched = cases.find((c) => c.id === 'PK-PHC-2023-0056');
                      if (matched) handleStartEditCase(matched);
                    }}
                    className="text-[#C5A85C] hover:underline inline-flex items-center gap-1 font-urdu-ui"
                  >
                    <span>{lang === 'en' ? 'Edit & Add Citation' : 'ترمیم کریں و حوالہ درج کریں'}</span>
                    <ArrowRight size={12} />
                  </button>
                </div>
              </div>

              <div className="p-3 rounded bg-[#0B132B] border border-slate-800 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[#E0C57A] font-bold">PK-BHC-2024-0033</span>
                  <span className="text-[10px] text-sky-300 bg-sky-950/80 px-2 py-0.5 rounded">
                    Incomplete Sub Judice
                  </span>
                </div>
                <p className="text-slate-300 font-urdu-ui">Const. P. 33/2024 — Balochistan High Court</p>
                <div className="pt-2">
                  <button
                    onClick={() => {
                      const matched = cases.find((c) => c.id === 'PK-BHC-2024-0033');
                      if (matched) handleStartEditCase(matched);
                    }}
                    className="text-[#C5A85C] hover:underline inline-flex items-center gap-1 font-urdu-ui"
                  >
                    <span>{lang === 'en' ? 'Edit & Update Milestone' : 'ترمیم کریں و پیش رفت درج کریں'}</span>
                    <ArrowRight size={12} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* TAB 2: CASE CATALOG & FILTER TABLE                             */}
      {/* ============================================================== */}
      {activeTab === 'cases' && (
        <div className="space-y-6 animate-fadeIn">
          {/* Controls Bar */}
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
            <div className="relative flex-1 max-w-md">
              <Search size={15} className="absolute left-3 rtl:left-auto rtl:right-3 top-3 text-slate-400" />
              <input
                type="text"
                value={catalogSearch}
                onChange={(e) => setCatalogSearch(e.target.value)}
                placeholder={lang === 'en' ? 'Search by ID, docket, or title...' : 'آئی ڈی، مقدمہ نمبر یا نام سے تلاش کریں...'}
                className="w-full bg-[#111C3A] border border-slate-700 rounded-lg pl-9 rtl:pl-3 rtl:pr-9 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#C5A85C]"
              />
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <select
                value={catalogStatusFilter}
                onChange={(e) => setCatalogStatusFilter(e.target.value)}
                aria-label="Filter by Procedural Status"
                className="bg-[#111C3A] border border-slate-700 rounded-lg px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-[#C5A85C] font-urdu-ui"
              >
                <option value="all">{lang === 'en' ? 'All Procedural Statuses' : 'تمام قانونی کیفیات'}</option>
                {Object.keys(t.statuses).map((st) => (
                  <option key={st} value={st}>
                    {t.statuses[st as ProceduralStatus][lang]}
                  </option>
                ))}
              </select>

              <select
                value={catalogCategoryFilter}
                onChange={(e) => setCatalogCategoryFilter(e.target.value)}
                aria-label="Filter by Archive Category"
                className="bg-[#111C3A] border border-slate-700 rounded-lg px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-[#C5A85C] font-urdu-ui"
              >
                <option value="all">{lang === 'en' ? 'All Categories' : 'تمام شعبہ جات'}</option>
                {Object.keys(t.categories).map((cat) => (
                  <option key={cat} value={cat}>
                    {t.categories[cat as ArchiveCategory][lang]}
                  </option>
                ))}
              </select>

              <button
                onClick={handleStartNewCase}
                className="px-3.5 py-2 bg-[#C5A85C] hover:bg-[#E0C57A] text-[#0B132B] font-bold text-xs rounded-lg transition-colors font-urdu-ui inline-flex items-center gap-1.5"
              >
                <Plus size={14} />
                <span>{adminT.actions.addNewCase[lang]}</span>
              </button>
            </div>
          </div>

          {/* Cases Table */}
          <div className="bg-[#0E1738] border border-slate-800 rounded-xl overflow-hidden shadow-xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left rtl:text-right text-xs">
                <thead className="bg-[#111C3A] text-slate-400 font-semibold border-b border-slate-800 font-urdu-ui">
                  <tr>
                    <th className="py-3 px-4">Case ID & Docket</th>
                    <th className="py-3 px-4">Bilingual Title</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4">Court & Province</th>
                    <th className="py-3 px-4">Evidence</th>
                    <th className="py-3 px-4 text-right rtl:text-left">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/80 text-slate-300">
                  {filteredCasesCatalog.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="py-8 text-center text-slate-500 font-urdu-ui">
                        {lang === 'en' ? 'No case records matched your search filters.' : 'کوئی مقدمہ نہیں ملا۔'}
                      </td>
                    </tr>
                  ) : (
                    filteredCasesCatalog.map((c) => (
                      <tr key={c.id} className="hover:bg-[#162347]/50 transition-colors">
                        <td className="py-3 px-4 font-mono font-bold text-[#E0C57A] whitespace-nowrap">
                          <div>{c.id}</div>
                          <div className="text-[10px] text-slate-400 font-normal">{c.caseNumber}</div>
                        </td>

                        <td className="py-3 px-4 max-w-xs sm:max-w-md">
                          <div className="font-semibold text-white truncate">{c.title.en}</div>
                          <div className="text-[11px] text-slate-400 font-urdu-ui truncate">{c.title.ur}</div>
                        </td>

                        <td className="py-3 px-4 whitespace-nowrap">
                          <StatusBadge status={c.proceduralStatus} lang={lang} size="sm" />
                        </td>

                        <td className="py-3 px-4 whitespace-nowrap">
                          <div className="text-slate-200">{c.court?.en}</div>
                          <div className="text-[10px] text-slate-400 font-urdu-ui uppercase">
                            {t.provinces[c.location.province][lang]}
                          </div>
                        </td>

                        <td className="py-3 px-4 whitespace-nowrap text-slate-400 text-[11px]">
                          <span>{c.evidenceItems.length} ev</span> · <span>{c.connectedDocuments.length} doc</span>
                        </td>

                        <td className="py-3 px-4 whitespace-nowrap text-right rtl:text-left">
                          <div className="flex items-center justify-end rtl:justify-start gap-1.5">
                            <button
                              onClick={() => handleStartEditCase(c)}
                              className="p-1.5 rounded bg-[#172346] hover:bg-[#C5A85C] text-slate-300 hover:text-[#0B132B] transition-colors"
                              title="Edit Record in Studio"
                              aria-label={`Edit ${c.id}`}
                            >
                              <Edit size={14} />
                            </button>
                            <button
                              onClick={() => {
                                setPreviewCase(c);
                              }}
                              className="p-1.5 rounded bg-[#172346] hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
                              title="Preview Public View"
                              aria-label={`Preview ${c.id}`}
                            >
                              <Eye size={14} />
                            </button>
                            <button
                              onClick={() => handleDownloadJson(c, `${c.id}.json`)}
                              className="p-1.5 rounded bg-[#172346] hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
                              title="Export Case JSON"
                              aria-label={`Export JSON for ${c.id}`}
                            >
                              <Download size={14} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* TAB 3: CASE EDITOR STUDIO (FORM)                               */}
      {/* ============================================================== */}
      {activeTab === 'caseForm' && (
        <div className="space-y-8 animate-fadeIn">
          {/* Action Bar */}
          <div className="bg-[#111C3A] border border-slate-800 rounded-xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="space-y-0.5">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold text-[#E0C57A]">
                  {isEditingExistingCase ? `Editing: ${caseDraft.id}` : 'Creating New Case Dossier'}
                </span>
                {isEditingExistingCase && (
                  <span className="text-[10px] bg-amber-900/60 text-amber-300 px-2 py-0.5 rounded font-urdu-ui">
                    Existing Record Locked ID
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-400 font-urdu-ui">
                {lang === 'en'
                  ? 'All changes are staged in your browser session. Validate before exporting.'
                  : 'ترامیم براؤزر میں ہیں؛ ایکسپورٹ سے قبل اسکیما تصدیق لازمی ہے۔'}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={handleSaveCaseDraft}
                className="px-3 py-1.5 bg-[#172346] hover:bg-[#1C2C57] text-[#E0C57A] border border-[#C5A85C]/40 rounded text-xs font-semibold font-urdu-ui inline-flex items-center gap-1.5"
              >
                <Check size={13} />
                <span>{adminT.actions.saveDraft[lang]}</span>
              </button>

              <button
                onClick={() => setPreviewCase(caseDraft)}
                className="px-3 py-1.5 bg-[#172346] hover:bg-slate-700 text-slate-200 border border-slate-700 rounded text-xs font-semibold font-urdu-ui inline-flex items-center gap-1.5"
              >
                <Eye size={13} />
                <span>{adminT.actions.previewCase[lang]}</span>
              </button>

              <button
                onClick={() => setActiveTab('review')}
                className="px-3.5 py-1.5 bg-[#C5A85C] hover:bg-[#E0C57A] text-[#0B132B] font-bold text-xs rounded transition-colors font-urdu-ui inline-flex items-center gap-1.5 shadow-sm"
              >
                <GitPullRequest size={13} />
                <span>{adminT.actions.reviewDiff[lang]}</span>
              </button>
            </div>
          </div>

          {/* Validation Errors Alert Box */}
          {caseValidation.errors.length > 0 && (
            <div className="bg-red-950/70 border border-red-500/40 p-4 rounded-xl space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-red-300 font-urdu-ui">
                <AlertTriangle size={16} />
                <span>
                  {lang === 'en'
                    ? `Schema Validation Failed (${caseValidation.errors.length} Critical Issues)`
                    : `اسکیما کی توثیق میں ${caseValidation.errors.length} غلطیاں ہیں`}
                </span>
              </div>
              <ul className="text-xs text-red-200 list-disc list-inside space-y-1 font-mono">
                {caseValidation.errors.map((err, idx) => (
                  <li key={idx}>{err}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Form Sections */}
          <div className="space-y-6">
            {/* Section A: Stable Identifiers & Bilingual Titles */}
            <div className="bg-[#0E1738] border border-slate-800 rounded-xl p-6 space-y-4">
              <h3 className="text-sm font-bold text-[#E0C57A] uppercase tracking-wider font-urdu-ui">
                1. Stable Identifier, Case Docket & Titles
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1 font-urdu-ui">
                    Stable Case ID <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    value={caseDraft.id}
                    onChange={(e) => setCaseDraft({ ...caseDraft, id: e.target.value.trim() })}
                    disabled={isEditingExistingCase}
                    placeholder="e.g. PK-SC-2024-0102"
                    className="w-full bg-[#111C3A] border border-slate-700 rounded-lg px-3 py-2 text-xs font-mono text-white focus:outline-none focus:border-[#C5A85C] disabled:opacity-50"
                  />
                  <span className="text-[10px] text-slate-500 mt-1 block">
                    Format: PK-[COURT]-[YEAR]-[SEQ]. Cannot mutate once published.
                  </span>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1 font-urdu-ui">
                    Court Docket / Petition Reference <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    value={caseDraft.caseNumber}
                    onChange={(e) => setCaseDraft({ ...caseDraft, caseNumber: e.target.value })}
                    placeholder="e.g. Const. P. 102/2024"
                    className="w-full bg-[#111C3A] border border-slate-700 rounded-lg px-3 py-2 text-xs font-mono text-white focus:outline-none focus:border-[#C5A85C]"
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-xs font-medium text-slate-300 font-urdu-ui">
                      URL Slug <span className="text-red-400">*</span>
                    </label>
                    <button
                      type="button"
                      onClick={handleGenerateSlug}
                      className="text-[10px] text-[#C5A85C] hover:underline"
                    >
                      Auto-generate
                    </button>
                  </div>
                  <input
                    type="text"
                    value={caseDraft.slug}
                    onChange={(e) => setCaseDraft({ ...caseDraft, slug: e.target.value.trim() })}
                    placeholder="e.g. constitution-petition-digital-freedom"
                    className="w-full bg-[#111C3A] border border-slate-700 rounded-lg px-3 py-2 text-xs font-mono text-white focus:outline-none focus:border-[#C5A85C]"
                  />
                </div>
              </div>

              {/* Bilingual Titles */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1 font-urdu-ui">
                    Title (English) <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    value={caseDraft.title.en}
                    onChange={(e) => setCaseDraft({ ...caseDraft, title: { ...caseDraft.title, en: e.target.value } })}
                    placeholder="e.g. Challenge to Section 20 PECA Investigative Directives"
                    className="w-full bg-[#111C3A] border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#C5A85C]"
                  />
                </div>

                <div dir="rtl">
                  <label className="block text-xs font-medium text-slate-300 mb-1 font-urdu-ui">
                    عنوان (اردو) <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    value={caseDraft.title.ur}
                    onChange={(e) => setCaseDraft({ ...caseDraft, title: { ...caseDraft.title, ur: e.target.value } })}
                    placeholder="مثال: پیکا ایکٹ کی دفعہ 20 کے تحت صحافیوں کو بلا جواز طلبی کے خلاف درخواست"
                    className="w-full bg-[#111C3A] border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#C5A85C] font-urdu-ui text-right"
                  />
                </div>
              </div>
            </div>

            {/* Section B: Bilingual Summary & Background */}
            <div className="bg-[#0E1738] border border-slate-800 rounded-xl p-6 space-y-4">
              <h3 className="text-sm font-bold text-[#E0C57A] uppercase tracking-wider font-urdu-ui">
                2. Summary & Factual Background (Bilingual)
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1 font-urdu-ui">
                    Concise Summary (English) <span className="text-red-400">*</span>
                  </label>
                  <textarea
                    rows={3}
                    value={caseDraft.summary.en}
                    onChange={(e) => setCaseDraft({ ...caseDraft, summary: { ...caseDraft.summary, en: e.target.value } })}
                    className="w-full bg-[#111C3A] border border-slate-700 rounded-lg p-3 text-xs text-white focus:outline-none focus:border-[#C5A85C]"
                  />
                </div>

                <div dir="rtl">
                  <label className="block text-xs font-medium text-slate-300 mb-1 font-urdu-ui">
                    مختصر خلاصہ (اردو) <span className="text-red-400">*</span>
                  </label>
                  <textarea
                    rows={3}
                    value={caseDraft.summary.ur}
                    onChange={(e) => setCaseDraft({ ...caseDraft, summary: { ...caseDraft.summary, ur: e.target.value } })}
                    className="w-full bg-[#111C3A] border border-slate-700 rounded-lg p-3 text-xs text-white focus:outline-none focus:border-[#C5A85C] font-urdu-ui text-right"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1 font-urdu-ui">
                    Factual & Procedural Background (English) <span className="text-red-400">*</span>
                  </label>
                  <textarea
                    rows={4}
                    value={caseDraft.factualBackground.en}
                    onChange={(e) =>
                      setCaseDraft({
                        ...caseDraft,
                        factualBackground: { ...caseDraft.factualBackground, en: e.target.value },
                      })
                    }
                    className="w-full bg-[#111C3A] border border-slate-700 rounded-lg p-3 text-xs text-white focus:outline-none focus:border-[#C5A85C]"
                  />
                </div>

                <div dir="rtl">
                  <label className="block text-xs font-medium text-slate-300 mb-1 font-urdu-ui">
                    پس منظر و مقدمے کے تفصیلی حقائق (اردو) <span className="text-red-400">*</span>
                  </label>
                  <textarea
                    rows={4}
                    value={caseDraft.factualBackground.ur}
                    onChange={(e) =>
                      setCaseDraft({
                        ...caseDraft,
                        factualBackground: { ...caseDraft.factualBackground, ur: e.target.value },
                      })
                    }
                    className="w-full bg-[#111C3A] border border-slate-700 rounded-lg p-3 text-xs text-white focus:outline-none focus:border-[#C5A85C] font-urdu-ui text-right"
                  />
                </div>
              </div>
            </div>

            {/* Section C: Judicial Forum, Jurisdiction & Status */}
            <div className="bg-[#0E1738] border border-slate-800 rounded-xl p-6 space-y-4">
              <h3 className="text-sm font-bold text-[#E0C57A] uppercase tracking-wider font-urdu-ui">
                3. Forum, Procedural Status & Legal Classification
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1 font-urdu-ui">
                    Procedural Status (Strict 10-State Enum) <span className="text-red-400">*</span>
                  </label>
                  <select
                    value={caseDraft.proceduralStatus}
                    onChange={(e) =>
                      setCaseDraft({ ...caseDraft, proceduralStatus: e.target.value as ProceduralStatus })
                    }
                    className="w-full bg-[#111C3A] border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#C5A85C] font-urdu-ui"
                  >
                    {Object.keys(t.statuses).map((st) => (
                      <option key={st} value={st}>
                        {t.statuses[st as ProceduralStatus].en} ({t.statuses[st as ProceduralStatus].ur})
                      </option>
                    ))}
                  </select>
                  <div className="mt-1 text-[11px] text-amber-300 font-urdu-ui">
                    {caseDraft.proceduralStatus === 'bail_granted' &&
                      'Important: Bail under Sec 497/498 CrPC is interim relief, NEVER an acquittal.'}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1 font-urdu-ui">
                    Court Level <span className="text-red-400">*</span>
                  </label>
                  <select
                    value={caseDraft.courtLevel || 'high_court'}
                    onChange={(e) => setCaseDraft({ ...caseDraft, courtLevel: e.target.value as CourtLevel })}
                    className="w-full bg-[#111C3A] border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#C5A85C] font-urdu-ui"
                  >
                    <option value="supreme_court">Supreme Court</option>
                    <option value="high_court">High Court</option>
                    <option value="district_sessions">District & Sessions Court</option>
                    <option value="special_tribunal">Special Tribunal / Anti-Corruption</option>
                    <option value="magistrate_court">Judicial Magistrate Court</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1 font-urdu-ui">
                    Province / Territorial Jurisdiction <span className="text-red-400">*</span>
                  </label>
                  <select
                    value={caseDraft.location.province}
                    onChange={(e) =>
                      setCaseDraft({
                        ...caseDraft,
                        location: { ...caseDraft.location, province: e.target.value as Province },
                      })
                    }
                    className="w-full bg-[#111C3A] border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#C5A85C] font-urdu-ui"
                  >
                    {Object.keys(t.provinces).map((prov) => (
                      <option key={prov} value={prov}>
                        {t.provinces[prov as Province][lang]}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Categories Checklist */}
              <div className="pt-2">
                <label className="block text-xs font-medium text-slate-300 mb-2 font-urdu-ui">
                  Archive Legal Categories <span className="text-red-400">*</span> (Select applicable)
                </label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs">
                  {Object.keys(t.categories).map((catKey) => {
                    const isSelected = caseDraft.categories.includes(catKey as ArchiveCategory);
                    return (
                      <label
                        key={catKey}
                        className={`flex items-center gap-2 p-2 rounded border cursor-pointer transition-colors ${
                          isSelected
                            ? 'bg-[#172346] border-[#C5A85C] text-white'
                            : 'bg-[#111C3A] border-slate-800 text-slate-400 hover:text-slate-200'
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setCaseDraft({
                                ...caseDraft,
                                categories: [...caseDraft.categories, catKey as ArchiveCategory],
                              });
                            } else {
                              setCaseDraft({
                                ...caseDraft,
                                categories: caseDraft.categories.filter((c) => c !== catKey),
                              });
                            }
                          }}
                          className="rounded text-[#C5A85C] focus:ring-0"
                        />
                        <span className="font-urdu-ui truncate">
                          {t.categories[catKey as ArchiveCategory][lang]}
                        </span>
                      </label>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Section D: Parties & Privacy Protection */}
            <div className="bg-[#0E1738] border border-slate-800 rounded-xl p-6 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-[#E0C57A] uppercase tracking-wider font-urdu-ui">
                    4. Parties to Proceedings & Mandatory Redaction Policy
                  </h3>
                  <p className="text-[11px] text-slate-400 font-urdu-ui">
                    Juvenile Justice System Act 2018 requires mandatory redaction for minors & victims of gender crimes.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    const newParty: Party = {
                      id: `pty-${Date.now().toString().slice(-4)}`,
                      name: { en: 'Party Name', ur: 'فریق کا نام' },
                      role: 'respondent',
                      isProtectedOrMinor: false,
                      redacted: false,
                    };
                    setCaseDraft({ ...caseDraft, parties: [...caseDraft.parties, newParty] });
                  }}
                  className="px-2.5 py-1 bg-[#172346] hover:bg-[#1D2F5F] text-[#E0C57A] border border-[#C5A85C]/30 rounded text-xs inline-flex items-center gap-1 font-urdu-ui"
                >
                  <Plus size={12} />
                  <span>Add Party</span>
                </button>
              </div>

              <div className="space-y-3">
                {caseDraft.parties.map((p, pIdx) => (
                  <div key={p.id || pIdx} className="p-3.5 bg-[#111C3A] rounded-lg border border-slate-800 space-y-2">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                      <div>
                        <label className="text-[10px] text-slate-400 block mb-1 font-urdu-ui">Name (English)</label>
                        <input
                          type="text"
                          value={p.name.en}
                          onChange={(e) => {
                            const updated = [...caseDraft.parties];
                            updated[pIdx].name.en = e.target.value;
                            setCaseDraft({ ...caseDraft, parties: updated });
                          }}
                          className="w-full bg-[#0B132B] border border-slate-700 rounded px-2.5 py-1.5 text-xs text-white"
                        />
                      </div>

                      <div dir="rtl">
                        <label className="text-[10px] text-slate-400 block mb-1 font-urdu-ui">نام (اردو)</label>
                        <input
                          type="text"
                          value={p.name.ur}
                          onChange={(e) => {
                            const updated = [...caseDraft.parties];
                            updated[pIdx].name.ur = e.target.value;
                            setCaseDraft({ ...caseDraft, parties: updated });
                          }}
                          className="w-full bg-[#0B132B] border border-slate-700 rounded px-2.5 py-1.5 text-xs text-white font-urdu-ui text-right"
                        />
                      </div>

                      <div>
                        <label className="text-[10px] text-slate-400 block mb-1 font-urdu-ui">Role</label>
                        <select
                          value={p.role}
                          onChange={(e) => {
                            const updated = [...caseDraft.parties];
                            updated[pIdx].role = e.target.value as any;
                            setCaseDraft({ ...caseDraft, parties: updated });
                          }}
                          className="w-full bg-[#0B132B] border border-slate-700 rounded px-2.5 py-1.5 text-xs text-white"
                        >
                          <option value="petitioner">Petitioner / Appellant</option>
                          <option value="respondent">Respondent</option>
                          <option value="accused">Accused</option>
                          <option value="complainant">Complainant</option>
                          <option value="state">State / Prosecution</option>
                          <option value="victim">Victim</option>
                          <option value="witness">Witness</option>
                          <option value="amicus_curiae">Amicus Curiae</option>
                        </select>
                      </div>

                      <div className="flex items-center justify-between pt-4">
                        <div className="flex items-center gap-3">
                          <label className="flex items-center gap-1.5 text-[11px] text-amber-300 cursor-pointer font-urdu-ui">
                            <input
                              type="checkbox"
                              checked={Boolean(p.isProtectedOrMinor)}
                              onChange={(e) => {
                                const updated = [...caseDraft.parties];
                                updated[pIdx].isProtectedOrMinor = e.target.checked;
                                if (e.target.checked) updated[pIdx].redacted = true;
                                setCaseDraft({ ...caseDraft, parties: updated });
                              }}
                              className="rounded text-amber-400"
                            />
                            <span>Minor / Protected</span>
                          </label>

                          <label className="flex items-center gap-1.5 text-[11px] text-slate-300 cursor-pointer font-urdu-ui">
                            <input
                              type="checkbox"
                              checked={Boolean(p.redacted)}
                              onChange={(e) => {
                                const updated = [...caseDraft.parties];
                                updated[pIdx].redacted = e.target.checked;
                                setCaseDraft({ ...caseDraft, parties: updated });
                              }}
                              className="rounded text-[#C5A85C]"
                            />
                            <span>Redacted</span>
                          </label>
                        </div>

                        {caseDraft.parties.length > 1 && (
                          <button
                            type="button"
                            onClick={() => {
                              const updated = caseDraft.parties.filter((_, i) => i !== pIdx);
                              setCaseDraft({ ...caseDraft, parties: updated });
                            }}
                            className="text-red-400 hover:text-red-300 p-1"
                            title="Remove party"
                          >
                            <Trash2 size={13} />
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Section E: Evidentiary Items (Tripartite / 4-Tier) */}
            <div className="bg-[#0E1738] border border-slate-800 rounded-xl p-6 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-[#E0C57A] uppercase tracking-wider font-urdu-ui">
                    5. Evidentiary Items & Claim Classification
                  </h3>
                  <p className="text-[11px] text-slate-400 font-urdu-ui">
                    Classify claims under 4-tier evidentiary doctrine: Allegation vs Party Statement vs Official Record vs Judicial Finding.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    const newEv: EvidentiaryItem = {
                      id: `ev-${Date.now().toString().slice(-4)}`,
                      claimOrFact: { en: 'Descriptive evidentiary statement', ur: 'شواہد کا دستاویزی بیان' },
                      nature: 'official_record',
                      sourceName: { en: 'Certified Court Record', ur: 'مصدقہ عدالتی ریکارڈ' },
                      date: new Date().toISOString().split('T')[0],
                      verifiedByCourt: true,
                    };
                    setCaseDraft({ ...caseDraft, evidenceItems: [...caseDraft.evidenceItems, newEv] });
                  }}
                  className="px-2.5 py-1 bg-[#172346] hover:bg-[#1D2F5F] text-[#E0C57A] border border-[#C5A85C]/30 rounded text-xs inline-flex items-center gap-1 font-urdu-ui"
                >
                  <Plus size={12} />
                  <span>Add Evidence Item</span>
                </button>
              </div>

              <div className="space-y-3">
                {caseDraft.evidenceItems.map((ev, evIdx) => (
                  <div key={ev.id || evIdx} className="p-3.5 bg-[#111C3A] rounded-lg border border-slate-800 space-y-2">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                      <div className="md:col-span-2">
                        <label className="text-[10px] text-slate-400 block mb-1 font-urdu-ui">
                          Claim or Verified Fact (English)
                        </label>
                        <input
                          type="text"
                          value={ev.claimOrFact.en}
                          onChange={(e) => {
                            const updated = [...caseDraft.evidenceItems];
                            updated[evIdx].claimOrFact.en = e.target.value;
                            setCaseDraft({ ...caseDraft, evidenceItems: updated });
                          }}
                          className="w-full bg-[#0B132B] border border-slate-700 rounded px-2.5 py-1.5 text-xs text-white"
                        />
                      </div>

                      <div className="md:col-span-2" dir="rtl">
                        <label className="text-[10px] text-slate-400 block mb-1 font-urdu-ui">
                          دعویٰ یا مصدقہ حقیقت (اردو)
                        </label>
                        <input
                          type="text"
                          value={ev.claimOrFact.ur}
                          onChange={(e) => {
                            const updated = [...caseDraft.evidenceItems];
                            updated[evIdx].claimOrFact.ur = e.target.value;
                            setCaseDraft({ ...caseDraft, evidenceItems: updated });
                          }}
                          className="w-full bg-[#0B132B] border border-slate-700 rounded px-2.5 py-1.5 text-xs text-white font-urdu-ui text-right"
                        />
                      </div>

                      <div>
                        <label className="text-[10px] text-slate-400 block mb-1 font-urdu-ui">Evidentiary Nature</label>
                        <select
                          value={ev.nature}
                          onChange={(e) => {
                            const updated = [...caseDraft.evidenceItems];
                            updated[evIdx].nature = e.target.value as EvidentiaryNature;
                            setCaseDraft({ ...caseDraft, evidenceItems: updated });
                          }}
                          className="w-full bg-[#0B132B] border border-slate-700 rounded px-2.5 py-1.5 text-xs text-white"
                        >
                          <option value="allegation">Unproven Allegation (FIR/Prosecution)</option>
                          <option value="party_statement">Party / Defense Statement Under Oath</option>
                          <option value="official_record">Certified Official Procedural Record</option>
                          <option value="court_finding">Signed Court Finding / Judicial Ruling</option>
                        </select>
                      </div>

                      <div>
                        <label className="text-[10px] text-slate-400 block mb-1 font-urdu-ui">Source Provenance</label>
                        <input
                          type="text"
                          value={ev.sourceName.en}
                          onChange={(e) => {
                            const updated = [...caseDraft.evidenceItems];
                            updated[evIdx].sourceName.en = e.target.value;
                            setCaseDraft({ ...caseDraft, evidenceItems: updated });
                          }}
                          placeholder="e.g. Police Challan / High Court Order"
                          className="w-full bg-[#0B132B] border border-slate-700 rounded px-2.5 py-1.5 text-xs text-white"
                        />
                      </div>

                      <div className="flex items-center justify-between pt-4 md:col-span-2">
                        <label className="flex items-center gap-1.5 text-[11px] text-emerald-300 cursor-pointer font-urdu-ui">
                          <input
                            type="checkbox"
                            checked={Boolean(ev.verifiedByCourt)}
                            onChange={(e) => {
                              const updated = [...caseDraft.evidenceItems];
                              updated[evIdx].verifiedByCourt = e.target.checked;
                              setCaseDraft({ ...caseDraft, evidenceItems: updated });
                            }}
                            className="rounded text-emerald-500"
                          />
                          <span>Verified by Court Order / Decree</span>
                        </label>

                        {caseDraft.evidenceItems.length > 1 && (
                          <button
                            type="button"
                            onClick={() => {
                              const updated = caseDraft.evidenceItems.filter((_, i) => i !== evIdx);
                              setCaseDraft({ ...caseDraft, evidenceItems: updated });
                            }}
                            className="text-red-400 hover:text-red-300 p-1"
                            title="Remove evidence"
                          >
                            <Trash2 size={13} />
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Form Footer Action Controls */}
            <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-xl bg-[#111C3A] border border-slate-800">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleSaveCaseDraft}
                  className="px-4 py-2 bg-[#C5A85C] hover:bg-[#E0C57A] text-[#0B132B] font-bold text-xs rounded transition-colors font-urdu-ui shadow-sm"
                >
                  {adminT.actions.saveDraft[lang]}
                </button>
                <button
                  type="button"
                  onClick={() => setPreviewCase(caseDraft)}
                  className="px-4 py-2 bg-[#172346] hover:bg-slate-700 text-slate-200 border border-slate-700 rounded text-xs font-semibold font-urdu-ui"
                >
                  {adminT.actions.previewCase[lang]}
                </button>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setActiveTab('review')}
                  className="px-4 py-2 bg-[#172346] hover:bg-[#1F3369] text-[#E0C57A] border border-[#C5A85C]/40 rounded text-xs font-semibold font-urdu-ui inline-flex items-center gap-1.5"
                >
                  <GitPullRequest size={14} />
                  <span>{adminT.actions.reviewDiff[lang]}</span>
                </button>
                <button
                  type="button"
                  onClick={handleClearCaseDraft}
                  className="px-3 py-2 text-slate-400 hover:text-red-400 text-xs font-urdu-ui"
                >
                  {adminT.actions.clearDraft[lang]}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* TAB 4: MEDIA & EVIDENCE MANAGEMENT                             */}
      {/* ============================================================== */}
      {activeTab === 'media' && (
        <div className="space-y-6 animate-fadeIn">
          {/* Media Header & Filter */}
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
            <div className="relative flex-1 max-w-md">
              <Search size={15} className="absolute left-3 rtl:left-auto rtl:right-3 top-3 text-slate-400" />
              <input
                type="text"
                value={mediaSearch}
                onChange={(e) => setMediaSearch(e.target.value)}
                placeholder={lang === 'en' ? 'Search media by title or publisher...' : 'میڈیا عنوان یا ناشر سے تلاش کریں...'}
                className="w-full bg-[#111C3A] border border-slate-700 rounded-lg pl-9 rtl:pl-3 rtl:pr-9 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#C5A85C]"
              />
            </div>

            <div className="flex items-center gap-2">
              <select
                value={mediaTypeFilter}
                onChange={(e) => setMediaTypeFilter(e.target.value)}
                aria-label="Filter by Media Type"
                className="bg-[#111C3A] border border-slate-700 rounded-lg px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-[#C5A85C] font-urdu-ui"
              >
                <option value="all">All Media Types</option>
                <option value="youtube_video">YouTube Video</option>
                <option value="document">Court Document</option>
                <option value="image">Archival Photograph</option>
                <option value="external_source">Forensic / External Source</option>
              </select>

              <button
                onClick={() => {
                  setMediaDraft({
                    ...DEFAULT_NEW_MEDIA,
                    id: `MED-${Date.now().toString().slice(-6)}`,
                    associatedCaseIds: cases.length > 0 ? [cases[0].id] : [],
                  });
                  setIsEditingExistingMedia(false);
                }}
                className="px-3.5 py-2 bg-[#C5A85C] hover:bg-[#E0C57A] text-[#0B132B] font-bold text-xs rounded-lg transition-colors font-urdu-ui inline-flex items-center gap-1.5"
              >
                <Plus size={14} />
                <span>{adminT.actions.addMedia[lang]}</span>
              </button>
            </div>
          </div>

          {/* Media Catalog Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredMediaCatalog.map((m) => (
              <div
                key={m.id}
                className="p-4 rounded-xl bg-[#0E1738] border border-slate-800 hover:border-slate-700 space-y-3 transition-colors flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="font-mono text-[#E0C57A] font-bold">{m.id}</span>
                    <span className="bg-[#172346] text-slate-300 px-2 py-0.5 rounded capitalize">
                      {m.mediaType.replace('_', ' ')}
                    </span>
                  </div>

                  <h4 className="text-sm font-semibold text-white font-urdu-ui line-clamp-2">
                    {m.title[lang]}
                  </h4>

                  <p className="text-xs text-slate-400 font-urdu-ui line-clamp-2">
                    {m.description?.[lang]}
                  </p>
                </div>

                <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
                  <div className="flex items-center gap-1 font-mono text-[10px]">
                    <span>Linked: {m.associatedCaseIds.join(', ')}</span>
                  </div>

                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => {
                        setMediaDraft(JSON.parse(JSON.stringify(m)));
                        setIsEditingExistingMedia(true);
                        setNotification(lang === 'en' ? `Loaded ${m.id} into Media Editor.` : `${m.id} ایڈیٹر میں کھولا گیا۔`);
                      }}
                      className="p-1 rounded hover:bg-slate-800 text-slate-300 hover:text-white"
                      title="Edit Media"
                    >
                      <Edit size={14} />
                    </button>
                    <button
                      onClick={() => handleDownloadJson(m, `${m.id}.json`)}
                      className="p-1 rounded hover:bg-slate-800 text-slate-300 hover:text-white"
                      title="Download JSON"
                    >
                      <Download size={14} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Quick Media Editor Form Drawer / Panel */}
          {mediaDraft.id && (
            <div className="bg-[#111C3A] border border-[#C5A85C]/30 rounded-xl p-6 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Video size={18} className="text-[#C5A85C]" />
                  <h3 className="text-sm font-bold text-white font-urdu-ui">
                    Media Item Editor: <span className="font-mono text-[#E0C57A]">{mediaDraft.id}</span>
                  </h3>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleSaveMediaDraft}
                    className="px-3 py-1 bg-[#C5A85C] text-[#0B132B] font-bold text-xs rounded font-urdu-ui"
                  >
                    Save Media Draft
                  </button>
                  <button
                    onClick={handleClearMediaDraft}
                    className="px-2 py-1 text-slate-400 hover:text-white text-xs font-urdu-ui"
                  >
                    Close
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                <div>
                  <label className="block text-slate-300 mb-1 font-urdu-ui">Media Type</label>
                  <select
                    value={mediaDraft.mediaType}
                    onChange={(e) => setMediaDraft({ ...mediaDraft, mediaType: e.target.value as MediaType })}
                    className="w-full bg-[#0B132B] border border-slate-700 rounded px-2.5 py-1.5 text-white"
                  >
                    <option value="youtube_video">YouTube Video</option>
                    <option value="document">Court Document</option>
                    <option value="image">Archival Image</option>
                    <option value="external_source">External Institutional Source</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-300 mb-1 font-urdu-ui">Associated Case ID</label>
                  <select
                    value={mediaDraft.associatedCaseIds[0] || ''}
                    onChange={(e) => setMediaDraft({ ...mediaDraft, associatedCaseIds: [e.target.value] })}
                    className="w-full bg-[#0B132B] border border-slate-700 rounded px-2.5 py-1.5 text-white font-mono"
                  >
                    {cases.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.id} — {c.caseNumber}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-slate-300 mb-1 font-urdu-ui">Original Source URL</label>
                  <input
                    type="text"
                    value={mediaDraft.sourceUrl}
                    onChange={(e) => setMediaDraft({ ...mediaDraft, sourceUrl: e.target.value })}
                    placeholder="https://... or ./assets/images/..."
                    className="w-full bg-[#0B132B] border border-slate-700 rounded px-2.5 py-1.5 text-white font-mono"
                  />
                </div>

                <div className="md:col-span-3 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-300 mb-1 font-urdu-ui">Title (English)</label>
                    <input
                      type="text"
                      value={mediaDraft.title.en}
                      onChange={(e) =>
                        setMediaDraft({ ...mediaDraft, title: { ...mediaDraft.title, en: e.target.value } })
                      }
                      className="w-full bg-[#0B132B] border border-slate-700 rounded px-2.5 py-1.5 text-white"
                    />
                  </div>
                  <div dir="rtl">
                    <label className="block text-slate-300 mb-1 font-urdu-ui">عنوان (اردو)</label>
                    <input
                      type="text"
                      value={mediaDraft.title.ur}
                      onChange={(e) =>
                        setMediaDraft({ ...mediaDraft, title: { ...mediaDraft.title, ur: e.target.value } })
                      }
                      className="w-full bg-[#0B132B] border border-slate-700 rounded px-2.5 py-1.5 text-white font-urdu-ui text-right"
                    />
                  </div>
                </div>

                {mediaDraft.mediaType === 'youtube_video' && (
                  <div className="md:col-span-3 grid grid-cols-1 md:grid-cols-2 gap-4 bg-[#0B132B] p-3 rounded-lg border border-slate-800">
                    <div>
                      <label className="block text-slate-300 mb-1 font-urdu-ui">YouTube Video ID (11 chars)</label>
                      <input
                        type="text"
                        value={mediaDraft.videoMetadata?.youtubeId || ''}
                        onChange={(e) =>
                          setMediaDraft({
                            ...mediaDraft,
                            videoMetadata: {
                              ...mediaDraft.videoMetadata,
                              youtubeId: e.target.value.trim(),
                              privacyEnhancedEmbedUrl: `https://www.youtube-nocookie.com/embed/${e.target.value.trim()}`,
                            },
                          })
                        }
                        placeholder="dQw4w9WgXcQ"
                        className="w-full bg-[#111C3A] border border-slate-700 rounded px-2.5 py-1.5 text-white font-mono"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-300 mb-1 font-urdu-ui">Video Duration (e.g. 42:15)</label>
                      <input
                        type="text"
                        value={mediaDraft.videoMetadata?.duration || ''}
                        onChange={(e) =>
                          setMediaDraft({
                            ...mediaDraft,
                            videoMetadata: {
                              ...mediaDraft.videoMetadata,
                              duration: e.target.value,
                              youtubeId: mediaDraft.videoMetadata?.youtubeId || '',
                            },
                          })
                        }
                        placeholder="42:15"
                        className="w-full bg-[#111C3A] border border-slate-700 rounded px-2.5 py-1.5 text-white font-mono"
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      )}

      {/* ============================================================== */}
      {/* TAB 5: REVIEW, DIFF & GITHUB STAGING                           */}
      {/* ============================================================== */}
      {activeTab === 'review' && (
        <div className="space-y-6 animate-fadeIn">
          {/* Comparison / Diff Card */}
          <div className="bg-[#0E1738] border border-slate-800 rounded-xl p-6 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
              <div>
                <h3 className="text-base font-bold text-white font-urdu-ui flex items-center gap-2">
                  <GitPullRequest size={18} className="text-[#C5A85C]" />
                  <span>
                    {isEditingExistingCase
                      ? `Proposed Changes Review: ${caseDraft.id}`
                      : `New Case Staging Review: ${caseDraft.id}`}
                  </span>
                </h3>
                <p className="text-xs text-slate-400 font-urdu-ui mt-0.5">
                  Verify field diffs against the published dataset before exporting or creating a Pull Request.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setPreviewCase(caseDraft)}
                  className="px-3.5 py-2 bg-[#172346] hover:bg-slate-700 text-slate-200 border border-slate-700 rounded-lg text-xs font-semibold font-urdu-ui inline-flex items-center gap-1.5"
                >
                  <Eye size={13} />
                  <span>Preview Live Page</span>
                </button>
                <button
                  onClick={() => handleDownloadJson(caseDraft, `${caseDraft.id}-proposed.json`)}
                  className="px-3.5 py-2 bg-[#C5A85C] hover:bg-[#E0C57A] text-[#0B132B] font-bold text-xs rounded-lg transition-colors font-urdu-ui inline-flex items-center gap-1.5 shadow-sm"
                >
                  <Download size={13} />
                  <span>{adminT.actions.exportJson[lang]}</span>
                </button>
              </div>
            </div>

            {/* Validation Invariant Check in Review */}
            <div className="p-4 rounded-lg bg-[#111C3A] border border-slate-800 flex items-center justify-between text-xs">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-full ${caseValidation.errors.length === 0 ? 'bg-emerald-950 text-emerald-400' : 'bg-red-950 text-red-400'}`}>
                  {caseValidation.errors.length === 0 ? <Check size={16} /> : <AlertTriangle size={16} />}
                </div>
                <div>
                  <div className="font-bold text-white font-urdu-ui">
                    {caseValidation.errors.length === 0
                      ? 'Automated Schema Invariants Passed (38/38 Compliant)'
                      : `Validation Found ${caseValidation.errors.length} Required Field Discrepancies`}
                  </div>
                  <div className="text-[11px] text-slate-400 font-urdu-ui">
                    {caseValidation.errors.length === 0
                      ? 'Record satisfies all unique ID, bilingual completeness, and privacy redaction rules.'
                      : caseValidation.errors.join('; ')}
                  </div>
                </div>
              </div>
            </div>

            {/* Field Diff Breakdown */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-[#E0C57A] uppercase tracking-wider font-urdu-ui">
                Field Inspection & Comparison
              </h4>

              <div className="border border-slate-800 rounded-lg overflow-hidden text-xs">
                <table className="w-full text-left rtl:text-right">
                  <thead className="bg-[#111C3A] text-slate-400 border-b border-slate-800 font-urdu-ui">
                    <tr>
                      <th className="py-2.5 px-4 w-1/4">Field</th>
                      <th className="py-2.5 px-4 w-3/8">Current Published Value</th>
                      <th className="py-2.5 px-4 w-3/8">Proposed Draft Value</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800 font-mono text-[11px]">
                    <tr>
                      <td className="py-2.5 px-4 font-bold text-slate-300">Docket / Case #</td>
                      <td className="py-2.5 px-4 text-slate-400">
                        {editingOriginalCase ? editingOriginalCase.caseNumber : '— (New Record)'}
                      </td>
                      <td className="py-2.5 px-4 text-emerald-300 font-bold">{caseDraft.caseNumber}</td>
                    </tr>
                    <tr>
                      <td className="py-2.5 px-4 font-bold text-slate-300">Procedural Status</td>
                      <td className="py-2.5 px-4 text-slate-400">
                        {editingOriginalCase ? editingOriginalCase.proceduralStatus : '—'}
                      </td>
                      <td className="py-2.5 px-4 text-emerald-300 font-bold">{caseDraft.proceduralStatus}</td>
                    </tr>
                    <tr>
                      <td className="py-2.5 px-4 font-bold text-slate-300">Title (English)</td>
                      <td className="py-2.5 px-4 text-slate-400 font-sans">
                        {editingOriginalCase ? editingOriginalCase.title.en : '—'}
                      </td>
                      <td className="py-2.5 px-4 text-emerald-300 font-sans font-medium">{caseDraft.title.en}</td>
                    </tr>
                    <tr>
                      <td className="py-2.5 px-4 font-bold text-slate-300">Title (Urdu)</td>
                      <td className="py-2.5 px-4 text-slate-400 font-urdu-ui">
                        {editingOriginalCase ? editingOriginalCase.title.ur : '—'}
                      </td>
                      <td className="py-2.5 px-4 text-emerald-300 font-urdu-ui">{caseDraft.title.ur}</td>
                    </tr>
                    <tr>
                      <td className="py-2.5 px-4 font-bold text-slate-300">Parties Count</td>
                      <td className="py-2.5 px-4 text-slate-400">
                        {editingOriginalCase ? `${editingOriginalCase.parties.length} parties` : '—'}
                      </td>
                      <td className="py-2.5 px-4 text-emerald-300 font-bold">{caseDraft.parties.length} parties</td>
                    </tr>
                    <tr>
                      <td className="py-2.5 px-4 font-bold text-slate-300">Evidence Items</td>
                      <td className="py-2.5 px-4 text-slate-400">
                        {editingOriginalCase ? `${editingOriginalCase.evidenceItems.length} items` : '—'}
                      </td>
                      <td className="py-2.5 px-4 text-emerald-300 font-bold">{caseDraft.evidenceItems.length} items</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Generated GitHub PR Markdown */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#E0C57A] uppercase tracking-wider font-urdu-ui">
                  Generated GitHub Pull Request Markdown
                </span>
                <button
                  onClick={() => handleCopyText(generatePrMarkdown(), 'prMarkdown')}
                  className="px-2.5 py-1 rounded bg-[#172346] hover:bg-[#1F3369] text-slate-200 text-xs inline-flex items-center gap-1 font-urdu-ui"
                >
                  {copiedState === 'prMarkdown' ? <Check size={12} className="text-emerald-400" /> : <Copy size={12} />}
                  <span>{copiedState === 'prMarkdown' ? 'Copied Markdown!' : adminT.actions.copyMarkdown[lang]}</span>
                </button>
              </div>
              <pre className="p-4 bg-[#0B132B] rounded-lg border border-slate-800 text-[11px] font-mono text-slate-300 max-h-56 overflow-y-auto whitespace-pre-wrap select-all">
                {generatePrMarkdown()}
              </pre>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* TAB 6: DATA EXPORT & REPOSITORY SYNC MANIFEST                  */}
      {/* ============================================================== */}
      {activeTab === 'export' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Export Current Working Draft */}
            <div className="p-6 rounded-xl bg-[#0E1738] border border-slate-800 space-y-4">
              <div className="flex items-center gap-2">
                <Download size={20} className="text-[#C5A85C]" />
                <h3 className="text-sm font-bold text-white font-urdu-ui">Export Working Case Dossier</h3>
              </div>
              <p className="text-xs text-slate-300 font-urdu-ui leading-relaxed">
                Download the verified JSON file for <span className="font-mono text-[#E0C57A]">{caseDraft.id || 'Current Draft'}</span>.
                Commit this file into <code className="text-[#E0C57A]">src/data/cases/</code> to add it to the Git repository.
              </p>

              <div className="flex flex-wrap items-center gap-2 pt-2">
                <button
                  onClick={() => handleDownloadJson(caseDraft, `${caseDraft.id || 'case-draft'}.json`)}
                  className="px-4 py-2 bg-[#C5A85C] hover:bg-[#E0C57A] text-[#0B132B] font-bold text-xs rounded transition-colors font-urdu-ui inline-flex items-center gap-1.5"
                >
                  <Download size={14} />
                  <span>Download Case JSON</span>
                </button>
                <button
                  onClick={() => handleCopyText(JSON.stringify(caseDraft, null, 2), 'caseJson')}
                  className="px-3.5 py-2 bg-[#111C3A] hover:bg-[#18254B] text-slate-200 border border-slate-700 rounded text-xs font-urdu-ui inline-flex items-center gap-1.5"
                >
                  {copiedState === 'caseJson' ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                  <span>{copiedState === 'caseJson' ? 'Copied!' : 'Copy to Clipboard'}</span>
                </button>
              </div>
            </div>

            {/* Export Entire Archive Dataset */}
            <div className="p-6 rounded-xl bg-[#0E1738] border border-slate-800 space-y-4">
              <div className="flex items-center gap-2">
                <Database size={20} className="text-sky-400" />
                <h3 className="text-sm font-bold text-white font-urdu-ui">Complete Repository Manifest</h3>
              </div>
              <p className="text-xs text-slate-300 font-urdu-ui leading-relaxed">
                Export all {cases.length} case records and {allMediaRecords.length} media records in normalized public JSON format for research backup or offline archiving.
              </p>

              <div className="flex flex-wrap items-center gap-2 pt-2">
                <button
                  onClick={() => handleDownloadJson(cases, `insaf-archive-cases-all-${new Date().toISOString().split('T')[0]}.json`)}
                  className="px-4 py-2 bg-[#172346] hover:bg-[#1D2F5F] text-[#E0C57A] border border-[#C5A85C]/40 font-bold text-xs rounded transition-colors font-urdu-ui inline-flex items-center gap-1.5"
                >
                  <Download size={14} />
                  <span>Export All Cases ({cases.length})</span>
                </button>
                <button
                  onClick={() => handleDownloadJson(allMediaRecords, `insaf-archive-media-all-${new Date().toISOString().split('T')[0]}.json`)}
                  className="px-4 py-2 bg-[#172346] hover:bg-slate-700 text-slate-200 border border-slate-700 font-bold text-xs rounded transition-colors font-urdu-ui inline-flex items-center gap-1.5"
                >
                  <Download size={14} />
                  <span>Export All Media ({allMediaRecords.length})</span>
                </button>
              </div>
            </div>
          </div>

          {/* Git Publication Instructions Box */}
          <div className="p-5 rounded-xl bg-[#111C3A] border border-slate-800 space-y-3 text-xs text-slate-300 leading-relaxed font-urdu-ui">
            <h4 className="font-bold text-white text-sm flex items-center gap-2">
              <Info size={16} className="text-[#C5A85C]" />
              <span>How to Commit Staged Records to Production Git</span>
            </h4>
            <ol className="list-decimal list-inside space-y-1.5 text-slate-300">
              <li>Export your validated case JSON file using the download button above.</li>
              <li>
                Place the exported file or export its typescript module in{' '}
                <code className="text-[#E0C57A] font-mono">src/data/cases/case-[NUMBER]-[COURT]-[YEAR].ts</code>.
              </li>
              <li>
                Add the exported object into <code className="text-[#E0C57A] font-mono">allCaseRecords</code> in{' '}
                <code className="text-[#E0C57A] font-mono">src/data/cases/index.ts</code>.
              </li>
              <li>
                Run <code className="text-[#E0C57A] font-mono">npm test</code> to confirm all 38 automated schema invariants pass.
              </li>
              <li>Open a GitHub Pull Request into the <code className="text-[#E0C57A] font-mono">main</code> branch. Once merged, GitHub Actions automatically deploys the updated archive.</li>
            </ol>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* CASE PREVIEW MODAL                                             */}
      {/* ============================================================== */}
      {previewCase && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-xs"
          role="dialog"
          aria-modal="true"
          aria-labelledby="preview-modal-title"
        >
          <div
            className="w-full max-w-5xl bg-[#0B132B] border border-[#C5A85C]/50 rounded-xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-3.5 border-b border-slate-800 bg-[#111C3A]">
              <div className="flex items-center gap-2.5">
                <Eye size={18} className="text-[#C5A85C]" />
                <div>
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-urdu-ui">
                    Interactive Live Dossier Preview
                  </span>
                  <h3 id="preview-modal-title" className="text-sm sm:text-base font-bold text-white font-mono">
                    {previewCase.id} — {previewCase.caseNumber}
                  </h3>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setPreviewCase(null)}
                  className="px-3 py-1 bg-slate-800 hover:bg-slate-700 text-white rounded text-xs font-urdu-ui"
                >
                  Close Preview
                </button>
              </div>
            </div>

            {/* Modal Scrollable Body */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6">
              <CaseDetailView
                caseItem={previewCase}
                lang={lang}
                onBack={() => setPreviewCase(null)}
                onOpenDocument={() => {}}
                onRequestCorrection={() => {}}
                onSelectRelatedCase={() => {}}
                onNavigate={() => {}}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
