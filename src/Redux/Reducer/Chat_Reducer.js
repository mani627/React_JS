const inistate = {
    data: []
};


// store user
export const store_chat_username = (state = inistate, action) => {

    switch (action.type) {
        case "store_chat_username":{

          
       
            if(state.data[0]&&state.data[0].room=== action.payload.room){
             
                    return state
                
               
            }else{
                return {

                    ...state, data: [{name: action.payload.name, room:action.payload.room}]
                };
            }
           
        }
           


    

        default:
            return state
    }
}


const inistate2 = {
    data: []
};



// store rooms
export const store_rooms= (state = inistate2, action) => {

    switch (action.type) {
        case "store_rooms":{
            if(state.data.indexOf(action.payload)!== -1){
                return state
            }else {
                return {

                    ...state, data: [action.payload,...state.data]
                };
            }
        }

          
       
          
                
            
           
        
           


    

        default:
            return state
    }
    
}
