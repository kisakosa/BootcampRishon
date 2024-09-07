const express = require('express');
const router = express.Router();
const routeController = require('../../../controllers/api/v1/route'); // Import the controller

// Route to get all Routes
router.get('/', routeController.getAllRoutes);

module.exports = router;