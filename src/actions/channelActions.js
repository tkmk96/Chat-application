import axios from 'axios';
import {API_URL, APP_ID, API_CHANNEL} from '../constants/api';
import {SET_ACTIVE_CHANNEL, FETCH_CHANNELS} from '../constants/actionTypes';
import {uuid} from '../utils/uuidGenerator';
import {filterAndConvertChannels} from '../utils/convert';

export const createChannel = (name) => {

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
                path: `${API_CHANNEL}/-`,
                op: 'add',
                value: {
                    id: uuid(),
                    name,
                    customData: JSON.stringify({creator: email, users: [], admins: [], owners: [email]})
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
            payload: { ...channels[channel.id], messages: channel.messages}
        });
    };
};

export const inviteUser = (channel, userEmail) => {
    const customData = {...channel.customData, users: [...channel.customData.users, userEmail]};

    return async (dispatch) => {
        dispatch(editChannel({...channel, customData}));
    }
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
//GET /api/app/{appId}/channel/{channelId}/message
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