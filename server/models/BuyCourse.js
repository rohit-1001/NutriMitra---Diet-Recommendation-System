const mongoose = require('mongoose');

const buyCourseSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
  },
});

const BuyCourse = mongoose.model('BuyCourse', buyCourseSchema);

module.exports = BuyCourse;
