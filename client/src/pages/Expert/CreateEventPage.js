import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
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

let username = localStorage.getItem("name");
let useremail = localStorage.getItem("email");

export default function CreateEventPage(props) {
  const [value, setValue] = useState(0);
  const [openModal, setOpenModal] = useState(false);
  const [events, setEvents] = useState([]);
  const [loaded, setLoaded] = useState(false);

  const getAllEvents = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/getEvents`
      );
      setEvents(res.data);
      console.log(events);
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.error);
      }
    }
  };
  useEffect(() => {
    setLoaded(false);
    getAllEvents();
    setLoaded(true);
  }, []);

  const [event, setEvent] = useState({
    title: "",
    date: "",
    time: "",
    duration: "",
    mode: "Online",
    organiser: username,
    orgemail: useremail,
    speaker: "",
    description: "",
    image: "",
    meetId: "",
  });

  const navigate = useNavigate()
  const connectcall = (meetingID) => {
    navigate(`/startcall?meetingID=${meetingID}`);
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = async () => {
        const base64String = reader.result; // Get the base64 string
        setEvent({ ...event, image: base64String }); // Store the base64 string in state
      };
    }
  };

  const timeOptions = [
    { label: "30 minutes", value: "30 minutes" },
    { label: "1 hour", value: "1 hour" },
    { label: "1.5 hours", value: "1.5 hours" },
    { label: "2 hours", value: "2 hours" },
    { label: "2.5 hours", value: "2.5 hours" },
    { label: "3 hours", value: "3 hours" },
  ];

  const handleEventChange = (e) => {
    setEvent({ ...event, [e.target.name]: e.target.value });
  };

  function generateRandomString(length) {
    const charset =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      result += charset[randomIndex];
    }
    return result;
  }

  const generateTimeOptions = () => {
    const timeOptions = [];
    // Generate time options from 8:00 AM to 9:00 PM with 30-minute intervals
    for (let hours = 8; hours < 21; hours++) {
      for (let minutes = 0; minutes < 60; minutes += 30) {
        const hourString = hours.toString().padStart(2, "0");
        const minuteString = minutes.toString().padStart(2, "0");
        timeOptions.push(`${hourString}:${minuteString}`);
      }
    }
    return timeOptions;
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleModalOpen = () => {
    let id = generateRandomString(10);
    setEvent({ ...event, meetId: id });
    setOpenModal(true);
  };

  const handleModalClose = () => {
    setOpenModal(false);
  };

  const submitCreateEvent = async () => {
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/createEvent`,
        event
      );
      setEvent({
        title: "",
        date: "",
        time: "",
        duration: "",
        mode: "Online",
        organiser: username,
        orgemail: useremail,
        speaker: "",
        description: "",
        image: "",
        meetId: "",
      });
      if (res.status === 200) {
        toast.success(res.data.msg);
      }
      setLoaded(false);
      getAllEvents();
      setLoaded(true);
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.error);
      }
    }
  };

  // Dummy data for events
  // const events = [
  //   {
  //     id: 1,
  //     title: "Event 1",
  //     date: "2024-04-15",
  //     description: "This is the description for Event 1.",
  //     time: "14:00",
  //     duration: "1 hour",
  //     image: "https://via.placeholder.com/300", // Placeholder image URL
  //     mode: "Online",
  //     organiser: "Organiser 1",
  //     speaker: "Speaker 1",
  //   },
  //   {
  //     id: 2,
  //     title: "Event 2",
  //     date: "2024-04-20",
  //     time: "14:00",
  //     duration: "1 hour",
  //     description: "This is the description for Event 2.",
  //     image: "https://via.placeholder.com/300", // Placeholder image URL
  //     mode: "Offline",
  //     organiser: "Organiser 2",
  //     speaker: "Speaker 2",
  //   },
  //   // Add more dummy events as needed
  // ];

  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);

  function formatDate(date) {
    date = new Date(date);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  }

  const handleJoinEvent = (meetId) => {
    window.open(`https://meet.google.com/${meetId}`, "_blank");
  };

  return (
    <>
      <div>
        <Button
          variant="contained"
          sx={{
            backgroundColor: "#3b8a51",
            ":hover": {
              backgroundColor: "#34a43c",
              transform: "scale(1.02)",
              transition: ".2s ease-out",
            },
          }}
          style={{
            float: "right",
            marginTop: "12px",
            marginRight: "40px",
          }}
          onClick={handleModalOpen}
        >
          + Create Event
        </Button>
      </div>

      <Box
        sx={{
          display: "flex",
          width: "80%",
          margin: "auto",
          flexDirection: "column",
        }}
      >
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
            sx={{
              "& .MuiTabs-indicator": {
                backgroundColor: "green", // Color of the underline
              },
              "& .MuiTab-textColorPrimary.Mui-selected": {
                color: "green", // Font color of the active tab header
              },
            }}
          >
            <Tab label="My Events" {...a11yProps(0)} />
            <Tab label="All Events" {...a11yProps(1)} />
          </Tabs>
        </Box>
        <CustomTabPanel value={value} index={0}>
          {/* Accordion for My Events */}
          {loaded &&
            events.map((eve) => (
              <Accordion key={eve._id} style={{ width: "100%" }}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <Typography variant="h6" style={{ marginRight: "auto" }}>
                    {eve.title}
                  </Typography>
                  <Button
                    sx={{
                      backgroundColor: "#3b8a51",
                      ":hover": {
                        backgroundColor: "#34a43c",
                        transform: "scale(1.02)",
                        transition: ".2s ease-out",
                      },
                    }}
                    variant="contained"
                    style={{ marginRight: "5px" }}
                    onClick={() => connectcall(eve.meetId)}
                  >
                    Join
                  </Button>
                </AccordionSummary>
                <AccordionDetails style={{ width: "100%" }}>
                  <Grid container spacing={2}>
                    <Grid item xs={12} md={9} container direction="column">
                      <Grid item container spacing={1}>
                        <Grid item xs={6}>
                          <Typography>
                            <strong>Date:</strong> {formatDate(eve.date)}
                          </Typography>
                        </Grid>
                        <Grid item xs={6}>
                          <Typography>
                            <strong>Time:</strong> {eve.time}
                          </Typography>
                        </Grid>
                        <Grid item xs={6}>
                          <Typography>
                            <strong>Estimated Duration:</strong> {eve.duration}
                          </Typography>
                        </Grid>
                        <Grid item xs={6}>
                          <Typography>
                            <strong>Mode:</strong> {eve.mode}
                          </Typography>
                        </Grid>
                        <Grid item xs={6}>
                          <Typography>
                            <strong>Organiser:</strong> {eve.organiser}
                          </Typography>
                        </Grid>
                        <Grid item xs={6}>
                          <Typography>
                            <strong>Speaker:</strong> {eve.speaker}
                          </Typography>
                        </Grid>
                        <Grid item xs={12}>
                          <Typography>
                            <strong>Description:</strong> {eve.description}
                          </Typography>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item xs={12} md={3}>
                      <img
                        src={eve.image}
                        alt={eve.title}
                        style={{
                          width: "100%",
                          height: "auto",
                        }}
                      />
                    </Grid>
                  </Grid>
                </AccordionDetails>
              </Accordion>
            ))}
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          {/* Accordion for My Events */}
          {loaded &&
            events.map((eve) => (
              <Accordion key={eve._id} style={{ width: "100%" }}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <Typography variant="h6" style={{ marginRight: "auto" }}>
                    {eve.title}
                  </Typography>
                  <Button
                    sx={{
                      backgroundColor: "#3b8a51",
                      ":hover": {
                        backgroundColor: "#34a43c",
                        transform: "scale(1.02)",
                        transition: ".2s ease-out",
                      },
                    }}
                    variant="contained"
                    style={{ marginRight: "5px" }}
                    onClick={() => connectcall(eve.meetId)}
                  >
                    Join
                  </Button>
                </AccordionSummary>
                <AccordionDetails style={{ width: "100%" }}>
                  <Grid container spacing={2}>
                    <Grid item xs={12} md={9} container direction="column">
                      <Grid item container spacing={1}>
                        <Grid item xs={6}>
                          <Typography>
                            <strong>Date:</strong> {formatDate(eve.date)}
                          </Typography>
                        </Grid>
                        <Grid item xs={6}>
                          <Typography>
                            <strong>Time:</strong> {eve.time}
                          </Typography>
                        </Grid>
                        <Grid item xs={6}>
                          <Typography>
                            <strong>Estimated Duration:</strong> {eve.duration}
                          </Typography>
                        </Grid>
                        <Grid item xs={6}>
                          <Typography>
                            <strong>Mode:</strong> {eve.mode}
                          </Typography>
                        </Grid>
                        <Grid item xs={6}>
                          <Typography>
                            <strong>Organiser:</strong> {eve.organiser}
                          </Typography>
                        </Grid>
                        <Grid item xs={6}>
                          <Typography>
                            <strong>Speaker:</strong> {eve.speaker}
                          </Typography>
                        </Grid>
                        <Grid item xs={12}>
                          <Typography>
                            <strong>Description:</strong> {eve.description}
                          </Typography>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item xs={12} md={3}>
                      <img
                        src={eve.image}
                        alt={eve.title}
                        style={{
                          width: "100%",
                          height: "auto",
                        }}
                      />
                    </Grid>
                  </Grid>
                </AccordionDetails>
              </Accordion>
            ))}
        </CustomTabPanel>
      </Box>

      {/* Modal for Create Event */}
      <Modal
        open={openModal}
        onClose={handleModalClose}
        aria-labelledby="create-event-modal-title"
        aria-describedby="create-event-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 600,
            maxWidth: "95%",
            bgcolor: "background.paper",
            border: "2px solid green",
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography id="create-event-modal-title" variant="h6" component="h2">
            Create Event
          </Typography>
          <Box component="form" sx={{ mt: 2 }}>
            <Grid item xs={12}>
              <TextField
                id="event-title"
                label="Event Title"
                fullWidth
                name="title"
                value={event.title}
                onChange={handleEventChange}
                required
                sx={{ mb: 2 }}
                InputProps={{
                  sx: {
                    borderColor: "green",
                    "&:focus": { borderColor: "green" }, // Set border color to green when focused
                  },
                }}
              />
            </Grid>

            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField
                  id="event-date"
                  label="Date"
                  type="date"
                  fullWidth
                  name="date"
                  value={event.date}
                  onChange={handleEventChange}
                  required
                  InputLabelProps={{
                    shrink: true,
                  }}
                  InputProps={{
                    sx: {
                      borderColor: "#3b8a51",
                      "&:focus": { borderColor: "#4caf50" }, // Set border color to green when focused
                    },
                  }}
                  inputProps={{
                    min: tomorrow.toISOString().split("T")[0],
                  }}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  id="event-time"
                  label="Time"
                  select
                  fullWidth
                  name="time"
                  value={event.time}
                  onChange={handleEventChange}
                  required
                  InputLabelProps={{
                    shrink: true,
                  }}
                  SelectProps={{
                    native: true,
                    sx: {
                      borderColor: "#3b8a51",
                      "&:focus": { borderColor: "#4caf50" }, // Set border color to green when focused
                    },
                  }}
                  InputProps={{
                    sx: {
                      borderColor: "#3b8a51",
                      "&:focus": { borderColor: "#4caf50" }, // Set border color to green when focused
                    },
                  }}
                >
                  {generateTimeOptions().map((timeOption) => (
                    <option key={timeOption} value={timeOption}>
                      {timeOption}
                    </option>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={6}>
                <TextField
                  id="estimated-time"
                  label="Estimated Duration"
                  select
                  fullWidth
                  name="duration"
                  value={event.duration}
                  onChange={handleEventChange}
                  required
                  InputLabelProps={{
                    shrink: true,
                  }}
                  SelectProps={{
                    native: true,
                    sx: {
                      borderColor: "#3b8a51",
                      "&:focus": { borderColor: "#4caf50" }, // Set border color to green when focused
                    },
                  }}
                  InputProps={{
                    sx: {
                      borderColor: "#3b8a51",
                      "&:focus": { borderColor: "#4caf50" }, // Set border color to green when focused
                    },
                  }}
                >
                  {timeOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={6}>
                <TextField
                  id="event-mode"
                  label="Mode"
                  fullWidth
                  name="mode"
                  value={event.mode}
                  disabled
                  InputProps={{
                    sx: {
                      borderColor: "#3b8a51",
                      "&:focus": { borderColor: "#4caf50" }, // Set border color to green when focused
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="event-description"
                  label="Description"
                  multiline
                  fullWidth
                  name="description"
                  value={event.description}
                  onChange={handleEventChange}
                  required
                  sx={{
                    maxHeight: 200,
                    overflowY: "auto",
                    paddingTop: "0px",
                    "& .MuiInputLabel-root": {
                      marginTop: "5px",
                    },
                  }}
                  InputProps={{
                    sx: {
                      borderColor: "#3b8a51",
                      "&:focus": { borderColor: "#4caf50" }, // Set border color to green when focused
                    },
                  }}
                />
              </Grid>

              <Grid item xs={6}>
                <TextField
                  id="event-organiser"
                  label="Organiser"
                  fullWidth
                  name="organiser"
                  value={username}
                  disabled
                  InputProps={{
                    sx: {
                      borderColor: "#3b8a51",
                      "&:focus": { borderColor: "#4caf50" }, // Set border color to green when focused
                    },
                  }}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  id="event-speaker"
                  label="Speaker"
                  fullWidth
                  name="speaker"
                  value={event.speaker}
                  required
                  onChange={handleEventChange}
                  InputProps={{
                    sx: {
                      borderColor: "#3b8a51",
                      "&:focus": { borderColor: "#4caf50" }, // Set border color to green when focused
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <input
                  type="file"
                  id="event-image"
                  accept="image/*"
                  onChange={handleImageChange}
                  required
                />
              </Grid>
            </Grid>
            <Button
              onClick={() => {
                handleModalClose();
                submitCreateEvent();
              }}
              sx={{
                backgroundColor: "#3b8a51",
                ":hover": {
                  backgroundColor: "#34a43c",
                  transform: "scale(1.02)",
                  transition: ".2s ease-out",
                },
                marginTop: "20px",
              }}
              variant="contained"
            >
              Create
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
}
