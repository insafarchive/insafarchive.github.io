/**
 * INSAF ARCHIVE (انصاف آرکائیو)
 * Domain & Record Type Badges
 */

import React from 'react';
import type { ArchiveDomain, RecordType } from '../../types/archive';
import { DOMAIN_REGISTRY, RECORD_TYPE_LABELS } from '../../data/taxonomy';
import { useArchive } from '../../context/ArchiveContext';

export const DomainBadge: React.FC<{ domain: ArchiveDomain; size?: 'sm' | 'md' }> = ({
  domain,
  size = 'md',
}) => {
  const { language } = useArchive();
  const info = DOMAIN_REGISTRY[domain] || DOMAIN_REGISTRY.legal;

  return (
    <span
      className="badge"
      style={{
        backgroundColor: info.badgeBg,
        color: info.color,
        border: `1px solid ${info.color}40`,
        fontSize: size === 'sm' ? '0.72rem' : '0.8rem',
      }}
    >
      {info.label[language]}
    </span>
  );
};

export const RecordTypeBadge: React.FC<{ recordType: RecordType; size?: 'sm' | 'md' }> = ({
  recordType,
  size = 'md',
}) => {
  const { language } = useArchive();
  const label = RECORD_TYPE_LABELS[recordType] || { en: recordType, ur: recordType };

  return (
    <span
      className="badge"
      style={{
        backgroundColor: 'rgba(255, 255, 255, 0.08)',
        color: 'var(--text-secondary)',
        border: '1px solid var(--border-subtle)',
        fontSize: size === 'sm' ? '0.72rem' : '0.8rem',
      }}
    >
      {label[language]}
    </span>
  );
};
