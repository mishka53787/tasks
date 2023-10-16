// charLimitMiddleware.js

const charLimitMiddleware = (req, res, next) => {
  const { task } = req.body;

  if (task.length > 140) {
    return res.status(400).json({ message: 'Task length exceeds 140 characters' });
  }

  next();
};
 module.exports = charLimitMiddleware;