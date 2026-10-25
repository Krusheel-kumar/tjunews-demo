import React, { useState } from 'react';
import { Radio, Bell, Users, MessageSquare, ExternalLink, Calendar, Play } from 'lucide-react';
import { TJNewsLogo } from './TJLogo';

export const LiveTVScreen: React.FC = () => {
  const [isLiveActive, setIsLiveActive] = useState(true);
  const [isNotified, setIsNotified] = useState(false);
  const [viewerCount, setViewerCount] = useState(14820);

  const previousBroadcasts = [
    {
      id: 'prev-1',
      title: 'Telangana Special Assembly Session: Infra & Energy Budget Full Debate',
      time: 'Earlier Today · 2h 15m',
      thumbnail: 'https://images.unsplash.com/photo-1541872703-74c5e44368f9?w=600&auto=format&fit=crop&q=80'
    },
    {
      id: 'prev-2',
      title: 'Hyderabad Metro Phase 2 Press Conference with HMRL Managing Director',
      time: 'Yesterday · 48m',
      thumbnail: 'https://images.unsplash.com/photo-1570125909232-eb263c188f7e?w=600&auto=format&fit=crop&q=80'
    },
    {
      id: 'prev-3',
      title: 'Ground Report: Nizamabad Turmeric Farming Exports & Logistics Corridor',
      time: '20 Oct · 1h 05m',
      thumbnail: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=600&auto=format&fit=crop&q=80'
    }
  ];

  return (
    <div className="bg-[#0B0D12] text-white min-h-screen pb-28 animate-fadeIn">
      {/* Live Video Player Header */}
      <div className="relative aspect-16/9 w-full bg-black flex items-center justify-center overflow-hidden border-b border-gray-800/90 shadow-2xl">
        {isLiveActive ? (
          <>
            {/* Live Feed Video Simulation */}
            <div
              className="absolute inset-0 bg-cover bg-center opacity-90 scale-102"
              style={{
                backgroundImage:
                  'url(https://images.unsplash.com/photo-1585829365295-ab7cd400c167?w=1000&auto=format&fit=crop&q=80)'
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0B0D12] via-transparent via-40% to-black/70" />

            {/* Broadcast Overlay Badges */}
            <div className="absolute top-3.5 left-3.5 flex items-center gap-2 z-10">
              <span className="flex items-center gap-1.5 bg-[#C9252D] text-white text-[10px] font-black uppercase px-2.5 py-1 rounded-md shadow-lg shadow-red-900/50">
                <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                LIVE
              </span>
              <span className="bg-black/60 backdrop-blur-md text-[10px] text-gray-200 px-2.5 py-1 rounded-md flex items-center gap-1.5 font-mono border border-white/10">
                <Users size={11} className="text-emerald-400" />
                <span>{viewerCount.toLocaleString()} watching</span>
              </span>
            </div>

            {/* Top Right Channel Watermark */}
            <div className="absolute top-3.5 right-3.5 z-10 bg-black/50 backdrop-blur-md px-2 py-0.5 rounded border border-white/10">
              <span className="text-[10px] font-black tracking-widest text-white/90">TJU 24×7</span>
            </div>

            {/* Simulated Live Studio Lower Third Ticker */}
            <div className="absolute bottom-2.5 left-2.5 right-2.5 bg-gradient-to-r from-[#B01B22] via-[#8C141A] to-[#12141C] p-2.5 rounded-xl shadow-2xl border border-red-500/40 flex items-center justify-between">
              <div className="flex items-center gap-2 min-w-0">
                <span className="bg-white text-[#C9252D] text-[9px] font-black px-2 py-0.5 rounded shadow-xs flex-shrink-0 tracking-wider">
                  BULLETIN
                </span>
                <span className="text-xs font-bold text-white truncate max-w-[210px] drop-shadow-sm">
                  Telangana State Assembly: New Regional Highway Corridors
                </span>
              </div>
              <span className="text-[10px] text-red-200 font-mono hidden sm:inline flex-shrink-0">
                LIVE FROM HYDERABAD
              </span>
            </div>
          </>
        ) : (
          <div className="p-8 text-center space-y-3">
            <div className="w-14 h-14 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mx-auto text-gray-400">
              <Radio size={28} />
            </div>
            <h3 className="text-sm font-bold text-gray-200">Live Broadcast Is Currently Off Air</h3>
            <p className="text-xs text-gray-400 max-w-xs mx-auto leading-relaxed">
              The next live news bulletin begins at 06:00 PM IST with Chief Editor Ground Analysis.
            </p>
          </div>
        )}
      </div>

      {/* Program Info & Actions */}
      <div className="p-4 bg-[#12151C] border-b border-gray-800/80">
        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 text-xs text-red-400 font-semibold mb-1">
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-red-500 inline-block animate-ping" />
                Satellite Feed
              </span>
              <span>•</span>
              <span className="text-gray-400 font-mono">1080p Ultra HD</span>
            </div>
            <h1 className="font-serif font-black text-lg text-white leading-snug tracking-tight">
              Prime Time Debate: Transforming Hyderabad Urban Connectivity & Telangana Mega Projects
            </h1>
          </div>

          {/* Toggle Live Stream Demo Switch */}
          <button
            onClick={() => setIsLiveActive(!isLiveActive)}
            className="text-[10px] font-mono px-2.5 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-gray-300 border border-white/10 flex-shrink-0 cursor-pointer transition active:scale-95"
            title="Simulate stream online/offline"
          >
            {isLiveActive ? 'Off-Air Mode' : 'Go Live'}
          </button>
        </div>

        {/* Action Controls */}
        <div className="mt-4 flex items-center justify-between pt-3 border-t border-gray-800/80">
          <button
            onClick={() => setIsNotified(!isNotified)}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer active:scale-95 ${
              isNotified
                ? 'bg-[#C9252D] text-white shadow-md shadow-red-900/40'
                : 'bg-white/10 hover:bg-white/15 text-gray-200 border border-white/10'
            }`}
          >
            <Bell size={14} className={isNotified ? 'fill-current' : ''} />
            <span>{isNotified ? 'Alert Scheduled' : 'Notify When Live'}</span>
          </button>

          <div className="flex items-center gap-2 text-xs text-gray-400 font-mono">
            <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block" />
            <span>Hyderabad Node</span>
          </div>
        </div>
      </div>

      {/* Previous Broadcasts & Recorded Coverage */}
      <div className="p-4 space-y-3.5">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-xs text-gray-300 uppercase tracking-wider flex items-center gap-1.5">
            <Calendar size={13} className="text-[#C9252D]" />
            Recent Live Coverage & Archives
          </h3>
          <span className="text-[10px] text-gray-500 font-mono">Full Bulletins</span>
        </div>

        <div className="space-y-3">
          {previousBroadcasts.map((prev) => (
            <div
              key={prev.id}
              className="bg-[#12151C] p-3 rounded-2xl border border-gray-800/80 hover:border-gray-700 transition-all duration-200 cursor-pointer flex gap-3.5 group active:scale-[0.99]"
            >
              <div className="relative w-28 h-20 rounded-xl overflow-hidden flex-shrink-0 bg-gray-900 border border-white/10">
                <img
                  src={prev.thumbnail}
                  alt=""
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <div className="w-7 h-7 rounded-full bg-black/60 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white group-hover:scale-110 transition-transform">
                    <Play size={12} className="translate-x-0.5 fill-current" />
                  </div>
                </div>
              </div>
              <div className="flex-1 flex flex-col justify-between py-0.5 min-w-0">
                <h4 className="text-xs font-bold text-gray-200 line-clamp-2 leading-snug group-hover:text-red-400 transition-colors">
                  {prev.title}
                </h4>
                <div className="flex items-center gap-2 text-[10px] text-gray-500 font-mono mt-1">
                  <span>{prev.time}</span>
                  <span>•</span>
                  <span className="text-gray-400">Archived Stream</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
