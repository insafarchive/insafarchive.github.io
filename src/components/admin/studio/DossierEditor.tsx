/**
 * INSAF ARCHIVE (انصاف آرکائیو)
 * Dossier Editor Component — Admin Editorial Studio
 * Bilingual data entry, collision-safe ID generation, sub judice notice enforcement & validation
 */

import React, { useState } from 'react';
import type { StudioDossierDraft, StudioDraftBundle, FieldValidationError } from '../../../types/adminStudio';
import type { DossierDomain, LegalProceedingStatus } from '../../../types/dossier';
import type { EditorialStatus, VerificationStatus } from '../../../types/archive';
import { ALL_ARCHIVAL_DOSSIERS } from '../../../data/dossiers/dossiersData';
import { generateStableId, validateDossierDraft } from '../../../utils/adminStudioStorage';
import { Save, CheckCircle, AlertTriangle, RefreshCw, FileText, Plus, Trash2, Eye } from 'lucide-react';

interface DossierEditorProps {
  bundle: StudioDraftBundle;
  onSaveDossier: (draft: StudioDossierDraft, reason: string) => void;
  language: 'en' | 'ur';
  selectedId?: string;
}

const DEFAULT_DOSSIER: StudioDossierDraft = {
  id: '',
  slug: '',
  title: { en: '', ur: '' },
  overview: { en: '', ur: '' },
  domain: 'constitutional_legal',
  tags: [],
  eventDate: '',
  location: { en: 'Pakistan', ur: 'پاکستان' },
  editorialStatus: 'draft',
  legalProceedingStatus: 'unknown',
  verificationStatus: 'unverified',
  hasActiveReportingBan: false,
  pendingProceedingsNotice: { en: '', ur: '' },
  lastLegalStatusChecked: new Date().toISOString().split('T')[0],
  privacyReview: {
    hasSensitivePersonalData: false,
    piiRedacted: true,
    allegationsDistinguishedFromFindings: true,
    officialDenialsIncluded: true,
    riskAssessment: 'low',
    reviewerNotes: '',
  },
  unresolvedQuestions: [],
  isNewRecord: true,
};

