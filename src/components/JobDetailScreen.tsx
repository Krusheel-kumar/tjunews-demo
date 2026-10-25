import React, { useState } from 'react';
import type { JobNotification } from '../types';
import {
  ArrowLeft,
  Briefcase,
  Calendar,
  GraduationCap,
  ExternalLink,
  Bell,
  Share2,
  CheckCircle2,
  AlertCircle,
  FileText,
  Clock,
  ShieldCheck,
  Check
} from 'lucide-react';

interface JobDetailScreenProps {
  job: JobNotification;
  onBack: () => void;
  isFollowed: boolean;
  onToggleFollow: () => void;
  onShare: (title: string) => void;
  language: 'English' | 'Telugu';
}

export const JobDetailScreen: React.FC<JobDetailScreenProps> = ({
  job,
  onBack,
  isFollowed,
  onToggleFollow,
  onShare,
  language
}) => {
  return (
    <div className="bg-[#F8F9FA] min-h-screen pb-24 animate-fadeIn">
      {/* Sticky Top Header */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-gray-100 px-3 py-2.5 flex items-center justify-between shadow-2xs">
        <button
          onClick={onBack}
          aria-label="Back"
          className="p-1.5 rounded-full hover:bg-gray-100 text-gray-700 transition cursor-pointer"
        >
          <ArrowLeft size={20} />
        </button>

        <div className="flex items-center gap-1.5">
          <button
            onClick={onToggleFollow}
            className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold transition cursor-pointer ${
              isFollowed
                ? 'bg-red-50 text-[#C9252D] border border-red-200'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {isFollowed ? <Check size={13} /> : <Bell size={13} />}
            <span>{isFollowed ? 'Alerts On' : 'Follow Job'}</span>
          </button>

          <button
            onClick={() => onShare(job.title)}
            className="p-2 rounded-full hover:bg-gray-100 text-gray-700 transition cursor-pointer"
          >
            <Share2 size={18} />
          </button>
        </div>
      </header>

      {/* Main Content */}
      <div className="p-4 space-y-4 max-w-lg mx-auto">
        {/* Status and Category Badge */}
        <div className="flex items-center gap-2">
          <span className="bg-[#C9252D] text-white text-[10px] font-black uppercase px-2 py-0.5 rounded-xs tracking-wider">
            {job.category}
          </span>
          <span className="bg-gray-100 text-gray-700 text-[10px] font-bold px-2 py-0.5 rounded-xs">
            {job.stateOrCentral}
          </span>
          <span
            className={`text-[10px] font-bold px-2 py-0.5 rounded-full ml-auto ${
              job.status === 'Applications Open'
                ? 'bg-emerald-100 text-emerald-800'
                : 'bg-amber-100 text-amber-800'
            }`}
          >
            ● {job.status}
          </span>
        </div>

        {/* Title & Department */}
        <div>
          <h1 className="font-serif font-black text-xl text-gray-900 leading-tight">
            {language === 'Telugu' && job.titleTe ? job.titleTe : job.title}
          </h1>
          <p className="text-xs text-gray-600 mt-1 font-medium">{job.department}</p>
        </div>

        {/* Essential Quick Facts Card */}
        <div className="bg-white rounded-2xl p-4 border border-gray-200 shadow-2xs space-y-3">
          <h3 className="font-serif font-black text-xs text-gray-900 uppercase tracking-wider border-b border-gray-100 pb-2">
            Key Recruitment Highlights
          </h3>

          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="p-2 bg-gray-50 rounded-lg">
              <span className="text-[10px] text-gray-400 block font-mono">Total Vacancies</span>
              <span className="font-bold text-base text-gray-900">{job.vacancies.toLocaleString()} Posts</span>
            </div>

            <div className="p-2 bg-gray-50 rounded-lg">
              <span className="text-[10px] text-gray-400 block font-mono">Educational Requirement</span>
              <span className="font-bold text-xs text-gray-900 line-clamp-2">{job.qualification}</span>
            </div>

            <div className="p-2 bg-gray-50 rounded-lg">
              <span className="text-[10px] text-gray-400 block font-mono">Age Ceiling</span>
              <span className="font-bold text-xs text-gray-900">{job.ageLimit}</span>
            </div>

            <div className="p-2 bg-gray-50 rounded-lg">
              <span className="text-[10px] text-gray-400 block font-mono">Exam Date</span>
              <span className="font-bold text-xs text-gray-900 font-mono">
                {job.examDate || 'Announced Soon'}
              </span>
            </div>
          </div>

          <div className="pt-1 border-t border-gray-100 flex items-center justify-between text-xs text-gray-600">
            <span>Application Window:</span>
            <span className="font-bold text-red-600 font-mono">
              {job.applicationStartDate} to {job.applicationDeadline}
            </span>
          </div>
        </div>

        {/* Official Authority Action Buttons */}
        <div className="grid grid-cols-2 gap-2 pt-1">
          <a
            href={job.officialNotificationUrl}
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-center gap-1.5 p-3 rounded-xl bg-white border border-gray-300 hover:bg-gray-50 text-gray-800 text-xs font-bold shadow-2xs transition"
          >
            <FileText size={15} />
            <span>Official Gazette PDF</span>
            <ExternalLink size={12} className="text-gray-400" />
          </a>

          <a
            href={job.officialApplyUrl}
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-center gap-1.5 p-3 rounded-xl bg-[#C9252D] hover:bg-red-700 text-white text-xs font-bold shadow-sm transition"
          >
            <CheckCircle2 size={15} />
            <span>Apply on Portal</span>
            <ExternalLink size={12} />
          </a>
        </div>

        {/* Job Details Narrative */}
        <div className="bg-white rounded-2xl p-4 border border-gray-200 shadow-2xs space-y-3 text-xs leading-relaxed text-gray-700">
          <h3 className="font-serif font-black text-sm text-gray-900">Official Notice Summary</h3>
          <p>{job.description}</p>

          {job.syllabusHighlights && (
            <div className="pt-2">
              <h4 className="font-bold text-gray-900 mb-1.5 flex items-center gap-1">
                <GraduationCap size={14} className="text-amber-500" />
                <span>Syllabus & Pattern Overview</span>
              </h4>
              <ul className="list-disc pl-4 space-y-1 text-gray-600">
                {job.syllabusHighlights.map((s, idx) => (
                  <li key={idx}>{s}</li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Ethics & Authority Verification Note */}
        <div className="bg-emerald-50 border border-emerald-200 p-3 rounded-xl flex items-start gap-2 text-xs text-emerald-900">
          <ShieldCheck size={16} className="text-emerald-700 flex-shrink-0 mt-0.5" />
          <p className="text-[11px] leading-relaxed">
            <strong>TJU Verified Job Notice:</strong> This recruitment alert was cross-verified directly against the official Telangana Gazette and department portals. Beware of unauthorized third-party fee collection portals.
          </p>
        </div>
      </div>
    </div>
  );
};
