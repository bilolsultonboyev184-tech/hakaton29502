import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth.js';
import habitRoutes from './routes/habits.js';
import monetizationRoutes from './routes/monetization.js';

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.json());

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/habits', habitRoutes);
app.use('/api/monetization', monetizationRoutes);

// Health Endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: "online",
    service: "HayotRitmi Core API Server",
    version: "2.0.0",
    timestamp: new Date().toISOString()
  });
});

app.listen(PORT, () => {
  console.log(`🚀 HayotRitmi REST API Server ishga tushdi: http://localhost:${PORT}`);
  console.log(`📡 Health Check: http://localhost:${PORT}/api/health`);
});
