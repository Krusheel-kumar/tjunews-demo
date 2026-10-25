import React from 'react';
import { Search, Bell, Sparkles } from 'lucide-react';
import { TJNewsLogo } from './TJLogo';

interface AppHeaderProps {
  onOpenSearch: () => void;
  onOpenNotifications: () => void;
  unreadCount?: number;
  language: 'English' | 'Telugu';
  onToggleLanguage: () => void;
  onOpenAIAssistant: () => void;
  onScrollToTop?: () => void;
}

export const AppHeader: React.FC<AppHeaderProps> = ({
  onOpenSearch,
  onOpenNotifications,
  unreadCount = 2,
  language,
  onToggleLanguage,
  onOpenAIAssistant,
  onScrollToTop
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-xl border-b border-gray-150/80 px-3 sm:px-4 h-[52px] flex items-center justify-between shadow-[0_2px_10px_rgba(0,0,0,0.03)] transition-all">
      {/* Brand Identity with Live Edition Tag */}
      <div className="flex items-center gap-2 flex-shrink-0">
        <button
          onClick={() => {
            if (onScrollToTop) {
              onScrollToTop();
            } else {
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }
          }}
          className="flex items-center focus:outline-none cursor-pointer active:opacity-85 transition-opacity"
          aria-label="TJU News Home"
        >
          <TJNewsLogo size="md" variant="dark" showTagline={false} />
        </button>

        {/* Live Edition Indicator */}
        <div className="hidden min-[370px]:flex items-center gap-1.5 pl-2 border-l border-gray-200">
          <span className="relative flex h-1.5 w-1.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#C9252D]"></span>
          </span>
          <span className="text-[10px] font-black uppercase tracking-wider text-gray-500">
            Live
          </span>
        </div>
      </div>

      {/* Action Cluster: Language Switcher, AI Copilot, Search & Notifications */}
      <div className="flex items-center gap-1.5 sm:gap-2 flex-shrink-0">
        {/* Bilingual Micro-Segmented Switcher */}
        <button
          onClick={onToggleLanguage}
          aria-label={`Current language: ${language}. Tap to switch.`}
          className="h-7.5 px-1 bg-gray-100/90 hover:bg-gray-200/80 rounded-full border border-gray-200/80 flex items-center gap-0.5 text-[11px] font-bold transition-all cursor-pointer active:scale-95 shadow-2xs"
          title={language === 'English' ? 'తెలుగులోకి మార్చండి' : 'Switch to English'}
        >
          <span
            className={`px-1.5 py-0.5 rounded-full text-[10px] font-extrabold tracking-tight transition-all duration-200 ${
              language === 'English'
                ? 'bg-white text-gray-900 shadow-xs'
                : 'text-gray-400 hover:text-gray-600'
            }`}
          >
            EN
          </span>
          <span className="text-gray-300 text-[10px] font-bold select-none">•</span>
          <span
            className={`px-1.5 py-0.5 rounded-full text-[10px] font-extrabold tracking-tight transition-all duration-200 ${
              language === 'Telugu'
                ? 'bg-[#C9252D] text-white shadow-xs'
                : 'text-gray-400 hover:text-gray-600'
            }`}
          >
            తె
          </span>
        </button>

        {/* AI News Copilot Button (Flagship Jewel Capsule) */}
        <button
          onClick={onOpenAIAssistant}
          aria-label="Open TJU AI News Assistant"
          className="h-7.5 px-2.5 rounded-full bg-gradient-to-r from-[#C9252D] via-red-600 to-[#991B1B] hover:from-red-700 hover:to-rose-800 text-white transition-all cursor-pointer shadow-xs shadow-red-500/25 flex items-center gap-1 active:scale-95 group border border-red-500/20"
          title="Ask TJU AI News Copilot"
        >
          <Sparkles size={12} className="text-amber-200 group-hover:rotate-12 transition-transform duration-300" />
          <span className="text-[11px] font-black tracking-wide">AI</span>
        </button>

        {/* Search Circular Button */}
        <button
          onClick={onOpenSearch}
          aria-label="Search news, topics & jobs"
          className="w-7.5 h-7.5 rounded-full bg-gray-100/90 hover:bg-gray-200/90 border border-gray-200/70 flex items-center justify-center text-gray-700 hover:text-gray-900 transition-all cursor-pointer active:scale-95"
          title="Search news & topics"
        >
          <Search size={14} strokeWidth={2.4} />
        </button>

        {/* Notifications Circular Button with High-Contrast Badge */}
        <button
          onClick={onOpenNotifications}
          aria-label={`Notifications (${unreadCount} unread)`}
          className="w-7.5 h-7.5 rounded-full bg-gray-100/90 hover:bg-gray-200/90 border border-gray-200/70 flex items-center justify-center text-gray-700 hover:text-gray-900 relative transition-all cursor-pointer active:scale-95"
          title="Breaking alerts & notifications"
        >
          <Bell size={14} strokeWidth={2.4} />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 flex h-4 min-w-[16px] px-1 items-center justify-center rounded-full bg-[#C9252D] text-[9px] font-black text-white ring-2 ring-white shadow-xs">
              {unreadCount > 9 ? '9+' : unreadCount}
            </span>
          )}
        </button>
      </div>
    </header>
  );
};
