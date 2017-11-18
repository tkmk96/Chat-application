import axios from 'axios';
import {API_URL, APP_ID, API_CHANNEL} from '../constants/api';
import {SET_ACTIVE_CHANNEL, FETCH_CHANNELS} from '../constants/actionTypes';
import {uuid} from '../utils/uuidGenerator';
import {convertChannelsArray} from '../utils/convert';

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
                    name
                }
            }]
        });

        console.log(res);
        dispatch({
            type: FETCH_CHANNELS,
            payload: convertChannelsArray(res.data.channels)
        });
    };
};

export const fetchChannels = () => {
    return async (dispatch, getState) => {
        const token = getState().authToken;
        const res = await axios({
            method: 'get',
            url: `${API_URL}/app/${APP_ID}`,
            headers: {
                'Accept': 'application/json',
                'Authorization': `bearer ${token}`
            }
        });
        const channels = convertChannelsArray(res.data.channels);

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

        console.log(res);
        dispatch({
            type: SET_ACTIVE_CHANNEL,
            payload: { ...channels[channelId], messages: res.data}
        });
    };
};
