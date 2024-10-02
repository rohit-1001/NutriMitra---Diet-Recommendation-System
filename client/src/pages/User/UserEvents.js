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

export default function UserEvents(props) {
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
    window.scrollTo(0, 0);
    window.document.title = "Events | NutriMitra";
    setLoaded(false);
    getAllEvents();
    setLoaded(true);
  }, []);

  const navigate = useNavigate();
  const connectcall = (meetingID) => {
    navigate(`/startcall?meetingID=${meetingID}`);
  };

  function formatDate(date) {
    date = new Date(date);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  }

  return (
    <>
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
            <Tab label="All Events" />
          </Tabs>
        </Box>
          {/* Accordion for My Events */}
          {loaded &&
            events
              .map((eve) => (
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
                              <strong>Estimated Duration:</strong>{" "}
                              {eve.duration}
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
      </Box>
    </>
  );
}
