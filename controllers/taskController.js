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
  try {
    // Validate that userId is available
    const userId = req.user?.id; // Safely access user ID
    if (!userId) {
      return res.status(400).json({ message: 'User ID is required' });
    }

    // Fetch tasks for the user
    const tasks = await Task.find({ userId });
    res.status(200).json(tasks);
  } catch (error) {
    console.error('Error fetching tasks:', error.message);
    res.status(500).json({ message: 'Internal server error' });
  }
};
//delete a single task 
exports.deleteSingleTask = async (req, res) => {
  const { id } = req.params; // Extract id from params
  try {
    const deleteTask = await Task.findByIdAndDelete(id); // Pass id directly
    if (!deleteTask) {
      return res.status(404).json({ message: "Task not found" });
    }
    return res.status(200).json({ message: "Task has been deleted", result: deleteTask });
  } catch (error) {
    console.error("Error in deleteSingleTask:", error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};


//Delete all task *DANGER
exports.deleteTasks = async(req,res)=>{
  try {
  const result = await Task.deleteMany({});
  return res.status(200).json({
    message:`a total of ${result.deletedCount} tasks has been deleted`
  })
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: `an error has occured while deleting tasks.`,
      error:error.message
    })
  }
}

