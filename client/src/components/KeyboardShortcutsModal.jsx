import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Command, Sparkles, Keyboard } from 'lucide-react';

export function KeyboardShortcutsModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  const shortcuts = [
    {
      action: 'Translate Now',
      keys: ['Ctrl', 'Enter'],
      description: 'Trigger immediate translation of the input text'
    },
    {
      action: 'Open Language Selector',
      keys: ['Ctrl', 'K'],
      description: 'Search and switch source or target languages'
    },
    {
      action: 'Swap Languages',
      keys: ['Ctrl', 'Shift', 'S'],
      description: 'Swap source and target languages instantly'
    },
    {
      action: 'Voice Dictation (Mic)',
      keys: ['Ctrl', 'M'],
      description: 'Toggle speech-to-text microphone input'
    },
    {
      action: 'Copy Translation',
      keys: ['Ctrl', 'Shift', 'C'],
      description: 'Copy the translated result to your clipboard'
    },
    {
      action: 'Close Modal / Dropdown',
      keys: ['Esc'],
      description: 'Dismiss any open dialog or popup window'
    }
  ];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/75 backdrop-blur-md"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="relative w-full max-w-lg bg-[#0F1426] border border-purple-500/25 rounded-3xl shadow-2xl p-6 z-10 space-y-5"
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-purple-500/15 pb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400">
                <Keyboard className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <span>Keyboard Shortcuts</span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-500/20 text-purple-300">
                    Pro Tips
                  </span>
                </h3>
                <p className="text-xs text-slate-400">Quick shortcuts to navigate AITranslator</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Shortcuts List */}
          <div className="space-y-3 py-1">
            {shortcuts.map((sc, i) => (
              <div
                key={i}
                className="flex items-center justify-between p-3 rounded-2xl bg-slate-900/60 border border-purple-500/10 hover:border-purple-500/30 transition-all"
              >
                <div>
                  <div className="text-sm font-semibold text-slate-200">{sc.action}</div>
                  <div className="text-xs text-slate-400 mt-0.5">{sc.description}</div>
                </div>

                <div className="flex items-center gap-1.5 shrink-0 ml-4">
                  {sc.keys.map((k, ki) => (
                    <React.Fragment key={ki}>
                      <kbd className="px-2.5 py-1 rounded-xl bg-slate-800 text-slate-200 border border-purple-500/20 font-mono text-xs font-semibold shadow-inner">
                        {k}
                      </kbd>
                      {ki < sc.keys.length - 1 && (
                        <span className="text-slate-500 text-xs font-mono">+</span>
                      )}
                    </React.Fragment>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Footer */}
          <div className="pt-2 border-t border-purple-500/15 flex items-center justify-between text-xs text-slate-400">
            <span>Press <kbd className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700 font-mono">?</kbd> anytime to open this modal</span>
            <button
              onClick={onClose}
              className="px-4 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-medium text-xs transition-colors"
            >
              Got it
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

