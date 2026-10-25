import React, { useState } from 'react';
import type { Article } from '../types';
import {
  ArrowLeft,
  Share2,
  Bookmark,
  Clock,
  MapPin,
  Volume2,
  VolumeX,
  ThumbsUp,
  MessageSquare,
  Flame,
  CheckCircle2,
  Sparkles,
  Bot,
  ExternalLink,
  ShieldCheck,
  Check
} from 'lucide-react';

interface ArticleDetailScreenProps {
  article: Article;
  onBack: () => void;
  isBookmarked: boolean;
  onToggleBookmark: () => void;
  onShare: () => void;
  onSelectRelated: (article: Article) => void;
  allArticles: Article[];
  language: 'English' | 'Telugu';
  onOpenAIAssistant?: () => void;
}

export const ArticleDetailScreen: React.FC<ArticleDetailScreenProps> = ({
  article,
  onBack,
  isBookmarked,
  onToggleBookmark,
  onShare,
  onSelectRelated,
  allArticles,
  language,
  onOpenAIAssistant
}) => {
  const [likes, setLikes] = useState(142);
  const [hasLiked, setHasLiked] = useState(false);
  const [fontSize, setFontSize] = useState<'normal' | 'large' | 'xlarge'>('normal');
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  const relatedArticles = allArticles
    .filter((a) => a.id !== article.id && a.category === article.category)
    .slice(0, 3);

  const handleLike = () => {
    if (!hasLiked) {
      setLikes((prev) => prev + 1);
      setHasLiked(true);
    } else {
      setLikes((prev) => prev - 1);
      setHasLiked(false);
    }
  };

  const toggleSpeech = () => {
    if (!('speechSynthesis' in window)) {
      alert('Speech synthesis audio is not supported in this browser.');
      return;
    }

    if (isPlayingAudio) {
      window.speechSynthesis.cancel();
      setIsPlayingAudio(false);
    } else {
      const titleToRead = language === 'Telugu' && article.titleTe ? article.titleTe : article.title;
      const bodyToRead = (language === 'Telugu' && article.contentTe ? article.contentTe : article.content).join(' ');
      const utterance = new SpeechSynthesisUtterance(`${titleToRead}. ${bodyToRead}`);
      utterance.rate = 0.95;
      utterance.onend = () => setIsPlayingAudio(false);
      utterance.onerror = () => setIsPlayingAudio(false);
      window.speechSynthesis.speak(utterance);
      setIsPlayingAudio(true);
    }
  };

  const getFontSizeClass = () => {
    switch (fontSize) {
      case 'xlarge':
        return 'text-lg leading-loose';
      case 'large':
        return 'text-base leading-relaxed';
      default:
        return 'text-[15px] leading-relaxed';
    }
  };

  const displayTitle = language === 'Telugu' && article.titleTe ? article.titleTe : article.title;
  const displaySummary = language === 'Telugu' && article.summaryTe ? article.summaryTe : article.summary;
  const displayContent = language === 'Telugu' && article.contentTe ? article.contentTe : article.content;

  return (
    <div className="bg-white min-h-screen pb-24 animate-fadeIn">
      {/* Sticky Top Header with Back, Audio, Font Size & Share */}
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-xl border-b border-gray-150/80 px-3.5 py-2.5 flex items-center justify-between shadow-2xs">
        <button
          onClick={() => {
            if (isPlayingAudio && 'speechSynthesis' in window) window.speechSynthesis.cancel();
            onBack();
          }}
          aria-label="Back"
          className="p-1.5 rounded-full hover:bg-gray-100 text-gray-700 transition cursor-pointer active:scale-95"
        >
          <ArrowLeft size={20} />
        </button>

        <div className="flex items-center gap-1.5">
          {/* Audio Listen Button with Equalizer Waveform */}
          <button
            onClick={toggleSpeech}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold transition-all cursor-pointer active:scale-95 shadow-2xs ${
              isPlayingAudio
                ? 'bg-[#C9252D] text-white shadow-[0_0_12px_rgba(201,37,45,0.4)]'
                : 'bg-gray-100/90 text-gray-800 hover:bg-gray-200/90 border border-gray-200/60'
            }`}
            title="Listen to story with Text-to-Speech"
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
            <span>{isPlayingAudio ? 'Listening' : 'Listen'}</span>
          </button>

          {/* Text Size Cycler */}
          <button
            onClick={() => {
              if (fontSize === 'normal') setFontSize('large');
              else if (fontSize === 'large') setFontSize('xlarge');
              else setFontSize('normal');
            }}
            className="px-2 py-1 text-xs font-serif font-black text-gray-800 bg-gray-100 hover:bg-gray-200 rounded-lg transition active:scale-95 border border-gray-200/50"
            title="Adjust text size (Normal / Large / Extra Large)"
          >
            {fontSize === 'normal' ? 'A' : fontSize === 'large' ? 'A+' : 'A++'}
          </button>

          <button
            onClick={onToggleBookmark}
            className="p-1.5 rounded-full hover:bg-gray-100 text-gray-700 transition cursor-pointer active:scale-95"
          >
            <Bookmark
              size={18}
              className={isBookmarked ? 'fill-[#C9252D] text-[#C9252D]' : ''}
            />
          </button>

          <button
            onClick={onShare}
            className="p-1.5 rounded-full hover:bg-gray-100 text-gray-700 transition cursor-pointer active:scale-95"
          >
            <Share2 size={18} />
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="px-4 pt-3">
        {/* Feature Media (Image / Video) - Placed FIRST at top as requested */}
        <figure className="mb-4 rounded-2xl overflow-hidden bg-gray-100 shadow-sm border border-gray-150">
          {article.videoUrl ? (
            <video
              src={article.videoUrl}
              poster={article.imageUrl}
              controls
              playsInline
              className="w-full h-auto object-cover max-h-[320px]"
            />
          ) : (
            <img
              src={article.imageUrl}
              alt={article.title}
              className="w-full h-auto object-cover max-h-[320px]"
            />
          )}
          <figcaption className="px-3 py-1.5 text-[11px] text-gray-500 bg-gray-50 border-t border-gray-100 flex items-center justify-between">
            <span>TJU News Visual Desk · Hyderabad Bureau Archive Photo</span>
            <span className="font-mono text-[10px] text-gray-400">HD Verified</span>
          </figcaption>
        </figure>

        {/* Category & Breaking Pill */}
        <div className="flex items-center gap-2 mb-2">
          {article.isBreaking && (
            <span className="flex items-center gap-1 bg-[#C9252D] text-white text-[10px] font-black uppercase px-2 py-0.5 rounded-xs animate-pulse">
              <Flame size={11} className="fill-current" />
              BREAKING
            </span>
          )}
          <span className="text-xs font-bold text-[#C9252D] uppercase tracking-wider">
            {article.category}
          </span>
          {article.location && (
            <span className="flex items-center gap-0.5 text-[11px] text-gray-500 font-medium">
              <MapPin size={11} /> {article.location}
            </span>
          )}
        </div>

        {/* Editorial Headline */}
        <h1 className="font-serif font-black text-2xl text-gray-900 leading-tight tracking-tight mb-3">
          {displayTitle}
        </h1>

        {/* Author Bylines & Exact Timestamps */}
        <div className="py-2.5 border-y border-gray-100 flex items-center justify-between text-xs text-gray-500 mb-3">
          <div>
            <div className="font-bold text-gray-900">{article.author}</div>
            <div className="flex items-center gap-2 mt-0.5 text-[11px]">
              <span className="flex items-center gap-1 text-gray-600 font-mono">
                <Clock size={11} /> Published {article.publishedAt}
              </span>
            </div>
            {article.updatedAt && (
              <div className="text-[11px] text-red-600 font-mono font-medium mt-0.5">
                ● Updated {article.updatedAt}
              </div>
            )}
          </div>
          <span className="bg-gray-100 px-2 py-1 rounded-sm text-[11px] font-mono">
            {article.readTime}
          </span>
        </div>

        {/* Lead Summary */}
        <p className="text-sm font-medium text-gray-800 leading-relaxed bg-red-50/40 p-3.5 rounded-xl border-l-4 border-[#C9252D] mb-4">
          {displaySummary}
        </p>

        {/* AI News Intelligence Desk (Positioned in the optimal place right before the detailed story) */}
        {onOpenAIAssistant && (
          <div
            onClick={onOpenAIAssistant}
            className="mb-5 p-3 rounded-2xl bg-gradient-to-r from-amber-50 via-rose-50/60 to-red-50 border border-amber-200/90 shadow-2xs flex items-center justify-between cursor-pointer hover:shadow-md transition active:scale-[0.99] group"
          >
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-amber-500 to-rose-600 flex items-center justify-center text-white shadow-xs flex-shrink-0 group-hover:scale-105 transition-transform">
                <Bot size={17} />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-[11px] font-black uppercase tracking-wider text-rose-950">
                    TJU AI News Intelligence
                  </span>
                  <span className="bg-amber-100 text-amber-900 text-[9px] font-black px-1.5 py-0.2 rounded-full">
                    SMART DESK
                  </span>
                </div>
                <p className="text-xs font-semibold text-gray-700 mt-0.5">
                  Ask AI to summarize key takeaways, verify facts, or explain context
                </p>
              </div>
            </div>
            <span className="text-xs text-[#C9252D] font-black group-hover:translate-x-0.5 transition-transform flex-shrink-0 pl-2">
              Ask AI →
            </span>
          </div>
        )}

        {/* Article Update Timeline (for stories receiving important updates) */}
        {article.updates && article.updates.length > 0 && (
          <div className="my-5 p-3.5 bg-red-50/60 rounded-xl border border-red-200">
            <div className="flex items-center gap-1.5 text-xs font-bold text-[#C9252D] uppercase tracking-wider mb-2.5">
              <Clock size={14} />
              <span>Story Updates Timeline</span>
            </div>
            <div className="space-y-3 relative before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-red-200">
              {article.updates.map((upd, idx) => (
                <div key={idx} className="relative pl-6">
                  <span className="absolute left-1.5 top-1.5 w-1.5 h-1.5 bg-[#C9252D] rounded-full -translate-x-1/2 ring-4 ring-white" />
                  <span className="text-[11px] font-bold text-gray-800 font-mono">
                    {upd.time}
                  </span>
                  <p className="text-xs text-gray-700 leading-snug mt-0.5">
                    {upd.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Full Article Paragraphs */}
        <div className={`space-y-4 text-gray-800 font-sans ${getFontSizeClass()}`}>
          {displayContent.map((paragraph, index) => (
            <p key={index} className="leading-relaxed">
              {paragraph}
            </p>
          ))}
        </div>

        {/* Reader Feedback & WhatsApp Sharing Bar */}
        <div className="my-6 p-3 rounded-2xl bg-gray-50 border border-gray-150 flex items-center justify-around gap-2">
          <button
            onClick={handleLike}
            className={`flex items-center gap-1.5 text-xs font-bold px-3.5 py-2 rounded-full border transition-all cursor-pointer active:scale-95 shadow-2xs ${
              hasLiked
                ? 'bg-red-50 text-[#C9252D] border-red-200 shadow-xs'
                : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-100'
            }`}
          >
            <ThumbsUp size={14} className={hasLiked ? 'fill-current text-[#C9252D]' : 'text-gray-500'} />
            <span>{likes} Helpful</span>
          </button>

          <button
            onClick={onShare}
            className="flex items-center gap-1.5 text-xs font-bold px-3.5 py-2 rounded-full border transition-all cursor-pointer active:scale-95 bg-emerald-50 text-emerald-800 border-emerald-300 hover:bg-emerald-100 shadow-2xs"
            title="Share story directly to WhatsApp"
          >
            <Share2 size={14} className="text-emerald-600" />
            <span>Share to WhatsApp</span>
          </button>
        </div>

        {/* Related Articles Section */}
        {relatedArticles.length > 0 && (
          <div className="mt-8 pt-4 border-t border-gray-200">
            <h3 className="font-serif font-black text-base text-gray-900 mb-3">
              More in {article.category}
            </h3>
            <div className="space-y-3">
              {relatedArticles.map((rel) => (
                <div
                  key={rel.id}
                  onClick={() => onSelectRelated(rel)}
                  className="flex gap-3 items-center p-2 rounded-lg hover:bg-gray-50 transition cursor-pointer border border-gray-100"
                >
                  <img
                    src={rel.imageUrl}
                    alt=""
                    className="w-16 h-16 rounded-md object-cover flex-shrink-0"
                  />
                  <div>
                    <span className="text-[10px] text-gray-400 font-mono">
                      {rel.publishedAt}
                    </span>
                    <h4 className="text-xs font-bold text-gray-900 line-clamp-2 leading-snug">
                      {language === 'Telugu' && rel.titleTe ? rel.titleTe : rel.title}
                    </h4>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
