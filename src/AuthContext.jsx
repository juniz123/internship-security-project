
// src/AuthContext.jsx
import React from 'react';
import { createContext, useContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import axios from "axios";


const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [csrfToken, setCsrfToken] = useState("");

  useEffect(() => {
    axios.get("/api/csrf-token", { withCredentials: true }).then((res) => {
      setCsrfToken(res.data.csrfToken);
    });
  }, []);

  const loginWithGoogle = async (credentialResponse) => {
    try {
      const decoded = jwtDecode(credentialResponse.credential);
      setUser(decoded);

      await axios.post(
        "/api/google-login",
        { token: credentialResponse.credential },
        {
          headers: {
            "X-CSRF-Token": csrfToken,
          },
          withCredentials: true,
        }
      );
    } catch (err) {
      console.error("Google login error", err);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loginWithGoogle, csrfToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
