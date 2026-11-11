import React, { useState } from 'react';
import { Language, CaseRecord, ValidationResult } from '../types';
import { translations } from '../data/translations';
import { validateBatch } from '../utils/validator';
import {
  ShieldAlert,
  CheckCircle2,
  AlertTriangle,
  Upload,
  Download,
  Database,
  FileCode,
  Copy,
  Check,
  RefreshCw,
} from 'lucide-react';

interface DataValidatorViewProps {
  existingCases: CaseRecord[];
  lang: Language;
  onMergeRecords: (newRecords: CaseRecord[]) => void;
}

export const DataValidatorView: React.FC<DataValidatorViewProps> = ({
  existingCases,
  lang,
  onMergeRecords,
}) => {
  const [jsonInput, setJsonInput] = useState('');
  const [validationResult, setValidationResult] = useState<ValidationResult | null>(null);
  const [parsedRecords, setParsedRecords] = useState<CaseRecord[]>([]);
  const [mergeSuccess, setMergeSuccess] = useState(false);
  const [copied, setCopied] = useState(false);

  const t = translations;

  const sampleBatchRecord: Partial<CaseRecord>[] = [
    {
      id: 'PK-LHC-2024-0512',
      slug: 'minority-worship-place-protective-injunction-sheikhupura',
      caseNumber: 'Writ Petition No. 512/2024',
      title: {
        en: 'Community Elders v. Local Administration & Police (Protection of Sacred Site)',
        ur: 'کمیونٹی عمائدین بنام ضلعی انتظامیہ و پولیس (مقدس مقام کا تحفظ)',
      },
      summary: {
        en: 'Constitutional writ petition seeking deployment of law enforcement personnel to safeguard minority place of worship under Article 20.',
        ur: 'آئین کے آرٹیکل 20 کے تحت اقلیتی عبادت گاہ کے تحفظ اور پولیس نفری تعینات کرنے کی آئینی رٹ۔',
      },
      factualBackground: {
        en: 'Following security concerns reported by local congregation elders in Sheikhupura, an application was moved for perimeter security pursuant to the Supreme Court 2014 landmark judgment on minority rights (PLD 2014 SC 699).',
        ur: 'شیخوپورہ میں عبادت گاہ کو لاحق سیکیورٹی خدشات کے پیشِ نظر سپریم کورٹ کے اقلیتی حقوق کے فیصلے کی روشنی میں ہائی کورٹ سے رجوع کیا گیا۔',
      },
      recordType: 'court_case',
      categories: ['human_rights', 'court_judgments', 'public_interest_political'],
      location: {
        province: 'punjab',
        district: 'Sheikhupura',
        city: 'Sheikhupura',
      },
      incidentDate: '2024-04-02',
      filingDate: '2024-04-05',
      court: {
        en: 'Lahore High Court, Principal Seat',
        ur: 'لاہور ہائی کورٹ، پرنسپل سیٹ',
      },
      courtLevel: 'high_court',
      statutoryProvisions: [
        'Constitution of Pakistan, 1973: Article 20 (Freedom to Profess Religion)',
        'Supreme Court Guidelines: PLD 2014 SC 699',
      ],
      parties: [
        {
          id: 'pty-sample-01',
          name: { en: 'Church & Minority Elders Committee', ur: 'کمیٹی برائے اقلیتی عمائدین' },
          role: 'petitioner',
        },
        {
          id: 'pty-sample-02',
          name: { en: 'District Police Officer Sheikhupura & Home Department', ur: 'ڈی پی او شیخوپورہ و محکمہ داخلہ' },
          role: 'respondent',
        },
      ],
      proceduralStatus: 'disposed_of',
      proceduralStatusNotes: {
        en: 'High Court directed continuous perimeter patrol and focal officer liaison.',
        ur: 'ہائی کورٹ نے مستقل گشت اور فوکل پرسن کی تعیناتی کا حکم دیا۔',
      },
      timeline: [
        {
          id: 'tm-sample-01',
          date: '2024-04-05',
          event: { en: 'Petition instituted', ur: 'رٹ پٹیشن دائر' },
          proceduralOutcome: { en: 'Protective directives issued', ur: 'حفاظتی احکامات جاری' },
          statusEffect: 'disposed_of',
        },
      ],
      evidenceItems: [],
      connectedDocuments: [],
      videoEvidence: [],
      sources: [],
      lastUpdated: '2024-04-10',
      editorialReviewStatus: 'corroborated_reporting',
      incompleteNotice: false,
      unverifiedNotice: false,
      relatedCaseIds: [],
      tags: ['Minority Rights', 'Article 20', 'Sheikhupura', 'Lahore High Court'],
      isDemonstrationData: true,
    },
  ];

  const handleLoadSample = () => {
    setJsonInput(JSON.stringify(sampleBatchRecord, null, 2));
    setValidationResult(null);
    setMergeSuccess(false);
  };

  const handleValidate = () => {
    setMergeSuccess(false);
    if (!jsonInput.trim()) {
      setValidationResult({
        valid: false,
        errors: ['Please paste or load a valid JSON array into the input area.'],
        warnings: [],
        recordCount: 0,
        duplicateIds: [],
      });
      return;
    }

    try {
      const parsed = JSON.parse(jsonInput);
      if (!Array.isArray(parsed)) {
        setValidationResult({
          valid: false,
          errors: ['JSON root element must be an Array `[ { ... } ]` of case records.'],
          warnings: [],
          recordCount: 0,
          duplicateIds: [],
        });
        return;
      }

      const existingIds = new Set(existingCases.map((c) => c.id));
      const res = validateBatch(parsed, existingIds);
      setValidationResult(res);
      setParsedRecords(parsed as CaseRecord[]);
    } catch (err: any) {
      setValidationResult({
        valid: false,
        errors: [`JSON Syntax Error: ${err?.message || 'Invalid JSON syntax.'}`],
        warnings: [],
        recordCount: 0,
        duplicateIds: [],
      });
    }
  };

  const handleMerge = () => {
    if (!validationResult || !validationResult.valid || parsedRecords.length === 0) return;
    onMergeRecords(parsedRecords);
    setMergeSuccess(true);
  };

  const handleExport = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(jsonInput);
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `insaf_archive_validated_batch_${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      {/* Header */}
      <div className="border-b border-slate-800 pb-6 text-left rtl:text-right">
        <div className="text-xs font-semibold text-[#C5A85C] uppercase tracking-wider mb-1 font-urdu-ui">
          {lang === 'en' ? 'Archival Workflow & Quality Control' : 'ادارتی کوالٹی کنٹرول و ڈیٹا امپورٹ'}
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-white font-legal-display font-urdu-ui">
          {t.validator.title[lang]}
        </h1>
        <p className="text-xs sm:text-sm text-slate-300 mt-2 max-w-3xl leading-relaxed font-urdu-ui">
          {t.validator.subtitle[lang]}
        </p>
      </div>

      {/* Editor & Control Ribbon */}
      <div className="bg-[#0E1738] border border-slate-800 rounded-xl p-6 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <label className="text-sm font-semibold text-white font-urdu-ui">
            {t.validator.inputLabel[lang]}
          </label>

          <div className="flex items-center gap-2">
            <button
              onClick={handleLoadSample}
              className="px-3 py-1.5 text-xs rounded bg-[#172346] hover:bg-[#1E2D5A] text-[#E0C57A] border border-[#C5A85C]/30 transition-colors font-urdu-ui"
            >
              {t.validator.loadSampleButton[lang]}
            </button>
            <button
              onClick={() => {
                setJsonInput('');
                setValidationResult(null);
                setMergeSuccess(false);
              }}
              className="px-3 py-1.5 text-xs rounded bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors font-urdu-ui"
            >
              {lang === 'en' ? 'Clear' : 'صاف کریں'}
            </button>
          </div>
        </div>

        {/* Textarea Input */}
        <textarea
          rows={12}
          value={jsonInput}
          onChange={(e) => {
            setJsonInput(e.target.value);
            setMergeSuccess(false);
          }}
          placeholder="[ { &quot;id&quot;: &quot;PK-LHC-2024-0512&quot;, &quot;slug&quot;: &quot;...&quot;, &quot;title&quot;: { &quot;en&quot;: &quot;...&quot;, &quot;ur&quot;: &quot;...&quot; }, ... } ]"
          className="w-full bg-[#091024] border border-slate-700 rounded-lg p-4 font-mono text-xs text-slate-200 focus:outline-none focus:border-[#C5A85C] leading-relaxed resize-y"
        />

        {/* Actions Row */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
          <div className="flex items-center gap-3">
            <button
              onClick={handleValidate}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded bg-[#C5A85C] hover:bg-[#E0C57A] text-[#0B132B] font-semibold text-xs transition-colors font-urdu-ui"
            >
              <CheckCircle2 size={16} />
              <span>{t.validator.validateButton[lang]}</span>
            </button>

            {validationResult?.valid && (
              <button
                onClick={handleMerge}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs transition-colors font-urdu-ui"
              >
                <Database size={16} />
                <span>{t.validator.mergeButton[lang]}</span>
              </button>
            )}
          </div>

          {jsonInput && (
            <button
              onClick={handleExport}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-[#111C3A] hover:bg-[#172346] border border-slate-700 text-slate-300 text-xs font-urdu-ui"
            >
              <Download size={14} />
              <span>{t.validator.exportButton[lang]}</span>
            </button>
          )}
        </div>
      </div>

      {/* Success Notification */}
      {mergeSuccess && (
        <div className="p-4 rounded-xl bg-emerald-950/80 border border-emerald-500/40 text-emerald-200 flex items-center gap-3 text-xs font-urdu-ui">
          <CheckCircle2 size={20} className="shrink-0 text-emerald-400" />
          <span>{t.validator.mergeSuccess[lang]}</span>
        </div>
      )}

      {/* Validation Results Diagnostic Box */}
      {validationResult && (
        <div
          className={`border rounded-xl p-6 sm:p-7 space-y-4 text-left rtl:text-right ${
            validationResult.valid
              ? 'bg-emerald-950/30 border-emerald-500/30'
              : 'bg-rose-950/30 border-rose-500/30'
          }`}
        >
          <div className="flex items-center gap-2.5">
            {validationResult.valid ? (
              <CheckCircle2 size={22} className="text-emerald-400" />
            ) : (
              <AlertTriangle size={22} className="text-rose-400" />
            )}
            <h3 className="text-base font-bold text-white font-urdu-ui">
              {validationResult.valid
                ? t.validator.batchValid[lang]
                : t.validator.batchInvalid[lang]}
            </h3>
          </div>

          <div className="text-xs text-slate-300 flex flex-wrap gap-4 font-mono">
            <span>
              {t.validator.recordsParsed[lang]}: <strong>{validationResult.recordCount}</strong>
            </span>
            <span>
              {t.validator.errorsFound[lang]}: <strong>{validationResult.errors.length}</strong>
            </span>
            <span>
              {t.validator.warningsFound[lang]}: <strong>{validationResult.warnings.length}</strong>
            </span>
          </div>

          {/* Errors List */}
          {validationResult.errors.length > 0 && (
            <div className="p-4 rounded bg-black/40 border border-rose-500/40 space-y-1.5">
              <h4 className="text-xs font-bold text-rose-300 uppercase tracking-wider font-urdu-ui">
                {t.validator.errorsFound[lang]} ({validationResult.errors.length})
              </h4>
              <ul className="space-y-1 text-xs text-rose-200 list-disc list-inside font-mono">
                {validationResult.errors.map((err, idx) => (
                  <li key={idx}>{err}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Warnings List */}
          {validationResult.warnings.length > 0 && (
            <div className="p-4 rounded bg-black/40 border border-amber-500/40 space-y-1.5">
              <h4 className="text-xs font-bold text-amber-300 uppercase tracking-wider font-urdu-ui">
                {t.validator.warningsFound[lang]} ({validationResult.warnings.length})
              </h4>
              <ul className="space-y-1 text-xs text-amber-200 list-disc list-inside font-mono">
                {validationResult.warnings.map((warn, idx) => (
                  <li key={idx}>{warn}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Preview of Valid Records */}
          {validationResult.valid && parsedRecords.length > 0 && (
            <div className="pt-2 border-t border-slate-800 space-y-2">
              <h4 className="text-xs font-semibold text-white font-urdu-ui">
                {lang === 'en' ? 'Preview Validated Records:' : 'مصدقہ ریکارڈز کا جائزہ:'}
              </h4>
              <div className="space-y-2">
                {parsedRecords.map((r) => (
                  <div key={r.id} className="p-3 bg-[#111C3A] rounded border border-slate-800 text-xs">
                    <div className="flex items-center justify-between text-[#E0C57A] font-mono">
                      <span>{r.id}</span>
                      <span>{r.caseNumber}</span>
                    </div>
                    <div className="text-white font-medium font-urdu-ui mt-1">
                      {r.title[lang]}
                    </div>
                    <div className="text-slate-400 font-urdu-ui mt-0.5 line-clamp-1">
                      {r.summary[lang]}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
