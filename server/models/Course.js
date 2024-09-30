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
    required: true
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
  duration : {
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
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
});

const Course = mongoose.model('Course', courseSchema);

module.exports = Course;
