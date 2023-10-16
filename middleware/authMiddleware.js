// authMiddleware.js

const authMiddleware = (req, res, next) => {
  const { username } = req.body;
console.log(username);
  // Check if the username ends with '@gmail.com'
  if (!username.endsWith('@gmail.com')) {
    return res.status(403).json({ message: 'Access forbidden. Username must end with @gmail.com' });
  }

  // If the username is valid, continue to the next middleware or route
  next();
};


// middleware/authMiddleware.js
const jwt = require('jsonwebtoken');
const SECRET_KEY = 'ea05b2a47cdd76e89d8e03e65cf5a2937b6b93cf48d57066c243d621768492a5'; // Replace with your actual secret key

module.exports = (req, res, next) => {
  const token = req.header('x-auth-token'); // Send token in headers

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    req.user = decoded.user; // Set user in request for protected routes
    next();
  } catch (error) {
    res.status(401).json({ message: 'Token is not valid' });
  }
};

 module.exports= authMiddleware;