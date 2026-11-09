import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import {
  ArrowLeftRight,
  Copy,
  Check,
  Volume2,
  VolumeX,
  Mic,
  MicOff,
  Trash2,
  Sparkles,
  Clipboard,
  ChevronDown,
  RefreshCw,
  Share2,
  AlertCircle,
  Key,
  Upload,
  Download,
  FileText,
  Cpu
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { translateText } from '../services/api';
import { ttsService, sttService } from '../services/speechService';
import { getLanguageByCode, popularLanguages } from '../data/languages';

export function TranslationWorkspace({
  onSaveHistory,
  onShowToast,
  onOpenLanguageModal,
  onOpenApiModal,
  initialInputText = '',
  initialSourceLang = 'en',
  initialTargetLang = 'hi'
}) {
  const [inputText, setInputText] = useState(initialInputText);
  const [translatedText, setTranslatedText] = useState('');
  const [sourceLang, setSourceLang] = useState(initialSourceLang);
  const [targetLang, setTargetLang] = useState(initialTargetLang);
  const [detectedLang, setDetectedLang] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [autoTranslate, setAutoTranslate] = useState(false);
  const [speechRate, setSpeechRate] = useState(0.95);
  const [translationEngine, setTranslationEngine] = useState('');
  const [lastError, setLastError] = useState(null);
  const [swapDegree, setSwapDegree] = useState(0);

  const debounceTimerRef = useRef(null);
  const inputRef = useRef(null);
  const fileInputRef = useRef(null);

  // Global keyboard shortcuts
  useEffect(() => {
    const handleGlobalShortcuts = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'S' || e.key === 's')) {
        e.preventDefault();
        handleSwapLanguages();
      } else if ((e.ctrlKey || e.metaKey) && (e.key === 'k' || e.key === 'K')) {
        e.preventDefault();
        onOpenLanguageModal({ isSource: false, currentCode: targetLang });
      } else if ((e.ctrlKey || e.metaKey) && !e.shiftKey && (e.key === 'm' || e.key === 'M') && e.target.tagName !== 'INPUT' && e.target.tagName !== 'TEXTAREA') {
        e.preventDefault();
        handleToggleMic();
      }
    };
    window.addEventListener('keydown', handleGlobalShortcuts);
    return () => window.removeEventListener('keydown', handleGlobalShortcuts);
  }, [targetLang, sourceLang, translatedText, inputText, isListening]);

  // Sync initial props if reloaded from history
  useEffect(() => {
    if (initialInputText) setInputText(initialInputText);
  }, [initialInputText]);

  useEffect(() => {
    if (initialSourceLang) setSourceLang(initialSourceLang);
  }, [initialSourceLang]);

  useEffect(() => {
    if (initialTargetLang) setTargetLang(initialTargetLang);
  }, [initialTargetLang]);

  // Execute translation
  const handleTranslate = async (textToTranslate = inputText) => {
    const text = textToTranslate?.trim();
    if (!text) {
      setTranslatedText('');
      return;
    }

    setIsLoading(true);
    setLastError(null);

    try {
      const response = await translateText({
        text,
        sourceLanguage: sourceLang,
        targetLanguage: targetLang
      });

      if (response.success) {
        setTranslatedText(response.translatedText);
        setDetectedLang(response.detectedSourceLanguage);
        setTranslationEngine(response.provider || 'LibreTranslate');

        // Save to LocalStorage History
        onSaveHistory({
          sourceText: text,
          translatedText: response.translatedText,
          sourceLang: sourceLang === 'auto' ? (response.detectedSourceLanguage || 'auto') : sourceLang,
          targetLang: targetLang,
          detectedLang: response.detectedSourceLanguage
        });
      }
    } catch (err) {
      console.error('Translation failed:', err);
      setLastError(err);
      onShowToast({
        type: 'error',
        message: err.message || 'Translation failed. Please check backend.'
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Debounced auto-translate on typing
  useEffect(() => {
    if (!autoTranslate) return;
    if (debounceTimerRef.current) clearTimeout(debounceTimerRef.current);

    if (inputText.trim().length > 0) {
      debounceTimerRef.current = setTimeout(() => {
        handleTranslate(inputText);
      }, 750);
    } else {
      setTranslatedText('');
    }

    return () => {
      if (debounceTimerRef.current) clearTimeout(debounceTimerRef.current);
    };
  }, [inputText, sourceLang, targetLang, autoTranslate]);

  // Swap languages with tactile 3D rotation
  const handleSwapLanguages = () => {
    setSwapDegree(prev => prev + 180);
    const newSource = targetLang;
    const newTarget = sourceLang === 'auto' ? (detectedLang || 'en') : sourceLang;

    setSourceLang(newSource);
    setTargetLang(newTarget);

    if (translatedText) {
      setInputText(translatedText);
      setTranslatedText(inputText);
    }
  };

  // Copy translated text
  const handleCopy = () => {
    if (!translatedText) return;
    navigator.clipboard.writeText(translatedText);
    setIsCopied(true);
    onShowToast({ type: 'success', message: 'Translated text copied to clipboard!' });
    confetti({
      particleCount: 25,
      spread: 60,
      origin: { y: 0.8 },
      colors: ['#D9D5BD', '#8F8C72', '#2DD4BF']
    });
    setTimeout(() => setIsCopied(false), 2000);
  };

  // Text to Speech
  const handleSpeak = (textToSpeak, langCode) => {
    if (!textToSpeak) return;

    if (isSpeaking) {
      ttsService.stop();
      setIsSpeaking(false);
      return;
    }

    setIsSpeaking(true);
    ttsService.speak(textToSpeak, langCode, {
      rate: speechRate,
      onEnd: () => setIsSpeaking(false),
      onError: (err) => {
        setIsSpeaking(false);
        onShowToast({ type: 'error', message: 'Speech playback failed for this language' });
      }
    });
  };

  // Speech to Text (Mic Dictation)
  const handleToggleMic = () => {
    if (isListening) {
      sttService.stop();
      setIsListening(false);
      return;
    }

    if (!sttService.isSupported()) {
      onShowToast({
        type: 'error',
        message: 'Speech recognition is not supported in this browser. Please use Chrome or Edge.'
      });
      return;
    }

    setIsListening(true);
    sttService.start(sourceLang === 'auto' ? 'en' : sourceLang, {
      onResult: (transcript, isFinal) => {
        setInputText(prev => {
          const trimmed = prev.trim();
          return trimmed ? `${trimmed} ${transcript}` : transcript;
        });
      },
      onError: (err) => {
        setIsListening(false);
        if (err !== 'no-speech') {
          onShowToast({ type: 'error', message: `Mic error: ${err}` });
        }
      },
      onEnd: () => {
        setIsListening(false);
      }
    });
  };

  // Document Upload
  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 200 * 1024) {
      onShowToast({ type: 'error', message: 'File is too large. Max size is 200KB.' });
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result;
      if (typeof content === 'string') {
        setInputText(content.slice(0, 5000));
        onShowToast({ type: 'success', message: `Loaded document: ${file.name}` });
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  // Download translated text
  const handleDownload = () => {
    if (!translatedText) return;
    const blob = new Blob([translatedText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `AITranslator_${targetLang}_${Date.now()}.txt`;
    link.click();
    URL.revokeObjectURL(url);
    onShowToast({ type: 'success', message: 'Translation downloaded as .txt' });
  };

  // Native Web Share API
  const handleShare = async () => {
    if (!translatedText) return;
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'AITranslator Result',
          text: translatedText
        });
      } catch (err) {
        // User cancelled share
      }
    } else {
      handleCopy();
    }
  };

  // Paste from clipboard
  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      if (text) {
        setInputText(prev => prev + text);
        onShowToast({ type: 'info', message: 'Pasted text from clipboard' });
      }
    } catch (e) {
      onShowToast({ type: 'error', message: 'Unable to access clipboard' });
    }
  };

  // Clear input
  const handleClearInput = () => {
    setInputText('');
    setDetectedLang(null);
    if (inputRef.current) inputRef.current.focus();
  };

  // Clear output
  const handleClearOutput = () => {
    setTranslatedText('');
  };

  // Keydown shortcut: Ctrl + Enter / Cmd + Enter
  const handleKeyDown = (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
      e.preventDefault();
      handleTranslate();
    }
  };

  // Load sample phrases
  const loadSample = (sample) => {
    setInputText(sample);
    if (inputRef.current) inputRef.current.focus();
  };

  const currentSource = getLanguageByCode(sourceLang);
  const currentTarget = getLanguageByCode(targetLang);
  const currentDetected = detectedLang ? getLanguageByCode(detectedLang) : null;

  const wordCount = inputText.trim() ? inputText.trim().split(/\s+/).filter(Boolean).length : 0;

  return (
    <section id="translator" className="py-12 relative">
      {/* Hidden file input for document translation */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileUpload}
        accept=".txt,.md,.json,.csv"
        className="hidden"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title - Conceptzilla Style */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#141F17] border border-[#8F8C72]/25 text-[#D9D5BD] text-xs font-semibold mb-2.5">
            <Sparkles className="w-3.5 h-3.5 text-[#2DD4BF]" />
            <span>Workspace</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#F5F4EE] tracking-tight">
            Intelligent Translation Workspace
          </h2>
          <p className="text-sm text-[#A3A082] mt-1 max-w-xl mx-auto">
            Script-verified translation across 100+ languages with neural contextual understanding, voice input, and audio synthesis.
          </p>
        </div>

        {/* Translation Card Container */}
        <div className="relative rounded-3xl bg-[#0D140F]/90 border border-[#8F8C72]/25 backdrop-blur-2xl shadow-2xl shadow-black/70 p-4 sm:p-6 lg:p-8">
          {/* Top Bar: Controls & Quick Pills */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-[#8F8C72]/20">
            {/* Source Language Header Controls */}
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs font-semibold text-[#8F8C72] uppercase tracking-wider mr-1">
                From:
              </span>

              {/* Auto Detect Button */}
              <button
                onClick={() => setSourceLang('auto')}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 ${
                  sourceLang === 'auto'
                    ? 'bg-[#D9D5BD] text-[#080D0A] shadow-md shadow-[#D9D5BD]/15 font-bold'
                    : 'bg-[#141F17]/80 text-[#C5C2B1] hover:text-white hover:bg-[#1A281E] border border-[#8F8C72]/20'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5 text-[#2DD4BF]" />
                <span>Auto Detect</span>
              </button>

              {/* Popular Source Pills */}
              {popularLanguages.slice(0, 4).map((lang) => (
                <button
                  key={`src-${lang.code}`}
                  onClick={() => setSourceLang(lang.code)}
                  className={`hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
                    sourceLang === lang.code
                      ? 'bg-[#D9D5BD] text-[#080D0A] font-bold shadow-md shadow-[#D9D5BD]/15'
                      : 'bg-[#141F17]/70 text-[#C5C2B1] hover:text-white hover:bg-[#1A281E] border border-[#8F8C72]/20'
                  }`}
                >
                  <span>{lang.flag}</span>
                  <span>{lang.name}</span>
                </button>
              ))}

              {/* More Languages Dropdown Trigger */}
              <button
                onClick={() => onOpenLanguageModal({ isSource: true, currentCode: sourceLang })}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium bg-[#141F17]/80 hover:bg-[#1C2C21] border border-[#8F8C72]/30 text-[#D9D5BD] hover:text-white transition-all"
              >
                <span>{sourceLang === 'auto' ? 'Change' : currentSource?.name || 'All'}</span>
                <ChevronDown className="w-3.5 h-3.5 text-[#8F8C72]" />
              </button>
            </div>

            {/* Center Swap Button with Vedroxy 3D Spring Flip */}
            <div className="flex items-center">
              <motion.button
                onClick={handleSwapLanguages}
                animate={{ rotate: swapDegree }}
                transition={{ type: 'spring', stiffness: 260, damping: 20 }}
                title="Swap languages (Ctrl+Shift+S)"
                className="w-10 h-10 rounded-2xl bg-[#141F17] border border-[#8F8C72]/35 hover:border-[#D9D5BD]/50 flex items-center justify-center text-[#D9D5BD] hover:text-[#F4F1E6] hover:scale-105 active:scale-95 transition-all shadow-md shadow-black/50 group"
              >
                <ArrowLeftRight className="w-4 h-4 text-[#D9D5BD] group-hover:text-white transition-colors" />
              </motion.button>
            </div>

            {/* Target Language Header Controls */}
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs font-semibold text-[#8F8C72] uppercase tracking-wider mr-1">
                To:
              </span>

              {/* Popular Target Pills */}
              {popularLanguages.slice(0, 4).map((lang) => (
                <button
                  key={`tgt-${lang.code}`}
                  onClick={() => setTargetLang(lang.code)}
                  className={`hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
                    targetLang === lang.code
                      ? 'bg-[#D9D5BD] text-[#080D0A] font-bold shadow-md shadow-[#D9D5BD]/15'
                      : 'bg-[#141F17]/70 text-[#C5C2B1] hover:text-white hover:bg-[#1A281E] border border-[#8F8C72]/20'
                  }`}
                >
                  <span>{lang.flag}</span>
                  <span>{lang.name}</span>
                </button>
              ))}

              {/* More Languages Dropdown Trigger */}
              <button
                onClick={() => onOpenLanguageModal({ isSource: false, currentCode: targetLang })}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium bg-[#141F17]/80 hover:bg-[#1C2C21] border border-[#8F8C72]/30 text-[#D9D5BD] hover:text-white transition-all"
              >
                <span>{currentTarget?.flag} {currentTarget?.name || 'Select'}</span>
                <ChevronDown className="w-3.5 h-3.5 text-[#8F8C72]" />
              </button>
            </div>
          </div>

          {/* TWO MAIN CARDS: SIDE BY SIDE */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-6">
            {/* ================= LEFT CARD: INPUT ================= */}
            <div className="relative flex flex-col rounded-2xl bg-[#080D0A]/85 border border-[#8F8C72]/25 shadow-inner p-5 min-h-[350px] focus-within:border-[#D9D5BD]/40 transition-all">
              {/* Card Header Info */}
              <div className="flex items-center justify-between pb-3 border-b border-[#8F8C72]/15">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-[#F5F4EE]">
                    {sourceLang === 'auto' ? 'Auto Detect' : currentSource?.name}
                  </span>
                  {sourceLang === 'auto' && detectedLang && (
                    <span className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-[#182C20] text-[#D9D5BD] border border-[#8F8C72]/30">
                      Detected: {currentDetected?.name || detectedLang}
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-1 text-xs text-[#A3A082]">
                  {/* File Upload Button */}
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    title="Upload file (.txt, .md, .json, .csv)"
                    className="p-1.5 rounded-lg hover:text-[#D9D5BD] hover:bg-[#141F17] transition-colors flex items-center gap-1"
                  >
                    <Upload className="w-4 h-4" />
                  </button>

                  <button
                    onClick={handlePaste}
                    title="Paste from clipboard"
                    className="p-1.5 rounded-lg hover:text-white hover:bg-[#141F17] transition-colors"
                  >
                    <Clipboard className="w-4 h-4" />
                  </button>

                  {inputText && (
                    <button
                      onClick={handleClearInput}
                      title="Clear text"
                      className="p-1.5 rounded-lg text-[#8F8C72] hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>

              {/* Textarea */}
              <div className="flex-1 py-3 flex flex-col">
                <textarea
                  ref={inputRef}
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Type, paste, speak, or upload a document (.txt, .md, .json)..."
                  maxLength={5000}
                  className="w-full flex-1 bg-transparent text-[#F5F4EE] placeholder-[#6E7162] text-base sm:text-lg resize-none focus:outline-none leading-relaxed"
                />
              </div>

              {/* Active Voice Waveform when listening */}
              {isListening && (
                <div className="flex items-center gap-3 p-2.5 mb-2 rounded-xl bg-[#142318] border border-[#2DD4BF]/40">
                  <div className="flex items-center gap-1 h-6">
                    <span className="w-1 bg-[#2DD4BF] rounded-full wave-bar-1" />
                    <span className="w-1 bg-[#D9D5BD] rounded-full wave-bar-2" />
                    <span className="w-1 bg-[#8F8C72] rounded-full wave-bar-3" />
                    <span className="w-1 bg-[#2DD4BF] rounded-full wave-bar-4" />
                    <span className="w-1 bg-[#D9D5BD] rounded-full wave-bar-5" />
                  </div>
                  <span className="text-xs font-semibold text-[#D9D5BD] animate-pulse">
                    Listening to speech... Speak clearly.
                  </span>
                </div>
              )}

              {/* Input Card Footer Actions */}
              <div className="flex items-center justify-between pt-3 border-t border-[#8F8C72]/15">
                <div className="flex items-center gap-2">
                  {/* Microphone STT Button */}
                  <button
                    onClick={handleToggleMic}
                    title={isListening ? 'Stop listening' : 'Speak to input text'}
                    className={`p-2.5 rounded-xl border transition-all ${
                      isListening
                        ? 'bg-[#2DD4BF] border-[#2DD4BF] text-[#080D0A] shadow-lg shadow-[#2DD4BF]/30 font-bold'
                        : 'bg-[#141F17] hover:bg-[#1C2C21] border-[#8F8C72]/25 text-[#C5C2B1] hover:text-white'
                    }`}
                  >
                    {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                  </button>

                  {/* Text-to-Speech for Source */}
                  {inputText && (
                    <button
                      onClick={() => handleSpeak(inputText, sourceLang === 'auto' ? (detectedLang || 'en') : sourceLang)}
                      title="Listen to source pronunciation"
                      className="p-2.5 rounded-xl bg-[#141F17] hover:bg-[#1C2C21] border border-[#8F8C72]/25 text-[#C5C2B1] hover:text-white transition-all"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                  )}
                </div>

                {/* Word & Character Counter */}
                <div className="text-xs font-mono text-[#8F8C72] flex items-center gap-2">
                  <span>{wordCount} words</span>
                  <span className="text-[#55584A]">•</span>
                  <span className={inputText.length > 4500 ? 'text-rose-400 font-bold' : ''}>
                    {inputText.length.toLocaleString()}
                  </span>
                  <span className="text-[#55584A]"> / 5,000</span>
                </div>
              </div>

              {/* Quick Sample Suggestions if empty */}
              {!inputText && (
                <div className="pt-3 flex items-center gap-2 flex-wrap">
                  <span className="text-[11px] text-[#8F8C72] font-medium">Try:</span>
                  <button
                    onClick={() => loadSample('Hello, welcome to AITranslator! How can I assist you today?')}
                    className="text-[11px] px-2.5 py-1 rounded-lg bg-[#141F17] hover:bg-[#1C2C21] text-[#C5C2B1] hover:text-[#D9D5BD] border border-[#8F8C72]/20 transition-colors"
                  >
                    "Welcome greeting"
                  </button>
                  <button
                    onClick={() => loadSample('Artificial intelligence is transforming real-time multilingual communication.')}
                    className="text-[11px] px-2.5 py-1 rounded-lg bg-[#141F17] hover:bg-[#1C2C21] text-[#C5C2B1] hover:text-[#D9D5BD] border border-[#8F8C72]/20 transition-colors"
                  >
                    "AI Technology"
                  </button>
                </div>
              )}
            </div>

            {/* ================= RIGHT CARD: OUTPUT ================= */}
            <div className="relative flex flex-col rounded-2xl bg-[#080D0A]/85 border border-[#8F8C72]/25 shadow-inner p-5 min-h-[350px] transition-all">
              {/* Card Header Info */}
              <div className="flex items-center justify-between pb-3 border-b border-[#8F8C72]/15">
                <div className="flex items-center gap-2">
                  <span className="text-base">{currentTarget?.flag}</span>
                  <span className="text-xs font-bold text-[#F5F4EE]">
                    {currentTarget?.name} ({currentTarget?.nativeName})
                  </span>
                </div>

                <div className="flex items-center gap-1.5 text-xs">
                  {translatedText && (
                    <>
                      {/* Download translated file */}
                      <button
                        onClick={handleDownload}
                        title="Download translation as .txt"
                        className="p-1.5 rounded-lg text-[#8F8C72] hover:text-[#D9D5BD] hover:bg-[#141F17] transition-colors"
                      >
                        <Download className="w-4 h-4" />
                      </button>

                      {/* Share button */}
                      <button
                        onClick={handleShare}
                        title="Share translation"
                        className="p-1.5 rounded-lg text-[#8F8C72] hover:text-[#D9D5BD] hover:bg-[#141F17] transition-colors"
                      >
                        <Share2 className="w-4 h-4" />
                      </button>

                      {/* Copy button */}
                      <button
                        onClick={handleCopy}
                        title="Copy translated text"
                        className="p-1.5 rounded-lg text-[#8F8C72] hover:text-white hover:bg-[#141F17] transition-colors flex items-center gap-1"
                      >
                        {isCopied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                      </button>

                      {/* Clear result */}
                      <button
                        onClick={handleClearOutput}
                        title="Clear translation"
                        className="p-1.5 rounded-lg text-[#8F8C72] hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </>
                  )}
                </div>
              </div>

              {/* Output Display Body */}
              <div className="flex-1 py-3 flex flex-col justify-between">
                {isLoading ? (
                  <div className="flex-1 flex flex-col items-center justify-center space-y-4 py-8">
                    <div className="relative">
                      <div className="w-12 h-12 rounded-2xl bg-[#182C20] border border-[#8F8C72]/40 animate-spin flex items-center justify-center p-[2px]">
                        <div className="w-full h-full bg-[#080D0A] rounded-[14px]" />
                      </div>
                      <Sparkles className="w-5 h-5 text-[#2DD4BF] absolute inset-0 m-auto animate-pulse" />
                    </div>
                    <div className="text-center">
                      <p className="text-sm font-semibold text-[#D9D5BD]">
                        Translating into {currentTarget?.name}...
                      </p>
                      <p className="text-xs text-[#8F8C72] mt-0.5">Analyzing syntax & context</p>
                    </div>
                  </div>
                ) : translatedText ? (
                  <motion.div
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex-1 text-[#F5F4EE] text-base sm:text-lg leading-relaxed select-text"
                  >
                    {translatedText}
                  </motion.div>
                ) : (
                  <div className="flex-1 flex flex-col items-center justify-center text-center text-[#8F8C72] py-10">
                    <div className="w-12 h-12 rounded-2xl bg-[#141F17] border border-[#8F8C72]/20 flex items-center justify-center text-[#8F8C72] mb-3">
                      <Sparkles className="w-5 h-5 text-[#D9D5BD]" />
                    </div>
                    <p className="text-sm font-medium text-[#C5C2B1]">Translation will appear here</p>
                    <p className="text-xs text-[#8F8C72] mt-1">
                      Type in the left box and click "Translate Now"
                    </p>
                  </div>
                )}
              </div>

              {/* Output Card Footer Actions */}
              <div className="flex items-center justify-between pt-3 border-t border-[#8F8C72]/15">
                <div className="flex items-center gap-2">
                  {/* Text to Speech Button for Target */}
                  <button
                    onClick={() => handleSpeak(translatedText, targetLang)}
                    disabled={!translatedText}
                    title={isSpeaking ? 'Stop speech' : 'Listen to native translation'}
                    className={`p-2.5 rounded-xl border transition-all ${
                      isSpeaking
                        ? 'bg-[#2DD4BF] border-[#2DD4BF] text-[#080D0A] shadow-lg shadow-[#2DD4BF]/30 font-bold'
                        : 'bg-[#141F17] hover:bg-[#1C2C21] border-[#8F8C72]/25 text-[#C5C2B1] hover:text-white disabled:opacity-30 disabled:pointer-events-none'
                    }`}
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>

                  {/* Copy Button */}
                  <button
                    onClick={handleCopy}
                    disabled={!translatedText}
                    title="Copy translated text"
                    className="p-2.5 rounded-xl bg-[#141F17] hover:bg-[#1C2C21] border border-[#8F8C72]/25 text-[#C5C2B1] hover:text-white transition-all disabled:opacity-30 disabled:pointer-events-none"
                  >
                    {isCopied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>

                {/* Translation Info & Provider Status */}
                <div className="flex items-center gap-2 text-xs font-mono">
                  {translationEngine && translatedText && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-lg bg-[#182C20] text-[#D9D5BD] border border-[#8F8C72]/30 text-[11px] font-sans">
                      <Sparkles className="w-3 h-3 text-[#2DD4BF]" />
                      <span>{translationEngine}</span>
                    </span>
                  )}
                  <span className="text-[#8F8C72]">
                    {translatedText ? `${translatedText.length.toLocaleString()} chars` : 'Ready'}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Engine / Service Notice Banner (if error occurred) */}
          {lastError && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6 p-4 rounded-2xl bg-rose-950/30 border border-rose-500/30 flex items-start justify-between gap-4"
            >
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <h4 className="text-sm font-bold text-rose-200">
                    Translation Service Notice: {lastError.code || 'Notice'}
                  </h4>
                  <p className="text-xs text-rose-300/90 leading-relaxed">
                    {lastError.message}
                  </p>
                  {lastError.instructions && (
                    <div className="mt-2 text-xs font-mono bg-black/40 p-2.5 rounded-lg text-rose-200">
                      {lastError.instructions.map((ins, i) => (
                        <div key={i}>{ins}</div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              <button
                onClick={onOpenApiModal}
                className="shrink-0 px-3 py-1.5 rounded-xl bg-[#141F17] hover:bg-[#1C2C21] border border-[#8F8C72]/40 text-[#D9D5BD] text-xs font-semibold flex items-center gap-1.5 transition-colors"
              >
                <Cpu className="w-3.5 h-3.5" />
                <span>Engine Status</span>
              </button>
            </motion.div>
          )}

          {/* Bottom Action Bar */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-[#8F8C72]/20">
            {/* Auto-translate Toggle & Keyboard shortcut */}
            <div className="flex items-center gap-6">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <div className="relative">
                  <input
                    type="checkbox"
                    checked={autoTranslate}
                    onChange={(e) => setAutoTranslate(e.target.checked)}
                    className="sr-only"
                  />
                  <div
                    className={`w-10 h-6 rounded-full transition-colors ${
                      autoTranslate ? 'bg-[#D9D5BD]' : 'bg-[#141F17] border border-[#8F8C72]/30'
                    }`}
                  />
                  <div
                    className={`absolute top-1 left-1 w-4 h-4 rounded-full transition-transform ${
                      autoTranslate ? 'translate-x-4 bg-[#080D0A]' : 'translate-x-0 bg-[#8F8C72]'
                    }`}
                  />
                </div>
                <span className="text-xs font-medium text-[#C5C2B1]">Auto-translate while typing</span>
              </label>

              <span className="hidden md:inline-flex text-xs text-[#8F8C72]">
                Tip: Press <kbd className="px-1.5 py-0.5 mx-1 rounded bg-[#141F17] text-[#D9D5BD] font-mono text-[11px] border border-[#8F8C72]/25">Ctrl</kbd> + <kbd className="px-1.5 py-0.5 mx-1 rounded bg-[#141F17] text-[#D9D5BD] font-mono text-[11px] border border-[#8F8C72]/25">Enter</kbd>
              </span>
            </div>

            {/* Main Action Button: "Translate Now" (Luxury Style) */}
            <button
              onClick={() => handleTranslate()}
              disabled={isLoading || !inputText.trim()}
              className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-[#D9D5BD] hover:bg-[#EDE9D5] text-[#080D0A] font-extrabold text-sm shadow-xl shadow-[#D9D5BD]/15 hover:shadow-[#D9D5BD]/30 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2.5 disabled:opacity-40 disabled:pointer-events-none group"
            >
              {isLoading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin text-[#080D0A]" />
                  <span>Translating...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-[#080D0A] group-hover:rotate-12 transition-transform" />
                  <span>Translate Now</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
