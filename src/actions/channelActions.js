import axios from 'axios';
import {API_URL, APP_ID, API_CHANNEL} from '../constants/api';
import {CHANNEL_CREATED} from '../constants/actionTypes';
import {AUTH_EMAIL, AUTH_TOKEN} from '../constants/storageKeys';

export const createChannel = (name) => {
    console.log("tu som");
    const token = localStorage.getItem(AUTH_TOKEN);
    const email = localStorage.getItem(AUTH_EMAIL);
    return async dispatch => {
        const res = await axios({
            method: 'patch',
            url: `${API_URL}/app/${APP_ID}`,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json-patch+json',
                'Authorization': `bearer ${token}`
            },
            data: {
                path: `${API_CHANNEL}`,
                op: 'add',
                value: {
                    id: name,
                    name
                },
                from: email
            }
        });

        console.log(res);
        dispatch({
            type: CHANNEL_CREATED,
            payload: 'aaa'
        })
    }
};