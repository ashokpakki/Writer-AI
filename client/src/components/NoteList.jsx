// src/components/StoryView.jsx
import React, { useEffect, useState } from "react";
import { Paper, Typography, Divider } from "@mui/material";
import { getNotes } from "../services/api";

const StoryView = () => {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await getNotes();
        setNotes(response.data.reverse());
      } catch (err) {
        console.error("Failed to fetch story notes:", err);
      }
    };
    fetchNotes();
  }, []);

  return (
    <Paper
      elevation={3}
      sx={{ p: 2, bgcolor: "#1e1e1e", color: "white", borderRadius: 2 }}
    >
      <Typography variant="h6" gutterBottom>
        📝 Full Raw Story (Context)
      </Typography>
      <Divider sx={{ mb: 2, borderColor: "#444" }} />
      {notes.length === 0 ? (
        <Typography variant="body2">No story context yet.</Typography>
      ) : (
        notes.map((note, index) => (
          <Typography key={index} variant="body2" sx={{ mb: 1 }}>
            {note.content}
          </Typography>
        ))
      )}
    </Paper>
  );
};

export default StoryView;
