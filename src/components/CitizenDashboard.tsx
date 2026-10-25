import React, { useState } from 'react';
import type { CitizenSubmission } from '../types';
import { ArrowLeft, Plus, Clock, CheckCircle2, AlertTriangle, XCircle, Edit3, MessageSquare, ShieldCheck } from 'lucide-react';

interface CitizenDashboardProps {
  submissions: CitizenSubmission[];
  onBack: () => void;
  onOpenNewSubmission: () => void;
}

export const CitizenDashboard: React.FC<CitizenDashboardProps> = ({
  submissions,
  onBack,
  onOpenNewSubmission
}) => {
  const [selectedSub, setSelectedSub] = useState<CitizenSubmission | null>(null);

  const getStatusBadge = (status: CitizenSubmission['status']) => {
    switch (status) {
      case 'approved':
        return (
          <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full">
            <CheckCircle2 size={11} /> Approved & Published
          </span>
        );
      case 'under_review':
        return (
          <span className="inline-flex items-center gap-1 text-[10px] font-bold text-blue-800 bg-blue-100 px-2 py-0.5 rounded-full">
            <Clock size={11} /> Under Desk Review
          </span>
        );
      case 'changes_requested':
        return (
          <span className="inline-flex items-center gap-1 text-[10px] font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded-full">
            <AlertTriangle size={11} /> Changes Requested
          </span>
        );
      case 'rejected':
        return (
          <span className="inline-flex items-center gap-1 text-[10px] font-bold text-red-800 bg-red-100 px-2 py-0.5 rounded-full">
            <XCircle size={11} /> Rejected
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 text-[10px] font-bold text-gray-800 bg-gray-200 px-2 py-0.5 rounded-full">
            <Clock size={11} /> Pending Review
          </span>
        );
    }
  };

  return (
    <div className="bg-[#F8F9FA] min-h-screen pb-20 animate-fadeIn">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white border-b border-gray-100 px-3 py-2.5 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button
            onClick={onBack}
            className="p-1 rounded-full hover:bg-gray-100 text-gray-700 transition cursor-pointer"
          >
            <ArrowLeft size={20} />
          </button>
          <div>
            <h2 className="font-serif font-black text-base text-gray-900 leading-tight">
              Contributor Dashboard
            </h2>
            <span className="text-[10px] text-gray-400">Reporter ID: TJ-CR-8921</span>
          </div>
        </div>

        <button
          onClick={onOpenNewSubmission}
          className="bg-[#C9252D] hover:bg-red-700 text-white text-xs font-bold px-2.5 py-1.5 rounded-lg flex items-center gap-1 shadow-xs transition cursor-pointer"
        >
          <Plus size={14} />
          <span>New Report</span>
        </button>
      </header>

      {/* Overview Stat Strip */}
      <div className="p-3">
        <div className="grid grid-cols-3 gap-2">
          <div className="bg-white p-3 rounded-xl border border-gray-200 text-center">
            <div className="text-xl font-black text-gray-900">{submissions.length}</div>
            <div className="text-[10px] text-gray-500 font-medium">Total Reports</div>
          </div>
          <div className="bg-white p-3 rounded-xl border border-emerald-200 text-center bg-emerald-50/20">
            <div className="text-xl font-black text-emerald-600">
              {submissions.filter((s) => s.status === 'approved').length}
            </div>
            <div className="text-[10px] text-emerald-700 font-medium">Published</div>
          </div>
          <div className="bg-white p-3 rounded-xl border border-amber-200 text-center bg-amber-50/20">
            <div className="text-xl font-black text-amber-600">
              {submissions.filter((s) => s.status !== 'approved').length}
            </div>
            <div className="text-[10px] text-amber-700 font-medium">In Review</div>
          </div>
        </div>
      </div>

      {/* Submissions List */}
      <div className="px-3 space-y-2.5">
        <h3 className="font-serif font-black text-sm text-gray-900">
          My Submissions & Editorial Status
        </h3>

        {submissions.map((sub) => (
          <div
            key={sub.id}
            onClick={() => setSelectedSub(sub)}
            className="bg-white p-3.5 rounded-xl border border-gray-200/90 shadow-2xs hover:shadow-xs transition cursor-pointer space-y-2"
          >
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono text-gray-400 font-bold">
                {sub.id}
              </span>
              {getStatusBadge(sub.status)}
            </div>

            <h4 className="font-bold text-xs text-gray-900 line-clamp-2 leading-snug">
              {sub.headline}
            </h4>

            <p className="text-[11px] text-gray-600 line-clamp-2 leading-relaxed">
              {sub.description}
            </p>

            <div className="flex items-center justify-between pt-2 border-t border-gray-100 text-[10px] text-gray-400 font-mono">
              <span>{sub.location.locality}, {sub.location.city}</span>
              <span>{sub.submittedAt}</span>
            </div>

            {/* Editor Feedback callout if present */}
            {sub.editorFeedback && (
              <div className="p-2 bg-gray-50 rounded-lg border border-gray-200 text-[11px] text-gray-700 flex items-start gap-1.5">
                <MessageSquare size={13} className="text-[#C9252D] mt-0.5 flex-shrink-0" />
                <div>
                  <span className="font-bold text-gray-900">Desk Feedback: </span>
                  <span>{sub.editorFeedback}</span>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Modal / Detail Sheet when tapping a submission */}
      {selectedSub && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4 animate-fadeIn">
          <div className="bg-white w-full max-w-lg rounded-t-2xl sm:rounded-2xl max-h-[85vh] overflow-y-auto p-4 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-gray-100">
              <div>
                <span className="text-[10px] font-mono text-gray-400 font-bold">
                  {selectedSub.id}
                </span>
                <h3 className="font-serif font-black text-base text-gray-900">
                  Submission Details
                </h3>
              </div>
              <button
                onClick={() => setSelectedSub(null)}
                className="text-xs font-bold text-gray-500 hover:text-gray-800 p-1"
              >
                Close ✕
              </button>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-gray-500">Editorial Status</span>
                {getStatusBadge(selectedSub.status)}
              </div>

              <div>
                <h4 className="font-bold text-sm text-gray-900">{selectedSub.headline}</h4>
                <p className="text-xs text-gray-700 mt-1 leading-relaxed">
                  {selectedSub.description}
                </p>
              </div>

              {selectedSub.mediaUrl && (
                <div className="rounded-lg overflow-hidden border border-gray-200">
                  <img
                    src={selectedSub.mediaUrl}
                    alt=""
                    className="w-full h-40 object-cover"
                  />
                  <div className="p-2 bg-gray-50 text-[10px] text-gray-500 font-mono">
                    Attached Geo-Evidence · Verified Timestamp
                  </div>
                </div>
              )}

              <div className="bg-gray-50 p-2.5 rounded-lg text-xs space-y-1 text-gray-600">
                <div>
                  <span className="font-bold text-gray-800">Location:</span> {selectedSub.location.locality}, {selectedSub.location.district}, {selectedSub.location.city}
                </div>
                <div>
                  <span className="font-bold text-gray-800">Submitted:</span> {selectedSub.submittedAt}
                </div>
                {selectedSub.sourceInfo && (
                  <div>
                    <span className="font-bold text-gray-800">Source:</span> {selectedSub.sourceInfo}
                  </div>
                )}
              </div>

              {selectedSub.editorFeedback && (
                <div className="p-3 bg-red-50/50 rounded-lg border border-red-200 text-xs text-red-950">
                  <span className="font-bold">TJ News Chief Editor Note: </span>
                  {selectedSub.editorFeedback}
                </div>
              )}
            </div>

            <button
              onClick={() => setSelectedSub(null)}
              className="w-full py-2 bg-gray-900 text-white font-bold text-xs rounded-lg cursor-pointer hover:bg-black"
            >
              Done
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
