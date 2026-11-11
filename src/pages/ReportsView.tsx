import React, { useState } from 'react';
import { Language } from '../types';
import { demonstrationReports } from '../data/reports';
import { translations } from '../data/translations';
import { BookOpen, Calendar, ExternalLink, ShieldCheck, CheckCircle2, Search } from 'lucide-react';

interface ReportsViewProps {
  lang: Language;
}

export const ReportsView: React.FC<ReportsViewProps> = ({ lang }) => {
  const [search, setSearch] = useState('');
  const t = translations;

  const filteredReports = demonstrationReports.filter((r) => {
    if (!search.trim()) return true;
    const q = search.toLowerCase();
    return (
      r.title[lang].toLowerCase().includes(q) ||
      r.publisher[lang].toLowerCase().includes(q) ||
      r.executiveSummary[lang].toLowerCase().includes(q)
    );
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="border-b border-slate-800 pb-6">
        <div className="text-xs font-semibold text-[#C5A85C] uppercase tracking-wider mb-1 font-urdu-ui">
          {lang === 'en' ? 'Independent Civil Liberties Documentation' : 'آزاد قانونی و انسانی حقوق ریکارڈ'}
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-white font-legal-display font-urdu-ui">
          {t.reportsPage.title[lang]}
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl font-urdu-ui">
          {t.reportsPage.subtitle[lang]}
        </p>
      </div>

      {/* Search Input */}
      <div className="relative max-w-xl">
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
              ? 'Search reports by title, publisher, or legal topic...'
              : 'رپورٹ کے عنوان، ناشر یا موضوع سے تلاش کریں...'
          }
          className="w-full bg-[#111C3A] border border-slate-700/80 rounded-lg pl-10 pr-4 rtl:pl-4 rtl:pr-10 py-2.5 text-xs sm:text-sm text-white placeholder-slate-400 focus:outline-none focus:border-[#C5A85C] font-urdu-ui"
        />
      </div>

      {/* Reports List */}
      <div className="space-y-6">
        {filteredReports.map((report) => (
          <div
            key={report.id}
            className="bg-[#0E1738] border border-slate-800 rounded-xl p-6 sm:p-8 space-y-6 text-left rtl:text-right"
          >
            {/* Publisher & Date Metadata */}
            <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-slate-400 border-b border-slate-800 pb-4">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-[#E0C57A] font-urdu-ui">
                  {report.publisher[lang]}
                </span>
                <span>·</span>
                <span className="font-mono">{report.publicationDate}</span>
                <span>·</span>
                <span>{report.pagesCount} {lang === 'en' ? 'Pages' : 'صفحات'}</span>
              </div>

              <div className="flex flex-wrap gap-1.5">
                {report.topics.map((tp) => (
                  <span
                    key={tp}
                    className="text-[11px] px-2 py-0.5 rounded bg-[#111C3A] border border-slate-700 text-slate-300 font-urdu-ui"
                  >
                    {t.categories[tp]?.[lang] || tp}
                  </span>
                ))}
              </div>
            </div>

            {/* Title & Executive Summary */}
            <div className="space-y-3">
              <h2 className="text-xl sm:text-2xl font-bold text-white font-urdu-ui">
                {report.title[lang]}
              </h2>
              <div className="space-y-1">
                <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider font-urdu-ui">
                  {t.reportsPage.executiveSummary[lang]}
                </div>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-urdu-ui">
                  {report.executiveSummary[lang]}
                </p>
              </div>
            </div>

            {/* Key Documented Findings */}
            <div className="p-4 sm:p-5 rounded-lg bg-[#111C3A] border border-slate-800 space-y-2.5">
              <h3 className="text-xs font-semibold text-[#E0C57A] uppercase tracking-wider font-urdu-ui">
                {t.reportsPage.keyFindings[lang]}
              </h3>
              <ul className="space-y-2 text-xs sm:text-sm text-slate-300">
                {report.keyFindings.map((finding, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 font-urdu-ui">
                    <CheckCircle2 size={16} className="text-[#C5A85C] shrink-0 mt-0.5" />
                    <span>{finding[lang]}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Actions */}
            <div className="pt-2 flex justify-end">
              <a
                href={report.sourceUrl}
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#172346] hover:bg-[#C5A85C] hover:text-[#0B132B] text-slate-200 text-xs font-medium rounded transition-colors font-urdu-ui"
              >
                <span>{t.reportsPage.readOriginalReport[lang]}</span>
                <ExternalLink size={13} />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
