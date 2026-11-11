/**
 * INSAF ARCHIVE (انصاف آرکائیو)
 * Evidentiary Claim & Finding Card
 */

import React from 'react';
import type { EvidentiaryClaim, SourceCitation } from '../../types/archive';
import { EvidentiaryBadge } from './EvidentiaryBadge';
import { useArchive } from '../../context/ArchiveContext';
import { Link2, AlertCircle } from 'lucide-react';

interface ClaimCardProps {
  claim: EvidentiaryClaim;
  sources: SourceCitation[];
  onSelectSource?: (sourceId: string) => void;
}

export const ClaimCard: React.FC<ClaimCardProps> = ({ claim, sources, onSelectSource }) => {
  const { language } = useArchive();

  const linkedSources = sources.filter(s => claim.sourceIds.includes(s.sourceId));

  return (
    <div
      style={{
        backgroundColor: 'var(--bg-card)',
        border: '1px solid var(--border-subtle)',
        borderRadius: 'var(--radius-md)',
        padding: '1.1rem',
        marginBottom: '1rem',
        boxShadow: 'var(--shadow-sm)',
        borderLeft: language === 'en' ? '4px solid var(--accent-gold)' : undefined,
        borderRight: language === 'ur' ? '4px solid var(--accent-gold)' : undefined,
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.6rem', flexWrap: 'wrap', gap: '0.5rem' }}>
        <EvidentiaryBadge type={claim.findingType} />
        {claim.attributedParty && (
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
            <strong>{language === 'ur' ? 'منسوب بذریعہ:' : 'Attributed to:'}</strong>{' '}
            {claim.attributedParty[language] || claim.attributedParty.en}
          </span>
        )}
      </div>

      <p style={{ fontSize: '0.98rem', color: 'var(--text-primary)', lineHeight: 1.6, marginBottom: '0.75rem' }}>
        {claim.assertion[language] || claim.assertion.en}
      </p>

      {claim.editorialAssessment && (
        <div
          style={{
            backgroundColor: 'rgba(197, 168, 128, 0.08)',
            border: '1px dashed var(--border-medium)',
            padding: '0.6rem 0.85rem',
            borderRadius: 'var(--radius-sm)',
            fontSize: '0.82rem',
            color: 'var(--accent-gold-light)',
            marginBottom: '0.75rem',
            display: 'flex',
            alignItems: 'flex-start',
            gap: '0.5rem',
          }}
        >
          <AlertCircle size={14} style={{ flexShrink: 0, marginTop: '2px' }} />
          <span>
            <strong>{language === 'ur' ? 'ادارتی تبصرہ:' : 'Editorial Context:'}</strong>{' '}
            {claim.editorialAssessment[language] || claim.editorialAssessment.en}
          </span>
        </div>
      )}

      {/* Sources attached */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap', marginTop: '0.5rem' }}>
        <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
          <Link2 size={12} />
          {language === 'ur' ? 'شواہد و ماخذ:' : 'Citations:'}
        </span>
        {linkedSources.map(src => (
          <button
            key={src.sourceId}
            onClick={() => onSelectSource?.(src.sourceId)}
            className="btn btn-ghost btn-sm"
            style={{
              padding: '0.15rem 0.45rem',
              fontSize: '0.72rem',
              backgroundColor: 'rgba(255,255,255,0.06)',
              border: '1px solid var(--border-subtle)',
              borderRadius: 'var(--radius-sm)',
              color: 'var(--accent-gold-light)',
            }}
          >
            {src.documentIdentifier || src.sourceId}
          </button>
        ))}
      </div>
    </div>
  );
};
