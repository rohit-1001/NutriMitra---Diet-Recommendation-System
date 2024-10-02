const { createCourse, getCourse, buyCourse, getMyCourses } = require('../controllers/courseController');
const express = require('express');
const router = express.Router();
const authenticate = require('../middlewares/authenticate');

// router.post('/createCourse', authenticate,  createCourse);
router.post('/createCourse',   createCourse);

router.get('/getCourse', authenticate, getCourse);

router.post('/buyCourse', authenticate, buyCourse);

router.post('getMyCourses', authenticate, getMyCourses);


module.exports = router;