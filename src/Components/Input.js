import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from 'react';
import "../Css/Login_Css.css";
import "../Css/Register_Css.css";
import "../Images/Login_right.jpg";




const Input = ({ className_A, icon = null,onClick,icon_type,typeOf, ...rest }) => {

    
    return (

        <div className= {typeOf==="auth"?'first_input':'first_input_dash'}>


            {icon != null ?<FontAwesomeIcon  onClick={onClick} icon={icon} color="#404040" className={icon_type==="dash_search"?'Dash_search_icon':icon_type==="dash_persons"? 'dash_persons':'icons_Re'}></FontAwesomeIcon> : 
            null}

            <input className={className_A} {...rest} />


        </div>
    )
}

export default React.memo(Input);
// <FontAwesomeIcon  onClick={onClick} icon={icon} color="#404040" className={icon_type==="dash_search"?'Dash_search_icon':icon_type==="dash_persons"? 'dash_persons':'icons_Re'}></FontAwesomeIcon> 