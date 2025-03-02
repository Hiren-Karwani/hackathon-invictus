require("dotenv").config();
const express = require("express");
const axios = require("axios");
const cors = require("cors");
const mysql = require("mysql");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");

const app = express();
const PORT = process.env.PORT || 5000;
const CORE_API_KEY = "AkWegImizusCtaYpD82OXx3yKZqdVBUr";
const JWT_SECRET = process.env.JWT_SECRET;

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

// Database connection
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

db.connect(err => {
  if (err) {
    console.error("Database connection failed:", err);
  } else {
    console.log("Connected to MySQL Database");
  }
});

// 🔹 USER SIGNUP API
app.post("/signup", async (req, res) => {
  const { name, email, mobile, password } = req.body;
  if (!name || !email || !mobile || !password) {
    return res.status(400).json({ error: "Please fill in all fields" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const sql = "INSERT INTO users (name, email, mobile, password) VALUES (?, ?, ?, ?)";

  db.query(sql, [name, email, mobile, hashedPassword], (err, result) => {
    if (err) {
      return res.status(500).json({ error: "Database error" });
    }

    const token = jwt.sign({ userId: result.insertId, email }, JWT_SECRET, { expiresIn: "1h" });
    res.json({ message: "Signup successful", token });
  });
});

// 🔹 USER LOGIN API
app.post("/login", (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: "Please fill in all fields" });
  }

  const sql = "SELECT * FROM users WHERE email = ?";
  db.query(sql, [email], async (err, results) => {
    if (err) return res.status(500).json({ error: "Database query error" });

    if (results.length === 0) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const user = results[0];
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const token = jwt.sign({ userId: user.id, email: user.email }, JWT_SECRET, { expiresIn: "1h" });
    res.json({ message: "Login successful", token });
  });
});

// 🔹 Middleware to Verify JWT Token
const authenticateToken = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) return res.status(403).json({ error: "Access denied" });

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ error: "Invalid token" });
    req.user = user;
    next();
  });
};

// 🔹 PROTECTED RESEARCH PAPER SEARCH API
app.get("/search", authenticateToken, async (req, res) => {
  try {
    const { query } = req.query;
    if (!query) {
      return res.status(400).json({ error: "Search query is required." });
    }

    const response = await axios.get("https://api.core.ac.uk/v3/search/works", {
      headers: { Authorization: `Bearer ${CORE_API_KEY}` },
      params: { q: query, limit: 10 },
    });

    const formattedResults = response.data.results.map((paper) => ({
      id: paper.id || `paper-${Math.random()}`,
      title: paper.title?.trim() || "No title available",
      authors: paper.authors?.map(a => a.name) || ["Unknown Author"],
      year: paper.year || "N/A",
      url: paper.links?.[0] || "#",
    }));

    res.json({ results: formattedResults });
  } catch (error) {
    console.error("Error fetching research papers:", error.message);
    res.status(500).json({ error: "Failed to fetch research papers" });
  }
});

// Start server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
