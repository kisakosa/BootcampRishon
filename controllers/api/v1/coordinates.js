const Coordinates = require('../../../models/Coordinates');
const asyncHandler = require('../../../utils/asyncHandler'); // Adjust the path as needed

// Controller function to get all Coordinates
exports.getAllCoordinates = asyncHandler(async (req, res) => {
    // Fetch all Coordinates from the database
    const coordinates = await Coordinates.find()
        .sort({ _id: -1 })
        .limit(1000);

    res.json(coordinates);
});

// Controller function to create a new Coordinate
exports.createCoordinate = asyncHandler(async (req, res) => {
    // Create a new Coordinate instance
    const coordinate = new Coordinates(req.body);

    // Save the Coordinate instance to the database
    await coordinate.save();

    res.json(coordinate);
});

// Controller function to get a Coordinate by ID
exports.getCoordinateById = asyncHandler(async (req, res) => {
    // Fetch the Coordinate by ID from the database
    const coordinate = await Coordinates.findById(req.params.id);

    res.json(coordinate);
});

// Controller function to update a Coordinate by ID
exports.updateCoordinate = asyncHandler(async (req, res) => {
    // Update the Coordinate by ID with the new data from the request body
    const updatedCoordinate = await Coordinates.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    );

    res.json(updatedCoordinate);
});

// Controller function to delete a Coordinate by ID
exports.deleteCoordinate = asyncHandler(async (req, res) => {
    // Delete the Coordinate by ID
    await Coordinates.findByIdAndDelete(req.params.id);

    res.json({ message: 'Coordinate deleted successfully' });
});