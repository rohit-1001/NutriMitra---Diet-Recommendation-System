import React, { useState, useEffect } from "react";
import SubdirectoryArrowLeftIcon from "@mui/icons-material/SubdirectoryArrowLeft";
import ClearIcon from "@mui/icons-material/Clear";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";
import axios from "axios";
import { toast } from "react-toastify";
import { NavLink } from "react-router-dom";

const steps = ["Course Details", "Upload Content", "Preview"];

const CourseModal = ({ onClose }) => {
  const [activeStep, setActiveStep] = useState(0);
  const [skipped, setSkipped] = useState(new Set());
  const [creator, setCreator] = useState({
    name: "",
    email: "",
  });

  useEffect(() => {
    const name = localStorage.getItem("name");
    const email = localStorage.getItem("email");
    setCreator((prev) => ({
      ...prev,
      name: name,
      email: email,
    }));
  }, []);

  const [formData, setFormData] = useState({
    image: "",
    textFields: [""],
    title: "",
    authors: "",
    language: "",
    price: 0,
    description: "",
  });
  const [videos, setVideos] = useState(
    Array(formData.textFields.length).fill(null)
  );

  const handleSubmitForm = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/createCourse`,
        { formData: formData, videos: videos, creator: creator },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      if (res.status === 200) {
        toast.success("Course created successfully!");
        onClose();
      } else if (res.status === 400) {
        toast.error(res.data.error);
      }
    } catch (err) {
      if (err.response && err.response.data) {
        toast.error(err.response.data.error);
      } else {
        toast.error("An error occurred while submitting the course");
      }
    }
  };

  const handleVideoUpload = (index, event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setVideos((prev) => {
          const updatedVideos = [...prev];
          updatedVideos[index] = reader.result;
          console.log(typeof updatedVideos[index]);
          return updatedVideos;
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleVideoRemove = (index) => {
    const updatedVideos = [...videos];
    updatedVideos[index] = null; // Remove video for the specified index
    setVideos(updatedVideos);
  };

  const isStepOptional = (step) => step === 1;
  const isStepSkipped = (step) => skipped.has(step);

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      throw new Error("You can't skip a step that isn't optional.");
    }
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleReset = () => setActiveStep(0);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({
          ...prev,
          image: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleTextFieldChange = (index, value) => {
    const updatedTextFields = [...formData.textFields];
    updatedTextFields[index] = value;
    setFormData((prev) => ({
      ...prev,
      textFields: updatedTextFields,
    }));
  };

  const addTextField = () => {
    const updatedTextFields = [
      ...formData.textFields,
      "", // Add an empty string for the new text field
    ];
    setFormData((prevData) => ({
      ...prevData,
      textFields: updatedTextFields,
    }));
    // Push a null value into the videos array for the new text field
    setVideos((prevVideos) => [...prevVideos, null]);
  };

  const addTextFieldAt = (index) => {
    const updatedTextFields = [
      ...formData.textFields.slice(0, index + 1),
      "", // Add an empty string at the specified index
      ...formData.textFields.slice(index + 1),
    ];
    setFormData((prevData) => ({
      ...prevData,
      textFields: updatedTextFields,
    }));
    // Add a corresponding null value to the videos array at the same index
    const updatedVideos = [
      ...videos.slice(0, index + 1),
      null,
      ...videos.slice(index + 1),
    ];
    setVideos(updatedVideos);
  };

  const removeTextField = (index) => {
    const updatedTextFields = formData.textFields.filter((_, i) => i !== index);
    setFormData((prevData) => ({
      ...prevData,
      textFields: updatedTextFields,
    }));
    // Remove the corresponding video from the videos array
    const updatedVideos = videos.filter((_, i) => i !== index);
    setVideos(updatedVideos);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const modalStyles = {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  };

  const contentStyles = {
    display: "flex",
    flexDirection: "column",
    background: "white",
    padding: "20px",
    borderRadius: "8px",
    width: "100%",
    maxWidth: "1200px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
  };

  const columnsContainerStyles = {
    display: "flex",
    justifyContent: "space-between",
    width: "100%",
  };

  const columnStyles = {
    flex: 1,
    padding: "10px",
    display: "flex",
    flexDirection: "column",
  };

  const imagePreviewStyles = {
    width: "100%",
    height: "150px",
    border: "1px solid #ccc",
    marginBottom: "10px",
  };

  const labelStyles = {
    display: "block",
    marginBottom: "5px",
  };

  const inputStyles = {
    width: "100%",
    padding: "8px",
    border: "1px solid #ccc",
    borderRadius: "4px",
    marginBottom: "10px",
  };

  const addButtonStyles = {
    padding: "8px 12px",
    backgroundColor: "#4CAF50",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    maxWidth: "150px",
  };

  const removeButtonStyles = {
    padding: "4px 8px",
    backgroundColor: "#f44336",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    marginLeft: "5px",
  };

  const buttonSize = {
    width: "30px",
    height: "30px",
  };

  const indexSectionStyles = {
    maxHeight: "300px",
    overflowY: "auto",
    border: "1px solid #ccc",
    padding: "10px",
    borderRadius: "4px",
  };

  const stepContent = [
    <div style={columnsContainerStyles}>
      <div
        style={{
          ...columnStyles,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <h3 style={{ marginBottom: "20px" }}>Preview</h3>
        {formData.image ? (
          <img src={formData.image} alt="Preview" style={imagePreviewStyles} />
        ) : (
          <div style={imagePreviewStyles}></div>
        )}
        <label style={labelStyles}>Upload Image</label>
        <input type="file" accept="image/*" onChange={handleImageUpload} />
      </div>

      <div style={columnStyles}>
        <h3 style={{ marginBottom: "20px" }}>Course Details</h3>
        <div>
          <label style={labelStyles}>Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            style={inputStyles}
            required
          />
        </div>

        <div>
          <label style={labelStyles}>Authors</label>
          <input
            type="text"
            name="authors"
            value={formData.authors}
            onChange={handleChange}
            style={inputStyles}
            required
          />
        </div>

        <div>
          <label style={labelStyles}>Language</label>
          <input
            type="text"
            name="language"
            value={formData.language}
            onChange={handleChange}
            style={inputStyles}
            required
          />
        </div>

        <div>
          <label style={labelStyles}>Price</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            style={inputStyles}
            required
          />
        </div>

        <div>
          <label style={labelStyles}>Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            style={{
              ...inputStyles,
              resize: "vertical",
              overflowY: "auto",
              maxHeight: "150px",
            }}
            rows={3}
            required
          />
        </div>
      </div>

      <div style={columnStyles}>
        <h3 style={{ marginBottom: "20px" }}>Index</h3>
        <div style={indexSectionStyles}>
          {formData.textFields.map((textField, index) => (
            <div key={index} style={{ display: "flex", marginBottom: "10px" }}>
              <input
                type="text"
                value={textField}
                onChange={(e) => handleTextFieldChange(index, e.target.value)}
                style={inputStyles}
              />
              <button
                onClick={() => addTextFieldAt(index)}
                style={{
                  ...addButtonStyles,
                  ...buttonSize,
                  marginLeft: "10px",
                  width: "40px",
                  height: "30px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "0",
                }}
              >
                <SubdirectoryArrowLeftIcon style={{ fontSize: 14 }} />
              </button>
              <button
                onClick={() => removeTextField(index)}
                style={{
                  ...removeButtonStyles,
                  ...buttonSize,
                  marginLeft: "5px",
                  width: "40px",
                  height: "30px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "0",
                }}
              >
                <ClearIcon style={{ fontSize: 14 }} />
              </button>
            </div>
          ))}
        </div>

        {/* Centering the "Add Text Field" button */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "20px",
          }}
        >
          <button onClick={addTextField} style={addButtonStyles}>
            Add Section
          </button>
        </div>
      </div>
    </div>,
    <div
      style={{
        height: "400px",
        overflowY: "auto",
        padding: "10px",
        border: "1px solid #ddd",
      }}
    >
      <h3>Upload Content</h3>
      {formData.textFields.length > 0 ? (
        formData.textFields.map((field, index) => (
          <div key={index} style={{ marginBottom: "10px" }}>
            <div style={{ display: "flex", alignItems: "center" }}>
              <span style={{ marginRight: "10px" }}>{field}</span>
              {/* Check if field is not empty */}
              {field.length > 0 ? (
                <>
                  <div
                    key={index}
                    style={{ display: "flex", alignItems: "center" }}
                  >
                    {/* Display the name of the uploaded file or a placeholder if no file is uploaded */}

                    {/* File upload input */}
                    <input
                      type="file"
                      accept="video/*"
                      onChange={(e) => handleVideoUpload(index, e)}
                      style={{ display: "none" }} // Hide the default file input
                      id={`upload-video-${index}`} // Assign an id to the input for triggering the file upload
                    />

                    {/* Upload Button (if no video uploaded yet) */}
                    {videos[index] == null && (
                      <button
                        onClick={() =>
                          document
                            .getElementById(`upload-video-${index}`)
                            .click()
                        }
                        style={{
                          padding: "8px 12px",
                          backgroundColor: "#4CAF50", // Green for upload button
                          color: "white",
                          border: "none",
                          borderRadius: "4px",
                          cursor: "pointer",
                          marginRight: "10px",
                        }}
                      >
                        Upload Video
                      </button>
                    )}

                    {/* Display the uploaded file name (if a video is uploaded) */}
                    {videos[index] && (
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <p style={{ marginRight: "10px" }}>
                          {videos[index].name}
                        </p>
                        <button
                          onClick={() => handleVideoRemove(index)} // Implement this function to remove the video
                          style={{
                            padding: "8px 12px",
                            backgroundColor: "#f44336", // Red for remove button
                            color: "white",
                            border: "none",
                            borderRadius: "4px",
                            cursor: "pointer",
                            marginLeft: "10px",
                          }}
                        >
                          Remove Video
                        </button>
                      </div>
                    )}
                  </div>
                </>
              ) : (
                <p style={{ color: "red", marginLeft: "10px" }}>
                  No section name added.
                </p>
              )}
            </div>
          </div>
        ))
      ) : (
        <p>No fields available to upload videos.</p>
      )}
    </div>,
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        maxHeight: "400px", // Set a max height for the modal
        overflowY: "auto", // Enable vertical scrolling
        padding: "20px", // Add some padding for aesthetics
        border: "1px solid #ddd", // Optional: add a border to the modal
        borderRadius: "8px", // Optional: add border radius for rounded corners
        backgroundColor: "white", // Ensure the background is white
      }}
    >
      <h3>Course Preview</h3>
      <div style={{ display: "flex", marginBottom: "20px" }}>
        {/* Image Section */}
        <div style={{ flex: "1", marginRight: "20px" }}>
          {formData.image ? (
            <img
              src={formData.image}
              alt="Preview"
              style={{
                maxWidth: "100%",
                height: "auto",
                borderRadius: "5px", // Optional: round the image corners
              }}
            />
          ) : (
            <p>No image available.</p>
          )}
        </div>

        {/* Fields Section */}
        <div style={{ flex: "2" }}>
          <div
            style={{
              display: "flex",
              marginRight: "40px",
              marginBottom: "20px",
            }}
          >
            <h4 style={{ margin: "0" }}>Title:</h4>
            <p style={{ margin: "0", paddingLeft: "10px" }}>{formData.title}</p>
          </div>
          <div
            style={{
              display: "flex",
              marginRight: "40px",
              marginBottom: "20px",
            }}
          >
            <h4 style={{ margin: "0" }}>Authors:</h4>
            <p style={{ margin: "0", paddingLeft: "10px" }}>
              {formData.authors}
            </p>
          </div>
          <div
            style={{
              display: "flex",
              marginRight: "40px",
              marginBottom: "20px",
            }}
          >
            <h4 style={{ margin: "0" }}>Language:</h4>
            <p style={{ margin: "0", paddingLeft: "10px" }}>
              {formData.language}
            </p>
          </div>
          <div
            style={{
              display: "flex",
              marginRight: "40px",
              marginBottom: "20px",
            }}
          >
            <h4 style={{ margin: "0" }}>Price:</h4>
            <p style={{ margin: "0", paddingLeft: "10px" }}>{formData.price}</p>
          </div>
        </div>
      </div>

      {/* Description Section */}
      <h4 style={{ margin: "0" }}>Description:</h4>
      <div
        style={{
          whiteSpace: "pre-wrap", // Preserve white spaces and line breaks
          border: "1px solid #ddd",
          padding: "10px",
          borderRadius: "5px",
          backgroundColor: "#f9f9f9",
          marginBottom: "10px", // Add some space before the index fields
        }}
      >
        {formData.description || "No description available."}
      </div>

      {/* Index Fields Section */}
      <h4 style={{ margin: "0" }}>Text Fields:</h4>
      {formData.textFields.length > 0 ? (
        <ul style={{ paddingLeft: "20px" }}>
          {formData.textFields.map((field, index) => (
            <li key={index}>
              {field}
              {videos[index] && (
                <NavLink
                  to=""
                  onClick={(e) => {
                    e.preventDefault(); // Prevent default NavLink behavior

                    // Create a new tab
                    const newTab = window.open();
                    // Set the title of the new tab to the value of the text field at that index
                    newTab.document.title =
                      formData.textFields[index] || "Video Player";

                    // Write the video player HTML into the new tab
                    newTab.document.write(`
                        <html>
                        <head>
                            <title>${formData.textFields[index]}</title>
                        </head>
                        <body style="margin:0;">
                            <video controls autoplay style="width:100%; height:100%;">
                            <source src="${videos[index]}" type="video/mp4" />
                            Your browser does not support the video tag.
                            </video>
                        </body>
                        </html>
                    `);
                  }}
                  style={{
                    marginLeft: "10px",
                    color: "blue",
                    textDecoration: "none", // Remove underline for the icon
                    cursor: "pointer",
                  }}
                >
                  <ArrowOutwardIcon style={{ color: "green" }} />
                </NavLink>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p>No text fields available.</p>
      )}
    </div>,
  ];

  const handleClickSubmit = () => {
    handleSubmitForm();
  };

  return (
    <div style={modalStyles}>
      <div style={contentStyles}>
        <h2
          style={{
            color: "#4CAF50",
            marginBottom: "20px",
          }}
        >
          Add New Course
        </h2>
        <Box sx={{ width: "100%" }}>
          <Stepper
            activeStep={activeStep}
            sx={{
              backgroundColor: "transparent",
              "& .MuiStepLabel-label": { color: "#4CAF50" },
              "& .MuiStepConnector-line": { backgroundColor: "#4CAF50" },
              "& .Mui-active .MuiStepLabel-label": {
                color: "#4CAF50", // Color for active step label
              },
              "& .Mui-active .MuiStepIcon-root": {
                color: "white", // Change the background color of the active step icon to white
                border: "2px solid #4CAF50", // Optional: Add a border to the active step icon
              },
            }}
          >
            {steps.map((label, index) => {
              const stepProps = {};
              const labelProps = {};
              return (
                <Step
                  key={label}
                  {...stepProps}
                  sx={{
                    "& .MuiStepIcon-root": {
                      backgroundColor:
                        activeStep > index ? "#388E3C" : "transparent",
                      color: activeStep >= index ? "white" : "#388E3C",
                      border: "1px solid #388E3C",
                      borderRadius: "50%",
                      height: "30px",
                      width: "30px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    },
                    "& .MuiStepIcon-text": {
                      fill: activeStep >= index ? "black" : "white",
                    },
                  }}
                >
                  <StepLabel {...labelProps}>{label}</StepLabel>
                </Step>
              );
            })}
          </Stepper>
          {activeStep === steps.length ? (
            <React.Fragment>
              <Typography sx={{ mt: 2, mb: 1 }}>Creating Course...</Typography>
              <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                <Box sx={{ flex: "1 1 auto" }} />
                <Button
                  onClick={handleReset}
                  style={{
                    color: "green",
                  }}
                >
                  EDIT
                </Button>
              </Box>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <Typography sx={{ mt: 2, mb: 1 }}>
                {stepContent[activeStep]}
              </Typography>
              <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                <Button
                  color="inherit"
                  disabled={activeStep === 0}
                  onClick={handleBack}
                  sx={{ mr: 1 }}
                >
                  Back
                </Button>
                <Box sx={{ flex: "1 1 auto" }} />
                <Button
                  onClick={handleNext}
                  style={{
                    color: "green",
                  }}
                >
                  {activeStep === steps.length - 1 ? (
                    <>
                      {/* Bottom Center Buttons */}
                      <div
                        style={{
                          textAlign: "center",
                          marginTop: "20px",
                          width: "100%",
                        }}
                      >
                        <button
                          onClick={() => handleSubmitForm()}
                          style={{
                            padding: "10px 15px",
                            backgroundColor: "#4CAF50",
                            color: "white",
                            border: "none",
                            borderRadius: "4px",
                            cursor: "pointer",
                            marginRight: "10px",
                          }}
                        >
                          Submit
                        </button>
                      </div>
                    </>
                  ) : (
                    "Next"
                  )}
                </Button>
              </Box>
            </React.Fragment>
          )}
        </Box>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "20px",
          }}
        >
          <button
            onClick={onClose}
            style={{
              backgroundColor: "#f44336",
              color: "white",
              padding: "4px 16px",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              width: "200px",
            }}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default CourseModal;
