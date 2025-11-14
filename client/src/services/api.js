import axios from "axios";

const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "http://localhost:5000/api",
});

API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export const createNote = (content) => API.post("/notes", { content });
export const getNotes = () => API.get("/notes");
export const register = (data) => API.post("/auth/register", data);
export const login = (data) => API.post("/auth/login", data);
export const clearNotes = () => API.delete("/notes/clear");

export default API;
