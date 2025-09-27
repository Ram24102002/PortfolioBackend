const express = require("express");
const router = express.Router();
const Inbox = require("../models/inbox"); // model imported

// --- GET all inbox messages ---
router.get("/", async (req, res) => {
  try {
    const messages = await Inbox.find().sort({ createdAt: -1 });
    res.json(messages);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch inbox" });
  }
});

// --- PATCH: update read/unread ---
router.patch("/:id/read", async (req, res) => {
  try {
    const { id } = req.params;
    const { read } = req.body; // expects boolean true/false

    console.log("Incoming body:", req.body);

    const updated = await Inbox.findByIdAndUpdate(
      id,
      { $set: { read } },       // force update
      { new: true, runValidators: true }
    );

    if (!updated) {
      return res.status(404).json({ error: "Message not found" });
    }

    res.json(updated);
  } catch (err) {
    console.error("Update error:", err);
    res.status(500).json({ error: "Failed to update read status" });
  }
});

// --- PATCH: update Stared ---
router.patch("/:id/stared", async (req, res) => {
  try {
    const { id } = req.params;
    const { stared } = req.body; // expects boolean true/false

    console.log("Incoming body:", req.body);

    const updated = await Inbox.findByIdAndUpdate(
      id,
      { $set: { stared } },       // force update
      { new: true, runValidators: true }
    );

    if (!updated) {
      return res.status(404).json({ error: "Message not found" });
    }

    res.json(updated);
  } catch (err) {
    console.error("Update error:", err);
    res.status(500).json({ error: "Failed to update read status" });
  }
});


module.exports = router;
