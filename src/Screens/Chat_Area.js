import React, { useEffect, useState,useRef } from 'react'
import "../Css/chat_auth.css"
import { useNavigate,useLocation } from "react-router-dom";
import io from 'socket.io-client';
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Toasting from '../Components/Toast';

// https://chat2-etwf.onrender.com
// http://localhost:8080

const socket=io.connect("https://chat-book-api.onrender.com")


function Chat_Area() {

  const location = useLocation();
  

const[recieve_mssg,setrecieve_mssg]=useState([])
const messagesEndRef = useRef(null);
const wrapperRef = React.useRef(null);

const usedispatch=useDispatch();

let navigate=useNavigate();
const redux_state = useSelector((state) =>  state  );





const handleClickOutside=(event)=>{

  if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
   
    socket.emit("cancel_typing")
    
  
}
}

useEffect(()=>{

  (async()=>{



   await socket.emit("join_group",{room:location.state.room,user:location.state.name})
  
    document.addEventListener('click', handleClickOutside, true);
   
   
  
  
    await socket.on("toall",(data)=>{
   
        document.getElementsByClassName("typing_chat")[0].style.visibility="hidden"
    document.getElementsByClassName("typing_chat")[0].style.bottom="8%"
    document.getElementsByClassName("typing_chat")[0].innerHTML=""
  // alert(data.mssg)
  setrecieve_mssg((prev)=>[...prev,{mssg:data.mssg, user:data.user,time:data.time}])
  
    messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
  
  
      })
  
  
      await  socket.on("toall_join_noti",(data)=>{
      
        Toasting(`${data.user} has Joined`, "success")
  
  
      })
  
  
  
      
      await socket.on("toall_typing",(data)=>{
    
  
        document.getElementsByClassName("typing_chat")[0].style.visibility="visible"
        document.getElementsByClassName("typing_chat")[0].style.bottom="14%"
        document.getElementsByClassName("typing_chat")[0].innerHTML=`${data.user} typing...`
     
        
            })
  
            
  
  
            await socket.on("toall_cancel_typing",(data)=>{
              document.getElementsByClassName("typing_chat")[0].style.visibility="hidden"
              document.getElementsByClassName("typing_chat")[0].style.bottom="8%"
              document.getElementsByClassName("typing_chat")[0].innerHTML=""
             
                
                    })


                    await  socket.on("toall_leave",(data)=>{
      
                      Toasting(`${data} has Left`, "error")
                
                
                    })
                


                    
  

  })()

                  


          return () => {
            document.removeEventListener('click', handleClickOutside, true);
            socket.emit("leave",{room:location.state.room,user:location.state.name})
          // socket.disconnect()
        };

},[messagesEndRef])





const sendmssg=()=>{
  // document.getElementsByClassName("typing_chat")[0].style.visibility="visible"
  // document.getElementsByClassName("typing_chat")[0].style.bottom="14%"

  if(document.getElementsByClassName("send_mssg_input")[0].value===""){
    Toasting("Enter Mssg", "error")
  }else{


// Capture current datetime
    const now_time = new Date()
    .toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    })
    .toLowerCase();


    const now_year = new Date().getFullYear().toString().slice(-2);




    setrecieve_mssg((prev)=>[...prev,{mssg:document.getElementsByClassName("send_mssg_input")[0].value, user:location.state.name,time:`${now_time}    ${new Date().getMonth()+1}/${now_year}`}])
 
    // console.log(document.getElementsByClassName("send_mssg_input")[0].value)
    socket.emit("send",{mssg:`${document.getElementsByClassName("send_mssg_input")[0].value}`,user:location.state.name,room:location.state.room,time:`${now_time}    ${new Date().getMonth()+1}/${now_year}` })
    
    setTimeout(()=>{
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" ,inline:"end"});
      document.getElementsByClassName("send_mssg_input")[0].value=""
    },100)
    
  }
 

 
}
const typing=()=>{
  socket.emit("typing",{user:location.state.name,room:location.state.room})
}




  return (
    <div className='gradient_div'>


<div className='chat_area_div'>



<div className='mssg_area'>



{recieve_mssg.length!==0?

recieve_mssg.map((e,i)=>{

// console.log(typeof e.user,typeof redux_state.store_chat_username.data[0].name)
  // usestate user === local storage user 
  if(e.user===location.state.name){
    return(
  // me
  <div className='mssg_section_me'>
     

     
     <div>   {e.mssg}</div>
  </div>
    )
  }else {
    return(
  // others
  <div className='mssg_section'>
      <img src={require("../Images/empty.png")} className="chat_img_prfile"/>
     
    
    <div>  <span style={{fontWeight:"bold"}}>{e.user}</span> <br/>{e.mssg} </div>
    <span className='chat_time'>{e.time}</span>
     
   
  </div>
    )
  }
  
})


:null
}


<div className='extra' ref={messagesEndRef} />

</div>

<p className='typing_chat'></p>

<div className='send_mssg_div'>

<input className='send_mssg_input' placeholder='Type...' onKeyDown={typing} ref={wrapperRef}/>
<a className="chat_auth_btn_create" style={{marginRight:"3%"}} onClick={sendmssg} >send</a>
</div>


</div>

<ToastContainer hideProgressBar={true} />

    </div>
  )
}

export default Chat_Area