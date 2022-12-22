import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import { Axios } from "../Axios/Axios";
import Toasting from '../Components/Toast';
import "../Css/Popup_Css.css";
import Input from '../Components/Input';
import Timeout from './Timeout';

const Popup = ({ innerpopup, typeOf, close ,extra}) => {
    const [userdetails, set_userdetails] = useState({
        email_forgot: "",
        otp: "",
        pass: ""
    })
    let email = "";
    let select_btn = document.getElementById('btn_id_otp');
    let select_btn2 = document.getElementById('btn_id2_change');




    const [check, setcheck] = useState(true)
    const [clearinterval, set_clearinterval] = useState(true)
    const [show_rechange_password, setshow_rechange_password] = useState(false)
    const [recieved_otp, setrecieved_otp] = useState("")


    useEffect(() => {
        let bb = document.getElementsByClassName(innerpopup);


        for (const box of bb) {
            setTimeout(() => { box.classList.add("popup_inner_login2") }, 0)

        }

        return () => {
            for (const box of bb) {
                box.classList.remove("popup_inner_login2");
            }
        }
    }, [])




    const changestate = async () => {
       
        // document.getElementById("sendotp").checked = true
        // set_clearinterval(false)
        // setTimeout(() => { setcheck(true) }, 0)
        

        let pass_reg = /^([a-zA-Z0-9]){4,20}@([a-zA-Z0-9]){3,10}\.([a-z]){3,8}$/
        let result_pass = pass_reg.test(userdetails.email_forgot)
        if (userdetails.email_forgot === "") {
            Toasting("Enter Email", "error")
          

        }
        else if (!result_pass) {
            Toasting("Enter Valid Email", "error")
         
        } else {
         
            //start loading in button
            select_btn.innerText = "";
            let div = document.createElement("span");
            div.classList.add("loader")
            select_btn.appendChild(div);

            const user = {
                Email: userdetails.email_forgot,
                types: "firstcheck"
            };
            let result = await Axios("/ChangePassword", user)

            if (result.data === "Email Not Exist") {
                
                //reomve spinner
                let div = document.getElementsByClassName("loader");
                div[0].remove();
                select_btn.innerText = "Send OTP"
                
                Toasting("Email not Registered", "error")
              
            } else if(result.data.message === "Something Wrong in email"){
                let div = document.getElementsByClassName("loader");
                div[0].remove();
                select_btn.innerText = "Send OTP"
               
                Toasting("Email not Send", "error")
              
            }
            
            else {
               // reomve spinner
                let div = document.getElementsByClassName("loader");
                div[0].remove();
                select_btn.innerText = "Send OTP"

                document.getElementById("sendotp").checked = true
                set_clearinterval(false)
                setTimeout(() => { setcheck(true) }, 0)
                setrecieved_otp(result.data.otp.toString())

            }

        }

    }


    const changepassword = async () => {


        let pass_reg = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/
        let result_pass = pass_reg.test(userdetails.pass)
        if (!result_pass) {
            Toasting("Enter Strong Password", "error")
            let selecting = document.getElementById('pass_error')
            selecting.classList.remove("hide_error")
            selecting.classList.add("show_error")
            selecting.style.color = "#ff6347"
            selecting.style.marginTop = "0%"
        } else {

            //start loading in button
            select_btn2.innerText = "";
            let div = document.createElement("span");
            div.classList.add("loader")
            select_btn2.appendChild(div);

            const user = {
                Email: document.getElementsByName('email_forgot')[0].value,
                types: "changepassword",
                Password: userdetails.pass
            };
            

            let result = await Axios("/ChangePassword", user)
            if (result.data === "Changed") {

                //reomve spinner
                let div = document.getElementsByClassName("loader");
                div[0].remove();
                select_btn2.innerText = "Change"

                Toasting("Password Changed", "success")
                setTimeout(() => { close() }, 2000)
            } else {
                //reomve spinner
                let div = document.getElementsByClassName("loader");
                div[0].remove();
                select_btn.innerText = "Change"
               
            }
        }
    }


    const OnchangeText = (e, otpmax) => {

        if (otpmax === "otpmax" && userdetails.otp != "") {
            let regex = /^\d{0,4}$/
            let regex_result = regex.test(e.target.value.trim())

            if (regex_result) {
                set_userdetails({
                    [e.target.name]: e.target.value.trim()
                })
            } else {
                return null
            }
        } else if (otpmax === "otpmax" && userdetails.otp === "") {

            set_userdetails({
                otp: e.target.value.trim()
            })


        }
        else if (otpmax === "pass") {
            set_userdetails({
                pass: e.target.value.trim()
            })
        } else {
            set_userdetails({
                email_forgot: e.target.value.trim()
            })
        }

    }



    const closediv = () => {

        if (recieved_otp === userdetails.otp) {
            document.getElementById("sendotp").checked = false;
            set_clearinterval(true)
            setTimeout(() => { setcheck(false) }, 0)
            document.getElementById("rechange_password").disabled = false
            document.getElementById("rechange_password").checked = false
            
        } else {
            Toasting("Invalid OTP", "error")
        }

    }

    const close_popup_common=()=>{
   
            let div = document.getElementsByClassName("loader");
    
        if(div.length!==0){
            div[0].remove()
            select_btn.innerText = "Send OTP"
        }
          
           close()}
    



    return (
        // id="sendotp"
        <div className='popup_bg'>
            <input type="checkbox" id="sendotp" disabled={check} />
            <input type="checkbox" id="rechange_password" disabled={true} />
            <div className={innerpopup}>
                <div onClick={() => close()} className="close_popup_main">x</div>
                {/* popup Common title */}
                <p className='popup_title'>{typeOf==="popup_delete_cnfrm"?"Want to Delete?":typeOf==="popuplogin"?"ForGot Password":typeOf==="LogOut"?"Are u Sure ?":null}</p>
               {/* Inner Conrent of popup */}
                {typeOf === "popuplogin" ?
                    <>
                        <input type="checkbox" id="sendotp"  />
                        {/* Input for email to reset password */}
                        <Input typeOf="auth" maxlength="100" value={userdetails.email_forgot} className_A='popuplogininput' placeholder="email" name="email_forgot" onChange={(e) => OnchangeText(e, "email")} />
                        <div className='popuplogininput_icondiv'>
                            <FontAwesomeIcon icon={faExclamationCircle} color="#A5885D" style={{ fontSize: "0.7rem" }}></FontAwesomeIcon>
                            <p>enter mail id to recieve OTP </p>
                        </div>
                        <label for="sendotp" id="btn_id_otp" className='btn' onClick={!clearinterval ? null : changestate}>Send OTP</label>



                        <div className="rechange_password_div">
                            <p onClick={close_popup_common} className="close_popup_main"><div>x</div></p>
                            <p className='popup_title'>Change Password</p>


                            {/* input for change passowrd */}
                            <Input typeOf="auth" className_A='popuplogininput' placeholder="pass" name="pass" onChange={(e) => OnchangeText(e, "pass")} />

                            <div className='popuplogininput_icondiv'>
                                <FontAwesomeIcon icon={faExclamationCircle} color="#A5885D" style={{ fontSize: "0.7rem" }}></FontAwesomeIcon>
                                <p>Require Uppercase Lowercase Numeric</p>
                            </div>
                            <label className='btn' id="btn_id2_change" onClick={changepassword} >Change</label>
                        </div>

                        <div className='enterotp_div'>
                            <div className='enterotp_div_from_top'>



                                <div className="title_timer_div">
                                    {/* show /  hide timeout */}
                                    <div className='timeout'>{clearinterval === true ? null : <Timeout close2={close} />}</div>
                                    <p className='popup_otp_title'>Enter OTP</p>
                                </div>

                                {/* Enter OTP */}
                                <Input className_A='popuplogininput2' value={userdetails.otp} name="otp" onChange={(e) => OnchangeText(e, "otpmax")} placeholder="OTP" />
                                {/* <Button name="Ok" className_A='btn' onClick={()=>setshow_rechange_password(true)} /> */}
                                <label for="rechange_password" className='btn'  onClick={closediv}>Ok</label>

                            </div>
                        </div>
                    </>
                    : typeOf==="popup_delete_cnfrm"?
                    <div className="admin_delete_popup_main">
                        {extra}
                        <label onClick={() => close()} style={{padding:"0.9% 12.9%",display:"flex",justifyContent:"center",alignItems:"center", color:"rgb(65, 65, 65)",cursor:"pointer"}}>Cancel</label>
                    </div>
                    // logout section
                    :typeOf==="LogOut"?
                    <div className="admin_delete_popup_main">
                        
                        {extra}
                        <label onClick={() => close()} style={{padding:"0.9% 12.9%",display:"flex",justifyContent:"center",alignItems:"center", color:"rgb(65, 65, 65)",cursor:"pointer"}}>Cancel</label>
                    </div>
                    :null}


            </div>
            <ToastContainer autoClose={2000} hideProgressBar={true} />
        </div>
    )
}

export default React.memo(Popup);


// background-color: rgba(0, 0, 0, 0.61);

//backdrop-filter: blur(5px);