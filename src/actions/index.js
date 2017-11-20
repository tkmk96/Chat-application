import axios from 'axios';
import { SubmissionError } from 'redux-form';
import {API_URL, APP_ID} from '../constants/api';
import {AUTH_EMAIL, AUTH_TOKEN} from '../constants/storageKeys';
import {LOGGED_USER, LOGOUT_USER, FETCH_AUTH_TOKEN, UPDATE_USER} from '../constants/actionTypes';

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
        localStorage.setItem(AUTH_EMAIL, email);
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
        const { customData} = await fetchData(email, token);
        const user = {email, ...JSON.parse(customData)};

        if(user.password !== password){
            throw new SubmissionError({
                password: 'Incorrect password!',
                _error: 'Login failed!'
            });
        }
        localStorage.setItem(AUTH_EMAIL, email);

        dispatch({
            type: LOGGED_USER,
            payload: user
        });
        dispatch(receivedToken(token));
        history.push('/');
    }
};

export function logoutUser() {
    localStorage.clear();
    return {
        type: LOGOUT_USER
    }
}

export const fetchUserData = () => {
    return async (dispatch, getState) => {
        const token = getState().authToken;
        const email = getState().user.email;
        if (token && email) {
            const {customData} = await fetchData(email, token);
            dispatch({
                type: LOGGED_USER,
                payload: {email, ...JSON.parse(customData)}
            });
        }
    }
};

export const editUserName = (name) => {
    return async (dispatch, getState) => {
        const token = getState().authToken;
        const email = getState().user.email;
        const editedData = JSON.stringify({name});

        const res = await updateUserData(editedData, email, token);

        const customData = JSON.parse(res.customData);

        dispatch({
            type: UPDATE_USER,
            payload: {...customData }
        });
    }
};

export const uploadAvatar = (file) => {
    return async (dispatch, getState)=> {
        const token = getState().authToken;
        const email = getState().user.email;

        let formData = new FormData();
        formData.append('Files', file);

        const res = await axios({
            method: 'post',
            url: `${API_URL}/file`,
            headers: {
                'Authorization': `bearer ${token}`,
                'Accept': 'application/json',
                'Content-Type': 'multipart/form-data'
            },
            data: formData

        });
        console.log(res);

        const avatarUrl = await fetchFileUrl(res.data[0].id, token);
        const editedData = JSON.stringify({avatarUrl});
        const updateUserRes = await updateUserData(editedData, email, token);

        const customData = JSON.parse(updateUserRes.customData);

        dispatch({
            type: UPDATE_USER,
            payload: {...customData }
        });
    }
};

const updateUserData = async(customData, email, token) => {
    const res = await axios({
        method: 'put',
        url: `${API_URL}/${APP_ID}/user/${email}`,
        data: JSON.stringify(customData),
        headers: {
            'Authorization': `bearer ${token}`,
            'Accept': 'application/json',
            'Content-Type': 'application/json-patch+json'
        }
    });
    console.log(res);
    return res.data;
}

const fetchFileUrl = async (id, token) => {
    const res = await axios({
        method: 'get',
        url: `${API_URL}/file/${id}/download-link`,
        headers: {
            'Authorization': `bearer ${token}`,
            'Accept': 'application/json',
        }
    });
    return res.data;
}

const receivedToken = (token) => {
    localStorage.setItem(AUTH_TOKEN, token);
    return {
        type: FETCH_AUTH_TOKEN,
        payload: token
    };

};

const fetchData = async (email, token) => {
    const res = await axios({
        method: 'get',
        url: `${API_URL}/${APP_ID}/user/${email}`,
        headers: {
            'Authorization': `bearer ${token}`,
            'Accept': 'application/json',
        }
    });
    return res.data;
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
    })
    .catch(() => {
        throw new SubmissionError({
            email: 'Invalid email!',
            _error: 'Login failed!'
        });
    });
    return res.data;
};

