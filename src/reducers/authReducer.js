import {LOGGED_USER, FETCH_AUTH_TOKEN, LOGOUT_USER, UPDATE_USER} from '../constants/actionTypes';

export const loggedUser =  (state = {}, action) => {
    switch (action.type) {
        case UPDATE_USER:
            return Object.assign({}, state, action.payload);
        case LOGGED_USER:
            return action.payload;
        case LOGOUT_USER:
            return {};
        default:
            return state;
    }
};

export const fetchedAuthToken =  (state = null, action) => {
    switch (action.type) {
        case FETCH_AUTH_TOKEN:
            return action.payload;
        case LOGOUT_USER:
            return null;
        default:
            return state;
    }
};