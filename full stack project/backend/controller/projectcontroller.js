const Project = require("../models/Project");

exports.getProjects = (req, res) => {
  Project.getAll((err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json(result);
  });
};

exports.addProject = (req, res) => {
  Project.create(req.body, (err) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: "✅ Project added successfully" });
  });
};

exports.updateProject = (req, res) => {
  Project.update(req.params.id, req.body, (err) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: "✅ Project updated successfully" });
  });
};

exports.deleteProject = (req, res) => {
  Project.delete(req.params.id, (err) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: "🗑️ Project deleted successfully" });
  });
};
