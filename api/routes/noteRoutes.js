const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");

const {
  createNote,
  getNotes,
  clearAllNotes,
} = require("../controllers/noteController");

router.post("/", protect, createNote);

router.get("/", protect, getNotes);

router.delete("/clear", protect, clearAllNotes);

module.exports = router;
