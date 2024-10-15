const express = require('express');
const savedRoutesController = require('../../../controllers/api/v1/savedRoutes'); // Import the controller
const auth = require('../../../middleware/auth'); // Import the auth middleware
const validateObjectId = require('../../../middleware/validateObjectId'); // Import the validateObjectId middleware
const SecurityMiddleware = require('../../../middleware/securityMiddleware'); // Import the security middleware
const router = express.Router();

// Get saved routes for a user
router.get('/', auth, savedRoutesController.getSavedRoutes);

// Add a route for a user saved routes
router.post('/:routeId', SecurityMiddleware.secure(), validateObjectId('routeId'), auth, savedRoutesController.addSavedRoute);

// Remove a saved route by ID for a user
router.delete('/:routeId', SecurityMiddleware.secure(), validateObjectId('routeId'), auth, savedRoutesController.removeSavedRoute);

// Handles any saved route errors
router.use((err, req, res, next) => {
    if (req.method === 'GET' && req.path === '/') {
        console.error("Error fetching saved routes");
    } else if (req.method === 'POST' && req.path === '/') {
        console.error("Error adding a saved route");
    } else if (req.method === 'DELETE' && req.path === '/') {
        console.error("Error removing a saved route");
    } else {
        console.error("Saved route error: ", err.message);
    }
    res.status(500).json({ error: 'An internal server error occurred' });
});

module.exports = router;