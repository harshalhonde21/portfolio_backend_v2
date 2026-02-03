import mongoose from 'mongoose';
import { env } from '../config/env';
import { Logger } from '../shared/services/logger';
import chalk from 'chalk';

export const connectDatabase = async (): Promise<void> => {
  try {
    const conn = await mongoose.connect(env.MONGO_URI);
    console.log(chalk.hex('#00ff00').bold(`✓ MongoDB Connected: ${conn.connection.host}`));
    Logger.info(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error: any) {
    console.log(chalk.hex('#ff0000').bold(`✗ MongoDB Connection Error: ${error.message}`));
    Logger.error(`Error: ${error.message}`);
    process.exit(1);
  }
};
