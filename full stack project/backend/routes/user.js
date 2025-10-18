const express = require("express");
const router = express.Router();
const User = require("../models/User");

// List all users
router.get("/", async (req, res) => {
  try {
    const users = await User.findAll({ attributes: ["username", "role"] });
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error fetching users" });
  }
});

// Create client user
router.post("/", async (req, res) => {
  try {
    const { username, email, password, role } = req.body;
    if (!username || !email || !password || !role) {
      return res.status(400).json({ message: "Missing required fields" });
    }
    const existing = await User.findOne({ where: { email } });
    if (existing) {
      return res.status(400).json({ message: "Email already registered" });
    }
    const newUser = await User.create({
      username,
      email,
      password,
      role
    });

    res.json(newUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
