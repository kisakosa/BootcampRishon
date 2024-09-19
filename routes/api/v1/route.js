const express = require('express');
const routeController = require('../../../controllers/api/v1/route'); // Import the controller
const auth = require('../middleware/auth'); // Import the auth middleware
const checkRole = require('../middleware/role'); // Import the role middleware
const router = express.Router();

// Route to get all Routes
router.get('/', routeController.getAllRoutes);

// Route to get a Route by ID
router.get('/:id', routeController.getRouteById);

// Route to get a query of Routes
router.get('/search', routeController.getRouteByQuery);

// Route to create a new Route
router.post('/', auth, checkRole('admin'), routeController.createRoute);

// Route to update a Route by ID
router.put('/:id', auth, checkRole('admin'), routeController.updateRoute);

// Route to delete a Route by ID
router.delete('/:id', auth, checkRole('admin'), routeController.deleteRoute);

module.exports = router;