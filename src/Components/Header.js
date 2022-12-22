import React from "react";
import { NavLink } from "react-router-dom";
import "../Css/Nav_Css.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";


 function Header({colors,logout}) {
  const wrapperRef = React.useRef(null);
  const [width, setWindowWidth] = React.useState(0);


const handleClickOutside=(event)=>{

  if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
   // document.getElementsByClassName("nav_drop")[0].style.display="none"
console.log(event.target)

    if(width < 768 ){
      document.getElementsByClassName("nav_drop2")[0].style.display="none"
      document.getElementsByClassName("nav_drop2")[0].style.height="0%"
    }else{
      document.getElementsByClassName("nav_drop")[0].style.display="none"
    }

  
}
}

  React.useEffect(() => {
    document.addEventListener('click', handleClickOutside, true);
    return () => {
        document.removeEventListener('click', handleClickOutside, true);
    };
}, [width]);

  
  // let redux_state = useSelector((state) => state);
  // let loginDetails = redux_state.sample.login_details;
 
//  console.log( loginDetails[2]);
  let navigate=useNavigate()
 

  // detect window screen size
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




  let active_768 = { textDecoration: "none", fontSize: "0.9rem",  paddingTop: "2%", paddingBottom: "1%", textAlign: "center", borderRadius: "2px", borderBottomStyle: "solid", borderTopColor: "green", color: "#282828", letterSpacing: "2px" };
  let inactive_768 = { textDecoration: "none", fontSize: "0.9rem", paddingTop: "6%", paddingBottom: "2%", textAlign: "center", borderRadius: "2px", letterSpacing: "2px",color:"rgb(40, 40, 40)" };


  let active = { textDecoration: "none", fontSize: "0.8rem", width: "13%", paddingTop: "2%", paddingBottom: "2%", textAlign: "center", borderRadius: "2px",  borderBottomColor: "white",borderBottomStyle:"solid" };
  let inactive = { textDecoration: "none", fontSize: "0.8rem", width: "13%", paddingTop: "2%", paddingBottom: "2%", textAlign: "center", borderRadius: "2px" };
  // if (!loginDetails ) {
  //   return navigate("/")
  // }

  const close=()=>{
   document.getElementById("nav_check").checked=false
  }

  const Goto=()=>{
    
   
    if(width < 768 ){
      document.getElementsByClassName("nav_drop2")[0].style.transition=" height 0.4s ease-in-out"
      document.getElementsByClassName("nav_drop2")[0].style.display="inline-flex"
      document.getElementsByClassName("nav_drop2")[0].style.height="20%"
    }else{
      document.getElementsByClassName("nav_drop")[0].style.display="inline-flex"
    }
  }
  
  return (
    <>
      <input type="checkbox" id="nav_check" />
      <div className="nav" style={{backgroundColor:`${colors}`}}>
        <div className="nav_left">Logo</div>
        <div className="nav_left2">
          <label for="nav_check" className="nav_hamburger">
            <div className="nav_top"></div>
            <div className="nav_middle"></div>
            <div className="nav_last"></div>
          </label>
        </div>

        <div className="nav_right">
         

          <a
          href="#home"
            className="nav_menu"
            id="nav_menu"
            style={ 
              width < 768 ? inactive_768 : inactive 
            }
            onClick={close}
            // to="/User"
          >
              Home
          </a>
          {/* Admin navigator */}
          {/* {loginDetails?parseInt( loginDetails[2] )=== 1 ?
            <NavLink
              className="nav_menu"
              id="nav_menu"
              style={({ isActive }) =>
                isActive ? width < 768 ? active_768 : active : width < 768 ? inactive_768 : inactive
              }
              to="/Admin"
            >
              {" "}
              Admin
            </NavLink>
            : null:null
          } */}
            
           

            <a
          href="#about_me"
            className="nav_menu"
            id="nav_menu"
            onClick={close}
            style={ 
              width < 768 ? inactive_768 : inactive 
            }
            // to="/User"
          >
              About Me
          </a>
           

          <a
          href="#resume"
            className="nav_menu"
            id="nav_menu"
            onClick={close}
            style={ 
              width < 768 ? inactive_768 : inactive 
            }
            // to="/User"
          >
            Resume
          </a>

         

          <a
          href="#contact"
            className="nav_menu"
            id="nav_menu"
            onClick={close}
            style={ 
              width < 768 ? inactive_768 : inactive 
            }
            // to="/User"
          >
             Contact Me
          </a>


          <a
              className="nav_menu projects"
              id="nav_menu"
              style={ 
                width < 768 ? inactive_768 : inactive 
              }
onClick={Goto}

            >
              {" "}
              MyApps
              
            </a>
            <div ref={wrapperRef} className={width < 768? "nav_drop2":"nav_drop"}>
             <span onClick={()=>{ navigate(`/Chat_Auth`)}} style={{cursor:"pointer"}}>Chat</span> 
             <span onClick={()=>{ navigate(`/To_Do`)}} style={{cursor:"pointer"}}>Redux ToDo List</span> 
            </div>



            <a
         
            className="nav_menu"
            id="nav_menu"
            onClick={()=>{
              document.getElementById("nav_check").checked=false
              logout()}}
            style={ 
              width < 768 ? inactive_768 : inactive 
            }
            // to="/User"
          >
             LogOut
          </a>
          

        </div>





        <div className="nav_side-nav"></div>
      </div>
    </>
  );
}

export default React.memo(Header);