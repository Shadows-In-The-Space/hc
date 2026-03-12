/**
 * HelpCheck Backend - Express + SQLite
 */

const express = require('express');
const cors = require('cors');
const sqlite3 = require('better-sqlite3');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { v4: uuidv4 } = require('uuid');

const app = express();
const PORT = process.env.PORT || 3002;
const JWT_SECRET = process.env.JWT_SECRET || 'helpcheck-secret-key-change-in-production';

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

// Datenbank-Verzeichnis erstellen
const dbDir = path.join(__dirname, 'data');
if (!fs.existsSync(dbDir)) {
  fs.mkdirSync(dbDir, { recursive: true });
}

// SQLite Datenbank
const db = new sqlite3(path.join(dbDir, 'helpcheck.db'));

// Tabellen erstellen
db.exec(`
  CREATE TABLE IF NOT EXISTS leads (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    email TEXT NOT NULL,
    phone TEXT,
    topic TEXT,
    message TEXT,
    status TEXT DEFAULT 'new',
    source TEXT DEFAULT 'chatbot',
    files TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS appointments (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    lead_id INTEGER,
    date TEXT,
    time TEXT,
    type TEXT,
    notes TEXT,
    status TEXT DEFAULT 'scheduled',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (lead_id) REFERENCES leads(id)
  );
`);

// Admin-Benutzer erstellen (falls nicht vorhanden)
const adminExists = db.prepare('SELECT id FROM users WHERE username = ?').get('admin');
if (!adminExists) {
  const hashedPassword = bcrypt.hashSync('helpcheck2024', 10);
  db.prepare('INSERT INTO users (username, password) VALUES (?, ?)').run('admin', hashedPassword);
  console.log('Admin-Benutzer erstellt (admin/helpcheck2024)');
}

// Multer Konfiguration für File-Uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join(__dirname, 'uploads');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${uuidv4()}${path.extname(file.originalname)}`;
    cb(null, uniqueName);
  }
});

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
  fileFilter: (req, file, cb) => {
    const allowedTypes = ['.pdf', '.doc', '.docx', '.jpg', '.jpeg', '.png'];
    const ext = path.extname(file.originalname).toLowerCase();
    if (allowedTypes.includes(ext)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type'));
    }
  }
});

// --- Auth Middleware ---
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Invalid token' });
    }
    req.user = user;
    next();
  });
};

// --- API Routes ---

// Login
app.post('/api/auth/login', async (req, res) => {
  const { username, password } = req.body;

  const user = db.prepare('SELECT * FROM users WHERE username = ?').get(username);

  if (!user || !bcrypt.compareSync(password, user.password)) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  const token = jwt.sign({ id: user.id, username: user.username }, JWT_SECRET, { expiresIn: '24h' });
  res.json({ token, username: user.username });
});

// Leads erstellen (mit File-Upload)
app.post('/api/leads', upload.array('files', 5), (req, res) => {
  try {
    const { name, email, phone, topic, message, source } = req.body;

    if (!email) {
      return res.status(400).json({ error: 'Email is required' });
    }

    // Dateien speichern
    const files = req.files ? req.files.map(f => ({
      name: f.originalname,
      path: `/uploads/${f.filename}`,
      size: f.size
    })) : [];

    const stmt = db.prepare(`
      INSERT INTO leads (name, email, phone, topic, message, source, files)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `);

    const result = stmt.run(
      name || null,
      email,
      phone || null,
      topic || null,
      message || null,
      source || 'chatbot',
      files.length > 0 ? JSON.stringify(files) : null
    );

    const lead = db.prepare('SELECT * FROM leads WHERE id = ?').get(result.lastInsertRowid);

    console.log(`Neuer Lead erstellt: ${email} (ID: ${lead.id})`);

    res.status(201).json(lead);
  } catch (error) {
    console.error('Error creating lead:', error);
    res.status(500).json({ error: 'Failed to create lead' });
  }
});

// Alle Leads abrufen (Admin)
app.get('/api/leads', authenticateToken, (req, res) => {
  try {
    const leads = db.prepare(`
      SELECT * FROM leads ORDER BY created_at DESC
    `).all();

    res.json(leads);
  } catch (error) {
    console.error('Error fetching leads:', error);
    res.status(500).json({ error: 'Failed to fetch leads' });
  }
});

// Einzel Lead abrufen
app.get('/api/leads/:id', authenticateToken, (req, res) => {
  try {
    const lead = db.prepare('SELECT * FROM leads WHERE id = ?').get(req.params.id);

    if (!lead) {
      return res.status(404).json({ error: 'Lead not found' });
    }

    res.json(lead);
  } catch (error) {
    console.error('Error fetching lead:', error);
    res.status(500).json({ error: 'Failed to fetch lead' });
  }
});

// Lead Status aktualisieren
app.patch('/api/leads/:id', authenticateToken, (req, res) => {
  try {
    const { status } = req.body;

    db.prepare(`
      UPDATE leads SET status = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?
    `).run(status, req.params.id);

    const lead = db.prepare('SELECT * FROM leads WHERE id = ?').get(req.params.id);
    res.json(lead);
  } catch (error) {
    console.error('Error updating lead:', error);
    res.status(500).json({ error: 'Failed to update lead' });
  }
});

// E-Mail auf Datenlecks prüfen (vereinfacht - nur Mock)
app.post('/api/check-email', async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ error: 'Email is required' });
  }

  // Hier könnte man echte HaveIBeenPwned API integrieren
  // Für Demo: Simuliere zufällige Ergebnisse
  const mockBreaches = ['LinkedIn', 'Facebook', 'Dropbox', 'Adobe'];
  const breachCount = Math.random() > 0.5 ? Math.floor(Math.random() * 3) : 0;
  const breaches = mockBreaches.slice(0, breachCount);

  res.json({
    email,
    breach_count: breachCount,
    breaches,
    cached: false
  });
});

// Appointments
app.post('/api/appointments', authenticateToken, (req, res) => {
  try {
    const { lead_id, date, time, type, notes } = req.body;

    const stmt = db.prepare(`
      INSERT INTO appointments (lead_id, date, time, type, notes)
      VALUES (?, ?, ?, ?, ?)
    `);

    const result = stmt.run(lead_id, date, time, type, notes);
    const appointment = db.prepare('SELECT * FROM appointments WHERE id = ?').get(result.lastInsertRowid);

    res.status(201).json(appointment);
  } catch (error) {
    console.error('Error creating appointment:', error);
    res.status(500).json({ error: 'Failed to create appointment' });
  }
});

// Server starten
app.listen(PORT, () => {
  console.log(`HelpCheck Backend läuft auf Port ${PORT}`);
  console.log(`Admin-Login: admin / helpcheck2024`);
});

module.exports = app;
