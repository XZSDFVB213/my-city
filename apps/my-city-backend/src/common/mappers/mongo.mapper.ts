import { Types } from 'mongoose';

export function mapMongoId<T extends { _id?: any }>(doc: T) {
  if (!doc) return doc;

  const obj = doc instanceof Object ? (doc as Record<string, any>).toObject() : doc;

  const { _id, __v, ...rest } = obj;

  return {
    id: _id instanceof Types.ObjectId ? _id.toString() : _id,
    ...rest,
  };
}