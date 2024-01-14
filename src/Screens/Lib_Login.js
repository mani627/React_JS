import {
  EyeInvisibleOutlined,
  EyeOutlined,
  UserOutlined,
} from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Axios } from "../Axios/Axios";
import Button from "../Components/Button";
import Lib_Input from "../Components/Lib_Input";
import Toasting from "../Components/Toast";
import "../Css/Lib_Login.css";
import { Lib_User_Details } from "../Redux/Action/Lib";
import LoadingOverlay from "react-loading-overlay";

export default function Lib_Login() {
  const redux_state = useSelector((state) => state);
  const usedispatch = useDispatch();
  
  const [userDetail, setuserDetail] = useState({
    email: "manii@gmail.com",
    pass:"Mani@1234",
  });
  const [isLoader, setIsLoader] = useState(false);
  const [hide, show] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (redux_state.Lib_User_Details.data.length !== 0) {
      navigate("/Lib_Main");
    }
  });

  const pass = (e) => {
    setuserDetail({
      ...userDetail,
      [e.target.name]: e.target.value,
    });
  };

  const Validation = async () => {
    let email_reg =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let result_email = email_reg.test(userDetail.email);

    let pass_reg = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
    let result_pass = pass_reg.test(userDetail.pass);

    if (userDetail.email === "") {
      Toasting("Enter Email", "error");
    } else if (!result_email) {
      Toasting("Invalid Email", "error");
    } else if (userDetail.pass === "") {
      Toasting("Enter Password", "error");
    } else if (!result_pass) {
      Toasting("Enter Strong Password", "error");
    } else {
      setIsLoader(true);
      let result = await Axios("/Login_User", {
        email: userDetail.email,
        password: userDetail.pass,
      });
      setIsLoader(false);
      if (result.data.mssg === "User Invalid") {
        Toasting("User Invalid", "error");
      } else if (result.data.mssg === "Incorrect Password") {
        Toasting("Password Incorrect", "error");
      } else {
        usedispatch(Lib_User_Details(result.data.payload));

        Toasting("Logged", "success");
      }
    }

    // Toasting("Deleted", "success")
  };

  return (
    <LoadingOverlay active={isLoader} spinner text="Loading your content...">
      <div className="Lib_login_main">
        <section className="Lib_login_main2">
          <h1 className="Lib_login_title tracking-[.20em]">Login</h1>
          <Lib_Input
            type="text"
            name="email"
            onChange={pass}
            placeholder={"UserName/Email"}
            defaultValue={userDetail.email}
            icon={
              <UserOutlined
                className="lib_icon"
                style={{
                  left: "5%",
                  position: "absolute",
                  backgroundColor: "greeen",
                }}
              />
            }
          />
          <br />
          <Lib_Input
          defaultValue={userDetail.pass}
            type={hide ? "password" : "text"}
            name="pass"
            onChange={pass}
            placeholder={"Password"}
            icon={
              hide ? (
                <EyeInvisibleOutlined
                  onClick={() => show(!hide)}
                  className="lib_icon"
                  style={{
                    left: "5%",
                    position: "absolute",
                    backgroundColor: "greeen",
                  }}
                />
              ) : (
                <EyeOutlined
                  onClick={() => show(!hide)}
                  className="lib_icon"
                  style={{
                    left: "5%",
                    position: "absolute",
                    backgroundColor: "greeen",
                  }}
                />
              )
            }
          />
          <Button
            name={"Login"}
            onClick={Validation}
            className_A="Lib_login_btn tracking-[.20em]"
          />
        </section>
        <ToastContainer hideProgressBar={true} />
      </div>
    </LoadingOverlay>
  );
}
