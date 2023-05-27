import React from 'react';
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";


const useCheck_Local_Storage = (url) => {
    
  const [data, setData] = useState(null);
  const redux_state = useSelector((state) =>  state  );
  const navigate = useNavigate();

 React. useEffect(()=>{
    if(redux_state.Lib_User_Details.data.length===0){
      navigate("/Lib_Login")
    }
   
  })

  return [data];
};

export default useCheck_Local_Storage;