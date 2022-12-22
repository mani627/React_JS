
import { Axios } from "../../Axios/Axios";

export const dash_count_increase_hotel=(numbers)=>{
   
    return{
        type:"change state hotel",
        payload:numbers
    }
}
export const dash_count_increase_cities=(numbers)=>{
    console.log(numbers);
    return{
        type:"change state cities",
        payload:numbers
    }
}
export const dash_count_increase_users=(numbers)=>{
   
    return{
        type:"change state users",
        payload:numbers
    }
}


export const store_user_details=(data)=>{

    return{
        type:"set users details",
        payload:data
    }
}


export const feth_hotels=()=>{
    return async function(dispatch,getState){
        const response =await Axios("/Get_Hotels", null,"get");
       console.log(response);
       if(response.data){
        dispatch({type:"fetch_hotels",payload:response.data})
       }

  
    }
}


//USER_LOGOUT

export const clear_and_logout=(data)=>{
    

    return{
        type:"USER_LOGOUT"
       
    }
}

export const test=()=>{
    return{
        type:"test"
       
    }
}


export const admin_edit_hotel=(data)=>{
    
    return{
        type:"admin_edit_hotel",
        payload:data
       
    }
}
export const admin_edit_hotel_empty=(data)=>{
    
    return{
        type:"admin_edit_hotel_empty",
     
       
    }
}


// export const feth_hotels=(data)=>{
//     return{
//         type:"fetch_hotels",
//         payload:data
//     }
// }