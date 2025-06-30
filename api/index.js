const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

require("./db/connection.js");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("API is running...");
});

const noteRoutes = require("./routes/noteRoutes");
app.use("/api/notes", noteRoutes);

const authRoutes = require("./routes/authRoutes");
app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("server is running on port", PORT);
});

console.log("Loaded MONGO_URI:", process.env.MONGO_URI);
