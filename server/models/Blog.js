const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  content: {
    type: String,
  },
  image : {
    type: String,
  },
  useremail : {
    type: String,
  },
  date : {
    type: String,
  },
  username :{
    type: String,
  },
  comments : [{
    useremail : {
      type: String,
    },
    username : {
      type: String,
    },
    comment : {
      type: String,
    },
  }],
  
});

const Blog = mongoose.model('Blog', blogSchema);

module.exports = Blog;
