import {LOADING_CHANGE_USER_NAME} from '../constants/actionTypes';

export const loading = (state = {}, action) => {
    switch (action.type) {
        case LOADING_CHANGE_USER_NAME:
            return {...state, changeUserName: action.payload};
        default:
            return state;
    }
};