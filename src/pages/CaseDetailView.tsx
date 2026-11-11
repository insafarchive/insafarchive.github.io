import React, { useState } from 'react';
import { CaseRecord, Language, ConnectedDocument, MediaItem } from '../types';
import { translations } from '../data/translations';
import { StatusBadge } from '../components/StatusBadge';
import { ScalesLogo } from '../components/ScalesLogo';
import { getMediaByCaseId } from '../data/media/index';
import {
  ArrowLeft,
  Calendar,
  Building2,
  Users,
  ShieldAlert,
  FileCheck2,
  Gavel,
  History,
  FileText,
  Video,
  Share2,
  Copy,
  Check,
  AlertTriangle,
  ExternalLink,
  Printer,
  MapPin,
  BookOpen,
  Link as LinkIcon,
  ShieldCheck,
  Image as ImageIcon,
  X,
  Maximize2,
  Edit3,
} from 'lucide-react';

interface CaseDetailViewProps {
  caseItem: CaseRecord;
  lang: Language;
  onBack: () => void;
  onOpenDocument: (doc: ConnectedDocument) => void;
  onRequestCorrection: (caseRef: string) => void;
  onSelectRelatedCase?: (relatedCaseId: string) => void;
  onNavigate?: (page: string, params?: { caseId?: string; tab?: string }) => void;
}

