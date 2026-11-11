/**
 * INSAF ARCHIVE (انصاف آرکائیو)
 * Archival Record Card Component
 */

import React from 'react';
import type { ArchiveRecord } from '../../types/archive';
import { useArchive } from '../../context/ArchiveContext';
import { DomainBadge, RecordTypeBadge } from '../common/DomainBadge';
import { VerificationBadge, PrivacyBadge } from '../common/VerificationBadge';
import { formatArchiveDate } from '../../utils/dateUtils';
import { FileText, Link2, Calendar, MapPin, ArrowRight, ArrowLeft } from 'lucide-react';

interface RecordCardProps {
  record: ArchiveRecord;
  layout?: 'grid' | 'list';
}

export const RecordCard: React.FC<RecordCardProps> = ({ record, layout = 'grid' }) => {
  const { language, viewRecord } = useArchive();

  return (
    <div
      onClick={() => viewRecord(record.id)}
      className="glass-panel"
      style={{
        padding: '1.25rem',
        cursor: 'pointer',
        transition: 'all var(--transition-normal)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        backgroundColor: 'var(--bg-card)',
        borderColor: 'var(--border-subtle)',
        position: 'relative',
        overflow: 'hidden',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.borderColor = 'var(--accent-gold)';
        e.currentTarget.style.backgroundColor = 'var(--bg-card-hover)';
        e.currentTarget.style.transform = 'translateY(-2px)';
      }}
      onMouseLeave={e => {
        e.currentTarget.style.borderColor = 'var(--border-subtle)';
        e.currentTarget.style.backgroundColor = 'var(--bg-card)';
        e.currentTarget.style.transform = 'translateY(0)';
      }}
    >
      <div>
        {/* Badges Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.5rem', marginBottom: '0.75rem', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', flexWrap: 'wrap' }}>
            <DomainBadge domain={record.domain} size="sm" />
            <RecordTypeBadge recordType={record.recordType} size="sm" />
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <VerificationBadge status={record.verificationStatus} />
            <PrivacyBadge privacy={record.privacyClassification} />
          </div>
        </div>

        {/* Temporal & Location info */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '0.6rem', flexWrap: 'wrap' }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
            <Calendar size={13} color="var(--accent-gold)" />
            {formatArchiveDate(record.date, language)}
          </span>
          {record.location?.city && (
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
              <MapPin size={13} color="var(--accent-cyan)" />
              {record.location.city[language] || record.location.city.en}, {record.location.country[language] || record.location.country.en}
            </span>
          )}
        </div>

        {/* Primary Title (Bilingual Emphasis) */}
        <h3
          style={{
            fontSize: '1.1rem',
            fontWeight: 700,
            color: 'var(--text-primary)',
            lineHeight: 1.4,
            marginBottom: '0.35rem',
          }}
        >
          {record.title[language] || record.title.en}
        </h3>

        {/* Secondary Title (Opposite Language for context) */}
        <p
          style={{
            fontSize: '0.85rem',
            color: 'var(--text-gold)',
            opacity: 0.85,
            marginBottom: '0.75rem',
            fontFamily: language === 'en' ? 'var(--font-ur-display)' : 'var(--font-en-display)',
          }}
        >
          {language === 'en' ? record.title.ur : record.title.en}
        </p>

        {/* Summary Snippet */}
        <p
          style={{
            fontSize: '0.88rem',
            color: 'var(--text-secondary)',
            lineHeight: 1.55,
            marginBottom: '1rem',
            display: '-webkit-box',
            WebkitLineClamp: layout === 'grid' ? 3 : 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {record.summary[language] || record.summary.en}
        </p>
      </div>

      {/* Footer Metrics */}
      <div
        style={{
          borderTop: '1px solid var(--border-subtle)',
          paddingTop: '0.75rem',
          marginTop: '0.5rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          fontSize: '0.75rem',
          color: 'var(--text-muted)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
            <FileText size={13} color="var(--accent-gold)" />
            {record.claims.length} {language === 'ur' ? 'شواہد' : 'Findings'}
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
            <Link2 size={13} color="var(--accent-cyan)" />
            {record.sources.length} {language === 'ur' ? 'ماخذ' : 'Sources'}
          </span>
        </div>

        <span
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.25rem',
            color: 'var(--accent-gold-light)',
            fontWeight: 600,
          }}
        >
          <span>{language === 'ur' ? 'تفصیل دیکھیں' : 'Inspect'}</span>
          {language === 'ur' ? <ArrowLeft size={13} /> : <ArrowRight size={13} />}
        </span>
      </div>
    </div>
  );
};
