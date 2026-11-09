import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import translateRoutes from './routes/translateRoutes.js';

// Load environment variables
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: '*', // Allow frontend development requests
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json({ limit: '2mb' }));
app.use(express.urlencoded({ extended: true, limit: '2mb' }));

// Request logging in development
app.use((req, res, next) => {
  const start = Date.now();
  res.on('finish', () => {
    const duration = Date.now() - start;
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl} - ${res.statusCode} (${duration}ms)`);
  });
  next();
});

// API Routes
app.use('/api', translateRoutes);

// Root route
app.get('/', (req, res) => {
  res.json({
    name: 'AITranslator API Server',
    version: '1.0.0',
    status: 'online',
    endpoints: {
      translate: 'POST /api/translate',
      detect: 'POST /api/detect',
      languages: 'GET /api/languages',
      health: 'GET /api/health'
    }
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: 'NOT_FOUND',
    message: `Route not found: ${req.method} ${req.url}`
  });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('Unhandled server error:', err);
  res.status(500).json({
    success: false,
    error: 'INTERNAL_SERVER_ERROR',
    message: err.message || 'An internal server error occurred.'
  });
});

app.listen(PORT, () => {
  console.log(`=========================================`);
  console.log(`🚀 AITranslator Backend Server running!`);
  console.log(`📍 Port: http://localhost:${PORT}`);
  console.log(`📡 Health Check: http://localhost:${PORT}/api/health`);
  console.log(`🤖 Engine: LibreTranslate at ${process.env.LIBRETRANSLATE_URL || 'http://127.0.0.1:5001'}`);
  console.log(`=========================================`);
});

