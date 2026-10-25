import React, { useState } from 'react';
import type { Article, JobNotification } from '../types';
import {
  Compass,
  TrendingUp,
  MapPin,
  Check,
  Plus,
  Hash,
  Building2,
  GraduationCap,
  Briefcase,
  ChevronRight,
  Sparkles
} from 'lucide-react';
import { TOPICS_LIST, LOCATIONS_LIST } from '../mockData';

interface ExploreScreenProps {
  articles: Article[];
  jobs: JobNotification[];
  language: 'English' | 'Telugu';
  onSelectArticle: (article: Article) => void;
  onOpenEducationJobs: () => void;
  onSelectJob: (job: JobNotification) => void;
  followedTopics: string[];
  followedLocations: string[];
  onToggleFollowTopic: (topic: string) => void;
  onToggleFollowLocation: (loc: string) => void;
}

export const ExploreScreen: React.FC<ExploreScreenProps> = ({
  articles,
  jobs,
  language,
  onSelectArticle,
  onOpenEducationJobs,
  onSelectJob,
  followedTopics,
  followedLocations,
  onToggleFollowTopic,
  onToggleFollowLocation
}) => {
  const [activeDistrictTab, setActiveDistrictTab] = useState('Hyderabad');

  const popularArticles = [...articles].sort((a, b) => (b.views || 0) - (a.views || 0));

  return (
    <div className="bg-[#F8F9FA] min-h-screen pb-28 animate-fadeIn">
      {/* Explore Header */}
      <div className="bg-white/90 backdrop-blur-xl px-4 pt-4 pb-3 border-b border-gray-100 sticky top-0 z-20">
        <div className="flex items-center justify-between mb-1">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-red-50 flex items-center justify-center text-[#C9252D]">
              <Compass size={18} />
            </div>
            <div>
              <h2 className="font-serif font-black text-xl text-gray-900 tracking-tight flex items-center gap-1.5">
                <span>{language === 'Telugu' ? 'అన్వేషణ & స్పెషల్ డెస్క్' : 'Explore & Desks'}</span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#C9252D]" />
              </h2>
            </div>
          </div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 bg-gray-50 border border-gray-200/80 px-2 py-0.5 rounded-full">
            Specialized Desks
          </span>
        </div>
        <p className="text-xs text-gray-500 line-clamp-1">
          Discover trending topics, Telangana districts, education hubs, and most-read stories
        </p>
      </div>

      {/* High-Priority Government Jobs & Education Hub Banner */}
      <section className="p-3.5">
        <div
          onClick={onOpenEducationJobs}
          className="relative overflow-hidden bg-gradient-to-br from-[#0B0F19] via-[#141B2D] to-[#0A0D15] text-white p-4.5 rounded-2xl shadow-xl shadow-gray-900/10 border border-gray-700/80 cursor-pointer hover:border-amber-400/60 transition-all duration-300 group active:scale-[0.99]"
        >
          {/* Subtle Ambient Radial Glow */}
          <div className="absolute top-0 right-0 w-44 h-44 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />

          <div className="flex items-center justify-between mb-2.5 relative z-10">
            <span className="flex items-center gap-1.5 text-[10px] font-bold text-amber-300 uppercase tracking-wider bg-amber-400/15 border border-amber-400/30 px-2.5 py-1 rounded-full shadow-xs">
              <GraduationCap size={13} className="text-amber-300" />
              <span>Priority Student Portal</span>
            </span>
            <span className="text-[10px] text-amber-200/90 font-mono bg-white/10 px-2 py-0.5 rounded-md border border-white/10">
              ⚡ {jobs.length} Active Drives
            </span>
          </div>

          <h3 className="font-serif font-black text-lg leading-snug text-white group-hover:text-amber-300 transition-colors relative z-10">
            {language === 'Telugu'
              ? 'తెలంగాణ ప్రభుత్వ ఉద్యోగాల సమాచారం & క్విజ్ హబ్'
              : 'Telangana Govt Jobs, TSPSC, DSC & Exam Hub'}
          </h3>
          <p className="text-xs text-gray-300 mt-1.5 leading-relaxed relative z-10">
            Access Group-2, Police recruitment, Mega DSC teacher vacancies, daily 5-MCQ quiz, and official exam calendar.
          </p>

          <div className="mt-3.5 flex items-center justify-between pt-2.5 border-t border-gray-700/60 text-xs relative z-10">
            <span className="text-amber-300 font-bold flex items-center gap-1">
              <span>Open Recruitment & Exam Hub</span>
            </span>
            <span className="bg-gradient-to-r from-amber-500 to-amber-600 text-gray-950 font-bold p-1.5 rounded-xl shadow-md group-hover:translate-x-0.5 transition-transform">
              <ChevronRight size={14} />
            </span>
          </div>
        </div>
      </section>

      {/* Followed Locations / City Selector Strip */}
      <section className="bg-white p-3.5 border-y border-gray-100 my-1">
        <div className="flex items-center justify-between mb-2.5">
          <span className="text-xs font-bold text-gray-800 uppercase tracking-wider flex items-center gap-1.5">
            <Building2 size={14} className="text-[#C9252D]" /> Browse by City / District
          </span>
          <span className="text-[10px] text-gray-400 font-medium">Telangana & Beyond</span>
        </div>

        <div className="flex gap-2 overflow-x-auto scrollbar-none py-1">
          {LOCATIONS_LIST.map((loc) => {
            const isFollowed = followedLocations.includes(loc);
            const isSelected = activeDistrictTab === loc;

            return (
              <div
                key={loc}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-medium border transition-all cursor-pointer whitespace-nowrap active:scale-95 ${
                  isSelected
                    ? 'bg-gradient-to-r from-[#C9252D] to-[#A3161D] text-white border-transparent shadow-sm shadow-red-900/25 font-bold'
                    : 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100'
                }`}
                onClick={() => setActiveDistrictTab(loc)}
              >
                <span>{loc}</span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleFollowLocation(loc);
                  }}
                  className={`p-0.5 rounded-full transition-colors ${
                    isFollowed
                      ? isSelected ? 'bg-white/30 text-white' : 'bg-[#C9252D] text-white'
                      : 'text-gray-400 hover:text-gray-600'
                  }`}
                  title={isFollowed ? 'Unfollow location' : 'Follow location'}
                >
                  {isFollowed ? <Check size={12} /> : <Plus size={12} />}
                </button>
              </div>
            );
          })}
        </div>
      </section>

      {/* Topics to Follow Grid */}
      <section className="bg-white p-3.5 border-b border-gray-100 my-1">
        <div className="flex items-center justify-between mb-2.5">
          <span className="text-xs font-bold text-gray-800 uppercase tracking-wider flex items-center gap-1.5">
            <Hash size={14} className="text-[#C9252D]" /> Topics You Can Follow
          </span>
          <span className="text-[10px] font-bold text-[#C9252D] bg-red-50 border border-red-100 px-2 py-0.5 rounded-full">
            {followedTopics.length} followed
          </span>
        </div>

        <div className="flex flex-wrap gap-2">
          {TOPICS_LIST.map((topic) => {
            const isFollowed = followedTopics.includes(topic);
            return (
              <button
                key={topic}
                onClick={() => onToggleFollowTopic(topic)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border transition-all cursor-pointer active:scale-95 ${
                  isFollowed
                    ? 'bg-[#C9252D] text-white border-[#C9252D] shadow-sm shadow-red-900/20 font-semibold'
                    : 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100 hover:border-gray-300'
                }`}
              >
                {isFollowed ? <Check size={12} /> : <Plus size={12} />}
                <span>{topic}</span>
              </button>
            );
          })}
        </div>
      </section>

      {/* Most Read / Popular Stories */}
      <section className="p-3.5">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <TrendingUp size={17} className="text-[#C9252D]" />
            <h3 className="font-serif font-black text-base text-gray-900 tracking-tight">
              {language === 'Telugu' ? `అత్యధిక ప్రజాదరణ కథనాలు (${activeDistrictTab})` : `Most Read in ${activeDistrictTab}`}
            </h3>
          </div>
          <span className="text-[10px] text-gray-400 font-mono uppercase tracking-wider">
            Verified Trends
          </span>
        </div>

        <div className="space-y-3">
          {popularArticles.map((art, idx) => (
            <div
              key={art.id}
              onClick={() => onSelectArticle(art)}
              className="bg-white p-3.5 rounded-2xl border border-gray-200/80 shadow-xs hover:shadow-md transition-all duration-200 cursor-pointer flex items-center gap-3.5 group active:scale-[0.99]"
            >
              {/* Luxury Serif Architectural Number */}
              <span className="text-3xl font-black font-serif text-gray-300 group-hover:text-[#C9252D]/80 transition-colors w-7 text-center select-none flex-shrink-0">
                {idx + 1}
              </span>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5 mb-1">
                  <span className="text-[10px] font-bold text-[#C9252D] uppercase tracking-wide">
                    {art.category}
                  </span>
                  <span className="text-gray-300">•</span>
                  <span className="text-[10px] text-gray-400 font-medium">
                    {art.location}
                  </span>
                </div>
                <h4 className="text-xs font-bold text-gray-900 line-clamp-2 leading-snug group-hover:text-[#C9252D] transition-colors">
                  {language === 'Telugu' && art.titleTe ? art.titleTe : art.title}
                </h4>
                <div className="flex items-center gap-2 text-[10px] text-gray-400 font-mono mt-1.5">
                  <span className="font-semibold text-gray-600">{art.views?.toLocaleString()} reads</span>
                  <span>•</span>
                  <span>{art.readTime}</span>
                </div>
              </div>
              <img
                src={art.imageUrl}
                alt=""
                className="w-18 h-18 rounded-xl object-cover flex-shrink-0 bg-gray-100 border border-gray-100 group-hover:scale-102 transition-transform duration-200"
              />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
