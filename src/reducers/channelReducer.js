import {SET_ACTIVE_CHANNEL, CREATE_MESSAGE, FETCH_CHANNELS, LOGOUT_USER, ZERO_CHANNELS} from '../constants/actionTypes';

export const fetchChannel = (state = {}, action) => {
    switch (action.type) {
        case FETCH_CHANNELS:
            return action.payload || {};
        case LOGOUT_USER:
            return {};
        default:
            return state;
    }
};

export const activeChannel = (state = null, action) => {
    switch (action.type) {
        case SET_ACTIVE_CHANNEL:
            const {messages} = action.payload;
            messages.sort((m1, m2) => {
                return new Date(m1.createdAt).getTime() - new Date(m2.createdAt).getTime();
            });
            return {...action.payload, messages};
        case CREATE_MESSAGE:
            const channel = {...action.payload.activeChannel};
            channel.messages.push(action.payload.message);
            return channel;
        case ZERO_CHANNELS:
        case LOGOUT_USER:
            return null;
        default:
            return state;
    }
};