const Tag = require('../../../models/Tag'); // Import the Tag model

// Controller function to get all Tags
exports.getAllTags = async (req, res) => {
    try {
        // Fetch all Tags from the database
        const tags = await Tag.find().sort({ _id: -1 });

        res.json(tags);
    } catch (error) {
        // If an error occurs, respond with an error status and message
        console.error('Error fetching Tags:', error);
        res.status(500).json({ error: 'An error occurred while fetching the Tags' });
    }
}

// Controller function to create a new Tag
exports.createTag = async (req, res) => {
    try {
        // Create a new Tag instance
        const tag = new Tag(req.body);

        // Save the Tag instance to the database
        await tag.save();

        res.json(tag);
    } catch (error) {
        // If an error occurs, respond with an error status and message
        console.error('Error creating Tag:', error);
        res.status(500).json({ error: 'An error occurred while creating the Tag' });
    }
}

// Controller function to get a Tag by ID
exports.getTagById = async (req, res) => {
    try {
        // Fetch the Tag by ID from the database
        const tag = await Tag.findById(req.params.id);

        res.json(tag);
    } catch (error) {
        // If an error occurs, respond with an error status and message
        console.error('Error fetching Tag:', error);
        res.status(500).json({ error: 'An error occurred while fetching the Tag' });
    }
}

// Controller function to update a Tag by ID
exports.updateTag = async (req, res) => {
    try {
        // Update the Tag by ID with the new data from the request body
        const updatedTag = await Tag.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        res.json(updatedTag);
    } catch (error) {
        // If an error occurs, respond with an error status and message
        console.error('Error updating Tag:', error);
        res.status(500).json({ error: 'An error occurred while updating the Tag' });
    }
}

// Controller function to delete a Tag by ID
exports.deleteTag = async (req, res) => {
    try {
        // Delete the Tag by ID
        await Tag.findByIdAndDelete(req.params.id);

        res.json({ message: 'Tag deleted successfully' });
    } catch (error) {
        // If an error occurs, respond with an error status and message
        console.error('Error deleting Tag:', error);
        res.status(500).json({ error: 'An error occurred while deleting the Tag' });
    }
}