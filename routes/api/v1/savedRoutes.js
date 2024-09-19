const express = require('express');
const savedRoutesController = require('../../../controllers/api/v1/savedRoutes'); // Import the controller
const auth = require('../../../middleware/auth'); // Import the auth middleware
const router = express.Router();

// Get saved routes for a user
router.get('/', auth, savedRoutesController.getSavedRoutes);

// Add a saved route for a user
router.post('/', auth, savedRoutesController.addSavedRoute);

// Remove a saved route for a user
router.delete('/', auth, savedRoutesController.removeSavedRoute);