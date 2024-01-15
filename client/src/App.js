import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Navbar2 from './components/Navbar2';
import Navbar3 from './components/Navbar3';
import Home from './pages/Visitor/Home';
import About from './pages/Visitor/About';
import UserHome from './pages/User/UserHome';
import Recipes from './pages/User/Recipes';
import Blogs from './pages/User/Blogs';
import VideoConference from './pages/User/VideoConference';
import NotFound from "./components/NotFound"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [role, setRole] = useState('visitor')
  return (
    <>
      <ToastContainer />
      {role === "visitor" && (  
        <>
          <Navbar details={{ role, setRole }}  />
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/home" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </>
      )}
      {role === "user" && (
        <>
          <Navbar2  details={{ role, setRole }} />
          <Routes>
            <Route exact path="/" element={<UserHome />} />
            <Route exact path="/home" element={<UserHome />} />
            <Route path="/recipes" element={<Recipes />} />
            <Route path="/blogs" element={<Blogs />} />
            <Route path="/videoconferencing" element={<VideoConference />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </>
      )}
      {role === "expert" && (
        <>
          <Navbar3 details={{ role, setRole }}  />
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/home" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="*" element={<NotFound />} />
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
