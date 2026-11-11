import React, { useState, useEffect, useRef } from 'react';
import { Search, X, FileText, Scale, BookOpen, Video, ArrowRight } from 'lucide-react';
import { Language, CaseRecord } from '../types';
import { translations } from '../data/translations';
import { demonstrationJudgments, JudgmentItem } from '../data/judgments';
import { demonstrationReports } from '../data/reports';
import { demonstrationVideos } from '../data/videos';
import { normalizeSearchText } from '../utils/urduNormalize';

interface GlobalSearchModalProps {
  cases: CaseRecord[];
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
  onSelectCase: (caseItem: CaseRecord) => void;
  onSelectJudgment: (judgment: JudgmentItem) => void;
  onNavigate: (page: string) => void;
}

export const GlobalSearchModal: React.FC<GlobalSearchModalProps> = ({
  cases,
  isOpen,
  onClose,
  lang,
  onSelectCase,
  onSelectJudgment,
  onNavigate,
}) => {
  const [query, setQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'all' | 'cases' | 'judgments' | 'reports' | 'videos'>('all');
  const inputRef = useRef<HTMLInputElement>(null);
  const t = translations;

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) {
          onClose();
        }
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const normalizedQuery = normalizeSearchText(query);
  const queryTokens = normalizedQuery.split(' ').filter(Boolean);

  // Filter cases with token and Urdu normalization
  const filteredCases = cases.filter((c) => {
    if (queryTokens.length === 0) return true;
    const corpus = normalizeSearchText(
      `${c.id} ${c.caseNumber} ${c.title.en} ${c.title.ur} ${c.summary.en} ${c.summary.ur} ${c.court?.en || ''} ${c.court?.ur || ''} ${c.location.district || ''}`
    );
    return queryTokens.every((token) => corpus.includes(token));
  });

  // Filter judgments
  const filteredJudgments = demonstrationJudgments.filter((j) => {
    if (queryTokens.length === 0) return true;
    const corpus = normalizeSearchText(`${j.citation} ${j.title.en} ${j.title.ur} ${j.court.en} ${j.court.ur} ${j.summary.en} ${j.summary.ur}`);
    return queryTokens.every((token) => corpus.includes(token));
  });

  // Filter reports
  const filteredReports = demonstrationReports.filter((r) => {
    if (queryTokens.length === 0) return true;
    const corpus = normalizeSearchText(`${r.title.en} ${r.title.ur} ${r.publisher.en} ${r.publisher.ur} ${r.executiveSummary.en} ${r.executiveSummary.ur}`);
    return queryTokens.every((token) => corpus.includes(token));
  });

  // Filter videos
  const filteredVideos = demonstrationVideos.filter((v) => {
    if (queryTokens.length === 0) return true;
    const corpus = normalizeSearchText(`${v.title.en} ${v.title.ur} ${v.channel} ${v.verificationNotes.en} ${v.verificationNotes.ur}`);
    return queryTokens.every((token) => corpus.includes(token));
  });

  const totalResults =
    filteredCases.length +
    filteredJudgments.length +
    filteredReports.length +
    filteredVideos.length;

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-14 sm:pt-20 px-4 bg-black/75 backdrop-blur-xs"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="global-search-title"
    >
      <div
        className="w-full max-w-3xl bg-[#0E1738] border border-[#C5A85C]/30 rounded-xl shadow-2xl overflow-hidden flex flex-col max-h-[80vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3.5 border-b border-slate-800 bg-[#111C3A]">
          <Search size={18} className="text-[#C5A85C] shrink-0" />
          <input
            ref={inputRef}
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t.actions.searchPlaceholder[lang]}
            className="w-full bg-transparent border-0 px-3 text-white placeholder-slate-400 focus:outline-none text-sm font-urdu-ui"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 text-slate-400 hover:text-white rounded"
              aria-label="Clear search input"
            >
              <X size={16} />
            </button>
          )}
          <kbd className="hidden sm:inline-block text-[11px] text-slate-400 bg-slate-800 px-1.5 py-0.5 rounded border border-slate-700 ml-2">
            ESC
          </kbd>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-1 px-4 py-2 bg-[#091024] border-b border-slate-800/80 overflow-x-auto text-xs">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-3 py-1 rounded font-medium whitespace-nowrap transition-colors font-urdu-ui ${
              activeTab === 'all'
                ? 'bg-[#C5A85C] text-[#0B132B] font-semibold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            {lang === 'en' ? `All (${totalResults})` : `تمام (${totalResults})`}
          </button>
          <button
            onClick={() => setActiveTab('cases')}
            className={`px-3 py-1 rounded font-medium whitespace-nowrap transition-colors font-urdu-ui ${
              activeTab === 'cases'
                ? 'bg-[#C5A85C] text-[#0B132B] font-semibold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            {t.nav.cases[lang]} ({filteredCases.length})
          </button>
          <button
            onClick={() => setActiveTab('judgments')}
            className={`px-3 py-1 rounded font-medium whitespace-nowrap transition-colors font-urdu-ui ${
              activeTab === 'judgments'
                ? 'bg-[#C5A85C] text-[#0B132B] font-semibold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            {t.nav.judgments[lang]} ({filteredJudgments.length})
          </button>
          <button
            onClick={() => setActiveTab('reports')}
            className={`px-3 py-1 rounded font-medium whitespace-nowrap transition-colors font-urdu-ui ${
              activeTab === 'reports'
                ? 'bg-[#C5A85C] text-[#0B132B] font-semibold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            {t.nav.reports[lang]} ({filteredReports.length})
          </button>
          <button
            onClick={() => setActiveTab('videos')}
            className={`px-3 py-1 rounded font-medium whitespace-nowrap transition-colors font-urdu-ui ${
              activeTab === 'videos'
                ? 'bg-[#C5A85C] text-[#0B132B] font-semibold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            {t.nav.videos[lang]} ({filteredVideos.length})
          </button>
        </div>

        {/* Results List */}
        <div className="overflow-y-auto p-4 space-y-4 flex-1">
          {totalResults === 0 ? (
            <div className="py-12 text-center text-slate-400 text-sm">
              <p className="font-urdu-ui">
                {lang === 'en'
                  ? 'No matching records found. Try searching by docket number, court, or keyword.'
                  : 'کوئی ریکارڈ نہیں ملا۔ مقدمہ نمبر، عدالت یا دیگر الفاظ سے تلاش کیجیے۔'}
              </p>
            </div>
          ) : (
            <>
              {/* Cases Group */}
              {(activeTab === 'all' || activeTab === 'cases') &&
                filteredCases.length > 0 && (
                  <div>
                    <h4 className="text-[11px] font-semibold tracking-wider text-[#C5A85C] uppercase mb-2 font-urdu-ui flex items-center gap-1.5">
                      <Scale size={13} />
                      <span>{t.nav.cases[lang]}</span>
                    </h4>
                    <div className="space-y-2">
                      {filteredCases.map((c) => (
                        <div
                          key={c.id}
                          onClick={() => {
                            onSelectCase(c);
                            onClose();
                          }}
                          className="p-3 bg-[#111C3A] hover:bg-[#162347] border border-slate-800 rounded cursor-pointer transition-colors text-left rtl:text-right"
                        >
                          <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
                            <span className="font-mono text-[#E0C57A]">{c.caseNumber}</span>
                            <span>{c.court?.[lang] || c.courtLevel}</span>
                          </div>
                          <div className="text-sm font-semibold text-white font-urdu-ui">
                            {c.title[lang]}
                          </div>
                          <div className="text-xs text-slate-300 line-clamp-1 mt-1 font-urdu-ui">
                            {c.summary[lang]}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

              {/* Judgments Group */}
              {(activeTab === 'all' || activeTab === 'judgments') &&
                filteredJudgments.length > 0 && (
                  <div>
                    <h4 className="text-[11px] font-semibold tracking-wider text-[#C5A85C] uppercase mb-2 font-urdu-ui flex items-center gap-1.5">
                      <FileText size={13} />
                      <span>{t.nav.judgments[lang]}</span>
                    </h4>
                    <div className="space-y-2">
                      {filteredJudgments.map((j) => (
                        <div
                          key={j.id}
                          onClick={() => {
                            onSelectJudgment(j);
                            onClose();
                          }}
                          className="p-3 bg-[#111C3A] hover:bg-[#162347] border border-slate-800 rounded cursor-pointer transition-colors text-left rtl:text-right"
                        >
                          <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
                            <span className="font-mono text-[#E0C57A] font-semibold">{j.citation}</span>
                            <span>{j.court[lang]}</span>
                          </div>
                          <div className="text-sm font-semibold text-white font-urdu-ui">
                            {j.title[lang]}
                          </div>
                          <div className="text-xs text-slate-300 line-clamp-1 mt-1 font-urdu-ui">
                            {j.summary[lang]}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

              {/* Reports Group */}
              {(activeTab === 'all' || activeTab === 'reports') &&
                filteredReports.length > 0 && (
                  <div>
                    <h4 className="text-[11px] font-semibold tracking-wider text-[#C5A85C] uppercase mb-2 font-urdu-ui flex items-center gap-1.5">
                      <BookOpen size={13} />
                      <span>{t.nav.reports[lang]}</span>
                    </h4>
                    <div className="space-y-2">
                      {filteredReports.map((r) => (
                        <div
                          key={r.id}
                          onClick={() => {
                            onNavigate('reports');
                            onClose();
                          }}
                          className="p-3 bg-[#111C3A] hover:bg-[#162347] border border-slate-800 rounded cursor-pointer transition-colors text-left rtl:text-right"
                        >
                          <div className="text-xs text-slate-400 mb-1">
                            {r.publisher[lang]} · {r.publicationDate}
                          </div>
                          <div className="text-sm font-semibold text-white font-urdu-ui">
                            {r.title[lang]}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

              {/* Videos Group */}
              {(activeTab === 'all' || activeTab === 'videos') &&
                filteredVideos.length > 0 && (
                  <div>
                    <h4 className="text-[11px] font-semibold tracking-wider text-[#C5A85C] uppercase mb-2 font-urdu-ui flex items-center gap-1.5">
                      <Video size={13} />
                      <span>{t.nav.videos[lang]}</span>
                    </h4>
                    <div className="space-y-2">
                      {filteredVideos.map((v) => (
                        <div
                          key={v.id}
                          onClick={() => {
                            onNavigate('videos');
                            onClose();
                          }}
                          className="p-3 bg-[#111C3A] hover:bg-[#162347] border border-slate-800 rounded cursor-pointer transition-colors text-left rtl:text-right"
                        >
                          <div className="text-xs text-slate-400 mb-1">
                            {v.channel} · {v.recordedDate}
                          </div>
                          <div className="text-sm font-semibold text-white font-urdu-ui">
                            {v.title[lang]}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};
