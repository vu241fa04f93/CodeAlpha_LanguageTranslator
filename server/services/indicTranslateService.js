import { validateTargetScript, sanitizeTranslationOutput } from './scriptValidator.js';

// Pool of legitimate browser User-Agents
const BROWSER_USER_AGENTS = [
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:123.0) Gecko/20100101 Firefox/123.0',
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36 Edg/122.0.0.0'
];

function getRandomUserAgent() {
  return BROWSER_USER_AGENTS[Math.floor(Math.random() * BROWSER_USER_AGENTS.length)];
}

/**
 * Translates text into Indic & Dravidian languages (Telugu, Tamil, Hindi, etc.)
 * with script verification and proper name preservation.
 */
export async function translateIndicText({ text, sourceLanguage = 'en', targetLanguage = 'te' }) {
  const sl = (!sourceLanguage || sourceLanguage === 'auto') ? 'auto' : sourceLanguage.trim().toLowerCase();
  const tl = targetLanguage.trim().toLowerCase();

  let translatedRaw = null;
  let detectedLang = sl === 'auto' ? 'en' : sl;
  let providerUsed = 'Indic Neural Engine';

  // 1. Primary Attempt: High-accuracy Neural Translation Pipeline
  try {
    const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${encodeURIComponent(sl)}&tl=${encodeURIComponent(tl)}&dt=t&q=${encodeURIComponent(text)}`;

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'User-Agent': getRandomUserAgent(),
        'Accept': 'application/json, text/plain, */*',
        'Accept-Language': 'en-US,en;q=0.9',
        'Referer': 'https://translate.google.com/'
      },
      signal: AbortSignal.timeout(8000)
    });

    if (response.ok) {
      const data = await response.json();
      if (Array.isArray(data) && Array.isArray(data[0])) {
        translatedRaw = data[0]
          .filter(segment => segment && segment[0])
          .map(segment => segment[0])
          .join('');

        if (data[2]) {
          detectedLang = data[2];
        }
      }
    }
  } catch (primaryErr) {
    console.warn(`[IndicEngine] Primary pipeline notice for ${sl}->${tl}:`, primaryErr.message);
  }

  // 2. Secondary Fallback Attempt: MyMemory API if primary didn't succeed
  if (!translatedRaw || !translatedRaw.trim()) {
    try {
      const myMemoryPair = `${sl === 'auto' ? 'en' : sl}|${tl}`;
      const fallbackUrl = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=${encodeURIComponent(myMemoryPair)}`;

      const fbResponse = await fetch(fallbackUrl, {
        method: 'GET',
        headers: {
          'User-Agent': getRandomUserAgent(),
          'Accept': 'application/json'
        },
        signal: AbortSignal.timeout(8000)
      });

      if (fbResponse.ok) {
        const fbData = await fbResponse.json();
        const cand = fbData?.responseData?.translatedText;
        if (cand && typeof cand === 'string' && cand.trim()) {
          translatedRaw = cand;
          providerUsed = 'Indic Translation Memory';
        }
      }
    } catch (fbErr) {
      console.warn(`[IndicEngine] Secondary pipeline notice:`, fbErr.message);
    }
  }

  if (!translatedRaw || !translatedRaw.trim()) {
    const err = new Error(`Translation for ${tl.toUpperCase()} could not be completed by the Indic Engine.`);
    err.statusCode = 502;
    err.code = 'TRANSLATION_FAILED';
    throw err;
  }

  // Clean double punctuation and decode entities
  const cleanResult = sanitizeTranslationOutput(translatedRaw);

  // 3. Strict Script Guardrail Verification
  const validation = validateTargetScript(cleanResult, tl);
  if (!validation.valid) {
    const err = new Error(
      `Quality guardrail rejected translation for target "${tl}": ${validation.error}. Raw output was: "${cleanResult}"`
    );
    err.statusCode = 502;
    err.code = 'SCRIPT_MISMATCH';
    throw err;
  }

  return {
    success: true,
    translatedText: cleanResult,
    detectedSourceLanguage: detectedLang,
    sourceLanguage: sl,
    targetLanguage: tl,
    provider: `${providerUsed} (${tl.toUpperCase()})`
  };
}

