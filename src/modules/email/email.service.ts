import nodemailer from 'nodemailer';
import { env } from '../../config/env';
import { Logger } from '../../shared/services/logger';

interface SendEmailOptions {
  to: string;
  subject: string;
  html: string;
}

export class EmailService {
  private transporter: nodemailer.Transporter;

  constructor() {
    // Only Setup Transporter if configs are present, or use a mock/ethereal for dev
    this.transporter = nodemailer.createTransport({
      host: env.SMTP_HOST,
      port: env.SMTP_PORT,
      secure: env.SMTP_PORT === 465, // true for 465, false for other ports
      auth: {
        user: env.SMTP_USER,
        pass: env.SMTP_PASS,
      },
    });
  }

  async sendEmail(options: SendEmailOptions): Promise<void> {
    // Verify configuration before attempting to send
    if (!env.SMTP_HOST || !env.SMTP_USER) {
      Logger.warn('Email service not configured. Skipping email send.');
      throw new Error('Email service not configured');
    }

    const info = await this.transporter.sendMail({
      from: `"${env.FROM_EMAIL}" <${env.FROM_EMAIL}>`,
      to: options.to,
      subject: options.subject,
      html: options.html,
    });

    Logger.info(`Email sent: ${info.messageId}`);
  }

  async verifyConnection(): Promise<boolean> {
    if (!this.transporter) return false;
    try {
      await this.transporter.verify();
      return true;
    } catch (error) {
      return false;
    }
  }
}
