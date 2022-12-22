import React from 'react';




const Button = ({ name,className_A,...rest}) => {
   

    return (

        <button   className={className_A} {...rest}>{name}</button>
    )
}

export default React.memo(Button);
