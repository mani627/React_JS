import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from 'react';
import "../Css/Login_Css.css";
import "../Css/Register_Css.css";
import "../Images/Login_right.jpg";




const Input_admin = ({ className_A, icon = null, typeOf,onClick,icon_type, ...rest }) => {
  
    
    return (

        <div className='first_input_admin' >


            {/* {icon != null ? <FontAwesomeIcon  onClick={onClick} icon={icon} color="#404040" className={icon_type==="dash_search"?'Dash_search_icon':icon_type==="dash_persons"? 'dash_persons':'icons_Re'}></FontAwesomeIcon> : 
            null} */}

            <input  className={className_A} {...rest} />


        </div>
    )
}

export default React.memo(Input_admin);