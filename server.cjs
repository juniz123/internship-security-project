const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const csrf = require("csurf");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");

const app = express();

// ✅ ONLY ONE CSP BLOCK HERE
app.use((req, res, next) => {
  res.setHeader(
    "Content-Security-Policy",
    "default-src 'self'; " +
    "script-src 'self' https://apis.google.com https://accounts.google.com; " +
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://accounts.google.com; " +
    "font-src 'self' https://fonts.gstatic.com; " +
    "img-src 'self' data:; " +
    "connect-src 'self' https://oauth2.googleapis.com; " +
    "frame-src https://accounts.google.com; " +
    "frame-ancestors 'none';"
  );
  next();
});

// Middlewares
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());
app.use(cookieParser());
app.use(helmet());

const csrfProtection = csrf({ cookie: true });
app.use(csrfProtection);

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});
app.use(limiter);

// Routes
app.get("/api/csrf-token", (req, res) => {
  res.cookie("XSRF-TOKEN", req.csrfToken());
  res.json({ csrfToken: req.csrfToken() });
});

app.post("/api/login", (req, res) => {
  const { email, password } = req.body;
  if (email === "admin@example.com" && password === "password123") {
    res.status(200).json({ success: true });
  } else {
    res.status(401).json({ success: false, message: "Invalid credentials" });
  }
});

app.post("/api/google-login", (req, res) => {
  const { token } = req.body;
  if (!token) {
    return res.status(400).json({ message: "Missing token" });
  }
  res.status(200).json({ message: "Google login success" });
});

app.listen(3000, () => {
  console.log("✅ Backend running at http://localhost:3000");
});
