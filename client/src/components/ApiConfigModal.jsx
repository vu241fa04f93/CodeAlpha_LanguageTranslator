import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Server, CheckCircle2, AlertTriangle, RefreshCw, Copy, Check, ExternalLink, Cpu } from 'lucide-react';
import { checkServerHealth } from '../services/api';

export function ApiConfigModal({ isOpen, onClose }) {
  const [health, setHealth] = useState(null);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const fetchHealth = async () => {
    setLoading(true);
    try {
      const data = await checkServerHealth();
      setHealth(data);
    } catch (err) {
      setHealth({ success: false, status: 'offline', message: err.message });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchHealth();
    }
  }, [isOpen]);

  const copyConfigSnippet = () => {
    navigator.clipboard.writeText('LIBRETRANSLATE_URL=http://127.0.0.1:5001\nPORT=5000');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!isOpen) return null;

  const isEngineOnline = health?.libreTranslate?.online;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/80 backdrop-blur-md"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="relative w-full max-w-xl bg-[#0D140F] border border-[#8F8C72]/30 rounded-3xl shadow-2xl p-6 z-10 space-y-5"
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-[#8F8C72]/15 pb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#141F17] border border-[#8F8C72]/30 flex items-center justify-center text-[#D9D5BD]">
                <Cpu className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-[#F5F4EE]">Translation Engine Diagnostics</h3>
                <p className="text-xs text-[#A3A082]">Dual AI Architecture: Local LibreTranslate + Indic Neural Engine</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-[#8F8C72] hover:text-white hover:bg-[#141F17]"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Current Status Card */}
          <div className="p-4 rounded-xl bg-[#080D0A]/85 border border-[#8F8C72]/20 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#8F8C72]">Local Engine Health</span>
              <button
                onClick={fetchHealth}
                disabled={loading}
                className="flex items-center gap-1.5 text-xs text-[#D9D5BD] hover:text-[#F4F1E6] disabled:opacity-50"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
                <span>Recheck Status</span>
              </button>
            </div>

            <div className="flex items-center gap-3">
              {isEngineOnline ? (
                <div className="w-3 h-3 rounded-full bg-emerald-400 shadow-sm shadow-emerald-400 animate-pulse" />
              ) : (
                <div className="w-3 h-3 rounded-full bg-rose-500" />
              )}
              <div>
                <div className="text-sm font-semibold text-[#F5F4EE]">
                  {isEngineOnline ? 'LibreTranslate Online & Connected' : 'LibreTranslate Offline'}
                </div>
                <div className="text-xs text-[#A3A082] mt-0.5">
                  Instance URL: <span className="text-[#D9D5BD] font-medium">{health?.libreTranslate?.url || 'http://127.0.0.1:5001'}</span>
                </div>
              </div>
            </div>

            {isEngineOnline ? (
              <div className="flex items-center gap-2 text-xs text-emerald-400 bg-[#142318] border border-emerald-500/30 px-3 py-2 rounded-lg">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>Local AI model active with {health?.libreTranslate?.languagesLoaded || 50} languages loaded. Zero API keys required!</span>
              </div>
            ) : (
              <div className="flex items-center gap-2 text-xs text-amber-300 bg-amber-950/40 border border-amber-500/30 px-3 py-2 rounded-lg">
                <AlertTriangle className="w-4 h-4 shrink-0" />
                <span>Unable to reach LibreTranslate on port 5001. Please make sure your local LibreTranslate server is running.</span>
              </div>
            )}
          </div>

          {/* Configuration Details */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-[#F5F4EE]">Configuration in <code className="text-[#D9D5BD]">server/.env</code>:</h4>
            <div className="relative p-3.5 rounded-xl bg-[#080D0A] border border-[#8F8C72]/20 font-mono text-xs text-[#C5C2B1] space-y-1">
              <div>PORT=5000</div>
              <div>LIBRETRANSLATE_URL=http://127.0.0.1:5001</div>
              <div>NODE_ENV=development</div>

              <button
                onClick={copyConfigSnippet}
                className="absolute right-3 top-3 p-1.5 rounded-lg bg-[#141F17] hover:bg-[#1C2C21] text-[#A3A082] hover:text-white transition-colors"
                title="Copy config"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>

          {/* How to start local engine info */}
          <div className="p-3.5 rounded-xl bg-[#141F17]/70 border border-[#8F8C72]/20 text-xs text-[#A3A082] space-y-1.5">
            <div className="font-semibold text-[#D9D5BD] flex items-center gap-1.5">
              <span>Quick start LibreTranslate on Port 5001:</span>
            </div>
            <p className="font-mono bg-[#080D0A] p-2 rounded text-[#F5F4EE] select-all">
              libretranslate --port 5001
            </p>
            <p className="text-[11px] text-[#8F8C72]">
              Telugu, Tamil, and Hindi translations are natively handled by the Indic Neural Engine even if LibreTranslate is restarting.
            </p>
          </div>

          <div className="flex justify-end pt-2 border-t border-[#8F8C72]/15">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-[#D9D5BD] hover:bg-[#EDE9D5] text-[#080D0A] text-xs font-bold rounded-xl transition-colors"
            >
              Close
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
