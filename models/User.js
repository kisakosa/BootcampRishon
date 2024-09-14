const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['customer', 'admin'],
        default: 'customer'
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    savedRoutes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Route'
    }]
});

const User = mongoose.model('User', userSchema);

module.exports = User;