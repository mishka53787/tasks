// checkUsername.js

// This middleware checks if the username ends with '@gmail.com'
const checkUsername = (req, res, next) => {
    const { username } = req.body;
  
    if (!username || !username.endsWith('@gmail.com')) {
      return res.status(403).json({ error: 'Forbidden: Invalid username' });
    }
  
    next();
  };
  
  module.exports = checkUsername;
  
  
