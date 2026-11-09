import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  History,
  Trash2,
  Copy,
  Check,
  Star,
  Search,
  ArrowRight,
  Clock,
  Sparkles
} from 'lucide-react';
import { getLanguageByCode } from '../data/languages';

export function TranslationHistory({
  history = [],
  onReuse,
  onDelete,
  onClearAll,
  onToggleFavorite,
  onShowToast
}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [copiedId, setCopiedId] = useState(null);
  const [filterFavorite, setFilterFavorite] = useState(false);

  const filteredHistory = useMemo(() => {
    return history.filter(item => {
      if (filterFavorite && !item.favorite) return false;
      if (!searchTerm) return true;
      const q = searchTerm.toLowerCase();
      return (
        item.sourceText.toLowerCase().includes(q) ||
        item.translatedText.toLowerCase().includes(q) ||
        item.sourceLang.toLowerCase().includes(q) ||
        item.targetLang.toLowerCase().includes(q)
      );
    });
  }, [history, searchTerm, filterFavorite]);

  const handleCopy = (item) => {
    navigator.clipboard.writeText(item.translatedText);
    setCopiedId(item.id);
    onShowToast({ type: 'success', message: 'Translation copied from history' });
    setTimeout(() => setCopiedId(null), 2000);
  };

  const formatTime = (isoString) => {
    try {
      const date = new Date(isoString);
      const now = new Date();
      const diff = Math.floor((now - date) / 1000);

      if (diff < 60) return 'Just now';
      if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
      if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
      return date.toLocaleDateString();
    } catch {
      return '';
    }
  };

  return (
    <section id="history" className="py-12 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h2 className="text-2xl font-extrabold text-[#F5F4EE] flex items-center gap-2">
              <History className="w-6 h-6 text-[#D9D5BD]" />
              <span>Translation History</span>
              <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-[#182C20] text-[#D9D5BD] border border-[#8F8C72]/30">
                {history.length} saved
              </span>
            </h2>
            <p className="text-xs sm:text-sm text-[#A3A082] mt-1">
              Locally saved translations. Re-use anytime or copy to clipboard.
            </p>
          </div>

          {history.length > 0 && (
            <div className="flex items-center gap-2">
              <button
                onClick={() => setFilterFavorite(!filterFavorite)}
                className={`px-3 py-1.5 rounded-xl text-xs font-medium border transition-all flex items-center gap-1.5 ${
                  filterFavorite
                    ? 'bg-[#D9D5BD] text-[#080D0A] font-bold border-[#D9D5BD]'
                    : 'bg-[#0D140F]/80 text-[#C5C2B1] border-[#8F8C72]/20 hover:text-white'
                }`}
              >
                <Star className={`w-3.5 h-3.5 ${filterFavorite ? 'fill-[#080D0A] text-[#080D0A]' : 'text-[#8F8C72]'}`} />
                <span>Favorites</span>
              </button>

              <button
                onClick={onClearAll}
                className="px-3 py-1.5 rounded-xl text-xs font-medium bg-rose-950/30 hover:bg-rose-900/40 border border-rose-500/25 text-rose-300 transition-all flex items-center gap-1.5"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Clear All</span>
              </button>
            </div>
          )}
        </div>

        {/* Search Bar (if history exists) */}
        {history.length > 0 && (
          <div className="relative mb-6">
            <Search className="w-4 h-4 text-[#8F8C72] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search past translations..."
              className="w-full pl-10 pr-4 py-2.5 bg-[#0D140F]/85 border border-[#8F8C72]/20 rounded-xl text-sm text-[#F5F4EE] placeholder-[#6E7162] focus:outline-none focus:border-[#D9D5BD]/40 transition-all"
            />
          </div>
        )}

        {/* History Cards Grid */}
        {filteredHistory.length === 0 ? (
          <div className="p-12 text-center rounded-3xl bg-[#0D140F]/60 border border-[#8F8C72]/15 backdrop-blur-md">
            <div className="w-12 h-12 rounded-2xl bg-[#141F17] border border-[#8F8C72]/20 flex items-center justify-center text-[#D9D5BD] mx-auto mb-3">
              <History className="w-6 h-6" />
            </div>
            <h4 className="text-base font-bold text-[#F5F4EE]">No translations found</h4>
            <p className="text-xs text-[#A3A082] mt-1 max-w-sm mx-auto">
              {searchTerm
                ? 'Try adjusting your search criteria.'
                : 'Translations you make in the workspace will automatically appear here for fast reuse.'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <AnimatePresence>
              {filteredHistory.map((item) => {
                const srcLang = getLanguageByCode(item.sourceLang);
                const tgtLang = getLanguageByCode(item.targetLang);

                return (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="flex flex-col justify-between p-4 rounded-2xl bg-[#0D140F]/85 border border-[#8F8C72]/20 hover:border-[#D9D5BD]/35 backdrop-blur-xl shadow-lg transition-all group"
                  >
                    <div>
                      {/* Card Header: Language badge & Actions */}
                      <div className="flex items-center justify-between pb-2 mb-2 border-b border-[#8F8C72]/15 text-xs">
                        <div className="flex items-center gap-1.5 font-semibold text-[#D9D5BD]">
                          <span>{srcLang?.flag || '🌐'} {srcLang?.name || item.sourceLang}</span>
                          <span className="text-[#8F8C72]">→</span>
                          <span>{tgtLang?.flag || '🌐'} {tgtLang?.name || item.targetLang}</span>
                        </div>

                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => onToggleFavorite(item.id)}
                            title={item.favorite ? 'Remove from favorites' : 'Add to favorites'}
                            className="p-1 rounded text-[#8F8C72] hover:text-[#D9D5BD]"
                          >
                            <Star className={`w-3.5 h-3.5 ${item.favorite ? 'fill-[#D9D5BD] text-[#D9D5BD]' : ''}`} />
                          </button>
                          <button
                            onClick={() => onDelete(item.id)}
                            title="Delete item"
                            className="p-1 rounded text-[#8F8C72] hover:text-rose-400"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="space-y-2 py-1">
                        <div>
                          <div className="text-[10px] text-[#8F8C72] uppercase font-mono">Source</div>
                          <p className="text-xs text-[#C5C2B1] line-clamp-2">{item.sourceText}</p>
                        </div>
                        <div>
                          <div className="text-[10px] text-[#2DD4BF] uppercase font-mono">Translation</div>
                          <p className="text-xs font-semibold text-[#F5F4EE] line-clamp-2">{item.translatedText}</p>
                        </div>
                      </div>
                    </div>

                    {/* Footer */}
                    <div className="pt-3 mt-2 border-t border-[#8F8C72]/15 flex items-center justify-between text-[11px] text-[#8F8C72]">
                      <span className="flex items-center gap-1 font-mono">
                        <Clock className="w-3 h-3" />
                        <span>{formatTime(item.timestamp)}</span>
                      </span>

                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => handleCopy(item)}
                          title="Copy translated text"
                          className="px-2 py-1 rounded-lg bg-[#141F17] hover:bg-[#1C2C21] text-[#C5C2B1] hover:text-white transition-colors flex items-center gap-1"
                        >
                          {copiedId === item.id ? (
                            <Check className="w-3 h-3 text-emerald-400" />
                          ) : (
                            <Copy className="w-3 h-3" />
                          )}
                        </button>
                        <button
                          onClick={() => onReuse(item)}
                          title="Load into workspace"
                          className="px-2 py-1 rounded-lg bg-[#D9D5BD] text-[#080D0A] font-bold hover:bg-[#EDE9D5] transition-colors flex items-center gap-1"
                        >
                          <span>Reuse</span>
                          <ArrowRight className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        )}
      </div>
    </section>
  );
}
