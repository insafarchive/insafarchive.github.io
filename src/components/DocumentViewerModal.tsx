import React, { useState, useEffect } from 'react';
import { X, Copy, Check, Download, ShieldCheck, Scale, FileText } from 'lucide-react';
import { Language, ConnectedDocument } from '../types';
import { JudgmentItem } from '../data/judgments';
import { translations } from '../data/translations';

interface DocumentViewerModalProps {
  document: ConnectedDocument | JudgmentItem | null;
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
}

export const DocumentViewerModal: React.FC<DocumentViewerModalProps> = ({
  document,
  isOpen,
  onClose,
  lang,
}) => {
  const [copied, setCopied] = useState(false);
  const t = translations;

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || !document) return null;

  const isJudgment = 'citation' in document;
  const citation = isJudgment
    ? (document as JudgmentItem).citation
    : (document as ConnectedDocument).citationFormat;

  const docket = isJudgment
    ? (document as JudgmentItem).citation
    : (document as ConnectedDocument).docketNumber;

  const extract = isJudgment
    ? (document as JudgmentItem).operativeExtract[lang]
    : (document as ConnectedDocument).extractText[lang];

  const handleCopyCitation = () => {
    navigator.clipboard.writeText(`${document.title[lang]} - Citation: ${citation}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSimulateDownload = () => {
    // Generate certified text certificate blob for download
    const content = `INSAF ARCHIVE - CERTIFIED PUBLIC LEGAL RECORD EXTRACT\n` +
      `=======================================================\n` +
      `Title: ${document.title[lang]}\n` +
      `Citation / Docket: ${citation}\n` +
      `Court: ${document.court[lang]}\n` +
      `Date: ${document.date}\n` +
      `Pages in Record: ${document.pagesCount}\n\n` +
      `OPERATIVE JUDICIAL EXTRACT:\n` +
      `--------------------------\n` +
      `${extract}\n\n` +
      `Archival Source Verification: Insaf Archive Public Legal Repository (insafarchive)\n` +
      `Certified on: ${new Date().toISOString()}`;

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = window.document.createElement('a');
    a.href = url;
    a.download = `InsafArchive_${docket.replace(/[^a-zA-Z0-9]/g, '_')}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-xs"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="document-viewer-title"
    >
      <div
        className="w-full max-w-3xl bg-[#0E1738] border border-[#C5A85C]/40 rounded-xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-[#111C3A]">
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 rounded bg-[#172346] text-[#C5A85C] border border-[#C5A85C]/30">
              <FileText size={18} />
            </div>
            <div>
              <span className="text-xs font-mono text-[#E0C57A]">{citation}</span>
              <h3 id="document-viewer-title" className="text-sm sm:text-base font-semibold text-white font-urdu-ui">
                {document.title[lang]}
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded hover:bg-slate-800 transition-colors"
            aria-label={t.actions.close[lang]}
          >
            <X size={18} />
          </button>
        </div>

        {/* Certificate Badge Strip */}
        <div className="px-6 py-2.5 bg-[#091024] border-b border-slate-800/80 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-emerald-300">
            <ShieldCheck size={15} />
            <span className="font-urdu-ui">
              {lang === 'en'
                ? 'Certified Court Record & Verified Law Report Extract'
                : 'مصدقہ عدالتی ریکارڈ و قانونی جرنل کا مستند اقتباس'}
            </span>
          </div>

          <div className="flex items-center gap-3 text-slate-400">
            <span>{document.court[lang]}</span>
            <span>·</span>
            <span>{document.date}</span>
            <span>·</span>
            <span>{document.pagesCount} {lang === 'en' ? 'Pages' : 'صفحات'}</span>
          </div>
        </div>

        {/* Document Body (Authentic Parchment / Paper Container for Legal Comfort) */}
        <div className="p-6 sm:p-8 overflow-y-auto flex-1 bg-[#FBF9F5] text-slate-900 selection:bg-amber-200">
          <div className="max-w-2xl mx-auto space-y-6">
            {/* Docket Banner */}
            <div className="text-center border-b border-stone-300 pb-4">
              <div className="text-[11px] uppercase tracking-widest text-stone-500 font-sans mb-1">
                {document.court[lang]}
              </div>
              <div className="text-xs font-mono font-semibold text-stone-700">
                {citation}
              </div>
              <div className="text-base font-serif font-bold text-stone-900 mt-2 font-urdu-ui">
                {document.title[lang]}
              </div>
            </div>

            {/* Operative Extract */}
            <div className="space-y-4">
              <h4 className="text-xs font-sans uppercase tracking-wider text-stone-500 font-semibold font-urdu-ui">
                {lang === 'en' ? 'Operative Court Ruling Extract' : 'عدالتی فیصلے کا نافذ العمل اقتباس'}
              </h4>
              <blockquote className="p-4 bg-stone-100/80 border-l-4 rtl:border-l-0 rtl:border-r-4 border-[#C5A85C] rounded-xs font-serif text-sm sm:text-base leading-relaxed text-stone-800 italic">
                {extract}
              </blockquote>
            </div>

            {/* In Judgments: Key Principles */}
            {isJudgment && (document as JudgmentItem).keyPrinciples && (
              <div className="pt-4 border-t border-stone-200 space-y-2">
                <h5 className="text-xs font-sans uppercase tracking-wider text-stone-600 font-semibold font-urdu-ui">
                  {lang === 'en' ? 'Key Legal Principles Formulated' : 'قائم کردہ قانونی و آئینی اصول'}
                </h5>
                <ul className="space-y-2 text-xs sm:text-sm text-stone-700 list-disc list-inside">
                  {(document as JudgmentItem).keyPrinciples.map((principle, idx) => (
                    <li key={idx} className="font-urdu-ui leading-relaxed">
                      {principle[lang]}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Archival Authenticity Stamp */}
            <div className="mt-8 pt-4 border-t border-stone-300 flex items-center justify-between text-[11px] text-stone-500">
              <span>{lang === 'en' ? 'Digital Copy Certified by Insaf Archive Repository' : 'انصاف آرکائیو کی مصدقہ ڈیجیٹل نقل'}</span>
              <span className="font-mono">{docket}</span>
            </div>
          </div>
        </div>

        {/* Modal Actions */}
        <div className="px-6 py-3.5 bg-[#111C3A] border-t border-slate-800 flex items-center justify-between gap-3 text-xs">
          <button
            onClick={handleCopyCitation}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors font-urdu-ui"
          >
            {copied ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
            <span>{copied ? t.actions.citationCopied[lang] : t.actions.copyCitation[lang]}</span>
          </button>

          <button
            onClick={handleSimulateDownload}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-[#C5A85C] hover:bg-[#E0C57A] text-[#0B132B] font-semibold transition-colors font-urdu-ui"
          >
            <Download size={14} />
            <span>{t.actions.downloadCertifiedCopy[lang]}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
