const express = require('express');
const routeController = require('../../../controllers/api/v1/route'); // Import the controller
const router = express.Router();

// Route to get all Routes
router.get('/', routeController.getAllRoutes);

// Route to get a Route by ID
router.get('/:id', routeController.getRouteById);

// Route to create a new Route
router.post('/', routeController.createRoute);

// Route to update a Route by ID
router.put('/:id', routeController.updateRoute);

// Route to delete a Route by ID
router.delete('/:id', routeController.deleteRoute);

module.exports = router;