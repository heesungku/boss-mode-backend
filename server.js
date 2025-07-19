const express = require('express');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// CORS 설정 - Boss Mode 앱(localhost:9999)에서 접근 허용
app.use(cors({
  origin: [
    'http://localhost:9999',  // Boss Mode 앱 주소
    'http://127.0.0.1:9999',  // 대체 로컬 주소
    'http://localhost:3000',  // 백엔드 자체 테스트용
  ],
  credentials: true,
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Rate limiting - API 남용 방지
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15분
  max: 100, // 최대 100 요청
  message: {
    error: 'Too many requests, please try again later.',
    retryAfter: '15 minutes'
  }
});
app.use('/api/', limiter);

// JSON 파싱
app.use(express.json());

// Request 로깅
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// Boss Mode Quotes Pool - 20개의 강력한 명언
const QUOTES_POOL = {
  ai_quotes: [
    "I don't chase, I attract. What belongs to me will simply find me.",
    "My standards are high because I know my worth.",
    "I'm not bossy. I'm the boss.",
    "Success isn't given. It's taken.",
    "I don't compete with anyone. Everyone else is competing with me.",
    "My presence is a statement.",
    "I create the opportunities others wait for.",
    "Pressure makes diamonds, and baby, I sparkle.",
    "I don't follow trends. I set them.",
    "My ambition is louder than their opinions.",
    "I'm not here to be average. I'm here to be iconic.",
    "Winners focus on winning. Losers focus on winners. I focus on me.",
    "I don't need permission to be powerful.",
    "My success is not luck. It's strategy.",
    "I turned my pain into power and my visions into reality.",
    "They watch me like Netflix because my life is a masterpiece.",
    "I'm building an empire, not asking for a seat at the table.",
    "My energy is expensive. Not everyone can afford me.",
    "I don't wait for the storm to pass. I learn to dance in the rain wearing Louboutins.",
    "The goal isn't to be rich. It's to be legendary."
  ],
  backup_quotes: [
    "Confidence is not 'they will like me'. Confidence is 'I'll be fine if they don't'.",
    "I am not what happened to me. I am what I choose to become.",
    "Your only limit is your mind.",
    "Be yourself. Everyone else is already taken.",
    "The woman who does not require validation is the most feared individual."
  ]
};

// 루트 엔드포인트
app.get('/', (req, res) => {
  res.json({
    message: '🚀 Boss Mode API Server',
    version: '1.0.0',
    status: 'Running',
    endpoints: {
      health: '/health',
      dailyQuote: '/api/daily-quote',
      randomQuote: '/api/random-quote',
      backupQuotes: '/api/backup-quotes',
      generateQuote: 'POST /api/generate-quote'
    }
  });
});

// Health check 엔드포인트
app.get('/health', (req, res) => {
  res.json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: Math.floor(process.uptime()),
    environment: process.env.NODE_ENV || 'development',
    version: '1.0.0'
  });
});

// 일일 명언 엔드포인트 - 날짜별로 일관성 있는 명언 제공
app.get('/api/daily-quote', (req, res) => {
  try {
    const allQuotes = [...QUOTES_POOL.ai_quotes, ...QUOTES_POOL.backup_quotes];
    
    // 날짜 기반 시드로 일관성 있는 선택
    const today = new Date();
    const seed = today.getFullYear() * 10000 + (today.getMonth() + 1) * 100 + today.getDate();
    const index = seed % allQuotes.length;
    const quote = allQuotes[index];
    
    const author = index < QUOTES_POOL.ai_quotes.length ? "AI Boss Mode" : "Boss Mode Collection";
    const type = index < QUOTES_POOL.ai_quotes.length ? "ai" : "backup";
    
    res.json({
      success: true,
      quote: {
        text: quote,
        author: author,
        type: type,
        date: today.toISOString(),
        seed: seed
      }
    });
  } catch (error) {
    console.error('Daily Quote Error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to get daily quote'
    });
  }
});

// 랜덤 명언 엔드포인트
app.get('/api/random-quote', (req, res) => {
  try {
    const allQuotes = [...QUOTES_POOL.ai_quotes, ...QUOTES_POOL.backup_quotes];
    const randomIndex = Math.floor(Math.random() * allQuotes.length);
    const quote = allQuotes[randomIndex];
    
    const author = randomIndex < QUOTES_POOL.ai_quotes.length ? "AI Boss Mode" : "Boss Mode Collection";
    const type = randomIndex < QUOTES_POOL.ai_quotes.length ? "ai" : "backup";
    
    res.json({
      success: true,
      quote: {
        text: quote,
        author: author,
        type: type,
        date: new Date().toISOString(),
        index: randomIndex
      }
    });
  } catch (error) {
    console.error('Random Quote Error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to get random quote'
    });
  }
});

// 백업 명언 목록 엔드포인트
app.get('/api/backup-quotes', (req, res) => {
  try {
    res.json({
      success: true,
      quotes: QUOTES_POOL.backup_quotes,
      count: QUOTES_POOL.backup_quotes.length,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Backup Quotes Error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to get backup quotes'
    });
  }
});

// AI 명언 생성 엔드포인트 (현재는 풀에서 선택, 나중에 OpenAI 연동)
app.post('/api/generate-quote', async (req, res) => {
  try {
    // 현재는 AI 풀에서 랜덤 선택 (나중에 실제 AI 생성으로 업그레이드)
    const aiQuotes = QUOTES_POOL.ai_quotes;
    const randomIndex = Math.floor(Math.random() * aiQuotes.length);
    const quote = aiQuotes[randomIndex];
    
    res.json({
      success: true,
      quote: {
        text: quote,
        author: "AI Boss Mode",
        type: "ai",
        date: new Date().toISOString(),
        generated: true
      }
    });
  } catch (error) {
    console.error('AI Generation Error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to generate quote'
    });
  }
});

// 통계 엔드포인트 (앱 사용량 모니터링용)
app.get('/api/stats', (req, res) => {
  res.json({
    totalQuotes: QUOTES_POOL.ai_quotes.length + QUOTES_POOL.backup_quotes.length,
    aiQuotes: QUOTES_POOL.ai_quotes.length,
    backupQuotes: QUOTES_POOL.backup_quotes.length,
    uptime: Math.floor(process.uptime()),
    version: '1.0.0',
    timestamp: new Date().toISOString()
  });
});

// 404 핸들러
app.use('*', (req, res) => {
  res.status(404).json({
    error: 'Endpoint not found',
    requestedPath: req.originalUrl,
    availableEndpoints: [
      'GET /',
      'GET /health',
      'GET /api/daily-quote',
      'GET /api/random-quote', 
      'GET /api/backup-quotes',
      'POST /api/generate-quote',
      'GET /api/stats'
    ]
  });
});

// 에러 핸들러
app.use((error, req, res, next) => {
  console.error('Server Error:', error);
  res.status(500).json({
    error: 'Internal Server Error',
    message: process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong'
  });
});

// 서버 시작
app.listen(PORT, () => {
  console.log('🚀 Boss Mode API Server Started!');
  console.log(`📡 Server: http://localhost:${PORT}`);
  console.log(`🔍 Health: http://localhost:${PORT}/health`);
  console.log(`📝 Daily Quote: http://localhost:${PORT}/api/daily-quote`);
  console.log(`🎲 Random Quote: http://localhost:${PORT}/api/random-quote`);
  console.log('');
  console.log('💪 Unstoppable. Unshakable. Ready for deployment!');
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('👋 Server shutting down gracefully...');
  process.exit(0);
});

module.exports = app;