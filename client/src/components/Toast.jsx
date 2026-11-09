import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export function Toast({ toast, onClose }) {
  if (!toast) return null;

  const icons = {
    success: <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />,
    error: <AlertCircle className="w-5 h-5 text-rose-400 shrink-0" />,
    info: <Info className="w-5 h-5 text-[#2DD4BF] shrink-0" />
  };

  const borders = {
    success: 'border-emerald-500/30 bg-[#0D140F]/95 text-[#F5F4EE]',
    error: 'border-rose-500/30 bg-[#0D140F]/95 text-[#F5F4EE]',
    info: 'border-[#8F8C72]/30 bg-[#0D140F]/95 text-[#F5F4EE]'
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 pointer-events-none">
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 10, scale: 0.95 }}
          className={`pointer-events-auto flex items-center gap-3 px-4 py-3 rounded-2xl border backdrop-blur-xl shadow-2xl shadow-black/80 ${borders[toast.type || 'info']} max-w-md`}
        >
          {icons[toast.type || 'info']}
          <p className="text-sm font-medium pr-2">{toast.message}</p>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-[#8F8C72] hover:text-white hover:bg-[#141F17] transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
