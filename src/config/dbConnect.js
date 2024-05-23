import mongoose from "mongoose";
const url = process.env.MONGODB_URL;

export const connectDB = async () => {
  try {
    const con = await mongoose.connect(url);
    con && console.log("db connected");
  } catch (error) {
    console.log(error);
  }
};
