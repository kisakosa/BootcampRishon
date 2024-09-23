const User = require('../../../models/User'); // Import the User model
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Register a new user
exports.register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(400).send('name, email, and password are required.');
        }

        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailPattern.test(email)) {
            return res.status(400).send('Invalid email format.');
        }

        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).send('User already registered.');
        }

        user = new User({ name, email, password, role: 'user' });
        await user.save();

        const token = jwt.sign({ _id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.cookie('authToken', token, { 
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 3600000 // 1 hour
        }).send({
            message: 'Registration successful.',
            user: { name: user.name, email: user.email, role: user.role }
        });
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

        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailPattern.test(email)) {
            return res.status(400).send('Invalid email format.');
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).send('Invalid email or password.');
        }

        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(400).send('Invalid email or password.');
        }

        const token = jwt.sign({ _id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.cookie('authToken', token, { 
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 3600000 // 1 hour
        }).send({
            message: 'Logged in successfully.',
            user: { name: user.name, email: user.email, role: user.role }
        });
    } catch (error) {
        console.error('Error logging in user:', error);
        res.status(500).send('Internal server error.');
    }
};

// Logout a user
exports.logout = (req, res) => {
    res.clearCookie('authToken').send('Logged out successfully.');
};

// Update name or password
exports.updateUser = async (req, res) => {
    try {
        const { name, password, email } = req.body;

        if (!name && !password && !email) {
            return res.status(400).send('Name or password or email is required.');
        }

        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (email) {
            if (!emailPattern.test(email)) {
                return res.status(400).send('Invalid email format.');
            }

            const existingUser = await User.findOne({ email });
            if (existingUser) {
                return res.status(400).send('Email already registered.');
            }
        }

        const user = await User.findById(req.user._id);

        if (email) {
            user.email = email;
        }

        if (name) {
            user.name = name;
        }

        if (password) {
            user.password = password;
        }

        await user.save();
        res.send('User updated successfully.');
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).send('Internal server error.');
    }
};