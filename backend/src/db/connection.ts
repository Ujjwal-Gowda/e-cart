import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const URI = process.env.MONGO_URI || "";

export const connectDB = async () => {
  try {
    console.log("connecting to mongodb");
    await mongoose.connect(URI);
    console.log("mongodb connected");
  } catch (error) {
    console.log("mongodb connection failed", error);
    process.exit(1);
  }
};
