import React from 'react';
import '../Css/Footer_Css.css'



const Footer = ({ name,className_A,typeOf,...rest}) => {
   

    return (

        <div className={typeOf==="dash"?'reach_footer_dash':'reach_footer_admin'} >
            <div className='reach_footer_logo'><p>Follow Us</p>
            <div> <i class="fab fa-facebook"></i> <i class="fab fa-twitter"></i> <i class="fab fa-whatsapp"></i></div>
            </div>
           
            <div className='reach_footer_copyright'><p>Terms of use    &nbsp;   &nbsp; Private Policy</p>
            <div>Copyright © 2022 All Rights Reserved </div>
            </div>
        </div>
    )
}

export default React.memo(Footer);
