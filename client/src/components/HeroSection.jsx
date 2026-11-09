import React from 'react';
import { motion } from 'framer-motion';
import {
  Sparkles,
  ArrowRight,
  Languages,
  Zap,
  Globe2,
  ShieldCheck,
  CheckCircle,
  Compass
} from 'lucide-react';
import { Hero3DStage } from './Hero3DStage';

export function HeroSection({ onStartTranslating, onExploreLanguages, onSelectLanguage }) {
  return (
    <section id="home" className="relative pt-32 pb-16 md:pt-40 md:pb-24 overflow-hidden">
      {/* Background Radial Ambient Glows - Conceptzilla Forest Obsidian & Sage */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] md:w-[1000px] h-[550px] bg-gradient-to-tr from-[#16281E]/35 via-[#8F8C72]/15 to-[#D9D5BD]/10 rounded-full blur-[140px] pointer-events-none -z-10 animate-drift-slow" />
      <div className="absolute top-1/3 left-1/4 w-[400px] h-[400px] bg-[#2DD4BF]/10 rounded-full blur-[120px] pointer-events-none -z-10 animate-drift-slow-reverse" />

      {/* Decorative Grid Mesh */}
      <div
        className="absolute inset-0 opacity-[0.035] pointer-events-none -z-10"
        style={{
          backgroundImage: `radial-gradient(rgba(217, 213, 189, 0.4) 1px, transparent 1px)`,
          backgroundSize: '28px 28px'
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto space-y-7">
          {/* Tagline Badge */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-[#8F8C72]/30 bg-[#141F17]/70 backdrop-blur-md shadow-lg shadow-black/40"
          >
            <Compass className="w-3.5 h-3.5 text-[#D9D5BD]" />
            <span className="text-xs font-semibold text-[#D9D5BD] tracking-wide">
              Every Language. One Intelligence.
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#2DD4BF]" />
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.08] text-[#F5F4EE]"
          >
            Break Language Barriers{' '}
            <span className="block mt-2 text-gradient-gold drop-shadow-sm font-extrabold">
              with Intelligent AI
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-base sm:text-xl text-[#C5C2B1] max-w-2xl mx-auto font-normal leading-relaxed"
          >
            Translate your words into any language with private, contextual artificial intelligence. Fast, script-verified, and effortless.
          </motion.p>

          {/* Call to Actions with tactile micro-interactions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2"
          >
            <button
              onClick={onStartTranslating}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-[#D9D5BD] hover:bg-[#EDE9D5] text-[#080D0A] font-bold text-base shadow-xl shadow-[#D9D5BD]/15 hover:shadow-[#D9D5BD]/30 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3 group"
            >
              <span>Start Translating</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform text-[#080D0A]" />
            </button>

            <button
              onClick={onExploreLanguages}
              className="w-full sm:w-auto px-7 py-4 rounded-2xl bg-[#111A13]/85 hover:bg-[#18261E] border border-[#8F8C72]/30 hover:border-[#D9D5BD]/50 text-[#EDE9D5] hover:text-white font-semibold text-base backdrop-blur-xl shadow-lg shadow-black/40 transition-all flex items-center justify-center gap-2.5"
            >
              <Languages className="w-5 h-5 text-[#D9D5BD]" />
              <span>Explore 100+ Languages</span>
            </button>
          </motion.div>

          {/* Vedroxy-inspired 3D Interactive Translation Stage */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.35, ease: 'easeOut' }}
          >
            <Hero3DStage onTryLanguage={onSelectLanguage} />
          </motion.div>

          {/* Statistics Grid */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.45 }}
            className="pt-6 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto"
          >
            <div className="p-4 rounded-2xl bg-[#0D140F]/80 border border-[#8F8C72]/20 backdrop-blur-md text-center hover:border-[#D9D5BD]/40 transition-all">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#F5F4EE]">100+</div>
              <div className="text-xs sm:text-sm text-[#D9D5BD] font-medium mt-1">Languages Supported</div>
            </div>

            <div className="p-4 rounded-2xl bg-[#0D140F]/80 border border-[#8F8C72]/20 backdrop-blur-md text-center hover:border-[#D9D5BD]/40 transition-all">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#F5F4EE]">Instant</div>
              <div className="text-xs sm:text-sm text-[#2DD4BF] font-medium mt-1">Real-time Translation</div>
            </div>

            <div className="p-4 rounded-2xl bg-[#0D140F]/80 border border-[#8F8C72]/20 backdrop-blur-md text-center hover:border-[#D9D5BD]/40 transition-all">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#F5F4EE]">Free</div>
              <div className="text-xs sm:text-sm text-[#D9D5BD] font-medium mt-1">To Get Started</div>
            </div>

            <div className="p-4 rounded-2xl bg-[#0D140F]/80 border border-[#8F8C72]/20 backdrop-blur-md text-center hover:border-[#D9D5BD]/40 transition-all">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#F5F4EE]">100%</div>
              <div className="text-xs sm:text-sm text-emerald-300 font-medium mt-1">Script Verified</div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
