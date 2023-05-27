import { PlusOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';
import React from 'react';
import 'react-toastify/dist/ReactToastify.css';
import "../Css/To-Do.css";
import { useDispatch, useSelector } from "react-redux";
import{add_To_Do,delete_To_Do,DeleteAll} from "../Redux/Action/To_Do"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Toasting from '../Components/Toast';
import { useEffect } from 'react';

function To_Do() {
    const usedispatch=useDispatch();
    const redux_state = useSelector((state) =>  state  );


    
  const [width, setWindowWidth] = React.useState(0);

  React.useEffect(() => {

    updateDimensions()

    window.addEventListener('resize', updateDimensions);
    return () =>
      window.removeEventListener('resize', updateDimensions);
  }, [])


  const updateDimensions = () => {
    const width = window.innerWidth
    setWindowWidth(width)
  }

    
//   const [username,setusername]=useState("")
  
useEffect(()=>{

  if(redux_state.add_To_Do.data.length!=0){
    document.getElementsByClassName("To_Do_Delete_all")[0].style.visibility="visible"
document.getElementsByClassName("To_Do_Delete_all")[0].style.bottom="5%"
  }

},[])


const save=()=>{

    // console.log("kjnkjb")
  let typed= document.getElementsByClassName("to_do_input")[0].value
  if(typed===""){
    Toasting("Enter Something", "error")
  }else{
let colors=["#21d0ff","#f37e2e","#4300fe","#fa00fc"]

let random=Math.floor((Math.random() * 4))
   
usedispatch(add_To_Do([{data:typed,color:colors[random]}]))

console.log(redux_state.add_To_Do.data.length)
document.getElementsByClassName("to_do_input")[0].value=""

document.getElementsByClassName("To_Do_Delete_all")[0].style.visibility="visible"
document.getElementsByClassName("To_Do_Delete_all")[0].style.bottom="5%"

  }

  
}


const Delete=(i)=>{

  let myPromise = new Promise(function(myResolve, myReject) {
    // "Producing Code" (May take some time)
    document.getElementById(i).style.marginRight="30%"

    setTimeout(()=>{
      myResolve(); 
    },100)
     // when successful
     
    });



 // document.getElementsByClassName("to_do_list_single")[i].style.marginRight="20%";

console.log(document.getElementById(i))

myPromise.then(()=>{

  document.querySelectorAll(".to_do_list_single").forEach((e,i)=>{
  
    e.style.marginRight="0px"
  }) 

 
  setTimeout(()=>{



    usedispatch(delete_To_Do(i) )
    if(redux_state.add_To_Do.data.length===0){
    
  document.getElementsByClassName("To_Do_Delete_all")[0].style.bottom="0%"
  setTimeout(()=>{
    document.getElementsByClassName("To_Do_Delete_all")[0].style.visibility="hidden"
  },100)
  // 
    }

  },200)

})

//console.log( document.getElementsByClassName("to_do_list_single")[i])
  // for(i=0;i<document.getElementsByClassName("to_do_list_single").length;i++){

  //   console.log(document.getElementsByClassName("to_do_list_single")[i])

  //   if(i===)
  // }


//  let selectall= document.querySelectorAll(".to_do_list_single")
//  selectall.forEach((e,index)=>{
//   console.log(e,index)
//   // if(i===index){
//   //   console.log(index,i)
//   // }
//  })
 

 console.log()
 // document.getElementsByClassName("to_do_list_single")[i].style.marginRight="0%"
 // alert(i)
}


const Delete_All=()=>{
  usedispatch(DeleteAll() )
  if(redux_state.add_To_Do.data.length===0){
    document.getElementsByClassName("To_Do_Delete_all")[0].style.bottom="0%"
setTimeout(()=>{
  document.getElementsByClassName("To_Do_Delete_all")[0].style.visibility="hidden"
},100)
  }
}




  return (
  <div className='to_do_bg'>
    <div className='to_do_main_div'>
{/* title */}
<div className='to_do_main_title'>Add Your List Here</div>

{/* input sec */}
<div className='to_do_input_div'>
<input className='to_do_input' placeholder='Add here..' />
<span onClick={save}>
<PlusOutlined style={{
                fontSize: 24,
                color: "red",

            }} 
            
            />
</span>
</div>



{/* To-do list scroll */}
<div  className='to_do_list_scroll'>


{/* single to-do list */}

{redux_state.add_To_Do.data.map((e,i)=>{
    return(



        <div style={{backgroundColor:e.color}} id={i} className='to_do_list_single'>
          { width<768?    e.data.length>20? <div>{e.data.slice(0,20)}...</div>:  <div>{e.data}</div>:  e.data.length>24? <div>{e.data.slice(0,24)}...</div>:  <div>{e.data}</div>  }  

    <span onClick={()=>Delete(i)}>
    <i className='fa fa-trash' style={{color:"white"}}></i>
   
    
    </span>
</div>
    )
})}



</div>


    </div>
  
    <a className="To_Do_Delete_all" onClick={ Delete_All} >Delete All</a>
    <ToastContainer hideProgressBar={true} />
  </div>
  )
}

export default To_Do