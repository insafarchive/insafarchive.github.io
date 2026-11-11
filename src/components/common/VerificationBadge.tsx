/**
 * INSAF ARCHIVE (انصاف آرکائیو)
 * Verification & Editorial Status Badges
 */

import React from 'react';
import type { VerificationStatus, PrivacyClassification } from '../../types/archive';
import { VERIFICATION_STATUS_CONFIG } from '../../data/taxonomy';
import { useArchive } from '../../context/ArchiveContext';
import { ShieldCheck, AlertCircle, EyeOff, Lock } from 'lucide-react';

export const VerificationBadge: React.FC<{ status: VerificationStatus }> = ({ status }) => {
  const { language } = useArchive();
  const config = VERIFICATION_STATUS_CONFIG[status] || VERIFICATION_STATUS_CONFIG.unverified;

  return (
    <span
      className="badge badge-verification"
      style={{
        color: config.color,
        border: `1px solid ${config.color}50`,
      }}
    >
      <ShieldCheck size={12} />
      <span>{config.label[language]}</span>
    </span>
  );
};

export const PrivacyBadge: React.FC<{ privacy: PrivacyClassification }> = ({ privacy }) => {
  if (privacy === 'public') return null;

  return (
    <span
      className="badge"
      style={{
        backgroundColor: 'rgba(239, 68, 68, 0.15)',
        color: '#F87171',
        border: '1px solid rgba(239, 68, 68, 0.4)',
      }}
    >
      {privacy === 'public_sensitive' && <AlertCircle size={12} />}
      {privacy === 'restricted_editorial' && <Lock size={12} />}
      {privacy === 'do_not_publish' && <EyeOff size={12} />}
      <span>{privacy.replace('_', ' ').toUpperCase()}</span>
    </span>
  );
};
