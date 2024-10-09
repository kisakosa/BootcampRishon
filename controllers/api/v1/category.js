const Category = require('../../../models/Category');
const asyncHandler = require('../../../utils/asyncHandler.js'); // Adjust the path as needed

// Controller function to get all Categories
exports.getAllCategories = asyncHandler(async (req, res) => {
    // Fetch all Categories from the database
    const categories = await Category.find().sort({ _id: -1 });
    res.json(categories);
});

// Controller function to search for Categories
exports.searchCategories = asyncHandler(async (req, res) => {
    // Fetch all Categories from the database that match the search query
    const { name } = req.query;
    let query = {};
    if (name) {
        query.name = { $regex: name, $options: 'i' };
    }
    const categories = await Category.find(query).sort({ _id: -1 });
    res.json(categories);
});

// Controller function to create a new Category
exports.createCategory = asyncHandler(async (req, res) => {
    // Create a new Category instance
    const category = new Category(req.body);

    // Save the Category instance to the database
    await category.save();
    res.json(category);
});

// Controller function to get a Category by ID
exports.getCategoryById = asyncHandler(async (req, res) => {
    // Fetch the Category by ID from the database
    const category = await Category.findById(req.params.id);
    res.json(category);
});

// Controller function to update a Category by ID
exports.updateCategory = asyncHandler(async (req, res) => {
    // Update the Category by ID with the new data from the request body
    const updatedCategory = await Category.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    );
    res.json(updatedCategory);
});

// Controller function to delete a Category by ID
exports.deleteCategory = asyncHandler(async (req, res) => {
    // Delete the Category by ID from the database
    await Category.findByIdAndDelete(req.params.id);
    res.json({ message: 'Category deleted successfully' });
});