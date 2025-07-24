const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const csrf = require("csurf");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");

app.use((req, res, next) => {
  res.setHeader("Content-Security-Policy", 
    "default-src 'self'; " +
    "script-src 'self' https://apis.google.com https://accounts.google.com; " +
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; " +
    "font-src https://fonts.gstatic.com; " +
    "img-src 'self' data:; " +
    "connect-src 'self' https://oauth2.googleapis.com; " +
    "frame-src https://accounts.google.com; " +
    "frame-ancestors 'none';"
  );
  next();
});
// Enable CORS for your Vite React frontend
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));
const express = require('express');
const app = express();

// ⬇️ Add this BEFORE your routes

// Prevent Clickjacking
app.use((req, res, next) => {
  res.setHeader("X-Frame-Options", "DENY");
  res.setHeader("Content-Security-Policy", "frame-ancestors 'none'");
  next();
});


// Basic middleware
app.use(express.json());
app.use(cookieParser());
app.use(helmet());

// CSP header
app.use((req, res, next) => {
  res.setHeader(
    "Content-Security-Policy",
    "default-src 'self'; style-src 'self' 'unsafe-inline' https://accounts.google.com; script-src 'self' https://accounts.google.com https://apis.google.com;"
  );
  next();
});

// CSRF protection
const csrfProtection = csrf({ cookie: true });
app.use(csrfProtection);

// Rate limiter
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});
app.use(limiter);

// CSRF token route
app.get("/api/csrf-token", (req, res) => {
  res.cookie("XSRF-TOKEN", req.csrfToken());
  res.json({ csrfToken: req.csrfToken() });
});

// Dummy login route
app.post("/api/login", (req, res) => {
  const { email, password } = req.body;
  if (email === "admin@example.com" && password === "password123") {
    res.status(200).json({ success: true });
  } else {
    res.status(401).json({ success: false, message: "Invalid credentials" });
  }
});

// Dummy Google login route
app.post("/api/google-login", (req, res) => {
  const { token } = req.body;
  if (!token) {
    return res.status(400).json({ message: "Missing token" });
  }
  res.status(200).json({ message: "Google login success" });
});

// Start the backend
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`✅ Backend running on http://localhost:${PORT}`);
});
