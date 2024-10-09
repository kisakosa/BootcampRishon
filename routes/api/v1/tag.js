const express = require('express');
const tagController = require('../../../controllers/api/v1/tag'); // Import the controller
const auth = require('../../../middleware/auth'); // Import the auth middleware
const checkRole = require('../../../middleware/role'); // Import the role middleware
const validateObjectId = require('../../../middleware/validateObjectId'); // Import the validateObjectId middleware
const SecurityMiddleware = require('../../../middleware/securityMiddleware'); // Import the security middleware
const router = express.Router();

// Get all tags
router.get('/', tagController.getAllTags);

// Get a single tag by ID
router.get('/:id', SecurityMiddleware.secure(), validateObjectId, tagController.getTagById);

// Create a new tag
router.post('/', SecurityMiddleware.secure(), auth, checkRole('admin'), tagController.createTag);

// Update a tag by ID
router.put('/:id', SecurityMiddleware.secure(), auth, checkRole('admin'), validateObjectId, tagController.updateTag);

// Delete a tag by ID
router.delete('/:id', SecurityMiddleware.secure(), auth, checkRole('admin'), validateObjectId, tagController.deleteTag);

// Get all tags for category by ID
router.get('/category/:id', SecurityMiddleware.secure(), validateObjectId, tagController.getTagsForCategory);

// Handles any tag errors
router.use((err, req, res, next) => {
    if (req.method === 'GET' && req.path === '/') {
        console.error("Error fetching tags");
    } else if (req.method === 'POST' && req.path === '/') {
        console.error("Error creating a tag");
    } else if (req.method === 'GET' && req.path.startsWith('/:id')) {
        console.error("Error fetching a tag");
    } else if (req.method === 'PUT' && req.path.startsWith('/:id')) {
        console.error("Error updating a tag");
    } else if (req.method === 'DELETE' && req.path.startsWith('/:id')) {
        console.error("Error deleting a tag");
    } else {
        console.error("Tag error: ", err.message);
    }
    res.status(500).json({ error: 'An internal server error occurred' });
});

module.exports = router;