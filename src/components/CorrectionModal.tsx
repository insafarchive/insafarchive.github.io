import React, { useState, useEffect } from 'react';
import { X, CheckCircle, ShieldAlert, Send } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../data/translations';

interface CorrectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
  defaultCaseRef?: string;
}

export const CorrectionModal: React.FC<CorrectionModalProps> = ({
  isOpen,
  onClose,
  lang,
  defaultCaseRef = '',
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('legal_counsel');
  const [reference, setReference] = useState(defaultCaseRef);
  const [description, setDescription] = useState('');
  const [evidenceUrl, setEvidenceUrl] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const t = translations;

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        handleResetAndClose();
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !description) return;
    setSubmitted(true);
  };

  const handleResetAndClose = () => {
    setSubmitted(false);
    setName('');
    setEmail('');
    setDescription('');
    setEvidenceUrl('');
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs"
      onClick={handleResetAndClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="correction-modal-title"
    >
      <div
        className="w-full max-w-2xl bg-[#0E1738] border border-[#C5A85C]/40 rounded-xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-[#111C3A]">
          <div className="flex items-center gap-2">
            <ShieldAlert size={18} className="text-[#C5A85C]" />
            <h3 id="correction-modal-title" className="text-base font-semibold text-white font-urdu-ui">
              {t.correctionsPage.formTitle[lang]}
            </h3>
          </div>
          <button
            onClick={handleResetAndClose}
            className="p-1.5 text-slate-400 hover:text-white rounded"
            aria-label="Close"
          >
            <X size={18} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto flex-1">
          {submitted ? (
            <div className="py-8 text-center space-y-4">
              <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                <CheckCircle size={28} />
              </div>
              <h4 className="text-lg font-semibold text-white font-urdu-ui">
                {lang === 'en' ? 'Submission Received' : 'درخواست کامیابی سے موصول ہو گئی'}
              </h4>
              <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto leading-relaxed font-urdu-ui">
                {t.correctionsPage.successMessage[lang]}
              </p>
              <div className="pt-4">
                <button
                  onClick={handleResetAndClose}
                  className="px-6 py-2 bg-[#C5A85C] text-[#0B132B] font-semibold text-xs rounded hover:bg-[#E0C57A] transition-colors font-urdu-ui"
                >
                  {t.actions.close[lang]}
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="p-3 rounded bg-[#111C3A]/70 border border-slate-800 text-slate-300 leading-relaxed font-urdu-ui">
                {lang === 'en'
                  ? 'Insaf Archive maintains strict non-partisan archival fidelity. If you identify a factual discrepancy, missing order sheet, or updated milestone, provide the certified reference below.'
                  : 'انصاف آرکائیو مکمل غیر جانبداری کے ساتھ کام کرتا ہے۔ اگر آپ کسی غلطی کی نشاندہی کرنا چاہتے ہیں یا کوئی نیا عدالتی حکم نامہ فراہم کرنا چاہتے ہیں تو ذیل میں تفصیلات درج فرمائیں۔'}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-300 font-medium mb-1 font-urdu-ui">
                    {t.correctionsPage.applicantName[lang]} *
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder={lang === 'en' ? 'Advocate / Citizen Name' : 'نام وکیل یا سائل'}
                    className="w-full bg-[#111C3A] border border-slate-700 rounded px-3 py-2 text-white focus:outline-none focus:border-[#C5A85C] font-urdu-ui"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-medium mb-1 font-urdu-ui">
                    {t.correctionsPage.applicantEmail[lang]} *
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@lawchamber.pk"
                    className="w-full bg-[#111C3A] border border-slate-700 rounded px-3 py-2 text-white focus:outline-none focus:border-[#C5A85C]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-300 font-medium mb-1 font-urdu-ui">
                    {t.correctionsPage.applicantRole[lang]}
                  </label>
                  <select
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="w-full bg-[#111C3A] border border-slate-700 rounded px-3 py-2 text-white focus:outline-none focus:border-[#C5A85C] font-urdu-ui"
                  >
                    <option value="legal_counsel">
                      {lang === 'en' ? 'Legal Counsel / Advocate' : 'وکیلِ صفائی / قانونی نمائندہ'}
                    </option>
                    <option value="party_to_case">
                      {lang === 'en' ? 'Party to the Petition' : 'مقدمے کا فریق / درخواست گزار'}
                    </option>
                    <option value="journalist">
                      {lang === 'en' ? 'Accredited Journalist' : 'صحافی / عدالتی رپورٹر'}
                    </option>
                    <option value="researcher">
                      {lang === 'en' ? 'Legal Scholar / Researcher' : 'قانونی محقق / طالب علم'}
                    </option>
                    <option value="public_citizen">
                      {lang === 'en' ? 'Public Citizen' : 'عام شہری'}
                    </option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-300 font-medium mb-1 font-urdu-ui">
                    {t.correctionsPage.caseReference[lang]}
                  </label>
                  <input
                    type="text"
                    value={reference}
                    onChange={(e) => setReference(e.target.value)}
                    placeholder="e.g. Const. P. 102/2024"
                    className="w-full bg-[#111C3A] border border-slate-700 rounded px-3 py-2 text-white focus:outline-none focus:border-[#C5A85C]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1 font-urdu-ui">
                  {t.correctionsPage.description[lang]} *
                </label>
                <textarea
                  required
                  rows={4}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder={
                    lang === 'en'
                      ? 'Describe the factual inaccuracy or provide details of the subsequent court order...'
                      : 'نشاندہی کردہ غلطی یا بعد میں جاری ہونے والے نئے عدالتی حکم کی تفصیل بیان کیجیے...'
                  }
                  className="w-full bg-[#111C3A] border border-slate-700 rounded px-3 py-2 text-white focus:outline-none focus:border-[#C5A85C] font-urdu-ui"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1 font-urdu-ui">
                  {t.correctionsPage.supportingEvidence[lang]}
                </label>
                <input
                  type="text"
                  value={evidenceUrl}
                  onChange={(e) => setEvidenceUrl(e.target.value)}
                  placeholder="URL to certified copy or official gazette citation..."
                  className="w-full bg-[#111C3A] border border-slate-700 rounded px-3 py-2 text-white focus:outline-none focus:border-[#C5A85C]"
                />
              </div>

              <div className="pt-2 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={handleResetAndClose}
                  className="px-4 py-2 rounded bg-slate-800 text-slate-300 hover:text-white font-urdu-ui"
                >
                  {t.actions.close[lang]}
                </button>
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 px-5 py-2 rounded bg-[#C5A85C] text-[#0B132B] font-semibold hover:bg-[#E0C57A] transition-colors font-urdu-ui"
                >
                  <Send size={14} />
                  <span>{t.correctionsPage.submitButton[lang]}</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
