/**
 * INSAF ARCHIVE (انصاف آرکائیو)
 * Export & GitHub Approval Workflow Component — Admin Editorial Studio
 * Honest static-site security model, JSON export/import, GitHub Issue/PR generators & review checklists
 */

import React, { useState } from 'react';
import type { StudioDraftBundle, StudioExportBundle } from '../../../types/adminStudio';
import {
  buildExportBundle,
  generateMarkdownReviewSummary,
  generateGitHubIssuePayload,
  generatePullRequestChecklist,
  importAndValidateJson,
} from '../../../utils/adminStudioStorage';
import { getRepositoryConfig } from '../../../config/repository';
import {
  Download,
  Copy,
  Check,
  FileCode,
  FileText,
  GitPullRequest,
  ShieldCheck,
  Upload,
  AlertTriangle,
  ExternalLink,
} from 'lucide-react';

interface ExportGitHubViewProps {
  bundle: StudioDraftBundle;
  onImportBundle: (importedData: any, type: string) => void;
  language: 'en' | 'ur';
}

export const ExportGitHubView: React.FC<ExportGitHubViewProps> = ({ bundle, onImportBundle, language }) => {
  const [copiedSection, setCopiedSection] = useState<string | null>(null);
  const [importJsonText, setImportJsonText] = useState('');
  const [importError, setImportError] = useState<string | null>(null);
  const [importSuccess, setImportSuccess] = useState<string | null>(null);
  const [showImportSection, setShowImportSection] = useState(false);

  const exportPayload: StudioExportBundle = buildExportBundle(bundle);
  const markdownSummary = generateMarkdownReviewSummary(bundle);
  const githubIssue = generateGitHubIssuePayload(bundle);
  const prChecklist = generatePullRequestChecklist(bundle);

  const handleCopy = (text: string, sectionId: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSection(sectionId);
    setTimeout(() => setCopiedSection(null), 3000);
  };

  const handleDownloadJson = () => {
    const jsonString = JSON.stringify(exportPayload, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `insaf-archive-editorial-bundle-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleImportSubmit = () => {
    setImportError(null);
    setImportSuccess(null);
    if (!importJsonText.trim()) {
      setImportError('Please paste valid JSON text.');
      return;
    }

    const result = importAndValidateJson(importJsonText);
    if (!result.success) {
      setImportError(result.errors.join(' | '));
      return;
    }

    if (window.confirm('Import and merge these validated records into your browser draft store? Existing drafts with matching IDs will be updated, and new records will be added without modifying unrelated drafts.')) {
      onImportBundle(result.data, result.type || 'bundle');
      setImportSuccess(`Successfully imported ${result.type} into local review queue.`);
      setImportJsonText('');
      setTimeout(() => setImportSuccess(null), 4000);
    }
  };

  const repoConfig = getRepositoryConfig();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Honest Security & Architecture Banner */}
      <div
        style={{
          backgroundColor: 'rgba(15, 23, 42, 0.6)',
          border: '1px solid rgba(148, 163, 184, 0.2)',
          borderRadius: 'var(--radius-lg)',
          padding: '1.25rem 1.5rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.5rem',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: 'var(--accent-gold)' }}>
          <ShieldCheck size={20} />
          <h3 style={{ fontSize: '1.05rem', margin: 0, color: '#FFFFFF' }}>
            {language === 'ur' ? 'گٹ ہب پر مبنی ادارتی منظوری کا فریم ورک' : 'Static Site Governance & GitHub Approval Workflow'}
          </h3>
        </div>
        <p style={{ fontSize: '0.84rem', color: '#CBD5E1', lineHeight: 1.6, margin: 0 }}>
          {language === 'ur'
            ? 'انصاف آرکائیو ایک جامد (Static) سائٹ ہے جو گٹ ہب پیجز پر ہوسٹ ہے۔ براؤزر میں تیار کردہ ڈرافٹس صرف آپ کی ڈیوائس پر محفوظ رہتے ہیں۔ اشاعت کے لیے پے لوڈ ایکسپورٹ کریں اور ریپوزٹری میں باضابطہ پل ریکویسٹ (PR) یا ایشو کے طور پر جمع کرائیں۔'
            : 'Insaf Archive operates as a secure static repository hosted on GitHub Pages. Drafts created in this Studio are stored strictly in your browser LocalStorage. To merge changes into the public archive, export the validated payload below and submit it as a Pull Request or Issue.'}
        </p>
        {!repoConfig.isConfigured && (
          <div
            style={{
              marginTop: '0.5rem',
              padding: '0.5rem 0.75rem',
              borderRadius: 'var(--radius-sm)',
              backgroundColor: 'rgba(245, 158, 11, 0.1)',
              border: '1px solid rgba(245, 158, 11, 0.25)',
              color: '#F59E0B',
              fontSize: '0.78rem',
              display: 'flex',
              alignItems: 'flex-start',
              gap: '0.45rem',
            }}
          >
            <AlertTriangle size={14} style={{ marginTop: '0.1rem', flexShrink: 0 }} />
            <span>
              <strong>Target Repository Note:</strong> {repoConfig.configurationWarning} Default target: <code>{repoConfig.baseUrl}</code>.
            </span>
          </div>
        )}
      </div>

      {/* Export Options Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1rem' }}>
        {/* Card 1: Machine-Readable JSON Export */}
        <div
          style={{
            backgroundColor: 'var(--bg-surface)',
            border: '1px solid var(--border-subtle)',
            borderRadius: 'var(--radius-md)',
            padding: '1.25rem',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            gap: '1rem',
          }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem', color: '#38BDF8' }}>
              <FileCode size={18} />
              <strong style={{ fontSize: '0.95rem' }}>Full Machine-Readable JSON Bundle</strong>
            </div>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: 1.5, margin: 0 }}>
              Complete export bundle containing all {bundle.dossiers.length} dossiers, {bundle.claims.length} claims, {bundle.sources.length} sources, and {bundle.media.length} media items with validation metadata.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            <button
              onClick={() => handleCopy(JSON.stringify(exportPayload, null, 2), 'json')}
              className="btn btn-secondary btn-sm"
              style={{ fontSize: '0.8rem' }}
            >
              {copiedSection === 'json' ? <Check size={14} color="#10B981" /> : <Copy size={14} />}
              <span>{copiedSection === 'json' ? 'Copied JSON!' : 'Copy JSON'}</span>
            </button>
            <button
              onClick={handleDownloadJson}
              className="btn btn-primary btn-sm"
              style={{ fontSize: '0.8rem' }}
            >
              <Download size={14} />
              <span>Download .json File</span>
            </button>
          </div>
        </div>

        {/* Card 2: Markdown Review Summary */}
        <div
          style={{
            backgroundColor: 'var(--bg-surface)',
            border: '1px solid var(--border-subtle)',
            borderRadius: 'var(--radius-md)',
            padding: '1.25rem',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            gap: '1rem',
          }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem', color: 'var(--accent-gold)' }}>
              <FileText size={18} />
              <strong style={{ fontSize: '0.95rem' }}>Human-Readable Markdown Summary</strong>
            </div>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: 1.5, margin: 0 }}>
              Formatted Markdown document detailing all proposed updates, legal statuses, sub judice notices, and source limitations for human review.
            </p>
          </div>

          <div>
            <button
              onClick={() => handleCopy(markdownSummary, 'md')}
              className="btn btn-secondary btn-sm"
              style={{ fontSize: '0.8rem' }}
            >
              {copiedSection === 'md' ? <Check size={14} color="#10B981" /> : <Copy size={14} />}
              <span>{copiedSection === 'md' ? 'Copied Markdown!' : 'Copy Review Markdown'}</span>
            </button>
          </div>
        </div>

        {/* Card 3: GitHub Issue Submission */}
        <div
          style={{
            backgroundColor: 'var(--bg-surface)',
            border: '1px solid var(--border-subtle)',
            borderRadius: 'var(--radius-md)',
            padding: '1.25rem',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            gap: '1rem',
          }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem', color: '#10B981' }}>
              <GitPullRequest size={18} />
              <strong style={{ fontSize: '0.95rem' }}>GitHub Issue / PR Payload</strong>
            </div>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: 1.5, margin: 0 }}>
              Formatted issue text with automated checklists, pre-filled change matrices, and embedded JSON payload ready to paste into GitHub.
            </p>
            <div style={{ marginTop: '0.45rem', fontSize: '0.74rem', color: '#94A3B8' }}>
              <span>Target Form: <code>archival_record_submission.yml</code> (New Records) or <code>correction_request.yml</code> (Corrections)</span>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            <button
              onClick={() => handleCopy(githubIssue.title, 'issue_title')}
              className="btn btn-secondary btn-sm"
              style={{ fontSize: '0.8rem' }}
            >
              {copiedSection === 'issue_title' ? <Check size={14} color="#10B981" /> : <Copy size={14} />}
              <span>{copiedSection === 'issue_title' ? 'Copied Title!' : 'Copy Issue Title'}</span>
            </button>
            <button
              onClick={() => handleCopy(githubIssue.body, 'issue')}
              className="btn btn-secondary btn-sm"
              style={{ fontSize: '0.8rem' }}
            >
              {copiedSection === 'issue' ? <Check size={14} color="#10B981" /> : <Copy size={14} />}
              <span>{copiedSection === 'issue' ? 'Copied Issue Body!' : 'Copy Issue Body'}</span>
            </button>
            <a
              href={repoConfig.issuesUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary btn-sm"
              style={{ fontSize: '0.8rem', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}
            >
              <ExternalLink size={14} />
              <span>Open GitHub Issues</span>
            </a>
          </div>
        </div>
      </div>

      {/* PR Checklist Card */}
      <div
        style={{
          backgroundColor: 'var(--bg-surface)',
          border: '1px solid var(--border-subtle)',
          borderRadius: 'var(--radius-md)',
          padding: '1.25rem',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
          <h4 style={{ fontSize: '0.95rem', color: '#F8FAFC', margin: 0 }}>
            {language === 'ur' ? 'پل ریکویسٹ تصدیقی فہرست (PR Checklist)' : 'Pull Request Verification Checklist'}
          </h4>
          <button
            onClick={() => handleCopy(prChecklist, 'pr')}
            className="btn btn-secondary btn-sm"
            style={{ fontSize: '0.78rem' }}
          >
            {copiedSection === 'pr' ? <Check size={13} color="#10B981" /> : <Copy size={13} />}
            <span>{copiedSection === 'pr' ? 'Copied Checklist!' : 'Copy Checklist'}</span>
          </button>
        </div>
        <pre
          style={{
            backgroundColor: 'var(--bg-dark)',
            padding: '1rem',
            borderRadius: 'var(--radius-sm)',
            fontSize: '0.78rem',
            color: '#CBD5E1',
            overflowX: 'auto',
            margin: 0,
            whiteSpace: 'pre-wrap',
          }}
        >
          {prChecklist}
        </pre>
      </div>

      {/* Import Section Drawer */}
      <div
        style={{
          backgroundColor: 'var(--bg-surface)',
          border: '1px solid var(--border-subtle)',
          borderRadius: 'var(--radius-md)',
          padding: '1.25rem',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Upload size={16} color="var(--accent-gold)" />
            <h4 style={{ fontSize: '0.95rem', color: '#F8FAFC', margin: 0 }}>
              {language === 'ur' ? 'ڈرافٹ ڈیٹا امپورٹ کریں (JSON)' : 'Import Proposal / Draft JSON'}
            </h4>
          </div>
          <button
            onClick={() => setShowImportSection(!showImportSection)}
            className="btn btn-secondary btn-sm"
            style={{ fontSize: '0.78rem' }}
          >
            {showImportSection ? 'Collapse' : 'Expand Import'}
          </button>
        </div>

        {showImportSection && (
          <div style={{ marginTop: '1rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', margin: 0 }}>
              Paste a previously exported bundle or single record JSON. Schema and relationships will be verified before merging into your browser draft store.
            </p>

            <textarea
              className="form-input"
              rows={5}
              value={importJsonText}
              onChange={e => setImportJsonText(e.target.value)}
              placeholder="Paste JSON bundle or record here..."
              style={{ fontFamily: 'monospace', fontSize: '0.8rem' }}
            />

            {importError && (
              <div style={{ color: '#EF4444', fontSize: '0.82rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <AlertTriangle size={14} />
                <span>{importError}</span>
              </div>
            )}

            {importSuccess && (
              <div style={{ color: '#10B981', fontSize: '0.82rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <Check size={14} />
                <span>{importSuccess}</span>
              </div>
            )}

            <div>
              <button
                onClick={handleImportSubmit}
                className="btn btn-primary btn-sm"
                style={{ fontSize: '0.82rem' }}
              >
                <Upload size={14} />
                <span>Validate & Merge JSON</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
