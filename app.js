// Load environment variables from .env file
require('dotenv').config();

// Import required modules
const express = require('express');
const mongoose = require('mongoose');

// Initialize Express application
const app = express();

// Set the view engine to EJS for rendering HTML templates
app.set('view engine', 'ejs');

// Middleware to parse JSON bodies
app.use(express.json());
// Middleware to parse URL-encoded bodies
app.use(express.urlencoded({ extended: false }));
// Middleware to serve static files from the 'public' directory
app.use(express.static('public'));

// MongoDB connection setup
mongoose.connect(process.env.MONGOURL);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => console.log('DB connection is open'));
db.set("useCreateIndex", true);
console.log(process.env.MONGOURL);

// Import and use routes
app.use('/', require('./routes/index'));
app.use('/api/v1/routes', require('./routes/api/v1/route'));

// Start the server and listen on port specified in the environment variable (.env file)
app.listen(process.env.PORT, () => {
    console.log('Server is running on port ' + process.env.PORT);
});