import {
  Box,
  Grid,
  Typography,
  Card,
  CardContent,
  TextField,
  Button,
  Paper,
} from "@mui/material";
import { useState } from "react";
import NoteOutput from "../components/NoteOutput";
import AIStoryPanel from "../components/AIStoryPanel";
import { createNote, clearNotes } from "../services/api";

const Home = () => {
  const [input, setInput] = useState("");
  const [rewritten, setRewritten] = useState("");
  const [notes, setNotes] = useState([]);

  const handleSubmit = async () => {
    if (!input.trim()) return;
    try {
      const res = await createNote(input);
      setRewritten(res.data.note.rewritten);
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
        <Grid container spacing={2}>
          {/* LEFT: RAW INPUT */}
          <Grid item xs={20} md={10}>
            <Card
              elevation={10}
              sx={{
                width: "100%",
                height: "90%",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h5" gutterBottom>
                  Story Draft
                </Typography>
                <TextField
                  multiline
                  rows={20}
                  fullWidth
                  variant="outlined"
                  placeholder="Start typing your story..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                />
                <Button
                  variant="contained"
                  sx={{ mt: 4 }}
                  fullWidth
                  onClick={handleSubmit}
                >
                  Submit
                </Button>
              </CardContent>
            </Card>
          </Grid>

          {/* RIGHT: OUTPUTS */}
          <Grid item xs={20} md={10}>
            <Box
              elevation={8}
              sx={{
                height: "90%",
                display: "flex",
                flexDirection: "column",
                gap: 2,
              }}
            >
              <NoteOutput rewritten={rewritten} />
              <AIStoryPanel notes={notes} />
              <Button variant="outlined" color="error" onClick={handleClear}>
                Clear All Notes
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};

export default Home;
