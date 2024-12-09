const mongoose = require("mongoose");
const logger = require("./utils/logger")
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL, {
      appName: "todoapp", // Optional: sets an application name for tracking in MongoDB
    });
    logger.info("MongoDB connected!");
  } catch (error) {
    logger.error("MongoDB connection failed:", error);
    process.exit(1); // Exit process with failure
  }
};

module.exports = connectDB;
