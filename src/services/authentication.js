import axios from "axios";

const API_URL = "https://strapi.arvanschool.ir/api/";


// Sign Up User
export const registerUser = async (userData) => {
    const { data } = await axios.post(`${API_URL}/auth/local/register`, userData);
    localStorage.setItem("jwt", data.jwt);
    return data.user;
};

// Login User
export const login = async (credentials) => {
  const { data } = await axios.post(`${API_URL}/auth/local`, credentials);
  localStorage.setItem("jwt", data.jwt);
  return data.user;
};