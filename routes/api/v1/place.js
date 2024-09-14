const express = require('express');
const placeController = require('../../../controllers/api/v1/place'); // Import the controller
const router = express.Router();

// Route to get all Places
router.get('/', placeController.getAllPlaces);

// Route to get a Place by ID
router.get('/:id', placeController.getPlaceById);

// Route to create a new Place
router.post('/', placeController.createPlace);

// Route to update a Place by ID
router.put('/:id', placeController.updatePlace);

// Route to delete a Place by ID
router.delete('/:id', placeController.deletePlace);

module.exports = router;