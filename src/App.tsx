import React, { useState, useEffect } from 'react';
import { Language, CaseRecord, ConnectedDocument } from './types';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { GlobalSearchModal } from './components/GlobalSearchModal';
import { DocumentViewerModal } from './components/DocumentViewerModal';
import { CorrectionModal } from './components/CorrectionModal';
import { HomeView } from './pages/HomeView';
import { CasesArchiveView } from './pages/CasesArchiveView';
import { CaseDetailView } from './pages/CaseDetailView';
import { JudgmentsView } from './pages/JudgmentsView';
import { ReportsView } from './pages/ReportsView';
import { VideoArchiveView } from './pages/VideoArchiveView';
import { DashboardView } from './pages/DashboardView';
import { DataValidatorView } from './pages/DataValidatorView';
import { EditorialMethodologyView } from './pages/EditorialMethodologyView';
import { ContactCorrectionsView } from './pages/ContactCorrectionsView';
import { ContributeView } from './pages/ContributeView';
import { AdminDashboardView } from './pages/AdminDashboardView';
import { JudgmentItem } from './data/judgments';
import { allCaseRecords, getCaseByIdOrSlug } from './data/cases/index';

export default function App() {
  const [lang, setLang] = useState<Language>(() => {
    try {
      const saved = localStorage.getItem('insaf_lang');
      return saved === 'ur' ? 'ur' : 'en';
    } catch {
      return 'en';
    }
  });

  const [cases, setCases] = useState<CaseRecord[]>(() => {
    try {
      const stored = localStorage.getItem('insaf_imported_cases');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          // Merge with base archive by stable ID
          const map = new Map<string, CaseRecord>(allCaseRecords.map((c) => [c.id, c]));
          parsed.forEach((c: CaseRecord) => map.set(c.id, c));
          return Array.from(map.values());
        }
      }
    } catch {
      // Fallback to default
    }
    return allCaseRecords;
  });

  const [currentPage, setCurrentPage] = useState<string>('home');
  const [selectedCase, setSelectedCase] = useState<CaseRecord | null>(null);
  const [viewingDocument, setViewingDocument] = useState<ConnectedDocument | JudgmentItem | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCorrectionModalOpen, setIsCorrectionModalOpen] = useState(false);
  const [correctionCaseRef, setCorrectionCaseRef] = useState('');
  const [contributeParams, setContributeParams] = useState<{ caseId?: string; tab?: string }>({});

  const VALID_PAGES = [
    'home',
    'cases',
    'case_detail',
    'judgments',
    'reports',
    'videos',
    'dashboard',
    'dataValidator',
    'methodology',
    'corrections',
    'contribute',
    'admin',
  ] as const;

  const parseRouteFromUrl = (caseList: CaseRecord[]) => {
    if (typeof window === 'undefined') return;
    const params = new URLSearchParams(window.location.search);
    const forwardedPath = params.get('path');
    const caseParam = params.get('case');
    const cleanPath = window.location.pathname.replace(/^\/insafarchive\/?/, '').replace(/^\/+|\/+$/g, '');
    const pageParam = forwardedPath || params.get('page') || (cleanPath && VALID_PAGES.includes(cleanPath as any) ? cleanPath : null);

    if (caseParam) {
      const matched = caseList.find((c) => c.id === caseParam || c.slug === caseParam);
      if (matched) {
        setSelectedCase(matched);
        setCurrentPage('case_detail');
        return;
      } else {
        setSelectedCase(null);
        setCurrentPage('not_found');
        return;
      }
    }

    if (pageParam) {
      if (VALID_PAGES.includes(pageParam as any)) {
        if (pageParam === 'contribute') {
          const caseIdParam = params.get('caseId') || '';
          const tabParam = params.get('tab') || 'overview';
          setContributeParams({ caseId: caseIdParam, tab: tabParam });
        }
        setSelectedCase(null);
        setCurrentPage(pageParam);
        return;
      } else {
        setSelectedCase(null);
        setCurrentPage('not_found');
        return;
      }
    }

    setCurrentPage('home');
    setSelectedCase(null);
  };

  // Check initial URL parameters on load for shareable link support
  useEffect(() => {
    parseRouteFromUrl(cases);
  }, [cases]);

  // Synchronize browser history popstate (Back/Forward buttons)
  useEffect(() => {
    const handlePopState = () => {
      parseRouteFromUrl(cases);
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [cases]);

  // Synchronize document title and SEO meta tags dynamically based on route and selected case
  useEffect(() => {
    const siteTitle = 'Insaf Archive — انصاف آرکائیو';
    let newTitle = siteTitle;
    let newDesc =
      'Open public digital archive documenting Pakistani court judgments, human rights reports, verified procedural dockets, and audio-visual legal evidence.';

    if (currentPage === 'case_detail' && selectedCase) {
      newTitle = `${selectedCase.caseNumber} - ${selectedCase.title[lang]} | ${siteTitle}`;
      newDesc = selectedCase.summary[lang].slice(0, 160);
    } else if (currentPage === 'cases') {
      newTitle = `${lang === 'ur' ? 'عدالتی ریکارڈز و مقدمات' : 'Case Records & Proceedings'} | ${siteTitle}`;
    } else if (currentPage === 'judgments') {
      newTitle = `${lang === 'ur' ? 'عدالتی فیصلے و احکامات' : 'Judgments & Orders Repository'} | ${siteTitle}`;
    } else if (currentPage === 'reports') {
      newTitle = `${lang === 'ur' ? 'ادارتی رپورٹس و تجزیات' : 'Human Rights & Institutional Reports'} | ${siteTitle}`;
    } else if (currentPage === 'videos') {
      newTitle = `${lang === 'ur' ? 'ویڈیو و دستاویزی شواہد' : 'Verified Video & Evidence Archive'} | ${siteTitle}`;
    } else if (currentPage === 'dashboard') {
      newTitle = `${lang === 'ur' ? 'قانونی تجزیاتی ڈیش بورڈ' : 'Legal Analytics & Metrics Dashboard'} | ${siteTitle}`;
    } else if (currentPage === 'methodology') {
      newTitle = `${lang === 'ur' ? 'ادارتی طریقہ کار و اصول' : 'Editorial Methodology & Standards'} | ${siteTitle}`;
    } else if (currentPage === 'corrections') {
      newTitle = `${lang === 'ur' ? 'تصحیح و رجوع کی درخواستیں' : 'Corrections & Takedown Requests'} | ${siteTitle}`;
    } else if (currentPage === 'contribute') {
      newTitle = `${lang === 'ur' ? 'ترمیم و تعاون کا پورٹل' : 'Contribution & Peer Review Workflow'} | ${siteTitle}`;
    } else if (currentPage === 'dataValidator') {
      newTitle = `${lang === 'ur' ? 'ڈیٹا انویریئنٹ تصدیق کار' : 'Data Invariant & Schema Validator'} | ${siteTitle}`;
    } else if (currentPage === 'admin') {
      newTitle = `${lang === 'ur' ? 'ایڈمن ورک اسپیس و مسودہ پینل' : 'Super Admin Workspace & Dossier Studio'} | ${siteTitle}`;
    } else if (currentPage === 'not_found') {
      newTitle = `${lang === 'ur' ? 'ریکارڈ دستیاب نہیں' : 'Record Not Found (404)'} | ${siteTitle}`;
    }

    document.title = newTitle;

    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute('content', newDesc);
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute('content', newTitle);
    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) ogDesc.setAttribute('content', newDesc);
  }, [currentPage, selectedCase, lang]);

  // Synchronize document direction and language attribute
  useEffect(() => {
    document.documentElement.dir = lang === 'ur' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
    try {
      localStorage.setItem('insaf_lang', lang);
    } catch {
      // Ignore storage errors in restricted contexts
    }
  }, [lang]);

  // Global key listener for Ctrl+K / Cmd+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const syncUrl = (page: string, caseItem: CaseRecord | null, params?: { caseId?: string; tab?: string }) => {
    if (typeof window === 'undefined') return;
    try {
      const url = new URL(window.location.href);
      url.searchParams.delete('case');
      url.searchParams.delete('page');
      url.searchParams.delete('path');
      url.searchParams.delete('caseId');
      url.searchParams.delete('tab');

      if (page === 'case_detail' && caseItem) {
        url.searchParams.set('case', caseItem.id);
      } else if (page === 'contribute') {
        url.searchParams.set('page', 'contribute');
        if (params?.caseId) url.searchParams.set('caseId', params.caseId);
        if (params?.tab) url.searchParams.set('tab', params.tab);
      } else if (page !== 'home' && page !== 'not_found') {
        url.searchParams.set('page', page);
      }

      window.history.pushState({ page, caseId: caseItem?.id }, '', url.toString());
    } catch {
      // Fallback for sandboxed context
    }
  };

  const handleLanguageChange = (newLang: Language) => {
    setLang(newLang);
  };

  const handleNavigate = (page: string, params?: { caseId?: string; tab?: string }) => {
    if (params) {
      setContributeParams(params);
    }
    setSelectedCase(null);
    setCurrentPage(page);
    syncUrl(page, null, params);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectCase = (caseItem: CaseRecord) => {
    setSelectedCase(caseItem);
    setCurrentPage('case_detail');
    syncUrl('case_detail', caseItem);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectRelatedCase = (relatedCaseId: string) => {
    const matched = cases.find((c) => c.id === relatedCaseId || c.slug === relatedCaseId);
    if (matched) {
      setSelectedCase(matched);
      syncUrl('case_detail', matched);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleSelectJudgment = (judgment: JudgmentItem) => {
    setViewingDocument(judgment);
  };

  const handleOpenDocument = (doc: ConnectedDocument) => {
    setViewingDocument(doc);
  };

  const handleRequestCorrection = (caseRef: string) => {
    setCorrectionCaseRef(caseRef);
    setIsCorrectionModalOpen(true);
  };

  const handleMergeRecords = (newRecords: CaseRecord[]) => {
    setCases((prev) => {
      const map = new Map<string, CaseRecord>(prev.map((c) => [c.id, c]));
      newRecords.forEach((r) => map.set(r.id, r));
      const merged = Array.from(map.values());
      try {
        localStorage.setItem('insaf_imported_cases', JSON.stringify(merged));
      } catch {
        // storage overflow
      }
      return merged;
    });
  };

  return (
    <div className="min-h-screen bg-[#0B132B] text-slate-100 flex flex-col font-body selection:bg-[#C5A85C]/30 selection:text-white">
      {/* Accessible Skip Link for Keyboard Navigation */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 rtl:focus:left-auto rtl:focus:right-2 focus:z-50 focus:px-4 focus:py-2 focus:bg-[#C5A85C] focus:text-[#0B132B] focus:font-bold focus:rounded focus:outline-none focus:ring-2 focus:ring-white font-urdu-ui text-xs shadow-lg"
      >
        {lang === 'en' ? 'Skip to main content' : 'بنیادی مواد پر جائیں'}
      </a>

      {/* Top Bar Navigation */}
      <Navbar
        lang={lang}
        onLanguageChange={handleLanguageChange}
        currentPage={currentPage}
        onNavigate={handleNavigate}
        onOpenSearch={() => setIsSearchOpen(true)}
      />

      {/* Main Content Area */}
      <main id="main-content" tabIndex={-1} className="flex-1 focus:outline-none">
        {currentPage === 'home' && (
          <HomeView
            cases={cases}
            lang={lang}
            onNavigate={handleNavigate}
            onSelectCase={handleSelectCase}
            onSelectJudgment={handleSelectJudgment}
            onOpenSearch={() => setIsSearchOpen(true)}
          />
        )}

        {currentPage === 'cases' && (
          <CasesArchiveView
            cases={cases}
            lang={lang}
            onSelectCase={handleSelectCase}
          />
        )}

        {currentPage === 'case_detail' && selectedCase && (
          <CaseDetailView
            caseItem={selectedCase}
            lang={lang}
            onBack={() => handleNavigate('cases')}
            onOpenDocument={handleOpenDocument}
            onRequestCorrection={handleRequestCorrection}
            onSelectRelatedCase={handleSelectRelatedCase}
            onNavigate={handleNavigate}
          />
        )}

        {currentPage === 'judgments' && (
          <JudgmentsView
            lang={lang}
            onSelectJudgment={handleSelectJudgment}
          />
        )}

        {currentPage === 'reports' && (
          <ReportsView lang={lang} />
        )}

        {currentPage === 'videos' && (
          <VideoArchiveView
            lang={lang}
            cases={cases}
            onSelectCase={handleSelectCase}
            onNavigate={handleNavigate}
          />
        )}

        {currentPage === 'dashboard' && (
          <DashboardView
            cases={cases}
            lang={lang}
          />
        )}

        {currentPage === 'dataValidator' && (
          <DataValidatorView
            existingCases={cases}
            lang={lang}
            onMergeRecords={handleMergeRecords}
          />
        )}

        {currentPage === 'methodology' && (
          <EditorialMethodologyView
            lang={lang}
            onNavigate={handleNavigate}
          />
        )}

        {currentPage === 'corrections' && (
          <ContactCorrectionsView lang={lang} />
        )}

        {currentPage === 'contribute' && (
          <ContributeView
            lang={lang}
            cases={cases}
            initialCaseId={contributeParams.caseId}
            initialTab={contributeParams.tab}
            onNavigate={handleNavigate}
            onSelectCase={handleSelectCase}
          />
        )}

        {currentPage === 'admin' && (
          <AdminDashboardView
            cases={cases}
            lang={lang}
            onNavigate={handleNavigate}
            onSelectCase={handleSelectCase}
          />
        )}

        {currentPage === 'not_found' && (
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#111C3A] border border-[#C5A85C]/30 text-[#E0C57A] text-xs font-semibold uppercase tracking-wider font-urdu-ui">
              404 — {lang === 'en' ? 'Record Not Found' : 'عدالتی ریکارڈ موجود نہیں'}
            </div>
            <h1 className="text-2xl sm:text-4xl font-bold text-white font-legal-display font-urdu-ui">
              {lang === 'en' ? 'Record or Page Not Found' : 'مطلوبہ عدالتی ریکارڈ یا صفحہ دستیاب نہیں ہے'}
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto font-urdu-ui leading-relaxed">
              {lang === 'en'
                ? 'The requested docket reference, citation, or route does not exist in the active public archive or may have been modified following an editorial audit.'
                : 'آپ کا مطلوبہ عدالتی مسودہ، قانونی حوالہ یا صفحہ آرکائیو کے موجودہ تصدیق شدہ ریکارڈ میں نہیں ملا۔ برائے مہربانی دستیاب مقدمات کی فہرست دیکھیں یا سرچ کا استعمال کریں۔'}
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
              <button
                onClick={() => handleNavigate('home')}
                className="px-5 py-2.5 bg-[#C5A85C] hover:bg-[#E0C57A] text-[#0B132B] font-semibold text-xs rounded transition-colors font-urdu-ui"
              >
                {lang === 'en' ? 'Return to Archive Home' : 'ہوم پیج پر واپس جائیں'}
              </button>
              <button
                onClick={() => handleNavigate('cases')}
                className="px-5 py-2.5 bg-[#111C3A] hover:bg-[#18254B] border border-slate-700 text-slate-200 font-semibold text-xs rounded transition-colors font-urdu-ui"
              >
                {lang === 'en' ? 'Browse All Cases' : 'تمام مقدمات دیکھیں'}
              </button>
              <button
                onClick={() => setIsSearchOpen(true)}
                className="px-5 py-2.5 bg-[#111C3A] hover:bg-[#18254B] border border-slate-700 text-[#E0C57A] font-semibold text-xs rounded transition-colors font-urdu-ui"
              >
                {lang === 'en' ? 'Open Search (⌘K)' : 'سرچ بار کھولیں'}
              </button>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <Footer lang={lang} onNavigate={handleNavigate} />

      {/* Global Search Modal */}
      <GlobalSearchModal
        cases={cases}
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        lang={lang}
        onSelectCase={handleSelectCase}
        onSelectJudgment={handleSelectJudgment}
        onNavigate={handleNavigate}
      />

      {/* Document Viewer Modal */}
      <DocumentViewerModal
        document={viewingDocument}
        isOpen={Boolean(viewingDocument)}
        onClose={() => setViewingDocument(null)}
        lang={lang}
      />

      {/* Correction Request Modal */}
      <CorrectionModal
        isOpen={isCorrectionModalOpen}
        onClose={() => setIsCorrectionModalOpen(false)}
        lang={lang}
        defaultCaseRef={correctionCaseRef}
      />
    </div>
  );
}
