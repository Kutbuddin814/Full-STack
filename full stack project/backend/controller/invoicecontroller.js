const Invoice = require("../models/Invoice");

exports.getInvoices = async (req, res) => {
  try {
    const { username } = req.query;
    let where = {};
    if (username) {
      where.client = username;
    }
    const invoices = await Invoice.findAll({ where, order: [["createdAt", "DESC"]] });
    res.json(invoices);
  } catch (err) {
    console.error("❌ Error fetching invoices:", err);
    res.status(500).json({ error: "Server error fetching invoices" });
  }
};

exports.addInvoice = async (req, res) => {
  try {
    const { id, client, amount, due, status } = req.body;
    if (!id || !client || !amount || !due) {
      return res.status(400).json({ error: "All fields are required" });
    }
    const exists = await Invoice.findByPk(id);
    if (exists) {
      return res.status(400).json({ error: "Invoice ID already exists" });
    }
    const newInvoice = await Invoice.create({ id, client, amount, due, status });
    res.json({ message: "✅ Invoice added successfully", invoice: newInvoice });
  } catch (err) {
    console.error("❌ Error adding invoice:", err);
    res.status(500).json({ error: "Server error adding invoice" });
  }
};

exports.updateInvoice = async (req, res) => {
  try {
    const { id } = req.params;
    const { client, amount, due, status } = req.body;
    const invoice = await Invoice.findByPk(id);
    if (!invoice) return res.status(404).json({ error: "Invoice not found" });
    await invoice.update({ client, amount, due, status });
    res.json({ message: "✅ Invoice updated successfully", invoice });
  } catch (err) {
    console.error("❌ Error updating invoice:", err);
    res.status(500).json({ error: "Server error updating invoice" });
  }
};

exports.deleteInvoice = async (req, res) => {
  try {
    const { id } = req.params;
    const invoice = await Invoice.findByPk(id);
    if (!invoice) return res.status(404).json({ error: "Invoice not found" });
    await invoice.destroy();
    res.json({ message: "🗑️ Invoice deleted successfully" });
  } catch (err) {
    console.error("❌ Error deleting invoice:", err);
    res.status(500).json({ error: "Server error deleting invoice" });
  }
};
