// middleware/validateObjectId.js
const mongoose = require('mongoose');
const { param } = require('../routes');

const validateObjectId = (paramName) => {
    return (req, res, next) => {
        if (!mongoose.Types.ObjectId.isValid(req.params[paramName])) {
            return res.status(400).json({ error: 'Invalid ID' });
        }
        next();
    };
}

module.exports = validateObjectId;