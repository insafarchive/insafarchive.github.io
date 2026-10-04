import React, { useState, useMemo } from 'react';
import { Language } from '../types';
import { demonstrationJudgments, JudgmentItem } from '../data/judgments';
import { translations } from '../data/translations';
import {
  FileText,
  Search,
  ShieldCheck,
  Scale,
  Calendar,
  ExternalLink,
  BookOpen,
} from 'lucide-react';

interface JudgmentsViewProps {
  lang: Language;
  onSelectJudgment: (judgment: JudgmentItem) => void;
}

export const JudgmentsView: React.FC<JudgmentsViewProps> = ({
  lang,
  onSelectJudgment,
}) => {
  const [search, setSearch] = useState('');
  const [courtFilter, setCourtFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');

  const t = translations;

  const filteredJudgments = useMemo(() => {
    return demonstrationJudgments.filter((j) => {
      if (search.trim()) {
        const q = search.toLowerCase();
        const matchTitle = j.title[lang].toLowerCase().includes(q);
        const matchCitation = j.citation.toLowerCase().includes(q);
        const matchSummary = j.summary[lang].toLowerCase().includes(q);
        const matchExtract = j.operativeExtract[lang].toLowerCase().includes(q);
        if (!matchTitle && !matchCitation && !matchSummary && !matchExtract) return false;
      }

      if (courtFilter !== 'all') {
        if (courtFilter === 'supreme' && !j.citation.includes('SCMR')) return false;
        if (courtFilter === 'high' && !j.citation.includes('Lah') && !j.citation.includes('PCrLJ')) return false;
      }

      if (categoryFilter !== 'all' && j.category !== categoryFilter) {
        return false;
      }

      return true;
    });
  }, [search, courtFilter, categoryFilter, lang]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="border-b border-slate-800 pb-6">
        <div className="text-xs font-semibold text-[#C5A85C] uppercase tracking-wider mb-1 font-urdu-ui">
          {lang === 'en' ? 'Law Reports & Judicial Decrees' : 'قانونی نظائر و عدالتی فیصلے'}
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-white font-legal-display font-urdu-ui">
          {t.judgmentsPage.title[lang]}
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl font-urdu-ui">
          {t.judgmentsPage.subtitle[lang]}
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-[#0E1738] border border-slate-800 rounded-lg p-4 sm:p-5 space-y-4">
        <div className="relative">
          <Search
            size={18}
            className="absolute left-3.5 rtl:left-auto rtl:right-3.5 top-1/2 -translate-y-1/2 text-slate-400"
          />
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={
              lang === 'en'
                ? 'Search by citation (e.g. 2024 SCMR 301), court, or ruling principle...'
                : 'حوالہ (مثلاً 2024 SCMR 301)، عدالت یا قانونی اصول سے تلاش کریں...'
            }
            className="w-full bg-[#111C3A] border border-slate-700/80 rounded-lg pl-10 pr-4 rtl:pl-4 rtl:pr-10 py-2.5 text-xs sm:text-sm text-white placeholder-slate-400 focus:outline-none focus:border-[#C5A85C] font-urdu-ui"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div>
            <label className="block text-slate-400 mb-1 font-urdu-ui font-medium">
              {lang === 'en' ? 'Judicial Forum' : 'عدالتی فورم'}
            </label>
            <select
              value={courtFilter}
              onChange={(e) => setCourtFilter(e.target.value)}
              className="w-full bg-[#111C3A] border border-slate-700 rounded px-2.5 py-1.5 text-slate-200 focus:outline-none focus:border-[#C5A85C] font-urdu-ui"
            >
              <option value="all">
                {lang === 'en' ? 'All Courts (Supreme & High Courts)' : 'تمام عدالتیں (سپریم کورٹ و ہائی کورٹس)'}
              </option>
              <option value="supreme">
                {lang === 'en' ? 'Supreme Court of Pakistan (SCMR)' : 'سپریم کورٹ آف پاکستان'}
              </option>
              <option value="high">
                {lang === 'en' ? 'Provincial High Courts (PLD / PCrLJ)' : 'صوبائی ہائی کورٹس'}
              </option>
            </select>
          </div>

          <div>
            <label className="block text-slate-400 mb-1 font-urdu-ui font-medium">
              {lang === 'en' ? 'Legal Domain' : 'قانونی موضوع'}
            </label>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="w-full bg-[#111C3A] border border-slate-700 rounded px-2.5 py-1.5 text-slate-200 focus:outline-none focus:border-[#C5A85C] font-urdu-ui"
            >
              <option value="all">{lang === 'en' ? 'All Domains' : 'تمام موضوعات'}</option>
              <option value="constitutional">{lang === 'en' ? 'Constitutional Law' : 'آئینی قانون'}</option>
              <option value="bail">{lang === 'en' ? 'Bail Jurisprudence' : 'ضمانت کے اصول'}</option>
              <option value="due_process">{lang === 'en' ? 'Due Process & Liberty' : 'شفاف ٹرائل و شخصی آزادی'}</option>
            </select>
          </div>
        </div>
      </div>

      {/* Judgments Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredJudgments.map((item) => (
          <div
            key={item.id}
            onClick={() => onSelectJudgment(item)}
            className="group bg-[#0E1738] hover:bg-[#121E42] border border-slate-800 hover:border-[#C5A85C]/40 rounded-xl p-6 cursor-pointer transition-all flex flex-col justify-between text-left rtl:text-right"
          >
            <div className="space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-slate-400">
                <span className="font-mono text-sm text-[#E0C57A] font-bold">
                  {item.citation}
                </span>

                <div className="flex items-center gap-1.5 text-emerald-400 bg-emerald-950/40 border border-emerald-500/30 px-2 py-0.5 rounded text-[11px]">
                  <ShieldCheck size={12} />
                  <span className="font-urdu-ui">{lang === 'en' ? 'Certified Copy' : 'مصدقہ نقل'}</span>
                </div>
              </div>

              <h3 className="text-base sm:text-lg font-semibold text-white group-hover:text-[#E0C57A] transition-colors font-urdu-ui">
                {item.title[lang]}
              </h3>

              <div className="text-xs text-slate-400 space-y-0.5">
                <div>
                  <strong className="text-slate-300 font-urdu-ui">{item.court[lang]}</strong>
                </div>
                <div className="font-urdu-ui">{item.bench[lang]}</div>
              </div>

              <blockquote className="p-3.5 rounded bg-[#111C3A] border-l-2 rtl:border-l-0 rtl:border-r-2 border-[#C5A85C] text-xs text-slate-300 italic font-prose-legal leading-relaxed">
                “{item.operativeExtract[lang]}”
              </blockquote>
            </div>

            <div className="mt-6 pt-3 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
              <div className="flex items-center gap-2 font-mono">
                <Calendar size={13} className="text-[#C5A85C]" />
                <span>{item.date}</span>
                <span>·</span>
                <span>{item.pagesCount} {lang === 'en' ? 'Pages' : 'صفحات'}</span>
              </div>

              <div className="inline-flex items-center gap-1 text-[#E0C57A] font-medium font-urdu-ui">
                <span>{t.actions.readDocument[lang]}</span>
                <ExternalLink size={13} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
