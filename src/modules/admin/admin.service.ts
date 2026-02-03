import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { env } from '../../config/env';
import { AppError } from '../../middlewares/error.middleware';
import { AdminRepository } from './admin.repository';
import { IAdminUser } from './admin.model';
import { Logger } from '../../shared/services/logger';

export class AuthService {
  private adminRepo: AdminRepository;

  constructor() {
    this.adminRepo = new AdminRepository();
  }

  async register(data: Partial<IAdminUser>): Promise<IAdminUser> {
    const existing = await this.adminRepo.findByEmail(data.email!);
    if (existing) {
      throw new AppError('Email already exists', 409);
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(data.passwordHash!, salt);

    const newAdmin = await this.adminRepo.create({
      ...data,
      passwordHash: hash,
      isVerified: true, // Auto-verify for now, or implement email flow
    });

    // Remove password from response (handled in controller or transformation)
    return newAdmin;
  }

  async login(email: string, password: string): Promise<{ token: string; user: IAdminUser }> {
    const user = await this.adminRepo.findByEmail(email);
    if (!user) {
      throw new AppError('Invalid credentials', 401);
    }

    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
      throw new AppError('Invalid credentials', 401);
    }

    const token = this.generateToken(user);

    // Update last login
    await this.adminRepo.update((user._id as unknown) as string, { lastLoginAt: new Date() });

    return { token, user };
  }

  private generateToken(user: IAdminUser): string {
    return jwt.sign(
      { id: user._id, role: user.role },
      env.JWT_SECRET,
      { expiresIn: env.JWT_EXPIRES_IN } as jwt.SignOptions
    );
  }
}
