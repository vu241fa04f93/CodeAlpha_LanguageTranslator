import axios from 'axios';
import { getLanguageByCode } from '../data/languages.js';
import { translateIndicText } from './indicTranslateService.js';
import { validateTargetScript, sanitizeTranslationOutput } from './scriptValidator.js';

// Base URL for local LibreTranslate instance
const getBaseUrl = () => {
  return (process.env.LIBRETRANSLATE_URL || 'http://127.0.0.1:5001').replace(/\/+$/, '');
};

// Map ISO codes to LibreTranslate conventions where needed
function normalizeLangCode(code) {
  if (!code) return 'en';
  const clean = code.trim().toLowerCase();
  if (clean === 'auto') return 'auto';
  if (clean === 'zh' || clean === 'zh-cn') return 'zh-Hans';
  if (clean === 'zh-tw') return 'zh-Hant';
  if (clean === 'pt-br') return 'pt-BR';
  return clean;
}

// Languages routed to the dedicated Indic Neural Engine
// (Telugu & Tamil have no models in LibreTranslate; Hindi requires accurate proper name transliteration)
const INDIC_ENGINE_LANGUAGES = new Set([
  'te', // Telugu
  'ta', // Tamil
  'hi', // Hindi (for accurate proper name transliteration e.g. Abhishek -> अभिषेक)
  'gu', // Gujarati
  'kn', // Kannada
  'ml', // Malayalam
  'mr', // Marathi
  'pa', // Punjabi
  'or', // Odia
  'as'  // Assamese
]);

// Cache for LibreTranslate supported language codes
let cachedLibreCodes = null;
let lastCacheTime = 0;

async function getLibreSupportedCodes() {
  const now = Date.now();
  if (cachedLibreCodes && (now - lastCacheTime < 60000)) {
    return cachedLibreCodes;
  }
  try {
    const res = await axios.get(`${getBaseUrl()}/languages`, { timeout: 3000 });
    if (Array.isArray(res.data)) {
      cachedLibreCodes = new Set(res.data.map(l => l.code.toLowerCase()));
      lastCacheTime = now;
      return cachedLibreCodes;
    }
  } catch (err) {
    // Return fallback set if LibreTranslate is loading
  }
  return new Set([
    'en', 'sq', 'ar', 'az', 'eu', 'bn', 'bg', 'ca', 'zh-hans', 'zh-hant', 'cs', 'da',
    'nl', 'eo', 'et', 'fi', 'fr', 'gl', 'de', 'el', 'he', 'hi', 'hu', 'id', 'ga', 'it', 'ja',
    'ko', 'ky', 'lv', 'lt', 'ms', 'nb', 'fa', 'pl', 'pt', 'pt-br', 'ro', 'ru', 'sk', 'sl',
    'es', 'sw', 'sv', 'tl', 'th', 'tr', 'uk', 'ur', 'vi'
  ]);
}

/**
 * Main translation dispatcher: routes requests intelligently to LibreTranslate or Indic Neural Engine,
 * performs target script validation, preserves proper names and punctuation, and prevents cross-language pollution.
 */
