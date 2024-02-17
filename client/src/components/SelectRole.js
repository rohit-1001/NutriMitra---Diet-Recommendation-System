import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const SelectRole = (props) => {
  const { role, setRole } = props.details;
  const navigate = useNavigate();
  const submitRole = async (role) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/setMyRole`,
        { role },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      setRole(role);
      localStorage.setItem("role", role);
      toast.success("Role set successfully");
      navigate("/");
    } catch (error) {
      toast.error("Some error occured");
    }
  };
  const bull = (
    <Box
      component="span"
      sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
    >
      •
    </Box>
  );

  const logout = async () => {
    const confirmLogout = window.confirm("Are you sure, you want to log out?");
    if (confirmLogout) {
      try {
        localStorage.removeItem("token");
        localStorage.setItem("role", "visitor");
        setRole("visitor");
        navigate("/");
      } catch (error) {
        if (error.response) {
          toast.error(error.response.data.error);
        } else {
          toast.error("Some error occured");
        }
      }
    }
  }

  return (
    <>
      <div>
        <Button
          variant="contained"
          sx={
            {
              backgroundColor: "#3b8a51",
              ":hover": {
                backgroundColor: "#34a43c",
                transform: "scale(1.02)",
                transition: ".2s ease-out",
              },
            }
          }
          style={{
            float: "right",
            marginTop: "20px",
            marginRight: "20px",
          }}
          onClick={() => logout()}
          >
          Logout
        </Button>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh", // Set minimum height to viewport height for vertical centering
          flexDirection: "column", // Set flex direction to column
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginBottom: "20px",
          }}
        >
          <span style={{ fontSize: "35px", color: "#158344" }}>
            Select your Role
          </span>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "30px",
          }}
        >
          <Card
            sx={{
              minWidth: 275,
              margin: "0 8px",
              maxWidth: 500,
              transition: "transform 0.1s ease-in-out",
              ":hover": {
                transform: "scale(1.02)",
                backgroundColor: "#edf3eca6",
              },
              cursor: "pointer",
            }}
            onClick={() => submitRole("user")}
          >
            <CardContent>
              <Typography
                sx={{ fontSize: 18 }}
                color="text.secondary"
                gutterBottom
              >
                Are you a
              </Typography>
              <Typography
                variant="h4"
                component="div"
                style={{ color: "#296237" }}
              >
                Beneficiary
              </Typography>
              <Typography sx={{ mb: 1.5 }} color="text.secondary">
                by Role ?
              </Typography>
              <Typography variant="body2">
                Here you can seek guidance and advice about dietary habits and
                nutrition.
                <br />
                Get recommendation based on you eating habits and achieve health
                goals. Also you can connect with experts to get guidance.
              </Typography>
            </CardContent>
          </Card>
          <Card
            sx={{
              minWidth: 275,
              margin: "0 8px",
              maxWidth: 500,
              transition: "transform 0.1s ease-in-out",
              ":hover": {
                transform: "scale(1.02)",
                backgroundColor: "#edf3eca6",
              },
              cursor: "pointer",
            }}
            onClick={() => submitRole("user")}
          >
            <CardContent>
              <Typography
                sx={{ fontSize: 18 }}
                color="text.secondary"
                gutterBottom
              >
                Are you an
              </Typography>
              <Typography
                variant="h4"
                component="div"
                style={{ color: "#296237" }}
              >
                Expert
              </Typography>
              <Typography sx={{ mb: 1.5 }} color="text.secondary">
                by Role ?
              </Typography>
              <Typography variant="body2">
                Here you can provide guidance and advice users about dietary
                habits and nutrition.
                <br />
                Post blogs and articles to help users achieve health goals and
                also connect with them to provide guidance.
              </Typography>
            </CardContent>
          </Card>
        </div>
      </div>
      ;
    </>
  );
};

export default SelectRole;
