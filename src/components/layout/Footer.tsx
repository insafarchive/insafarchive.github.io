/**
 * INSAF ARCHIVE (انصاف آرکائیو)
 * Master Footer & Colophon
 */

import React from 'react';
import { useArchive } from '../../context/ArchiveContext';
import { Scale, ShieldCheck, HeartHandshake, FileText } from 'lucide-react';
import { DOMAIN_REGISTRY } from '../../data/taxonomy';
import type { ArchiveDomain } from '../../types/archive';

export const Footer: React.FC = () => {
  const { language, navigateTo } = useArchive();

  const domainList = Object.keys(DOMAIN_REGISTRY) as ArchiveDomain[];

  return (
    <footer
      style={{
        backgroundColor: '#050A14',
        borderTop: '1px solid var(--border-subtle)',
        marginTop: '5rem',
        padding: '4rem 0 2.5rem 0',
        color: 'var(--text-muted)',
      }}
    >
      <div className="content-wrap">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '2.5rem',
            marginBottom: '3.5rem',
          }}
        >
          {/* Col 1: Platform Charter & Mission */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1rem' }}>
              <Scale size={24} color="var(--accent-gold)" />
              <h3 style={{ fontSize: '1.15rem', color: '#FFFFFF' }}>
                INSAF ARCHIVE <span style={{ color: 'var(--accent-gold)' }}>| انصاف آرکائیو</span>
              </h3>
            </div>
            <p style={{ fontSize: '0.86rem', lineHeight: 1.6, marginBottom: '1rem', color: 'var(--text-secondary)' }}>
              {language === 'ur'
                ? 'پاکستان کا آزاد، غیر جانبدار اور سورس ڈریون دستاویزی ریکارڈ۔ عدالتی فیصلوں، آئینی تاریخ، صحافتی تحقیقات اور توانائی و معاشی پالیسیوں کا جامع آرکائیو۔'
                : 'A structured, source-driven, bilingual Pakistani archive documenting legal, constitutional, political, human rights, media freedom, and economic records.'}
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8rem', color: 'var(--accent-gold-light)' }}>
              <ShieldCheck size={16} />
              <span>{language === 'ur' ? 'غیر جانبداری اور دستاویزی ثبوت کا پابند' : 'Committed to Primary Documentation & Non-Fabrication'}</span>
            </div>
          </div>

          {/* Col 2: Archive Domains */}
          <div>
            <h4 style={{ fontSize: '0.95rem', color: '#FFFFFF', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              {language === 'ur' ? 'آرکائیو کے شعبہ جات' : 'Archival Domains'}
            </h4>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '0.45rem' }}>
              {domainList.slice(0, 5).map(domain => {
                const info = DOMAIN_REGISTRY[domain];
                return (
                  <a
                    key={domain}
                    onClick={() => navigateTo('archive', { domain })}
                    style={{
                      fontSize: '0.85rem',
                      color: 'var(--text-muted)',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.3rem',
                    }}
                  >
                    <span>{info.label[language]}</span>
                  </a>
                );
              })}
            </div>
          </div>

          {/* Col 3: Thematic Dossiers */}
          <div>
            <h4 style={{ fontSize: '0.95rem', color: '#FFFFFF', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              {language === 'ur' ? 'اہم دستاویزی فائلیں' : 'Featured Dossiers'}
            </h4>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '0.45rem' }}>
              <a
                onClick={() => navigateTo('dossiers')}
                style={{ fontSize: '0.85rem', color: 'var(--text-muted)', cursor: 'pointer' }}
              >
                {language === 'ur' ? 'ارشد شریف دستاویزی تحقیقات' : 'Arshad Sharif Kenya Dossier'}
              </a>
              <a
                onClick={() => navigateTo('dossiers')}
                style={{ fontSize: '0.85rem', color: 'var(--text-muted)', cursor: 'pointer' }}
              >
                {language === 'ur' ? 'آئی پی پی معاہدات و گردشی قرضہ' : 'IPP Power Contracts & Circular Debt'}
              </a>
              <a
                onClick={() => navigateTo('dossiers')}
                style={{ fontSize: '0.85rem', color: 'var(--text-muted)', cursor: 'pointer' }}
              >
                {language === 'ur' ? 'آئینی ترامیم و عدالتی نظائر' : 'Constitutional Crises & Landmark Rulings'}
              </a>
              <a
                onClick={() => navigateTo('dossiers')}
                style={{ fontSize: '0.85rem', color: 'var(--text-muted)', cursor: 'pointer' }}
              >
                {language === 'ur' ? 'سقوطِ مشرقی پاکستان و حمود الرحمٰن کمیشن' : '1971 Hamoodur Rahman Commission'}
              </a>
            </div>
          </div>

          {/* Col 4: Editorial Standards & Integrity */}
          <div>
            <h4 style={{ fontSize: '0.95rem', color: '#FFFFFF', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              {language === 'ur' ? 'ادارتی شفافیت و رابطہ' : 'Editorial Governance'}
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              <button
                onClick={() => navigateTo('standards')}
                className="btn btn-secondary btn-sm"
                style={{ justifyContent: 'flex-start', gap: '0.5rem' }}
              >
                <FileText size={14} />
                <span>{language === 'ur' ? 'ادارتی ضابطہ اخلاق' : 'Editorial Principles'}</span>
              </button>
              <button
                onClick={() => navigateTo('standards')}
                className="btn btn-ghost btn-sm"
                style={{ justifyContent: 'flex-start', gap: '0.5rem', color: 'var(--accent-gold)' }}
              >
                <HeartHandshake size={14} />
                <span>{language === 'ur' ? 'تصحیح / اضافے کی درخواست' : 'Request a Correction'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Strip */}
        <div
          style={{
            borderTop: '1px solid rgba(255, 255, 255, 0.08)',
            paddingTop: '1.5rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '1rem',
            fontSize: '0.8rem',
          }}
        >
          <p>
            © 2026 INSAF ARCHIVE Foundation (انصاف آرکائیو). Open public documentary resource.
          </p>
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <span>Static Zero-Backend Architecture</span>
            <span>•</span>
            <span>Bilingual (EN / اردو)</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
