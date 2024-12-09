const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const connectDB = require("./db"); // Ensure the correct path to db.js
const todoRoutes = require("./routes/todoRoutes"); // Ensure the correct path to todoRoutes.js

dotenv.config();

const app = express();

// Middleware
app.use(cors()); // Enable Cross-Origin Resource Sharing
app.use(bodyParser.json()); // Parse JSON bodies
app.use(express.json()); // Alternative to body-parser (for newer versions of Express)

// Routes
app.use("/api", todoRoutes); // Route all "/api" requests to todoRoutes

// Database Connection
connectDB()
  .then(() => {
    console.log("Database connected successfully");
  })
  .catch((error) => {
    console.error("Database connection failed:", error);
    process.exit(1); // Exit the process if DB connection fails
  });

// Export app for use in a separate server file
module.exports = app;