export const DossierEditor: React.FC<DossierEditorProps> = ({ bundle, onSaveDossier, language, selectedId }) => {
  const [form, setForm] = useState<StudioDossierDraft>(DEFAULT_DOSSIER);
  const [tagInput, setTagInput] = useState('');
  const [unresolvedEn, setUnresolvedEn] = useState('');
  const [unresolvedUr, setUnresolvedUr] = useState('');
  const [reasonForChange, setReasonForChange] = useState('');
  const [validationErrors, setValidationErrors] = useState<FieldValidationError[]>([]);
  const [showPreview, setShowPreview] = useState(false);
  const [saveSuccessMsg, setSaveSuccessMsg] = useState<string | null>(null);

  // Auto-load record when selectedId prop changes (e.g. from Review Queue edit button)
  React.useEffect(() => {
    if (selectedId) {
      handleSelectExisting(selectedId);
    }
  }, [selectedId]);

  // Existing dossiers from canonical data + draft bundle
  const existingDossierMap = new Map<string, { titleEn: string; isDraft: boolean }>();
  for (const d of ALL_ARCHIVAL_DOSSIERS) {
    existingDossierMap.set(d.id, { titleEn: d.title.en, isDraft: false });
  }
  for (const d of bundle.dossiers) {
    existingDossierMap.set(d.id, { titleEn: d.title.en, isDraft: true });
  }

  const handleSelectExisting = (id: string) => {
    if (!id) {
      setForm(DEFAULT_DOSSIER);
      setValidationErrors([]);
      return;
    }

    // Check draft first
    const draftMatch = bundle.dossiers.find(d => d.id === id);
    if (draftMatch) {
      setForm({ ...draftMatch, isNewRecord: false });
      setValidationErrors([]);
      return;
    }

    // Check canonical
    const canon = ALL_ARCHIVAL_DOSSIERS.find(d => d.id === id);
    if (canon) {
      setForm({
        id: canon.id,
        slug: canon.slug,
        title: { en: canon.title.en, ur: canon.title.ur },
        overview: { en: canon.overview.en, ur: canon.overview.ur },
        domain: canon.domain,
        tags: [],
        eventDate: canon.chronology[0]?.date || '',
        location: canon.chronology[0]?.location || { en: 'Pakistan', ur: 'پاکستان' },
        editorialStatus: canon.editorialStatus,
        legalProceedingStatus: canon.legalProceedingStatus || 'concluded',
        verificationStatus: canon.verificationStatus,
        hasActiveReportingBan: canon.hasActiveReportingBan || false,
        pendingProceedingsNotice: canon.pendingProceedingsNotice || { en: '', ur: '' },
        lastLegalStatusChecked: canon.lastLegalStatusChecked || new Date().toISOString().split('T')[0],
        privacyReview: {
          hasSensitivePersonalData: canon.privacyReview.hasSensitivePersonalData,
          piiRedacted: canon.privacyReview.piiRedacted,
          allegationsDistinguishedFromFindings: canon.privacyReview.allegationsDistinguishedFromFindings,
          officialDenialsIncluded: canon.privacyReview.officialDenialsIncluded,
          riskAssessment: canon.privacyReview.riskAssessment,
          reviewerNotes: canon.privacyReview.reviewerNotes || '',
        },
        unresolvedQuestions: canon.unresolvedQuestions || [],
        isNewRecord: false,
      });
      setValidationErrors([]);
    }
  };

  const handleGenerateId = () => {
    const seed = form.title.en || form.slug || 'dossier';
    const allIds = new Set(existingDossierMap.keys());
    const newId = generateStableId('dos', seed, allIds);
    const newSlug = seed
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
    setForm(prev => ({
      ...prev,
      id: newId,
      slug: prev.slug || newSlug,
    }));
  };

  const handleAddTag = () => {
    if (tagInput.trim() && !form.tags.includes(tagInput.trim())) {
      setForm(prev => ({ ...prev, tags: [...prev.tags, tagInput.trim()] }));
      setTagInput('');
    }
  };

  const handleRemoveTag = (tag: string) => {
    setForm(prev => ({ ...prev, tags: prev.tags.filter(t => t !== tag) }));
  };

  const handleAddUnresolved = () => {
    if (unresolvedEn.trim() && unresolvedUr.trim()) {
      setForm(prev => ({
        ...prev,
        unresolvedQuestions: [
          ...prev.unresolvedQuestions,
          { en: unresolvedEn.trim(), ur: unresolvedUr.trim() },
        ],
      }));
      setUnresolvedEn('');
      setUnresolvedUr('');
    }
  };

  const handleValidate = () => {
    const allIds = new Set(existingDossierMap.keys());
    const allSlugs = new Set(ALL_ARCHIVAL_DOSSIERS.map(d => d.slug));
    const result = validateDossierDraft(form, allIds, allSlugs);
    setValidationErrors(result.errors);
    return result;
  };

  const handleSave = () => {
    const val = handleValidate();
    if (!val.isValid) {
      setSaveSuccessMsg(null);
      return;
    }
    onSaveDossier(form, reasonForChange.trim() || (form.isNewRecord ? 'Created new dossier draft' : 'Updated dossier metadata'));
    setSaveSuccessMsg(language === 'ur' ? 'ڈرافٹ کامیابی سے مقامی اسٹوریج میں محفوظ کر لیا گیا۔' : 'Dossier draft successfully saved to local review queue.');
    setTimeout(() => setSaveSuccessMsg(null), 4000);
  };

  const isSubJudice = ['ongoing', 'pending_appeal', 'stayed', 'under_investigation', 'unresolved'].includes(
    form.legalProceedingStatus
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      {/* Top Selector & Quick Action Bar */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem',
          backgroundColor: 'var(--bg-surface)',
          padding: '1rem 1.25rem',
          borderRadius: 'var(--radius-md)',
          border: '1px solid var(--border-subtle)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flex: '1 1 320px' }}>
          <FileText size={18} color="var(--accent-gold)" />
          <span style={{ fontSize: '0.88rem', fontWeight: 600, color: '#E2E8F0' }}>
            {language === 'ur' ? 'موجودہ فائل لوڈ کریں:' : 'Load Existing Dossier:'}
          </span>
          <select
            value={form.id}
            onChange={e => handleSelectExisting(e.target.value)}
            style={{
              flex: 1,
              padding: '0.45rem 0.65rem',
              borderRadius: 'var(--radius-sm)',
              backgroundColor: 'var(--bg-dark)',
              border: '1px solid var(--border-subtle)',
              color: '#F8FAFC',
              fontSize: '0.85rem',
            }}
          >
            <option value="">{language === 'ur' ? '-- نئی فائل بنائیں --' : '-- Create New Dossier --'}</option>
            {Array.from(existingDossierMap.entries()).map(([id, info]) => (
              <option key={id} value={id}>
                {id} {info.isDraft ? '[LOCAL DRAFT]' : ''} — {info.titleEn.slice(0, 45)}...
              </option>
            ))}
          </select>
          {form.id && (
            <button
              onClick={() => handleSelectExisting('')}
              className="btn btn-secondary btn-sm"
              title="Reset to blank new dossier form"
              style={{ fontSize: '0.78rem', whiteSpace: 'nowrap' }}
            >
              <RefreshCw size={13} />
              <span>{language === 'ur' ? 'نیا فارم' : 'New / Reset'}</span>
            </button>
          )}
        </div>

        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button
            onClick={() => setShowPreview(!showPreview)}
            className="btn btn-secondary btn-sm"
            style={{ fontSize: '0.8rem' }}
          >
            <Eye size={14} />
            <span>{showPreview ? (language === 'ur' ? 'فارم پر واپس' : 'Hide Preview') : (language === 'ur' ? 'پیش منظر' : 'Live Preview')}</span>
          </button>
          <button
            onClick={handleValidate}
            className="btn btn-secondary btn-sm"
            style={{ fontSize: '0.8rem' }}
          >
            <CheckCircle size={14} />
            <span>{language === 'ur' ? 'توثیق کریں' : 'Validate'}</span>
          </button>
          <button
            onClick={handleSave}
            className="btn btn-primary btn-sm"
            style={{ fontSize: '0.8rem' }}
          >
            <Save size={14} />
            <span>{language === 'ur' ? 'ڈرافٹ محفوظ کریں' : 'Save Draft'}</span>
          </button>
        </div>
      </div>

      {saveSuccessMsg && (
        <div
          style={{
            backgroundColor: 'rgba(16, 185, 129, 0.15)',
            border: '1px solid rgba(16, 185, 129, 0.3)',
            borderRadius: 'var(--radius-md)',
            padding: '0.75rem 1rem',
            color: '#10B981',
            fontSize: '0.85rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
          }}
        >
          <CheckCircle size={16} />
          <span>{saveSuccessMsg}</span>
        </div>
      )}

      {/* Validation Errors Box */}
      {validationErrors.length > 0 && (
        <div
          style={{
            backgroundColor: 'rgba(239, 68, 68, 0.1)',
            border: '1px solid rgba(239, 68, 68, 0.3)',
            borderRadius: 'var(--radius-md)',
            padding: '1rem',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem', color: '#EF4444' }}>
            <AlertTriangle size={18} />
            <strong style={{ fontSize: '0.9rem' }}>
              {language === 'ur' ? 'درج ذیل خامیوں کو درست کریں:' : 'Field Validation Issues Found:'}
            </strong>
          </div>
          <ul style={{ margin: 0, paddingLeft: '1.25rem', fontSize: '0.82rem', color: '#FCA5A5' }}>
            {validationErrors.map((err, idx) => (
              <li key={idx} style={{ marginBottom: '0.25rem' }}>
                <strong>{err.field}</strong>: {language === 'ur' ? err.messageUr : err.messageEn}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Live Preview Mode */}
      {showPreview ? (
        <div
          style={{
            backgroundColor: 'var(--bg-surface)',
            border: '1px solid var(--border-subtle)',
            borderRadius: 'var(--radius-lg)',
            padding: '1.5rem',
          }}
        >
          <h3 style={{ color: 'var(--accent-gold)', marginBottom: '0.5rem' }}>
            {form.title.en || 'Untitled Dossier'}
          </h3>
          <h4 style={{ color: '#94A3B8', direction: 'rtl', marginBottom: '1rem' }}>
            {form.title.ur || 'بغیر عنوان فائل'}
          </h4>
          <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
            <span style={{ fontSize: '0.75rem', padding: '0.2rem 0.5rem', borderRadius: '4px', backgroundColor: 'rgba(56, 189, 248, 0.15)', color: '#38BDF8' }}>
              ID: {form.id || 'N/A'}
            </span>
            <span style={{ fontSize: '0.75rem', padding: '0.2rem 0.5rem', borderRadius: '4px', backgroundColor: 'rgba(245, 158, 11, 0.15)', color: '#F59E0B' }}>
              Legal: {form.legalProceedingStatus}
            </span>
            <span style={{ fontSize: '0.75rem', padding: '0.2rem 0.5rem', borderRadius: '4px', backgroundColor: 'rgba(16, 185, 129, 0.15)', color: '#10B981' }}>
              Editorial: {form.editorialStatus}
            </span>
          </div>
          {form.pendingProceedingsNotice?.en && (
            <div style={{ backgroundColor: 'rgba(245, 158, 11, 0.12)', border: '1px solid rgba(245, 158, 11, 0.3)', padding: '0.75rem', borderRadius: '6px', marginBottom: '1rem', fontSize: '0.85rem' }}>
              <strong>Sub Judice Notice:</strong> {form.pendingProceedingsNotice.en}
            </div>
          )}
          <p style={{ color: '#E2E8F0', fontSize: '0.9rem', lineHeight: 1.6 }}>{form.overview.en}</p>
          <p style={{ color: '#CBD5E1', fontSize: '0.95rem', lineHeight: 1.8, direction: 'rtl' }}>{form.overview.ur}</p>
        </div>
      ) : (
        /* Edit Form */
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {/* Section 1: ID, Slug, Domain */}
          <div
            style={{
              backgroundColor: 'var(--bg-surface)',
              border: '1px solid var(--border-subtle)',
              borderRadius: 'var(--radius-md)',
              padding: '1.25rem',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '1rem',
            }}
          >
            <div>
              <label className="form-label" style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Dossier ID *</span>
                <button
                  type="button"
                  onClick={handleGenerateId}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: 'var(--accent-gold)',
                    cursor: 'pointer',
                    fontSize: '0.75rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.25rem',
                  }}
                >
                  <RefreshCw size={11} /> Auto-Generate
                </button>
              </label>
              <input
                type="text"
                className="form-input"
                value={form.id}
                onChange={e => setForm({ ...form, id: e.target.value.toLowerCase().trim() })}
                placeholder="e.g. dos-pk-legal-military-courts-2023"
              />
            </div>

            <div>
              <label className="form-label">Routing Slug *</label>
              <input
                type="text"
                className="form-input"
                value={form.slug}
                onChange={e => setForm({ ...form, slug: e.target.value.toLowerCase().trim() })}
                placeholder="e.g. supreme-court-rulings-military-courts-civilians-2023"
              />
            </div>

            <div>
              <label className="form-label">Archival Domain *</label>
              <select
                className="form-input"
                value={form.domain}
                onChange={e => setForm({ ...form, domain: e.target.value as DossierDomain })}
              >
                <option value="constitutional_legal">Constitutional & Legal</option>
                <option value="major_public_events">Major Public Events</option>
                <option value="journalism_press_freedom">Journalism & Press Freedom</option>
                <option value="historical_institutional">Historical & Institutional</option>
                <option value="energy_public_finance">Energy & Public Finance</option>
                <option value="due_process_rights">Due Process & Civil Rights</option>
              </select>
            </div>
          </div>

          {/* Section 2: Bilingual Titles & Summaries */}
          <div
            style={{
              backgroundColor: 'var(--bg-surface)',
              border: '1px solid var(--border-subtle)',
              borderRadius: 'var(--radius-md)',
              padding: '1.25rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem',
            }}
          >
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1rem' }}>
              <div>
                <label className="form-label">Title (English) *</label>
                <input
                  type="text"
                  className="form-input"
                  dir="ltr"
                  value={form.title.en}
                  onChange={e => setForm({ ...form, title: { ...form.title, en: e.target.value } })}
                  placeholder="Official title in English..."
                />
              </div>

              <div>
                <label className="form-label" style={{ textAlign: 'right', display: 'block' }}>
                  (اردو) عنوان *
                </label>
                <input
                  type="text"
                  className="form-input"
                  dir="rtl"
                  value={form.title.ur}
                  onChange={e => setForm({ ...form, title: { ...form.title, ur: e.target.value } })}
                  placeholder="سرکاری عنوان اردو میں..."
                />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1rem' }}>
              <div>
                <label className="form-label">Overview & Scope (English) *</label>
                <textarea
                  className="form-input"
                  dir="ltr"
                  rows={4}
                  value={form.overview.en}
                  onChange={e => setForm({ ...form, overview: { ...form.overview, en: e.target.value } })}
                  placeholder="Objective summary of the legal proceeding or public event..."
                />
              </div>

              <div>
                <label className="form-label" style={{ textAlign: 'right', display: 'block' }}>
                  (اردو) خلاصہ و حدود *
                </label>
                <textarea
                  className="form-input"
                  dir="rtl"
                  rows={4}
                  value={form.overview.ur}
                  onChange={e => setForm({ ...form, overview: { ...form.overview, ur: e.target.value } })}
                  placeholder="واقعے یا قانونی کارروائی کا غیر جانبدارانہ خلاصہ..."
                />
              </div>
            </div>
          </div>

          {/* Section 3: Legal Status, Editorial Status, Sub Judice Disclosure */}
          <div
            style={{
              backgroundColor: 'var(--bg-surface)',
              border: '1px solid var(--border-subtle)',
              borderRadius: 'var(--radius-md)',
              padding: '1.25rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem',
            }}
          >
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
              <div>
                <label className="form-label">Legal Proceeding Status *</label>
                <select
                  className="form-input"
                  value={form.legalProceedingStatus}
                  onChange={e => setForm({ ...form, legalProceedingStatus: e.target.value as LegalProceedingStatus })}
                >
                  <option value="concluded">concluded (Final Order)</option>
                  <option value="ongoing">ongoing (Active Trial)</option>
                  <option value="pending_appeal">pending_appeal (Under Appeal)</option>
                  <option value="stayed">stayed (Interim Order Stay)</option>
                  <option value="under_investigation">under_investigation (Inquiry)</option>
                  <option value="unresolved">unresolved (No Inquiry)</option>
                  <option value="unknown">unknown (Unverified Status)</option>
                </select>
              </div>

              <div>
                <label className="form-label">Editorial Status *</label>
                <select
                  className="form-input"
                  value={form.editorialStatus}
                  onChange={e => setForm({ ...form, editorialStatus: e.target.value as EditorialStatus })}
                >
                  <option value="draft">draft</option>
                  <option value="in_review">in_review</option>
                  <option value="approved">approved (Pending Merge)</option>
                  <option value="published">published</option>
                  <option value="revision_requested">revision_requested</option>
                  <option value="withdrawn">withdrawn</option>
                  <option value="rejected">rejected</option>
                </select>
              </div>

              <div>
                <label className="form-label">Verification Tier *</label>
                <select
                  className="form-input"
                  value={form.verificationStatus}
                  onChange={e => setForm({ ...form, verificationStatus: e.target.value as VerificationStatus })}
                >
                  <option value="unverified">unverified</option>
                  <option value="partially_verified">partially_verified</option>
                  <option value="verified">verified</option>
                  <option value="disputed">disputed</option>
                </select>
              </div>

              <div>
                <label className="form-label">Last Legal Docket Check *</label>
                <input
                  type="date"
                  className="form-input"
                  value={form.lastLegalStatusChecked}
                  onChange={e => setForm({ ...form, lastLegalStatusChecked: e.target.value })}
                />
              </div>
            </div>

            {/* Active Gag Order Toggle */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.5rem 0' }}>
              <input
                type="checkbox"
                id="gag-order-check"
                checked={form.hasActiveReportingBan}
                onChange={e => setForm({ ...form, hasActiveReportingBan: e.target.checked })}
              />
              <label htmlFor="gag-order-check" style={{ fontSize: '0.85rem', color: '#EF4444', fontWeight: 500 }}>
                Active Court Reporting Ban / Gag Order exists (Hard Publication Blocker)
              </label>
            </div>

            {/* Sub Judice Notice Required if not concluded */}
            {isSubJudice && (
              <div
                style={{
                  backgroundColor: 'rgba(245, 158, 11, 0.08)',
                  border: '1px solid rgba(245, 158, 11, 0.25)',
                  borderRadius: 'var(--radius-sm)',
                  padding: '1rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.75rem',
                }}
              >
                <div style={{ fontSize: '0.82rem', fontWeight: 600, color: '#F59E0B' }}>
                  Mandatory Sub Judice Pending Proceedings Disclosure Notice:
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '0.75rem' }}>
                  <input
                    type="text"
                    className="form-input"
                    dir="ltr"
                    value={form.pendingProceedingsNotice?.en || ''}
                    onChange={e =>
                      setForm({
                        ...form,
                        pendingProceedingsNotice: {
                          en: e.target.value,
                          ur: form.pendingProceedingsNotice?.ur || '',
                        },
                      })
                    }
                    placeholder="Notice of Ongoing Proceedings (English)..."
                  />
                  <input
                    type="text"
                    className="form-input"
                    dir="rtl"
                    value={form.pendingProceedingsNotice?.ur || ''}
                    onChange={e =>
                      setForm({
                        ...form,
                        pendingProceedingsNotice: {
                          en: form.pendingProceedingsNotice?.en || '',
                          ur: e.target.value,
                        },
                      })
                    }
                    placeholder="زیرِ سماعت کارروائی کا نوٹس (اردو)..."
                  />
                </div>
              </div>
            )}
          </div>

          {/* Section 4: Privacy Review & Unresolved Questions */}
          <div
            style={{
              backgroundColor: 'var(--bg-surface)',
              border: '1px solid var(--border-subtle)',
              borderRadius: 'var(--radius-md)',
              padding: '1.25rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem',
            }}
          >
            <h4 style={{ fontSize: '0.92rem', color: 'var(--accent-gold)', margin: 0 }}>Privacy & Evidentiary Safeguards</h4>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '0.75rem' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.82rem', color: '#E2E8F0' }}>
                <input
                  type="checkbox"
                  checked={form.privacyReview.hasSensitivePersonalData}
                  onChange={e =>
                    setForm({
                      ...form,
                      privacyReview: { ...form.privacyReview, hasSensitivePersonalData: e.target.checked },
                    })
                  }
                />
                Contains Sensitive Personal Data
              </label>

              <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.82rem', color: '#E2E8F0' }}>
                <input
                  type="checkbox"
                  checked={form.privacyReview.piiRedacted}
                  onChange={e =>
                    setForm({
                      ...form,
                      privacyReview: { ...form.privacyReview, piiRedacted: e.target.checked },
                    })
                  }
                />
                PII Redacted (CNIC, Addresses, Bystanders)
              </label>

              <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.82rem', color: '#E2E8F0' }}>
                <input
                  type="checkbox"
                  checked={form.privacyReview.allegationsDistinguishedFromFindings}
                  onChange={e =>
                    setForm({
                      ...form,
                      privacyReview: {
                        ...form.privacyReview,
                        allegationsDistinguishedFromFindings: e.target.checked,
                      },
                    })
                  }
                />
                Allegations Separated from Findings
              </label>
            </div>

            <div>
              <label className="form-label">Reviewer Notes & Privacy Caveats</label>
              <input
                type="text"
                className="form-input"
                value={form.privacyReview.reviewerNotes || ''}
                onChange={e =>
                  setForm({
                    ...form,
                    privacyReview: { ...form.privacyReview, reviewerNotes: e.target.value },
                  })
                }
                placeholder="Notes on privacy redactions, high court record inspection, etc."
              />
            </div>

            {/* Tags Input */}
            <div>
              <label className="form-label">Tags / Categorical Keywords</label>
              <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem' }}>
                <input
                  type="text"
                  className="form-input"
                  value={tagInput}
                  onChange={e => setTagInput(e.target.value)}
                  placeholder="e.g. military-courts, supreme-court"
                  style={{ flex: 1 }}
                />
                <button
                  type="button"
                  onClick={handleAddTag}
                  className="btn btn-secondary btn-sm"
                >
                  <Plus size={14} /> Add Tag
                </button>
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                {form.tags.map(tag => (
                  <span
                    key={tag}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.35rem',
                      padding: '0.2rem 0.5rem',
                      borderRadius: '4px',
                      backgroundColor: 'rgba(245, 158, 11, 0.15)',
                      color: '#F59E0B',
                      fontSize: '0.78rem',
                    }}
                  >
                    #{tag}
                    <button
                      type="button"
                      onClick={() => handleRemoveTag(tag)}
                      style={{ background: 'none', border: 'none', color: '#CBD5E1', cursor: 'pointer', padding: 0 }}
                    >
                      <Trash2 size={11} />
                    </button>
                  </span>
                ))}
              </div>
            </div>

            {/* Unresolved Questions Input */}
            <div>
              <label className="form-label">Unresolved Questions & Disclosed Gaps</label>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '0.5rem' }}>
                <input
                  type="text"
                  className="form-input"
                  dir="ltr"
                  value={unresolvedEn}
                  onChange={e => setUnresolvedEn(e.target.value)}
                  placeholder="Unresolved question in English..."
                />
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <input
                    type="text"
                    className="form-input"
                    dir="rtl"
                    value={unresolvedUr}
                    onChange={e => setUnresolvedUr(e.target.value)}
                    placeholder="غیر حل شدہ سوال (اردو)..."
                    style={{ flex: 1 }}
                  />
                  <button
                    type="button"
                    onClick={handleAddUnresolved}
                    className="btn btn-secondary btn-sm"
                  >
                    <Plus size={14} /> Add Question
                  </button>
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                {form.unresolvedQuestions.map((q, idx) => (
                  <div
                    key={idx}
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      padding: '0.35rem 0.65rem',
                      borderRadius: '4px',
                      backgroundColor: 'rgba(15, 23, 42, 0.4)',
                      border: '1px solid var(--border-subtle)',
                      fontSize: '0.78rem',
                    }}
                  >
                    <span>{q.en} / {q.ur}</span>
                    <button
                      type="button"
                      onClick={() =>
                        setForm(prev => ({
                          ...prev,
                          unresolvedQuestions: prev.unresolvedQuestions.filter((_, i) => i !== idx),
                        }))
                      }
                      style={{ background: 'none', border: 'none', color: '#EF4444', cursor: 'pointer' }}
                    >
                      <Trash2 size={12} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <label className="form-label">Reason for Proposal / Audit Trail Summary *</label>
              <input
                type="text"
                className="form-input"
                value={reasonForChange}
                onChange={e => setReasonForChange(e.target.value)}
                placeholder="e.g. Updated chronology with Supreme Court 2024 order sheet; added sub judice disclosure."
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
