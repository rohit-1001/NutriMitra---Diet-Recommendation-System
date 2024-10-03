import logo from "./logo.svg";
import "./App.css";
import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Navbar2 from "./components/Navbar2";
import Navbar3 from "./components/Navbar3";
import Home from "./pages/Visitor/Home";
import About from "./pages/Visitor/About";
import UserHome from "./pages/User/UserHome";
import Recipes from "./pages/User/Recipes";
import Blogs from "./pages/User/Blogs";
import ExpertHome from "./pages/Expert/ExpertHome";
import WriteBlog from "./pages/Expert/WriteBlog";
import VideoConference from "./pages/User/VideoConference";
import NotFound from "./components/NotFound";
import Login from "./pages/Visitor/Login";
import SelectRole from "./components/SelectRole";
import VideoStartPage from "./pages/VideoStartPage";
import CreateEventPage from "./pages/Expert/CreateEventPage";
import UserEvents from "./pages/User/UserEvents";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import "./App.css";
import CustomFoodRecommendation from "./components/CustomFoodRecommendation";
function App() {
  const [role, setRole] = useState("visitor");
  const verifyToken = async (token) => {
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/verifyToken`,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      if (res.status === 200) {
        if (res.data.msg === "verified") {
          return true;
        } else {
          return false;
        }
      }
    } catch (error) {
      return false;
    }
  };
  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    if (token) {
      const verify = verifyToken(token);
      if (verify) {
        setRole(role);
      } else {
        setRole("visitor");
      }
    } else {
      setRole("visitor");
    }
    console.log(role);
  }, []);
  return (
    <>
      <ToastContainer />
      {role === "visitor" && (
        <>
          <Navbar details={{ role, setRole }} />
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/home" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route
              path="/login"
              element={<Login details={{ role, setRole }} />}
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </>
      )}
      {role === "user" && (
        <>
          <Navbar2 details={{ role, setRole }} />
          <Routes>
            <Route exact path="/" element={<UserHome />} />
            <Route exact path="/home" element={<UserHome />} />
            {/* <Route exact path="/food" element={<CustomFoodRecommendation />} /> */}
            <Route path="/recipes" element={<Recipes />} />
            <Route path="/blogs" element={<Blogs />} />
            <Route path="/videoconferencing" element={<VideoConference />} />
            <Route path="/startcall" element={<VideoStartPage />} />
            <Route path="/events" element={<UserEvents />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </>
      )}
      {role === "expert" && (
        <>
          <Navbar3 details={{ role, setRole }} />
          <Routes>
            <Route exact path="/" element={<ExpertHome />} />
            <Route exact path="/home" element={<ExpertHome />} />
            <Route path="/writeblogs" element={<WriteBlog />} />
            <Route path="/about" element={<About />} />
            <Route path="/videoconferencing" element={<VideoConference />} />
            <Route path="/startcall" element={<VideoStartPage />} />
            <Route path="/events" element={<CreateEventPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </>
      )}

      {/* remaining to do */}
      {/* {role === "admin" && (
        <>
          <Navbar3 details={{ role, setRole }} />
          <Routes>
            <Route exact path="/" element={<ExpertHome />} />
            <Route exact path="/home" element={<ExpertHome />} />
            <Route path="/writeblogs" element={<WriteBlog />} />
            <Route path="/about" element={<About />} />
            <Route path="/videoconferencing" element={<VideoConference />} />
            <Route path="/startcall" element={<VideoStartPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </>
      )} */}

      
      {role === "notset" && (
        <>
          <Routes>
            <Route
              exact
              path="/"
              element={<SelectRole details={{ role, setRole }} />}
            />
          </Routes>
        </>
      )}

      {/* <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<NotFound />} />
      </Routes>       */}
    </>
  );
}

export default App;
