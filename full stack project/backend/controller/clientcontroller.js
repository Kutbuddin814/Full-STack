const Client = require("../models/Client");

exports.getClients = (req, res) => {
  Client.getAll((err, result) => {
    if (err) throw err;
    res.json(result);
  });
};

exports.addClient = (req, res) => {
  Client.create(req.body, (err, result) => {
    if (err) throw err;
    res.json({ message: "Client added successfully" });
  });
};

exports.updateClient = (req, res) => {
  Client.update(req.params.id, req.body, (err, result) => {
    if (err) throw err;
    res.json({ message: "Client updated successfully" });
  });
};

exports.deleteClient = (req, res) => {
  Client.delete(req.params.id, (err, result) => {
    if (err) throw err;
    res.json({ message: "Client deleted successfully" });
  });
};
