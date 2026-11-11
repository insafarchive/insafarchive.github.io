/**
 * INSAF ARCHIVE (انصاف آرکائیو)
 * Review Queue Component — Admin Editorial Studio
 * Tracks device-local drafts, validation statuses, and proposed changes before PR export
 */

import React, { useState } from 'react';
import type { StudioDraftBundle } from '../../../types/adminStudio';
import { Clock, AlertTriangle, CheckCircle, Trash2, Edit3, Filter, ShieldCheck } from 'lucide-react';

interface ReviewQueueViewProps {
  bundle: StudioDraftBundle;
  onSelectEdit: (recordType: 'dossier' | 'claim' | 'source' | 'media', recordId: string) => void;
  onRemoveQueueItem: (queueId: string) => void;
  onClearQueue: () => void;
  language: 'en' | 'ur';
}

export const ReviewQueueView: React.FC<ReviewQueueViewProps> = ({
  bundle,
  onSelectEdit,
  onRemoveQueueItem,
  onClearQueue,
  language,
}) => {
  const [filterType, setFilterType] = useState<string>('all');

  const filteredItems = bundle.queue.filter(item => {
    if (filterType === 'all') return true;
    return item.recordType === filterType;
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      {/* Honest Local Queue Banner */}
      <div
        style={{
          backgroundColor: 'rgba(56, 189, 248, 0.08)',
          border: '1px solid rgba(56, 189, 248, 0.25)',
          borderRadius: 'var(--radius-md)',
          padding: '1rem 1.25rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <ShieldCheck size={20} color="#38BDF8" />
          <div>
            <div style={{ fontSize: '0.88rem', fontWeight: 600, color: '#38BDF8' }}>
              {language === 'ur' ? 'مقامی ڈرافٹ و جانچ کی قطار' : 'Device-Local Editorial Review Queue'}
            </div>
            <div style={{ fontSize: '0.78rem', color: '#94A3B8' }}>
              {language === 'ur'
                ? 'یہ ریکارڈز صرف آپ کے براؤزر میں محفوظ ہیں۔ مرکزی آرکائیو میں اشاعت کے لیے گٹ ہب پل ریکویسٹ درکار ہے۔'
                : 'These proposals exist solely in your device LocalStorage. Repository publication requires GitHub PR review.'}
            </div>
          </div>
        </div>

        {bundle.queue.length > 0 && (
          <button
            onClick={() => {
              if (window.confirm('Clear all queued changes from device local storage? This cannot be undone.')) {
                onClearQueue();
              }
            }}
            className="btn btn-secondary btn-sm"
            style={{ fontSize: '0.78rem', color: '#EF4444', borderColor: 'rgba(239, 68, 68, 0.3)' }}
          >
            <Trash2 size={13} />
            <span>{language === 'ur' ? 'تمام ڈرافٹ صاف کریں' : 'Clear All Drafts'}</span>
          </button>
        )}
      </div>

      {/* Filter and Metrics Row */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '0.75rem',
          backgroundColor: 'var(--bg-surface)',
          padding: '0.75rem 1rem',
          borderRadius: 'var(--radius-md)',
          border: '1px solid var(--border-subtle)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.84rem' }}>
          <Filter size={15} color="var(--accent-gold)" />
          <span style={{ color: '#E2E8F0', fontWeight: 500 }}>Filter by Type:</span>
          <select
            value={filterType}
            onChange={e => setFilterType(e.target.value)}
            style={{
              padding: '0.3rem 0.6rem',
              borderRadius: 'var(--radius-sm)',
              backgroundColor: 'var(--bg-dark)',
              border: '1px solid var(--border-subtle)',
              color: '#F8FAFC',
              fontSize: '0.82rem',
            }}
          >
            <option value="all">All Proposed Records ({bundle.queue.length})</option>
            <option value="dossier">Dossiers ({bundle.queue.filter(i => i.recordType === 'dossier').length})</option>
            <option value="claim">Claims ({bundle.queue.filter(i => i.recordType === 'claim').length})</option>
            <option value="source">Sources ({bundle.queue.filter(i => i.recordType === 'source').length})</option>
            <option value="media">Media / Docs ({bundle.queue.filter(i => i.recordType === 'media').length})</option>
          </select>
        </div>

        <div style={{ display: 'flex', gap: '0.75rem', fontSize: '0.82rem', color: 'var(--text-muted)' }}>
          <span>Total Queued: <strong style={{ color: '#F8FAFC' }}>{bundle.queue.length}</strong></span>
          <span>•</span>
          <span>
            With Errors:{' '}
            <strong style={{ color: bundle.queue.some(i => i.validationErrors.some(e => e.severity === 'error')) ? '#EF4444' : '#10B981' }}>
              {bundle.queue.filter(i => i.validationErrors.some(e => e.severity === 'error')).length}
            </strong>
          </span>
        </div>
      </div>

      {/* Queue Items List */}
      {filteredItems.length === 0 ? (
        <div
          style={{
            backgroundColor: 'var(--bg-surface)',
            border: '1px dashed var(--border-subtle)',
            borderRadius: 'var(--radius-md)',
            padding: '3rem 1.5rem',
            textAlign: 'center',
            color: 'var(--text-muted)',
          }}
        >
          <Clock size={32} style={{ margin: '0 auto 0.75rem', opacity: 0.5 }} />
          <div style={{ fontSize: '0.95rem', fontWeight: 500, color: '#E2E8F0', marginBottom: '0.25rem' }}>
            {language === 'ur' ? 'کوئی ڈرافٹ قطار میں موجود نہیں ہے' : 'No Queued Changes in Local Storage'}
          </div>
          <div style={{ fontSize: '0.82rem' }}>
            {language === 'ur'
              ? 'فائل، دعویٰ، ماخذ یا میڈیا ایڈیٹر کے ذریعے نیا مواد تیار کریں اور محفوظ کریں۔'
              : 'Use the Dossiers, Claims, Sources, or Media editors to draft and save proposals.'}
          </div>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {filteredItems.map(item => {
            const errorCount = item.validationErrors.filter(e => e.severity === 'error').length;

            return (
              <div
                key={item.queueId}
                style={{
                  backgroundColor: 'var(--bg-surface)',
                  border: `1px solid ${errorCount > 0 ? 'rgba(239, 68, 68, 0.3)' : 'var(--border-subtle)'}`,
                  borderRadius: 'var(--radius-md)',
                  padding: '1rem 1.25rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.5rem',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span
                      style={{
                        fontSize: '0.72rem',
                        padding: '0.15rem 0.45rem',
                        borderRadius: '4px',
                        textTransform: 'uppercase',
                        fontWeight: 700,
                        backgroundColor:
                          item.changeType === 'create'
                            ? 'rgba(16, 185, 129, 0.15)'
                            : item.changeType === 'update'
                            ? 'rgba(56, 189, 248, 0.15)'
                            : 'rgba(239, 68, 68, 0.15)',
                        color:
                          item.changeType === 'create'
                            ? '#10B981'
                            : item.changeType === 'update'
                            ? '#38BDF8'
                            : '#EF4444',
                      }}
                    >
                      {item.changeType}
                    </span>
                    <span
                      style={{
                        fontSize: '0.72rem',
                        padding: '0.15rem 0.45rem',
                        borderRadius: '4px',
                        textTransform: 'uppercase',
                        fontWeight: 600,
                        backgroundColor: 'rgba(148, 163, 184, 0.15)',
                        color: '#CBD5E1',
                      }}
                    >
                      {item.recordType}
                    </span>
                    <code style={{ fontSize: '0.82rem', color: 'var(--accent-gold)' }}>{item.recordId}</code>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    {errorCount > 0 ? (
                      <span style={{ fontSize: '0.75rem', color: '#EF4444', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                        <AlertTriangle size={13} /> {errorCount} Errors
                      </span>
                    ) : (
                      <span style={{ fontSize: '0.75rem', color: '#10B981', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                        <CheckCircle size={13} /> Ready for PR
                      </span>
                    )}
                    <button
                      onClick={() => onSelectEdit(item.recordType, item.recordId)}
                      className="btn btn-secondary btn-sm"
                      style={{ fontSize: '0.74rem', padding: '0.25rem 0.5rem' }}
                    >
                      <Edit3 size={12} /> Edit
                    </button>
                    <button
                      onClick={() => onRemoveQueueItem(item.queueId)}
                      className="btn btn-secondary btn-sm"
                      style={{ fontSize: '0.74rem', padding: '0.25rem 0.5rem', color: '#EF4444' }}
                    >
                      <Trash2 size={12} />
                    </button>
                  </div>
                </div>

                <div style={{ fontSize: '0.88rem', fontWeight: 500, color: '#F8FAFC' }}>
                  {item.titleEn}
                </div>
                {item.titleUr && (
                  <div style={{ fontSize: '0.88rem', color: '#94A3B8', direction: 'rtl' }}>
                    {item.titleUr}
                  </div>
                )}

                <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                  <strong>Reason:</strong> {item.reasonForChange || 'Proposal recorded'}
                  <span style={{ margin: '0 0.5rem' }}>•</span>
                  <span>{new Date(item.updatedAt).toLocaleString()}</span>
                </div>

                {/* Validation Warnings List if any */}
                {item.validationErrors.length > 0 && (
                  <div
                    style={{
                      marginTop: '0.35rem',
                      padding: '0.5rem 0.75rem',
                      borderRadius: '4px',
                      backgroundColor: 'rgba(239, 68, 68, 0.08)',
                      fontSize: '0.76rem',
                      color: '#FCA5A5',
                    }}
                  >
                    {item.validationErrors.map((err, idx) => (
                      <div key={idx}>• {err.field}: {err.messageEn}</div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
