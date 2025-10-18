const express = require("express");
const router = express.Router();
const taskController = require("../controller/taskcontroller");

// Fetch tasks for a specific user if username is present in query (?username=alice)
router.get("/", taskController.getTasks);
router.post("/", taskController.addTask);
router.put("/:id", taskController.updateTask);
router.delete("/:id", taskController.deleteTask);

module.exports = router;
