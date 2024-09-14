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
// Configure session middleware
app.use(session({
    secret: process.env.SESSION_SECRET, // Secret key for signing the session ID cookie
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
        mongoUrl: process.env.MONGOURL,
        collectionName: 'sessions' // Collection to store sessions
    }),
    cookie: {
        maxAge: 1000 * 60 * 60 * 24, // 1 day
        secure: false, // Set to true if using HTTPS
        httpOnly: true // Prevents client-side JavaScript from accessing the cookie
    }
}));

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
app.use('/api/v1/users', require('./routes/api/v1/user'));
app.use('/api/v1/tags', require('./routes/api/v1/tag'));
app.use('/api/v1/places', require('./routes/api/v1/place'));
app.use('/api/v1/coordinates', require('./routes/api/v1/coordinate'));

// Start the server and listen on port specified in the environment variable (.env file)
app.listen(process.env.PORT, () => {
    console.log('Server is running on port ' + process.env.PORT);
});