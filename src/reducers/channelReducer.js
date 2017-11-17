import {ACTIVE_CHANNEL, FETCH_CHANNELS} from '../constants/actionTypes';

export const fetchChannel = (state = [], action) => {
    switch (action.type) {
        case FETCH_CHANNELS:
            return action.payload || [];
        default:
            return state;
    }
};

export const activeChannel = (state = null, action) => {
    switch (action.type) {
        case ACTIVE_CHANNEL:
            return action.payload;
        default:
            return state;
    }
};