import mongoose from 'mongoose';

declare global {
  var mongoose: {
    conn: typeof mongoose | null;
    promise: Promise<typeof mongoose> | null;
  } | undefined;
}

const MONGODB_URI = process.env.MONGODB_URI!;

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
}

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function connectToDatabase() {
  // @ts-expect-error cached is possibly undefined
  if (cached.conn) {
    // @ts-expect-error cached is possibly undefined
    return cached.conn;
  }

  // @ts-expect-error cached is possibly undefined
  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    // @ts-expect-error cached is possibly undefined
    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      console.log('Connected to MongoDB');
      return mongoose;
    });
  }

  try {
    // @ts-expect-error cached is possibly undefined
    cached.conn = await cached.promise;
  } catch (error) {
    // @ts-expect-error cached is possibly undefined
    cached.promise = null;
    console.error('MongoDB connection error:', error);
    throw error;
  }

  // @ts-expect-error cached is possibly undefined
  return cached.conn;
}

export default connectToDatabase;