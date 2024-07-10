import mongoose from "mongoose";

// Import environment variables
require("dotenv").config();

const connectDB = async () => {
  // const URL =
  //   "mongodb+srv://rajyadav7047:rajnewpassword@cluster0.tb6lkvm.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
  mongoose
    .connect(process.env.MONGODB_URL)
    .then(() => {
      console.log("MongoDB Connected...");
    })
    .catch((error) => {
      console.error("Failed to connect to MongoDB");
      process.exit(1);
    });
};

export default connectDB;
