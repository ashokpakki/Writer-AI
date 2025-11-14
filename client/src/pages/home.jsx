import {
  Box,
  Typography,
  Card,
  CardContent,
  TextField,
  Button,
  Paper,
} from "@mui/material";
import { useState, useEffect } from "react";
import NoteOutput from "../components/NoteOutput";
import AIStoryPanel from "../components/AIStoryPanel";
import { getNotes, createNote, clearNotes } from "../services/api";

const Home = () => {
  const [input, setInput] = useState("");
  const [rewritten, setRewritten] = useState("");
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await getNotes();
        setNotes(res.data);
      } catch (err) {
        console.error("Failed to fetch notes:", err);
      }
    };
    fetchNotes();
  }, []);
  const handleSubmit = async () => {
    if (!input.trim()) return;
    try {
      const res = await createNote(input);
      setRewritten(res.data.note.rewritten || "AI Failed");
      setNotes((prev) => [...prev, res.data.note]);
      setInput("");
    } catch (err) {
      console.error("Error creating note:", err);
    }
  };

  const handleClear = async () => {
    try {
      await clearNotes();
      setRewritten("");
      setNotes([]);
      console.log("All notes cleared.");
    } catch (err) {
      console.error("Failed to clear notes", err);
    }
  };

  return (
    <Box sx={{ p: 2, minHeight: "90vh", bgcolor: "background.default" }}>
      <Typography
        variant="h3"
        align="center"
        elevation={10}
        sx={{
          fontWeight: 1000,
          fontFamily: `'Orbitron', sans-serif`,
          background: "linear-gradient(90deg, #00C9FF, #92FE9D)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          textShadow: "0 2px 4px rgba(87, 72, 72, 0.2)",
          mb: 4,
        }}
      >
        Writer Studio AI
      </Typography>
      <Paper
        elevation={7}
        sx={{
          p: 2,
          border: "1px solid #ccc",
          borderRadius: 4,
          bgcolor: "background.paper",
        }}
      >
        <Box sx={{ display: "flex", gap: 2, px: 2, flexWrap: "wrap" }}>
          {/* Left Side - Input */}
          <Box sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
            <Card sx={{ flexGrow: 1 }}>
              <CardContent
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  height: "100%",
                }}
              >
                <Typography variant="h6">Raw Input</Typography>
                <TextField
                  multiline
                  minRows={8}
                  maxRows={14}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  fullWidth
                  sx={{ mt: 2, flexGrow: 1, overflowY: "auto" }}
                />
                <Button
                  variant="contained"
                  onClick={handleSubmit}
                  sx={{ mt: 2 }}
                >
                  Submit
                </Button>
              </CardContent>
            </Card>
          </Box>

          {/* Right Side - Outputs */}
          <Box
            sx={{ flex: 1, display: "flex", flexDirection: "column", gap: 2 }}
          >
            <NoteOutput rewritten={rewritten} />
            <AIStoryPanel notes={notes} />
            <Button
              variant="contained"
              color="error"
              onClick={handleClear}
              sx={{ alignSelf: "flex-start" }}
            >
              Clear All Notes
            </Button>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

export default Home;
