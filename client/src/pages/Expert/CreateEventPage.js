import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { useState } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import DatePicker from "@mui/lab/DatePicker";
import Grid from "@mui/material/Grid";

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

export default function CreateEventPage() {
  const [value, setValue] = useState(0);
  const [openModal, setOpenModal] = useState(false);
  const [selectedDate, setSelectedDate] = React.useState(new Date());
  const [selectedTime, setSelectedTime] = useState("");
  const [estimatedTime, setEstimatedTime] = useState("");

  const handleEstimatedTimeChange = (event) => {
    setEstimatedTime(event.target.value);
  };

  const timeOptions = [
    { label: "30 minutes", value: 30 },
    { label: "1 hour", value: 60 },
    { label: "1.5 hours", value: 90 },
    { label: "2 hours", value: 120 },
    { label: "2.5 hours", value: 150 },
    { label: "3 hours", value: 180 },
  ];

  const handleTimeChange = (event) => {
    setSelectedTime(event.target.value);
  };

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
    setOpenModal(true);
  };

  const handleModalClose = () => {
    setOpenModal(false);
  };

  // Dummy data for events
  const events = [
    {
      id: 1,
      title: "Event 1",
      date: "2024-04-15",
      description: "This is the description for Event 1.",
      time: "14:00",
      duration: "1 hour",
      image: "https://via.placeholder.com/300", // Placeholder image URL
      mode: "Online",
      organiser: "Organiser 1",
      speaker: "Speaker 1",
    },
    {
      id: 2,
      title: "Event 2",
      date: "2024-04-20",
      time: "14:00",
      duration: "1 hour",
      description: "This is the description for Event 2.",
      image: "https://via.placeholder.com/300", // Placeholder image URL
      mode: "Offline",
      organiser: "Organiser 2",
      speaker: "Speaker 2",
    },
    // Add more dummy events as needed
  ];

  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);

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
          {events.map((event) => (
            <Accordion key={event.id} style={{ width: "100%" }}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                style={{ width: "100%" }}
              >
                <Typography variant="h6">{event.title}</Typography>
              </AccordionSummary>
              <AccordionDetails style={{ width: "100%" }}>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={9} container direction="column">
                    <Grid item container spacing={1}>
                      <Grid item xs={6}>
                        <Typography>
                          <strong>Date:</strong> {event.date}
                        </Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography>
                          <strong>Time:</strong> {event.time}
                        </Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography>
                          <strong>Estimated Duration:</strong> {event.duration}
                        </Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography>
                          <strong>Mode:</strong> {event.mode}
                        </Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography>
                          <strong>Organiser:</strong> {event.organiser}
                        </Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography>
                          <strong>Speaker:</strong> {event.speaker}
                        </Typography>
                      </Grid>
                      <Grid item xs={12}>
                        <Typography>
                          <strong>Description:</strong> {event.description}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={12} md={3}>
                    <img
                      src={event.image}
                      alt={event.title}
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
          {events.map((event) => (
            <Accordion key={event.id} style={{ width: "100%" }}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                style={{ width: "100%" }}
              >
                <Typography variant="h6">{event.title}</Typography>
              </AccordionSummary>
              <AccordionDetails style={{ width: "100%" }}>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={9} container direction="column">
                    <Grid item container spacing={1}>
                      <Grid item xs={6}>
                        <Typography>
                          <strong>Date:</strong> {event.date}
                        </Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography>
                          <strong>Time:</strong> {event.time}
                        </Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography>
                          <strong>Estimated Duration:</strong> {event.duration}
                        </Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography>
                          <strong>Mode:</strong> {event.mode}
                        </Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography>
                          <strong>Organiser:</strong> {event.organiser}
                        </Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography>
                          <strong>Speaker:</strong> {event.speaker}
                        </Typography>
                      </Grid>
                      <Grid item xs={12}>
                        <Typography>
                          <strong>Description:</strong> {event.description}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={12} md={3}>
                    <img
                      src={event.image}
                      alt={event.title}
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
            border: "2px solid #000",
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
                sx={{ mb: 2 }}
              />
            </Grid>

            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField
                  id="event-date"
                  label="Date"
                  type="date"
                  fullWidth
                  InputLabelProps={{
                    shrink: true,
                  }}
                  InputProps={{
                    inputProps: {
                      min: tomorrow.toISOString().split("T")[0], // Set minimum date to tomorrow
                    },
                  }}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  id="event-time"
                  label="Time"
                  select
                  fullWidth
                  value={selectedTime}
                  onChange={handleTimeChange}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  SelectProps={{
                    native: true,
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
                  label="Estimated Time"
                  select
                  fullWidth
                  value={estimatedTime}
                  onChange={handleEstimatedTimeChange}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  SelectProps={{
                    native: true,
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
                <TextField id="event-mode" label="Mode" fullWidth />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="event-description"
                  label="Description"
                  multiline
                  fullWidth
                  sx={{
                    maxHeight: 200, // Adjust this value as needed
                    overflowY: "auto",
                    paddingTop: "0px",
                    "& .MuiInputLabel-root": {
                      marginTop: "5px",
                    },
                  }}
                />
              </Grid>

              <Grid item xs={6}>
                <TextField id="event-organiser" label="Organiser" fullWidth />
              </Grid>
              <Grid item xs={6}>
                <TextField id="event-speaker" label="Speaker" fullWidth />
              </Grid>
            </Grid>
            {/* Add more fields for event creation as needed */}
            <Button
              onClick={handleModalClose}
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
