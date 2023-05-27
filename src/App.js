
import React from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import './App.css';
import Loading from './Components/Loading';
import './index.css';
const Login = React.lazy(() => import("./Screens/Login"));
const Register = React.lazy(() => import('./Screens/Register'));
const PortFolio = React.lazy(() => import('./Screens/PortFolio'));
const Admin = React.lazy(() => import('./Screens/Admin'));
const Admin_Create = React.lazy(() => import('./Screens/Admin_Create'));
const Admin_Edit = React.lazy(() => import('./Screens/Admin_Edit'));
const Chat_Auth = React.lazy(() => import('./Screens/Chat_Auth'));
const Chat_Room = React.lazy(() => import('./Screens/Chat_Room'));
const Chat_Area = React.lazy(() => import('./Screens/Chat_Area'));
const To_Do = React.lazy(() => import('./Screens/To-Do'));
const Lib_Login = React.lazy(() => import('./Screens/Lib_Login'));
const Lib_Main = React.lazy(() => import('./Screens/Lib_Main'));
const Lib_Admin = React.lazy(() => import('./Screens/Lib_Admin'));


function App() {





  return (
    <>
      <BrowserRouter>


        <Routes>

          <Route path="/" element={<React.Suspense fallback={<Loading />}><Login /></React.Suspense>} />
          <Route path="/Register" element={<React.Suspense fallback={<Loading />}><Register /></React.Suspense>} />
          <Route path="/PortFolio" element={<React.Suspense fallback={<Loading />}><PortFolio /></React.Suspense>} />

          <Route path="/Admin" element={<React.Suspense fallback={<Loading />}><Admin /></React.Suspense>} >
            <Route path="/Admin/" element={<Admin_Create />} />
            <Route path="/Admin/Admin_Edit" element={<Admin_Edit />} />

          </Route>

          {/* chat roots */}
          <Route path="/Chat_Auth" element={<React.Suspense fallback={<Loading />}><Chat_Auth /></React.Suspense>} />
          <Route path="/Chat_Room" element={<React.Suspense fallback={<Loading />}><Chat_Room /></React.Suspense>} />
          <Route path="/Chat_Area" element={<React.Suspense fallback={<Loading />}><Chat_Area /></React.Suspense>} />

          {/* redux to do LIST */}
          <Route path="/To_Do" element={<React.Suspense fallback={<Loading />}><To_Do /></React.Suspense>} />


          {/* book dictionary routes */}

          <Route path="/Lib_Login" element={<React.Suspense fallback={<Loading />}><Lib_Login /></React.Suspense>} />
          <Route path="/Lib_Main" element={<React.Suspense fallback={<Loading />}><Lib_Main /></React.Suspense>} />
          <Route path="/Lib_Admin" element={<React.Suspense fallback={<Loading />}><Lib_Admin /></React.Suspense>} />





        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;


//https://www.behance.net/gallery/99674311/Modern-Web-Login-Page
// #16A085
//#F4D03F 
//input border #4c4c4a
// #c0c0c0
//#A5885D  brown
//https://www.fabmood.com/brown-green-and-yellow-colour-combo-palette/

//link about vm vh- https://www.youtube.com/watch?v=jOsKp9gwfPc

//Tahoma -heading
//sub -Comic Sans MS
//rgb(255,130,67,0.4)-- fanta
//rgb(248,184,120)--- chcoc brown
//rgb(80,200,120)-- light green
//rgb(0,127,102) -- dark green
//rgb(255,183,197) --rose
//half gray--#282828
//yellow -#EFFD5F

// let select_btn = document.getElementById('btn_id');

//    //start loading in button
//             select_btn2.innerText = "";
//             let div = document.createElement("span");
//             div.classList.add("loader")
//             select_btn2.appendChild(div);


//  //reomve spinner
//                 let div = document.getElementsByClassName("loader");
//                 div[0].remove();
//                 select_btn2.innerText = "Change"



//<link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.12.1/css/all.css" crossorigin="anonymous">




// Persons count
// let persons=[1,2,3,4,5,6,7,8,9,10]

{/* <div  className='dash_dropdown_main1'>
<div onClick={ShowDrop} className='dash_dropdown_main2'><i class="fas fa-users"></i>  <span className='dash_dropdown_value'>  {drop_value}</span> <i id='drop_close_arrow' class="fas fa-angle-down"></i></div>
<div className='dash_drop_list_before'>
  <ul className='dash_drop_list_value_before'>
    {persons.map((e)=>
   <li>{e}</li>
    )}
  
  </ul>
</div>
</div> */}


// #F6BD60
// #F7EDE2
//#F5CAC3
// #84A59D
// #F28482

