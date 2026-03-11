import { Router } from 'express';
import crypto from 'crypto';

const router = Router();

// Simple admin credentials (in production, use proper auth with database)
const ADMIN_CREDENTIALS = {
  username: 'admin',
  // Password: helpcheck2024 (hashed with sha256)
  passwordHash: 'a3c1e8d5f6b7c9e0d1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2'
};

// For demo purposes, we'll use a simple check
const DEMO_PASSWORD = 'helpcheck2024';

// Login endpoint
router.post('/auth/login', (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password required' });
  }

  // Simple password check (in production, use proper hashing)
  if (username === ADMIN_CREDENTIALS.username && password === DEMO_PASSWORD) {
    // Generate a simple token (in production, use JWT)
    const token = crypto.randomBytes(32).toString('hex');

    // Store token in memory (in production, use Redis or database)
    (global as any).adminTokens = (global as any).adminTokens || {};
    (global as any).adminTokens[token] = { username, createdAt: new Date() };

    res.json({
      success: true,
      token,
      user: { username: ADMIN_CREDENTIALS.username }
    });
  } else {
    res.status(401).json({ error: 'Invalid credentials' });
  }
});

// Verify token endpoint
router.get('/auth/verify', (req, res) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'No token provided' });
  }

  const token = authHeader.substring(7);
  const tokens = (global as any).adminTokens || {};

  if (tokens[token]) {
    res.json({ valid: true, user: tokens[token] });
  } else {
    res.status(401).json({ valid: false, error: 'Invalid token' });
  }
});

// Logout endpoint
router.post('/auth/logout', (req, res) => {
  const authHeader = req.headers.authorization;

  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.substring(7);
    const tokens = (global as any).adminTokens || {};
    delete tokens[token];
  }

  res.json({ success: true });
});

export default router;
