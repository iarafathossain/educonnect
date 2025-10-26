import mongoose from "mongoose";

type TransformMongoDoc<T> = T extends mongoose.Types.ObjectId
  ? string
  : T extends Date
  ? string
  : T extends Array<infer U>
  ? TransformMongoDoc<U>[]
  : T extends object
  ? { [k in keyof T as k extends "_id" ? "id" : k]: TransformMongoDoc<T[k]> }
  : T;

export const transformMongoDoc = <T>(doc: T): TransformMongoDoc<T> => {
  if (Array.isArray(doc)) {
    return doc.map(transformMongoDoc) as TransformMongoDoc<T>;
  }

  if (doc && typeof doc === "object") {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const result: any = {};

    for (const [key, value] of Object.entries(doc)) {
      if (key === "_id" && value instanceof mongoose.Types.ObjectId) {
        result["id"] = value.toString();
      } else if (value instanceof mongoose.Types.ObjectId) {
        result[key] = value.toString();
      } else if (value instanceof Date) {
        result[key] = value.toISOString();
      } else if (key === "imagesUrl" && Array.isArray(value)) {
        result[key] = value.map((image) => ({
          url: image.url,
          public_id: image.public_id,
          id: image._id.toString(),
        }));
      } else {
        result[key] = transformMongoDoc(value) as TransformMongoDoc<T>;
      }
    }

    return result;
  }

  return doc as TransformMongoDoc<T>;
};
