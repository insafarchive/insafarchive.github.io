/**
 * INSAF ARCHIVE (انصاف آرکائیو)
 * Quick Search Modal (Ctrl+K)
 */

import React, { useState, useEffect, useRef } from 'react';
import { useArchive } from '../../context/ArchiveContext';
import { searchArchive } from '../../utils/searchEngine';
import { DomainBadge } from './DomainBadge';
import { Search, X, CornerDownLeft, Sparkles } from 'lucide-react';
import { formatArchiveDate } from '../../utils/dateUtils';

export const QuickSearchModal: React.FC = () => {
  const {
    records,
    language,
    isQuickSearchOpen,
    setIsQuickSearchOpen,
    viewRecord,
  } = useArchive();

  const [searchQuery, setSearchQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isQuickSearchOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setSearchQuery('');
    }
  }, [isQuickSearchOpen]);

  if (!isQuickSearchOpen) return null;

  const results = searchArchive(records, { query: searchQuery }).slice(0, 8);

  const handleSelect = (recordId: string) => {
    setIsQuickSearchOpen(false);
    viewRecord(recordId);
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(7, 13, 24, 0.85)',
        backdropFilter: 'blur(12px)',
        zIndex: 9999,
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
        padding: '4rem 1rem 1rem 1rem',
      }}
      onClick={() => setIsQuickSearchOpen(false)}
    >
      <div
        className="glass-panel animate-fade-in"
        style={{
          width: '100%',
          maxWidth: '680px',
          backgroundColor: 'var(--bg-surface-elevated)',
          border: '1px solid var(--border-medium)',
          boxShadow: 'var(--shadow-lg)',
          overflow: 'hidden',
        }}
        onClick={e => e.stopPropagation()}
      >
        {/* Search Header Input */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            padding: '1rem 1.25rem',
            borderBottom: '1px solid var(--border-subtle)',
            gap: '0.75rem',
          }}
        >
          <Search size={20} color="var(--accent-gold)" />
          <input
            ref={inputRef}
            type="text"
            placeholder={
              language === 'ur'
                ? 'تلاش کریں (اردو یا انگریزی، مقدمہ نمبر، ادارہ، صحافی)...'
                : 'Search archive by title, case number, journalist, institution (English or Urdu)...'
            }
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            style={{
              flex: 1,
              background: 'transparent',
              border: 'none',
              color: 'var(--text-primary)',
              fontSize: '1.05rem',
              outline: 'none',
            }}
          />
          <button
            onClick={() => setIsQuickSearchOpen(false)}
            className="btn btn-ghost btn-sm"
            style={{ padding: '0.3rem', color: 'var(--text-muted)' }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Results List */}
        <div style={{ maxHeight: '420px', overflowY: 'auto', padding: '0.5rem' }}>
          {results.length === 0 ? (
            <div style={{ padding: '2.5rem 1rem', textAlign: 'center', color: 'var(--text-muted)' }}>
              <Sparkles size={28} style={{ margin: '0 auto 0.5rem auto', color: 'var(--accent-gold)', opacity: 0.7 }} />
              <p style={{ fontSize: '0.92rem' }}>
                {language === 'ur'
                  ? 'کوئی ریکارڈ نہیں ملا۔ مختلف الفاظ یا سال سے تلاش کریں۔'
                  : 'No documentary records found matching your query.'}
              </p>
            </div>
          ) : (
            results.map(record => (
              <div
                key={record.id}
                onClick={() => handleSelect(record.id)}
                style={{
                  padding: '0.85rem 1rem',
                  borderRadius: 'var(--radius-md)',
                  cursor: 'pointer',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  gap: '1rem',
                  transition: 'background var(--transition-fast)',
                }}
                onMouseEnter={e => (e.currentTarget.style.backgroundColor = 'var(--bg-card-hover)')}
                onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'transparent')}
              >
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                    <DomainBadge domain={record.domain} size="sm" />
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                      {formatArchiveDate(record.date, language)}
                    </span>
                  </div>
                  <h4
                    style={{
                      fontSize: '0.95rem',
                      fontWeight: 600,
                      color: 'var(--text-primary)',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                    }}
                  >
                    {record.title[language] || record.title.en}
                  </h4>
                  <p
                    style={{
                      fontSize: '0.8rem',
                      color: 'var(--text-secondary)',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                    }}
                  >
                    {record.summary[language] || record.summary.en}
                  </p>
                </div>
                <CornerDownLeft size={16} color="var(--accent-gold)" style={{ opacity: 0.6 }} />
              </div>
            ))
          )}
        </div>

        {/* Modal Footer */}
        <div
          style={{
            padding: '0.6rem 1.25rem',
            backgroundColor: 'var(--bg-surface)',
            borderTop: '1px solid var(--border-subtle)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            fontSize: '0.75rem',
            color: 'var(--text-muted)',
          }}
        >
          <span>
            {language === 'ur'
              ? 'اردو و عربی حروف خودکار طریقے سے درست کیے جاتے ہیں'
              : 'Urdu & Arabic normalization active'}
          </span>
          <span>
            <kbd style={{ background: 'rgba(255,255,255,0.1)', padding: '0.1rem 0.35rem', borderRadius: '3px' }}>ESC</kbd> to close
          </span>
        </div>
      </div>
    </div>
  );
};
