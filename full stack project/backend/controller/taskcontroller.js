const Task = require("../models/Task");

exports.getTasks = async (req, res) => {
  try {
    const { username } = req.query;
    // If a username is supplied, filter tasks by assignee field:
    const where = username ? { assignee: username } : {};
    const tasks = await Task.findAll({ where, order: [["id", "DESC"]] });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: "Server error fetching tasks" });
  }
};



exports.addTask = async (req, res) => {
  try {
    const { name, assignee, status } = req.body;
    if (!name || !assignee) {
      return res.status(400).json({ error: "Name and assignee are required" });
    }
    const newTask = await Task.create({ name, assignee, status });
    res.json({ message: "✅ Task added successfully", task: newTask });
  } catch (err) {
    res.status(500).json({ error: "Server error adding task" });
  }
};

exports.updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, assignee, status } = req.body;
    const task = await Task.findByPk(id);
    if (!task) return res.status(404).json({ error: "Task not found" });
    await task.update({ name, assignee, status });
    res.json({ message: "✅ Task updated successfully", task });
  } catch (err) {
    res.status(500).json({ error: "Server error updating task" });
  }
};

exports.deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findByPk(id);
    if (!task) return res.status(404).json({ error: "Task not found" });
    await task.destroy();
    res.json({ message: "🗑️ Task deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Server error deleting task" });
  }
};
