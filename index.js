// index.js
const express = require("express");   // import express
const cors = require("cors");         // allow frontend requests
const mongoose = require("mongoose"); // MongoDB ODM
require("dotenv").config();           // load .env variables

const app = express();                // create app instance

// --- Middleware ---
app.use(cors());                      // allow all origins (frontend to connect)
app.use(express.json());               // parse JSON bodies

// --- Connect to MongoDB ---
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("✅ MongoDB connected"))
.catch(err => console.error("❌ DB Error:", err));

// --- Routes ---
const contactRouter = require("./routes/contact"); // import routes
app.use("/api/contact", contactRouter);            // mount at /api/contact

// use inbox routes
const inboxRoutes = require("./routes/inbox");
app.use("/api/inbox", inboxRoutes);


// --- Start server ---
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));



