import axios from 'axios';

// Utility to decode HTML entities returned by translation APIs
function decodeHtmlEntities(str) {
  if (!str || typeof str !== 'string') return str;
  return str
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&#x2F;/g, '/')
    .replace(/&#x60;/g, '`')
    .replace(/&#x3D;/g, '=');
}

/**
 * Translates text using Google Cloud Translation API (or reliable fallback if enabled)
 * @param {string} text - Text to translate
 * @param {string} targetLanguage - ISO code of target language (e.g. 'hi')
 * @param {string} sourceLanguage - ISO code of source language or 'auto'
 */
export async function translateText({ text, sourceLanguage = 'auto', targetLanguage = 'en' }) {
  const apiKey = process.env.GOOGLE_TRANSLATE_API_KEY?.trim();
  const allowFallback = process.env.ALLOW_PUBLIC_FALLBACK !== 'false';

  // 1. Official Google Cloud Translation API v2
  if (apiKey) {
    try {
      const url = `https://translation.googleapis.com/language/translate/v2?key=${encodeURIComponent(apiKey)}`;
      const payload = {
        q: text,
        target: targetLanguage,
        format: 'text'
      };

      if (sourceLanguage && sourceLanguage !== 'auto') {
        payload.source = sourceLanguage;
      }

      const response = await axios.post(url, payload, {
        headers: { 'Content-Type': 'application/json' },
        timeout: 10000
      });

      const translation = response.data?.data?.translations?.[0];
      if (!translation) {
        throw new Error('No translation returned by Google Cloud Translation API');
      }

      return {
        success: true,
        translatedText: decodeHtmlEntities(translation.translatedText),
        detectedSourceLanguage: translation.detectedSourceLanguage || sourceLanguage,
        provider: 'Google Cloud Translation API v2'
      };
    } catch (apiError) {
      const errorMsg = apiError.response?.data?.error?.message || apiError.message;
      console.error('Google Cloud API Error:', errorMsg);

      if (!allowFallback) {
        const err = new Error(`Google Cloud Translation API error: ${errorMsg}`);
        err.statusCode = apiError.response?.status || 500;
        err.details = apiError.response?.data || errorMsg;
        throw err;
      }
      console.warn('Falling back to Google Translate public endpoints...');
    }
  }

  // 2. Strict Check: If no API key and fallback is disabled
  if (!apiKey && !allowFallback) {
    const error = new Error(
      'Google Cloud Translation API key is not configured. Please set GOOGLE_TRANSLATE_API_KEY in server/.env.'
    );
    error.code = 'MISSING_API_KEY';
    error.statusCode = 503;
    error.setupInstructions = [
      '1. Open server/.env file',
      '2. Add: GOOGLE_TRANSLATE_API_KEY=your_google_cloud_api_key_here',
      '3. Ensure Cloud Translation API is enabled in your Google Cloud Console',
      '4. Or set ALLOW_PUBLIC_FALLBACK=true to test immediately without an API key.'
    ];
    throw error;
  }

  // 3. Fallback Attempt A: Google Translate Client Endpoint (dict-chrome-ex)
  const sl = (!sourceLanguage || sourceLanguage === 'auto') ? 'auto' : sourceLanguage;
  const tl = targetLanguage || 'en';

  try {
    const clientUrl = `https://translate.googleapis.com/translate_a/single?client=dict-chrome-ex&sl=${encodeURIComponent(sl)}&tl=${encodeURIComponent(tl)}&dt=t&q=${encodeURIComponent(text)}`;
    const response = await axios.get(clientUrl, {
      timeout: 8000,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/120.0.0.0 Safari/537.36'
      }
    });

    if (response.data && Array.isArray(response.data[0])) {
      const fullTranslation = response.data[0]
        .filter(item => item && item[0])
        .map(item => item[0])
        .join('');

      const detectedLang = response.data[2] || (sourceLanguage !== 'auto' ? sourceLanguage : 'en');

      if (fullTranslation && fullTranslation.trim()) {
        return {
          success: true,
          translatedText: decodeHtmlEntities(fullTranslation),
          detectedSourceLanguage: detectedLang,
          provider: 'Google Translate Service'
        };
      }
    }
  } catch (errA) {
    console.warn('Client endpoint attempt A failed:', errA.message);
  }

  // 4. Fallback Attempt B: Google Translate gtx
  try {
    const gtxUrl = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${encodeURIComponent(sl)}&tl=${encodeURIComponent(tl)}&dt=t&q=${encodeURIComponent(text)}`;
    const response = await axios.get(gtxUrl, {
      timeout: 8000,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AITranslator/1.0'
      }
    });

    if (response.data && Array.isArray(response.data[0])) {
      const fullTranslation = response.data[0]
        .filter(item => item && item[0])
        .map(item => item[0])
        .join('');

      const detectedLang = response.data[2] || (sourceLanguage !== 'auto' ? sourceLanguage : 'en');

      if (fullTranslation && fullTranslation.trim()) {
        return {
          success: true,
          translatedText: decodeHtmlEntities(fullTranslation),
          detectedSourceLanguage: detectedLang,
          provider: 'Google Translate Service'
        };
      }
    }
  } catch (errB) {
    console.warn('Client endpoint attempt B failed:', errB.message);
  }

  // 5. Fallback Attempt C: Translation Memory Service (MyMemory)
  try {
    const pair = `${sl === 'auto' ? 'en' : sl}|${tl}`;
    const myMemoryUrl = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=${encodeURIComponent(pair)}`;
    const response = await axios.get(myMemoryUrl, { timeout: 8000 });

    const translatedText = response.data?.responseData?.translatedText;
    if (translatedText) {
      return {
        success: true,
        translatedText: decodeHtmlEntities(translatedText),
        detectedSourceLanguage: sl === 'auto' ? 'en' : sl,
        provider: 'Neural Translation Memory'
      };
    }
  } catch (errC) {
    console.error('All translation providers failed:', errC.message);
  }

  const customErr = new Error('Translation failed across available engines. Please check your network connection or configure a Google Cloud API key.');
  customErr.statusCode = 502;
  throw customErr;
}

/**
 * Detects the language of a given text
 */
export async function detectLanguage({ text }) {
  const result = await translateText({ text, sourceLanguage: 'auto', targetLanguage: 'en' });
  return {
    success: true,
    detectedLanguage: result.detectedSourceLanguage || 'en'
  };
}
