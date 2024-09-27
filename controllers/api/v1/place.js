const Place = require('../../../models/Place'); // Import the Place model
const Tag = require('../../../models/Tag'); // Import the Tag model
const Coordinates = require('../../../models/Coordinates'); // Import the Coordinates model

// Controller function to get all Places
exports.getAllPlaces = async (req, res) => {
    try {
        // Fetch all Places from the database
        const Places = await Place.find()
            .sort({ _id: -1 })
            .limit(1000)
            .populate('tags')
            .populate('coordinates');

        res.json(Places);
    } catch (error) {
        // If an error occurs, respond with an error status and message
        console.error('Error fetching Places:', error);
        res.status(500).json({ error: 'An error occurred while fetching the Places' });
    }
}

exports.getPlaceByQuery = async (req, res) => {
    try {
        // Fetch all Places from the database
        const Places = await Place.find(req.query)
            .sort({ _id: -1 })
            .limit(1000)
            .populate('tags')
            .populate('coordinates');

        res.json(Places);
    } catch (error) {
        // If an error occurs, respond with an error status and message
        console.error('Error fetching Places:', error);
        res.status(500).json({ error: 'An error occurred while fetching the Places' });
    }
}

// Controller function to create a new Place
exports.createPlace = async (req, res) => {
    try {
        // Create a new Place instance
        const place = new Place(req.body);

        // Save the Place instance to the database
        await place.save();

        res.json(place);
    } catch (error) {
        // If an error occurs, respond with an error status and message
        console.error('Error creating Place:', error);
        res.status(500).json({ error: 'An error occurred while creating the Place' });
    }
}

// Controller function to get a Place by ID
exports.getPlaceById = async (req, res) => {
    try {
        // Fetch the Place by ID from the database
        const place = await Place.findById(req.params.id)
            .populate('tags')
            .populate('coordinates');

        res.json(place);
    } catch (error) {
        // If an error occurs, respond with an error status and message
        console.error('Error fetching Place:', error);
        res.status(500).json({ error: 'An error occurred while fetching the Place' });
    }
}

// Controller function to update a Place by ID
exports.updatePlace = async (req, res) => {
    try {
        // Update the Place by ID with the new data from the request body
        const updatedPlace = await Place.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        res.json(updatedPlace);
    } catch (error) {
        // If an error occurs, respond with an error status and message
        console.error('Error updating Place:', error);
        res.status(500).json({ error: 'An error occurred while updating the Place' });
    }
}

// Controller function to delete a place by ID
exports.deletePlace = async (req, res) => {
    try {
        // Delete the Coordinate by ID
        await Place.findByIdAndDelete(req.params.id);

        res.json({ message: 'Place deleted successfully' });
    } catch (error) {
        // If an error occurs, respond with an error status and message
        console.error('Error deleting Place:', error);
        res.status(500).json({ error: 'An error occurred while deleting the Place' });
    }
}