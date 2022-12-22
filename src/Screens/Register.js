import { faEye, faEyeSlash, faHome, faUser, faVcard } from "@fortawesome/free-solid-svg-icons";
import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import Input from '../Components/Input';
import "../Css/Register_Css.css";
import "../Images/Login_right.jpg";
import Button from "../Components/Button";
import AuthContainer from "../Components/AuthContainer";
import { Axios } from "../Axios/Axios"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Toasting from '../Components/Toast'
// export const faAddressBook: IconDefinition;
// export const faContactBook: IconDefinition;
// export const faAddressCard: IconDefinition;
// export const faContactCard: IconDefinition;
// export const faVcard: IconDefinition;

const Register = () => {
    // toast.configure()
    const navigate = useNavigate()
    const [userdetails, set_userdetails] = useState({
        name: "",
        email: "",
        pass: "",
        city: ""
    })
    const [hide_password,sethidepassword]=useState(true)
    let select_btn = document.getElementById('btn_id_register');

 
    useEffect(() => {
        let one = setTimeout(() => {
            let random = ["mystyle1_Re", "mystyle2_Re", "mystyle3_Re"]
            let number = Math.floor(Math.random() * 3)
            let bb = document.getElementById("innerContainer_left_Re")
            if (bb) {

                bb.classList.add(random[number]);
            }

        }, 100);

        let two = setTimeout(() => {
            let dd = document.getElementById("title")

            if (dd) {
                dd.classList.add("drop");
            }
        }, 100)

        return () => {
            clearTimeout(one);
            clearTimeout(two);
        }

    }, [])


    const OnchangeText = (e) => {
        let check_attribute_pass = document.getElementById('pass_error').hasAttribute("style")
        if (check_attribute_pass) {

            let pass_reg = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,20}$/
            let result_pass = pass_reg.test(userdetails.pass)
            if (result_pass) {
                let selecting = document.getElementById('pass_error')
                selecting.classList.add("hide_error")
                selecting.classList.remove("show_error")
            }
        }

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

        if (userdetails.name === "") {


            Toasting("Enter Name", "error")

        } else if (!result_email) {


            Toasting("Enter Valid Email", "error")
        } else if (!result_pass) {
            Toasting("Enter Strong Password", "error")
            let selecting = document.getElementById('pass_error')
            selecting.classList.remove("hide_error")
            selecting.classList.add("show_error")
            selecting.style.color = "#ff6347"
            selecting.style.marginTop = "-3%"

        } else if (userdetails.city === "") {
            Toasting("Enter City", "error")
        }


        else {
            //start loading in button
            select_btn.innerText = "";
            let div = document.createElement("span");
            div.classList.add("loader")
            select_btn.appendChild(div);
            const user = {
                Name: userdetails.name,
                Email: userdetails.email,
                Password: userdetails.pass,
                city: userdetails.city
            };

            let result = await Axios("/Register", user)
        
            if (result.data === 0) {
               // reomve spinner
                let div = document.getElementsByClassName("loader");
                div[0].remove();
                select_btn.innerText = "Change"
                Toasting("Email Already Exist", "error")
            } else {
               
                // reomve spinner
                 let div = document.getElementsByClassName("loader");
                 div[0].remove();
                 select_btn.innerText = "Register"
                Toasting("Successfully Registered", "success")
                setTimeout(()=>{navigate("/")}, 2000)
                
            }

        }





    }



    return (<>
        <AuthContainer>
            <div id="innerContainer">




                <div id="innerContainer_left_Re"></div>
                <div id="innerContainer_right_Re">
                    <h1 className='title' id='title'>Register</h1>



                    <Input typeOf="auth" type="text" maxlength="50" icon={faUser} className_A='phone' name="name" onChange={(e) => OnchangeText(e)} placeholder="name" />


                    <Input  typeOf="auth" type="text" maxlength="100" icon={faVcard} className_A='password' name="email" onChange={(e) => OnchangeText(e)} placeholder="email" />


                    <Input  typeOf="auth"  onClick={()=>sethidepassword(!hide_password)} maxlength="20" icon={!hide_password?faEye:faEyeSlash} className_A='password' name="pass" onChange={(e) => OnchangeText(e)}  type={hide_password?"password":"text"}  placeholder="pass" />
                    <div className="hide_error" id='pass_error'>Require Uppercase Lowercase Numeric</div>
                    <Input  typeOf="auth" type="text" maxlength="50" icon={faHome} className_A='password' name="city" onChange={(e) => OnchangeText(e)} placeholder="city" />


                    <Button id="btn_id_register" onClick={Submit} name="Register" className_A='btn' />
                </div>
            </div>

            <div className='bottom_container_Re'>

                <Button name="Login" className_A='btnn register' onClick={() => navigate("/")} />
            </div>
            <ToastContainer hideProgressBar={true} />
        </AuthContainer>
    </>);
}

export default Register;