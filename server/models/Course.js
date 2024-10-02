const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  image : {
    type: String,
    default: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcROgY9BG36B1t7RZCr_i18RcjgfSJTFyUx0-w&s'

  },
  creatorName : {
    type: String,
    required: true
  },
  creatorEmail : {
    type: String,
    required: true
  },
  authors : {
    type: String,
    required: true
  },
  language : {
    type: String,
    required: true
  },
  index : [{
    type: String,
    required: true
  }],
  price : {
    type: Number,
    required: true
  },
});

const Course = mongoose.model('Course', courseSchema);

module.exports = Course;
