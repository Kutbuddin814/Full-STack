const db = require("../config/database");

const Client = {
  getAll: (callback) => {
    db.query("SELECT * FROM clients", callback);
  },
  create: (data, callback) => {
    db.query("INSERT INTO clients SET ?", data, callback);
  },
  update: (id, data, callback) => {
    db.query("UPDATE clients SET ? WHERE id = ?", [data, id], callback);
  },
  delete: (id, callback) => {
    db.query("DELETE FROM clients WHERE id = ?", [id], callback);
  }
};

module.exports = Client;
