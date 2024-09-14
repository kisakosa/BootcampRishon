const express = require('express');
const authController = require('../../../controllers/api/v1/auth'); // Import the auth controller
const router = express.Router();

// Auth routes
router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/logout', authController.logout);

module.exports = router;