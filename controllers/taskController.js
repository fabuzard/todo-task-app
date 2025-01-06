const Task = require('../models/taskSchema');  // Assuming the Task model is in models/taskModel.js

// Add a new task
exports.addTask = async (req, res) => {
    const { taskName, description } = req.body;
    const userId = req.user ? req.user.id : null;  // Check if req.user is set

    if (!taskName || !description) {
        return res.status(400).json({ message: 'Task name and description are required' });
    }

    if (!userId) {
        return res.status(400).json({ message: 'User ID is required' });
    }

    try {
        const newTask = new Task({
            taskName,
            description,
            userId,
            createdAt: new Date(),
        });

        const savedTask = await newTask.save();
        res.status(201).json({ message: 'Task added successfully', task: savedTask });
    } catch (error) {
        console.error('Error adding task:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Get all tasks for a user
exports.getTasks = async (req, res) => {
  const userId = req.user.id;  // User ID from the decoded JWT token
  

  try {
    const tasks = await Task.find({ userId });
    res.status(200).json(tasks);
  } catch (error) {
    console.error('Error fetching tasks:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
