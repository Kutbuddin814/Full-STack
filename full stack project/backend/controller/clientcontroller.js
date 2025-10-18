// controllers/clientcontroller.js
const Client = require("../models/Client");

exports.getClients = async (req, res) => {
  try {
    const clients = await Client.findAll({ order: [["id", "DESC"]] });
    res.json(clients);
  } catch (err) {
    res.status(500).json({ error: "Server error fetching clients" });
  }
};

exports.addClient = async (req, res) => {
  try {
    const { name, email, phone } = req.body;
    if (!name || !email) {
      return res.status(400).json({ error: "Name and email required" });
    }
    const existing = await Client.findOne({ where: { email } });
    if (existing) {
      return res.status(400).json({ error: "Email already registered" });
    }
    const newClient = await Client.create({ name, email, phone });
    res.json({ message: "✅ Client added successfully", client: newClient });
  } catch (err) {
    res.status(500).json({ error: "Server error adding client" });
  }
};

exports.updateClient = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, phone } = req.body;
    const client = await Client.findByPk(id);
    if (!client) return res.status(404).json({ error: "Client not found" });
    await client.update({ name, email, phone });
    res.json({ message: "✅ Client updated successfully", client });
  } catch (err) {
    res.status(500).json({ error: "Server error updating client" });
  }
};

exports.deleteClient = async (req, res) => {
  try {
    const { id } = req.params;
    const client = await Client.findByPk(id);
    if (!client) return res.status(404).json({ error: "Client not found" });
    await client.destroy();
    res.json({ message: "🗑️ Client deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Server error deleting client" });
  }
};
