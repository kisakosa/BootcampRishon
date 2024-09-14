const User = require('../../../models/User'); // Import the User model
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Register a new user
exports.register = async (req, res) => {
    const { email, password, role } = req.body;

    let user = await User.findOne({ email });
    if (user) return res.status(400).send('User already registered.');

    user = new User({ email, password, role });
    await user.save();

    const token = jwt.sign({ _id: user._id, role: user.role }, process.env.JWT_SECRET);
    res.header('Authorization', token).send({ _id: user._id, email: user.email, role: user.role });
};

// Login a user
exports.login = async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).send('Invalid email or password.');

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) return res.status(400).send('Invalid email or password.');

    const token = jwt.sign({ _id: user._id, role: user.role }, process.env.JWT_SECRET);
    res.header('Authorization', token).send('Logged in successfully.');
};

// Logout a user
exports.logout = (req, res) => {
    req.session.destroy(err => {
        if (err) return res.status(500).send('Could not log out.');
        res.send('Logged out successfully.');
    });
};

// Admin content
exports.adminContent = (req, res) => {
    res.send('Admin content');
};

// Customer content
exports.customerContent = (req, res) => {
    res.send('Customer content');
};