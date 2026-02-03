import { Request, Response, NextFunction } from 'express';
import { BaseController } from '../../shared/base/controller.base';
import { ContactService } from './contact.service';
import { CreateContactInput } from './contact.validator';

export class ContactController extends BaseController {
  private contactService: ContactService;

  constructor() {
    super();
    this.contactService = new ContactService();
  }

  submitContact = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const input: CreateContactInput = req.body;
      const contact = await this.contactService.createContact({
        ...input,
        ipAddress: req.ip,
        userAgent: req.get('User-Agent'),
      });
      this.sendCreated(res, null, 'Message sent successfully');
    } catch (error) {
      next(error);
    }
  };

  getAllContacts = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;
      const search = req.query.search as string;

      const { contacts, total } = await this.contactService.getAllContacts(
        page,
        limit,
        search
      );

      this.sendPaginated(res, contacts, page, limit, total);
    } catch (error) {
      next(error);
    }
  };
}
