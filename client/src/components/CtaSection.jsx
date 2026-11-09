import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight, Compass } from 'lucide-react';

export function CtaSection({ onStartTranslating }) {
  return (
    <section className="py-20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative rounded-3xl bg-gradient-to-tr from-[#142318] via-[#0D140F] to-[#1A2E20] border border-[#8F8C72]/30 backdrop-blur-2xl p-8 sm:p-14 text-center overflow-hidden shadow-2xl shadow-black/80"
        >
          {/* Ambient Lighting */}
          <div className="absolute -top-24 -left-24 w-72 h-72 bg-[#8F8C72]/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -right-24 w-72 h-72 bg-[#2DD4BF]/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-2xl mx-auto space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#141F17] border border-[#8F8C72]/30 text-[#D9D5BD] text-xs font-semibold">
              <Compass className="w-3.5 h-3.5 text-[#2DD4BF]" />
              <span>Next-Gen Language Intelligence</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-extrabold text-[#F5F4EE] tracking-tight leading-tight">
              Ready to Speak <br />
              <span className="text-gradient-gold">
                Every Language?
              </span>
            </h2>

            <p className="text-[#C5C2B1] text-base sm:text-lg leading-relaxed">
              Break language barriers with intelligent AI-powered translation. Translate text instantly across multiple languages with authenticated script precision.
            </p>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={onStartTranslating}
                className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-[#D9D5BD] hover:bg-[#EDE9D5] text-[#080D0A] font-extrabold text-base shadow-xl shadow-[#D9D5BD]/15 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2.5"
              >
                <span>Start Translating Now</span>
                <ArrowRight className="w-5 h-5 text-[#080D0A]" />
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
