import React from 'react';
import { motion } from 'framer-motion';
import { Edit3, ArrowLeftRight, CheckCircle2, Sparkles } from 'lucide-react';

export function HowItWorksSection() {
  const steps = [
    {
      step: '01',
      title: 'Enter your text',
      description: 'Type, paste, upload a document, or speak using real-time voice dictation in any language.',
      icon: <Edit3 className="w-6 h-6 text-[#D9D5BD]" />
    },
    {
      step: '02',
      title: 'Select your languages',
      description: 'Let AI auto-detect your source language or pick from over 100+ global and regional languages.',
      icon: <ArrowLeftRight className="w-6 h-6 text-[#2DD4BF]" />
    },
    {
      step: '03',
      title: 'Translate instantly',
      description: 'Receive grammatically fluent, script-verified translation, listen to native pronunciation, or export.',
      icon: <CheckCircle2 className="w-6 h-6 text-[#D9D5BD]" />
    }
  ];

  return (
    <section className="py-20 relative bg-[#0A0F0B]/70 border-y border-[#8F8C72]/15">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#141F17] border border-[#8F8C72]/25 text-[#D9D5BD] text-xs font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#2DD4BF]" />
            <span>Effortless Flow</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#F5F4EE] tracking-tight">
            How It Works
          </h2>
          <p className="text-base text-[#A3A082] mt-2">
            Three simple steps to unlock authentic multilingual communication in seconds.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {steps.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.15 }}
              className="relative p-8 rounded-3xl bg-[#0D140F]/85 border border-[#8F8C72]/20 backdrop-blur-xl shadow-xl flex flex-col items-start group hover:border-[#D9D5BD]/40 hover:-translate-y-1 transition-all"
            >
              <div className="flex items-center justify-between w-full mb-6">
                <span className="text-3xl font-extrabold font-mono text-[#D9D5BD]">
                  {item.step}
                </span>
                <div className="w-12 h-12 rounded-2xl bg-[#141F17] border border-[#8F8C72]/30 flex items-center justify-center group-hover:scale-110 transition-transform shadow-inner">
                  {item.icon}
                </div>
              </div>
              <h3 className="text-xl font-bold text-[#F5F4EE] mb-2 group-hover:text-[#D9D5BD] transition-colors">
                {item.title}
              </h3>
              <p className="text-sm text-[#A3A082] leading-relaxed">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
