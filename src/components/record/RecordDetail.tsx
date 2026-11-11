/**
 * INSAF ARCHIVE (انصاف آرکائیو)
 * Master Archival Record Detail View
 */

import React, { useState } from 'react';
import { useArchive } from '../../context/ArchiveContext';
import { DomainBadge, RecordTypeBadge } from '../common/DomainBadge';
import { VerificationBadge, PrivacyBadge } from '../common/VerificationBadge';
import { ClaimCard } from '../common/ClaimCard';
import { SourceCard } from '../common/SourceCard';
import { RelationshipGraphView } from './RelationshipGraphView';
import { formatArchiveDate } from '../../utils/dateUtils';
import { getMappingsForRecord } from '../../data/constitution';
import {
  ArrowLeft,
  ArrowRight,
  FileText,
  Scale,
  Link2,
  GitBranch,
  FolderArchive,
  ShieldCheck,
  Calendar,
  MapPin,
  Copy,
  Check,
  Languages,
  Landmark,
  CheckCircle2,
  AlertTriangle,
  HelpCircle,
  ExternalLink,
} from 'lucide-react';

export const RecordDetail: React.FC = () => {
  const { records, activeRecordId, language, navigateTo, viewArticle } = useArchive();
  const [activeTab, setActiveTab] = useState<'narrative' | 'claims' | 'sources' | 'graph' | 'media' | 'audit' | 'constitution'>('narrative');
  const [dualLanguageMode, setDualLanguageMode] = useState<boolean>(false);
  const [copiedId, setCopiedId] = useState<boolean>(false);

  const record = records.find(r => r.id === activeRecordId);

  if (!record) {
    return (
      <div className="content-wrap" style={{ padding: '5rem 1rem', textAlign: 'center' }}>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: 'var(--text-primary)' }}>
          {language === 'ur' ? 'ریکارڈ نہیں ملا' : 'Record Not Found'}
        </h2>
        <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>
          {language === 'ur'
            ? 'مطلوبہ ریکارڈ دستیاب نہیں یا حذف کر دیا گیا ہے۔'
            : 'The requested archival record does not exist or has been restricted.'}
        </p>
        <button onClick={() => navigateTo('archive')} className="btn btn-primary">
          {language === 'ur' ? 'آرکائیو پر واپس جائیں' : 'Back to Archive'}
        </button>
      </div>
    );
  }

  const copyRecordId = () => {
    navigator.clipboard.writeText(record.id);
    setCopiedId(true);
    setTimeout(() => setCopiedId(false), 2000);
  };

  const constitutionalMappings = getMappingsForRecord(record.id);

  const tabs: Array<{ id: typeof activeTab; label: { en: string; ur: string }; count?: number; icon: React.ReactNode }> = [
    {
      id: 'narrative',
      label: { en: 'Narrative & Overview', ur: 'تفصیلی جائزہ و دستاویز' },
      icon: <FileText size={16} />,
    },
    {
      id: 'constitution',
      label: { en: 'Constitutional Nexus', ur: 'آئینی تعلق و دفعات' },
      count: constitutionalMappings.length,
      icon: <Landmark size={16} />,
    },
    {
      id: 'claims',
      label: { en: 'Evidentiary Matrix', ur: 'شواہد و نتائج' },
      count: record.claims.length,
      icon: <Scale size={16} />,
    },
    {
      id: 'sources',
      label: { en: 'Sources & Citations', ur: 'ماخذ و حوالہ جات' },
      count: record.sources.length,
      icon: <Link2 size={16} />,
    },
    {
      id: 'graph',
      label: { en: 'Connected Dossier', ur: 'متصل ریکارڈز و شواہد' },
      count: record.relationships.length,
      icon: <GitBranch size={16} />,
    },
    {
      id: 'media',
      label: { en: 'Evidence & Media', ur: 'تصاویر و ویڈیوز' },
      count: record.evidenceMedia.length,
      icon: <FolderArchive size={16} />,
    },
    {
      id: 'audit',
      label: { en: 'Governance & Audit', ur: 'ادارتی ریکارڈ و تصدیق' },
      icon: <ShieldCheck size={16} />,
    },
  ];

  return (
    <div className="content-wrap" style={{ padding: '2rem 1.5rem 5rem 1.5rem' }}>
      {/* Top Action Bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        <button
          onClick={() => navigateTo('archive')}
          className="btn btn-secondary btn-sm"
          style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}
        >
          {language === 'ur' ? <ArrowRight size={14} /> : <ArrowLeft size={14} />}
          <span>{language === 'ur' ? 'آرکائیو پر واپس جائیں' : 'Back to Archive'}</span>
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          <button
            onClick={() => setDualLanguageMode(prev => !prev)}
            className={`btn btn-sm ${dualLanguageMode ? 'btn-primary' : 'btn-secondary'}`}
            title="Side-by-side English & Urdu view"
          >
            <Languages size={14} />
            <span>{language === 'ur' ? 'یکجا دونوں زبانیں' : 'Dual Bilingual View'}</span>
          </button>

          <button
            onClick={copyRecordId}
            className="btn btn-secondary btn-sm"
            title="Copy Stable Record Identifier"
          >
            {copiedId ? <Check size={14} color="var(--accent-emerald)" /> : <Copy size={14} />}
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem' }}>
              {copiedId ? (language === 'ur' ? 'کاپی ہوگیا' : 'Copied') : record.id}
            </span>
          </button>
        </div>
      </div>

      {/* Hero Record Header Card */}
      <div
        className="glass-panel"
        style={{
          padding: '2rem',
          marginBottom: '2rem',
          backgroundColor: 'var(--bg-surface-elevated)',
          border: '1px solid var(--border-medium)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
          <DomainBadge domain={record.domain} />
          <RecordTypeBadge recordType={record.recordType} />
          <VerificationBadge status={record.verificationStatus} />
          <PrivacyBadge privacy={record.privacyClassification} />
        </div>

        {/* Temporal & Location Meta */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1.25rem', flexWrap: 'wrap' }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
            <Calendar size={15} color="var(--accent-gold)" />
            <strong>{language === 'ur' ? 'تاریخ:' : 'Date:'}</strong> {formatArchiveDate(record.date, language)}
          </span>
          {record.location?.country && (
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
              <MapPin size={15} color="var(--accent-cyan)" />
              <strong>{language === 'ur' ? 'مقام:' : 'Location:'}</strong>{' '}
              {record.location.city ? `${record.location.city[language] || record.location.city.en}, ` : ''}
              {record.location.country[language] || record.location.country.en}
            </span>
          )}
        </div>

        {/* Dual or Single Title */}
        {dualLanguageMode ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem', marginBottom: '1.5rem' }}>
            <div style={{ borderLeft: '3px solid var(--accent-gold)', paddingLeft: '1rem' }}>
              <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--accent-gold)', fontWeight: 700 }}>English Title</span>
              <h1 style={{ fontSize: '1.6rem', marginTop: '0.3rem', color: '#FFFFFF' }}>{record.title.en}</h1>
            </div>
            <div style={{ borderRight: '3px solid var(--accent-gold)', paddingRight: '1rem', textAlign: 'right' }} dir="rtl">
              <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--accent-gold)', fontWeight: 700 }}>اردو عنوان</span>
              <h1 style={{ fontSize: '1.7rem', marginTop: '0.3rem', color: '#FFFFFF', fontFamily: 'var(--font-ur-display)' }}>{record.title.ur}</h1>
            </div>
          </div>
        ) : (
          <div style={{ marginBottom: '1.25rem' }}>
            <h1 style={{ fontSize: '1.85rem', lineHeight: 1.3, color: '#FFFFFF', marginBottom: '0.5rem' }}>
              {record.title[language] || record.title.en}
            </h1>
            <p
              style={{
                fontSize: '1.1rem',
                color: 'var(--accent-gold-light)',
                fontFamily: language === 'en' ? 'var(--font-ur-display)' : 'var(--font-en-display)',
              }}
              dir={language === 'en' ? 'rtl' : 'ltr'}
            >
              {language === 'en' ? record.title.ur : record.title.en}
            </p>
          </div>
        )}

        {/* Summary */}
        <div
          style={{
            backgroundColor: 'rgba(7, 13, 24, 0.6)',
            padding: '1.25rem',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--border-subtle)',
            fontSize: '1rem',
            lineHeight: 1.65,
            color: 'var(--text-secondary)',
          }}
        >
          <strong style={{ color: 'var(--accent-gold-light)' }}>{language === 'ur' ? 'خلاصہ: ' : 'Summary: '}</strong>
          {record.summary[language] || record.summary.en}
        </div>
      </div>

      {/* Navigation Tabs */}
      <div
        style={{
          display: 'flex',
          borderBottom: '1px solid var(--border-subtle)',
          marginBottom: '2rem',
          overflowX: 'auto',
          gap: '0.5rem',
        }}
      >
        {tabs.map(tab => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className="btn btn-ghost"
              style={{
                borderRadius: 'var(--radius-sm) var(--radius-sm) 0 0',
                borderBottom: isActive ? '3px solid var(--accent-gold)' : '3px solid transparent',
                backgroundColor: isActive ? 'var(--accent-gold-subtle)' : 'transparent',
                color: isActive ? 'var(--accent-gold-bright)' : 'var(--text-muted)',
                fontWeight: isActive ? 700 : 500,
                padding: '0.75rem 1.25rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                whiteSpace: 'nowrap',
              }}
            >
              {tab.icon}
              <span>{tab.label[language]}</span>
              {tab.count !== undefined && (
                <span
                  style={{
                    backgroundColor: isActive ? 'var(--accent-gold)' : 'rgba(255,255,255,0.1)',
                    color: isActive ? '#070D18' : 'var(--text-secondary)',
                    fontSize: '0.72rem',
                    padding: '0.1rem 0.45rem',
                    borderRadius: 'var(--radius-pill)',
                    fontWeight: 700,
                  }}
                >
                  {tab.count}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Tab Content Panels */}
      <div>
        {/* 1. NARRATIVE TAB */}
        {activeTab === 'narrative' && (
          <div className="glass-panel" style={{ padding: '2rem', backgroundColor: 'var(--bg-card)' }}>
            {/* Domain-specific Metadata Cards */}
            {record.domainMetadata?.legal && (
              <div
                style={{
                  backgroundColor: 'var(--bg-surface-elevated)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: 'var(--radius-md)',
                  padding: '1.25rem',
                  marginBottom: '2rem',
                }}
              >
                <h4 style={{ fontSize: '0.95rem', color: 'var(--accent-gold)', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <Scale size={16} />
                  <span>{language === 'ur' ? 'عدالتی و قانونی کوائف' : 'Judicial Docket Metadata'}</span>
                </h4>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem', fontSize: '0.88rem' }}>
                  {record.domainMetadata.legal.caseNumber && (
                    <div>
                      <span style={{ color: 'var(--text-muted)', display: 'block' }}>{language === 'ur' ? 'کیس / پٹیشن نمبر:' : 'Case Number:'}</span>
                      <strong style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-primary)' }}>{record.domainMetadata.legal.caseNumber}</strong>
                    </div>
                  )}
                  {record.domainMetadata.legal.courtName && (
                    <div>
                      <span style={{ color: 'var(--text-muted)', display: 'block' }}>{language === 'ur' ? 'عدالت:' : 'Court:'}</span>
                      <strong style={{ color: 'var(--text-primary)' }}>{record.domainMetadata.legal.courtName[language] || record.domainMetadata.legal.courtName.en}</strong>
                    </div>
                  )}
                  {record.domainMetadata.legal.disposition && (
                    <div>
                      <span style={{ color: 'var(--text-muted)', display: 'block' }}>{language === 'ur' ? 'حتمی فیصلہ:' : 'Disposition:'}</span>
                      <strong style={{ color: 'var(--accent-gold-bright)' }}>{record.domainMetadata.legal.disposition[language] || record.domainMetadata.legal.disposition.en}</strong>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Markdown-style Narrative Body */}
            <div style={{ fontSize: '1.02rem', lineHeight: 1.8, color: 'var(--text-primary)', whiteSpace: 'pre-line' }}>
              {record.narrative[language] || record.narrative.en}
            </div>
          </div>
        )}

        {/* 2. EVIDENTIARY MATRIX & CLAIMS TAB */}
        {activeTab === 'claims' && (
          <div>
            <div
              style={{
                backgroundColor: 'rgba(197, 168, 128, 0.08)',
                border: '1px solid var(--border-subtle)',
                borderRadius: 'var(--radius-md)',
                padding: '1rem 1.25rem',
                marginBottom: '1.5rem',
                fontSize: '0.85rem',
                color: 'var(--text-secondary)',
              }}
            >
              <strong>{language === 'ur' ? 'شواہد کا اصولی پیمانہ: ' : 'Evidentiary Standard: '}</strong>
              {language === 'ur'
                ? 'انصاف آرکائیو الزامات کو خودکار طور پر حقیقت تسلیم نہیں کرتا۔ ہر بیان کو عدالتی فیصلے، سرکاری مؤقف، تحقیقاتی رپورٹ یا غیر حل شدہ سوال کے طور پر ماخذ کے ساتھ الگ الگ ظاہر کیا جاتا ہے۔'
                : 'Insaf Archive strictly separates documented facts, judicial decrees, and audit findings from contested allegations, counter-claims, and official statements. Every assertion is individually cited.'}
            </div>

            {record.claims.length === 0 ? (
              <p style={{ color: 'var(--text-muted)', textAlign: 'center', padding: '2rem' }}>
                {language === 'ur' ? 'اس ریکارڈ کے لیے الگ شواہد درج نہیں ہیں۔' : 'No individual claim assertions registered for this record.'}
              </p>
            ) : (
              record.claims.map(claim => (
                <ClaimCard
                  key={claim.claimId}
                  claim={claim}
                  sources={record.sources}
                  onSelectSource={srcId => {
                    setActiveTab('sources');
                    setTimeout(() => {
                      const el = document.getElementById(`source-${srcId}`);
                      el?.scrollIntoView({ behavior: 'smooth' });
                    }, 100);
                  }}
                />
              ))
            )}
          </div>
        )}

        {/* 3. SOURCES & CITATIONS TAB */}
        {activeTab === 'sources' && (
          <div>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '1rem',
                color: 'var(--text-gold)',
                fontSize: '0.9rem',
                fontWeight: 600,
              }}
            >
              <span>{language === 'ur' ? `کل ماخذ و حوالہ جات (${record.sources.length})` : `Primary & Secondary Citations (${record.sources.length})`}</span>
            </div>

            {record.sources.length === 0 ? (
              <p style={{ color: 'var(--text-muted)', textAlign: 'center', padding: '2rem' }}>
                {language === 'ur' ? 'کوئی ماخذ منسلک نہیں ہے۔' : 'No source citations attached.'}
              </p>
            ) : (
              record.sources.map(src => <SourceCard key={src.sourceId} source={src} />)
            )}
          </div>
        )}

        {/* 4. CONNECTED DOSSIER GRAPH TAB */}
        {activeTab === 'graph' && <RelationshipGraphView currentRecord={record} />}

        {/* 5. EVIDENCE & MEDIA TAB */}
        {activeTab === 'media' && (
          <div>
            {record.evidenceMedia.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>
                <FolderArchive size={36} color="var(--accent-gold)" style={{ margin: '0 auto 0.5rem auto', opacity: 0.6 }} />
                <p>{language === 'ur' ? 'کوئی تصویری یا دستاویزی میڈیا فائل منسلک نہیں ہے۔' : 'No attached photographs, PDFs, or video evidence records.'}</p>
              </div>
            ) : (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
                {record.evidenceMedia.map(media => (
                  <div
                    key={media.mediaId}
                    style={{
                      backgroundColor: 'var(--bg-card)',
                      border: '1px solid var(--border-subtle)',
                      borderRadius: 'var(--radius-md)',
                      overflow: 'hidden',
                    }}
                  >
                    {media.mediaType === 'photograph' && (
                      <img
                        src={media.fileUrl}
                        alt={media.title[language] || media.title.en}
                        style={{ width: '100%', height: '220px', objectFit: 'cover' }}
                      />
                    )}
                    <div style={{ padding: '1rem' }}>
                      <h4 style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.35rem' }}>
                        {media.title[language] || media.title.en}
                      </h4>
                      {media.caption && (
                        <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                          {media.caption[language] || media.caption.en}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* 6. GOVERNANCE & AUDIT TAB */}
        {activeTab === 'audit' && (
          <div className="glass-panel" style={{ padding: '2rem', backgroundColor: 'var(--bg-card)' }}>
            <h3 style={{ fontSize: '1.1rem', color: 'var(--accent-gold)', marginBottom: '1rem' }}>
              {language === 'ur' ? 'ادارتی تاریخ و تصدیق کا ریکارڈ' : 'Record Provenance & Governance'}
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.25rem', fontSize: '0.88rem' }}>
              <div>
                <span style={{ color: 'var(--text-muted)', display: 'block' }}>{language === 'ur' ? 'آرکائیو شناختی کوڈ (ID):' : 'Archival ID:'}</span>
                <strong style={{ fontFamily: 'var(--font-mono)' }}>{record.id}</strong>
              </div>
              <div>
                <span style={{ color: 'var(--text-muted)', display: 'block' }}>{language === 'ur' ? 'ورژن:' : 'Schema Version:'}</span>
                <strong>v{record.version}.0</strong>
              </div>
              <div>
                <span style={{ color: 'var(--text-muted)', display: 'block' }}>{language === 'ur' ? 'شائع کردہ تاریخ:' : 'Publication Timestamp:'}</span>
                <strong>{new Date(record.createdAt).toLocaleDateString()}</strong>
              </div>
              <div>
                <span style={{ color: 'var(--text-muted)', display: 'block' }}>{language === 'ur' ? 'پرائیویسی لیول:' : 'Privacy Level:'}</span>
                <strong>{record.privacyClassification.toUpperCase()}</strong>
              </div>
            </div>
          </div>
        )}

        {/* 7. CONSTITUTIONAL NEXUS TAB */}
        {activeTab === 'constitution' && (
          <div>
            <div
              style={{
                backgroundColor: 'rgba(212, 175, 55, 0.08)',
                border: '1px solid rgba(212, 175, 55, 0.3)',
                borderRadius: 'var(--radius-md)',
                padding: '1.25rem',
                marginBottom: '1.5rem',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.4rem' }}>
                <Landmark size={20} color="var(--accent-gold)" />
                <h3 style={{ fontSize: '1.1rem', color: '#FFFFFF', fontWeight: 700 }}>
                  {language === 'ur' ? 'دستورِ پاکستان سے باضابطہ قانونی تعلق' : 'Constitutional Nexus & Statutory Guarantees'}
                </h3>
              </div>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                {language === 'ur'
                  ? 'یہ ریکارڈ دستورِ پاکستان کی درج ذیل دفعات اور بنیادی حقوق سے مربوط ہے۔ ہر تعلق کے ساتھ عدالتی جانچ، ثابت شدہ خلاف ورزی یا قانونی تنازع کی نوعیت واضح کی گئی ہے۔'
                  : 'This archival record has been cross-referenced with specific provisions of the Constitution of Pakistan. Each connection details the relevant factual issue, legal reasoning, and judicial determination.'}
              </p>
            </div>

            {constitutionalMappings.length === 0 ? (
              <div style={{ padding: '3rem', textAlign: 'center', backgroundColor: 'var(--bg-card)', borderRadius: 'var(--radius-md)', color: 'var(--text-muted)' }}>
                <Scale size={36} color="var(--accent-gold)" style={{ margin: '0 auto 0.75rem auto', opacity: 0.5 }} />
                <p>
                  {language === 'ur'
                    ? 'اس ریکارڈ کے لیے ابھی تک کوئی آئینی میپنگ منظور نہیں ہوئی۔'
                    : 'No approved constitutional mappings registered for this record yet.'}
                </p>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                {constitutionalMappings.map(map => (
                  <div
                    key={map.mappingId}
                    className="glass-panel"
                    style={{
                      padding: '1.5rem',
                      backgroundColor: 'var(--bg-card)',
                      border: '1px solid var(--border-subtle)',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '0.85rem',
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                        <span className="badge" style={{ backgroundColor: 'rgba(212, 175, 55, 0.15)', color: 'var(--accent-gold-bright)', fontWeight: 700 }}>
                          {map.articleId.replace('PK-CONST-A', 'Article ')}
                        </span>
                        {map.alertLevel === 'green' && (
                          <span className="badge" style={{ backgroundColor: 'rgba(16, 185, 129, 0.15)', color: '#34D399', border: '1px solid #10B981' }}>
                            <CheckCircle2 size={12} style={{ marginRight: '4px' }} />
                            {map.courtRulingSummary?.findingOutcome === 'violation_found'
                              ? (language === 'ur' ? 'عدالتی فیصلہ: خلاف ورزی ثابت' : 'Court Finding: Violation Determined')
                              : (language === 'ur' ? 'عدالتی تشریح' : 'Judicial Adjudication')}
                          </span>
                        )}
                        {map.alertLevel === 'red' && (
                          <span className="badge" style={{ backgroundColor: 'rgba(239, 68, 68, 0.15)', color: '#F87171', border: '1px solid #EF4444' }}>
                            <AlertTriangle size={12} style={{ marginRight: '4px' }} />
                            {language === 'ur' ? 'سنگین آئینی تشویش' : 'Serious Constitutional Concern'}
                          </span>
                        )}
                        {map.alertLevel === 'orange' && (
                          <span className="badge" style={{ backgroundColor: 'rgba(245, 158, 11, 0.15)', color: '#FBBF24', border: '1px solid #F59E0B' }}>
                            <HelpCircle size={12} style={{ marginRight: '4px' }} />
                            {language === 'ur' ? 'جانچ زیرِ غور' : 'Under Review'}
                          </span>
                        )}
                        {map.alertLevel === 'blue' && (
                          <span className="badge" style={{ backgroundColor: 'rgba(59, 130, 246, 0.15)', color: '#60A5FA', border: '1px solid #3B82F6' }}>
                            <Scale size={12} style={{ marginRight: '4px' }} />
                            {language === 'ur' ? 'آئینی سوال / تنازع' : 'Constitutional Question'}
                          </span>
                        )}
                      </div>

                      <button
                        onClick={() => viewArticle(map.articleId)}
                        className="btn btn-primary btn-sm"
                        style={{ gap: '0.4rem' }}
                      >
                        <span>{language === 'ur' ? 'آئین میں دیکھیں' : 'Read Article in Constitution'}</span>
                        <ExternalLink size={13} />
                      </button>
                    </div>

                    <div>
                      <h4 style={{ fontSize: '1rem', color: '#FFFFFF', marginBottom: '0.35rem' }}>
                        {map.factualSummary[language]}
                      </h4>
                      <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                        {map.legalAnalysis[language]}
                      </p>
                    </div>

                    {map.courtRulingSummary && (
                      <div
                        style={{
                          backgroundColor: 'rgba(16, 185, 129, 0.08)',
                          border: '1px solid rgba(16, 185, 129, 0.25)',
                          borderRadius: 'var(--radius-sm)',
                          padding: '0.85rem',
                          fontSize: '0.85rem',
                        }}
                      >
                        <strong style={{ color: '#34D399' }}>
                          {map.courtRulingSummary.courtName[language]} ({map.courtRulingSummary.caseCitation}):
                        </strong>{' '}
                        <span style={{ color: 'var(--text-secondary)' }}>
                          {map.courtRulingSummary.operativeText[language]}
                        </span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
