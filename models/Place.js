const mongoose = require('mongoose');

const placeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    img: {
        type: String
    },
    coordinates: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Coordinates'
    },
    tags: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Tag'
    }]
});

const Place = mongoose.model('Place', placeSchema);

module.exports = Place;