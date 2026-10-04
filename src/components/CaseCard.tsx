import React from 'react';
import { CaseRecord, Language } from '../types';
import { StatusBadge } from './StatusBadge';
import { translations } from '../data/translations';
import { Calendar, FileText, ChevronRight, Video, MapPin } from 'lucide-react';

interface CaseCardProps {
  caseItem: CaseRecord;
  lang: Language;
  onSelect: (caseItem: CaseRecord) => void;
  highlightSnippet?: string;
}

export const CaseCard: React.FC<CaseCardProps> = ({
  caseItem,
  lang,
  onSelect,
  highlightSnippet,
}) => {
  const t = translations;
  const provinceLabel = t.provinces[caseItem.location.province]?.[lang] || '';

  return (
    <div
      onClick={() => onSelect(caseItem)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onSelect(caseItem);
        }
      }}
      tabIndex={0}
      role="button"
      className="group text-left rtl:text-right bg-[#111C3A] hover:bg-[#162347] border border-slate-800 hover:border-[#C5A85C]/40 rounded-lg p-5 sm:p-6 transition-all cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A85C] flex flex-col justify-between"
    >
      <div>
        {/* Top Unboxed Metadata Line with typographic separators */}
        <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-slate-400 mb-3">
          <div className="flex flex-wrap items-center gap-1.5 font-mono text-[#E0C57A] tracking-wider text-[11px]">
            <span>{caseItem.caseNumber}</span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <span className="font-urdu-ui text-slate-300 font-sans">
              {caseItem.court?.[lang] || caseItem.id}
            </span>
          </div>

          <StatusBadge status={caseItem.proceduralStatus} lang={lang} size="sm" />
        </div>

        {/* Case Title */}
        <h3 className="text-base sm:text-lg font-semibold text-white group-hover:text-[#E0C57A] transition-colors leading-snug mb-2 font-urdu-ui">
          {caseItem.title[lang]}
        </h3>

        {/* Location & Tags Strip */}
        <div className="flex items-center gap-1 text-xs text-slate-400 mb-3 font-urdu-ui">
          <MapPin size={13} className="text-[#C5A85C] shrink-0" />
          <span>
            {provinceLabel}
            {caseItem.location.district ? ` · ${caseItem.location.district}` : ''}
          </span>
        </div>

        {/* Highlight Snippet or Summary */}
        {highlightSnippet ? (
          <div className="p-2 rounded bg-[#091024] border border-[#C5A85C]/30 text-xs text-amber-200/90 mb-4 font-urdu-ui">
            <span className="text-[10px] text-[#C5A85C] uppercase block mb-0.5">
              {lang === 'en' ? 'Matched in record:' : 'تلاش کا مماثل حصہ:'}
            </span>
            <span className="line-clamp-2 leading-relaxed">“{highlightSnippet}”</span>
          </div>
        ) : (
          <p className="text-xs sm:text-sm text-slate-300 line-clamp-2 leading-relaxed mb-4 font-urdu-ui">
            {caseItem.summary[lang]}
          </p>
        )}
      </div>

      {/* Card Footer Info */}
      <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1 font-urdu-ui">
            <Calendar size={13} className="text-[#C5A85C]" />
            <span>{caseItem.lastUpdated}</span>
          </span>

          {caseItem.connectedDocuments && caseItem.connectedDocuments.length > 0 && (
            <span className="flex items-center gap-1 font-urdu-ui text-slate-400">
              <FileText size={13} />
              <span>{caseItem.connectedDocuments.length} {lang === 'en' ? 'docs' : 'دستاویزات'}</span>
            </span>
          )}

          {caseItem.videoEvidence && caseItem.videoEvidence.length > 0 && (
            <span className="flex items-center gap-1 font-urdu-ui text-slate-400">
              <Video size={13} />
              <span>{caseItem.videoEvidence.length} {lang === 'en' ? 'video' : 'ویڈیو'}</span>
            </span>
          )}
        </div>

        <div className="inline-flex items-center gap-1 text-[#E0C57A] font-medium group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5 transition-transform font-urdu-ui">
          <span>{t.actions.viewCase[lang]}</span>
          <ChevronRight size={14} className="rtl:rotate-180" />
        </div>
      </div>
    </div>
  );
};
