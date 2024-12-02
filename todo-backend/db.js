const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL, {
      appName: "todoapp", // Optional: sets an application name for tracking in MongoDB
    });
    console.log("MongoDB connected!");
  } catch (error) {
    console.error("MongoDB connection failed:", error);
    process.exit(1); // Exit process with failure
  }
};

module.exports = connectDB;
