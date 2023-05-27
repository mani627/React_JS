

const inistate2 = {
    data: []
};

export const Lib_User_Details = (state = inistate2, action) => {
   
    switch (action.type) {
        case "Lib_User_Details":
            return {

                ...state, data: [...action.payload]
            };

            

        


            case "DeleteAll_Lib":{
               

                return {

                    ...state, data: []
                };
    
            }
            
            
            


        default:
            return state
    }
}