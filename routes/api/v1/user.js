const express = require('express');
const userController = require('../../../controllers/api/v1/user'); // Import the controller
const auth = require('../../../middleware/auth'); // Import the auth middleware
const checkRole = require('../../../middleware/role'); // Import the role middleware
const router = express.Router();

// Route to get all users
router.get('/', auth, checkRole('admin'), userController.getAllUsers);

// Route to get a user by ID
router.get('/:id', auth, checkRole('admin'), userController.getUserById);

// Route to create a new user
router.post('/', auth, checkRole('admin'), userController.createUser);

// Route to update a user by ID
router.put('/:id', auth, async (req, res, next) => {
    if (req.user.role === 'admin' || req.user._id.toString() === req.params.id) {
        next();
    } else {
        res.status(403).send('Access denied.');
    }
}, userController.updateUser);

// Route to delete a user by ID
router.delete('/:id', auth, checkRole('admin'), userController.deleteUser);

module.exports = router;