import { Model, Document, UpdateQuery } from 'mongoose';

export abstract class BaseRepository<T extends Document> {
  protected constructor(protected readonly model: Model<T>) { }

  async create(data: Partial<T>): Promise<T> {
    return await this.model.create(data);
  }

  async findOne(filter: any): Promise<T | null> {
    return await this.model.findOne(filter);
  }

  async findById(id: string): Promise<T | null> {
    return await this.model.findById(id);
  }

  async find(filter: any = {}, limit: number = 10, skip: number = 0): Promise<T[]> {
    return await this.model.find(filter).skip(skip).limit(limit);
  }

  async update(id: string, data: UpdateQuery<T>): Promise<T | null> {
    return await this.model.findByIdAndUpdate(id, data, { new: true, runValidators: true });
  }

  async delete(id: string): Promise<T | null> {
    return await this.model.findByIdAndDelete(id);
  }

  async count(filter: any = {}): Promise<number> {
    return await this.model.countDocuments(filter);
  }
}
