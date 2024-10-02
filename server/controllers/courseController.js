const Course = require('../models/Course');
const BuyCourse = require('../models/BuyCourse');

const createCourse = async (req, res) => {
    try {
        let { 
            title, 
            description, 
            image, 
            creatorName, 
            creatorEmail, 
            authors,
            language, 
            index, 
            price
        } = req.body;

        let courseData = {};
        if(image === '') {
            courseData = {
                title, 
                description, 
                creatorName, 
                creatorEmail, 
                authors, 
                language, 
                index, 
                price
            }
        }
        else{
            courseData = {
                title, 
                description, 
                image, 
                creatorName, 
                creatorEmail, 
                authors,
                language, 
                index, 
                price
            }
        }

        const course = new Course(courseData);
        await course.save();
        res.status(200).json({ msg: "Course created successfully" });
    } catch (error) {
        res.status(500).json({ error: "Some unexpected error occurred" });
    }
};


const getCourse = async (req, res) => {
    try {
        const courses = await Course.find();
        res.status(200).json({courses : courses});
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch courses' });
    }
}

const buyCourse = async (req, res) => {
    try {
        const { id, email } = req.body;
        const buyCourse = new BuyCourse({ id, email });
        await buyCourse.save();
        res.status(200).json({ msg: 'Course bought successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to buy course' });
    }
}

const getMyCourses = async (req, res) => {
    try {
        const email = req.email;
        const myCourses = await BuyCourse.find({ email: email });
        let myCoursesInfo = [];
        for(let i = 0; i < myCourses.length; i++) {
            myCoursesInfo.push(await Course.findById(myCourses[i].id));
        }
        res.status(200).json({ myCourses : myCoursesInfo });
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch courses' });
    }
}

module.exports = { createCourse, getCourse, buyCourse, getMyCourses };