import React, { useState, useRef, useEffect } from 'react';
import {
  INITIAL_ARTICLES,
  INITIAL_SHORTS,
  INITIAL_NOTIFICATIONS,
  INITIAL_CITIZEN_SUBMISSIONS,
  INITIAL_WEATHER,
  INITIAL_JOB_NOTIFICATIONS,
  INITIAL_EXAM_CALENDAR,
  INITIAL_QUIZ,
  INITIAL_BRIEFING
} from './mockData';
import type {
  Article,
  ShortVideo,
  NotificationItem,
  CitizenSubmission,
  JobNotification,
  ExamEvent,
  QuizQuestion,
  WeatherData,
  DailyBriefingItem
} from './types';
import { SplashScreen } from './components/SplashScreen';
import { AppHeader } from './components/AppHeader';
import { BottomNavigation } from './components/BottomNavigation';
import type { TabType } from './components/BottomNavigation';
import { HomeScreen } from './components/HomeScreen';
import { ArticleDetailScreen } from './components/ArticleDetailScreen';
import { SearchScreen } from './components/SearchScreen';
import { NotificationsScreen } from './components/NotificationsScreen';
import { QuickNewsScreen } from './components/QuickNewsScreen';
import { ShortsScreen } from './components/ShortsScreen';
import { AudioNewsScreen } from './components/AudioNewsScreen';
import { ProfileScreen } from './components/ProfileScreen';
import { CitizenRegisterFlow } from './components/CitizenRegisterFlow';
import { CitizenSubmitFlow } from './components/CitizenSubmitFlow';
import { CitizenDashboard } from './components/CitizenDashboard';
import { EditorialCMS } from './components/EditorialCMS';
import { EducationJobsScreen } from './components/EducationJobsScreen';
import { JobDetailScreen } from './components/JobDetailScreen';
import { AIAssistantModal } from './components/AIAssistantModal';
import { Monitor, Smartphone, RotateCcw, Share2, Check } from 'lucide-react';