export const CaseDetailView: React.FC<CaseDetailViewProps> = ({
  caseItem,
  lang,
  onBack,
  onOpenDocument,
  onRequestCorrection,
  onSelectRelatedCase,
  onNavigate,
}) => {
  const [copiedCitation, setCopiedCitation] = useState(false);
  const [copiedUrl, setCopiedUrl] = useState(false);
  const [viewingImage, setViewingImage] = useState<MediaItem | null>(null);
  const t = translations;

  const connectedMedia = getMediaByCaseId(caseItem.id);
  const archivalImages = connectedMedia.filter((m) => m.mediaType === 'image');
  const externalReports = connectedMedia.filter((m) => m.mediaType === 'external_source');

  const handleCopyCitation = () => {
    navigator.clipboard.writeText(
      `${caseItem.title[lang]} [${caseItem.id} · ${caseItem.caseNumber}] (${caseItem.court?.[lang] || 'Court Record'})`
    );
    setCopiedCitation(true);
    setTimeout(() => setCopiedCitation(false), 2500);
  };

  const handleCopyShareUrl = () => {
    const url = window.location.origin + window.location.pathname + `?case=${encodeURIComponent(caseItem.id)}`;
    navigator.clipboard.writeText(url);
    setCopiedUrl(true);
    setTimeout(() => setCopiedUrl(false), 2500);
  };

  const handlePrint = () => {
    window.print();
  };

  // Group evidence items by nature for strict evidentiary distinction
  const allegations = (caseItem.evidenceItems || []).filter((e) => e.nature === 'allegation');
  const partyStatements = (caseItem.evidenceItems || []).filter((e) => e.nature === 'party_statement');
  const officialRecords = (caseItem.evidenceItems || []).filter((e) => e.nature === 'official_record');
  const courtFindings = (caseItem.evidenceItems || []).filter((e) => e.nature === 'court_finding');

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10 print:bg-white print:text-black print:max-w-none print:p-0">
      {/* 1. Back and Action Navigation (Hidden in Print) */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4 print:hidden">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 text-xs font-medium text-slate-300 hover:text-white transition-colors font-urdu-ui"
        >
          <ArrowLeft size={16} className="rtl:rotate-180 text-[#C5A85C]" />
          <span>{t.actions.backToArchive[lang]}</span>
        </button>

        <div className="flex flex-wrap items-center gap-2">
          {/* Shareable Link Button */}
          <button
            onClick={handleCopyShareUrl}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs bg-[#111C3A] hover:bg-[#162347] border border-slate-700/80 rounded text-slate-200 transition-colors font-urdu-ui"
            title="Copy shareable link"
          >
            {copiedUrl ? <Check size={14} className="text-emerald-400" /> : <Share2 size={14} className="text-[#C5A85C]" />}
            <span>{copiedUrl ? t.actions.shareUrlCopied[lang] : t.actions.share[lang]}</span>
          </button>

          {/* Copy Citation Button */}
          <button
            onClick={handleCopyCitation}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs bg-[#111C3A] hover:bg-[#162347] border border-slate-700/80 rounded text-slate-200 transition-colors font-urdu-ui"
          >
            {copiedCitation ? (
              <Check size={14} className="text-emerald-400" />
            ) : (
              <Copy size={14} className="text-[#C5A85C]" />
            )}
            <span>
              {copiedCitation ? t.actions.citationCopied[lang] : t.actions.copyCitation[lang]}
            </span>
          </button>

          {/* Print Dossier Button */}
          <button
            onClick={handlePrint}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs bg-[#111C3A] hover:bg-[#162347] border border-slate-700/80 rounded text-slate-200 transition-colors font-urdu-ui"
          >
            <Printer size={14} className="text-[#C5A85C]" />
            <span>{t.actions.printDossier[lang]}</span>
          </button>

          {/* Propose an Update or Correction via Contributor Workflow */}
          <button
            onClick={() => {
              if (onNavigate) {
                onNavigate('contribute', { caseId: caseItem.id, tab: 'correction' });
              } else {
                onRequestCorrection(caseItem.id);
              }
            }}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs bg-[#C5A85C]/15 hover:bg-[#C5A85C]/25 border border-[#C5A85C]/40 rounded text-[#E0C57A] transition-colors font-urdu-ui font-medium"
            title={lang === 'en' ? 'Propose Case Update / Correction' : 'مقدمے میں تصحیح تجویز کریں'}
          >
            <Edit3 size={13} />
            <span>{lang === 'en' ? 'Submit Case Update' : 'مقدمہ اپ ڈیٹ تجویز کریں'}</span>
          </button>
        </div>
      </div>

      {/* 2. Incomplete or Sub Judice Notice Banners */}
      {caseItem.incompleteNotice && (
        <div className="p-4 rounded-lg bg-amber-950/40 border border-amber-500/40 flex items-start gap-3 text-xs text-amber-200">
          <AlertTriangle size={18} className="text-amber-400 shrink-0 mt-0.5" />
          <p className="leading-relaxed font-urdu-ui">
            {t.caseDetail.incompleteBanner[lang]}
          </p>
        </div>
      )}

      {caseItem.proceduralStatus === 'pending_trial' && (
        <div className="p-4 rounded-lg bg-sky-950/40 border border-sky-500/40 flex items-start gap-3 text-xs text-sky-200">
          <Gavel size={18} className="text-sky-400 shrink-0 mt-0.5" />
          <p className="leading-relaxed font-urdu-ui">
            {t.caseDetail.subJudiceBanner[lang]}
          </p>
        </div>
      )}

      {/* 3. Primary Legal Dossier Header */}
      <div className="bg-[#0E1738] print:bg-transparent print:border-b-2 print:border-black border border-slate-800 rounded-xl p-6 sm:p-8 space-y-6 text-left rtl:text-right">
        {/* Top Metadata Strip */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-4 text-xs text-slate-400 print:text-black">
          <div className="flex flex-wrap items-center gap-3">
            <span className="font-mono text-sm text-[#E0C57A] font-bold">
              {caseItem.id}
            </span>
            <span>·</span>
            <span className="font-mono font-medium text-slate-300 print:text-black">
              {caseItem.caseNumber}
            </span>
            <span>·</span>
            <span className="font-urdu-ui text-slate-300 print:text-black">
              {caseItem.court?.[lang] || caseItem.courtLevel}
            </span>
          </div>

          <div className="flex items-center gap-3 font-urdu-ui">
            <span>
              {t.caseDetail.lastUpdated[lang]}:{' '}
              <strong className="text-slate-300 font-mono print:text-black">{caseItem.lastUpdated}</strong>
            </span>
          </div>
        </div>

        {/* Title */}
        <div className="space-y-3">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white print:text-black font-urdu-ui leading-snug">
            {caseItem.title[lang]}
          </h1>
          <p className="text-sm sm:text-base text-slate-300 print:text-black leading-relaxed font-urdu-ui">
            {caseItem.summary[lang]}
          </p>
        </div>

        {/* Highlighted Procedural Status Banner (Strict Legal Distinction) */}
        <div className="p-4 rounded-lg bg-[#111C3A] print:bg-stone-100 border border-slate-800 print:border-stone-300 space-y-2">
          <div className="text-xs uppercase tracking-wider text-slate-400 print:text-stone-600 font-urdu-ui font-semibold">
            {t.caseDetail.proceduralStatus[lang]}
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center gap-3">
            <StatusBadge
              status={caseItem.proceduralStatus}
              lang={lang}
              size="lg"
            />
            <p className="text-xs text-slate-300 print:text-stone-800 leading-relaxed font-urdu-ui border-t sm:border-t-0 sm:border-l rtl:sm:border-l-0 rtl:sm:border-r border-slate-800 print:border-stone-300 pt-2 sm:pt-0 sm:pl-3 rtl:sm:pl-0 rtl:sm:pr-3">
              {t.statuses[caseItem.proceduralStatus]?.desc?.[lang] || caseItem.proceduralStatusNotes?.[lang]}
            </p>
          </div>
        </div>

        {/* Case Dossier Key Details Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs pt-2">
          {/* Parties Involved with Privacy Protections */}
          <div className="p-4 rounded bg-[#091024] print:bg-stone-50 border border-slate-800 print:border-stone-200 space-y-3">
            <div className="flex items-center gap-2 text-slate-400 print:text-stone-700 font-medium font-urdu-ui">
              <Users size={15} className="text-[#C5A85C]" />
              <span>{t.caseDetail.parties[lang]}</span>
            </div>
            <div className="space-y-2 font-urdu-ui">
              {caseItem.parties.map((p) => (
                <div key={p.id} className="text-xs">
                  <span className="text-slate-400 print:text-stone-500 block text-[11px] capitalize">
                    {p.role.replace('_', ' ')}:
                  </span>
                  <span className={`font-medium ${p.redacted ? 'text-amber-300 print:text-amber-800' : 'text-white print:text-black'}`}>
                    {p.name[lang]}
                  </span>
                  {p.isProtectedOrMinor && (
                    <span className="block text-[10px] text-amber-400/90 print:text-amber-700 mt-0.5">
                      {t.privacyNotice.protectedMinor[lang]}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Location & Bench Metadata */}
          <div className="p-4 rounded bg-[#091024] print:bg-stone-50 border border-slate-800 print:border-stone-200 space-y-3">
            <div className="flex items-center gap-2 text-slate-400 print:text-stone-700 font-medium font-urdu-ui">
              <Building2 size={15} className="text-[#C5A85C]" />
              <span>{t.caseDetail.presidingBench[lang]} & {t.caseDetail.jurisdiction[lang]}</span>
            </div>
            <div className="space-y-2 font-urdu-ui">
              <div>
                <span className="text-slate-400 print:text-stone-500 block text-[11px]">
                  {t.caseDetail.presidingBench[lang]}:
                </span>
                <span className="text-white print:text-black font-medium">
                  {caseItem.bench?.[lang] || 'Division Bench / Single Bench'}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-slate-400 print:text-stone-500 text-[11px]">
                  {t.caseDetail.jurisdiction[lang]}:
                </span>
                <span className="text-slate-300 print:text-black font-medium">
                  {t.provinces[caseItem.location.province]?.[lang]}
                  {caseItem.location.district ? ` · ${caseItem.location.district}` : ''}
                </span>
              </div>
              {caseItem.incidentDate && (
                <div>
                  <span className="text-slate-400 print:text-stone-500 block text-[11px]">
                    {t.caseDetail.incidentDate[lang]}:
                  </span>
                  <span className="text-slate-300 print:text-black font-mono">
                    {caseItem.incidentDate}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Relevant Statutory Provisions */}
        {caseItem.statutoryProvisions && caseItem.statutoryProvisions.length > 0 && (
          <div className="p-4 rounded bg-[#091024] print:bg-stone-50 border border-slate-800 print:border-stone-200 space-y-2 text-xs">
            <div className="text-slate-400 print:text-stone-600 font-semibold uppercase tracking-wider font-urdu-ui">
              {t.caseDetail.provisions[lang]}
            </div>
            <div className="flex flex-wrap gap-2">
              {caseItem.statutoryProvisions.map((prov, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 rounded bg-[#111C3A] print:bg-stone-200 border border-slate-700 text-slate-200 print:text-stone-900 font-mono text-[11px]"
                >
                  {prov}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Detailed Factual Background */}
        <div className="space-y-2 pt-2 border-t border-slate-800">
          <h2 className="text-base font-semibold text-white print:text-black font-urdu-ui">
            {t.caseDetail.factualBackground[lang]}
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 print:text-stone-900 leading-relaxed font-urdu-ui whitespace-pre-line">
            {caseItem.factualBackground[lang]}
          </p>
        </div>
      </div>

      {/* 4. Evidentiary Breakdown (4 Distinct Tiers) */}
      <div className="space-y-6 text-left rtl:text-right">
        <div className="border-b border-slate-800 pb-3">
          <h2 className="text-xl font-bold text-white print:text-black font-legal-display font-urdu-ui">
            {t.caseDetail.evidenceBreakdown[lang]}
          </h2>
          <p className="text-xs text-slate-400 mt-1 font-urdu-ui">
            {lang === 'en'
              ? 'Strict separation between allegations, party statements, official records, and court findings.'
              : 'الزامات، فریقین کے بیانات، سرکاری ریکارڈ اور عدالتی فیصلوں کی الگ الگ جانچ۔'}
          </p>
        </div>

        {/* Tier A: Allegations */}
        {allegations.length > 0 && (
          <div className="bg-[#0E1738] border border-amber-900/40 rounded-xl p-5 space-y-3">
            <div className="flex items-center gap-2 text-amber-300 font-urdu-ui font-semibold text-sm">
              <ShieldAlert size={16} />
              <span>{t.evidentiaryNature.allegation.en} ({t.evidentiaryNature.allegation[lang]})</span>
            </div>
            <div className="divide-y divide-slate-800/80">
              {allegations.map((item) => (
                <div key={item.id} className="py-2.5 space-y-1">
                  <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-urdu-ui">
                    {item.claimOrFact[lang]}
                  </p>
                  <div className="text-[11px] text-slate-400 font-urdu-ui">
                    <span className="text-[#C5A85C]">{lang === 'en' ? 'Source:' : 'ماخذ:'} </span>
                    <span>{item.sourceName[lang]}</span>
                    {item.date && <span> · {item.date}</span>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tier B: Party Statements */}
        {partyStatements.length > 0 && (
          <div className="bg-[#0E1738] border border-violet-900/40 rounded-xl p-5 space-y-3">
            <div className="flex items-center gap-2 text-violet-300 font-urdu-ui font-semibold text-sm">
              <Users size={16} />
              <span>{t.evidentiaryNature.party_statement.en} ({t.evidentiaryNature.party_statement[lang]})</span>
            </div>
            <div className="divide-y divide-slate-800/80">
              {partyStatements.map((item) => (
                <div key={item.id} className="py-2.5 space-y-1">
                  <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-urdu-ui">
                    {item.claimOrFact[lang]}
                  </p>
                  <div className="text-[11px] text-slate-400 font-urdu-ui">
                    <span className="text-violet-300">{lang === 'en' ? 'Submitted in:' : 'دستاویز:'} </span>
                    <span>{item.sourceName[lang]}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tier C: Official Records */}
        {officialRecords.length > 0 && (
          <div className="bg-[#0E1738] border border-sky-900/40 rounded-xl p-5 space-y-3">
            <div className="flex items-center gap-2 text-sky-300 font-urdu-ui font-semibold text-sm">
              <FileCheck2 size={16} />
              <span>{t.evidentiaryNature.official_record.en} ({t.evidentiaryNature.official_record[lang]})</span>
            </div>
            <div className="divide-y divide-slate-800/80">
              {officialRecords.map((item) => (
                <div key={item.id} className="py-2.5 space-y-1">
                  <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-urdu-ui">
                    {item.claimOrFact[lang]}
                  </p>
                  <div className="text-[11px] text-slate-400 font-urdu-ui">
                    <span className="text-sky-300">{lang === 'en' ? 'Verified by:' : 'تصدیق کنندہ:'} </span>
                    <span>{item.sourceName[lang]}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tier D: Court Findings & Judicial Rulings */}
        {courtFindings.length > 0 && (
          <div className="bg-[#0E1738] border border-emerald-900/40 rounded-xl p-5 space-y-3">
            <div className="flex items-center gap-2 text-emerald-300 font-urdu-ui font-semibold text-sm">
              <Gavel size={16} />
              <span>{t.evidentiaryNature.court_finding.en} ({t.evidentiaryNature.court_finding[lang]})</span>
            </div>
            <div className="divide-y divide-slate-800/80">
              {courtFindings.map((item) => (
                <div key={item.id} className="py-2.5 space-y-1">
                  <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-urdu-ui">
                    {item.claimOrFact[lang]}
                  </p>
                  <div className="text-[11px] text-slate-400 font-urdu-ui flex flex-wrap items-center gap-2">
                    <span className="text-emerald-300">{lang === 'en' ? 'Judicial Ruling:' : 'عدالتی فیصلہ:'} </span>
                    <span>{item.sourceName[lang]}</span>
                    {item.citation && (
                      <span className="font-mono text-[#E0C57A] font-semibold">{item.citation}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* 5. Procedural Timeline */}
      {caseItem.timeline && caseItem.timeline.length > 0 && (
        <div className="bg-[#0E1738] border border-slate-800 rounded-xl p-6 sm:p-8 space-y-6 text-left rtl:text-right">
          <div className="flex items-center gap-2.5 border-b border-slate-800 pb-4">
            <History size={18} className="text-[#C5A85C]" />
            <h2 className="text-lg font-bold text-white font-urdu-ui">
              {t.caseDetail.timeline[lang]}
            </h2>
          </div>

          <div className="relative border-l rtl:border-l-0 rtl:border-r border-slate-800 ml-3 rtl:ml-0 rtl:mr-3 space-y-6">
            {caseItem.timeline.map((m) => (
              <div key={m.id} className="relative pl-6 rtl:pl-0 rtl:pr-6 space-y-1.5">
                <div className="absolute -left-1.5 rtl:-left-auto rtl:-right-1.5 top-1.5 w-3 h-3 rounded-full bg-[#C5A85C] border-2 border-[#0B132B]" />
                <div className="flex flex-wrap items-center gap-2 text-xs text-slate-400">
                  <span className="font-mono text-[#E0C57A] font-medium">{m.date}</span>
                  {m.bench && <span>· {m.bench[lang]}</span>}
                  <span>·</span>
                  <StatusBadge status={m.statusEffect} lang={lang} size="sm" />
                </div>
                <h3 className="text-sm font-semibold text-white font-urdu-ui">
                  {m.event[lang]}
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed font-urdu-ui">
                  {m.proceduralOutcome[lang]}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 6. Connected Certified Court Documents */}
      {caseItem.connectedDocuments && caseItem.connectedDocuments.length > 0 && (
        <div className="bg-[#0E1738] border border-slate-800 rounded-xl p-6 sm:p-8 space-y-6 text-left rtl:text-right">
          <div className="flex items-center gap-2.5 border-b border-slate-800 pb-4">
            <FileText size={18} className="text-[#C5A85C]" />
            <div>
              <h2 className="text-lg font-bold text-white font-urdu-ui">
                {t.caseDetail.documents[lang]}
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {caseItem.connectedDocuments.map((doc) => (
              <div
                key={doc.id}
                onClick={() => onOpenDocument(doc)}
                className="p-4 bg-[#111C3A] hover:bg-[#162347] border border-slate-800 hover:border-[#C5A85C]/40 rounded-lg cursor-pointer transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between text-xs text-slate-400 mb-1.5">
                    <span className="font-mono text-[#E0C57A]">{doc.citationFormat}</span>
                    <span>{doc.pagesCount} {lang === 'en' ? 'Pages' : 'صفحات'}</span>
                  </div>
                  <h3 className="text-sm font-semibold text-white mb-2 font-urdu-ui">
                    {doc.title[lang]}
                  </h3>
                  <p className="text-xs text-slate-300 line-clamp-2 italic font-prose-legal leading-relaxed">
                    “{doc.extractText[lang]}”
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-xs text-[#E0C57A]">
                  <span className="font-urdu-ui">{t.actions.readDocument[lang]}</span>
                  <ExternalLink size={13} />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 7. YouTube Video Evidence Section */}
      {caseItem.videoEvidence && caseItem.videoEvidence.length > 0 && (
        <div className="bg-[#0E1738] border border-slate-800 rounded-xl p-6 sm:p-8 space-y-6 text-left rtl:text-right">
          <div className="flex items-center gap-2.5 border-b border-slate-800 pb-4">
            <Video size={18} className="text-[#C5A85C]" />
            <div>
              <h2 className="text-lg font-bold text-white font-urdu-ui">
                {t.caseDetail.videos[lang]}
              </h2>
            </div>
          </div>

          <div className="space-y-6">
            {caseItem.videoEvidence.map((vid) => (
              <div
                key={vid.id}
                className="grid grid-cols-1 lg:grid-cols-12 gap-6 bg-[#111C3A] border border-slate-800 rounded-lg p-5"
              >
                <div className="lg:col-span-6 rounded overflow-hidden aspect-video bg-black/80 flex items-center justify-center">
                  <iframe
                    src={`https://www.youtube-nocookie.com/embed/${vid.youtubeId}`}
                    title={vid.title[lang]}
                    loading="lazy"
                    allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full border-0"
                  />
                </div>

                <div className="lg:col-span-6 space-y-3">
                  <div className="flex items-center gap-2 text-xs text-slate-400">
                    <span className="text-[#C5A85C] font-mono">{vid.duration}</span>
                    <span>·</span>
                    <span className="font-urdu-ui">{vid.channel}</span>
                    <span>·</span>
                    <span className="font-mono">{vid.recordedDate}</span>
                  </div>

                  <h3 className="text-base font-semibold text-white font-urdu-ui">
                    {vid.title[lang]}
                  </h3>

                  <p className="text-xs text-slate-300 leading-relaxed font-urdu-ui">
                    {vid.verificationNotes[lang]}
                  </p>

                  <div className="pt-2 border-t border-slate-800/80 space-y-1">
                    <div className="text-[11px] font-semibold text-[#E0C57A] uppercase tracking-wider font-urdu-ui">
                      {lang === 'en' ? 'Timestamped Key Takeaways' : 'اہم نکات و اوقات'}
                    </div>
                    <ul className="space-y-1 text-xs text-slate-300">
                      {vid.keyTranscriptPoints.map((pt, idx) => (
                        <li key={idx} className="font-urdu-ui">
                          {pt[lang]}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Archival Photographs & Physical Documentary Evidence */}
      {archivalImages.length > 0 && (
        <div className="bg-[#0E1738] border border-slate-800 rounded-xl p-6 sm:p-8 space-y-6 text-left rtl:text-right">
          <div className="flex items-center gap-2.5 border-b border-slate-800 pb-4">
            <ImageIcon size={18} className="text-[#C5A85C]" />
            <div>
              <h2 className="text-lg font-bold text-white font-urdu-ui">
                {lang === 'en' ? 'Archival Photographs & Preserved Registry Seals' : 'مصدقہ عدالتی مسودات و تصویری دستاویزات'}
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {archivalImages.map((img) => (
              <div
                key={img.id}
                onClick={() => setViewingImage(img)}
                className="bg-[#111C3A] hover:bg-[#162347] border border-slate-800 hover:border-[#C5A85C]/50 rounded-lg overflow-hidden cursor-pointer transition-all flex flex-col justify-between group"
              >
                {img.imageMetadata?.thumbnailUrl && (
                  <div className="relative h-48 bg-black overflow-hidden">
                    <img
                      src={img.imageMetadata.thumbnailUrl}
                      alt={img.imageMetadata.alt[lang]}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-1.5 text-white text-xs font-urdu-ui">
                      <Maximize2 size={16} />
                      <span>{lang === 'en' ? 'Enlarge Archival Image' : 'بڑی تصویر ملاحظہ فرمائیں'}</span>
                    </div>
                  </div>
                )}
                <div className="p-4 space-y-2">
                  <div className="flex items-center justify-between text-xs text-slate-400">
                    <span className="font-mono text-[#E0C57A]">{img.id}</span>
                    <span className="font-urdu-ui">{img.sourcePublisher[lang]}</span>
                  </div>
                  <h3 className="text-sm font-bold text-white font-urdu-ui">
                    {img.title[lang]}
                  </h3>
                  <p className="text-xs text-slate-300 font-urdu-ui line-clamp-2 leading-relaxed">
                    {img.description[lang]}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Forensic Examination & Institutional Reports */}
      {externalReports.length > 0 && (
        <div className="bg-[#0E1738] border border-slate-800 rounded-xl p-6 sm:p-8 space-y-6 text-left rtl:text-right">
          <div className="flex items-center gap-2.5 border-b border-slate-800 pb-4">
            <BookOpen size={18} className="text-[#C5A85C]" />
            <div>
              <h2 className="text-lg font-bold text-white font-urdu-ui">
                {lang === 'en' ? 'Forensic Science & Technical Verification Reports' : 'فارنزک سائنس و تیکنیکی جانچ رپورٹس'}
              </h2>
            </div>
          </div>

          <div className="space-y-4">
            {externalReports.map((rep) => (
              <div
                key={rep.id}
                className="bg-[#111C3A] border border-slate-800 rounded-lg p-5 space-y-3"
              >
                <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-slate-400">
                  <span className="font-mono text-[#E0C57A] font-semibold">{rep.id}</span>
                  <span className="text-slate-300 font-urdu-ui">{rep.sourcePublisher[lang]}</span>
                </div>
                <h3 className="text-base font-bold text-white font-urdu-ui">
                  {rep.title[lang]}
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 font-urdu-ui leading-relaxed">
                  {rep.description[lang]}
                </p>
                {rep.contextNotes && (
                  <div className="p-3 rounded bg-[#091024] text-xs text-slate-300 font-urdu-ui border-l-2 rtl:border-l-0 rtl:border-r-2 border-[#C5A85C]">
                    <span className="text-[#E0C57A] font-semibold block mb-0.5">
                      {lang === 'en' ? 'Forensic Conclusion:' : 'فارنزک رپورٹ کا نتیجہ:'}
                    </span>
                    {rep.contextNotes[lang]}
                  </div>
                )}
                <div className="pt-2 flex items-center justify-between text-xs">
                  <span className="text-slate-400 font-mono">Date: {rep.eventDate || rep.publicationDate}</span>
                  <a
                    href={rep.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[#E0C57A] hover:underline font-urdu-ui"
                  >
                    <span>{lang === 'en' ? 'Official Agency Source' : 'باضابطہ سرکاری ماخذ'}</span>
                    <ExternalLink size={12} />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 8. Related Cases Section */}
      {caseItem.relatedCaseIds && caseItem.relatedCaseIds.length > 0 && onSelectRelatedCase && (
        <div className="bg-[#0E1738] border border-slate-800 rounded-xl p-6 sm:p-7 space-y-4 text-left rtl:text-right">
          <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
            <LinkIcon size={16} className="text-[#C5A85C]" />
            <h2 className="text-base font-bold text-white font-urdu-ui">
              {t.caseDetail.relatedCases[lang]}
            </h2>
          </div>

          <div className="flex flex-wrap gap-2.5">
            {caseItem.relatedCaseIds.map((relId) => (
              <button
                key={relId}
                onClick={() => onSelectRelatedCase(relId)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-[#111C3A] hover:bg-[#172346] border border-slate-700 hover:border-[#C5A85C]/50 text-slate-200 text-xs font-mono transition-colors"
              >
                <span>{relId}</span>
                <ExternalLink size={12} className="text-[#C5A85C]" />
              </button>
            ))}
          </div>
        </div>
      )}

      {/* 9. Editorial Disclaimer Banner */}
      <div className="p-4 sm:p-5 rounded-lg bg-[#111C3A]/60 border border-slate-800 flex items-start gap-3 text-xs text-slate-400 text-left rtl:text-right">
        <AlertTriangle size={18} className="text-[#C5A85C] shrink-0 mt-0.5" />
        <div className="space-y-1">
          <p className="leading-relaxed font-urdu-ui">
            {t.caseDetail.editorialDisclaimer[lang]}
          </p>
          <div className="pt-1">
            <button
              onClick={() => onRequestCorrection(caseItem.id)}
              className="text-[#E0C57A] hover:underline font-medium font-urdu-ui"
            >
              {t.actions.submitCorrection[lang]}
            </button>
          </div>
        </div>
      </div>

      {/* Lightbox Modal for Archival Images */}
      {viewingImage && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#0E1738] border border-slate-700 rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl flex flex-col">
            <div className="p-4 border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ImageIcon size={18} className="text-[#C5A85C]" />
                <h3 className="text-sm font-bold text-white font-urdu-ui">
                  {viewingImage.title[lang]}
                </h3>
              </div>
              <button
                onClick={() => setViewingImage(null)}
                className="p-1 rounded text-slate-400 hover:text-white hover:bg-slate-800"
              >
                <X size={18} />
              </button>
            </div>

            <div className="p-4 bg-black flex items-center justify-center">
              <img
                src={viewingImage.imageMetadata?.largeUrl || viewingImage.sourceUrl}
                alt={viewingImage.imageMetadata?.alt[lang] || viewingImage.title[lang]}
                className="max-h-[60vh] object-contain rounded"
              />
            </div>

            <div className="p-5 space-y-3 bg-[#111C3A]">
              <p className="text-xs sm:text-sm text-slate-200 font-urdu-ui leading-relaxed">
                {viewingImage.description[lang]}
              </p>
              {viewingImage.contextNotes && (
                <div className="p-3 rounded bg-[#091024] text-xs text-slate-300 font-urdu-ui border border-slate-800">
                  <span className="text-[#E0C57A] font-semibold block mb-1">
                    {lang === 'en' ? 'Archival Preservation Note:' : 'آرکائیو وضاحتی نوٹ:'}
                  </span>
                  {viewingImage.contextNotes[lang]}
                </div>
              )}
              <div className="flex flex-wrap items-center justify-between gap-4 pt-2 border-t border-slate-800 text-xs text-slate-400">
                <span className="font-urdu-ui">{viewingImage.sourcePublisher[lang]}</span>
                <span className="font-mono text-slate-300">
                  {viewingImage.imageMetadata?.resolution || '1920x1440 Archival Quality'}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
