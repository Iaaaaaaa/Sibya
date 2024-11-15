import mongoose from "mongoose";

const MONGODB_URL = process.env.MONGODB_URL;

let cached = (global as any).mongoose || { conn: null, promise: null };

export const connectToDatabase = async () => {
  if (cached.conn) return cached.conn;
  if (!MONGODB_URL) throw new Error("MONGODB_URI is missing");
  //console.log("DATABASE CONNECTION IS SUCCESSFUL");
  cached.promise =
    cached.promise ||
    mongoose.createConnection(MONGODB_URL, {
      dbName: "Event_Management",
      bufferCommands: false,
    });

  cached.conn = await cached.promise;

  return cached.conn;
};
