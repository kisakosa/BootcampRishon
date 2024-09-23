const express = require('express');
const authController = require('../../../controllers/api/v1/auth'); // Import the auth controller
const router = express.Router();

// Auth routes
router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/logout', authController.logout);

// update name, password and email
router.put('/update', authController.update);

module.exports = router;