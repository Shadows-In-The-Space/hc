"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
const better_sqlite3_1 = __importDefault(require("better-sqlite3"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const dataDir = process.env.DATA_DIR || path_1.default.join(__dirname, '../../../data');
const dbPath = path_1.default.join(dataDir, 'helpcheck.db');
// Ensure data directory exists
if (!fs_1.default.existsSync(dataDir)) {
    fs_1.default.mkdirSync(dataDir, { recursive: true });
}
exports.db = new better_sqlite3_1.default(dbPath);
// Initialize tables
exports.db.exec(`
  CREATE TABLE IF NOT EXISTS leads (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT UNIQUE NOT NULL,
    name TEXT,
    phone TEXT,
    topic TEXT,
    message TEXT,
    status TEXT DEFAULT 'new',
    source TEXT DEFAULT 'chatbot',
    chat_history TEXT,
    files TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS email_checks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT NOT NULL,
    breach_count INTEGER DEFAULT 0,
    breaches TEXT,
    checked_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS conversations (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    lead_id INTEGER,
    messages TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (lead_id) REFERENCES leads(id)
  );

  CREATE INDEX IF NOT EXISTS idx_leads_email ON leads(email);
  CREATE INDEX IF NOT EXISTS idx_leads_status ON leads(status);
  CREATE INDEX IF NOT EXISTS idx_email_checks_email ON email_checks(email);
`);
// Migration: Add chat_history and files columns if they don't exist
try {
    exports.db.exec(`ALTER TABLE leads ADD COLUMN chat_history TEXT`);
}
catch (_) { /* column already exists */ }
try {
    exports.db.exec(`ALTER TABLE leads ADD COLUMN files TEXT`);
}
catch (_) { /* column already exists */ }
exports.default = exports.db;
//# sourceMappingURL=index.js.map