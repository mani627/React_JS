import {combineReducers} from 'redux';
import { close_popup_Login_reducer } from './dash_reducer';
import {user_detail} from './user_detail';
import { hotel_detail,admin_edit_hotel } from './Hotel_details';


import storage from 'redux-persist/es/storage';

       




// const inistate2 = {
//     data:"mani"
// };

// export const test=(state=inistate2,action)=>{
//     console.log(action.payload);
//     switch (action.type) {
//         case "test":
//             return {
              
//                 ...state,data: "kandan"
//             };

           
           
//         default:
//             return state
//     }
// }

export const reducers_presist=combineReducers({
  
    sample:user_detail,
    hotelinfo:hotel_detail,
    admin_edit_hotel:admin_edit_hotel,
    

//    test:test
//    rootReducer:rootReducer
})
export  const rootReducer = (state, action) => {
    if (action.type === 'USER_LOGOUT') {
      
        // for all keys defined in your persistConfig(s)
        storage.removeItem('persist:main-root')
        // storage.removeItem('persist:otherKey')

        return reducers_presist(undefined, action);
    }
    return reducers_presist(state, action);
};

// const rootReducer = (state, action) => {
//     if (action.type === 'USER_LOGOUT') {
//       Object.keys(state).forEach((key) => {
//         storage.removeItem(`persist:main-root`);
//       });
//       state = undefined;
//     }
//     return reducers_presist(state, action);
//   };

