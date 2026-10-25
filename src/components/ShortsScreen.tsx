import React, { useState, useRef, useEffect, useCallback } from 'react';
import type { ShortVideo } from '../types';
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Search,
  X,
  ChevronUp,
  ChevronDown,
  Bookmark,
  Share2,
  MessageSquare,
  ShieldCheck,
  Flame,
  Radio,
  Check
} from 'lucide-react';
import { TJNewsLogo } from './TJLogo';

interface ShortsScreenProps {
  shorts: ShortVideo[];
  onOpenArticleById?: (articleId: string) => void;
  onShare: (title: string) => void;
  initialShortId?: string;
}

const REGIONAL_CATEGORIES = [
  'All',
  'Hyderabad',
  'Telangana',
  'Education & Jobs',
  'Civic Issues',
  'India',
  'Entertainment'
];

export const ShortsScreen: React.FC<ShortsScreenProps> = ({
  shorts,
  onOpenArticleById,
  onShare,
  initialShortId
}) => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearch, setShowSearch] = useState(false);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [progress, setProgress] = useState(0);

  // User interactions state
  const [impactedShorts, setImpactedShorts] = useState<Record<string, boolean>>({});
  const [savedShorts, setSavedShorts] = useState<Record<string, boolean>>({});
  const [copiedNotice, setCopiedNotice] = useState(false);

  // Physics & Touch Drag State for Buttery-Smooth Scrolling
  const [touchStartY, setTouchStartY] = useState<number | null>(null);
  const [touchDeltaY, setTouchDeltaY] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  // Wheel debounce lock
  const wheelLockRef = useRef(false);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  // Filter shorts based on Category and Search Query
  const filteredShorts = shorts.filter((short) => {
    const matchesCategory =
      selectedCategory === 'All' ||
      short.category.toLowerCase() === selectedCategory.toLowerCase() ||
      short.location.toLowerCase().includes(selectedCategory.toLowerCase());

    const q = searchQuery.toLowerCase().trim();
    const matchesSearch =
      !q ||
      short.headline.toLowerCase().includes(q) ||
      (short.headlineTe && short.headlineTe.toLowerCase().includes(q)) ||
      short.caption.toLowerCase().includes(q) ||
      short.category.toLowerCase().includes(q) ||
      short.location.toLowerCase().includes(q);

    return matchesCategory && matchesSearch;
  });

  // Keep index within bounds whenever filter or search query changes, or sync with initialShortId
  useEffect(() => {
    if (initialShortId) {
      const targetIndex = shorts.findIndex((s) => s.id === initialShortId);
      if (targetIndex !== -1) {
        setSelectedCategory('All');
        setSearchQuery('');
        setCurrentIndex(targetIndex);
        setProgress(0);
        setTouchDeltaY(0);
        return;
      }
    }
    setCurrentIndex(0);
    setProgress(0);
    setTouchDeltaY(0);
  }, [selectedCategory, searchQuery, initialShortId, shorts]);

  const hasResults = filteredShorts.length > 0;
  const currentShort = hasResults ? filteredShorts[currentIndex] : null;

  // Manage video playback when index or mute state changes
  useEffect(() => {
    videoRefs.current.forEach((vid, idx) => {
      if (!vid) return;
      if (idx === currentIndex) {
        vid.currentTime = 0;
        vid.muted = isMuted;
        const playPromise = vid.play();
        if (playPromise !== undefined) {
          playPromise
            .then(() => setIsPlaying(true))
            .catch(() => {
              // Browser autoplay policy might require mute
              if (!vid.muted) {
                vid.muted = true;
                setIsMuted(true);
                vid.play().catch(() => setIsPlaying(false));
              } else {
                setIsPlaying(false);
              }
            });
        }
      } else {
        vid.pause();
        vid.currentTime = 0;
      }
    });
    setProgress(0);
  }, [currentIndex, isMuted, filteredShorts.length]);

  const goToNext = useCallback(() => {
    if (currentIndex < filteredShorts.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    }
  }, [currentIndex, filteredShorts.length]);

  const goToPrev = useCallback(() => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  }, [currentIndex]);

  // Desktop Mouse Wheel & Trackpad Scrolling with smooth lock
  const handleWheel = (e: React.WheelEvent) => {
    if (wheelLockRef.current) return;
    if (Math.abs(e.deltaY) < 25) return;

    if (e.deltaY > 0 && currentIndex < filteredShorts.length - 1) {
      wheelLockRef.current = true;
      goToNext();
      setTimeout(() => {
        wheelLockRef.current = false;
      }, 420);
    } else if (e.deltaY < 0 && currentIndex > 0) {
      wheelLockRef.current = true;
      goToPrev();
      setTimeout(() => {
        wheelLockRef.current = false;
      }, 420);
    }
  };

  // Touch Swipe & Drag Handlers with Real-Time Physics
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartY(e.touches[0].clientY);
    setIsDragging(true);
    setTouchDeltaY(0);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (touchStartY === null) return;
    const currentY = e.touches[0].clientY;
    const diff = currentY - touchStartY;

    // Boundary resistance when dragging past top or bottom
    if ((currentIndex === 0 && diff > 0) || (currentIndex === filteredShorts.length - 1 && diff < 0)) {
      setTouchDeltaY(diff * 0.25);
    } else {
      setTouchDeltaY(diff);
    }
  };

  const handleTouchEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);

    if (touchDeltaY < -50 && currentIndex < filteredShorts.length - 1) {
      goToNext();
    } else if (touchDeltaY > 50 && currentIndex > 0) {
      goToPrev();
    }

    setTouchDeltaY(0);
    setTouchStartY(null);
  };

  // Keyboard Navigation (ArrowUp / ArrowDown / Space / M)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't intercept if user is typing in search bar
      if (document.activeElement?.tagName === 'INPUT') return;

      if (e.key === 'ArrowDown' || e.key === 'PageDown') {
        e.preventDefault();
        goToNext();
      } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
        e.preventDefault();
        goToPrev();
      } else if (e.key === ' ' || e.key === 'k') {
        e.preventDefault();
        togglePlayPause();
      } else if (e.key === 'm' || e.key === 'M') {
        e.preventDefault();
        setIsMuted((prev) => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [goToNext, goToPrev]);

  // Video Play/Pause Toggle
  const togglePlayPause = () => {
    const activeVid = videoRefs.current[currentIndex];
    if (!activeVid) return;

    if (isPlaying) {
      activeVid.pause();
      setIsPlaying(false);
    } else {
      activeVid
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => {});
    }
  };

  // Audio Toggle
  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsMuted((prev) => !prev);
  };

  // Impact (Like/Upvote) Toggle
  const toggleImpact = (shortId: string) => {
    setImpactedShorts((prev) => ({
      ...prev,
      [shortId]: !prev[shortId]
    }));
  };

  // Bookmark / Read Later Toggle
  const toggleSave = (shortId: string) => {
    setSavedShorts((prev) => ({
      ...prev,
      [shortId]: !prev[shortId]
    }));
  };

  // Direct WhatsApp Share
  const handleWhatsAppShare = (short: ShortVideo) => {
    const text = encodeURIComponent(
      `*${short.headline}*\n\n${short.caption}\n\n📍 ${short.location} • Verified on TJU News Mobile\nRead more on TJU News.`
    );
    window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
    onShare(short.headline);
    setCopiedNotice(true);
    setTimeout(() => setCopiedNotice(false), 2500);
  };

  // Progress Bar tracking
  const handleTimeUpdate = (e: React.SyntheticEvent<HTMLVideoElement>) => {
    const target = e.currentTarget;
    if (target.duration) {
      setProgress((target.currentTime / target.duration) * 100);
    }
  };

  return (
    <div
      className="relative w-full h-[calc(100vh-65px)] bg-[#07090E] text-white overflow-hidden select-none flex flex-col justify-between"
      onWheel={handleWheel}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* =========================================================================
          TOP BROADCAST MASTHEAD (Distinctive TJU News Branding + Filter Pills)
          ========================================================================= */}
      <div className="relative z-40 pt-2.5 pb-2 bg-gradient-to-b from-black/90 via-black/60 to-transparent flex flex-col space-y-2 pointer-events-auto">
        {/* Row 1: TJU Master Control & Audio Wave Status */}
        <div className="px-3.5 flex items-center justify-between">
          {/* TJU Brand + Live Beacon */}
          <div className="flex items-center gap-2.5">
            <TJNewsLogo size="sm" variant="white" />
            <div className="flex items-center gap-1.5 bg-gradient-to-r from-[#B91C1C] to-[#DC2626] text-white text-[10px] font-black uppercase px-2.5 py-0.5 rounded-md tracking-wider shadow-lg shadow-red-900/40 border border-red-500/40">
              <Radio size={11} className="animate-pulse text-white" />
              <span>24×7 BITES</span>
            </div>
          </div>

          {/* Quick Tools: Search + Audio Equalizer */}
          <div className="flex items-center gap-2">
            {/* Search Toggle */}
            <button
              onClick={() => setShowSearch(!showSearch)}
              className={`h-8 px-2.5 rounded-full backdrop-blur-xl border flex items-center gap-1.5 text-xs font-semibold transition-all cursor-pointer active:scale-95 ${
                showSearch || searchQuery
                  ? 'bg-[#B91C1C] text-white border-red-400 shadow-md shadow-red-900/50'
                  : 'bg-black/50 text-gray-200 border-white/20 hover:bg-black/70 hover:text-white'
              }`}
              title="Search news bites"
            >
              <Search size={13} />
              <span className="hidden sm:inline text-[11px]">Search</span>
            </button>

            {/* Audio Toggle with Animated Sound Equalizer Bars */}
            <button
              onClick={toggleMute}
              className={`h-8 px-3 rounded-full backdrop-blur-xl border flex items-center gap-2 text-xs font-semibold transition-all cursor-pointer active:scale-95 ${
                !isMuted
                  ? 'bg-emerald-600/90 text-white border-emerald-400/80 shadow-md shadow-emerald-950/50'
                  : 'bg-black/50 text-gray-300 border-white/20 hover:bg-black/70'
              }`}
              title={isMuted ? 'Turn Sound On' : 'Mute Sound'}
            >
              {!isMuted ? (
                <>
                  <div className="flex items-end gap-[2px] h-3.5">
                    <span className="w-[3px] bg-white rounded-full animate-eq-1" />
                    <span className="w-[3px] bg-white rounded-full animate-eq-2" />
                    <span className="w-[3px] bg-white rounded-full animate-eq-3" />
                    <span className="w-[3px] bg-white rounded-full animate-eq-4" />
                  </div>
                  <span className="text-[10px] font-bold tracking-tight">AUDIO ON</span>
                </>
              ) : (
                <>
                  <VolumeX size={14} className="text-gray-300" />
                  <span className="text-[10px] font-bold text-gray-300">MUTED</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Search Input Bar (Toggled Open) */}
        {showSearch && (
          <div className="px-3.5 animate-fadeIn">
            <div className="flex items-center gap-2 bg-black/85 backdrop-blur-2xl border border-red-500/30 px-3.5 py-1.5 rounded-xl shadow-2xl">
              <Search size={14} className="text-red-400 flex-shrink-0" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search regional reports, TSPSC jobs, GHMC updates..."
                className="bg-transparent text-white text-xs placeholder-gray-400 outline-none w-full font-medium"
                autoFocus
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="text-gray-400 hover:text-white p-0.5 rounded-full cursor-pointer"
                >
                  <X size={13} />
                </button>
              )}
            </div>
          </div>
        )}

        {/* Regional Desk Filter Strip */}
        <div className="px-3.5 flex items-center gap-1.5 overflow-x-auto scrollbar-none py-0.5">
          {REGIONAL_CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1 rounded-full text-[11px] font-bold whitespace-nowrap border transition-all cursor-pointer backdrop-blur-md active:scale-95 ${
                  isSelected
                    ? 'bg-[#B91C1C] text-white border-red-400 shadow-md shadow-red-950/60 ring-1 ring-red-400/30'
                    : 'bg-black/55 text-gray-300 border-white/15 hover:bg-black/75 hover:text-white'
                }`}
              >
                {cat === 'All' ? '⚡ All Regional' : cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* =========================================================================
          VERTICAL SLIDING CAROUSEL CONTAINER (Smooth Animated Slide Physics)
          ========================================================================= */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        {hasResults ? (
          <div
            className="w-full h-full"
            style={{
              transform: `translateY(calc(-${currentIndex * 100}% + ${touchDeltaY}px))`,
              transition: isDragging
                ? 'none'
                : 'transform 450ms cubic-bezier(0.16, 1, 0.3, 1)'
            }}
          >
            {filteredShorts.map((short, idx) => {
              return (
                <div
                  key={short.id}
                  className="w-full h-full relative flex-shrink-0 flex items-center justify-center overflow-hidden bg-black"
                >
                  {/* Video Player or Fallback Poster */}
                  {short.videoUrl ? (
                    <video
                      ref={(el) => {
                        videoRefs.current[idx] = el;
                      }}
                      src={short.videoUrl}
                      poster={short.thumbnailUrl}
                      playsInline
                      muted={isMuted}
                      loop
                      onTimeUpdate={idx === currentIndex ? handleTimeUpdate : undefined}
                      onPlay={() => idx === currentIndex && setIsPlaying(true)}
                      onPause={() => idx === currentIndex && setIsPlaying(false)}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div
                      className="w-full h-full bg-cover bg-center transition-all duration-700"
                      style={{ backgroundImage: `url(${short.thumbnailUrl})` }}
                    />
                  )}

                  {/* Multi-Layer Cinematic Editorial Vignette (Ensures Complete Text Contrast) */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#07090E] via-[#07090E]/40 via-45% to-black/70 pointer-events-none" />

                  {/* Top Bureau Verified Ribbon on each card */}
                  <div className="absolute top-28 left-3.5 right-14 z-20 flex items-center gap-2 pointer-events-none">
                    <div className="inline-flex items-center gap-1.5 bg-black/60 backdrop-blur-md border border-white/20 px-2.5 py-1 rounded-full shadow-lg">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 ring-2 ring-emerald-500/30" />
                      <span className="text-[10px] font-black tracking-wide uppercase text-white/95">
                        TJU {short.location} Desk
                      </span>
                    </div>

                    <div className="inline-flex items-center gap-1 bg-emerald-950/70 backdrop-blur-md border border-emerald-500/40 text-emerald-300 px-2 py-0.5 rounded-full text-[9px] font-bold shadow-sm">
                      <ShieldCheck size={11} className="text-emerald-400" />
                      <span>FACT-CHECKED</span>
                    </div>
                  </div>

                  {/* Center Play/Pause Ripple Overlay on Tap */}
                  <div
                    className="absolute inset-0 z-10 flex items-center justify-center cursor-pointer"
                    onClick={togglePlayPause}
                  >
                    {!isPlaying && idx === currentIndex && (
                      <div className="w-16 h-16 rounded-2xl bg-black/70 backdrop-blur-xl flex items-center justify-center text-white border border-white/30 shadow-2xl animate-scaleUp pointer-events-none">
                        <Play size={28} className="translate-x-0.5 fill-current text-white" />
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          /* Empty Search Fallback */
          <div className="w-full h-full bg-[#0D1017] flex items-center justify-center p-6 text-center">
            <div className="bg-[#151A24]/90 backdrop-blur-2xl p-7 rounded-3xl border border-white/10 max-w-xs space-y-4 shadow-2xl">
              <div className="w-12 h-12 rounded-2xl bg-red-600/10 border border-red-500/30 flex items-center justify-center mx-auto text-red-400">
                <Search size={22} />
              </div>
              <h3 className="font-serif font-black text-base text-white">No News Bites Found</h3>
              <p className="text-xs text-gray-300 leading-relaxed">
                No verified video reports match &ldquo;{searchQuery || selectedCategory}&rdquo;.
              </p>
              <button
                onClick={() => {
                  setSelectedCategory('All');
                  setSearchQuery('');
                  setShowSearch(false);
                }}
                className="bg-[#B91C1C] hover:bg-red-700 text-white px-5 py-2.5 rounded-xl text-xs font-bold transition shadow-lg shadow-red-950/50 cursor-pointer active:scale-95"
              >
                Reset to All Shorts
              </button>
            </div>
          </div>
        )}
      </div>

      {/* =========================================================================
          RIGHT EDITORIAL INTERACTION RAIL (Signature TJU News Design)
          ========================================================================= */}
      {currentShort && (
        <div className="absolute right-2.5 bottom-8 z-30 flex flex-col items-center space-y-3.5 select-none pointer-events-auto">
          {/* Vertical Stepper & Quick Up/Down Controls */}
          <div className="flex flex-col items-center bg-black/65 backdrop-blur-xl border border-white/20 rounded-2xl p-1 shadow-2xl">
            <button
              onClick={goToPrev}
              disabled={currentIndex === 0}
              className={`p-1.5 rounded-xl transition cursor-pointer ${
                currentIndex === 0
                  ? 'text-gray-600 cursor-not-allowed'
                  : 'text-white hover:bg-white/20 active:scale-90'
              }`}
              title="Previous News Bite"
            >
              <ChevronUp size={16} />
            </button>
            <div className="px-1 py-1 font-mono text-[10px] font-bold text-gray-300 tracking-tighter text-center">
              <span className="text-white font-black">{String(currentIndex + 1).padStart(2, '0')}</span>
              <span className="text-white/40 block text-[8px]">of</span>
              <span className="text-gray-400">{String(filteredShorts.length).padStart(2, '0')}</span>
            </div>
            <button
              onClick={goToNext}
              disabled={currentIndex === filteredShorts.length - 1}
              className={`p-1.5 rounded-xl transition cursor-pointer ${
                currentIndex === filteredShorts.length - 1
                  ? 'text-gray-600 cursor-not-allowed'
                  : 'text-white hover:bg-white/20 active:scale-90'
              }`}
              title="Next News Bite"
            >
              <ChevronDown size={16} />
            </button>
          </div>

          {/* Regional WhatsApp Share Pill (High Value for Telangana Readers) */}
          <button
            onClick={() => handleWhatsAppShare(currentShort)}
            className="flex flex-col items-center group cursor-pointer active:scale-90 transition-transform"
            title="Share verified news card on WhatsApp"
          >
            <div className="w-10 h-10 rounded-2xl bg-emerald-600/90 hover:bg-emerald-500 border border-emerald-400/60 shadow-lg shadow-emerald-950/60 flex items-center justify-center text-white transition-all">
              <Share2 size={17} />
            </div>
            <span className="text-[10px] font-bold text-emerald-400 drop-shadow mt-1 tracking-tight">
              WhatsApp
            </span>
          </button>

          {/* Public Impact / Civic Importance Rating */}
          <button
            onClick={() => toggleImpact(currentShort.id)}
            className="flex flex-col items-center group cursor-pointer active:scale-90 transition-transform"
            title="Mark as Important Public News"
          >
            <div
              className={`w-10 h-10 rounded-2xl backdrop-blur-xl border flex items-center justify-center transition-all ${
                impactedShorts[currentShort.id]
                  ? 'bg-amber-500 text-black border-amber-300 shadow-lg shadow-amber-950/60 scale-105'
                  : 'bg-black/60 text-white border-white/20 hover:bg-black/80'
              }`}
            >
              <Flame size={18} className={impactedShorts[currentShort.id] ? 'fill-black' : ''} />
            </div>
            <span className="text-[10px] font-mono font-bold text-gray-200 drop-shadow mt-1">
              {impactedShorts[currentShort.id]
                ? (currentShort.likes + 1).toLocaleString()
                : currentShort.likes.toLocaleString()}
            </span>
          </button>

          {/* Citizen Perspectives & Discussions */}
          <div
            onClick={() => onShare(currentShort.headline)}
            className="flex flex-col items-center cursor-pointer active:scale-90 transition-transform"
            title="Reader Discussions"
          >
            <div className="w-10 h-10 rounded-2xl bg-black/60 backdrop-blur-xl border border-white/20 flex items-center justify-center text-white hover:bg-black/80 transition-all">
              <MessageSquare size={17} />
            </div>
            <span className="text-[10px] font-mono font-bold text-gray-200 drop-shadow mt-1">
              {currentShort.comments}
            </span>
          </div>

          {/* Save to Read Later (Bookmark) */}
          <button
            onClick={() => toggleSave(currentShort.id)}
            className="flex flex-col items-center group cursor-pointer active:scale-90 transition-transform"
            title="Save to Read Later"
          >
            <div
              className={`w-10 h-10 rounded-2xl backdrop-blur-xl border flex items-center justify-center transition-all ${
                savedShorts[currentShort.id]
                  ? 'bg-[#B91C1C] text-white border-red-400 shadow-lg shadow-red-950/60'
                  : 'bg-black/60 text-white border-white/20 hover:bg-black/80'
              }`}
            >
              <Bookmark size={17} className={savedShorts[currentShort.id] ? 'fill-white' : ''} />
            </div>
            <span className="text-[9px] font-bold text-gray-300 drop-shadow mt-1">
              {savedShorts[currentShort.id] ? 'Saved' : 'Save'}
            </span>
          </button>
        </div>
      )}


      {/* Copied to Clipboard / WhatsApp Notice Toast */}
      {copiedNotice && (
        <div className="absolute top-16 left-1/2 -translate-x-1/2 z-50 bg-emerald-600 text-white px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 shadow-2xl border border-emerald-400 animate-fadeIn pointer-events-none">
          <Check size={14} />
          <span>Opening WhatsApp news card...</span>
        </div>
      )}

      {/* Broadcast Live Video Progress Bar */}
      <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-white/15 z-40">
        <div
          className="h-full bg-gradient-to-r from-red-600 via-red-500 to-amber-400 transition-all duration-100 ease-linear shadow-[0_0_8px_rgba(239,68,68,0.9)]"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
};
