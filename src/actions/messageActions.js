import axios from 'axios';
import {API_URL, APP_ID, API_CHANNEL} from '../constants/api';
import {FETCH_MESSAGES} from '../constants/actionTypes';
import {uuid} from '../utils/uuidGenerator';

export const createMessage = (text, channelId = 'd22f8fb2-3bd1-4ac0-9330-e73d49c35044') => {
//POST /api/app/{appId}/channel/{channelId}/message
    return async (dispatch, getState) => {
        const token = getState().authToken;
        const email = getState().user.email;

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
            type: FETCH_MESSAGES,
            payload: res.data.channels
        })
    }
};
