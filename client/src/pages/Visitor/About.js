// import React from 'react'
// import Navbar from './Navbar'
// import About from './About'
// import Testimonials from './Testimonials'
// import Demo from './Demo'
// import Picture from './Picture'

// function HomeAbout() {
//   return (
//     <div>
//     {/* <Picture/> */}
//       {/* <Navbar /> */}
//       <About />
//       {/* <Testimonials /> */}
//       <Demo />
//     </div>
//   );
// }

// export default HomeAbout;


// ======================================================================================

import React from 'react'
import leftimg from "../../assets/aboutuspage/download.png"
import whatis from "../../assets/aboutuspage/QualityArtboard16@2x-8-2x.png"
import "./AboutStyles.css"
import whatisupper from "../../assets/aboutuspage/whatisdownimg.png"
import whatisdownimg from "../../assets/aboutuspage/whatisdownimg.png"
import founders from "../../assets/aboutuspage/founders.png"
import homeimg1 from "../../assets/aboutuspage/homeimg1.png"
import Footer from "../../components/Footer"
import { useEffect } from 'react'
import { Fade } from 'react-awesome-reveal';
import { Zoom } from 'react-awesome-reveal';
import { Flip } from 'react-awesome-reveal';
import { Slide } from 'react-awesome-reveal';
// import Pulse from 'react-awesome-reveal/Pulse';
// import Bounce from 'react-awesome-reveal/Bounce';

export default function HomeAbout() {
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    document.title = 'About | NutriMitra';
  }, [])
  return (
    <>
      <div>
        <Fade bottom>
          <div className="sec1" id='aboutsec1'>
            <div className="rightsec">
              <img src={leftimg} alt="" id="firstimg" />
            </div>
            <div className="leftsec">
              <h2>Who is NutriMitra?</h2>
              <div className="seewhy">We streamline diet management, making it simple and effective.</div>
              <div className="seewhyinfo" style={{
                textAlign: "justify",
                // border: "2px solid red",
                lineHeight: "2rem"
              }}>While many perceive diet management solutions as mere trackers of food intake, our vision extends far beyond that notion. We recognize a superior approach to nourishment.
                Our ethos revolves around empowering individuals and their well-being journey.
                <br />That's why we're committed to simplifying the dietary management process, ensuring it's accessible and user-friendly. The outcome is a platform that fosters organization, effectiveness, confidence, and positive results in managing your diet.</div>
            </div>


          </div>
        </Fade>
        <div style={{
          // border: "2px solid red",
          width: "100%",
          height: "200px",
        }}>
          <img src={homeimg1} alt="" className='footerimg' />
        </div>
        <div className="sec1" id='aboutsec2'>

          <Slide left>
            <div className="leftsec" style={{
              width: "70%"
            }}>
              <h2>What is NutriMitra?</h2>
              <div className="seewhyinfo" id='absec2left' style={{
                textAlign: "justify",
                width: "100%",
                // border: "2px solid red",
                padding: "1em 0",
                lineHeight: "2rem"
              }}>
                NutriMitra is a cutting-edge platform designed to assist individuals in effectively managing their dietary habits. Our platform offers intuitive tools for diet management, allowing you to track your food intake, set nutrition goals, and monitor your progress with ease. Detailed insights and analytics provide valuable information about your dietary patterns, empowering you to make informed decisions for your health. NutriMitra is a comprehensive solution that enables users to streamline and optimize their dietary management securely and efficiently.
              </div>
            </div>

          </Slide>
          <Slide right>
            <div className="rightsec" id='absec2right'>
              <img src={whatis} alt="" id="thirdimg" />
            </div>
          </Slide>
        </div>
        <div>
          <img src={homeimg1} alt="" className='footerimg' style={{ transform: "rotateX(180deg)" }} />
        </div>

        <div className="outerhead" id='ourstoryhead'>
          <Fade bottom>
            <div id='heading1'>Our Story</div>
          </Fade>
        </div>
        <div className="sec1" id='ourstory'>
          <div className="rightsec">
            <Fade left>
              <img src={founders} alt="" id="firstimg" />
            </Fade>
          </div>
          <div className="leftsec" id='founders'>
            <Fade bottom>
              <h2>Meet Our Visionaries</h2>
              <div className="seewhyinfo"  style={{
                textAlign: "justify",
                width: "100%",
                // border: "2px solid red",
                padding: "1em 0",
                lineHeight: "2rem"
              }}>
                NutriMitra was conceived by a team of passionate individuals: Akash,  Mahesh, and Rohit. Recognizing the challenges people face in managing their diets, especially in today's fast-paced world, they saw the opportunity to create a platform that simplifies and optimizes the process. Despite initial hurdles and limited experience in diet management software, they embarked on the journey of developing a user-friendly and effective solution.
                Their commitment to innovation, health, and user satisfaction drives NutriMitra's mission forward. They continuously strive to refine and improve the platform to meet the ever-changing needs of individuals on their health journeys.
              </div>
            </Fade>

          </div>


        </div>
      </div >
      <Footer />
    </>
  )
}
