import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Globe,
  Sparkles,
  Sun,
  Moon,
  Menu,
  X,
  History,
  Languages,
  Info,
  Cpu,
  ArrowRight
} from 'lucide-react';

export function Navbar({
  isDark,
  toggleTheme,
  onOpenApiModal,
  onOpenHistory,
  onOpenLanguages,
  serverStatus
}) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'bg-[#080D0A]/90 backdrop-blur-xl border-b border-[#8F8C72]/20 py-3 shadow-2xl shadow-black/60'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Left: Brand Logo (Quiet Luxury Style) */}
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('home');
            }}
            className="flex items-center gap-3 group focus:outline-none"
          >
            <div className="relative">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#16281E] via-[#8F8C72] to-[#D9D5BD] p-[1.5px] shadow-lg shadow-black/40 group-hover:shadow-[#8F8C72]/30 transition-all duration-300">
                <div className="w-full h-full bg-[#0D140F] rounded-[14px] flex items-center justify-center relative overflow-hidden">
                  <Globe className="w-5 h-5 text-[#D9D5BD] group-hover:scale-110 group-hover:text-[#F4F1E6] transition-transform duration-300" />
                  <div className="absolute inset-0 bg-gradient-to-tr from-[#8F8C72]/20 to-transparent pointer-events-none" />
                </div>
              </div>
              <span className="w-2 h-2 rounded-full bg-[#2DD4BF] absolute -top-0.5 -right-0.5 border border-[#080D0A]" />
            </div>

            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xl font-extrabold tracking-tight text-[#F5F4EE] group-hover:text-[#D9D5BD] transition-colors">
                  AITranslator
                </span>
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-[#182C20] text-[#D9D5BD] border border-[#8F8C72]/30 uppercase tracking-wider">
                  AI
                </span>
              </div>
              <p className="text-[10px] text-[#A3A082] tracking-wide hidden sm:block">
                Every Language. One Intelligence.
              </p>
            </div>
          </a>

          {/* Center: Desktop Navigation Links (Tactile Pill) */}
          <nav className="hidden md:flex items-center gap-1 bg-[#0D140F]/85 border border-[#8F8C72]/25 rounded-full px-4 py-1.5 backdrop-blur-md shadow-inner shadow-black/50">
            <button
              onClick={() => scrollToSection('home')}
              className="px-3.5 py-1.5 text-xs font-semibold text-[#C5C2B1] hover:text-[#F5F4EE] hover:bg-[#18261E] rounded-full transition-all"
            >
              Home
            </button>
            <button
              onClick={() => scrollToSection('translator')}
              className="px-3.5 py-1.5 text-xs font-semibold text-[#D9D5BD] hover:text-white hover:bg-[#18261E] rounded-full transition-all flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#2DD4BF]" />
              <span>Translate</span>
            </button>
            <button
              onClick={() => scrollToSection('languages')}
              className="px-3.5 py-1.5 text-xs font-semibold text-[#C5C2B1] hover:text-[#F5F4EE] hover:bg-[#18261E] rounded-full transition-all"
            >
              Languages
            </button>
            <button
              onClick={() => scrollToSection('history')}
              className="px-3.5 py-1.5 text-xs font-semibold text-[#C5C2B1] hover:text-[#F5F4EE] hover:bg-[#18261E] rounded-full transition-all flex items-center gap-1.5"
            >
              <History className="w-3.5 h-3.5 text-[#8F8C72]" />
              <span>History</span>
            </button>
            <button
              onClick={() => scrollToSection('features')}
              className="px-3.5 py-1.5 text-xs font-semibold text-[#C5C2B1] hover:text-[#F5F4EE] hover:bg-[#18261E] rounded-full transition-all"
            >
              About
            </button>
          </nav>

          {/* Right: Actions */}
          <div className="flex items-center gap-2.5">
            {/* Server / Engine Status Badge */}
            <button
              onClick={onOpenApiModal}
              title="Translation Engine Status"
              className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-xl border border-[#8F8C72]/25 bg-[#0D140F]/80 hover:bg-[#18261E] text-xs text-[#C5C2B1] transition-all group shadow-sm"
            >
              <div className="relative">
                <span className={`w-2 h-2 rounded-full block ${serverStatus?.libreTranslate?.online ? 'bg-emerald-400' : 'bg-emerald-400'}`} />
                <span className="w-2 h-2 rounded-full bg-emerald-400 absolute inset-0 animate-ping opacity-75" />
              </div>
              <span className="font-medium text-[11px] group-hover:text-[#D9D5BD]">
                {serverStatus?.libreTranslate?.online ? 'Dual AI Ready' : 'Dual AI Ready'}
              </span>
              <Cpu className="w-3 h-3 text-[#D9D5BD] ml-0.5" />
            </button>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className="p-2 rounded-xl border border-[#8F8C72]/25 bg-[#0D140F]/80 hover:bg-[#18261E] text-[#C5C2B1] hover:text-white transition-all shadow-sm"
            >
              {isDark ? <Sun className="w-4 h-4 text-[#D9D5BD]" /> : <Moon className="w-4 h-4 text-[#8F8C72]" />}
            </button>

            {/* CTA Get Started Button */}
            <button
              onClick={() => scrollToSection('translator')}
              className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#D9D5BD] hover:bg-[#EDE9D5] text-[#080D0A] text-xs font-bold tracking-wide shadow-md shadow-[#D9D5BD]/15 hover:shadow-[#D9D5BD]/30 hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              <span>Get Started</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#080D0A]" />
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-xl border border-[#8F8C72]/25 bg-[#0D140F]/80 text-[#C5C2B1] hover:text-white"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-[#0A0E0B]/98 border-b border-[#8F8C72]/20 backdrop-blur-2xl px-6 py-5 space-y-3"
          >
            <div className="flex flex-col space-y-2">
              <button
                onClick={() => scrollToSection('home')}
                className="w-full text-left px-3 py-2 text-sm font-medium text-[#C5C2B1] hover:bg-[#18261E] rounded-lg"
              >
                Home
              </button>
              <button
                onClick={() => scrollToSection('translator')}
                className="w-full text-left px-3 py-2 text-sm font-medium text-[#D9D5BD] hover:bg-[#18261E] rounded-lg flex items-center justify-between"
              >
                <span>Translate Workspace</span>
                <Sparkles className="w-4 h-4 text-[#2DD4BF]" />
              </button>
              <button
                onClick={() => scrollToSection('languages')}
                className="w-full text-left px-3 py-2 text-sm font-medium text-[#C5C2B1] hover:bg-[#18261E] rounded-lg"
              >
                Popular Languages
              </button>
              <button
                onClick={() => scrollToSection('history')}
                className="w-full text-left px-3 py-2 text-sm font-medium text-[#C5C2B1] hover:bg-[#18261E] rounded-lg flex items-center justify-between"
              >
                <span>Translation History</span>
                <History className="w-4 h-4 text-[#8F8C72]" />
              </button>
              <button
                onClick={() => scrollToSection('features')}
                className="w-full text-left px-3 py-2 text-sm font-medium text-[#C5C2B1] hover:bg-[#18261E] rounded-lg"
              >
                Why Choose Us
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenApiModal();
                }}
                className="w-full text-left px-3 py-2 text-sm font-medium text-[#C5C2B1] hover:bg-[#18261E] rounded-lg flex items-center justify-between"
              >
                <span>Engine Status</span>
                <Cpu className="w-4 h-4 text-[#D9D5BD]" />
              </button>
            </div>

            <div className="pt-2">
              <button
                onClick={() => scrollToSection('translator')}
                className="w-full py-2.5 rounded-xl bg-[#D9D5BD] text-[#080D0A] text-xs font-bold shadow-lg shadow-black/40 flex items-center justify-center gap-2"
              >
                <span>Start Translating Now</span>
                <ArrowRight className="w-4 h-4 text-[#080D0A]" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
