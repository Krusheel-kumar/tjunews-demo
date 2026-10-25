import React, { useState } from 'react';
import type { WeatherData } from '../types';
import {
  CloudSun,
  CloudRain,
  Sun,
  Wind,
  Droplets,
  AlertTriangle,
  MapPin,
  Clock,
  Compass,
  ChevronDown
} from 'lucide-react';
import { HYD_LOCALITIES } from '../mockData';

interface WeatherCardProps {
  weather: WeatherData;
  onLocalityChange: (locality: string) => void;
  language: 'English' | 'Telugu';
}

export const WeatherCard: React.FC<WeatherCardProps> = ({
  weather,
  onLocalityChange,
  language
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showLocalityPicker, setShowLocalityPicker] = useState(false);

  return (
    <div className="bg-gradient-to-br from-[#0B1528] via-[#101F3B] to-[#0A1322] text-white rounded-2xl p-4 shadow-[0_8px_24px_rgba(0,0,0,0.18)] border border-blue-500/20 space-y-3.5 relative overflow-hidden">
      {/* Decorative ambient aurora glow */}
      <div className="absolute top-0 right-0 w-48 h-48 bg-blue-500/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-8 -left-8 w-36 h-36 bg-cyan-500/10 rounded-full blur-2xl pointer-events-none" />

      {/* Header with City & Locality selector */}
      <div className="flex items-center justify-between relative z-10">
        <div className="relative">
          <button
            onClick={() => setShowLocalityPicker(!showLocalityPicker)}
            className="flex items-center gap-1.5 text-xs font-bold text-white bg-white/10 hover:bg-white/20 backdrop-blur-md px-3 py-1.5 rounded-full cursor-pointer transition-all border border-white/10 shadow-2xs active:scale-95"
          >
            <MapPin size={13} className="text-red-400" />
            <span>{weather.locality}</span>
            <ChevronDown size={12} className="text-gray-400" />
          </button>

          {/* Locality Dropdown */}
          {showLocalityPicker && (
            <div className="absolute top-full left-0 mt-1.5 w-52 bg-[#10192A]/95 backdrop-blur-2xl border border-gray-700/80 rounded-2xl shadow-2xl z-50 p-1.5 max-h-52 overflow-y-auto scrollbar-none text-xs animate-scaleUp">
              {HYD_LOCALITIES.map((loc) => (
                <button
                  key={loc}
                  onClick={() => {
                    onLocalityChange(loc === 'All Localities' ? 'Hyderabad Central' : loc);
                    setShowLocalityPicker(false);
                  }}
                  className="w-full text-left px-3 py-2 rounded-xl text-gray-200 hover:bg-blue-600/30 hover:text-white transition font-medium"
                >
                  {loc}
                </button>
              ))}
            </div>
          )}
        </div>

        <span className="text-[10px] text-gray-400 font-mono tracking-wider uppercase bg-white/5 px-2 py-0.5 rounded-full border border-white/5">
          {language === 'Telugu' ? 'వాతావరణం' : 'Live Weather'}
        </span>
      </div>

      {/* Main Temperature & Condition Display */}
      <div className="flex items-center justify-between relative z-10 pt-1">
        <div className="flex items-center gap-3.5">
          <CloudSun size={44} className="text-amber-400 drop-shadow-md flex-shrink-0 animate-floatGentle" />
          <div>
            <div className="flex items-baseline gap-1">
              <span className="text-4xl font-extralight tracking-tighter text-white">{weather.temp}°</span>
              <span className="text-sm font-bold text-gray-400">C</span>
            </div>
            <span className="text-xs font-medium text-gray-300">{weather.condition}</span>
          </div>
        </div>

        <div className="text-right space-y-1 text-[11px] text-gray-400">
          <div>Feels like <strong className="text-white font-bold">{weather.feelsLike}°C</strong></div>
          <div className="inline-block px-2 py-0.5 rounded-full bg-emerald-950/60 text-emerald-400 border border-emerald-800 text-[10px] font-bold">
            {weather.airQuality}
          </div>
        </div>
      </div>

      {/* Weather Attributes Rail */}
      <div className="grid grid-cols-3 gap-2 bg-black/25 backdrop-blur-md p-2.5 rounded-xl text-center text-[10px] border border-white/5 relative z-10">
        <div className="flex items-center justify-center gap-1.5 text-gray-300 font-medium">
          <CloudRain size={13} className="text-blue-400" />
          <span>Rain: <strong className="text-white">{weather.rainProb}%</strong></span>
        </div>
        <div className="flex items-center justify-center gap-1.5 text-gray-300 font-medium">
          <Droplets size={13} className="text-cyan-400" />
          <span>Humidity: <strong className="text-white">{weather.humidity}%</strong></span>
        </div>
        <div className="flex items-center justify-center gap-1.5 text-gray-300 font-medium">
          <Wind size={13} className="text-teal-400" />
          <span>Wind: <strong className="text-white">{weather.windSpeed} km/h</strong></span>
        </div>
      </div>

      {/* Advisory Alert Callout */}
      {weather.alerts && weather.alerts.length > 0 && (
        <div className="flex items-start gap-2 bg-amber-500/15 border border-amber-500/30 p-2.5 rounded-xl text-[11px] text-amber-200">
          <AlertTriangle size={14} className="text-amber-400 mt-0.5 flex-shrink-0" />
          <span className="leading-snug">{weather.alerts[0]}</span>
        </div>
      )}

      {/* Hourly and 5-Day Forecast Accordion */}
      {isExpanded && (
        <div className="pt-2 border-t border-white/10 space-y-3 animate-fadeIn relative z-10">
          {/* Hourly strip */}
          <div>
            <span className="text-[10px] text-gray-400 font-mono uppercase tracking-wider block mb-2">
              Hourly Forecast
            </span>
            <div className="flex justify-between gap-2 overflow-x-auto scrollbar-none py-1">
              {weather.hourly.map((h, i) => (
                <div key={i} className="bg-white/5 border border-white/5 p-2 rounded-xl text-center flex-1 min-w-[52px]">
                  <span className="text-[10px] text-gray-400 block font-mono">{h.time}</span>
                  <span className="text-xs font-bold block my-1 text-white">{h.temp}°</span>
                </div>
              ))}
            </div>
          </div>

          {/* 5-Day Outlook */}
          <div>
            <span className="text-[10px] text-gray-400 font-mono uppercase tracking-wider block mb-2">
              5-Day Outlook
            </span>
            <div className="space-y-1.5 text-xs">
              {weather.forecast.map((f, i) => (
                <div key={i} className="flex items-center justify-between py-1.5 px-2 rounded-lg bg-white/5 border border-white/5 text-[11px]">
                  <span className="font-semibold text-gray-200 w-14">{f.day}</span>
                  <span className="text-gray-400 truncate flex-1 text-center font-sans">{f.condition}</span>
                  <span className="font-mono text-gray-200 text-right w-16">
                    <strong className="text-white">{f.high}°</strong> / <span className="text-gray-400">{f.low}°</span>
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full text-center text-[10px] font-bold text-gray-400 hover:text-white pt-1 transition cursor-pointer"
      >
        {isExpanded ? 'Hide Detailed Forecast ▲' : 'View Hourly & 5-Day Forecast ▼'}
      </button>
    </div>
  );
};
