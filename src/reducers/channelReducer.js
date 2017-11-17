import {FETCH_CHANNELS} from '../constants/actionTypes';

export const fetchChannel = (state = [], action) => {
    switch (action.type) {
        case FETCH_CHANNELS:
            return action.payload || [];
        default:
            return state;
    }
};