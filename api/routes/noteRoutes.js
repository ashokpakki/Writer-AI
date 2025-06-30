const express = require("express");
const router = express.Router();
const { createNote } = require("../controllers/noteController");
const { getNotes } = require("../controllers/noteController");
const { createNoteWithAI } = require("../controllers/noteController");
const protect = require("../middleware/authMiddleware");

router.post("/", protect, createNote);
router.get("/", protect, getNotes);
router.post("/ai", protect, createNoteWithAI);
module.exports = router;
