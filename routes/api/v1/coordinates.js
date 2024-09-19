const express = require('express');
const coordinatesController = require('../../../controllers/api/v1/coordinates'); // Import the controller
const auth = require('../middleware/auth'); // Import the auth middleware
const checkRole = require('../middleware/role'); // Import the role middleware
const router = express.Router();

// Route to get all coordinates
router.get('/', coordinatesController.getAllCoordinates);

// Route to get a specific coordinate by ID
router.get('/:id', coordinatesController.getCoordinateById);

// Route to create a new coordinate
router.post('/', auth, checkRole('admin'), coordinatesController.createCoordinate);

// Route to update a coordinate by ID
router.put('/:id', auth, checkRole('admin'), coordinatesController.updateCoordinate);

// Route to delete a coordinate by ID
router.delete('/:id', auth, checkRole('admin'), coordinatesController.deleteCoordinate);

module.exports = router;