import axios from "axios";

const API_BASE = process.env.REACT_APP_API_BASE || "http://localhost:3001";

export const API_URL = "https://ia06.onrender.com";

export async function registerUser({ email, password }) {
  const res = await axios.post(`${API_URL}/register`, { email, password });
  return res.data;
};
