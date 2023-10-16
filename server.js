const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const router = require('./routes/routes');

const app = express();
const cors = require('cors');
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors()); // Enable CORS for all routes
app.use(bodyParser.json());
app.use(express.static('public')); // Serve static files

// Connect to MongoDB
mongoose.connect('mongodb+srv://mishkasathdeo:HdBJdEqaCbeeTkDg@cluster1.lsxcgsk.mongodb.net/', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Enable CORS for all routes
app.use(cors());




// Use your route files
const authRoutes = require('./routes/auth'); // Import auth routes
const taskRoutes = require('./routes/task'); // Import task routes
const authValidationRoutes = require('./routes/authValidation'); // Import your new route

app.use('/', authRoutes); // Use auth routes
app.use('/tasks', taskRoutes); // Use task routes
app.use('/auth', authValidationRoutes); // Use the new route for token validation




// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});



