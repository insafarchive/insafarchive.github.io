/**
 * INSAF ARCHIVE (انصاف آرکائیو)
 * Master Homepage View
 */

import React, { useState } from 'react';
import { useArchive } from '../context/ArchiveContext';
import { DOMAIN_REGISTRY } from '../data/taxonomy';
import type { ArchiveDomain } from '../types/archive';
import { RecordCard } from '../components/record/RecordCard';
import {
  Search,
  Scale,
  ShieldCheck,
  History,
  FileCheck2,
  FolderLock,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  Zap,
} from 'lucide-react';

export const HomeView: React.FC = () => {
  const { records, language, navigateTo, viewRecord } = useArchive();
  const [localSearch, setLocalSearch] = useState('');

  const domainKeys = Object.keys(DOMAIN_REGISTRY) as ArchiveDomain[];

  const handleHeroSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (localSearch.trim()) {
      navigateTo('archive', { query: localSearch.trim() });
    }
  };

  // Curated spotlight record: Arshad Sharif Killing
  const arshadDossier = records.find(r => r.id === 'rec-pk-2022-arshad-sharif-killing');
  const ippDossier = records.find(r => r.id === 'rec-pk-energy-ipp-power-policy-1994-2002');
  const recentRecords = records.slice(0, 4);

  return (
    <div>
      {/* 1. HERO SECTION */}
      <section
        style={{
          padding: '4.5rem 0 3.5rem 0',
          position: 'relative',
          borderBottom: '1px solid var(--border-subtle)',
        }}
      >
        <div className="content-wrap" style={{ textAlign: 'center', maxWidth: '960px' }}>
          {/* Institutional Badge */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              backgroundColor: 'var(--accent-gold-subtle)',
              border: '1px solid var(--border-medium)',
              padding: '0.35rem 0.95rem',
              borderRadius: 'var(--radius-pill)',
              color: 'var(--accent-gold-bright)',
              fontSize: '0.85rem',
              fontWeight: 600,
              marginBottom: '1.5rem',
            }}
          >
            <ShieldCheck size={16} />
            <span>{language === 'ur' ? 'پاکستان کا جامع تاریخی و عدالتی دستاویزی ریکارڈ' : 'Universal Evidence & Historical Archive of Pakistan'}</span>
          </div>

          {/* Primary Main Heading */}
          <h1
            style={{
              fontSize: 'clamp(2.2rem, 5vw, 3.4rem)',
              fontWeight: 800,
              lineHeight: 1.15,
              color: '#FFFFFF',
              marginBottom: '1.25rem',
              letterSpacing: '-0.03em',
            }}
          >
            {language === 'ur' ? (
              <span>حقائق، عدالتی نظائر اور تاریخ کا <span style={{ color: 'var(--accent-gold)' }}>مصدقہ دستاویزی ثبوت</span></span>
            ) : (
              <span>Documenting Pakistan’s Legal, Constitutional & <span style={{ color: 'var(--accent-gold)' }}>Historical Record</span></span>
            )}
          </h1>

          {/* Subtitle */}
          <p
            style={{
              fontSize: '1.15rem',
              color: 'var(--text-secondary)',
              lineHeight: 1.6,
              marginBottom: '2.5rem',
              maxWidth: '820px',
              margin: '0 auto 2.5rem auto',
            }}
          >
            {language === 'ur'
              ? 'انصاف آرکائیو قانون، عدالتی فیصلوں، انسانی حقوق، آزادی صحافت، توانائی پالیسی اور ریاستی فیصلوں کا ایک آزاد، سورس ڈریون اور غیر جانبدارانہ انسائیکلوپیڈیا ہے۔'
              : 'A source-driven, bilingual Pakistani archive interlinking court judgments, constitutional history, journalist investigations, energy contracts, and archival evidence.'}
          </p>

          {/* Hero Search Bar */}
          <form onSubmit={handleHeroSearch} style={{ maxWidth: '680px', margin: '0 auto 1.5rem auto' }}>
            <div className="search-input-wrap">
              <div className="search-icon-pos">
                <Search size={22} />
              </div>
              <input
                type="text"
                className="search-input"
                placeholder={
                  language === 'ur'
                    ? 'عدالتی فیصلے، صحافی، ایف آئی آر نمبر، یا موضوع تلاش کریں (مثلاً ارشد شریف، آئی پی پی، ملٹری کورٹس)...'
                    : 'Search court judgments, journalist dossiers, IPP contracts, FIRs (English or Urdu)...'
                }
                value={localSearch}
                onChange={e => setLocalSearch(e.target.value)}
              />
              <button
                type="submit"
                className="btn btn-primary"
                style={{
                  position: 'absolute',
                  right: language === 'en' ? '0.4rem' : 'auto',
                  left: language === 'ur' ? '0.4rem' : 'auto',
                  padding: '0.6rem 1.25rem',
                }}
              >
                {language === 'ur' ? 'تلاش کریں' : 'Search Archive'}
              </button>
            </div>
          </form>

          <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
            <Sparkles size={13} style={{ display: 'inline', verticalAlign: 'middle', marginRight: '4px', color: 'var(--accent-gold)' }} />
            {language === 'ur'
              ? 'اردو و عربی حروف کی خودکار اصلاح (تسکین، ہمزہ اور املا نارملائزیشن فعال ہے)'
              : 'Automatic Urdu/Arabic normalizer active across all records and citations'}
          </p>
        </div>
      </section>

      {/* 2. DOMAIN GATEWAYS SECTION */}
      <section style={{ padding: '4rem 0' }}>
        <div className="content-wrap">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <span style={{ fontSize: '0.8rem', textTransform: 'uppercase', color: 'var(--accent-gold)', fontWeight: 700, letterSpacing: '0.05em' }}>
                {language === 'ur' ? 'آرکائیو کے شعبہ جات' : 'Universal Domains'}
              </span>
              <h2 style={{ fontSize: '1.75rem', color: '#FFFFFF', marginTop: '0.2rem' }}>
                {language === 'ur' ? 'تحقیقاتی شعبہ جات و موضوعات' : 'Explore by Archival Domain'}
              </h2>
            </div>
            <button onClick={() => navigateTo('archive')} className="btn btn-secondary btn-sm" style={{ gap: '0.4rem' }}>
              <span>{language === 'ur' ? 'مکمل آرکائیو دیکھیں' : 'View Full Archive'}</span>
              {language === 'ur' ? <ArrowLeft size={14} /> : <ArrowRight size={14} />}
            </button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem' }}>
            {domainKeys.map(domain => {
              const info = DOMAIN_REGISTRY[domain];
              const count = records.filter(r => r.domain === domain).length;
              return (
                <div
                  key={domain}
                  onClick={() => navigateTo('archive', { domain })}
                  className="glass-panel"
                  style={{
                    padding: '1.5rem',
                    cursor: 'pointer',
                    transition: 'all var(--transition-normal)',
                    backgroundColor: 'var(--bg-card)',
                    border: '1px solid var(--border-subtle)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.borderColor = info.color;
                    e.currentTarget.style.backgroundColor = 'var(--bg-card-hover)';
                    e.currentTarget.style.transform = 'translateY(-3px)';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.borderColor = 'var(--border-subtle)';
                    e.currentTarget.style.backgroundColor = 'var(--bg-card)';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                      <div
                        style={{
                          width: '38px',
                          height: '38px',
                          borderRadius: 'var(--radius-sm)',
                          backgroundColor: info.badgeBg,
                          border: `1px solid ${info.color}50`,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: info.color,
                        }}
                      >
                        <Scale size={20} />
                      </div>
                      <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                        {count} {language === 'ur' ? 'ریکارڈز' : 'records'}
                      </span>
                    </div>

                    <h3 style={{ fontSize: '1.15rem', color: '#FFFFFF', marginBottom: '0.45rem' }}>
                      {info.label[language]}
                    </h3>

                    <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                      {info.description[language]}
                    </p>
                  </div>

                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.3rem',
                      fontSize: '0.8rem',
                      color: info.color,
                      fontWeight: 600,
                      marginTop: '1.25rem',
                    }}
                  >
                    <span>{language === 'ur' ? 'ریکارڈز دیکھیں' : 'Explore domain'}</span>
                    {language === 'ur' ? <ArrowLeft size={13} /> : <ArrowRight size={13} />}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. FEATURED INVESTIGATIVE DOSSIER SPOTLIGHT */}
      <section style={{ padding: '3rem 0', backgroundColor: 'var(--bg-surface)' }}>
        <div className="content-wrap">
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <span style={{ fontSize: '0.8rem', textTransform: 'uppercase', color: 'var(--accent-gold)', fontWeight: 700, letterSpacing: '0.05em' }}>
              {language === 'ur' ? 'خصوصی دستاویزی فائلیں' : 'Featured Archival Dossiers'}
            </span>
            <h2 style={{ fontSize: '1.85rem', color: '#FFFFFF', marginTop: '0.3rem' }}>
              {language === 'ur' ? 'عوامی اہمیت کے تاریخی و قانونی معاملات' : 'Comprehensive Multi-Record Dossiers'}
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '2rem' }}>
            {/* Arshad Sharif Dossier Spotlight */}
            {arshadDossier && (
              <div
                className="glass-panel"
                style={{
                  padding: '2rem',
                  backgroundColor: 'var(--bg-surface-elevated)',
                  border: '1px solid var(--accent-gold-dark)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  boxShadow: 'var(--shadow-gold)',
                }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.85rem' }}>
                    <span className="badge" style={{ backgroundColor: 'rgba(245, 158, 11, 0.15)', color: '#FBBF24', border: '1px solid rgba(245, 158, 11, 0.3)' }}>
                      <FolderLock size={12} />
                      {language === 'ur' ? 'خصوصی تحقیقاتی فائل' : 'Investigative Dossier'}
                    </span>
                    <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>4 Linked Records</span>
                  </div>

                  <h3 style={{ fontSize: '1.35rem', color: '#FFFFFF', marginBottom: '0.6rem', lineHeight: 1.35 }}>
                    {arshadDossier.title[language] || arshadDossier.title.en}
                  </h3>

                  <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '1.25rem' }}>
                    {language === 'ur'
                      ? '592 صفحات پر مشتمل پاکستانی فیکٹ فائنڈنگ رپورٹ، کینین ہائی کورٹ کے تاریخی فیصلے (2024ء)، سپریم کورٹ ازخود نوٹس اور فرانزک بیلسٹک تجزیے کا جامع احاطہ۔'
                      : 'Complete multi-record dossier connecting the Pakistani 592-page JIT Fact Finding report, the landmark Kenyan High Court ruling (2024), and Supreme Court SMC 8/2022 proceedings.'}
                  </p>
                </div>

                <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1rem' }}>
                  <button onClick={() => viewRecord(arshadDossier.id)} className="btn btn-primary btn-sm" style={{ flex: 1 }}>
                    {language === 'ur' ? 'مکمل فائل کا معائنہ کریں' : 'Inspect Dossier'}
                  </button>
                  <button onClick={() => navigateTo('dossiers')} className="btn btn-secondary btn-sm">
                    {language === 'ur' ? 'تمام فائلیں' : 'All Dossiers'}
                  </button>
                </div>
              </div>
            )}

            {/* IPP Energy & Capacity Payments Spotlight */}
            {ippDossier && (
              <div
                className="glass-panel"
                style={{
                  padding: '2rem',
                  backgroundColor: 'var(--bg-surface-elevated)',
                  border: '1px solid var(--border-medium)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.85rem' }}>
                    <span className="badge" style={{ backgroundColor: 'rgba(6, 182, 212, 0.15)', color: '#38BDF8', border: '1px solid rgba(6, 182, 212, 0.3)' }}>
                      <Zap size={12} />
                      {language === 'ur' ? 'توانائی و پبلک فنانس' : 'Energy & Public Finance'}
                    </span>
                    <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>1994–2024 Framework</span>
                  </div>

                  <h3 style={{ fontSize: '1.35rem', color: '#FFFFFF', marginBottom: '0.6rem', lineHeight: 1.35 }}>
                    {ippDossier.title[language] || ippDossier.title.en}
                  </h3>

                  <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '1.25rem' }}>
                    {language === 'ur'
                      ? 'آئی پی پی معاہدوں میں کیپسٹی پیمنٹس اور فیول چارجز کا فرق، ڈالر انڈیکسیشن، محمد علی آڈٹ کمیٹی رپورٹ اور 2.6 ٹریلین کے گردشی قرضے کا معاشی و قانونی ریکارڈ۔'
                      : 'Detailed analysis of Power Purchase Agreements (PPAs), contractual capacity payments vs. actual generation, dollar indexation, and the 2020 Power Sector Inquiry findings.'}
                  </p>
                </div>

                <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1rem' }}>
                  <button onClick={() => viewRecord(ippDossier.id)} className="btn btn-secondary btn-sm" style={{ flex: 1 }}>
                    {language === 'ur' ? 'معاہداتی ریکارڈ دیکھیں' : 'Inspect IPP Record'}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 4. RECENT VERIFIED DOCUMENTARY RECORDS */}
      <section style={{ padding: '4rem 0' }}>
        <div className="content-wrap">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <span style={{ fontSize: '0.8rem', textTransform: 'uppercase', color: 'var(--accent-gold)', fontWeight: 700, letterSpacing: '0.05em' }}>
                {language === 'ur' ? 'حالیہ مصدقہ اندراجات' : 'Verified Archives'}
              </span>
              <h2 style={{ fontSize: '1.75rem', color: '#FFFFFF', marginTop: '0.2rem' }}>
                {language === 'ur' ? 'تازہ ترین دستاویزی ریکارڈز' : 'Recently Documented Records'}
              </h2>
            </div>
            <button onClick={() => navigateTo('archive')} className="btn btn-secondary btn-sm" style={{ gap: '0.4rem' }}>
              <span>{language === 'ur' ? 'تمام ریکارڈز دیکھیں' : 'Browse All Records'}</span>
              {language === 'ur' ? <ArrowLeft size={14} /> : <ArrowRight size={14} />}
            </button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }}>
            {recentRecords.map(rec => (
              <RecordCard key={rec.id} record={rec} />
            ))}
          </div>
        </div>
      </section>

      {/* 5. INTERACTIVE TIMELINE ENTRY CALLOUT */}
      <section style={{ padding: '3.5rem 0', backgroundColor: 'var(--bg-surface)' }}>
        <div className="content-wrap">
          <div
            className="glass-panel"
            style={{
              padding: '2.5rem',
              backgroundColor: 'var(--bg-surface-elevated)',
              border: '1px solid var(--border-medium)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '2rem',
            }}
          >
            <div style={{ maxWidth: '650px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--accent-gold)', marginBottom: '0.5rem' }}>
                <History size={20} />
                <span style={{ fontSize: '0.85rem', fontWeight: 700, textTransform: 'uppercase' }}>
                  {language === 'ur' ? 'قومی تاریخی تسلسل' : 'National Chronology Stream'}
                </span>
              </div>
              <h2 style={{ fontSize: '1.7rem', color: '#FFFFFF', marginBottom: '0.75rem' }}>
                {language === 'ur' ? 'پاکستان کی 75 سالہ تاریخی و قانونی ٹائم لائن' : 'Explore Decades of Pakistani History'}
              </h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.6 }}>
                {language === 'ur'
                  ? 'مارشل لاء ادوار، آئینی بحران، عدالتی تاریخی نظائر اور معاشی معاہدوں کو دہائیوں کے تسلسل میں ملاحظہ کریں۔'
                  : 'Navigate interconnected historical periods, constitutional crises, state formation events, and Supreme Court rulings on an interactive chronological canvas.'}
              </p>
            </div>

            <button onClick={() => navigateTo('timeline')} className="btn btn-primary btn-lg" style={{ gap: '0.6rem' }}>
              <span>{language === 'ur' ? 'ٹائم لائن کھولیں' : 'Launch Master Timeline'}</span>
              {language === 'ur' ? <ArrowLeft size={16} /> : <ArrowRight size={16} />}
            </button>
          </div>
        </div>
      </section>

      {/* 6. METHODOLOGY & NON-FABRICATION CHARTER */}
      <section style={{ padding: '4rem 0' }}>
        <div className="content-wrap" style={{ textAlign: 'center', maxWidth: '820px' }}>
          <div
            style={{
              width: '48px',
              height: '48px',
              borderRadius: '50%',
              backgroundColor: 'var(--accent-gold-subtle)',
              border: '1px solid var(--accent-gold)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1.25rem auto',
            }}
          >
            <FileCheck2 size={24} color="var(--accent-gold)" />
          </div>

          <h2 style={{ fontSize: '1.65rem', color: '#FFFFFF', marginBottom: '0.75rem' }}>
            {language === 'ur' ? 'غیر جانبداری اور دستاویزی ثبوت کی ضمانت' : 'Strict Neutrality & Non-Fabrication Commitment'}
          </h2>

          <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', lineHeight: 1.65, marginBottom: '1.5rem' }}>
            {language === 'ur'
              ? 'انصاف آرکائیو الزامات کو ازخود حقیقت تسلیم نہیں کرتا۔ ہر دعوے، عدالتی نتیجے اور سرکاری مؤقف کو تصدیق شدہ ماخذ، عدالتی دستاویز، گزٹ اور فرانزک شواہد کے ساتھ علیحدہ ظاہر کیا جاتا ہے۔'
              : 'Insaf Archive never converts unproven allegations into established facts. Every assertion is strictly classified by evidentiary weight and backed by primary court dockets, gazettes, and verified public documents.'}
          </p>

          <button onClick={() => navigateTo('standards')} className="btn btn-secondary btn-sm">
            {language === 'ur' ? 'ادارتی ضابطہ اخلاق و تصدیقی طریقہ کار پڑھیں' : 'Read Editorial Methodology & Governance'}
          </button>
        </div>
      </section>
    </div>
  );
};
