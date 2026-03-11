import express from 'express';
import cors from 'cors';
import path from 'path';
import leadsRouter from './routes/leads';
import emailRouter from './routes/email';

const app = express();
const PORT = process.env.PORT || 3002;

// Middleware
app.use(cors());
app.use(express.json());

// Serve static files from data directory if needed
app.use('/data', express.static(path.join(__dirname, '../../data')));

// Routes
app.use('/api', leadsRouter);
app.use('/api', emailRouter);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 HelpCheck Backend running on http://localhost:${PORT}`);
  console.log(`📋 API Endpoints:`);
  console.log(`   POST /api/leads - Create/update lead`);
  console.log(`   GET  /api/leads - Get all leads`);
  console.log(`   GET  /api/leads/:email - Get lead by email`);
  console.log(`   POST /api/check-email - Check email for breaches`);
  console.log(`   GET  /api/health - Health check`);
});
