import React, { useState, useRef } from 'react';
import type { Article, JobNotification, WeatherData, DailyBriefingItem, ShortVideo } from '../types';
import {
  Flame,
  Bookmark,
  Share2,
  Sparkles,
  ChevronRight,
  Camera,
  Clock,
  Briefcase,
  GraduationCap,
  MapPin,
  Bot,
  ExternalLink,
  ChevronDown,
  Zap,
  Play
} from 'lucide-react';
import { WeatherCard } from './WeatherCard';
import { HYD_LOCALITIES, INITIAL_SHORTS } from '../mockData';

interface HomeScreenProps {
  articles: Article[];
  jobs: JobNotification[];
  weather: WeatherData;
  briefing: DailyBriefingItem[];
  language: 'English' | 'Telugu';
  onSelectArticle: (article: Article) => void;
  onOpenCitizenSubmit: () => void;
  savedArticleIds: string[];
  onToggleBookmark: (id: string) => void;
  onOpenShareModal: (title: string) => void;
  onOpenEducationJobs: () => void;
  onSelectJob: (job: JobNotification) => void;
  onOpenAIAssistant: () => void;
  onLocalityChange: (locality: string) => void;
  shorts?: ShortVideo[];
  onOpenShorts?: (shortId?: string) => void;
}

export const CATEGORIES = [
  'For You',
  'Hyderabad',
  'Telangana',
  'Education & Jobs',
  'India',
  'Politics',
  'Civic Issues',
  'Business',
  'Sports',
  'Entertainment'
];

