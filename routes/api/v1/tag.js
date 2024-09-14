const express = require('express');
const tagController = require('../../../controllers/api/v1/tag'); // Import the controller
const router = express.Router();

// Get all tags
router.get('/', tagController.getAllTags);

// Get a single tag by ID
router.get('/:id', tagController.getTagById);

// Create a new tag
router.post('/', tagController.createTag);

// Update a tag by ID
router.put('/:id', tagController.updateTag);

// Delete a tag by ID
router.delete('/:id', tagController.deleteTag);

module.exports = router;