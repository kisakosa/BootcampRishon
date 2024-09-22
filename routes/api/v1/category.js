const express = require('express');
const categoryController = require('../../../controllers/api/v1/category'); // Import the controller
const auth = require('../../../middleware/auth'); // Import the auth middleware
const checkRole = require('../../../middleware/role'); // Import the role middleware
const router = express.Router();

// Get all categories
router.get('/', categoryController.getAllCategories);

// Get a single category by ID
router.get('/:id', categoryController.getCategoryById);

// Create a new category
router.post('/', auth, checkRole('admin'), categoryController.createCategory);

// Update a category by ID
router.put('/:id', auth, checkRole('admin'), categoryController.updateCategory);

// Delete a category by ID
router.delete('/:id', auth, checkRole('admin'), categoryController.deleteCategory);

// Get all Tags for a Category
router.get('/:id/tags', categoryController.getTagsForCategory);

module.exports = router;