"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
const leads_1 = __importDefault(require("./routes/leads"));
const email_1 = __importDefault(require("./routes/email"));
const auth_1 = __importDefault(require("./routes/auth"));
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3002;
// Middleware
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// Serve static files from data directory if needed
app.use('/data', express_1.default.static(path_1.default.join(__dirname, '../../data')));
// Routes
app.use('/api', leads_1.default);
app.use('/api', email_1.default);
app.use('/api', auth_1.default);
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
//# sourceMappingURL=server.js.map