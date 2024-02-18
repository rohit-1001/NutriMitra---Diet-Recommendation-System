const express = require('express');
const router = express.Router();
const Blog = require('../models/Blog'); // Assuming your Blog model is defined in a separate file


router.post('/createblogs', async (req, res) => {
  try {
    console.log("Inside Create BLOGS");
    const blogsData = req.body;
    // console.log(blogsData);
    await Blog.create(blogsData);
    res.status(201).send("Blog created successfully");
  } catch (error) {
    console.error(error);
    res.status(500).send("Some unexpected error occurred");
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

router.post('/getblogsbyemail', async (req, res) => {
  try {
    const email = req.body.useremail;
    // console.log("INSIDE GETUSERBLOGS: ", email)
    const blogs = await Blog.find ({useremail: email});
    // console.log("BLOGS: ", blogs)
    res.status(200).json(blogs);
  } catch (error) {
    console.error('Error fetching blogs:', error);
    res.status(500).json({ error: 'Failed to fetch blogs' });
  }
});

// POST route to add a comment to a blog
router.post('/addcomment', async (req, res) => {
  try {
    console.log("INSIDE ADD COMMENT")
    const { blogId, comment, username, useremail } = req.body;
    console.log("BLOG ID: ", blogId)
    console.log("COMMENT: ", comment)
    console.log("USERNAME: ", username)
    console.log("USEREMAIL: ", useremail)

    // Find the blog by its ID
    const blog = await Blog.findById(blogId);
    console.log("FOUNDED BLOG: ", blog)

    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }

    // Add the new comment to the blog's comments array
    blog.comments.push({
      useremail,
      username,
      comment
    });

    // Save the updated blog
    const updatedBlog = await blog.save();

    // Send a success response with the updated blog
    res.status(200).json({ message: 'Comment added successfully', blog: updatedBlog });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
