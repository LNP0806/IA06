import axios from "axios";

const API_BASE = process.env.REACT_APP_API_BASE || "http://localhost:3001";

export const API_URL = "https://ia06.onrender.com";

export async function registerUser({ email, password }) {
  // trả về data JSON của API
  const res = await axios.post(`${API_URL}/user/register`, { email, password });
  return res.data;
};

export const loginUser = async (data) => {
  const res = await axios.post(`${API_URL}/user/login`, data);
  return res.data;
};
