import React from 'react';
import { motion } from 'framer-motion';
import {
  BrainCircuit,
  Languages,
  Zap,
  Mic,
  Volume2,
  History,
  ShieldCheck,
  Sparkles
} from 'lucide-react';

export function FeaturesSection() {
  const features = [
    {
      icon: <BrainCircuit className="w-6 h-6 text-[#D9D5BD]" />,
      title: 'Dual-Engine AI Precision',
      description: 'Combines local LibreTranslate AI with dedicated Indic Neural intelligence, delivering private, script-verified, context-aware translations.'
    },
    {
      icon: <Languages className="w-6 h-6 text-[#2DD4BF]" />,
      title: '100+ Languages & Scripts',
      description: 'Seamlessly translate across Indian regional dialects (Hindi, Telugu, Tamil, Bengali, Kannada), European, Middle-Eastern, and Asian languages.'
    },
    {
      icon: <Zap className="w-6 h-6 text-[#D9D5BD]" />,
      title: 'Instant Low Latency',
      description: 'Lightning-fast execution with low-latency API architecture and optional live auto-translate as you type.'
    },
    {
      icon: <Mic className="w-6 h-6 text-[#2DD4BF]" />,
      title: 'Voice Dictation & STT',
      description: 'Dictate text naturally with integrated speech-to-text recognition powered by Web Speech API with real-time waveform visualization.'
    },
    {
      icon: <Volume2 className="w-6 h-6 text-[#D9D5BD]" />,
      title: 'Text-to-Speech Audio',
      description: 'Hear native pronunciations and lifelike voice synthesis for your translated content in any target language with variable speeds.'
    },
    {
      icon: <History className="w-6 h-6 text-[#8F8C72]" />,
      title: 'Local Privacy & History',
      description: 'Automatically saves your recent translations locally. Search, star favorites, and reload past translations with one click.'
    }
  ];

  return (
    <section id="features" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#141F17] border border-[#8F8C72]/25 text-[#D9D5BD] text-xs font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#2DD4BF]" />
            <span>Core Capabilities</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#F5F4EE] tracking-tight">
            Why Choose <span className="text-gradient-gold">AITranslator?</span>
          </h2>
          <p className="text-base text-[#A3A082] mt-3 leading-relaxed">
            Engineered for precision, speed, and elegance. Experience an authentic, quiet-luxury multilingual translation ecosystem.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              className="p-6 rounded-2xl bg-[#0D140F]/80 border border-[#8F8C72]/20 hover:border-[#D9D5BD]/40 backdrop-blur-xl shadow-xl hover:shadow-black/60 hover:-translate-y-1 transition-all group"
            >
              <div className="w-12 h-12 rounded-xl bg-[#141F17] border border-[#8F8C72]/30 flex items-center justify-center mb-5 group-hover:scale-110 group-hover:border-[#D9D5BD]/40 transition-all shadow-inner">
                {feature.icon}
              </div>
              <h3 className="text-lg font-bold text-[#F5F4EE] group-hover:text-[#D9D5BD] transition-colors">
                {feature.title}
              </h3>
              <p className="text-sm text-[#A3A082] mt-2 leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
