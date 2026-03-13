"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const zod_1 = require("zod");
const db_1 = __importDefault(require("../db"));
const router = (0, express_1.Router)();
// Auth middleware
const requireAuth = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'Unauthorized' });
    }
    const token = authHeader.substring(7);
    const tokens = global.adminTokens || {};
    if (!tokens[token]) {
        return res.status(401).json({ error: 'Invalid token' });
    }
    next();
};
// Schema for lead validation
const leadSchema = zod_1.z.object({
    email: zod_1.z.string().email(),
    name: zod_1.z.string().optional(),
    phone: zod_1.z.string().optional(),
    topic: zod_1.z.string().optional(),
    message: zod_1.z.string().optional(),
    source: zod_1.z.string().default('chatbot'),
    chat_history: zod_1.z.string().optional()
});
// Create or update lead
router.post('/leads', async (req, res) => {
    try {
        const data = leadSchema.parse(req.body);
        const existingLead = db_1.default.prepare('SELECT * FROM leads WHERE email = ?').get(data.email);
        if (existingLead) {
            // Update existing lead
            const stmt = db_1.default.prepare(`
        UPDATE leads
        SET name = COALESCE(?, name),
            phone = COALESCE(?, phone),
            topic = COALESCE(?, topic),
            message = COALESCE(?, message),
            chat_history = COALESCE(?, chat_history),
            updated_at = CURRENT_TIMESTAMP
        WHERE email = ?
      `);
            stmt.run(data.name, data.phone, data.topic, data.message, data.chat_history, data.email);
            res.json({ message: 'Lead updated', email: data.email });
        }
        else {
            // Create new lead
            const stmt = db_1.default.prepare(`
        INSERT INTO leads (email, name, phone, topic, message, source, chat_history)
        VALUES (?, ?, ?, ?, ?, ?, ?)
      `);
            const result = stmt.run(data.email, data.name || null, data.phone || null, data.topic || null, data.message || null, data.source, data.chat_history || null);
            res.json({ message: 'Lead created', id: result.lastInsertRowid, email: data.email });
        }
    }
    catch (error) {
        if (error instanceof zod_1.z.ZodError) {
            res.status(400).json({ error: 'Validation failed', details: error.errors });
        }
        else {
            res.status(500).json({ error: 'Internal server error' });
        }
    }
});
// Get all leads (protected)
router.get('/leads', requireAuth, (req, res) => {
    try {
        const leads = db_1.default.prepare('SELECT * FROM leads ORDER BY created_at DESC').all();
        res.json(leads);
    }
    catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});
// Get lead by email (protected)
router.get('/leads/:email', requireAuth, (req, res) => {
    try {
        const lead = db_1.default.prepare('SELECT * FROM leads WHERE email = ?').get(req.params.email);
        if (!lead) {
            res.status(404).json({ error: 'Lead not found' });
        }
        res.json(lead);
    }
    catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});
// Update lead status (protected)
router.patch('/leads/:id/status', requireAuth, (req, res) => {
    try {
        const { status } = req.body;
        const stmt = db_1.default.prepare('UPDATE leads SET status = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?');
        stmt.run(status, req.params.id);
        res.json({ message: 'Status updated' });
    }
    catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});
// Delete lead (protected)
router.delete('/leads/:id', requireAuth, (req, res) => {
    try {
        const id = parseInt(req.params.id, 10);
        if (isNaN(id)) {
            return res.status(400).json({ error: 'Invalid lead ID' });
        }
        const stmt = db_1.default.prepare('DELETE FROM leads WHERE id = ?');
        const result = stmt.run(id);
        if (result.changes === 0) {
            return res.status(404).json({ error: 'Lead not found' });
        }
        res.json({ message: 'Lead deleted' });
    }
    catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});
exports.default = router;
//# sourceMappingURL=leads.js.map