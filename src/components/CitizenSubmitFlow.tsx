import React, { useState } from 'react';
import { ArrowLeft, Upload, MapPin, Calendar, Clock, AlertCircle, CheckCircle, Info } from 'lucide-react';
import type { CitizenSubmission } from '../types';
import { LOCATIONS_LIST } from '../mockData';

interface CitizenSubmitFlowProps {
  onBack: () => void;
  onSubmitSuccess: (newSubmission: CitizenSubmission) => void;
}

export const CitizenSubmitFlow: React.FC<CitizenSubmitFlowProps> = ({
  onBack,
  onSubmitSuccess
}) => {
  const [headline, setHeadline] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Civic & Infrastructure');
  const [city, setCity] = useState('Hyderabad');
  const [district, setDistrict] = useState('Hyderabad');
  const [locality, setLocality] = useState('');
  const [incidentDateTime, setIncidentDateTime] = useState('2026-10-22T12:00');
  const [sourceInfo, setSourceInfo] = useState('');
  const [mediaPreview, setMediaPreview] = useState<string>(
    'https://images.unsplash.com/photo-1541888946425-d0fbb186c5f7?w=800&auto=format&fit=crop&q=80'
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedItem, setSubmittedItem] = useState<CitizenSubmission | null>(null);

  const categories = [
    'Civic & Infrastructure',
    'Traffic & Roads',
    'Environment & Lakes',
    'Culture & Events',
    'Public Health & Sanitation',
    'Consumer Grievance'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      const newSubmission: CitizenSubmission = {
        id: `SUB-2026-${Math.floor(100 + Math.random() * 900)}`,
        headline: headline || 'Citizen Alert: Road Damage & Waterlogging Reported',
        description: description || 'Local residents reported structural cracks and drainage backlog requiring urgent civic attention.',
        category,
        location: {
          city,
          district,
          locality: locality || 'Central Area'
        },
        incidentDateTime,
        mediaUrl: mediaPreview,
        sourceInfo: sourceInfo || 'Eyewitness report and photos submitted directly by citizen contributor.',
        authorName: 'Ananya Sharma',
        authorPhone: '+91 98480 12345',
        submittedAt: '22 Oct 2026, 01:25 PM',
        status: 'pending_review'
      };

      setIsSubmitting(false);
      setSubmittedItem(newSubmission);
      onSubmitSuccess(newSubmission);
    }, 600);
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
          <h2 className="font-serif font-black text-base text-gray-900">
            Submit Citizen Report
          </h2>
        </div>
      </header>

      {/* Confirmation Screen after Submission */}
      {submittedItem ? (
        <div className="p-4 max-w-md mx-auto space-y-4 animate-fadeIn">
          <div className="bg-white p-6 rounded-2xl border border-gray-200 text-center space-y-3 shadow-xs">
            <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto border-2 border-emerald-200">
              <CheckCircle size={32} />
            </div>

            <div className="space-y-1">
              <span className="text-[10px] font-bold text-amber-700 bg-amber-100 px-2 py-0.5 rounded-full uppercase">
                Status: Pending Editorial Review
              </span>
              <h3 className="font-serif font-black text-xl text-gray-900 pt-1">
                Report Successfully Received!
              </h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Tracking Reference: <span className="font-mono font-bold text-gray-900">{submittedItem.id}</span>
              </p>
            </div>

            <div className="bg-amber-50/60 p-3 rounded-lg border border-amber-200 text-left text-xs text-amber-900 space-y-1">
              <div className="font-bold flex items-center gap-1">
                <Info size={13} /> Editorial Verification Policy:
              </div>
              <p className="text-[11px] leading-relaxed">
                To prevent misinformation, public submissions do not appear in the news feed automatically. A TJ News city beat editor is reviewing your report details and media.
              </p>
            </div>

            <div className="p-3 bg-gray-50 rounded-lg text-left text-xs space-y-1.5 border border-gray-200">
              <div className="font-bold text-gray-800 line-clamp-1">{submittedItem.headline}</div>
              <div className="text-gray-500 text-[11px]">Category: {submittedItem.category}</div>
              <div className="text-gray-500 text-[11px]">
                Location: {submittedItem.location.locality}, {submittedItem.location.city}
              </div>
            </div>

            <button
              onClick={onBack}
              className="w-full py-2.5 bg-[#C9252D] hover:bg-red-700 text-white font-bold text-xs rounded-lg shadow-md transition cursor-pointer"
            >
              View in My Contributor Dashboard →
            </button>
          </div>
        </div>
      ) : (
        /* Submission Form */
        <form onSubmit={handleSubmit} className="p-4 max-w-md mx-auto space-y-4">
          {/* Editorial notice banner */}
          <div className="bg-red-50 p-3 rounded-xl border border-red-200 flex items-start gap-2.5 text-xs text-red-900">
            <AlertCircle size={16} className="text-[#C9252D] flex-shrink-0 mt-0.5" />
            <p className="leading-snug text-[11px]">
              Every submission is independently verified by TJ News editors before publication on our mobile app & broadcast channel.
            </p>
          </div>

          <div className="space-y-3 bg-white p-4 rounded-xl border border-gray-200 text-xs shadow-2xs">
            <div>
              <label className="block font-bold text-gray-800 mb-1">
                News Headline <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={headline}
                onChange={(e) => setHeadline(e.target.value)}
                placeholder="Clear headline describing the incident"
                className="w-full p-2.5 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C9252D]/30"
              />
            </div>

            <div>
              <label className="block font-bold text-gray-800 mb-1">
                Detailed Description <span className="text-red-500">*</span>
              </label>
              <textarea
                required
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="What happened? Mention exact landmarks, affected public, time of incident..."
                className="w-full p-2.5 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C9252D]/30"
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block font-bold text-gray-800 mb-1">Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full p-2.5 bg-gray-50 border border-gray-300 rounded-lg"
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-bold text-gray-800 mb-1">City / Region</label>
                <select
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full p-2.5 bg-gray-50 border border-gray-300 rounded-lg"
                >
                  {LOCATIONS_LIST.map((loc) => (
                    <option key={loc} value={loc}>
                      {loc}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block font-bold text-gray-800 mb-1">
                Locality / Landmark
              </label>
              <input
                type="text"
                value={locality}
                onChange={(e) => setLocality(e.target.value)}
                placeholder="e.g. Near Hitec City Metro Pillar #124"
                className="w-full p-2.5 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none"
              />
            </div>

            <div>
              <label className="block font-bold text-gray-800 mb-1">
                Incident Date & Time
              </label>
              <input
                type="datetime-local"
                value={incidentDateTime}
                onChange={(e) => setIncidentDateTime(e.target.value)}
                className="w-full p-2 bg-gray-50 border border-gray-300 rounded-lg text-xs"
              />
            </div>

            {/* Media Upload Simulation */}
            <div>
              <label className="block font-bold text-gray-800 mb-1">
                Photo or Video Evidence (Demo Attached)
              </label>
              <div className="relative border-2 border-dashed border-gray-300 rounded-xl p-3 text-center bg-gray-50 flex flex-col items-center justify-center">
                {mediaPreview ? (
                  <div className="relative w-full h-32 rounded-lg overflow-hidden">
                    <img
                      src={mediaPreview}
                      alt="Upload preview"
                      className="w-full h-full object-cover"
                    />
                    <span className="absolute bottom-1 right-1 bg-black/60 text-white text-[9px] px-1.5 py-0.5 rounded">
                      Geo-tagged photo attached
                    </span>
                  </div>
                ) : (
                  <div className="py-4">
                    <Upload size={24} className="mx-auto text-gray-400 mb-1" />
                    <span className="text-gray-500 text-[11px]">Tap to attach photo or video</span>
                  </div>
                )}
              </div>
            </div>

            <div>
              <label className="block font-bold text-gray-800 mb-1">
                Source & Supporting Information
              </label>
              <input
                type="text"
                value={sourceInfo}
                onChange={(e) => setSourceInfo(e.target.value)}
                placeholder="e.g. Resident Welfare Association statement, official tweet"
                className="w-full p-2.5 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 bg-[#C9252D] hover:bg-red-700 text-white font-bold text-xs rounded-xl shadow-md transition cursor-pointer flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <span>Submitting report to Desk...</span>
            ) : (
              <span>Submit Report for Editorial Review →</span>
            )}
          </button>
        </form>
      )}
    </div>
  );
};
