import React, { useMemo, useState, useEffect } from "react";
import {
  createTheme,
  ThemeProvider,
  CssBaseline,
  Button,
  Box,
  AppBar,
  Toolbar,
  Typography,
} from "@mui/material";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useNavigate,
} from "react-router-dom";

import Home from "./pages/home";
import Login from "./components/Login";
import Register from "./components/Register";
import ThemeToggle from "./components/ThemeToggle";
import bg from "./assets/wall.png";

const AppWrapper = () => {
  return (
    <Router>
      <App />
    </Router>
  );
};

const App = () => {
  const [darkMode, setDarkMode] = useState(true);
  const [auth, setAuth] = useState(false);
  const navigate = useNavigate(); // ✅ placed correctly inside <Router>

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) setAuth(true);
  }, []);

  const theme = useMemo(
    () => createTheme({ palette: { mode: darkMode ? "dark" : "light" } }),
    [darkMode]
  );

  const handleLogout = () => {
    localStorage.removeItem("token");
    setAuth(false);
    navigate("/login");
  };

  return (
    <div
      className="w-screen h-screen bg-cover bg-center flex flex-col"
      style={{
        height: "100vh",
        width: "100vw",
        backgroundImage: `url(${bg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AppBar position="static" color="default" elevation={1}>
          <Toolbar sx={{ justifyContent: "space-between" }}>
            <Typography variant="h6" fontWeight={600}>
              ✍️ Where Ideas Become Words
            </Typography>
            <Box sx={{ display: "flex", gap: 2 }}>
              <ThemeToggle darkMode={darkMode} setDarkMode={setDarkMode} />
              <Button
                onClick={handleLogout}
                variant="contained"
                color="error"
                sx={{ ml: 2 }}
                root={{
                  boxShadow: "0px 4px 10px rgba(0,0,0,0.2)",
                  borderRadius: "12px",
                  textTransform: "none",
                }}
              >
                Logout
              </Button>
            </Box>
          </Toolbar>
        </AppBar>

        <Box sx={{ flexGrow: 1, px: 3, pt: 2 }}>
          <Routes>
            <Route
              path="/"
              element={auth ? <Home /> : <Navigate to="/login" />}
            />
            <Route path="/login" element={<Login setAuth={setAuth} />} />
            <Route path="/register" element={<Register setAuth={setAuth} />} />
          </Routes>
        </Box>
      </ThemeProvider>
    </div>
  );
};

export default AppWrapper;
