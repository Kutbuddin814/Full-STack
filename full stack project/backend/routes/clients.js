// routes/client.js
const express = require("express");
const router = express.Router();
const clientController = require("../controller/clientcontroller");

router.get("/", clientController.getClients);
router.post("/", clientController.addClient);
router.put("/:id", clientController.updateClient);
router.delete("/:id", clientController.deleteClient);

module.exports = router;
