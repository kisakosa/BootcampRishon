const User = require('../../../models/User');

// Get saved routes for a user
exports.getSavedRoutes = async (req, res) => {
    try {
        const userId = req.user._id;
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).send('User not found.');
        }
        res.send(user.savedRoutes);
    } catch (error) {
        console.error('Error getting saved routes:', error);
        res.status(500).send('Internal server error.');
    }
};

// Add a saved route for a user
exports.addSavedRoute = async (req, res) => {
    try {
        const userId = req.user._id;
        const { route } = req.body;
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).send('User not found.');
        }
        user.savedRoutes.push(route);
        await user.save();
        res.send(user.savedRoutes);
    } catch (error) {
        console.error('Error adding saved route:', error);
        res.status(500).send('Internal server error.');
    }
};

// Remove a saved route for a user
exports.removeSavedRoute = async (req, res) => {
    try {
        const userId = req.user._id;
        const { routeId } = req.body;
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).send('User not found.');
        }
        user.savedRoutes = user.savedRoutes.filter(route => route._id.toString() !== routeId);
        await user.save();
        res.send(user.savedRoutes);
    } catch (error) {
        console.error('Error removing saved route:', error);
        res.status(500).send('Internal server error.');
    }
};