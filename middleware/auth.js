const jwt = require('jsonwebtoken');
const User = require('../models/User');

async function auth(req, res, next) {
    // Skip authentication if in development mode
    if (process.env.NODE_ENV === 'development') return next();

    const token = req.cookies.authToken;
    if (!token) return res.status(401).send('Access denied. No token provided.');

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decoded._id).select('-password');
        next();
    } catch (ex) {
        res.status(400).send('Invalid token.');
    }
}

module.exports = auth;