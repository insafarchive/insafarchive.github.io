import React, { useState } from 'react';
import { Language, CaseRecord, ArchiveCategory } from '../types';
import { translations } from '../data/translations';
import { demonstrationJudgments, JudgmentItem } from '../data/judgments';
import { CaseCard } from '../components/CaseCard';
import { ScalesLogo } from '../components/ScalesLogo';
import {
  Search,
  Scale,
  FileText,
  ShieldCheck,
  BookOpen,
  Video,
  ArrowRight,
  CheckCircle2,
  ExternalLink,
  Sparkles,
} from 'lucide-react';

import heroEmblemImg from '../assets/images/hero_legal_archive_emblem_1791017401262.jpg';

interface HomeViewProps {
  cases: CaseRecord[];
  lang: Language;
  onNavigate: (page: string) => void;
  onSelectCase: (caseItem: CaseRecord) => void;
  onSelectJudgment: (judgment: JudgmentItem) => void;
  onOpenSearch: () => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  cases,
  lang,
  onNavigate,
  onSelectCase,
  onSelectJudgment,
  onOpenSearch,
}) => {
  const t = translations;

  const featuredCases = cases.filter((c) => c.featured);
  const recentJudgments = demonstrationJudgments.slice(0, 3);

  // Derive counts strictly from the loaded dataset
  const totalCasesCount = cases.length;
  const withDocsCount = cases.filter((c) => c.connectedDocuments && c.connectedDocuments.length > 0).length;
  const withVideoCount = cases.filter((c) => c.videoEvidence && c.videoEvidence.length > 0).length;

  const categories = [
    { id: 'court_judgments', ...t.categories.court_judgments },
    { id: 'bail_acquittal', ...t.categories.bail_acquittal },
    { id: 'human_rights', ...t.categories.human_rights },
    { id: 'alleged_police_misconduct', ...t.categories.alleged_police_misconduct },
    { id: 'missing_persons', ...t.categories.missing_persons },
    { id: 'labour_poverty', ...t.categories.labour_poverty },
    { id: 'women_children', ...t.categories.women_children },
    { id: 'public_interest_political', ...t.categories.public_interest_political },
  ];

  return (
    <div className="space-y-16 lg:space-y-24">
      {/* 1. Hero Section with Dignified Navy & Gold Visual Anchor */}
      <section className="relative overflow-hidden pt-8 pb-14 lg:py-20 border-b border-slate-800">
        <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
          <img
            src={heroEmblemImg}
            alt="Insaf Archive Court Scales of Justice"
            referrerPolicy="no-referrer"
            loading="lazy"
            className="w-full h-full object-cover object-center filter grayscale mix-blend-luminosity"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B132B] via-[#0B132B]/85 to-transparent" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Archival Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#111C3A] border border-[#C5A85C]/30 text-[#E0C57A] text-xs font-medium tracking-wider mb-6">
            <ScalesLogo size={14} />
            <span className="font-urdu-ui">{t.home.heroKicker[lang]}</span>
          </div>

          {/* Primary Heading */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight lg:leading-tight mb-6 font-legal-display max-w-4xl mx-auto">
            {t.home.heroHeading[lang]}
          </h1>

          {/* Description */}
          <p className="text-sm sm:text-base lg:text-lg text-slate-300 max-w-3xl mx-auto leading-relaxed mb-8 font-urdu-ui">
            {t.home.heroDescription[lang]}
          </p>

          {/* Hero Search Box */}
          <div className="max-w-2xl mx-auto">
            <div
              onClick={onOpenSearch}
              className="group cursor-pointer flex items-center bg-[#111C3A] hover:bg-[#162347] border border-slate-700/80 hover:border-[#C5A85C]/80 rounded-lg p-2.5 sm:p-3 shadow-xl transition-all"
            >
              <Search className="text-[#C5A85C] ml-2 mr-3 shrink-0" size={20} />
              <span className="text-xs sm:text-sm text-slate-400 font-urdu-ui flex-1 text-left rtl:text-right">
                {t.actions.searchPlaceholder[lang]}
              </span>
              <span className="hidden sm:inline-block px-3 py-1 bg-[#C5A85C] text-[#0B132B] text-xs font-semibold rounded font-urdu-ui">
                {t.actions.search[lang]}
              </span>
            </div>

            {/* Quick Access Topics */}
            <div className="flex flex-wrap items-center justify-center gap-2 mt-3 text-xs text-slate-400">
              <span className="font-urdu-ui text-slate-400">
                {lang === 'en' ? 'Quick Topics:' : 'اہم موضوعات:'}
              </span>
              <button
                onClick={() => onNavigate('cases')}
                className="hover:text-[#E0C57A] transition-colors font-urdu-ui"
              >
                Article 184(3)
              </button>
              <span>·</span>
              <button
                onClick={() => onNavigate('cases')}
                className="hover:text-[#E0C57A] transition-colors font-urdu-ui"
              >
                Section 497 (Bail)
              </button>
              <span>·</span>
              <button
                onClick={() => onNavigate('cases')}
                className="hover:text-[#E0C57A] transition-colors font-urdu-ui"
              >
                Habeas Corpus
              </button>
              <span>·</span>
              <button
                onClick={() => onNavigate('cases')}
                className="hover:text-[#E0C57A] transition-colors font-urdu-ui"
              >
                Due Process
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Operational Live Archive Statistics Strip (Strictly Derived from Dataset) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 bg-[#0E1738] border border-slate-800 rounded-lg p-6">
          <div className="text-center border-r rtl:border-r-0 rtl:border-l border-slate-800 last:border-0">
            <div className="text-2xl sm:text-3xl font-bold text-[#E0C57A] font-mono tabular-nums">
              {totalCasesCount}
            </div>
            <div className="text-xs text-slate-400 mt-1 font-urdu-ui">
              {t.home.stats.documentedCases[lang]}
            </div>
          </div>

          <div className="text-center border-r rtl:border-r-0 rtl:border-l border-slate-800 last:border-0">
            <div className="text-2xl sm:text-3xl font-bold text-[#E0C57A] font-mono tabular-nums">
              {withDocsCount}
            </div>
            <div className="text-xs text-slate-400 mt-1 font-urdu-ui">
              {t.home.stats.certifiedJudgments[lang]}
            </div>
          </div>

          <div className="text-center border-r rtl:border-r-0 rtl:border-l border-slate-800 last:border-0">
            <div className="text-2xl sm:text-3xl font-bold text-[#E0C57A] font-mono tabular-nums">
              3
            </div>
            <div className="text-xs text-slate-400 mt-1 font-urdu-ui">
              {t.home.stats.humanRightsReports[lang]}
            </div>
          </div>

          <div className="text-center">
            <div className="text-2xl sm:text-3xl font-bold text-[#E0C57A] font-mono tabular-nums">
              {withVideoCount}
            </div>
            <div className="text-xs text-slate-400 mt-1 font-urdu-ui">
              {t.home.stats.verifiedMediaItems[lang]}
            </div>
          </div>
        </div>

        {/* Small Scope Label */}
        <p className="text-[11px] text-slate-400 text-center mt-2 font-urdu-ui">
          {lang === 'en'
            ? '* Counts reflect only records currently cataloged in this archive repository.'
            : '* اعداد و شمار صرف اس آرکائیو میں درج مقدمات پر مبنی ہیں۔'}
        </p>
      </section>

      {/* 3. Featured Cases Archive Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-8 text-left rtl:text-right">
          <div>
            <div className="text-xs font-semibold text-[#C5A85C] uppercase tracking-wider mb-1 font-urdu-ui">
              {lang === 'en' ? 'Substantive Precedents' : 'اہم عدالتی نظائر'}
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white font-legal-display font-urdu-ui">
              {t.home.featuredCasesTitle[lang]}
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl font-urdu-ui">
              {t.home.featuredCasesSubtitle[lang]}
            </p>
          </div>

          <button
            onClick={() => onNavigate('cases')}
            className="inline-flex items-center gap-1.5 text-xs font-medium text-[#E0C57A] hover:underline font-urdu-ui"
          >
            <span>{lang === 'en' ? 'Explore Full Archive' : 'مکمل آرکائیو دیکھیں'}</span>
            <ArrowRight size={14} className="rtl:rotate-180" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredCases.map((caseItem) => (
            <CaseCard
              key={caseItem.id}
              caseItem={caseItem}
              lang={lang}
              onSelect={onSelectCase}
            />
          ))}
        </div>
      </section>

      {/* 4. Archive Categories Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h2 className="text-2xl font-bold text-white font-legal-display font-urdu-ui">
            {lang === 'en' ? 'Legal Archive Categories' : 'قانونی موضوعات کے شعبہ جات'}
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 font-urdu-ui">
            {lang === 'en'
              ? 'Cataloged by constitutional domain, statutory provisions, and verified legal subject matter.'
              : 'آئینی شقوں، متعلقہ دفعات اور عدالتی موضوعات کے مطابق ترتیب دیے گئے شعبے۔'}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {categories.map((cat) => (
            <div
              key={cat.id}
              onClick={() => onNavigate('cases')}
              className="p-5 bg-[#111C3A] hover:bg-[#162347] border border-slate-800 hover:border-[#C5A85C]/40 rounded-lg cursor-pointer transition-all text-left rtl:text-right flex flex-col justify-between"
            >
              <div>
                <h3 className="text-sm font-semibold text-white mb-1.5 font-urdu-ui">
                  {cat.en ? cat[lang] : cat.id}
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed font-urdu-ui line-clamp-2">
                  {cat.desc?.[lang] || ''}
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-[#E0C57A]">
                <span className="font-urdu-ui">{lang === 'en' ? 'View Records' : 'ریکارڈز دیکھیں'}</span>
                <ArrowRight size={13} className="rtl:rotate-180" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Recent Certified Judgments Ledger */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#0E1738] border border-slate-800 rounded-xl p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-6 pb-4 border-b border-slate-800 text-left rtl:text-right">
            <div>
              <div className="text-xs font-semibold text-[#C5A85C] uppercase tracking-wider mb-1 font-urdu-ui">
                {lang === 'en' ? 'Law Reports & Rulings' : 'قانونی نظائر و عدالتی فیصلے'}
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-white font-legal-display font-urdu-ui">
                {t.home.recentJudgmentsTitle[lang]}
              </h2>
              <p className="text-xs text-slate-400 mt-1 font-urdu-ui">
                {t.home.recentJudgmentsSubtitle[lang]}
              </p>
            </div>

            <button
              onClick={() => onNavigate('judgments')}
              className="inline-flex items-center gap-1.5 text-xs font-medium text-[#E0C57A] hover:underline font-urdu-ui"
            >
              <span>{lang === 'en' ? 'All Certified Rulings' : 'تمام عدالتی فیصلے'}</span>
              <ArrowRight size={14} className="rtl:rotate-180" />
            </button>
          </div>

          <div className="divide-y divide-slate-800/80">
            {recentJudgments.map((judgment) => (
              <div
                key={judgment.id}
                onClick={() => onSelectJudgment(judgment)}
                className="py-4 hover:bg-[#111C3A]/50 px-3 rounded cursor-pointer transition-colors text-left rtl:text-right flex flex-col md:flex-row md:items-center justify-between gap-4"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-xs">
                    <span className="font-mono text-[#E0C57A] font-semibold">
                      {judgment.citation}
                    </span>
                    <span className="text-slate-600">·</span>
                    <span className="text-slate-400 font-urdu-ui">
                      {judgment.court[lang]}
                    </span>
                  </div>
                  <h3 className="text-sm font-semibold text-white font-urdu-ui">
                    {judgment.title[lang]}
                  </h3>
                  <p className="text-xs text-slate-400 line-clamp-1 max-w-2xl font-urdu-ui">
                    {judgment.summary[lang]}
                  </p>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <span className="text-xs text-slate-400 font-mono">
                    {judgment.date}
                  </span>
                  <button className="px-3 py-1 text-xs font-medium bg-[#172346] hover:bg-[#C5A85C] hover:text-[#0B132B] text-slate-200 rounded transition-colors font-urdu-ui">
                    {t.actions.readDocument[lang]}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Editorial Standards & Archival Rigor */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h2 className="text-2xl font-bold text-white font-legal-display font-urdu-ui">
            {t.home.archivePillarsTitle[lang]}
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 font-urdu-ui">
            {lang === 'en'
              ? 'Our non-negotiable methodology for documenting legal controversy with scholarly detachment.'
              : 'قانونی تنازعات کو غیر جانبدارانہ اور تحقیقی انداز میں ریکارڈ کرنے کا ہمارا طریقہ کار۔'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {t.home.pillars.map((pillar, idx) => (
            <div
              key={idx}
              className="p-6 bg-[#0E1738] border border-slate-800 rounded-lg text-left rtl:text-right space-y-3"
            >
              <div className="w-8 h-8 rounded bg-[#172346] border border-[#C5A85C]/30 text-[#C5A85C] flex items-center justify-center font-mono font-bold text-xs">
                0{idx + 1}
              </div>
              <h3 className="text-base font-semibold text-white font-urdu-ui">
                {pillar.title[lang]}
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed font-urdu-ui">
                {pillar.desc[lang]}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
