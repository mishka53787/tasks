const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

// Use the actual secret key value here
const SECRET_KEY = 'ea05b2a47cdd76e89d8e03e65cf5a2937b6b93cf48d57066c243d621768492a5';

exports.register = async (req, res) => {
  try {
    const { username, password } = req.body;
    
    // Check if the username already exists in the database
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: 'Username already exists' });
    }
    
    // Hash the password using bcrypt
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Create a new user in the database
    const newUser = new User({ username, password: hashedPassword });
    await newUser.save();

    // Respond with a success message or a token
    const token = jwt.sign({ username }, SECRET_KEY);
    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.login = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Log received username and password to check if they are correct
    console.log('Received credentials:', username, password);

    // Find the user by username
    const user = await User.findOne({ username });

    if (!user || !(await user.verifyPassword(password))) {
      // Log an error message to check if the server reaches this point
      console.error('Invalid credentials');
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // If credentials are valid, create and send a JWT token
    const token = jwt.sign({ userId: user._id }, SECRET_KEY);

    res.status(200).json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};


exports.verifyToken = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    req.user = user;
    next();
  });
};

