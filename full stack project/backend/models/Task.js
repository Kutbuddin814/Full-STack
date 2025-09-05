const db = require("../config/database");

const Task = {
  getAll: (callback) => {
    db.query("SELECT * FROM tasks", callback);
  },
  create: (data, callback) => {
    db.query("INSERT INTO tasks SET ?", data, callback);
  },
  update: (id, data, callback) => {
    db.query("UPDATE tasks SET ? WHERE id = ?", [data, id], callback);
  },
  delete: (id, callback) => {
    db.query("DELETE FROM tasks WHERE id = ?", [id], callback);
  }
};

module.exports = Task;
