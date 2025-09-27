const mongoose = require("mongoose");

const inboxSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  comment: { type: String, required: true },
  read: { type: Boolean, default: false },
  stared: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
},
{ collection: "usercontactdatas" }
);

module.exports = mongoose.model("Inbox", inboxSchema);
