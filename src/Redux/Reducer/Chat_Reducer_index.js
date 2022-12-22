import { combineReducers } from 'redux';
import { store_chat_username } from './Chat_Reducer';
import {store_rooms} from "./Chat_Reducer"
import storage from 'redux-persist/es/storage';

       



export const reducers_presist=combineReducers({
  
    store_chat_username:store_chat_username,
    store_rooms:store_rooms
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

