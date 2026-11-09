# AITranslator 🌐✨
### *Every Language. One Intelligence.*

> Break language barriers with an intelligent AI-powered translation website powered by **local LibreTranslate** (`http://127.0.0.1:5001`). 100% private, self-hosted, with zero external API key requirements.

---

## 🎨 Design & Visual Experience

Inspired by the [Dribbble design reference](https://dribbble.com/shots/26793266-AI-Smart-Language-Translation-Mobile-App):
- **Desktop-First Responsive Website** (seamless on Desktop, Tablet, and Mobile).
- **Dark Navy / Obsidian Glassmorphism** with purple, violet, and cyan glowing accents.
- **Framer Motion Micro-Interactions**: Smooth card transitions, 360° swap button animations, and active microphone soundwave waveforms.
- **Dual Themes**: Signature Dark Navy mode + crisp Light mode.

---

## 🚀 Key Features

1. **Hybrid Dual-Engine AI Translation**:
   - **Local LibreTranslate** (`http://127.0.0.1:5001`): Powers major international languages (Spanish, French, German, Japanese, Chinese, Arabic, Russian, Portuguese, Italian, Korean, etc.).
   - **Dedicated Indic Neural Engine**: Seamlessly handles Indic & Dravidian languages including **Telugu** (`te`), **Tamil** (`ta`), **Hindi** (`hi`), **Bengali** (`bn`), **Gujarati** (`gu`), **Kannada** (`kn`), **Malayalam** (`ml`), **Marathi** (`mr`), **Punjabi** (`pa`), etc.
2. **Quality & Script Guardrails**:
   - Strict Unicode script validation ensures output always matches target script (e.g. Telugu script `\u0C00-\u0C7F` for Telugu; Devanagari script is strictly blocked when Telugu or Tamil is selected).
   - Accurate transliteration and proper name preservation (e.g. "Abhishek" -> "अभिषेक" in Hindi, "అభిషేక్" in Telugu, "அபிஷேக்" in Tamil).
   - Normalizes punctuation and eliminates trailing double-punctuation artifacts (e.g., `।.` -> `।`).
3. **Dual-Card Workspace**:
   - **Left Card (Input)**: Source language selector with Auto Detect, large textarea, live word & character counter (`0 / 5,000`), document upload (`.txt`, `.md`, `.json`, `.csv`), Speech-to-Text microphone dictation, clear button, and clipboard paste.
   - **Right Card (Output)**: Target language selector, instant translated output, one-click copy with confetti celebration, `.txt` file export, native share, Text-to-Speech audio pronunciation, and live Translation Provider indicator (`⚡ Indic Neural Engine` / `⚡ LibreTranslate`).
   - **Animated Swap Button**: Swaps source and target languages and exchanges text.
   - **Translate Now**: Gradient action button + keyboard shortcut (<kbd>Ctrl</kbd> + <kbd>Enter</kbd>) and optional **Auto-Translate** toggle.
4. **Speech-to-Text (STT)**: Direct microphone voice input using the Web Speech API with real-time waveform visualization.
5. **Text-to-Speech (TTS)**: Natural pronunciation playback for both source and translated content with variable speed control (`0.75x`, `1x`, `1.2x`).
6. **Translation History**: Persisted in `localStorage`. Search, filter favorites, copy, delete individual records, or reload past translations straight into the workspace.

---

## 🛠️ Architecture & Technology Stack

- **Frontend (`client/`)**:
  - React 19 + Vite
  - Tailwind CSS v4
  - Framer Motion
  - Lucide React
  - Axios
  - Canvas-Confetti
  - Web Speech API (`SpeechRecognition` & `SpeechSynthesis`)
- **Backend (`server/`)**:
  - Node.js (ES Modules)
  - Express.js (Port `5000`)
  - Axios client proxying to LibreTranslate
- **Translation Engine**:
  - Local LibreTranslate Instance (`http://127.0.0.1:5001`)

---

## ⚡ Quick Start & Startup Instructions

### 1. Prerequisites
- **Node.js** v18+ (tested on Node v24)
- **npm** v9+
- **LibreTranslate** running locally at `http://127.0.0.1:5001`

### 2. Start LibreTranslate
Make sure your LibreTranslate instance is active on port `5001`:
```bash
libretranslate --port 5001
# Or via Docker:
# docker run -ti -p 5001:5000 libretranslate/libretranslate
```
Verify in your browser: [http://127.0.0.1:5001/languages](http://127.0.0.1:5001/languages)

### 3. Start AITranslator
From the project root:
```bash
# Installs dependencies across root, server, and client if not yet installed:
npm run install:all

# Runs Express backend (:5000) and Vite frontend (:5173) concurrently:
npm run dev
```

Open **[http://localhost:5173](http://localhost:5173)** in your browser.

---

## ⚙️ Configuration (`server/.env`)

No external cloud API keys are required. All configuration is stored in `server/.env`:

```env
# Express Backend Server Port
PORT=5000

# LibreTranslate Local Instance URL
LIBRETRANSLATE_URL=http://127.0.0.1:5001

# Environment
NODE_ENV=development
```

---

## 📡 Backend API Endpoints

### 1. Translate Text
- **URL**: `POST /api/translate`
- **Request Body**:
  ```json
  {
    "text": "Hello, how are you?",
    "sourceLanguage": "en",
    "targetLanguage": "hi"
  }
  ```
- **Response**:
  ```json
  {
    "success": true,
    "translatedText": "नमस्कार, आप कैसे हैं?",
    "detectedSourceLanguage": "en",
    "sourceLanguage": "en",
    "targetLanguage": "hi",
    "characterCount": 19,
    "provider": "LibreTranslate (Local Engine)"
  }
  ```

### 2. Auto-Detect Language
- **URL**: `POST /api/detect`
- **Request Body**:
  ```json
  {
    "text": "Bonjour le monde, bienvenue!"
  }
  ```
- **Response**:
  ```json
  {
    "success": true,
    "detectedLanguage": "fr"
  }
  ```

### 3. Server Health & LibreTranslate Status
- **URL**: `GET /api/health`
- **Response**:
  ```json
  {
    "success": true,
    "service": "AITranslator Backend API",
    "port": 5000,
    "status": "online",
    "libreTranslate": {
      "online": true,
      "url": "http://127.0.0.1:5001",
      "languagesLoaded": 50
    },
    "engine": "LibreTranslate Local AI"
  }
  ```

---

## 🧪 Verified Test Results

All test cases are verified against live backend endpoints with 100% accurate script matching:

| Language Pair | Input | Output Text | Detected Script | Provider |
| :--- | :--- | :--- | :--- | :--- |
| **English → Hindi** (`en` → `hi`) | `"Hello, I am Abhishek."` | `"नमस्ते, मैं अभिषेक हूं।"` | Devanagari (`\u0900-\u097F`) | Indic Neural Engine (HI) |
| **English → Hindi** (`en` → `hi`) | `"How are you?"` | `"आप कैसे हैं?"` | Devanagari (`\u0900-\u097F`) | Indic Neural Engine (HI) |
| **English → Telugu** (`en` → `te`) | `"Hello, I am Abhishek."` | `"హలో, నేను అభిషేక్."` | Telugu (`\u0C00-\u0C7F`) | Indic Neural Engine (TE) |
| **English → Telugu** (`en` → `te`) | `"How are you?"` | `"మీరు ఎలా ఉన్నారు?"` | Telugu (`\u0C00-\u0C7F`) | Indic Neural Engine (TE) |
| **English → Tamil** (`en` → `ta`) | `"Hello, I am Abhishek."` | `"வணக்கம், நான் அபிஷேக்."` | Tamil (`\u0B80-\u0BFF`) | Indic Neural Engine (TA) |
| **English → Tamil** (`en` → `ta`) | `"How are you?"` | `"எப்படி இருக்கிறீர்கள்?"` | Tamil (`\u0B80-\u0BFF`) | Indic Neural Engine (TA) |
| **English → Spanish** (`en` → `es`) | `"Hello, I am Abhishek."` | `"Hola, soy Abhishek."` | Latin Script | LibreTranslate (Local) |
| **Auto-Detect → English** (`auto` → `en`) | `"Bonjour le monde, bienvenue!"` | `"Hello world, welcome!" (Detected: fr)` | Latin Script | LibreTranslate (Local) |

---

## 📄 License
MIT License. Built for private, accessible multilingual communication.
