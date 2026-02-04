import app from './app';
import https from 'https';
import { env } from './config/env';
import { connectDatabase } from './database';
import { Logger } from './shared/services/logger';
import chalk from 'chalk';
import { Container } from './shared/container';

const startServer = async () => {
  // Clear console for fresh start
  console.clear();

  console.log(chalk.hex('#6495ED').bold('---------------------------------------------------'));
  console.log(chalk.hex('#6495ED').bold('          🚀 PORTFOLIO BACKEND STARTING 🚀         '));
  console.log(chalk.hex('#6495ED').bold('---------------------------------------------------'));

  await connectDatabase();

  // Verify SMTP
  const isSmtpConnected = await Container.emailService.verifyConnection();
  if (isSmtpConnected) {
    console.log(chalk.hex('#00ff00').bold('✓ SMTP Server Connected'));
  } else {
    console.log(chalk.hex('#ffa500').bold('⚠ SMTP Server Not Connected (Check credentials)'));
  }

  const server = app.listen(env.PORT || 3000, () => {
    console.log(chalk.hex('#00ffff').bold(`✓ Server running on port: ${chalk.hex('#ffffff').bold(env.PORT)}`));
    console.log(chalk.hex('#ff00ff').bold(`✓ Environment: ${chalk.hex('#ffffff').bold(env.NODE_ENV)}`));
    console.log(chalk.hex('#6495ED').bold('---------------------------------------------------'));
    Logger.info(`Server running in ${env.NODE_ENV} mode on port ${env.PORT}`);
  });

  // Keep-Alive Mechanism
  const keepAlive = () => {
    if (process.env.RENDER_EXTERNAL_URL) {
      https.get(`${process.env.RENDER_EXTERNAL_URL}/health`, (resp) => {
        if (resp.statusCode === 200) {
          console.log('Keep-alive ping sent successfully');
        } else {
          console.error('Keep-alive ping failed');
        }
      }).on('error', (err) => {
        console.error('Error sending keep-alive ping:', err.message);
      });
    }
  };

  // Ping every 14 minutes (840000 ms) to prevent sleep
  if (process.env.RENDER_EXTERNAL_URL) {
    setInterval(keepAlive, 300000);
    // Initial ping
    keepAlive();
  }

  // Handle unhandled promise rejections
  process.on('unhandledRejection', (err: Error) => {
    console.log(chalk.hex('#ff0000').bold(`✖ Unhandled Rejection: ${err.message}`));
    Logger.error(`Error: ${err.message}`);
    server.close(() => process.exit(1));
  });
};

startServer();
