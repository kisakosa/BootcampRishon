const Category = require('../../models/Category');
const Tag = require('../../models/Tag');

// Controller function to get all Categories
exports.getAllCategories = async (req, res) => {
    try {
        // Fetch all Categories from the database
        const categories = await Category.find()
            .sort({ _id: -1 });

        res.json(categories);
    } catch (error) {
        // If an error occurs, respond with an error status and message
        console.error('Error fetching Categories:', error);
        res.status(500).json({ error: 'An error occurred while fetching the Categories' });
    }
}

// Controller function to create a new Category
exports.createCategory = async (req, res) => {
    try {
        // Create a new Category instance
        const category = new Category(req.body);

        // Save the Category instance to the database
        await category.save();

        res.json(category);
    } catch (error) {
        // If an error occurs, respond with an error status and message
        console.error('Error creating Category:', error);
        res.status(500).json({ error: 'An error occurred while creating the Category' });
    }
}

// Controller function to get a Category by ID
exports.getCategoryById = async (req, res) => {
    try {
        // Fetch the Category by ID from the database
        const category = await Category.findById(req.params.id);

        res.json(category);
    } catch (error) {
        // If an error occurs, respond with an error status and message
        console.error('Error fetching Category:', error);
        res.status(500).json({ error: 'An error occurred while fetching the Category' });
    }
}

// Controller function to update a Category by ID
exports.updateCategory = async (req, res) => {
    try {
        // Update the Category by ID with the new data from the request body
        const updatedCategory = await Category.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        res.json(updatedCategory);
    } catch (error) {
        // If an error occurs, respond with an error status and message
        console.error('Error updating Category:', error);
        res.status(500).json({ error: 'An error occurred while updating the Category' });
    }
}

// Controller function to delete a Category by ID
exports.deleteCategory = async (req, res) => {
    try {
        // Delete the Category by ID from the database
        await Category.findByIdAndDelete(req.params.id);

        res.json({ message: 'Category deleted successfully' });
    } catch (error) {
        // If an error occurs, respond with an error status and message
        console.error('Error deleting Category:', error);
        res.status(500).json({ error: 'An error occurred while deleting the Category' });
    }
}

// Controller function to get all Tags for a Category
exports.getTagsForCategory = async (req, res) => {
    try {
        // Fetch all Tags for the Category by ID from the database
        const tags = await Tag.find({ category: req.params.id });

        res.json(tags);
    } catch (error) {
        // If an error occurs, respond with an error status and message
        console.error('Error fetching Tags for Category:', error);
        res.status(500).json({ error: 'An error occurred while fetching the Tags for the Category' });
    }
}