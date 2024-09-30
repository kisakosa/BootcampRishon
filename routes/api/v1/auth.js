const express = require('express');
const authController = require('../../../controllers/api/v1/auth'); // Import the auth controller
const auth = require('../../../middleware/auth'); // Import the auth middleware
const router = express.Router();

// Auth routes
router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/logout', authController.logout);

// Get user profile
router.get('/', auth, authController.profile);

// update name, password and email
router.put('/', auth, authController.update);

module.exports = router;