const express = require('express');
const authController = require('../../../controllers/api/v1/auth'); // Import the auth controller
const auth = require('../../../middleware/auth'); // Import the auth middleware
const checkRole = require('../../../middleware/role'); // Import the role middleware
const router = express.Router();

// Auth routes
router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/logout', authController.logout);

// Protected routes
router.get('/admin', auth, checkRole('admin'), authController.adminContent);
router.get('/customer', auth, checkRole('customer'), authController.customerContent);

module.exports = router;