import axios from 'axios';
import {API_URL, APP_ID, API_CHANNEL} from '../constants/api';
import {SET_ACTIVE_CHANNEL, CREATE_MESSAGE, FETCH_MESSAGES} from '../constants/actionTypes';
import {uuid} from '../utils/uuidGenerator';

export const createMessage = (text) => {
//POST /api/app/{appId}/channel/{channelId}/message
    return async (dispatch, getState) => {
        const token = getState().authToken;
        const email = getState().user.email;
        const channelId = getState().activeChannel.channelId;

        const res = await axios({
            method: 'post',
            url: `${API_URL}/app/${APP_ID}/channel/${channelId}/message`,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json-patch+json',
                'Authorization': `bearer ${token}`
            },
            data: {
                id: uuid(),
                value: text,
                createdBy: email
            }
        });

        console.log(res);
        dispatch({
            type: CREATE_MESSAGE,
            payload: {channelId, message: res.data}
        })
    }
};

export const fetchMessages = (channelId) => {
//GET /api/app/{appId}/channel/{channelId}/message
    console.log(channelId);
    return async (dispatch, getState) => {
        const token = getState().authToken;
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
            payload: {channelId, messages: res.data}
        })
    };
};
