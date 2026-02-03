import { BaseRepository } from '../../shared/base/repository.base';
import { AdminUser, IAdminUser } from './admin.model';

export class AdminRepository extends BaseRepository<IAdminUser> {
  constructor() {
    super(AdminUser);
  }

  async findByEmail(email: string): Promise<IAdminUser | null> {
    return this.model.findOne({ email });
  }
}
