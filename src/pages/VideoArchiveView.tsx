import React, { useState, useMemo } from 'react';
import { Language, MediaItem, CaseRecord } from '../types';
import { allMediaRecords } from '../data/media/index';
import { translations } from '../data/translations';
import {
  Video,
  ShieldCheck,
  Search,
  ExternalLink,
  Calendar,
  Clock,
  Filter,
  FileText,
  Image as ImageIcon,
  BookOpen,
  Link as LinkIcon,
  Tag,
  AlertCircle,
  Play,
  RotateCcw,
  Eye,
  X,
  Maximize2,
  Copy,
  Check,
} from 'lucide-react';

interface VideoArchiveViewProps {
  lang: Language;
  cases?: CaseRecord[];
  onSelectCase?: (caseItem: CaseRecord) => void;
  onNavigate?: (page: string) => void;
}

export const VideoArchiveView: React.FC<VideoArchiveViewProps> = ({
  lang,
  cases = [],
  onSelectCase,
  onNavigate,
}) => {
  const t = translations;

  // State
  const [selectedMedia, setSelectedMedia] = useState<MediaItem>(allMediaRecords[0]);
  const [activeTimestampSeconds, setActiveTimestampSeconds] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedCaseFilter, setSelectedCaseFilter] = useState<string>('all');
  const [selectedVerification, setSelectedVerification] = useState<string>('all');
  const [imageModalItem, setImageModalItem] = useState<MediaItem | null>(null);
  const [docModalItem, setDocModalItem] = useState<MediaItem | null>(null);
  const [copiedCitation, setCopiedCitation] = useState(false);
  const [embedError, setEmbedError] = useState(false);

  // Available unique cases present in media records
  const associatedCasesList = useMemo(() => {
    const caseIds = new Set<string>();
    allMediaRecords.forEach((m) => m.associatedCaseIds.forEach((id) => caseIds.add(id)));
    return Array.from(caseIds);
  }, []);

  // Filtered Media Records
  const filteredRecords = useMemo(() => {
    return allMediaRecords.filter((item) => {
      // Type filter
      if (selectedType !== 'all' && item.mediaType !== selectedType) {
        return false;
      }
      // Category filter
      if (selectedCategory !== 'all' && item.category !== selectedCategory) {
        return false;
      }
      // Case filter
      if (selectedCaseFilter !== 'all' && !item.associatedCaseIds.includes(selectedCaseFilter)) {
        return false;
      }
      // Verification filter
      if (selectedVerification !== 'all' && item.verificationStatus !== selectedVerification) {
        return false;
      }
      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchesTitle =
          item.title.en.toLowerCase().includes(q) ||
          item.title.ur.toLowerCase().includes(q);
        const matchesDesc =
          item.description.en.toLowerCase().includes(q) ||
          item.description.ur.toLowerCase().includes(q);
        const matchesPublisher =
          item.sourcePublisher.en.toLowerCase().includes(q) ||
          item.sourcePublisher.ur.toLowerCase().includes(q);
        const matchesCase = item.associatedCaseIds.some((id) => id.toLowerCase().includes(q));
        const matchesTags = item.tags?.some((tag) => tag.toLowerCase().includes(q));

        if (!matchesTitle && !matchesDesc && !matchesPublisher && !matchesCase && !matchesTags) {
          return false;
        }
      }
      return true;
    });
  }, [selectedType, selectedCategory, selectedCaseFilter, selectedVerification, searchQuery]);

  // Video items for the theater
  const videoRecords = useMemo(() => {
    return allMediaRecords.filter((m) => m.mediaType === 'youtube_video');
  }, []);

  // Current active video for player
  const currentVideo: MediaItem = useMemo(() => {
    if (selectedMedia && selectedMedia.mediaType === 'youtube_video') {
      return selectedMedia;
    }
    return videoRecords[0] || allMediaRecords[0];
  }, [selectedMedia, videoRecords]);

  // YouTube Embed URL with optional start timestamp and privacy domain
  const embedUrl = useMemo(() => {
    if (!currentVideo.videoMetadata?.youtubeId) return '';
    const base = currentVideo.videoMetadata.privacyEnhancedEmbedUrl ||
      `https://www.youtube-nocookie.com/embed/${currentVideo.videoMetadata.youtubeId}`;
    const params = new URLSearchParams();
    params.set('rel', '0');
    params.set('modestbranding', '1');
    params.set('enablejsapi', '1');
    if (activeTimestampSeconds !== null && activeTimestampSeconds > 0) {
      params.set('start', activeTimestampSeconds.toString());
    }
    return `${base}?${params.toString()}`;
  }, [currentVideo, activeTimestampSeconds]);

  // Handle timestamp click
  const handleJumpToTimestamp = (seconds: number) => {
    setActiveTimestampSeconds(seconds);
    setEmbedError(false);
  };

  // Reset filters
  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedType('all');
    setSelectedCategory('all');
    setSelectedCaseFilter('all');
    setSelectedVerification('all');
  };

  // Find linked case record to navigate
  const handleOpenCaseDossier = (caseId: string) => {
    if (cases && onSelectCase) {
      const found = cases.find((c) => c.id === caseId || c.slug === caseId);
      if (found) {
        onSelectCase(found);
        return;
      }
    }
    if (onNavigate) {
      onNavigate('cases');
    }
  };

  const handleCopyCitation = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCitation(true);
    setTimeout(() => setCopiedCitation(false), 2500);
  };

  const mediaTypeLabels: Record<string, { en: string; ur: string }> = {
    all: { en: 'All Media & Evidence', ur: 'تمام شواہد و میڈیا' },
    youtube_video: { en: 'YouTube Videos', ur: 'یوٹیوب ویڈیوز' },
    document: { en: 'Certified Documents', ur: 'مصدقہ عدالتی نقول' },
    image: { en: 'Archival Photos', ur: 'تاریخی تصاویر' },
    external_source: { en: 'Forensic & Institutional Reports', ur: 'فارنزک و تیکنیکی رپورٹس' },
  };

  const verificationBadgeLabels: Record<string, { en: string; ur: string }> = {
    verified_official_record: { en: 'Verified Official Record', ur: 'مصدقہ سرکاری ریکارڈ' },
    corroborated_reporting: { en: 'Corroborated Legal Reporting', ur: 'مصدقہ قانونی رپورٹنگ' },
    preliminary_documentation: { en: 'Preliminary Documentation', ur: 'ابتدائی دستاویز' },
    under_editorial_review: { en: 'Under Editorial Review', ur: 'زیرِ ادارتی جائزہ' },
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10 text-left rtl:text-right">
      {/* 1. Header & Title Section */}
      <div className="border-b border-slate-800 pb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#C5A85C] uppercase tracking-wider mb-1 font-urdu-ui">
            <Video size={14} />
            <span>
              {lang === 'en'
                ? 'Evidence, Documents & Video Archive'
                : 'شواہد، عدالتی دستاویزات و ویڈیو آرکائیو'}
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white font-legal-display font-urdu-ui">
            {t.videoPage.title[lang]}
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-3xl font-urdu-ui">
            {t.videoPage.subtitle[lang]}
          </p>
        </div>

        {/* Total stats pill */}
        <div className="flex items-center gap-3 bg-[#111C3A] border border-slate-800 px-4 py-2 rounded-lg text-xs">
          <div className="text-center">
            <div className="font-mono text-[#E0C57A] font-bold text-sm">
              {allMediaRecords.length}
            </div>
            <div className="text-slate-400 text-[10px] font-urdu-ui">
              {lang === 'en' ? 'Evidence Items' : 'کل شواہد'}
            </div>
          </div>
          <span className="text-slate-700">|</span>
          <div className="text-center">
            <div className="font-mono text-white font-bold text-sm">
              {videoRecords.length}
            </div>
            <div className="text-slate-400 text-[10px] font-urdu-ui">
              {lang === 'en' ? 'Videos' : 'ویڈیوز'}
            </div>
          </div>
          <span className="text-slate-700">|</span>
          <div className="text-center">
            <div className="font-mono text-sky-400 font-bold text-sm">
              {allMediaRecords.filter((m) => m.mediaType === 'document').length}
            </div>
            <div className="text-slate-400 text-[10px] font-urdu-ui">
              {lang === 'en' ? 'Orders' : 'احکامات'}
            </div>
          </div>
        </div>
      </div>

      {/* 2. Featured Video Player Theater */}
      {currentVideo && (
        <section
          aria-label="Video Theater"
          className="bg-[#0E1738] border border-[#C5A85C]/30 rounded-xl overflow-hidden shadow-2xl transition-all"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
            {/* Embed Player Zone */}
            <div className="lg:col-span-8 bg-black relative flex flex-col justify-center">
              <div className="relative w-full aspect-video bg-black flex items-center justify-center">
                {!embedError ? (
                  <iframe
                    key={embedUrl}
                    src={embedUrl}
                    title={currentVideo.title[lang]}
                    allow="accelerometer; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    onError={() => setEmbedError(true)}
                    className="w-full h-full border-0"
                    loading="lazy"
                  />
                ) : (
                  <div className="p-8 text-center space-y-3">
                    <AlertCircle size={36} className="text-amber-400 mx-auto" />
                    <p className="text-xs sm:text-sm text-slate-300 font-urdu-ui">
                      {lang === 'en'
                        ? 'Video embed could not be loaded directly. You may open the verified recording on YouTube.'
                        : 'براہِ راست ویڈیو لوڈ نہیں ہو سکی۔ آپ تصدیق شدہ یوٹیوب پر دیکھ سکتے ہیں۔'}
                    </p>
                    <a
                      href={currentVideo.sourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-[#C5A85C] text-[#0B132B] font-semibold text-xs hover:bg-[#E0C57A] transition-colors"
                    >
                      <span>{lang === 'en' ? 'Watch on YouTube' : 'یوٹیوب پر دیکھیں'}</span>
                      <ExternalLink size={13} />
                    </a>
                  </div>
                )}
              </div>

              {/* Theater Control & Quick Info Bar */}
              <div className="bg-[#091024] px-4 py-2.5 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-400 border-t border-slate-800">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-[#E0C57A] font-semibold">
                    {currentVideo.videoMetadata?.duration || 'Recorded'}
                  </span>
                  <span>·</span>
                  <span className="text-slate-300 font-urdu-ui">
                    {currentVideo.sourcePublisher[lang]}
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <a
                    href={currentVideo.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[#E0C57A] hover:underline font-urdu-ui"
                  >
                    <span>{lang === 'en' ? 'Open Original on YouTube' : 'یوٹیوب پر اصل ویڈیو کھولیں'}</span>
                    <ExternalLink size={12} />
                  </a>
                </div>
              </div>
            </div>

            {/* Sidebar Context & Interactive Timestamps */}
            <div className="lg:col-span-4 p-5 sm:p-6 flex flex-col justify-between space-y-4 bg-[#111C3A] border-t lg:border-t-0 lg:border-l rtl:lg:border-l-0 rtl:lg:border-r border-slate-800 overflow-y-auto max-h-[540px]">
              <div className="space-y-3">
                {/* Verification Badge */}
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#172346] border border-[#C5A85C]/30 text-[#E0C57A] text-[11px] font-medium font-urdu-ui">
                  <ShieldCheck size={13} />
                  <span>
                    {verificationBadgeLabels[currentVideo.verificationStatus]?.[lang] ||
                      currentVideo.verificationStatus}
                  </span>
                </div>

                {/* Video Title */}
                <h2 className="text-base sm:text-lg font-bold text-white font-urdu-ui leading-snug">
                  {currentVideo.title[lang]}
                </h2>

                {/* Associated Case Link Button */}
                {currentVideo.associatedCaseIds.length > 0 && (
                  <div className="pt-1">
                    <span className="text-[11px] text-slate-400 font-urdu-ui block mb-1">
                      {lang === 'en' ? 'Connected Case Dossier:' : 'منسلک عدالتی مقدمہ:'}
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {currentVideo.associatedCaseIds.map((cId) => (
                        <button
                          key={cId}
                          onClick={() => handleOpenCaseDossier(cId)}
                          className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#0B132B] hover:bg-[#18254B] border border-[#C5A85C]/40 text-[#E0C57A] text-xs font-mono transition-colors group"
                        >
                          <LinkIcon size={12} className="text-[#C5A85C]" />
                          <span>{cId}</span>
                          <span className="text-[10px] text-slate-400 group-hover:text-white font-urdu-ui">
                            ({lang === 'en' ? 'Open Case' : 'فائل کھولیں'})
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Dates: Event date vs Publication Date */}
                <div className="text-xs text-slate-300 space-y-1 bg-[#0B132B]/60 p-3 rounded border border-slate-800">
                  <div className="flex justify-between items-center text-[11px]">
                    <span className="text-slate-400 font-urdu-ui">
                      {lang === 'en' ? 'Hearing / Event Date:' : 'سماعت / وقوعہ کی تاریخ:'}
                    </span>
                    <span className="font-mono text-slate-200">
                      {currentVideo.eventDate || 'N/A'}
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-[11px]">
                    <span className="text-slate-400 font-urdu-ui">
                      {lang === 'en' ? 'Broadcast Upload Date:' : 'نشریات کی تاریخ:'}
                    </span>
                    <span className="font-mono text-slate-200">
                      {currentVideo.publicationDate || 'N/A'}
                    </span>
                  </div>
                </div>

                {/* Description & Context Notes */}
                <div className="space-y-2 text-xs">
                  <p className="text-slate-300 leading-relaxed font-urdu-ui">
                    {currentVideo.description[lang]}
                  </p>
                  {currentVideo.contextNotes && (
                    <div className="p-2.5 rounded bg-[#172346]/80 border-l-2 rtl:border-l-0 rtl:border-r-2 border-[#C5A85C] text-slate-300 font-urdu-ui leading-relaxed text-[11px]">
                      <span className="text-[#E0C57A] font-semibold block mb-0.5">
                        {lang === 'en' ? 'Contextual & Legal Note:' : 'قانونی وضاحتی نوٹ:'}
                      </span>
                      {currentVideo.contextNotes[lang]}
                    </div>
                  )}
                </div>
              </div>

              {/* Interactive Timestamped Notes */}
              {currentVideo.videoMetadata?.timestamps && currentVideo.videoMetadata.timestamps.length > 0 && (
                <div className="pt-3 border-t border-slate-800 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-semibold text-[#E0C57A] uppercase tracking-wider font-urdu-ui">
                      {lang === 'en' ? 'Interactive Timestamps' : 'اہم لمحات و اوقات'}
                    </span>
                    <span className="text-[10px] text-slate-400 font-urdu-ui">
                      {lang === 'en' ? '(Click to jump)' : '(منتخب کر کے دیکھیں)'}
                    </span>
                  </div>

                  <div className="space-y-1.5">
                    {currentVideo.videoMetadata.timestamps.map((ts, idx) => {
                      const isActive = activeTimestampSeconds === ts.timeInSeconds;
                      return (
                        <button
                          key={idx}
                          onClick={() => handleJumpToTimestamp(ts.timeInSeconds)}
                          className={`w-full text-left rtl:text-right p-2 rounded transition-all flex items-start gap-2 text-xs ${
                            isActive
                              ? 'bg-[#C5A85C]/20 border border-[#C5A85C] text-white'
                              : 'bg-[#0E1738] hover:bg-[#162347] border border-slate-800 text-slate-300'
                          }`}
                        >
                          <span className="font-mono text-[#E0C57A] shrink-0 font-bold bg-[#091024] px-1.5 py-0.5 rounded text-[11px]">
                            {ts.timecode}
                          </span>
                          <div className="space-y-0.5">
                            <div className="font-medium font-urdu-ui">{ts.label[lang]}</div>
                            {ts.note && (
                              <div className="text-[10px] text-slate-400 font-urdu-ui">
                                {ts.note[lang]}
                              </div>
                            )}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* 3. Multi-Faceted Filters & Search */}
      <section
        aria-label="Archive Filters"
        className="bg-[#0E1738] border border-slate-800 rounded-xl p-5 sm:p-6 space-y-4"
      >
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          {/* Search Bar */}
          <div className="relative flex-1">
            <Search
              size={16}
              className="absolute left-3 rtl:left-auto rtl:right-3 top-1/2 -translate-y-1/2 text-slate-400"
            />
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={
                lang === 'en'
                  ? 'Search by title, case ID (e.g. PK-SC-2024-0102), publisher, tag, or topic...'
                  : 'عنوان، مقدمہ نمبر، ادارہ، ٹیگ یا موضوع سے تلاش کریں...'
              }
              className="w-full bg-[#111C3A] border border-slate-700/80 rounded-lg pl-9 pr-3 rtl:pl-3 rtl:pr-9 py-2 text-xs sm:text-sm text-white placeholder-slate-400 focus:outline-none focus:border-[#C5A85C] font-urdu-ui"
            />
          </div>

          {/* Reset Filters */}
          {(searchQuery ||
            selectedType !== 'all' ||
            selectedCategory !== 'all' ||
            selectedCaseFilter !== 'all' ||
            selectedVerification !== 'all') && (
            <button
              onClick={handleResetFilters}
              className="inline-flex items-center justify-center gap-1.5 px-3 py-2 text-xs rounded bg-[#172346] hover:bg-[#1f2f5c] border border-slate-700 text-[#E0C57A] transition-colors font-urdu-ui shrink-0"
            >
              <RotateCcw size={13} />
              <span>{t.actions.resetFilters[lang]}</span>
            </button>
          )}
        </div>

        {/* Filter Dropdowns Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
          {/* Media Type Filter */}
          <div>
            <label className="block text-[11px] font-medium text-slate-400 mb-1 font-urdu-ui">
              {lang === 'en' ? 'Media Type' : 'شواہد کی قسم'}
            </label>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="w-full bg-[#111C3A] border border-slate-700 rounded px-2.5 py-1.5 text-slate-200 focus:outline-none focus:border-[#C5A85C] font-urdu-ui"
            >
              <option value="all">{mediaTypeLabels.all[lang]}</option>
              <option value="youtube_video">{mediaTypeLabels.youtube_video[lang]}</option>
              <option value="document">{mediaTypeLabels.document[lang]}</option>
              <option value="image">{mediaTypeLabels.image[lang]}</option>
              <option value="external_source">{mediaTypeLabels.external_source[lang]}</option>
            </select>
          </div>

          {/* Category / Topic Filter */}
          <div>
            <label className="block text-[11px] font-medium text-slate-400 mb-1 font-urdu-ui">
              {lang === 'en' ? 'Legal Category' : 'قانونی زمرہ'}
            </label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full bg-[#111C3A] border border-slate-700 rounded px-2.5 py-1.5 text-slate-200 focus:outline-none focus:border-[#C5A85C] font-urdu-ui"
            >
              <option value="all">{lang === 'en' ? 'All Categories' : 'تمام زمرہ جات'}</option>
              <option value="court_judgments">{t.categories.court_judgments[lang]}</option>
              <option value="bail_acquittal">{t.categories.bail_acquittal[lang]}</option>
              <option value="missing_persons">{t.categories.missing_persons[lang]}</option>
              <option value="labour_poverty">{t.categories.labour_poverty[lang]}</option>
              <option value="women_children">{t.categories.women_children[lang]}</option>
              <option value="human_rights">{t.categories.human_rights[lang]}</option>
            </select>
          </div>

          {/* Associated Case Filter */}
          <div>
            <label className="block text-[11px] font-medium text-slate-400 mb-1 font-urdu-ui">
              {lang === 'en' ? 'Connected Case' : 'منسلک مقدمہ'}
            </label>
            <select
              value={selectedCaseFilter}
              onChange={(e) => setSelectedCaseFilter(e.target.value)}
              className="w-full bg-[#111C3A] border border-slate-700 rounded px-2.5 py-1.5 text-slate-200 focus:outline-none focus:border-[#C5A85C] font-mono text-[11px]"
            >
              <option value="all">{lang === 'en' ? 'All Cases' : 'تمام مقدمات'}</option>
              {associatedCasesList.map((cId) => (
                <option key={cId} value={cId}>
                  {cId}
                </option>
              ))}
            </select>
          </div>

          {/* Verification Status */}
          <div>
            <label className="block text-[11px] font-medium text-slate-400 mb-1 font-urdu-ui">
              {lang === 'en' ? 'Verification Level' : 'تصدیقی درجہ'}
            </label>
            <select
              value={selectedVerification}
              onChange={(e) => setSelectedVerification(e.target.value)}
              className="w-full bg-[#111C3A] border border-slate-700 rounded px-2.5 py-1.5 text-slate-200 focus:outline-none focus:border-[#C5A85C] font-urdu-ui"
            >
              <option value="all">{lang === 'en' ? 'All Verification Levels' : 'تمام درجات'}</option>
              <option value="verified_official_record">
                {verificationBadgeLabels.verified_official_record[lang]}
              </option>
              <option value="corroborated_reporting">
                {verificationBadgeLabels.corroborated_reporting[lang]}
              </option>
            </select>
          </div>
        </div>

        {/* Results Count Banner */}
        <div className="flex items-center justify-between text-xs text-slate-400 pt-2 border-t border-slate-800">
          <span className="font-urdu-ui">
            {lang === 'en'
              ? `Showing ${filteredRecords.length} of ${allMediaRecords.length} evidence & media items`
              : `${allMediaRecords.length} میں سے ${filteredRecords.length} شواہد و دستاویزات دکھائے جا رہے ہیں`}
          </span>
        </div>
      </section>

      {/* 4. Evidence & Media Catalog Cards Grid */}
      <section aria-label="Media Grid" className="space-y-4">
        {filteredRecords.length === 0 ? (
          <div className="text-center py-12 bg-[#0E1738] border border-slate-800 rounded-xl p-8 space-y-3">
            <AlertCircle size={32} className="text-slate-500 mx-auto" />
            <h3 className="text-base font-bold text-white font-urdu-ui">
              {lang === 'en' ? 'No matching media records found' : 'کوئی متعلقہ ریکارڈ نہیں ملا'}
            </h3>
            <p className="text-xs text-slate-400 font-urdu-ui">
              {lang === 'en'
                ? 'Try broadening your search query or resetting filters.'
                : 'تلاش کے الفاظ تبدیل کریں یا فلٹرز ختم کریں۔'}
            </p>
            <button
              onClick={handleResetFilters}
              className="mt-2 inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-[#C5A85C] text-[#0B132B] font-semibold text-xs"
            >
              <span>{t.actions.resetFilters[lang]}</span>
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredRecords.map((item) => {
              const isVideo = item.mediaType === 'youtube_video';
              const isDoc = item.mediaType === 'document';
              const isImg = item.mediaType === 'image';
              const isExt = item.mediaType === 'external_source';
              const isSelectedVideo = currentVideo.id === item.id;

              return (
                <div
                  key={item.id}
                  className={`bg-[#0E1738] hover:bg-[#111C3A] border rounded-xl overflow-hidden transition-all flex flex-col justify-between group ${
                    isSelectedVideo && isVideo
                      ? 'border-[#C5A85C] ring-1 ring-[#C5A85C]'
                      : 'border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div>
                    {/* Media Type & Identifier Top Bar */}
                    <div className="p-3.5 bg-[#0A1026] border-b border-slate-800/80 flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2">
                        {isVideo && <Video size={14} className="text-rose-400" />}
                        {isDoc && <FileText size={14} className="text-sky-400" />}
                        {isImg && <ImageIcon size={14} className="text-emerald-400" />}
                        {isExt && <BookOpen size={14} className="text-amber-400" />}
                        <span className="font-mono text-[#E0C57A] font-medium text-[11px]">
                          {item.id}
                        </span>
                      </div>
                      <span className="text-[10px] text-slate-400 uppercase tracking-wider font-mono">
                        {item.mediaType.replace('_', ' ')}
                      </span>
                    </div>

                    {/* Image / Thumbnail Preview */}
                    {isImg && item.imageMetadata?.thumbnailUrl && (
                      <div
                        onClick={() => setImageModalItem(item)}
                        className="relative h-44 bg-black/50 overflow-hidden cursor-pointer group/img"
                      >
                        <img
                          src={item.imageMetadata.thumbnailUrl}
                          alt={item.imageMetadata.alt[lang]}
                          className="w-full h-full object-cover group-hover/img:scale-105 transition-transform duration-300"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center gap-2 text-white text-xs font-urdu-ui">
                          <Maximize2 size={16} />
                          <span>{lang === 'en' ? 'Click to inspect high-res' : 'بڑی تصویر دیکھیں'}</span>
                        </div>
                      </div>
                    )}

                    {isVideo && (
                      <div
                        onClick={() => {
                          setSelectedMedia(item);
                          setActiveTimestampSeconds(null);
                          window.scrollTo({ top: 120, behavior: 'smooth' });
                        }}
                        className="relative h-44 bg-[#080E21] cursor-pointer group/vid flex items-center justify-center overflow-hidden border-b border-slate-800"
                      >
                        <div className="w-12 h-12 rounded-full bg-[#C5A85C]/90 text-[#0B132B] flex items-center justify-center shadow-lg group-hover/vid:scale-110 transition-transform">
                          <Play size={20} className="fill-current ml-0.5 rtl:ml-0 rtl:mr-0.5" />
                        </div>
                        <div className="absolute bottom-2 right-2 rtl:right-auto rtl:left-2 px-2 py-0.5 rounded bg-black/80 text-[11px] font-mono text-white">
                          {item.videoMetadata?.duration || 'Video'}
                        </div>
                      </div>
                    )}

                    {/* Content Body */}
                    <div className="p-5 space-y-3">
                      {/* Connected Case Link */}
                      {item.associatedCaseIds.length > 0 && (
                        <div className="flex flex-wrap gap-1">
                          {item.associatedCaseIds.map((cId) => (
                            <button
                              key={cId}
                              onClick={(e) => {
                                e.stopPropagation();
                                handleOpenCaseDossier(cId);
                              }}
                              className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-[#111C3A] hover:bg-[#18254B] border border-slate-700/80 text-xs font-mono text-[#E0C57A] transition-colors"
                              title={`View ${cId}`}
                            >
                              <LinkIcon size={11} className="text-[#C5A85C]" />
                              <span>{cId}</span>
                            </button>
                          ))}
                        </div>
                      )}

                      <h3 className="text-sm font-bold text-white font-urdu-ui leading-snug group-hover:text-[#E0C57A] transition-colors">
                        {item.title[lang]}
                      </h3>

                      <p className="text-xs text-slate-300 font-urdu-ui line-clamp-2 leading-relaxed">
                        {item.description[lang]}
                      </p>

                      {/* Document Citation if doc */}
                      {isDoc && item.documentMetadata && (
                        <div className="p-2 rounded bg-[#091024] border border-slate-800/80 text-[11px] font-mono text-sky-300">
                          {item.documentMetadata.citationFormat || 'Certified Court Extract'}
                          <span className="text-slate-400 font-sans ml-2">
                            · {item.documentMetadata.pagesCount} {lang === 'en' ? 'Pages' : 'صفحات'}
                          </span>
                        </div>
                      )}

                      {/* Source & Date info */}
                      <div className="text-[11px] text-slate-400 space-y-0.5 font-urdu-ui">
                        <div>
                          <span className="text-slate-500">{lang === 'en' ? 'Source: ' : 'ماخذ: '}</span>
                          <span className="text-slate-300">{item.sourcePublisher[lang]}</span>
                        </div>
                        <div className="flex items-center gap-2 font-mono text-[10px]">
                          <span>
                            {lang === 'en' ? 'Event Date: ' : 'تاریخ: '}
                            {item.eventDate || item.publicationDate || 'N/A'}
                          </span>
                        </div>
                      </div>

                      {/* Tags */}
                      {item.tags && item.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1 pt-1">
                          {item.tags.slice(0, 3).map((tag, tIdx) => (
                            <span
                              key={tIdx}
                              className="text-[10px] px-1.5 py-0.5 rounded bg-[#172346] text-slate-300 border border-slate-700/60 font-mono"
                            >
                              #{tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Card Footer Actions */}
                  <div className="p-3.5 bg-[#091024] border-t border-slate-800 flex items-center justify-between text-xs">
                    <span className="text-[11px] text-slate-400 font-urdu-ui">
                      {verificationBadgeLabels[item.verificationStatus]?.[lang] || 'Verified'}
                    </span>

                    <div className="flex items-center gap-2">
                      {isVideo && (
                        <button
                          onClick={() => {
                            setSelectedMedia(item);
                            setActiveTimestampSeconds(null);
                            window.scrollTo({ top: 120, behavior: 'smooth' });
                          }}
                          className="inline-flex items-center gap-1 text-[#E0C57A] hover:underline font-semibold font-urdu-ui"
                        >
                          <Play size={12} />
                          <span>{lang === 'en' ? 'Play in Theater' : 'تھیٹر میں دیکھیں'}</span>
                        </button>
                      )}

                      {isDoc && (
                        <button
                          onClick={() => setDocModalItem(item)}
                          className="inline-flex items-center gap-1 text-sky-300 hover:underline font-semibold font-urdu-ui"
                        >
                          <FileText size={12} />
                          <span>{lang === 'en' ? 'Read Order' : 'حکم پڑھیں'}</span>
                        </button>
                      )}

                      {isImg && (
                        <button
                          onClick={() => setImageModalItem(item)}
                          className="inline-flex items-center gap-1 text-emerald-300 hover:underline font-semibold font-urdu-ui"
                        >
                          <Eye size={12} />
                          <span>{lang === 'en' ? 'View Photo' : 'تصویر دیکھیں'}</span>
                        </button>
                      )}

                      {isExt && (
                        <a
                          href={item.sourceUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-amber-300 hover:underline font-semibold font-urdu-ui"
                        >
                          <ExternalLink size={12} />
                          <span>{lang === 'en' ? 'Open Source' : 'ماخذ کھولیں'}</span>
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* 5. Modal for High-Resolution Archival Images */}
      {imageModalItem && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#0E1738] border border-slate-700 rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl flex flex-col">
            <div className="p-4 border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ImageIcon size={18} className="text-[#C5A85C]" />
                <h3 className="text-sm font-bold text-white font-urdu-ui">
                  {imageModalItem.title[lang]}
                </h3>
              </div>
              <button
                onClick={() => setImageModalItem(null)}
                className="p-1 rounded text-slate-400 hover:text-white hover:bg-slate-800"
              >
                <X size={18} />
              </button>
            </div>

            <div className="p-4 bg-black flex items-center justify-center">
              <img
                src={imageModalItem.imageMetadata?.largeUrl || imageModalItem.sourceUrl}
                alt={imageModalItem.imageMetadata?.alt[lang] || imageModalItem.title[lang]}
                className="max-h-[60vh] object-contain rounded"
              />
            </div>

            <div className="p-5 space-y-3 bg-[#111C3A]">
              <p className="text-xs sm:text-sm text-slate-200 font-urdu-ui leading-relaxed">
                {imageModalItem.description[lang]}
              </p>

              {imageModalItem.contextNotes && (
                <div className="p-3 rounded bg-[#091024] text-xs text-slate-300 font-urdu-ui border border-slate-800">
                  <span className="text-[#E0C57A] font-semibold block mb-1">
                    {lang === 'en' ? 'Archival Preservation Note:' : 'آرکائیو وضاحتی نوٹ:'}
                  </span>
                  {imageModalItem.contextNotes[lang]}
                </div>
              )}

              <div className="flex flex-wrap items-center justify-between gap-4 pt-2 border-t border-slate-800 text-xs text-slate-400">
                <span className="font-urdu-ui">
                  {lang === 'en' ? 'Publisher: ' : 'ادارہ: '}
                  {imageModalItem.sourcePublisher[lang]}
                </span>
                <span className="font-mono text-slate-300">
                  {imageModalItem.imageMetadata?.resolution || 'Archival Quality'}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 6. Modal for Certified Court Document Extracts */}
      {docModalItem && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#0E1738] border border-slate-700 rounded-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl flex flex-col">
            <div className="p-4 border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FileText size={18} className="text-[#C5A85C]" />
                <h3 className="text-sm font-bold text-white font-urdu-ui">
                  {docModalItem.title[lang]}
                </h3>
              </div>
              <button
                onClick={() => setDocModalItem(null)}
                className="p-1 rounded text-slate-400 hover:text-white hover:bg-slate-800"
              >
                <X size={18} />
              </button>
            </div>

            <div className="p-6 space-y-4 bg-[#111C3A]">
              <div className="flex flex-wrap items-center justify-between gap-2 text-xs border-b border-slate-800 pb-3">
                <span className="font-mono text-[#E0C57A] font-bold text-sm">
                  {docModalItem.documentMetadata?.citationFormat || docModalItem.id}
                </span>
                <span className="px-2 py-0.5 rounded bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 text-[11px] font-urdu-ui">
                  {lang === 'en' ? 'Certified Official Copy' : 'مصدقہ عدالتی نقل'}
                </span>
              </div>

              {/* Document Extract */}
              {docModalItem.documentMetadata?.extractText && (
                <div className="p-5 rounded-lg bg-[#091024] border border-[#C5A85C]/30 space-y-2">
                  <div className="text-[11px] font-semibold text-[#E0C57A] uppercase tracking-wider font-urdu-ui">
                    {lang === 'en' ? 'Operative Judicial Extract' : 'عدالتی فیصلے کا اہم اقتباس'}
                  </div>
                  <blockquote className="text-xs sm:text-sm text-slate-200 font-serif leading-relaxed italic border-l-2 rtl:border-l-0 rtl:border-r-2 border-[#C5A85C] pl-3 rtl:pl-0 rtl:pr-3">
                    {docModalItem.documentMetadata.extractText[lang]}
                  </blockquote>
                </div>
              )}

              <p className="text-xs text-slate-300 font-urdu-ui leading-relaxed">
                {docModalItem.description[lang]}
              </p>

              {docModalItem.contextNotes && (
                <div className="p-3 rounded bg-[#091024] text-xs text-slate-300 font-urdu-ui border border-slate-800">
                  <span className="text-[#E0C57A] font-semibold block mb-0.5">
                    {lang === 'en' ? 'Context & Legal Precedent:' : 'قانونی نظیر و تشریح:'}
                  </span>
                  {docModalItem.contextNotes[lang]}
                </div>
              )}

              {/* Actions inside modal */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-slate-800 text-xs">
                <button
                  onClick={() =>
                    handleCopyCitation(
                      `${docModalItem.title[lang]} [${docModalItem.documentMetadata?.citationFormat || docModalItem.id}] (${docModalItem.sourcePublisher[lang]})`
                    )
                  }
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-[#172346] hover:bg-[#1f2f5c] text-slate-200 border border-slate-700 transition-colors font-urdu-ui"
                >
                  {copiedCitation ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                  <span>{copiedCitation ? t.actions.citationCopied[lang] : t.actions.copyCitation[lang]}</span>
                </button>

                {docModalItem.associatedCaseIds[0] && (
                  <button
                    onClick={() => {
                      setDocModalItem(null);
                      handleOpenCaseDossier(docModalItem.associatedCaseIds[0]);
                    }}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-[#C5A85C] hover:bg-[#E0C57A] text-[#0B132B] font-semibold transition-colors font-urdu-ui"
                  >
                    <span>{lang === 'en' ? 'View Full Case Dossier' : 'مکمل مقدمہ دیکھیں'}</span>
                    <ExternalLink size={13} />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
