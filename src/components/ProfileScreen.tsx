import React, { useState } from 'react';
import {
  User,
  Bookmark,
  Bell,
  Globe,
  ShieldCheck,
  FileText,
  HelpCircle,
  LogIn,
  LogOut,
  ChevronRight,
  Camera,
  Award,
  Settings,
  Heart,
  ExternalLink,
  Flame,
  MapPin,
  Check,
  Share2,
  Trash2,
  Sparkles,
  Sliders
} from 'lucide-react';
import type { Article, CitizenSubmission } from '../types';

interface ProfileScreenProps {
  isLoggedIn: boolean;
  onToggleLogin: () => void;
  onOpenCitizenRegister: () => void;
  onOpenCitizenSubmit: () => void;
  onOpenCitizenDashboard: () => void;
  savedArticles: Article[];
  onSelectArticle: (article: Article) => void;
  userSubmissions: CitizenSubmission[];
  followedTopics: string[];
  followedLocations: string[];
  onOpenCMS?: () => void;
  language?: 'English' | 'Telugu';
  onToggleLanguage?: () => void;
}

export const ProfileScreen: React.FC<ProfileScreenProps> = ({
  isLoggedIn,
  onToggleLogin,
  onOpenCitizenRegister,
  onOpenCitizenSubmit,
  onOpenCitizenDashboard,
  savedArticles,
  onSelectArticle,
  userSubmissions,
  followedTopics,
  followedLocations,
  onOpenCMS,
  language = 'English',
  onToggleLanguage
}) => {
  const [activeTab, setActiveTab] = useState<'all' | 'saved' | 'reports'>('all');
  const [pushNotifications, setPushNotifications] = useState(true);

  return (
    <div className="bg-[#F6F7FA] min-h-screen pb-24 animate-fadeIn select-none">
      {/* ================= USER PROFILE HERO CARD ================= */}
      <div className="bg-white border-b border-gray-150 px-4 pt-4 pb-3.5 shadow-2xs">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            {/* Avatar with Verified Beacon */}
            <div className="relative flex-shrink-0">
              <div className="w-13 h-13 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-tr from-[#99131A] via-[#C9252D] to-[#E02631] text-white flex items-center justify-center font-black text-lg shadow-md shadow-red-900/20 border-2 border-white">
                {isLoggedIn ? 'AS' : <User size={22} />}
              </div>
              {isLoggedIn && (
                <div
                  className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-emerald-500 border-2 border-white flex items-center justify-center text-white shadow-xs"
                  title="Verified Contributor"
                >
                  <Check size={11} strokeWidth={3} />
                </div>
              )}
            </div>

            {/* User Credentials */}
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-1.5 flex-wrap">
                <h2 className="font-serif font-black text-base sm:text-lg text-gray-900 leading-tight truncate">
                  {isLoggedIn ? 'Ananya Sharma' : (language === 'Telugu' ? 'అతిథి పాఠకుడు' : 'Guest Reader')}
                </h2>
                {isLoggedIn && (
                  <span className="bg-emerald-50 text-emerald-700 text-[9.5px] font-black px-1.5 py-0.2 rounded-md border border-emerald-200/80 uppercase tracking-wide flex items-center gap-0.5">
                    <ShieldCheck size={10} className="text-emerald-600" />
                    <span>Verified</span>
                  </span>
                )}
              </div>

              <p className="text-[11px] text-gray-500 mt-0.5 truncate">
                {isLoggedIn
                  ? (language === 'Telugu' ? 'సిటిజన్ రిపోర్టర్ • మాదాపూర్, హైదరాబాద్' : 'Citizen Reporter • Madhapur, Hyderabad')
                  : (language === 'Telugu' ? 'బుక్‌మార్క్‌లు & రిపోర్టుల కోసం లాగిన్ అవ్వండి' : 'Sign in to sync bookmarks & local reports')}
              </p>
            </div>
          </div>

          {/* Sign In / Sign Out Button */}
          <button
            onClick={onToggleLogin}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1 cursor-pointer flex-shrink-0 active:scale-95 ${
              isLoggedIn
                ? 'bg-gray-100 hover:bg-gray-200/80 text-gray-700 border border-gray-200/60'
                : 'bg-[#C9252D] hover:bg-red-700 text-white shadow-md shadow-red-900/20'
            }`}
          >
            {isLoggedIn ? (
              <>
                <LogOut size={12} />
                <span>{language === 'Telugu' ? 'లాగ్ అవుట్' : 'Sign Out'}</span>
              </>
            ) : (
              <>
                <LogIn size={12} />
                <span>{language === 'Telugu' ? 'లాగిన్' : 'Sign In'}</span>
              </>
            )}
          </button>
        </div>

        {/* Quick Activity Stats Bar */}
        {isLoggedIn && (
          <div className="grid grid-cols-3 gap-2 mt-3.5 pt-3 border-t border-gray-100 text-center">
            <button
              onClick={() => setActiveTab('saved')}
              className={`p-2 rounded-xl border transition-all cursor-pointer group active:scale-95 ${
                activeTab === 'saved'
                  ? 'bg-red-50 border-red-200 shadow-2xs'
                  : 'bg-gray-50 hover:bg-gray-100/70 border-gray-150/70'
              }`}
            >
              <div className="text-base font-black font-mono text-[#C9252D] group-hover:scale-105 transition-transform leading-none">
                {savedArticles.length}
              </div>
              <div className="text-[10px] text-gray-600 font-bold uppercase tracking-wider mt-1">
                {language === 'Telugu' ? 'సేవ్ చేసినవి' : 'Saved'}
              </div>
            </button>

            <button
              onClick={onOpenCitizenDashboard}
              className="p-2 rounded-xl bg-gray-50 hover:bg-gray-100/70 border border-gray-150/70 cursor-pointer transition-all active:scale-95 group"
            >
              <div className="text-base font-black font-mono text-gray-900 group-hover:scale-105 transition-transform leading-none">
                {userSubmissions.length}
              </div>
              <div className="text-[10px] text-gray-600 font-bold uppercase tracking-wider mt-1">
                {language === 'Telugu' ? 'రిపోర్టులు' : 'My Reports'}
              </div>
            </button>

            <div className="p-2 rounded-xl bg-gray-50 border border-gray-150/70">
              <div className="text-base font-black font-mono text-gray-900 leading-none">
                {followedTopics.length + followedLocations.length}
              </div>
              <div className="text-[10px] text-gray-600 font-bold uppercase tracking-wider mt-1">
                {language === 'Telugu' ? 'ఫాలో అయినవి' : 'Followed'}
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="p-3 space-y-3">
        {/* ================= CITIZEN JOURNALISM HUB BANNER ================= */}
        <div className="relative overflow-hidden bg-gradient-to-r from-[#0F141F] via-[#1A2234] to-[#0A0E18] text-white rounded-2xl p-4 shadow-sm border border-gray-800">
          <div className="absolute -top-8 -right-8 w-28 h-28 bg-[#C9252D]/20 rounded-full blur-xl pointer-events-none" />

          <div className="relative z-10">
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center gap-1.5 text-red-400 text-[10.5px] font-black uppercase tracking-wider">
                <Camera size={13} />
                <span>{language === 'Telugu' ? 'సిటిజన్ జర్నలిజం హబ్' : 'Citizen Journalism Hub'}</span>
              </div>
              <span className="bg-red-950/80 text-red-300 text-[9px] font-bold px-2 py-0.5 rounded-full border border-red-500/30">
                Live Desk
              </span>
            </div>

            <h3 className="font-serif font-black text-sm sm:text-base text-white leading-tight">
              {language === 'Telugu' ? 'మీ ప్రాంత వార్తలకు మీరే గళం కండి' : 'Be the Voice of Your Community'}
            </h3>
            <p className="text-[11px] text-gray-300 mt-1 leading-snug max-w-xs">
              {language === 'Telugu'
                ? 'స్థానిక సమస్యలు, పౌర సమస్యలను ఫోటో/వీడియోతో నేరుగా ఎడిటోరియల్ డెస్క్‌కు పంపండి.'
                : 'Report civic issues, drainage leaks, or community news directly to TJU News editors.'}
            </p>

            <div className="mt-3 flex items-center gap-2">
              <button
                onClick={onOpenCitizenSubmit}
                className="bg-[#C9252D] hover:bg-red-700 text-white font-bold text-xs px-3.5 py-1.5 rounded-xl shadow-sm transition-all cursor-pointer active:scale-95 flex items-center gap-1"
              >
                <span>{language === 'Telugu' ? 'కొత్త రిపోర్ట్ పంపండి' : 'Submit Report'}</span>
                <ChevronRight size={13} />
              </button>
              <button
                onClick={onOpenCitizenDashboard}
                className="bg-white/10 hover:bg-white/20 text-white font-semibold text-xs px-3 py-1.5 rounded-xl transition-all border border-white/15 cursor-pointer active:scale-95"
              >
                {language === 'Telugu' ? 'రిపోర్టుల స్టేటస్' : 'Track Status'} ({userSubmissions.length})
              </button>
            </div>
          </div>
        </div>

        {/* ================= SAVED ARTICLES SECTION ================= */}
        <div className="bg-white rounded-2xl border border-gray-150 p-3.5 shadow-2xs">
          <div className="flex items-center justify-between mb-2.5">
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-4 bg-[#C9252D] rounded-full" />
              <h4 className="font-serif font-black text-sm text-gray-900 tracking-tight">
                {language === 'Telugu' ? 'సేవ్ చేసిన కథనాలు' : 'Saved Articles'}
              </h4>
            </div>
            <span className="text-[11px] font-bold text-gray-400 font-mono">
              {savedArticles.length} {language === 'Telugu' ? 'కథనాలు' : 'items'}
            </span>
          </div>

          {savedArticles.length === 0 ? (
            <div className="py-6 text-center">
              <Bookmark size={24} className="mx-auto text-gray-300 mb-1" />
              <p className="text-xs text-gray-400 font-medium">
                {language === 'Telugu'
                  ? 'ఇంకా కథనాలు సేవ్ చేయలేదు. హోమ్ ఫీడ్ నుండి బుక్‌మార్క్ చేయండి!'
                  : 'No saved articles yet. Bookmark stories from the home feed!'}
              </p>
            </div>
          ) : (
            <div className="space-y-2.5">
              {savedArticles.map((art) => (
                <div
                  key={art.id}
                  onClick={() => onSelectArticle(art)}
                  className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-gray-50/80 cursor-pointer border border-gray-100 transition-all duration-200 active:scale-[0.99] group bg-white"
                >
                  {/* Fixed Size Thumbnail (Strict w-18 h-18) */}
                  <div className="w-18 h-18 min-w-[72px] max-w-[72px] rounded-xl overflow-hidden bg-gray-100 flex-shrink-0 border border-gray-150 shadow-2xs">
                    <img
                      src={art.imageUrl}
                      alt={art.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                  </div>

                  {/* Story Text Info */}
                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-1.5 mb-0.5">
                        <span className="text-[9px] font-black text-[#C9252D] uppercase tracking-wider bg-red-50 px-1.5 py-0.2 rounded-md">
                          {art.category}
                        </span>
                        <span className="text-[9.5px] text-gray-400 font-mono">
                          {art.publishedAt}
                        </span>
                      </div>
                      <h5 className="text-xs font-bold text-gray-900 line-clamp-2 leading-snug group-hover:text-[#C9252D] transition-colors">
                        {language === 'Telugu' && art.titleTe ? art.titleTe : art.title}
                      </h5>
                    </div>

                    <div className="flex items-center justify-between text-[10px] text-gray-500 mt-1">
                      <span className="truncate max-w-[130px] font-medium text-gray-600">
                        {art.author}
                      </span>
                      <span className="text-[10px] text-[#C9252D] font-bold group-hover:translate-x-0.5 transition-transform flex items-center gap-0.5">
                        <span>Read</span>
                        <ChevronRight size={11} />
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* ================= FOLLOWED TOPICS & LOCATIONS ================= */}
        <div className="bg-white rounded-2xl border border-gray-150 p-3.5 shadow-2xs">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-4 bg-[#0066FF] rounded-full" />
              <h4 className="font-serif font-black text-sm text-gray-900 tracking-tight">
                {language === 'Telugu' ? 'మీరు అనుసరిస్తున్న అంశాలు' : 'Followed Topics & Locations'}
              </h4>
            </div>
          </div>

          <div className="flex flex-wrap gap-1.5 mt-2">
            {followedTopics.map((topic) => (
              <span
                key={topic}
                className="bg-blue-50 text-blue-700 border border-blue-200/80 text-[11px] font-bold px-2.5 py-1 rounded-lg flex items-center gap-1"
              >
                <Flame size={11} className="text-blue-500" />
                <span>{topic}</span>
              </span>
            ))}
            {followedLocations.map((loc) => (
              <span
                key={loc}
                className="bg-red-50 text-[#C9252D] border border-red-200/80 text-[11px] font-bold px-2.5 py-1 rounded-lg flex items-center gap-1"
              >
                <MapPin size={11} className="text-[#C9252D]" />
                <span>{loc}</span>
              </span>
            ))}
          </div>
        </div>

        {/* ================= APP SETTINGS & PREFERENCES ================= */}
        <div className="bg-white rounded-2xl border border-gray-150 overflow-hidden divide-y divide-gray-100 text-xs shadow-2xs">
          {/* Language Preference */}
          <div className="p-3.5 flex items-center justify-between">
            <div className="flex items-center gap-2.5 text-gray-800 font-semibold">
              <Globe size={16} className="text-gray-500" />
              <span>{language === 'Telugu' ? 'యాప్ భాష' : 'App Language'}</span>
            </div>
            {onToggleLanguage ? (
              <button
                onClick={onToggleLanguage}
                className="flex items-center gap-1 px-3 py-1 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold text-xs border border-gray-200 transition-colors cursor-pointer active:scale-95"
              >
                <span>{language === 'English' ? 'English (మార్చండి)' : 'తెలుగు (Change)'}</span>
              </button>
            ) : (
              <span className="text-gray-500 font-bold">{language}</span>
            )}
          </div>

          {/* Breaking Notifications Toggle */}
          <div className="p-3.5 flex items-center justify-between">
            <div className="flex items-center gap-2.5 text-gray-800 font-semibold">
              <Bell size={16} className="text-gray-500" />
              <span>{language === 'Telugu' ? 'తాజా వార్తల నోటిఫికేషన్లు' : 'Breaking News Alerts'}</span>
            </div>
            <button
              onClick={() => setPushNotifications(!pushNotifications)}
              className={`w-10 h-5 rounded-full transition-colors relative cursor-pointer ${
                pushNotifications ? 'bg-[#C9252D]' : 'bg-gray-300'
              }`}
            >
              <div
                className={`w-4 h-4 rounded-full bg-white absolute top-0.5 transition-transform ${
                  pushNotifications ? 'left-5.5' : 'left-0.5'
                }`}
              />
            </button>
          </div>

          {/* Citizen Reporter Registration Flow */}
          <div
            onClick={onOpenCitizenRegister}
            className="p-3.5 flex items-center justify-between hover:bg-gray-50 transition-colors cursor-pointer group"
          >
            <div className="flex items-center gap-2.5 text-gray-800 font-semibold">
              <Award size={16} className="text-amber-500" />
              <span>{language === 'Telugu' ? 'సిటిజన్ రిపోర్టర్ రిజిస్ట్రేషన్' : 'Citizen Reporter Registration'}</span>
            </div>
            <ChevronRight size={15} className="text-gray-400 group-hover:translate-x-0.5 transition-transform" />
          </div>

          {/* Editorial Newsroom CMS (For Desk Staff) */}
          {onOpenCMS && (
            <div
              onClick={onOpenCMS}
              className="p-3.5 flex items-center justify-between hover:bg-red-50/70 transition-colors cursor-pointer bg-red-50/40 border-l-4 border-l-[#C9252D] group"
            >
              <div className="flex items-center gap-2.5 text-[#C9252D] font-bold">
                <Settings size={16} />
                <span>{language === 'Telugu' ? 'ఎడిటోరియల్ న్యూస్‌రూమ్ CMS' : 'Editorial Newsroom CMS'}</span>
              </div>
              <ChevronRight size={15} className="text-[#C9252D] group-hover:translate-x-0.5 transition-transform" />
            </div>
          )}

          {/* About TJU News & Ethics */}
          <div className="p-3.5 flex items-center justify-between hover:bg-gray-50 transition-colors cursor-pointer group">
            <div className="flex items-center gap-2.5 text-gray-800 font-semibold">
              <FileText size={16} className="text-gray-500" />
              <span>{language === 'Telugu' ? 'టీజేయూ న్యూస్ నైతిక నియమావళి' : 'About TJU News & Ethics Code'}</span>
            </div>
            <ChevronRight size={15} className="text-gray-400 group-hover:translate-x-0.5 transition-transform" />
          </div>

          {/* Help & Grievances */}
          <div className="p-3.5 flex items-center justify-between hover:bg-gray-50 transition-colors cursor-pointer group">
            <div className="flex items-center gap-2.5 text-gray-800 font-semibold">
              <HelpCircle size={16} className="text-gray-500" />
              <span>{language === 'Telugu' ? 'ఎడిటోరియల్ హెల్ప్‌లైన్' : 'Editorial Desk Helpline'}</span>
            </div>
            <ChevronRight size={15} className="text-gray-400 group-hover:translate-x-0.5 transition-transform" />
          </div>
        </div>

        {/* Footer Brand Seal */}
        <div className="text-center pt-3 pb-2 text-[11px] text-gray-400 space-y-0.5">
          <p className="font-bold text-gray-600">TJU News Digital Mobile · v2.4</p>
          <p>Truthful Regional Journalism for Telangana, Hyderabad & India</p>
        </div>
      </div>
    </div>
  );
};
