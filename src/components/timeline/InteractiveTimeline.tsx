/**
 * INSAF ARCHIVE (انصاف آرکائیو)
 * Master Chronological Interactive Timeline
 */

import React, { useState } from 'react';
import { useArchive } from '../../context/ArchiveContext';
import type { ArchiveDomain } from '../../types/archive';
import { DOMAIN_REGISTRY } from '../../data/taxonomy';
import { formatArchiveDate, extractNumericYear } from '../../utils/dateUtils';
import { DomainBadge } from '../common/DomainBadge';
import { History, ArrowUpDown, Calendar, ArrowRight, ArrowLeft } from 'lucide-react';

export const InteractiveTimeline: React.FC = () => {
  const { records, language, viewRecord } = useArchive();
  const [selectedDomain, setSelectedDomain] = useState<ArchiveDomain | 'all'>('all');
  const [sortOrder, setSortOrder] = useState<'desc' | 'asc'>('desc');
  const [selectedDecade, setSelectedDecade] = useState<string>('all');

  const domainList = Object.keys(DOMAIN_REGISTRY) as ArchiveDomain[];

  // Filter and sort records
  const timelineRecords = records
    .filter(r => {
      if (selectedDomain !== 'all' && r.domain !== selectedDomain) return false;
      if (selectedDecade !== 'all') {
        const year = extractNumericYear(r.date);
        const decadeStart = parseInt(selectedDecade, 10);
        if (year < decadeStart || year > decadeStart + 9) return false;
      }
      return true;
    })
    .sort((a, b) => {
      const yearA = extractNumericYear(a.date);
      const yearB = extractNumericYear(b.date);
      return sortOrder === 'desc' ? yearB - yearA : yearA - yearB;
    });

  const decades = [
    { id: 'all', label: { en: 'All Eras', ur: 'تمام ادوار' } },
    { id: '2020', label: { en: '2020s', ur: '2020ء کی دہائی' } },
    { id: '2010', label: { en: '2010s', ur: '2010ء کی دہائی' } },
    { id: '2000', label: { en: '2000s', ur: '2000ء کی دہائی' } },
    { id: '1990', label: { en: '1990s', ur: '1990ء کی دہائی' } },
    { id: '1970', label: { en: '1970s', ur: '1970ء کی دہائی' } },
    { id: '1950', label: { en: '1950s', ur: '1950ء کی دہائی' } },
  ];

  return (
    <div className="content-wrap" style={{ padding: '2rem 1.5rem 5rem 1.5rem' }}>
      {/* Header Banner */}
      <div style={{ marginBottom: '2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.5rem' }}>
          <History size={26} color="var(--accent-gold)" />
          <h1 style={{ fontSize: '1.85rem', color: '#FFFFFF' }}>
            {language === 'ur' ? 'پاکستان کی دستاویزی و تاریخی ٹائم لائن' : 'Master National Chronology'}
          </h1>
        </div>
        <p style={{ fontSize: '1rem', color: 'var(--text-secondary)', maxWidth: '800px' }}>
          {language === 'ur'
            ? 'پاکستان کی قانونی، آئینی، انسانی حقوق، صحافتی اور معاشی تاریخ کا باہم منسلک تاریخی تسلسل۔'
            : 'A continuous, cross-domain chronological documentary record connecting landmark judicial rulings, political crises, media freedom investigations, and public policies.'}
        </p>
      </div>

      {/* Control Bar (Domain Filter + Decade Selector + Sort) */}
      <div
        className="glass-panel"
        style={{
          padding: '1.25rem',
          marginBottom: '2.5rem',
          backgroundColor: 'var(--bg-surface-elevated)',
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
        }}
      >
        {/* Domain Filter Pills */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-gold)', fontWeight: 600, marginRight: '0.5rem' }}>
            {language === 'ur' ? 'شعبہ منتخب کریں:' : 'Filter Domain:'}
          </span>
          <button
            onClick={() => setSelectedDomain('all')}
            className={`btn btn-sm ${selectedDomain === 'all' ? 'btn-primary' : 'btn-secondary'}`}
          >
            {language === 'ur' ? 'تمام شعبہ جات' : 'All Domains'}
          </button>
          {domainList.map(dom => {
            const info = DOMAIN_REGISTRY[dom];
            const isSelected = selectedDomain === dom;
            return (
              <button
                key={dom}
                onClick={() => setSelectedDomain(dom)}
                className="btn btn-sm"
                style={{
                  backgroundColor: isSelected ? info.badgeBg : 'rgba(255,255,255,0.05)',
                  color: isSelected ? info.color : 'var(--text-secondary)',
                  border: isSelected ? `1px solid ${info.color}` : '1px solid var(--border-subtle)',
                }}
              >
                {info.label[language]}
              </button>
            );
          })}
        </div>

        {/* Decade Selector & Sort Order */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', borderTop: '1px solid var(--border-subtle)', paddingTop: '0.85rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', flexWrap: 'wrap' }}>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              {language === 'ur' ? 'دہائی:' : 'Decade:'}
            </span>
            {decades.map(dec => (
              <button
                key={dec.id}
                onClick={() => setSelectedDecade(dec.id)}
                className={`btn btn-sm ${selectedDecade === dec.id ? 'btn-secondary' : 'btn-ghost'}`}
                style={{
                  fontSize: '0.78rem',
                  padding: '0.2rem 0.55rem',
                  color: selectedDecade === dec.id ? 'var(--accent-gold)' : 'var(--text-muted)',
                }}
              >
                {dec.label[language]}
              </button>
            ))}
          </div>

          <button
            onClick={() => setSortOrder(prev => (prev === 'desc' ? 'asc' : 'desc'))}
            className="btn btn-secondary btn-sm"
            style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}
          >
            <ArrowUpDown size={14} />
            <span>
              {sortOrder === 'desc'
                ? (language === 'ur' ? 'جدید ترین سے قدیم' : 'Newest First')
                : (language === 'ur' ? 'قدیم ترین سے جدید' : 'Oldest First')}
            </span>
          </button>
        </div>
      </div>

      {/* Vertical Timeline Stream */}
      <div style={{ position: 'relative', paddingLeft: language === 'en' ? '2rem' : 0, paddingRight: language === 'ur' ? '2rem' : 0 }}>
        {/* Central Vertical Line */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: language === 'en' ? '7px' : 'auto',
            right: language === 'ur' ? '7px' : 'auto',
            width: '2px',
            backgroundColor: 'var(--border-medium)',
          }}
        />

        {timelineRecords.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>
            <p>{language === 'ur' ? 'منتخب کردہ فلٹرز کے مطابق کوئی ٹائم لائن ریکارڈ موجود نہیں ہے۔' : 'No timeline records match the selected filters.'}</p>
          </div>
        ) : (
          timelineRecords.map(record => {
            const domainInfo = DOMAIN_REGISTRY[record.domain];
            return (
              <div
                key={record.id}
                style={{
                  position: 'relative',
                  marginBottom: '2rem',
                }}
              >
                {/* Node Bullet on the Line */}
                <div
                  style={{
                    position: 'absolute',
                    top: '1.25rem',
                    left: language === 'en' ? '-2rem' : 'auto',
                    right: language === 'ur' ? '-2rem' : 'auto',
                    width: '16px',
                    height: '16px',
                    borderRadius: '50%',
                    backgroundColor: domainInfo?.color || 'var(--accent-gold)',
                    border: '3px solid var(--bg-primary)',
                    boxShadow: '0 0 10px rgba(197, 168, 128, 0.4)',
                  }}
                />

                {/* Timeline Record Card */}
                <div
                  onClick={() => viewRecord(record.id)}
                  className="glass-panel"
                  style={{
                    padding: '1.25rem 1.5rem',
                    backgroundColor: 'var(--bg-card)',
                    cursor: 'pointer',
                    transition: 'all var(--transition-fast)',
                    borderLeft: language === 'en' ? `3px solid ${domainInfo?.color || 'var(--accent-gold)'}` : undefined,
                    borderRight: language === 'ur' ? `3px solid ${domainInfo?.color || 'var(--accent-gold)'}` : undefined,
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.borderColor = 'var(--accent-gold)';
                    e.currentTarget.style.backgroundColor = 'var(--bg-card-hover)';
                    e.currentTarget.style.transform = 'translateX(4px)';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.borderColor = 'var(--border-subtle)';
                    e.currentTarget.style.backgroundColor = 'var(--bg-card)';
                    e.currentTarget.style.transform = 'translateX(0)';
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--accent-gold-bright)', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                        <Calendar size={14} />
                        {formatArchiveDate(record.date, language)}
                      </span>
                      <DomainBadge domain={record.domain} size="sm" />
                    </div>

                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                      {record.claims.length} {language === 'ur' ? 'شواہد' : 'Findings'} • {record.sources.length} {language === 'ur' ? 'ماخذ' : 'Sources'}
                    </span>
                  </div>

                  <h3 style={{ fontSize: '1.15rem', color: '#FFFFFF', marginBottom: '0.35rem' }}>
                    {record.title[language] || record.title.en}
                  </h3>

                  <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: '0.75rem' }}>
                    {record.summary[language] || record.summary.en}
                  </p>

                  <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: '0.3rem', fontSize: '0.8rem', color: 'var(--accent-gold-light)', fontWeight: 600 }}>
                    <span>{language === 'ur' ? 'مکمل ریکارڈ دیکھیں' : 'Inspect Full Record'}</span>
                    {language === 'ur' ? <ArrowLeft size={13} /> : <ArrowRight size={13} />}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
