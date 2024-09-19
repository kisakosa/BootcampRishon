const User = require('../../../models/User'); // Import the User model
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Register a new user
exports.register = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;
        if (!name || !email || !password) {
            return res.status(400).send('name, email, and password are required.');
        }

        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).send('User already registered.');
        }

        user = new User({ name, email, password, role });
        await user.save();

        const token = jwt.sign({ _id: user._id, role: user.role }, process.env.JWT_SECRET);
        res.header('Authorization', token).send({ _id: user._id, name: user.name, email: user.email, role: user.role });
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).send('Internal server error.');
    }
};

// Login a user
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).send('Email and password are required.');
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).send('Invalid email or password.');
        }

        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(400).send('Invalid email or password.');
        }

        const token = jwt.sign({ _id: user._id, role: user.role }, process.env.JWT_SECRET);
        res.header('Authorization', token).send('Logged in successfully.');
    } catch (error) {
        console.error('Error logging in user:', error);
        res.status(500).send('Internal server error.');
    }
};

// Logout a user
exports.logout = (req, res) => {
    req.session.destroy(err => {
        if (err) {
            console.error('Error logging out user:', err);
            return res.status(500).send('Could not log out.');
        }
        res.send('Logged out successfully.');
    });
};