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
            duration, 
            language, 
            index, 
            price, 
            startDate, 
            endDate 
        } = req.body;

        let courseData = {};
        if(image === '') {
            courseData = {
                title, 
                description, 
                creatorName, 
                creatorEmail, 
                authors, 
                duration, 
                language, 
                index, 
                price, 
                startDate, 
                endDate
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
                duration, 
                language, 
                index, 
                price, 
                startDate, 
                endDate
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

module.exports = { createCourse, getCourse, buyCourse };