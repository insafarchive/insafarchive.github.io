/**
 * INSAF ARCHIVE (انصاف آرکائیو)
 * Claim Editor Component — Admin Editorial Studio
 * Bilingual claim drafting, source linking, allegation guard & evidentiary limitation enforcement
 */

import React, { useState } from 'react';
import type { StudioClaimDraft, StudioDraftBundle, FieldValidationError } from '../../../types/adminStudio';
import type { ClaimClassification, ClaimVerificationState } from '../../../types/dossier';
import { ALL_ARCHIVAL_DOSSIERS } from '../../../data/dossiers/dossiersData';
import { CLAIM_SOURCE_AUDIT_DATA } from '../../../data/dossiers/dossierAudits';
import { generateStableId, validateClaimDraft } from '../../../utils/adminStudioStorage';
import { Save, CheckCircle, AlertTriangle, RefreshCw, FileText, Plus, X, Eye } from 'lucide-react';

interface ClaimEditorProps {
  bundle: StudioDraftBundle;
  onSaveClaim: (draft: StudioClaimDraft, reason: string) => void;
  language: 'en' | 'ur';
  selectedId?: string;
}

const DEFAULT_CLAIM: StudioClaimDraft = {
  claimId: '',
  dossierId: ALL_ARCHIVAL_DOSSIERS[0]?.id || '',
  statement: { en: '', ur: '' },
  claimClassification: 'documented_fact',
  verificationStatus: 'primary_source_supported',
  supportingSourceIds: [],
  contradictoryOrQualifyingSourceIds: [],
  whatEvidenceEstablishes: '',
  whatEvidenceDoesNotEstablish: '',
  reviewerNotes: '',
  lastReviewDate: new Date().toISOString().split('T')[0],
  isNewRecord: true,
};

