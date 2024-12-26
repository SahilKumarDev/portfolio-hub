import mongoose from "mongoose";

const MONGO_URI = process.env.MONGO_URI!;

if (!MONGO_URI) {
  throw new Error("Please define the MONGO_URI environment variable");
}

export async function connectDB() {
  try {
    const { connection } = await mongoose.connect(MONGO_URI);

    if (connection.readyState === 1) {
      console.log("MongoDB connected");
      return;
    }
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    throw error;
  }
}
