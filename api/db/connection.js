const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
  })

  .then(() => console.log("connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err.message));
