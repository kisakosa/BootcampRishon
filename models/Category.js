const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  for: {
    type: String,
    enum: ['Place', 'Route'],  
    required: true,
  },
  name: {
    type: String,
    required: true
  }
});

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;