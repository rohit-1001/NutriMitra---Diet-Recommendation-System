import React from 'react'
import "./HomeStyles.css"
import rightsecimg from "../../assets/homepage/rightsecimg.jpg"
import verficiation from "../../assets/homepage/verification.jpg"
import results from "../../assets/homepage/results.webp"
import createexam from "../../assets/homepage/createexam.jpg"
import homeimg1 from "../../assets/homepage/homeimg1.png"
import testi1 from "../../assets/homepage/testi1.jpg"
import testi2 from "../../assets/homepage/testi2.jpg"
import testi3 from "../../assets/homepage/testi3.jpg"
import Footer from '../../components/Footer'
import { useEffect } from 'react'
import { Fade } from 'react-awesome-reveal';
import { Zoom } from 'react-awesome-reveal';
// import Flip from 'react-awesome-reveal/Flip';
import { Slide } from 'react-awesome-reveal';

const Home = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    document.title = 'NutriMitra | Home';
  }, [])
  return (
    <>
      <div className="sec1123">
        <Fade bottom>
          <div className="leftsec123">
            <h1 style={{
              // border: "2px solid blue",
              padding: "1em 0 ",
              lineHeight: "2rem"
            }}>Efficient Diet Management at Your Fingertips</h1>
            <div className="seewhy123" style={{
              // border: "2px solid red",
              fontSize: "1.3rem",
              padding: "0.5em 0"
            }}>Discover why individuals choose our diet management system over other solutions.</div>
            <div className="seewhyinfo123">"Our diet management platform is my go-to choice for maintaining a healthy lifestyle. It allows me to streamline and optimize my dietary habits with ease, free from any complications. The user-friendly interface simplifies the process of managing my diet, making it the ultimate tool for my health journey. I rely on this platform for all my dietary needs due to its efficiency and support."</div>
          </div>
        </Fade>
        <Fade bottom>
          <div className="rightsec123">
            <img src={rightsecimg} alt="" id="firstimg123" />
          </div>
        </Fade>
      </div>

      <div style={{
        // border: "2px solid red",
        width: "100%",
        height: "200px",
      }}>
        <img src={homeimg1} alt="" className='footerimg' />
      </div>
      <div className="outerhead11">
        <Zoom>
          <div id='heading111'>Efficient Diet Management</div>
        </Zoom>
      </div>
      <div className="sec2111">
        <div className="sec2div1222">
          <Fade left>
            <div className="left123">
              <h3>Manage Your Diet</h3>
              <div className="leftinfo123" style={{
                // border: "2px solid red",
                width: "70%",
                textAlign: "justify"
              }}>
                <ul>
                  <li>Efficiently organize and track your dietary intake using our intuitive management tools.</li>
                  <li>Add and categorize your food items, set consumption goals, and monitor nutritional needs.</li>
                  <li>Generate reports to analyze dietary trends and make informed decisions for a healthier lifestyle.</li>
                </ul>
              </div>
            </div>

          </Fade>
          <Fade right>
            <div className="right123">
              <img src={createexam} alt="" id="secondimg123" />
            </div>
          </Fade>
        </div>


        <div className="sec2div1222" style={{
          // border: "2px solid green",
          display: "flex",
          justifyContent: "space-between",
        }}>
          <div>
          <Fade left>
            <div className="right123" style={{
              // border: "2px solid red",
            width : "100%"
            }}>
              <img src={verficiation} alt="" id="thirdimg123" />
            </div>
          </Fade>
          </div>
          <div>
          <Fade right>
            <div className="left123">
              <h3>Verify Dietary Intake and Begin Management</h3>
              <div className="leftinfo123" style={{
                // border: "2px solid red",
                width: "100%",
                textAlign: "justify"
              }}>
                <ul>
                  <li>Efficiently verify your dietary intake within 60 seconds.</li>
                  <li>Access 24/7/365 customer support for any assistance on your health journey.</li>
                  <li>Utilize advanced dietary management software for enhanced results.</li>
                </ul>
              </div>
            </div>

          </Fade>
          </div>
        </div>
        <div className="sec2div1222">
          <Fade left>
            <div className="left123">
              <h3>Stay Updated</h3>
              <div className="leftinfo123" style={{
                // border: "2px solid red",
                width: "80%",
                textAlign: "justify"
              }}>
                <ul>
                  <li>Login to access the latest dietary updates on our platform.</li>
                  <li>Monitor your nutritional levels and receive feedback or notifications.</li>
                  <li>Leverage these updates to shape your future dietary management and reach your health goals.</li>
                </ul>
              </div>
            </div>

          </Fade>
          <Fade right>
            <div className="right123">
              <img src={results} alt="" id="forthimg123" />
            </div>
          </Fade>
        </div>

      </div >
      <Zoom>
        <div id='heading211'>Testimonials</div>
      </Zoom>
      <Slide >
        <div className="outertestimonials123">
          <div className="container1111">
            <div className="testimonial-box999">
              <div className="testimonial123">
                <i className="fas123 fa-quote-right"></i>
                <span className="testimonial-text123">"Efficient diet management has transformed our health journey. Choosing NutriMitra was one of our best decisions."</span>
                <div className="testimonial-user123">
                  <img src={testi1} alt="user-img" className="user-img123" />
                  <div className="user-info123">
                    <span className="user-name123">Brian Marchman</span>
                    <div className="user-job-details123">
                      <span className="user-job">Health Enthusiast</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="container1111">
            <div className="testimonial-box999">
              <div className="testimonial123">
                <i className="fas123 fa-quote-right"></i>
                <span className="testimonial-text123">"Revolutionizing our lifestyle, NutriMitra's diet management has redefined health for our family. A trusted ally, they've guided us to new horizons."</span>
                <div className="testimonial-user123">
                  <img src={testi2} alt="user-img" className="user-img123" />
                  <div className="user-info123">
                    <span className="user-name123">Brian Marchman</span>
                    <div className="user-job-details123">
                      <span className="user-job">Health Advocate</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="container1111">
            <div className="testimonial-box999">
              <div className="testimonial123">
                <i className="fas123 fa-quote-right"></i>
                <span className="testimonial-text123">"The transformation we've experienced with NutriMitra's diet management is remarkable. Their guidance is a strategic asset, propelling our health journey."</span>
                <div className="testimonial-user123">
                  <img src={testi3} alt="user-img" className="user-img123" />
                  <div className="user-info123">
                    <span className="user-name123">Brian Marchman</span>
                    <div className="user-job-details123">
                      <span className="user-job">Wellness Advocate</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Slide>

      <Footer />
    </>
  )
}

export default Home
