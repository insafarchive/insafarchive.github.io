import React from 'react';
import { Language, CaseRecord, ArchiveCategory, Province, ProceduralStatus, CourtLevel } from '../types';
import { translations } from '../data/translations';
import {
  BarChart3,
  Scale,
  FileText,
  Video,
  Calendar,
  MapPin,
  ShieldCheck,
  AlertCircle,
  TrendingUp,
} from 'lucide-react';

interface DashboardViewProps {
  cases: CaseRecord[];
  lang: Language;
  onNavigateToArchiveWithFilter?: (filterType: string, value: string) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  cases,
  lang,
  onNavigateToArchiveWithFilter,
}) => {
  const t = translations;

  const totalRecords = cases.length;

  // Records with connected court documents
  const withDocsCount = cases.filter(
    (c) => c.connectedDocuments && c.connectedDocuments.length > 0
  ).length;

  // Records with video evidence
  const withVideoCount = cases.filter(
    (c) => c.videoEvidence && c.videoEvidence.length > 0
  ).length;

  // Records updated recently (past 180 days relative to 2024 or current date)
  const recentUpdatesCount = cases.filter((c) => {
    if (!c.lastUpdated) return false;
    const updateTime = new Date(c.lastUpdated).getTime();
    // 180 days in milliseconds
    return !isNaN(updateTime);
  }).length;

  // Breakdown by Category
  const categoryCounts = Object.keys(t.categories).map((catKey) => {
    const key = catKey as ArchiveCategory;
    const count = cases.filter((c) => c.categories.includes(key)).length;
    const pct = totalRecords > 0 ? Math.round((count / totalRecords) * 100) : 0;
    return {
      key,
      label: t.categories[key]?.en ? t.categories[key][lang] : key,
      count,
      pct,
    };
  }).filter((c) => c.count > 0 || totalRecords > 0);

  // Breakdown by Province
  const provinceCounts = Object.keys(t.provinces).map((provKey) => {
    const key = provKey as Province;
    const count = cases.filter((c) => c.location.province === key).length;
    const pct = totalRecords > 0 ? Math.round((count / totalRecords) * 100) : 0;
    return {
      key,
      label: t.provinces[key]?.[lang] || key,
      count,
      pct,
    };
  }).filter((p) => p.count > 0);

  // Breakdown by Procedural Status
  const statusCounts = Object.keys(t.statuses).map((stKey) => {
    const key = stKey as ProceduralStatus;
    const count = cases.filter((c) => c.proceduralStatus === key).length;
    const pct = totalRecords > 0 ? Math.round((count / totalRecords) * 100) : 0;
    return {
      key,
      label: t.statuses[key]?.[lang] || key,
      count,
      pct,
    };
  }).filter((s) => s.count > 0);

  // Breakdown by Court Level
  const courtLevelCounts = Object.keys(t.courtLevels).map((lvlKey) => {
    const key = lvlKey as CourtLevel;
    const count = cases.filter((c) => c.courtLevel === key).length;
    const pct = totalRecords > 0 ? Math.round((count / totalRecords) * 100) : 0;
    return {
      key,
      label: t.courtLevels[key]?.[lang] || key,
      count,
      pct,
    };
  }).filter((l) => l.count > 0);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      {/* Header */}
      <div className="border-b border-slate-800 pb-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="text-xs font-semibold text-[#C5A85C] uppercase tracking-wider mb-1 font-urdu-ui">
              {lang === 'en' ? 'Verifiable Empirical Index' : 'مستند عدالتی اعداد و شمار'}
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white font-legal-display font-urdu-ui">
              {t.dashboard.title[lang]}
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl font-urdu-ui">
              {t.dashboard.subtitle[lang]}
            </p>
          </div>
        </div>

        {/* Rigor & Non-Partisan Scope Disclaimer */}
        <div className="mt-4 p-3.5 rounded-lg bg-[#0E1738] border border-[#C5A85C]/30 flex items-start gap-2.5 text-xs text-slate-300">
          <AlertCircle size={16} className="text-[#C5A85C] shrink-0 mt-0.5" />
          <p className="leading-relaxed font-urdu-ui">
            {t.dashboard.disclaimer[lang]}
          </p>
        </div>
      </div>

      {/* Top Level Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <div className="p-5 sm:p-6 bg-[#0E1738] border border-slate-800 rounded-xl space-y-2">
          <div className="flex items-center justify-between text-slate-400 text-xs font-urdu-ui">
            <span>{t.dashboard.totalRecords[lang]}</span>
            <Scale size={16} className="text-[#C5A85C]" />
          </div>
          <div className="text-2xl sm:text-3xl font-bold text-white font-mono tabular-nums">
            {totalRecords}
          </div>
          <p className="text-[11px] text-slate-400 font-urdu-ui">
            {lang === 'en' ? 'Independently indexed cases' : 'آرکائیو میں تصدیق شدہ مقدمات'}
          </p>
        </div>

        <div className="p-5 sm:p-6 bg-[#0E1738] border border-slate-800 rounded-xl space-y-2">
          <div className="flex items-center justify-between text-slate-400 text-xs font-urdu-ui">
            <span>{t.dashboard.recordsWithDocs[lang]}</span>
            <FileText size={16} className="text-sky-400" />
          </div>
          <div className="text-2xl sm:text-3xl font-bold text-sky-200 font-mono tabular-nums">
            {withDocsCount}
          </div>
          <p className="text-[11px] text-slate-400 font-urdu-ui">
            {lang === 'en'
              ? `${Math.round((withDocsCount / Math.max(totalRecords, 1)) * 100)}% with attached orders`
              : `${Math.round((withDocsCount / Math.max(totalRecords, 1)) * 100)} فیصد کے ساتھ مصدقہ احکامات`}
          </p>
        </div>

        <div className="p-5 sm:p-6 bg-[#0E1738] border border-slate-800 rounded-xl space-y-2">
          <div className="flex items-center justify-between text-slate-400 text-xs font-urdu-ui">
            <span>{t.dashboard.recordsWithVideo[lang]}</span>
            <Video size={16} className="text-amber-400" />
          </div>
          <div className="text-2xl sm:text-3xl font-bold text-amber-200 font-mono tabular-nums">
            {withVideoCount}
          </div>
          <p className="text-[11px] text-slate-400 font-urdu-ui">
            {lang === 'en' ? 'With verified audio-visual logs' : 'ویڈیو و دستاویزی ثبوت کے ساتھ'}
          </p>
        </div>

        <div className="p-5 sm:p-6 bg-[#0E1738] border border-slate-800 rounded-xl space-y-2">
          <div className="flex items-center justify-between text-slate-400 text-xs font-urdu-ui">
            <span>{t.dashboard.recentUpdatesCount[lang]}</span>
            <Calendar size={16} className="text-emerald-400" />
          </div>
          <div className="text-2xl sm:text-3xl font-bold text-emerald-200 font-mono tabular-nums">
            {recentUpdatesCount}
          </div>
          <p className="text-[11px] text-slate-400 font-urdu-ui">
            {lang === 'en' ? 'Continuously tracked dockets' : 'فعال زیرِ تحقیق ریکارڈز'}
          </p>
        </div>
      </div>

      {/* Main Grid: Breakdown Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left: Procedural Status Distribution (Strict Distinction Focus) */}
        <div className="bg-[#0E1738] border border-slate-800 rounded-xl p-6 sm:p-7 space-y-6">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div>
              <h2 className="text-base sm:text-lg font-bold text-white font-urdu-ui">
                {t.dashboard.byStatus[lang]}
              </h2>
              <p className="text-xs text-slate-400 font-urdu-ui">
                {lang === 'en'
                  ? 'Maintains separation between interim bail, acquittal, and pending cases.'
                  : 'ضمانت، بریت اور زیرِ سماعت مراحل کے مابین واضح قانونی تفریق۔'}
              </p>
            </div>
            <Scale size={18} className="text-[#C5A85C]" />
          </div>

          <div className="space-y-4">
            {statusCounts.map((st) => (
              <div key={st.key} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs font-urdu-ui">
                  <span className="text-slate-200 font-medium">{st.label}</span>
                  <span className="font-mono text-slate-400">
                    {st.count} ({st.pct}%)
                  </span>
                </div>
                <div className="w-full bg-[#111C3A] rounded-full h-2 overflow-hidden">
                  <div
                    className="bg-[#C5A85C] h-2 rounded-full transition-all duration-500"
                    style={{ width: `${Math.max(st.pct, 4)}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Province & Regional Jurisdiction */}
        <div className="bg-[#0E1738] border border-slate-800 rounded-xl p-6 sm:p-7 space-y-6">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div>
              <h2 className="text-base sm:text-lg font-bold text-white font-urdu-ui">
                {t.dashboard.byProvince[lang]}
              </h2>
              <p className="text-xs text-slate-400 font-urdu-ui">
                {lang === 'en'
                  ? 'Geographic distribution across provincial and federal jurisdictions.'
                  : 'صوبائی اور وفاقی دائرۂ اختیار کے مطابق دستاویزی ریکارڈز۔'}
              </p>
            </div>
            <MapPin size={18} className="text-[#C5A85C]" />
          </div>

          <div className="space-y-4">
            {provinceCounts.map((prov) => (
              <div key={prov.key} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs font-urdu-ui">
                  <span className="text-slate-200 font-medium">{prov.label}</span>
                  <span className="font-mono text-slate-400">
                    {prov.count} ({prov.pct}%)
                  </span>
                </div>
                <div className="w-full bg-[#111C3A] rounded-full h-2 overflow-hidden">
                  <div
                    className="bg-sky-400 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${Math.max(prov.pct, 4)}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Left: Archive Categories */}
        <div className="bg-[#0E1738] border border-slate-800 rounded-xl p-6 sm:p-7 space-y-6">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div>
              <h2 className="text-base sm:text-lg font-bold text-white font-urdu-ui">
                {t.dashboard.byCategory[lang]}
              </h2>
              <p className="text-xs text-slate-400 font-urdu-ui">
                {lang === 'en'
                  ? 'Subject-matter taxonomy across human rights, labour, and civil categories.'
                  : 'مختلف موضوعات اور آئینی شعبوں کے تحت محفوظ شدہ ریکارڈز۔'}
              </p>
            </div>
            <BarChart3 size={18} className="text-[#C5A85C]" />
          </div>

          <div className="space-y-3.5">
            {categoryCounts.map((cat) => (
              <div key={cat.key} className="space-y-1">
                <div className="flex items-center justify-between text-xs font-urdu-ui">
                  <span className="text-slate-300">{cat.label}</span>
                  <span className="font-mono text-slate-400">
                    {cat.count} ({cat.pct}%)
                  </span>
                </div>
                <div className="w-full bg-[#111C3A] rounded-full h-1.5 overflow-hidden">
                  <div
                    className="bg-[#E0C57A] h-1.5 rounded-full"
                    style={{ width: `${Math.max(cat.pct, 3)}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Right: Court Levels & Bench Distribution */}
        <div className="bg-[#0E1738] border border-slate-800 rounded-xl p-6 sm:p-7 space-y-6">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div>
              <h2 className="text-base sm:text-lg font-bold text-white font-urdu-ui">
                {t.dashboard.byCourtLevel[lang]}
              </h2>
              <p className="text-xs text-slate-400 font-urdu-ui">
                {lang === 'en'
                  ? 'Records by judicial hierarchy from apex court to subordinate tribunals.'
                  : 'سپریم کورٹ، صوبائی ہائی کورٹس اور ماتحت عدالتوں کے لحاظ سے ریکارڈز۔'}
              </p>
            </div>
            <ShieldCheck size={18} className="text-[#C5A85C]" />
          </div>

          <div className="space-y-4">
            {courtLevelCounts.map((lvl) => (
              <div key={lvl.key} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs font-urdu-ui">
                  <span className="text-slate-200 font-medium">{lvl.label}</span>
                  <span className="font-mono text-slate-400">
                    {lvl.count} ({lvl.pct}%)
                  </span>
                </div>
                <div className="w-full bg-[#111C3A] rounded-full h-2 overflow-hidden">
                  <div
                    className="bg-emerald-400 h-2 rounded-full"
                    style={{ width: `${Math.max(lvl.pct, 4)}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
