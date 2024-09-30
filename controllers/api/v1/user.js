const User = require('../../../models/User');
const asyncHandler = require('../../../utils/asyncHandler'); // Adjust the path as needed

// Controller function to get all Users
exports.getAllUsers = asyncHandler(async (req, res) => {
    // Fetch all Users from the database
    const users = await User.find({}, '-password').sort({ _id: -1 });

    res.json(users);
});

// Controller function to create a new User
exports.createUser = asyncHandler(async (req, res) => {
    // Create a new User instance
    const user = new User(req.body);

    // Save the User instance to the database
    await user.save();

    res.json(user);
});

// Controller function to get a User by ID
exports.getUserById = asyncHandler(async (req, res) => {
    // Fetch the User by ID from the database
    const user = await User.findById(req.params.id, '-password');

    res.json(user);
});

// Controller function to update a User by ID
exports.updateUser = asyncHandler(async (req, res) => {
    // Update the User by ID with the new data from the request body
    const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true },
        '-password'
    );

    res.json(updatedUser);
});

// Controller function to delete a User by ID
exports.deleteUser = asyncHandler(async (req, res) => {
    // Delete the User by ID
    await User.findByIdAndDelete(req.params.id);

    res.json({ message: 'User deleted successfully' });
});