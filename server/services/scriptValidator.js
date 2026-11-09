/**
 * Validates that the translated output text actually matches the expected script
 * for the selected target language. This prevents returning Hindi when Telugu is selected,
 * or returning English when Hindi is selected.
 */

const SCRIPT_RANGES = {
  // Telugu: \u0C00 - \u0C7F
  te: {
    regex: /[\u0C00-\u0C7F]/,
    name: 'Telugu',
    forbiddenRegex: /[\u0900-\u097F]/, // Devanagari/Hindi forbidden in Telugu
    forbiddenName: 'Hindi / Devanagari'
  },
  // Tamil: \u0B80 - \u0BFF
  ta: {
    regex: /[\u0B80-\u0BFF]/,
    name: 'Tamil',
    forbiddenRegex: /[\u0900-\u097F]/, // Devanagari forbidden in Tamil
    forbiddenName: 'Hindi / Devanagari'
  },
  // Hindi, Marathi, Nepali (Devanagari): \u0900 - \u097F
  hi: {
    regex: /[\u0900-\u097F]/,
    name: 'Hindi',
    forbiddenRegex: /[\u0C00-\u0C7F\u0B80-\u0BFF]/,
    forbiddenName: 'Telugu / Tamil'
  },
  mr: { regex: /[\u0900-\u097F]/, name: 'Marathi' },
  ne: { regex: /[\u0900-\u097F]/, name: 'Nepali' },
  // Bengali: \u0980 - \u09FF
  bn: { regex: /[\u0980-\u09FF]/, name: 'Bengali' },
  // Gujarati: \u0A80 - \u0AFF
  gu: { regex: /[\u0A80-\u0AFF]/, name: 'Gujarati' },
  // Kannada: \u0C80 - \u0CFF
  kn: { regex: /[\u0C80-\u0CFF]/, name: 'Kannada' },
  // Malayalam: \u0D00 - \u0D7F
  ml: { regex: /[\u0D00-\u0D7F]/, name: 'Malayalam' },
  // Punjabi (Gurmukhi): \u0A00 - \u0A7F
  pa: { regex: /[\u0A00-\u0A7F]/, name: 'Punjabi' },
  // Arabic & Urdu: \u0600 - \u06FF
  ar: { regex: /[\u0600-\u06FF]/, name: 'Arabic' },
  ur: { regex: /[\u0600-\u06FF]/, name: 'Urdu' },
  // Japanese: Hiragana, Katakana, CJK
  ja: { regex: /[\u3040-\u30FF\u4E00-\u9FAF]/, name: 'Japanese' },
  // Chinese: CJK
  zh: { regex: /[\u4E00-\u9FFF]/, name: 'Chinese' },
  'zh-hans': { regex: /[\u4E00-\u9FFF]/, name: 'Chinese (Simplified)' },
  'zh-hant': { regex: /[\u4E00-\u9FFF]/, name: 'Chinese (Traditional)' },
  // Russian / Ukrainian / Bulgarian (Cyrillic): \u0400 - \u04FF
  ru: { regex: /[\u0400-\u04FF]/, name: 'Russian' },
  uk: { regex: /[\u0400-\u04FF]/, name: 'Ukrainian' },
  bg: { regex: /[\u0400-\u04FF]/, name: 'Bulgarian' },
  // Greek: \u0370 - \u03FF
  el: { regex: /[\u0370-\u03FF]/, name: 'Greek' },
  // Hebrew: \u0590 - \u05FF
  he: { regex: /[\u0590-\u05FF]/, name: 'Hebrew' },
  // Korean: \uAC00 - \uD7AF, \u1100 - \u11FF
  ko: { regex: /[\uAC00-\uD7AF\u1100-\u11FF]/, name: 'Korean' }
};

/**
 * Validates that text translated into targetLang contains the correct script
 * and does not contain an incorrect forbidden script.
 */
export function validateTargetScript(text, targetLang) {
  if (!text || typeof text !== 'string') {
    return { valid: false, error: 'Empty translation output' };
  }

  const langCode = targetLang.trim().toLowerCase();
  const rule = SCRIPT_RANGES[langCode];

  // If no script constraint defined (e.g. English, Spanish, French, German), Latin is accepted
  if (!rule) {
    return { valid: true };
  }

  // Check if text is only punctuation, whitespace, or numbers
  const hasLetters = /[\p{L}]/u.test(text);
  if (!hasLetters) {
    return { valid: true }; // e.g. "123", "?!."
  }

  // 1. Check forbidden script (e.g. Telugu must NEVER contain Hindi/Devanagari characters)
  if (rule.forbiddenRegex && rule.forbiddenRegex.test(text)) {
    return {
      valid: false,
      error: `Validation failed: Output for ${rule.name} (${langCode}) contained characters from ${rule.forbiddenName}. Cross-script pollution detected.`
    };
  }

  // 2. Check required script characters
  if (rule.regex && !rule.regex.test(text)) {
    return {
      valid: false,
      error: `Validation failed: Output for ${rule.name} (${langCode}) does not contain the expected ${rule.name} script.`
    };
  }

  return { valid: true };
}

/**
 * Cleans double punctuation and HTML artifacts from translation outputs
 */
export function sanitizeTranslationOutput(text) {
  if (!text || typeof text !== 'string') return text;

  return text
    // Replace duplicate punctuation like "।." or ".." or "??"
    .replace(/।\s*\./g, '।')
    .replace(/\.\s*\./g, '.')
    .replace(/\?\s*\?/g, '?')
    .replace(/!\s*!/g, '!')
    // Decode HTML entities
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    // Trim stray spaces before punctuation
    .replace(/\s+([.,!?।])/g, '$1')
    .trim();
}

