// Import necessary modules
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/user');                                                                                                                    

// Create a route for token validation
router.get('/validate', async (req, res) => {
  const token = req.headers['x-auth-token']; // Get the token from the request headers
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    // Verify the token using your secret key
const user = jwt.verify(token, 'a05b2a47cdd76e89d8e03e65cf5a2937b6b93cf48d57066c243d621768492a5'); // Replace 'YOUR_SECRET_KEY' with your actual secret key


    // Check if the user exists
    const existingUser = await User.findOne({ username: user.username });
    if (!existingUser) {
      return res.status(401).json({ message: 'User not found' });
    }

    // If the token is valid, return the user information
    res.status(200).json({ user: existingUser });
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
});

module.exports = router;