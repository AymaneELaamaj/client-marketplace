import { useState } from "react";
import api from "../api/axios";
import { AuthContext } from "./AuthContext";

function getStoredUser() {
  const storedUser = localStorage.getItem("authUser");

  return storedUser ? JSON.parse(storedUser) : null;
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(getStoredUser);
  const [token, setToken] = useState(() => localStorage.getItem("authToken"));

  const login = async ({ email, password }) => {
    const response = await api.post("/auth/login", { email, password });
    const nextUser = response.data.user;
    const nextToken = response.data.token;

    localStorage.setItem("authUser", JSON.stringify(nextUser));
    localStorage.setItem("authToken", nextToken);

    setUser(nextUser);
    setToken(nextToken);

    return nextUser;
  };

  const register = async ({ name, email, password }) => {
    return api.post("/auth/register", { name, email, password });
  };

  const logout = () => {
    localStorage.removeItem("authUser");
    localStorage.removeItem("authToken");
    setUser(null);
    setToken(null);
  };

  const value = {
    user,
    token,
    isAuthenticated: Boolean(token),
    isAdmin: user?.role?.toLowerCase() === "admin",
    login,
    register,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
