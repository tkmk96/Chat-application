import axios from 'axios';
import {API_URL, APP_ID, API_CHANNEL} from '../constants/api';
import {SET_ACTIVE_CHANNEL, CREATE_MESSAGE, FETCH_MESSAGES} from '../constants/actionTypes';
import {uuid} from '../utils/uuidGenerator';

export const createMessage = (text) => {
//POST /api/app/{appId}/channel/{channelId}/message
    return async (dispatch, getState) => {
        const token = getState().authToken;
        const email = getState().user.email;
        const activeChannel = getState().activeChannel;

        const res = await axios({
            method: 'post',
            url: `${API_URL}/app/${APP_ID}/channel/${activeChannel.id}/message`,
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
        dispatch({
            type: CREATE_MESSAGE,
            payload: {activeChannel, message: res.data}
        })
    }
};
