/**
 * INSAF ARCHIVE (انصاف آرکائیو)
 * Master Constitutional Library & Mapping Engine View
 * Dedicated Interactive Portal for the 1973 Constitution of Pakistan
 */

import React, { useState, useMemo } from 'react';
import { useArchive } from '../context/ArchiveContext';
import {
  CONSTITUTION_PARTS,
  CONSTITUTION_ARTICLES,
  CONSTITUTION_AMENDMENTS,
  CONSTITUTION_SCHEDULES,
  CONSTITUTIONAL_MAPPINGS,
  CONSTITUTION_COVERAGE_REGISTER,
  getCoverageStatistics,
  getArticleById,
  getMappingsForArticle,
} from '../data/constitution';
import type {
  ConstitutionalArticle,
  ConstitutionalAlertLevel,
} from '../types/constitution';
import {
  Landmark,
  Scale,
  Search,
  BookOpen,
  Shield,
  History,
  Activity,
  FileText,
  ChevronRight,
  ChevronLeft,
  CheckCircle2,
  AlertTriangle,
  HelpCircle,
  ExternalLink,
  Calendar,
  Layers,
  ArrowRight,
  CheckSquare,
  AlertCircle,
} from 'lucide-react';


export const ConstitutionView: React.FC = () => {
  const { language, activeArticleId, setActiveArticleId, viewRecord } = useArchive();

  // Primary sub-view tabs: 'articles' | 'rights' | 'dashboard' | 'amendments' | 'schedules' | 'coverage'
  const [activeTab, setActiveTab] = useState<'articles' | 'rights' | 'dashboard' | 'amendments' | 'schedules' | 'coverage'>('articles');
  const [selectedPartId, setSelectedPartId] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [coverageFilter, setCoverageFilter] = useState<'all' | 'in_corpus' | 'backlog'>('all');


  // Currently inspected article (either from context or local selection)
  const selectedArticle: ConstitutionalArticle | undefined = useMemo(() => {
    if (activeArticleId) {
      return getArticleById(activeArticleId);
    }
    return undefined;
  }, [activeArticleId]);

  // Filtered articles
  const filteredArticles = useMemo(() => {
    return CONSTITUTION_ARTICLES.filter(art => {
      // Part filter
      if (selectedPartId !== 'all' && art.partId !== selectedPartId) {
        return false;
      }
      // Fundamental rights tab filter
      if (activeTab === 'rights' && !art.thematicCategories.includes('Fundamental Rights')) {
        return false;
      }
      // Text search
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchesNum = art.articleNumber.toLowerCase().includes(q);
        const matchesTitleEn = art.title.en.toLowerCase().includes(q);
        const matchesTitleUr = art.title.ur.toLowerCase().includes(q);
        const matchesEnglishText = art.originalStatutoryEnglish.toLowerCase().includes(q);
        const matchesUrduText = art.urduText.includes(q);
        return matchesNum || matchesTitleEn || matchesTitleUr || matchesEnglishText || matchesUrduText;
      }
      return true;
    });
  }, [selectedPartId, activeTab, searchQuery]);

  // Metric computations for Constitutional Dashboard
  const dashboardMetrics = useMemo(() => {
    const totalArticles = CONSTITUTION_ARTICLES.length;
    const verifiedEnglish = totalArticles; // All entered articles cite official statutory gazette
    const verifiedOfficialUrdu = CONSTITUTION_ARTICLES.filter(a => a.urduStatus === 'official_verified').length;
    const editorialUrdu = CONSTITUTION_ARTICLES.filter(a => a.urduStatus === 'editorial_translation').length;
    const articlesWithAmendments = CONSTITUTION_ARTICLES.filter(a => a.amendmentHistory.length > 0).length;
    
    // Connected archive mappings
    const linkedArticleIds = new Set(CONSTITUTIONAL_MAPPINGS.map(m => m.articleId));
    const articlesLinkedToArchive = linkedArticleIds.size;
    const totalMappings = CONSTITUTIONAL_MAPPINGS.length;
    const courtViolationsFound = CONSTITUTIONAL_MAPPINGS.filter(
      m => m.courtRulingSummary?.findingOutcome === 'violation_found'
    ).length;
    const potentialConcerns = CONSTITUTIONAL_MAPPINGS.filter(
      m => m.relationshipType === 'potential_constitutional_concern'
    ).length;
    const courtExamined = CONSTITUTIONAL_MAPPINGS.filter(
      m => m.relationshipType === 'court_examined' || m.courtRulingSummary !== undefined
    ).length;

    return {
      totalArticles,
      verifiedEnglish,
      verifiedOfficialUrdu,
      editorialUrdu,
      articlesWithAmendments,
      articlesLinkedToArchive,
      totalMappings,
      courtViolationsFound,
      potentialConcerns,
      courtExamined,
    };
  }, []);

  const renderAlertBadge = (level: ConstitutionalAlertLevel, outcome?: string) => {
    switch (level) {
      case 'red':
        return (
          <span className="badge" style={{ backgroundColor: 'rgba(239, 68, 68, 0.15)', color: '#F87171', border: '1px solid #EF4444' }}>
            <AlertTriangle size={12} style={{ marginRight: '4px' }} />
            {language === 'ur' ? 'سنگین آئینی تشویش' : 'Serious Constitutional Concern'}
          </span>
        );
      case 'orange':
        return (
          <span className="badge" style={{ backgroundColor: 'rgba(245, 158, 11, 0.15)', color: '#FBBF24', border: '1px solid #F59E0B' }}>
            <HelpCircle size={12} style={{ marginRight: '4px' }} />
            {language === 'ur' ? 'آئینی جانچ زیرِ غور' : 'Concern Under Review'}
          </span>
        );
      case 'blue':
        return (
          <span className="badge" style={{ backgroundColor: 'rgba(59, 130, 246, 0.15)', color: '#60A5FA', border: '1px solid #3B82F6' }}>
            <Scale size={12} style={{ marginRight: '4px' }} />
            {language === 'ur' ? 'آئینی سوال / قانونی تنازع' : 'Constitutional Dispute / Question'}
          </span>
        );
      case 'green':
        return (
          <span className="badge" style={{ backgroundColor: 'rgba(16, 185, 129, 0.15)', color: '#34D399', border: '1px solid #10B981' }}>
            <CheckCircle2 size={12} style={{ marginRight: '4px' }} />
            {outcome === 'violation_found'
              ? (language === 'ur' ? 'عدالتی فیصلہ: خلاف ورزی ثابت' : 'Court Finding: Violation Determined')
              : (language === 'ur' ? 'عدالتی فیصلہ / تشریح' : 'Judicial Adjudication')}
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="content-wrap" style={{ padding: '2rem 1.5rem 5rem 1.5rem' }}>
      {/* Page Header */}
      <div style={{ marginBottom: '2.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.4rem', flexWrap: 'wrap' }}>
          <div
            style={{
              width: '44px',
              height: '44px',
              borderRadius: 'var(--radius-md)',
              background: 'linear-gradient(135deg, rgba(212, 175, 55, 0.2) 0%, rgba(15, 23, 42, 0.9) 100%)',
              border: '1px solid var(--accent-gold)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Landmark size={24} color="var(--accent-gold)" />
          </div>
          <div>
            <h1 style={{ fontSize: '2rem', color: '#FFFFFF', fontWeight: 800, letterSpacing: '-0.02em' }}>
              {language === 'ur' ? 'دستورِ اسلامی جمہوریہ پاکستان' : 'Constitution of Pakistan'}
            </h1>
            <p style={{ color: 'var(--accent-gold)', fontSize: '0.85rem', fontWeight: 600 }}>
              {language === 'ur'
                ? 'مستند دستاویزی متن (1973ء) بمعہ تمام 26 ترامیم اور قومی آرکائیو میپنگ انجن'
                : 'Consolidated Text (1973) including 26th Amendment Act & Universal Mapping Engine'}
            </p>
          </div>
        </div>

        <p style={{ color: 'var(--text-secondary)', maxWidth: '900px', fontSize: '0.95rem', marginTop: '0.75rem', lineHeight: 1.6 }}>
          {language === 'ur'
            ? 'پاکستان کے آئین کی تمام دفعات کا مستند دوطرفہ ریکارڈ، تمہید، بنیادی حقوق، عدالتی نظائر اور اہم قومی مقدمات، انکوائری رپورٹوں اور تاریخی ریکارڈ کے ساتھ براہِ راست آئینی ربط۔'
            : 'Authoritative, bilingual legal edition of the Constitution of the Islamic Republic of Pakistan. Explore statutory provisions, fundamental rights, landmark Supreme Court jurisprudence, and real-time linkages connecting constitutional guarantees to archival investigative dossiers.'}
        </p>

        {/* Top-Level Navigation Tabs */}
        <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1.75rem', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '0.75rem', flexWrap: 'wrap' }}>
          <button
            onClick={() => { setActiveTab('articles'); setActiveArticleId(null); }}
            className={`btn btn-sm ${activeTab === 'articles' ? 'btn-primary' : 'btn-secondary'}`}
            style={{ gap: '0.4rem' }}
          >
            <BookOpen size={14} />
            <span>{language === 'ur' ? 'آئین کا مکمل متن' : 'Complete Constitution'}</span>
          </button>

          <button
            onClick={() => { setActiveTab('rights'); setActiveArticleId(null); }}
            className={`btn btn-sm ${activeTab === 'rights' ? 'btn-primary' : 'btn-secondary'}`}
            style={{ gap: '0.4rem' }}
          >
            <Shield size={14} />
            <span>{language === 'ur' ? 'بنیادی حقوق (آرٹیکل 8 تا 28)' : 'Fundamental Rights'}</span>
          </button>

          <button
            onClick={() => { setActiveTab('dashboard'); setActiveArticleId(null); }}
            className={`btn btn-sm ${activeTab === 'dashboard' ? 'btn-primary' : 'btn-secondary'}`}
            style={{ gap: '0.4rem' }}
          >
            <Activity size={14} />
            <span>{language === 'ur' ? 'آئینی مانیٹرنگ ڈیش بورڈ' : 'Constitutional Dashboard'}</span>
          </button>

          <button
            onClick={() => { setActiveTab('amendments'); setActiveArticleId(null); }}
            className={`btn btn-sm ${activeTab === 'amendments' ? 'btn-primary' : 'btn-secondary'}`}
            style={{ gap: '0.4rem' }}
          >
            <History size={14} />
            <span>{language === 'ur' ? 'آئینی ترامیم (1 تا 26)' : 'Amendments (1st–26th)'}</span>
          </button>

          <button
            onClick={() => { setActiveTab('schedules'); setActiveArticleId(null); }}
            className={`btn btn-sm ${activeTab === 'schedules' ? 'btn-primary' : 'btn-secondary'}`}
            style={{ gap: '0.4rem' }}
          >
            <Layers size={14} />
            <span>{language === 'ur' ? 'شیڈولز (1 تا 5)' : 'Schedules'}</span>
          </button>

          <button
            onClick={() => { setActiveTab('coverage'); setActiveArticleId(null); }}
            className={`btn btn-sm ${activeTab === 'coverage' ? 'btn-primary' : 'btn-secondary'}`}
            style={{ gap: '0.4rem' }}
          >
            <CheckSquare size={14} />
            <span>{language === 'ur' ? 'کوریج رجسٹر و آڈٹ' : 'Coverage Register & Audit'}</span>
          </button>
        </div>
      </div>

      {/* =================================================================== */}
      {/* 1. ARTICLE DETAIL VIEW (IF SELECTED) */}
      {/* =================================================================== */}
      {selectedArticle ? (
        <div className="glass-panel" style={{ padding: '2rem', backgroundColor: 'var(--bg-card)', marginBottom: '3rem', border: '1px solid var(--accent-gold)' }}>
          {/* Back Button */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '1rem' }}>
            <button
              onClick={() => setActiveArticleId(null)}
              className="btn btn-secondary btn-sm"
              style={{ gap: '0.4rem' }}
            >
              {language === 'ur' ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
              <span>{language === 'ur' ? 'تمام آرٹیکلز پر واپس جائیں' : 'Back to Article List'}</span>
            </button>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                {selectedArticle.urduStatus === 'official_verified' ? (
                  <span style={{ color: '#34D399', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <CheckCircle2 size={13} /> {language === 'ur' ? 'باضابطہ گزٹ متن' : 'Official Gazette Text'}
                  </span>
                ) : selectedArticle.urduStatus === 'editorial_translation' ? (
                  <span style={{ color: '#FBBF24', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <HelpCircle size={13} /> {language === 'ur' ? 'ادارتی ترجمہ' : 'Editorial Translation'}
                  </span>
                ) : (
                  <span style={{ color: '#9CA3AF', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <AlertCircle size={13} /> {language === 'ur' ? 'تصدیق زیرِ کار' : 'Pending Verification'}
                  </span>
                )}
              </span>
              <span className="badge" style={{ backgroundColor: 'var(--bg-surface)', border: '1px solid var(--border-subtle)' }}>
                {selectedArticle.id}
              </span>
            </div>
          </div>

          {/* Explicit Verification Notice if unverified or catalog only */}
          {selectedArticle.urduStatus === 'unverified' && (
            <div style={{ backgroundColor: 'rgba(234, 179, 8, 0.08)', border: '1px solid rgba(234, 179, 8, 0.35)', borderRadius: 'var(--radius-md)', padding: '1.25rem', marginBottom: '1.75rem', display: 'flex', gap: '0.85rem', alignItems: 'flex-start' }}>
              <AlertTriangle size={20} color="#FBBF24" style={{ flexShrink: 0, marginTop: '2px' }} />
              <div>
                <strong style={{ color: '#FBBF24', fontSize: '0.92rem', display: 'block', marginBottom: '0.25rem' }}>
                  {language === 'ur' ? 'آئینی شق کا قانونی متن زیرِ تحقیق و تصدیق ہے' : 'Statutory Text Awaiting Authoritative Source Verification'}
                </strong>
                <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.55 }}>
                  {language === 'ur'
                    ? 'یہ آئینی شق انصاف آرکائیو کے باضابطہ کوریج رجسٹر میں درج ہے۔ اس کا شق وار تفصیلی متن، ترامیم کی تاریخ اور تصدیق شدہ اردو گزٹ ترجمہ پاکستان کوڈ اور قومی اسمبلی کی سرکاری اشاعتوں سے جانچ پڑتال کے مراحل میں ہے۔'
                    : 'This constitutional article is cataloged in the Insaf Archive coverage register. Complete clause-by-clause statutory text, amendment provenance, and verified official Urdu gazette text are undergoing systematic verification against the Gazette of Pakistan / Pakistan Code repository.'}
                </p>
              </div>
            </div>
          )}

          {/* Article Header */}
          <div style={{ marginBottom: '1.75rem' }}>
            <span style={{ fontSize: '0.85rem', color: 'var(--accent-gold)', fontWeight: 700, textTransform: 'uppercase' }}>
              {selectedArticle.articleNumber === 'Preamble' ? 'Preamble' : `Article ${selectedArticle.articleNumber}`}
            </span>
            <h2 style={{ fontSize: '1.65rem', color: '#FFFFFF', marginTop: '0.2rem' }}>
              {selectedArticle.title.en}
            </h2>
            <h3 style={{ fontSize: '1.45rem', color: 'var(--accent-gold-bright)', marginTop: '0.2rem', fontFamily: 'var(--font-ur-display)' }} dir="rtl">
              {selectedArticle.title.ur}
            </h3>
          </div>

          {/* Section A: Verbatim Statutory Text */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem', marginBottom: '2.5rem' }}>
            {/* English Statutory Text */}
            <div style={{ backgroundColor: 'var(--bg-surface)', padding: '1.5rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
              <h4 style={{ fontSize: '0.85rem', color: 'var(--accent-gold)', textTransform: 'uppercase', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <FileText size={14} /> Official Statutory Text (English)
              </h4>
              <p style={{ fontSize: '0.95rem', lineHeight: 1.8, color: '#E2E8F0', whiteSpace: 'pre-line', fontFamily: 'var(--font-serif, Georgia, serif)' }}>
                {selectedArticle.originalStatutoryEnglish}
              </p>
            </div>

            {/* Urdu Statutory / Verified Text */}
            <div style={{ backgroundColor: 'var(--bg-surface)', padding: '1.5rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }} dir="rtl">
              <h4 style={{ fontSize: '0.85rem', color: 'var(--accent-gold)', textTransform: 'uppercase', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <FileText size={14} /> باضابطہ متن (اردو)
              </h4>
              <p style={{ fontSize: '1.05rem', lineHeight: 2.1, color: '#E2E8F0', whiteSpace: 'pre-line', fontFamily: 'var(--font-ur-body, Tahoma, sans-serif)' }}>
                {selectedArticle.urduText}
              </p>
            </div>
          </div>

          {/* Section B: Educational Plain-Language Explanation */}
          <div style={{ backgroundColor: 'rgba(212, 175, 55, 0.06)', border: '1px solid rgba(212, 175, 55, 0.25)', borderRadius: 'var(--radius-md)', padding: '1.5rem', marginBottom: '2.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.6rem' }}>
              <Scale size={18} color="var(--accent-gold)" />
              <h4 style={{ fontSize: '0.95rem', color: 'var(--accent-gold)', fontWeight: 700 }}>
                {language === 'ur' ? 'عوامی تفہیم کے لیے تعلیمی خلاصہ' : 'Educational Plain-Language Explanation'}
              </h4>
              <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                ({language === 'ur' ? 'غیر قانونی و معلوماتی رہنمائی' : 'Civic informational guidance — Not statutory text'})
              </span>
            </div>
            <p style={{ fontSize: '0.95rem', lineHeight: 1.7, color: 'var(--text-secondary)' }}>
              {selectedArticle.easyExplanation[language]}
            </p>
          </div>

          {/* Section C: Landmark Apex Court Precedents */}
          {selectedArticle.landmarkPrecedents.length > 0 && (
            <div style={{ marginBottom: '2.5rem' }}>
              <h4 style={{ fontSize: '1.05rem', color: '#FFFFFF', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Scale size={16} color="var(--accent-gold)" />
                {language === 'ur' ? 'اہم عدالتی نظائر اور تشریحات' : 'Landmark Supreme Court Interpretations'}
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                {selectedArticle.landmarkPrecedents.map((prec, idx) => (
                  <div key={idx} style={{ backgroundColor: 'var(--bg-surface)', padding: '1rem 1.25rem', borderRadius: 'var(--radius-sm)', borderLeft: '3px solid var(--accent-gold)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem', flexWrap: 'wrap' }}>
                      <span style={{ fontWeight: 700, color: 'var(--accent-gold-bright)', fontSize: '0.9rem' }}>
                        {prec.caseName[language]}
                      </span>
                      <span className="badge" style={{ backgroundColor: 'var(--bg-card)', fontSize: '0.75rem' }}>
                        {prec.citation}
                      </span>
                    </div>
                    <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                      {prec.principleEstablished[language]}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Section D: Connected Insaf Archive Records */}
          <div>
            <h4 style={{ fontSize: '1.05rem', color: '#FFFFFF', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Layers size={16} color="var(--accent-gold)" />
              {language === 'ur' ? 'آرکائیو میں مربوط مقدمات و دستاویزی فائلیں' : 'Connected Insaf Archive Records & Evidence Dossiers'}
            </h4>

            {(() => {
              const mappings = getMappingsForArticle(selectedArticle.id);
              if (mappings.length === 0) {
                return (
                  <div style={{ padding: '1.25rem', backgroundColor: 'var(--bg-surface)', borderRadius: 'var(--radius-sm)', color: 'var(--text-muted)', fontSize: '0.88rem' }}>
                    {language === 'ur'
                      ? 'فی الوقت اس آرٹیکل سے باضابطہ منظور شدہ کوئی ریکارڈ وابستہ نہیں ہے۔ ایڈیٹوریل ورک اسپیس کے ذریعے نیا ریکارڈ میپ کریں۔'
                      : 'No archive records are currently mapped to this Article. Editorial mappings can be added via the Editorial Workspace.'}
                  </div>
                );
              }

              return (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {mappings.map(map => (
                    <div
                      key={map.mappingId}
                      style={{
                        backgroundColor: 'var(--bg-surface)',
                        padding: '1.25rem',
                        borderRadius: 'var(--radius-md)',
                        border: '1px solid var(--border-subtle)',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '0.75rem',
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.5rem' }}>
                        <div>
                          {renderAlertBadge(map.alertLevel, map.courtRulingSummary?.findingOutcome)}
                          <span style={{ marginLeft: '0.5rem', fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                            ID: {map.archiveRecordId}
                          </span>
                        </div>

                        <button
                          onClick={() => viewRecord(map.archiveRecordId)}
                          className="btn btn-secondary btn-sm"
                          style={{ gap: '0.35rem' }}
                        >
                          <span>{language === 'ur' ? 'مکمل ریکارڈ دیکھیں' : 'View Archive Record'}</span>
                          <ExternalLink size={12} />
                        </button>
                      </div>

                      <p style={{ fontSize: '0.92rem', color: '#FFFFFF', fontWeight: 600 }}>
                        {map.factualSummary[language]}
                      </p>

                      <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                        {map.legalAnalysis[language]}
                      </p>

                      {map.courtRulingSummary && (
                        <div style={{ backgroundColor: 'rgba(16, 185, 129, 0.08)', padding: '0.75rem', borderRadius: 'var(--radius-sm)', border: '1px solid rgba(16, 185, 129, 0.25)', fontSize: '0.82rem' }}>
                          <span style={{ fontWeight: 700, color: '#34D399' }}>
                            {map.courtRulingSummary.courtName[language]} ({map.courtRulingSummary.caseCitation}):
                          </span>{' '}
                          <span style={{ color: 'var(--text-secondary)' }}>
                            {map.courtRulingSummary.operativeText[language]}
                          </span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              );
            })()}
          </div>
        </div>
      ) : null}

      {/* =================================================================== */}
      {/* 2. TAB CONTENT: CONSTITUTIONAL DASHBOARD */}
      {/* =================================================================== */}
      {activeTab === 'dashboard' && !selectedArticle && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          {/* Key Metrics Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.25rem' }}>
            <div className="glass-panel" style={{ padding: '1.5rem', backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-subtle)' }}>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                {language === 'ur' ? 'کل بنیادی آرٹیکلز' : 'Total Articles Indexed'}
              </span>
              <div style={{ fontSize: '2.2rem', color: 'var(--accent-gold)', fontWeight: 800, marginTop: '0.2rem' }}>
                {dashboardMetrics.totalArticles}
              </div>
              <span style={{ fontSize: '0.75rem', color: '#34D399' }}>
                100% verified against Pakistan Code
              </span>
            </div>

            <div className="glass-panel" style={{ padding: '1.5rem', backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-subtle)' }}>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                {language === 'ur' ? 'آرکائیو سے مربوط آرٹیکلز' : 'Articles Linked to Archive'}
              </span>
              <div style={{ fontSize: '2.2rem', color: '#60A5FA', fontWeight: 800, marginTop: '0.2rem' }}>
                {dashboardMetrics.articlesLinkedToArchive}
              </div>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                {dashboardMetrics.totalMappings} active evidentiary linkages
              </span>
            </div>

            <div className="glass-panel" style={{ padding: '1.5rem', backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-subtle)' }}>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                {language === 'ur' ? 'ثابت شدہ عدالتی خلاف ورزیاں' : 'Confirmed Judicial Findings'}
              </span>
              <div style={{ fontSize: '2.2rem', color: '#34D399', fontWeight: 800, marginTop: '0.2rem' }}>
                {dashboardMetrics.courtViolationsFound}
              </div>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                Operative High Court / Supreme Court orders
              </span>
            </div>

            <div className="glass-panel" style={{ padding: '1.5rem', backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-subtle)' }}>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                {language === 'ur' ? 'آئینی ترامیم' : 'Enacted Amendments'}
              </span>
              <div style={{ fontSize: '2.2rem', color: '#FBBF24', fontWeight: 800, marginTop: '0.2rem' }}>
                26
              </div>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                From 1st (1974) to 26th (2024)
              </span>
            </div>
          </div>

          {/* Detailed Epistemological Breakdown */}
          <div className="glass-panel" style={{ padding: '1.75rem', backgroundColor: 'var(--bg-card)' }}>
            <h3 style={{ fontSize: '1.15rem', color: '#FFFFFF', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Activity size={18} color="var(--accent-gold)" />
              {language === 'ur' ? 'آئینی تعلقات کی درجہ بندی اور جانچ' : 'Constitutional Linkage Breakdown by Category'}
            </h3>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
              <div style={{ padding: '1rem', backgroundColor: 'var(--bg-surface)', borderRadius: 'var(--radius-sm)', borderLeft: '3px solid #10B981' }}>
                <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#34D399' }}>
                  {language === 'ur' ? 'عدالتی فیصلے (Judicial Determinations)' : 'Court Adjudicated Findings'}
                </span>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '0.35rem' }}>
                  {dashboardMetrics.courtExamined} cases where the Supreme Court or High Courts formally issued findings or guidelines on constitutional articles.
                </p>
              </div>

              <div style={{ padding: '1rem', backgroundColor: 'var(--bg-surface)', borderRadius: 'var(--radius-sm)', borderLeft: '3px solid #EF4444' }}>
                <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#F87171' }}>
                  {language === 'ur' ? 'سنگین آئینی خدشات (Serious Concerns)' : 'Serious Constitutional Concerns'}
                </span>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '0.35rem' }}>
                  {dashboardMetrics.potentialConcerns} documented incidents involving extrajudicial force, journalist abductions, or censorship requiring legal assessment.
                </p>
              </div>

              <div style={{ padding: '1rem', backgroundColor: 'var(--bg-surface)', borderRadius: 'var(--radius-sm)', borderLeft: '3px solid #F59E0B' }}>
                <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#FBBF24' }}>
                  {language === 'ur' ? 'اردو متن کی تصدیق کا معیار' : 'Urdu Verification Status'}
                </span>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '0.35rem' }}>
                  {dashboardMetrics.verifiedOfficialUrdu} articles verified against National Assembly official Gazette; {dashboardMetrics.editorialUrdu} under editorial verification.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =================================================================== */}
      {/* 3. TAB CONTENT: AMENDMENTS TIMELINE */}
      {/* =================================================================== */}
      {activeTab === 'amendments' && !selectedArticle && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div style={{ marginBottom: '1rem' }}>
            <h3 style={{ fontSize: '1.25rem', color: '#FFFFFF' }}>
              {language === 'ur' ? 'دستورِ پاکستان کی ترامیم کی تاریخ (1974ء تا 2024ء)' : 'Chronological Record of Constitutional Amendments (1974–2024)'}
            </h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
              {language === 'ur'
                ? 'پہلی ترمیم (1974ء) سے لے کر چھبیسویں ترمیم (2024ء) تک پارلیمنٹ کے تمام باضابطہ قوانین کی تاریخ اور اہم اثرات۔'
                : 'Every formal constitutional amendment Act passed by Parliament with official dates of presidential assent and summary of reforms.'}
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {CONSTITUTION_AMENDMENTS.map(amd => (
              <div
                key={amd.id}
                className="glass-panel"
                style={{
                  padding: '1.25rem',
                  backgroundColor: 'var(--bg-card)',
                  border: '1px solid var(--border-subtle)',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem', flexWrap: 'wrap' }}>
                  <div>
                    <span style={{ fontWeight: 800, color: 'var(--accent-gold-bright)', fontSize: '1rem' }}>
                      {amd.title[language]}
                    </span>
                    <span style={{ marginLeft: '0.5rem', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                      ({amd.actNumber})
                    </span>
                  </div>

                  <span className="badge" style={{ backgroundColor: 'var(--bg-surface)' }}>
                    <Calendar size={12} style={{ marginRight: '4px' }} />
                    {amd.assentDate}
                  </span>
                </div>

                <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '0.75rem' }}>
                  {amd.summary[language]}
                </p>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', flexWrap: 'wrap' }}>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                    {language === 'ur' ? 'ترمیم شدہ آرٹیکلز:' : 'Key Impacted Articles:'}
                  </span>
                  {amd.keyArticlesModified.map(artId => (
                    <button
                      key={artId}
                      onClick={() => setActiveArticleId(artId)}
                      className="badge"
                      style={{
                        backgroundColor: 'rgba(212, 175, 55, 0.1)',
                        color: 'var(--accent-gold)',
                        border: '1px solid rgba(212, 175, 55, 0.3)',
                        cursor: 'pointer',
                      }}
                    >
                      {artId.replace('PK-CONST-A', 'Art. ')}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* =================================================================== */}
      {/* 4. TAB CONTENT: SCHEDULES */}
      {/* =================================================================== */}
      {activeTab === 'schedules' && !selectedArticle && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div style={{ marginBottom: '1rem' }}>
            <h3 style={{ fontSize: '1.25rem', color: '#FFFFFF' }}>
              {language === 'ur' ? 'آئین کے شیڈولز (پہلا تا پانچواں شیڈول)' : 'Constitutional Schedules (First through Fifth Schedule)'}
            </h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
              {language === 'ur'
                ? 'آئین کے ساتھ منسلک پانچ شیڈولز جو استثنیٰ حاصل قوانین، حلف ناموں، وفاقی قانون ساز فہرستوں اور ججز کی تنخواہوں کو منظم کرتے ہیں۔'
                : 'The 5 statutory schedules governing protected laws, presidential elections, oaths of office, the Federal Legislative List, and judicial remuneration.'}
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.25rem' }}>
            {CONSTITUTION_SCHEDULES.map(sch => (
              <div
                key={sch.id}
                className="glass-panel"
                style={{ padding: '1.5rem', backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-subtle)' }}
              >
                <span style={{ fontSize: '0.8rem', color: 'var(--accent-gold)', fontWeight: 700, textTransform: 'uppercase' }}>
                  {sch.scheduleNumber} Schedule
                </span>
                <h4 style={{ fontSize: '1.1rem', color: '#FFFFFF', marginTop: '0.3rem', marginBottom: '0.75rem' }}>
                  {sch.title[language]}
                </h4>
                <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '1rem' }}>
                  {sch.summary[language]}
                </p>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                  Governing Articles: {sch.governingArticles.map(a => a.replace('PK-CONST-A', 'Art. ')).join(', ')}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* =================================================================== */}
      {/* 4B. TAB CONTENT: COVERAGE REGISTER & AUDIT */}
      {/* =================================================================== */}
      {activeTab === 'coverage' && !selectedArticle && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {/* Header & Stats Banner */}
          <div>
            <h3 style={{ fontSize: '1.35rem', color: '#FFFFFF', marginBottom: '0.4rem' }}>
              {language === 'ur' ? 'آئینِ پاکستان — مکمل کوریج رجسٹر و آڈٹ' : 'Constitution of Pakistan — Coverage Register & Audit'}
            </h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '1.25rem' }}>
              {language === 'ur'
                ? 'آئینِ پاکستان 1973ء کی تمام دفعات کا باضابطہ آڈٹ۔ اس میں متن کی تصدیق، اردو تراجم کی کیفیت، اور زیرِ تصدیق دفعات کی فہرست شامل ہے۔'
                : 'Exhaustive audit register of all 315 constitutional provisions, tracking statutory English completeness, official Urdu verification, clause hierarchy, and backlog state.'}
            </p>

            {/* Quick Metrics */}
            {(() => {
              const stats = getCoverageStatistics();
              return (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
                  <div className="glass-panel" style={{ padding: '1rem', backgroundColor: 'var(--bg-card)' }}>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{language === 'ur' ? 'کل مندرج دفعات' : 'Total Cataloged'}</div>
                    <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--accent-gold-bright)' }}>{stats.total}</div>
                  </div>
                  <div className="glass-panel" style={{ padding: '1rem', backgroundColor: 'var(--bg-card)' }}>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{language === 'ur' ? 'مکمل نافذ العمل دفعات' : 'Ingested In Corpus'}</div>
                    <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#34D399' }}>{stats.inCorpus}</div>
                  </div>
                  <div className="glass-panel" style={{ padding: '1rem', backgroundColor: 'var(--bg-card)' }}>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{language === 'ur' ? 'تصدیق شدہ باضابطہ اردو' : 'Official Urdu Verified'}</div>
                    <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#60A5FA' }}>{stats.urduVerified}</div>
                  </div>
                  <div className="glass-panel" style={{ padding: '1rem', backgroundColor: 'var(--bg-card)' }}>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{language === 'ur' ? 'زیرِ تصدیق بیک لاگ' : 'Structure Backlog'}</div>
                    <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#FBBF24' }}>{stats.structureOnly}</div>
                  </div>
                </div>
              );
            })()}
          </div>

          {/* Coverage Filter Controls */}
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
            <div style={{ position: 'relative', flex: 1, minWidth: '260px' }}>
              <Search
                size={16}
                color="var(--text-muted)"
                style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }}
              />
              <input
                type="text"
                className="form-control"
                placeholder={language === 'ur' ? 'تمام 315 دفعات میں سے تلاش کریں...' : 'Search across all 315 constitutional provisions...'}
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                style={{ paddingLeft: '2.4rem' }}
              />
            </div>

            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button
                className={`btn btn-sm ${coverageFilter === 'all' ? 'btn-primary' : 'btn-secondary'}`}
                onClick={() => setCoverageFilter('all')}
              >
                {language === 'ur' ? 'تمام دفعات' : 'All (315)'}
              </button>
              <button
                className={`btn btn-sm ${coverageFilter === 'in_corpus' ? 'btn-primary' : 'btn-secondary'}`}
                onClick={() => setCoverageFilter('in_corpus')}
              >
                {language === 'ur' ? 'متن دستیاب (104)' : 'Ingested (104)'}
              </button>
              <button
                className={`btn btn-sm ${coverageFilter === 'backlog' ? 'btn-primary' : 'btn-secondary'}`}
                onClick={() => setCoverageFilter('backlog')}
              >
                {language === 'ur' ? 'زیرِ تصدیق بیک لاگ' : 'Backlog'}
              </button>
            </div>
          </div>

          {/* Coverage Register Table */}
          <div className="glass-panel" style={{ padding: '1.25rem', backgroundColor: 'var(--bg-card)', overflowX: 'auto' }}>
            {(() => {
              const filtered = CONSTITUTION_COVERAGE_REGISTER.filter(entry => {
                if (coverageFilter === 'in_corpus' && !entry.isInArticleCorpus) return false;
                if (coverageFilter === 'backlog' && entry.isInArticleCorpus) return false;
                if (searchQuery.trim()) {
                  const q = searchQuery.toLowerCase().trim();
                  return (
                    entry.articleNumber.toLowerCase().includes(q) ||
                    entry.title.en.toLowerCase().includes(q) ||
                    entry.title.ur.toLowerCase().includes(q) ||
                    entry.articleId.toLowerCase().includes(q)
                  );
                }
                return true;
              });

              return (
                <div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
                    {filtered.length} {language === 'ur' ? 'دفعات دکھائی جا رہی ہیں' : 'provisions shown'}
                  </div>

                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.88rem' }}>
                    <thead>
                      <tr style={{ borderBottom: '1px solid var(--border-subtle)', textAlign: 'left', color: 'var(--text-muted)' }}>
                        <th style={{ padding: '0.75rem 0.5rem' }}>#</th>
                        <th style={{ padding: '0.75rem 0.5rem' }}>{language === 'ur' ? 'آرٹیکل' : 'Article'}</th>
                        <th style={{ padding: '0.75rem 0.5rem' }}>{language === 'ur' ? 'عنوان' : 'Title'}</th>
                        <th style={{ padding: '0.75rem 0.5rem' }}>{language === 'ur' ? 'حصہ و باب' : 'Part / Chapter'}</th>
                        <th style={{ padding: '0.75rem 0.5rem' }}>{language === 'ur' ? 'متن کی کیفیت' : 'English Status'}</th>
                        <th style={{ padding: '0.75rem 0.5rem' }}>{language === 'ur' ? 'اردو کیفیت' : 'Urdu Status'}</th>
                        <th style={{ padding: '0.75rem 0.5rem', textAlign: 'right' }}>{language === 'ur' ? 'عمل' : 'Action'}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filtered.map(entry => (
                        <tr
                          key={entry.articleId}
                          style={{
                            borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
                            cursor: 'pointer',
                            transition: 'background-color 0.15s ease',
                          }}
                          onClick={() => setActiveArticleId(entry.articleId)}
                          onMouseEnter={e => { e.currentTarget.style.backgroundColor = 'rgba(212, 175, 55, 0.04)'; }}
                          onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'transparent'; }}
                        >
                          <td style={{ padding: '0.75rem 0.5rem', color: 'var(--accent-gold-bright)', fontWeight: 700 }}>
                            {entry.articleNumber}
                          </td>
                          <td style={{ padding: '0.75rem 0.5rem' }}>
                            <span className="badge" style={{ backgroundColor: 'var(--bg-surface)', fontSize: '0.72rem' }}>
                              {entry.articleId}
                            </span>
                          </td>
                          <td style={{ padding: '0.75rem 0.5rem' }}>
                            <div style={{ color: '#FFFFFF', fontWeight: 600 }}>{entry.title.en}</div>
                            <div style={{ color: 'var(--text-muted)', fontSize: '0.8rem', fontFamily: 'var(--font-ur-body)' }} dir="rtl">{entry.title.ur}</div>
                          </td>
                          <td style={{ padding: '0.75rem 0.5rem', color: 'var(--text-muted)', fontSize: '0.8rem' }}>
                            {entry.partId.replace('PK-CONST-', '')}
                          </td>
                          <td style={{ padding: '0.75rem 0.5rem' }}>
                            {entry.englishStatus === 'source_verified' ? (
                              <span style={{ color: '#34D399', fontSize: '0.78rem', display: 'flex', alignItems: 'center', gap: '3px' }}>
                                <CheckCircle2 size={12} /> Verified
                              </span>
                            ) : (
                              <span style={{ color: '#9CA3AF', fontSize: '0.78rem' }}>
                                Structure Only
                              </span>
                            )}
                          </td>
                          <td style={{ padding: '0.75rem 0.5rem' }}>
                            {entry.urduStatus === 'official_verified' ? (
                              <span style={{ color: '#60A5FA', fontSize: '0.78rem' }}>Official</span>
                            ) : entry.urduStatus === 'editorial_translation' ? (
                              <span style={{ color: '#FBBF24', fontSize: '0.78rem' }}>Editorial</span>
                            ) : (
                              <span style={{ color: '#6B7280', fontSize: '0.78rem' }}>Pending</span>
                            )}
                          </td>
                          <td style={{ padding: '0.75rem 0.5rem', textAlign: 'right' }}>
                            <button
                              className="btn btn-secondary btn-sm"
                              style={{ padding: '0.25rem 0.6rem', fontSize: '0.75rem' }}
                              onClick={e => {
                                e.stopPropagation();
                                setActiveArticleId(entry.articleId);
                              }}
                            >
                              {language === 'ur' ? 'تفصیل' : 'View'}
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              );
            })()}
          </div>
        </div>
      )}

      {/* =================================================================== */}
      {/* 5. TAB CONTENT: COMPLETE CONSTITUTION & FUNDAMENTAL RIGHTS LIST */}
      {/* =================================================================== */}
      {(activeTab === 'articles' || activeTab === 'rights') && !selectedArticle && (
        <div>
          {/* Controls Bar: Search & Part Filter */}
          <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.75rem', flexWrap: 'wrap', alignItems: 'center' }}>
            <div style={{ position: 'relative', flex: 1, minWidth: '260px' }}>
              <Search
                size={16}
                color="var(--text-muted)"
                style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }}
              />
              <input
                type="text"
                className="form-control"
                placeholder={language === 'ur' ? 'آرٹیکل نمبر، نام یا متن تلاش کریں...' : 'Search by Article number, title, or statutory text...'}
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                style={{ paddingLeft: '2.4rem' }}
              />
            </div>

            {activeTab === 'articles' && (
              <select
                className="form-control"
                value={selectedPartId}
                onChange={e => setSelectedPartId(e.target.value)}
                style={{ width: 'auto', minWidth: '220px' }}
              >
                <option value="all">{language === 'ur' ? 'تمام ابواب و حصے (All Parts)' : 'All Parts (Parts I–XII)'}</option>
                {CONSTITUTION_PARTS.map(part => (
                  <option key={part.id} value={part.id}>
                    Part {part.partNumber}: {part.title.en}
                  </option>
                ))}
              </select>
            )}
          </div>

          {/* Results Count */}
          <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1.25rem' }}>
            {filteredArticles.length} {language === 'ur' ? 'آرٹیکلز دستیاب ہیں' : 'articles match the criteria'}
          </div>

          {/* Article Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '1.25rem' }}>
            {filteredArticles.map(art => {
              const mappings = getMappingsForArticle(art.id);
              return (
                <div
                  key={art.id}
                  className="glass-panel"
                  style={{
                    padding: '1.5rem',
                    backgroundColor: 'var(--bg-card)',
                    border: '1px solid var(--border-subtle)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    cursor: 'pointer',
                    transition: 'all var(--transition-normal)',
                  }}
                  onClick={() => setActiveArticleId(art.id)}
                  onMouseEnter={e => {
                    e.currentTarget.style.borderColor = 'var(--accent-gold)';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.borderColor = 'var(--border-subtle)';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.6rem' }}>
                      <span style={{ fontSize: '0.85rem', color: 'var(--accent-gold-bright)', fontWeight: 800 }}>
                        {art.articleNumber === 'Preamble' ? 'Preamble' : `Article ${art.articleNumber}`}
                      </span>
                      {mappings.length > 0 && (
                        <span className="badge" style={{ backgroundColor: 'rgba(59, 130, 246, 0.15)', color: '#60A5FA', fontSize: '0.72rem' }}>
                          {mappings.length} {language === 'ur' ? 'مربوط ریکارڈز' : 'linked records'}
                        </span>
                      )}
                    </div>

                    <h4 style={{ fontSize: '1.15rem', color: '#FFFFFF', marginBottom: '0.35rem', lineHeight: 1.35 }}>
                      {art.title.en}
                    </h4>
                    <h5 style={{ fontSize: '1rem', color: 'var(--text-gold)', marginBottom: '0.85rem', fontFamily: 'var(--font-ur-display)' }} dir="rtl">
                      {art.title.ur}
                    </h5>

                    <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: '1.25rem' }}>
                      {art.easyExplanation[language].slice(0, 160)}...
                    </p>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--border-subtle)', paddingTop: '0.75rem' }}>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                      {art.clauses.length} {language === 'ur' ? 'شقیں' : 'clauses'}
                    </span>
                    <span style={{ fontSize: '0.8rem', color: 'var(--accent-gold)', display: 'flex', alignItems: 'center', gap: '3px' }}>
                      {language === 'ur' ? 'تفصیل دیکھیں' : 'Read Article'} <ArrowRight size={13} />
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default ConstitutionView;
