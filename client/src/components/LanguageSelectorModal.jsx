import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, Check, Sparkles, Compass } from 'lucide-react';
import { languages } from '../data/languages';

export function LanguageSelectorModal({
  isOpen,
  onClose,
  selectedCode,
  onSelectLanguage,
  isSource = false,
  title = 'Select Language'
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeRegion, setActiveRegion] = useState('All');

  const libreTranslateSupported = useMemo(() => new Set([
    'en', 'sq', 'ar', 'az', 'eu', 'bn', 'bg', 'ca', 'zh', 'zh-hans', 'zh-hant', 'cs', 'da',
    'nl', 'eo', 'et', 'fi', 'fr', 'gl', 'de', 'el', 'he', 'hi', 'hu', 'id', 'ga', 'it', 'ja',
    'ko', 'ky', 'lv', 'lt', 'ms', 'nb', 'fa', 'pl', 'pt', 'pt-br', 'ro', 'ru', 'sk', 'sl',
    'es', 'sw', 'sv', 'tl', 'th', 'tr', 'uk', 'ur', 'vi'
  ]), []);

  const indicSupported = useMemo(() => new Set([
    'te', 'ta', 'hi', 'bn', 'gu', 'kn', 'ml', 'mr', 'pa', 'ur', 'or', 'as'
  ]), []);

  const allSupported = useMemo(() => new Set([
    ...Array.from(libreTranslateSupported),
    ...Array.from(indicSupported)
  ]), [libreTranslateSupported, indicSupported]);

  const regions = ['All', 'AI Supported', 'Popular', 'Asia', 'Europe', 'Middle East', 'Americas', 'Africa'];

  const filteredLanguages = useMemo(() => {
    return languages.filter(lang => {
      const codeClean = lang.code.toLowerCase();
      const matchesSearch =
        lang.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        lang.nativeName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        codeClean.includes(searchQuery.toLowerCase());

      if (!matchesSearch) return false;

      if (activeRegion === 'All') return true;
      if (activeRegion === 'AI Supported') return allSupported.has(codeClean);
      if (activeRegion === 'Popular') return lang.popular;
      return lang.region === activeRegion;
    });
  }, [searchQuery, activeRegion, allSupported]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
          className="relative w-full max-w-2xl bg-[#0D140F] border border-[#8F8C72]/30 rounded-3xl shadow-2xl shadow-black/90 overflow-hidden z-10 flex flex-col max-h-[85vh]"
        >
          {/* Header */}
          <div className="px-6 py-4 border-b border-[#8F8C72]/20 flex items-center justify-between bg-gradient-to-r from-[#141F17] to-transparent">
            <div>
              <h3 className="text-lg font-bold text-[#F5F4EE] flex items-center gap-2">
                <span>{title}</span>
                <span className="text-xs font-normal px-2.5 py-0.5 rounded-full bg-[#182C20] text-[#D9D5BD] border border-[#8F8C72]/30">
                  {languages.length}+ Languages
                </span>
              </h3>
              <p className="text-xs text-[#A3A082] mt-0.5">
                {isSource ? 'Choose source language or use automatic detection' : 'Choose your desired output language'}
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-[#8F8C72] hover:text-white hover:bg-[#141F17] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Search bar & filter pills */}
          <div className="p-5 border-b border-[#8F8C72]/15 space-y-3 bg-[#080D0A]/80">
            <div className="relative">
              <Search className="w-4 h-4 text-[#8F8C72] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by language, native name, or code..."
                autoFocus
                className="w-full pl-10 pr-4 py-2.5 bg-[#141F17]/80 border border-[#8F8C72]/25 rounded-xl text-sm text-[#F5F4EE] placeholder-[#6E7162] focus:outline-none focus:border-[#D9D5BD]/40 transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#8F8C72] hover:text-white"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Region Filters */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
              {regions.map((region) => (
                <button
                  key={region}
                  onClick={() => setActiveRegion(region)}
                  className={`px-3 py-1 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
                    activeRegion === region
                      ? 'bg-[#D9D5BD] text-[#080D0A] font-bold shadow-md shadow-[#D9D5BD]/15'
                      : 'bg-[#141F17]/60 text-[#A3A082] hover:text-[#F5F4EE] hover:bg-[#141F17]'
                  }`}
                >
                  {region}
                </button>
              ))}
            </div>
          </div>

          {/* Languages Grid */}
          <div className="p-5 overflow-y-auto space-y-2 flex-1 max-h-[400px]">
            {/* Auto Detect Option for Source */}
            {isSource && (
              <button
                onClick={() => {
                  onSelectLanguage('auto');
                  onClose();
                }}
                className={`w-full flex items-center justify-between p-3 rounded-xl border transition-all mb-3 ${
                  selectedCode === 'auto'
                    ? 'border-[#D9D5BD] bg-[#182C20] text-[#D9D5BD] shadow-md shadow-black/50'
                    : 'border-[#8F8C72]/20 bg-[#080D0A]/60 hover:bg-[#141F17] hover:border-[#8F8C72]/40 text-[#C5C2B1]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#D9D5BD] flex items-center justify-center text-[#080D0A] shadow-sm font-bold">
                    <Sparkles className="w-4 h-4 text-[#080D0A]" />
                  </div>
                  <div className="text-left">
                    <div className="text-sm font-semibold flex items-center gap-2">
                      <span>Auto Detect</span>
                      <span className="text-[10px] font-medium px-1.5 py-0.5 rounded bg-[#182C20] text-[#D9D5BD]">
                        Smart AI
                      </span>
                    </div>
                    <div className="text-xs text-[#8F8C72]">Automatically recognizes input language</div>
                  </div>
                </div>
                {selectedCode === 'auto' && <Check className="w-5 h-5 text-[#2DD4BF]" />}
              </button>
            )}

            {filteredLanguages.length === 0 ? (
              <div className="text-center py-10">
                <p className="text-[#8F8C72] text-sm">No languages found matching "{searchQuery}"</p>
                <button
                  onClick={() => { setSearchQuery(''); setActiveRegion('All'); }}
                  className="mt-2 text-xs text-[#D9D5BD] hover:underline"
                >
                  Reset filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {filteredLanguages.map((lang) => {
                  const isSelected = selectedCode === lang.code;
                  return (
                    <button
                      key={lang.code}
                      onClick={() => {
                        onSelectLanguage(lang.code);
                        onClose();
                      }}
                      className={`flex items-center justify-between p-2.5 rounded-xl border text-left transition-all group ${
                        isSelected
                          ? 'border-[#D9D5BD] bg-[#182C20] text-white shadow-sm'
                          : 'border-[#8F8C72]/15 bg-[#080D0A]/60 hover:bg-[#141F17] hover:border-[#8F8C72]/30 text-[#C5C2B1]'
                      }`}
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <span className="text-xl shrink-0">{lang.flag}</span>
                        <div className="min-w-0">
                          <div className="text-sm font-medium truncate group-hover:text-[#D9D5BD] transition-colors">
                            {lang.name}
                          </div>
                          <div className="text-[11px] text-[#8F8C72] truncate">
                            {lang.nativeName}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 shrink-0 ml-2">
                        {allSupported.has(lang.code.toLowerCase()) ? (
                          <span
                            className="hidden sm:inline-flex items-center px-1.5 py-0.5 rounded text-[9px] font-semibold tracking-wide bg-[#182C20] text-[#2DD4BF] border border-[#2DD4BF]/30"
                            title={indicSupported.has(lang.code.toLowerCase()) ? 'Powered by Indic Neural Engine' : 'Powered by LibreTranslate Local'}
                          >
                            {indicSupported.has(lang.code.toLowerCase()) ? 'Indic AI' : 'Libre AI'}
                          </span>
                        ) : (
                          <span className="hidden sm:inline-flex items-center px-1.5 py-0.5 rounded text-[9px] font-medium bg-[#141F17] text-[#6E7162]">
                            Offline
                          </span>
                        )}
                        <span className="text-[10px] font-mono uppercase px-1.5 py-0.5 rounded bg-[#141F17] text-[#8F8C72]">
                          {lang.code}
                        </span>
                        {isSelected && <Check className="w-4 h-4 text-[#2DD4BF]" />}
                      </div>
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Footer note */}
          <div className="px-6 py-3 bg-[#080D0A] border-t border-[#8F8C72]/15 text-xs text-[#8F8C72] flex items-center justify-between">
            <span>Powered by LibreTranslate & Indic Neural AI</span>
            <button
              onClick={onClose}
              className="px-3 py-1 bg-[#D9D5BD] hover:bg-[#EDE9D5] text-[#080D0A] rounded-lg text-xs font-bold transition-colors"
            >
              Done
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
