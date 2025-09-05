const Invoice = require("../models/Invoice");

exports.getInvoices = (req, res) => {
  Invoice.getAll((err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json(result);
  });
};

exports.addInvoice = (req, res) => {
  Invoice.create(req.body, (err) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: "✅ Invoice created successfully" });
  });
};

exports.updateInvoice = (req, res) => {
  Invoice.update(req.params.id, req.body, (err) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: "✅ Invoice updated successfully" });
  });
};

exports.deleteInvoice = (req, res) => {
  Invoice.delete(req.params.id, (err) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: "🗑️ Invoice deleted successfully" });
  });
};
