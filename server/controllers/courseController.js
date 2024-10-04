const Course = require("../models/Course");
const BuyCourse = require("../models/BuyCourse");
const Video = require("../models/Videos");
const multer = require("multer");
const CourseMoney = require("../models/CourseMoney");

// Define storage settings for multer
const storage = multer.memoryStorage(); // Store files as Buffer in memory
const upload = multer({ storage: storage });

const createCourse = async (req, res) => {
  try {
    let { formData, videos, creator } = req.body;

    let { title, description, image, authors, language, textFields, price } =
      formData;

    let courseData = {};
    if (image === "") {
      courseData = {
        title,
        description,
        creatorName: creator.name,
        creatorEmail: creator.email,
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
        creatorName: creator.name,
        creatorEmail: creator.email,
        authors,
        language,
        index: textFields,
        price,
      };
    }

    const hasNullVideo = videos.some((video) => video === null);

    if (hasNullVideo) {
      return res.status(400).json({
        error: "Some videos are missing. Please upload all course videos.",
      });
    }

    const course = new Course(courseData);
    await course.save();

    const id = course._id;
    // Save each video with its index
    for (let i = 0; i < videos.length; i++) {
      const videoString = videos[i]; // Access the video buffer from multer
      const video = new Video({ id, ind: i, video: videoString });

      await video.save(); // Save the video to MongoDB
    }

    res.status(200).json({ msg: "Course created successfully" });
  } catch (error) {
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
    const { id, email, money } = req.body;
    const buyCourse = new BuyCourse({ id, email });
    await buyCourse.save();

    const addMoney = await CourseMoney.findOne({ email: email });
    if(addMoney){
      await CourseMoney.findOneAndUpdate(
        { email: email },
        { $inc: { money: money } }
      );
    } else {
      const courseMoney = new CourseMoney({ email: email, money: money });
      await courseMoney.save();
    }
    res.status(200).json({ msg: "Course bought successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to buy course" });
  }
};

const getMyCourses = async (req, res) => {
  try {
    const {email} = req.body;
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

const getCourseVideos = async (req, res) => {
    try {
      const { course_id } = req.body;
      const videos = await Video.find({ id : course_id}) 
        .sort({ ind: 1 })
        .select('video');
      res.status(200).json({ videos: videos });
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch videos" });
    }
  };
  

module.exports = {
  createCourse,
  getCourse,
  buyCourse,
  getMyCourses,
  getCourseVideos,
};
