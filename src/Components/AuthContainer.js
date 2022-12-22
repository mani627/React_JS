import React from 'react';
// import "../Css/Login_Css.css";
// import "../Css/Register_Css.css";
import "../Images/Login_right.jpg";



const AuthContainer = ({ children }) => {

   
    return (

        <div id="outer">
            <div id="bg_image">
                
                    {children}
           
            </div>
        </div>
    )
}

export default AuthContainer;
