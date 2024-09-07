const mongoose = require('mongoose');

const placeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    coordinates: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Coordinate'
    },
    tags: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Tag'
    }]
});

const Place = mongoose.model('Place', placeSchema);

module.exports = Place;