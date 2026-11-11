/**
 * INSAF ARCHIVE (انصاف آرکائیو)
 * Master Navigation Bar
 */

import React, { useState } from 'react';
import { useArchive } from '../../context/ArchiveContext';
import type { AppView } from '../../context/ArchiveContext';
import {
  Scale,
  Search,
  BookOpen,
  History,
  FolderLock,
  Globe,
  FileSpreadsheet,
  Menu,
  X,
  FileCheck2,
  Landmark,
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const {
    language,
    toggleLanguage,
    currentView,
    navigateTo,
    setIsQuickSearchOpen,
  } = useArchive();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems: Array<{ id: AppView; label: { en: string; ur: string }; icon: React.ReactNode }> = [
    {
      id: 'constitution',
      label: { en: 'Constitution of Pakistan', ur: 'آئینِ پاکستان' },
      icon: <Landmark size={16} />,
    },
    {
      id: 'archive',
      label: { en: 'Archive Explorer', ur: 'آرکائیو تلاش' },
      icon: <BookOpen size={16} />,
    },
    {
      id: 'dossiers',
      label: { en: 'Thematic Dossiers', ur: 'تحقیقاتی فائلیں' },
      icon: <FolderLock size={16} />,
    },
    {
      id: 'timeline',
      label: { en: 'Master Timeline', ur: 'قومی ٹائم لائن' },
      icon: <History size={16} />,
    },
    {
      id: 'standards',
      label: { en: 'Editorial Standards', ur: 'ادارتی اصول و تصحیح' },
      icon: <FileCheck2 size={16} />,
    },
  ];

  const handleNavClick = (view: AppView) => {
    navigateTo(view);
    setMobileMenuOpen(false);
  };

  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 1000,
        backgroundColor: 'var(--bg-surface-glass)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        borderBottom: '1px solid var(--border-subtle)',
      }}
    >
      <div className="content-wrap" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '72px' }}>
        {/* Brand Logo */}
        <div
          onClick={() => handleNavClick('home')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.85rem',
            cursor: 'pointer',
            userSelect: 'none',
          }}
        >
          <div
            style={{
              width: '42px',
              height: '42px',
              borderRadius: 'var(--radius-md)',
              background: 'linear-gradient(135deg, #1A365D 0%, #0B192C 100%)',
              border: '1px solid var(--accent-gold)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: 'var(--shadow-gold)',
            }}
          >
            <Scale size={24} color="var(--accent-gold)" />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem' }}>
              <span style={{ fontSize: '1.2rem', fontWeight: 800, letterSpacing: '-0.03em', color: '#FFFFFF' }}>
                INSAF ARCHIVE
              </span>
              <span style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--accent-gold)', fontFamily: 'var(--font-ur-display)' }}>
                انصاف آرکائیو
              </span>
            </div>
            <p style={{ fontSize: '0.72rem', color: 'var(--text-muted)', letterSpacing: '0.04em', textTransform: 'uppercase' }}>
              {language === 'ur' ? 'قومی دستاویزی و تاریخی ریکارڈ' : 'Universal Evidence & Historical Record'}
            </p>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }} className="desktop-nav">
          {navItems.map(item => {
            const isActive = currentView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className="btn btn-ghost btn-sm"
                style={{
                  color: isActive ? 'var(--accent-gold-bright)' : 'var(--text-secondary)',
                  backgroundColor: isActive ? 'var(--accent-gold-subtle)' : 'transparent',
                  borderBottom: isActive ? '2px solid var(--accent-gold)' : '2px solid transparent',
                  borderRadius: 'var(--radius-sm) var(--radius-sm) 0 0',
                }}
              >
                {item.icon}
                <span>{item.label[language]}</span>
              </button>
            );
          })}
        </nav>

        {/* Action Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          {/* Quick Search Button */}
          <button
            onClick={() => setIsQuickSearchOpen(true)}
            className="btn btn-secondary btn-sm"
            style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
            title="Search Archive (Ctrl+K)"
          >
            <Search size={14} color="var(--accent-gold)" />
            <span className="search-btn-text">{language === 'ur' ? 'تلاش' : 'Search'}</span>
            <kbd
              style={{
                fontSize: '0.68rem',
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                padding: '0.1rem 0.35rem',
                borderRadius: '3px',
                color: 'var(--text-muted)',
              }}
            >
              Ctrl+K
            </kbd>
          </button>

          {/* Bilingual Language Switcher */}
          <button
            onClick={toggleLanguage}
            className="btn btn-secondary btn-sm"
            style={{
              borderColor: 'var(--accent-gold-dark)',
              color: 'var(--accent-gold-bright)',
              fontWeight: 700,
            }}
            title={language === 'en' ? 'اردو زبان میں دیکھیں' : 'Switch to English'}
          >
            <Globe size={14} />
            <span>{language === 'en' ? 'اردو' : 'English'}</span>
          </button>

          {/* Editorial Workspace Button */}
          <button
            onClick={() => handleNavClick('admin')}
            className={`btn btn-sm ${currentView === 'admin' ? 'btn-primary' : 'btn-secondary'}`}
            style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}
          >
            <FileSpreadsheet size={14} />
            <span className="admin-btn-text">
              {language === 'ur' ? 'ادارتی ڈیش بورڈ' : 'Editorial Workspace'}
            </span>
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(prev => !prev)}
            className="btn btn-ghost btn-sm mobile-menu-btn"
            style={{ display: 'none' }}
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div
          style={{
            backgroundColor: 'var(--bg-surface-elevated)',
            borderBottom: '1px solid var(--border-medium)',
            padding: '1rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.5rem',
          }}
        >
          {navItems.map(item => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className="btn btn-ghost"
              style={{
                justifyContent: 'flex-start',
                width: '100%',
                color: currentView === item.id ? 'var(--accent-gold)' : 'var(--text-primary)',
              }}
            >
              {item.icon}
              <span>{item.label[language]}</span>
            </button>
          ))}
        </div>
      )}

      <style>{`
        @media (max-width: 900px) {
          .desktop-nav {
            display: none !important;
          }
          .mobile-menu-btn {
            display: inline-flex !important;
          }
          .search-btn-text, .admin-btn-text {
            display: none;
          }
        }
      `}</style>
    </header>
  );
};
