/**
 * Text-to-Speech (TTS) using Web Speech API
 */
export class TextToSpeechService {
  constructor() {
    this.synth = typeof window !== 'undefined' ? window.speechSynthesis : null;
    this.currentUtterance = null;
  }

  isSupported() {
    return Boolean(this.synth);
  }

  speak({ text, lang = 'en-US', rate = 0.95, onStart, onEnd, onError }) {
    if (!this.synth) {
      if (onError) onError(new Error('Speech synthesis is not supported in this browser.'));
      return;
    }

    // Cancel any ongoing speech
    this.stop();

    if (!text || text.trim() === '') return;

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang;
    utterance.rate = rate; // Custom playback speed (e.g. 0.75x, 1x, 1.25x)
    utterance.pitch = 1.0;

    // Try finding matching voice
    const voices = this.synth.getVoices();
    if (voices.length > 0) {
      const prefix = lang.split('-')[0].toLowerCase();
      const matchedVoice = voices.find(v => v.lang.toLowerCase() === lang.toLowerCase()) ||
                           voices.find(v => v.lang.toLowerCase().startsWith(prefix));
      if (matchedVoice) {
        utterance.voice = matchedVoice;
      }
    }

    utterance.onstart = () => {
      if (onStart) onStart();
    };

    utterance.onend = () => {
      this.currentUtterance = null;
      if (onEnd) onEnd();
    };

    utterance.onerror = (e) => {
      this.currentUtterance = null;
      if (onError) onError(e);
    };

    this.currentUtterance = utterance;
    this.synth.speak(utterance);
  }

  stop() {
    if (this.synth) {
      this.synth.cancel();
      this.currentUtterance = null;
    }
  }

  isPlaying() {
    return Boolean(this.synth?.speaking);
  }
}

export const ttsService = new TextToSpeechService();

/**
 * Speech-to-Text (STT) using Web Speech API (webkitSpeechRecognition)
 */
export class SpeechRecognitionService {
  constructor() {
    const SpeechRecognition = typeof window !== 'undefined'
      ? (window.SpeechRecognition || window.webkitSpeechRecognition)
      : null;

    this.isSupported = Boolean(SpeechRecognition);
    this.recognition = SpeechRecognition ? new SpeechRecognition() : null;

    if (this.recognition) {
      this.recognition.continuous = false;
      this.recognition.interimResults = true;
    }
  }

  start({ lang = 'en-US', onResult, onStart, onEnd, onError }) {
    if (!this.isSupported) {
      if (onError) onError(new Error('Speech recognition is not supported in this browser. Please use Chrome or Edge.'));
      return;
    }

    this.recognition.lang = lang;

    this.recognition.onstart = () => {
      if (onStart) onStart();
    };

    this.recognition.onresult = (event) => {
      let finalTranscript = '';
      let interimTranscript = '';

      for (let i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
          finalTranscript += event.results[i][0].transcript;
        } else {
          interimTranscript += event.results[i][0].transcript;
        }
      }

      if (onResult) {
        onResult({
          final: finalTranscript,
          interim: interimTranscript,
          transcript: finalTranscript || interimTranscript
        });
      }
    };

    this.recognition.onerror = (event) => {
      console.warn('Speech recognition error:', event.error);
      if (onError) onError(new Error(event.error === 'not-allowed' ? 'Microphone permission denied.' : event.error));
    };

    this.recognition.onend = () => {
      if (onEnd) onEnd();
    };

    try {
      this.recognition.start();
    } catch (err) {
      console.warn('Could not start recognition:', err);
    }
  }

  stop() {
    if (this.recognition) {
      try {
        this.recognition.stop();
      } catch (err) {
        // Ignore if already stopped
      }
    }
  }
}

export const sttService = new SpeechRecognitionService();

