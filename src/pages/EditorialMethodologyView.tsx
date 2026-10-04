import React from 'react';
import { Language } from '../types';
import { translations } from '../data/translations';
import { ScalesLogo } from '../components/ScalesLogo';
import {
  ShieldCheck,
  Scale,
  FileCheck2,
  Lock,
  RotateCcw,
  AlertTriangle,
  EyeOff,
  BookOpen,
} from 'lucide-react';

interface EditorialMethodologyViewProps {
  lang: Language;
  onNavigate: (page: string) => void;
}

export const EditorialMethodologyView: React.FC<EditorialMethodologyViewProps> = ({
  lang,
  onNavigate,
}) => {
  const t = translations;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      {/* Header */}
      <div className="border-b border-slate-800 pb-6 text-center sm:text-left rtl:sm:text-right">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#111C3A] border border-[#C5A85C]/30 text-[#E0C57A] text-xs font-medium tracking-wider mb-3">
          <ScalesLogo size={14} />
          <span className="font-urdu-ui">{lang === 'en' ? 'Institutional Charter' : 'ادارتی منشور'}</span>
        </div>
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white font-legal-display font-urdu-ui">
          {t.methodologyPage.title[lang]}
        </h1>
        <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed font-urdu-ui">
          {t.methodologyPage.subtitle[lang]}
        </p>
      </div>

      {/* Institutional Presumption of Innocence & Inclusion Disclaimer */}
      <section className="bg-[#111C3A] border-2 border-[#C5A85C]/40 rounded-xl p-6 sm:p-8 space-y-4 text-left rtl:text-right shadow-lg">
        <div className="flex items-center gap-3 text-[#E0C57A]">
          <ShieldCheck size={26} className="text-[#C5A85C] shrink-0" />
          <h2 className="text-lg sm:text-xl font-bold text-white font-urdu-ui">
            {lang === 'en'
              ? 'Institutional Mandate: Inclusion is Not a Finding of Guilt'
              : 'ادارتی منشور: آرکائیو میں اندراج جرم یا بے گناہی کا ثبوت نہیں'}
          </h2>
        </div>
        <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-urdu-ui">
          {lang === 'en'
            ? 'Inclusion of any individual, organization, public official, or proceeding within the Insaf Archive does not, by itself, constitute an imputation or judicial finding of guilt, innocence, or statutory misconduct. Under Article 10-A (Right to Fair Trial) of the Constitution of the Islamic Republic of Pakistan, 1973, every person accused of an offense is presumed innocent unless and until proven guilty beyond reasonable doubt by a court of competent jurisdiction upon concluded trial.'
            : 'انصاف آرکائیو میں کسی بھی فرد، ادارے، عوامی عہدیدار یا مقدمے کے اندراج کا ہرگز یہ مطلب نہیں کہ وہ مجرم ہے، بے قصور ہے، یا اس نے کوئی خلاف ورزی کی ہے۔ آئینِ پاکستان، 1973 کے آرٹیکل 10-A (منصفانہ ٹرائل کا بنیادی حق) کے مطابق ہر ملزم تب تک بے گناہ تصور کیا جاتا ہے جب تک مجاز عدالت مکمل ٹرائل کے بعد جرم ثابت نہ کر دے۔'}
        </p>
        <div className="p-3.5 bg-[#0B132B]/80 rounded border border-[#C5A85C]/20 text-xs text-amber-200/90 leading-relaxed font-urdu-ui">
          {lang === 'en'
            ? 'The archive exists solely for public legal literacy, constitutional research, and evidentiary preservation. It does not independently authenticate, certify, or issue primary court records; it aggregates publicly accessible judicial order sheets, certified transcripts, statutory law journals (SCMR, PLD, CLD, PCrLJ), and authorized open-court broadcasts with institutional source citations.'
            : 'یہ آرکائیو صرف عوامی قانونی آگاہی، آئینی تحقیق اور دستاویزی شواہد کے تحفظ کے لیے کام کرتا ہے۔ آرکائیو خود کوئی عدالتی ڈگری یا تصدیقی سرٹیفکیٹ جاری نہیں کرتا، بلکہ باضابطہ طور پر دستیاب آرڈر شیٹس، مصدقہ نقول، قانونی جرائد (SCMR، PLD) اور کھلی عدالت کی سرکاری نشریات کو حوالہ جات کے ساتھ پیش کرتا ہے۔'}
        </div>
      </section>

      {/* Principle 1: Comprehensive 9-Tier Claim-Distinction Doctrine */}
      <section className="bg-[#0E1738] border border-slate-800 rounded-xl p-6 sm:p-8 space-y-4 text-left rtl:text-right">
        <div className="flex items-center gap-3 text-[#E0C57A]">
          <Scale size={22} />
          <h2 className="text-lg sm:text-xl font-bold text-white font-urdu-ui">
            {lang === 'en'
              ? '1. The 9-Tier Legal & Evidentiary Separation Doctrine'
              : '1. شواہد و قانونی حیثیت کی 9 سطحی تفریق کا اصول'}
          </h2>
        </div>

        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-urdu-ui">
          {lang === 'en'
            ? 'A grave hazard in public reporting of legal proceedings is the conflation of unproven complaints with judicial truth. Insaf Archive rigorously categorizes each record and statement under 9 distinct legal stages:'
            : 'قانونی کارروائی کی رپورٹنگ میں سنگین خطرہ یہ ہوتا ہے کہ ابتدائی شکایت یا دعوے کو ہی عدالتی سچ سمجھ لیا جائے۔ ہمارا آرکائیو ہر بیان اور ریکارڈ کو 9 واضح قانونی درجات میں تقسیم کرتا ہے:'}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
          {/* Tier 1 */}
          <div className="p-4 rounded bg-[#111C3A] border border-amber-900/40 space-y-1.5">
            <h3 className="text-xs font-bold text-amber-300 font-urdu-ui uppercase tracking-wider">
              {lang === 'en' ? 'A. Allegations & FIRs' : 'الف۔ ابتدائی الزامات و ایف آئی آر'}
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed font-urdu-ui">
              {lang === 'en'
                ? 'Unproven claims originating from private complainants or prosecuting agencies. Lacks evidentiary cross-examination.'
                : 'مدعی یا استغاثہ کے ابتدائی دعوے۔ جب تک عدالت میں جرح اور ثبوت نہ ہوں، یہ محض غیر ثابت شدہ دعوے رہتے ہیں۔'}
            </p>
          </div>

          {/* Tier 2 */}
          <div className="p-4 rounded bg-[#111C3A] border border-amber-700/30 space-y-1.5">
            <h3 className="text-xs font-bold text-amber-200 font-urdu-ui uppercase tracking-wider">
              {lang === 'en' ? 'B. Party & Defense Statements' : 'ب۔ فریقین و وکلاء کے بیانات'}
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed font-urdu-ui">
              {lang === 'en'
                ? 'Written replies, bail petitions, and affidavits submitted under oath by parties or their legal counsel.'
                : 'فریقین، وکلاء یا تفتیشی افسران کے حلفیہ بیانات، جواب دعوے اور ضمانت کی درخواستیں جو فریق کا مؤقف بیان کرتے ہیں۔'}
            </p>
          </div>

          {/* Tier 3 */}
          <div className="p-4 rounded bg-[#111C3A] border border-blue-900/40 space-y-1.5">
            <h3 className="text-xs font-bold text-blue-300 font-urdu-ui uppercase tracking-wider">
              {lang === 'en' ? 'C. Media & Journalist Reports' : 'ج۔ میڈیا و صحافتی رپورٹنگ'}
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed font-urdu-ui">
              {lang === 'en'
                ? 'Third-party coverage, courtroom dispatches, or press briefings. Subject to independent corroboration audit.'
                : 'صحافتی رپورٹیں، کورٹ روم کوریج یا پریس کانفرنسز جن کی آزادانہ قانونی توثیق ضروری ہوتی ہے۔'}
            </p>
          </div>

          {/* Tier 4 */}
          <div className="p-4 rounded bg-[#111C3A] border border-sky-900/40 space-y-1.5">
            <h3 className="text-xs font-bold text-sky-300 font-urdu-ui uppercase tracking-wider">
              {lang === 'en' ? 'D. Interim Orders & Directives' : 'د۔ عبوری احکامات و ریمانڈ'}
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed font-urdu-ui">
              {lang === 'en'
                ? 'Procedural order sheets, remand orders, status-quo stays, and summonses pending final determination.'
                : 'آرڈر شیٹس، ریمانڈ کے پروانے، حکمِ امتناع اور طلبی کے سمن جو مقدمے کے دوران عبوری نوعیت کے ہوتے ہیں۔'}
            </p>
          </div>

          {/* Tier 5 */}
          <div className="p-4 rounded bg-[#111C3A] border border-[#C5A85C]/40 space-y-1.5">
            <h3 className="text-xs font-bold text-[#E0C57A] font-urdu-ui uppercase tracking-wider">
              {lang === 'en' ? 'E. Bail Granted / Denied' : 'ر۔ ضمانت کی منظوری یا منسوخی'}
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed font-urdu-ui">
              {lang === 'en'
                ? 'Interim liberty under Section 497/498 CrPC. Strictly NOT an acquittal; trial on guilt continues.'
                : 'دفعہ 497 یا 498 کے تحت عبوری قانونی ریلیف۔ یہ ہرگز بریت نہیں ہے، مقدمہ اور ٹرائل بدستور جاری رہتا ہے۔'}
            </p>
          </div>

          {/* Tier 6 */}
          <div className="p-4 rounded bg-[#111C3A] border border-emerald-900/50 space-y-1.5">
            <h3 className="text-xs font-bold text-emerald-300 font-urdu-ui uppercase tracking-wider">
              {lang === 'en' ? 'F. Acquittals (249-A / 265-K)' : 'س۔ باعزت بریت کا عدالتی فیصلہ'}
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed font-urdu-ui">
              {lang === 'en'
                ? 'Exoneration by court due to lack of evidence or conclusion of trial, restoring clean status.'
                : 'عدم ثبوت یا مکمل ٹرائل کے بعد عدالت کا باضابطہ فیصلہ جس کے تحت ملزم کو تمام الزامات سے بری کیا جاتا ہے۔'}
            </p>
          </div>

          {/* Tier 7 */}
          <div className="p-4 rounded bg-[#111C3A] border border-red-900/40 space-y-1.5">
            <h3 className="text-xs font-bold text-red-300 font-urdu-ui uppercase tracking-wider">
              {lang === 'en' ? 'G. Convictions & Sentencing' : 'ص۔ مجرم قرار دینا و سزا'}
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed font-urdu-ui">
              {lang === 'en'
                ? 'Judicial finding of guilt beyond reasonable doubt, subject to statutory right of appeal.'
                : 'عدالت کا حتمی فیصلہ جس میں ملزم کو جرم کا مرتکب ٹھہرا کر سزا سنائی جائے، جو اپیل کے حق کے تابع ہے۔'}
            </p>
          </div>

          {/* Tier 8 */}
          <div className="p-4 rounded bg-[#111C3A] border border-slate-700 space-y-1.5">
            <h3 className="text-xs font-bold text-slate-300 font-urdu-ui uppercase tracking-wider">
              {lang === 'en' ? 'H. Dismissals & Withdrawals' : 'ط۔ عدم پیروی یا اخراج'}
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed font-urdu-ui">
              {lang === 'en'
                ? 'Proceedings concluded on procedural, territorial, or jurisdictional grounds without reaching the merits.'
                : 'دائرۂ اختیار، عدم پیروی یا قانونی رکاوٹ کی بنا پر خارج شدہ درخواستیں جن میں میرٹ پر فیصلہ نہ ہوا ہو۔'}
            </p>
          </div>

          {/* Tier 9 */}
          <div className="p-4 rounded bg-[#111C3A] border border-purple-900/40 space-y-1.5">
            <h3 className="text-xs font-bold text-purple-300 font-urdu-ui uppercase tracking-wider">
              {lang === 'en' ? 'I. Binding Final Judgments' : 'ع۔ حتمی دستخط شدہ نظائر'}
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed font-urdu-ui">
              {lang === 'en'
                ? 'Reported precedent judgments of High Courts and Supreme Court (PLD, SCMR) binding under Article 189.'
                : 'آئین کے آرٹیکل 189 کے تحت سپریم کورٹ اور ہائی کورٹس کے حتمی نظائر و فیصلے جو تمام ماتحت عدالتوں پر لاگو ہوتے ہیں۔'}
            </p>
          </div>
        </div>
      </section>

      {/* Principle 2: Bail Order vs. Final Acquittal */}
      <section className="bg-[#0E1738] border border-slate-800 rounded-xl p-6 sm:p-8 space-y-4 text-left rtl:text-right">
        <div className="flex items-center gap-3 text-[#E0C57A]">
          <FileCheck2 size={22} />
          <h2 className="text-lg sm:text-xl font-bold text-white font-urdu-ui">
            {lang === 'en'
              ? '2. Strict Differentiation: Bail Order vs. Acquittal vs. Conviction'
              : '2. ضمانت، بریت اور سزا کے مابین واضح قانونی فرق'}
          </h2>
        </div>

        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-urdu-ui">
          {lang === 'en'
            ? 'The grant of bail (whether pre-arrest under Section 498 CrPC or post-arrest under Section 497 CrPC) is an interim procedural concession ensuring the liberty of an accused individual pending trial. It does NOT constitute a finding of innocence or an acquittal.'
            : 'ضمانت (قبل از گرفتاری یا بعد از گرفتاری) محض ایک عبوری قانونی ریلیف ہے جو مقدمے کی سماعت تک شہری کی آزادی کو تحفظ دیتا ہے۔ یہ ہرگز بے گناہی کا سرٹیفکیٹ یا حتمی بریت نہیں ہے۔'}
        </p>

        <div className="p-4 rounded bg-[#111C3A] border-l-4 rtl:border-l-0 rtl:border-r-4 border-[#C5A85C] text-xs text-slate-300 leading-relaxed font-urdu-ui">
          {lang === 'en'
            ? 'Conversely, an acquittal (under Section 249-A, 265-K, or upon trial conclusion) signifies full judicial clearance of charges. Insaf Archive marks every record with its explicit procedural status to eliminate ambiguity.'
            : 'دوسری جانب بریت (دفعہ 249-A یا مکمل ٹرائل کے بعد) الزامات کے خاتمے اور باعزت رہائی کی علامت ہے۔ ہمارا آرکائیو ہر کیس پر واضح سٹیٹس بیج لگاتا ہے۔'}
        </div>
      </section>

      {/* Principle 3: Source Verification Hierarchy */}
      <section className="bg-[#0E1738] border border-slate-800 rounded-xl p-6 sm:p-8 space-y-4 text-left rtl:text-right">
        <div className="flex items-center gap-3 text-[#E0C57A]">
          <BookOpen size={22} />
          <h2 className="text-lg sm:text-xl font-bold text-white font-urdu-ui">
            {lang === 'en' ? '3. Source Verification Hierarchy' : '3. دستاویزی ماخذ کا ترجیحی معیار'}
          </h2>
        </div>

        <div className="space-y-3 text-xs sm:text-sm text-slate-300">
          <div className="p-3 bg-[#111C3A] rounded border border-slate-800 flex items-start gap-3">
            <span className="font-mono text-[#E0C57A] font-bold">Tier 1:</span>
            <span className="font-urdu-ui leading-relaxed">
              {lang === 'en'
                ? 'Certified Court Copies, High Court Order Sheets, Supreme Court Live Stream Recordings, and Official Gazettes of Pakistan.'
                : 'عدالتی مصدقہ نقول، ہائی کورٹ آرڈر شیٹس، سپریم کورٹ کی باضابطہ لائیو ویڈیو ریکارڈنگز اور پاکستان کے سرکاری گزٹس۔'}
            </span>
          </div>

          <div className="p-3 bg-[#111C3A] rounded border border-slate-800 flex items-start gap-3">
            <span className="font-mono text-[#E0C57A] font-bold">Tier 2:</span>
            <span className="font-urdu-ui leading-relaxed">
              {lang === 'en'
                ? 'Accredited Law Reports (SCMR, PLD, CLD, PCrLJ, CLC) and reports published by statutory Bar Councils.'
                : 'مستند قانونی جرائد (SCMR، PLD، PCrLJ) اور پاکستان و صوبائی بار کونسلز کی تحقیقی دستاویزات۔'}
            </span>
          </div>

          <div className="p-3 bg-[#111C3A] rounded border border-slate-800 flex items-start gap-3">
            <span className="font-mono text-[#E0C57A] font-bold">Tier 3:</span>
            <span className="font-urdu-ui leading-relaxed">
              {lang === 'en'
                ? 'Independent Observer Reports from recognized human rights monitoring bodies (HRCP, ICJ, Amnesty International).'
                : 'انسانی حقوق کے تسلیم شدہ آزاد مانیٹرنگ اداروں (HRCP، انٹرنیشنل کمیشن آف جیورسٹس) کی دستاویزی رپورٹیں'}
            </span>
          </div>
        </div>
      </section>

      {/* Principle 4: Privacy & Redaction Safeguards */}
      <section className="bg-[#0E1738] border border-slate-800 rounded-xl p-6 sm:p-8 space-y-4 text-left rtl:text-right">
        <div className="flex items-center gap-3 text-[#E0C57A]">
          <EyeOff size={22} />
          <h2 className="text-lg sm:text-xl font-bold text-white font-urdu-ui">
            {lang === 'en' ? '4. Privacy & Mandatory Redaction Policy' : '4. ذاتی معلومات کا تحفظ اور لازمی رازداری کی پالیسی'}
          </h2>
        </div>

        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-urdu-ui">
          {lang === 'en'
            ? 'We respect individual dignity and privacy safeguards under Article 14 of the Constitution. The following materials are strictly redacted prior to archiving:'
            : 'ہم آئین کے آرٹیکل 14 کے تحت انسانی عزتِ نفس اور ذاتی معلومات کے تحفظ کے پابند ہیں۔ درج ذیل مواد کو شائع نہیں کیا جاتا:'}
        </p>

        <ul className="space-y-2 text-xs sm:text-sm text-slate-300 list-disc list-inside font-urdu-ui leading-relaxed">
          <li>
            {lang === 'en'
              ? 'Identities and details of juvenile/minor defendants, consistent with the Juvenile Justice System Act 2018.'
              : 'جووینائل جسٹس سسٹم ایکٹ کے تحت 18 سال سے کم عمر افراد کے نام اور شناخت۔'}
          </li>
          <li>
            {lang === 'en'
              ? 'Names and personal particulars of victims of sexual or gender-based violence.'
              : 'صنفی و جنسی تشدد کے مقدمات میں متاثرہ افراد کی شناخت۔'}
          </li>
          <li>
            {lang === 'en'
              ? 'Private financial identifiers (full CNIC numbers, bank account numbers, residential street addresses).'
              : 'ذاتی شناختی کارڈ نمبرز، بینک اکاؤنٹس اور رہائشی پتے۔'}
          </li>
        </ul>
      </section>

      {/* Principle 5: Right of Reply & Correction */}
      <section className="bg-[#0E1738] border border-[#C5A85C]/30 rounded-xl p-6 sm:p-8 space-y-4 text-left rtl:text-right">
        <div className="flex items-center gap-3 text-[#E0C57A]">
          <RotateCcw size={22} />
          <h2 className="text-lg sm:text-xl font-bold text-white font-urdu-ui">
            {lang === 'en' ? '5. Transparent Corrections & Right of Reply' : '5. حقِ وضاحت اور باضابطہ تصحیح کا نظام'}
          </h2>
        </div>

        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-urdu-ui">
          {lang === 'en'
            ? 'Any legal counsel, party to proceedings, or accredited researcher may request an editorial correction or provide an authenticated subsequent order sheet.'
            : 'کوئی بھی وکیل، مقدمے کا فریق یا محقق کسی غلطی کی نشاندہی کے لیے یا نیا عدالتی حکم نامہ جمع کرانے کے لیے ہم سے رجوع کر سکتا ہے۔'}
        </p>

        <div className="pt-2">
          <button
            onClick={() => onNavigate('corrections')}
            className="px-5 py-2.5 bg-[#C5A85C] hover:bg-[#E0C57A] text-[#0B132B] font-semibold text-xs rounded transition-colors font-urdu-ui"
          >
            {t.actions.submitCorrection[lang]}
          </button>
        </div>
      </section>
    </div>
  );
};
