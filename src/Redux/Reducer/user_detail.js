import { PURGE } from "redux-persist";

const inistate = {
    login_details:null
};

export const user_detail=(state=inistate,action)=>{

    switch (action.type) {
        case "set users details":
            return {
                login_details:action.payload
            };


            case PURGE:
                return inistate
            
        default:
            return state;
    }
}