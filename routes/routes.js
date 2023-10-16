const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const taskController = require('../controllers/taskController');
const  jsonContentTypeMiddleware  = require('../middleware/jsonContentTypeMiddleware');
const charLimitMiddleware = require('../middleware/charLimitMiddleware');

// Apply charLimitMiddleware to a non-task route in routes/routes.js
router.post('/some_route', charLimitMiddleware, jsonContentTypeMiddleware, (req, res) => {
  // Access request data from req.body
  const requestData = req.body;

  // Check if the request data contains a 'task' property
  if (!requestData.task) {
    return res.status(400).json({ message: 'Request must include a "task" property' });
  }

  // Perform some logic based on the request data
  // For example, let's just send back a response echoing the received data
  res.status(200).json({ message: 'Received POST request data', data: requestData });
});



router.post('/register', authController.register);
router.post('/login', authController.login);

router.post('/tasks',  taskController.createTask);
router.get('/tasks',  taskController.getTasks);
router.put('/tasks/:taskId',  taskController.updateTask);
router.delete('/tasks/:taskId',  taskController.deleteTask);

module.exports = router;

