import { SubmissionError } from 'redux-form';
import {API_URL, APP_ID} from '../constants/api';
import {AUTH_EMAIL, AUTH_TOKEN} from '../constants/storageKeys';
import {
    FETCH_USER, LOGOUT_USER, FETCH_AUTH_TOKEN, FETCH_ALL_USERS,
    LOADING_CHANGE_USER_NAME, LOADING_CHANGE_AVATAR, LOADING_LOGIN, LOADING_REGISTER
} from '../constants/actionTypes';
import {convertUsersArray} from '../utils/convert';

export const registerUserFactory = ({fetch, fetchToken}) => (email, customData,  history) => {
    return async dispatch => {
        dispatch({
            type: LOADING_REGISTER,
            payload: true
        });
        await fetch({
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
            type: FETCH_USER,
            payload: {email, ...customData}
        });
        const token = await fetchToken(email);
        dispatch(receivedToken(token));
        dispatch({
            type: LOADING_REGISTER,
            payload: false
        });
        history.push('/');
    };
};

export const loginUserFactory = ({fetch, fetchToken, fetchData, fetchAllUsers}) => (email, password, history) => {
    return async dispatch => {
        dispatch({
            type: LOADING_LOGIN,
            payload: true
        });
        const token = await fetchToken(email);
        dispatch(receivedToken(token));

        let user;
        try {
            const {customData} = await fetchData(email, token);
            user = {email, ...JSON.parse(customData)};

        } catch (e) {
            dispatch({
                type: LOADING_LOGIN,
                payload: false
            });
            throw e;
        }

        if(user.password !== password){
            dispatch({
                type: LOADING_LOGIN,
                payload: false
            });
            throw new SubmissionError({
                password: 'Incorrect password!',
                _error: 'Login failed!'
            });
        }
        localStorage.setItem(AUTH_EMAIL, email);

        dispatch(fetchAllUsers(token));
        dispatch({
            type: FETCH_USER,
            payload: user
        });
        dispatch({
            type: LOADING_LOGIN,
            payload: false
        });
        history.push('/');
    };
};

export function logoutUser() {
    localStorage.clear();
    return {
        type: LOGOUT_USER
    };
}

export const fetchUserDataFactory = ({fetchData}) => () => {
    return async (dispatch, getState) => {
        const token = getState().authToken;
        const email = getState().user.email;
        if (token && email) {
            try {
                const {customData} = await fetchData(email, token);
                dispatch({
                    type: FETCH_USER,
                    payload: {email, ...JSON.parse(customData)}
                });
            }
            catch (e){
                localStorage.clear();
                dispatch({
                    type: LOGOUT_USER,
                });
            }

        }
    };
};

export const fetchAllUsersFactory = (fetch) => (token) => {
    return async (dispatch, getState) => {
        const authToken = token || getState().authToken;
        if (authToken) {
            const res = await fetch({
                method: 'get',
                url: `${API_URL}/${APP_ID}/user`,
                headers: {
                    'Authorization': `bearer ${authToken}`,
                    'Accept': 'application/json',
                }
            });
            console.log(res.data);
            dispatch({
                type: FETCH_ALL_USERS,
                payload: convertUsersArray(res.data)
            });
        }
    };
};

export const editUserNameFactory = ({updateUserData}) => (name) => {
    return async (dispatch, getState) => {
        dispatch({
            type: LOADING_CHANGE_USER_NAME,
            payload: true
        });
        const token = getState().authToken;
        const {email, customData} = await updateUserData({name}, getState().user, token);

        dispatch({
            type: FETCH_USER,
            payload: {email, ...JSON.parse(customData) }
        });
        dispatch({
            type: LOADING_CHANGE_USER_NAME,
            payload: false
        });
    };
};

export const uploadAvatarFactory = ({fetch, fetchFileUrl, updateUserData}) => (file) => {
    return async (dispatch, getState)=> {
        dispatch({
            type: LOADING_CHANGE_AVATAR,
            payload: true
        });
        const token = getState().authToken;

        let formData = new FormData();
        formData.append('Files', file);

        const res = await fetch({
            method: 'post',
            url: `${API_URL}/file`,
            headers: {
                'Authorization': `bearer ${token}`,
                'Accept': 'application/json',
                'Content-Type': 'multipart/form-data'
            },
            data: formData

        });
        const avatarUrl = await fetchFileUrl(res.data[0].id, token);
        const {email, customData} = await updateUserData({avatarUrl}, getState().user, token);

        dispatch({
            type: FETCH_USER,
            payload: {email, ...JSON.parse(customData) }
        });
        dispatch({
            type: LOADING_CHANGE_AVATAR,
            payload: false
        });
    };
};

export const fetchFileUrlFactory = (fetch) => async (id, token) => {
    const res = await fetch({
        method: 'get',
        url: `${API_URL}/file/${id}/download-link`,
        headers: {
            'Authorization': `bearer ${token}`,
            'Accept': 'application/json',
        }
    });
    return res.data;
};

export const updateUserDataFactory = (fetch) => async(newCustomData, user, token) => {
    const customData = updateCustomData(newCustomData, user);

    const res = await fetch({
        method: 'put',
        url: `${API_URL}/${APP_ID}/user/${user.email}`,
        data: JSON.stringify(customData),
        headers: {
            'Authorization': `bearer ${token}`,
            'Accept': 'application/json',
            'Content-Type': 'application/json-patch+json'
        }
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

export const fetchDataFactory = (fetch) => async (email, token) => {
    const res = await fetch({
        method: 'get',
        url: `${API_URL}/${APP_ID}/user/${email}`,
        headers: {
            'Authorization': `bearer ${token}`,
            'Accept': 'application/json',
        }
    })
        .catch(() => {
            throw new SubmissionError({
                email: 'Invalid email!',
                _error: 'Login failed!'
            });
        });
    return res.data;
};

export const fetchTokenFactory = (fetch) => async (email) => {
    const res = await fetch({
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

const updateCustomData = (customData, {name, password, avatarUrl}) => {
    return JSON.stringify(Object.assign({}, {name, password, avatarUrl}, customData));
};
