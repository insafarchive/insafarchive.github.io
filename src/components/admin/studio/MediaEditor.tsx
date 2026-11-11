/**
 * INSAF ARCHIVE (انصاف آرکائیو)
 * Media & Document Editor Component — Admin Editorial Studio
 * Metadata entry for court orders, inquiry reports, photographs, broadcasts & privacy guard
 */

import React, { useState } from 'react';
import type { StudioMediaDraft, StudioDraftBundle, FieldValidationError } from '../../../types/adminStudio';
import { ALL_ARCHIVAL_DOSSIERS } from '../../../data/dossiers/dossiersData';
import { CLAIM_SOURCE_AUDIT_DATA } from '../../../data/dossiers/dossierAudits';
import { generateStableId, validateMediaDraft } from '../../../utils/adminStudioStorage';
import { Save, CheckCircle, AlertTriangle, RefreshCw, FileText, Eye, ShieldAlert, Plus, X } from 'lucide-react';

interface MediaEditorProps {
  bundle: StudioDraftBundle;
  onSaveMedia: (draft: StudioMediaDraft, reason: string) => void;
  language: 'en' | 'ur';
  selectedId?: string;
}

const DEFAULT_MEDIA: StudioMediaDraft = {
  mediaId: '',
  title: { en: '', ur: '' },
  documentCategory: 'court_order',
  platformOrPublisher: '',
  originalUrl: '',
  archivedUrl: '',
  localDocumentPath: '',
  eventDate: '',
  publicationDate: '',
  dateAdded: new Date().toISOString().split('T')[0],
  associatedDossierId: ALL_ARCHIVAL_DOSSIERS[0]?.id || '',
  associatedClaimIds: [],
  rightsNotes: 'Public domain court record / Fair use educational archive',
  verificationStatus: 'verified',
  description: { en: '', ur: '' },
  isSensitivePersonalData: false,
  piiRedacted: true,
  privacyNotes: '',
  isNewRecord: true,
};

