/**
 * INSAF ARCHIVE (انصاف آرکائیو)
 * Master Archival Context & State Management
 */

import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import type { ArchiveRecord, ArchiveSearchFilter, ArchiveDomain, RecordType } from '../types/archive';
import { ALL_ARCHIVE_RECORDS } from '../data/records';
import { filterPublicRecords, sanitizeRecordForPublicExport } from '../utils/privacyFilter';
import { buildGraphIndex } from '../utils/graphUtils';
import type { ArchiveGraphIndex } from '../utils/graphUtils';

export type AppView = 'home' | 'archive' | 'dossiers' | 'timeline' | 'record' | 'admin' | 'standards' | 'constitution';

interface ArchiveContextType {
  records: ArchiveRecord[];
  allRecordsIncludingDrafts: ArchiveRecord[];
  graphIndex: ArchiveGraphIndex;
  language: 'en' | 'ur';
  setLanguage: (lang: 'en' | 'ur') => void;
  toggleLanguage: () => void;
  currentView: AppView;
  setCurrentView: (view: AppView) => void;
  activeRecordId: string | null;
  setActiveRecordId: (id: string | null) => void;
  activeArticleId: string | null;
  setActiveArticleId: (id: string | null) => void;
  searchFilter: ArchiveSearchFilter;
  setSearchFilter: React.Dispatch<React.SetStateAction<ArchiveSearchFilter>>;
  resetFilters: () => void;
  viewRecord: (id: string) => void;
  viewArticle: (id: string) => void;
  navigateTo: (view: AppView, params?: { domain?: ArchiveDomain; recordType?: RecordType; query?: string }) => void;
  saveUserRecord: (record: ArchiveRecord) => void;
  deleteUserRecord: (id: string) => void;
  exportDatabaseJson: (onlyPublic?: boolean) => string;
  isQuickSearchOpen: boolean;
  setIsQuickSearchOpen: (open: boolean) => void;
}

const LOCAL_STORAGE_CUSTOM_RECORDS = 'insaf_archive_custom_records_v1';
const LOCAL_STORAGE_LANG = 'insaf_archive_lang_pref';

const initialFilter: ArchiveSearchFilter = {
  query: '',
  domain: 'all',
  recordType: 'all',
  findingType: 'all',
  verificationStatus: 'all',
  yearFrom: undefined,
  yearTo: undefined,
  location: '',
  tag: '',
};

const ArchiveContext = createContext<ArchiveContextType | undefined>(undefined);

export const ArchiveProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<'en' | 'ur'>(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_LANG);
    return saved === 'ur' ? 'ur' : 'en';
  });

  const [currentView, setCurrentView] = useState<AppView>('home');
  const [activeRecordId, setActiveRecordId] = useState<string | null>(null);
  const [activeArticleId, setActiveArticleId] = useState<string | null>(null);
  const [searchFilter, setSearchFilter] = useState<ArchiveSearchFilter>(initialFilter);
  const [isQuickSearchOpen, setIsQuickSearchOpen] = useState<boolean>(false);

  // Load custom user records from local storage
  const [customRecords, setCustomRecords] = useState<ArchiveRecord[]>(() => {
    try {
      const stored = localStorage.getItem(LOCAL_STORAGE_CUSTOM_RECORDS);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  // Keep document direction in sync with language
  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = language === 'ur' ? 'rtl' : 'ltr';
    localStorage.setItem(LOCAL_STORAGE_LANG, language);
  }, [language]);

  // Global keyboard shortcut: Ctrl+K or Cmd+K opens Quick Search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsQuickSearchOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const setLanguage = (lang: 'en' | 'ur') => {
    setLanguageState(lang);
  };

  const toggleLanguage = () => {
    setLanguageState(prev => (prev === 'en' ? 'ur' : 'en'));
  };

  const resetFilters = () => {
    setSearchFilter(initialFilter);
  };

  const viewRecord = (id: string) => {
    setActiveRecordId(id);
    setCurrentView('record');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const viewArticle = (id: string) => {
    setActiveArticleId(id);
    setCurrentView('constitution');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateTo = (view: AppView, params?: { domain?: ArchiveDomain; recordType?: RecordType; query?: string }) => {
    if (params) {
      setSearchFilter(prev => ({
        ...prev,
        domain: params.domain || 'all',
        recordType: params.recordType || 'all',
        query: params.query || '',
      }));
    }
    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const saveUserRecord = (record: ArchiveRecord) => {
    setCustomRecords(prev => {
      const filtered = prev.filter(r => r.id !== record.id);
      const updated = [record, ...filtered];
      localStorage.setItem(LOCAL_STORAGE_CUSTOM_RECORDS, JSON.stringify(updated));
      return updated;
    });
  };

  const deleteUserRecord = (id: string) => {
    setCustomRecords(prev => {
      const updated = prev.filter(r => r.id !== id);
      localStorage.setItem(LOCAL_STORAGE_CUSTOM_RECORDS, JSON.stringify(updated));
      return updated;
    });
  };

  // Authoritative publication filter & graph index
  const allRecordsIncludingDrafts = useMemo(() => {
    return [...customRecords, ...ALL_ARCHIVE_RECORDS];
  }, [customRecords]);

  const publishedRecords = useMemo(() => {
    return filterPublicRecords(allRecordsIncludingDrafts);
  }, [allRecordsIncludingDrafts]);

  const graphIndex = useMemo(() => {
    return buildGraphIndex(publishedRecords);
  }, [publishedRecords]);

  const exportDatabaseJson = (onlyPublic = true) => {
    if (onlyPublic) {
      const sanitized = publishedRecords.map(sanitizeRecordForPublicExport);
      return JSON.stringify(sanitized, null, 2);
    }
    return JSON.stringify(allRecordsIncludingDrafts, null, 2);
  };

  return (
    <ArchiveContext.Provider
      value={{
        records: publishedRecords,
        allRecordsIncludingDrafts,
        graphIndex,
        language,
        setLanguage,
        toggleLanguage,
        currentView,
        setCurrentView,
        activeRecordId,
        setActiveRecordId,
        activeArticleId,
        setActiveArticleId,
        searchFilter,
        setSearchFilter,
        resetFilters,
        viewRecord,
        viewArticle,
        navigateTo,
        saveUserRecord,
        deleteUserRecord,
        exportDatabaseJson,
        isQuickSearchOpen,
        setIsQuickSearchOpen,
      }}
    >
      {children}
    </ArchiveContext.Provider>
  );
};

export const useArchive = () => {
  const context = useContext(ArchiveContext);
  if (!context) {
    throw new Error('useArchive must be used within an ArchiveProvider');
  }
  return context;
};
