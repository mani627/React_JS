import React from 'react'
import "../Css/chat_auth.css"
import { useNavigate,useSearchParams } from "react-router-dom";
import {store_chat_username,store_rooms} from "../Redux/Action/Chat_Actions";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Toasting from '../Components/Toast';
import io from 'socket.io-client';
import { type } from '@testing-library/user-event/dist/type';





function Chat_Room() {
const[searchparams]=useSearchParams()
const [roomname,setroomname]=React.useState("")
const usedispatch=useDispatch();

const redux_state = useSelector((state) =>  state  );

// console.log(redux_state.store_chat_username.data[0].room)


    let navigate=useNavigate()
let rooms=[
{
    id:1,
    name:"wwe"
},

{
    id:2,
    name:"ttht"
},
{
    id:3,
    name:"zz"
},
]



const enterroom=(e)=>{
    setroomname(e.target.value)
      }


      const save=()=>{
    if(roomname===""){

    }
    // else if(redux_state.store_chat_username.data[0]&&redux_state.store_chat_username.data[0].room===roomname){
      
    //         Toasting("Already Room Exist", "error")
    //         console.log("2")
        
        
    // }
    
    
    else{
       
        usedispatch( store_rooms(roomname))
        usedispatch(store_chat_username({ name: searchparams.get("name"), room: roomname}))
       // socket.emit("join_group",roomname)
        navigate(`/Chat_Area`,
        
        { state: { name: searchparams.get("name"), room:roomname } }
        
        )
    }
      
       
      }
    

  return (
    <div className='gradient_div'>


<div className='Auth_div_main'>

<div className='title_chat_auth'>Group</div>


<input className='entername_chat' onChange={(e)=>enterroom(e)} placeholder='Name'/>

<a className="chat_auth_btn" onClick={()=>save()}>Create</a>
 

</div>
{/* <div className='room_available_div'>
{
    rooms.map((e,i)=>{

        return(

  <div className='room_available_di2'><p>{e.name}</p>
  <a className="chat_auth_btn_create" >Join</a>
  </div>  

        )
    })
}
</div> */}
<ToastContainer hideProgressBar={true} />
    </div>
  )
}

export default Chat_Room