const User = require("../models/User");

/* GET all users (clients, admins, etc.) */
exports.getUsers = async (req, res) => {
  try {
    const users = await User.findAll({ order: [["id", "DESC"]] });
    res.json(users);
  } catch (err) {
    console.error("❌ Error fetching users:", err);
    res.status(500).json({ error: "Server error fetching users" });
  }
};

/* ADD new user */
exports.addUser = async (req, res) => {
  try {
    const { username, email, password, role } = req.body;
    if (!username || !email || !password) {
      return res.status(400).json({ error: "⚠️ username, email, and password required" });
    }

    const newUser = await User.create({ username, email, password, role: role || "client" });
    res.json({ message: "✅ User added successfully", user: newUser });
  } catch (err) {
    console.error("❌ Error adding user:", err);
    res.status(500).json({ error: "Server error adding user" });
  }
};

/* UPDATE user */
exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { username, email, password, role } = req.body;
    const user = await User.findByPk(id);

    if (!user) return res.status(404).json({ error: "❌ User not found" });

    await user.update({ username, email, password, role });
    res.json({ message: "✅ User updated successfully", user });
  } catch (err) {
    console.error("❌ Error updating user:", err);
    res.status(500).json({ error: "Server error updating user" });
  }
};

/* DELETE user */
exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id);

    if (!user) return res.status(404).json({ error: "❌ User not found" });

    await user.destroy();
    res.json({ message: "🗑️ User deleted successfully" });
  } catch (err) {
    console.error("❌ Error deleting user:", err);
    res.status(500).json({ error: "Server error deleting user" });
  }
};
