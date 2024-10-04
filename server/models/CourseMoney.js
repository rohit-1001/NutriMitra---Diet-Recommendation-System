const mongoose = require('mongoose');

const courseMoneySchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  money: {
    type: Number,
    required: true,
  }
});

const CourseMoney = mongoose.model('CourseMoney', courseMoneySchema);

module.exports = CourseMoney;
