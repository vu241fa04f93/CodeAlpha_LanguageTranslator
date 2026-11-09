import React, { useState, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Sparkles, ArrowRight, Check, Globe2, ShieldCheck, Zap } from 'lucide-react';

const PREVIEW_LANGUAGES = [
  { code: 'hi', label: 'Hindi', script: 'हिन्दी', text: 'नमस्ते, आप कैसे हैं?' },
  { code: 'te', label: 'Telugu', script: 'తెలుగు', text: 'హలో, మీరు ఎలా ఉన్నారు?' },
  { code: 'es', label: 'Spanish', script: 'Español', text: 'Hola, ¿cómo estás?' },
  { code: 'fr', label: 'French', script: 'Français', text: 'Bonjour, comment allez-vous?' },
  { code: 'ja', label: 'Japanese', script: '日本語', text: 'こんにちは、お元気ですか？' },
  { code: 'en', label: 'English', script: 'English', text: 'Hello, how are you?' },
];

export function Hero3DStage({ onTryLanguage }) {
  const [activeLang, setActiveLang] = useState(PREVIEW_LANGUAGES[0]);
  const cardRef = useRef(null);

  // Mouse tilt tracking with fluid spring damping (Uplinq 3D style)
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 180, mass: 0.6 };
  const mouseXSpring = useSpring(x, springConfig);
  const mouseYSpring = useSpring(y, springConfig);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['10deg', '-10deg']);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-12deg', '12deg']);
  const glareX = useTransform(mouseXSpring, [-0.5, 0.5], ['0%', '100%']);
  const glareY = useTransform(mouseYSpring, [-0.5, 0.5], ['0%', '100%']);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <div className="relative w-full max-w-4xl mx-auto mt-12 mb-4 px-4 perspective-1200">
      {/* Background kinetic ambient mesh */}
      <div className="absolute inset-0 bg-gradient-to-tr from-[#16281E]/40 via-[#8F8C72]/10 to-transparent rounded-[36px] blur-2xl -z-10 pointer-events-none" />

      {/* 3D Motion Container */}
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d'
        }}
        className="relative rounded-3xl bg-[#0D140F]/85 border border-[#8F8C72]/25 backdrop-blur-2xl p-6 sm:p-8 shadow-2xl shadow-black/80 transition-shadow duration-300 hover:shadow-[#8F8C72]/15 hover:border-[#D9D5BD]/35 group cursor-default"
      >
        {/* Dynamic Specular Sheen (follows cursor in 3D) */}
        <motion.div
          style={{
            background: useTransform(
              [glareX, glareY],
              ([gx, gy]) =>
                `radial-gradient(circle 320px at ${gx} ${gy}, rgba(217, 213, 189, 0.14), transparent 70%)`
            )
          }}
          className="absolute inset-0 rounded-3xl pointer-events-none z-20"
        />

        {/* Top Header Row with Uplinq-style status indicators */}
        <div className="flex items-center justify-between border-b border-[#8F8C72]/15 pb-4 mb-6 translate-z-20">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#182C20] border border-[#8F8C72]/30 flex items-center justify-center text-[#D9D5BD] shadow-inner">
              <Globe2 className="w-4 h-4 text-[#D9D5BD]" />
            </div>
            <div>
              <div className="text-xs font-semibold text-[#F5F4EE] flex items-center gap-2">
                <span>Neural Language Core</span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              </div>
              <p className="text-[11px] text-[#A3A082] font-mono">Live Contextual Dispatcher</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#182C20]/80 border border-[#8F8C72]/30 text-[11px] text-[#D9D5BD] font-mono">
              <Zap className="w-3 h-3 text-[#2DD4BF]" />
              <span>Low Latency</span>
            </span>
          </div>
        </div>

        {/* Central 3D Interactive Translation Showcase */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center mb-6">
          {/* Input Source Block */}
          <div className="p-4 rounded-2xl bg-[#080D0A]/70 border border-[#8F8C72]/15 translate-z-30 hover:border-[#D9D5BD]/30 transition-all">
            <div className="flex items-center justify-between text-xs text-[#A3A082] mb-2 font-mono">
              <span>INPUT SOURCE</span>
              <span className="px-2 py-0.5 rounded bg-[#182C20] text-[#D9D5BD] text-[10px]">EN</span>
            </div>
            <p className="text-sm sm:text-base font-medium text-[#F5F4EE]">
              "Hello, how are you?"
            </p>
            <div className="mt-2 text-[11px] text-[#8F8C72] flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#2DD4BF]" />
              <span>English Speech & Text Recognized</span>
            </div>
          </div>

          {/* Morphing Target Block */}
          <motion.div
            key={activeLang.code}
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="p-4 rounded-2xl bg-gradient-to-br from-[#142318] to-[#0E1711] border border-[#D9D5BD]/25 translate-z-40 shadow-xl shadow-black/50"
          >
            <div className="flex items-center justify-between text-xs text-[#D9D5BD] mb-2 font-mono">
              <span className="flex items-center gap-1.5">
                <Sparkles className="w-3 h-3 text-[#2DD4BF]" />
                <span>AI TRANSLATION</span>
              </span>
              <span className="px-2 py-0.5 rounded bg-[#274532] text-[#F4F1E6] text-[10px] uppercase font-bold">
                {activeLang.code}
              </span>
            </div>
            <p className="text-sm sm:text-base font-semibold text-[#F4F1E6] tracking-wide">
              {activeLang.text}
            </p>
            <div className="mt-2 text-[11px] text-[#D9D5BD]/80 flex items-center justify-between">
              <span>{activeLang.label} ({activeLang.script})</span>
              <span className="font-mono text-[#2DD4BF] text-[10px]">100% Verified Script</span>
            </div>
          </motion.div>
        </div>

        {/* Orbiting Language Pill Selectors (Click to morph) */}
        <div className="translate-z-30">
          <div className="text-[11px] font-mono text-[#A3A082] mb-2.5 flex items-center justify-between">
            <span>EXPLORE SCRIPTS & DIALECTS</span>
            <span className="text-[10px] text-[#D9D5BD]">Click to inspect translation</span>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {PREVIEW_LANGUAGES.map((lang) => {
              const isSelected = activeLang.code === lang.code;
              return (
                <button
                  key={lang.code}
                  onClick={() => {
                    setActiveLang(lang);
                    if (onTryLanguage) onTryLanguage(lang.code);
                  }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all duration-200 flex items-center gap-2 ${
                    isSelected
                      ? 'bg-[#D9D5BD] text-[#080D0A] shadow-md shadow-[#D9D5BD]/20 font-bold scale-[1.03]'
                      : 'bg-[#141F17]/80 hover:bg-[#1C2C21] text-[#C5C2B1] border border-[#8F8C72]/20 hover:border-[#D9D5BD]/30'
                  }`}
                >
                  <span className="font-mono text-[10px] uppercase">{lang.code}</span>
                  <span>{lang.script}</span>
                  {isSelected && <Check className="w-3 h-3 text-[#080D0A]" />}
                </button>
              );
            })}
          </div>
        </div>
      </motion.div>
    </div>
  );
}

