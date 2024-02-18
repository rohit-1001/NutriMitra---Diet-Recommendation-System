
import React from 'react'
import { NavLink } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import { useState } from 'react';
import companyLogo from "../assets/NutriMitraLogo-removebg-preview.png"
import signin from "../assets/homepage/signin.png"
import { GiHamburgerMenu } from "react-icons/gi";
import { useEffect } from 'react';
import { useRef } from 'react';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import CallOutlinedIcon from '@mui/icons-material/CallOutlined';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTachometerAlt } from '@fortawesome/free-solid-svg-icons'; // Dashboard
import { faBox } from '@fortawesome/free-solid-svg-icons'; // Products
import { faHistory } from '@fortawesome/free-solid-svg-icons'; // History
import { faClipboardList } from '@fortawesome/free-solid-svg-icons'; // Orders
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons'; // Logout
import {faInfoCircle} from '@fortawesome/free-solid-svg-icons'
import {faHome} from '@fortawesome/free-solid-svg-icons'
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "./NavbarStyle.css";
const Navbar3 = (props) => {
  const { role, setRole } = props.details;
  const navigate = useNavigate();
  const [showMediaIcons, setShowMediaIcons] = useState(false);
  let menuRef = useRef();
  useEffect(() => {
    let handler = (e) => {
      if (!menuRef.current.contains(e.target)) {
        setShowMediaIcons(false);
      }
    }
    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    }
  }

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
  };
  return (
    <>

      <div className="hero" ref={menuRef}>
        <div className="logo">
          <NavLink to="/"> <div><img src={companyLogo} alt="Logo Here" className='logo1' style={{
            width: "200px",
            // border: "2px solid red"
          }} /></div></NavLink>
        </div>
        <div className={showMediaIcons ? "inmobileview itemlist" : "itemlist"}>
          <ul className='List'>

            <NavLink to="/"
              style={({ isActive }) => ({
                color: isActive ? '#158344' : '#545e6f',
                textDecoration: 'none',
                fontWeight: '500',
                // background: isActive ? '#7600dc' : '#f0f0f0',
              })}
            >
              <div style={{
                display: "flex",
                flexDirection: window.innerWidth <= 768 ? "row" : "column",
                alignItems: "center",
              }}>
                <FontAwesomeIcon icon={faHome} />
                <li className='listItem' onClick={() => setShowMediaIcons(false)} style={{
                  fontWeight: '600',
                  marginLeft: window.innerWidth <= 768 ? "10px" : "0px",
                }}>Home</li>
              </div>
            </NavLink>
            {/* <NavLink to="/recipes"
              style={({ isActive }) => ({
                color: isActive ? '#158344' : '#545e6f',
                textDecoration: 'none',
                fontWeight: '500',
                // background: isActive ? '#7600dc' : '#f0f0f0',
              })}
            >
              <div style={{
                display: "flex",
                flexDirection: window.innerWidth <= 768 ? "row" : "column",
                alignItems: "center",
              }}>
                <FontAwesomeIcon icon={faInfoCircle } />
                <li className='listItem' onClick={() => setShowMediaIcons(false)} style={{
                  fontWeight: '600',
                  marginLeft: window.innerWidth <= 768 ? "10px" : "0px",
                }}>Recipes</li>
              </div>
            </NavLink> */}
            <NavLink to="/writeblogs"
              style={({ isActive }) => ({
                color: isActive ? '#158344' : '#545e6f',
                textDecoration: 'none',
                fontWeight: '500',
                // background: isActive ? '#7600dc' : '#f0f0f0',
              })}
            >
              <div style={{
                display: "flex",
                flexDirection: window.innerWidth <= 768 ? "row" : "column",
                alignItems: "center",
              }}>
                <FontAwesomeIcon icon={faSignOutAlt} />
                <li className='listItem' onClick={() => setShowMediaIcons(false)} style={{
                  fontWeight: '600',
                  marginLeft: window.innerWidth <= 768 ? "10px" : "0px",
                }}>Blogs</li>
              </div>
            </NavLink>
            <NavLink to="/videoconferencing"
              style={({ isActive }) => ({
                color: isActive ? '#158344' : '#545e6f',
                textDecoration: 'none',
                fontWeight: '500',
                // background: isActive ? '#7600dc' : '#f0f0f0',
              })}
            >
              <div style={{
                display: "flex",
                flexDirection: window.innerWidth <= 768 ? "row" : "column",
                alignItems: "center",
              }}>
                <FontAwesomeIcon icon={faSignOutAlt} />
                <li className='listItem' onClick={() => setShowMediaIcons(false)} style={{
                  fontWeight: '600',
                  marginLeft: window.innerWidth <= 768 ? "10px" : "0px",
                }}>Video Conference</li>
              </div>
            </NavLink>
            <NavLink to="/videoconferencing"
              style={({ isActive }) => ({
                color: isActive ? '#158344' : '#545e6f',
                textDecoration: 'none',
                fontWeight: '500',
                // background: isActive ? '#7600dc' : '#f0f0f0',
              })}
            >
              <div style={{
                display: "flex",
                flexDirection: window.innerWidth <= 768 ? "row" : "column",
                alignItems: "center",
              }}>
                <FontAwesomeIcon icon={faSignOutAlt} />
                <li className='listItem' onClick={() => setShowMediaIcons(false)} style={{
                  fontWeight: '600',
                  marginLeft: window.innerWidth <= 768 ? "10px" : "0px",
                }}>Video Conference</li>
              </div>
            </NavLink>
            <NavLink
              onClick={logout}
              style={({ isActive }) => ({
                color: isActive ? "#158344" : "#545e6f",
                textDecoration: "none",
                fontWeight: "500",
                // background: isActive ? '#7600dc' : '#f0f0f0',
              })}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: window.innerWidth <= 768 ? "row" : "column",
                  alignItems: "center",
                }}
              >
                <FontAwesomeIcon icon={faSignOutAlt} />
                <li
                  className="listItem"
                  onClick={() => {setShowMediaIcons(false)
                  logout()}}
                  style={{
                    fontWeight: "600",
                    marginLeft: window.innerWidth <= 768 ? "10px" : "0px",
                  }}
                >
                  Logout
                </li>
              </div>
            </NavLink>

            {/* <a href="https://www.njindiaonline.in/cdesk/login.fin" target="_blank" rel="noreferrer"><li className='listItem login' onClick={() => setShowMediaIcons(false)}>LOG IN</li></a> */}

          </ul>
        </div>

        <div className="hamburger-menu" onClick={() => setShowMediaIcons(!showMediaIcons)}>
          <GiHamburgerMenu className='hamburgerlines' />
        </div>

      </div>


      <Outlet />
    </>
  )

}

export default Navbar3;
