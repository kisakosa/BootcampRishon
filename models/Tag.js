const mongoose = require('mongoose');

const tagSchema = new mongoose.Schema({
  for: {
    type: String,
    enum: ['Place', 'Route'],  
    required: true,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: true
  },
  name: {
    type: String,
    required: true
  }
});

const Tag = mongoose.model('Tag', tagSchema);

module.exports = Tag;