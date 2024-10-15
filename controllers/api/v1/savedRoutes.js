const User = require('../../../models/User');
const Route = require('../../../models/Route');
const asyncHandler = require('../../../utils/asyncHandler'); // Adjust the path as needed

// Get saved routes for a user
exports.getSavedRoutes = asyncHandler(async (req, res) => {
    const userId = req.user._id;
    const user = await User.findById(userId);
    if (!user) {
        return res.status(404).send('User not found.');
    }
    await user.populate({
        path: 'savedRoutes',
        populate: [
            {
                path: 'tags',
                populate: {
                    path: 'category',
                    model: 'Category'
                }
            },
            {
                path: 'places',
                populate: [
                    {
                        path: 'tags',
                        populate: {
                            path: 'category',
                            model: 'Category'
                        }
                    }
                ]
            }
        ]
    });

    res.send(user.savedRoutes);
});

// Add a saved route for a user
exports.addSavedRoute = asyncHandler(async (req, res) => {
    const userId = req.user._id;
    const { routeId } = req.params;
    const user = await User.findById(userId);
    if (!user) {
        return res.status(404).send('User not found.');
    }
    if (!routeId) {
        return res.status(400).send('Route not provided.');
    }
    const routeIsReal = await Route.findById(routeId);
    if (!routeIsReal) {
        return res.status(404).send('Route not found.');
    }
    const routeExists = user.savedRoutes.some(savedRoute => savedRoute._id.toString() === routeId);
    if (routeExists) {
        return res.status(400).send('Route already saved.');
    }
    user.savedRoutes.push(routeId);
    await user.save();
    await user.populate({
        path: 'savedRoutes',
        populate: [
            {
                path: 'tags',
                populate: {
                    path: 'category',
                    model: 'Category'
                }
            },
            {
                path: 'places',
                populate: [
                    {
                        path: 'tags',
                        populate: {
                            path: 'category',
                            model: 'Category'
                        }
                    }
                ]
            }
        ]
    });
    res.send(user.savedRoutes);
});

// Remove a saved route for a user
exports.removeSavedRoute = asyncHandler(async (req, res) => {
    const userId = req.user._id;
    const { routeId } = req.params;
    const user = await User.findById(userId);
    if (!user) {
        return res.status(404).send('User not found.');
    }
    if (!routeId) {
        return res.status(400).send('Route ID not provided.');
    }
    const routeExists = user.savedRoutes.some(savedRoute => savedRoute._id.toString() === routeId);
    if (!routeExists) {
        return res.status(400).send('Route not saved.');
    }
    user.savedRoutes = user.savedRoutes.filter(route => route._id.toString() !== routeId);
    await user.save();

    await user.populate({
        path: 'savedRoutes',
        populate: [
            {
                path: 'tags',
                populate: {
                    path: 'category',
                    model: 'Category'
                }
            },
            {
                path: 'places',
                populate: [
                    {
                        path: 'tags',
                        populate: {
                            path: 'category',
                            model: 'Category'
                        }
                    }
                ]
            }
        ]
    });

    res.send(user.savedRoutes);
});