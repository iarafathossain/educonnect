/* eslint-disable @typescript-eslint/no-explicit-any */
import { Schema, Types } from "mongoose";

export function mongooseTransform(schema: Schema) {
  const isObjectIdLike = (value: any) =>
    value instanceof Types.ObjectId || value?._bsontype === "ObjectId";

  const toPlain = (value: any, seen: WeakSet<object> = new WeakSet()): any => {
    if (value === null || value === undefined) {
      return value;
    }

    if (isObjectIdLike(value)) {
      return String(value);
    }

    if (value instanceof Date) {
      return value.toISOString();
    }

    if (Buffer.isBuffer(value)) {
      return value.toString("base64");
    }

    if (Array.isArray(value)) {
      return value.map((item) => toPlain(item, seen));
    }

    if (typeof value === "object") {
      if (seen.has(value)) {
        return null;
      }

      seen.add(value);
      const output: Record<string, unknown> = {};

      for (const [key, currentValue] of Object.entries(value)) {
        if (key === "__v") {
          continue;
        }

        if (key === "_id") {
          output.id = toPlain(currentValue, seen);
          continue;
        }

        output[key] = toPlain(currentValue, seen);
      }

      return output;
    }

    return value;
  };

  const transform = (_: unknown, ret: any) => {
    return toPlain(ret);
  };

  schema.set("toJSON", {
    virtuals: true,
    versionKey: false,
    transform,
  });

  schema.set("toObject", {
    virtuals: true,
    versionKey: false,
    transform,
  });
}
