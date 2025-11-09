// Library
import { createContext, useState } from "react";
// Services
import { registerUser, login } from "@/services/authentication";

// Context
export const SaveInfoContext = createContext(null);

export const SaveInfoProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("user");
    return saved ? JSON.parse(saved) : null;
  });
  
  const [jwt, setJwt] = useState(() => localStorage.getItem("jwt"));

  const saveUserData = (userData, jwtToken) => {
    setUser(userData);
    setJwt(jwtToken);
  };

  const register = async (userData) => {
    return await registerUser(userData, saveUserData);
  };

  const loginUser = async (credentials) => {
    return await login(credentials, saveUserData);
  };

  return (
    <SaveInfoContext.Provider value={{ user, jwt, register, loginUser }}>
      {children}
    </SaveInfoContext.Provider>
  );
};
