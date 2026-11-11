import React, { useState, useEffect, useMemo, useRef } from 'react';
import {
  Language,
  CaseRecord,
  ProceduralStatus,
  ArchiveCategory,
  Province,
  CourtLevel,
  RecordType,
  EditorialReviewStatus,
} from '../types';
import { translations } from '../data/translations';
import { CaseCard } from '../components/CaseCard';
import { StatusBadge } from '../components/StatusBadge';
import {
  FilterState,
  initialFilterState,
  searchAndFilterCases,
  filtersToQueryString,
  queryStringToFilters,
} from '../utils/searchIndex';
import {
  Search,
  RotateCcw,
  LayoutGrid,
  List as ListIcon,
  ChevronRight,
  ChevronLeft,
  Filter,
  X,
  MapPin,
  Calendar,
  FileText,
  Video,
} from 'lucide-react';

interface CasesArchiveViewProps {
  cases: CaseRecord[];
  lang: Language;
  onSelectCase: (caseItem: CaseRecord) => void;
  initialFilters?: Partial<FilterState>;
}

const PAGE_SIZE = 9;

export const CasesArchiveView: React.FC<CasesArchiveViewProps> = ({
  cases,
  lang,
  onSelectCase,
  initialFilters,
}) => {
  const [filters, setFilters] = useState<FilterState>(() => {
    // Attempt to read from URL search query if available
    const urlParams = typeof window !== 'undefined' ? queryStringToFilters(window.location.search) : {};
    return {
      ...initialFilterState,
      ...urlParams,
      ...(initialFilters || {}),
    };
  });

  const [searchInput, setSearchInput] = useState(filters.query);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);

  const t = translations;

  // Debounce search input into filter state
  useEffect(() => {
    const handler = setTimeout(() => {
      setFilters((prev) => (prev.query === searchInput ? prev : { ...prev, query: searchInput, page: 1 }));
    }, 250);
    return () => clearTimeout(handler);
  }, [searchInput]);

  // Sync state to URL search parameters for shareability
  useEffect(() => {
    const queryStr = filtersToQueryString(filters);
    if (typeof window !== 'undefined') {
      const newUrl = window.location.pathname + queryStr + window.location.hash;
      window.history.replaceState(null, '', newUrl);
    }
  }, [filters]);

  // Execute Search and Multi-Faceted Filter
  const { results, totalCount, highlightMap } = useMemo(() => {
    return searchAndFilterCases(cases, filters, lang);
  }, [cases, filters, lang]);

  // Pagination calculation
  const totalPages = Math.ceil(totalCount / PAGE_SIZE) || 1;
  const currentPage = Math.min(filters.page, totalPages);
  const paginatedResults = useMemo(() => {
    const startIdx = (currentPage - 1) * PAGE_SIZE;
    return results.slice(startIdx, startIdx + PAGE_SIZE);
  }, [results, currentPage]);

  const handlePageChange = (newPage: number) => {
    setFilters((prev) => ({ ...prev, page: Math.max(1, Math.min(newPage, totalPages)) }));
    window.scrollTo({ top: 220, behavior: 'smooth' });
  };

  const handleResetFilters = () => {
    setSearchInput('');
    setFilters(initialFilterState);
  };

  const removeSingleFilter = (key: keyof FilterState) => {
    setFilters((prev) => {
      const next = { ...prev, page: 1 };
      if (key === 'query') {
        setSearchInput('');
        next.query = '';
      } else if (key === 'hasDocumentsOnly') {
        next.hasDocumentsOnly = false;
      } else if (key === 'hasVideoOnly') {
        next.hasVideoOnly = false;
      } else {
        (next as any)[key] = 'all';
      }
      return next;
    });
  };

  // Extract unique incident years from records for year dropdown
  const availableYears = useMemo(() => {
    const yearsSet = new Set<string>();
    cases.forEach((c) => {
      const d = c.incidentDate || c.filingDate;
      if (d && d.length >= 4) {
        yearsSet.add(d.slice(0, 4));
      }
    });
    return Array.from(yearsSet).sort().reverse();
  }, [cases]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Page Header */}
      <div className="border-b border-slate-800 pb-6 text-left rtl:text-right">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="text-xs font-semibold text-[#C5A85C] uppercase tracking-wider mb-1 font-urdu-ui">
              {lang === 'en' ? 'Verifiable Legal Dockets' : 'مستند قانونی ریکارڈز'}
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white font-legal-display font-urdu-ui">
              {t.nav.cases[lang]}
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-3xl font-urdu-ui">
              {lang === 'en'
                ? 'Search and filter active petitions, procedural bail orders, judgments, and verifiable milestones across Pakistani jurisdictions.'
                : 'پاکستان کی مختلف عدالتوں کے آئینی مقدمات، ضمانت کے احکامات، بریت اور اہم عدالتی کارروائیوں کا جامع ریکارڈ۔'}
            </p>
          </div>

          {/* View Mode Toggle */}
          <div className="flex items-center gap-1 bg-[#111C3A] border border-slate-800 p-1 rounded">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded transition-colors ${
                viewMode === 'grid'
                  ? 'bg-[#C5A85C] text-[#0B132B]'
                  : 'text-slate-400 hover:text-white'
              }`}
              title="Grid View"
              aria-label="Grid view"
            >
              <LayoutGrid size={16} />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-1.5 rounded transition-colors ${
                viewMode === 'list'
                  ? 'bg-[#C5A85C] text-[#0B132B]'
                  : 'text-slate-400 hover:text-white'
              }`}
              title="List View"
              aria-label="List view"
            >
              <ListIcon size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Main Search Bar & Quick Facets Panel */}
      <div className="bg-[#0E1738] border border-slate-800 rounded-xl p-5 space-y-4 text-left rtl:text-right">
        {/* Search Input with Urdu & English normalization */}
        <div className="relative">
          <Search
            size={18}
            className="absolute left-3.5 rtl:left-auto rtl:right-3.5 top-1/2 -translate-y-1/2 text-slate-400"
          />
          <input
            type="search"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder={t.actions.searchPlaceholder[lang]}
            className="w-full bg-[#111C3A] border border-slate-700/80 rounded-lg pl-10 pr-10 rtl:pl-10 rtl:pr-10 py-3 text-xs sm:text-sm text-white placeholder-slate-400 focus:outline-none focus:border-[#C5A85C] font-urdu-ui"
          />
          {searchInput && (
            <button
              onClick={() => setSearchInput('')}
              className="absolute right-3.5 rtl:right-auto rtl:left-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
              aria-label="Clear query"
            >
              <X size={16} />
            </button>
          )}
        </div>

        {/* Primary Filter Selectors Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
          {/* Status Filter */}
          <div>
            <label className="block text-slate-400 mb-1 font-urdu-ui font-medium">
              {lang === 'en' ? 'Procedural Status' : 'قانونی کیفیت'}
            </label>
            <select
              value={filters.status}
              onChange={(e) => setFilters((p) => ({ ...p, status: e.target.value as any, page: 1 }))}
              className="w-full bg-[#111C3A] border border-slate-700 rounded px-2.5 py-2 text-slate-200 focus:outline-none focus:border-[#C5A85C] font-urdu-ui"
            >
              <option value="all">{lang === 'en' ? 'All Statuses' : 'تمام کیفیات'}</option>
              {Object.keys(t.statuses).map((k) => (
                <option key={k} value={k}>
                  {t.statuses[k as ProceduralStatus][lang]}
                </option>
              ))}
            </select>
          </div>

          {/* Province Filter */}
          <div>
            <label className="block text-slate-400 mb-1 font-urdu-ui font-medium">
              {lang === 'en' ? 'Province / Jurisdiction' : 'صوبہ / دائرۂ اختیار'}
            </label>
            <select
              value={filters.province}
              onChange={(e) => setFilters((p) => ({ ...p, province: e.target.value as any, page: 1 }))}
              className="w-full bg-[#111C3A] border border-slate-700 rounded px-2.5 py-2 text-slate-200 focus:outline-none focus:border-[#C5A85C] font-urdu-ui"
            >
              <option value="all">{lang === 'en' ? 'All Provinces' : 'تمام صوبے'}</option>
              {Object.keys(t.provinces).map((pk) => (
                <option key={pk} value={pk}>
                  {t.provinces[pk as Province]?.[lang] || pk}
                </option>
              ))}
            </select>
          </div>

          {/* Category Filter */}
          <div>
            <label className="block text-slate-400 mb-1 font-urdu-ui font-medium">
              {lang === 'en' ? 'Archive Category' : 'آرکائیو شعبہ'}
            </label>
            <select
              value={filters.category}
              onChange={(e) => setFilters((p) => ({ ...p, category: e.target.value as any, page: 1 }))}
              className="w-full bg-[#111C3A] border border-slate-700 rounded px-2.5 py-2 text-slate-200 focus:outline-none focus:border-[#C5A85C] font-urdu-ui"
            >
              <option value="all">{lang === 'en' ? 'All Categories' : 'تمام شعبہ جات'}</option>
              {Object.keys(t.categories).map((ck) => (
                <option key={ck} value={ck}>
                  {t.categories[ck as ArchiveCategory][lang]}
                </option>
              ))}
            </select>
          </div>

          {/* Sort Order */}
          <div>
            <label className="block text-slate-400 mb-1 font-urdu-ui font-medium">
              {lang === 'en' ? 'Sort Order' : 'ترتیب'}
            </label>
            <select
              value={filters.sortBy}
              onChange={(e) => setFilters((p) => ({ ...p, sortBy: e.target.value as any, page: 1 }))}
              className="w-full bg-[#111C3A] border border-slate-700 rounded px-2.5 py-2 text-slate-200 focus:outline-none focus:border-[#C5A85C] font-urdu-ui"
            >
              <option value="updated_desc">
                {lang === 'en' ? 'Recently Updated' : 'تازہ ترین تجدید'}
              </option>
              <option value="incident_desc">
                {lang === 'en' ? 'Incident Date (Newest)' : 'وقوعہ کی تاریخ (تازہ ترین)'}
              </option>
              <option value="incident_asc">
                {lang === 'en' ? 'Incident Date (Oldest)' : 'وقوعہ کی تاریخ (قدیم ترین)'}
              </option>
              <option value="filing_desc">
                {lang === 'en' ? 'Filing Date' : 'اندراج کی تاریخ'}
              </option>
              <option value="title_asc">
                {lang === 'en' ? 'Title (A-Z)' : 'عنوان کے مطابق'}
              </option>
            </select>
          </div>
        </div>

        {/* Toggle Advanced Filters (Court Level, Year, Documents, Video) */}
        <div className="flex items-center justify-between text-xs pt-1">
          <button
            onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
            className="inline-flex items-center gap-1.5 text-[#E0C57A] hover:underline font-urdu-ui font-medium"
          >
            <Filter size={13} />
            <span>
              {showAdvancedFilters
                ? lang === 'en' ? 'Hide Advanced Filters' : 'اضافی فلٹرز چھپائیں'
                : lang === 'en' ? 'Show Advanced Filters' : 'مزید اضافی فلٹرز دکھائیں'}
            </span>
          </button>
        </div>

        {/* Advanced Filters Expandable Grid */}
        {showAdvancedFilters && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-3 border-t border-slate-800 text-xs">
            {/* Court Level */}
            <div>
              <label className="block text-slate-400 mb-1 font-urdu-ui">
                {lang === 'en' ? 'Court Level' : 'عدالتی درجہ'}
              </label>
              <select
                value={filters.courtLevel}
                onChange={(e) => setFilters((p) => ({ ...p, courtLevel: e.target.value as any, page: 1 }))}
                className="w-full bg-[#111C3A] border border-slate-700 rounded px-2.5 py-1.5 text-slate-200 focus:outline-none focus:border-[#C5A85C] font-urdu-ui"
              >
                <option value="all">{lang === 'en' ? 'All Courts' : 'تمام عدالتی درجات'}</option>
                {Object.keys(t.courtLevels).map((ck) => (
                  <option key={ck} value={ck}>
                    {t.courtLevels[ck as CourtLevel][lang]}
                  </option>
                ))}
              </select>
            </div>

            {/* Incident Year */}
            <div>
              <label className="block text-slate-400 mb-1 font-urdu-ui">
                {lang === 'en' ? 'Incident / Filing Year' : 'وقوعہ کا سال'}
              </label>
              <select
                value={filters.year}
                onChange={(e) => setFilters((p) => ({ ...p, year: e.target.value, page: 1 }))}
                className="w-full bg-[#111C3A] border border-slate-700 rounded px-2.5 py-1.5 text-slate-200 focus:outline-none focus:border-[#C5A85C] font-urdu-ui"
              >
                <option value="all">{lang === 'en' ? 'All Years' : 'تمام سال'}</option>
                {availableYears.map((yr) => (
                  <option key={yr} value={yr}>
                    {yr}
                  </option>
                ))}
              </select>
            </div>

            {/* Editorial Review Status */}
            <div>
              <label className="block text-slate-400 mb-1 font-urdu-ui">
                {lang === 'en' ? 'Review Status' : 'ادارتی تصدیق'}
              </label>
              <select
                value={filters.reviewStatus}
                onChange={(e) => setFilters((p) => ({ ...p, reviewStatus: e.target.value as any, page: 1 }))}
                className="w-full bg-[#111C3A] border border-slate-700 rounded px-2.5 py-1.5 text-slate-200 focus:outline-none focus:border-[#C5A85C] font-urdu-ui"
              >
                <option value="all">{lang === 'en' ? 'All Review States' : 'تمام کیفیات'}</option>
                {Object.keys(t.editorialReview).map((rk) => (
                  <option key={rk} value={rk}>
                    {t.editorialReview[rk as EditorialReviewStatus][lang]}
                  </option>
                ))}
              </select>
            </div>

            {/* Checkbox Toggles: Has Docs / Has Video */}
            <div className="flex flex-col justify-end space-y-2 pt-1 font-urdu-ui">
              <label className="flex items-center gap-2 cursor-pointer text-slate-300">
                <input
                  type="checkbox"
                  checked={filters.hasDocumentsOnly}
                  onChange={(e) => setFilters((p) => ({ ...p, hasDocumentsOnly: e.target.checked, page: 1 }))}
                  className="rounded border-slate-700 text-[#C5A85C] focus:ring-[#C5A85C]"
                />
                <span>{lang === 'en' ? 'Linked Court Documents Only' : 'صرف منسلک عدالتی احکامات والے'}</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer text-slate-300">
                <input
                  type="checkbox"
                  checked={filters.hasVideoOnly}
                  onChange={(e) => setFilters((p) => ({ ...p, hasVideoOnly: e.target.checked, page: 1 }))}
                  className="rounded border-slate-700 text-[#C5A85C] focus:ring-[#C5A85C]"
                />
                <span>{lang === 'en' ? 'Verified Video Records Only' : 'صرف تصدیق شدہ ویڈیو والے'}</span>
              </label>
            </div>
          </div>
        )}

        {/* Active Filter Tags & Count Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-slate-800 text-xs">
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-slate-400 font-urdu-ui mr-1">
              {lang === 'en'
                ? `Showing ${results.length} of ${cases.length} records`
                : `${cases.length} میں سے ${results.length} ریکارڈز`}
            </span>

            {/* Query tag */}
            {filters.query && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-[#172346] text-[#E0C57A] border border-[#C5A85C]/30 text-[11px]">
                <span>"{filters.query}"</span>
                <button onClick={() => removeSingleFilter('query')} aria-label="Remove query filter">
                  <X size={12} />
                </button>
              </span>
            )}

            {/* Status tag */}
            {filters.status !== 'all' && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-[#172346] text-slate-200 border border-slate-700 text-[11px] font-urdu-ui">
                <span>{t.statuses[filters.status]?.[lang]}</span>
                <button onClick={() => removeSingleFilter('status')} aria-label="Remove status filter">
                  <X size={12} />
                </button>
              </span>
            )}

            {/* Province tag */}
            {filters.province !== 'all' && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-[#172346] text-slate-200 border border-slate-700 text-[11px] font-urdu-ui">
                <span>{t.provinces[filters.province]?.[lang]}</span>
                <button onClick={() => removeSingleFilter('province')} aria-label="Remove province filter">
                  <X size={12} />
                </button>
              </span>
            )}

            {/* Category tag */}
            {filters.category !== 'all' && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-[#172346] text-slate-200 border border-slate-700 text-[11px] font-urdu-ui">
                <span>{t.categories[filters.category]?.[lang]}</span>
                <button onClick={() => removeSingleFilter('category')} aria-label="Remove category filter">
                  <X size={12} />
                </button>
              </span>
            )}

            {/* Year tag */}
            {filters.year !== 'all' && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-[#172346] text-slate-200 border border-slate-700 text-[11px]">
                <span>{filters.year}</span>
                <button onClick={() => removeSingleFilter('year')} aria-label="Remove year filter">
                  <X size={12} />
                </button>
              </span>
            )}
          </div>

          {(filters.query ||
            filters.status !== 'all' ||
            filters.province !== 'all' ||
            filters.category !== 'all' ||
            filters.courtLevel !== 'all' ||
            filters.year !== 'all' ||
            filters.hasDocumentsOnly ||
            filters.hasVideoOnly) && (
            <button
              onClick={handleResetFilters}
              className="inline-flex items-center gap-1.5 text-[#E0C57A] hover:underline font-urdu-ui font-medium"
            >
              <RotateCcw size={12} />
              <span>{t.actions.resetFilters[lang]}</span>
            </button>
          )}
        </div>
      </div>

      {/* Case List or Empty State */}
      {paginatedResults.length === 0 ? (
        <div className="py-16 text-center bg-[#0E1738] border border-slate-800 rounded-xl space-y-3">
          <p className="text-slate-300 text-sm font-urdu-ui">
            {lang === 'en'
              ? 'No legal dockets matched your search or filter combination.'
              : 'منتخب کردہ معیار یا تلاش کے مطابق کوئی قانونی ریکارڈ نہیں ملا۔'}
          </p>
          <button
            onClick={handleResetFilters}
            className="px-4 py-2 bg-[#C5A85C] text-[#0B132B] font-semibold text-xs rounded hover:bg-[#E0C57A] transition-colors font-urdu-ui"
          >
            {t.actions.resetFilters[lang]}
          </button>
        </div>
      ) : viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {paginatedResults.map((caseItem) => (
            <CaseCard
              key={caseItem.id}
              caseItem={caseItem}
              lang={lang}
              onSelect={onSelectCase}
              highlightSnippet={highlightMap.get(caseItem.id)}
            />
          ))}
        </div>
      ) : (
        <div className="bg-[#0E1738] border border-slate-800 rounded-xl divide-y divide-slate-800">
          {paginatedResults.map((c) => (
            <div
              key={c.id}
              onClick={() => onSelectCase(c)}
              className="p-5 hover:bg-[#111C3A] cursor-pointer transition-colors flex flex-col md:flex-row md:items-center justify-between gap-4 text-left rtl:text-right"
            >
              <div className="space-y-1.5 flex-1">
                <div className="flex flex-wrap items-center gap-2 text-xs text-slate-400">
                  <span className="font-mono text-[#E0C57A] font-semibold">{c.caseNumber}</span>
                  <span>·</span>
                  <span className="font-urdu-ui">{c.court?.[lang] || c.id}</span>
                  <span>·</span>
                  <span className="font-urdu-ui">{t.provinces[c.location.province]?.[lang]}</span>
                  <span>·</span>
                  <span className="font-mono">{c.lastUpdated}</span>
                </div>
                <h3 className="text-base font-semibold text-white hover:text-[#E0C57A] font-urdu-ui">
                  {c.title[lang]}
                </h3>
                {highlightMap.has(c.id) ? (
                  <p className="text-xs text-amber-200/90 font-urdu-ui italic line-clamp-1">
                    “{highlightMap.get(c.id)}”
                  </p>
                ) : (
                  <p className="text-xs text-slate-300 line-clamp-1 max-w-3xl font-urdu-ui">
                    {c.summary[lang]}
                  </p>
                )}
              </div>

              <div className="flex items-center gap-4 shrink-0">
                <StatusBadge status={c.proceduralStatus} lang={lang} size="sm" />
                <ChevronRight size={16} className="text-[#C5A85C] rtl:rotate-180" />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-slate-800 text-xs">
          <div className="text-slate-400 font-urdu-ui">
            {t.actions.pageOf[lang]} <strong className="text-slate-200">{currentPage}</strong> {t.actions.ofPages[lang]}{' '}
            <strong className="text-slate-200">{totalPages}</strong>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage <= 1}
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded bg-[#111C3A] hover:bg-[#172346] text-slate-300 disabled:opacity-40 disabled:cursor-not-allowed border border-slate-800 font-urdu-ui"
            >
              <ChevronLeft size={14} className="rtl:rotate-180" />
              <span>{t.actions.prevPage[lang]}</span>
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => {
              if (
                p === 1 ||
                p === totalPages ||
                (p >= currentPage - 1 && p <= currentPage + 1)
              ) {
                return (
                  <button
                    key={p}
                    onClick={() => handlePageChange(p)}
                    className={`w-8 h-8 rounded text-xs font-mono font-medium transition-colors ${
                      p === currentPage
                        ? 'bg-[#C5A85C] text-[#0B132B] font-bold'
                        : 'bg-[#111C3A] text-slate-300 hover:bg-[#172346]'
                    }`}
                  >
                    {p}
                  </button>
                );
              }
              if (p === 2 && currentPage > 3) {
                return <span key="ellipsis-start" className="text-slate-600 px-1">...</span>;
              }
              if (p === totalPages - 1 && currentPage < totalPages - 2) {
                return <span key="ellipsis-end" className="text-slate-600 px-1">...</span>;
              }
              return null;
            })}

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage >= totalPages}
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded bg-[#111C3A] hover:bg-[#172346] text-slate-300 disabled:opacity-40 disabled:cursor-not-allowed border border-slate-800 font-urdu-ui"
            >
              <span>{t.actions.nextPage[lang]}</span>
              <ChevronRight size={14} className="rtl:rotate-180" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
