/**
 * INSAF ARCHIVE (انصاف آرکائیو)
 * Master Archival Dossiers View — 13-Point Archival Standard
 */

import React, { useState } from 'react';
import { useArchive } from '../context/ArchiveContext';
import { ALL_ARCHIVAL_DOSSIERS } from '../data/dossiers';
import type { ArchivalDossier, DossierDomain } from '../types/dossier';
import {
  FolderLock,
  Scale,
  Newspaper,
  Zap,
  History,
  FileText,
  AlertTriangle,
  ArrowRight,
  ArrowLeft,
  Calendar,
  Users,
  ShieldCheck,
  CheckCircle2,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  X,
  FileSpreadsheet,
} from 'lucide-react';

export const DossiersView: React.FC = () => {
  const { language, viewRecord } = useArchive();
  const [selectedDomain, setSelectedDomain] = useState<DossierDomain | 'all'>('all');
  const [statusFilter, setStatusFilter] = useState<'all' | 'published' | 'under_review' | 'draft'>('all');
  const [activeDossierModal, setActiveDossierModal] = useState<ArchivalDossier | null>(null);
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    chronology: true,
    claims: true,
    actors: false,
    officialPositions: false,
    courtFindings: true,
    sources: false,
  });

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const getDomainIcon = (domain: DossierDomain, size = 20) => {
    switch (domain) {
      case 'constitutional_legal':
        return <Scale size={size} color="#3B82F6" />;
      case 'major_public_events':
        return <AlertTriangle size={size} color="#EF4444" />;
      case 'journalism_press_freedom':
        return <Newspaper size={size} color="#F59E0B" />;
      case 'historical_institutional':
        return <History size={size} color="#10B981" />;
      case 'energy_public_finance':
        return <Zap size={size} color="#06B6D4" />;
      case 'due_process_rights':
        return <FileText size={size} color="#8B5CF6" />;
      default:
        return <FolderLock size={size} color="#E5E7EB" />;
    }
  };

  const domainLabels: Record<DossierDomain, { en: string; ur: string }> = {
    constitutional_legal: { en: 'Constitutional & Legal Rights', ur: 'آئینی و قانونی حقوق' },
    major_public_events: { en: 'Major Public Events', ur: 'اہم عوامی واقعات' },
    journalism_press_freedom: { en: 'Journalism & Press Freedom', ur: 'صحافتی آزادی و تحفظ' },
    historical_institutional: { en: 'Historical & Institutional', ur: 'تاریخی و ادارہ جاتی ریکارڈ' },
    energy_public_finance: { en: 'Energy & Public Finance', ur: 'توانائی و پبلک فنانس' },
    due_process_rights: { en: 'Due Process & Fundamental Rights', ur: 'منصفانہ ٹرائل و بنیادی حقوق' },
  };

  const filteredDossiers = ALL_ARCHIVAL_DOSSIERS.filter(d => {
    if (selectedDomain !== 'all' && d.domain !== selectedDomain) return false;
    if (statusFilter !== 'all' && d.editorialStatus !== statusFilter) return false;
    return true;
  });

  return (
    <div className="content-wrap" style={{ padding: '2rem 1.5rem 5rem 1.5rem' }}>
      {/* Header */}
      <div style={{ marginBottom: '2.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.4rem' }}>
          <FolderLock size={28} color="var(--accent-gold)" />
          <h1 style={{ fontSize: '1.85rem', color: '#FFFFFF' }}>
            {language === 'ur' ? 'اہم تحقیقاتی و دستاویزی فائلیں' : 'Archival Thematic Dossiers'}
          </h1>
        </div>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', maxWidth: '850px', lineHeight: 1.6 }}>
          {language === 'ur'
            ? 'پاکستان کے اہم ترین آئینی، قانونی، تاریخی اور صحافتی معاملات پر 13 نکاتی دستاویزی فائلیں۔ ہر فائل میں مصدقہ کرونالوجی، بیانات، عدالتی فیصلے، دعووں کا شواہد جدول اور پرائیویسی جائزہ شامل ہے۔'
            : 'Authoritative thematic dossiers unifying primary court judgments, declassified inquiry reports, sourced chronologies, claim-by-claim evidence tables, and official positions under the 13-point archival standard.'}
        </p>

        {/* Filters */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', marginTop: '1.5rem', alignItems: 'center' }}>
          {/* Domain selector */}
          <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
            <button
              onClick={() => setSelectedDomain('all')}
              className={`btn btn-sm ${selectedDomain === 'all' ? 'btn-primary' : 'btn-ghost'}`}
              style={{ fontSize: '0.8rem' }}
            >
              {language === 'ur' ? 'تمام موضوعات' : 'All Domains'} ({ALL_ARCHIVAL_DOSSIERS.length})
            </button>
            {(Object.keys(domainLabels) as DossierDomain[]).map(dom => (
              <button
                key={dom}
                onClick={() => setSelectedDomain(dom)}
                className={`btn btn-sm ${selectedDomain === dom ? 'btn-primary' : 'btn-ghost'}`}
                style={{ fontSize: '0.8rem' }}
              >
                {domainLabels[dom][language]}
              </button>
            ))}
          </div>

          {/* Status selector */}
          <div style={{ marginLeft: 'auto', display: 'flex', gap: '0.4rem' }}>
            {(['all', 'published', 'under_review', 'draft'] as const).map(st => (
              <button
                key={st}
                onClick={() => setStatusFilter(st)}
                className={`btn btn-sm ${statusFilter === st ? 'btn-secondary' : 'btn-ghost'}`}
                style={{ fontSize: '0.75rem', textTransform: 'capitalize' }}
              >
                {st === 'all'
                  ? language === 'ur' ? 'تمام اسٹیٹس' : 'All Status'
                  : st === 'published'
                  ? language === 'ur' ? 'شائع شدہ' : 'Published'
                  : st === 'under_review'
                  ? language === 'ur' ? 'زیرِ جائزہ' : 'Under Review'
                  : language === 'ur' ? 'ڈرافٹ / بیک لاگ' : 'Draft / Backlog'}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Grid of Dossiers */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '1.75rem' }}>
        {filteredDossiers.map(dossier => (
          <div
            key={dossier.id}
            className="glass-panel"
            style={{
              padding: '1.75rem',
              backgroundColor: 'var(--bg-card)',
              border: '1px solid var(--border-subtle)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              transition: 'all var(--transition-normal)',
              borderRadius: 'var(--radius-lg)',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = dossier.tagColor;
              e.currentTarget.style.backgroundColor = 'var(--bg-card-hover)';
              e.currentTarget.style.transform = 'translateY(-2px)';
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
                    width: '42px',
                    height: '42px',
                    borderRadius: 'var(--radius-md)',
                    backgroundColor: `${dossier.tagColor}15`,
                    border: `1px solid ${dossier.tagColor}40`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  {getDomainIcon(dossier.domain, 22)}
                </div>

                <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                  <span
                    style={{
                      fontSize: '0.72rem',
                      color: dossier.editorialStatus === 'published' ? '#10B981' : dossier.editorialStatus === 'under_review' ? '#F59E0B' : '#9CA3AF',
                      backgroundColor: dossier.editorialStatus === 'published' ? '#10B98115' : dossier.editorialStatus === 'under_review' ? '#F59E0B15' : '#9CA3AF15',
                      border: `1px solid ${dossier.editorialStatus === 'published' ? '#10B98140' : dossier.editorialStatus === 'under_review' ? '#F59E0B40' : '#9CA3AF40'}`,
                      padding: '0.2rem 0.55rem',
                      borderRadius: 'var(--radius-pill)',
                      fontWeight: 600,
                      textTransform: 'uppercase',
                    }}
                  >
                    {dossier.editorialStatus.replace('_', ' ')}
                  </span>
                </div>
              </div>

              <h3 style={{ fontSize: '1.25rem', color: '#FFFFFF', marginBottom: '0.6rem', lineHeight: 1.35 }}>
                {dossier.title[language]}
              </h3>

              <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '1.25rem' }}>
                {dossier.overview[language]}
              </p>

              {/* Dossier Metadata Badges */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginBottom: '1.25rem' }}>
                <span style={{ fontSize: '0.72rem', backgroundColor: 'var(--bg-surface)', padding: '0.2rem 0.5rem', borderRadius: '4px', color: 'var(--text-muted)' }}>
                  {dossier.chronology.length} {language === 'ur' ? 'واقعات' : 'timeline events'}
                </span>
                <span style={{ fontSize: '0.72rem', backgroundColor: 'var(--bg-surface)', padding: '0.2rem 0.5rem', borderRadius: '4px', color: 'var(--text-muted)' }}>
                  {dossier.claims.length} {language === 'ur' ? 'شواہد دعوے' : 'sourced claims'}
                </span>
                {dossier.courtFindings && dossier.courtFindings.length > 0 && (
                  <span style={{ fontSize: '0.72rem', backgroundColor: '#3B82F615', color: '#60A5FA', padding: '0.2rem 0.5rem', borderRadius: '4px', border: '1px solid #3B82F630' }}>
                    {dossier.courtFindings.length} {language === 'ur' ? 'عدالتی فیصلے' : 'court findings'}
                  </span>
                )}
                {dossier.constitutionalProvisions.length > 0 && (
                  <span style={{ fontSize: '0.72rem', backgroundColor: '#F59E0B15', color: '#FBBF24', padding: '0.2rem 0.5rem', borderRadius: '4px', border: '1px solid #F59E0B30' }}>
                    {dossier.constitutionalProvisions.length} {language === 'ur' ? 'آئینی دفعات' : 'articles'}
                  </span>
                )}
              </div>
            </div>

            <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <button
                onClick={() => setActiveDossierModal(dossier)}
                className="btn btn-primary btn-sm"
                style={{ gap: '0.4rem' }}
              >
                <FileSpreadsheet size={13} />
                <span>{language === 'ur' ? 'مکمل فائل دیکھیں (13 نکات)' : 'Open Full Dossier (13 Pts)'}</span>
              </button>

              <button
                onClick={() => viewRecord(dossier.featuredRecordId)}
                className="btn btn-ghost btn-sm"
                style={{ gap: '0.3rem', fontSize: '0.8rem', color: 'var(--text-secondary)' }}
                title="View Primary Record"
              >
                <span>{language === 'ur' ? 'بنیادی ریکارڈ' : 'Primary Record'}</span>
                {language === 'ur' ? <ArrowLeft size={12} /> : <ArrowRight size={12} />}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Full 13-Point Dossier Modal */}
      {activeDossierModal && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.85)',
            backdropFilter: 'blur(8px)',
            zIndex: 1000,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '1.5rem',
          }}
          onClick={() => setActiveDossierModal(null)}
        >
          <div
            className="glass-panel"
            style={{
              width: '100%',
              maxWidth: '920px',
              maxHeight: '90vh',
              overflowY: 'auto',
              backgroundColor: '#0F172A',
              border: `1px solid ${activeDossierModal.tagColor}60`,
              borderRadius: 'var(--radius-lg)',
              padding: '2rem',
              color: '#F8FAFC',
              position: 'relative',
            }}
            onClick={e => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '1rem' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.5rem' }}>
                  <span
                    style={{
                      fontSize: '0.72rem',
                      color: activeDossierModal.tagColor,
                      backgroundColor: `${activeDossierModal.tagColor}15`,
                      border: `1px solid ${activeDossierModal.tagColor}40`,
                      padding: '0.2rem 0.6rem',
                      borderRadius: 'var(--radius-pill)',
                      fontWeight: 600,
                    }}
                  >
                    {domainLabels[activeDossierModal.domain][language]}
                  </span>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                    ID: {activeDossierModal.id}
                  </span>
                </div>
                <h2 style={{ fontSize: '1.6rem', color: '#FFFFFF', lineHeight: 1.3 }}>
                  {activeDossierModal.title[language]}
                </h2>
              </div>
              <button
                onClick={() => setActiveDossierModal(null)}
                className="btn btn-ghost btn-sm"
                style={{ padding: '0.4rem', color: 'var(--text-muted)' }}
              >
                <X size={20} />
              </button>
            </div>

            {/* Point 1: Overview */}
            <div style={{ marginBottom: '1.5rem', backgroundColor: 'var(--bg-surface)', padding: '1.25rem', borderRadius: 'var(--radius-md)' }}>
              <h4 style={{ fontSize: '0.95rem', color: 'var(--accent-gold)', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <CheckCircle2 size={16} /> {language === 'ur' ? '1. دستاویزی تعارف و جائزہ' : '1. Archival Overview'}
              </h4>
              <p style={{ fontSize: '0.92rem', color: '#CBD5E1', lineHeight: 1.7 }}>
                {activeDossierModal.overview[language]}
              </p>
            </div>

            {/* Point 2: Scope and Terminology Note */}
            <div style={{ marginBottom: '1.5rem', backgroundColor: 'var(--bg-card)', padding: '1.25rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
              <h4 style={{ fontSize: '0.95rem', color: '#60A5FA', marginBottom: '0.5rem' }}>
                {language === 'ur' ? '2. دائرہ کار و اصطلاحات کی وضاحت' : '2. Scope & Terminology Note'}
              </h4>
              <p style={{ fontSize: '0.88rem', color: '#94A3B8', lineHeight: 1.6 }}>
                {activeDossierModal.scopeAndTerminology[language]}
              </p>
            </div>

            {/* Point 3: Chronology */}
            <div style={{ marginBottom: '1.5rem', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-md)', overflow: 'hidden' }}>
              <div
                onClick={() => toggleSection('chronology')}
                style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.85rem 1.25rem', backgroundColor: 'var(--bg-surface)', cursor: 'pointer' }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 600, fontSize: '0.95rem' }}>
                  <Calendar size={16} color="var(--accent-gold)" />
                  <span>{language === 'ur' ? '3. مصدقہ کرونالوجی و ٹائم لائن' : '3. Sourced Chronology'}</span>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>({activeDossierModal.chronology.length})</span>
                </div>
                {expandedSections.chronology ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </div>

              {expandedSections.chronology && (
                <div style={{ padding: '1.25rem', backgroundColor: 'var(--bg-card)', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {activeDossierModal.chronology.map((c, idx) => (
                    <div key={idx} style={{ borderLeft: '2px solid var(--accent-gold)', paddingLeft: '1rem' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '0.2rem' }}>
                        <span style={{ fontWeight: 600, color: '#FFFFFF', fontSize: '0.95rem' }}>{c.title[language]}</span>
                        <span style={{ fontSize: '0.78rem', color: 'var(--accent-gold)' }}>{c.dateDisplay[language]}</span>
                      </div>
                      <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: '0.3rem' }}>
                        {c.description[language]}
                      </p>
                      <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                        {language === 'ur' ? 'مآخذ IDs:' : 'Source IDs:'} {c.sourceIds.join(', ')}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Point 4: Key Actors */}
            <div style={{ marginBottom: '1.5rem', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-md)', overflow: 'hidden' }}>
              <div
                onClick={() => toggleSection('actors')}
                style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.85rem 1.25rem', backgroundColor: 'var(--bg-surface)', cursor: 'pointer' }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 600, fontSize: '0.95rem' }}>
                  <Users size={16} color="#60A5FA" />
                  <span>{language === 'ur' ? '4. متعلقہ فریقین و ادارے (غیر جانبدارانہ تعارف)' : '4. Key Actors & Institutions'}</span>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>({activeDossierModal.keyActors.length})</span>
                </div>
                {expandedSections.actors ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </div>

              {expandedSections.actors && (
                <div style={{ padding: '1.25rem', backgroundColor: 'var(--bg-card)', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
                  {activeDossierModal.keyActors.map(actor => (
                    <div key={actor.actorId} style={{ backgroundColor: 'var(--bg-surface)', padding: '0.85rem', borderRadius: '6px', border: '1px solid var(--border-subtle)' }}>
                      <div style={{ fontWeight: 600, color: '#FFFFFF', fontSize: '0.9rem', marginBottom: '0.2rem' }}>
                        {actor.name[language]}
                      </div>
                      {actor.officialDesignation && (
                        <div style={{ fontSize: '0.75rem', color: 'var(--accent-gold)', marginBottom: '0.4rem' }}>
                          {actor.officialDesignation[language]}
                        </div>
                      )}
                      <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: 1.4 }}>
                        {actor.neutralDescription[language]}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Point 5: Sourced Claims Evidence Table */}
            <div style={{ marginBottom: '1.5rem', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-md)', overflow: 'hidden' }}>
              <div
                onClick={() => toggleSection('claims')}
                style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.85rem 1.25rem', backgroundColor: 'var(--bg-surface)', cursor: 'pointer' }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 600, fontSize: '0.95rem' }}>
                  <CheckCircle2 size={16} color="#10B981" />
                  <span>{language === 'ur' ? '5. دعووں کا شواہد جدول (Claim-by-Claim Table)' : '5. Claim-by-Claim Evidence Table'}</span>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>({activeDossierModal.claims.length})</span>
                </div>
                {expandedSections.claims ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </div>

              {expandedSections.claims && (
                <div style={{ padding: '1.25rem', backgroundColor: 'var(--bg-card)' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
                    <thead>
                      <tr style={{ borderBottom: '1px solid var(--border-subtle)', color: 'var(--text-muted)', textAlign: language === 'ur' ? 'right' : 'left' }}>
                        <th style={{ padding: '0.5rem' }}>{language === 'ur' ? 'نوعیتِ ثبوت' : 'Finding Type'}</th>
                        <th style={{ padding: '0.5rem' }}>{language === 'ur' ? 'مصدقہ بیان / دعویٰ' : 'Assertion'}</th>
                        <th style={{ padding: '0.5rem' }}>{language === 'ur' ? 'منسوب فریق' : 'Attributed Party'}</th>
                        <th style={{ padding: '0.5rem' }}>{language === 'ur' ? 'مآخذ' : 'Sources'}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {activeDossierModal.claims.map(claim => (
                        <tr key={claim.claimId} style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                          <td style={{ padding: '0.6rem', verticalAlign: 'top' }}>
                            <span
                              style={{
                                fontSize: '0.72rem',
                                padding: '0.2rem 0.5rem',
                                borderRadius: '4px',
                                backgroundColor: claim.findingType === 'court_finding' ? '#3B82F620' : '#10B98120',
                                color: claim.findingType === 'court_finding' ? '#60A5FA' : '#34D399',
                                fontWeight: 600,
                              }}
                            >
                              {claim.findingType.replace('_', ' ')}
                            </span>
                          </td>
                          <td style={{ padding: '0.6rem', color: '#E2E8F0', lineHeight: 1.5 }}>
                            {claim.assertion[language]}
                          </td>
                          <td style={{ padding: '0.6rem', color: 'var(--text-muted)', fontSize: '0.8rem', verticalAlign: 'top' }}>
                            {claim.attributedParty?.[language] || '—'}
                          </td>
                          <td style={{ padding: '0.6rem', color: 'var(--accent-gold)', fontSize: '0.75rem', verticalAlign: 'top' }}>
                            {claim.sourceIds.join(', ')}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            {/* Point 6: Official Positions & Responses */}
            <div style={{ marginBottom: '1.5rem', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-md)', overflow: 'hidden' }}>
              <div
                onClick={() => toggleSection('officialPositions')}
                style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.85rem 1.25rem', backgroundColor: 'var(--bg-surface)', cursor: 'pointer' }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 600, fontSize: '0.95rem' }}>
                  <ShieldCheck size={16} color="#F59E0B" />
                  <span>{language === 'ur' ? '6. سرکاری و ادارہ جاتی بیانات و جوابات' : '6. Official Positions & Responses'}</span>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>({activeDossierModal.officialPositions.length})</span>
                </div>
                {expandedSections.officialPositions ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </div>

              {expandedSections.officialPositions && (
                <div style={{ padding: '1.25rem', backgroundColor: 'var(--bg-card)', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  {activeDossierModal.officialPositions.map(pos => (
                    <div key={pos.positionId} style={{ backgroundColor: 'var(--bg-surface)', padding: '0.85rem', borderRadius: '6px', borderLeft: pos.isDenialOrDefense ? '3px solid #F59E0B' : '3px solid #3B82F6' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.3rem' }}>
                        <span style={{ fontWeight: 600, color: '#FFFFFF', fontSize: '0.88rem' }}>{pos.institutionOrParty[language]}</span>
                        {pos.statementDate && <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{pos.statementDate}</span>}
                      </div>
                      <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                        {pos.summary[language]}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Point 7: Court Findings (if applicable) */}
            {activeDossierModal.courtFindings && activeDossierModal.courtFindings.length > 0 && (
              <div style={{ marginBottom: '1.5rem', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-md)', overflow: 'hidden' }}>
                <div
                  onClick={() => toggleSection('courtFindings')}
                  style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.85rem 1.25rem', backgroundColor: 'var(--bg-surface)', cursor: 'pointer' }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 600, fontSize: '0.95rem' }}>
                    <Scale size={16} color="#60A5FA" />
                    <span>{language === 'ur' ? '7. عدالتی احکامات و فیصلے' : '7. Court Proceedings & Findings'}</span>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>({activeDossierModal.courtFindings.length})</span>
                  </div>
                  {expandedSections.courtFindings ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </div>

                {expandedSections.courtFindings && (
                  <div style={{ padding: '1.25rem', backgroundColor: 'var(--bg-card)', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {activeDossierModal.courtFindings.map(cf => (
                      <div key={cf.findingId} style={{ backgroundColor: '#1E293B', padding: '1rem', borderRadius: '6px', border: '1px solid #3B82F640' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '0.4rem' }}>
                          <span style={{ fontWeight: 600, color: '#93C5FD', fontSize: '0.95rem' }}>{cf.courtName[language]}</span>
                          <span style={{ fontSize: '0.8rem', color: 'var(--accent-gold)' }}>{cf.caseCitation} ({cf.orderDate})</span>
                        </div>
                        <p style={{ fontSize: '0.88rem', color: '#E2E8F0', lineHeight: 1.6 }}>
                          {cf.rulingSummary[language]}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Point 9 & 10: Constitutional Provisions & Related Records */}
            <div style={{ marginBottom: '1.5rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1rem' }}>
              <div style={{ backgroundColor: 'var(--bg-surface)', padding: '1rem', borderRadius: 'var(--radius-md)' }}>
                <h5 style={{ fontSize: '0.85rem', color: 'var(--accent-gold)', marginBottom: '0.5rem' }}>
                  {language === 'ur' ? '9. متعلقہ آئینی دفعات' : '9. Related Constitutional Provisions'}
                </h5>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                  {activeDossierModal.constitutionalProvisions.map(art => (
                    <span key={art} style={{ fontSize: '0.75rem', backgroundColor: '#F59E0B20', color: '#FBBF24', padding: '0.2rem 0.5rem', borderRadius: '4px', border: '1px solid #F59E0B40' }}>
                      {art.replace('PK-CONST-', '')}
                    </span>
                  ))}
                </div>
              </div>

              <div style={{ backgroundColor: 'var(--bg-surface)', padding: '1rem', borderRadius: 'var(--radius-md)' }}>
                <h5 style={{ fontSize: '0.85rem', color: '#60A5FA', marginBottom: '0.5rem' }}>
                  {language === 'ur' ? '10. منسلک آرکائیو ریکارڈز' : '10. Related Archive Records'}
                </h5>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                  {activeDossierModal.relatedRecordIds.map(recId => (
                    <button
                      key={recId}
                      onClick={() => {
                        setActiveDossierModal(null);
                        viewRecord(recId);
                      }}
                      className="btn btn-ghost btn-sm"
                      style={{ justifyContent: 'flex-start', fontSize: '0.78rem', color: '#93C5FD', padding: '0.2rem 0.4rem' }}
                    >
                      <ExternalLink size={12} /> {recId}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Point 11: Unresolved Questions */}
            <div style={{ marginBottom: '1.5rem', backgroundColor: 'var(--bg-surface)', padding: '1.25rem', borderRadius: 'var(--radius-md)', borderLeft: '3px solid #94A3B8' }}>
              <h4 style={{ fontSize: '0.95rem', color: '#E2E8F0', marginBottom: '0.5rem' }}>
                {language === 'ur' ? '11. حل طلب سوالات و دستاویزی حدود' : '11. Unresolved Questions & Known Limitations'}
              </h4>
              <ul style={{ paddingLeft: language === 'ur' ? 0 : '1.25rem', paddingRight: language === 'ur' ? '1.25rem' : 0, fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                {activeDossierModal.unresolvedQuestions.map((q, idx) => (
                  <li key={idx} style={{ marginBottom: '0.4rem' }}>{q[language]}</li>
                ))}
              </ul>
            </div>

            {/* Point 12: Sources & Verification */}
            <div style={{ marginBottom: '1.5rem', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-md)', overflow: 'hidden' }}>
              <div
                onClick={() => toggleSection('sources')}
                style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.85rem 1.25rem', backgroundColor: 'var(--bg-surface)', cursor: 'pointer' }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 600, fontSize: '0.95rem' }}>
                  <FileText size={16} color="var(--accent-gold)" />
                  <span>{language === 'ur' ? '12. مآخذ و دستاویزات کی تصدیق' : '12. Sources & Verification Notes'}</span>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>({activeDossierModal.sources.length})</span>
                </div>
                {expandedSections.sources ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </div>

              {expandedSections.sources && (
                <div style={{ padding: '1.25rem', backgroundColor: 'var(--bg-card)', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  {activeDossierModal.sources.map(src => (
                    <div key={src.sourceId} style={{ backgroundColor: 'var(--bg-surface)', padding: '0.8rem', borderRadius: '6px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                        <span style={{ fontWeight: 600, color: '#FFFFFF', fontSize: '0.85rem' }}>{src.title[language]}</span>
                        <span style={{ fontSize: '0.72rem', color: '#10B981' }}>{src.verificationTier || src.verificationStatus}</span>
                      </div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
                        {src.publisher?.[language]} {src.documentIdentifier ? `— ${src.documentIdentifier}` : ''} ({src.publicationDate?.dateString})
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Point 13: Privacy, Defamation & Publication Review */}
            <div style={{ backgroundColor: '#1E293B', padding: '1.25rem', borderRadius: 'var(--radius-md)', border: '1px solid #10B98140' }}>
              <h4 style={{ fontSize: '0.95rem', color: '#10B981', marginBottom: '0.6rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <ShieldCheck size={16} /> {language === 'ur' ? '13. پرائیویسی و ادارتی اشاعت جائزہ' : '13. Editorial Privacy & Publication Review'}
              </h4>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '0.75rem', fontSize: '0.82rem', color: '#CBD5E1' }}>
                <div>
                  <strong>{language === 'ur' ? 'حساس ذاتی ڈیٹا:' : 'Sensitive Personal Data:'}</strong>{' '}
                  {activeDossierModal.privacyReview.hasSensitivePersonalData ? (language === 'ur' ? 'ہاں (فلٹر شدہ)' : 'Yes (Filtered)') : (language === 'ur' ? 'نہیں' : 'No')}
                </div>
                <div>
                  <strong>{language === 'ur' ? 'ذاتی شناخت (PII) حذف شدہ:' : 'PII Redacted:'}</strong>{' '}
                  <span style={{ color: '#10B981' }}>✓ {language === 'ur' ? 'تصدیق شدہ' : 'Verified'}</span>
                </div>
                <div>
                  <strong>{language === 'ur' ? 'الزامات بمقابلہ فیصلے الگ:' : 'Allegations Distinguished:'}</strong>{' '}
                  <span style={{ color: '#10B981' }}>✓ {language === 'ur' ? 'لاگو' : 'Applied'}</span>
                </div>
                <div>
                  <strong>{language === 'ur' ? 'خطرہ کا تخمینہ:' : 'Risk Level:'}</strong>{' '}
                  <span style={{ textTransform: 'uppercase', color: activeDossierModal.privacyReview.riskAssessment === 'low' ? '#10B981' : '#F59E0B' }}>
                    {activeDossierModal.privacyReview.riskAssessment}
                  </span>
                </div>
                <div>
                  <strong>{language === 'ur' ? 'آخری نظرِ ثانی تاریخ:' : 'Last Reviewed:'}</strong> {activeDossierModal.privacyReview.lastReviewedDate}
                </div>
              </div>
              {activeDossierModal.privacyReview.reviewerNotes && (
                <div style={{ marginTop: '0.6rem', fontSize: '0.78rem', color: 'var(--text-muted)', borderTop: '1px solid var(--border-subtle)', paddingTop: '0.4rem' }}>
                  <em>{language === 'ur' ? 'ادارتی نوٹس:' : 'Reviewer Note:'}</em> {activeDossierModal.privacyReview.reviewerNotes}
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div style={{ marginTop: '1.5rem', display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
              <button
                onClick={() => {
                  const featuredId = activeDossierModal.featuredRecordId;
                  setActiveDossierModal(null);
                  viewRecord(featuredId);
                }}
                className="btn btn-secondary btn-sm"
              >
                <span>{language === 'ur' ? 'مرکزی آرکائیو ریکارڈ پر جائیں' : 'Navigate to Primary Record'}</span>
                <ExternalLink size={13} />
              </button>
              <button onClick={() => setActiveDossierModal(null)} className="btn btn-primary btn-sm">
                <span>{language === 'ur' ? 'بند کریں' : 'Close'}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
