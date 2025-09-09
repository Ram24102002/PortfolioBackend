// models/Contact.js
const mongoose = require("mongoose");

// Define schema for contact form
const ContactSchema = new mongoose.Schema({
  name: { type: String, required: true },    // user's name
  email: { type: String, required: true },   // user's email
  comment: { type: String, required: true }, // user's comment/message
  createdAt: { type: Date, default: Date.now } // timestamp
});

// Export model
module.exports = mongoose.model("UserContactData", ContactSchema);
