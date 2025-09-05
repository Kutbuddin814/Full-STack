const Task = require("../models/Task");

exports.getTasks = (req, res) => {
  Task.getAll((err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json(result);
  });
};

exports.addTask = (req, res) => {
  Task.create(req.body, (err) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: "✅ Task added successfully" });
  });
};

exports.updateTask = (req, res) => {
  Task.update(req.params.id, req.body, (err) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: "✅ Task updated successfully" });
  });
};

exports.deleteTask = (req, res) => {
  Task.delete(req.params.id, (err) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: "🗑️ Task deleted successfully" });
  });
};
