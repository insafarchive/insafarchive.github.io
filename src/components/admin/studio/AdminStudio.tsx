/**
 * INSAF ARCHIVE (انصاف آرکائیو)
 * Master Admin Editorial Studio Shell
 * Integrates Dossier, Claim, Source, Media Editors, Local Review Queue, & GitHub PR/Issue Hand-off
 */

import React, { useState, useEffect } from 'react';
import type {
  StudioTab,
  StudioDraftBundle,
  StudioDossierDraft,
  StudioClaimDraft,
  StudioSourceDraft,
  StudioMediaDraft,
  StudioReviewQueueItem,
} from '../../../types/adminStudio';
import {
  loadStudioBundle,
  saveStudioBundle,
  createEmptyBundle,
  validateDossierDraft,
  validateClaimDraft,
  validateSourceDraft,
  validateMediaDraft,
  getCanonicalIdSets,
} from '../../../utils/adminStudioStorage';
import { DossierEditor } from './DossierEditor';
import { ClaimEditor } from './ClaimEditor';
import { SourceEditor } from './SourceEditor';
import { MediaEditor } from './MediaEditor';
import { ReviewQueueView } from './ReviewQueueView';
import { ExportGitHubView } from './ExportGitHubView';
import {
  FolderOpen,
  FileCheck,
  BookOpen,
  Film,
  Layers,
  Send,
  HardDrive,
} from 'lucide-react';

interface AdminStudioProps {
  language: 'en' | 'ur';
}

