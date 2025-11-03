// Axios library
import axios from "axios";

// API base URL
const API_URL = "https://strapi.arvanschool.ir/api/";

// SignUp User
export const registerUser = async (userData, saveUserData = null) => {
  const { data } = await axios.post(`${API_URL}auth/local/register`, userData);

  // save to localStorage for Registration
  localStorage.setItem("jwt", data.jwt);
  localStorage.setItem("user", JSON.stringify(data.user));
  if (saveUserData) {
    saveUserData(data.user, data.jwt);
  }
  return data.user;
};

// Login User
export const login = async (credentials, saveUserData = null) => {
  const { data } = await axios.post(`${API_URL}auth/local`, credentials);

  // save to localStorage for login
  localStorage.setItem("jwt", data.jwt);
  localStorage.setItem("user", JSON.stringify(data.user));

  if (saveUserData) {
    saveUserData(data.user, data.jwt);
  }

  return data.user;
};
