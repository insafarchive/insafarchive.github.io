/**
 * INSAF ARCHIVE (انصاف آرکائیو)
 * Static Editorial Workspace & Constitutional Mapping Studio
 */

import React, { useState } from 'react';
import { useArchive } from '../../context/ArchiveContext';
import type {
  ArchiveRecord,
  ArchiveDomain,
  RecordType,
  EvidentiaryFindingType,
  SourceType,
  EditorialStatus,
  EditorialAction,
  EditorialAuditTrailEntry,
  PrivacyClassification,
} from '../../types/archive';
import type {
  ConstitutionalMappingEntry,
  ConstitutionalRelationshipType,
  ConstitutionalAlertLevel,
  ConstitutionalReviewStatus,
} from '../../types/constitution';
import { ALL_ARCHIVE_RECORDS } from '../../data/records';
import { CONSTITUTION_ARTICLES } from '../../data/constitution';
import { ALL_ARCHIVAL_DOSSIERS, CLAIM_SOURCE_AUDIT_DATA } from '../../data/dossiers';
import { DOMAIN_REGISTRY, RECORD_TYPE_LABELS, FINDING_TYPE_CONFIG } from '../../data/taxonomy';
import { validateArchiveRecord } from '../../utils/schemaValidator';
import type { ValidationResult } from '../../utils/schemaValidator';
import {
  validatePublicationSafeguards,
  validateStatusTransition,
  createEditorialAuditEntry,
  checkLegalStatusFreshness,
} from '../../utils/editorialWorkflow';
import { AdminStudio } from './studio/AdminStudio';
import {
  FileSpreadsheet,
  Plus,
  Trash2,
  CheckCircle,
  AlertTriangle,
  Download,
  FileCode,
  Check,
  Eye,
  Edit3,
  Scale,
  Link as LinkIcon,
  ShieldAlert,
  ShieldCheck,
  AlertCircle,
  Clock,
  ArrowRight,
  FolderOpen,
} from 'lucide-react';

