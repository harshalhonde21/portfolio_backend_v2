import { EmailService } from '../modules/email/email.service';

// Initialize Services
const emailService = new EmailService();

// Export as a container object (or individual exports)
export const Container = {
  emailService,
};
