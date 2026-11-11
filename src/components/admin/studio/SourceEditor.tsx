/**
 * INSAF ARCHIVE (انصاف آرکائیو)
 * Source Editor Component — Admin Editorial Studio
 * Primary source verification, URL validation, authenticity & privacy warning enforcement
 */

import React, { useState } from 'react';
import type { StudioSourceDraft, StudioDraftBundle, FieldValidationError } from '../../../types/adminStudio';
import type { SourceType } from '../../../types/archive';
import { ALL_ARCHIVAL_DOSSIERS } from '../../../data/dossiers/dossiersData';
import { generateStableId, validateSourceDraft } from '../../../utils/adminStudioStorage';
import { Save, CheckCircle, AlertTriangle, RefreshCw, FileText, Eye, ShieldAlert } from 'lucide-react';

interface SourceEditorProps {
  bundle: StudioDraftBundle;
  onSaveSource: (draft: StudioSourceDraft, reason: string) => void;
  language: 'en' | 'ur';
  selectedId?: string;
}

const DEFAULT_SOURCE: StudioSourceDraft = {
  sourceId: '',
  title: { en: '', ur: '' },
  publisherOrIssuingAuthority: '',
  sourceType: 'court_order',
  officialUrl: '',
  archivedUrl: '',
  localDocumentPath: '',
  publicationDate: '',
  judgmentDate: '',
  accessDate: new Date().toISOString().split('T')[0],
  pageNumber: '',
  paragraphNumber: '',
  exactReference: '',
  quotedOrSummarizedPassage: '',
  supportsClaim: [],
  limitations: '',
  sourceAvailability: 'accessible',
  authenticityStatus: 'official_document',
  reviewerNotes: '',
  isNewRecord: true,
};

