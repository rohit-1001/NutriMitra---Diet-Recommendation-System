const { createCourse, getCourse, buyCourse } = require('../controllers/courseController');
const express = require('express');
const router = express.Router();
const authenticate = require('../middlewares/authenticate');

router.post('/createCourse', authenticate,  createCourse);

router.get('/getCourse', authenticate, getCourse);

router.post('/buyCourse', authenticate, buyCourse);


module.exports = router;