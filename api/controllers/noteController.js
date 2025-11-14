const Note = require("../models/Note");
const grammarClean = require("../utils/generateRewrittenNote");

const createNote = async (req, res) => {
  try {
    const { content } = req.body;
    const userId = req.user.id;

    const rewritten = await grammarClean(content);

    const note = new Note({
      user: userId,
      content,
      rewritten,
    });

    await note.save();

    res.status(201).json({ message: "Note created successfully", note });
  } catch (err) {
    console.error("Note creation error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getNotes = async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user.id }).sort({
      createdAt: 1,
    });
    res.status(200).json(notes);
  } catch (err) {
    console.error("Note fetch error:", err);
    res.status(500).json({ message: "Failed to fetch notes" });
  }
};

const clearAllNotes = async (req, res) => {
  try {
    await Note.deleteMany({ user: req.user.id });
    res.status(200).json({ message: "All notes deleted successfully" });
  } catch (err) {
    console.error("Clear notes error:", err);
    res.status(500).json({ message: "Failed to delete notes" });
  }
};

module.exports = {
  createNote,
  getNotes,
  clearAllNotes,
};
