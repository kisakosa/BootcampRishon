const mongoose = require('mongoose');

const routeSchema = new mongoose.Schema({
    name: {
        type: String,
        default: ""
    },
    description: {
        type: String,
        default: ""
    },
    distance: {
        type: Number,
        default: ""
    },
    duration: {
        type: Number,
        default: ""
    },
    places: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Place',
        default: []
    },
    tags: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Tag',
        default: []
    }
});

let Route = mongoose.model('Route', routeSchema);

module.exports = Route;
