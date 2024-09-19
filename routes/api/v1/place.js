const express = require('express');
const placeController = require('../../../controllers/api/v1/place'); // Import the controller
const auth = require('../middleware/auth'); // Import the auth middleware
const checkRole = require('../middleware/role'); // Import the role middleware
const router = express.Router();

// Route to get all Places
router.get('/', placeController.getAllPlaces);

// Route to get a Place by ID
router.get('/:id', placeController.getPlaceById);

// Route to create a new Place
router.post('/', auth, checkRole('admin'), placeController.createPlace);

// Route to update a Place by ID
router.put('/:id', auth, checkRole('admin'), placeController.updatePlace);

// Route to delete a Place by ID
router.delete('/:id', auth, checkRole('admin'), placeController.deletePlace);

module.exports = router;