const User = require('../../models/User');

// Controller function to get all Users
exports.getAllUsers = async (req, res) => {
    try {
        // Fetch all Users from the database
        const users = await User.find().sort({ _id: -1 });

        res.json(users);
    } catch (error) {
        // If an error occurs, respond with an error status and message
        console.error('Error fetching Users:', error);
        res.status(500).json({ error: 'An error occurred while fetching the Users' });
    }
}

// Controller function to create a new User
exports.createUser = async (req, res) => {
    try {
        // Create a new User instance
        const user = new User(req.body);

        // Save the User instance to the database
        await user.save();

        res.json(user);
    } catch (error) {
        // If an error occurs, respond with an error status and message
        console.error('Error creating User:', error);
        res.status(500).json({ error: 'An error occurred while creating the User' });
    }
}

// Controller function to get a User by ID
exports.getUserById = async (req, res) => {
    try {
        // Fetch the User by ID from the database
        const user = await User.findById(req.params.id);

        res.json(user);
    } catch (error) {
        // If an error occurs, respond with an error status and message
        console.error('Error fetching User:', error);
        res.status(500).json({ error: 'An error occurred while fetching the User' });
    }
}

// Controller function to update a User by ID
exports.updateUser = async (req, res) => {
    try {
        // Update the User by ID with the new data from the request body
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
    } catch (error) {
        // If an error occurs, respond with an error status and message
        console.error('Error updating User:', error);
        res.status(500).json({ error: 'An error occurred while updating the User' });
    }
}

// Controller function to delete a User by ID
exports.deleteUser = async (req, res) => {
    try {
        // Delete the User by ID
        await User.findByIdAndDelete(req.params.id);

        res.json({ message: 'User deleted successfully' });
    } catch (error) {
        // If an error occurs, respond with an error status and message
        console.error('Error deleting User:', error);
        res.status(500).json({ error: 'An error occurred while deleting the User' });
    }
}