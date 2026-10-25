import React, { useState } from 'react';
import type { DailyBriefingItem } from '../types';
import { Sparkles, Volume2, ChevronRight, Share2, VolumeX, Check } from 'lucide-react';

interface DailyBriefingCardProps {
  briefing: DailyBriefingItem[];
  language: 'English' | 'Telugu';
  onSelectArticleById?: (artId: string) => void;
  onShare: (text: string) => void;
}

export const DailyBriefingCard: React.FC<DailyBriefingCardProps> = ({
  briefing,
  language,
  onSelectArticleById,
  onShare
}) => {
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [activeStoryIndex, setActiveStoryIndex] = useState(0);

  if (!briefing || briefing.length === 0) return null;

  const active = briefing[activeStoryIndex] || briefing[0];

  const toggleSpeech = () => {
    if (!('speechSynthesis' in window)) {
      alert('Text-to-speech audio playback is not supported on this browser.');
      return;
    }

    if (isPlayingAudio) {
      window.speechSynthesis.cancel();
      setIsPlayingAudio(false);
    } else {
      const textToRead =
        language === 'Telugu'
          ? `${active.headlineTe || active.headline}. ${active.summaryTe || active.summary}`
          : `${active.headline}. ${active.summary}`;
      const utterance = new SpeechSynthesisUtterance(textToRead);
      utterance.rate = 0.95;
      utterance.onend = () => setIsPlayingAudio(false);
      utterance.onerror = () => setIsPlayingAudio(false);
      window.speechSynthesis.speak(utterance);
      setIsPlayingAudio(true);
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-150/80 p-4 shadow-[0_4px_20px_rgba(0,0,0,0.03)] space-y-3.5 relative overflow-hidden">
      {/* Decorative Brand Top Border */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#C9252D] via-red-500 to-amber-500" />

      {/* Header with Audio Listen action */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="p-1.5 rounded-xl bg-red-50 text-[#C9252D] border border-red-150">
            <Sparkles size={16} />
          </span>
          <div>
            <h3 className="font-serif font-black text-sm text-gray-900 leading-tight tracking-tight">
              {language === 'Telugu' ? 'నేటి 5 ప్రధాన వార్తలు' : 'TJU Daily 5 Briefing'}
            </h3>
            <span className="text-[10px] text-gray-400 font-mono">
              Curated Morning Brief • 60 Sec Audio
            </span>
          </div>
        </div>

        <button
          onClick={toggleSpeech}
          className={`flex items-center gap-1.5 text-[11px] font-bold px-3 py-1.5 rounded-full transition-all cursor-pointer shadow-xs active:scale-95 ${
            isPlayingAudio
              ? 'bg-[#C9252D] text-white shadow-[0_0_12px_rgba(201,37,45,0.4)]'
              : 'bg-gray-100/90 text-gray-800 hover:bg-gray-200/90 border border-gray-200/60'
          }`}
          title="Listen to story summary using text-to-speech"
        >
          {isPlayingAudio ? (
            <div className="flex items-center gap-0.5 h-3">
              <span className="w-0.5 bg-white rounded-full animate-eq-1" />
              <span className="w-0.5 bg-white rounded-full animate-eq-2" />
              <span className="w-0.5 bg-white rounded-full animate-eq-3" />
              <span className="w-0.5 bg-white rounded-full animate-eq-4" />
            </div>
          ) : (
            <Volume2 size={13} strokeWidth={2.5} />
          )}
          <span>{isPlayingAudio ? 'Listening...' : 'Listen'}</span>
        </button>
      </div>

      {/* Story Pager Pills */}
      <div className="flex gap-1.5 overflow-x-auto scrollbar-none py-0.5">
        {briefing.map((item, idx) => (
          <button
            key={item.id}
            onClick={() => {
              setActiveStoryIndex(idx);
              if (isPlayingAudio) {
                window.speechSynthesis.cancel();
                setIsPlayingAudio(false);
              }
            }}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap active:scale-95 ${
              activeStoryIndex === idx
                ? 'bg-gradient-to-r from-[#C9252D] to-[#B31D24] text-white shadow-[0_2px_8px_rgba(201,37,45,0.25)]'
                : 'bg-gray-50 text-gray-600 border border-gray-150/70 hover:bg-gray-100'
            }`}
          >
            <span
              className={`w-4 h-4 rounded-full text-[10px] font-black flex items-center justify-center ${
                activeStoryIndex === idx
                  ? 'bg-white/20 text-white'
                  : 'bg-white text-gray-700 shadow-2xs'
              }`}
            >
              {item.rank}
            </span>
            <span className="text-[11px]">{item.category}</span>
          </button>
        ))}
      </div>

      {/* Active Story Card */}
      {active && (
        <div className="bg-gradient-to-br from-gray-50/90 to-red-50/20 p-4 rounded-xl border border-gray-150/80 space-y-2.5 animate-fadeIn">
          <div className="flex items-center justify-between text-[10px] text-gray-400 font-mono">
            <span className="font-extrabold text-[#C9252D] uppercase tracking-wider">
              Story {activeStoryIndex + 1} of {briefing.length}
            </span>
            <span className="bg-white px-2 py-0.5 rounded-full border border-gray-200 text-gray-600 font-bold">
              ✓ Verified Desk
            </span>
          </div>

          <h4 className="font-serif font-bold text-sm sm:text-base text-gray-900 leading-snug">
            {language === 'Telugu' ? active.headlineTe || active.headline : active.headline}
          </h4>

          <p className="text-xs text-gray-600 leading-relaxed font-sans">
            {language === 'Telugu' ? active.summaryTe || active.summary : active.summary}
          </p>

          <div className="flex items-center justify-between pt-2 border-t border-gray-200/70 text-xs">
            {active.relatedArticleId && onSelectArticleById ? (
              <button
                onClick={() => onSelectArticleById(active.relatedArticleId!)}
                className="text-[11px] font-extrabold text-[#C9252D] hover:underline flex items-center gap-1 cursor-pointer group"
              >
                <span>Read Full Coverage</span>
                <ChevronRight size={13} className="group-hover:translate-x-0.5 transition-transform" />
              </button>
            ) : <div />}

            <button
              onClick={() =>
                onShare(language === 'Telugu' ? active.headlineTe || active.headline : active.headline)
              }
              className="p-1.5 rounded-full text-gray-400 hover:text-gray-700 hover:bg-white transition-all shadow-2xs"
              title="Share briefing"
            >
              <Share2 size={13} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
