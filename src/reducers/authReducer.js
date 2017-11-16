import {REGISTER_USER, FETCH_AUTH_TOKEN} from '../constants/actionTypes';

export const registeredUser =  (state = {}, action) => {
    switch (action.type) {
        case REGISTER_USER:
            return action.payload;
        default:
            return state;
    }
};

export const fetchedAuthToken =  (state = null, action) => {
    switch (action.type) {
        case FETCH_AUTH_TOKEN:
            return action.payload;
        default:
            return state;
    }
};