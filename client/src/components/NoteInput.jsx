import React, { useState } from "react";
import { Box, TextField, Button } from "@mui/material";

const NoteInput = ({ onSubmit }) => {
  const [input, setInput] = useState("");

  const handleClick = () => {
    if (input.trim()) {
      onSubmit(input);
      setInput("");
    }
  };

  return (
    <Box display="flex" flexDirection="column" gap={2} mt={3}>
      <TextField
        label="Your Raw Input"
        multiline
        rows={4}
        variant="outlined"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <Button variant="contained" onClick={handleClick}>
        Submit
      </Button>
    </Box>
  );
};

export default NoteInput;
