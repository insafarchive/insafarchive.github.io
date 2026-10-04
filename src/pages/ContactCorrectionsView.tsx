import React, { useState } from 'react';
import { Language } from '../types';
import { translations } from '../data/translations';
import {
  ShieldAlert,
  Send,
  CheckCircle,
  Mail,
  Scale,
  FileCheck,
  Building,
  HelpCircle,
} from 'lucide-react';

interface ContactCorrectionsViewProps {
  lang: Language;
}

export const ContactCorrectionsView: React.FC<ContactCorrectionsViewProps> = ({
  lang,
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('legal_counsel');
  const [reference, setReference] = useState('');
  const [description, setDescription] = useState('');
  const [evidenceUrl, setEvidenceUrl] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const t = translations;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !description) return;
    setSubmitted(true);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      {/* Header */}
      <div className="border-b border-slate-800 pb-6 text-center sm:text-left rtl:sm:text-right">
        <div className="text-xs font-semibold text-[#C5A85C] uppercase tracking-wider mb-1 font-urdu-ui">
          {lang === 'en' ? 'Editorial Integrity & Right of Reply' : 'ادارتی دیانت و حقِ وضاحت'}
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-white font-legal-display font-urdu-ui">
          {t.correctionsPage.title[lang]}
        </h1>
        <p className="text-xs sm:text-sm text-slate-300 mt-2 max-w-2xl leading-relaxed font-urdu-ui">
          {t.correctionsPage.subtitle[lang]}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        {/* Left Column: Guidelines & Contact Channels */}
        <div className="md:col-span-5 space-y-6 text-left rtl:text-right">
          <div className="p-5 rounded-xl bg-[#0E1738] border border-slate-800 space-y-3">
            <div className="flex items-center gap-2 text-[#E0C57A] font-semibold text-sm font-urdu-ui">
              <Scale size={18} />
              <span>{lang === 'en' ? 'Standards for Review' : 'جائزے کے قواعد'}</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed font-urdu-ui">
              {lang === 'en'
                ? 'Insaf Archive processes requests within 48 business hours. Please attach or cite certified court copies, order sheets, or official gazette notifications.'
                : 'انصاف آرکائیو 48 گھنٹوں میں موصولہ درخواستی مواد کا جائزہ لیتا ہے۔ براہ کرم مصدقہ عدالتی نقل یا باضابطہ قانونی حوالہ منسلک فرمائیں۔'}
            </p>
          </div>

          <div className="p-5 rounded-xl bg-[#0E1738] border border-slate-800 space-y-3">
            <div className="flex items-center gap-2 text-[#E0C57A] font-semibold text-sm font-urdu-ui">
              <Mail size={18} />
              <span>{lang === 'en' ? 'Editorial Office' : 'ادارتی رابطہ'}</span>
            </div>
            <div className="space-y-1 text-xs text-slate-300">
              <div className="font-urdu-ui">
                <span className="text-slate-400">{lang === 'en' ? 'Email:' : 'ای میل:'} </span>
                <span className="text-[#E0C57A] font-mono">editorial@insafarchive.org</span>
              </div>
              <div className="font-urdu-ui">
                <span className="text-slate-400">{lang === 'en' ? 'GitHub:' : 'گٹ ہب:'} </span>
                <a
                  href="https://github.com/insafarchive"
                  target="_blank"
                  rel="noreferrer"
                  className="text-slate-300 hover:text-white underline font-mono"
                >
                  github.com/insafarchive
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Submission Form */}
        <div className="md:col-span-7 bg-[#0E1738] border border-slate-800 rounded-xl p-6 sm:p-8">
          {submitted ? (
            <div className="py-12 text-center space-y-4">
              <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                <CheckCircle size={28} />
              </div>
              <h3 className="text-lg font-bold text-white font-urdu-ui">
                {lang === 'en' ? 'Request Recorded Successfully' : 'درخواست کامیابی سے درج ہو گئی'}
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto leading-relaxed font-urdu-ui">
                {t.correctionsPage.successMessage[lang]}
              </p>
              <div className="pt-4">
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-5 py-2 bg-[#C5A85C] text-[#0B132B] font-semibold text-xs rounded hover:bg-[#E0C57A] transition-colors font-urdu-ui"
                >
                  {lang === 'en' ? 'Submit Another Note' : 'ایک اور درخواست جمع کروائیں'}
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs text-left rtl:text-right">
              <h2 className="text-base font-semibold text-white mb-2 font-urdu-ui">
                {t.correctionsPage.formTitle[lang]}
              </h2>

              <div>
                <label className="block text-slate-300 font-medium mb-1 font-urdu-ui">
                  {t.correctionsPage.applicantName[lang]} *
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={lang === 'en' ? 'Advocate / Citizen Full Name' : 'سائل / وکیل کا نام'}
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
                  placeholder="advocate@chambers.pk"
                  className="w-full bg-[#111C3A] border border-slate-700 rounded px-3 py-2 text-white focus:outline-none focus:border-[#C5A85C]"
                />
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
                      ? 'Specify the exact record, date, order sheet, or statement requiring factual rectification...'
                      : 'نشاندہی کردہ غلطی یا عدالتی حکم نامے کی تفصیل بیان کریں...'
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
                  placeholder="URL to certified copy, gazette notice, or law journal citation..."
                  className="w-full bg-[#111C3A] border border-slate-700 rounded px-3 py-2 text-white focus:outline-none focus:border-[#C5A85C]"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded bg-[#C5A85C] text-[#0B132B] font-semibold hover:bg-[#E0C57A] transition-colors font-urdu-ui text-xs"
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
