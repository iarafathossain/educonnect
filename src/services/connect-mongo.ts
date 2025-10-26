import mongoose from "mongoose";

declare global {
  // add a typed global mongoose cache to avoid TS errors when accessing global.mongoose
  // eslint-disable-next-line no-var
  var mongoose:
    | {
        conn: mongoose.Mongoose | null;
        promise: Promise<mongoose.Mongoose | null> | null;
      }
    | undefined;
}

export const connectDB = async () => {
  const MONGO_CONNECTION_STRING = process.env.MONGO_URI;

  if (!MONGO_CONNECTION_STRING) {
    throw new Error(
      "Please define the mongo connection string in the .env file"
    );
  }

  let cached = global.mongoose;

  if (!cached) {
    cached = global.mongoose = { conn: null, promise: null };
  }

  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGO_CONNECTION_STRING, {
      bufferCommands: false,
    });
  }

  try {
    cached.conn = await cached.promise;
    console.log("✅ MongoDB is connected");
  } catch (error) {
    cached.promise = null;
    throw error;
  }

  return cached.conn;
};
