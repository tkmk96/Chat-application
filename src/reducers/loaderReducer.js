import {
    LOADING_CHANGE_AVATAR, LOADING_CHANGE_USER_NAME, LOADING_CREATE_CHANNEL,
    LOADING_DELETE_CHANNEL, LOADING_EDIT_CHANNEL, LOADING_LOGIN, LOADING_REGISTER, LOADING_ACTIVE_CHANNEL
} from '../constants/actionTypes';

export const loading = (state = {}, action) => {
    switch (action.type) {
        case LOADING_CHANGE_USER_NAME:
            return {...state, changeUserName: action.payload};
        case LOADING_CHANGE_AVATAR:
            return {...state, changeAvatar: action.payload};
        case LOADING_CREATE_CHANNEL:
            return {...state, createChannel: action.payload};
        case LOADING_DELETE_CHANNEL:
            return {...state, deleteChannel: action.payload};
        case LOADING_ACTIVE_CHANNEL:
            return {...state, activeChannel: action.payload};
        case LOADING_EDIT_CHANNEL:
            return {...state, editChannel: action.payload};
        case LOADING_LOGIN:
            return {...state, login: action.payload};
        case LOADING_REGISTER:
            return {...state, register: action.payload};
        default:
            return state;
    }
};