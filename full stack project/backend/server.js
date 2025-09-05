const express = require("express");
const cors = require("cors");
const sequelize = require("./config/database"); // DB config
const User = require("./models/User");

const app = express();

/* ==============================
   Middleware
   ============================== */
app.use(express.json());

// ✅ Allow file:// + localhost
app.use(
  cors({
    origin: "*", // allow requests from any origin (including file://)
  })
);

console.log("✅ Starting server...");

/* ==============================
   Database Sync
   ============================== */
sequelize
  .authenticate()
  .then(() => {
    console.log("✅ Database connection established!");
    return sequelize.sync({ alter: true });
  })
  .then(() => console.log("✅ Database & tables ready!"))
  .catch((err) => console.error("❌ DB connection error:", err));

/* ==============================
   AUTH ROUTES
   ============================== */

// 🔹 SIGNUP
app.post("/api/signup", async (req, res) => {
  try {
    const { username, email, password, role } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ message: "⚠️ All fields are required" });
    }

    // check if email already exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: "⚠️ Email already registered" });
    }

    const newUser = await User.create({
      username,
      email,
      password, // ⚠️ plain text (not safe, but matches your request)
      role: role || "user",
    });

    return res.json({ message: "✅ Signup successful!", user: newUser });
  } catch (error) {
    console.error("❌ Signup error:", error);
    res.status(500).json({ message: "Server error during signup" });
  }
});

// 🔹 LOGIN
app.post("/api/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ message: "⚠️ Username and password required" });
    }

    const user = await User.findOne({ where: { username } });
    if (!user) {
      return res.status(404).json({ message: "❌ User not found" });
    }

    if (user.password !== password) {
      return res.status(401).json({ message: "❌ Invalid credentials" });
    }

    return res.json({
      message: "✅ Login successful!",
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("❌ Login error:", error);
    res.status(500).json({ message: "Server error during login" });
  }
});

/* ==============================
   START SERVER
   ============================== */
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
