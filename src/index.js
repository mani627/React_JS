import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { createStore,applyMiddleware ,compose} from 'redux';
import {reducers} from './Redux/Reducer';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk'
import {persistReducer,persistStore} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
// import persistReducer from 'redux-persist/es/persistReducer';
import {reducers_presist,rootReducer } from './Redux/Reducer/To_Do_reducer_index';
import { PersistGate } from 'redux-persist/integration/react';
import autoMergeLevel2 from 'redux-persist/es/stateReconciler/autoMergeLevel2';
import {user_detail} from './Redux/Reducer/user_detail';
import {encryptTransform} from 'redux-persist-transform-encrypt'
import localStorage from 'redux-persist/es/storage';
const persistConfig={
  key:"main-root",
  storage:localStorage,
  // transforms: [
  //   encryptTransform({
  //     secretKey: 'mani',
  //     onError: function (error) {
  //       console.log("redux-encrypt error  ",error);
  //       // Handle the error.
  //     },
  //   }),
  // ],  
  blacklist:['hotelinfo','test','admin_edit_hotel']
  
}

// config rootreducer with persist
const persistedReducer=persistReducer(persistConfig,rootReducer);



const store2=createStore(persistedReducer,compose(applyMiddleware(thunk)));


export const persistor=persistStore(store2)


//const store=createStore(reducers_presist,applyMiddleware(thunk))

//mport reportWebVitals from './reportWebVitals';




const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <>
    <Provider store={store2}>
    <PersistGate loading={null} persistor={persistor}>
    <App /> 
    </PersistGate>
    </Provider>
  </>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();
