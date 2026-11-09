import {
  translateText,
  detectLanguage,
  checkLibreTranslateStatus
} from '../services/libreTranslateService.js';
import { languages } from '../data/languages.js';

export async function handleTranslate(req, res) {
  try {
    const { text, sourceLanguage = 'auto', targetLanguage = 'hi' } = req.body;

    if (!text || typeof text !== 'string' || text.trim().length === 0) {
      return res.status(400).json({
        success: false,
        error: 'INVALID_INPUT',
        message: 'Please provide valid text to translate.'
      });
    }

    if (text.length > 5000) {
      return res.status(400).json({
        success: false,
        error: 'TEXT_TOO_LONG',
        message: 'Text exceeds maximum limit of 5,000 characters.'
      });
    }

    if (!targetLanguage || typeof targetLanguage !== 'string') {
      return res.status(400).json({
        success: false,
        error: 'INVALID_TARGET_LANGUAGE',
        message: 'Target language is required.'
      });
    }

    const result = await translateText({
      text: text.trim(),
      sourceLanguage: sourceLanguage ? sourceLanguage.trim() : 'auto',
      targetLanguage: targetLanguage.trim()
    });

    return res.status(200).json({
      success: true,
      translatedText: result.translatedText,
      detectedSourceLanguage: result.detectedSourceLanguage,
      sourceLanguage: sourceLanguage || 'auto',
      targetLanguage: targetLanguage,
      characterCount: text.length,
      provider: result.provider
    });
  } catch (error) {
    const statusCode = error.statusCode || 500;
    return res.status(statusCode).json({
      success: false,
      error: error.code || 'TRANSLATION_FAILED',
      message: error.message || 'An unexpected error occurred during translation.',
      instructions: error.setupInstructions || null,
      details: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
}

export async function handleDetect(req, res) {
  try {
    const { text } = req.body;

    if (!text || typeof text !== 'string' || text.trim().length === 0) {
      return res.status(400).json({
        success: false,
        error: 'INVALID_INPUT',
        message: 'Please provide valid text to detect language.'
      });
    }

    const result = await detectLanguage({ text: text.trim() });
    return res.status(200).json(result);
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      success: false,
      error: error.code || 'DETECTION_FAILED',
      message: error.message || 'Failed to detect language.'
    });
  }
}

export async function handleGetLanguages(req, res) {
  const status = await checkLibreTranslateStatus();
  const supportedSet = new Set(status.supportedCodes || []);

  const enriched = languages.map(l => ({
    ...l,
    supportedByEngine: supportedSet.size > 0 ? supportedSet.has(l.code) : true
  }));

  return res.status(200).json({
    success: true,
    total: enriched.length,
    languages: enriched,
    engine: 'LibreTranslate (Local AI)',
    engineOnline: status.online
  });
}

export async function handleHealthCheck(req, res) {
  const status = await checkLibreTranslateStatus();

  return res.status(200).json({
    success: true,
    service: 'AITranslator Backend API',
    port: 5000,
    status: 'online',
    timestamp: new Date().toISOString(),
    libreTranslate: {
      online: status.online,
      url: status.url || 'http://127.0.0.1:5001',
      languagesLoaded: status.languagesCount || 0
    },
    engine: 'LibreTranslate Local AI',
    mode: status.online ? 'LibreTranslate Active (Port 5001)' : 'LibreTranslate Offline'
  });
}
