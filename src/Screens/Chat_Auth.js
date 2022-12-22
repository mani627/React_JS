import React, { useState } from 'react'
import "../Css/chat_auth.css"
import { useNavigate,createSearchParams } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Toasting from '../Components/Toast';
import {store_chat_username} from "../Redux/Action/Chat_Actions";
import { useDispatch, useSelector } from "react-redux";



function Chat_Auth() {

  const [username,setusername]=useState("")
  




  let navigate=useNavigate()


  const entername=(e)=>{
setusername(e.target.value)
  }


const enter=()=>{
  if(username===""){
    Toasting("Enter Name", "error")
  }else {
    
    navigate({
      pathname:`/Chat_Room`,

      search:createSearchParams({
      name:username
    }).toString()

  })
  }
 
}


  return (
    <div className='gradient_div'>


<div className='Auth_div_main'>

<div className='title_chat_auth'>Log In</div>


<input onChange={(e)=>entername(e)} className='entername_chat' placeholder='Name'/>

<a className="chat_auth_btn" onClick={()=> enter()} >Enter</a>
 

</div>
<ToastContainer hideProgressBar={true} />
    </div>
  )
}

export default Chat_Auth