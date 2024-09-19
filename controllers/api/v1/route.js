const Route = require('../../../models/Route'); // Import the Route model
const Tag = require('../../../models/Tag'); // Import the Tag model
const Place = require('../../../models/Place'); // Import the Place model
const Coordinates = require('../../../models/Coordinates'); // Import the Coordinates model

// Controller function to get all Routes
exports.getAllRoutes = async (req, res) => {
    try {
        // Fetch all Routes from the database
        const Routes = await Route.find()
            .sort({ _id: -1 })
            .limit(1000)
            .populate('tags')
            .populate({
                path: 'places',
                populate: [
                    { path: 'tags' },
                    { path: 'coordinates' }
                ]
            });

        res.json(Routes);
    } catch (error) {
        // If an error occurs, respond with an error status and message
        console.error('Error fetching Routes:', error);
        res.status(500).json({ error: 'An error occurred while fetching the Routes' });
    }
};

// Controller function to get a query of Routes
exports.getRouteByQuery = async (req, res) => {
    try {
        // Fetch the query from the request body
        const query = req.body;

        // Fetch all Routes from the database that match the query
        const Routes = await Route.find(query)
            .sort({ _id: -1 })
            .limit(1000)
            .populate('tags')
            .populate({
                path: 'places',
                populate: [
                    { path: 'tags' },
                    { path: 'coordinates' }
                ]
            });
        res.json(Routes);
    } catch (error) {
        // If an error occurs, respond with an error status and message
        console.error('Error fetching Routes:', error);
        res.status(500).json({ error: 'An error occurred while fetching the Routes' });
    }
};

// Controller function to create a new Route
exports.createRoute = async (req, res) => {
    try {
        // Create a new Route instance
        const route = new Route(req.body);

        // Save the Route instance to the database
        await route.save();

        res.json(route);
    } catch (error) {
        // If an error occurs, respond with an error status and message
        console.error('Error creating Route:', error);
        res.status(500).json({ error: 'An error occurred while creating the Route' });
    }
};

// Controller function to get a Route by ID
exports.getRouteById = async (req, res) => {
    try {
        // Fetch the Route by ID from the database
        const route = await Route.findById(req.params.id)
            .populate('tags')
            .populate({
                path: 'places',
                populate: [
                    { path: 'tags' },
                    { path: 'coordinates' }
                ]
            });

        res.json(route);
    } catch (error) {
        // If an error occurs, respond with an error status and message
        console.error('Error fetching Route:', error);
        res.status(500).json({ error: 'An error occurred while fetching the Route' });
    }
}

// Controller function to update a Route by ID
exports.updateRoute = async (req, res) => {
    try {
        // Update the Route by ID with the new data from the request body
        const updatedRoute = await Route.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        res.json(updatedRoute);
    } catch (error) {
        // If an error occurs, respond with an error status and message
        console.error('Error updating Route:', error);
        res.status(500).json({ error: 'An error occurred while updating the Route' });
    }
}

// Controller function to delete a Route by ID
exports.deleteRoute = async (req, res) => {
    try {
        // Delete the Route by ID
        await Route.findByIdAndDelete(req.params.id);

        res.json({ message: 'Route deleted successfully' });
    } catch (error) {
        // If an error occurs, respond with an error status and message
        console.error('Error deleting Route:', error);
        res.status(500).json({ error: 'An error occurred while deleting the Route' });
    }
};