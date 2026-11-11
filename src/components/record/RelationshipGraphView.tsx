/**
 * INSAF ARCHIVE (انصاف آرکائیو)
 * Interactive Relational Graph & Linked Dossier View
 */

import React from 'react';
import type { ArchiveRecord } from '../../types/archive';
import { useArchive } from '../../context/ArchiveContext';
import { resolveConnectedRecords } from '../../utils/graphUtils';
import { DomainBadge } from '../common/DomainBadge';
import { formatArchiveDate } from '../../utils/dateUtils';
import { GitBranch, ArrowRight, ArrowLeft, Network, Link, AlertTriangle } from 'lucide-react';

export const RelationshipGraphView: React.FC<{ currentRecord: ArchiveRecord }> = ({ currentRecord }) => {
  const { records, language, viewRecord } = useArchive();

  const connectedItems = resolveConnectedRecords(currentRecord.id, records);

  if (connectedItems.length === 0) {
    return (
      <div
        style={{
          padding: '3rem 1.5rem',
          textAlign: 'center',
          backgroundColor: 'var(--bg-card)',
          borderRadius: 'var(--radius-md)',
          border: '1px dashed var(--border-subtle)',
          color: 'var(--text-muted)',
        }}
      >
        <Network size={36} color="var(--accent-gold)" style={{ margin: '0 auto 0.75rem auto', opacity: 0.6 }} />
        <h4 style={{ fontSize: '1rem', color: 'var(--text-primary)', marginBottom: '0.4rem' }}>
          {language === 'ur' ? 'کوئی براہِ راست متصل ریکارڈ لنک نہیں ملا' : 'No Direct Cross-Record Links Documented'}
        </h4>
        <p style={{ fontSize: '0.85rem' }}>
          {language === 'ur'
            ? 'نئے دستاویزی روابط شامل کرنے کے لیے ادارتی ڈیش بورڈ استعمال کریں۔'
            : 'Use the Editorial Workspace to establish relational nodes to other cases, dossiers, or reports.'}
        </p>
      </div>
    );
  }

  return (
    <div>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          marginBottom: '1rem',
          color: 'var(--text-gold)',
          fontSize: '0.9rem',
          fontWeight: 600,
        }}
      >
        <GitBranch size={16} />
        <span>
          {language === 'ur'
            ? `متصل دستاویزی شواہد اور ریکارڈز (${connectedItems.length})`
            : `Interconnected Archival Nodes (${connectedItems.length})`}
        </span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1rem' }}>
        {connectedItems.map((item, idx) => {
          const isContradiction = item.predicate === 'contradicts';
          return (
            <div
              key={`${item.targetRecord.id}-${idx}`}
              onClick={() => viewRecord(item.targetRecord.id)}
              style={{
                backgroundColor: 'var(--bg-card)',
                border: isContradiction ? '1px solid rgba(239, 68, 68, 0.4)' : '1px solid var(--border-subtle)',
                borderRadius: 'var(--radius-md)',
                padding: '1rem',
                cursor: 'pointer',
                transition: 'all var(--transition-fast)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = isContradiction ? '#EF4444' : 'var(--accent-gold)';
                e.currentTarget.style.backgroundColor = 'var(--bg-card-hover)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = isContradiction ? 'rgba(239, 68, 68, 0.4)' : 'var(--border-subtle)';
                e.currentTarget.style.backgroundColor = 'var(--bg-card)';
              }}
            >
              <div>
                {/* Predicate Link Badge */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.6rem', flexWrap: 'wrap' }}>
                  <span
                    className="badge"
                    style={{
                      backgroundColor: isContradiction ? 'rgba(239, 68, 68, 0.15)' : 'rgba(197, 168, 128, 0.15)',
                      color: isContradiction ? '#F87171' : 'var(--accent-gold-bright)',
                      border: `1px solid ${isContradiction ? 'rgba(239, 68, 68, 0.3)' : 'rgba(197, 168, 128, 0.3)'}`,
                      fontSize: '0.72rem',
                    }}
                  >
                    {isContradiction ? <AlertTriangle size={11} /> : <Link size={11} />}
                    {item.label[language] || item.label.en}
                  </span>
                  <DomainBadge domain={item.targetRecord.domain} size="sm" />
                </div>

                {/* Target Record Title */}
                <h4 style={{ fontSize: '0.98rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.35rem', lineHeight: 1.4 }}>
                  {item.targetRecord.title[language] || item.targetRecord.title.en}
                </h4>

                {/* Date & Location */}
                <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
                  {formatArchiveDate(item.targetRecord.date, language)}
                </p>

                {/* Description if available */}
                {item.description && (
                  <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', fontStyle: 'italic', marginBottom: '0.6rem' }}>
                    {item.description[language] || item.description.en}
                  </p>
                )}
              </div>

              {/* Inspect Button */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'flex-end',
                  gap: '0.25rem',
                  fontSize: '0.75rem',
                  color: 'var(--accent-gold-light)',
                  fontWeight: 600,
                  marginTop: '0.5rem',
                  borderTop: '1px solid var(--border-subtle)',
                  paddingTop: '0.5rem',
                }}
              >
                <span>{language === 'ur' ? 'ریکارڈ دیکھیں' : 'View Linked Record'}</span>
                {language === 'ur' ? <ArrowLeft size={12} /> : <ArrowRight size={12} />}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
