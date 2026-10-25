import React, { useState } from 'react';
import type { Article } from '../types';
import { Search, X, Clock, TrendingUp, Filter, MapPin } from 'lucide-react';
import { TOPICS_LIST, LOCATIONS_LIST } from '../mockData';

interface SearchScreenProps {
  articles: Article[];
  onSelectArticle: (article: Article) => void;
  onClose: () => void;
}

export const SearchScreen: React.FC<SearchScreenProps> = ({
  articles,
  onSelectArticle,
  onClose
}) => {
  const [query, setQuery] = useState('');
  const [selectedFilterCategory, setSelectedFilterCategory] = useState<string>('All');
  const [selectedLocation, setSelectedLocation] = useState<string>('All');

  const [recentSearches, setRecentSearches] = useState<string[]>([
    'Metro Phase 2',
    'Telangana IT',
    'Food Festival'
  ]);

  const categories = ['All', 'Hyderabad', 'Telangana', 'India', 'Sports', 'Business'];

  const results = articles.filter((art) => {
    const matchesQuery =
      query.trim() === '' ||
      art.title.toLowerCase().includes(query.toLowerCase()) ||
      art.summary.toLowerCase().includes(query.toLowerCase()) ||
      art.category.toLowerCase().includes(query.toLowerCase());

    const matchesCat =
      selectedFilterCategory === 'All' || art.category.toLowerCase() === selectedFilterCategory.toLowerCase();

    const matchesLoc =
      selectedLocation === 'All' ||
      (art.location && art.location.toLowerCase().includes(selectedLocation.toLowerCase()));

    return matchesQuery && matchesCat && matchesLoc;
  });

  const handleSearchSubmit = (keyword: string) => {
    setQuery(keyword);
    if (!recentSearches.includes(keyword)) {
      setRecentSearches([keyword, ...recentSearches.slice(0, 4)]);
    }
  };

  return (
    <div className="bg-white min-h-screen pb-20 animate-fadeIn">
      {/* Top Search Header */}
      <div className="sticky top-0 z-40 bg-white border-b border-gray-100 p-3 flex items-center gap-2">
        <div className="relative flex-1">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search news, topics, localities..."
            autoFocus
            className="w-full pl-9 pr-8 py-2 bg-gray-100 rounded-full text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#C9252D]/40"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700 p-1"
            >
              <X size={16} />
            </button>
          )}
        </div>
        <button
          onClick={onClose}
          className="text-xs font-semibold text-gray-600 hover:text-gray-900 px-2 py-1"
        >
          Cancel
        </button>
      </div>

      {/* Filters Bar */}
      <div className="px-3 py-2 bg-gray-50 border-b border-gray-100 space-y-2">
        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none py-0.5">
          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider flex items-center gap-0.5 mr-1">
            <Filter size={10} /> Topic:
          </span>
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setSelectedFilterCategory(c)}
              className={`px-2.5 py-1 rounded-full text-[11px] font-semibold transition cursor-pointer whitespace-nowrap ${
                selectedFilterCategory === c
                  ? 'bg-[#C9252D] text-white shadow-xs'
                  : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-100'
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        {/* Location Filter */}
        <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none py-0.5">
          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider flex items-center gap-0.5 mr-1">
            <MapPin size={10} /> City:
          </span>
          {['All', 'Hyderabad', 'Telangana', 'New Delhi'].map((loc) => (
            <button
              key={loc}
              onClick={() => setSelectedLocation(loc)}
              className={`px-2.5 py-1 rounded-full text-[11px] font-semibold transition cursor-pointer whitespace-nowrap ${
                selectedLocation === loc
                  ? 'bg-gray-800 text-white shadow-xs'
                  : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-100'
              }`}
            >
              {loc}
            </button>
          ))}
        </div>
      </div>

      {/* Recent & Trending (Shown when no search query) */}
      {!query && (
        <div className="p-4 space-y-6">
          {/* Recent Searches */}
          {recentSearches.length > 0 && (
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-1">
                  <Clock size={12} /> Recent Searches
                </span>
                <button
                  onClick={() => setRecentSearches([])}
                  className="text-[11px] text-[#C9252D] font-semibold"
                >
                  Clear
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {recentSearches.map((rec) => (
                  <button
                    key={rec}
                    onClick={() => handleSearchSubmit(rec)}
                    className="px-3 py-1 bg-gray-100 hover:bg-gray-200 text-gray-800 text-xs rounded-full transition cursor-pointer"
                  >
                    {rec}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Trending Topics */}
          <div>
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-1 mb-2">
              <TrendingUp size={12} /> Trending in Hyderabad & Telangana
            </span>
            <div className="space-y-1.5">
              {TOPICS_LIST.slice(0, 6).map((topic, i) => (
                <div
                  key={topic}
                  onClick={() => handleSearchSubmit(topic)}
                  className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 transition cursor-pointer border border-transparent hover:border-gray-100"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-bold text-gray-400 font-mono w-4">
                      0{i + 1}
                    </span>
                    <span className="text-sm font-semibold text-gray-800">
                      #{topic.replace(/\s+/g, '')}
                    </span>
                  </div>
                  <span className="text-[10px] text-gray-400 font-medium">
                    12.4k posts
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Search Results List */}
      {query && (
        <div className="p-3">
          <div className="text-xs text-gray-500 font-medium mb-3">
            Found <span className="font-bold text-gray-900">{results.length}</span> results for "{query}"
          </div>

          {results.length === 0 ? (
            <div className="py-12 text-center text-gray-500 space-y-2">
              <p className="text-sm font-semibold text-gray-700">No matching news found</p>
              <p className="text-xs text-gray-400">
                Try searching for general keywords like "Metro", "Telangana", or "Festival".
              </p>
            </div>
          ) : (
            <div className="space-y-2.5">
              {results.map((art) => (
                <div
                  key={art.id}
                  onClick={() => onSelectArticle(art)}
                  className="p-3 rounded-xl border border-gray-100 bg-white shadow-2xs hover:shadow-xs transition cursor-pointer flex gap-3"
                >
                  <div className="flex-1">
                    <span className="text-[10px] font-bold text-[#C9252D] uppercase tracking-wide">
                      {art.category}
                    </span>
                    <h4 className="text-sm font-bold text-gray-900 line-clamp-2 mt-0.5 leading-snug">
                      {art.title}
                    </h4>
                    <p className="text-[11px] text-gray-500 line-clamp-1 mt-1">
                      {art.summary}
                    </p>
                    <span className="text-[10px] text-gray-400 font-mono mt-1 block">
                      {art.publishedAt}
                    </span>
                  </div>
                  <img
                    src={art.imageUrl}
                    alt=""
                    className="w-16 h-16 rounded-lg object-cover flex-shrink-0 bg-gray-100"
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
