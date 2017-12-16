import {uuid} from '../utils/uuidGenerator';
import {filterAndConvertChannels, parseMessages} from '../utils/convert';

import {API_URL, APP_ID, API_CHANNEL} from '../constants/api';
import {
    SET_ACTIVE_CHANNEL, FETCH_CHANNELS, ZERO_CHANNELS, LOADING_EDIT_CHANNEL,
    LOADING_CREATE_CHANNEL, LOADING_DELETE_CHANNEL, LOADING_ACTIVE_CHANNEL
} from '../constants/actionTypes';
import * as role from '../constants/channelRoles';
import {List} from 'immutable';
import {SubmissionError} from 'redux-form';

export const createChannelFactory = (fetch) => (name) => {
    return async (dispatch, getState) => {
        dispatch({
            type: LOADING_CREATE_CHANNEL,
            payload: true
        });
        const token = getState().authToken;
        const email = getState().user.email;
        const users = {};
        users[email] = role.OWNER;
        const res = await fetch({
            method: 'patch',
            url: `${API_URL}/app/${APP_ID}`,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json-patch+json',
                'Authorization': `bearer ${token}`
            },
            data: [{
                path: `${API_CHANNEL}/-`,
                op: 'add',
                value: {
                    id: uuid(),
                    name,
                    customData: JSON.stringify({creator: email, users})
                }
            }]
        });
        dispatch({
            type: FETCH_CHANNELS,
            payload: filterAndConvertChannels(res.data.channels, email)
        });
        dispatch({
            type: LOADING_CREATE_CHANNEL,
            payload: false
        });
    };
};

export const editChannelFactory = ({fetch, setActiveChannel}) => (channel) => {
    return async (dispatch, getState) => {
        dispatch({
            type: LOADING_EDIT_CHANNEL,
            payload: true
        });
        const token = getState().authToken;
        const email = getState().user.email;

        const res = await fetch({
            method: 'patch',
            url: `${API_URL}/app/${APP_ID}`,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json-patch+json',
                'Authorization': `bearer ${token}`
            },
            data: [{
                path: `${API_CHANNEL}/${channel.id}`,
                op: 'replace',
                value: {
                    ...channel,
                    customData: JSON.stringify(channel.customData)
                }
            }]
        });

        const channels = filterAndConvertChannels(res.data.channels, email);

        dispatch({
            type: FETCH_CHANNELS,
            payload: channels
        });

        if (!channels[channel.id]) {
            if (Object.keys(channels).length === 0){
                dispatch({type: ZERO_CHANNELS});
            }
            else{
                dispatch(setActiveChannel(Object.keys(channels)[0]));
            }
        }
        else{
            dispatch(setActiveChannel(channel.id));
        }
        dispatch({
            type: LOADING_EDIT_CHANNEL,
            payload: false
        });
    };
};

export const removeChannelFactory = ({fetch, setActiveChannel}) => (id) => {
    return async (dispatch, getState) => {
        dispatch({
            type: LOADING_DELETE_CHANNEL,
            payload: true
        });
        const token = getState().authToken;
        const email = getState().user.email;

        const res = await fetch({
            method: 'patch',
            url: `${API_URL}/app/${APP_ID}`,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json-patch+json',
                'Authorization': `bearer ${token}`
            },
            data: [{
                path: `${API_CHANNEL}/${id}`,
                op: 'remove',
            }]
        });

        const channels = filterAndConvertChannels(res.data.channels, email);

        if (Object.keys(channels).length === 0){
            dispatch({type: ZERO_CHANNELS});
        }

        dispatch({
            type: FETCH_CHANNELS,
            payload: channels
        });

        if (Object.keys(channels).length) {
            dispatch(setActiveChannel(Object.keys(channels)[0]));
        }
        dispatch({
            type: LOADING_DELETE_CHANNEL,
            payload: false
        });
    };
};

export const changePrivilegeFactory = (editChannel) => (channel, userEmail, privilege) => {
    return async (dispatch) => {
        console.log(channel);
        const {customData} = channel;
        const users = {...customData.users};

        privilege ? users[userEmail] = privilege : delete users[userEmail] ;
        const newCustomData = {...customData, users};
        console.log(newCustomData);
        dispatch(editChannel({...channel, customData: newCustomData}));
    };
};

export const inviteUserFactory = (editChannel) => (channel, userEmail) => {
    return async (dispatch) => {
        const {customData} = channel;
        const users = {...customData.users};
        if (users[userEmail]) {
            throw new SubmissionError({
                email: 'User already is in the channel!',
                _error: 'Invite failed!'
            });
        }

        users[userEmail] = role.USER;
        const newCustomData = {...customData, users};
        dispatch(editChannel({...channel, customData: newCustomData}));
    };
};

export const fetchChannelsFactory = ({fetch, setActiveChannel}) => () => {
    return async (dispatch, getState) => {
        const token = getState().authToken;
        const email = getState().user.email;
        const res = await fetch({
            method: 'get',
            url: `${API_URL}/app/${APP_ID}`,
            headers: {
                'Accept': 'application/json',
                'Authorization': `bearer ${token}`
            }
        });
        const channels = filterAndConvertChannels(res.data.channels, email);

        dispatch({
            type: FETCH_CHANNELS,
            payload: channels
        });
        if (Object.keys(channels).length) {
            dispatch(setActiveChannel(Object.keys(channels)[0]));
        }
    };
};

export const setActiveChannelFactory = (fetch) => (channelId) => {
    return async (dispatch, getState) => {
        dispatch({
            type: LOADING_ACTIVE_CHANNEL,
            payload: true
        });
        const token = getState().authToken;
        const channels = getState().channels;

        const res = await fetch({
            method: 'get',
            url: `${API_URL}/app/${APP_ID}/channel/${channelId}/message?lastN=15`,
            headers: {
                'Accept': 'application/json',
                'Authorization': `bearer ${token}`
            }
        });

        let messages = parseMessages(res.data);
        dispatch({
            type: SET_ACTIVE_CHANNEL,
            payload: { ...channels[channelId], messages: List(messages)}
        });
        dispatch({
            type: LOADING_ACTIVE_CHANNEL,
            payload: false
        });
    };
};