export const SourceEditor: React.FC<SourceEditorProps> = ({ bundle, onSaveSource, language, selectedId }) => {
  const [form, setForm] = useState<StudioSourceDraft>(DEFAULT_SOURCE);
  const [reasonForChange, setReasonForChange] = useState('');
  const [validationErrors, setValidationErrors] = useState<FieldValidationError[]>([]);
  const [showPreview, setShowPreview] = useState(false);
  const [saveSuccessMsg, setSaveSuccessMsg] = useState<string | null>(null);

  // Auto-load record when selectedId prop changes
  React.useEffect(() => {
    if (selectedId) {
      handleSelectExisting(selectedId);
    }
  }, [selectedId]);

  // Available sources across canonical and drafts
  const existingSourceMap = new Map<string, { titleEn: string; isDraft: boolean }>();
  for (const d of ALL_ARCHIVAL_DOSSIERS) {
    if (d.sources) {
      for (const s of d.sources) {
        existingSourceMap.set(s.sourceId, { titleEn: s.title.en, isDraft: false });
      }
    }
  }
  for (const s of bundle.sources) {
    existingSourceMap.set(s.sourceId, { titleEn: s.title.en, isDraft: true });
  }

  const handleSelectExisting = (sourceId: string) => {
    if (!sourceId) {
      setForm(DEFAULT_SOURCE);
      setValidationErrors([]);
      return;
    }

    // Check draft first
    const draftMatch = bundle.sources.find(s => s.sourceId === sourceId);
    if (draftMatch) {
      setForm({ ...draftMatch, isNewRecord: false });
      setValidationErrors([]);
      return;
    }

    // Check canonical
    for (const d of ALL_ARCHIVAL_DOSSIERS) {
      const match = d.sources?.find(s => s.sourceId === sourceId);
      if (match) {
        setForm({
          sourceId: match.sourceId,
          dossierId: d.id,
          title: { en: match.title.en, ur: match.title.ur || match.title.en },
          publisherOrIssuingAuthority:
            typeof match.publisherOrIssuingAuthority === 'string'
              ? match.publisherOrIssuingAuthority
              : match.publisherOrIssuingAuthority?.en || match.publisher?.en || '',
          sourceType: match.sourceType,
          officialUrl: match.officialUrl || match.originalUrl || '',
          archivedUrl: match.archivedUrl || match.archiveUrl || '',
          localDocumentPath: match.localDocumentPath || '',
          publicationDate: match.publicationDate?.dateString || '',
          judgmentDate: typeof match.judgmentDate === 'string' ? match.judgmentDate : match.judgmentDate?.dateString || '',
          accessDate: match.accessDate || new Date().toISOString().split('T')[0],
          pageNumber: match.pageNumber ? String(match.pageNumber) : '',
          paragraphNumber: match.paragraphNumber ? String(match.paragraphNumber) : '',
          exactReference: match.documentIdentifier || match.pageOrParagraph || '',
          quotedOrSummarizedPassage:
            typeof match.quotedOrSummarizedPassage === 'string'
              ? match.quotedOrSummarizedPassage
              : match.quotedOrSummarizedPassage?.en || '',
          supportsClaim: match.supportsClaim || [],
          limitations: typeof match.limitations === 'string' ? match.limitations : match.limitations?.en || '',
          sourceAvailability: match.sourceAvailability || 'accessible',
          authenticityStatus: match.authenticityStatus || 'official_document',
          reviewerNotes: match.reviewerNotes || '',
          isNewRecord: false,
        });
        setValidationErrors([]);
        return;
      }
    }
  };

  const handleGenerateId = () => {
    const seed = form.title.en || form.publisherOrIssuingAuthority || 'source';
    const allIds = new Set(existingSourceMap.keys());
    const newId = generateStableId('src', seed, allIds);
    setForm(prev => ({ ...prev, sourceId: newId }));
  };

  const handleValidate = () => {
    const existingSourceIds = new Set(existingSourceMap.keys());
    const result = validateSourceDraft(form, existingSourceIds);
    setValidationErrors(result.errors);
    return result;
  };

  const handleSave = () => {
    const val = handleValidate();
    if (!val.isValid) {
      setSaveSuccessMsg(null);
      return;
    }
    onSaveSource(form, reasonForChange.trim() || (form.isNewRecord ? 'Created new primary source' : 'Updated source verification metadata'));
    setSaveSuccessMsg(language === 'ur' ? 'ماخذ کا ریکارڈ محفوظ ہو گیا۔' : 'Source record saved to local review queue.');
    setTimeout(() => setSaveSuccessMsg(null), 4000);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      {/* Top Selector Bar */}
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
            {language === 'ur' ? 'موجودہ ماخذ لوڈ کریں:' : 'Load Existing Source:'}
          </span>
          <select
            value={form.sourceId}
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
            <option value="">{language === 'ur' ? '-- نیا ماخذ شامل کریں --' : '-- Add New Source Record --'}</option>
            {Array.from(existingSourceMap.entries()).map(([id, info]) => (
              <option key={id} value={id}>
                {id} {info.isDraft ? '[DRAFT]' : ''} — {info.titleEn.slice(0, 50)}...
              </option>
            ))}
          </select>
          {form.sourceId && (
            <button
              onClick={() => handleSelectExisting('')}
              className="btn btn-secondary btn-sm"
              title="Reset to blank new source form"
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
            <span>{showPreview ? (language === 'ur' ? 'فارم' : 'Hide Preview') : (language === 'ur' ? 'پیش منظر' : 'Live Preview')}</span>
          </button>
          <button onClick={handleValidate} className="btn btn-secondary btn-sm" style={{ fontSize: '0.8rem' }}>
            <CheckCircle size={14} />
            <span>{language === 'ur' ? 'توثیق' : 'Validate'}</span>
          </button>
          <button onClick={handleSave} className="btn btn-primary btn-sm" style={{ fontSize: '0.8rem' }}>
            <Save size={14} />
            <span>{language === 'ur' ? 'محفوظ کریں' : 'Save Source'}</span>
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
              {language === 'ur' ? 'ماخذ کی توثیق میں خامی پائی گئی:' : 'Source Validation Issues Found:'}
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

      {/* Live Preview */}
      {showPreview ? (
        <div
          style={{
            backgroundColor: 'var(--bg-surface)',
            border: '1px solid var(--border-subtle)',
            borderRadius: 'var(--radius-lg)',
            padding: '1.5rem',
          }}
        >
          <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
            <span style={{ fontSize: '0.75rem', padding: '0.2rem 0.5rem', borderRadius: '4px', backgroundColor: 'rgba(56, 189, 248, 0.15)', color: '#38BDF8' }}>
              ID: {form.sourceId || 'N/A'}
            </span>
            <span style={{ fontSize: '0.75rem', padding: '0.2rem 0.5rem', borderRadius: '4px', backgroundColor: 'rgba(16, 185, 129, 0.15)', color: '#10B981' }}>
              Availability: {form.sourceAvailability}
            </span>
            <span style={{ fontSize: '0.75rem', padding: '0.2rem 0.5rem', borderRadius: '4px', backgroundColor: 'rgba(245, 158, 11, 0.15)', color: '#F59E0B' }}>
              Authenticity: {form.authenticityStatus}
            </span>
          </div>
          <h4 style={{ color: 'var(--accent-gold)', marginBottom: '0.35rem' }}>{form.title.en || 'Untitled Source'}</h4>
          <h5 style={{ color: '#94A3B8', direction: 'rtl', marginBottom: '0.75rem' }}>{form.title.ur}</h5>
          <p style={{ color: '#E2E8F0', fontSize: '0.85rem', margin: '0.25rem 0' }}>
            <strong>Publisher / Authority:</strong> {form.publisherOrIssuingAuthority}
          </p>
          {form.officialUrl && (
            <p style={{ color: '#38BDF8', fontSize: '0.85rem', margin: '0.25rem 0' }}>
              <strong>Official URL:</strong> <a href={form.officialUrl} target="_blank" rel="noopener noreferrer">{form.officialUrl}</a>
            </p>
          )}
          {form.quotedOrSummarizedPassage && (
            <blockquote style={{ borderLeft: '3px solid var(--accent-gold)', paddingLeft: '0.75rem', margin: '0.75rem 0', color: '#CBD5E1', fontSize: '0.85rem' }}>
              {form.quotedOrSummarizedPassage}
            </blockquote>
          )}
        </div>
      ) : (
        /* Edit Form */
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {/* Section 1: ID, Type, Publisher */}
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
                <span>Source ID *</span>
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
                value={form.sourceId}
                onChange={e => setForm({ ...form, sourceId: e.target.value.toLowerCase().trim() })}
                placeholder="e.g. src-sc-mil-courts-2023-order"
              />
            </div>

            <div>
              <label className="form-label">Source Instrument Type *</label>
              <select
                className="form-input"
                value={form.sourceType}
                onChange={e => setForm({ ...form, sourceType: e.target.value as SourceType })}
              >
                <option value="court_order">court_order (Interim / Short Order)</option>
                <option value="court_judgment">court_judgment (Final Reported Ruling)</option>
                <option value="police_fir">police_fir (First Information Report)</option>
                <option value="commission_report">commission_report (Inquiry Findings)</option>
                <option value="official_press_release">official_press_release (Institutional Release)</option>
                <option value="gazette_notification">gazette_notification (Statutory SRO / Gazette)</option>
                <option value="financial_audit">financial_audit (Audited Accounts / NEPRA)</option>
                <option value="investigative_journalism">investigative_journalism (Fact-Checked Article)</option>
                <option value="academic_paper">academic_paper (Peer-Reviewed Research)</option>
                <option value="unverified_claim">unverified_claim (Secondary Report)</option>
              </select>
            </div>

            <div>
              <label className="form-label">Publisher or Issuing Authority *</label>
              <input
                type="text"
                className="form-input"
                value={form.publisherOrIssuingAuthority}
                onChange={e => setForm({ ...form, publisherOrIssuingAuthority: e.target.value })}
                placeholder="e.g. Supreme Court of Pakistan"
              />
            </div>
          </div>

          {/* Section 2: Bilingual Titles */}
          <div
            style={{
              backgroundColor: 'var(--bg-surface)',
              border: '1px solid var(--border-subtle)',
              borderRadius: 'var(--radius-md)',
              padding: '1.25rem',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '1rem',
            }}
          >
            <div>
              <label className="form-label">Source Title (English) *</label>
              <input
                type="text"
                className="form-input"
                dir="ltr"
                value={form.title.en}
                onChange={e => setForm({ ...form, title: { ...form.title, en: e.target.value } })}
                placeholder="Exact title of the judgment, report, or gazette..."
              />
            </div>

            <div>
              <label className="form-label" style={{ textAlign: 'right', display: 'block' }}>
                (اردو) ماخذ کا عنوان
              </label>
              <input
                type="text"
                className="form-input"
                dir="rtl"
                value={form.title.ur}
                onChange={e => setForm({ ...form, title: { ...form.title, ur: e.target.value } })}
                placeholder="ماخذ یا دستاویز کا اردو عنوان..."
              />
            </div>
          </div>

          {/* Section 3: URLs & Local Document Privacy Warning */}
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
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
              <div>
                <label className="form-label">Official Portal URL (No fake/placeholder URLs)</label>
                <input
                  type="url"
                  className="form-input"
                  value={form.officialUrl || ''}
                  onChange={e => setForm({ ...form, officialUrl: e.target.value.trim() })}
                  placeholder="https://www.supremecourt.gov.pk/..."
                />
              </div>

              <div>
                <label className="form-label">Permanent Web Archive URL (Archive.org / Perma.cc)</label>
                <input
                  type="url"
                  className="form-input"
                  value={form.archivedUrl || ''}
                  onChange={e => setForm({ ...form, archivedUrl: e.target.value.trim() })}
                  placeholder="https://archive.org/details/..."
                />
              </div>
            </div>

            <div>
              <label className="form-label">Local / Relative Document Path</label>
              <input
                type="text"
                className="form-input"
                value={form.localDocumentPath || ''}
                onChange={e => setForm({ ...form, localDocumentPath: e.target.value })}
                placeholder="e.g. docs/judgments/sc-cp24-2023.pdf"
              />
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  marginTop: '0.4rem',
                  fontSize: '0.78rem',
                  color: '#F59E0B',
                }}
              >
                <ShieldAlert size={14} />
                <span>
                  Privacy Caution: Static site does not upload files. Ensure no private local paths with unredacted personal information are exported.
                </span>
              </div>
            </div>
          </div>

          {/* Section 4: Controlled Availability & Authenticity */}
          <div
            style={{
              backgroundColor: 'var(--bg-surface)',
              border: '1px solid var(--border-subtle)',
              borderRadius: 'var(--radius-md)',
              padding: '1.25rem',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: '1rem',
            }}
          >
            <div>
              <label className="form-label">Source Availability *</label>
              <select
                className="form-input"
                value={form.sourceAvailability}
                onChange={e => setForm({ ...form, sourceAvailability: e.target.value as any })}
              >
                <option value="accessible">accessible (Online at official site)</option>
                <option value="archived_copy_available">archived_copy_available (Archival snapshot verified)</option>
                <option value="unavailable">unavailable (Classified / Sealed)</option>
                <option value="broken_link">broken_link (URL broken; requires recovery)</option>
                <option value="not_checked">not_checked (Unverified in current cycle)</option>
              </select>
            </div>

            <div>
              <label className="form-label">Authenticity Status *</label>
              <select
                className="form-input"
                value={form.authenticityStatus}
                onChange={e => setForm({ ...form, authenticityStatus: e.target.value as any })}
              >
                <option value="official_document">official_document (Sovereign Act / Court Order)</option>
                <option value="publisher_verified">publisher_verified (Established Media Report)</option>
                <option value="corroborated">corroborated (Multiple Independent Sources)</option>
                <option value="unverified">unverified (Uncorroborated Allegation)</option>
                <option value="disputed">disputed (Challenged by Counter-Record)</option>
              </select>
            </div>

            <div>
              <label className="form-label">Access / Inspection Date *</label>
              <input
                type="date"
                className="form-input"
                value={form.accessDate}
                onChange={e => setForm({ ...form, accessDate: e.target.value })}
              />
            </div>
          </div>

          {/* Section 5: Passage, Limitations & Notes */}
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
            <div>
              <label className="form-label">Quoted Passage or Verbatim Summary</label>
              <textarea
                className="form-input"
                rows={3}
                value={form.quotedOrSummarizedPassage}
                onChange={e => setForm({ ...form, quotedOrSummarizedPassage: e.target.value })}
                placeholder="Verbatim text from court order, notification, or report proving the proposition..."
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
              <div>
                <label className="form-label">Limitations (What Source Does Not Prove)</label>
                <input
                  type="text"
                  className="form-input"
                  value={form.limitations}
                  onChange={e => setForm({ ...form, limitations: e.target.value })}
                  placeholder="e.g. Does not prove final trial verdict; interim short order only."
                />
              </div>

              <div>
                <label className="form-label">Reason for Proposal / Audit Trail *</label>
                <input
                  type="text"
                  className="form-input"
                  value={reasonForChange}
                  onChange={e => setReasonForChange(e.target.value)}
                  placeholder="e.g. Registered certified High Court writ petition judgment."
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
