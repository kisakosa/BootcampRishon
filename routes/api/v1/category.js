const express = require('express');
const categoryController = require('../../../controllers/api/v1/category'); // Import the controller
const auth = require('../../../middleware/auth'); // Import the auth middleware
const checkRole = require('../../../middleware/role'); // Import the role middleware
const validateObjectId = require('../../../middleware/validateObjectId'); // Import the validateObjectId middleware
const SecurityMiddleware = require('../../../middleware/securityMiddleware'); // Import the security middleware
const router = express.Router();

// Get all categories
router.get('/', categoryController.getAllCategories);

// Search for categories
router.get('/search', SecurityMiddleware.secure(), categoryController.searchCategories);

// Get a single category by ID
router.get('/:id', SecurityMiddleware.secure(), validateObjectId, categoryController.getCategoryById);

// Create a new category
router.post('/', SecurityMiddleware.secure(), auth, checkRole('admin'), categoryController.createCategory);

// Update a category by ID
router.put('/:id', SecurityMiddleware.secure(), auth, checkRole('admin'), validateObjectId, categoryController.updateCategory);

// Delete a category by ID
router.delete('/:id', SecurityMiddleware.secure(), auth, checkRole('admin'), validateObjectId, categoryController.deleteCategory);

// Handles any category errors
router.use((err, req, res, next) => {
    if (req.method === 'GET' && req.path === '/') {
        console.error("Error fetching categories");
    } else if (req.method === 'POST' && req.path === '/') {
        console.error("Error creating a category");
    } else if (req.method === 'GET' && req.path.startsWith('/:id')) {
        console.error("Error fetching a category");
    } else if (req.method === 'PUT' && req.path.startsWith('/:id')) {
        console.error("Error updating a category");
    } else if (req.method === 'DELETE' && req.path.startsWith('/:id')) {
        console.error("Error deleting a category");
    } else {
        console.error("Category error: ", err.message);
    }
    res.status(500).json({ error: 'An internal server error occurred' });
});

module.exports = router;