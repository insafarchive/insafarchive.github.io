/**
 * INSAF ARCHIVE (انصاف آرکائیو)
 * Source Citation Card Component
 */

import React from 'react';
import type { SourceCitation } from '../../types/archive';
import { useArchive } from '../../context/ArchiveContext';
import { formatArchiveDate } from '../../utils/dateUtils';
import { ExternalLink, Bookmark, CheckCircle2, AlertTriangle, ShieldCheck } from 'lucide-react';

export const SourceCard: React.FC<{ source: SourceCitation; highlight?: boolean }> = ({
  source,
  highlight = false,
}) => {
  const { language } = useArchive();

  const getTierBadge = () => {
    switch (source.verificationTier) {
      case 'primary_verified':
        return (
          <span className="badge badge-fact" style={{ fontSize: '0.7rem' }}>
            <ShieldCheck size={11} />
            {language === 'ur' ? 'بنیادی تصدیق شدہ دستاویز' : 'Primary Verified Source'}
          </span>
        );
      case 'secondary_corroborated':
        return (
          <span className="badge badge-audit-finding" style={{ fontSize: '0.7rem' }}>
            <CheckCircle2 size={11} />
            {language === 'ur' ? 'تائید شدہ ماخذ' : 'Corroborated'}
          </span>
        );
      default:
        return (
          <span className="badge badge-official" style={{ fontSize: '0.7rem' }}>
            <AlertTriangle size={11} />
            {language === 'ur' ? 'ثانوی ماخذ' : 'Secondary Source'}
          </span>
        );
    }
  };

  return (
    <div
      id={`source-${source.sourceId}`}
      style={{
        backgroundColor: highlight ? 'var(--bg-surface-elevated)' : 'var(--bg-card)',
        border: highlight ? '1px solid var(--accent-gold)' : '1px solid var(--border-subtle)',
        borderRadius: 'var(--radius-md)',
        padding: '1rem',
        marginBottom: '0.75rem',
        transition: 'border-color var(--transition-fast)',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '0.75rem', marginBottom: '0.4rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--accent-gold)', fontWeight: 600 }}>
            [{source.sourceId}]
          </span>
          {getTierBadge()}
          {source.documentIdentifier && (
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.75rem',
                backgroundColor: 'rgba(255,255,255,0.06)',
                padding: '0.15rem 0.45rem',
                borderRadius: 'var(--radius-sm)',
                color: 'var(--text-secondary)',
              }}
            >
              {source.documentIdentifier}
            </span>
          )}
        </div>
        {source.publicationDate && (
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
            {formatArchiveDate(source.publicationDate, language)}
          </span>
        )}
      </div>

      <h4 style={{ fontSize: '0.98rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.35rem' }}>
        {source.title[language] || source.title.en}
      </h4>

      {source.publisher && (
        <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
          <strong>{language === 'ur' ? 'شائع کردہ:' : 'Publisher:'}</strong> {source.publisher[language] || source.publisher.en}
        </p>
      )}

      {source.notes && (
        <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', fontStyle: 'italic', marginBottom: '0.5rem' }}>
          {source.notes[language] || source.notes.en}
        </p>
      )}

      <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.5rem', flexWrap: 'wrap' }}>
        {source.originalUrl && (
          <a
            href={source.originalUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-secondary btn-sm"
            style={{ fontSize: '0.75rem', padding: '0.2rem 0.6rem' }}
          >
            <ExternalLink size={12} />
            <span>{language === 'ur' ? 'اصل ماخذ لنک' : 'Original Source'}</span>
          </a>
        )}
        {source.archiveUrl && (
          <a
            href={source.archiveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-ghost btn-sm"
            style={{ fontSize: '0.75rem', padding: '0.2rem 0.6rem', color: 'var(--accent-gold)' }}
          >
            <Bookmark size={12} />
            <span>{language === 'ur' ? 'محفوظ آرکائیو کاپی' : 'Wayback / Archive Snapshot'}</span>
          </a>
        )}
      </div>
    </div>
  );
};
