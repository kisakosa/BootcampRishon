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

module.exports = router;