const express = require('express');
const router = express.Router();
const Blog = require('../models/Blog'); // Assuming your Blog model is defined in a separate file


router.post('/createblogs', async (req, res) => {
  try {
    console.log("Inside Craete BLOGS")
    const blogsData = req.body;

    // Assuming blogsData is an array of blog objects
    const createdBlogs = await Blog.insertMany(blogsData);

    res.status(201).json({ msg: "Blogs created successfully", blogs: createdBlogs });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Some unexpected error occurred" });
  }
});

// Route to fetch all blogs
router.get('/getblogs', async (req, res) => {
  try {
    const blogs = await Blog.find();
    res.status(200).json(blogs);
  } catch (error) {
    console.error('Error fetching blogs:', error);
    res.status(500).json({ error: 'Failed to fetch blogs' });
  }
});

module.exports = router;
