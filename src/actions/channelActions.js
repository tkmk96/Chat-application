import axios from 'axios';

import {uuid} from '../utils/uuidGenerator';
import {filterAndConvertChannels} from '../utils/convert';

import {API_URL, APP_ID, API_CHANNEL} from '../constants/api';
import {SET_ACTIVE_CHANNEL, FETCH_CHANNELS} from '../constants/actionTypes';
import * as role from '../constants/channelRoles';


export const createChannel = (name) => {
    return async (dispatch, getState) => {
        const token = getState().authToken;
        const email = getState().user.email;
        const users = {};
        users[email] = role.OWNER;
        const res = await axios({
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
    };
};

export const editChannel = (channel) => {
    return async (dispatch, getState) => {
        const token = getState().authToken;
        const email = getState().user.email;

        const res = await axios({
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

        dispatch({
            type: SET_ACTIVE_CHANNEL,
            payload: {...channels[channel.id], messages: channel.messages}
        });
    };
};

export const changePrivilege = (channel, userEmail, privilege) => {
    return async (dispatch) => {
        const {customData} = channel;
        const users = {...customData.users};
        privilege === 'none' ? delete users[userEmail] : users[userEmail] = privilege;
        const newCustomData = {...customData, users};
        dispatch(editChannel({...channel, customData: newCustomData}));
    };
};

export const fetchChannels = () => {
    return async (dispatch, getState) => {
        const token = getState().authToken;
        const email = getState().user.email;
        const res = await axios({
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

export const setActiveChannel = (channelId) => {
    return async (dispatch, getState) => {
        const token = getState().authToken;
        const channels = getState().channels;

        const res = await axios({
            method: 'get',
            url: `${API_URL}/app/${APP_ID}/channel/${channelId}/message?lastN=15`,
            headers: {
                'Accept': 'application/json',
                'Authorization': `bearer ${token}`
            }
        });

        dispatch({
            type: SET_ACTIVE_CHANNEL,
            payload: { ...channels[channelId], messages: res.data}
        });
    };
};