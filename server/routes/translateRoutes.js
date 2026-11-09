import { Router } from 'express';
import {
  handleTranslate,
  handleDetect,
  handleGetLanguages,
  handleHealthCheck
} from '../controllers/translateController.js';

const router = Router();

// Translation endpoints
router.post('/translate', handleTranslate);
router.post('/detect', handleDetect);
router.get('/languages', handleGetLanguages);
router.get('/health', handleHealthCheck);

export default router;

