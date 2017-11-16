import {REGISTER_USER, FETCH_AUTH_TOKEN} from '../constants/types';
import axios from 'axios';
import {API_URL, APP_ID} from '../constants/api';
import {AUTH_TOKEN} from '../constants/storageKeys';

export const registerUser = (email, customData = '') => {

    return async dispatch => {
        const res = await axios({
            method: 'post',
            url: `${API_URL}/${APP_ID}/user`,
            data: {email, customData},
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });
        console.log(res);
        dispatch({
            type: REGISTER_USER,
            payload: {email, customData}
        });
        dispatch(fetchUserToken(email));
    };
};

export const fetchUserToken = (email) => {

    return async dispatch => {
        const response = await axios({
            method: 'post',
            url: `${API_URL}/auth`,
            headers: {
                'Accept': 'text/plain',
                'Content-Type': 'application/json'
            },
            data: JSON.stringify(email)

        });

        console.log(response);
        localStorage.setItem(AUTH_TOKEN, response.data);
        dispatch({
            type: FETCH_AUTH_TOKEN,
            payload: response.data
        });
    };
};