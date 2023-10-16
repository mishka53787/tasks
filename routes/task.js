const express = require('express');
const Task = require('../models/task');
const taskController = require('../controllers/taskController');
const  authMiddleware = require('../middleware/authMiddleware');
const  jsonContentTypeMiddleware  = require('../middleware/jsonContentTypeMiddleware');
const charLimitMiddleware = require('../middleware/charLimitMiddleware');
const router = express.Router();

router.get('/', authMiddleware, async (req, res) => {
  try {
    const tasks = await Task.find({ userId: req.user.id });
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching tasks' });
  }
});




// Define other routes
router.post('/',  jsonContentTypeMiddleware, charLimitMiddleware, taskController.createTask);
router.put('/:taskId',  jsonContentTypeMiddleware, charLimitMiddleware, taskController.updateTask);
router.delete('/:taskId',  taskController.deleteTask);


module.exports = router;
