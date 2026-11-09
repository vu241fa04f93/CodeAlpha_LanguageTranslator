import axios from 'axios';

// Vite proxies /api to http://localhost:5000 in development
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  },
  timeout: 15000
});

/**
 * Translates text via the backend Express API
 */
export async function translateText({ text, sourceLanguage = 'auto', targetLanguage = 'hi' }) {
  try {
    const response = await apiClient.post('/translate', {
      text,
      sourceLanguage,
      targetLanguage
    });
    return response.data;
  } catch (error) {
    if (error.response?.data) {
      const err = new Error(error.response.data.message || 'Translation request failed');
      err.code = error.response.data.error;
      err.instructions = error.response.data.instructions;
      err.status = error.response.status;
      throw err;
    }
    throw new Error(error.message || 'Network error: Unable to contact AITranslator server');
  }
}

/**
 * Detect language of input text
 */
export async function detectLanguage(text) {
  try {
    const response = await apiClient.post('/detect', { text });
    return response.data;
  } catch (error) {
    console.warn('Language detection failed:', error.message);
    return { success: false, detectedLanguage: 'en' };
  }
}

/**
 * Get backend system health and API key status
 */
export async function checkServerHealth() {
  try {
    const response = await apiClient.get('/health');
    return response.data;
  } catch (error) {
    return {
      success: false,
      status: 'offline',
      message: 'Backend server is not reachable on port 5000.'
    };
  }
}

/**
 * Fetch supported languages from backend
 */
export async function fetchLanguages() {
  try {
    const response = await apiClient.get('/languages');
    return response.data?.languages || [];
  } catch (error) {
    console.warn('Falling back to local language definitions:', error.message);
    return [];
  }
}

