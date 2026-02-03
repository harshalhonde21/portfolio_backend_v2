import { ContactRepository } from './contact.repository';
import { EmailService } from '../email/email.service';
import { IContact } from './contact.model';
import { env } from '../../config/env';
import { Container } from '../../shared/container';

export class ContactService {
  private contactRepo: ContactRepository;
  private emailService: EmailService;

  constructor() {
    this.contactRepo = new ContactRepository();
    // In a real DI system, these would be injected via constructor
    this.emailService = Container.emailService;
  }

  async createContact(data: Partial<IContact>): Promise<IContact> {
    const contact = await this.contactRepo.create(data);

    // Send Notification Email to Admin
    const emailContent = `
      <h3>New Contact Submission</h3>
      <p><strong>Name:</strong> ${contact.name}</p>
      <p><strong>Email:</strong> ${contact.email}</p>
      <p><strong>Subject:</strong> ${contact.subject}</p>
      <p><strong>Message:</strong></p>
      <p>${contact.message}</p>
      <hr>
      <p><small>Source: ${contact.source || 'N/A'}</small></p>
    `;

    await this.emailService.sendEmail({
      to: env.ADMIN_EMAIL,
      subject: `[Portfolio] New Message: ${contact.subject}`,
      html: emailContent,
    });

    return contact;
  }

  async getAllContacts(page: number = 1, limit: number = 10, search?: string) {
    const skip = (page - 1) * limit;

    // Build filter
    const filter: any = {};
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { subject: { $regex: search, $options: 'i' } },
      ];
    }

    const contacts = await this.contactRepo.find(filter, limit, skip);
    const total = await this.contactRepo.count(filter);

    return { contacts, total };
  }
}
