import { FilterQuery, Model, UpdateQuery, SaveOptions, Types } from 'mongoose';
import { DatabaseDocument } from './schema';

export abstract class Repository<TDocument extends DatabaseDocument> {
  constructor(protected readonly model: Model<TDocument>) {}

  async create(document: Omit<TDocument, '_id'>, options?: SaveOptions) {
    const createdDocument = new this.model({
      ...document,
      _id: new Types.ObjectId(),
    });
    return (await createdDocument.save(options)).toJSON();
  }

  async findOne(filterQuery: FilterQuery<TDocument>, lean = true) {
    return await this.model.findOne(filterQuery, { lean });
  }

  async findById(id: string) {
    return await this.model.findById(id);
  }

  async search(
    filterQuery: FilterQuery<TDocument>,
    limit: number,
    page: number,
  ) {
    const offset = page > 0 ? limit * (page - 1) : 0;
    return await this.model.find(filterQuery).skip(offset).limit(limit);
  }

  async findOneAndUpdate(
    filterQuery: FilterQuery<TDocument>,
    update: UpdateQuery<TDocument>,
  ) {
    return await this.model.findOneAndUpdate(filterQuery, update, {
      lean: true,
      new: true,
    });
  }

  async findOneAndDelete(filterQuery: FilterQuery<TDocument>) {
    return await this.model.findOneAndDelete(filterQuery, { lean: true });
  }

  async upsert(
    filterQuery: FilterQuery<TDocument>,
    document: UpdateQuery<TDocument>,
  ) {
    return await this.model.findOneAndUpdate(filterQuery, document, {
      lean: true,
      upsert: true,
      new: true,
    });
  }

  async findAllSortedByCreatedAt(
    filterQuery: FilterQuery<TDocument>,
    order: 'asc' | 'desc' = 'asc',
  ) {
    const sortOrder = order === 'asc' ? 1 : -1;
    return await this.model
      .find(filterQuery, {}, { lean: true })
      .sort({ createdAt: sortOrder });
  }

  async find(filterQuery: FilterQuery<TDocument>) {
    return await this.model.find(filterQuery, {}, { lean: true });
  }
}
