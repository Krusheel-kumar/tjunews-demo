import React from 'react';
import { Home, Zap, PlaySquare, Headphones, User } from 'lucide-react';

export type TabType = 'home' | 'quick' | 'explore' | 'shorts' | 'audio' | 'live' | 'profile';

interface BottomNavProps {
  currentTab: TabType;
  onTabChange: (tab: TabType) => void;
  unreadCount?: number;
  language?: 'English' | 'Telugu';
}

export const BottomNavigation: React.FC<BottomNavProps> = ({
  currentTab,
  onTabChange,
  unreadCount = 0,
  language = 'English'
}) => {
  const tabs = [
    { id: 'home', label: language === 'Telugu' ? 'హోమ్' : 'Home', icon: Home },
    { id: 'quick', label: language === 'Telugu' ? 'క్విక్ న్యూస్' : 'Quick News', icon: Zap },
    { id: 'shorts', label: language === 'Telugu' ? 'షార్ట్స్' : 'Shorts', icon: PlaySquare },
    { id: 'audio', label: language === 'Telugu' ? 'ఆడియో' : 'Audio News', icon: Headphones, isLive: true },
    { id: 'profile', label: language === 'Telugu' ? 'ప్రొఫైల్' : 'Profile', icon: User }
  ];

  return (
    <nav
      className="w-full flex-shrink-0 relative z-50 select-none bg-white border-t border-gray-200"
      style={{
        boxShadow: '0 -4px 16px rgba(0, 0, 0, 0.06)',
        paddingBottom: 'max(6px, env(safe-area-inset-bottom, 6px))'
      }}
    >
      <div className="flex items-center justify-around px-1 pt-1.5 pb-0.5">
        {tabs.map((tab) => {
          const IconComponent = tab.icon;
          const isActive = currentTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id as TabType)}
              className="flex-1 flex flex-col items-center justify-center py-0.5 cursor-pointer transition-transform active:scale-95 group relative"
            >
              {/* Active Top Accent Line */}
              {isActive && (
                <div
                  className="absolute -top-1.5 w-7 h-[2.5px] rounded-full"
                  style={{ backgroundColor: '#C9252D' }}
                />
              )}

              {/* Icon Container */}
              <div className="relative flex items-center justify-center">
                <div
                  className={`p-1 rounded-xl transition-all duration-150 ${
                    isActive ? 'scale-105' : 'group-hover:bg-gray-100'
                  }`}
                  style={{
                    backgroundColor: isActive ? '#FEE2E2' : 'transparent',
                    color: isActive ? '#C9252D' : '#1F2937'
                  }}
                >
                  <IconComponent
                    size={20}
                    strokeWidth={isActive ? 2.6 : 2.2}
                  />
                </div>

                {/* Live TV Pulsing Red Beacon */}
                {tab.isLive && (
                  <span className="absolute -top-0.5 -right-0.5 flex h-2 w-2">
                    <span
                      className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
                      style={{ backgroundColor: '#EF4444' }}
                    />
                    <span
                      className="relative inline-flex rounded-full h-2 w-2 border border-white"
                      style={{ backgroundColor: '#EF4444' }}
                    />
                  </span>
                )}
              </div>

              {/* Bold Dark Label */}
              <span
                className="text-[10.5px] mt-0.5 tracking-tight transition-colors leading-tight truncate max-w-full px-0.5"
                style={{
                  color: isActive ? '#C9252D' : '#1F2937',
                  fontWeight: isActive ? 800 : 700
                }}
              >
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>

      {/* Solid Home Bar Indicator (Visible only on desktop simulation) */}
      <div
        className="hidden sm:block w-28 h-1 rounded-full mx-auto mt-1 mb-1.5"
        style={{ backgroundColor: '#D1D5DB' }}
      />
    </nav>
  );
};
