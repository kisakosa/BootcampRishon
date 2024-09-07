const mongoose = require('mongoose');

const tagSchema = new mongoose.Schema({
  for: {
    type: String,
    enum: ['Place', 'Route'],  
    required: true,
  },
  type: {
    type: String,
    enum: ['category', 'filter'],
    required: true
  },
  name: {
    type: String,
    required: true
  }
});

const Tag = mongoose.model('Tag', tagSchema);

module.exports = Tag;