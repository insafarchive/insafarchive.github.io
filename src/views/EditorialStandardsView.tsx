/**
 * INSAF ARCHIVE (انصاف آرکائیو)
 * Editorial Standards, Methodology & Public Correction Request View
 */

import React, { useState } from 'react';
import { useArchive } from '../context/ArchiveContext';
import {
  FileCheck2,
  ShieldCheck,
  Scale,
  Lock,
  HeartHandshake,
  CheckCircle,
  Send,
} from 'lucide-react';

export const EditorialStandardsView: React.FC = () => {
  const { language } = useArchive();

  // Correction Form State
  const [recordId, setRecordId] = useState('');
  const [claimId, setClaimId] = useState('');
  const [correctionRationale, setCorrectionRationale] = useState('');
  const [sourceEvidenceUrl, setSourceEvidenceUrl] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmitCorrection = (e: React.FormEvent) => {
    e.preventDefault();
    if (recordId.trim() && correctionRationale.trim()) {
      setSubmitted(true);
    }
  };

  return (
    <div className="content-wrap" style={{ padding: '2rem 1.5rem 5rem 1.5rem' }}>
      {/* Header */}
      <div style={{ marginBottom: '3rem', maxWidth: '850px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.5rem' }}>
          <FileCheck2 size={26} color="var(--accent-gold)" />
          <h1 style={{ fontSize: '1.85rem', color: '#FFFFFF' }}>
            {language === 'ur' ? 'ادارتی ضابطہ اخلاق و تصدیقی طریقہ کار' : 'Editorial Standards & Methodology'}
          </h1>
        </div>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', lineHeight: 1.65 }}>
          {language === 'ur'
            ? 'انصاف آرکائیو کی بنیاد شواہد کی سختی، غیر جانبداری اور ماخذ کی شفافیت پر رکھی گئی ہے۔ ہم کسی بھی سیاسی، مسلکی یا گروہی بیانیے کو بغیر عدالتی و دستاویزی ثبوت کے بطور حقیقت پیش نہیں کرتے۔'
            : 'INSAF ARCHIVE operates under strict evidentiary standards. The platform serves as an open, source-backed documentary repository dedicated to preserving historical, judicial, and public records with complete neutrality.'}
        </p>
      </div>

      {/* Core Principles Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem', marginBottom: '4rem' }}>
        {/* Principle 1 */}
        <div className="glass-panel" style={{ padding: '1.5rem', backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-subtle)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--accent-gold)', marginBottom: '0.75rem' }}>
            <Scale size={20} />
            <h3 style={{ fontSize: '1.1rem', color: '#FFFFFF' }}>
              {language === 'ur' ? '1۔ دعویٰ بمقابلہ حقیقت و عدالتی فیصلہ' : '1. Claim vs. Fact vs. Judicial Finding'}
            </h3>
          </div>
          <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            {language === 'ur'
              ? 'کسی بھی الزام یا ایف آئی آر کو ازخود جرم کا ثبوت تسلیم نہیں کیا جاتا۔ ہم ہر بیان کو دستاویزی حقیقت، عدالتی فیصلے، سرکاری مؤقف، تردید یا غیر حل شدہ سوال کے طور پر الگ ظاہر کرتے ہیں۔'
              : 'The archive strictly forbids converting unproven allegations into established facts. Every assertion is explicitly tagged as a Documented Fact, Court Finding, Audit Finding, Allegation, Denial, or Unresolved Question.'}
          </p>
        </div>

        {/* Principle 2 */}
        <div className="glass-panel" style={{ padding: '1.5rem', backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-subtle)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--accent-emerald)', marginBottom: '0.75rem' }}>
            <ShieldCheck size={20} />
            <h3 style={{ fontSize: '1.1rem', color: '#FFFFFF' }}>
              {language === 'ur' ? '2۔ بنیادی ماخذ اور بغیر سورس اشاعت کی ممانعت' : '2. Primary Sources & Zero Fabrication'}
            </h3>
          </div>
          <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            {language === 'ur'
              ? 'کوئی بھی اندراج بغیر سرکاری گزٹ، عدالتی فیصلے، تصدیق شدہ رپورٹ یا بنیادی ماخذ کے شائع نہیں ہو سکتا۔ اگر کوئی بات متنازعہ ہو تو دونوں مؤقف ماخذ سمیت پیش کیے جاتے ہیں۔'
              : 'No record is published without verifiable primary citations (Supreme Court dockets, gazettes, audit reports, or corroborating investigations). Fabrication of sources or dates is strictly prohibited.'}
          </p>
        </div>

        {/* Principle 3 */}
        <div className="glass-panel" style={{ padding: '1.5rem', backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-subtle)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--accent-cyan)', marginBottom: '0.75rem' }}>
            <Lock size={20} />
            <h3 style={{ fontSize: '1.1rem', color: '#FFFFFF' }}>
              {language === 'ur' ? '3۔ پرائیویسی، نابالغ افراد اور قانونی تحفظ' : '3. Privacy & Protection of Vulnerable Persons'}
            </h3>
          </div>
          <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            {language === 'ur'
              ? 'نابالغ افراد، زیرِ تحفظ گواہان اور غیر ضروری ذاتی کوائف کی تشہیر سختی سے روکی جاتی ہے۔ حساس مقدمات میں نام اور پتے قانون کے مطابق مخفی رکھے جاتے ہیں۔'
              : 'Strict privacy classifications protect minors, protected witnesses, and sensitive personal information. Privileged legal communications and unnecessary private identification data are automatically filtered.'}
          </p>
        </div>
      </div>

      {/* PUBLIC CORRECTION REQUEST SECTION */}
      <div className="glass-panel" style={{ padding: '2.5rem', backgroundColor: 'var(--bg-surface-elevated)', border: '1px solid var(--border-medium)', maxWidth: '850px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: 'var(--accent-gold)', marginBottom: '0.75rem' }}>
          <HeartHandshake size={22} />
          <h2 style={{ fontSize: '1.45rem', color: '#FFFFFF' }}>
            {language === 'ur' ? 'تصحیح، ترمیم یا نئے دستاویزی ثبوت کی فراہمی' : 'Submit a Correction or Archival Evidence'}
          </h2>
        </div>

        <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', lineHeight: 1.6, marginBottom: '2rem' }}>
          {language === 'ur'
            ? 'اگر آپ کسی ریکارڈ میں کسی غلطی، متضاد فیصلے، یا نئے بنیادی ماخذ کی نشان دہی کرنا چاہتے ہیں، تو براہِ کرم تصدیقی ثبوت کے ساتھ نیچے دیا گیا فارم ارسال کریں۔'
            : 'We welcome peer scrutiny from legal scholars, historians, journalists, and citizens. If you identify a factual discrepancy or possess a primary source document, submit your correction request below.'}
        </p>

        {submitted ? (
          <div
            style={{
              backgroundColor: 'rgba(16, 185, 129, 0.15)',
              border: '1px solid rgba(16, 185, 129, 0.4)',
              borderRadius: 'var(--radius-md)',
              padding: '1.5rem',
              textAlign: 'center',
              color: '#34D399',
            }}
          >
            <CheckCircle size={32} style={{ margin: '0 auto 0.5rem auto' }} />
            <h3 style={{ fontSize: '1.15rem', marginBottom: '0.4rem' }}>
              {language === 'ur' ? 'تصحیح کی درخواست موصول ہوگئی' : 'Correction Request Submitted'}
            </h3>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
              {language === 'ur'
                ? 'آپ کی فراہم کردہ تفصیلات کا ادارتی کمیٹی جائزہ لے کر ریکارڈ کو اپ ڈیٹ کرے گی۔'
                : 'Your submission will be evaluated by the editorial board against our verification criteria.'}
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmitCorrection}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem', marginBottom: '1rem' }}>
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label">
                  {language === 'ur' ? 'آرکائیو ریکارڈ آئی ڈی:' : 'Target Record ID:'}
                </label>
                <input
                  type="text"
                  required
                  className="form-control"
                  placeholder="e.g. rec-pk-2022-arshad-sharif-killing"
                  value={recordId}
                  onChange={e => setRecordId(e.target.value)}
                />
              </div>

              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label">
                  {language === 'ur' ? 'کلیم یا سورس آئی ڈی (اختیاری):' : 'Claim or Source ID (Optional):'}
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="e.g. clm-as-award"
                  value={claimId}
                  onChange={e => setClaimId(e.target.value)}
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">
                {language === 'ur' ? 'بنیادی ماخذ کا لنک یا حوالہ:' : 'Primary Source URL / Document Citation:'}
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="https://... or Gazette No. / Supreme Court Citation"
                value={sourceEvidenceUrl}
                onChange={e => setSourceEvidenceUrl(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label className="form-label">
                {language === 'ur' ? 'تصحیح کی وجوہات اور دستاویزی شواہد:' : 'Rationale & Evidentiary Description:'}
              </label>
              <textarea
                required
                className="form-control"
                rows={4}
                placeholder={
                  language === 'ur'
                    ? 'براہ کرم واضح کریں کہ کون سا حصہ تبدیل کیا جانا چاہیے اور اس کا بنیادی ماخذ کیا ہے...'
                    : 'Explain the factual correction, citing specific paragraphs, orders, or gazette notices...'
                }
                value={correctionRationale}
                onChange={e => setCorrectionRationale(e.target.value)}
              />
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '1.5rem' }}>
              <button type="submit" className="btn btn-primary" style={{ gap: '0.5rem' }}>
                <Send size={15} />
                <span>{language === 'ur' ? 'درخواست ارسال کریں' : 'Submit Correction Request'}</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
