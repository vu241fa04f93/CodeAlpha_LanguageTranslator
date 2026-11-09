const STORAGE_KEY = 'aitranslator_history_v1';
const MAX_HISTORY_ITEMS = 50;

export function getTranslationHistory() {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    console.error('Failed to parse history from localStorage', e);
    return [];
  }
}

export function saveTranslationToHistory({ sourceText, translatedText, sourceLang, targetLang, detectedLang }) {
  if (!sourceText || !translatedText) return getTranslationHistory();

  try {
    const history = getTranslationHistory();
    // Prevent duplicate consecutive entries
    const isDuplicate = history.length > 0 &&
      history[0].sourceText.trim() === sourceText.trim() &&
      history[0].targetLang === targetLang;

    if (isDuplicate) return history;

    const newItem = {
      id: 'tx_' + Date.now() + '_' + Math.random().toString(36).substring(2, 6),
      sourceText: sourceText.trim(),
      translatedText: translatedText.trim(),
      sourceLang,
      targetLang,
      detectedLang: detectedLang || sourceLang,
      timestamp: new Date().toISOString(),
      favorite: false
    };

    const updated = [newItem, ...history].slice(0, MAX_HISTORY_ITEMS);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return updated;
  } catch (e) {
    console.error('Failed to save to history', e);
    return getTranslationHistory();
  }
}

export function deleteHistoryItem(id) {
  try {
    const history = getTranslationHistory();
    const updated = history.filter(item => item.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return updated;
  } catch (e) {
    console.error('Failed to delete history item', e);
    return getTranslationHistory();
  }
}

export function toggleFavoriteHistoryItem(id) {
  try {
    const history = getTranslationHistory();
    const updated = history.map(item =>
      item.id === id ? { ...item, favorite: !item.favorite } : item
    );
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return updated;
  } catch (e) {
    console.error('Failed to toggle favorite', e);
    return getTranslationHistory();
  }
}

export function clearAllHistory() {
  try {
    localStorage.removeItem(STORAGE_KEY);
    return [];
  } catch (e) {
    console.error('Failed to clear history', e);
    return [];
  }
}

