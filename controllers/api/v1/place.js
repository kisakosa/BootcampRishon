const Place = require('../../../models/Place'); // Import the Place model
const Tag = require('../../../models/Tag'); // Import the Tag model
const asyncHandler = require('../../../utils/asyncHandler'); // Adjust the path as needed

// Controller function to get all Places
exports.getAllPlaces = asyncHandler(async (req, res) => {
    // Fetch all Places from the database
    const places = await Place.find()
        .sort({ _id: -1 })
        .limit(1000)
        .populate({
            path: 'tags',
            populate: {
                path: 'category',
                model: 'Category'
            }
        });

    res.json(places);
});

// Controller function to get Places by query
exports.getPlaceByQuery = asyncHandler(async (req, res) => {
    // Fetch all Places from the database based on query
    const places = await Place.find(req.query)
        .sort({ _id: -1 })
        .limit(1000)
        .populate({
            path: 'tags',
            populate: {
                path: 'category',
                model: 'Category'
            }
        });

    res.json(places);
});

// Controller function to create a new Place
exports.createPlace = asyncHandler(async (req, res) => {
    // Create a new Place instance
    const place = new Place(req.body);

    // Save the Place instance to the database
    await place.save();

    res.json(place);
});

// Controller function to get a Place by ID
exports.getPlaceById = asyncHandler(async (req, res) => {
    // Fetch the Place by ID from the database
    const place = await Place.findById(req.params.id)
        .populate({
            path: 'tags',
            populate: {
                path: 'category',
                model: 'Category'
            }
        });

    res.json(place);
});

// Controller function to update a Place by ID
exports.updatePlace = asyncHandler(async (req, res) => {
    // Update the Place by ID with the new data from the request body
    const updatedPlace = await Place.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    );

    res.json(updatedPlace);
});

// Controller function to delete a Place by ID
exports.deletePlace = asyncHandler(async (req, res) => {
    // Delete the Place by ID
    await Place.findByIdAndDelete(req.params.id);

    res.json({ message: 'Place deleted successfully' });
});