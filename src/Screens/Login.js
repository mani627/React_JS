import { faEye, faUser, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import Input from '../Components/Input';
import "../Css/Login_Css.css";
import "../Images/Login_right.jpg";
import Button from "../Components/Button";
import AuthContainer from "../Components/AuthContainer";
import Popup from "../Components/Popup";
import { Axios } from "../Axios/Axios"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Toasting from '../Components/Toast';
import { useDispatch, useSelector } from "react-redux";
import { store_user_details } from "../Redux/Action/Actions_Hotel";


// export const faEye: IconDefinition;
// export const faEyeDropper: IconDefinition;
// export const faEyeDropperEmpty: IconDefinition;
// export const faEyedropper: IconDefinition;
// export const faEyeLowVision: IconDefinition;
// export const faLowVision: IconDefinition;
// export const faEyeSlash: IconDefinition;
// export const faF: IconDefinition;

const Login = () => {
  
  const dispatch=useDispatch();

  // get redux state to check already login or not
  let redux_state=useSelector((state)=>state);




  const [showPopup, hidePopup] = useState(false);
  const [hide_password, sethidepassword] = useState(true)
  const [userdetails, set_userdetails] = useState({

    email: "",
    pass: "",

  })
  let select_btn = document.getElementById('btn_id_login');

  
  const navigate = useNavigate()
 


  useEffect(() => {

    // check already logged in or not

    // if(redux_state.sample.login_details){

    //    return navigate("/Dashboard") 
    //   }

    let one = setTimeout(() => {

      let random = ["mystyle1_Lo", "mystyle2_Lo", "mystyle3_Lo"]
      let number = Math.floor(Math.random() * 3)
      let bb = document.getElementById("innerContainer_right_Lo")
      if (bb) {

        bb.classList.add(random[number]);
      }

    }, 0);

    let two = setTimeout(() => {

      let dd = document.getElementById("title")

      if (dd) {
        dd.classList.add("drop");
      }
    }, 0)




    return () => {

      clearTimeout(one);
      clearTimeout(two);

    }

  }, [])

  

  const close_popup = () => {
    hidePopup(true)
  }



  const OnchangeText = (e) => {

    set_userdetails({
      ...userdetails,
      [e.target.name]: e.target.value.trim()

    })
  }
 


  const Submit = async () => {
 
    let email_reg = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    let result_email = email_reg.test(userdetails.email);


    let pass_reg = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/
    let result_pass = pass_reg.test(userdetails.pass)

    if (userdetails.email === "") {
      Toasting("Enter Email", "error")
    } else if (!result_email) {
      Toasting("Enter Valid", "error")
    } else if (userdetails.pass === "") {
      Toasting("Enter Password", "error")
    } 
    else if(!result_pass){
      Toasting("PassWord Not Strong", "error")
    }
    
    else {
      navigate("/PortFolio")
      //    //start loading in button
      // select_btn.innerText = "";
      // let div = document.createElement("span");
      // div.classList.add("loader")
      // select_btn.appendChild(div);

      // const user = {
      //   Email: userdetails.email,
      //   Password: userdetails.pass,
      // };  

      // let result = await Axios("/Login", user)

      // //  //reomve spinner
      // let div2 = document.getElementsByClassName("loader");
      // div2[0].remove();
      // select_btn.innerText = "Login"

      // if (result.data === "PassWord Invalid") {
      //   Toasting("Password Incorrect", "error")
      // } else if (result.data === "Email dose not exist") {
      //   Toasting("Email Not Exist", "error")
      // } else if (result.data.message === "successfully login") {
      
      //   // localStorage.setItem("details", [result.data.token,result.data.details[0],result.data.details[2].data[0]]);
      //   dispatch( store_user_details([result.data.token,result.data.details[0],result.data.details[2].data[0]]))
      //   navigate("/Dashboard")
      // }

    }

  }
 
  return (
    <AuthContainer>
      <div id="innerContainer">


        <div id="innerContainer_left_Lo">
          <h1 className='title' id='title'>Log In</h1>



          <Input typeOf="auth"name="email" onChange={(e) => OnchangeText(e)} icon={faUser} className_A='phone' placeholder="email" type="text" />


          <Input typeOf="auth" name="pass" onChange={(e) => OnchangeText(e)} type={hide_password ? "password" : "text"} icon={!hide_password ? faEye : faEyeSlash} onClick={() => sethidepassword(!hide_password)} className_A='password' placeholder="pass" />


          <Button id="btn_id_login" name="Login" className_A='btn' onClick={Submit} />
          <Button name="Forgot Pass?" onClick={close_popup} className_A='normal_btn' />

        </div>

        <div id="innerContainer_right_Lo"></div>
      </div>

      <div className='bottom_container'>

        <Button name="Register" className_A='btnn register' onClick={() => navigate("/Register")} />
      </div>

      {showPopup ? <Popup innerpopup={"popup_inner_login"} typeOf="popuplogin" close={() => hidePopup(false)} /> : null}
      <ToastContainer  hideProgressBar={true} />
    </AuthContainer >
  );
}

export default Login;