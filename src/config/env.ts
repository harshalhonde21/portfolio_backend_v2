import { cleanEnv, str, num, port, url } from 'envalid';
import dotenv from 'dotenv';
import path from 'path';

// Load .env file
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

export const env = cleanEnv(process.env, {
  NODE_ENV: str({ choices: ['development', 'test', 'production', 'staging'] }),
  PORT: port({ default: 5000 }),
  MONGO_URI: url(),
  JWT_SECRET: str(),
  JWT_EXPIRES_IN: str({ default: '1d' }),
  ADMIN_EMAIL: str({ default: 'admin@example.com' }),
  SMTP_HOST: str({ default: '' }),
  SMTP_PORT: num({ default: 587 }),
  SMTP_USER: str({ default: '' }),
  SMTP_PASS: str({ default: '' }),
  FROM_EMAIL: str({ default: 'no-reply@portfolio.com' }),
});
