import React from "react";
import { IconButton, Box } from "@mui/material";
import { LightMode, DarkMode } from "@mui/icons-material";

const ThemeToggle = ({ darkMode, setDarkMode }) => {
  return (
    <Box display="flex" justifyContent="flex-end" p={2}>
      <IconButton onClick={() => setDarkMode(!darkMode)} color="inherit">
        {darkMode ? <LightMode /> : <DarkMode />}
      </IconButton>
    </Box>
  );
};

export default ThemeToggle;
