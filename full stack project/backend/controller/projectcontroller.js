const Project = require("../models/Project");

exports.getProjects = async (req, res) => {
  try {
    const { client } = req.query;
    let where = {};
    if (client) where.client = client; // exact match only!
    const projects = await Project.findAll({
      where,
      order: [["createdAt", "DESC"]]
    });
    res.json(projects);
  } catch (err) {
    res.status(500).json({ error: "Server error fetching projects" });
  }
};


exports.addProject = async (req, res) => {
  try {
    const { name, client, deadline, status } = req.body;
    if (!name || !client || !deadline || !status) {
      return res.status(400).json({ error: "All fields are required" });
    }
    const newProject = await Project.create({ name, client, deadline, status });
    res.json({ message: "✅ Project added successfully", project: newProject });
  } catch (err) {
    res.status(500).json({ error: "Server error adding project" });
  }
};

exports.updateProject = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, client, deadline, status } = req.body;
    const project = await Project.findByPk(id);
    if (!project) return res.status(404).json({ error: "Project not found" });
    await project.update({ name, client, deadline, status });
    res.json({ message: "✅ Project updated successfully", project });
  } catch (err) {
    res.status(500).json({ error: "Server error updating project" });
  }
};

exports.deleteProject = async (req, res) => {
  try {
    const { id } = req.params;
    const project = await Project.findByPk(id);
    if (!project) return res.status(404).json({ error: "Project not found" });
    await project.destroy();
    res.json({ message: "🗑️ Project deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Server error deleting project" });
  }
};
