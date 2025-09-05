const db = require("../config/database");

const Project = {
  getAll: (callback) => {
    db.query("SELECT * FROM projects", callback);
  },
  create: (data, callback) => {
    db.query("INSERT INTO projects SET ?", data, callback);
  },
  update: (id, data, callback) => {
    db.query("UPDATE projects SET ? WHERE id = ?", [data, id], callback);
  },
  delete: (id, callback) => {
    db.query("DELETE FROM projects WHERE id = ?", [id], callback);
  }
};

module.exports = Project;
