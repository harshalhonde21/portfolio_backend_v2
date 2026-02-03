import { BaseRepository } from '../../shared/base/repository.base';
import { Contact, IContact } from './contact.model';

export class ContactRepository extends BaseRepository<IContact> {
  constructor() {
    super(Contact);
  }
}
