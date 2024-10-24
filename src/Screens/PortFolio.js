import { DatePicker } from "antd";
import "antd/dist/antd.css";
import emailjs from "emailjs-com";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../App.css";
import Footer from "../Components/Footer";
import Header from "../Components/Header";
import InputPort from "../Components/InputPort";
import Popup from "../Components/Popup";
import Toasting from "../Components/Toast";
import "../Css/Dash_Css.css";
import "../Css/Nav_Css.css";
import "../Css/portfolio.css";
import "../index.css";
import { USER_LOGOUT } from "../Redux/Action/To_Do";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";

const { RangePicker } = DatePicker;
function PortFolio() {
  let url = new URL(window.location.href);
  url.searchParams.set("name", "mani");

  const dispatch = useDispatch();
  let redux_state = useSelector((state) => state);
  // let loginDetails = redux_state.sample.login_details;

  const [contact, setcontact] = useState({
    name: "",
    email: "",
    mssg: "",
  });
  const [close_popup, setclose_popup] = useState(false);

  const navigate = useNavigate();

  const [width, setWindowWidth] = React.useState(0);

  React.useEffect(() => {
    updateDimensions();

    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

 

  const updateDimensions = () => {
    const width = window.innerWidth;
    setWindowWidth(width);
  };

  let tab = document.querySelectorAll(
    ".tab_main_container .Resume_content_tab p"
  );
  let tab_content = document.querySelectorAll(
    ".Resume_content_tab_content>div"
  );
  let indicator = document.getElementsByClassName("tab_indicator");

  tab.forEach((t, i) => {
    t.addEventListener("click", () => {
      // console.log(i)
      tab.forEach((tt) => {
        tt.classList.remove("active_tab");
        tab[i].classList.add("active_tab");
      });

      tab_content.forEach((e) => {
        e.classList.remove("active_tabcontent");
      });

      tab_content[i].classList.add("active_tabcontent");
      indicator[0].style.top = `calc(40px + ${i * 50}px)`;

      if (i === 3) {
        setTimeout(() => {
          let boom = document.getElementsByClassName("boom0");

          boom[0].style.transition = "top 0.2s ease-in-out";
          boom[0].style.top = "-10px";
        }, 300);

        setTimeout(() => {
          let boom = document.getElementsByClassName("boom");

          boom[0].style.transition = "top 0.2s ease-in-out";
          boom[0].style.top = "-10px";
        }, 500);

        setTimeout(() => {
          let boom2 = document.getElementsByClassName("boom2");

          boom2[0].style.transition = "top 0.2s ease-in-out";
          boom2[0].style.top = "-10px";
        }, 1000);

        setTimeout(() => {
          let boom3 = document.getElementsByClassName("boom3");

          boom3[0].style.transition = "top 0.2s ease-in-out";
          boom3[0].style.top = "-10px";
        }, 2000);

        setTimeout(() => {
          let boom = document.getElementsByClassName("boom");

          boom[0].style.transition = "top 0.2s ease-in-out";
          boom[0].style.top = "0px";
        }, 1000);

        setTimeout(() => {
          let boom2 = document.getElementsByClassName("boom2");

          boom2[0].style.transition = "top 0.2s ease-in-out";
          boom2[0].style.top = "0px";
        }, 1500);
        setTimeout(() => {
          let boom3 = document.getElementsByClassName("boom3");

          boom3[0].style.transition = "top 0.2s ease-in-out";
          boom3[0].style.top = "0px";
        }, 2500);
      }
      // t.classList.remove("active_tab")
      // tab[i].classList.remove("active_tab")
    });
  });

  // const [mssg,setmssg]=useState("")
  const submit = (e) => {
    let email_reg =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let result_email = email_reg.test(
      document.getElementsByName("user_email")[0].value
    );

    e.preventDefault();
    if (document.getElementsByName("message")[0].value === "") {
      Toasting("Enter Name", "error");
      return false;
    } else if (!result_email) {
      Toasting("Enter Valid Email", "error");
      return false;
    } else if (document.getElementsByName("message")[0].value === "") {
      Toasting("Enter Message", "error");
      return false;
    } else {
      emailjs
        .sendForm(
          "service_fkikud8",
          "template_upt5x1s",
          e.target,
          "PePpFs6LL7DEydqGY"
        )
        .then((res) => {
          console.log(res);

          Toasting("Successfully send", "success");
          document.getElementsByName("name")[0].value = "";

          document.getElementsByName("user_email")[0].value = "";
          document.getElementsByName("message")[0].value = "";
        })
        .catch((er) => {
          console.log(er);
        });
    }
  };

  const closing_popup = () => {
    setclose_popup(!close_popup);
  };

  const logout = () => {
    setclose_popup(!close_popup);
  };

  const clear_logout = () => {
    dispatch(USER_LOGOUT());
    navigate("/");
  };

  return (
    <>
      <div className="port_main_div">
        {/* Heroic  */}
        <div id="home" className="port_heroic_div">
          <Header logout={logout} />

          <div
            style={
              width > 768
                ? { height: "180%", width: "100%", display: "flex" }
                : {
                    height: "107%",
                    paddingBottom: "12%",
                    width: "100%",
                    display: "flex",
                    flexDirection: "column-reverse",
                  }
            }
          >
            {/* heroic left */}
            <div className="port_heroic_div_left">
              <p className="spaces_heroic bigfont">
                Hello, I'm{" "}
                <span style={{ color: "#f45b37", fontSize: "30px" }}>
                  Mani{" "}
                </span>
              </p>
              <p className="spaces_heroic bigfont">Kandan</p>
              <p className="spaces_heroic">
                Knack of building applications with front and back end
                operations
              </p>

              {/* heroic buttons */}
              <div className="heroic_buttons">
                {/* <button className="Hire_me">Hire me</button> */}
                &nbsp; &nbsp;
                <a
                  className="Get_resume"
                  href={require("../Doc/ManiUP.pdf")}
                  download
                >
                  Get Resume
                </a>
              </div>
            </div>
            {/* heroic right */}
            <div className="port_heroic_div_right">
              {/* profile image */}
              <div className="port_profile"> </div>
            </div>
          </div>
        </div>
        {/* SVG Design */}
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
          <path
            fill="#16a085"
            fill-opacity="1"
            d="M0,96L60,85.3C120,75,240,53,360,58.7C480,64,600,96,720,106.7C840,117,960,107,1080,90.7C1200,75,1320,53,1380,42.7L1440,32L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z"
          ></path>
        </svg>

        {/* about me */}
        <div id="about_me" className="about_me_main">
          <div className="about_me_header">
            <p className="about_me_title">About me</p>
            <p className="about_me_title2">why choose me</p>
            <img
              src={require("../Images/divider.png")}
              style={
                width > 768
                  ? { height: "50%", width: "30%" }
                  : { height: "78%", width: "77%" }
              }
            />
          </div>
          <div className="about_me_content">
            {/* graduate img */}
            <div className="about_me_content_left"></div>
            {/* about me desc */}
            <div className="about_me_content_right">
              <p className="about_me_para">
              I am a dedicated Full-Stack Developer with over 3 years of experience, proficient in building scalable and efficient applications. My tech stack includes React, Next.js, MongoDB, Kafka, TypeScript, Redux, Node.js, and expertise in real-time communication using socket protocols. I have hands-on experience with Docker for containerized deployments and Git for version control, applying Agile methodologies to ensure continuous delivery and improvement.

I specialize in creating responsive, dynamic web applications with a focus on performance and scalability, leveraging real-time data streaming through Kafka and socket protocols. My ability to integrate microservices and manage end-to-end development pipelines sets me apart in delivering reliable, robust, and interactive software solutions.
              </p>
              <span style={{ fontWeight: "bold",fontWeight:600 }}>
                Here are the Few Highlights
              </span>
              <ul id="highlights">
                <li>React</li>
                <li>Redux for state management (Redux persist)</li>
                <li>Docker</li>
                <li>Kafka Messaging Broker</li>
                <li>
                  Node JS (ExpressJS, PassportJS, Multer, Nodemailer,Mongoose
                  ODM)
                </li>
                <li>Building REST api (Express JS)</li>
                <li>MongoDB</li>
                <li>Web Socket</li>
              </ul>
              <div className="heroic_buttons">
                {/* <button className="Hire_me_about">Hire me</button> */}
                &nbsp; &nbsp;
                <a
                  className="Get_resume"
                  href={require("../Doc/ManiUP.pdf")}
                  download
                >
                  Get Resume
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Resume */}
        <br/>
        <div className="Resume_main" id="resume">
          <div className="Resume_header">
            <p className="about_me_title">Resume</p>
            <p className="about_me_title2">My formal Bio Details</p>
            <img
              src={require("../Images/divider.png")}
              style={
                width > 768
                  ? { height: "50%", width: "30%" }
                  : { height: "78%", width: "77%" }
              }
            />
          </div>
          <div className="Resume_content">
            <div className="tab_main_container">
              <div className="Resume_content_tab">
                <div className="tab_indicator"></div>
                <p className="active_tab">Education</p>
                <p>Work history</p>
                <p>Tech Stack</p>
                <p>Projects</p>
                <p>Interest</p>
              </div>

              <div className="Resume_content_tab_content">
                {/* education_content */}
                <div className="active_tabcontent">
                  <p style={width > 768 ? null : { fontSize: "17px" }}>
                    Secondary School Leaving Certificate at S.M.S.V.HSS in
                    Karaikudi <span style={{ color: "#ff6347" }}>2012.</span>
                  </p>
                  <p style={width > 768 ? null : { fontSize: "17px" }}>
                    Higher Secondary Course at Alagappa Matriculation School in
                    karaikudi{" "}
                    <span style={{ color: "#ff6347" }}>2012-2014.</span>
                  </p>
                  <p style={width > 768 ? null : { fontSize: "17px" }}>
                    Bachelor Of Engineering in Anna University{" "}
                    <span style={{ color: "#ff6347" }}>2014-2018.</span>
                  </p>
                  <p style={width > 768 ? null : { fontSize: "17px" }}>
                    React JS, Express Js, MongoDB, Node JS,Web Socket in Online
                    Course <span style={{ color: "#ff6347" }}>2020-2023.</span>
                  </p>
                </div>

                {/* Work history content */}

                <Carousel
                  showStatus={false}
                  showArrows={true}
                  autoPlay={true}
                  interval={5000}
                  showThumbs={false}
                  swipeable={true}
                >
                  <div>
                    <p
                      style={
                        width > 768
                          ? { fontWeight: "bold" }
                          : { fontSize: "17px", fontWeight: "bold" }
                      }
                    >
                      1. KDP TECH
                    </p>
                    <p style={width > 768 ? null : { fontSize: "17px" }}>
                      FrontEnd and BackEnd in KDP Tech for{" "}
                      <span style={{ color: "#ff6347" }}>2 year</span>{" "}
                      Experience.
                    </p>
                    <p>
                      &nbsp;&nbsp;- Developing Interactive{" "}
                      <span
                        style={
                          width > 768
                            ? { color: "#ff6347" }
                            : { fontSize: "17px", color: "#ff6347" }
                        }
                      >
                        UI.
                      </span>
                    </p>
                    <p style={width > 768 ? null : { fontSize: "17px" }}>
                      &nbsp;&nbsp;- Developing Backend API with Database.
                    </p>
                    <p style={width > 768 ? null : { fontSize: "17px" }}>
                      &nbsp;&nbsp;- Redux State Management - Redux Persist,
                      Thunk
                    </p>
                    <p style={width > 768 ? null : { fontSize: "17px" }}>
                      &nbsp;&nbsp;- Web Socket (Socket.IO library)
                    </p>
                  </div>

                  <div>
                    <p
                      style={
                        width > 768
                          ? { fontWeight: "bold" }
                          : { fontSize: "17px", fontWeight: "bold" }
                      }
                    >
                      2. MITRAH SOFT
                    </p>
                    <p style={width > 768 ? null : { fontSize: "17px" }}>
                      FrontEnd and BackEnd in Mitrah Soft Tech for{" "}
                      <span style={{ color: "#ff6347" }}>1.5 year</span>{" "}
                      Experience.
                    </p>
                    <p>
                      &nbsp;&nbsp;- Problem Solvings in{" "}
                      <span
                        style={
                          width > 768
                            ? { color: "#ff6347" }
                            : { fontSize: "17px", color: "#ff6347" }
                        }
                      >
                        functionality.
                      </span>
                    </p>
                    <p style={width > 768 ? null : { fontSize: "17px" }}>
                      &nbsp;&nbsp;- Developing Backend API with MongoDB
                      Database and Dockerization.
                    </p>
                    <p style={width > 768 ? null : { fontSize: "17px" }}>
                      &nbsp;&nbsp;- Redux State Management - Redux Persist,
                      Thunk
                    </p>
                    <p style={width > 768 ? null : { fontSize: "17px" }}>
                      &nbsp;&nbsp;- Worked Kafka and Payment Gateway
                    </p>
                    <p style={width > 768 ? null : { fontSize: "17px" }}>
                      &nbsp;&nbsp;- Web Socket (Socket.IO library)
                    </p>
                  </div>
                </Carousel>

                {/* Programming Skills*/}
                <div className="program_skill_container">
                  <div style={width > 768 ? null : { fontSize: "17px" }}>
                    Javascript{" "}
                    <meter
                      style={width > 768 ? null : { width: "99%" }}
                      value="9"
                      min="0"
                      max="10"
                    ></meter>
                  </div>
                  <div style={width > 768 ? null : { fontSize: "17px" }}>
                    React JS{" "}
                    <meter
                      style={width > 768 ? null : { width: "99%" }}
                      value="9"
                      min="0"
                      max="10"
                    ></meter>
                  </div>
                  <div style={width > 768 ? null : { fontSize: "17px" }}>
                    Redux{" "}
                    <meter
                      style={width > 768 ? null : { width: "99%" }}
                      value="9"
                      min="0"
                      max="10"
                    ></meter>
                  </div>
                  <div style={width > 768 ? null : { fontSize: "17px" }}>
                    Express JS{" "}
                    <meter
                      style={width > 768 ? null : { width: "99%" }}
                      value="9"
                      min="0"
                      max="10"
                    ></meter>
                  </div>
                  <div style={width > 768 ? null : { fontSize: "17px" }}>
                    MongoDB{" "}
                    <meter
                      style={width > 768 ? null : { width: "99%" }}
                      value="9"
                      min="0"
                      max="10"
                    ></meter>
                  </div>
                  <div style={width > 768 ? null : { fontSize: "17px" }}>
                    Node JS{" "}
                    <meter
                      style={width > 768 ? null : { width: "99%" }}
                      value="9"
                      min="0"
                      max="10"
                    ></meter>
                  </div>
                  <div style={width > 768 ? null : { fontSize: "17px" }}>
                    Kafka{" "}
                    <meter
                      style={width > 768 ? null : { width: "99%" }}
                      value="9"
                      min="0"
                      max="10"
                    ></meter>
                  </div>
                  <div style={width > 768 ? null : { fontSize: "17px" }}>
                    NEXT JS{" "}
                    <meter
                      style={width > 768 ? null : { width: "99%" }}
                      value="9"
                      min="0"
                      max="10"
                    ></meter>
                  </div>
                  <div style={width > 768 ? null : { fontSize: "17px" }}>
                    Web Socket{" "}
                    <meter
                      style={width > 768 ? null : { width: "99%" }}
                      value="8"
                      min="0"
                      max="10"
                    ></meter>
                  </div>
                  <div style={width > 768 ? null : { fontSize: "17px" }}>
                    Git{" "}
                    <meter
                      style={width > 768 ? null : { width: "99%" }}
                      value="9"
                      min="0"
                      max="10"
                    ></meter>
                  </div>
                  <div style={width > 768 ? null : { fontSize: "17px" }}>
                    Jiira{" "}
                    <meter
                      style={width > 768 ? null : { width: "99%" }}
                      value="8"
                      min="0"
                      max="10"
                    ></meter>
                  </div>
                  <div style={width > 768 ? null : { fontSize: "17px" }}>
                    Docker{" "}
                    <meter
                      style={width > 768 ? null : { width: "99%" }}
                      value="9"
                      min="0"
                      max="10"
                    ></meter>
                  </div>
                </div>

                {/* Projects */}
                <div>
                  <p style={width > 768 ? null : { fontSize: "17px" }}>
                    &nbsp;&nbsp;- Next Js Payment Gateway
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <span
                      onClick={() =>
                        window.open(
                          "https://next-stripe-red.vercel.app/",
                          "_blank",
                          "noopener,noreferrer"
                        )
                      }
                      className="boom0"
                      style={{
                        transition: "all 0.3s ease-in-out",
                        color: "#ff6347",
                        cursor: "pointer",
                        position: "relative",
                      }}
                    >
                      go to
                    </span>
                  </p>
                  <p style={width > 768 ? null : { fontSize: "17px" }}>
                    &nbsp;&nbsp;- Book Library (RestFul API)
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <span
                      onClick={() => window.open('/Lib_Login', '_blank')}
                      className="boom"
                      style={{
                        transition: "all 0.3s ease-in-out",
                        color: "#ff6347",
                        cursor: "pointer",
                        position: "relative",
                      }}
                    >
                      go to
                    </span>
                  </p>
                  <p style={width > 768 ? null : { fontSize: "17px" }}>
                    &nbsp;&nbsp;- Chat App
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <span
                      onClick={() => navigate(`/Chat_Auth`)}
                      className="boom2"
                      style={{
                        transition: "all 0.3s ease-in-out",
                        color: "#ff6347",
                        cursor: "pointer",
                        position: "relative",
                      }}
                    >
                      go to
                    </span>
                  </p>

                  <p style={width > 768 ? null : { fontSize: "17px" }}>
                    &nbsp;&nbsp;- Redux To Do
                    List.&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <span
                      onClick={() => navigate(`/To_Do`)}
                      className="boom3"
                      style={{
                        transition: "all 0.3s ease-in-out",
                        color: "#ff6347",
                        cursor: "pointer",
                        position: "relative",
                      }}
                    >
                      go to
                    </span>
                  </p>
                  <p style={width > 768 ? null : { fontSize: "17px" }}>
                    &nbsp;&nbsp;- Personal Portfolio.
                  </p>
                </div>

                {/* interest */}
                <div>
                  <div
                    style={
                      width > 768
                        ? { color: "#ff6347" }
                        : { color: "#ff6347", fontSize: "17px" }
                    }
                  >
                    Learning
                  </div>
                  <div style={width > 768 ? null : { fontSize: "17px" }}>
                    I am interest to learn new stuff.
                  </div>
                  <br />
                  <div
                    style={
                      width > 768
                        ? { color: "#ff6347" }
                        : { color: "#ff6347", fontSize: "17px" }
                    }
                  >
                    Music
                  </div>
                  <div style={width > 768 ? null : { fontSize: "17px" }}>
                    I love to hear music not lyrics. As i love music, I love to
                    hear english songs
                  </div>
                  <br />
                  <div
                    style={
                      width > 768
                        ? { color: "#ff6347" }
                        : { color: "#ff6347", fontSize: "17px" }
                    }
                  >
                    Problem Solving online
                  </div>
                  <div style={width > 768 ? null : { fontSize: "17px" }}>
                    I love to solve online task like JS, MongoDB in leetcode,
                    HackerRank
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Contact */}
        <div id="contact" className="Contact_main">
          <div className="Contact_header">
            <p className="about_me_title">Contact Me</p>
            <p className="about_me_title2">Lets keep in touch</p>
            <img
              src={require("../Images/divider.png")}
              style={
                width > 768
                  ? { height: "50%", width: "30%" }
                  : { height: "78%", width: "77%" }
              }
            />
          </div>
          <div className="Contact_content">
            {/* <p> Get In Touch</p>
            <p>Send Your Email Here!</p> */}

            <div className="blue_blob">
              <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                <path
                  fill="#16A085"
                  d="M63.4,-45C79.1,-30.8,86.8,-4.6,79.1,13.5C71.3,31.7,48.1,41.8,25.8,52C3.4,62.2,-18.3,72.5,-35,66.7C-51.8,61,-63.7,39.1,-67.5,16.9C-71.4,-5.2,-67.2,-27.7,-54.6,-41.2C-42,-54.8,-21,-59.3,1.4,-60.4C23.8,-61.6,47.6,-59.3,63.4,-45Z"
                  transform="translate(100 100)"
                />
              </svg>
            </div>

            <div className="yellow_blob">
              <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                <path
                  fill="#F4D03F"
                  d="M61.9,-36.5C74.7,-13.6,75.6,15.3,63.3,35.9C51,56.5,25.5,68.9,4.5,66.3C-16.6,63.7,-33.1,46.2,-41.3,27.9C-49.6,9.6,-49.4,-9.4,-41.2,-29.7C-32.9,-49.9,-16.4,-71.4,4.1,-73.7C24.6,-76.1,49.2,-59.3,61.9,-36.5Z"
                  transform="translate(100 100)"
                />
              </svg>
            </div>
            {/* contact div */}

            <form className="contact_blur_div" onSubmit={submit}>
              <span>Name</span>
              <InputPort
                name={"name"}
                onChange={(e) =>
                  setcontact({ ...contact, name: e.target.value })
                }
              />
              <span>Email</span>
              <InputPort
                name={"user_email"}
                onChange={(e) =>
                  setcontact({ ...contact, email: e.target.value })
                }
              />
              <span>Message</span>
              <textarea
                className="input_contact"
                name={"message"}
                style={{ height: "20%" }}
                onChange={(e) =>
                  setcontact({ ...contact, mssg: e.target.value })
                }
              ></textarea>
              <br />
              <input className="Get_resume" type="submit" value="Send" />
            </form>
          </div>
        </div>
        <br />
        <br />
        <br />
        {close_popup ? (
          <Popup
            extra={
              <label
                id="yes_btn"
                name="Register"
                onClick={clear_logout}
                className="submit_admin_update"
              >
                Yes
              </label>
            }
            innerpopup={"popup_inner_login"}
            typeOf="LogOut"
            close={closing_popup}
          />
        ) : null}
        <Footer />
        <ToastContainer hideProgressBar={true} />
      </div>
    </>
  );
}

export default PortFolio;
