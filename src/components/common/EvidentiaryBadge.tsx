/**
 * INSAF ARCHIVE (انصاف آرکائیو)
 * Evidentiary Finding Badge Component
 */

import React from 'react';
import type { EvidentiaryFindingType } from '../../types/archive';
import { FINDING_TYPE_CONFIG } from '../../data/taxonomy';
import { useArchive } from '../../context/ArchiveContext';
import {
  CheckCircle2,
  FileCheck,
  Scale,
  Building2,
  AlertTriangle,
  FileQuestion,
  HelpCircle,
  BookOpen,
  Newspaper,
  ShieldAlert,
} from 'lucide-react';

interface EvidentiaryBadgeProps {
  type: EvidentiaryFindingType;
  showIcon?: boolean;
  size?: 'sm' | 'md';
}

export const EvidentiaryBadge: React.FC<EvidentiaryBadgeProps> = ({
  type,
  showIcon = true,
  size = 'md',
}) => {
  const { language } = useArchive();
  const config = FINDING_TYPE_CONFIG[type] || FINDING_TYPE_CONFIG.claim;

  const renderIcon = () => {
    switch (type) {
      case 'documented_fact':
      case 'primary_source_record':
        return <CheckCircle2 size={size === 'sm' ? 12 : 14} />;
      case 'court_finding':
      case 'appellate_court_finding':
        return <Scale size={size === 'sm' ? 12 : 14} />;
      case 'audit_finding':
      case 'commission_finding':
        return <FileCheck size={size === 'sm' ? 12 : 14} />;
      case 'official_position':
        return <Building2 size={size === 'sm' ? 12 : 14} />;
      case 'allegation':
      case 'counter_claim':
        return <AlertTriangle size={size === 'sm' ? 12 : 14} />;
      case 'investigative_finding':
        return <Newspaper size={size === 'sm' ? 12 : 14} />;
      case 'academic_research_finding':
        return <BookOpen size={size === 'sm' ? 12 : 14} />;
      case 'unresolved_question':
        return <HelpCircle size={size === 'sm' ? 12 : 14} />;
      case 'denial':
        return <ShieldAlert size={size === 'sm' ? 12 : 14} />;
      default:
        return <FileQuestion size={size === 'sm' ? 12 : 14} />;
    }
  };

  return (
    <span
      className={`badge ${config.badgeClass}`}
      style={{ fontSize: size === 'sm' ? '0.72rem' : '0.8rem', padding: size === 'sm' ? '0.15rem 0.5rem' : '0.25rem 0.65rem' }}
      title={config.description[language]}
    >
      {showIcon && renderIcon()}
      <span>{config.label[language]}</span>
    </span>
  );
};
