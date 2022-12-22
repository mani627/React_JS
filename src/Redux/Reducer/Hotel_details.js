import { PURGE } from "redux-persist";
const inistate = {
    data: []
};

export const hotel_detail = (state = inistate, action) => {

    switch (action.type) {
        case "fetch_hotels":
            return {

                ...state, data: action.payload
            };


        case PURGE:
            return inistate

        default:
            return state
    }
}

const inistate2 = {
    data: []
};

export const admin_edit_hotel = (state = inistate2, action) => {
    console.log(action.payload);
    switch (action.type) {
        case "admin_edit_hotel":
            return {

                ...state, data: [action.payload]
            };
        case "admin_edit_hotel_empty":
            return {

                ...state, data: []
            };


        default:
            return state
    }
}