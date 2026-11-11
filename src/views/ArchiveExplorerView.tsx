/**
 * INSAF ARCHIVE (انصاف آرکائیو)
 * Universal Archive Explorer & Multi-Faceted Filter View
 */

import React, { useState } from 'react';
import { useArchive } from '../context/ArchiveContext';
import type { ArchiveDomain, RecordType, EvidentiaryFindingType, VerificationStatus } from '../types/archive';
import { DOMAIN_REGISTRY, RECORD_TYPE_LABELS, FINDING_TYPE_CONFIG, VERIFICATION_STATUS_CONFIG } from '../data/taxonomy';
import { searchArchive } from '../utils/searchEngine';
import { RecordCard } from '../components/record/RecordCard';
import {
  Search,
  SlidersHorizontal,
  RotateCcw,
  LayoutGrid,
  List,
  Sparkles,
  BookOpen,
  Filter,
} from 'lucide-react';

export const ArchiveExplorerView: React.FC = () => {
  const { records, language, searchFilter, setSearchFilter, resetFilters } = useArchive();
  const [layout, setLayout] = useState<'grid' | 'list'>('grid');
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  const domainList = Object.keys(DOMAIN_REGISTRY) as ArchiveDomain[];
  const recordTypeList = Object.keys(RECORD_TYPE_LABELS) as RecordType[];
  const findingTypeList = Object.keys(FINDING_TYPE_CONFIG) as EvidentiaryFindingType[];
  const verificationList = Object.keys(VERIFICATION_STATUS_CONFIG) as VerificationStatus[];

  // Execute Search & Multi-Faceted Filter
  const filteredRecords = searchArchive(records, searchFilter);

  const hasActiveFilters =
    searchFilter.query !== '' ||
    searchFilter.domain !== 'all' ||
    searchFilter.recordType !== 'all' ||
    searchFilter.findingType !== 'all' ||
    searchFilter.verificationStatus !== 'all' ||
    searchFilter.yearFrom !== undefined ||
    searchFilter.yearTo !== undefined;

  return (
    <div className="content-wrap" style={{ padding: '2rem 1.5rem 5rem 1.5rem' }}>
      {/* Header Banner */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.4rem' }}>
            <BookOpen size={24} color="var(--accent-gold)" />
            <h1 style={{ fontSize: '1.85rem', color: '#FFFFFF' }}>
              {language === 'ur' ? 'آرکائیو تلاش و فلٹر' : 'Universal Archive Explorer'}
            </h1>
          </div>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
            {language === 'ur'
              ? `${filteredRecords.length} مصدقہ دستاویزی ریکارڈز دستیاب ہیں`
              : `Browsing ${filteredRecords.length} verified documentary archival records`}
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          {/* Mobile Filter Toggle */}
          <button
            onClick={() => setMobileFilterOpen(prev => !prev)}
            className="btn btn-secondary btn-sm mobile-filter-btn"
            style={{ display: 'none' }}
          >
            <Filter size={14} />
            <span>{language === 'ur' ? 'فلٹرز' : 'Filters'}</span>
          </button>

          {/* Grid / List Layout Switcher */}
          <div style={{ display: 'flex', backgroundColor: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-md)', padding: '0.2rem' }}>
            <button
              onClick={() => setLayout('grid')}
              className="btn btn-ghost btn-sm"
              style={{
                padding: '0.35rem 0.6rem',
                backgroundColor: layout === 'grid' ? 'var(--bg-surface-elevated)' : 'transparent',
                color: layout === 'grid' ? 'var(--accent-gold)' : 'var(--text-muted)',
              }}
              title="Grid View"
            >
              <LayoutGrid size={15} />
            </button>
            <button
              onClick={() => setLayout('list')}
              className="btn btn-ghost btn-sm"
              style={{
                padding: '0.35rem 0.6rem',
                backgroundColor: layout === 'list' ? 'var(--bg-surface-elevated)' : 'transparent',
                color: layout === 'list' ? 'var(--accent-gold)' : 'var(--text-muted)',
              }}
              title="List View"
            >
              <List size={15} />
            </button>
          </div>
        </div>
      </div>

      {/* Main Grid: Filters Sidebar + Results Area */}
      <div style={{ display: 'grid', gridTemplateColumns: '290px 1fr', gap: '2rem', alignItems: 'flex-start' }} className="archive-explorer-grid">
        {/* SIDEBAR FILTER PANEL */}
        <aside
          className={`glass-panel ${mobileFilterOpen ? 'mobile-filter-drawer' : ''}`}
          style={{
            padding: '1.5rem',
            backgroundColor: 'var(--bg-surface-elevated)',
            border: '1px solid var(--border-subtle)',
            display: 'flex',
            flexDirection: 'column',
            gap: '1.25rem',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--accent-gold)', fontWeight: 700, fontSize: '0.95rem' }}>
              <SlidersHorizontal size={16} />
              <span>{language === 'ur' ? 'تلاش و فلٹرز' : 'Filters & Facets'}</span>
            </div>
            {hasActiveFilters && (
              <button
                onClick={resetFilters}
                className="btn btn-ghost btn-sm"
                style={{ fontSize: '0.75rem', padding: '0.2rem 0.4rem', color: 'var(--accent-gold-light)', gap: '0.2rem' }}
                title="Reset all search filters"
              >
                <RotateCcw size={12} />
                <span>{language === 'ur' ? 'ری سیٹ' : 'Reset'}</span>
              </button>
            )}
          </div>

          {/* Search Text Input */}
          <div className="form-group" style={{ marginBottom: 0 }}>
            <label className="form-label" style={{ fontSize: '0.8rem' }}>
              {language === 'ur' ? 'الفاظ سے تلاش:' : 'Search Keywords:'}
            </label>
            <div className="search-input-wrap">
              <div className="search-icon-pos" style={{ left: '0.75rem' }}>
                <Search size={15} />
              </div>
              <input
                type="text"
                className="search-input"
                style={{ padding: '0.55rem 0.75rem 0.55rem 2.2rem', fontSize: '0.88rem' }}
                placeholder={language === 'ur' ? 'مقدمہ، ادارہ، سال، صحافی...' : 'Case, party, law, journalist...'}
                value={searchFilter.query || ''}
                onChange={e => setSearchFilter(prev => ({ ...prev, query: e.target.value }))}
              />
            </div>
          </div>

          {/* Domain Filter */}
          <div className="form-group" style={{ marginBottom: 0 }}>
            <label className="form-label" style={{ fontSize: '0.8rem' }}>
              {language === 'ur' ? 'شعبہ:' : 'Archival Domain:'}
            </label>
            <select
              className="form-control"
              style={{ fontSize: '0.85rem', padding: '0.5rem' }}
              value={searchFilter.domain || 'all'}
              onChange={e => setSearchFilter(prev => ({ ...prev, domain: e.target.value as ArchiveDomain | 'all' }))}
            >
              <option value="all">{language === 'ur' ? 'تمام شعبہ جات' : 'All Domains'}</option>
              {domainList.map(dom => (
                <option key={dom} value={dom}>
                  {DOMAIN_REGISTRY[dom].label[language]}
                </option>
              ))}
            </select>
          </div>

          {/* Record Type Filter */}
          <div className="form-group" style={{ marginBottom: 0 }}>
            <label className="form-label" style={{ fontSize: '0.8rem' }}>
              {language === 'ur' ? 'ریکارڈ کی نوعیت:' : 'Record Type:'}
            </label>
            <select
              className="form-control"
              style={{ fontSize: '0.85rem', padding: '0.5rem' }}
              value={searchFilter.recordType || 'all'}
              onChange={e => setSearchFilter(prev => ({ ...prev, recordType: e.target.value as RecordType | 'all' }))}
            >
              <option value="all">{language === 'ur' ? 'تمام اقسام' : 'All Record Types'}</option>
              {recordTypeList.map(rt => (
                <option key={rt} value={rt}>
                  {RECORD_TYPE_LABELS[rt]?.[language] || rt}
                </option>
              ))}
            </select>
          </div>

          {/* Evidentiary Finding Filter */}
          <div className="form-group" style={{ marginBottom: 0 }}>
            <label className="form-label" style={{ fontSize: '0.8rem' }}>
              {language === 'ur' ? 'شہادت کی نوعیت:' : 'Evidentiary Finding:'}
            </label>
            <select
              className="form-control"
              style={{ fontSize: '0.85rem', padding: '0.5rem' }}
              value={searchFilter.findingType || 'all'}
              onChange={e => setSearchFilter(prev => ({ ...prev, findingType: e.target.value as EvidentiaryFindingType | 'all' }))}
            >
              <option value="all">{language === 'ur' ? 'تمام شواہد و نتائج' : 'All Finding Types'}</option>
              {findingTypeList.map(ft => (
                <option key={ft} value={ft}>
                  {FINDING_TYPE_CONFIG[ft]?.label[language] || ft}
                </option>
              ))}
            </select>
          </div>

          {/* Verification Status */}
          <div className="form-group" style={{ marginBottom: 0 }}>
            <label className="form-label" style={{ fontSize: '0.8rem' }}>
              {language === 'ur' ? 'تصدیقی درجہ:' : 'Verification Status:'}
            </label>
            <select
              className="form-control"
              style={{ fontSize: '0.85rem', padding: '0.5rem' }}
              value={searchFilter.verificationStatus || 'all'}
              onChange={e => setSearchFilter(prev => ({ ...prev, verificationStatus: e.target.value as VerificationStatus | 'all' }))}
            >
              <option value="all">{language === 'ur' ? 'تمام درجات' : 'All Verification Tiers'}</option>
              {verificationList.map(vs => (
                <option key={vs} value={vs}>
                  {VERIFICATION_STATUS_CONFIG[vs]?.label[language] || vs}
                </option>
              ))}
            </select>
          </div>

          {/* Year Range Filter */}
          <div className="form-group" style={{ marginBottom: 0 }}>
            <label className="form-label" style={{ fontSize: '0.8rem' }}>
              {language === 'ur' ? 'سال (از - تا):' : 'Year Range:'}
            </label>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
              <input
                type="number"
                className="form-control"
                style={{ fontSize: '0.82rem', padding: '0.4rem' }}
                placeholder="From (1947)"
                value={searchFilter.yearFrom || ''}
                onChange={e => setSearchFilter(prev => ({ ...prev, yearFrom: e.target.value ? parseInt(e.target.value, 10) : undefined }))}
              />
              <input
                type="number"
                className="form-control"
                style={{ fontSize: '0.82rem', padding: '0.4rem' }}
                placeholder="To (2026)"
                value={searchFilter.yearTo || ''}
                onChange={e => setSearchFilter(prev => ({ ...prev, yearTo: e.target.value ? parseInt(e.target.value, 10) : undefined }))}
              />
            </div>
          </div>
        </aside>

        {/* RESULTS CONTENT AREA */}
        <div>
          {filteredRecords.length === 0 ? (
            <div
              className="glass-panel"
              style={{
                padding: '4rem 2rem',
                textAlign: 'center',
                backgroundColor: 'var(--bg-card)',
                color: 'var(--text-muted)',
              }}
            >
              <Sparkles size={40} color="var(--accent-gold)" style={{ margin: '0 auto 1rem auto', opacity: 0.6 }} />
              <h3 style={{ fontSize: '1.2rem', color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
                {language === 'ur' ? 'کوئی دستاویزی ریکارڈ نہیں ملا' : 'No Archival Records Found'}
              </h3>
              <p style={{ fontSize: '0.9rem', maxWidth: '500px', margin: '0 auto 1.5rem auto' }}>
                {language === 'ur'
                  ? 'اپنے تلاش کے الفاظ تبدیل کریں یا تمام فلٹرز ری سیٹ کر کے دوبارہ کوشش کریں۔'
                  : 'Try adjusting your search keywords, broadening the year range, or clearing filters.'}
              </p>
              <button onClick={resetFilters} className="btn btn-secondary btn-sm">
                {language === 'ur' ? 'تمام فلٹرز ختم کریں' : 'Clear All Filters'}
              </button>
            </div>
          ) : (
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: layout === 'grid' ? 'repeat(auto-fill, minmax(320px, 1fr))' : '1fr',
                gap: '1.5rem',
              }}
            >
              {filteredRecords.map(rec => (
                <RecordCard key={rec.id} record={rec} layout={layout} />
              ))}
            </div>
          )}
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .archive-explorer-grid {
            grid-template-columns: 1fr !important;
          }
          .mobile-filter-btn {
            display: inline-flex !important;
          }
          .mobile-filter-drawer {
            display: flex !important;
          }
        }
      `}</style>
    </div>
  );
};
