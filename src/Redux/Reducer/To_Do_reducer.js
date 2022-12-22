const inistate2 = {
    data: []
};

export const add_To_Do = (state = inistate2, action) => {
   
    switch (action.type) {
        case "add_To_Do":
            return {

                ...state, data: [...action.payload,...state.data]
            };

            

            case "delete_To_Do":{
               let spliced= state.data.splice(action.payload,1)


                return {

                    ...state, data: [...state.data]
                };
            }


            case "DeleteAll":{
                state.data.length=0

                return {

                    ...state, data: []
                };
    
            }
            
            
            


        default:
            return state
    }
}