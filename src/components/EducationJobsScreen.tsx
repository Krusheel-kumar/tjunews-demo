import React, { useState } from 'react';
import type { JobNotification, ExamEvent, QuizQuestion } from '../types';
import {
  Briefcase,
  Calendar,
  GraduationCap,
  ExternalLink,
  Filter,
  CheckCircle2,
  Clock,
  Award,
  BookOpen,
  ChevronRight,
  Bell,
  Search,
  Check,
  ArrowLeft
} from 'lucide-react';

interface EducationJobsScreenProps {
  jobs: JobNotification[];
  examCalendar: ExamEvent[];
  quizQuestions: QuizQuestion[];
  language: 'English' | 'Telugu';
  onSelectJob: (job: JobNotification) => void;
  followedExams: string[];
  onToggleFollowExam: (examName: string) => void;
  onOpenArticleById?: (artId: string) => void;
  onBack?: () => void;
}

export const EducationJobsScreen: React.FC<EducationJobsScreenProps> = ({
  jobs,
  examCalendar,
  quizQuestions,
  language,
  onSelectJob,
  followedExams,
  onToggleFollowExam,
  onOpenArticleById,
  onBack
}) => {
  const [subTab, setSubTab] = useState<'jobs' | 'calendar' | 'quiz' | 'preparation'>('jobs');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedQualification, setSelectedQualification] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Quiz state
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [showExplanation, setShowExplanation] = useState(false);
  const [quizScore, setQuizScore] = useState<number | null>(null);

  const categories = ['All', 'TSPSC', 'Police', 'Teachers / TET', 'Group Services', 'Central / SSC / RRB', 'Banking'];
  const qualifications = ['All', '10th / Intermediate', 'Any Degree', 'B.Tech / Engineering', 'B.Ed / D.Ed'];

  const filteredJobs = jobs.filter((job) => {
    const matchesCat = selectedCategory === 'All' || job.category === selectedCategory;
    const matchesQual = selectedQualification === 'All' || job.qualification === selectedQualification;
    const matchesQuery =
      searchQuery.trim() === '' ||
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (job.titleTe && job.titleTe.includes(searchQuery));
    return matchesCat && matchesQual && matchesQuery;
  });

  const handleAnswerSelect = (optionIdx: number) => {
    if (selectedAnswers[currentQuizIndex] !== undefined) return; // already answered
    setSelectedAnswers({
      ...selectedAnswers,
      [currentQuizIndex]: optionIdx
    });
    setShowExplanation(true);
  };

  const handleNextQuiz = () => {
    setShowExplanation(false);
    if (currentQuizIndex < quizQuestions.length - 1) {
      setCurrentQuizIndex(currentQuizIndex + 1);
    } else {
      // Calculate score
      let score = 0;
      quizQuestions.forEach((q, idx) => {
        if (selectedAnswers[idx] === q.correctIndex) score += 1;
      });
      setQuizScore(score);
    }
  };

  const resetQuiz = () => {
    setCurrentQuizIndex(0);
    setSelectedAnswers({});
    setShowExplanation(false);
    setQuizScore(null);
  };

  return (
    <div className="bg-[#F8F9FA] min-h-screen pb-24 animate-fadeIn">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-[#090D16] via-[#151F33] to-[#0A0E18] text-white p-4 border-b border-gray-800 relative overflow-hidden shadow-md">
        {/* Subtle gold ambient glow */}
        <div className="absolute top-0 right-0 w-40 h-40 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />

        <div className="flex items-center justify-between mb-1.5 relative z-10">
          <div className="flex items-center gap-2">
            {onBack && (
              <button
                onClick={onBack}
                aria-label="Back"
                className="p-1.5 -ml-1 rounded-full hover:bg-white/10 text-gray-300 hover:text-white transition cursor-pointer active:scale-95"
              >
                <ArrowLeft size={20} />
              </button>
            )}
            <GraduationCap size={22} className="text-amber-400" />
            <h1 className="font-serif font-black text-xl tracking-tight text-white">
              {language === 'Telugu' ? 'విద్య & ప్రభుత్వ ఉద్యోగాల సమాచారం' : 'Education & Govt Jobs'}
            </h1>
          </div>
        </div>
        <p className="text-xs text-gray-300 max-w-sm leading-relaxed relative z-10 font-sans">
          {language === 'Telugu'
            ? 'తెలంగాణ మరియు జాతీయ నోటిఫికేషన్లు, సిలబస్, పరీక్షల క్యాలెండర్ మరియు రోజువారీ ప్రాక్టీస్ క్విజ్'
            : 'Telangana TSPSC, Police, DSC, SSC recruitment notifications, exam schedules & daily quizzes.'}
        </p>

        {/* Sub-tab Navigation */}
        <div className="flex gap-2 mt-4 overflow-x-auto scrollbar-none pt-1 relative z-10">
          {[
            { id: 'jobs', label: language === 'Telugu' ? 'ఉద్యోగ నోటిఫికేషన్లు' : 'Job Notifications', icon: Briefcase },
            { id: 'calendar', label: language === 'Telugu' ? 'పరీక్షల క్యాలెండర్' : 'Exam Calendar', icon: Calendar },
            { id: 'quiz', label: language === 'Telugu' ? 'రోజువారీ క్విజ్' : 'Daily Quiz (5 MCQs)', icon: Award },
            { id: 'preparation', label: language === 'Telugu' ? 'ప్రిపరేషన్ గైడ్' : 'Study & Prep', icon: BookOpen }
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = subTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setSubTab(tab.id as any)}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer active:scale-95 ${
                  isActive
                    ? 'bg-gradient-to-r from-[#C9252D] to-[#AA1B23] text-white shadow-md'
                    : 'bg-white/10 hover:bg-white/20 text-gray-200 border border-white/5'
                }`}
              >
                <Icon size={13} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* SUB-TAB 1: JOB NOTIFICATIONS */}
      {subTab === 'jobs' && (
        <div className="p-3 space-y-3">
          {/* Search bar inside jobs */}
          <div className="relative">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={language === 'Telugu' ? 'ఉద్యోగం లేదా డిపార్ట్‌మెంట్ వెతకండి...' : 'Search jobs (e.g. Group 2, DSC, Police)...'}
              className="w-full pl-9 pr-3 py-2 bg-white border border-gray-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-[#C9252D]/30"
            />
          </div>

          {/* Category Filter Pills */}
          <div className="flex gap-1.5 overflow-x-auto scrollbar-none py-1">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1 rounded-full text-[11px] font-semibold whitespace-nowrap transition cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-[#C9252D] text-white shadow-xs'
                    : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-100'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Qualification Filter */}
          <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none text-[11px] text-gray-500">
            <span className="font-bold flex-shrink-0 flex items-center gap-0.5">
              <Filter size={11} /> Qualification:
            </span>
            {qualifications.map((qual) => (
              <button
                key={qual}
                onClick={() => setSelectedQualification(qual)}
                className={`px-2 py-0.5 rounded text-[10px] font-medium transition cursor-pointer whitespace-nowrap ${
                  selectedQualification === qual
                    ? 'bg-gray-800 text-white font-bold'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {qual}
              </button>
            ))}
          </div>

          {/* Job Card List */}
          <div className="space-y-3 pt-1">
            {filteredJobs.length === 0 ? (
              <div className="bg-white p-8 rounded-xl text-center text-gray-400 text-xs">
                No recruitment notices found matching your criteria.
              </div>
            ) : (
              filteredJobs.map((job) => {
                const isFollowed = followedExams.includes(job.category);
                return (
                  <div
                    key={job.id}
                    onClick={() => onSelectJob(job)}
                    className="bg-white rounded-xl p-3.5 border border-gray-200 shadow-2xs hover:shadow-xs transition cursor-pointer space-y-2.5"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <span className="text-[10px] font-bold text-[#C9252D] uppercase tracking-wider bg-red-50 border border-red-200 px-2 py-0.5 rounded-sm">
                        {job.category}
                      </span>
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          job.status === 'Applications Open'
                            ? 'bg-emerald-100 text-emerald-800'
                            : job.status === 'Hall Tickets Released'
                            ? 'bg-blue-100 text-blue-800'
                            : job.status === 'Results Declared'
                            ? 'bg-purple-100 text-purple-800'
                            : 'bg-amber-100 text-amber-800'
                        }`}
                      >
                        {job.status}
                      </span>
                    </div>

                    <div>
                      <h3 className="font-serif font-black text-sm text-gray-900 leading-snug">
                        {language === 'Telugu' && job.titleTe ? job.titleTe : job.title}
                      </h3>
                      <p className="text-[11px] text-gray-500 mt-0.5">{job.department}</p>
                    </div>

                    {/* Metadata Grid */}
                    <div className="grid grid-cols-2 gap-2 bg-gray-50 p-2 rounded-lg text-[11px] text-gray-700">
                      <div>
                        <span className="text-gray-400 block text-[10px]">Vacancies:</span>
                        <span className="font-bold text-gray-900">{job.vacancies.toLocaleString()} Posts</span>
                      </div>
                      <div>
                        <span className="text-gray-400 block text-[10px]">Qualification:</span>
                        <span className="font-bold text-gray-900">{job.qualification}</span>
                      </div>
                      <div>
                        <span className="text-gray-400 block text-[10px]">Deadline:</span>
                        <span className="font-mono font-bold text-red-600">{job.applicationDeadline}</span>
                      </div>
                      <div>
                        <span className="text-gray-400 block text-[10px]">Exam Date:</span>
                        <span className="font-mono text-gray-800">{job.examDate || 'To be announced'}</span>
                      </div>
                    </div>

                    {/* Actions bar */}
                    <div className="flex items-center justify-between pt-1 text-xs">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onToggleFollowExam(job.category);
                        }}
                        className={`flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-md transition ${
                          isFollowed
                            ? 'bg-red-50 text-[#C9252D] border border-red-200'
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                      >
                        {isFollowed ? <Check size={12} /> : <Bell size={12} />}
                        <span>{isFollowed ? 'Alerts On' : 'Follow Category'}</span>
                      </button>

                      <div className="flex items-center gap-2">
                        <a
                          href={job.officialNotificationUrl}
                          target="_blank"
                          rel="noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="flex items-center gap-1 text-[11px] text-gray-600 hover:text-gray-900 underline underline-offset-2"
                        >
                          <span>Official PDF</span>
                          <ExternalLink size={11} />
                        </a>
                        <button className="bg-[#C9252D] hover:bg-red-700 text-white font-bold text-xs px-3 py-1 rounded-md transition flex items-center gap-1">
                          <span>Details</span>
                          <ChevronRight size={12} />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      )}

      {/* SUB-TAB 2: EXAM CALENDAR */}
      {subTab === 'calendar' && (
        <div className="p-3 space-y-3">
          <div className="bg-white p-3.5 rounded-xl border border-gray-200">
            <h3 className="font-serif font-black text-base text-gray-900 mb-1">
              Telangana & Central Govt Exam Calendar 2026-27
            </h3>
            <p className="text-xs text-gray-500">
              Never miss hall ticket download dates, test centers, or exam schedules.
            </p>
          </div>

          <div className="space-y-2.5">
            {examCalendar.map((item) => (
              <div
                key={item.id}
                className="bg-white p-3.5 rounded-xl border border-gray-200 flex items-center justify-between gap-3 shadow-2xs"
              >
                <div className="flex items-start gap-3">
                  <div className="w-12 h-12 rounded-xl bg-red-50 text-[#C9252D] flex flex-col items-center justify-center font-bold flex-shrink-0 border border-red-200">
                    <Calendar size={18} />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wide">
                      {item.category}
                    </span>
                    <h4 className="font-bold text-xs text-gray-900 leading-snug">{item.title}</h4>
                    <div className="flex items-center gap-2 text-[10px] text-gray-500 font-mono mt-1">
                      <span>Exam: <strong className="text-gray-800">{item.examDate}</strong></span>
                      {item.hallTicketDate && (
                        <span>• Hall Ticket: {item.hallTicketDate}</span>
                      )}
                    </div>
                  </div>
                </div>

                <a
                  href={item.officialLink}
                  target="_blank"
                  rel="noreferrer"
                  className="bg-gray-100 hover:bg-gray-200 text-gray-800 p-2 rounded-lg text-xs font-bold flex items-center gap-1 flex-shrink-0"
                >
                  <ExternalLink size={13} />
                </a>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SUB-TAB 3: DAILY QUIZ */}
      {subTab === 'quiz' && (
        <div className="p-3 space-y-3">
          {quizScore !== null ? (
            <div className="bg-white p-6 rounded-2xl border border-gray-200 text-center space-y-4 shadow-sm animate-fadeIn">
              <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto border-2 border-emerald-200">
                <Award size={32} />
              </div>
              <div>
                <h3 className="font-serif font-black text-xl text-gray-900">Quiz Completed!</h3>
                <p className="text-xs text-gray-500 mt-1">Today’s Telangana Current Affairs & General Studies</p>
              </div>
              <div className="text-3xl font-black text-[#C9252D]">
                {quizScore} / {quizQuestions.length}
              </div>
              <p className="text-xs text-gray-600 max-w-xs mx-auto leading-relaxed">
                {quizScore >= 4
                  ? 'Outstanding preparation! You are on track for upcoming Group-2 and DSC exams.'
                  : 'Good effort! Review the explanations below and attempt again tomorrow.'}
              </p>
              <button
                onClick={resetQuiz}
                className="w-full py-2.5 bg-[#C9252D] hover:bg-red-700 text-white font-bold text-xs rounded-xl shadow-md cursor-pointer"
              >
                Retake Quiz
              </button>
            </div>
          ) : (
            <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-2xs space-y-4 animate-fadeIn">
              <div className="flex items-center justify-between text-xs pb-2 border-b border-gray-100">
                <span className="font-bold text-[#C9252D] uppercase tracking-wider text-[10px]">
                  {quizQuestions[currentQuizIndex].category}
                </span>
                <span className="font-mono text-gray-400">
                  Question {currentQuizIndex + 1} of {quizQuestions.length}
                </span>
              </div>

              {/* Question text */}
              <h3 className="font-serif font-bold text-sm text-gray-900 leading-snug">
                {language === 'Telugu' && quizQuestions[currentQuizIndex].questionTe
                  ? quizQuestions[currentQuizIndex].questionTe
                  : quizQuestions[currentQuizIndex].question}
              </h3>

              {/* Options */}
              <div className="space-y-2">
                {(language === 'Telugu' && quizQuestions[currentQuizIndex].optionsTe
                  ? quizQuestions[currentQuizIndex].optionsTe
                  : quizQuestions[currentQuizIndex].options
                ).map((opt, oIdx) => {
                  const isSelected = selectedAnswers[currentQuizIndex] === oIdx;
                  const isCorrect = oIdx === quizQuestions[currentQuizIndex].correctIndex;
                  const hasAnswered = selectedAnswers[currentQuizIndex] !== undefined;

                  let btnStyle = 'bg-gray-50 border-gray-200 text-gray-800 hover:bg-gray-100';
                  if (hasAnswered) {
                    if (isCorrect) btnStyle = 'bg-emerald-50 border-emerald-400 text-emerald-900 font-bold';
                    else if (isSelected) btnStyle = 'bg-red-50 border-red-300 text-red-900 font-bold';
                    else btnStyle = 'bg-gray-50 border-gray-200 text-gray-400 opacity-60';
                  }

                  return (
                    <button
                      key={oIdx}
                      onClick={() => handleAnswerSelect(oIdx)}
                      disabled={hasAnswered}
                      className={`w-full p-2.5 rounded-lg border text-left text-xs font-medium transition cursor-pointer flex items-center justify-between ${btnStyle}`}
                    >
                      <span>{opt}</span>
                      {hasAnswered && isCorrect && <CheckCircle2 size={15} className="text-emerald-600 flex-shrink-0" />}
                    </button>
                  );
                })}
              </div>

              {/* Explanation Card */}
              {showExplanation && (
                <div className="p-3 bg-amber-50/70 border border-amber-200 rounded-lg text-xs text-amber-950 space-y-1 animate-fadeIn">
                  <div className="font-bold flex items-center gap-1">
                    <BookOpen size={13} /> Explanation & Key Reference:
                  </div>
                  <p className="text-[11px] leading-relaxed">
                    {quizQuestions[currentQuizIndex].explanation}
                  </p>
                </div>
              )}

              {/* Next Question Trigger */}
              {selectedAnswers[currentQuizIndex] !== undefined && (
                <button
                  onClick={handleNextQuiz}
                  className="w-full py-2.5 bg-[#C9252D] hover:bg-red-700 text-white font-bold text-xs rounded-lg shadow-sm transition cursor-pointer"
                >
                  {currentQuizIndex === quizQuestions.length - 1 ? 'Finish Quiz & View Score →' : 'Next Question →'}
                </button>
              )}
            </div>
          )}
        </div>
      )}

      {/* SUB-TAB 4: STUDY & PREPARATION */}
      {subTab === 'preparation' && (
        <div className="p-3 space-y-3">
          <div className="bg-white p-3.5 rounded-xl border border-gray-200">
            <h3 className="font-serif font-black text-base text-gray-900">
              Telangana State Movement & General Studies Syllabus Guide
            </h3>
            <p className="text-xs text-gray-500 mt-1">
              Curated preparation materials, previous question paper trends, and subject-wise weightage.
            </p>
          </div>

          <div className="space-y-2.5">
            <div
              onClick={() => onOpenArticleById && onOpenArticleById('art-job-dsc-2026')}
              className="bg-white p-3 rounded-xl border border-gray-200 hover:shadow-xs transition cursor-pointer flex gap-3"
            >
              <img
                src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=400&auto=format&fit=crop&q=80"
                alt=""
                className="w-20 h-20 rounded-lg object-cover flex-shrink-0"
              />
              <div className="flex-1">
                <span className="text-[10px] font-bold text-[#C9252D] uppercase">Syllabus Breakdown</span>
                <h4 className="font-bold text-xs text-gray-900 line-clamp-2 mt-0.5">
                  Telangana Mega DSC 2026: Complete Syllabus Breakdown & District Vacancy Roster
                </h4>
                <span className="text-[10px] text-gray-400 font-mono mt-1 block">5 min read • Education Desk</span>
              </div>
            </div>

            <div className="bg-white p-3.5 rounded-xl border border-gray-200 space-y-2">
              <span className="text-[10px] font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded uppercase">
                Free Student Download
              </span>
              <h4 className="font-bold text-xs text-gray-900">
                Telangana History & Culture: Top 250 Solved MCQs (PDF)
              </h4>
              <p className="text-[11px] text-gray-500">
                Compiled from past TSPSC Group 1, Group 2 and Sub-Inspector question papers with official key.
              </p>
              <div className="pt-1 flex items-center justify-between text-xs">
                <span className="text-gray-400 text-[10px]">TJU Competitive Bureau</span>
                <button
                  onClick={() => alert('Download demo initiated: TSPSC_Telangana_History_250_MCQs.pdf')}
                  className="bg-gray-900 hover:bg-black text-white text-[11px] font-bold px-3 py-1 rounded-md"
                >
                  Download Free PDF
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
