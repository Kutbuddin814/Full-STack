const db = require("../config/database");

const Invoice = {
  getAll: (callback) => {
    db.query("SELECT * FROM invoices", callback);
  },
  create: (data, callback) => {
    db.query("INSERT INTO invoices SET ?", data, callback);
  },
  update: (id, data, callback) => {
    db.query("UPDATE invoices SET ? WHERE id = ?", [data, id], callback);
  },
  delete: (id, callback) => {
    db.query("DELETE FROM invoices WHERE id = ?", [id], callback);
  }
};

module.exports = Invoice;
