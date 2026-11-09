// Comprehensive list of 100+ supported languages with ISO codes, native names, flags, and BCP-47 speech codes
export const languages = [
  // Popular Languages
  { code: 'en', name: 'English', nativeName: 'English', flag: '🇺🇸', speechCode: 'en-US', popular: true },
  { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी', flag: '🇮🇳', speechCode: 'hi-IN', popular: true },
  { code: 'te', name: 'Telugu', nativeName: 'తెలుగు', flag: '🇮🇳', speechCode: 'te-IN', popular: true },
  { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்', flag: '🇮🇳', speechCode: 'ta-IN', popular: true },
  { code: 'bn', name: 'Bengali', nativeName: 'বাংলা', flag: '🇧🇩', speechCode: 'bn-IN', popular: true },
  { code: 'es', name: 'Spanish', nativeName: 'Español', flag: '🇪🇸', speechCode: 'es-ES', popular: true },
  { code: 'fr', name: 'French', nativeName: 'Français', flag: '🇫🇷', speechCode: 'fr-FR', popular: true },
  { code: 'de', name: 'German', nativeName: 'Deutsch', flag: '🇩🇪', speechCode: 'de-DE', popular: true },
  { code: 'ja', name: 'Japanese', nativeName: '日本語', flag: '🇯🇵', speechCode: 'ja-JP', popular: true },
  { code: 'zh', name: 'Chinese (Simplified)', nativeName: '简体中文', flag: '🇨🇳', speechCode: 'zh-CN', popular: true },
  { code: 'ko', name: 'Korean', nativeName: '한국어', flag: '🇰🇷', speechCode: 'ko-KR', popular: true },
  { code: 'ar', name: 'Arabic', nativeName: 'العربية', flag: '🇸🇦', speechCode: 'ar-SA', popular: true },
  { code: 'pt', name: 'Portuguese', nativeName: 'Português', flag: '🇵🇹', speechCode: 'pt-PT', popular: true },
  { code: 'ru', name: 'Russian', nativeName: 'Русский', flag: '🇷🇺', speechCode: 'ru-RU', popular: true },
  { code: 'it', name: 'Italian', nativeName: 'Italiano', flag: '🇮🇹', speechCode: 'it-IT', popular: true },

  // Indian Regional Languages
  { code: 'mr', name: 'Marathi', nativeName: 'मराठी', flag: '🇮🇳', speechCode: 'mr-IN', popular: false },
  { code: 'gu', name: 'Gujarati', nativeName: 'ગુજરાતી', flag: '🇮🇳', speechCode: 'gu-IN', popular: false },
  { code: 'kn', name: 'Kannada', nativeName: 'ಕನ್ನಡ', flag: '🇮🇳', speechCode: 'kn-IN', popular: false },
  { code: 'ml', name: 'Malayalam', nativeName: 'മലയാളം', flag: '🇮🇳', speechCode: 'ml-IN', popular: false },
  { code: 'pa', name: 'Punjabi', nativeName: 'ਪੰਜਾਬੀ', flag: '🇮🇳', speechCode: 'pa-IN', popular: false },
  { code: 'ur', name: 'Urdu', nativeName: 'اردو', flag: '🇵🇰', speechCode: 'ur-PK', popular: false },
  { code: 'or', name: 'Odia', nativeName: 'ଓଡ଼ିଆ', flag: '🇮🇳', speechCode: 'or-IN', popular: false },
  { code: 'as', name: 'Assamese', nativeName: 'অসমীয়া', flag: '🇮🇳', speechCode: 'as-IN', popular: false },

  // European Languages
  { code: 'nl', name: 'Dutch', nativeName: 'Nederlands', flag: '🇳🇱', speechCode: 'nl-NL', popular: false },
  { code: 'pl', name: 'Polish', nativeName: 'Polski', flag: '🇵🇱', speechCode: 'pl-PL', popular: false },
  { code: 'sv', name: 'Swedish', nativeName: 'Svenska', flag: '🇸🇪', speechCode: 'sv-SE', popular: false },
  { code: 'no', name: 'Norwegian', nativeName: 'Norsk', flag: '🇳🇴', speechCode: 'nb-NO', popular: false },
  { code: 'da', name: 'Danish', nativeName: 'Dansk', flag: '🇩🇰', speechCode: 'da-DK', popular: false },
  { code: 'fi', name: 'Finnish', nativeName: 'Suomi', flag: '🇫🇮', speechCode: 'fi-FI', popular: false },
  { code: 'el', name: 'Greek', nativeName: 'Ελληνικά', flag: '🇬🇷', speechCode: 'el-GR', popular: false },
  { code: 'cs', name: 'Czech', nativeName: 'Čeština', flag: '🇨🇿', speechCode: 'cs-CZ', popular: false },
  { code: 'ro', name: 'Romanian', nativeName: 'Română', flag: '🇷🇴', speechCode: 'ro-RO', popular: false },
  { code: 'hu', name: 'Hungarian', nativeName: 'Magyar', flag: '🇭🇺', speechCode: 'hu-HU', popular: false },
  { code: 'uk', name: 'Ukrainian', nativeName: 'Українська', flag: '🇺🇦', speechCode: 'uk-UA', popular: false },
  { code: 'bg', name: 'Bulgarian', nativeName: 'Български', flag: '🇧🇬', speechCode: 'bg-BG', popular: false },
  { code: 'hr', name: 'Croatian', nativeName: 'Hrvatski', flag: '🇭🇷', speechCode: 'hr-HR', popular: false },
  { code: 'sk', name: 'Slovak', nativeName: 'Slovenčina', flag: '🇸🇰', speechCode: 'sk-SK', popular: false },
  { code: 'sl', name: 'Slovenian', nativeName: 'Slovenščina', flag: '🇸🇮', speechCode: 'sl-SI', popular: false },
  { code: 'sr', name: 'Serbian', nativeName: 'Српски', flag: '🇷🇸', speechCode: 'sr-RS', popular: false },
  { code: 'lt', name: 'Lithuanian', nativeName: 'Lietuvių', flag: '🇱🇹', speechCode: 'lt-LT', popular: false },
  { code: 'lv', name: 'Latvian', nativeName: 'Latviešu', flag: '🇱🇻', speechCode: 'lv-LV', popular: false },
  { code: 'et', name: 'Estonian', nativeName: 'Eesti', flag: '🇪🇪', speechCode: 'et-EE', popular: false },
  { code: 'is', name: 'Icelandic', nativeName: 'Íslenska', flag: '🇮🇸', speechCode: 'is-IS', popular: false },
  { code: 'ga', name: 'Irish', nativeName: 'Gaeilge', flag: '🇮🇪', speechCode: 'ga-IE', popular: false },
  { code: 'mt', name: 'Maltese', nativeName: 'Malti', flag: '🇲🇹', speechCode: 'mt-MT', popular: false },
  { code: 'sq', name: 'Albanian', nativeName: 'Shqip', flag: '🇦🇱', speechCode: 'sq-AL', popular: false },
  { code: 'mk', name: 'Macedonian', nativeName: 'Македонски', flag: '🇲🇰', speechCode: 'mk-MK', popular: false },
  { code: 'bs', name: 'Bosnian', nativeName: 'Bosanski', flag: '🇧🇦', speechCode: 'bs-BA', popular: false },

  // Asian Languages
  { code: 'tr', name: 'Turkish', nativeName: 'Türkçe', flag: '🇹🇷', speechCode: 'tr-TR', popular: false },
  { code: 'vi', name: 'Vietnamese', nativeName: 'Tiếng Việt', flag: '🇻🇳', speechCode: 'vi-VN', popular: false },
  { code: 'th', name: 'Thai', nativeName: 'ไทย', flag: '🇹🇭', speechCode: 'th-TH', popular: false },
  { code: 'id', name: 'Indonesian', nativeName: 'Bahasa Indonesia', flag: '🇮🇩', speechCode: 'id-ID', popular: false },
  { code: 'ms', name: 'Malay', nativeName: 'Bahasa Melayu', flag: '🇲🇾', speechCode: 'ms-MY', popular: false },
  { code: 'fil', name: 'Filipino', nativeName: 'Filipino', flag: '🇵🇭', speechCode: 'fil-PH', popular: false },
  { code: 'fa', name: 'Persian', nativeName: 'فارسی', flag: '🇮🇷', speechCode: 'fa-IR', popular: false },
  { code: 'he', name: 'Hebrew', nativeName: 'עברית', flag: '🇮🇱', speechCode: 'he-IL', popular: false },
  { code: 'ne', name: 'Nepali', nativeName: 'नेपाली', flag: '🇳🇵', speechCode: 'ne-NP', popular: false },
  { code: 'si', name: 'Sinhala', nativeName: 'සිංහල', flag: '🇱🇰', speechCode: 'si-LK', popular: false },
  { code: 'my', name: 'Burmese', nativeName: 'မြန်မာ', flag: '🇲🇲', speechCode: 'my-MM', popular: false },
  { code: 'km', name: 'Khmer', nativeName: 'ខ្មែរ', flag: '🇰🇭', speechCode: 'km-KH', popular: false },
  { code: 'lo', name: 'Lao', nativeName: 'ລາວ', flag: '🇱🇦', speechCode: 'lo-LA', popular: false },
  { code: 'ka', name: 'Georgian', nativeName: 'ქართული', flag: '🇬🇪', speechCode: 'ka-GE', popular: false },
  { code: 'hy', name: 'Armenian', nativeName: 'Հայերեն', flag: '🇦🇲', speechCode: 'hy-AM', popular: false },
  { code: 'az', name: 'Azerbaijani', nativeName: 'Azərbaycan', flag: '🇦🇿', speechCode: 'az-AZ', popular: false },
  { code: 'kk', name: 'Kazakh', nativeName: 'Қазақ', flag: '🇰🇿', speechCode: 'kk-KZ', popular: false },
  { code: 'uz', name: 'Uzbek', nativeName: 'Oʻzbek', flag: '🇺🇿', speechCode: 'uz-UZ', popular: false },
  { code: 'mn', name: 'Mongolian', nativeName: 'Монгол', flag: '🇲🇳', speechCode: 'mn-MN', popular: false },

  // African Languages
  { code: 'sw', name: 'Swahili', nativeName: 'Kiswahili', flag: '🇰🇪', speechCode: 'sw-KE', popular: false },
  { code: 'am', name: 'Amharic', nativeName: 'አማርኛ', flag: '🇪🇹', speechCode: 'am-ET', popular: false },
  { code: 'af', name: 'Afrikaans', nativeName: 'Afrikaans', flag: '🇿🇦', speechCode: 'af-ZA', popular: false },
  { code: 'yo', name: 'Yoruba', nativeName: 'Èdè Yorùbá', flag: '🇳🇬', speechCode: 'yo-NG', popular: false },
  { code: 'ig', name: 'Igbo', nativeName: 'Asụsụ Igbo', flag: '🇳🇬', speechCode: 'ig-NG', popular: false },
  { code: 'zu', name: 'Zulu', nativeName: 'isiZulu', flag: '🇿🇦', speechCode: 'zu-ZA', popular: false },
  { code: 'xh', name: 'Xhosa', nativeName: 'isiXhosa', flag: '🇿🇦', speechCode: 'xh-ZA', popular: false },
  { code: 'so', name: 'Somali', nativeName: 'Soomaali', flag: '🇸🇴', speechCode: 'so-SO', popular: false },
  { code: 'ha', name: 'Hausa', nativeName: 'Hausa', flag: '🇳🇬', speechCode: 'ha-NG', popular: false },

  // Americas & Others
  { code: 'ca', name: 'Catalan', nativeName: 'Català', flag: '🇪🇸', speechCode: 'ca-ES', popular: false },
  { code: 'eu', name: 'Basque', nativeName: 'Euskara', flag: '🇪🇸', speechCode: 'eu-ES', popular: false },
  { code: 'gl', name: 'Galician', nativeName: 'Galego', flag: '🇪🇸', speechCode: 'gl-ES', popular: false },
  { code: 'cy', name: 'Welsh', nativeName: 'Cymraeg', flag: '🇬🇧', speechCode: 'cy-GB', popular: false },
  { code: 'eo', name: 'Esperanto', nativeName: 'Esperanto', flag: '🌐', speechCode: 'eo', popular: false },
  { code: 'la', name: 'Latin', nativeName: 'Latina', flag: '🏛️', speechCode: 'la', popular: false },
  { code: 'yi', name: 'Yiddish', nativeName: 'ייִדיש', flag: '🇮🇱', speechCode: 'yi', popular: false },
  { code: 'haw', name: 'Hawaiian', nativeName: 'ʻŌlelo Hawaiʻi', flag: '🌺', speechCode: 'haw', popular: false },
  { code: 'sm', name: 'Samoan', nativeName: 'Gagana Samoa', flag: '🇼🇸', speechCode: 'sm', popular: false },
  { code: 'mi', name: 'Maori', nativeName: 'Te Reo Māori', flag: '🇳🇿', speechCode: 'mi', popular: false }
];

export const getLanguageByCode = (code) => {
  if (!code) return null;
  const clean = code.toLowerCase().trim();
  return languages.find(l => l.code.toLowerCase() === clean) || {
    code: clean,
    name: clean.toUpperCase(),
    nativeName: clean.toUpperCase(),
    flag: '🌐',
    speechCode: 'en-US'
  };
};

