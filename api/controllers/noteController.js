const Note = require("../models/Note");
const generateRewrittenNote = require("../utils/generateRewrittenNote");

// const rewriteContent = async (content) => {
//   return `🧠 [AI Rewrite]: ${content
//     .replace(/Kaori/gi, "Kaori-chan")
//     .replace(/Yuichi/gi, "Yuichi-sama")}`;
// };
const createNote = async (req, res) => {
  try {
    const { content } = req.body;

    const note = new Note({
      user: req.user.id,
      content,
      rewritten: "",
    });

    await note.save();

    const rewritten = await rewriteContent(content);
    note.rewritten = rewritten;
    await note.save();

    res.status(201).json({ message: "Note created successfully", note });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getNotes = async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user.id }).sort({
      createdAt: -1,
    });
    res.status(200).json(notes);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "failed to fetch notes" });
  }
};

const createNoteWithAI = async (req, res) => {
  try {
    const { content } = req.body;
    const userId = req.user.id;

    const previousNotes = await Note.find({ user: userId }).sort({
      createdAt: 1,
    });
    const context = previousNotes.map((note) => note.content).join("\n");

    const rewritten = await generateRewrittenNote(context, content);

    const note = new Note({
      user: userId,
      content,
      rewritten,
    });

    await note.save();

    res
      .status(201)
      .json({ message: "AI-generated Note created succesfully", note });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to create AI-generated note" });
  }
};

module.exports = {
  createNote,
  getNotes,
  createNoteWithAI,
};
