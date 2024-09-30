import React, { useState } from "react";

const Learn = () => {
  const courses = [
    {
      title: "Full-Stack Development",
      description:
        "Learn to build full-stack web applications using the MERN stack. This course will cover backend, frontend, and everything in between.",
      image: "https://via.placeholder.com/250",
      creatorName: "John Doe",
      creatorEmail: "john@example.com",
      authors: "John Doe",
      duration: "10 weeks",
      language: "English",
      index: ["1. Introduction", "2. Backend", "3. Frontend"],
      price: 199,
      startDate: new Date("2024-01-10"),
      endDate: new Date("2024-04-10"),
    },
    {
      title: "Data Science",
      description:
        "An introduction to data science concepts, tools, and techniques. You will learn data analysis, visualization, and machine learning.",
      image: "https://via.placeholder.com/250",
      creatorName: "Jane Smith",
      creatorEmail: "jane@example.com",
      authors: "Jane Smith",
      duration: "12 weeks",
      language: "English",
      index: ["1. Data Cleaning", "2. Data Analysis", "3. Machine Learning"],
      price: 299,
      startDate: new Date("2024-02-01"),
      endDate: new Date("2024-05-01"),
    },
    {
      title: "AI and Machine Learning",
      description:
        "Explore the world of AI and machine learning in this advanced course. Dive into neural networks and deep learning techniques.",
      image: "https://via.placeholder.com/250",
      creatorName: "Alice Brown",
      creatorEmail: "alice@example.com",
      authors: "Alice Brown",
      duration: "15 weeks",
      language: "English",
      index: ["1. Neural Networks", "2. Deep Learning", "3. Model Deployment"],
      price: 399,
      startDate: new Date("2024-03-01"),
      endDate: new Date("2024-06-15"),
    },
    {
      title: "AI and Machine Learning",
      description:
        "Explore the world of AI and machine learning in this advanced course. Dive into neural networks and deep learning techniques.",
      image: "https://via.placeholder.com/250",
      creatorName: "Alice Brown",
      creatorEmail: "alice@example.com",
      authors: "Alice Brown",
      duration: "15 weeks",
      language: "English",
      index: ["1. Neural Networks", "2. Deep Learning", "3. Model Deployment"],
      price: 399,
      startDate: new Date("2024-03-01"),
      endDate: new Date("2024-06-15"),
    },
    {
      title: "AI and Machine Learning",
      description:
        "Explore the world of AI and machine learning in this advanced course. Dive into neural networks and deep learning techniques.",
      image: "https://via.placeholder.com/250",
      creatorName: "Alice Brown",
      creatorEmail: "alice@example.com",
      authors: "Alice Brown",
      duration: "15 weeks",
      language: "English",
      index: ["1. Neural Networks", "2. Deep Learning", "3. Model Deployment"],
      price: 399,
      startDate: new Date("2024-03-01"),
      endDate: new Date("2024-06-15"),
    },
    {
      title: "AI and Machine Learning",
      description:
        "Explore the world of AI and machine learning in this advanced course. Dive into neural networks and deep learning techniques.",
      image: "https://via.placeholder.com/250",
      creatorName: "Alice Brown",
      creatorEmail: "alice@example.com",
      authors: "Alice Brown",
      duration: "15 weeks",
      language: "English",
      index: ["1. Neural Networks", "2. Deep Learning", "3. Model Deployment"],
      price: 399,
      startDate: new Date("2024-03-01"),
      endDate: new Date("2024-06-15"),
    },
  ];

  const [selectedCourse, setSelectedCourse] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleCardClick = (course) => {
    setSelectedCourse(course);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
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
    duration: {
      fontSize: "14px",
      color: "#777",
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
        width: "80%",
        maxWidth: "1000px",
        maxHeight: "80vh",
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
      padding: "10px",
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
                <strong>Price:</strong> ${course.price}
              </p>
              <p style={styles.duration}>
                <strong>Duration:</strong> {course.duration}
              </p>
            </div>
          ))}
        </div>

        {/* Modal for detailed course info */}
        {showModal && selectedCourse && (
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
                        <strong>Start Date:</strong>{" "}
                        {selectedCourse.startDate.toDateString()}
                      </p>
                      <p style={styles.detailItem}>
                        <strong>End Date:</strong>{" "}
                        {selectedCourse.endDate.toDateString()}
                      </p>
                      <p style={styles.detailItem}>
                        <strong>Price:</strong> ${selectedCourse.price}
                      </p>
                      <p style={styles.detailItem}>
                        <strong>Duration:</strong> {selectedCourse.duration}
                      </p>
                      <p style={styles.detailItem}>
                        <strong>Creator:</strong> {selectedCourse.creatorName} (
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
                    <p>{selectedCourse.description}</p>
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
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Learn;
