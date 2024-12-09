const mongoose = require("mongoose");

// Define the schema for the "Todo" model
const todoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Title is required"], // Add a custom error message for better debugging
    trim: true, // Automatically remove extra spaces
  },
  completed: {
    type: Boolean,
    default: false,
  },
}, {
  timestamps: true, // Automatically add createdAt and updatedAt fields
});

// Export the model
module.exports = mongoose.model("Todo", todoSchema);
