const express = require("express");
const router = express.Router();
const Inbox = require("../models/inbox"); // model imported

// GET all inbox messages
router.get("/", async (req, res) => {
  try {
    const messages = await Inbox.find().sort({ createdAt: -1 });
    res.json(messages);
    // console.log(messages);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch inbox" });
  }
});

module.exports = router;
