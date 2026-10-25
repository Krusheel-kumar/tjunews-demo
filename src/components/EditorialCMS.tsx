import React, { useState } from 'react';
import type { Article, CitizenSubmission, JobNotification, QuizQuestion } from '../types';
import {
  LayoutDashboard,
  FileText,
  Users,
  Flame,
  Star,
  CheckCircle,
  XCircle,
  Clock,
  Radio,
  Plus,
  ArrowRight,
  TrendingUp,
  Sliders,
  Send,
  Briefcase,
  GraduationCap,
  HelpCircle,
  Check
} from 'lucide-react';
import { TJNewsLogo } from './TJLogo';

interface EditorialCMSProps {
  articles: Article[];
  citizenSubmissions: CitizenSubmission[];
  jobs?: JobNotification[];
  quizQuestions?: QuizQuestion[];
  onPublishArticle: (article: Article) => void;
  onUpdateArticleState: (id: string, updates: Partial<Article>) => void;
  onApproveCitizenReport: (submissionId: string) => void;
  onRejectCitizenReport: (submissionId: string) => void;
  onAddJob?: (job: JobNotification) => void;
  onUpdateJobStatus?: (id: string, status: JobNotification['status']) => void;
  onAddQuizQuestion?: (question: QuizQuestion) => void;
  onCloseCMS: () => void;
}

