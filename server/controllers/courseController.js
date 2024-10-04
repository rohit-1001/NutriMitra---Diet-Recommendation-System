const Course = require("../models/Course");
const BuyCourse = require("../models/BuyCourse");
const Video = require("../models/Videos");
const multer = require("multer");

// Define storage settings for multer
const storage = multer.memoryStorage(); // Store files as Buffer in memory
const upload = multer({ storage: storage });

const createCourse = async (req, res) => {
  try {
    let { formData, videos } = req.body;

    let {
      title,
      description,
      image,
      creatorName,
      creatorEmail,
      authors,
      language,
      textFields,
      price,
    } = formData;

    let courseData = {};
    if (image === "") {
      courseData = {
        title,
        description,
        creatorName,
        creatorEmail,
        authors,
        language,
        index: textFields,
        price,
      };
    } else {
      courseData = {
        title,
        description,
        image,
        creatorName,
        creatorEmail,
        authors,
        language,
        index : textFields,
        price,
      };
    }
    const course = new Course(courseData);
    await course.save();

    const id = course._id;
    if (courseData.index.length !== videos.length) {
      return res.status(400).json({ error: "Kindly upload videos for complete course" });
    }

    // Save each video with its index
    for (let i = 0; i < videos.length; i++) {
      const videoString = videos[i]; // Access the video buffer from multer
      const video = new Video({ id, ind: i, video: videoString });

      await video.save(); // Save the video to MongoDB
    }

    res.status(200).json({ msg: "Course created successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Some unexpected error occurred" });
  }
};

const getCourse = async (req, res) => {
  try {
    const courses = await Course.find();
    res.status(200).json({ courses: courses });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch courses" });
  }
};

const buyCourse = async (req, res) => {
  try {
    const { id, email } = req.body;
    const buyCourse = new BuyCourse({ id, email });
    await buyCourse.save();
    res.status(200).json({ msg: "Course bought successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to buy course" });
  }
};

const getMyCourses = async (req, res) => {
  try {
    const email = req.email;
    const myCourses = await BuyCourse.find({ email: email });
    let myCoursesInfo = [];
    for (let i = 0; i < myCourses.length; i++) {
      myCoursesInfo.push(await Course.findById(myCourses[i].id));
    }
    res.status(200).json({ myCourses: myCoursesInfo });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch courses" });
  }
};

module.exports = { createCourse, getCourse, buyCourse, getMyCourses };
