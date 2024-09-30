const express = require('express');
const categoryController = require('../../../controllers/api/v1/category'); // Import the controller
const auth = require('../../../middleware/auth'); // Import the auth middleware
const checkRole = require('../../../middleware/role'); // Import the role middleware
const validateObjectId = require('../../../middleware/validateObjectId'); // Import the validateObjectId middleware
const router = express.Router();

// Get all categories
router.get('/', categoryController.getAllCategories);

// Get a single category by ID
router.get('/:id', validateObjectId, categoryController.getCategoryById);

// Create a new category
router.post('/', auth, checkRole('admin'), categoryController.createCategory);

// Update a category by ID
router.put('/:id', auth, checkRole('admin'), validateObjectId, categoryController.updateCategory);

// Delete a category by ID
router.delete('/:id', auth, checkRole('admin'), validateObjectId, categoryController.deleteCategory);

// Get all Tags for a Category
router.get('/:id/tags', validateObjectId, categoryController.getTagsForCategory);

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