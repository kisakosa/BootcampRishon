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
    youtube: {
        type: String
    },
    coordinates: {
        longitude: {
            type: Number,
            required: true
        },
        latitude: {
            type: Number,
            required: true
        }
    },
    tags: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Tag'
    }],
    isRelevant: {
        type: Boolean,
        default: true
    }
});

const Place = mongoose.model('Place', placeSchema);

module.exports = Place;