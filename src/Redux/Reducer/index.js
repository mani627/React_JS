import {combineReducers} from 'redux';
import { close_popup_Login_reducer } from './dash_reducer';
import { dash_counts } from './dash_reducer';


export const reducers=combineReducers({
  
    dash_count:dash_counts
})