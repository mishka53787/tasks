const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/user');
const checkUsername = require('../middleware/checkUsername');
const  jsonContentTypeMiddleware  = require('../middleware/jsonContentTypeMiddleware');
const authController = require('../controllers/authController');

const router = express.Router();

// Apply middleware to routes
router.post('/register', jsonContentTypeMiddleware,  checkUsername, async (req, res) => {
  try {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, password: hashedPassword });
    await user.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Registration failed' });
  }
});
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    // Find the user by username
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Use the verifyPassword method to check the provided password
    const isPasswordValid = await user.verifyPassword(password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // If credentials are valid, create and send a JWT token
    const token = createJWTTokenForUser(user); // Replace with your token creation logic

    res.status(200).json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Create a function to generate a JWT token for a user
function createJWTTokenForUser(user) {
  // Use your JWT token creation logic here
  // Example using the 'jsonwebtoken' library
  const jwt = require('jsonwebtoken');
  const SECRET_KEY = 'ec'; // Replace with your actual secret key

  const token = jwt.sign({ userId: user._id }, SECRET_KEY);
  return token;
}

module.exports = router;;

