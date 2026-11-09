import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { TranslationWorkspace } from './components/TranslationWorkspace';
import { TranslationHistory } from './components/TranslationHistory';
import { FeaturesSection } from './components/FeaturesSection';
import { HowItWorksSection } from './components/HowItWorksSection';
import { PopularLanguagesSection } from './components/PopularLanguagesSection';
import { CtaSection } from './components/CtaSection';
import { Footer } from './components/Footer';
import { LanguageSelectorModal } from './components/LanguageSelectorModal';
import { ApiConfigModal } from './components/ApiConfigModal';
import { Toast } from './components/Toast';

import { useTheme } from './hooks/useTheme';
import {
  getTranslationHistory,
  saveTranslationToHistory,
  deleteHistoryItem,
  clearAllHistory,
  toggleFavoriteHistoryItem
} from './services/historyService';
import { checkServerHealth } from './services/api';

export function App() {
  const { isDark, toggleTheme } = useTheme();

  // Translation history state
  const [history, setHistory] = useState([]);

  // Toast notification state
  const [toast, setToast] = useState(null);

  // Server & Google Cloud API Status
  const [serverStatus, setServerStatus] = useState(null);

  // Language Modal state
  const [langModalConfig, setLangModalConfig] = useState({
    isOpen: false,
    isSource: false,
    currentCode: 'en'
  });

  // API Config modal state
  const [apiModalOpen, setApiModalOpen] = useState(false);

  // Active workspace inputs for reuse
  const [workspaceState, setWorkspaceState] = useState({
    inputText: '',
    sourceLang: 'en',
    targetLang: 'hi'
  });

  // Load history and check health on mount
  useEffect(() => {
    setHistory(getTranslationHistory());

    const checkHealth = async () => {
      try {
        const data = await checkServerHealth();
        setServerStatus(data);
      } catch (e) {
        console.warn('Backend server status check failed');
      }
    };
    checkHealth();
  }, []);

  // Show toast helper with auto-dismiss
  const showToast = ({ type = 'info', message }) => {
    setToast({ type, message });
    setTimeout(() => {
      setToast(null);
    }, 3500);
  };

  // History operations
  const handleSaveHistory = (entry) => {
    const updated = saveTranslationToHistory(entry);
    setHistory(updated);
  };

  const handleDeleteHistory = (id) => {
    const updated = deleteHistoryItem(id);
    setHistory(updated);
    showToast({ type: 'info', message: 'Item deleted from history' });
  };

  const handleClearAllHistory = () => {
    if (window.confirm('Are you sure you want to clear your entire translation history?')) {
      const updated = clearAllHistory();
      setHistory(updated);
      showToast({ type: 'info', message: 'Translation history cleared' });
    }
  };

  const handleToggleFavorite = (id) => {
    const updated = toggleFavoriteHistoryItem(id);
    setHistory(updated);
  };

  const handleReuseHistory = (item) => {
    setWorkspaceState({
      inputText: item.sourceText,
      sourceLang: item.sourceLang,
      targetLang: item.targetLang
    });

    const el = document.getElementById('translator');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
    showToast({ type: 'success', message: 'Loaded into translation workspace!' });
  };

  // Language picker modal handlers
  const handleOpenLanguageModal = ({ isSource, currentCode }) => {
    setLangModalConfig({
      isOpen: true,
      isSource,
      currentCode
    });
  };

  const handleSelectLanguageFromModal = (selectedCode) => {
    if (langModalConfig.isSource) {
      setWorkspaceState(prev => ({ ...prev, sourceLang: selectedCode }));
    } else {
      setWorkspaceState(prev => ({ ...prev, targetLang: selectedCode }));
    }
    showToast({
      type: 'info',
      message: `Selected ${selectedCode.toUpperCase()} as ${langModalConfig.isSource ? 'source' : 'target'} language`
    });
  };

  // Pick language from Popular section
  const handleSelectPopularLanguage = (code) => {
    setWorkspaceState(prev => ({ ...prev, targetLang: code }));
    const el = document.getElementById('translator');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
    showToast({
      type: 'info',
      message: `Target language set to ${code.toUpperCase()}! Ready to translate.`
    });
  };

  const scrollToTranslator = () => {
    const el = document.getElementById('translator');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const scrollToLanguages = () => {
    const el = document.getElementById('languages');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className={`min-h-screen ${isDark ? 'dark bg-[#080D0A] text-[#F5F4EE]' : 'light bg-[#F7F6F1] text-[#141F17]'} selection:bg-[#8F8C72]/30 selection:text-[#F4F1E6] transition-colors duration-200`}>
      {/* Sticky Responsive Navigation Bar */}
      <Navbar
        isDark={isDark}
        toggleTheme={toggleTheme}
        onOpenApiModal={() => setApiModalOpen(true)}
        onOpenHistory={() => {
          const el = document.getElementById('history');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
        onOpenLanguages={() => scrollToLanguages()}
        serverStatus={serverStatus}
      />

      <main>
        {/* Hero Section */}
        <HeroSection
          onStartTranslating={scrollToTranslator}
          onExploreLanguages={scrollToLanguages}
          onSelectLanguage={handleSelectPopularLanguage}
        />

        {/* Main Translation Workspace */}
        <TranslationWorkspace
          onSaveHistory={handleSaveHistory}
          onShowToast={showToast}
          onOpenLanguageModal={handleOpenLanguageModal}
          onOpenApiModal={() => setApiModalOpen(true)}
          initialInputText={workspaceState.inputText}
          initialSourceLang={workspaceState.sourceLang}
          initialTargetLang={workspaceState.targetLang}
        />

        {/* Translation History Section */}
        <TranslationHistory
          history={history}
          onReuse={handleReuseHistory}
          onDelete={handleDeleteHistory}
          onClearAll={handleClearAllHistory}
          onToggleFavorite={handleToggleFavorite}
          onShowToast={showToast}
        />

        {/* Why Choose AITranslator Section */}
        <FeaturesSection />

        {/* How It Works Section */}
        <HowItWorksSection />

        {/* Popular Languages Section */}
        <PopularLanguagesSection
          onSelectLanguage={handleSelectPopularLanguage}
        />

        {/* Call to Action Section */}
        <CtaSection
          onStartTranslating={scrollToTranslator}
        />
      </main>

      {/* Footer */}
      <Footer
        onOpenApiModal={() => setApiModalOpen(true)}
      />

      {/* Searchable Language Selector Modal */}
      <LanguageSelectorModal
        isOpen={langModalConfig.isOpen}
        onClose={() => setLangModalConfig(prev => ({ ...prev, isOpen: false }))}
        selectedCode={langModalConfig.currentCode}
        onSelectLanguage={handleSelectLanguageFromModal}
        isSource={langModalConfig.isSource}
        title={langModalConfig.isSource ? 'Select Source Language' : 'Select Target Language'}
      />

      {/* Google Cloud API Key Configuration Modal */}
      <ApiConfigModal
        isOpen={apiModalOpen}
        onClose={() => setApiModalOpen(false)}
      />

      {/* Floating Toast Notification */}
      <Toast
        toast={toast}
        onClose={() => setToast(null)}
      />
    </div>
  );
}

export default App;
