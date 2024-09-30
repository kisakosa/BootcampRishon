const express = require('express');
const routeController = require('../../../controllers/api/v1/route'); // Import the controller
const auth = require('../../../middleware/auth'); // Import the auth middleware
const checkRole = require('../../../middleware/role'); // Import the role middleware
const validateObjectId = require('../../../middleware/validateObjectId');
const router = express.Router();

// Route to get all Routes
router.get('/', routeController.getAllRoutes);

// Route to get a query of Routes
router.get('/search', routeController.getRouteByQuery);

// Route to get a Route by ID
router.get('/:id', validateObjectId, routeController.getRouteById);

// Route to create a new Route
router.post('/', auth, checkRole('admin'), routeController.createRoute);

// Route to update a Route by ID
router.put('/:id', auth, checkRole('admin'), validateObjectId, routeController.updateRoute);

// Route to delete a Route by ID
router.delete('/:id', auth, checkRole('admin'), validateObjectId, routeController.deleteRoute);

// Handles any Route errors
router.use((err, req, res, next) => {
    if (req.method === 'GET' && req.path === '/') {
        console.error("Error fetching Routes");
    } else if (req.method === 'GET' && req.path === '/search') {
        console.error("Error fetching a Route by query");
    } else if (req.method === 'POST' && req.path === '/') {
        console.error("Error creating a Route");
    } else if (req.method === 'GET' && req.path.startsWith('/:id')) {
        console.error("Error fetching a Route");
    } else if (req.method === 'PUT' && req.path.startsWith('/:id')) {
        console.error("Error updating a Route");
    } else if (req.method === 'DELETE' && req.path.startsWith('/:id')) {
        console.error("Error deleting a Route");
    } else {
        console.error("Route error: ", err.message);
    }
    res.status(500).json({ error: 'An internal server error occurred' });
});

module.exports = router;