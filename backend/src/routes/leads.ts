import { Router } from 'express';
import { z } from 'zod';
import db from '../db';

const router = Router();

// Schema for lead validation
const leadSchema = z.object({
  email: z.string().email(),
  name: z.string().optional(),
  phone: z.string().optional(),
  topic: z.string().optional(),
  message: z.string().optional(),
  source: z.string().default('chatbot')
});

// Create or update lead
router.post('/leads', async (req, res) => {
  try {
    const data = leadSchema.parse(req.body);

    const existingLead = db.prepare('SELECT * FROM leads WHERE email = ?').get(data.email);

    if (existingLead) {
      // Update existing lead
      const stmt = db.prepare(`
        UPDATE leads
        SET name = COALESCE(?, name),
            phone = COALESCE(?, phone),
            topic = COALESCE(?, topic),
            message = COALESCE(?, message),
            updated_at = CURRENT_TIMESTAMP
        WHERE email = ?
      `);
      stmt.run(data.name, data.phone, data.topic, data.message, data.email);
      res.json({ message: 'Lead updated', email: data.email });
    } else {
      // Create new lead
      const stmt = db.prepare(`
        INSERT INTO leads (email, name, phone, topic, message, source)
        VALUES (?, ?, ?, ?, ?, ?)
      `);
      const result = stmt.run(
        data.email,
        data.name || null,
        data.phone || null,
        data.topic || null,
        data.message || null,
        data.source
      );
      res.json({ message: 'Lead created', id: result.lastInsertRowid, email: data.email });
    }
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ error: 'Validation failed', details: error.errors });
    } else {
      res.status(500).json({ error: 'Internal server error' });
    }
  }
});

// Get all leads
router.get('/leads', (req, res) => {
  try {
    const leads = db.prepare('SELECT * FROM leads ORDER BY created_at DESC').all();
    res.json(leads);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get lead by email
router.get('/leads/:email', (req, res) => {
  try {
    const lead = db.prepare('SELECT * FROM leads WHERE email = ?').get(req.params.email);
    if (!lead) {
      res.status(404).json({ error: 'Lead not found' });
    }
    res.json(lead);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update lead status
router.patch('/leads/:id/status', (req, res) => {
  try {
    const { status } = req.body;
    const stmt = db.prepare('UPDATE leads SET status = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?');
    stmt.run(status, req.params.id);
    res.json({ message: 'Status updated' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
