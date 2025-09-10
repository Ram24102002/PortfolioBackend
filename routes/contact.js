// routes/contact.js
const express = require("express");
const router = express.Router();
const Contact = require("../models/contact");
const Resend = require("resend").Resend;


const resend = new Resend(process.env.RESEND_API_KEY); // use .env variable

// POST /api/contact - save a message + send email
router.post("/", async (req, res) => {
  try {
    const { name, email, comment } = req.body;

    if (!name || !email || !comment) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // 1️⃣ Save to MongoDB
    const contact = new Contact({ name, email, comment });
    await contact.save();

    // 2️⃣ Send email via Resend
    await resend.emails.send({
      from: "onboarding@resend.dev", // must be a verified sender
      to: "ramachandran24102002@gmail.com", // your email
      subject: "New Contact Form Submission",
      html: `
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${comment}</p>
      `,
    });

    res.status(201).json({ message: "Message received and email sent!", contact });
  } catch (err) {
    console.error("Error in contact route:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// GET /api/contact - fetch all messages
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
