import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from 'react';
import "../Css/Login_Css.css";
import "../Css/Register_Css.css";
import "../Images/Login_right.jpg";
import "../Css/portfolio.css";



const InputPort = ({...rest }) => {

    
    return (

    



            <input className="input_contact" min={3} max={100}  {...rest}/>


    )
}

export default React.memo(InputPort);