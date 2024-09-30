const User = require('../../../models/User');
const asyncHandler = require('../../../utils/asyncHandler'); // Adjust the path as needed

// Get saved routes for a user
exports.getSavedRoutes = asyncHandler(async (req, res) => {
    const userId = req.user._id;
    const user = await User.findById(userId).populate('savedRoutes');
    if (!user) {
        return res.status(404).send('User not found.');
    }
    res.send(user.savedRoutes);
});

// Add a saved route for a user
exports.addSavedRoute = asyncHandler(async (req, res) => {
    const userId = req.user._id;
    const { route } = req.body;
    const user = await User.findById(userId).populate('savedRoutes');
    if (!user) {
        return res.status(404).send('User not found.');
    }
    user.savedRoutes.push(route);
    await user.save();
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
    user.savedRoutes = user.savedRoutes.filter(route => route._id.toString() !== routeId);
    await user.save();

    await user.populate('savedRoutes');

    res.send(user.savedRoutes);
});