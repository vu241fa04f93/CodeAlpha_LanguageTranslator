export const languages = [
  // Popular Languages
  { code: 'en', name: 'English', nativeName: 'English', flag: '🇺🇸', speechCode: 'en-US', popular: true, region: 'Global' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी', flag: '🇮🇳', speechCode: 'hi-IN', popular: true, region: 'Asia' },
  { code: 'te', name: 'Telugu', nativeName: 'తెలుగు', flag: '🇮🇳', speechCode: 'te-IN', popular: true, region: 'Asia' },
  { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்', flag: '🇮🇳', speechCode: 'ta-IN', popular: true, region: 'Asia' },
  { code: 'bn', name: 'Bengali', nativeName: 'বাংলা', flag: '🇧🇩', speechCode: 'bn-IN', popular: true, region: 'Asia' },
  { code: 'es', name: 'Spanish', nativeName: 'Español', flag: '🇪🇸', speechCode: 'es-ES', popular: true, region: 'Europe' },
  { code: 'fr', name: 'French', nativeName: 'Français', flag: '🇫🇷', speechCode: 'fr-FR', popular: true, region: 'Europe' },
  { code: 'de', name: 'German', nativeName: 'Deutsch', flag: '🇩🇪', speechCode: 'de-DE', popular: true, region: 'Europe' },
  { code: 'ja', name: 'Japanese', nativeName: '日本語', flag: '🇯🇵', speechCode: 'ja-JP', popular: true, region: 'Asia' },
  { code: 'zh', name: 'Chinese', nativeName: '简体中文', flag: '🇨🇳', speechCode: 'zh-CN', popular: true, region: 'Asia' },
  { code: 'ko', name: 'Korean', nativeName: '한국어', flag: '🇰🇷', speechCode: 'ko-KR', popular: true, region: 'Asia' },
  { code: 'ar', name: 'Arabic', nativeName: 'العربية', flag: '🇸🇦', speechCode: 'ar-SA', popular: true, region: 'Middle East' },
  { code: 'pt', name: 'Portuguese', nativeName: 'Português', flag: '🇵🇹', speechCode: 'pt-PT', popular: true, region: 'Europe' },
  { code: 'ru', name: 'Russian', nativeName: 'Русский', flag: '🇷🇺', speechCode: 'ru-RU', popular: true, region: 'Europe' },
  { code: 'it', name: 'Italian', nativeName: 'Italiano', flag: '🇮🇹', speechCode: 'it-IT', popular: true, region: 'Europe' },

  // Indian Regional Languages
  { code: 'mr', name: 'Marathi', nativeName: 'मराठी', flag: '🇮🇳', speechCode: 'mr-IN', popular: false, region: 'Asia' },
  { code: 'gu', name: 'Gujarati', nativeName: 'ગુજરાતી', flag: '🇮🇳', speechCode: 'gu-IN', popular: false, region: 'Asia' },
  { code: 'kn', name: 'Kannada', nativeName: 'ಕನ್ನಡ', flag: '🇮🇳', speechCode: 'kn-IN', popular: false, region: 'Asia' },
  { code: 'ml', name: 'Malayalam', nativeName: 'മലയാളം', flag: '🇮🇳', speechCode: 'ml-IN', popular: false, region: 'Asia' },
  { code: 'pa', name: 'Punjabi', nativeName: 'ਪੰਜਾਬੀ', flag: '🇮🇳', speechCode: 'pa-IN', popular: false, region: 'Asia' },
  { code: 'ur', name: 'Urdu', nativeName: 'اردو', flag: '🇵🇰', speechCode: 'ur-PK', popular: false, region: 'Asia' },
  { code: 'or', name: 'Odia', nativeName: 'ଓଡ଼ିଆ', flag: '🇮🇳', speechCode: 'or-IN', popular: false, region: 'Asia' },
  { code: 'as', name: 'Assamese', nativeName: 'অসমীয়া', flag: '🇮🇳', speechCode: 'as-IN', popular: false, region: 'Asia' },

  // European Languages
  { code: 'nl', name: 'Dutch', nativeName: 'Nederlands', flag: '🇳🇱', speechCode: 'nl-NL', popular: false, region: 'Europe' },
  { code: 'pl', name: 'Polish', nativeName: 'Polski', flag: '🇵🇱', speechCode: 'pl-PL', popular: false, region: 'Europe' },
  { code: 'sv', name: 'Swedish', nativeName: 'Svenska', flag: '🇸🇪', speechCode: 'sv-SE', popular: false, region: 'Europe' },
  { code: 'no', name: 'Norwegian', nativeName: 'Norsk', flag: '🇳🇴', speechCode: 'nb-NO', popular: false, region: 'Europe' },
  { code: 'da', name: 'Danish', nativeName: 'Dansk', flag: '🇩🇰', speechCode: 'da-DK', popular: false, region: 'Europe' },
  { code: 'fi', name: 'Finnish', nativeName: 'Suomi', flag: '🇫🇮', speechCode: 'fi-FI', popular: false, region: 'Europe' },
  { code: 'el', name: 'Greek', nativeName: 'Ελληνικά', flag: '🇬🇷', speechCode: 'el-GR', popular: false, region: 'Europe' },
  { code: 'cs', name: 'Czech', nativeName: 'Čeština', flag: '🇨🇿', speechCode: 'cs-CZ', popular: false, region: 'Europe' },
  { code: 'ro', name: 'Romanian', nativeName: 'Română', flag: '🇷🇴', speechCode: 'ro-RO', popular: false, region: 'Europe' },
  { code: 'hu', name: 'Hungarian', nativeName: 'Magyar', flag: '🇭🇺', speechCode: 'hu-HU', popular: false, region: 'Europe' },
  { code: 'uk', name: 'Ukrainian', nativeName: 'Українська', flag: '🇺🇦', speechCode: 'uk-UA', popular: false, region: 'Europe' },
  { code: 'bg', name: 'Bulgarian', nativeName: 'Български', flag: '🇧🇬', speechCode: 'bg-BG', popular: false, region: 'Europe' },
  { code: 'hr', name: 'Croatian', nativeName: 'Hrvatski', flag: '🇭🇷', speechCode: 'hr-HR', popular: false, region: 'Europe' },
  { code: 'sk', name: 'Slovak', nativeName: 'Slovenčina', flag: '🇸🇰', speechCode: 'sk-SK', popular: false, region: 'Europe' },
  { code: 'sl', name: 'Slovenian', nativeName: 'Slovenščina', flag: '🇸🇮', speechCode: 'sl-SI', popular: false, region: 'Europe' },
  { code: 'sr', name: 'Serbian', nativeName: 'Српски', flag: '🇷🇸', speechCode: 'sr-RS', popular: false, region: 'Europe' },
  { code: 'lt', name: 'Lithuanian', nativeName: 'Lietuvių', flag: '🇱🇹', speechCode: 'lt-LT', popular: false, region: 'Europe' },
  { code: 'lv', name: 'Latvian', nativeName: 'Latviešu', flag: '🇱🇻', speechCode: 'lv-LV', popular: false, region: 'Europe' },
  { code: 'et', name: 'Estonian', nativeName: 'Eesti', flag: '🇪🇪', speechCode: 'et-EE', popular: false, region: 'Europe' },
  { code: 'is', name: 'Icelandic', nativeName: 'Íslenska', flag: '🇮🇸', speechCode: 'is-IS', popular: false, region: 'Europe' },
  { code: 'ga', name: 'Irish', nativeName: 'Gaeilge', flag: '🇮🇪', speechCode: 'ga-IE', popular: false, region: 'Europe' },
  { code: 'mt', name: 'Maltese', nativeName: 'Malti', flag: '🇲🇹', speechCode: 'mt-MT', popular: false, region: 'Europe' },
  { code: 'sq', name: 'Albanian', nativeName: 'Shqip', flag: '🇦🇱', speechCode: 'sq-AL', popular: false, region: 'Europe' },
  { code: 'mk', name: 'Macedonian', nativeName: 'Македонски', flag: '🇲🇰', speechCode: 'mk-MK', popular: false, region: 'Europe' },
  { code: 'bs', name: 'Bosnian', nativeName: 'Bosanski', flag: '🇧🇦', speechCode: 'bs-BA', popular: false, region: 'Europe' },

  // Asian Languages
  { code: 'tr', name: 'Turkish', nativeName: 'Türkçe', flag: '🇹🇷', speechCode: 'tr-TR', popular: false, region: 'Middle East' },
  { code: 'vi', name: 'Vietnamese', nativeName: 'Tiếng Việt', flag: '🇻🇳', speechCode: 'vi-VN', popular: false, region: 'Asia' },
  { code: 'th', name: 'Thai', nativeName: 'ไทย', flag: '🇹🇭', speechCode: 'th-TH', popular: false, region: 'Asia' },
  { code: 'id', name: 'Indonesian', nativeName: 'Bahasa Indonesia', flag: '🇮🇩', speechCode: 'id-ID', popular: false, region: 'Asia' },
  { code: 'ms', name: 'Malay', nativeName: 'Bahasa Melayu', flag: '🇲🇾', speechCode: 'ms-MY', popular: false, region: 'Asia' },
  { code: 'fil', name: 'Filipino', nativeName: 'Filipino', flag: '🇵🇭', speechCode: 'fil-PH', popular: false, region: 'Asia' },
  { code: 'fa', name: 'Persian', nativeName: 'فارسی', flag: '🇮🇷', speechCode: 'fa-IR', popular: false, region: 'Middle East' },
  { code: 'he', name: 'Hebrew', nativeName: 'עברית', flag: '🇮🇱', speechCode: 'he-IL', popular: false, region: 'Middle East' },
  { code: 'ne', name: 'Nepali', nativeName: 'नेपाली', flag: '🇳🇵', speechCode: 'ne-NP', popular: false, region: 'Asia' },
  { code: 'si', name: 'Sinhala', nativeName: 'සිංහල', flag: '🇱🇰', speechCode: 'si-LK', popular: false, region: 'Asia' },
  { code: 'my', name: 'Burmese', nativeName: 'မြန်မာ', flag: '🇲🇲', speechCode: 'my-MM', popular: false, region: 'Asia' },
  { code: 'km', name: 'Khmer', nativeName: 'ខ្មែរ', flag: '🇰🇭', speechCode: 'km-KH', popular: false, region: 'Asia' },
  { code: 'lo', name: 'Lao', nativeName: 'ລາວ', flag: '🇱🇦', speechCode: 'lo-LA', popular: false, region: 'Asia' },
  { code: 'ka', name: 'Georgian', nativeName: 'ქართული', flag: '🇬🇪', speechCode: 'ka-GE', popular: false, region: 'Asia' },
  { code: 'hy', name: 'Armenian', nativeName: 'Հայերեն', flag: '🇦🇲', speechCode: 'hy-AM', popular: false, region: 'Asia' },
  { code: 'az', name: 'Azerbaijani', nativeName: 'Azərbaycan', flag: '🇦🇿', speechCode: 'az-AZ', popular: false, region: 'Asia' },
  { code: 'kk', name: 'Kazakh', nativeName: 'Қазақ', flag: '🇰🇿', speechCode: 'kk-KZ', popular: false, region: 'Asia' },
  { code: 'uz', name: 'Uzbek', nativeName: 'Oʻzbek', flag: '🇺🇿', speechCode: 'uz-UZ', popular: false, region: 'Asia' },
  { code: 'mn', name: 'Mongolian', nativeName: 'Монгол', flag: '🇲🇳', speechCode: 'mn-MN', popular: false, region: 'Asia' },

  // African Languages
  { code: 'sw', name: 'Swahili', nativeName: 'Kiswahili', flag: '🇰🇪', speechCode: 'sw-KE', popular: false, region: 'Africa' },
  { code: 'am', name: 'Amharic', nativeName: 'አማርኛ', flag: '🇪🇹', speechCode: 'am-ET', popular: false, region: 'Africa' },
  { code: 'af', name: 'Afrikaans', nativeName: 'Afrikaans', flag: '🇿🇦', speechCode: 'af-ZA', popular: false, region: 'Africa' },
  { code: 'yo', name: 'Yoruba', nativeName: 'Èdè Yorùbá', flag: '🇳🇬', speechCode: 'yo-NG', popular: false, region: 'Africa' },
  { code: 'ig', name: 'Igbo', nativeName: 'Asụsụ Igbo', flag: '🇳🇬', speechCode: 'ig-NG', popular: false, region: 'Africa' },
  { code: 'zu', name: 'Zulu', nativeName: 'isiZulu', flag: '🇿🇦', speechCode: 'zu-ZA', popular: false, region: 'Africa' },
  { code: 'xh', name: 'Xhosa', nativeName: 'isiXhosa', flag: '🇿🇦', speechCode: 'xh-ZA', popular: false, region: 'Africa' },
  { code: 'so', name: 'Somali', nativeName: 'Soomaali', flag: '🇸🇴', speechCode: 'so-SO', popular: false, region: 'Africa' },
  { code: 'ha', name: 'Hausa', nativeName: 'Hausa', flag: '🇳🇬', speechCode: 'ha-NG', popular: false, region: 'Africa' },

  // Americas & Others
  { code: 'ca', name: 'Catalan', nativeName: 'Català', flag: '🇪🇸', speechCode: 'ca-ES', popular: false, region: 'Europe' },
  { code: 'eu', name: 'Basque', nativeName: 'Euskara', flag: '🇪🇸', speechCode: 'eu-ES', popular: false, region: 'Europe' },
  { code: 'gl', name: 'Galician', nativeName: 'Galego', flag: '🇪🇸', speechCode: 'gl-ES', popular: false, region: 'Europe' },
  { code: 'cy', name: 'Welsh', nativeName: 'Cymraeg', flag: '🇬🇧', speechCode: 'cy-GB', popular: false, region: 'Europe' },
  { code: 'eo', name: 'Esperanto', nativeName: 'Esperanto', flag: '🌐', speechCode: 'eo', popular: false, region: 'Global' },
  { code: 'la', name: 'Latin', nativeName: 'Latina', flag: '🏛️', speechCode: 'la', popular: false, region: 'Europe' },
  { code: 'yi', name: 'Yiddish', nativeName: 'ייִדיש', flag: '🇮🇱', speechCode: 'yi', popular: false, region: 'Middle East' },
  { code: 'haw', name: 'Hawaiian', nativeName: 'ʻŌlelo Hawaiʻi', flag: '🌺', speechCode: 'haw', popular: false, region: 'Americas' },
  { code: 'sm', name: 'Samoan', nativeName: 'Gagana Samoa', flag: '🇼🇸', speechCode: 'sm', popular: false, region: 'Americas' },
  { code: 'mi', name: 'Maori', nativeName: 'Te Reo Māori', flag: '🇳🇿', speechCode: 'mi', popular: false, region: 'Americas' }
];

export const popularLanguages = languages.filter(l => l.popular);

export const getLanguageByCode = (code) => {
  if (!code) return null;
  const clean = code.toLowerCase().trim();
  const match = languages.find(l => l.code.toLowerCase() === clean);
  if (match) return match;
  return {
    code: clean,
    name: clean.toUpperCase(),
    nativeName: clean.toUpperCase(),
    flag: '🌐',
    speechCode: 'en-US'
  };
};