export const MediaEditor: React.FC<MediaEditorProps> = ({ bundle, onSaveMedia, language, selectedId }) => {
  const [form, setForm] = useState<StudioMediaDraft>(DEFAULT_MEDIA);
  const [claimInput, setClaimInput] = useState('');
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

  // Available dossiers
  const dossierOptions = [
    ...ALL_ARCHIVAL_DOSSIERS.map(d => ({ id: d.id, titleEn: d.title.en })),
    ...bundle.dossiers.map(d => ({ id: d.id, titleEn: `${d.title.en} [DRAFT]` })),
  ];

  // Available claims for selected dossier
  const relevantClaims = [
    ...CLAIM_SOURCE_AUDIT_DATA.filter(c => c.dossierId === form.associatedDossierId).map(c => ({
      claimId: c.claimId,
      statementEn: c.exactStatement?.en || c.claimText?.en || '',
    })),
    ...bundle.claims.filter(c => c.dossierId === form.associatedDossierId).map(c => ({
      claimId: c.claimId,
      statementEn: `${c.statement.en} [DRAFT]`,
    })),
  ];

  // Existing media items
  const existingMediaMap = new Map<string, { titleEn: string }>();
  for (const m of bundle.media) {
    existingMediaMap.set(m.mediaId, { titleEn: m.title.en });
  }

  const handleSelectExisting = (mediaId: string) => {
    if (!mediaId) {
      setForm(DEFAULT_MEDIA);
      setValidationErrors([]);
      return;
    }
    const match = bundle.media.find(m => m.mediaId === mediaId);
    if (match) {
      setForm({ ...match, isNewRecord: false });
      setValidationErrors([]);
    }
  };

  const handleGenerateId = () => {
    const seed = form.title.en || form.documentCategory || 'media';
    const allIds = new Set(existingMediaMap.keys());
    const newId = generateStableId('med', seed, allIds);
    setForm(prev => ({ ...prev, mediaId: newId }));
  };

  const handleAddClaim = (cId: string) => {
    if (cId && !form.associatedClaimIds.includes(cId)) {
      setForm(prev => ({ ...prev, associatedClaimIds: [...prev.associatedClaimIds, cId] }));
    }
  };

  const handleRemoveClaim = (cId: string) => {
    setForm(prev => ({ ...prev, associatedClaimIds: prev.associatedClaimIds.filter(id => id !== cId) }));
  };

  const handleValidate = () => {
    const validDossierIds = new Set(dossierOptions.map(d => d.id));
    const existingMediaIds = new Set(existingMediaMap.keys());
    const result = validateMediaDraft(form, validDossierIds, existingMediaIds);
    setValidationErrors(result.errors);
    return result;
  };

  const handleSave = () => {
    const val = handleValidate();
    if (!val.isValid) {
      setSaveSuccessMsg(null);
      return;
    }
    onSaveMedia(form, reasonForChange.trim() || (form.isNewRecord ? 'Created new media/document record' : 'Updated media metadata'));
    setSaveSuccessMsg(language === 'ur' ? 'میڈیا ریکارڈ محفوظ ہو گیا۔' : 'Media/document record saved to local review queue.');
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
            {language === 'ur' ? 'موجودہ میڈیا ریکارڈ لوڈ کریں:' : 'Load Existing Media Record:'}
          </span>
          <select
            value={form.mediaId}
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
            <option value="">{language === 'ur' ? '-- نیا میڈیا / دستاویز ریکارڈ --' : '-- Add New Media/Document --'}</option>
            {Array.from(existingMediaMap.entries()).map(([id, info]) => (
              <option key={id} value={id}>
                {id} — {info.titleEn.slice(0, 45)}...
              </option>
            ))}
          </select>
          {form.mediaId && (
            <button
              onClick={() => handleSelectExisting('')}
              className="btn btn-secondary btn-sm"
              title="Reset to blank new media form"
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
            <span>{language === 'ur' ? 'محفوظ کریں' : 'Save Media'}</span>
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
              {language === 'ur' ? 'میڈیا ریکارڈ کی توثیق میں خامی:' : 'Media Validation Issues Found:'}
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
              ID: {form.mediaId || 'N/A'}
            </span>
            <span style={{ fontSize: '0.75rem', padding: '0.2rem 0.5rem', borderRadius: '4px', backgroundColor: 'rgba(245, 158, 11, 0.15)', color: '#F59E0B' }}>
              Category: {form.documentCategory}
            </span>
            <span style={{ fontSize: '0.75rem', padding: '0.2rem 0.5rem', borderRadius: '4px', backgroundColor: 'rgba(16, 185, 129, 0.15)', color: '#10B981' }}>
              Status: {form.verificationStatus}
            </span>
          </div>
          <h4 style={{ color: 'var(--accent-gold)', marginBottom: '0.35rem' }}>{form.title.en || 'Untitled Media'}</h4>
          <h5 style={{ color: '#94A3B8', direction: 'rtl', marginBottom: '0.75rem' }}>{form.title.ur}</h5>
          <p style={{ color: '#E2E8F0', fontSize: '0.85rem', margin: '0.25rem 0' }}>
            <strong>Platform / Authority:</strong> {form.platformOrPublisher || 'N/A'}
          </p>
          <p style={{ color: '#CBD5E1', fontSize: '0.85rem', margin: '0.25rem 0' }}>
            <strong>Associated Dossier:</strong> {form.associatedDossierId}
          </p>
          {form.description?.en && (
            <p style={{ color: '#94A3B8', fontSize: '0.82rem', marginTop: '0.5rem' }}>{form.description.en}</p>
          )}
        </div>
      ) : (
        /* Edit Form */
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {/* Identity & Category */}
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
                <span>Media ID *</span>
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
                value={form.mediaId}
                onChange={e => setForm({ ...form, mediaId: e.target.value.toLowerCase().trim() })}
                placeholder="e.g. med-sc-mil-courts-order-pdf"
              />
            </div>

            <div>
              <label className="form-label">Document / Media Category *</label>
              <select
                className="form-input"
                value={form.documentCategory}
                onChange={e => setForm({ ...form, documentCategory: e.target.value as any })}
              >
                <option value="court_order">Court Order / Judgment Document</option>
                <option value="official_notification">Official Notification / SRO / Gazette</option>
                <option value="inquiry_report">Inquiry Report / Fact-Finding Dossier</option>
                <option value="document_pdf">Document PDF / Scanned Record</option>
                <option value="photograph">Photograph / Visual Evidence</option>
                <option value="video">Broadcast Video / Press Conference</option>
                <option value="interview_report">Interview / Recorded Statement</option>
              </select>
            </div>

            <div>
              <label className="form-label">Platform or Issuing Authority</label>
              <input
                type="text"
                className="form-input"
                value={form.platformOrPublisher}
                onChange={e => setForm({ ...form, platformOrPublisher: e.target.value })}
                placeholder="e.g. High Court Law Repository / PTV"
              />
            </div>
          </div>

          {/* Bilingual Titles */}
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
              <label className="form-label">Title (English) *</label>
              <input
                type="text"
                className="form-input"
                dir="ltr"
                value={form.title.en}
                onChange={e => setForm({ ...form, title: { ...form.title, en: e.target.value } })}
                placeholder="Title of photograph, certified PDF, or broadcast..."
              />
            </div>

            <div>
              <label className="form-label" style={{ textAlign: 'right', display: 'block' }}>
                (اردو) عنوان
              </label>
              <input
                type="text"
                className="form-input"
                dir="rtl"
                value={form.title.ur}
                onChange={e => setForm({ ...form, title: { ...form.title, ur: e.target.value } })}
                placeholder="دستاویز یا میڈیا کا اردو عنوان..."
              />
            </div>
          </div>

          {/* Associations: Parent Dossier & Claims */}
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
                <label className="form-label">Associated Dossier *</label>
                <select
                  className="form-input"
                  value={form.associatedDossierId}
                  onChange={e => setForm({ ...form, associatedDossierId: e.target.value, associatedClaimIds: [] })}
                >
                  {dossierOptions.map(d => (
                    <option key={d.id} value={d.id}>
                      {d.id} — {d.titleEn.slice(0, 45)}...
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="form-label">Link to Associated Material Claim</label>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <select
                    className="form-input"
                    value={claimInput}
                    onChange={e => setClaimInput(e.target.value)}
                    style={{ flex: 1 }}
                  >
                    <option value="">-- Select Material Claim --</option>
                    {relevantClaims.map(c => (
                      <option key={c.claimId} value={c.claimId}>
                        {c.claimId} — {c.statementEn.slice(0, 40)}...
                      </option>
                    ))}
                  </select>
                  <button
                    type="button"
                    onClick={() => {
                      handleAddClaim(claimInput);
                      setClaimInput('');
                    }}
                    className="btn btn-secondary btn-sm"
                  >
                    <Plus size={14} /> Link
                  </button>
                </div>
              </div>
            </div>

            {/* Selected Claim Badges */}
            {form.associatedClaimIds.length > 0 && (
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                {form.associatedClaimIds.map(cId => (
                  <span
                    key={cId}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.35rem',
                      padding: '0.2rem 0.5rem',
                      borderRadius: '4px',
                      backgroundColor: 'rgba(56, 189, 248, 0.15)',
                      color: '#38BDF8',
                      fontSize: '0.78rem',
                    }}
                  >
                    <code>{cId}</code>
                    <button
                      type="button"
                      onClick={() => handleRemoveClaim(cId)}
                      style={{ background: 'none', border: 'none', color: '#94A3B8', cursor: 'pointer', padding: 0 }}
                    >
                      <X size={12} />
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* URLs & Local Document Privacy Guard */}
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
                <label className="form-label">Original Online URL</label>
                <input
                  type="url"
                  className="form-input"
                  value={form.originalUrl || ''}
                  onChange={e => setForm({ ...form, originalUrl: e.target.value.trim() })}
                  placeholder="https://..."
                />
              </div>

              <div>
                <label className="form-label">Archived URL (Archive.org / Perma.cc)</label>
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
              <label className="form-label">Local File Path (Static Site Notice)</label>
              <input
                type="text"
                className="form-input"
                value={form.localDocumentPath || ''}
                onChange={e => setForm({ ...form, localDocumentPath: e.target.value })}
                placeholder="e.g. documents/notifications/sro-2023-order.pdf"
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
                  Honest Privacy & Security Notice: The static site cannot auto-upload local files to GitHub. Ensure no unredacted personal files or private machine paths are exported.
                </span>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
              <div>
                <label className="form-label">Rights / Copyright Notes</label>
                <input
                  type="text"
                  className="form-input"
                  value={form.rightsNotes || ''}
                  onChange={e => setForm({ ...form, rightsNotes: e.target.value })}
                  placeholder="e.g. Public domain court order / CC BY-SA"
                />
              </div>

              <div>
                <label className="form-label">Reason for Proposal / Audit Trail *</label>
                <input
                  type="text"
                  className="form-input"
                  value={reasonForChange}
                  onChange={e => setReasonForChange(e.target.value)}
                  placeholder="e.g. Added certified PDF metadata of 2023 Supreme Court short order."
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
