import React from 'react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'light' | 'dark' | 'white';
  showTagline?: boolean;
}

export const TJNewsLogo: React.FC<LogoProps> = ({
  size = 'md',
  variant = 'dark',
  showTagline = false
}) => {
  const heightMap = {
    sm: 'h-6',
    md: 'h-8 sm:h-9',
    lg: 'h-9 sm:h-10',
    xl: 'h-14'
  };

  const currentHeight = heightMap[size];

  // For white or dark backgrounds (splash, dark CMS header), use the silver-white transparent logo.
  // For light/white surfaces (such as the app top header), use the clean dark-text transparent logo without any black capsule!
  const logoSrc = variant === 'white' ? '/tju-logo-transparent.png' : '/tju-logo-darktext.png';

  return (
    <div className="flex flex-col select-none">
      <div className="flex items-center">
        <img
          src={logoSrc}
          alt="TJU NEWS"
          className={`${currentHeight} w-auto object-contain transition-all duration-200 drop-shadow-2xs`}
        />
      </div>
      {showTagline && (
        <span className={`text-[10px] tracking-widest uppercase font-semibold mt-1 ${
          variant === 'white' ? 'text-gray-300' : 'text-[#6B7280]'
        }`}>
          Your City. Your News.
        </span>
      )}
    </div>
  );
};

export const TJAppIcon: React.FC<{ size?: number }> = ({ size = 64 }) => {
  return (
    <div
      style={{ width: size, height: size }}
      className="bg-transparent rounded-2xl flex items-center justify-center p-1 relative overflow-hidden select-none"
    >
      <img
        src="/tju-logo-transparent.png"
        alt="TJU NEWS Icon"
        className="w-full h-auto object-contain drop-shadow-md"
      />
    </div>
  );
};
