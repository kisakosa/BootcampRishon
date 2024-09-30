const Route = require('../../../models/Route'); // Import the Route model
const Tag = require('../../../models/Tag'); // Import the Tag model
const Place = require('../../../models/Place'); // Import the Place model
const Coordinates = require('../../../models/Coordinates'); // Import the Coordinates model
const asyncHandler = require('../../../utils/asyncHandler'); // Adjust the path as needed

// Controller function to get all Routes
exports.getAllRoutes = asyncHandler(async (req, res) => {
    // Fetch all Routes from the database
    const routes = await Route.find()
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

    res.json(routes);
});

// Controller function to get a query of Routes
exports.getRouteByQuery = asyncHandler(async (req, res) => {
    // Fetch the query from the request body
    const query = req.body;

    // Fetch all Routes from the database that match the query
    const routes = await Route.find(query)
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

    res.json(routes);
});

// Controller function to create a new Route
exports.createRoute = asyncHandler(async (req, res) => {
    // Create a new Route instance
    const route = new Route(req.body);

    // Save the Route instance to the database
    await route.save();

    res.json(route);
});

// Controller function to get a Route by ID
exports.getRouteById = asyncHandler(async (req, res) => {
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
});

// Controller function to update a Route by ID
exports.updateRoute = asyncHandler(async (req, res) => {
    // Update the Route by ID with the new data from the request body
    const updatedRoute = await Route.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    );

    res.json(updatedRoute);
});

// Controller function to delete a Route by ID
exports.deleteRoute = asyncHandler(async (req, res) => {
    // Delete the Route by ID
    await Route.findByIdAndDelete(req.params.id);

    res.json({ message: 'Route deleted successfully' });
});