import React from 'react';
import { Globe, Heart, ArrowUp, Sparkles, Cpu } from 'lucide-react';

export function Footer({ onOpenApiModal }) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToSection = (id) => {
    const elem = document.getElementById(id);
    if (elem) elem.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-[#060A07] border-t border-[#8F8C72]/20 pt-16 pb-12 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-[#8F8C72]/15">
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#16281E] via-[#8F8C72] to-[#D9D5BD] p-[1.5px] shadow-md shadow-black/50">
                <div className="w-full h-full bg-[#0D140F] rounded-[10px] flex items-center justify-center">
                  <Globe className="w-4 h-4 text-[#D9D5BD]" />
                </div>
              </div>
              <span className="text-xl font-extrabold text-[#F5F4EE] tracking-tight">
                AITranslator
              </span>
            </div>

            <p className="text-xs sm:text-sm text-[#A3A082] max-w-sm leading-relaxed">
              Every Language. One Intelligence. Break language barriers with private, script-verified artificial intelligence across 100+ languages in real time.
            </p>

            <div className="flex items-center gap-2 pt-1 text-xs text-[#8F8C72]">
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Dual Engine AI Active (LibreTranslate 5001 + Indic Neural Engine)</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-bold text-[#F5F4EE] uppercase tracking-wider mb-4">
              Navigation
            </h4>
            <ul className="space-y-2.5 text-xs text-[#A3A082]">
              <li>
                <button
                  onClick={() => scrollToSection('home')}
                  className="hover:text-[#D9D5BD] transition-colors"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('translator')}
                  className="hover:text-[#D9D5BD] transition-colors"
                >
                  Translate Workspace
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('languages')}
                  className="hover:text-[#D9D5BD] transition-colors"
                >
                  Supported Languages
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('history')}
                  className="hover:text-[#D9D5BD] transition-colors"
                >
                  Translation History
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('features')}
                  className="hover:text-[#D9D5BD] transition-colors"
                >
                  Why AITranslator
                </button>
              </li>
            </ul>
          </div>

          {/* System & Configuration */}
          <div>
            <h4 className="text-xs font-bold text-[#F5F4EE] uppercase tracking-wider mb-4">
              Configuration
            </h4>
            <ul className="space-y-2.5 text-xs text-[#A3A082]">
              <li>
                <button
                  onClick={onOpenApiModal}
                  className="hover:text-[#D9D5BD] transition-colors text-left flex items-center gap-1.5"
                >
                  <Cpu className="w-3.5 h-3.5 text-[#2DD4BF]" />
                  <span>Engine Diagnostics</span>
                </button>
              </li>
              <li className="text-[11px] text-[#8F8C72]">Port 5000: Express Backend</li>
              <li className="text-[11px] text-[#8F8C72]">Port 5001: LibreTranslate AI</li>
              <li className="text-[11px] text-[#8F8C72]">Port 5173: React Vite Client</li>
            </ul>
          </div>
        </div>

        {/* Bottom Credits & Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#8F8C72]">
          <p>© {new Date().getFullYear()} AITranslator. Every Language. One Intelligence.</p>
          <div className="flex items-center gap-4">
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1.5 text-xs text-[#D9D5BD] hover:text-[#F4F1E6] transition-colors"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
