// src/components/AIStoryPanel.jsx
import React, { useEffect, useState } from "react";
import { Paper, Typography, Divider } from "@mui/material";
import { getNotes } from "../services/api";

const AIStoryPanel = () => {
  const [aiStory, setAiStory] = useState("");

  useEffect(() => {
    const fetchRewrittenStory = async () => {
      try {
        const response = await getNotes();
        const rewrittenNotes = response.data
          .map((note) => note.rewritten.trim())
          .filter(Boolean)
          .join(" ");
        setAiStory(rewrittenNotes);
      } catch (err) {
        console.error("Failed to fetch AI story:", err);
      }
    };

    fetchRewrittenStory();
  }, []);

  return (
    <Paper
      elevation={3}
      sx={{
        p: 2,
        bgcolor: "#1e1e1e",
        color: "white",
        borderRadius: 2,
        height: "80vh",
        overflowY: "auto",
      }}
    >
      <Typography variant="h6" gutterBottom>
        ✨ Generated Story So Far
      </Typography>
      <Divider sx={{ mb: 2, borderColor: "#444" }} />
      <Typography variant="body2" sx={{ whiteSpace: "pre-line" }}>
        {aiStory || "No rewritten story yet. Start writing!"}
      </Typography>
    </Paper>
  );
};

export default AIStoryPanel;
