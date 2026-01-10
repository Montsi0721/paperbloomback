import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import helmet from 'helmet';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import productRoutes from './routes/products.routes.js';
import orderRoutes from './routes/orders.routes.js';
import reviewRoutes from './routes/reviews.routes.js';
import adminRoutes from './routes/admin.routes.js';
import adminAnalytics from './routes/admin.analytics.js';
import analyticsRoutes from './routes/analytics.routes.js';
import paymentRoutes from './routes/payments.routes.js';

const app = express();

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,  // 15 minutes
    max: 100,  // Limit each IP to 100 requests per window
    message: 'Too many requests, please try again later.'
});

app.use(limiter);

// Use helmet with simplified CSP for API
app.use(helmet({
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"],
            connectSrc: ["'self'"]
        }
    }
}));

app.use(morgan('dev'));

// Allow frontend domain to access API
app.use(cors({
  origin: [
    'http://localhost:3000', 
    'http://127.0.0.1:5500',
    'https://paper-bloom.onrender.com'  // Your frontend domain
  ],
  credentials: true  // If using cookies/auth
}));

app.use(express.json());
app.set('trust proxy', 1); // or true

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// API Routes
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/admin/analytics', adminAnalytics);
app.use('/api/analytics', analyticsRoutes);
app.use('/images', express.static(path.join(__dirname, 'images')));

// Root route - API documentation
app.get('/', (req, res) => {
    res.json({
        message: 'Paper Bloom API Server',
        version: '1.0.0',
        frontend: 'https://paper-bloom.onrender.com',
        apiBase: 'https://paperbloomback.onrender.com/api',
        endpoints: {
            products: {
                GET: '/api/products',
                POST: '/api/products'
            },
            orders: {
                GET: '/api/orders',
                POST: '/api/orders'
            },
            reviews: '/api/reviews',
            admin: '/api/admin',
            payments: '/api/payments',
            analytics: '/api/analytics'
        },
        status: 'online'
    });
});

// Health check endpoint (for Render monitoring)
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'healthy', timestamp: new Date().toISOString() });
});

// 404 handler for undefined routes
app.use('*', (req, res) => {
    res.status(404).json({
        error: 'Not Found',
        message: `Route ${req.originalUrl} does not exist on this server`,
        availableEndpoints: [
            '/api/products',
            '/api/orders',
            '/api/reviews',
            '/api/admin',
            '/api/payments',
            '/api/analytics'
        ]
    });
});

// Global error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ 
        message: 'Internal Server Error',
        error: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
});


export default app;

