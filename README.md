# 🚀 Boss Mode API Server

A powerful REST API server providing daily empowering quotes for the Boss Mode mobile app.

## ✨ Features

- **Daily Quotes**: Consistent quote-of-the-day based on date
- **Random Quotes**: On-demand random motivational quotes  
- **AI-Generated**: Pool of 20 powerful "boss lady" style quotes
- **Backup System**: Fallback quotes for offline functionality
- **Rate Limiting**: Protection against API abuse
- **CORS Support**: Cross-origin requests for web and mobile
- **Health Monitoring**: Server status and uptime tracking

## 🔗 API Endpoints

### Base URL
```
Production: https://your-app.railway.app
Development: http://localhost:3000
```

### Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/` | API info and available endpoints |
| GET | `/health` | Server health check |
| GET | `/api/daily-quote` | Get today's consistent quote |
| GET | `/api/random-quote` | Get random motivational quote |
| GET | `/api/backup-quotes` | Get all backup quotes |
| POST | `/api/generate-quote` | Generate new AI quote |
| GET | `/api/stats` | Server statistics |

### Example Response
```json
{
  "success": true,
  "quote": {
    "text": "I'm not bossy. I'm the boss.",
    "author": "AI Boss Mode",
    "type": "ai",
    "date": "2024-07-19T12:00:00.000Z"
  }
}
```

## 🚀 Quick Deploy

### Railway (Recommended)
1. Fork this repository
2. Connect to Railway: https://railway.app
3. Deploy from GitHub
4. Add environment variables if needed

### Manual Deployment
```bash
# Install dependencies
npm install

# Start server
npm start

# Development mode
npm run dev
```

## 🔧 Configuration

Create `.env` file:
```bash
NODE_ENV=production
PORT=3000
# OPENAI_API_KEY=sk-your-key (for future AI features)
```

## 💪 Quote Pool

### AI Quotes (20 powerful quotes)
- "I don't chase, I attract. What belongs to me will simply find me."
- "My standards are high because I know my worth."
- "I'm not bossy. I'm the boss."
- And 17 more empowering quotes...

### Backup Quotes (5 fallback quotes)
- Motivational quotes for offline functionality
- Used when AI generation fails

## 🛡️ Security Features

- **Rate Limiting**: 100 requests per 15 minutes
- **CORS Protection**: Configured allowed origins
- **Input Validation**: JSON parsing protection
- **Error Handling**: Graceful error responses
- **Environment Variables**: Secure configuration

## 📊 Monitoring

### Health Check
```bash
curl https://your-app.railway.app/health
```

### Statistics
```bash
curl https://your-app.railway.app/api/stats
```

## 🔮 Future Enhancements

- [ ] OpenAI GPT integration for real AI generation
- [ ] User favorites and personalization
- [ ] Quote categories and tags
- [ ] Analytics and usage tracking
- [ ] Admin panel for quote management
- [ ] Multi-language support

## 📱 Mobile App Integration

This API powers the **Boss Mode** Flutter app:
- Daily motivational quotes
- Offline functionality with backup quotes
- Push notification content
- Favorite quotes storage

## 🤝 Contributing

1. Fork the repository
2. Create feature branch: `git checkout -b feature-name`
3. Commit changes: `git commit -m 'Add feature'`
4. Push to branch: `git push origin feature-name`
5. Submit pull request

## 📄 License

MIT License - feel free to use this for your own empowering projects!

---

**"Unstoppable. Unshakable. Deployed."** 💪