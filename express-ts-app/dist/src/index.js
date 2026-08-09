"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
// Resolve the .env file relative to the project root (works in dev and production)
const envPath = path_1.default.resolve(__dirname, '../.env');
const prodEnvPath = path_1.default.resolve(__dirname, '../../.env');
dotenv_1.default.config({ path: fs_1.default.existsSync(envPath) ? envPath : prodEnvPath });
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
// Middleware
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// Routes
app.get('/health', (_req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
});
// Dynamic route loading with error handling
try {
    const clientRoutes = require('../routes/client.routes').default;
    const projectRoutes = require('../routes/project.routes').default;
    const paymentRoutes = require('../routes/payment.routes').default;
    const authRoutes = require('../routes/auth.routes').default;
    app.use('/api/auth', authRoutes);
    app.use('/api/clients', clientRoutes);
    app.use('/api/projects', projectRoutes);
    app.use('/api/payments', paymentRoutes);
}
catch (error) {
    console.warn('Routes not yet fully configured:', error);
}
// 404 handler
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: `Route not found: ${req.originalUrl}`,
    });
});
// Error handler
app.use((err, req, res, next) => {
    console.error('Error:', err.message);
    res.status(err.statusCode || 500).json({
        status: 'error',
        message: err.message || 'Internal server error',
    });
});
app.listen(port, () => {
    console.log(`✓ Server is running on port ${port}`);
    console.log(`✓ Health check: http://localhost:${port}/health`);
});
//# sourceMappingURL=index.js.map