// routes/contact.js
const express = require("express");
const router = express.Router();
const Contact = require("../models/Contact");

// POST /api/contact - save a message
router.post("/", async (req, res) => {
  try {
    const { name, email, comment } = req.body;   // get values from frontend
    if (!name || !email || !comment) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const contact = new Contact({ name, email, comment }); // create doc
    await contact.save(); // save to MongoDB

    res.status(201).json({ message: "Message received!", contact });
  } catch (err) {
    console.error("Error saving contact:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// GET /api/contact - fetch all messages (optional, for you only)
router.get("/", async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.json(contacts);
  } catch (err) {
    console.error("Error fetching contacts:", err);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
