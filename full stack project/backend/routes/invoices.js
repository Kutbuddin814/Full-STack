const express = require("express");
const router = express.Router();
const invoiceController = require("../controller/invoicecontroller");

// List all invoices, or filter by client username (?username=clientusername)
router.get("/", invoiceController.getInvoices);

// Create new invoice (admin assigns to client)
router.post("/", invoiceController.addInvoice);

// Update existing invoice by ID
router.put("/:id", invoiceController.updateInvoice);

// Delete invoice by ID
router.delete("/:id", invoiceController.deleteInvoice);

module.exports = router;
