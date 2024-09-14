const Coordiantes = require('../../../models/Coordinates');

// Controller function to get all Coordinates
exports.getAllCoordinates = async (req, res) => {
    try {
        // Fetch all Coordinates from the database
        const coordinates = await Coordiantes.find()
            .sort({ _id: -1 })
            .limit(1000);

        res.json(coordinates);
    } catch (error) {
        // If an error occurs, respond with an error status and message
        console.error('Error fetching Coordinates:', error);
        res.status(500).json({ error: 'An error occurred while fetching the Coordinates' });
    }
};

// Controller function to create a new Coordinate
exports.createCoordinate = async (req, res) => {
    try {
        // Create a new Coordinate instance
        const coordinate = new Coordiantes(req.body);

        // Save the Coordinate instance to the database
        await coordinate.save();

        res.json(coordinate);
    } catch (error) {
        // If an error occurs, respond with an error status and message
        console.error('Error creating Coordinate:', error);
        res.status(500).json({ error: 'An error occurred while creating the Coordinate' });
    }
};

// Controller function to get a Coordinate by ID
exports.getCoordinateById = async (req, res) => {
    try {
        // Fetch the Coordinate by ID from the database
        const coordinate = await Coordiantes.findById(req.params.id);

        res.json(coordinate);
    } catch (error) {
        // If an error occurs, respond with an error status and message
        console.error('Error fetching Coordinate:', error);
        res.status(500).json({ error: 'An error occurred while fetching the Coordinate' });
    }
};

// Controller function to update a Coordinate by ID
exports.updateCoordinate = async (req, res) => {
    try {
        // Update the Coordinate by ID with the new data from the request body
        const updatedCoordinate = await Coordiantes.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        res.json(updatedCoordinate);
    } catch (error) {
        // If an error occurs, respond with an error status and message
        console.error('Error updating Coordinate:', error);
        res.status(500).json({ error: 'An error occurred while updating the Coordinate' });
    }
};

// Controller function to delete a Coordinate by ID
exports.deleteCoordinate = async (req, res) => {
    try {
        // Delete the Coordinate by ID
        await Coordiantes.findByIdAndDelete(req.params.id);

        res.json({ message: 'Coordinate deleted successfully' });
    } catch (error) {
        // If an error occurs, respond with an error status and message
        console.error('Error deleting Coordinate:', error);
        res.status(500).json({ error: 'An error occurred while deleting the Coordinate' });
    }
};