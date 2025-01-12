const express = require('express');
const router = express.Router();
const taskController =require(`../controllers/taskController`)
const authenticateToken = require('../middleware/authMiddleware');
const Task = require('../models/taskSchema');  // Assuming the Task model is in models/taskModel.js


// Route to add a new task
router.post('/addtask',authenticateToken,taskController.addTask)
router.get('/tasks',authenticateToken,taskController.getTasks);
router.delete(`/deletealltasks`,taskController.deleteTasks)
router.delete(`/deletetask/:id`,taskController.deleteSingleTask)
router.patch('/updatetask/:id',taskController.editTask)

router.get('/getalltasks', async (req, res) => {
    try {
      // This will fetch all tasks, regardless of userId
      const tasks = await Task.find(); 
      res.status(200).json(tasks);
    } catch (error) {
      console.error('Error fetching tasks:', error);
      res.status(500).json({ message: 'Error fetching tasks' });
    }
  });


module.exports = router;
