const express = require("express");
const router = express.Router();
const User = require("../models/User");

// ---------------- Login ----------------
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ message: "Username and password are required" });
    }

    // Find user by username
    const user = await User.findOne({ where: { username } });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    // Compare plain password (⚠️ for testing only — use bcrypt in production)
    if (password !== user.password) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // ✅ Save session user with role
    req.session.user = {
      id: user.id,
      username: user.username,
      role: user.role,
    };

    return res.json({
      success: true,
      message: "Login successful",
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ message: "Server error during login" });
  }
});

// ---------------- Logout ----------------
router.post("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) return res.status(500).json({ message: "Error logging out" });
    res.json({ success: true, message: "Logout successful" });
  });
});

module.exports = router;
