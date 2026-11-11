import React from 'react';
import { ScalesLogo } from './ScalesLogo';
import { Language } from '../types';
import { translations } from '../data/translations';
import { ShieldCheck, Scale, ExternalLink, GitBranch, AlertCircle, ShieldAlert } from 'lucide-react';

interface FooterProps {
  lang: Language;
  onNavigate: (page: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ lang, onNavigate }) => {
  const t = translations;

  return (
    <footer className="bg-[#070D1E] text-slate-300 border-t border-[#C5A85C]/20 mt-20">
      {/* Top Advisory Banner */}
      <div className="border-b border-slate-800/80 bg-[#091024]/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-slate-400">
            <div className="flex items-center gap-2">
              <ShieldCheck size={16} className="text-[#C5A85C] shrink-0" />
              <span className="font-urdu-ui">
                {lang === 'en'
                  ? 'All records cite certified court sheets, law reports (SCMR/PLD/PCrLJ), or verified institutional sources.'
                  : 'تمام عدالتی ریکارڈز مصدقہ آرڈر شیٹس، لا رپورٹس (SCMR/PLD) یا باضابطہ ذرائع سے تصدیق شدہ ہیں۔'}
              </span>
            </div>
            <button
              onClick={() => onNavigate('corrections')}
              className="inline-flex items-center gap-1.5 text-[#E0C57A] hover:underline font-medium font-urdu-ui"
            >
              <span>{t.actions.submitCorrection[lang]}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 lg:gap-12">
          {/* Col 1: Identity & Purpose */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="p-1.5 rounded bg-[#111C3A] border border-[#C5A85C]/30 text-[#C5A85C]">
                <ScalesLogo size={20} />
              </div>
              <span className="text-lg font-semibold text-white font-legal-display">
                {t.brandName[lang]}
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed max-w-lg">
              {t.brandShortDesc[lang]}
            </p>
            <div className="p-3 rounded bg-[#111C3A]/60 border border-slate-800 text-xs text-slate-400 space-y-1">
              <div className="flex items-center gap-1.5 text-slate-300 font-medium font-urdu-ui">
                <AlertCircle size={14} className="text-[#C5A85C]" />
                <span>
                  {lang === 'en' ? 'Evidentiary Standard' : 'دستاویزی و ثبوتی اصول'}
                </span>
              </div>
              <p className="leading-relaxed">
                {lang === 'en'
                  ? 'The platform distinguishes allegations from verified facts and judicial findings. Bail orders are not acquittals.'
                  : 'یہ پلیٹ فارم الزامات کو ثابت شدہ حقائق اور حتمی فیصلوں سے واضح الگ رکھتا ہے۔ ضمانت بریت کا پروانہ نہیں ہوتی۔'}
              </p>
            </div>
          </div>

          {/* Col 2: Archive Departments */}
          <div>
            <h4 className="text-xs font-semibold text-[#E0C57A] tracking-wider uppercase mb-4 font-urdu-ui">
              {lang === 'en' ? 'Archive Repositories' : 'آرکائیو کے شعبہ جات'}
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-300">
              <li>
                <button
                  onClick={() => onNavigate('cases')}
                  className="hover:text-white transition-colors font-urdu-ui"
                >
                  {t.nav.cases[lang]}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('judgments')}
                  className="hover:text-white transition-colors font-urdu-ui"
                >
                  {t.nav.judgments[lang]}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('reports')}
                  className="hover:text-white transition-colors font-urdu-ui"
                >
                  {t.nav.reports[lang]}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('videos')}
                  className="hover:text-white transition-colors font-urdu-ui"
                >
                  {t.nav.videos[lang]}
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Principles & Integrity */}
          <div>
            <h4 className="text-xs font-semibold text-[#E0C57A] tracking-wider uppercase mb-4 font-urdu-ui">
              {lang === 'en' ? 'Institutional Standards' : 'ادارتی اصول و شفافیت'}
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-300">
              <li>
                <button
                  onClick={() => onNavigate('contribute')}
                  className="hover:text-white transition-colors font-urdu-ui text-[#E0C57A] font-medium"
                >
                  {t.nav.contribute[lang]}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('methodology')}
                  className="hover:text-white transition-colors font-urdu-ui"
                >
                  {t.nav.methodology[lang]}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('corrections')}
                  className="hover:text-white transition-colors font-urdu-ui"
                >
                  {t.nav.corrections[lang]}
                </button>
              </li>
              <li>
                <a
                  href="https://github.com/insafarchive"
                  target="_blank"
                  rel="noreferrer noopener"
                  className="inline-flex items-center gap-1.5 hover:text-white transition-colors"
                >
                  <GitBranch size={13} className="text-[#C5A85C]" />
                  <span>GitHub Repository</span>
                  <ExternalLink size={11} className="text-slate-500" />
                </a>
              </li>
              <li className="pt-2 border-t border-slate-800/60">
                <button
                  onClick={() => onNavigate('admin')}
                  className="hover:text-amber-300 text-slate-400 text-xs transition-colors font-urdu-ui inline-flex items-center gap-1.5"
                  title={lang === 'en' ? 'Administrative Workspace & Publication Staging' : 'انتظامی ورک اسپیس و اشاعت کی تیاری'}
                >
                  <ShieldAlert size={12} className="text-amber-400/80" />
                  <span>{lang === 'en' ? 'Admin Workspace' : 'ایڈمن ورک اسپیس'}</span>
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Legal Notice */}
        <div className="mt-12 pt-6 border-t border-slate-800/80 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-[11px] text-slate-400">
          <p className="max-w-2xl leading-relaxed">
            {t.footer.legalDisclaimer[lang]}
          </p>
          <div className="text-slate-400 shrink-0 font-urdu-ui">
            © {new Date().getFullYear()} Insaf Archive. {t.footer.rights[lang]}
          </div>
        </div>
      </div>
    </footer>
  );
};
