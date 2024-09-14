const express = require('express');
const coordinatesController = require('../../../controllers/api/v1/coordinates'); // Import the controller
const router = express.Router();

// Route to get all coordinates
router.get('/', coordinatesController.getAllCoordinates);

// Route to get a specific coordinate by ID
router.get('/:id', coordinatesController.getCoordinateById);

// Route to create a new coordinate
router.post('/', coordinatesController.createCoordinate);

// Route to update a coordinate by ID
router.put('/:id', coordinatesController.updateCoordinate);

// Route to delete a coordinate by ID
router.delete('/:id', coordinatesController.deleteCoordinate);

module.exports = router;