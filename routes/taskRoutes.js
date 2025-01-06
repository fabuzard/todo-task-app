const express = require('express');
const router = express.Router();
const taskController =require(`../controllers/taskController`)
const authenticateToken = require('../middleware/authMiddleware');

// Route to add a new task
router.post('/addtask',authenticateToken,taskController.addTask)
router.get('/tasks',authenticateToken,taskController.getTasks);

module.exports = router;
