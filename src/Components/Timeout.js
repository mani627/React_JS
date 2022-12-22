import React, { useState, useEffect } from 'react';
import "../Css/Popup_Css.css"



const Timeout = ({ close2 }) => {
    const [sec, set_sec] = useState(59);
    const [minutes, set_minutes] = useState(1);



    useEffect(() => {
        let timer = setInterval(() => {

            set_sec(sec - 1);

            if (sec === 0 && minutes !== 0) {
                set_minutes(minutes - 1);
                set_sec(59);
            } else if (sec === 0 && minutes === 0) {
                close2()


            }
        }, 1000);

        return () => {
            clearInterval(timer)

        }
    }, [sec])

    return (

        <div className='timeout_font'>{minutes}:{sec < 10 ? `0${sec}` : sec}</div>
    )
}

export default React.memo(Timeout);
