// middleware/validateObjectId.js
const mongoose = require('mongoose');

const validateObjectId = (req, res, next) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        const error = new Error('Invalid Object ID');
        error.status = 400;
        return next(error);
    }
    next();
};

module.exports = validateObjectId;