import React, { useEffect, useState } from 'react';

interface SplashScreenProps {
  onFinish: () => void;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ onFinish }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Paced over ~4.2 seconds to allow full presentation inspection
    const timer = setInterval(() => {
      setProgress((prev) => {
        const next = prev + 1;
        if (next >= 100) {
          clearInterval(timer);
          setTimeout(onFinish, 600);
          return 100;
        }
        return next;
      });
    }, 42);

    return () => clearInterval(timer);
  }, [onFinish]);

  // Ending spark triggers when loading nears completion (progress >= 70)
  const isEndingPhase = progress >= 70;

  return (
    <div className="absolute inset-0 w-full h-full bg-gradient-to-b from-[#D91B24] via-[#C9252D] to-[#99131A] text-white flex flex-col items-center justify-between p-6 select-none overflow-hidden animate-fadeIn z-50">
      {/* Dynamic Background Lighting Effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[540px] h-[540px] bg-white/10 rounded-full blur-[120px] pointer-events-none animate-pulseGlow" />
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-red-400/25 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-black/40 rounded-full blur-3xl pointer-events-none" />

      {/* Top spacer for clean vertical balance */}
      <div className="pt-6" />

      {/* Centerpiece: Cinematic Logo & Refined Editorial Slogans */}
      <div className="flex flex-col items-center text-center z-10 w-full max-w-sm px-4">
        {/* Rock-solid logo container (no bobbing or shaking) */}
        <div className="relative w-full flex items-center justify-center animate-logoReveal">
          <div className="relative w-full max-w-[320px] flex items-center justify-center">
            {/* Soft ambient back-glow behind transparent globe and lettering */}
            <div className="absolute inset-0 bg-white/20 blur-3xl rounded-full scale-90 pointer-events-none" />

            {/* Transparent HD Logo */}
            <img
              src="/tju-logo-transparent.png"
              alt="TJU NEWS"
              className="relative z-10 w-full h-auto object-contain drop-shadow-[0_15px_35px_rgba(0,0,0,0.5)]"
            />

            {/* Dynamic Glint Sweep across logo during ending phase */}
            {isEndingPhase && (
              <div className="absolute inset-0 overflow-hidden pointer-events-none z-20">
                <div className="w-20 h-full bg-gradient-to-r from-transparent via-white/70 to-transparent animate-glintSweep" />
              </div>
            )}

            {/* Delicate Diamond Sparkle Positioned Directly on the Corner of the 'S' in NEWS */}
            {isEndingPhase && (
              <div
                className="absolute z-30 pointer-events-none -translate-x-1/2 -translate-y-1/2"
                style={{ left: '95.6%', top: '28.9%' }}
              >
                <div className="relative flex items-center justify-center animate-sparkleGlint">
                  {/* Subtle luminous point glow behind the spark */}
                  <div className="absolute inset-0 w-3 h-3 bg-white blur-[2px] rounded-full opacity-90 scale-110" />

                  {/* Sharp, elegant small 4-point diamond sparkle */}
                  <svg
                    className="w-4 h-4 text-white drop-shadow-[0_0_8px_rgba(255,255,255,1)]"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    {/* Primary 4-point needle star */}
                    <path d="M12 0L13.6 10.4L24 12L13.6 13.6L12 24L10.4 13.6L0 12L10.4 10.4L12 0Z" />
                    {/* Diagonal secondary micro-rays */}
                    <path
                      d="M12 4L13 11L20 12L13 13L12 20L11 13L4 12L11 11L12 4Z"
                      opacity="0.5"
                      transform="rotate(45 12 12)"
                    />
                    {/* Central bright spark core */}
                    <circle cx="12" cy="12" r="1.5" fill="#FFFFFF" />
                  </svg>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Telugu & English Slogans with Refined Editorial Structure */}
        <div className="mt-5 animate-sloganReveal w-full flex flex-col items-center">
          {/* Primary Telugu Slogan */}
          <div className="text-xl sm:text-2xl font-black text-white tracking-wide drop-shadow-[0_2px_10px_rgba(0,0,0,0.6)] font-serif">
            నిజం కోసం… ప్రజల కోసం!
          </div>

          {/* Delicate Editorial Hairline Accent */}
          <div className="w-12 h-[1.5px] bg-gradient-to-r from-transparent via-white/50 to-transparent my-2" />

          {/* Authentic English Slogan (No clunky pill box, pure typography) */}
          <p className="text-xs sm:text-[13px] font-semibold tracking-[0.24em] text-white/90 uppercase font-sans drop-shadow-sm">
            For truth… for the people!
          </p>
        </div>
      </div>

      {/* Bottom Loading Animation: Pure Modern Circular Spinner (No skip or text) */}
      <div className="pb-10 flex flex-col items-center z-10">
        <div className="relative w-8 h-8 flex items-center justify-center">
          {/* Faint subtle outer track */}
          <div className="w-8 h-8 rounded-full border-2 border-white/20" />
          {/* Luminous glowing arc spinner */}
          <div className="absolute inset-0 w-8 h-8 rounded-full border-2 border-transparent border-t-white border-r-white/80 animate-spin shadow-[0_0_12px_rgba(255,255,255,0.7)]" />
        </div>
      </div>
    </div>
  );
};