export const EditorialCMS: React.FC<EditorialCMSProps> = ({
  articles,
  citizenSubmissions,
  jobs = [],
  quizQuestions = [],
  onPublishArticle,
  onUpdateArticleState,
  onApproveCitizenReport,
  onRejectCitizenReport,
  onAddJob,
  onUpdateJobStatus,
  onAddQuizQuestion,
  onCloseCMS
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'articles' | 'citizen' | 'create' | 'jobs' | 'quiz'>('overview');

  // New Article Form State
  const [newTitle, setNewTitle] = useState('');
  const [newSummary, setNewSummary] = useState('');
  const [newContent, setNewContent] = useState('');
  const [newCategory, setNewCategory] = useState<'Hyderabad' | 'Telangana' | 'India' | 'Politics' | 'Business' | 'Sports' | 'Entertainment'>('Hyderabad');
  const [newAuthor, setNewAuthor] = useState('TJ Editorial Desk');
  const [newImage, setNewImage] = useState('https://images.unsplash.com/photo-1570125909232-eb263c188f7e?w=800&auto=format&fit=crop&q=80');
  const [markBreaking, setMarkBreaking] = useState(false);
  const [markFeatured, setMarkFeatured] = useState(false);
  const [publishSuccessMsg, setPublishSuccessMsg] = useState('');

  // New Job Notification Form State
  const [jobTitle, setJobTitle] = useState('');
  const [jobDept, setJobDept] = useState('');
  const [jobCategory, setJobCategory] = useState<'TSPSC' | 'Police' | 'Teachers / TET' | 'Group Services' | 'Central / SSC / RRB' | 'Banking'>('TSPSC');
  const [jobQualification, setJobQualification] = useState<JobNotification['qualification']>('Any Degree');
  const [jobVacancies, setJobVacancies] = useState<number>(500);
  const [jobAgeLimit, setJobAgeLimit] = useState('18 - 44 Years');
  const [jobStartDate, setJobStartDate] = useState('01 Nov 2026');
  const [jobDeadline, setJobDeadline] = useState('30 Nov 2026');
  const [jobExamDate, setJobExamDate] = useState('15 Feb 2027');
  const [jobUrl, setJobUrl] = useState('https://websitenew.tspsc.gov.in');

  // New Quiz Form State
  const [quizQ, setQuizQ] = useState('');
  const [quizOpt0, setQuizOpt0] = useState('');
  const [quizOpt1, setQuizOpt1] = useState('');
  const [quizOpt2, setQuizOpt2] = useState('');
  const [quizOpt3, setQuizOpt3] = useState('');
  const [quizCorrect, setQuizCorrect] = useState(0);
  const [quizExpl, setQuizExpl] = useState('');

  const handleCreateArticle = (e: React.FormEvent) => {
    e.preventDefault();
    const created: Article = {
      id: `art-${Date.now()}`,
      title: newTitle || 'Telangana Infrastructure Project Update Announced',
      summary: newSummary || 'Key municipal decisions sanctioned during state development review meeting.',
      content: newContent
        ? newContent.split('\n\n')
        : ['Official notification issued by the competent authority with immediate operational effect across the state capital.'],
      category: newCategory,
      author: newAuthor,
      publishedAt: '22 Oct 2026, 01:30 PM',
      imageUrl: newImage,
      isBreaking: markBreaking,
      isFeatured: markFeatured,
      readTime: '3 min read',
      location: newCategory === 'Hyderabad' ? 'Hyderabad' : 'Telangana',
      views: 120
    };

    onPublishArticle(created);
    setPublishSuccessMsg(`Published story: "${created.title}" successfully! Check the mobile app.`);
    setTimeout(() => setPublishSuccessMsg(''), 4000);

    // Reset form
    setNewTitle('');
    setNewSummary('');
    setNewContent('');
    setActiveTab('articles');
  };

  const handleCreateJob = (e: React.FormEvent) => {
    e.preventDefault();
    if (!onAddJob) return;
    const newJob: JobNotification = {
      id: `job-${Date.now()}`,
      title: jobTitle || 'TSPSC Gazetted Officer Cadre Notification 2026',
      titleTe: `${jobTitle || 'టీఎస్‌పీఎస్సీ గెజిటెడ్ ఆఫీసర్ రిక్రూట్‌మెంట్ 2026'}`,
      department: jobDept || 'Telangana State Public Service Commission',
      category: jobCategory,
      stateOrCentral: jobCategory === 'Central / SSC / RRB' || jobCategory === 'Banking' ? 'Central Government' : 'State (Telangana)',
      qualification: jobQualification,
      vacancies: Number(jobVacancies) || 150,
      ageLimit: jobAgeLimit,
      applicationStartDate: jobStartDate,
      applicationDeadline: jobDeadline,
      examDate: jobExamDate,
      status: 'Applications Open',
      officialNotificationUrl: jobUrl,
      officialApplyUrl: jobUrl,
      description: `Official recruitment notification released by ${jobDept || 'the department'} for eligible aspirants across Telangana state.`
    };
    onAddJob(newJob);
    setPublishSuccessMsg(`Published Job Alert: "${newJob.title}"`);
    setTimeout(() => setPublishSuccessMsg(''), 4000);
    setJobTitle('');
    setJobDept('');
    setActiveTab('jobs');
  };

  const handleCreateQuizQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!onAddQuizQuestion) return;
    const newQuestion: QuizQuestion = {
      id: `q-${Date.now()}`,
      question: quizQ || 'Which Telangana river project was recently inaugurated for Cyberabad drinking water?',
      questionTe: quizQ,
      options: [quizOpt0 || 'Option A', quizOpt1 || 'Option B', quizOpt2 || 'Option C', quizOpt3 || 'Option D'],
      optionsTe: [quizOpt0 || 'Option A', quizOpt1 || 'Option B', quizOpt2 || 'Option C', quizOpt3 || 'Option D'],
      correctIndex: Number(quizCorrect),
      explanation: quizExpl || 'Official notification from Telangana state public affairs desk.',
      category: 'Telangana Current Affairs'
    };
    onAddQuizQuestion(newQuestion);
    setPublishSuccessMsg(`Added new Daily Quiz Question successfully!`);
    setTimeout(() => setPublishSuccessMsg(''), 4000);
    setQuizQ('');
    setQuizOpt0('');
    setQuizOpt1('');
    setQuizOpt2('');
    setQuizOpt3('');
    setQuizExpl('');
    setActiveTab('quiz');
  };

  return (
    <div className="min-h-screen bg-[#0F1117] text-gray-100 flex flex-col font-sans select-none animate-fadeIn">
      {/* Top CMS Header */}
      <header className="bg-[#181B24] border-b border-gray-800 px-6 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <TJNewsLogo size="md" variant="white" showTagline={false} />
          <div className="h-6 w-px bg-gray-700" />
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-sm text-white">Editorial Newsroom CMS</span>
              <span className="bg-red-900/60 text-red-300 text-[10px] font-mono font-bold px-2 py-0.5 rounded border border-red-700/50">
                Staff Desk v3.2
              </span>
            </div>
            <p className="text-[11px] text-gray-400">
              Live Content Orchestration & Regional Desks Control
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-right hidden sm:block">
            <span className="text-xs font-bold text-gray-200">K. Sudhir Rao</span>
            <span className="block text-[10px] text-gray-400 font-mono">Senior Managing Editor</span>
          </div>
          <button
            onClick={onCloseCMS}
            className="bg-[#C9252D] hover:bg-red-700 text-white font-bold text-xs px-4 py-2 rounded-lg transition shadow-md cursor-pointer"
          >
            Switch to Mobile View 📱
          </button>
        </div>
      </header>

      {/* Main Container */}
      <div className="flex-1 flex flex-col md:flex-row">
        {/* Left CMS Sidebar */}
        <aside className="w-full md:w-64 bg-[#14161F] border-r border-gray-800 p-4 space-y-1">
          <button
            onClick={() => setActiveTab('overview')}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-bold transition cursor-pointer ${
              activeTab === 'overview'
                ? 'bg-[#C9252D] text-white shadow-sm'
                : 'text-gray-400 hover:text-white hover:bg-gray-800/60'
            }`}
          >
            <LayoutDashboard size={16} />
            <span>Dashboard Overview</span>
          </button>

          <button
            onClick={() => setActiveTab('articles')}
            className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-bold transition cursor-pointer ${
              activeTab === 'articles'
                ? 'bg-[#C9252D] text-white shadow-sm'
                : 'text-gray-400 hover:text-white hover:bg-gray-800/60'
            }`}
          >
            <div className="flex items-center gap-3">
              <FileText size={16} />
              <span>Article Management</span>
            </div>
            <span className="bg-gray-800 text-gray-300 px-1.5 py-0.5 rounded text-[10px] font-mono">
              {articles.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('create')}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-bold transition cursor-pointer ${
              activeTab === 'create'
                ? 'bg-[#C9252D] text-white shadow-sm'
                : 'text-gray-400 hover:text-white hover:bg-gray-800/60'
            }`}
          >
            <Plus size={16} />
            <span>Create New Article</span>
          </button>

          <button
            onClick={() => setActiveTab('jobs')}
            className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-bold transition cursor-pointer ${
              activeTab === 'jobs'
                ? 'bg-[#C9252D] text-white shadow-sm'
                : 'text-gray-400 hover:text-white hover:bg-gray-800/60'
            }`}
          >
            <div className="flex items-center gap-3">
              <Briefcase size={16} />
              <span>Jobs & Recruitment Desk</span>
            </div>
            <span className="bg-blue-900/60 text-blue-300 px-1.5 py-0.5 rounded text-[10px] font-mono">
              {jobs.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('quiz')}
            className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-bold transition cursor-pointer ${
              activeTab === 'quiz'
                ? 'bg-[#C9252D] text-white shadow-sm'
                : 'text-gray-400 hover:text-white hover:bg-gray-800/60'
            }`}
          >
            <div className="flex items-center gap-3">
              <HelpCircle size={16} />
              <span>Daily Quiz Desk</span>
            </div>
            <span className="bg-emerald-900/60 text-emerald-300 px-1.5 py-0.5 rounded text-[10px] font-mono">
              {quizQuestions.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('citizen')}
            className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-bold transition cursor-pointer ${
              activeTab === 'citizen'
                ? 'bg-[#C9252D] text-white shadow-sm'
                : 'text-gray-400 hover:text-white hover:bg-gray-800/60'
            }`}
          >
            <div className="flex items-center gap-3">
              <Users size={16} />
              <span>Citizen Reports Desk</span>
            </div>
            <span className="bg-amber-900/60 text-amber-300 px-1.5 py-0.5 rounded text-[10px] font-mono">
              {citizenSubmissions.filter((s) => s.status !== 'approved').length} new
            </span>
          </button>
        </aside>

        {/* CMS Main Content Area */}
        <main className="flex-1 p-6 overflow-y-auto">
          {publishSuccessMsg && (
            <div className="mb-4 p-3 bg-emerald-950/80 border border-emerald-500 text-emerald-200 text-xs rounded-lg flex items-center gap-2 animate-fadeIn">
              <CheckCircle size={16} className="text-emerald-400" />
              <span>{publishSuccessMsg}</span>
            </div>
          )}

          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Stat Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                <div className="bg-[#181B24] p-4 rounded-xl border border-gray-800">
                  <span className="text-[11px] text-gray-400 font-mono">Total Published Articles</span>
                  <div className="text-2xl font-black text-white mt-1">{articles.length}</div>
                  <span className="text-[10px] text-emerald-400 font-medium">● All Desks Active</span>
                </div>
                <div className="bg-[#181B24] p-4 rounded-xl border border-gray-800">
                  <span className="text-[11px] text-gray-400 font-mono">Breaking Stories</span>
                  <div className="text-2xl font-black text-red-500 mt-1">
                    {articles.filter((a) => a.isBreaking).length}
                  </div>
                  <span className="text-[10px] text-gray-400">Broadcasting to push alerts</span>
                </div>
                <div className="bg-[#181B24] p-4 rounded-xl border border-gray-800">
                  <span className="text-[11px] text-gray-400 font-mono">Citizen Reports Pending</span>
                  <div className="text-2xl font-black text-amber-500 mt-1">
                    {citizenSubmissions.filter((s) => s.status === 'pending_review').length}
                  </div>
                  <span className="text-[10px] text-amber-400">Requires desk fact-check</span>
                </div>
                <div className="bg-[#181B24] p-4 rounded-xl border border-gray-800">
                  <span className="text-[11px] text-gray-400 font-mono">Live Broadcast Status</span>
                  <div className="text-2xl font-black text-emerald-400 mt-1 flex items-center gap-2">
                    <Radio size={20} className="animate-pulse" />
                    <span>ON AIR</span>
                  </div>
                  <span className="text-[10px] text-gray-400">14.8k concurrent viewers</span>
                </div>
              </div>

              {/* Quick Actions / Featured Slot Management */}
              <div className="bg-[#181B24] p-5 rounded-xl border border-gray-800 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-serif font-black text-base text-white">
                    App Hero & Breaking News Management
                  </h3>
                  <span className="text-xs text-gray-400">
                    Control what 100k+ readers see immediately on opening the app
                  </span>
                </div>

                <div className="space-y-3">
                  {articles.map((art) => (
                    <div
                      key={art.id}
                      className="bg-[#12141C] p-3 rounded-lg border border-gray-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3"
                    >
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-bold text-red-400 uppercase">
                            {art.category}
                          </span>
                          <span className="text-[10px] text-gray-500 font-mono">
                            {art.publishedAt}
                          </span>
                        </div>
                        <h4 className="text-xs font-bold text-gray-200 truncate mt-0.5">
                          {art.title}
                        </h4>
                      </div>

                      <div className="flex items-center gap-2 flex-shrink-0">
                        {/* Toggle Breaking Button */}
                        <button
                          onClick={() =>
                            onUpdateArticleState(art.id, { isBreaking: !art.isBreaking })
                          }
                          className={`px-2.5 py-1 rounded text-xs font-bold flex items-center gap-1 transition cursor-pointer ${
                            art.isBreaking
                              ? 'bg-red-600 text-white shadow-xs'
                              : 'bg-gray-800 text-gray-400 hover:text-white'
                          }`}
                        >
                          <Flame size={12} />
                          <span>{art.isBreaking ? 'Breaking ON' : 'Make Breaking'}</span>
                        </button>

                        {/* Toggle Featured Hero Button */}
                        <button
                          onClick={() => {
                            // unset other featured
                            articles.forEach((a) => {
                              if (a.id !== art.id && a.isFeatured) {
                                onUpdateArticleState(a.id, { isFeatured: false });
                              }
                            });
                            onUpdateArticleState(art.id, { isFeatured: !art.isFeatured });
                          }}
                          className={`px-2.5 py-1 rounded text-xs font-bold flex items-center gap-1 transition cursor-pointer ${
                            art.isFeatured
                              ? 'bg-amber-600 text-white shadow-xs'
                              : 'bg-gray-800 text-gray-400 hover:text-white'
                          }`}
                        >
                          <Star size={12} />
                          <span>{art.isFeatured ? 'Hero Story' : 'Set as Hero'}</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: ARTICLE MANAGEMENT */}
          {activeTab === 'articles' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-serif font-black text-lg text-white">All Published Articles</h3>
                <button
                  onClick={() => setActiveTab('create')}
                  className="bg-[#C9252D] hover:bg-red-700 text-white font-bold text-xs px-3 py-1.5 rounded-lg transition flex items-center gap-1 cursor-pointer"
                >
                  <Plus size={14} /> New Article
                </button>
              </div>

              <div className="bg-[#181B24] rounded-xl border border-gray-800 overflow-hidden">
                <table className="w-full text-left text-xs text-gray-300">
                  <thead className="bg-[#12141C] text-gray-400 font-mono uppercase text-[10px] border-b border-gray-800">
                    <tr>
                      <th className="p-3">Headline</th>
                      <th className="p-3">Category</th>
                      <th className="p-3">Author</th>
                      <th className="p-3">Published</th>
                      <th className="p-3">Flags</th>
                      <th className="p-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-800">
                    {articles.map((art) => (
                      <tr key={art.id} className="hover:bg-gray-800/40 transition">
                        <td className="p-3 font-semibold text-white max-w-xs truncate">
                          {art.title}
                        </td>
                        <td className="p-3">
                          <span className="bg-gray-800 text-red-400 px-2 py-0.5 rounded text-[10px] font-bold">
                            {art.category}
                          </span>
                        </td>
                        <td className="p-3 text-gray-400">{art.author}</td>
                        <td className="p-3 font-mono text-gray-400">{art.publishedAt}</td>
                        <td className="p-3">
                          <div className="flex gap-1">
                            {art.isBreaking && (
                              <span className="bg-red-900/60 text-red-300 text-[9px] px-1.5 py-0.5 rounded font-bold">
                                BREAKING
                              </span>
                            )}
                            {art.isFeatured && (
                              <span className="bg-amber-900/60 text-amber-300 text-[9px] px-1.5 py-0.5 rounded font-bold">
                                HERO
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="p-3 text-right space-x-1">
                          <button
                            onClick={() =>
                              onUpdateArticleState(art.id, { isBreaking: !art.isBreaking })
                            }
                            className="text-xs text-gray-400 hover:text-white px-2 py-1 bg-gray-800 rounded"
                          >
                            Toggle Breaking
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 3: CREATE ARTICLE */}
          {activeTab === 'create' && (
            <div className="max-w-2xl bg-[#181B24] p-6 rounded-xl border border-gray-800 space-y-4">
              <h3 className="font-serif font-black text-lg text-white">Create & Publish News Article</h3>
              <p className="text-xs text-gray-400">
                Story will immediately be indexed and displayed across the TJ News Mobile Application.
              </p>

              <form onSubmit={handleCreateArticle} className="space-y-4 text-xs">
                <div>
                  <label className="block text-gray-300 font-bold mb-1">Headline</label>
                  <input
                    type="text"
                    required
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    placeholder="e.g. Telangana Cabinet Clears Regional Ring Road Land Acquisition"
                    className="w-full p-2.5 bg-[#12141C] border border-gray-700 rounded-lg text-white focus:outline-none focus:border-red-500"
                  />
                </div>

                <div>
                  <label className="block text-gray-300 font-bold mb-1">Short Editorial Summary</label>
                  <textarea
                    required
                    rows={2}
                    value={newSummary}
                    onChange={(e) => setNewSummary(e.target.value)}
                    placeholder="Key highlights for the reader..."
                    className="w-full p-2.5 bg-[#12141C] border border-gray-700 rounded-lg text-white focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-gray-300 font-bold mb-1">Category</label>
                    <select
                      value={newCategory}
                      onChange={(e) => setNewCategory(e.target.value as any)}
                      className="w-full p-2.5 bg-[#12141C] border border-gray-700 rounded-lg text-white"
                    >
                      <option value="Hyderabad">Hyderabad</option>
                      <option value="Telangana">Telangana</option>
                      <option value="India">India</option>
                      <option value="Politics">Politics</option>
                      <option value="Business">Business</option>
                      <option value="Sports">Sports</option>
                      <option value="Entertainment">Entertainment</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-gray-300 font-bold mb-1">Author / Bylines</label>
                    <input
                      type="text"
                      value={newAuthor}
                      onChange={(e) => setNewAuthor(e.target.value)}
                      className="w-full p-2.5 bg-[#12141C] border border-gray-700 rounded-lg text-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-gray-300 font-bold mb-1">Image URL</label>
                  <input
                    type="text"
                    value={newImage}
                    onChange={(e) => setNewImage(e.target.value)}
                    className="w-full p-2.5 bg-[#12141C] border border-gray-700 rounded-lg text-white"
                  />
                </div>

                <div>
                  <label className="block text-gray-300 font-bold mb-1">Full Article Content</label>
                  <textarea
                    rows={5}
                    value={newContent}
                    onChange={(e) => setNewContent(e.target.value)}
                    placeholder="Paragraphs separated by double line breaks..."
                    className="w-full p-2.5 bg-[#12141C] border border-gray-700 rounded-lg text-white font-sans"
                  />
                </div>

                <div className="flex gap-4 pt-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={markBreaking}
                      onChange={(e) => setMarkBreaking(e.target.checked)}
                      className="accent-[#C9252D] w-4 h-4 cursor-pointer"
                    />
                    <span className="text-gray-300 font-bold">Mark as BREAKING News</span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={markFeatured}
                      onChange={(e) => setMarkFeatured(e.target.checked)}
                      className="accent-amber-500 w-4 h-4 cursor-pointer"
                    />
                    <span className="text-gray-300 font-bold">Set as Featured Hero Card</span>
                  </label>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-[#C9252D] hover:bg-red-700 text-white font-bold text-xs rounded-lg shadow-md transition cursor-pointer"
                >
                  Publish Story to TJ News Mobile Feed →
                </button>
              </form>
            </div>
          )}

          {/* TAB 4: CITIZEN REPORTS MODERATION */}
          {activeTab === 'citizen' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-serif font-black text-lg text-white">
                    Citizen Journalism Moderation Desk
                  </h3>
                  <p className="text-xs text-gray-400">
                    Review incoming field reports from verified citizen reporters before publishing.
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                {citizenSubmissions.map((sub) => (
                  <div
                    key={sub.id}
                    className="bg-[#181B24] p-4 rounded-xl border border-gray-800 space-y-3"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-mono text-gray-400 font-bold">
                          {sub.id}
                        </span>
                        <span className="text-xs text-gray-300 font-bold">
                          By {sub.authorName} ({sub.authorPhone})
                        </span>
                      </div>

                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          sub.status === 'approved'
                            ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                            : 'bg-amber-950 text-amber-400 border border-amber-800'
                        }`}
                      >
                        {sub.status.toUpperCase()}
                      </span>
                    </div>

                    <div>
                      <h4 className="text-sm font-bold text-white">{sub.headline}</h4>
                      <p className="text-xs text-gray-400 mt-1">{sub.description}</p>
                    </div>

                    <div className="flex items-center justify-between text-[11px] text-gray-500 font-mono pt-2 border-t border-gray-800">
                      <span>Location: {sub.location.locality}, {sub.location.city}</span>
                      <span>Submitted: {sub.submittedAt}</span>
                    </div>

                    {/* Action buttons */}
                    <div className="pt-2 flex items-center justify-end gap-2">
                      {sub.status !== 'approved' && (
                        <button
                          onClick={() => onApproveCitizenReport(sub.id)}
                          className="px-3 py-1.5 bg-emerald-700 hover:bg-emerald-600 text-white font-bold text-xs rounded-lg transition flex items-center gap-1 cursor-pointer"
                        >
                          <CheckCircle size={13} />
                          <span>Approve & Publish to Mobile Feed</span>
                        </button>
                      )}

                      {sub.status !== 'rejected' && sub.status !== 'approved' && (
                        <button
                          onClick={() => onRejectCitizenReport(sub.id)}
                          className="px-3 py-1.5 bg-gray-800 hover:bg-red-950 hover:text-red-300 text-gray-400 font-bold text-xs rounded-lg transition flex items-center gap-1 cursor-pointer"
                        >
                          <XCircle size={13} />
                          <span>Request Changes / Reject</span>
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: JOBS & RECRUITMENT MANAGEMENT */}
          {activeTab === 'jobs' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-serif font-black text-lg text-white">
                    Government Jobs & Recruitment Desk
                  </h3>
                  <p className="text-xs text-gray-400">
                    Publish official notifications, set application windows, and manage exam statuses.
                  </p>
                </div>
              </div>

              {/* Existing Jobs Table */}
              <div className="bg-[#181B24] rounded-xl border border-gray-800 overflow-hidden">
                <div className="p-3 bg-[#12141C] border-b border-gray-800 font-bold text-xs text-gray-300">
                  Active Recruitment Notifications ({jobs.length})
                </div>
                <div className="divide-y divide-gray-800">
                  {jobs.map((job) => (
                    <div key={job.id} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-gray-800/30">
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-bold text-blue-400 uppercase bg-blue-950/60 px-2 py-0.5 rounded border border-blue-900">
                            {job.category}
                          </span>
                          <span className="text-[10px] text-gray-400 font-mono">
                            {job.vacancies.toLocaleString()} Vacancies
                          </span>
                          <span className="text-[10px] font-mono text-amber-400">
                            Deadline: {job.applicationDeadline}
                          </span>
                        </div>
                        <h4 className="text-xs font-bold text-white mt-1">{job.title}</h4>
                        <p className="text-[11px] text-gray-400 mt-0.5">{job.department} • {job.qualification}</p>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className={`text-[10px] font-bold px-2 py-1 rounded-full ${
                          job.status === 'Applications Open'
                            ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                            : job.status === 'Hall Tickets Released'
                            ? 'bg-amber-950 text-amber-300 border border-amber-800'
                            : job.status === 'Results Declared'
                            ? 'bg-blue-950 text-blue-300 border border-blue-800'
                            : 'bg-gray-800 text-gray-400'
                        }`}>
                          {job.status}
                        </span>

                        {onUpdateJobStatus && (
                          <select
                            value={job.status}
                            onChange={(e) => onUpdateJobStatus(job.id, e.target.value as any)}
                            className="bg-[#12141C] border border-gray-700 text-gray-300 text-[11px] font-bold rounded px-2 py-1 cursor-pointer focus:outline-none"
                          >
                            <option value="Applications Open">Applications Open</option>
                            <option value="Upcoming">Upcoming</option>
                            <option value="Hall Tickets Released">Hall Tickets Released</option>
                            <option value="Exam Postponed">Exam Postponed</option>
                            <option value="Results Declared">Results Declared</option>
                            <option value="Closed">Closed</option>
                          </select>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Create New Job Notification Form */}
              <div className="max-w-2xl bg-[#181B24] p-5 rounded-xl border border-gray-800 space-y-4">
                <h4 className="font-serif font-black text-sm text-white flex items-center gap-2">
                  <Plus size={16} className="text-[#C9252D]" />
                  <span>Publish New Recruitment Notification</span>
                </h4>

                <form onSubmit={handleCreateJob} className="space-y-3 text-xs">
                  <div>
                    <label className="block text-gray-300 font-bold mb-1">Notification Title</label>
                    <input
                      type="text"
                      required
                      value={jobTitle}
                      onChange={(e) => setJobTitle(e.target.value)}
                      placeholder="e.g. Telangana Residential Educational Institutions Society: 3,200 Gurukulam Posts"
                      className="w-full p-2 bg-[#12141C] border border-gray-700 rounded-lg text-white"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-gray-300 font-bold mb-1">Recruiting Department</label>
                      <input
                        type="text"
                        required
                        value={jobDept}
                        onChange={(e) => setJobDept(e.target.value)}
                        placeholder="e.g. TREIRB / State Government"
                        className="w-full p-2 bg-[#12141C] border border-gray-700 rounded-lg text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-300 font-bold mb-1">Category</label>
                      <select
                        value={jobCategory}
                        onChange={(e) => setJobCategory(e.target.value as any)}
                        className="w-full p-2 bg-[#12141C] border border-gray-700 rounded-lg text-white"
                      >
                        <option value="TSPSC">TSPSC</option>
                        <option value="Police">Police</option>
                        <option value="Teachers / TET">Teachers / TET</option>
                        <option value="Group Services">Group Services</option>
                        <option value="Central / SSC / RRB">Central / SSC / RRB</option>
                        <option value="Banking">Banking</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-3">
                    <div>
                      <label className="block text-gray-300 font-bold mb-1">Qualification</label>
                      <select
                        value={jobQualification}
                        onChange={(e) => setJobQualification(e.target.value as any)}
                        className="w-full p-2 bg-[#12141C] border border-gray-700 rounded-lg text-white"
                      >
                        <option value="Any Degree">Any Degree</option>
                        <option value="10th / Intermediate">10th / Intermediate</option>
                        <option value="B.Tech / Engineering">B.Tech / Engineering</option>
                        <option value="B.Ed / D.Ed">B.Ed / D.Ed</option>
                        <option value="Post Graduate">Post Graduate</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-gray-300 font-bold mb-1">Vacancies</label>
                      <input
                        type="number"
                        value={jobVacancies}
                        onChange={(e) => setJobVacancies(Number(e.target.value))}
                        className="w-full p-2 bg-[#12141C] border border-gray-700 rounded-lg text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-300 font-bold mb-1">Age Limit</label>
                      <input
                        type="text"
                        value={jobAgeLimit}
                        onChange={(e) => setJobAgeLimit(e.target.value)}
                        className="w-full p-2 bg-[#12141C] border border-gray-700 rounded-lg text-white"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-3">
                    <div>
                      <label className="block text-gray-300 font-bold mb-1">Application Start</label>
                      <input
                        type="text"
                        value={jobStartDate}
                        onChange={(e) => setJobStartDate(e.target.value)}
                        className="w-full p-2 bg-[#12141C] border border-gray-700 rounded-lg text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-300 font-bold mb-1">Application Deadline</label>
                      <input
                        type="text"
                        value={jobDeadline}
                        onChange={(e) => setJobDeadline(e.target.value)}
                        className="w-full p-2 bg-[#12141C] border border-gray-700 rounded-lg text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-300 font-bold mb-1">Tentative Exam Date</label>
                      <input
                        type="text"
                        value={jobExamDate}
                        onChange={(e) => setJobExamDate(e.target.value)}
                        className="w-full p-2 bg-[#12141C] border border-gray-700 rounded-lg text-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-gray-300 font-bold mb-1">Official Portal URL</label>
                    <input
                      type="url"
                      value={jobUrl}
                      onChange={(e) => setJobUrl(e.target.value)}
                      className="w-full p-2 bg-[#12141C] border border-gray-700 rounded-lg text-white"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2.5 bg-[#C9252D] hover:bg-red-700 text-white font-bold rounded-lg transition cursor-pointer"
                  >
                    Publish Recruitment Alert to App →
                  </button>
                </form>
              </div>
            </div>
          )}

          {/* TAB 6: DAILY QUIZ MANAGEMENT */}
          {activeTab === 'quiz' && (
            <div className="space-y-6">
              <div>
                <h3 className="font-serif font-black text-lg text-white">Daily 5-MCQ Quiz Desk</h3>
                <p className="text-xs text-gray-400">
                  Manage student preparation questions, answers, and explanations.
                </p>
              </div>

              {/* Questions List */}
              <div className="space-y-3">
                {quizQuestions.map((q, idx) => (
                  <div key={q.id} className="bg-[#181B24] p-4 rounded-xl border border-gray-800 space-y-2">
                    <div className="flex items-center justify-between text-[11px] font-mono text-gray-400">
                      <span>Question #{idx + 1} • {q.category}</span>
                      <span className="text-emerald-400 font-bold">Answer: Option {String.fromCharCode(65 + q.correctIndex)}</span>
                    </div>
                    <p className="text-xs font-bold text-white">{q.question}</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1 text-[11px]">
                      {q.options.map((opt, optIdx) => (
                        <div
                          key={optIdx}
                          className={`p-2 rounded border ${
                            optIdx === q.correctIndex
                              ? 'bg-emerald-950/40 border-emerald-600 text-emerald-300 font-bold'
                              : 'bg-[#12141C] border-gray-800 text-gray-400'
                          }`}
                        >
                          <span className="mr-1.5 font-mono">{String.fromCharCode(65 + optIdx)}.</span>
                          <span>{opt}</span>
                        </div>
                      ))}
                    </div>
                    {q.explanation && (
                      <p className="text-[11px] text-gray-400 italic pt-1 border-t border-gray-800">
                        Explanation: {q.explanation}
                      </p>
                    )}
                  </div>
                ))}
              </div>

              {/* Add New Quiz Question Form */}
              <div className="max-w-2xl bg-[#181B24] p-5 rounded-xl border border-gray-800 space-y-4">
                <h4 className="font-serif font-black text-sm text-white flex items-center gap-2">
                  <Plus size={16} className="text-[#C9252D]" />
                  <span>Add New MCQ Question</span>
                </h4>

                <form onSubmit={handleCreateQuizQuestion} className="space-y-3 text-xs">
                  <div>
                    <label className="block text-gray-300 font-bold mb-1">Question Text</label>
                    <input
                      type="text"
                      required
                      value={quizQ}
                      onChange={(e) => setQuizQ(e.target.value)}
                      placeholder="e.g. Which Telangana district has the highest forest cover percentage?"
                      className="w-full p-2 bg-[#12141C] border border-gray-700 rounded-lg text-white"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-gray-300 font-bold mb-1">Option A</label>
                      <input
                        type="text"
                        required
                        value={quizOpt0}
                        onChange={(e) => setQuizOpt0(e.target.value)}
                        placeholder="Option A"
                        className="w-full p-2 bg-[#12141C] border border-gray-700 rounded-lg text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-300 font-bold mb-1">Option B</label>
                      <input
                        type="text"
                        required
                        value={quizOpt1}
                        onChange={(e) => setQuizOpt1(e.target.value)}
                        placeholder="Option B"
                        className="w-full p-2 bg-[#12141C] border border-gray-700 rounded-lg text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-300 font-bold mb-1">Option C</label>
                      <input
                        type="text"
                        required
                        value={quizOpt2}
                        onChange={(e) => setQuizOpt2(e.target.value)}
                        placeholder="Option C"
                        className="w-full p-2 bg-[#12141C] border border-gray-700 rounded-lg text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-300 font-bold mb-1">Option D</label>
                      <input
                        type="text"
                        required
                        value={quizOpt3}
                        onChange={(e) => setQuizOpt3(e.target.value)}
                        placeholder="Option D"
                        className="w-full p-2 bg-[#12141C] border border-gray-700 rounded-lg text-white"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-gray-300 font-bold mb-1">Correct Option</label>
                      <select
                        value={quizCorrect}
                        onChange={(e) => setQuizCorrect(Number(e.target.value))}
                        className="w-full p-2 bg-[#12141C] border border-gray-700 rounded-lg text-white font-bold"
                      >
                        <option value={0}>Option A</option>
                        <option value={1}>Option B</option>
                        <option value={2}>Option C</option>
                        <option value={3}>Option D</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-gray-300 font-bold mb-1">Explanation</label>
                      <input
                        type="text"
                        value={quizExpl}
                        onChange={(e) => setQuizExpl(e.target.value)}
                        placeholder="Why this answer is correct..."
                        className="w-full p-2 bg-[#12141C] border border-gray-700 rounded-lg text-white"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2.5 bg-[#C9252D] hover:bg-red-700 text-white font-bold rounded-lg transition cursor-pointer"
                  >
                    Add Question to Daily Quiz →
                  </button>
                </form>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};
