const express = require('express');
const coordinatesController = require('../../../controllers/api/v1/coordinates'); // Import the controller
const auth = require('../../../middleware/auth'); // Import the auth middleware
const checkRole = require('../../../middleware/role'); // Import the role middleware
const validateObjectId = require('../../../middleware/validateObjectId'); // Import the validateObjectId middleware
const SecurityMiddleware = require('../../../middleware/securityMiddleware'); // Import the security middleware
const router = express.Router();

// Route to get all coordinates
router.get('/', coordinatesController.getAllCoordinates);

// Route to get a specific coordinate by ID
router.get('/:id', SecurityMiddleware.secure(), validateObjectId, coordinatesController.getCoordinateById);

// Route to create a new coordinate
router.post('/', SecurityMiddleware.secure(), auth, checkRole('admin'), coordinatesController.createCoordinate);

// Route to update a coordinate by ID
router.put('/:id', SecurityMiddleware.secure(), auth, checkRole('admin'), validateObjectId, coordinatesController.updateCoordinate);

// Route to delete a coordinate by ID
router.delete('/:id', SecurityMiddleware.secure(), auth, checkRole('admin'), validateObjectId, coordinatesController.deleteCoordinate);

// Handles any coordinate errors
router.use((err, req, res, next) => {
    if (req.method === 'GET' && req.path === '/') {
        console.error("Error fetching coordinates");
    } else if (req.method === 'POST' && req.path === '/') {
        console.error("Error creating a coordinate");
    } else if (req.method === 'GET' && req.path.startsWith('/:id')) {
        console.error("Error fetching a coordinate");
    } else if (req.method === 'PUT' && req.path.startsWith('/:id')) {
        console.error("Error updating a coordinate");
    } else if (req.method === 'DELETE' && req.path.startsWith('/:id')) {
        console.error("Error deleting a coordinate");
    } else {
        console.error("Coordinate error: ", err.message);
    }
    res.status(500).json({ error: 'An internal server error occurred' });
});

module.exports = router;