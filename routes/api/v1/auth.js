const express = require('express');
const authController = require('../../../controllers/api/v1/auth'); // Import the auth controller
const router = express.Router();

function printBody(req, res, next) {
    console.log(req.body);
    next();
}

// Auth routes
router.post('/register', printBody, authController.register);
router.post('/login', printBody, authController.login);
router.post('/logout', authController.logout);

module.exports = router;