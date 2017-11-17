import {FETCH_MESSAGES} from '../constants/actionTypes';

export const fetchMessages = (state = [], action) => {
    switch (action.type) {
        case FETCH_MESSAGES:
            return action.payload || [];
        default:
            return state;
    }
};