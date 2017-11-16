import {LOGGED_USER, FETCH_AUTH_TOKEN} from '../constants/actionTypes';

export const loggedUser =  (state = {}, action) => {
    switch (action.type) {
        case LOGGED_USER:
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