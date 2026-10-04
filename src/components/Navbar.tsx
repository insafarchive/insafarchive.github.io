import React, { useState } from 'react';
import { ScalesLogo } from './ScalesLogo';
import { Language } from '../types';
import { translations } from '../data/translations';
import { Search, Globe, Menu, X, BarChart3, Database, FilePlus } from 'lucide-react';

interface NavbarProps {
  lang: Language;
  onLanguageChange: (lang: Language) => void;
  currentPage: string;
  onNavigate: (page: string) => void;
  onOpenSearch: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  lang,
  onLanguageChange,
  currentPage,
  onNavigate,
  onOpenSearch,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const t = translations;

  // Primary 5 links always visible on desktop
  const primaryNavItems = [
    { id: 'home', label: t.nav.home[lang] },
    { id: 'cases', label: t.nav.cases[lang] },
    { id: 'judgments', label: t.nav.judgments[lang] },
    { id: 'dashboard', label: t.nav.dashboard[lang] },
    { id: 'methodology', label: t.nav.methodology[lang] },
  ];

  // Secondary items in dropdown/more or mobile menu
  const secondaryNavItems = [
    { id: 'contribute', label: t.nav.contribute[lang] },
    { id: 'videos', label: t.nav.videos[lang] },
    { id: 'reports', label: t.nav.reports[lang] },
    { id: 'dataValidator', label: t.nav.dataValidator[lang] },
    { id: 'corrections', label: t.nav.corrections[lang] },
  ];

  const handleNavClick = (pageId: string) => {
    onNavigate(pageId);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-[#0B132B]/95 backdrop-blur-md border-b border-[#C5A85C]/20 text-slate-100 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Zone 1: Single-element Brand Wordmark */}
          <button
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-2.5 text-left rtl:text-right group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A85C] rounded-sm py-1"
            aria-label="Insaf Archive Home"
          >
            <div className="p-1.5 rounded bg-[#111C3A] border border-[#C5A85C]/30 text-[#C5A85C] group-hover:border-[#C5A85C] transition-colors">
              <ScalesLogo size={22} />
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-semibold tracking-wide text-white group-hover:text-[#E0C57A] transition-colors font-legal-display whitespace-nowrap">
                {t.brandName[lang]}
              </span>
            </div>
          </button>

          {/* Zone 2: Navigation Links (Desktop) */}
          <nav
            className="hidden lg:flex items-center gap-5 xl:gap-7 text-sm font-medium"
            aria-label="Main Navigation"
          >
            {primaryNavItems.map((item) => {
              const isActive = currentPage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`relative py-1 transition-colors whitespace-nowrap font-urdu-ui ${
                    isActive
                      ? 'text-[#E0C57A] font-semibold'
                      : 'text-slate-300 hover:text-white'
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#C5A85C]" />
                  )}
                </button>
              );
            })}

            {/* More Menu Dropdown for Secondary Pages */}
            <div className="relative group">
              <button className="py-1 text-slate-300 hover:text-white transition-colors font-urdu-ui flex items-center gap-1">
                <span>{lang === 'en' ? 'More' : 'مزید'}</span>
                <span className="text-[10px] text-slate-500">▼</span>
              </button>
              <div className="absolute right-0 rtl:right-auto rtl:left-0 top-full mt-2 w-48 bg-[#0E1738] border border-slate-800 rounded-lg shadow-xl py-2 hidden group-hover:block z-50">
                {secondaryNavItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className={`block w-full text-left rtl:text-right px-4 py-2 text-xs font-urdu-ui hover:bg-[#162347] ${
                      currentPage === item.id ? 'text-[#E0C57A] font-semibold' : 'text-slate-300'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
          </nav>

          {/* Zone 3: Primary Actions (Search + Language Switcher + Mobile Toggle) */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Submit a Case Update Action Button */}
            <button
              onClick={() => handleNavClick('contribute')}
              className="hidden md:inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-semibold bg-[#C5A85C]/15 hover:bg-[#C5A85C]/25 text-[#E0C57A] border border-[#C5A85C]/40 rounded transition-colors font-urdu-ui"
              title={t.nav.submitUpdate[lang]}
            >
              <FilePlus size={13} className="text-[#C5A85C]" />
              <span>{t.nav.submitUpdate[lang]}</span>
            </button>

            {/* Quick Search Trigger */}
            <button
              onClick={onOpenSearch}
              className="flex items-center gap-2 px-3 py-1.5 text-xs text-slate-300 bg-[#111C3A] border border-slate-700/60 hover:border-[#C5A85C]/60 rounded hover:text-white transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A85C]"
              aria-label={t.actions.search[lang]}
              title={t.actions.search[lang]}
            >
              <Search size={15} className="text-[#C5A85C]" />
              <span className="hidden sm:inline font-urdu-ui">
                {t.actions.quickSearch[lang]}
              </span>
              <kbd className="hidden md:inline-block text-[10px] text-slate-400 bg-slate-800/80 px-1 py-0.5 rounded border border-slate-700 font-mono">
                ⌘K
              </kbd>
            </button>

            {/* Language Switcher */}
            <div className="flex items-center bg-[#111C3A] border border-slate-700/80 rounded p-0.5">
              <button
                type="button"
                onClick={() => onLanguageChange('en')}
                className={`px-2.5 py-1 text-xs font-medium rounded transition-colors ${
                  lang === 'en'
                    ? 'bg-[#C5A85C] text-[#0B132B] font-semibold shadow-xs'
                    : 'text-slate-400 hover:text-white'
                }`}
                aria-pressed={lang === 'en'}
                aria-label="Switch to English"
              >
                English
              </button>
              <button
                type="button"
                onClick={() => onLanguageChange('ur')}
                className={`px-2.5 py-1 text-xs font-medium rounded transition-colors font-urdu-ui ${
                  lang === 'ur'
                    ? 'bg-[#C5A85C] text-[#0B132B] font-semibold shadow-xs'
                    : 'text-slate-400 hover:text-white'
                }`}
                aria-pressed={lang === 'ur'}
                aria-label="اردو میں تبدیل کریں"
              >
                اردو
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded text-slate-300 hover:text-white hover:bg-slate-800/60 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A85C]"
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-[#C5A85C]/20 bg-[#0E1738] px-4 pt-2 pb-4 space-y-1">
          {[...primaryNavItems, ...secondaryNavItems].map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`block w-full text-left rtl:text-right px-3 py-2 text-sm rounded font-urdu-ui ${
                currentPage === item.id
                  ? 'bg-[#172346] text-[#E0C57A] font-semibold'
                  : 'text-slate-200 hover:bg-[#111C3A]'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </header>
  );
};
