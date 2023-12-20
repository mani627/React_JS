import React from "react";

const Button = ({ name, className_A, ...rest }) => {
  return (
    <div >
      <button id="s" className={className_A} {...rest}>
        {name}
        {true? <div class="lds-ring"><div></div><div></div><div></div><div></div></div>:""}
      </button>
      
    </div>
  );
};

export default React.memo(Button);
