const mongoose = require('mongoose');

const coordinatesSchema = new mongoose.Schema({
    latitude: {
        type: Number,
        required: true
    },
    longitude: {
        type: Number,
        required: true
    }
});

const Coordinates = mongoose.model('Coordinates', coordinatesSchema);

module.exports = Coordinates;