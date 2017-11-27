import {FETCH_USER, FETCH_AUTH_TOKEN, LOGOUT_USER, FETCH_ALL_USERS} from '../constants/actionTypes';

export const fetchedUser =  (state = {}, action) => {
    switch (action.type) {
        case FETCH_USER:
            return action.payload;
        case LOGOUT_USER:
            return {};
        default:
            return state;
    }
};

export const fetchedAllUsers =  (state = {}, action) => {
    switch (action.type) {
        case FETCH_ALL_USERS:
            return action.payload;
        case FETCH_USER:
            const users = {...state};
            users[action.payload.email] = action.payload;
            return users;
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