export async function translateText({ text, sourceLanguage = 'auto', targetLanguage = 'hi' }) {
  if (!text || typeof text !== 'string' || text.trim().length === 0) {
    const err = new Error('Text to translate is required.');
    err.statusCode = 400;
    err.code = 'INVALID_INPUT';
    throw err;
  }

  const cleanText = text.trim();
  const sl = (!sourceLanguage || sourceLanguage === 'auto') ? 'auto' : sourceLanguage.trim().toLowerCase();
  const tl = targetLanguage.trim().toLowerCase();

  // If source and target are the same, return text directly
  if (sl !== 'auto' && sl === tl) {
    return {
      success: true,
      translatedText: cleanText,
      detectedSourceLanguage: sl,
      sourceLanguage: sl,
      targetLanguage: tl,
      provider: 'Direct Pass-through'
    };
  }

  // 1. ROUTE TO INDIC NEURAL ENGINE for Telugu, Tamil, and Indic target/source
  // Especially when target or source is Telugu ('te') or Tamil ('ta')
  if (INDIC_ENGINE_LANGUAGES.has(tl) || (sl !== 'auto' && INDIC_ENGINE_LANGUAGES.has(sl))) {
    try {
      const indicResult = await translateIndicText({
        text: cleanText,
        sourceLanguage: sl,
        targetLanguage: tl
      });

      return {
        success: true,
        translatedText: indicResult.translatedText,
        detectedSourceLanguage: indicResult.detectedSourceLanguage,
        sourceLanguage: sl,
        targetLanguage: tl,
        provider: indicResult.provider
      };
    } catch (indicError) {
      // If script mismatch occurred, re-throw strictly
      if (indicError.code === 'SCRIPT_MISMATCH') {
        throw indicError;
      }
      console.warn(`[TranslationEngine] Indic Engine notice: ${indicError.message}. Checking alternatives...`);
    }
  }

  // 2. ROUTE TO LOCAL LIBRETRANSLATE for LibreTranslate supported languages (Spanish, French, German, Japanese, etc.)
  const baseUrl = getBaseUrl();
  const ltSource = normalizeLangCode(sl);
  const ltTarget = normalizeLangCode(tl);

  try {
    const response = await axios.post(`${baseUrl}/translate`, {
      q: cleanText,
      source: ltSource,
      target: ltTarget,
      format: 'text'
    }, {
      headers: { 'Content-Type': 'application/json' },
      timeout: 15000
    });

    if (response.data && typeof response.data.translatedText === 'string') {
      const rawTranslation = response.data.translatedText;
      const sanitized = sanitizeTranslationOutput(rawTranslation);

      // Verify that the target script is valid
      const scriptCheck = validateTargetScript(sanitized, tl);
      if (!scriptCheck.valid) {
        const err = new Error(
          `Quality guardrail: Output script mismatch for target "${tl}". ${scriptCheck.error}`
        );
        err.statusCode = 502;
        err.code = 'SCRIPT_MISMATCH';
        throw err;
      }

      const detected = response.data.detectedLanguage?.language || (sl !== 'auto' ? sl : 'en');

      return {
        success: true,
        translatedText: sanitized,
        detectedSourceLanguage: detected,
        sourceLanguage: sl,
        targetLanguage: tl,
        provider: 'LibreTranslate (Local Engine)'
      };
    }
  } catch (ltErr) {
    // If it was a script mismatch, throw directly
    if (ltErr.code === 'SCRIPT_MISMATCH') {
      throw ltErr;
    }

    // If LibreTranslate returned 400 (unsupported language pair)
    if (ltErr.response?.status === 400 || ltErr.response?.data?.error) {
      const rawError = ltErr.response?.data?.error || ltErr.message;
      const targetObj = getLanguageByCode(tl);
      const targetLabel = targetObj ? `${targetObj.name} (${tl})` : tl;

      // Try Indic engine fallback before failing
      try {
        const fallbackRes = await translateIndicText({
          text: cleanText,
          sourceLanguage: sl,
          targetLanguage: tl
        });
        return {
          success: true,
          translatedText: fallbackRes.translatedText,
          detectedSourceLanguage: fallbackRes.detectedSourceLanguage,
          sourceLanguage: sl,
          targetLanguage: tl,
          provider: fallbackRes.provider
        };
      } catch (fbErr) {
        const error = new Error(
          `Language ${targetLabel} is not currently supported by your local translation setup.`
        );
        error.code = 'UNSUPPORTED_LANGUAGE';
        error.statusCode = 400;
        throw error;
      }
    }

    // If LibreTranslate connection failed
    if (ltErr.code === 'ECONNREFUSED' || ltErr.code === 'ENOTFOUND') {
      // Attempt Indic engine fallback
      try {
        const fbRes = await translateIndicText({
          text: cleanText,
          sourceLanguage: sl,
          targetLanguage: tl
        });
        return {
          success: true,
          translatedText: fbRes.translatedText,
          detectedSourceLanguage: fbRes.detectedSourceLanguage,
          sourceLanguage: sl,
          targetLanguage: tl,
          provider: fbRes.provider
        };
      } catch (fbErr) {
        const error = new Error(
          `Unable to reach LibreTranslate at ${baseUrl}. Please ensure your local LibreTranslate server is running on port 5001.`
        );
        error.code = 'LIBRETRANSLATE_OFFLINE';
        error.statusCode = 503;
        throw error;
      }
    }

    throw ltErr;
  }
}

/**
 * Detect language of given text
 */
export async function detectLanguage({ text }) {
  const baseUrl = getBaseUrl();

  try {
    const response = await axios.post(`${baseUrl}/detect`, {
      q: text
    }, {
      headers: { 'Content-Type': 'application/json' },
      timeout: 8000
    });

    const detected = response.data?.[0]?.language || 'en';
    return {
      success: true,
      detectedLanguage: detected
    };
  } catch (err) {
    return {
      success: true,
      detectedLanguage: 'en'
    };
  }
}

/**
 * Health check for translation services
 */
export async function checkLibreTranslateStatus() {
  const baseUrl = getBaseUrl();
  try {
    const res = await axios.get(`${baseUrl}/languages`, { timeout: 3000 });
    const libreCodes = Array.isArray(res.data) ? res.data.map(l => l.code) : [];
    // Combine with Indic engine languages
    const totalSupported = Array.from(new Set([...libreCodes, ...Array.from(INDIC_ENGINE_LANGUAGES)]));

    return {
      online: true,
      url: baseUrl,
      languagesCount: totalSupported.length,
      supportedCodes: totalSupported,
      libreCodes: libreCodes,
      indicCodes: Array.from(INDIC_ENGINE_LANGUAGES)
    };
  } catch (err) {
    return {
      online: false,
      url: baseUrl,
      error: err.message,
      indicCodes: Array.from(INDIC_ENGINE_LANGUAGES)
    };
  }
}
