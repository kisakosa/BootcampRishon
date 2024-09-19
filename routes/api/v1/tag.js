const express = require('express');
const tagController = require('../../../controllers/api/v1/tag'); // Import the controller
const auth = require('../../../middleware/auth'); // Import the auth middleware
const checkRole = require('../../../middleware/role'); // Import the role middleware
const router = express.Router();

// Get all tags
router.get('/', tagController.getAllTags);

// Get a single tag by ID
router.get('/:id', tagController.getTagById);

// Create a new tag
router.post('/', auth, checkRole('admin'), tagController.createTag);

// Update a tag by ID
router.put('/:id', auth, checkRole('admin'), tagController.updateTag);

// Delete a tag by ID
router.delete('/:id', auth, checkRole('admin'), tagController.deleteTag);

module.exports = router;