import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { toast } from "react-toastify";
import axios from "axios";
import DynamicEmoji from "../components/DynamicEmoji";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import FavoriteIcon from "@mui/icons-material/Favorite";
import NavigationIcon from "@mui/icons-material/Navigation";
import AddCourseModal from "../components/AddCourseModal";
import { NavLink } from "react-router-dom";
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const Learn = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    window.document.title = "Learn | NutriMitra";
    const role = localStorage.getItem("role");
    if (role == "expert") {
      setMakeCreateCourseButtonVisible(true);
    }
    getAllCourses();
  }, []);

  const [value, setValue] = React.useState(0);
  const [courses, setCourses] = useState([]);
  const [mycourses, setMyCourses] = useState([]);
  const [makeCreateCourseButtonVisible, setMakeCreateCourseButtonVisible] =
    useState(false);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const getMyCourses = async () => {
    try {
      const token = localStorage.getItem("token");
      const email = localStorage.getItem("email");
      const res = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/getMyCourses`,
        { email: email },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      if (res.status === 200) {
        setMyCourses(res.data.myCourses);
      }
    } catch (error) {
      if (error.response && error.response.data) {
        toast.error(error.response.data.error);
      }
    }
  };

  const [noCourseLine, setNoCourseLine] = useState(null);

  const getAllCourses = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/getCourse`,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      const data = res.data;
      setCourses(data.courses);
      const role = localStorage.getItem("role");
      if (role === "user") {
        setNoCourseLine(
          <h2
            style={{
              fontWeight: "600",
              textAlign: "center",
              color: "#4CAF50",
              margin: "20px 0",
              fontFamily: "Arial, sans-serif",
            }}
          >
            No courses purchased yet <DynamicEmoji />
          </h2>
        );
      } else if (role === "expert") {
        setNoCourseLine(
          <h2
            style={{
              fontWeight: "600",
              textAlign: "center",
              color: "#4CAF50",
              margin: "20px 0",
              fontFamily: "Arial, sans-serif",
            }}
          >
            No courses created yet <DynamicEmoji />
          </h2>
        );
      }

      if (role === "expert") {
        let mycourses = [];
        mycourses = data.courses.filter(
          (course) => course.creatorEmail === localStorage.getItem("email")
        );
        setMyCourses(mycourses);
      } else if (role === "user") {
        getMyCourses();
      }
    } catch (error) {
      if (error.response && error.response.data) {
        toast.error(error.response.data.error);
      }
    }
  };

  const [selectedCourse, setSelectedCourse] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [addCourseModalVisible, setAddCourseModalVisible] = useState(false);
  const [selectedCourseVideos, setSelectedCourseVideos] = useState([]);

  const handleCardClick = async (course) => {
    setSelectedCourse(course);
    setShowModal(true);
  };

  const handleCardClick1 = async (course) => {
    const token = localStorage.getItem("token");
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/getCourseVideos`,
        { course_id: course._id },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      if (res.status === 200) {
        setSelectedCourseVideos(res.data.videos);
      }
    } catch (error) {
      if (error.response && error.response.data) {
        toast.error(error.response.data.error);
      }
    }
    setSelectedCourse(course);
    setShowModal(true);
  };

  const checkBought = (course) => {
    for (let i = 0; i < mycourses.length; i++) {
      if (mycourses[i]._id === course._id) {
        return true;
      }
    }
    return false;
  };

  const buyCourse = async (course) => {
    try {
      const token = localStorage.getItem("token");
      const email = localStorage.getItem("email");
      const res = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/buyCourse`,
        { id: course._id, email: email, money: course.price },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      if (res.status === 200) {
        toast.success(res.data.msg);
        getMyCourses();
      }
    } catch (error) {
      if (error.response && error.response.data) {
        toast.error(error.response.data.error);
      }
    }
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const handleCloseModal = () => {
    setAddCourseModalVisible(false);
  };

  const openAddCourseModal = () => {
    setAddCourseModalVisible(true);
  };

  const truncateDescription = (description, wordLimit) => {
    const words = description.split(" ");
    return words.length > wordLimit
      ? words.slice(0, wordLimit).join(" ") + "..."
      : description;
  };

  const styles = {
    container: {
      display: "flex",
      gap: "20px",
      flexWrap: "wrap",
      justifyContent: "center",
      margin: "20px 0",
    },
    card: {
      border: "1px solid #ddd",
      borderRadius: "10px",
      padding: "16px",
      width: "350px",
      textAlign: "center",
      cursor: "pointer",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      transition: "transform 0.2s, box-shadow 0.2s",
      margin: "10px",
    },
    cardImage: {
      maxWidth: "100%",
      borderRadius: "10px 10px 0 0",
    },
    cardTitle: {
      fontSize: "18px",
      fontWeight: "bold",
      margin: "10px 0",
    },
    description: {
      height: "80px",
      overflow: "hidden",
      textOverflow: "ellipsis",
      fontSize: "14px",
      color: "#555",
    },
    price: {
      fontSize: "16px",
      fontWeight: "bold",
      margin: "5px 0",
    },
    modal: {
      position: "fixed",
      top: "40px",
      left: 0,
      width: "100%",
      height: "100%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    modalContent: {
      backgroundColor: "white",
      padding: "25px",
      borderRadius: "10px",
      width: "90%",
      maxWidth: "1100px",
      maxHeight: "82vh",
      overflowY: "auto",
      position: "relative",
    },
    closeButton: {
      position: "absolute",
      top: "10px",
      right: "10px",
      fontSize: "20px",
      cursor: "pointer",
    },
    horizontalRow: {
      display: "flex",
      justifyContent: "space-between",
      marginTop: "20px",
    },
    column: {
      width: "47%",
      padding: "7px",
    },
    detailContainer: {
      marginTop: "20px",
    },
    detailItem: {
      marginBottom: "10px",
    },
    detailRow: {
      display: "flex",
      alignItems: "center",
      marginBottom: "10px",
    },
    imageContainer: {
      marginRight: "20px",
    },
    descriptionContainer: {
      marginTop: "20px",
    },
    sectionDivider: {
      margin: "20px 0",
      height: "1px",
      backgroundColor: "#ddd",
    },
    divider: {
      width: "1px",
      backgroundColor: "#ddd",
      alignSelf: "stretch",
      margin: "0 20px",
    },
  };

  return (
    <>
      {addCourseModalVisible && (
        <AddCourseModal
          onClose={() => {
            setAddCourseModalVisible(false);
            getAllCourses(); // Call your method here
          }}
        />
      )}
      {makeCreateCourseButtonVisible && (
        <Box
          sx={{
            position: "fixed",
            bottom: 16,
            right: 16,
          }}
        >
          <div
            style={{
              position: "relative",
              display: "inline-block",
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {/* The Slider */}
            <span
              style={{
                position: "absolute",
                right: 0,
                bottom: 0,
                height: 56,
                width: isHovered ? "200px" : "56px",
                backgroundColor: "#388E3C",
                borderRadius: "28px",
                color: "#fff",
                display: "flex",
                alignItems: "center",
                justifyContent: isHovered ? "flex-start" : "center",
                paddingLeft: isHovered ? "20px" : "0",
                whiteSpace: "nowrap",
                transition: "width 0.3s ease, padding-left 0.3s ease",
                overflow: "hidden",
              }}
            >
              {isHovered ? "Create Course" : ""}
            </span>

            {/* The Floating Button */}
            <Fab
              sx={{
                width: 56,
                height: 56,
                backgroundColor: "#81C784",
                zIndex: 1,
                position: "relative",
                "&:hover": {
                  backgroundColor: "#388E3C",
                },
              }}
              aria-label="add"
              onClick={openAddCourseModal}
            >
              <AddIcon
                sx={{
                  color: isHovered ? "#fff" : "#000",
                  transition: "color 0.3s ease",
                }}
              />
            </Fab>
          </div>
        </Box>
      )}
      <Box sx={{ width: "100%" }}>
        <Box
          sx={{
            borderBottom: 1,
            borderColor: "divider",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Tabs
            value={value}
            onChange={handleChange}
            sx={{
              "& .MuiTabs-indicator": {
                backgroundColor: "darkgreen",
              },
              "& .MuiTab-root": {
                color: "green",
                "&.Mui-selected": {
                  color: "darkgreen",
                },
              },
            }}
            aria-label="basic tabs example"
          >
            <Tab label="All Courses" {...a11yProps(0)} />
            <Tab label="My Courses" {...a11yProps(1)} />
          </Tabs>
        </Box>

        <CustomTabPanel value={value} index={0}>
          <div>
            {/* Display course cards */}
            <div style={styles.container}>
              {courses.map((course, index) => (
                <div
                  key={index}
                  style={styles.card}
                  onClick={() => handleCardClick(course)}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.boxShadow =
                      "0 8px 16px rgba(0, 0, 0, 0.2)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.boxShadow =
                      "0 4px 8px rgba(0, 0, 0, 0.1)")
                  }
                >
                  <img
                    src={course.image}
                    alt={course.title}
                    style={styles.cardImage}
                  />
                  <h3 style={styles.cardTitle}>{course.title}</h3>
                  <p style={styles.description}>
                    {truncateDescription(course.description, 20)}
                  </p>
                  <p style={styles.price}>
                    <strong>Price:</strong> {`\u20B9`}
                    {course.price}
                  </p>
                </div>
              ))}
            </div>

            {/* Modal for detailed course info */}
            {showModal && selectedCourse && (
              <div style={styles.modal} onClick={closeModal}>
                <div
                  style={{ ...styles.modalContent, position: "relative" }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <span style={styles.closeButton} onClick={closeModal}>
                    &times;
                  </span>
                  <h2>{selectedCourse.title}</h2>

                  {/* Horizontal layout for modal */}
                  <div style={styles.horizontalRow}>
                    {/* First column with image and details */}
                    <div style={styles.column}>
                      <div style={styles.detailRow}>
                        <div style={styles.imageContainer}>
                          <img
                            src={selectedCourse.image}
                            alt={selectedCourse.title}
                            style={styles.cardImage}
                          />
                        </div>
                        <div>
                          <p style={styles.detailItem}>
                            <strong>Authors:</strong> {selectedCourse.authors}
                          </p>
                          <p style={styles.detailItem}>
                            <strong>Language:</strong> {selectedCourse.language}
                          </p>
                          <p style={styles.detailItem}>
                            <strong>Price:</strong> {`\u20B9`}
                            {selectedCourse.price}
                          </p>
                          <p style={styles.detailItem}>
                            <strong>Creator:</strong>{" "}
                            {selectedCourse.creatorName} (
                            {selectedCourse.creatorEmail})
                          </p>
                        </div>
                      </div>
                      {/* Description below the details */}
                      <div style={styles.sectionDivider} />
                      <div style={styles.descriptionContainer}>
                        <p style={{ marginTop: "20px", fontWeight: "bold" }}>
                          Description:
                        </p>
                        <p
                          style={{
                            whiteSpace: "pre-wrap",
                            maxHeight: "180px",
                            overflowY: "auto",
                            paddingRight: "10px",
                          }}
                        >
                          {selectedCourse.description}
                        </p>
                      </div>
                    </div>

                    {/* Vertical Divider */}
                    <div style={styles.divider}></div>

                    {/* Second column with course index */}
                    <div style={styles.column}>
                      <strong>Course Index:</strong>
                      <ul>
                        {selectedCourse.index.map((item, idx) => (
                          <li key={idx}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Centered Submit Button */}
                  {!makeCreateCourseButtonVisible && (
                    <div
                      style={{
                        position: "absolute",
                        bottom: "20px",
                        left: "50%",
                        transform: "translateX(-50%)",
                        width: "fit-content",
                      }}
                    >
                      <button
                        onClick={() => {
                          if (!checkBought(selectedCourse)) {
                            buyCourse(selectedCourse);
                          }
                        }}
                        disabled={checkBought(selectedCourse)} // Disable button if course is bought
                        style={{
                          padding: "10px 15px",
                          backgroundColor: checkBought(selectedCourse)
                            ? "gray"
                            : "#4CAF50", // Set color conditionally
                          color: "white",
                          border: "none",
                          borderRadius: "4px",
                          cursor: checkBought(selectedCourse)
                            ? "not-allowed"
                            : "pointer", // Update cursor style
                        }}
                      >
                        {checkBought(selectedCourse) ? "Bought" : "Buy"}
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          <div>
            {/* Display course cards */}
            <div style={styles.container}>
              {mycourses.length === 0
                ? noCourseLine
                : mycourses.map((course, index) => (
                    <div
                      key={index}
                      style={styles.card}
                      onClick={() => handleCardClick1(course)}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.boxShadow =
                          "0 8px 16px rgba(0, 0, 0, 0.2)")
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.boxShadow =
                          "0 4px 8px rgba(0, 0, 0, 0.1)")
                      }
                    >
                      <img
                        src={course.image}
                        alt={course.title}
                        style={styles.cardImage}
                      />
                      <h3 style={styles.cardTitle}>{course.title}</h3>
                      <p style={styles.description}>
                        {truncateDescription(course.description, 20)}
                      </p>
                      <p style={styles.price}>
                        <strong>Price:</strong> {`\u20B9`}
                        {course.price}
                      </p>
                    </div>
                  ))}
            </div>

            {/* Modal for detailed course info */}
            {showModal && selectedCourse && selectedCourseVideos && (
              <div style={styles.modal} onClick={closeModal}>
                <div
                  style={styles.modalContent}
                  onClick={(e) => e.stopPropagation()}
                >
                  <span style={styles.closeButton} onClick={closeModal}>
                    &times;
                  </span>
                  <h2>{selectedCourse.title}</h2>

                  {/* Horizontal layout for modal */}
                  <div style={styles.horizontalRow}>
                    {/* First column with image and details */}
                    <div style={styles.column}>
                      <div style={styles.detailRow}>
                        <div style={styles.imageContainer}>
                          <img
                            src={selectedCourse.image}
                            alt={selectedCourse.title}
                            style={styles.cardImage}
                          />
                        </div>
                        <div>
                          <p style={styles.detailItem}>
                            <strong>Authors:</strong> {selectedCourse.authors}
                          </p>
                          <p style={styles.detailItem}>
                            <strong>Language:</strong> {selectedCourse.language}
                          </p>
                          <p style={styles.detailItem}>
                            <strong>Price:</strong> {`\u20B9`}
                            {selectedCourse.price}
                          </p>
                          <p style={styles.detailItem}>
                            <strong>Creator:</strong>{" "}
                            {selectedCourse.creatorName} (
                            {selectedCourse.creatorEmail})
                          </p>
                        </div>
                      </div>
                      {/* Description below the details */}
                      <div style={styles.sectionDivider} />
                      <div style={styles.descriptionContainer}>
                        <p style={{ marginTop: "20px", fontWeight: "bold" }}>
                          Description:
                        </p>
                        <p
                          style={{
                            whiteSpace: "pre-wrap",
                            maxHeight: "200px",
                            overflowY: "auto",
                            paddingRight: "10px",
                          }}
                        >
                          {selectedCourse.description}
                        </p>
                      </div>
                    </div>

                    {/* Vertical Divider */}
                    <div style={styles.divider}></div>

                    {/* Second column with course index */}
                    <div
                      style={{
                        ...styles.column,
                        maxHeight: "300px",
                        overflowY: "auto",
                      }}
                    >
                      <strong>Course Index:</strong>
                      <ul style={{ paddingLeft: "20px" }}>
                        {" "}
                        {/* Add padding for better spacing */}
                        {selectedCourse.index.map((field, index) => (
                          <li key={index} style={{ marginBottom: "10px" }}>
                            {" "}
                            {/* Optional: Add margin for spacing */}
                            {field}
                            {selectedCourseVideos[index] && (
                              <NavLink
                                to=""
                                onClick={(e) => {
                                  e.preventDefault();

                                  // Create a new tab
                                  const newTab = window.open();
                                  newTab.document.title =
                                    selectedCourse.index[index] ||
                                    "Video Player";

                                  // Write the video player HTML into the new tab
                                  newTab.document.write(`
                <html>
                <head>
                    <title>${selectedCourse.index[index]}</title>
                </head>
                <body style="margin:0;">
                    <video controls autoplay style="width:100%; height:100%;">
                    <source src="${selectedCourseVideos[index].video}" type="video/mp4" />
                    Your browser does not support the video tag.
                    </video>
                </body>
                </html>
              `);
                                }}
                                style={{
                                  marginLeft: "10px",
                                  color: "blue",
                                  textDecoration: "none",
                                  cursor: "pointer",
                                }}
                              >
                                <ArrowOutwardIcon style={{ color: "green" }} />
                              </NavLink>
                            )}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </CustomTabPanel>
      </Box>
    </>
  );
};

export default Learn;