export const AdminStudio: React.FC<AdminStudioProps> = ({ language }) => {
  const [activeTab, setActiveTab] = useState<StudioTab>('dossiers');
  const [bundle, setBundle] = useState<StudioDraftBundle>(() => loadStudioBundle());
  const [selectedDossierId, setSelectedDossierId] = useState<string | undefined>(undefined);
  const [selectedClaimId, setSelectedClaimId] = useState<string | undefined>(undefined);
  const [selectedSourceId, setSelectedSourceId] = useState<string | undefined>(undefined);
  const [selectedMediaId, setSelectedMediaId] = useState<string | undefined>(undefined);

  // Save to LocalStorage whenever bundle changes
  useEffect(() => {
    saveStudioBundle(bundle);
  }, [bundle]);

  const handleSaveDossier = (draft: StudioDossierDraft, reason: string) => {
    setBundle(prev => {
      const canonicalIds = getCanonicalIdSets();
      const validation = validateDossierDraft(draft, canonicalIds.dossierIds, canonicalIds.slugs);

      // Check if updating existing draft or creating new
      const existingIdx = prev.dossiers.findIndex(d => d.id === draft.id);
      const updatedDossiers = existingIdx >= 0
        ? prev.dossiers.map((d, i) => (i === existingIdx ? draft : d))
        : [...prev.dossiers, draft];

      // Update or add queue item
      const queueId = `queue-dos-${draft.id}`;
      const queueItem: StudioReviewQueueItem = {
        queueId,
        recordType: 'dossier',
        recordId: draft.id,
        changeType: draft.isNewRecord ? 'create' : 'update',
        titleEn: draft.title.en,
        titleUr: draft.title.ur,
        fieldsChanged: ['title', 'overview', 'domain', 'legalProceedingStatus', 'privacyReview'],
        reasonForChange: reason,
        localReviewStatus: validation.isValid ? 'validation_passed' : 'validation_failed',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        validationErrors: validation.errors,
      };

      const existingQIdx = prev.queue.findIndex(q => q.queueId === queueId);
      const updatedQueue = existingQIdx >= 0
        ? prev.queue.map((q, i) => (i === existingQIdx ? queueItem : q))
        : [...prev.queue, queueItem];

      return {
        ...prev,
        dossiers: updatedDossiers,
        queue: updatedQueue,
      };
    });
  };

  const handleSaveClaim = (draft: StudioClaimDraft, reason: string) => {
    setBundle(prev => {
      const canonicalIds = getCanonicalIdSets();
      const validDossierIds = new Set([
        ...canonicalIds.dossierIds,
        ...prev.dossiers.map(d => d.id),
      ]);
      const validSourceIds = new Set([
        ...canonicalIds.sourceIds,
        ...prev.sources.map(s => s.sourceId),
      ]);
      const validation = validateClaimDraft(draft, validDossierIds, validSourceIds, canonicalIds.claimIds);

      const existingIdx = prev.claims.findIndex(c => c.claimId === draft.claimId);
      const updatedClaims = existingIdx >= 0
        ? prev.claims.map((c, i) => (i === existingIdx ? draft : c))
        : [...prev.claims, draft];

      const queueId = `queue-clm-${draft.claimId}`;
      const queueItem: StudioReviewQueueItem = {
        queueId,
        recordType: 'claim',
        recordId: draft.claimId,
        changeType: draft.isNewRecord ? 'create' : 'update',
        titleEn: draft.statement.en,
        titleUr: draft.statement.ur,
        fieldsChanged: ['statement', 'claimClassification', 'verificationStatus', 'supportingSourceIds'],
        reasonForChange: reason,
        supportingSourceIds: draft.supportingSourceIds,
        localReviewStatus: validation.isValid ? 'validation_passed' : 'validation_failed',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        validationErrors: validation.errors,
      };

      const existingQIdx = prev.queue.findIndex(q => q.queueId === queueId);
      const updatedQueue = existingQIdx >= 0
        ? prev.queue.map((q, i) => (i === existingQIdx ? queueItem : q))
        : [...prev.queue, queueItem];

      return {
        ...prev,
        claims: updatedClaims,
        queue: updatedQueue,
      };
    });
  };

  const handleSaveSource = (draft: StudioSourceDraft, reason: string) => {
    setBundle(prev => {
      const canonicalIds = getCanonicalIdSets();
      const validation = validateSourceDraft(draft, canonicalIds.sourceIds);

      const existingIdx = prev.sources.findIndex(s => s.sourceId === draft.sourceId);
      const updatedSources = existingIdx >= 0
        ? prev.sources.map((s, i) => (i === existingIdx ? draft : s))
        : [...prev.sources, draft];

      const queueId = `queue-src-${draft.sourceId}`;
      const queueItem: StudioReviewQueueItem = {
        queueId,
        recordType: 'source',
        recordId: draft.sourceId,
        changeType: draft.isNewRecord ? 'create' : 'update',
        titleEn: draft.title.en,
        titleUr: draft.title.ur || draft.title.en,
        fieldsChanged: ['title', 'publisherOrIssuingAuthority', 'officialUrl', 'authenticityStatus'],
        reasonForChange: reason,
        localReviewStatus: validation.isValid ? 'validation_passed' : 'validation_failed',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        validationErrors: validation.errors,
      };

      const existingQIdx = prev.queue.findIndex(q => q.queueId === queueId);
      const updatedQueue = existingQIdx >= 0
        ? prev.queue.map((q, i) => (i === existingQIdx ? queueItem : q))
        : [...prev.queue, queueItem];

      return {
        ...prev,
        sources: updatedSources,
        queue: updatedQueue,
      };
    });
  };

  const handleSaveMedia = (draft: StudioMediaDraft, reason: string) => {
    setBundle(prev => {
      const canonicalIds = getCanonicalIdSets();
      const validDossierIds = new Set([
        ...canonicalIds.dossierIds,
        ...prev.dossiers.map(d => d.id),
      ]);
      const validation = validateMediaDraft(draft, validDossierIds);

      const existingIdx = prev.media.findIndex(m => m.mediaId === draft.mediaId);
      const updatedMedia = existingIdx >= 0
        ? prev.media.map((m, i) => (i === existingIdx ? draft : m))
        : [...prev.media, draft];

      const queueId = `queue-med-${draft.mediaId}`;
      const queueItem: StudioReviewQueueItem = {
        queueId,
        recordType: 'media',
        recordId: draft.mediaId,
        changeType: draft.isNewRecord ? 'create' : 'update',
        titleEn: draft.title.en,
        titleUr: draft.title.ur || draft.title.en,
        fieldsChanged: ['title', 'documentCategory', 'associatedDossierId', 'originalUrl'],
        reasonForChange: reason,
        localReviewStatus: validation.isValid ? 'validation_passed' : 'validation_failed',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        validationErrors: validation.errors,
      };

      const existingQIdx = prev.queue.findIndex(q => q.queueId === queueId);
      const updatedQueue = existingQIdx >= 0
        ? prev.queue.map((q, i) => (i === existingQIdx ? queueItem : q))
        : [...prev.queue, queueItem];

      return {
        ...prev,
        media: updatedMedia,
        queue: updatedQueue,
      };
    });
  };

  const handleSelectEdit = (recordType: 'dossier' | 'claim' | 'source' | 'media', recordId: string) => {
    if (recordType === 'dossier') {
      setSelectedDossierId(recordId);
      setActiveTab('dossiers');
    } else if (recordType === 'claim') {
      setSelectedClaimId(recordId);
      setActiveTab('claims');
    } else if (recordType === 'source') {
      setSelectedSourceId(recordId);
      setActiveTab('sources');
    } else if (recordType === 'media') {
      setSelectedMediaId(recordId);
      setActiveTab('media');
    }
  };

  const handleRemoveQueueItem = (queueId: string) => {
    setBundle(prev => ({
      ...prev,
      queue: prev.queue.filter(q => q.queueId !== queueId),
    }));
  };

  const handleClearQueue = () => {
    setBundle(createEmptyBundle());
  };

  const handleImportBundle = (importedData: any, type: string) => {
    if (type === 'bundle' && importedData.payloadData) {
      setBundle(prev => {
        const mergeRecords = <T,>(existing: T[], incoming: T[], getKey: (item: T) => string): T[] => {
          const map = new Map<string, T>();
          for (const item of existing) {
            const key = getKey(item);
            if (key) map.set(key, item);
          }
          for (const item of incoming) {
            const key = getKey(item);
            if (key) map.set(key, item);
          }
          return Array.from(map.values());
        };

        const mergedDossiers = mergeRecords(prev.dossiers, importedData.payloadData.dossiers || [], d => d.id);
        const mergedClaims = mergeRecords(prev.claims, importedData.payloadData.claims || [], c => c.claimId);
        const mergedSources = mergeRecords(prev.sources, importedData.payloadData.sources || [], s => s.sourceId);
        const mergedMedia = mergeRecords(prev.media, importedData.payloadData.media || [], m => m.mediaId);
        const mergedQueue = mergeRecords(prev.queue, importedData.changes || [], q => q.queueId);

        return {
          ...prev,
          dossiers: mergedDossiers,
          claims: mergedClaims,
          sources: mergedSources,
          media: mergedMedia,
          queue: mergedQueue,
        };
      });
    } else if (type === 'dossier') {
      handleSaveDossier(importedData, 'Imported single dossier JSON');
    } else if (type === 'claim') {
      handleSaveClaim(importedData, 'Imported single claim JSON');
    } else if (type === 'source') {
      handleSaveSource(importedData, 'Imported single source JSON');
    } else if (type === 'media') {
      handleSaveMedia(importedData, 'Imported single media JSON');
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      {/* Studio Header & LocalStorage Indicator */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem',
          borderBottom: '1px solid var(--border-subtle)',
          paddingBottom: '1rem',
        }}
      >
        <div>
          <h2 style={{ fontSize: '1.4rem', color: '#FFFFFF', margin: 0 }}>
            {language === 'ur' ? 'ایڈمن ایڈیٹوریل اسٹوڈیو' : 'Admin Editorial Studio'}
          </h2>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', margin: '0.2rem 0 0' }}>
            {language === 'ur'
              ? 'فائلز، دعوے، شواہد و دستاویزات کا باضابطہ اندراج اور گٹ ہب پر مبنی اشاعتی ورک فلو'
              : 'Structured Data Entry, Primary Source Verification & GitHub PR Approval Hand-off'}
          </p>
        </div>

        {/* Local Storage Honest Indicator */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.45rem 0.85rem',
            borderRadius: 'var(--radius-md)',
            backgroundColor: 'rgba(245, 158, 11, 0.1)',
            border: '1px solid rgba(245, 158, 11, 0.25)',
            fontSize: '0.78rem',
            color: '#F59E0B',
          }}
        >
          <HardDrive size={15} />
          <span>
            <strong>Local Draft Mode:</strong> Saved in Browser LocalStorage (No central server auth)
          </span>
        </div>
      </div>

      {/* Navigation Tabs Bar */}
      <div
        style={{
          display: 'flex',
          gap: '0.5rem',
          borderBottom: '1px solid var(--border-subtle)',
          overflowX: 'auto',
          paddingBottom: '0.25rem',
        }}
      >
        <button
          onClick={() => setActiveTab('dossiers')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.45rem',
            padding: '0.65rem 1rem',
            background: 'none',
            border: 'none',
            borderBottom: activeTab === 'dossiers' ? '2px solid var(--accent-gold)' : '2px solid transparent',
            color: activeTab === 'dossiers' ? 'var(--accent-gold)' : '#94A3B8',
            fontWeight: activeTab === 'dossiers' ? 600 : 400,
            cursor: 'pointer',
            fontSize: '0.86rem',
            whiteSpace: 'nowrap',
          }}
        >
          <FolderOpen size={16} />
          <span>{language === 'ur' ? 'فائلز ایڈیٹر' : 'Dossiers'}</span>
          {bundle.dossiers.length > 0 && (
            <span style={{ fontSize: '0.7rem', padding: '0.1rem 0.4rem', borderRadius: '10px', backgroundColor: 'rgba(245, 158, 11, 0.2)', color: '#F59E0B' }}>
              {bundle.dossiers.length}
            </span>
          )}
        </button>

        <button
          onClick={() => setActiveTab('claims')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.45rem',
            padding: '0.65rem 1rem',
            background: 'none',
            border: 'none',
            borderBottom: activeTab === 'claims' ? '2px solid var(--accent-gold)' : '2px solid transparent',
            color: activeTab === 'claims' ? 'var(--accent-gold)' : '#94A3B8',
            fontWeight: activeTab === 'claims' ? 600 : 400,
            cursor: 'pointer',
            fontSize: '0.86rem',
            whiteSpace: 'nowrap',
          }}
        >
          <FileCheck size={16} />
          <span>{language === 'ur' ? 'دعوے ایڈیٹر' : 'Claims'}</span>
          {bundle.claims.length > 0 && (
            <span style={{ fontSize: '0.7rem', padding: '0.1rem 0.4rem', borderRadius: '10px', backgroundColor: 'rgba(56, 189, 248, 0.2)', color: '#38BDF8' }}>
              {bundle.claims.length}
            </span>
          )}
        </button>

        <button
          onClick={() => setActiveTab('sources')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.45rem',
            padding: '0.65rem 1rem',
            background: 'none',
            border: 'none',
            borderBottom: activeTab === 'sources' ? '2px solid var(--accent-gold)' : '2px solid transparent',
            color: activeTab === 'sources' ? 'var(--accent-gold)' : '#94A3B8',
            fontWeight: activeTab === 'sources' ? 600 : 400,
            cursor: 'pointer',
            fontSize: '0.86rem',
            whiteSpace: 'nowrap',
          }}
        >
          <BookOpen size={16} />
          <span>{language === 'ur' ? 'ماخذ و دستاویزات' : 'Sources'}</span>
          {bundle.sources.length > 0 && (
            <span style={{ fontSize: '0.7rem', padding: '0.1rem 0.4rem', borderRadius: '10px', backgroundColor: 'rgba(16, 185, 129, 0.2)', color: '#10B981' }}>
              {bundle.sources.length}
            </span>
          )}
        </button>

        <button
          onClick={() => setActiveTab('media')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.45rem',
            padding: '0.65rem 1rem',
            background: 'none',
            border: 'none',
            borderBottom: activeTab === 'media' ? '2px solid var(--accent-gold)' : '2px solid transparent',
            color: activeTab === 'media' ? 'var(--accent-gold)' : '#94A3B8',
            fontWeight: activeTab === 'media' ? 600 : 400,
            cursor: 'pointer',
            fontSize: '0.86rem',
            whiteSpace: 'nowrap',
          }}
        >
          <Film size={16} />
          <span>{language === 'ur' ? 'میڈیا و آرڈرز' : 'Media / Documents'}</span>
          {bundle.media.length > 0 && (
            <span style={{ fontSize: '0.7rem', padding: '0.1rem 0.4rem', borderRadius: '10px', backgroundColor: 'rgba(148, 163, 184, 0.2)', color: '#CBD5E1' }}>
              {bundle.media.length}
            </span>
          )}
        </button>

        <button
          onClick={() => setActiveTab('review_queue')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.45rem',
            padding: '0.65rem 1rem',
            background: 'none',
            border: 'none',
            borderBottom: activeTab === 'review_queue' ? '2px solid var(--accent-gold)' : '2px solid transparent',
            color: activeTab === 'review_queue' ? 'var(--accent-gold)' : '#94A3B8',
            fontWeight: activeTab === 'review_queue' ? 600 : 400,
            cursor: 'pointer',
            fontSize: '0.86rem',
            whiteSpace: 'nowrap',
          }}
        >
          <Layers size={16} />
          <span>{language === 'ur' ? 'ریویو کیو' : 'Review Queue'}</span>
          <span
            style={{
              fontSize: '0.7rem',
              padding: '0.1rem 0.45rem',
              borderRadius: '10px',
              backgroundColor: bundle.queue.length > 0 ? '#F59E0B' : 'rgba(148, 163, 184, 0.2)',
              color: bundle.queue.length > 0 ? '#0F172A' : '#CBD5E1',
              fontWeight: 700,
            }}
          >
            {bundle.queue.length}
          </span>
        </button>

        <button
          onClick={() => setActiveTab('export_github')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.45rem',
            padding: '0.65rem 1rem',
            background: 'none',
            border: 'none',
            borderBottom: activeTab === 'export_github' ? '2px solid var(--accent-gold)' : '2px solid transparent',
            color: activeTab === 'export_github' ? 'var(--accent-gold)' : '#94A3B8',
            fontWeight: activeTab === 'export_github' ? 600 : 400,
            cursor: 'pointer',
            fontSize: '0.86rem',
            whiteSpace: 'nowrap',
          }}
        >
          <Send size={16} />
          <span>{language === 'ur' ? 'ایکسپورٹ و گٹ ہب پی آر' : 'Export & GitHub PR'}</span>
        </button>
      </div>

      {/* Tab Panels */}
      <div>
        {activeTab === 'dossiers' && (
          <DossierEditor
            bundle={bundle}
            onSaveDossier={handleSaveDossier}
            language={language}
            selectedId={selectedDossierId}
          />
        )}
        {activeTab === 'claims' && (
          <ClaimEditor
            bundle={bundle}
            onSaveClaim={handleSaveClaim}
            language={language}
            selectedId={selectedClaimId}
          />
        )}
        {activeTab === 'sources' && (
          <SourceEditor
            bundle={bundle}
            onSaveSource={handleSaveSource}
            language={language}
            selectedId={selectedSourceId}
          />
        )}
        {activeTab === 'media' && (
          <MediaEditor
            bundle={bundle}
            onSaveMedia={handleSaveMedia}
            language={language}
            selectedId={selectedMediaId}
          />
        )}
        {activeTab === 'review_queue' && (
          <ReviewQueueView
            bundle={bundle}
            onSelectEdit={handleSelectEdit}
            onRemoveQueueItem={handleRemoveQueueItem}
            onClearQueue={handleClearQueue}
            language={language}
          />
        )}
        {activeTab === 'export_github' && (
          <ExportGitHubView
            bundle={bundle}
            onImportBundle={handleImportBundle}
            language={language}
          />
        )}
      </div>
    </div>
  );
};