export const EditorialWorkspace: React.FC = () => {
  const { language, saveUserRecord } = useArchive();

  // Top Workspace Tab
  const [activeTab, setActiveTab] = useState<'admin_studio' | 'record_draft' | 'constitutional_mapping' | 'publication_approval'>('admin_studio');

  // =========================================================================
  // Publication Approval & Workflow State (Part 5.2)
  // =========================================================================
  const [selectedDossierId, setSelectedDossierId] = useState<string>(ALL_ARCHIVAL_DOSSIERS[0]?.id || '');
  const [workflowAction, setWorkflowAction] = useState<EditorialAction>('request_revision');
  const [workflowTargetStatus, setWorkflowTargetStatus] = useState<EditorialStatus>('revision_requested');
  const [workflowReviewerNote, setWorkflowReviewerNote] = useState<string>('');
  const [workflowChangeSummary, setWorkflowChangeSummary] = useState<string>('');
  const [workflowGitRef, setWorkflowGitRef] = useState<string>('');
  const [workflowActionResult, setWorkflowActionResult] = useState<{ isAllowed: boolean; message: string } | null>(null);
  const [copiedAuditPayload, setCopiedAuditPayload] = useState(false);

  const [auditTrail, setAuditTrail] = useState<EditorialAuditTrailEntry[]>([
    {
      auditId: 'audit-initial-mil-courts-stay',
      recordId: 'dos-pk-legal-military-courts-2023',
      previousStatus: 'published',
      newStatus: 'under_review',
      action: 'withdraw',
      reviewerNote: 'Downgraded to under_review: The 23 October 2023 short order in Const. Pet. 24/2023 was suspended on 13 December 2023 by a 6-member larger bench in ICA 558/2023 pending final appeal disposal.',
      changeSummary: 'Stay order in ICA 558/2023 added to chronology and court findings; status downgraded.',
      timestamp: '2024-02-15T12:00:00Z',
      gitReference: 'PR #42'
    },
    {
      auditId: 'audit-initial-muridke-backlog',
      recordId: 'dos-pk-event-muridke-tragedy-2021',
      previousStatus: 'under_review',
      newStatus: 'draft',
      action: 'request_revision',
      reviewerNote: 'Retained in draft research backlog: Primary ballistic and certified hospital post-mortem documents have not been published in the public domain.',
      changeSummary: 'Documented evidentiary research gap regarding protester casualty verification.',
      timestamp: '2024-04-10T14:30:00Z',
      gitReference: 'Issue #18'
    }
  ]);

  // =========================================================================
  // Active Record Draft State
  // =========================================================================
  const [recordId, setRecordId] = useState(() => `rec-pk-${Date.now().toString().slice(-6)}`);
  const [domain, setDomain] = useState<ArchiveDomain>('legal');
  const [recordType, setRecordType] = useState<RecordType>('court_case');
  const [titleEn, setTitleEn] = useState('');
  const [titleUr, setTitleUr] = useState('');
  const [summaryEn, setSummaryEn] = useState('');
  const [summaryUr, setSummaryUr] = useState('');
  const [dateStr, setDateStr] = useState(() => new Date().toISOString().slice(0, 10));

  // Claims
  const [claims, setClaims] = useState<Array<{
    claimId: string;
    findingType: EvidentiaryFindingType;
    assertionEn: string;
    assertionUr: string;
    attributedPartyEn: string;
    attributedPartyUr: string;
    sourceIds: string[];
  }>>([]);

  // Sources
  const [sources, setSources] = useState<Array<{
    sourceId: string;
    sourceType: SourceType;
    titleEn: string;
    titleUr: string;
    documentIdentifier: string;
    originalUrl: string;
  }>>([]);

  // Editorial & Privacy State
  const [editorialStatus, setEditorialStatus] = useState<EditorialStatus>('draft');
  const [privacyClassification, setPrivacyClassification] = useState<PrivacyClassification>('public');
  const [piiRedacted, setPiiRedacted] = useState(true);
  const [allegationsDistinguished, setAllegationsDistinguished] = useState(true);
  const [officialResponsesIncluded, setOfficialResponsesIncluded] = useState(true);
  const [reviewerNotes, setReviewerNotes] = useState('');

  // Draft UI state
  const [previewMode, setPreviewMode] = useState(false);
  const [copiedPayload, setCopiedPayload] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // =========================================================================
  // Constitutional Mapping Form State
  // =========================================================================
  const [mapRecordId, setMapRecordId] = useState<string>(ALL_ARCHIVE_RECORDS[0]?.id || '');
  const [mapArticleId, setMapArticleId] = useState<string>('PK-CONST-A009');
  const [mapClauseId, setMapClauseId] = useState<string>('');
  const [mapRelationshipType, setMapRelationshipType] = useState<ConstitutionalRelationshipType>('potential_constitutional_concern');
  const [mapAlertLevel, setMapAlertLevel] = useState<ConstitutionalAlertLevel>('red');
  const [mapFactualEn, setMapFactualEn] = useState<string>('');
  const [mapFactualUr, setMapFactualUr] = useState<string>('');
  const [mapLegalEn, setMapLegalEn] = useState<string>('');
  const [mapLegalUr, setMapLegalUr] = useState<string>('');
  const [mapClaimIds, setMapClaimIds] = useState<string>('');
  const [mapSourceIds, setMapSourceIds] = useState<string>('');
  const [mapStartDate, setMapStartDate] = useState<string>('');
  const [mapEndDate, setMapEndDate] = useState<string>('');
  const [mapReviewStatus, setMapReviewStatus] = useState<ConstitutionalReviewStatus>('under_review');
  const [mapReviewedBy, setMapReviewedBy] = useState<string>('Legal Review Board');
  const [mapEditorialNotes, setMapEditorialNotes] = useState<string>('');
  const [mapCourtNameEn, setMapCourtNameEn] = useState<string>('');
  const [mapCourtNameUr, setMapCourtNameUr] = useState<string>('');
  const [mapCaseCitation, setMapCaseCitation] = useState<string>('');
  const [mapFindingOutcome, setMapFindingOutcome] = useState<'violation_found' | 'claim_rejected' | 'guidelines_issued' | 'pending'>('pending');
  const [mapOperativeTextEn, setMapOperativeTextEn] = useState<string>('');
  const [mapOperativeTextUr, setMapOperativeTextUr] = useState<string>('');
  const [mapCopiedPayload, setMapCopiedPayload] = useState(false);
  const [mapDownloadSuccess, setMapDownloadSuccess] = useState(false);

  // Selected Article for clauses
  const selectedArticle = CONSTITUTION_ARTICLES.find(a => a.id === mapArticleId);

  // Construct draft record object
  const currentDraft: Partial<ArchiveRecord> = {
    id: recordId,
    slug: recordId.replace('rec-pk-', ''),
    domain,
    recordType,
    title: { en: titleEn, ur: titleUr },
    summary: { en: summaryEn, ur: summaryUr },
    narrative: { en: summaryEn, ur: summaryUr },
    date: {
      dateString: dateStr,
      precision: 'day',
      formattedDisplay: { en: dateStr, ur: dateStr },
    },
    location: {
      city: { en: 'Islamabad', ur: 'اسلام آباد' },
      country: { en: 'Pakistan', ur: 'پاکستان' },
    },
    claims: claims.map(c => ({
      claimId: c.claimId,
      findingType: c.findingType,
      assertion: { en: c.assertionEn, ur: c.assertionUr },
      attributedParty: { en: c.attributedPartyEn, ur: c.attributedPartyUr },
      sourceIds: c.sourceIds,
    })),
    sources: sources.map(s => ({
      sourceId: s.sourceId,
      sourceType: s.sourceType,
      title: { en: s.titleEn, ur: s.titleUr },
      documentIdentifier: s.documentIdentifier,
      originalUrl: s.originalUrl,
      language: 'both',
      verificationStatus: 'primary_source',
      verificationTier: 'primary_verified',
    })),
    evidenceMedia: [],
    relationships: [],
    categories: [domain],
    tags: { en: ['Draft'], ur: ['ڈرافٹ'] },
    verificationStatus: 'verified',
    editorialStatus,
    privacyClassification,
    privacyFlags: {
      isSensitivePersonalData: privacyClassification === 'public_sensitive',
    },
    editorialNotes: reviewerNotes || undefined,
    version: 1,
    createdAt: '2026-01-01T00:00:00Z',
    updatedAt: '2026-01-01T00:00:00Z',
  };

  const validation: ValidationResult = validateArchiveRecord(currentDraft);

  // Pre-publication check: court_finding must be backed by a judicial source
  const hasUnsupportedCourtFinding = claims.some(c => {
    if (c.findingType === 'court_finding' || c.findingType === 'appellate_court_finding') {
      const citedSources = sources.filter(s => c.sourceIds.includes(s.sourceId));
      return !citedSources.some(s =>
        s.sourceType === 'court_judgment' ||
        s.sourceType === 'court_order' ||
        s.sourceType === 'supreme_court_record' ||
        s.sourceType === 'high_court_record'
      );
    }
    return false;
  });

  // Construct mapping entry object
  const currentMappingDraft: ConstitutionalMappingEntry = {
    mappingId: `PK-CMAP-${mapRecordId ? mapRecordId.replace('rec-pk-', '').toUpperCase().slice(0, 15) : 'DRAFT'}-${mapArticleId.replace('PK-CONST-', '')}`,
    archiveRecordId: mapRecordId,
    articleId: mapArticleId,
    clauseId: mapClauseId ? mapClauseId : undefined,
    relationshipType: mapRelationshipType,
    alertLevel: mapAlertLevel,
    factualSummary: {
      en: mapFactualEn || 'Pending factual nexus description.',
      ur: mapFactualUr || 'واقعاتی تعلق کا اندراج باقی ہے۔',
    },
    legalAnalysis: {
      en: mapLegalEn || 'Constitutional and evidentiary justification pending review.',
      ur: 'آئینی و شواہد پر مبنی تجزیہ زیرِ جائزہ ہے۔',
    },
    courtRulingSummary: mapCaseCitation ? {
      courtName: { en: mapCourtNameEn || 'Supreme Court of Pakistan', ur: mapCourtNameUr || 'سپریم کورٹ آف پاکستان' },
      caseCitation: mapCaseCitation,
      judgmentDate: new Date().toISOString().slice(0, 10),
      findingOutcome: mapFindingOutcome,
      operativeText: { en: mapOperativeTextEn, ur: mapOperativeTextUr },
    } : undefined,
    supportingClaimIds: mapClaimIds ? mapClaimIds.split(',').map(s => s.trim()).filter(Boolean) : [],
    supportingSourceIds: mapSourceIds ? mapSourceIds.split(',').map(s => s.trim()).filter(Boolean) : [],
    applicablePeriod: (mapStartDate || mapEndDate) ? {
      startDate: mapStartDate || undefined,
      endDate: mapEndDate || undefined,
    } : undefined,
    reviewStatus: mapReviewStatus,
    reviewedBy: mapReviewedBy,
    reviewedAt: new Date().toISOString().slice(0, 10),
    editorialNotes: mapEditorialNotes || undefined,
  };

  // Add a claim
  const handleAddClaim = () => {
    const newId = `clm-${Date.now().toString().slice(-4)}`;
    setClaims(prev => [
      ...prev,
      {
        claimId: newId,
        findingType: 'documented_fact',
        assertionEn: '',
        assertionUr: '',
        attributedPartyEn: '',
        attributedPartyUr: '',
        sourceIds: sources.length > 0 ? [sources[0].sourceId] : [],
      },
    ]);
  };

  // Add a source
  const handleAddSource = () => {
    const newId = `src-${Date.now().toString().slice(-4)}`;
    setSources(prev => [
      ...prev,
      {
        sourceId: newId,
        sourceType: 'reputable_journalism',
        titleEn: '',
        titleUr: '',
        documentIdentifier: '',
        originalUrl: '',
      },
    ]);
  };

  // Save to browser IndexedDB/LocalStorage
  const handleSaveDraft = () => {
    saveUserRecord(currentDraft as ArchiveRecord);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  // Export JSON Bundle for Record
  const handleDownloadJson = () => {
    const jsonStr = JSON.stringify(currentDraft, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${recordId}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Export JSON Bundle for Mapping
  const handleDownloadMappingJson = () => {
    const jsonStr = JSON.stringify(currentMappingDraft, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${currentMappingDraft.mappingId}.json`;
    a.click();
    URL.revokeObjectURL(url);
    setMapDownloadSuccess(true);
    setTimeout(() => setMapDownloadSuccess(false), 3000);
  };

  // Generate GitHub Issue Form Payload for Mapping
  const generateMappingGitHubIssueMarkdown = () => {
    return `---
name: "Constitutional Mapping Submission: ${currentMappingDraft.mappingId}"
about: "Propose an evidence-based constitutional mapping connecting an archive record to an Article of the 1973 Constitution"
title: "[CONSTITUTIONAL MAPPING]: ${currentMappingDraft.mappingId}"
labels: ["constitutional-mapping", "legal-review-required", "${mapRelationshipType}"]
---

### Constitutional Mapping Metadata
\`\`\`json
${JSON.stringify(currentMappingDraft, null, 2)}
\`\`\`

### Epistemological Integrity Checklist
- [x] Specific factual nexus identified (no generic or automated keyword-matching assumptions)
- [x] Epistemological distinction preserved: Allegation is not presented as an established court finding
- [x] Primary source citations or verifiable court judgment references attached
- [x] Non-partisan neutrality and constitutional standard adhered to
`;
  };

  const handleCopyMappingGitHubIssue = () => {
    navigator.clipboard.writeText(generateMappingGitHubIssueMarkdown());
    setMapCopiedPayload(true);
    setTimeout(() => setMapCopiedPayload(false), 2500);
  };

  // Generate GitHub Issue Form Payload for Record
  const generateGitHubIssueMarkdown = () => {
    return `---
name: "Archival Record Submission: ${titleEn || recordId}"
about: "Structured contribution for INSAF ARCHIVE ingestion"
title: "[SUBMISSION]: ${titleEn || recordId}"
labels: ["archival-submission", "${domain}"]
---

### Archival Record Metadata
\`\`\`json
${JSON.stringify(currentDraft, null, 2)}
\`\`\`

### Verification Checklist
- [x] Primary or secondary sources cited for all assertions
- [x] Epistemological distinction between claims and findings preserved
- [x] No personal sensitive information or unverified private credentials included
`;
  };

  const handleCopyGitHubIssue = () => {
    navigator.clipboard.writeText(generateGitHubIssueMarkdown());
    setCopiedPayload(true);
    setTimeout(() => setCopiedPayload(false), 2500);
  };

  const domainList = Object.keys(DOMAIN_REGISTRY) as ArchiveDomain[];
  const recordTypeList = Object.keys(RECORD_TYPE_LABELS) as RecordType[];

  return (
    <div className="content-wrap" style={{ padding: '2rem 1.5rem 5rem 1.5rem' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.5rem' }}>
            <FileSpreadsheet size={26} color="var(--accent-gold)" />
            <h1 style={{ fontSize: '1.85rem', color: '#FFFFFF' }}>
              {language === 'ur' ? 'ادارتی ڈیش بورڈ و آئینی میپنگ اسٹوڈیو' : 'Static Editorial Workspace'}
            </h1>
          </div>
          <p style={{ color: 'var(--text-secondary)', maxWidth: '750px', fontSize: '0.95rem' }}>
            {language === 'ur'
              ? 'محفوظ کلائنٹ سائیڈ ایڈیٹر۔ نیا ریکارڈ تیار کریں، تصدیق کریں یا آرکائیو ریکارڈز کو آئینِ پاکستان کی دفعات سے جوڑنے والی قانونی میپنگ تشکیل دیں۔'
              : 'Zero-secret client-side draft engine. Create records, validate citations, or construct evidence-based constitutional mappings connecting records to Articles of the Constitution of Pakistan.'}
          </p>
        </div>

        {/* Tab Switcher */}
        <div style={{ display: 'flex', gap: '0.5rem', backgroundColor: 'var(--bg-surface)', padding: '0.25rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)', flexWrap: 'wrap' }}>
          <button
            onClick={() => setActiveTab('admin_studio')}
            className={`btn btn-sm ${activeTab === 'admin_studio' ? 'btn-primary' : 'btn-ghost'}`}
            style={{ fontSize: '0.85rem' }}
          >
            <FolderOpen size={14} />
            <span>{language === 'ur' ? 'ایڈمن اسٹوڈیو (نئے ریکارڈز)' : 'Admin Editorial Studio'}</span>
          </button>
          <button
            onClick={() => setActiveTab('record_draft')}
            className={`btn btn-sm ${activeTab === 'record_draft' ? 'btn-primary' : 'btn-ghost'}`}
            style={{ fontSize: '0.85rem' }}
          >
            <FileSpreadsheet size={14} />
            <span>{language === 'ur' ? 'ریکارڈ بلڈر' : 'Record Draft Builder'}</span>
          </button>
          <button
            onClick={() => setActiveTab('constitutional_mapping')}
            className={`btn btn-sm ${activeTab === 'constitutional_mapping' ? 'btn-primary' : 'btn-ghost'}`}
            style={{ fontSize: '0.85rem' }}
          >
            <Scale size={14} />
            <span>{language === 'ur' ? 'آئینی میپنگ اسٹوڈیو' : 'Constitutional Mapping Studio'}</span>
          </button>
          <button
            onClick={() => setActiveTab('publication_approval')}
            className={`btn btn-sm ${activeTab === 'publication_approval' ? 'btn-primary' : 'btn-ghost'}`}
            style={{ fontSize: '0.85rem' }}
          >
            <ShieldCheck size={14} />
            <span>{language === 'ur' ? 'اشاعت و ادارتی جائزہ' : 'Publication & Approval'}</span>
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* TAB 0: ADMIN EDITORIAL STUDIO (Part 5.4) */}
      {/* ========================================================================= */}
      {activeTab === 'admin_studio' && (
        <AdminStudio language={language} />
      )}

      {/* ========================================================================= */}
      {/* TAB 1: RECORD DRAFT BUILDER */}
      {/* ========================================================================= */}
      {activeTab === 'record_draft' && (
        <>
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginBottom: '1.5rem' }}>
            <button
              onClick={() => setPreviewMode(prev => !prev)}
              className={`btn btn-sm ${previewMode ? 'btn-primary' : 'btn-secondary'}`}
            >
              {previewMode ? <Edit3 size={14} /> : <Eye size={14} />}
              <span>{previewMode ? (language === 'ur' ? 'ایڈیٹر موڈ' : 'Edit Mode') : (language === 'ur' ? 'لائیو پریویو' : 'Live Preview')}</span>
            </button>
            <button onClick={handleSaveDraft} className="btn btn-primary btn-sm">
              {saveSuccess ? <Check size={14} /> : <CheckCircle size={14} />}
              <span>{saveSuccess ? (language === 'ur' ? 'محفوظ ہوگیا' : 'Saved Locally') : (language === 'ur' ? 'ڈرافٹ محفوظ کریں' : 'Save Draft')}</span>
            </button>
          </div>

          {/* Validation Status Banner */}
          <div
            style={{
              backgroundColor: validation.isValid ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)',
              border: validation.isValid ? '1px solid rgba(16, 185, 129, 0.3)' : '1px solid rgba(239, 68, 68, 0.3)',
              borderRadius: 'var(--radius-md)',
              padding: '0.85rem 1.25rem',
              marginBottom: '2rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '0.75rem',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              {validation.isValid ? (
                <CheckCircle size={18} color="#10B981" />
              ) : (
                <AlertTriangle size={18} color="#EF4444" />
              )}
              <span style={{ fontSize: '0.9rem', color: validation.isValid ? '#10B981' : '#EF4444', fontWeight: 600 }}>
                {validation.isValid
                  ? (language === 'ur' ? 'ریکارڈ کا اسکیما درست اور مکمل ہے۔' : 'Record Schema is valid and compliant.')
                  : (language === 'ur' ? `اسکیما میں ${validation.errors.length} نقائص موجود ہیں:` : `Draft has ${validation.errors.length} schema validation error(s):`)}
              </span>
            </div>

            {!validation.isValid && (
              <div style={{ width: '100%', marginTop: '0.4rem', fontSize: '0.8rem', color: '#F87171' }}>
                <ul style={{ margin: 0, paddingLeft: '1.5rem' }}>
                  {validation.errors.map((err: { field: string; message: string }, i: number) => (
                    <li key={i}>{err.field}: {err.message}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Main Record Builder Form */}
          <div style={{ display: 'grid', gridTemplateColumns: previewMode ? '1fr' : '1fr 1fr', gap: '2rem' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div style={{ backgroundColor: 'var(--bg-surface)', padding: '1.25rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
                <h3 style={{ fontSize: '1.1rem', color: 'var(--accent-gold)', marginBottom: '1rem' }}>
                  1. {language === 'ur' ? 'بنیادی میٹا ڈیٹا' : 'Core Identification'}
                </h3>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                  <div>
                    <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Record ID</label>
                    <input
                      type="text"
                      className="form-control"
                      value={recordId}
                      onChange={e => setRecordId(e.target.value)}
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Date</label>
                    <input
                      type="date"
                      className="form-control"
                      value={dateStr}
                      onChange={e => setDateStr(e.target.value)}
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div>
                    <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Domain</label>
                    <select
                      className="form-control"
                      value={domain}
                      onChange={e => setDomain(e.target.value as ArchiveDomain)}
                    >
                      {domainList.map(d => (
                        <option key={d} value={d}>{DOMAIN_REGISTRY[d].label.en}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Record Type</label>
                    <select
                      className="form-control"
                      value={recordType}
                      onChange={e => setRecordType(e.target.value as RecordType)}
                    >
                      {recordTypeList.map(rt => (
                        <option key={rt} value={rt}>{RECORD_TYPE_LABELS[rt]?.en || rt}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Title & Summary */}
              <div style={{ backgroundColor: 'var(--bg-surface)', padding: '1.25rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
                <h3 style={{ fontSize: '1.1rem', color: 'var(--accent-gold)', marginBottom: '1rem' }}>
                  2. {language === 'ur' ? 'عنوانات و خلاصہ' : 'Bilingual Titles & Summary'}
                </h3>

                <div style={{ marginBottom: '1rem' }}>
                  <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Title (English)</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="e.g. Landmark Ruling on Public Interest"
                    value={titleEn}
                    onChange={e => setTitleEn(e.target.value)}
                  />
                </div>

                <div style={{ marginBottom: '1rem' }}>
                  <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>عنوان (اردو)</label>
                  <input
                    type="text"
                    className="form-control"
                    dir="rtl"
                    placeholder="مثال: عوامی مفاد کی رٹ پر تاریخی فیصلہ"
                    value={titleUr}
                    onChange={e => setTitleUr(e.target.value)}
                  />
                </div>

                <div style={{ marginBottom: '1rem' }}>
                  <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Summary (English)</label>
                  <textarea
                    className="form-control"
                    rows={3}
                    value={summaryEn}
                    onChange={e => setSummaryEn(e.target.value)}
                  />
                </div>

                <div>
                  <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>خلاصہ (اردو)</label>
                  <textarea
                    className="form-control"
                    dir="rtl"
                    rows={3}
                    value={summaryUr}
                    onChange={e => setSummaryUr(e.target.value)}
                  />
                </div>
              </div>
            </div>

            {/* Right Column: Claims & Sources */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              {/* Sources */}
              <div style={{ backgroundColor: 'var(--bg-surface)', padding: '1.25rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                  <h3 style={{ fontSize: '1.1rem', color: 'var(--accent-gold)' }}>
                    3. {language === 'ur' ? 'حوالہ جات و ذرائع' : 'Source Citations'}
                  </h3>
                  <button onClick={handleAddSource} className="btn btn-secondary btn-sm" style={{ gap: '0.3rem' }}>
                    <Plus size={14} /> Add Source
                  </button>
                </div>

                {sources.length === 0 ? (
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                    No sources cited. Citations are strictly required before publication.
                  </p>
                ) : (
                  sources.map((src, sIdx) => (
                    <div
                      key={src.sourceId}
                      style={{
                        backgroundColor: 'var(--bg-card)',
                        padding: '0.75rem',
                        borderRadius: 'var(--radius-sm)',
                        marginBottom: '0.5rem',
                        border: '1px solid var(--border-subtle)',
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
                        <span style={{ fontSize: '0.75rem', color: 'var(--accent-gold)', fontWeight: 600 }}>{src.sourceId}</span>
                        <button
                          onClick={() => setSources(prev => prev.filter((_, i) => i !== sIdx))}
                          className="btn btn-ghost btn-sm"
                          style={{ padding: '0.1rem 0.3rem', color: '#F87171' }}
                        >
                          <Trash2 size={12} />
                        </button>
                      </div>
                      <input
                        className="form-control"
                        placeholder="Source Title (English)"
                        value={src.titleEn}
                        onChange={e => {
                          const val = e.target.value;
                          setSources(prev => prev.map((s, i) => (i === sIdx ? { ...s, titleEn: val } : s)));
                        }}
                        style={{ marginBottom: '0.3rem', fontSize: '0.85rem' }}
                      />
                      <input
                        className="form-control"
                        placeholder="Original URL"
                        value={src.originalUrl}
                        onChange={e => {
                          const val = e.target.value;
                          setSources(prev => prev.map((s, i) => (i === sIdx ? { ...s, originalUrl: val } : s)));
                        }}
                        style={{ fontSize: '0.85rem' }}
                      />
                    </div>
                  ))
                )}
              </div>

              {/* Claims Section */}
              <div style={{ backgroundColor: 'var(--bg-surface)', padding: '1.25rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                  <h3 style={{ fontSize: '1.1rem', color: 'var(--accent-gold)' }}>
                    4. {language === 'ur' ? 'شواہد و نتائج میٹرکس' : 'Claims & Findings Matrix'}
                  </h3>
                  <button onClick={handleAddClaim} className="btn btn-secondary btn-sm" style={{ gap: '0.3rem' }}>
                    <Plus size={14} /> Add Claim
                  </button>
                </div>

                {claims.length === 0 ? (
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                    Add individual assertions (Documented Fact, Court Finding, Allegation, Denial) with attached sources.
                  </p>
                ) : (
                  claims.map((clm, cIdx) => (
                    <div
                      key={clm.claimId}
                      style={{
                        backgroundColor: 'var(--bg-card)',
                        padding: '0.75rem',
                        borderRadius: 'var(--radius-sm)',
                        marginBottom: '0.75rem',
                        border: '1px solid var(--border-subtle)',
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                        <select
                          className="form-control"
                          value={clm.findingType}
                          onChange={e => {
                            const val = e.target.value as EvidentiaryFindingType;
                            setClaims(prev => prev.map((c, i) => (i === cIdx ? { ...c, findingType: val } : c)));
                          }}
                          style={{ fontSize: '0.8rem', width: 'auto', padding: '0.2rem 0.5rem' }}
                        >
                          {Object.keys(FINDING_TYPE_CONFIG).map(ft => (
                            <option key={ft} value={ft}>{FINDING_TYPE_CONFIG[ft as EvidentiaryFindingType].label.en}</option>
                          ))}
                        </select>
                        <button
                          onClick={() => setClaims(prev => prev.filter((_, i) => i !== cIdx))}
                          className="btn btn-ghost btn-sm"
                          style={{ padding: '0.1rem 0.3rem', color: '#F87171' }}
                        >
                          <Trash2 size={12} />
                        </button>
                      </div>

                      <textarea
                        className="form-control"
                        rows={2}
                        placeholder="Assertion text (English)"
                        value={clm.assertionEn}
                        onChange={e => {
                          const val = e.target.value;
                          setClaims(prev => prev.map((c, i) => (i === cIdx ? { ...c, assertionEn: val } : c)));
                        }}
                        style={{ marginBottom: '0.4rem', fontSize: '0.85rem' }}
                      />
                    </div>
                  ))
                )}

                {/* Epistemological Warning if court_finding lacks judicial source */}
                {hasUnsupportedCourtFinding && (
                  <div
                    style={{
                      marginTop: '1rem',
                      backgroundColor: 'rgba(239, 68, 68, 0.1)',
                      border: '1px solid rgba(239, 68, 68, 0.3)',
                      borderRadius: 'var(--radius-sm)',
                      padding: '0.75rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      fontSize: '0.8rem',
                      color: '#F87171',
                    }}
                  >
                    <AlertTriangle size={16} color="#EF4444" style={{ flexShrink: 0 }} />
                    <div>
                      <strong>Epistemological Guardrail Warning:</strong> A claim is marked as <code>court_finding</code> but is not linked to a primary judicial source (judgment or order). Change the finding type to <code>allegation</code> or <code>claim</code> unless citing an operative court ruling.
                    </div>
                  </div>
                )}

                {/* 5. Privacy, Defamation & Publication Checklist */}
                <div style={{ marginTop: '1.25rem', backgroundColor: 'var(--bg-card)', padding: '1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
                    <ShieldCheck size={16} color="#10B981" />
                    <h4 style={{ fontSize: '0.95rem', color: '#10B981', margin: 0 }}>
                      5. {language === 'ur' ? 'پرائیویسی، ہتکِ عزت اور اشاعت جائزہ' : 'Privacy, Defamation & Publication Review'}
                    </h4>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '0.75rem' }}>
                    <div>
                      <label style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.2rem' }}>
                        Editorial Status
                      </label>
                      <select
                        className="form-control"
                        value={editorialStatus}
                        onChange={e => setEditorialStatus(e.target.value as EditorialStatus)}
                        style={{ fontSize: '0.82rem' }}
                      >
                        <option value="draft">Draft (Local Only)</option>
                        <option value="under_review">Under Review</option>
                        <option value="revision_requested">Revision Requested</option>
                        <option value="approved">Approved</option>
                        <option value="published">Published</option>
                        <option value="withdrawn">Withdrawn</option>
                      </select>
                    </div>

                    <div>
                      <label style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.2rem' }}>
                        Privacy Classification
                      </label>
                      <select
                        className="form-control"
                        value={privacyClassification}
                        onChange={e => setPrivacyClassification(e.target.value as PrivacyClassification)}
                        style={{ fontSize: '0.82rem' }}
                      >
                        <option value="public">Public</option>
                        <option value="public_sensitive">Public Sensitive</option>
                        <option value="restricted_editorial">Restricted Editorial</option>
                        <option value="do_not_publish">Do Not Publish</option>
                      </select>
                    </div>
                  </div>

                  {/* Safety Checklist Checkboxes */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', fontSize: '0.78rem', color: '#CBD5E1', marginBottom: '0.75rem' }}>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                      <input
                        type="checkbox"
                        checked={piiRedacted}
                        onChange={e => setPiiRedacted(e.target.checked)}
                      />
                      <span>PII Redacted: No home addresses, phone numbers, or CNICs included.</span>
                    </label>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                      <input
                        type="checkbox"
                        checked={allegationsDistinguished}
                        onChange={e => setAllegationsDistinguished(e.target.checked)}
                      />
                      <span>Allegations vs Findings: Unproven accusations are not labeled as court findings.</span>
                    </label>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                      <input
                        type="checkbox"
                        checked={officialResponsesIncluded}
                        onChange={e => setOfficialResponsesIncluded(e.target.checked)}
                      />
                      <span>Official Responses: Institutional denials or replies have been recorded if adverse claims exist.</span>
                    </label>
                  </div>

                  <input
                    className="form-control"
                    placeholder="Reviewer Notes / Editorial Audit Log"
                    value={reviewerNotes}
                    onChange={e => setReviewerNotes(e.target.value)}
                    style={{ fontSize: '0.8rem' }}
                  />
                </div>

                {/* Export Actions Bar */}
                <div style={{ marginTop: '1.5rem', borderTop: '1px solid var(--border-subtle)', paddingTop: '1.25rem' }}>
                  <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                    <button onClick={handleDownloadJson} className="btn btn-secondary btn-sm" style={{ flex: 1 }}>
                      <Download size={14} /> Download JSON
                    </button>
                    <button onClick={handleCopyGitHubIssue} className="btn btn-primary btn-sm" style={{ flex: 1 }}>
                      {copiedPayload ? <Check size={14} /> : <FileCode size={14} />}
                      <span>{copiedPayload ? 'Copied Payload!' : 'Copy GitHub Issue Form'}</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* ========================================================================= */}
      {/* TAB 2: CONSTITUTIONAL MAPPING STUDIO */}
      {/* ========================================================================= */}
      {activeTab === 'constitutional_mapping' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {/* Epistemological Banner */}
          <div
            style={{
              backgroundColor: 'rgba(217, 119, 6, 0.1)',
              border: '1px solid rgba(217, 119, 6, 0.3)',
              borderRadius: 'var(--radius-md)',
              padding: '1rem 1.25rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
            }}
          >
            <ShieldAlert size={22} color="var(--accent-gold)" style={{ flexShrink: 0 }} />
            <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
              <strong style={{ color: '#F59E0B' }}>
                {language === 'ur' ? 'آئینی اصول اور عدالتی وقار کا تحفظ:' : 'Epistemological Protection Rule:'}
              </strong>{' '}
              {language === 'ur'
                ? 'کسی واقعے یا ریکارڈ کو آئین کی کسی دفعہ سے جوڑنے کا ہرگز یہ مطلب نہیں کہ وہ ثابت شدہ خلاف ورزی ہے۔ صرف مجاز عدالت کے حتمی فیصلے کو ہی عدالتی تعین (Judicial Finding) قرار دیا جا سکتا ہے۔'
                : 'Connecting an archive record to a constitutional Article does NOT automatically establish a constitutional violation. Only an operative judgment of a competent court can be designated as a judicial finding.'}
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '2rem' }}>
            {/* Left Column: Relationship Configuration */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div style={{ backgroundColor: 'var(--bg-surface)', padding: '1.25rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
                <h3 style={{ fontSize: '1.1rem', color: 'var(--accent-gold)', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <LinkIcon size={16} /> 1. {language === 'ur' ? 'ریکارڈ اور آئینی دفعہ کا انتخاب' : 'Target Entity Selection'}
                </h3>

                <div style={{ marginBottom: '1rem' }}>
                  <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.3rem' }}>
                    {language === 'ur' ? 'آرکائیو ریکارڈ کا انتخاب' : 'Select Archive Record'}
                  </label>
                  <select
                    className="form-control"
                    value={mapRecordId}
                    onChange={e => setMapRecordId(e.target.value)}
                  >
                    <option value="">-- Choose Target Archive Record --</option>
                    {ALL_ARCHIVE_RECORDS.map(rec => (
                      <option key={rec.id} value={rec.id}>
                        {rec.id} — {rec.title.en.slice(0, 50)}... ({rec.date.formattedDisplay.en})
                      </option>
                    ))}
                  </select>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                  <div>
                    <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.3rem' }}>
                      {language === 'ur' ? 'آئینی آرٹیکل' : 'Constitutional Article'}
                    </label>
                    <select
                      className="form-control"
                      value={mapArticleId}
                      onChange={e => {
                        setMapArticleId(e.target.value);
                        setMapClauseId('');
                      }}
                    >
                      {CONSTITUTION_ARTICLES.map(art => (
                        <option key={art.id} value={art.id}>
                          Art. {art.articleNumber} — {art.title.en}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.3rem' }}>
                      {language === 'ur' ? 'مخصوص شق (اختیاری)' : 'Specific Clause (Optional)'}
                    </label>
                    <select
                      className="form-control"
                      value={mapClauseId}
                      onChange={e => setMapClauseId(e.target.value)}
                    >
                      <option value="">Entire Article (پورے آرٹیکل کا اطلاق)</option>
                      {selectedArticle?.clauses?.map(cl => (
                        <option key={cl.id} value={cl.id}>
                          Clause {cl.clauseNumber}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div>
                    <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.3rem' }}>
                      {language === 'ur' ? 'تعلق کی نوعیت (Taxonomy)' : 'Relationship Taxonomy'}
                    </label>
                    <select
                      className="form-control"
                      value={mapRelationshipType}
                      onChange={e => {
                        const val = e.target.value as ConstitutionalRelationshipType;
                        setMapRelationshipType(val);
                        if (val === 'court_found_violation' || val === 'court_rejected_violation_claim') {
                          setMapAlertLevel('green');
                        } else if (val === 'alleged_violation' || val === 'potential_constitutional_concern') {
                          setMapAlertLevel('red');
                        } else if (val === 'constitutional_question' || val === 'officially_disputed') {
                          setMapAlertLevel('blue');
                        }
                      }}
                    >
                      <option value="potential_constitutional_concern">potential_constitutional_concern</option>
                      <option value="constitutional_question">constitutional_question</option>
                      <option value="alleged_violation">alleged_violation</option>
                      <option value="officially_disputed">officially_disputed</option>
                      <option value="court_examined">court_examined</option>
                      <option value="court_found_violation">court_found_violation</option>
                      <option value="court_rejected_violation_claim">court_rejected_violation_claim</option>
                      <option value="constitutional_compliance">constitutional_compliance</option>
                      <option value="historical_constitutional_context">historical_constitutional_context</option>
                    </select>
                  </div>

                  <div>
                    <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.3rem' }}>
                      {language === 'ur' ? 'انتباہی الرٹ لیول' : 'Alert Level Indicator'}
                    </label>
                    <select
                      className="form-control"
                      value={mapAlertLevel}
                      onChange={e => setMapAlertLevel(e.target.value as ConstitutionalAlertLevel)}
                    >
                      <option value="red">RED — Serious Potential Concern / Allegation</option>
                      <option value="orange">ORANGE — Concern Under Review</option>
                      <option value="blue">BLUE — Active Legal Dispute / Context</option>
                      <option value="green">GREEN — Final Judicial Finding / Determination</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Factual & Legal Nexus */}
              <div style={{ backgroundColor: 'var(--bg-surface)', padding: '1.25rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
                <h3 style={{ fontSize: '1.1rem', color: 'var(--accent-gold)', marginBottom: '1rem' }}>
                  2. {language === 'ur' ? 'واقعاتی تعلق اور قانونی استدلال' : 'Factual Nexus & Constitutional Reasoning'}
                </h3>

                <div style={{ marginBottom: '1rem' }}>
                  <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Factual Connection (English)</label>
                  <textarea
                    className="form-control"
                    rows={2}
                    placeholder="Specific factual occurrence that engages this constitutional provision..."
                    value={mapFactualEn}
                    onChange={e => setMapFactualEn(e.target.value)}
                  />
                </div>

                <div style={{ marginBottom: '1rem' }}>
                  <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>واقعاتی تعلق (اردو)</label>
                  <textarea
                    className="form-control"
                    dir="rtl"
                    rows={2}
                    placeholder="وہ مخصوص واقعہ یا قدم جس سے یہ آئینی دفعہ لاگو ہوتی ہے..."
                    value={mapFactualUr}
                    onChange={e => setMapFactualUr(e.target.value)}
                  />
                </div>

                <div style={{ marginBottom: '1rem' }}>
                  <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Constitutional Analysis & Justification (English)</label>
                  <textarea
                    className="form-control"
                    rows={3}
                    placeholder="Legal analysis explaining why this Article applies and citing relevant precedents..."
                    value={mapLegalEn}
                    onChange={e => setMapLegalEn(e.target.value)}
                  />
                </div>

                <div>
                  <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>آئینی تجزیہ و قانونی جواز (اردو)</label>
                  <textarea
                    className="form-control"
                    dir="rtl"
                    rows={3}
                    placeholder="آئینی تشریح جس کی روشنی میں یہ تعلق قائم کیا گیا ہے..."
                    value={mapLegalUr}
                    onChange={e => setMapLegalUr(e.target.value)}
                  />
                </div>
              </div>

              {/* Court Ruling Details (If Applicable) */}
              <div style={{ backgroundColor: 'var(--bg-surface)', padding: '1.25rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
                <h3 style={{ fontSize: '1.1rem', color: 'var(--accent-gold)', marginBottom: '1rem' }}>
                  3. {language === 'ur' ? 'عدالتی فیصلے کے کوائف (اگر قابلِ اطلاق ہو)' : 'Court Judgment Particulars (Optional)'}
                </h3>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                  <div>
                    <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Court Name (English)</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="e.g. Supreme Court of Pakistan"
                      value={mapCourtNameEn}
                      onChange={e => setMapCourtNameEn(e.target.value)}
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>عدالت کا نام (اردو)</label>
                    <input
                      type="text"
                      className="form-control"
                      dir="rtl"
                      placeholder="مثال: سپریم کورٹ آف پاکستان"
                      value={mapCourtNameUr}
                      onChange={e => setMapCourtNameUr(e.target.value)}
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                  <div>
                    <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Court Case Citation</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="e.g. PLD 2024 SC 1"
                      value={mapCaseCitation}
                      onChange={e => setMapCaseCitation(e.target.value)}
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Finding Outcome</label>
                    <select
                      className="form-control"
                      value={mapFindingOutcome}
                      onChange={e => setMapFindingOutcome(e.target.value as any)}
                    >
                      <option value="pending">Case Pending (زیرِ سماعت)</option>
                      <option value="violation_found">Violation Confirmed (خلاف ورزی ثابت)</option>
                      <option value="claim_rejected">Claim Rejected (دعویٰ مسترد)</option>
                      <option value="guidelines_issued">Guidelines Issued (ہدایات جاری)</option>
                    </select>
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div>
                    <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Operative Text (English)</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Operative conclusions of the Court..."
                      value={mapOperativeTextEn}
                      onChange={e => setMapOperativeTextEn(e.target.value)}
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>عدالتی حکم (اردو)</label>
                    <input
                      type="text"
                      className="form-control"
                      dir="rtl"
                      placeholder="فیصلے کا مرکزی حکم..."
                      value={mapOperativeTextUr}
                      onChange={e => setMapOperativeTextUr(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Review Workflow & Export */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              {/* Supporting Citations & Claims */}
              <div style={{ backgroundColor: 'var(--bg-surface)', padding: '1.25rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
                <h3 style={{ fontSize: '1.1rem', color: 'var(--accent-gold)', marginBottom: '1rem' }}>
                  4. {language === 'ur' ? 'شواہد اور کلیمز کے حوالہ جات' : 'Supporting Citations & Evidence'}
                </h3>

                <div style={{ marginBottom: '1rem' }}>
                  <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Supporting Claim IDs (comma separated)</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="e.g. clm-2022-as-01, clm-2022-as-03"
                    value={mapClaimIds}
                    onChange={e => setMapClaimIds(e.target.value)}
                  />
                </div>

                <div style={{ marginBottom: '1rem' }}>
                  <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Supporting Source IDs (comma separated)</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="e.g. src-judicial-report-01, src-na-2024"
                    value={mapSourceIds}
                    onChange={e => setMapSourceIds(e.target.value)}
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div>
                    <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Applicable Start Date</label>
                    <input
                      type="date"
                      className="form-control"
                      value={mapStartDate}
                      onChange={e => setMapStartDate(e.target.value)}
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Applicable End Date</label>
                    <input
                      type="date"
                      className="form-control"
                      value={mapEndDate}
                      onChange={e => setMapEndDate(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              {/* Reviewer Workflow & Audit */}
              <div style={{ backgroundColor: 'var(--bg-surface)', padding: '1.25rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
                <h3 style={{ fontSize: '1.1rem', color: 'var(--accent-gold)', marginBottom: '1rem' }}>
                  5. {language === 'ur' ? 'قانونی و ادارتی ریویو' : 'Legal Review & Audit Status'}
                </h3>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                  <div>
                    <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Review Status</label>
                    <select
                      className="form-control"
                      value={mapReviewStatus}
                      onChange={e => setMapReviewStatus(e.target.value as ConstitutionalReviewStatus)}
                    >
                      <option value="suggested">suggested (خودکار تجویز - غیر منظور)</option>
                      <option value="under_review">under_review (قانونی جائزہ جاری)</option>
                      <option value="approved">approved (منظور شدہ باضابطہ میپنگ)</option>
                      <option value="rejected">rejected (مسترد شدہ)</option>
                    </select>
                  </div>
                  <div>
                    <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Reviewer Reference</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="e.g. Constitutional Bench Researcher"
                      value={mapReviewedBy}
                      onChange={e => setMapReviewedBy(e.target.value)}
                    />
                  </div>
                </div>

                <div style={{ marginBottom: '1.5rem' }}>
                  <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Editorial Audit Notes</label>
                  <textarea
                    className="form-control"
                    rows={2}
                    placeholder="Internal audit notes regarding verification checks..."
                    value={mapEditorialNotes}
                    onChange={e => setMapEditorialNotes(e.target.value)}
                  />
                </div>

                {/* Submission Actions */}
                <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '1.25rem' }}>
                  <h4 style={{ fontSize: '0.95rem', color: 'var(--text-primary)', marginBottom: '0.75rem' }}>
                    {language === 'ur' ? 'میپنگ ایکسپورٹ و گٹ ہب سمیشن' : 'Submission & Export Modalities'}
                  </h4>

                  <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                    <button onClick={handleDownloadMappingJson} className="btn btn-secondary btn-sm" style={{ flex: 1 }}>
                      {mapDownloadSuccess ? <Check size={14} /> : <Download size={14} />}
                      <span>{mapDownloadSuccess ? 'Downloaded!' : 'Download Mapping JSON'}</span>
                    </button>
                    <button onClick={handleCopyMappingGitHubIssue} className="btn btn-primary btn-sm" style={{ flex: 1 }}>
                      {mapCopiedPayload ? <Check size={14} /> : <FileCode size={14} />}
                      <span>{mapCopiedPayload ? 'Copied GitHub Issue!' : 'Copy GitHub Mapping Issue'}</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 3: PUBLICATION APPROVAL & EDITORIAL WORKFLOW (PART 5.2) */}
      {/* ========================================================================= */}
      {activeTab === 'publication_approval' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          {/* Section 1: Static Architecture & Admin Security Notice */}
          <div
            style={{
              backgroundColor: 'rgba(30, 41, 59, 0.7)',
              border: '1px solid rgba(148, 163, 184, 0.2)',
              borderRadius: 'var(--radius-lg)',
              padding: '1.5rem',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
              <ShieldAlert size={22} color="var(--accent-gold)" />
              <h3 style={{ fontSize: '1.15rem', color: '#FFFFFF', margin: 0 }}>
                {language === 'ur'
                  ? 'جامع سیکیورٹی و اشاعتی طریقہ کار (Static Governance Notice)'
                  : 'Static Architecture & Admin Security Notice'}
              </h3>
            </div>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', lineHeight: '1.6', marginBottom: '1rem' }}>
              {language === 'ur'
                ? 'انصاف آرکائیو مکمل طور پر گٹ ہب پیجز (Static GitHub Pages) پر میزبانی شدہ ہے۔ یہاں کوئی فرضی پاس ورڈ، خفیہ ٹوکنز یا کلائنٹ سائیڈ ایڈمن لاگ ان موجود نہیں ہے۔ پبلک سائٹ پر کوئی بھی تبدیلی صرف اور صرف گٹ ہب پل ریکویسٹ (PR) اور کوڈ ریویو کے بعد ہی باضابطہ اشاعت کا حصہ بنتی ہے۔'
                : 'Insaf Archive is strictly hosted as a zero-backend, static GitHub Pages application. There are no client-side admin passwords or fake authentication gates. The publication workflow strictly distinguishes between local draft states, peer-reviewed pull requests, and approved production datasets.'}
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '0.75rem' }}>
              <div style={{ padding: '0.85rem', backgroundColor: 'rgba(15, 23, 42, 0.6)', borderRadius: 'var(--radius-md)', border: '1px solid rgba(148, 163, 184, 0.15)' }}>
                <span style={{ fontSize: '0.72rem', color: 'var(--accent-gold)', fontWeight: 600, display: 'block', marginBottom: '0.2rem' }}>STAGE 1</span>
                <strong style={{ fontSize: '0.85rem', color: '#F1F5F9', display: 'block', marginBottom: '0.25rem' }}>Local Browser Draft</strong>
                <span style={{ fontSize: '0.76rem', color: 'var(--text-muted)' }}>Ephemeral client-side state in browser memory</span>
              </div>
              <div style={{ padding: '0.85rem', backgroundColor: 'rgba(15, 23, 42, 0.6)', borderRadius: 'var(--radius-md)', border: '1px solid rgba(148, 163, 184, 0.15)' }}>
                <span style={{ fontSize: '0.72rem', color: '#38BDF8', fontWeight: 600, display: 'block', marginBottom: '0.2rem' }}>STAGE 2</span>
                <strong style={{ fontSize: '0.85rem', color: '#F1F5F9', display: 'block', marginBottom: '0.25rem' }}>Exported Submission</strong>
                <span style={{ fontSize: '0.76rem', color: 'var(--text-muted)' }}>Validated JSON / TypeScript payload</span>
              </div>
              <div style={{ padding: '0.85rem', backgroundColor: 'rgba(15, 23, 42, 0.6)', borderRadius: 'var(--radius-md)', border: '1px solid rgba(148, 163, 184, 0.15)' }}>
                <span style={{ fontSize: '0.72rem', color: '#A855F7', fontWeight: 600, display: 'block', marginBottom: '0.2rem' }}>STAGE 3</span>
                <strong style={{ fontSize: '0.85rem', color: '#F1F5F9', display: 'block', marginBottom: '0.25rem' }}>GitHub Issue / PR</strong>
                <span style={{ fontSize: '0.76rem', color: 'var(--text-muted)' }}>Peer review & editorial discussion</span>
              </div>
              <div style={{ padding: '0.85rem', backgroundColor: 'rgba(15, 23, 42, 0.6)', borderRadius: 'var(--radius-md)', border: '1px solid rgba(148, 163, 184, 0.15)' }}>
                <span style={{ fontSize: '0.72rem', color: '#10B981', fontWeight: 600, display: 'block', marginBottom: '0.2rem' }}>STAGE 4</span>
                <strong style={{ fontSize: '0.85rem', color: '#F1F5F9', display: 'block', marginBottom: '0.25rem' }}>Approved Repository Data</strong>
                <span style={{ fontSize: '0.76rem', color: 'var(--text-muted)' }}>Merged into main branch after checks</span>
              </div>
              <div style={{ padding: '0.85rem', backgroundColor: 'rgba(15, 23, 42, 0.6)', borderRadius: 'var(--radius-md)', border: '1px solid rgba(148, 163, 184, 0.15)' }}>
                <span style={{ fontSize: '0.72rem', color: '#34D399', fontWeight: 600, display: 'block', marginBottom: '0.2rem' }}>STAGE 5</span>
                <strong style={{ fontSize: '0.85rem', color: '#F1F5F9', display: 'block', marginBottom: '0.25rem' }}>Published Static Site</strong>
                <span style={{ fontSize: '0.76rem', color: 'var(--text-muted)' }}>Vite production build on GitHub Pages</span>
              </div>
            </div>
          </div>

          {/* Section 2: Dossier Readiness Dashboard */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.5rem' }}>
              <div>
                <h3 style={{ fontSize: '1.25rem', color: '#FFFFFF', margin: 0 }}>
                  {language === 'ur' ? '12 دستاویزی فائلوں کا اشاعتی جائزہ' : '12 Archival Dossiers Publication Readiness'}
                </h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.82rem', margin: '0.25rem 0 0 0' }}>
                  {language === 'ur'
                    ? 'خودکار اشاعتی معیارات اور قانونی تحفظات کی لائیو جانچ'
                    : 'Automated evaluation of publication safeguards, stayed judgments, and evidence gaps.'}
                </p>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1rem' }}>
              {ALL_ARCHIVAL_DOSSIERS.map(dossier => {
                const safeguardResult = validatePublicationSafeguards(dossier);
                const isSelected = dossier.id === selectedDossierId;

                return (
                  <div
                    key={dossier.id}
                    onClick={() => {
                      setSelectedDossierId(dossier.id);
                      setWorkflowActionResult(null);
                    }}
                    style={{
                      backgroundColor: isSelected ? 'rgba(30, 41, 59, 0.9)' : 'var(--bg-surface)',
                      border: `1px solid ${isSelected ? 'var(--accent-gold)' : 'var(--border-subtle)'}`,
                      borderRadius: 'var(--radius-md)',
                      padding: '1.15rem',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      boxShadow: isSelected ? '0 0 12px rgba(245, 158, 11, 0.15)' : 'none'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.6rem' }}>
                      <span
                        style={{
                          fontSize: '0.72rem',
                          fontWeight: 600,
                          padding: '0.2rem 0.5rem',
                          borderRadius: '4px',
                          textTransform: 'uppercase',
                          color: dossier.editorialStatus === 'published' ? '#10B981' : dossier.editorialStatus === 'under_review' ? '#F59E0B' : '#9CA3AF',
                          backgroundColor: dossier.editorialStatus === 'published' ? 'rgba(16, 185, 129, 0.12)' : dossier.editorialStatus === 'under_review' ? 'rgba(245, 158, 11, 0.12)' : 'rgba(156, 163, 175, 0.12)',
                          border: `1px solid ${dossier.editorialStatus === 'published' ? 'rgba(16, 185, 129, 0.3)' : dossier.editorialStatus === 'under_review' ? 'rgba(245, 158, 11, 0.3)' : 'rgba(156, 163, 175, 0.3)'}`
                        }}
                      >
                        {dossier.editorialStatus.replace('_', ' ')}
                      </span>

                      <span
                        style={{
                          fontSize: '0.72rem',
                          fontWeight: 600,
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.3rem',
                          color: safeguardResult.canPublish ? '#10B981' : '#EF4444'
                        }}
                      >
                        {safeguardResult.canPublish ? <CheckCircle size={13} /> : <AlertCircle size={13} />}
                        {safeguardResult.canPublish ? 'Safeguards Passed' : `${safeguardResult.blockers.length} Blocker(s)`}
                      </span>
                    </div>

                    <h4 style={{ fontSize: '0.92rem', color: '#FFFFFF', marginBottom: '0.4rem', lineHeight: '1.4' }}>
                      {language === 'ur' ? dossier.title.ur : dossier.title.en}
                    </h4>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                      <span>{dossier.claims.length} Claims Audited</span>
                      <span>{dossier.sources.length} Sources</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Section 3: Selected Dossier Deep-Dive & Action Studio */}
          {(() => {
            const selectedDossier = ALL_ARCHIVAL_DOSSIERS.find(d => d.id === selectedDossierId) || ALL_ARCHIVAL_DOSSIERS[0];
            const safeguards = validatePublicationSafeguards(selectedDossier);

            const handleExecuteAction = () => {
              // 1. Validate status transition
              const transitionCheck = validateStatusTransition(
                selectedDossier.editorialStatus,
                workflowTargetStatus,
                workflowAction,
                workflowReviewerNote
              );

              if (!transitionCheck.isAllowed) {
                setWorkflowActionResult({ isAllowed: false, message: transitionCheck.error || 'Transition denied' });
                return;
              }

              // 2. If trying to publish, check publication safeguards
              if (workflowTargetStatus === 'published') {
                if (!safeguards.canPublish) {
                  setWorkflowActionResult({
                    isAllowed: false,
                    message: `Publication Safeguards Failed: ${safeguards.blockers.join(' | ')}`
                  });
                  return;
                }
              }

              // 3. Create audit trail entry
              const newEntry = createEditorialAuditEntry(
                selectedDossier.id,
                selectedDossier.editorialStatus,
                workflowTargetStatus,
                workflowAction,
                workflowReviewerNote || `Status updated to ${workflowTargetStatus}`,
                workflowChangeSummary || `Editorial action '${workflowAction}' executed.`,
                workflowGitRef || undefined
              );

              setAuditTrail(prev => [newEntry, ...prev]);
              setWorkflowActionResult({
                isAllowed: true,
                message: `Action '${workflowAction}' successfully validated and recorded in audit trail.`
              });
              setWorkflowReviewerNote('');
              setWorkflowChangeSummary('');
            };

            const auditEntries = CLAIM_SOURCE_AUDIT_DATA.filter(c => c.dossierId === selectedDossier.id);
            const totalClaims = selectedDossier.claims.length;
            const auditedClaims = auditEntries.length;
            const claimCoveragePct = totalClaims > 0 ? Math.round((auditedClaims / totalClaims) * 100) : 0;
            const primarySourceCount = auditEntries.filter(c => c.tier === 'primary' || c.verificationStatus === 'primary_source_supported').length;
            const primarySourcePct = auditedClaims > 0 ? Math.round((primarySourceCount / auditedClaims) * 100) : 0;
            const contradictoryClaims = auditEntries.filter(c => c.contradictoryOrQualifyingSourceIds && c.contradictoryOrQualifyingSourceIds.length > 0);
            const unverifiedSources = selectedDossier.sources.filter(s => s.sourceAvailability === 'unavailable' || s.sourceAvailability === 'not_checked' || s.authenticityStatus === 'unverified');
            const freshness = checkLegalStatusFreshness(selectedDossier.lastLegalStatusChecked);

            const handleExportAuditReport = () => {
              const payload = {
                archive: 'INSAF ARCHIVE (انصاف آرکائیو)',
                reportType: 'PART5_3_DOSSIER_AUDIT_AND_CORRECTION_PAYLOAD',
                generatedAt: new Date().toISOString(),
                dossier: {
                  id: selectedDossier.id,
                  slug: selectedDossier.slug,
                  title: selectedDossier.title,
                  editorialStatus: selectedDossier.editorialStatus,
                  legalProceedingStatus: selectedDossier.legalProceedingStatus,
                  hasActiveReportingBan: selectedDossier.hasActiveReportingBan,
                  lastLegalStatusChecked: selectedDossier.lastLegalStatusChecked,
                  pendingProceedingsNotice: selectedDossier.pendingProceedingsNotice
                },
                safeguardsAssessment: {
                  canPublish: safeguards.canPublish,
                  blockers: safeguards.blockers,
                  warnings: safeguards.warnings
                },
                evidenceMetrics: {
                  totalMaterialClaimsInText: totalClaims,
                  registeredAuditedClaims: auditedClaims,
                  claimCoveragePercentage: `${claimCoveragePct}%`,
                  primarySourceCoveragePercentage: `${primarySourcePct}%`,
                  contradictoryClaimsCount: contradictoryClaims.length,
                  unverifiedOrUnavailableSourcesCount: unverifiedSources.length
                },
                auditedClaims: auditEntries,
                sources: selectedDossier.sources,
                reviewerRecommendation: {
                  proposedStatus: workflowTargetStatus,
                  action: workflowAction,
                  reviewerNotes: workflowReviewerNote,
                  gitReference: workflowGitRef
                }
              };

              const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(payload, null, 2));
              const downloadAnchor = document.createElement('a');
              downloadAnchor.setAttribute('href', dataStr);
              downloadAnchor.setAttribute('download', `${selectedDossier.id}-audit-report-part5_3.json`);
              document.body.appendChild(downloadAnchor);
              downloadAnchor.click();
              downloadAnchor.remove();

              navigator.clipboard?.writeText(JSON.stringify(payload, null, 2));
              setCopiedAuditPayload(true);
              setTimeout(() => setCopiedAuditPayload(false), 3000);
            };

            return (
              <div
                style={{
                  backgroundColor: 'var(--bg-surface)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: 'var(--radius-lg)',
                  padding: '1.75rem',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '1rem' }}>
                  <div>
                    <span style={{ fontSize: '0.75rem', color: 'var(--accent-gold)', fontWeight: 600 }}>PART 5.3 DOSSIER EVIDENCE & LEGAL AUDIT</span>
                    <h3 style={{ fontSize: '1.3rem', color: '#FFFFFF', margin: '0.25rem 0' }}>
                      {language === 'ur' ? selectedDossier.title.ur : selectedDossier.title.en}
                    </h3>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap', marginTop: '0.25rem' }}>
                      <code style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{selectedDossier.id}</code>
                      <span style={{ fontSize: '0.72rem', color: '#38BDF8', backgroundColor: 'rgba(56, 189, 248, 0.12)', padding: '0.15rem 0.45rem', borderRadius: '4px' }}>
                        Proceedings: {selectedDossier.legalProceedingStatus || 'unknown'}
                      </span>
                      {selectedDossier.hasActiveReportingBan && (
                        <span style={{ fontSize: '0.72rem', color: '#EF4444', backgroundColor: 'rgba(239, 68, 68, 0.15)', padding: '0.15rem 0.45rem', borderRadius: '4px', fontWeight: 600 }}>
                          ACTIVE GAG ORDER
                        </span>
                      )}
                    </div>
                  </div>

                  <div style={{ textAlign: 'right' }}>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block' }}>Editorial Status</span>
                    <strong style={{ fontSize: '0.95rem', color: '#F8FAFC', textTransform: 'capitalize' }}>
                      {selectedDossier.editorialStatus.replace('_', ' ')}
                    </strong>
                    <div style={{ marginTop: '0.35rem' }}>
                      <button
                        onClick={handleExportAuditReport}
                        className="btn btn-secondary btn-sm"
                        style={{ fontSize: '0.75rem', padding: '0.3rem 0.6rem', display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}
                      >
                        <Download size={13} />
                        <span>{copiedAuditPayload ? 'Payload Copied!' : 'Export Audit Report'}</span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Part 5.3 Evidence Metrics Grid */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '0.75rem', marginBottom: '1.25rem' }}>
                  <div style={{ padding: '0.75rem', backgroundColor: 'rgba(15, 23, 42, 0.5)', borderRadius: 'var(--radius-md)', border: '1px solid rgba(148, 163, 184, 0.12)' }}>
                    <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', display: 'block' }}>Claim Coverage</span>
                    <strong style={{ fontSize: '1rem', color: claimCoveragePct === 100 ? '#10B981' : '#F59E0B' }}>
                      {auditedClaims}/{totalClaims} ({claimCoveragePct}%)
                    </strong>
                  </div>
                  <div style={{ padding: '0.75rem', backgroundColor: 'rgba(15, 23, 42, 0.5)', borderRadius: 'var(--radius-md)', border: '1px solid rgba(148, 163, 184, 0.12)' }}>
                    <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', display: 'block' }}>Primary Source Ratio</span>
                    <strong style={{ fontSize: '1rem', color: '#38BDF8' }}>
                      {primarySourceCount}/{auditedClaims} ({primarySourcePct}%)
                    </strong>
                  </div>
                  <div style={{ padding: '0.75rem', backgroundColor: 'rgba(15, 23, 42, 0.5)', borderRadius: 'var(--radius-md)', border: '1px solid rgba(148, 163, 184, 0.12)' }}>
                    <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', display: 'block' }}>Contradictory Evidence</span>
                    <strong style={{ fontSize: '1rem', color: contradictoryClaims.length > 0 ? '#FBBF24' : '#10B981' }}>
                      {contradictoryClaims.length} Claim(s)
                    </strong>
                  </div>
                  <div style={{ padding: '0.75rem', backgroundColor: 'rgba(15, 23, 42, 0.5)', borderRadius: 'var(--radius-md)', border: '1px solid rgba(148, 163, 184, 0.12)' }}>
                    <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', display: 'block' }}>Legal Status Checked</span>
                    <strong style={{ fontSize: '0.85rem', color: freshness.isStale ? '#EF4444' : '#E2E8F0' }}>
                      {selectedDossier.lastLegalStatusChecked || 'Never'} {freshness.isStale ? '(STALE)' : ''}
                    </strong>
                  </div>
                </div>

                {/* Sub Judice Pending Proceedings Disclosure Notice */}
                {selectedDossier.pendingProceedingsNotice && (
                  <div
                    style={{
                      backgroundColor: 'rgba(56, 189, 248, 0.08)',
                      border: '1px solid rgba(56, 189, 248, 0.25)',
                      borderRadius: 'var(--radius-md)',
                      padding: '0.85rem 1rem',
                      marginBottom: '1rem',
                      fontSize: '0.82rem',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#38BDF8', fontWeight: 600, marginBottom: '0.2rem' }}>
                      <Scale size={14} />
                      <span>Pending Legal Proceedings Disclosure Notice</span>
                    </div>
                    <p style={{ margin: 0, color: '#E0F2FE' }}>
                      {language === 'ur' ? selectedDossier.pendingProceedingsNotice.ur : selectedDossier.pendingProceedingsNotice.en}
                    </p>
                  </div>
                )}

                {/* Safeguards Assessment Box */}
                <div
                  style={{
                    backgroundColor: safeguards.canPublish ? 'rgba(16, 185, 129, 0.08)' : 'rgba(239, 68, 68, 0.08)',
                    border: `1px solid ${safeguards.canPublish ? 'rgba(16, 185, 129, 0.3)' : 'rgba(239, 68, 68, 0.3)'}`,
                    borderRadius: 'var(--radius-md)',
                    padding: '1rem 1.25rem',
                    marginBottom: '1.5rem',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.5rem' }}>
                    {safeguards.canPublish ? <CheckCircle size={18} color="#10B981" /> : <AlertTriangle size={18} color="#EF4444" />}
                    <strong style={{ color: safeguards.canPublish ? '#10B981' : '#EF4444', fontSize: '0.92rem' }}>
                      {safeguards.canPublish
                        ? 'Publication Eligibility Satisfied (Approved for Release Subject to Workflow)'
                        : `Publication Blocked (${safeguards.blockers.length} Hard Blockers)`}
                    </strong>
                  </div>

                  {safeguards.blockers.length > 0 && (
                    <div style={{ marginTop: '0.5rem' }}>
                      <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#F87171' }}>Hard Blockers Required to be Resolved:</span>
                      <ul style={{ margin: '0.3rem 0 0 1.2rem', padding: 0, fontSize: '0.8rem', color: '#FCA5A5' }}>
                        {safeguards.blockers.map((b, idx) => (
                          <li key={idx} style={{ marginBottom: '0.2rem' }}>{b}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {safeguards.warnings.length > 0 && (
                    <div style={{ marginTop: '0.5rem' }}>
                      <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#FBBF24' }}>Editorial Qualifications & Disclosures:</span>
                      <ul style={{ margin: '0.3rem 0 0 1.2rem', padding: 0, fontSize: '0.8rem', color: '#FDE68A' }}>
                        {safeguards.warnings.map((w, idx) => (
                          <li key={idx} style={{ marginBottom: '0.2rem' }}>{w}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                {/* Editorial Transition & Review Action Studio */}
                <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '1.25rem' }}>
                  <h4 style={{ fontSize: '1rem', color: '#FFFFFF', marginBottom: '0.75rem' }}>
                    {language === 'ur' ? 'ادارتی ایکشن اسٹوڈیو (Editorial Action Studio)' : 'Editorial Review & Action Studio'}
                  </h4>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                    <div>
                      <label style={{ fontSize: '0.78rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.25rem' }}>
                        Requested Action
                      </label>
                      <select
                        className="form-control"
                        value={workflowAction}
                        onChange={e => {
                          const act = e.target.value as EditorialAction;
                          setWorkflowAction(act);
                          if (act === 'submit_for_review') setWorkflowTargetStatus('under_review');
                          if (act === 'request_revision') setWorkflowTargetStatus('revision_requested');
                          if (act === 'approve') setWorkflowTargetStatus('approved');
                          if (act === 'publish') setWorkflowTargetStatus('published');
                          if (act === 'withdraw') setWorkflowTargetStatus('withdrawn');
                          if (act === 'correct') setWorkflowTargetStatus('under_review');
                        }}
                        style={{ fontSize: '0.85rem' }}
                      >
                        <option value="submit_for_review">Submit for Review</option>
                        <option value="request_revision">Request Revision (with Notes)</option>
                        <option value="approve">Approve Record</option>
                        <option value="publish">Publish via Repository Change</option>
                        <option value="withdraw">Withdraw Record (with Reason)</option>
                        <option value="correct">Submit Correction Request</option>
                      </select>
                    </div>

                    <div>
                      <label style={{ fontSize: '0.78rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.25rem' }}>
                        Target Editorial Status
                      </label>
                      <select
                        className="form-control"
                        value={workflowTargetStatus}
                        onChange={e => setWorkflowTargetStatus(e.target.value as EditorialStatus)}
                        style={{ fontSize: '0.85rem' }}
                      >
                        <option value="draft">Draft</option>
                        <option value="under_review">Under Review</option>
                        <option value="revision_requested">Revision Requested</option>
                        <option value="approved">Approved</option>
                        <option value="published">Published</option>
                        <option value="withdrawn">Withdrawn</option>
                      </select>
                    </div>
                  </div>

                  <div style={{ marginBottom: '1rem' }}>
                    <label style={{ fontSize: '0.78rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.25rem' }}>
                      Reviewer Note (Required for revision or withdrawal)
                    </label>
                    <textarea
                      className="form-control"
                      rows={2}
                      value={workflowReviewerNote}
                      onChange={e => setWorkflowReviewerNote(e.target.value)}
                      placeholder="e.g. Downgraded due to operative stay order in ICA 558/2023 or missing post-mortem records..."
                      style={{ fontSize: '0.82rem', resize: 'vertical' }}
                    />
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1rem', marginBottom: '1.25rem' }}>
                    <div>
                      <label style={{ fontSize: '0.78rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.25rem' }}>
                        Change Summary
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        value={workflowChangeSummary}
                        onChange={e => setWorkflowChangeSummary(e.target.value)}
                        placeholder="Brief summary of substantive edits or evidence additions"
                        style={{ fontSize: '0.82rem' }}
                      />
                    </div>

                    <div>
                      <label style={{ fontSize: '0.78rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.25rem' }}>
                        Git Reference (PR # / Commit / Issue #)
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        value={workflowGitRef}
                        onChange={e => setWorkflowGitRef(e.target.value)}
                        placeholder="e.g. PR #48"
                        style={{ fontSize: '0.82rem' }}
                      />
                    </div>
                  </div>

                  {workflowActionResult && (
                    <div
                      style={{
                        padding: '0.75rem 1rem',
                        borderRadius: 'var(--radius-md)',
                        marginBottom: '1rem',
                        fontSize: '0.82rem',
                        backgroundColor: workflowActionResult.isAllowed ? 'rgba(16, 185, 129, 0.12)' : 'rgba(239, 68, 68, 0.12)',
                        border: `1px solid ${workflowActionResult.isAllowed ? 'rgba(16, 185, 129, 0.3)' : 'rgba(239, 68, 68, 0.3)'}`,
                        color: workflowActionResult.isAllowed ? '#10B981' : '#EF4444'
                      }}
                    >
                      {workflowActionResult.message}
                    </div>
                  )}

                  <button
                    onClick={handleExecuteAction}
                    className="btn btn-primary btn-sm"
                    style={{ fontSize: '0.85rem' }}
                  >
                    <CheckCircle size={14} />
                    <span>Execute & Log Editorial Transition</span>
                  </button>
                </div>
              </div>
            );
          })()}

          {/* Section 4: Audit Trail Log */}
          <div
            style={{
              backgroundColor: 'var(--bg-surface)',
              border: '1px solid var(--border-subtle)',
              borderRadius: 'var(--radius-lg)',
              padding: '1.5rem',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
              <Clock size={18} color="var(--accent-gold)" />
              <h3 style={{ fontSize: '1.15rem', color: '#FFFFFF', margin: 0 }}>
                {language === 'ur' ? 'ادارتی آڈٹ ٹریل و لاگ' : 'Immutable Editorial Audit Trail'}
              </h3>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {auditTrail.map(entry => (
                <div
                  key={entry.auditId}
                  style={{
                    backgroundColor: 'rgba(15, 23, 42, 0.4)',
                    border: '1px solid rgba(148, 163, 184, 0.12)',
                    borderRadius: 'var(--radius-md)',
                    padding: '0.85rem 1rem',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <code style={{ fontSize: '0.75rem', color: 'var(--accent-gold)' }}>{entry.recordId}</code>
                      <span
                        style={{
                          fontSize: '0.68rem',
                          padding: '0.15rem 0.45rem',
                          borderRadius: '4px',
                          textTransform: 'uppercase',
                          fontWeight: 600,
                          backgroundColor: 'rgba(148, 163, 184, 0.15)',
                          color: '#CBD5E1'
                        }}
                      >
                        {entry.action.replace('_', ' ')}
                      </span>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.74rem', color: 'var(--text-muted)' }}>
                      <span>{entry.previousStatus} <ArrowRight size={10} style={{ display: 'inline' }} /> {entry.newStatus}</span>
                      <span>•</span>
                      <span>{new Date(entry.timestamp).toLocaleString()}</span>
                      {entry.gitReference && (
                        <span style={{ color: '#38BDF8', fontWeight: 500 }}>({entry.gitReference})</span>
                      )}
                    </div>
                  </div>

                  <p style={{ fontSize: '0.82rem', color: '#E2E8F0', margin: '0.2rem 0' }}>
                    <strong>Note:</strong> {entry.reviewerNote}
                  </p>
                  {entry.changeSummary && (
                    <p style={{ fontSize: '0.76rem', color: 'var(--text-muted)', margin: 0 }}>
                      <strong>Summary:</strong> {entry.changeSummary}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

