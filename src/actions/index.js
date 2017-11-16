import axios from 'axios';

import {API_URL, APP_ID} from '../constants/api';
import {AUTH_TOKEN} from '../constants/storageKeys';
import {LOGGED_USER, FETCH_AUTH_TOKEN} from '../constants/actionTypes';

export const registerUser = (email, customData,  history) => {
    return async dispatch => {
        const res = await axios({
            method: 'post',
            url: `${API_URL}/${APP_ID}/user`,
            data: {email, customData: JSON.stringify(customData)},
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });
        console.log(res);
        dispatch({
            type: LOGGED_USER,
            payload: {email, ...customData}
        });
        const token = await fetchToken(email);
        dispatch(receivedToken(token));
        history.push('/');
    };
};

export const loginUser = (email, password, history) => {
    return async dispatch => {
        const token = await fetchToken(email);


        const res = await axios({
            method: 'get',
            url: `${API_URL}/${APP_ID}/user/${email}`,
            headers: {
                'Authorization': `bearer ${token}`,
                'Accept': 'application/json',
            }
        });
        console.log(res);
        const user = {email, ...JSON.parse(res.data.customData)}

        if(user.password != password){
            return null; //idk
        }
        dispatch(receivedToken(token));

        dispatch({
            type: LOGGED_USER,
            payload: user
        });
        history.push('/')
    }
};

const fetchToken = async (email) => {
    const res = await axios({
        method: 'post',
        url: `${API_URL}/auth`,
        headers: {
            'Accept': 'text/plain',
            'Content-Type': 'application/json'
        },
        data: JSON.stringify(email)

    });
    return res.data;
};

const receivedToken = (token) => {

    localStorage.setItem(AUTH_TOKEN, token);
    return {
        type: FETCH_AUTH_TOKEN,
        payload: token
    };

};