
import {useSelector} from "react-redux";


const inistate = false;
const counts={
    hotel:0,
    cities:0,
    users:0
}



export const dash_counts=(state=counts,action)=>{
   
   
    switch (action.type) {
        case "change state hotel":
            return {
                hotel:action.payload[0]+1,
                cities:action.payload[1],
                users:action.payload[2]  
            };
            case "change state cities":
            return {
                hotel:action.payload[0],
                cities:action.payload[1]+1,
                users:action.payload[2]  
            };
            case "change state users":
            return {
                hotel:action.payload[0],
                cities:action.payload[1],
                users:action.payload[2]+1  
            };
        default:
            return state;
    }
}