export function App() {
  // Mode: Mobile App or Editorial CMS
  const [viewMode, setViewMode] = useState<'mobile' | 'cms'>('mobile');

  // App Lifecycle
  const [showSplash, setShowSplash] = useState(true);

  // Bilingual Language State
  const [language, setLanguage] = useState<'English' | 'Telugu'>('English');

  // Core Data States
  const [articles, setArticles] = useState<Article[]>(INITIAL_ARTICLES);
  const [shorts, setShorts] = useState<ShortVideo[]>(INITIAL_SHORTS);
  const [notifications, setNotifications] = useState<NotificationItem[]>(INITIAL_NOTIFICATIONS);
  const [citizenSubmissions, setCitizenSubmissions] = useState<CitizenSubmission[]>(
    INITIAL_CITIZEN_SUBMISSIONS
  );
  const [jobs, setJobs] = useState<JobNotification[]>(INITIAL_JOB_NOTIFICATIONS);
  const [examCalendar, setExamCalendar] = useState<ExamEvent[]>(INITIAL_EXAM_CALENDAR);
  const [quizQuestions, setQuizQuestions] = useState<QuizQuestion[]>(INITIAL_QUIZ);
  const [briefing, setBriefing] = useState<DailyBriefingItem[]>(INITIAL_BRIEFING);
  const [weather, setWeather] = useState<WeatherData>(INITIAL_WEATHER);

  // Navigation & Screen Stack
  const [currentTab, setCurrentTab] = useState<TabType>('home');
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [selectedJob, setSelectedJob] = useState<JobNotification | null>(null);
  const [showEducationJobs, setShowEducationJobs] = useState(false);
  const [showAIAssistant, setShowAIAssistant] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [activeShortId, setActiveShortId] = useState<string | undefined>(undefined);

  // Citizen Flows Stack
  const [showCitizenRegister, setShowCitizenRegister] = useState(false);
  const [showCitizenSubmit, setShowCitizenSubmit] = useState(false);
  const [showCitizenDashboard, setShowCitizenDashboard] = useState(false);

  // Scroll Container Ref for inner scrolling viewport
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // User Preferences & State
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [savedArticleIds, setSavedArticleIds] = useState<string[]>([
    'hyd-metro-expansion-2026',
    'hyderabad-briyani-gi-tag-festival'
  ]);
  const [followedTopics, setFollowedTopics] = useState<string[]>([
    'Hyderabad Metro',
    'Telangana IT',
    'Charminar Old City'
  ]);
  const [followedLocations, setFollowedLocations] = useState<string[]>([
    'Hyderabad',
    'Secunderabad'
  ]);
  const [followedExams, setFollowedExams] = useState<string[]>([
    'TSPSC Group-2 Services: 783 Vacancies Notification Released',
    'Mega DSC Teacher Recruitment 2026: 11,062 Posts'
  ]);

  // Share Feedback Toast
  const [shareToast, setShareToast] = useState<string | null>(null);

  const handleShare = (title: string) => {
    setShareToast(`Link copied: "${title.slice(0, 30)}..."`);
    setTimeout(() => setShareToast(null), 3000);
  };

  // Ensure inner scroll container starts at top when switching tabs or screens
  useEffect(() => {
    scrollContainerRef.current?.scrollTo({ top: 0, behavior: 'auto' });
  }, [currentTab, selectedArticle, selectedJob, showEducationJobs, showSearch, showNotifications]);

  const handleToggleBookmark = (id: string) => {
    if (savedArticleIds.includes(id)) {
      setSavedArticleIds(savedArticleIds.filter((item) => item !== id));
    } else {
      setSavedArticleIds([...savedArticleIds, id]);
    }
  };

  const handleToggleFollowTopic = (topic: string) => {
    if (followedTopics.includes(topic)) {
      setFollowedTopics(followedTopics.filter((t) => t !== topic));
    } else {
      setFollowedTopics([...followedTopics, topic]);
    }
  };

  const handleToggleFollowLocation = (loc: string) => {
    if (followedLocations.includes(loc)) {
      setFollowedLocations(followedLocations.filter((l) => l !== loc));
    } else {
      setFollowedLocations([...followedLocations, loc]);
    }
  };

  const handleToggleFollowExam = (examTitle: string) => {
    if (followedExams.includes(examTitle)) {
      setFollowedExams(followedExams.filter((e) => e !== examTitle));
    } else {
      setFollowedExams([...followedExams, examTitle]);
    }
  };

  const handleAddJob = (newJob: JobNotification) => {
    setJobs([newJob, ...jobs]);
  };

  const handleUpdateJobStatus = (id: string, status: JobNotification['status']) => {
    setJobs(jobs.map((j) => (j.id === id ? { ...j, status } : j)));
  };

  const handleAddQuizQuestion = (q: QuizQuestion) => {
    setQuizQuestions([...quizQuestions, q]);
  };

  // CMS Handlers
  const handlePublishArticle = (newArt: Article) => {
    setArticles([newArt, ...articles]);
  };

  const handleUpdateArticleState = (id: string, updates: Partial<Article>) => {
    setArticles(articles.map((a) => (a.id === id ? { ...a, ...updates } : a)));
  };

  const handleApproveCitizenReport = (subId: string) => {
    const sub = citizenSubmissions.find((s) => s.id === subId);
    if (!sub) return;

    // Update submission status
    setCitizenSubmissions(
      citizenSubmissions.map((s) =>
        s.id === subId ? { ...s, status: 'approved' as const, editorFeedback: 'Approved by Senior Desk & Published to Home feed' } : s
      )
    );

    // Convert into published news article
    const convertedArticle: Article = {
      id: `art-citizen-${Date.now()}`,
      title: sub.headline,
      summary: sub.description,
      content: [
        `HYDERABAD — ${sub.description}`,
        `This news was submitted through the TJ News Citizen Journalism portal by verified local contributor ${sub.authorName} (${sub.location.locality}, ${sub.location.city}).`,
        `The incident was verified and cleared for publication by the TJ News Editorial Desk.`
      ],
      category: 'Citizen Report',
      author: `${sub.authorName} (Citizen Contributor)`,
      publishedAt: '22 Oct 2026, Just Now',
      imageUrl: sub.mediaUrl || 'https://images.unsplash.com/photo-1541888946425-d0fbb186c5f7?w=800&auto=format&fit=crop&q=80',
      readTime: '2 min read',
      location: `${sub.location.locality}, ${sub.location.city}`,
      views: 45
    };

    setArticles([convertedArticle, ...articles]);
  };

  const handleRejectCitizenReport = (subId: string) => {
    setCitizenSubmissions(
      citizenSubmissions.map((s) =>
        s.id === subId
          ? {
              ...s,
              status: 'changes_requested' as const,
              editorFeedback: 'Please provide exact cross-street landmarks and attach additional daytime video footage.'
            }
          : s
      )
    );
  };

  const unreadNotifCount = notifications.filter((n) => !n.read).length;

  return (
    <div
      className={`${
        viewMode === 'cms'
          ? 'min-h-screen bg-[#0F1117] overflow-y-auto text-gray-900 font-sans flex flex-col items-center justify-center py-0 sm:py-6 relative'
          : 'fixed sm:relative inset-0 sm:inset-auto w-full h-full sm:min-h-screen bg-[#07090E] text-gray-900 font-sans flex flex-col items-center justify-center sm:py-6 overflow-hidden sm:overflow-x-hidden'
      }`}
    >
      {/* Desktop Mode Switcher Bar */}
      <div className="hidden sm:flex items-center gap-3 mb-4 z-40 bg-white/10 backdrop-blur-xl border border-white/15 px-3.5 py-1.5 rounded-full shadow-2xl">
        <button
          onClick={() => setViewMode('mobile')}
          className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
            viewMode === 'mobile'
              ? 'bg-[#C9252D] text-white shadow-md shadow-red-900/30'
              : 'text-gray-300 hover:text-white hover:bg-white/10'
          }`}
        >
          <Smartphone size={14} />
          <span>Mobile App Prototype</span>
        </button>
        <button
          onClick={() => setViewMode('cms')}
          className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
            viewMode === 'cms'
              ? 'bg-amber-500 text-gray-950 font-bold shadow-md shadow-amber-900/30'
              : 'text-gray-300 hover:text-white hover:bg-white/10'
          }`}
        >
          <Monitor size={14} />
          <span>Editorial CMS Newsroom</span>
        </button>
      </div>

      {/* Share Toast Notification */}
      {shareToast && (
        <div className="fixed top-14 z-50 bg-gray-900/95 backdrop-blur-md text-white text-xs px-4 py-2.5 rounded-full shadow-2xl flex items-center gap-2 border border-gray-700/80 animate-fadeIn">
          <Check size={14} className="text-emerald-400" />
          <span className="font-medium">{shareToast}</span>
        </div>
      )}

      {/* MAIN VIEWPORT */}
      {viewMode === 'cms' ? (
        <div className="w-full">
          <EditorialCMS
            articles={articles}
            citizenSubmissions={citizenSubmissions}
            jobs={jobs}
            quizQuestions={quizQuestions}
            onPublishArticle={handlePublishArticle}
            onUpdateArticleState={handleUpdateArticleState}
            onApproveCitizenReport={handleApproveCitizenReport}
            onRejectCitizenReport={handleRejectCitizenReport}
            onAddJob={handleAddJob}
            onUpdateJobStatus={handleUpdateJobStatus}
            onAddQuizQuestion={handleAddQuizQuestion}
            onCloseCMS={() => setViewMode('mobile')}
          />
        </div>
      ) : (
        /* Mobile Simulator Frame (Flagship 393 x 852 px styling on desktop, full-screen viewport on mobile) */
        <div
          className={`w-full h-full sm:max-w-[420px] ${
            showSplash ? 'bg-[#99131A]' : 'bg-white'
          } sm:h-[870px] sm:min-h-[852px] sm:max-h-[94vh] rounded-none sm:rounded-[52px] shadow-none sm:shadow-[0_30px_90px_rgba(0,0,0,0.9)] border-0 sm:border-[12px] sm:border-[#181B22] flex flex-col overflow-hidden relative ring-0 sm:ring-1 sm:ring-white/15 transition-all duration-300`}
        >
          {/* Simulated Mobile Status Bar (Visible on desktop frame) */}
          <div className={`hidden sm:flex ${showSplash ? 'bg-[#99131A] text-white border-transparent' : 'bg-white text-gray-900 border-gray-100'} px-7 pt-3 pb-1.5 justify-between items-center text-[12px] font-bold select-none border-b z-50 transition-colors duration-300`}>
            <span className="font-bold tracking-tight">9:41</span>

            {/* Dynamic Island with lens gloss */}
            <div className="w-28 h-6 bg-black rounded-full flex items-center justify-end pr-2.5 shadow-inner relative overflow-hidden">
              <div className="w-2.5 h-2.5 rounded-full bg-[#111625] border border-blue-900/40 relative">
                <div className="w-1 h-1 rounded-full bg-blue-500/60 absolute top-0.5 right-0.5" />
              </div>
            </div>

            {/* Network & Battery Status Icons */}
            <div className={`flex items-center gap-1.5 text-[11px] ${showSplash ? 'text-white' : 'text-gray-800'}`}>
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                <path d="M12 3c-4.97 0-9 4.03-9 9 0 2.12.74 4.07 1.97 5.61L12 22l7.03-4.39C20.26 16.07 21 14.12 21 12c0-4.97-4.03-9-9-9zm0 15c-3.31 0-6-2.69-6-6s2.69-6 6-6 6 2.69 6 6-2.69 6-6 6z"/>
              </svg>
              <span className="text-[10px] font-mono font-black">5G</span>
              <div className="w-5 h-2.5 border border-current rounded-xs p-0.5 flex items-center">
                <div className="w-full h-full bg-current rounded-2xs" />
              </div>
            </div>
          </div>

          {/* Mobile Screen Container */}
          <div className="flex-1 flex flex-col overflow-hidden relative min-h-0 w-full">
            <div
              ref={scrollContainerRef}
              className={`flex-1 overflow-y-auto relative scrollbar-none flex flex-col min-h-0 ${showSplash ? 'bg-[#C9252D]' : 'bg-white'}`}
            >
              {showSplash ? (
                <SplashScreen onFinish={() => setShowSplash(false)} />
            ) : selectedJob ? (
              <JobDetailScreen
                job={selectedJob}
                onBack={() => setSelectedJob(null)}
                isFollowed={followedExams.includes(selectedJob.title)}
                onToggleFollow={() => handleToggleFollowExam(selectedJob.title)}
                onShare={() => handleShare(selectedJob.title)}
                language={language}
              />
            ) : selectedArticle ? (
              <ArticleDetailScreen
                article={selectedArticle}
                onBack={() => setSelectedArticle(null)}
                isBookmarked={savedArticleIds.includes(selectedArticle.id)}
                onToggleBookmark={() => handleToggleBookmark(selectedArticle.id)}
                onShare={() => handleShare(selectedArticle.title)}
                onSelectRelated={(rel) => setSelectedArticle(rel)}
                allArticles={articles}
                language={language}
                onOpenAIAssistant={() => setShowAIAssistant(true)}
              />
            ) : showEducationJobs ? (
              <EducationJobsScreen
                jobs={jobs}
                examCalendar={examCalendar}
                quizQuestions={quizQuestions}
                language={language}
                onSelectJob={(j) => setSelectedJob(j)}
                followedExams={followedExams}
                onToggleFollowExam={handleToggleFollowExam}
                onOpenArticleById={(artId) => {
                  const matched = articles.find((a) => a.id === artId);
                  if (matched) {
                    setShowEducationJobs(false);
                    setSelectedArticle(matched);
                  }
                }}
                onBack={() => setShowEducationJobs(false)}
              />
            ) : showSearch ? (
              <SearchScreen
                articles={articles}
                onSelectArticle={(art) => {
                  setShowSearch(false);
                  setSelectedArticle(art);
                }}
                onClose={() => setShowSearch(false)}
              />
            ) : showNotifications ? (
              <NotificationsScreen
                notifications={notifications}
                onBack={() => setShowNotifications(false)}
                onSelectNotification={(notif) => {
                  if (notif.targetId) {
                    const matched = articles.find((a) => a.id === notif.targetId);
                    if (matched) {
                      setShowNotifications(false);
                      setSelectedArticle(matched);
                    }
                  }
                }}
                onMarkAllRead={() => {
                  setNotifications(notifications.map((n) => ({ ...n, read: true })));
                }}
              />
            ) : showCitizenRegister ? (
              <CitizenRegisterFlow
                onBack={() => setShowCitizenRegister(false)}
                onSuccess={() => {
                  setShowCitizenRegister(false);
                  setIsLoggedIn(true);
                  setShowCitizenDashboard(true);
                }}
              />
            ) : showCitizenSubmit ? (
              <CitizenSubmitFlow
                onBack={() => setShowCitizenSubmit(false)}
                onSubmitSuccess={(newSub) => {
                  setCitizenSubmissions([newSub, ...citizenSubmissions]);
                }}
              />
            ) : showCitizenDashboard ? (
              <CitizenDashboard
                submissions={citizenSubmissions}
                onBack={() => setShowCitizenDashboard(false)}
                onOpenNewSubmission={() => {
                  setShowCitizenDashboard(false);
                  setShowCitizenSubmit(true);
                }}
              />
            ) : (
              /* Main Bottom Nav Stack */
              <>
                {currentTab !== 'shorts' && currentTab !== 'quick' && currentTab !== 'explore' && currentTab !== 'audio' && (
                  <AppHeader
                    onOpenSearch={() => setShowSearch(true)}
                    onOpenNotifications={() => setShowNotifications(true)}
                    unreadCount={unreadNotifCount}
                    language={language}
                    onToggleLanguage={() => setLanguage(language === 'English' ? 'Telugu' : 'English')}
                    onOpenAIAssistant={() => setShowAIAssistant(true)}
                    onScrollToTop={() => scrollContainerRef.current?.scrollTo({ top: 0, behavior: 'smooth' })}
                  />
                )}

                {currentTab === 'home' && (
                  <HomeScreen
                    articles={articles}
                    jobs={jobs}
                    weather={weather}
                    briefing={briefing}
                    language={language}
                    onSelectArticle={(art) => setSelectedArticle(art)}
                    onOpenCitizenSubmit={() => setShowCitizenSubmit(true)}
                    savedArticleIds={savedArticleIds}
                    onToggleBookmark={handleToggleBookmark}
                    onOpenShareModal={handleShare}
                    onOpenEducationJobs={() => setShowEducationJobs(true)}
                    onSelectJob={(j) => setSelectedJob(j)}
                    onOpenAIAssistant={() => setShowAIAssistant(true)}
                    onLocalityChange={(loc) => setWeather({ ...weather, locality: loc })}
                    shorts={shorts}
                    onOpenShorts={(shortId) => {
                      if (shortId) {
                        setActiveShortId(shortId);
                      }
                      setCurrentTab('shorts');
                    }}
                  />
                )}

                {(currentTab === 'quick' || currentTab === 'explore') && (
                  <QuickNewsScreen
                    articles={articles}
                    language={language}
                    onToggleLanguage={() => setLanguage(language === 'English' ? 'Telugu' : 'English')}
                    onSelectArticle={(art) => setSelectedArticle(art)}
                    onOpenEducationJobs={() => setShowEducationJobs(true)}
                    onShare={handleShare}
                    onOpenSearch={() => setShowSearch(true)}
                    onOpenNotifications={() => setShowNotifications(true)}
                    onOpenAIAssistant={() => setShowAIAssistant(true)}
                    unreadCount={unreadNotifCount}
                  />
                )}

                {currentTab === 'shorts' && (
                  <ShortsScreen
                    shorts={shorts}
                    initialShortId={activeShortId}
                    onOpenArticleById={(artId) => {
                      const matched = articles.find((a) => a.id === artId);
                      if (matched) setSelectedArticle(matched);
                    }}
                    onShare={handleShare}
                  />
                )}

                {(currentTab === 'audio' || currentTab === 'live') && (
                  <AudioNewsScreen
                    articles={articles}
                    language={language}
                    onSelectArticle={(art) => setSelectedArticle(art)}
                    onShare={handleShare}
                  />
                )}

                {currentTab === 'profile' && (
                  <ProfileScreen
                    isLoggedIn={isLoggedIn}
                    onToggleLogin={() => setIsLoggedIn(!isLoggedIn)}
                    onOpenCitizenRegister={() => setShowCitizenRegister(true)}
                    onOpenCitizenSubmit={() => setShowCitizenSubmit(true)}
                    onOpenCitizenDashboard={() => setShowCitizenDashboard(true)}
                    savedArticles={articles.filter((a) => savedArticleIds.includes(a.id))}
                    onSelectArticle={(art) => setSelectedArticle(art)}
                    userSubmissions={citizenSubmissions}
                    followedTopics={followedTopics}
                    followedLocations={followedLocations}
                    onOpenCMS={() => setViewMode('cms')}
                    language={language}
                    onToggleLanguage={() => setLanguage(language === 'English' ? 'Telugu' : 'English')}
                  />
                )}
              </>
            )}
            </div>

            {/* Persistent Bottom Nav (Pinned outside the scroll viewport) */}
            {!showSplash &&
              !selectedJob &&
              !selectedArticle &&
              !showEducationJobs &&
              !showSearch &&
              !showNotifications &&
              !showCitizenRegister &&
              !showCitizenSubmit &&
              !showCitizenDashboard && (
                <BottomNavigation
                  currentTab={currentTab}
                  onTabChange={(tab) => {
                    setCurrentTab(tab);
                    scrollContainerRef.current?.scrollTo({ top: 0, behavior: 'auto' });
                  }}
                  unreadCount={unreadNotifCount}
                  language={language}
                />
              )}
          </div>

          {/* AI News & Job Assistant Global Modal */}
          <AIAssistantModal
            isOpen={showAIAssistant}
            onClose={() => setShowAIAssistant(false)}
            articles={articles}
            jobs={jobs}
            language={language}
            onSelectArticle={(art) => {
              setShowAIAssistant(false);
              setSelectedArticle(art);
            }}
            onSelectJob={(job) => {
              setShowAIAssistant(false);
              setSelectedJob(job);
            }}
          />
        </div>
      )}
    </div>
  );
}

export default App;
