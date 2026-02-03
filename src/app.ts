import express, { Application } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import compression from 'compression';
import rateLimit from 'express-rate-limit';
import { env } from './config/env';
import { stream } from './shared/services/logger';
import { errorHandler } from './middlewares/error.middleware';
import { RATE_LIMIT_MAX, RATE_LIMIT_WINDOW } from './constants';

// Import Routes
import contactRoutes from './modules/contact/contact.routes';
import adminRoutes from './modules/admin/admin.routes';

const app: Application = express();

// Security Middleware
app.use(helmet());
app.use(cors());

// Rate Limiting
const limiter = rateLimit({
  windowMs: RATE_LIMIT_WINDOW,
  max: RATE_LIMIT_MAX,
});
app.use('/api', limiter);

// Logging
app.use(morgan(env.NODE_ENV === 'development' ? 'dev' : 'combined', { stream }));

// Body Parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(compression());

// Health Check
app.get('/health', (req, res) => {
  res.status(200).json({ success: true, message: 'Server is healthy' });
});

// Routes
app.use('/api/v1/contact', contactRoutes);
app.use('/api/v1/admin', adminRoutes);

// Error Handling
app.use(errorHandler);

export default app;
