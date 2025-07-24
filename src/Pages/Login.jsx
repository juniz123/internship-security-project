// src/pages/Login.jsx
import React from 'react';
import { useState } from "react";
import axios from "axios";
import { useAuth } from "../AuthContext";
import { GoogleLogin } from "@react-oauth/google";

export default function LoginPage() {
  const { loginWithGoogle, csrfToken } = useAuth();
  const [form, setForm] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/login", form, {
        headers: {
          "X-CSRF-Token": csrfToken,
        },
        withCredentials: true,
      });
      console.log("Login Success", res.data);
    } catch (err) {
      console.error("Login failed:", err.response?.data || err.message);
    }
  };

  return (
    <div>
      <h1>Login Page</h1>
      <form onSubmit={handleSubmit}>
        <input name="email" value={form.email} onChange={handleChange} />
        <input name="password" type="password" value={form.password} onChange={handleChange} />
        <button type="submit">Login</button>
      </form>

      <GoogleLogin
        onSuccess={loginWithGoogle}
        onError={() => console.log("Google login failed")}
      />
    </div>
  );
}
