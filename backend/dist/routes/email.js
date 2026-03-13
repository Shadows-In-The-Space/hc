"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const db_1 = __importDefault(require("../db"));
const router = (0, express_1.Router)();
// Check email against Mozilla Have I Been Pwned API
router.post('/check-email', async (req, res) => {
    const { email } = req.body;
    if (!email || !email.includes('@')) {
        return res.status(400).json({ error: 'Invalid email address' });
    }
    try {
        // Check if we already have this result cached
        const cached = db_1.default.prepare('SELECT * FROM email_checks WHERE email = ? AND datetime(checked_at) > datetime("now", "-1 day")').get(email);
        if (cached) {
            return res.json({
                email,
                breach_count: cached.breach_count,
                breaches: cached.breaches ? JSON.parse(cached.breaches) : [],
                cached: true
            });
        }
        // Fetch from Have I Been Pwned API (k-anonymity model)
        const hash = await sha1(email.toLowerCase());
        const prefix = hash.substring(0, 5);
        const suffix = hash.substring(5);
        const response = await fetch(`https://api.pwnedpasswords.com/range/${prefix}`, {
            headers: {
                'User-Agent': 'HelpCheck-Legal-App'
            }
        });
        if (!response.ok) {
            throw new Error('HIBP API request failed');
        }
        const text = await response.text();
        const hashes = text.split('\r\n');
        let breachCount = 0;
        const breaches = [];
        for (const line of hashes) {
            const [hashSuffix, count] = line.split(':');
            if (hashSuffix.toLowerCase() === suffix) {
                breachCount = parseInt(count, 10);
                // Note: The free API only gives counts, not breach names
                // For production, you'd need a paid API key
                breaches.push(`Found in ${count} data breach(es)`);
                break;
            }
        }
        // Store result in database
        const stmt = db_1.default.prepare(`
      INSERT INTO email_checks (email, breach_count, breaches)
      VALUES (?, ?, ?)
    `);
        stmt.run(email, breachCount, JSON.stringify(breaches));
        res.json({
            email,
            breach_count: breachCount,
            breaches,
            cached: false
        });
    }
    catch (error) {
        console.error('Email check error:', error);
        res.status(500).json({ error: 'Failed to check email' });
    }
});
// SHA-1 hash function
async function sha1(message) {
    const msgBuffer = new TextEncoder().encode(message);
    const hashBuffer = await crypto.subtle.digest('SHA-1', msgBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('').toUpperCase();
}
exports.default = router;
//# sourceMappingURL=email.js.map