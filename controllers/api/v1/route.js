const Route = require('../../../models/Route'); // Import the Route model
const Tag = require('../../../models/Tag'); // Import the Tag model
const Place = require('../../../models/Place'); // Import the Place model
const Coordinate = require('../../../models/Coordinate'); // Import the Coordinate model

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