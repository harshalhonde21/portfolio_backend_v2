import { Request, Response, NextFunction } from 'express';
import { BaseController } from '../../shared/base/controller.base';
import { AuthService } from './admin.service';

export class AdminController extends BaseController {
  private authService: AuthService;

  constructor() {
    super();
    this.authService = new AuthService();
  }

  register = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const admin = await this.authService.register(req.body);
      this.sendCreated(res, admin, 'Admin registered successfully');
    } catch (error) {
      next(error);
    }
  };

  login = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password } = req.body;
      const { token, user } = await this.authService.login(email, password);
      this.sendSuccess(res, { token, user }, 'Login successful');
    } catch (error) {
      next(error);
    }
  };

  getMe = (req: Request, res: Response) => {
    // req.user is populated by protect middleware
    // In a real app, you might want to fetch fresh data from DB
    this.sendSuccess(res, (req as any).user, 'Token verified');
  };
}