export const ClaimEditor: React.FC<ClaimEditorProps> = ({ bundle, onSaveClaim, language, selectedId }) => {
  const [form, setForm] = useState<StudioClaimDraft>(DEFAULT_CLAIM);
  const [sourceInput, setSourceInput] = useState('');
  const [contraSourceInput, setContraSourceInput] = useState('');
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
    ...ALL_ARCHIVAL_DOSSIERS.map(d => ({ id: d.id, titleEn: d.title.en, isDraft: false })),
    ...bundle.dossiers.map(d => ({ id: d.id, titleEn: d.title.en, isDraft: true })),
  ];

  // Available sources across canonical and drafts
  const availableSourceMap = new Map<string, string>();
  for (const d of ALL_ARCHIVAL_DOSSIERS) {
    if (d.sources) {
      for (const s of d.sources) {
        availableSourceMap.set(s.sourceId, s.title.en);
      }
    }
  }
  for (const s of bundle.sources) {
    availableSourceMap.set(s.sourceId, `${s.title.en} [DRAFT]`);
  }

  // Available existing claims to edit
  const existingClaimMap = new Map<string, { textEn: string; isDraft: boolean }>();
  for (const c of CLAIM_SOURCE_AUDIT_DATA) {
    existingClaimMap.set(c.claimId, { textEn: c.exactStatement?.en || c.claimText?.en || '', isDraft: false });
  }
  for (const c of bundle.claims) {
    existingClaimMap.set(c.claimId, { textEn: c.statement.en, isDraft: true });
  }

  const handleSelectExisting = (claimId: string) => {
    if (!claimId) {
      setForm(DEFAULT_CLAIM);
      setValidationErrors([]);
      return;
    }

    // Check draft first
    const draftMatch = bundle.claims.find(c => c.claimId === claimId);
    if (draftMatch) {
      setForm({ ...draftMatch, isNewRecord: false });
      setValidationErrors([]);
      return;
    }

    // Check canonical
    const canon = CLAIM_SOURCE_AUDIT_DATA.find(c => c.claimId === claimId);
    if (canon) {
      setForm({
        claimId: canon.claimId,
        dossierId: canon.dossierId,
        statement: {
          en: canon.exactStatement?.en || canon.claimText?.en || '',
          ur: canon.exactStatement?.ur || canon.claimText?.ur || '',
        },
        claimClassification: (canon.claimClassification as ClaimClassification) || 'documented_fact',
        verificationStatus: (canon.verificationStatus as ClaimVerificationState) || 'primary_source_supported',
        supportingSourceIds: canon.supportingSourceIds ? [...canon.supportingSourceIds] : [],
        contradictoryOrQualifyingSourceIds: canon.contradictoryOrQualifyingSourceIds ? [...canon.contradictoryOrQualifyingSourceIds] : [],
        whatEvidenceEstablishes: canon.whatEvidenceEstablishes || canon.whatSourceSupports || '',
        whatEvidenceDoesNotEstablish: canon.whatEvidenceDoesNotEstablish || canon.whatSourceDoesNotEstablish || '',
        reviewerNotes: canon.reviewerNotes || '',
        lastReviewDate: canon.lastReviewDate || new Date().toISOString().split('T')[0],
        isNewRecord: false,
      });
      setValidationErrors([]);
    }
  };

  const handleGenerateId = () => {
    const seed = form.statement.en || 'claim';
    const allIds = new Set(existingClaimMap.keys());
    const newId = generateStableId('clm', seed, allIds);
    setForm(prev => ({ ...prev, claimId: newId }));
  };

  const handleAddSource = (sId: string) => {
    if (sId && !form.supportingSourceIds.includes(sId)) {
      setForm(prev => ({ ...prev, supportingSourceIds: [...prev.supportingSourceIds, sId] }));
    }
  };

  const handleRemoveSource = (sId: string) => {
    setForm(prev => ({ ...prev, supportingSourceIds: prev.supportingSourceIds.filter(id => id !== sId) }));
  };

  const handleAddContraSource = (sId: string) => {
    if (sId && !form.contradictoryOrQualifyingSourceIds.includes(sId)) {
      setForm(prev => ({
        ...prev,
        contradictoryOrQualifyingSourceIds: [...prev.contradictoryOrQualifyingSourceIds, sId],
      }));
    }
  };

  const handleRemoveContraSource = (sId: string) => {
    setForm(prev => ({
      ...prev,
      contradictoryOrQualifyingSourceIds: prev.contradictoryOrQualifyingSourceIds.filter(id => id !== sId),
    }));
  };

  const handleValidate = () => {
    const validDossierIds = new Set(dossierOptions.map(d => d.id));
    const validSourceIds = new Set(availableSourceMap.keys());
    const existingClaimIds = new Set(existingClaimMap.keys());
    const result = validateClaimDraft(form, validDossierIds, validSourceIds, existingClaimIds);
    setValidationErrors(result.errors);
    return result;
  };

  const handleSave = () => {
    const val = handleValidate();
    if (!val.isValid) {
      setSaveSuccessMsg(null);
      return;
    }
    onSaveClaim(form, reasonForChange.trim() || (form.isNewRecord ? 'Created new material claim' : 'Updated claim audit metadata'));
    setSaveSuccessMsg(language === 'ur' ? 'دعویٰ کامیابی سے محفوظ کر لیا گیا۔' : 'Claim draft saved to local review queue.');
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
            {language === 'ur' ? 'موجودہ دعویٰ لوڈ کریں:' : 'Load Existing Claim:'}
          </span>
          <select
            value={form.claimId}
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
            <option value="">{language === 'ur' ? '-- نیا دعویٰ بنائیں --' : '-- Create New Claim --'}</option>
            {Array.from(existingClaimMap.entries()).map(([id, info]) => (
              <option key={id} value={id}>
                {id} {info.isDraft ? '[DRAFT]' : ''} — {info.textEn.slice(0, 50)}...
              </option>
            ))}
          </select>
          {form.claimId && (
            <button
              onClick={() => handleSelectExisting('')}
              className="btn btn-secondary btn-sm"
              title="Reset to blank new claim form"
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
            <span>{language === 'ur' ? 'محفوظ کریں' : 'Save Claim'}</span>
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
              {language === 'ur' ? 'درج ذیل مسائل حل کریں:' : 'Claim Validation Issues Found:'}
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
              ID: {form.claimId || 'N/A'}
            </span>
            <span style={{ fontSize: '0.75rem', padding: '0.2rem 0.5rem', borderRadius: '4px', backgroundColor: 'rgba(245, 158, 11, 0.15)', color: '#F59E0B' }}>
              Classification: {form.claimClassification}
            </span>
            <span style={{ fontSize: '0.75rem', padding: '0.2rem 0.5rem', borderRadius: '4px', backgroundColor: 'rgba(16, 185, 129, 0.15)', color: '#10B981' }}>
              Verification: {form.verificationStatus}
            </span>
          </div>
          <p style={{ color: '#F8FAFC', fontSize: '0.95rem', fontWeight: 500, lineHeight: 1.6 }}>{form.statement.en}</p>
          <p style={{ color: '#E2E8F0', fontSize: '1rem', lineHeight: 1.8, direction: 'rtl' }}>{form.statement.ur}</p>
          <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '0.75rem', marginTop: '0.75rem', fontSize: '0.82rem', color: 'var(--text-muted)' }}>
            <div><strong>Establishes:</strong> {form.whatEvidenceEstablishes}</div>
            <div><strong>Does Not Establish:</strong> {form.whatEvidenceDoesNotEstablish}</div>
            <div><strong>Supporting Sources:</strong> {form.supportingSourceIds.join(', ') || 'None'}</div>
          </div>
        </div>
      ) : (
        /* Edit Form */
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {/* Identity & Parent Dossier */}
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
                <span>Claim ID *</span>
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
                value={form.claimId}
                onChange={e => setForm({ ...form, claimId: e.target.value.toLowerCase().trim() })}
                placeholder="e.g. clm-mil-courts-civilians-103"
              />
            </div>

            <div>
              <label className="form-label">Parent Dossier *</label>
              <select
                className="form-input"
                value={form.dossierId}
                onChange={e => setForm({ ...form, dossierId: e.target.value })}
              >
                {dossierOptions.map(d => (
                  <option key={d.id} value={d.id}>
                    {d.id} {d.isDraft ? '[DRAFT]' : ''} — {d.titleEn.slice(0, 40)}...
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Bilingual Claim Statements */}
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
              <label className="form-label">Exact Claim Statement (English) *</label>
              <textarea
                className="form-input"
                dir="ltr"
                rows={3}
                value={form.statement.en}
                onChange={e => setForm({ ...form, statement: { ...form.statement, en: e.target.value } })}
                placeholder="Clear factual proposition asserted in dossier narrative..."
              />
            </div>

            <div>
              <label className="form-label" style={{ textAlign: 'right', display: 'block' }}>
                (اردو) دعوے کا مکمل متن *
              </label>
              <textarea
                className="form-input"
                dir="rtl"
                rows={3}
                value={form.statement.ur}
                onChange={e => setForm({ ...form, statement: { ...form.statement, ur: e.target.value } })}
                placeholder="دستاویزی متن میں شامل دعویٰ کا مفہوم..."
              />
            </div>
          </div>

          {/* Classification & Verification State */}
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
              <label className="form-label">Claim Classification *</label>
              <select
                className="form-input"
                value={form.claimClassification}
                onChange={e => setForm({ ...form, claimClassification: e.target.value as ClaimClassification })}
              >
                <option value="judicial_finding">judicial_finding (Court Judgment / Decree)</option>
                <option value="commission_finding">commission_finding (Inquiry Commission Report)</option>
                <option value="official_position">official_position (Executive / Institutional Stance)</option>
                <option value="documented_fact">documented_fact (Undisputed Historical Fact)</option>
                <option value="reported_allegation">reported_allegation (Party Allegation)</option>
                <option value="contested_claim">contested_claim (Controverted Statement)</option>
                <option value="editorial_analysis">editorial_analysis (Contextual Legal Note)</option>
                <option value="unresolved_question">unresolved_question (Open Evidentiary Gap)</option>
              </select>
            </div>

            <div>
              <label className="form-label">Verification State *</label>
              <select
                className="form-input"
                value={form.verificationStatus}
                onChange={e => setForm({ ...form, verificationStatus: e.target.value as ClaimVerificationState })}
              >
                <option value="primary_source_supported">primary_source_supported (Direct Primary Record)</option>
                <option value="multiple_sources_corroborated">multiple_sources_corroborated (Independent Corroboration)</option>
                <option value="secondary_source_only">secondary_source_only (Media / Secondary Only)</option>
                <option value="partially_supported">partially_supported (Key Details Unverified)</option>
                <option value="contradicted">contradicted (Counter-Evidence Exists)</option>
                <option value="source_unavailable">source_unavailable (Classified / Withheld)</option>
                <option value="requires_human_review">requires_human_review (Sub Judice / Complex)</option>
              </select>
            </div>
          </div>

          {/* Supporting & Contradictory Source Linking */}
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
              <label className="form-label">Supporting Source IDs * (Must exist in registry)</label>
              <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem' }}>
                <select
                  className="form-input"
                  value={sourceInput}
                  onChange={e => setSourceInput(e.target.value)}
                  style={{ flex: 1 }}
                >
                  <option value="">-- Choose Supporting Source --</option>
                  {Array.from(availableSourceMap.entries()).map(([id, title]) => (
                    <option key={id} value={id}>
                      {id} — {title.slice(0, 50)}...
                    </option>
                  ))}
                </select>
                <button
                  type="button"
                  onClick={() => {
                    handleAddSource(sourceInput);
                    setSourceInput('');
                  }}
                  className="btn btn-secondary btn-sm"
                >
                  <Plus size={14} /> Add Source
                </button>
              </div>

              {/* Badges of selected sources */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                {form.supportingSourceIds.map(sId => (
                  <span
                    key={sId}
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
                    <code>{sId}</code>
                    <button
                      type="button"
                      onClick={() => handleRemoveSource(sId)}
                      style={{ background: 'none', border: 'none', color: '#94A3B8', cursor: 'pointer', padding: 0 }}
                    >
                      <X size={12} />
                    </button>
                  </span>
                ))}
              </div>
            </div>

            <div>
              <label className="form-label">Contradictory / Qualifying Sources (Mandatory Disclosure)</label>
              <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem' }}>
                <select
                  className="form-input"
                  value={contraSourceInput}
                  onChange={e => setContraSourceInput(e.target.value)}
                  style={{ flex: 1 }}
                >
                  <option value="">-- Choose Contradictory Source (if any) --</option>
                  {Array.from(availableSourceMap.entries()).map(([id, title]) => (
                    <option key={id} value={id}>
                      {id} — {title.slice(0, 50)}...
                    </option>
                  ))}
                </select>
                <button
                  type="button"
                  onClick={() => {
                    handleAddContraSource(contraSourceInput);
                    setContraSourceInput('');
                  }}
                  className="btn btn-secondary btn-sm"
                >
                  <Plus size={14} /> Add Qualifying Source
                </button>
              </div>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                {form.contradictoryOrQualifyingSourceIds.map(sId => (
                  <span
                    key={sId}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.35rem',
                      padding: '0.2rem 0.5rem',
                      borderRadius: '4px',
                      backgroundColor: 'rgba(239, 68, 68, 0.15)',
                      color: '#EF4444',
                      fontSize: '0.78rem',
                    }}
                  >
                    <code>{sId}</code>
                    <button
                      type="button"
                      onClick={() => handleRemoveContraSource(sId)}
                      style={{ background: 'none', border: 'none', color: '#94A3B8', cursor: 'pointer', padding: 0 }}
                    >
                      <X size={12} />
                    </button>
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Evidentiary Bounds */}
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
              <label className="form-label">What the Evidence Establishes *</label>
              <textarea
                className="form-input"
                rows={2}
                value={form.whatEvidenceEstablishes}
                onChange={e => setForm({ ...form, whatEvidenceEstablishes: e.target.value })}
                placeholder="Precise factual boundaries verified by cited sources..."
              />
            </div>

            <div>
              <label className="form-label">What the Evidence Does NOT Establish * (Limits of Claim)</label>
              <textarea
                className="form-input"
                rows={2}
                value={form.whatEvidenceDoesNotEstablish}
                onChange={e => setForm({ ...form, whatEvidenceDoesNotEstablish: e.target.value })}
                placeholder="Explicit disclosure of what remains unproven or contested..."
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
              <div>
                <label className="form-label">Reviewer Notes</label>
                <input
                  type="text"
                  className="form-input"
                  value={form.reviewerNotes}
                  onChange={e => setForm({ ...form, reviewerNotes: e.target.value })}
                  placeholder="Editorial commentary on source reliability or appeal status..."
                />
              </div>

              <div>
                <label className="form-label">Reason for Proposal / Audit Trail *</label>
                <input
                  type="text"
                  className="form-input"
                  value={reasonForChange}
                  onChange={e => setReasonForChange(e.target.value)}
                  placeholder="e.g. Added contradictory source reference to stay order."
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