export const HomeScreen: React.FC<HomeScreenProps> = ({
  articles,
  jobs,
  weather,
  briefing,
  language,
  onSelectArticle,
  onOpenCitizenSubmit,
  savedArticleIds,
  onToggleBookmark,
  onOpenShareModal,
  onOpenEducationJobs,
  onSelectJob,
  onOpenAIAssistant,
  onLocalityChange,
  shorts,
  onOpenShorts
}) => {
  const [selectedCategory, setSelectedCategory] = useState('For You');
  const [selectedLocalityFilter, setSelectedLocalityFilter] = useState('All');
  const [showLocalityPicker, setShowLocalityPicker] = useState(false);
  const breakingScrollRef = useRef<HTMLDivElement>(null);
  const nearMeScrollRef = useRef<HTMLDivElement>(null);
  const [nearMeActiveIndex, setNearMeActiveIndex] = useState(0);
  const latestNewsScrollRef = useRef<HTMLDivElement>(null);
  const [latestActiveIndex, setLatestActiveIndex] = useState(0);

  // Filter breaking news & hero
  const breakingArticles = articles.filter((a) => a.isBreaking);
  const heroArticle = articles.find((a) => a.isFeatured) || articles[0];

  // Top Stories (The Big Ones): Curated high-impact flagship stories
  const topStories = [
    heroArticle,
    articles.find((a) => a.id === 'telangana-it-growth-record') || articles[3],
    articles.find((a) => a.id === 'art-job-dsc-2026') || articles[4]
  ].filter(Boolean) as Article[];

  // Articles for News Near You (Filtered by locality or showing local civic & community stories)
  const nearMeArticles = articles.filter((a) => {
    if (selectedLocalityFilter === 'All') {
      return Boolean(
        a.locality ||
        a.location?.toLowerCase().includes('hyderabad') ||
        a.location?.toLowerCase().includes('madhapur') ||
        a.category === 'Civic Issues' ||
        a.category === 'Citizen Report'
      );
    }
    return (
      (a.locality && a.locality.toLowerCase().includes(selectedLocalityFilter.toLowerCase())) ||
      (a.location && a.location.toLowerCase().includes(selectedLocalityFilter.toLowerCase()))
    );
  });

  const handleNearMeScroll = () => {
    if (nearMeScrollRef.current) {
      const { scrollLeft } = nearMeScrollRef.current;
      const index = Math.round(scrollLeft / 190);
      setNearMeActiveIndex(Math.min(Math.max(index, 0), Math.min(2, Math.max(0, nearMeArticles.length - 1))));
    }
  };

  // Articles for the Latest News horizontal section (Top stories prioritizing Hyderabad, Telangana, India)
  const latestNewsList = articles.slice(0, 6);

  const handleLatestScroll = () => {
    if (latestNewsScrollRef.current) {
      const { scrollLeft } = latestNewsScrollRef.current;
      const index = Math.round(scrollLeft / 190);
      setLatestActiveIndex(Math.min(Math.max(index, 0), Math.min(2, latestNewsList.length - 1)));
    }
  };

  const getLatestCategoryBadge = (category: string) => {
    const cat = category.toLowerCase();
    if (cat.includes('hyderabad')) return 'bg-[#FF3B30] text-white';
    if (cat.includes('telangana')) return 'bg-[#0066FF] text-white';
    if (cat.includes('india') || cat.includes('national')) return 'bg-[#7C3AED] text-white';
    if (cat.includes('sport')) return 'bg-[#10B981] text-white';
    if (cat.includes('politics')) return 'bg-[#EA580C] text-white';
    if (cat.includes('civic')) return 'bg-[#0D9488] text-white';
    if (cat.includes('edu') || cat.includes('job')) return 'bg-[#0284C7] text-white';
    return 'bg-[#0066FF] text-white';
  };

  const getLatestArrowButton = (category: string) => {
    const cat = category.toLowerCase();
    if (cat.includes('hyderabad')) return 'bg-[#FFF0F0] text-[#FF3B30]';
    if (cat.includes('telangana')) return 'bg-[#EEF4FF] text-[#0066FF]';
    if (cat.includes('india') || cat.includes('national')) return 'bg-[#F5F3FF] text-[#7C3AED]';
    if (cat.includes('sport')) return 'bg-[#ECFDF5] text-[#10B981]';
    if (cat.includes('politics')) return 'bg-[#FFF7ED] text-[#EA580C]';
    if (cat.includes('civic')) return 'bg-[#F0FDFA] text-[#0D9488]';
    if (cat.includes('edu') || cat.includes('job')) return 'bg-[#F0F9FF] text-[#0284C7]';
    return 'bg-[#EEF4FF] text-[#0066FF]';
  };

  const jobsScrollRef = useRef<HTMLDivElement>(null);

  const getJobStatusBadge = (status: JobNotification['status']) => {
    switch (status) {
      case 'Applications Open':
        return {
          bg: 'bg-emerald-50 text-emerald-700 border-emerald-200',
          dot: 'bg-emerald-500 animate-pulse'
        };
      case 'Hall Tickets Released':
        return {
          bg: 'bg-amber-50 text-amber-700 border-amber-200',
          dot: 'bg-amber-500'
        };
      case 'Upcoming':
        return {
          bg: 'bg-blue-50 text-blue-700 border-blue-200',
          dot: 'bg-blue-500'
        };
      default:
        return {
          bg: 'bg-gray-50 text-gray-700 border-gray-200',
          dot: 'bg-gray-400'
        };
    }
  };

  return (
    <div className="pb-24 bg-[#F8F9FA] min-h-screen">
      {/* Category Navigation Strip */}
      <div className="sticky top-[52px] z-30 bg-white/95 backdrop-blur-xl border-b border-gray-150/70 overflow-x-auto scrollbar-none px-3.5 py-2 flex items-center space-x-2">
        {CATEGORIES.map((cat) => {
          const isSelected = selectedCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => {
                if (cat === 'Education & Jobs') {
                  onOpenEducationJobs();
                } else {
                  setSelectedCategory(cat);
                }
              }}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all duration-200 cursor-pointer active:scale-95 ${
                isSelected
                  ? 'bg-gradient-to-r from-[#C9252D] to-[#AA1B23] text-white shadow-[0_3px_10px_rgba(201,37,45,0.3)]'
                  : 'bg-gray-100/80 hover:bg-gray-200/80 text-gray-700 border border-gray-200/50'
              }`}
            >
              {cat === 'Education & Jobs' && <span className="mr-1">🎓</span>}
              {cat}
            </button>
          );
        })}
      </div>

      {/* Signature Broadcast Breaking News Carousel Bar */}
      {breakingArticles.length > 0 && (
        <section className="mx-3 mt-2.5 rounded-2xl bg-gradient-to-r from-[#FFF0F3] via-[#FFF8F9] to-[#FFF0F3] border border-[#FFD4DC] p-2.5 shadow-sm relative overflow-hidden">
          {/* Header Row: Slanted Red Banner + Status Pill + View All */}
          <div className="flex items-center justify-between gap-1.5 mb-2.5">
            {/* Left: Slanted Red Banner + Live Status */}
            <div className="flex items-center gap-1.5">
              <div
                className="flex items-center gap-1.5 text-white px-3 py-1 rounded-l-xl shadow-sm"
                style={{
                  background: 'linear-gradient(90deg, #E01E2B 0%, #C9252D 55%, #99131A 100%)',
                  clipPath: 'polygon(0 0, 100% 0, 88% 100%, 0 100%)',
                  paddingRight: '1.2rem'
                }}
              >
                <div className="w-4 h-4 rounded-full bg-white flex items-center justify-center text-[#C9252D] shadow-2xs">
                  <Zap size={10} className="fill-current text-[#C9252D]" />
                </div>
                <span className="font-black italic text-[11px] sm:text-xs tracking-wider text-white uppercase drop-shadow-xs">
                  {language === 'Telugu' ? 'తాజా వార్తలు' : 'BREAKING NEWS'}
                </span>
              </div>

            </div>

            {/* Right: View All Button */}
            <button
              onClick={() => onSelectArticle(breakingArticles[0])}
              className="text-[11px] font-bold text-[#C9252D] hover:text-red-800 flex items-center gap-1 cursor-pointer flex-shrink-0 transition-transform active:scale-95"
            >
              <span>View All</span>
              <div className="w-4 h-4 rounded-full bg-red-100 flex items-center justify-center text-[#C9252D]">
                <ChevronRight size={11} className="stroke-[3]" />
              </div>
            </button>
          </div>

          {/* Horizontal Card Carousel */}
          <div className="relative">
            <div
              ref={breakingScrollRef}
              className="flex items-stretch gap-2.5 overflow-x-auto scrollbar-none py-0.5 relative scroll-smooth pr-7"
            >
              {breakingArticles.map((b, idx) => {
                const isHeroCard = idx === 0;

                if (isHeroCard) {
                  // Hero Featured Breaking Card (Compact, obsidian with red border)
                  return (
                    <div
                      key={b.id}
                      onClick={() => onSelectArticle(b)}
                      className="w-[215px] min-w-[215px] max-w-[215px] h-[145px] rounded-xl relative overflow-hidden cursor-pointer group flex-shrink-0 border-[1.5px] border-red-500 shadow-md flex flex-col justify-between p-2"
                    >
                      {/* Image background with zoom */}
                      <img
                        src={b.imageUrl}
                        alt={b.title}
                        className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                      />

                      {/* Multi-stop dark gradient overlay for text readability */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/20" />

                      {/* Top Badges: Category + Time */}
                      <div className="relative z-10 flex items-center justify-between">
                        <span className="bg-[#E01E2B] text-white text-[8px] font-black uppercase tracking-wider px-1.5 py-0.5 rounded shadow">
                          {b.category}
                        </span>
                        <span className="bg-black/75 backdrop-blur-md text-white text-[8px] font-medium px-1.5 py-0.5 rounded border border-white/20 shadow">
                          {b.publishedAt}
                        </span>
                      </div>

                      {/* Bottom Content: Headline + White Arrow + Dots */}
                      <div className="relative z-10">
                        <h3 className="font-sans font-bold text-[11px] text-white leading-tight line-clamp-2 drop-shadow-md mb-1.5 group-hover:text-red-200 transition-colors">
                          {language === 'Telugu' && b.titleTe ? b.titleTe : b.title}
                        </h3>

                        <div className="flex items-center justify-between">
                          {/* Carousel indicator bar */}
                          <div className="flex items-center gap-1">
                            <span className="w-5 h-[3px] bg-[#E01E2B] rounded-full shadow-xs" />
                            <span className="w-2.5 h-[3px] bg-white/40 rounded-full" />
                            <span className="w-2.5 h-[3px] bg-white/40 rounded-full" />
                          </div>

                          {/* White circle button with dark arrow */}
                          <div className="w-6 h-6 rounded-full bg-white text-gray-900 flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                            <ChevronRight size={13} className="stroke-[3]" />
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                }

                // Sub-Breaking News Cards (Crisp white cards matching the mockup)
                return (
                  <div
                    key={b.id}
                    onClick={() => onSelectArticle(b)}
                    className="w-[145px] min-w-[145px] max-w-[145px] h-[145px] rounded-xl bg-white border border-gray-150 p-1.5 flex flex-col justify-between cursor-pointer group flex-shrink-0 shadow-xs hover:shadow-md transition active:scale-95"
                  >
                    <div>
                      {/* Image Container with Badges */}
                      <div className="h-[72px] w-full rounded-lg overflow-hidden relative shadow-2xs">
                        <img
                          src={b.imageUrl}
                          alt={b.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/35 to-transparent" />

                        {/* Badges on image */}
                        <div className="absolute top-1 left-1 right-1 flex items-center justify-between z-10">
                          <span className="bg-[#E01E2B] text-white text-[7.5px] font-black uppercase tracking-wider px-1 py-0.5 rounded shadow-xs">
                            {b.category}
                          </span>
                          <span className="bg-black/75 backdrop-blur-md text-white text-[7.5px] font-medium px-1 py-0.5 rounded border border-white/20">
                            {b.publishedAt}
                          </span>
                        </div>
                      </div>

                      {/* Headline */}
                      <h4 className="font-sans font-bold text-[10px] text-gray-900 leading-tight line-clamp-2 mt-1.5 group-hover:text-[#C9252D] transition-colors">
                        {language === 'Telugu' && b.titleTe ? b.titleTe : b.title}
                      </h4>
                    </div>

                    {/* Bottom Red Circle Arrow */}
                    <div className="flex items-center justify-end mt-1">
                      <div className="w-5 h-5 rounded-full bg-red-50 text-[#C9252D] flex items-center justify-center group-hover:bg-[#C9252D] group-hover:text-white transition-all shadow-2xs">
                        <ChevronRight size={11} className="stroke-[3]" />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Floating Right Navigation Chevron */}
            <button
              onClick={() => {
                if (breakingScrollRef.current) {
                  breakingScrollRef.current.scrollBy({ left: 160, behavior: 'smooth' });
                }
              }}
              className="absolute -right-1 top-1/2 -translate-y-1/2 z-20 w-7 h-7 rounded-full bg-white shadow-lg border border-gray-150 flex items-center justify-center text-gray-800 hover:text-[#C9252D] hover:scale-105 transition cursor-pointer active:scale-90"
              title="Scroll Next Breaking News"
            >
              <ChevronRight size={16} className="stroke-[2.5]" />
            </button>
          </div>
        </section>
      )}

      {/* Signature News Near You Section (Between Breaking News and Latest News) */}
      <section className="mt-3.5 relative">
        {/* Section Header: Emerald Vertical Bar + "News Near You" + Locality Selector Pill */}
        <div className="flex items-center justify-between mb-2 px-3">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-5 bg-[#059669] rounded-full shadow-xs" />
            <h2 className="font-black text-lg sm:text-xl text-[#0B1220] tracking-tight flex items-center gap-1.5">
              <span>{language === 'Telugu' ? 'నా ప్రాంత వార్తలు' : 'News Near You'}</span>
            </h2>
          </div>

          <div className="relative">
            <button
              onClick={() => setShowLocalityPicker(!showLocalityPicker)}
              className="bg-[#ECFDF5] hover:bg-[#D1FAE5] text-[#059669] font-bold text-[11px] px-3 py-1 rounded-full flex items-center gap-1 transition-all active:scale-95 cursor-pointer shadow-2xs border border-emerald-100/80"
            >
              <MapPin size={11} className="stroke-[2.5]" />
              <span className="max-w-[100px] truncate">
                {selectedLocalityFilter === 'All'
                  ? language === 'Telugu'
                    ? 'హైదరాబాద్ (అన్నీ)'
                    : 'Near Me (All)'
                  : selectedLocalityFilter}
              </span>
              <ChevronDown size={11} className="stroke-[2.5]" />
            </button>

            {/* Dropdown Menu for Locality Selection */}
            {showLocalityPicker && (
              <div className="absolute top-full right-0 mt-1.5 w-48 bg-white/95 backdrop-blur-xl border border-gray-200 rounded-2xl shadow-xl z-50 p-1.5 max-h-56 overflow-y-auto text-xs animate-scaleUp">
                {HYD_LOCALITIES.map((loc) => {
                  const isCur =
                    (selectedLocalityFilter === 'All' && loc === 'All Localities') ||
                    selectedLocalityFilter === loc;
                  return (
                    <button
                      key={loc}
                      onClick={() => {
                        setSelectedLocalityFilter(loc === 'All Localities' ? 'All' : loc);
                        setShowLocalityPicker(false);
                      }}
                      className={`w-full text-left px-2.5 py-1.5 rounded-xl font-medium transition flex items-center justify-between cursor-pointer ${
                        isCur
                          ? 'bg-[#ECFDF5] text-[#059669] font-bold'
                          : 'hover:bg-gray-50 text-gray-700'
                      }`}
                    >
                      <span>{loc}</span>
                      {isCur && <span className="w-1.5 h-1.5 rounded-full bg-[#059669]" />}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Horizontal Cards Strip */}
        <div
          ref={nearMeScrollRef}
          onScroll={handleNearMeScroll}
          className="flex items-stretch gap-2.5 overflow-x-auto scrollbar-none px-3 py-0.5 scroll-smooth snap-x snap-mandatory"
        >
          {nearMeArticles.length > 0 ? (
            nearMeArticles.map((article) => {
              const isSaved = savedArticleIds.includes(article.id);
              const localityTag = article.locality
                ? article.locality.split('/')[0].trim()
                : article.location || 'Local Area';

              return (
                <div
                  key={article.id}
                  onClick={() => onSelectArticle(article)}
                  className="w-[180px] min-w-[180px] sm:w-[195px] sm:min-w-[195px] bg-white rounded-xl sm:rounded-2xl p-2 border border-[#EAEEF4] shadow-[0_3px_12px_rgba(0,0,0,0.03)] flex flex-col justify-between cursor-pointer group snap-start flex-shrink-0 transition-all hover:shadow-md hover:border-emerald-100 active:scale-[0.99]"
                >
                  {/* Top Image */}
                  <div className="relative w-full h-28 sm:h-32 rounded-lg sm:rounded-xl overflow-hidden bg-gray-100 flex-shrink-0">
                    <img
                      src={article.imageUrl}
                      alt={article.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/25 via-transparent to-transparent pointer-events-none" />

                    {/* Overlaid Top-Left Locality Pill */}
                    <span className="absolute top-1.5 left-1.5 text-[8.5px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full shadow-xs bg-[#059669] text-white flex items-center gap-0.5">
                      <MapPin size={8} className="fill-white" />
                      <span className="max-w-[75px] truncate">{localityTag}</span>
                    </span>

                    {/* Overlaid Top-Right Bookmark Button */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleBookmark(article.id);
                      }}
                      className="absolute top-1.5 right-1.5 w-6 h-6 rounded-full bg-black/45 hover:bg-black/60 backdrop-blur-md text-white flex items-center justify-center transition-all border border-white/20 active:scale-90"
                      title="Bookmark"
                    >
                      <Bookmark
                        size={11}
                        className={isSaved ? 'fill-white text-white' : 'text-white'}
                      />
                    </button>
                  </div>

                  {/* Body Below Image */}
                  <div className="pt-2 pb-0.5 flex flex-col justify-between flex-1">
                    <div className="flex items-center gap-1 text-[10px] font-semibold text-gray-400">
                      <span className="text-[#059669] font-bold">Local</span>
                      <span>•</span>
                      <span>{article.publishedAt}</span>
                    </div>

                    <div className="flex items-end justify-between gap-1.5 mt-1">
                      <h3 className="font-bold text-[12px] sm:text-[12.5px] text-[#0B0F19] leading-snug line-clamp-2 transition-colors flex-1">
                        {language === 'Telugu' && article.titleTe ? article.titleTe : article.title}
                      </h3>

                      {/* Bottom-Right Circular Arrow Button */}
                      <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 transition-transform group-hover:scale-110 shadow-xs bg-[#ECFDF5] text-[#059669] group-hover:bg-[#059669] group-hover:text-white">
                        <ChevronRight size={12} className="stroke-[3]" />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="w-full py-6 text-center text-gray-500 bg-white rounded-xl border border-gray-150 p-3">
              <p className="text-xs font-bold text-gray-700">No stories found for "{selectedLocalityFilter}"</p>
              <button
                onClick={() => setSelectedLocalityFilter('All')}
                className="mt-1.5 text-xs text-[#059669] font-bold underline cursor-pointer"
              >
                Reset to All Localities
              </button>
            </div>
          )}
        </div>

        {/* Carousel Pagination Indicator Dots */}
        {nearMeArticles.length > 1 && (
          <div className="flex items-center justify-center gap-1.5 mt-2.5 mb-0.5">
            {nearMeArticles.slice(0, 3).map((_, idx) => (
              <button
                key={idx}
                onClick={() => {
                  if (nearMeScrollRef.current) {
                    nearMeScrollRef.current.scrollTo({
                      left: idx * 190,
                      behavior: 'smooth'
                    });
                    setNearMeActiveIndex(idx);
                  }
                }}
                className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                  nearMeActiveIndex === idx
                    ? 'w-5 bg-[#059669]'
                    : 'w-2 bg-[#D1FAE5] hover:bg-emerald-200'
                }`}
                aria-label={`Slide ${idx + 1}`}
              />
            ))}
          </div>
        )}
      </section>

      {/* Signature Latest News Section (Exact Match to Reference Design) */}
      <section className="mt-3.5">
        {/* Section Header: Blue Vertical Bar + "Latest News" + "View All >" Pill Button */}
        <div className="flex items-center justify-between mb-2 px-3">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-5 bg-[#0066FF] rounded-full shadow-xs" />
            <h2 className="font-black text-lg sm:text-xl text-[#0B1220] tracking-tight">
              {language === 'Telugu' ? 'తాజా వార్తలు' : 'Latest News'}
            </h2>
          </div>

          <button
            onClick={() => {
              const moreSec = document.getElementById('more-stories-section');
              if (moreSec) {
                moreSec.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            className="bg-[#EEF4FF] hover:bg-[#DDEBFF] text-[#0066FF] font-bold text-[11px] px-3 py-1 rounded-full flex items-center gap-1 transition-all active:scale-95 cursor-pointer shadow-2xs"
          >
            <span>{language === 'Telugu' ? 'అన్నీ చూడండి' : 'View All'}</span>
            <ChevronRight size={12} className="stroke-[3]" />
          </button>
        </div>

        {/* Horizontal Cards Strip */}
        <div
          ref={latestNewsScrollRef}
          onScroll={handleLatestScroll}
          className="flex items-stretch gap-2.5 overflow-x-auto scrollbar-none px-3 py-0.5 scroll-smooth snap-x snap-mandatory"
        >
          {latestNewsList.map((article) => {
            const isSaved = savedArticleIds.includes(article.id);

            return (
              <div
                key={article.id}
                onClick={() => onSelectArticle(article)}
                className="w-[180px] min-w-[180px] sm:w-[195px] sm:min-w-[195px] bg-white rounded-xl sm:rounded-2xl p-2 border border-[#EAEEF4] shadow-[0_3px_12px_rgba(0,0,0,0.03)] flex flex-col justify-between cursor-pointer group snap-start flex-shrink-0 transition-all hover:shadow-md hover:border-blue-100 active:scale-[0.99]"
              >
                {/* Card Top Image */}
                <div className="relative w-full h-28 sm:h-32 rounded-lg sm:rounded-xl overflow-hidden bg-gray-100 flex-shrink-0">
                  <img
                    src={article.imageUrl}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-black/25 via-transparent to-transparent pointer-events-none" />

                  {/* Overlaid Top-Left Category Pill */}
                  <span
                    className={`absolute top-1.5 left-1.5 text-[8.5px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full shadow-xs ${getLatestCategoryBadge(
                      article.category
                    )}`}
                  >
                    {article.category}
                  </span>

                  {/* Overlaid Top-Right Bookmark Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleBookmark(article.id);
                    }}
                    className="absolute top-1.5 right-1.5 w-6 h-6 rounded-full bg-black/45 hover:bg-black/60 backdrop-blur-md text-white flex items-center justify-center transition-all border border-white/20 active:scale-90"
                    title="Bookmark"
                  >
                    <Bookmark
                      size={11}
                      className={isSaved ? 'fill-white text-white' : 'text-white'}
                    />
                  </button>
                </div>

                {/* Card Body Below Image */}
                <div className="pt-2 pb-0.5 flex flex-col justify-between flex-1">
                  <span className="text-[10px] font-semibold text-gray-400">
                    {article.publishedAt}
                  </span>

                  <div className="flex items-end justify-between gap-1.5 mt-1">
                    <h3 className="font-bold text-[12px] sm:text-[12.5px] text-[#0B0F19] leading-snug line-clamp-2 transition-colors flex-1">
                      {language === 'Telugu' && article.titleTe ? article.titleTe : article.title}
                    </h3>

                    {/* Bottom-Right Circular Arrow Button */}
                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 transition-transform group-hover:scale-110 shadow-xs ${getLatestArrowButton(
                        article.category
                      )}`}
                    >
                      <ChevronRight size={12} className="stroke-[3]" />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Carousel Pagination Indicator Dots (Matching Reference Design) */}
        <div className="flex items-center justify-center gap-1.5 mt-2.5 mb-0.5">
          {latestNewsList.slice(0, 3).map((_, idx) => (
            <button
              key={idx}
              onClick={() => {
                if (latestNewsScrollRef.current) {
                  latestNewsScrollRef.current.scrollTo({
                    left: idx * 190,
                    behavior: 'smooth'
                  });
                  setLatestActiveIndex(idx);
                }
              }}
              className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                latestActiveIndex === idx
                  ? 'w-5 bg-[#0066FF]'
                  : 'w-2 bg-[#DCE6F5] hover:bg-blue-200'
              }`}
              aria-label={`Slide ${idx + 1}`}
            />
          ))}
        </div>
      </section>

      {/* Signature Top Stories Section ("The Big Ones" - Clean, Bold & Neat) */}
      <section className="mt-4 px-3">
        {/* Section Header: Crimson Vertical Bar + "Top Stories" + Editor's Pick Badge */}
        <div className="flex items-center justify-between mb-2.5">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-5 bg-[#C9252D] rounded-full shadow-xs" />
            <h2 className="font-black text-lg sm:text-xl text-[#0B1220] tracking-tight flex items-center gap-2">
              <span>{language === 'Telugu' ? 'ప్రధాన కథనాలు' : 'Top Stories'}</span>
            </h2>
          </div>

          <div className="flex items-center gap-1.5">
            <span className="bg-red-50 text-[#C9252D] font-bold text-[11px] px-2.5 py-1 rounded-full border border-red-100 flex items-center gap-1">
              <Flame size={12} className="fill-[#C9252D]" />
              <span>{language === 'Telugu' ? 'ముఖ్యాంశాలు' : 'Editor’s Pick'}</span>
            </span>
          </div>
        </div>

        {/* Big Top Stories Showcase */}
        <div className="space-y-3.5">
          {topStories.map((story, idx) => {
            const isSaved = savedArticleIds.includes(story.id);
            const isPrimary = idx === 0;

            if (isPrimary) {
              // Primary Lead Big Hero Card
              return (
                <article
                  key={story.id}
                  onClick={() => onSelectArticle(story)}
                  className="group bg-white rounded-2xl sm:rounded-3xl overflow-hidden border border-gray-150/90 shadow-[0_6px_24px_rgba(0,0,0,0.05)] hover:shadow-lg transition-all duration-300 cursor-pointer active:scale-[0.99]"
                >
                  {/* Big Cinematic Image Container */}
                  <div className="relative aspect-16/10 sm:h-64 overflow-hidden bg-gray-950">
                    <img
                      src={story.imageUrl}
                      alt={story.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent pointer-events-none" />

                    {/* Top Floating Badges & Action Icons */}
                    <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10">
                      <div className="flex items-center gap-1.5">
                        <span className="bg-[#C9252D] text-white text-[9.5px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full shadow-md flex items-center gap-1">
                          <Flame size={11} className="fill-white" />
                          <span>{language === 'Telugu' ? 'టాప్ స్టోరీ' : 'TOP STORY'}</span>
                        </span>
                        <span className="bg-black/55 backdrop-blur-md text-white text-[9.5px] font-bold px-2.5 py-1 rounded-full border border-white/20">
                          {story.category}
                        </span>
                      </div>

                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onToggleBookmark(story.id);
                          }}
                          className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-black/45 hover:bg-black/65 backdrop-blur-md text-white flex items-center justify-center transition-all border border-white/20 active:scale-90"
                          title="Bookmark"
                        >
                          <Bookmark
                            size={13}
                            className={isSaved ? 'fill-white text-white' : 'text-white'}
                          />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onOpenShareModal(story.title);
                          }}
                          className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-black/45 hover:bg-black/65 backdrop-blur-md text-white flex items-center justify-center transition-all border border-white/20 active:scale-90"
                          title="Share"
                        >
                          <Share2 size={13} />
                        </button>
                      </div>
                    </div>

                    {/* Bottom Floating Headline On Image */}
                    <div className="absolute bottom-3 left-3 right-3 text-white">
                      <div className="flex items-center gap-1.5 text-[10.5px] text-gray-300 font-mono mb-1">
                        <Clock size={11} />
                        <span>{story.publishedAt} • {story.readTime || '3 min read'}</span>
                      </div>
                      <h3 className="text-base sm:text-lg font-bold font-serif leading-snug drop-shadow-sm line-clamp-2 group-hover:text-red-100 transition-colors">
                        {language === 'Telugu' && story.titleTe ? story.titleTe : story.title}
                      </h3>
                    </div>
                  </div>

                  {/* Card Body Underneath */}
                  <div className="p-3.5 bg-white">
                    <p className="text-xs text-gray-600 line-clamp-2 leading-relaxed font-sans">
                      {language === 'Telugu' && story.summaryTe ? story.summaryTe : story.summary}
                    </p>

                    <div className="mt-2.5 flex items-center justify-between pt-2 border-t border-gray-100 text-[11px] text-gray-500">
                      <div className="flex items-center gap-1.5">
                        <div className="w-5 h-5 rounded-full bg-red-100 text-[#C9252D] font-black text-[9px] flex items-center justify-center">
                          TJ
                        </div>
                        <span className="font-bold text-gray-800">{story.author}</span>
                      </div>
                      <span className="text-[#C9252D] font-bold text-xs flex items-center gap-0.5 group-hover:translate-x-0.5 transition-transform">
                        <span>Read Full Story</span>
                        <ChevronRight size={14} className="stroke-[2.5]" />
                      </span>
                    </div>
                  </div>
                </article>
              );
            }

            // Secondary Big Top Story (High-Impact Banner Card)
            return (
              <article
                key={story.id}
                onClick={() => onSelectArticle(story)}
                className="group bg-white rounded-2xl p-3 border border-gray-150/90 shadow-[0_4px_16px_rgba(0,0,0,0.04)] hover:shadow-md transition-all duration-300 cursor-pointer active:scale-[0.99] flex flex-col sm:flex-row gap-3"
              >
                {/* Secondary Big Card Image */}
                <div className="relative w-full sm:w-44 h-36 sm:h-32 rounded-xl overflow-hidden bg-gray-950 flex-shrink-0">
                  <img
                    src={story.imageUrl}
                    alt={story.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />

                  <span className="absolute top-2 left-2 bg-black/60 backdrop-blur-md text-white text-[8.5px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full border border-white/20">
                    {story.category}
                  </span>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleBookmark(story.id);
                    }}
                    className="absolute top-2 right-2 w-6 h-6 rounded-full bg-black/45 backdrop-blur-md text-white flex items-center justify-center"
                  >
                    <Bookmark
                      size={11}
                      className={isSaved ? 'fill-white text-white' : 'text-white'}
                    />
                  </button>
                </div>

                {/* Secondary Content */}
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 text-[10px] text-gray-400 font-mono mb-1">
                      <Clock size={10} />
                      <span>{story.publishedAt}</span>
                      <span>•</span>
                      <span>{story.readTime || '3 min read'}</span>
                    </div>

                    <h4 className="font-serif font-bold text-sm text-gray-950 leading-snug line-clamp-2 group-hover:text-[#C9252D] transition-colors">
                      {language === 'Telugu' && story.titleTe ? story.titleTe : story.title}
                    </h4>

                    <p className="text-[11.5px] text-gray-500 line-clamp-2 mt-1 leading-relaxed">
                      {language === 'Telugu' && story.summaryTe ? story.summaryTe : story.summary}
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-2 mt-2 border-t border-gray-100 text-[10.5px]">
                    <span className="font-semibold text-gray-700 truncate max-w-[140px]">{story.author}</span>
                    <span className="text-[#C9252D] font-bold flex items-center gap-0.5">
                      <span>Read Story</span>
                      <ChevronRight size={13} className="stroke-[2.5]" />
                    </span>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* Dedicated Education & Jobs Section (Directly Below Top Stories) */}
      <section className="mt-4 px-3">
        {/* Section Header: Indigo Vertical Bar + "Education & Jobs" + "View All >" */}
        <div className="flex items-center justify-between mb-2.5">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-5 bg-[#4F46E5] rounded-full shadow-xs" />
            <h2 className="font-black text-lg sm:text-xl text-[#0B1220] tracking-tight flex items-center gap-1.5">
              <GraduationCap size={18} className="text-[#4F46E5]" />
              <span>{language === 'Telugu' ? 'విద్య & ఉద్యోగాలు' : 'Education & Jobs'}</span>
            </h2>
          </div>

          <button
            onClick={onOpenEducationJobs}
            className="bg-[#EEF2FF] hover:bg-[#E0E7FF] text-[#4F46E5] font-bold text-[11px] px-3 py-1 rounded-full flex items-center gap-1 transition-all active:scale-95 cursor-pointer shadow-2xs border border-indigo-100"
          >
            <span>{language === 'Telugu' ? 'అన్నీ చూడండి' : 'View All'}</span>
            <ChevronRight size={12} className="stroke-[3]" />
          </button>
        </div>

        {/* Live Recruitment Vacancy Pills Strip */}
        <div className="flex items-center gap-2 overflow-x-auto scrollbar-none pb-2 pt-0.5">
          {[
            { label: 'TSPSC Group-2', count: '783 Vacancies', color: 'bg-amber-50 text-amber-800 border-amber-200/80' },
            { label: 'Mega DSC Teachers', count: '11,062 Posts', color: 'bg-emerald-50 text-emerald-800 border-emerald-200/80' },
            { label: 'Telangana Police', count: '6,400 SI & Constables', color: 'bg-blue-50 text-blue-800 border-blue-200/80' },
            { label: 'Central SSC CGL', count: '14,000 Posts', color: 'bg-purple-50 text-purple-800 border-purple-200/80' }
          ].map((pill, idx) => (
            <div
              key={idx}
              onClick={onOpenEducationJobs}
              className={`px-2.5 py-1 rounded-lg border text-[10px] font-semibold whitespace-nowrap cursor-pointer transition active:scale-95 flex items-center gap-1.5 flex-shrink-0 ${pill.color}`}
            >
              <span className="font-black">{pill.label}:</span>
              <span>{pill.count}</span>
            </div>
          ))}
        </div>

        {/* Horizontal Job Notifications Cards Strip */}
        <div
          ref={jobsScrollRef}
          className="flex items-stretch gap-2.5 overflow-x-auto scrollbar-none py-1 scroll-smooth snap-x snap-mandatory"
        >
          {jobs.slice(0, 5).map((job) => {
            const statusStyle = getJobStatusBadge(job.status);

            return (
              <div
                key={job.id}
                onClick={() => onSelectJob(job)}
                className="w-[220px] min-w-[220px] sm:w-[240px] sm:min-w-[240px] bg-white rounded-xl sm:rounded-2xl p-3 border border-[#EAEEF4] shadow-[0_3px_12px_rgba(0,0,0,0.03)] flex flex-col justify-between cursor-pointer group snap-start flex-shrink-0 transition-all hover:shadow-md hover:border-indigo-200 active:scale-[0.99]"
              >
                <div>
                  {/* Top Badges Row */}
                  <div className="flex items-center justify-between gap-1 mb-2">
                    <span className={`text-[8.5px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full border flex items-center gap-1 ${statusStyle.bg}`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${statusStyle.dot}`} />
                      <span>{job.status}</span>
                    </span>

                    <span className="bg-[#EEF2FF] text-[#4F46E5] font-black text-[9.5px] px-2 py-0.5 rounded-md border border-indigo-100">
                      {job.vacancies.toLocaleString()} Posts
                    </span>
                  </div>

                  {/* Job Title */}
                  <h3 className="font-bold text-xs sm:text-[12.5px] text-[#0B0F19] leading-snug line-clamp-2 group-hover:text-[#4F46E5] transition-colors">
                    {language === 'Telugu' && job.titleTe ? job.titleTe : job.title}
                  </h3>

                  {/* Department & Qualification */}
                  <p className="text-[10px] text-gray-500 line-clamp-1 mt-1 font-medium">
                    {job.department}
                  </p>

                  <div className="mt-2 flex items-center gap-1 text-[10px] text-gray-600 bg-gray-50 px-2 py-1 rounded-md border border-gray-100">
                    <Briefcase size={10} className="text-gray-400 flex-shrink-0" />
                    <span className="truncate">{job.qualification} • Age: {job.ageLimit.split('(')[0].trim()}</span>
                  </div>
                </div>

                {/* Card Footer: Deadline & Arrow Button */}
                <div className="pt-2.5 mt-2 border-t border-gray-100 flex items-center justify-between">
                  <div className="flex items-center gap-1 text-[10px] text-gray-400 font-medium">
                    <Clock size={10} className="text-gray-400" />
                    <span>Ends: <strong className="text-gray-700">{job.applicationDeadline}</strong></span>
                  </div>

                  <div className="w-6 h-6 rounded-full bg-[#EEF2FF] text-[#4F46E5] flex items-center justify-center transition-transform group-hover:scale-110 shadow-xs group-hover:bg-[#4F46E5] group-hover:text-white">
                    <ChevronRight size={12} className="stroke-[3]" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* High-Impact Student Hub & Daily Quiz Banner */}
        <div
          onClick={onOpenEducationJobs}
          className="mt-3 bg-gradient-to-r from-[#0F172A] via-[#1E1B4B] to-[#0A0E18] rounded-2xl p-3.5 text-white flex items-center justify-between border border-indigo-500/30 shadow-[0_4px_16px_rgba(0,0,0,0.12)] cursor-pointer hover:border-indigo-400/60 transition-all group active:scale-[0.99] relative overflow-hidden"
        >
          <div className="absolute -right-6 -top-6 w-28 h-28 bg-indigo-500/15 rounded-full blur-xl" />

          <div className="space-y-1 relative z-10 max-w-[75%]">
            <div className="flex items-center gap-1.5 text-indigo-300 text-[10px] font-black uppercase tracking-wider">
              <Sparkles size={13} className="text-amber-400" />
              <span>{language === 'Telugu' ? 'డైలీ క్విజ్ & పరీక్షల క్యాలెండర్' : 'Daily Quiz & Exam Calendar'}</span>
            </div>
            <h4 className="text-xs sm:text-sm font-extrabold text-white leading-tight group-hover:text-amber-300 transition-colors">
              {language === 'Telugu' ? 'టీఎస్‌పీఎస్సీ & డీఎస్సీ 5-MCQ మాక్ టెస్ట్' : 'TSPSC & DSC Daily 5-MCQ Practice'}
            </h4>
            <p className="text-[10px] text-gray-300 line-clamp-1">
              General Studies & Telangana History • Instant answer explanations
            </p>
          </div>

          <button className="relative z-10 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 text-gray-950 font-black text-xs px-3 py-1.5 rounded-xl transition-all shadow-md flex items-center gap-0.5 flex-shrink-0 cursor-pointer active:scale-95">
            <span>Practice</span>
            <ChevronRight size={13} strokeWidth={2.5} />
          </button>
        </div>
      </section>

      {/* Trending Videos / Shorts Section */}
      <section className="mt-4 px-3">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-2.5">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-5 bg-gradient-to-b from-[#C9252D] to-[#99131A] rounded-full" />
            <div className="flex items-center gap-2">
              <h2 className="font-serif font-black text-base text-gray-900 tracking-tight flex items-center gap-1.5">
                <span>{language === 'Telugu' ? 'ట్రెండింగ్ వీడియోలు' : 'Trending Videos'}</span>
                <span className="bg-red-50 text-[#C9252D] text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider border border-red-200/60">
                  Shorts
                </span>
              </h2>
            </div>
          </div>

          <button
            onClick={() => onOpenShorts && onOpenShorts()}
            className="flex items-center gap-1 text-[11px] font-bold text-[#C9252D] hover:text-red-700 bg-red-50 hover:bg-red-100/80 px-2.5 py-1 rounded-full border border-red-200/50 transition-colors cursor-pointer group active:scale-95"
          >
            <span>{language === 'Telugu' ? 'షార్ట్స్ చూడండి' : 'Watch Shorts'}</span>
            <ChevronRight size={13} className="stroke-[2.5] group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>

        {/* Horizontal Carousel of Shorts */}
        <div className="flex gap-2.5 sm:gap-3 overflow-x-auto scrollbar-none pb-2 pt-0.5 -mx-3 px-3 snap-x">
          {(shorts && shorts.length > 0 ? shorts : INITIAL_SHORTS).map((short) => (
            <div
              key={short.id}
              onClick={() => onOpenShorts && onOpenShorts(short.id)}
              className="w-[136px] min-w-[136px] sm:w-[150px] sm:min-w-[150px] h-[225px] sm:h-[240px] rounded-2xl relative overflow-hidden flex-shrink-0 snap-start cursor-pointer group shadow-[0_4px_16px_rgba(0,0,0,0.08)] hover:shadow-xl border border-gray-200/90 transition-all duration-300 active:scale-[0.98] select-none bg-black"
            >
              {/* Background Thumbnail */}
              <img
                src={short.thumbnailUrl}
                alt={short.headline}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                loading="lazy"
              />

              {/* Multi-stage High-Contrast Gradient Scrim */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-black/20 pointer-events-none" />

              {/* Top Row Badges */}
              <div className="absolute top-2.5 inset-x-2.5 flex items-center justify-between z-10 pointer-events-none">
                <span className="bg-[#C9252D]/90 backdrop-blur-md text-white font-black text-[8.5px] px-1.5 py-0.5 rounded-full uppercase tracking-wider shadow-xs flex items-center gap-0.5 border border-white/20">
                  <Flame size={9} className="fill-white" />
                  <span>{short.category.split(' ')[0]}</span>
                </span>

                <span className="bg-black/60 backdrop-blur-md text-white font-mono text-[9px] font-bold px-1.5 py-0.5 rounded-md border border-white/15">
                  {short.duration}
                </span>
              </div>

              {/* Frosted Center Play Button Icon */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
                <div className="w-10 h-10 rounded-full bg-white/25 backdrop-blur-md border border-white/40 flex items-center justify-center text-white shadow-[0_4px_20px_rgba(0,0,0,0.4)] group-hover:scale-115 group-hover:bg-[#C9252D] group-hover:border-transparent transition-all duration-300">
                  <Play size={16} className="fill-current ml-0.5" />
                </div>
              </div>

              {/* Bottom Metadata & Headline */}
              <div className="absolute bottom-0 inset-x-0 p-2.5 z-10 pointer-events-none flex flex-col justify-end">
                <div className="flex items-center gap-1 text-[9px] font-semibold text-red-300 mb-1">
                  <MapPin size={9} className="text-red-400 flex-shrink-0" />
                  <span className="truncate">{short.location}</span>
                </div>

                <h4 className="text-[11px] sm:text-[11.5px] font-bold text-white leading-tight line-clamp-2 drop-shadow-xs group-hover:text-red-200 transition-colors">
                  {language === 'Telugu' && short.headlineTe ? short.headlineTe : short.headline}
                </h4>

                <div className="mt-2 pt-1.5 border-t border-white/15 flex items-center justify-between text-[10px] text-gray-300">
                  <span className="flex items-center gap-1 font-semibold text-white text-[9.5px]">
                    <Flame size={10} className="text-amber-400 fill-amber-400" />
                    <span>{(short.likes / 1000).toFixed(1)}k</span>
                  </span>
                  <span className="text-[8.5px] text-gray-300 font-bold bg-white/15 px-1.5 py-0.5 rounded-xs uppercase tracking-wider">
                    Shorts
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Weather Module for Hyderabad & Localities */}
      <div className="px-3 pt-3">
        <WeatherCard
          weather={weather}
          onLocalityChange={onLocalityChange}
          language={language}
        />
      </div>

      {/* Citizen Reporter Callout Banner */}
      <div className="px-3 pt-3 pb-6">
        <div className="bg-gradient-to-r from-[#1E2229] to-[#2B303C] rounded-xl p-3.5 text-white flex items-center justify-between border border-gray-800 shadow-xs relative overflow-hidden">
          <div className="relative z-10 max-w-[70%]">
            <div className="flex items-center gap-1.5 text-red-400 text-[10px] font-bold uppercase tracking-wider mb-1">
              <Camera size={12} />
              <span>TJU Citizen Journalism</span>
            </div>
            <h3 className="text-sm font-bold leading-tight">
              {language === 'Telugu' ? 'మీ ప్రాంతంలో సమస్యలు ఉన్నాయా?' : 'Spot news in your neighbourhood?'}
            </h3>
            <p className="text-[11px] text-gray-300 mt-1 leading-snug">
              {language === 'Telugu'
                ? 'ఫోటో లేదా వీడియో అప్‌లోడ్ చేసి మా ఎడిటోరియల్ డెస్క్‌కు నేరుగా పంపండి.'
                : 'Submit civic alerts & local reports directly to our editorial desk.'}
            </p>
          </div>
          <button
            onClick={onOpenCitizenSubmit}
            className="relative z-10 bg-[#C9252D] hover:bg-red-700 text-white font-bold text-xs px-3 py-2 rounded-lg transition-all shadow-sm flex items-center gap-1 flex-shrink-0 cursor-pointer active:scale-95"
          >
            <span>Report</span>
            <ChevronRight size={14} />
          </button>
        </div>
      </div>
    </div>
  );
};
