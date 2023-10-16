const Task = require('../models/task');

exports.createTask = async (req, res) => {
  try {
    const { task } = req.body; // Correctly extract the task from the request body
    const newTask = new Task({ task });
    await newTask.save();
    res.status(201).json(newTask);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create task', message: error.message });
  }
};


exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ userId: req.user.username });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch tasks', message: error.message });
  }
};

exports.updateTask = async (req, res) => {
  try {
    const { taskId } = req.params; // Correctly extract taskId from the request parameters
    const { task } = req.body; // Correctly extract task from the request body
    const updatedTask = await Task.findOneAndUpdate(
      { _id: taskId }, // Use _id to find the task
      { task },
      { new: true }
    );
    if (!updatedTask) {
      return res.status(404).json({ error: 'Task not found' });
    }
    res.json(updatedTask);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update task', message: error.message });
  }
};
exports.deleteTask = async (req, res) => {
  try {
    const { taskId } = req.params; // Correctly extract taskId from the request parameters
    const deletedTask = await Task.findOneAndDelete({
      _id: taskId, // Use _id to find the task
    });

    if (!deletedTask) {
      return res.status(404).json({ error: 'Task not found' });
    }

    res.json({ message: 'Task deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete task', message: error.message });
  }
};
