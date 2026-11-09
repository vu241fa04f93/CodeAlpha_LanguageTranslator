import React from 'react';
import { motion } from 'framer-motion';
import { Globe, ArrowRight, Sparkles } from 'lucide-react';

export function PopularLanguagesSection({ onSelectLanguage }) {
  const featured = [
    {
      code: 'hi',
      name: 'Hindi',
      native: 'हिन्दी',
      greeting: 'नमस्ते, आप कैसे हैं?',
      flag: '🇮🇳',
      speakers: '600M+ Speakers',
      glow: 'from-[#1E382A]/30 to-transparent'
    },
    {
      code: 'te',
      name: 'Telugu',
      native: 'తెలుగు',
      greeting: 'హలో, మీరు ఎలా ఉన్నారు?',
      flag: '🇮🇳',
      speakers: '95M+ Speakers',
      glow: 'from-[#2A4535]/30 to-transparent'
    },
    {
      code: 'ta',
      name: 'Tamil',
      native: 'தமிழ்',
      greeting: 'வணக்கம், நலமா?',
      flag: '🇮🇳',
      speakers: '85M+ Speakers',
      glow: 'from-[#1E382A]/30 to-transparent'
    },
    {
      code: 'es',
      name: 'Spanish',
      native: 'Español',
      greeting: '¡Hola! ¿Cómo estás?',
      flag: '🇪🇸',
      speakers: '540M+ Speakers',
      glow: 'from-[#2C3825]/30 to-transparent'
    },
    {
      code: 'fr',
      name: 'French',
      native: 'Français',
      greeting: 'Bonjour tout le monde',
      flag: '🇫🇷',
      speakers: '280M+ Speakers',
      glow: 'from-[#1A3026]/30 to-transparent'
    },
    {
      code: 'ja',
      name: 'Japanese',
      native: '日本語',
      greeting: 'こんにちは、お元気ですか？',
      flag: '🇯🇵',
      speakers: '125M+ Speakers',
      glow: 'from-[#2A3F30]/30 to-transparent'
    }
  ];

  return (
    <section id="languages" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#141F17] border border-[#8F8C72]/25 text-[#D9D5BD] text-xs font-semibold mb-3">
            <Globe className="w-3.5 h-3.5 text-[#2DD4BF]" />
            <span>Global Reach</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#F5F4EE] tracking-tight">
            Popular Languages & Dialects
          </h2>
          <p className="text-base text-[#A3A082] mt-2">
            Click any language card to automatically set it as your target language in the workspace.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featured.map((lang, idx) => (
            <motion.div
              key={lang.code}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
              onClick={() => onSelectLanguage(lang.code)}
              className="cursor-pointer p-6 rounded-2xl bg-[#0D140F]/85 border border-[#8F8C72]/20 hover:border-[#D9D5BD]/40 backdrop-blur-xl shadow-lg hover:shadow-black/70 hover:-translate-y-1 transition-all group relative overflow-hidden"
            >
              {/* Card ambient background tint */}
              <div className={`absolute inset-0 bg-gradient-to-br ${lang.glow} pointer-events-none opacity-60`} />

              <div className="relative z-10 flex flex-col justify-between h-full">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-3xl">{lang.flag}</span>
                    <span className="text-[11px] font-mono uppercase px-2 py-0.5 rounded-full bg-[#141F17] text-[#D9D5BD] border border-[#8F8C72]/30">
                      {lang.code}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-[#F5F4EE] group-hover:text-[#D9D5BD] transition-colors">
                    {lang.name}
                  </h3>
                  <div className="text-xs text-[#A3A082] font-medium mt-0.5">
                    {lang.native} • {lang.speakers}
                  </div>

                  {/* Sample Greeting */}
                  <div className="mt-4 p-3 rounded-xl bg-[#080D0A]/80 border border-[#8F8C72]/15">
                    <span className="text-[10px] text-[#8F8C72] block uppercase font-mono">Sample phrase:</span>
                    <span className="text-sm font-semibold text-[#D9D5BD] mt-0.5 block">
                      "{lang.greeting}"
                    </span>
                  </div>
                </div>

                <div className="mt-5 pt-3 border-t border-[#8F8C72]/15 flex items-center justify-between text-xs font-semibold text-[#D9D5BD] group-hover:text-[#F4F1E6]">
                  <span>Translate to {lang.name}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
