// ---------------- Login ----------------
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    console.log("Login attempt:", username, password); // Debug log

    // Check if username and password are provided
    if (!username || !password) {
      return res.status(400).json({ message: "Username and password are required" });
    }

    // Find user by username
    const user = await User.findOne({ where: { username } });
    if (!user) {
      console.log("User not found:", username);
      return res.status(400).json({ message: "User not found" });
    }

    // Compare plain password (⚠️ for testing only)
    if (password !== user.password) {
      console.log("Invalid password for:", username);
      return res.status(400).json({ message: "Invalid credentials" });
    }

    console.log("Login successful for:", username);

    // If valid → send user info
    return res.json({
      success: true,
      message: "Login successful",
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ message: "Server error during login" });
  }
});
