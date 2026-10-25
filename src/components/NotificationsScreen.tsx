import React, { useState } from 'react';
import type { NotificationItem, Article } from '../types';
import { ArrowLeft, Bell, Sliders, CheckCheck, Flame, Radio, Camera, MapPin } from 'lucide-react';

interface NotificationsScreenProps {
  notifications: NotificationItem[];
  onBack: () => void;
  onSelectNotification: (notif: NotificationItem) => void;
  onMarkAllRead: () => void;
}

export const NotificationsScreen: React.FC<NotificationsScreenProps> = ({
  notifications,
  onBack,
  onSelectNotification,
  onMarkAllRead
}) => {
  const [showPreferences, setShowPreferences] = useState(false);
  const [prefs, setPrefs] = useState({
    breakingNews: true,
    localHyderabad: true,
    liveTvAlerts: true,
    citizenReports: true,
    sportsUpdates: false
  });

  const getIcon = (type: NotificationItem['type']) => {
    switch (type) {
      case 'breaking':
        return <Flame size={16} className="text-[#C9252D]" />;
      case 'live':
        return <Radio size={16} className="text-red-500" />;
      case 'citizen':
        return <Camera size={16} className="text-blue-500" />;
      case 'location':
        return <MapPin size={16} className="text-amber-500" />;
      default:
        return <Bell size={16} className="text-gray-500" />;
    }
  };

  return (
    <div className="bg-[#F8F9FA] min-h-screen pb-20 animate-fadeIn">
      {/* Top Header */}
      <header className="sticky top-0 z-40 bg-white border-b border-gray-100 px-3 py-2.5 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button
            onClick={onBack}
            className="p-1 rounded-full hover:bg-gray-100 text-gray-700 transition cursor-pointer"
          >
            <ArrowLeft size={20} />
          </button>
          <h2 className="font-serif font-black text-lg text-gray-900">
            Notification Center
          </h2>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowPreferences(!showPreferences)}
            className="p-1.5 rounded-full hover:bg-gray-100 text-gray-600 transition cursor-pointer"
            title="Notification Preferences"
          >
            <Sliders size={18} />
          </button>
          <button
            onClick={onMarkAllRead}
            className="p-1.5 rounded-full hover:bg-gray-100 text-[#C9252D] transition cursor-pointer"
            title="Mark all read"
          >
            <CheckCheck size={18} />
          </button>
        </div>
      </header>

      {/* Preferences Drawer / Modal */}
      {showPreferences && (
        <div className="bg-white p-4 border-b border-gray-200 shadow-sm animate-fadeIn">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-bold text-sm text-gray-900">Notification Preferences</h3>
            <span className="text-[11px] text-gray-400">Manage alerts</span>
          </div>
          <div className="space-y-3 text-xs">
            <label className="flex items-center justify-between cursor-pointer">
              <span className="text-gray-700 font-medium">Breaking News Alerts</span>
              <input
                type="checkbox"
                checked={prefs.breakingNews}
                onChange={(e) => setPrefs({ ...prefs, breakingNews: e.target.checked })}
                className="accent-[#C9252D] w-4 h-4 rounded cursor-pointer"
              />
            </label>
            <label className="flex items-center justify-between cursor-pointer">
              <span className="text-gray-700 font-medium">Hyderabad & Telangana Local</span>
              <input
                type="checkbox"
                checked={prefs.localHyderabad}
                onChange={(e) => setPrefs({ ...prefs, localHyderabad: e.target.checked })}
                className="accent-[#C9252D] w-4 h-4 rounded cursor-pointer"
              />
            </label>
            <label className="flex items-center justify-between cursor-pointer">
              <span className="text-gray-700 font-medium">Live TV & Breaking Broadcasts</span>
              <input
                type="checkbox"
                checked={prefs.liveTvAlerts}
                onChange={(e) => setPrefs({ ...prefs, liveTvAlerts: e.target.checked })}
                className="accent-[#C9252D] w-4 h-4 rounded cursor-pointer"
              />
            </label>
            <label className="flex items-center justify-between cursor-pointer">
              <span className="text-gray-700 font-medium">Citizen Reporter Status Updates</span>
              <input
                type="checkbox"
                checked={prefs.citizenReports}
                onChange={(e) => setPrefs({ ...prefs, citizenReports: e.target.checked })}
                className="accent-[#C9252D] w-4 h-4 rounded cursor-pointer"
              />
            </label>
          </div>
        </div>
      )}

      {/* Notifications List */}
      <div className="p-3 space-y-2">
        {notifications.length === 0 ? (
          <div className="py-16 text-center text-gray-400">
            <Bell size={32} className="mx-auto mb-2 opacity-50" />
            <p className="text-sm">No new notifications right now</p>
          </div>
        ) : (
          notifications.map((item) => (
            <div
              key={item.id}
              onClick={() => onSelectNotification(item)}
              className={`p-3 rounded-xl border transition cursor-pointer flex gap-3 ${
                item.read
                  ? 'bg-white border-gray-200/70 text-gray-600'
                  : 'bg-red-50/40 border-red-200 text-gray-900 shadow-2xs'
              }`}
            >
              <div className="p-2 bg-white rounded-lg border border-gray-100 flex-shrink-0 self-start shadow-2xs">
                {getIcon(item.type)}
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold leading-snug line-clamp-1">
                    {item.title}
                  </h4>
                  {!item.read && (
                    <span className="w-2 h-2 rounded-full bg-[#C9252D] flex-shrink-0" />
                  )}
                </div>
                <p className="text-xs text-gray-600 mt-1 leading-snug">
                  {item.body}
                </p>
                <span className="text-[10px] text-gray-400 font-mono mt-1.5 block">
                  {item.time}
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
