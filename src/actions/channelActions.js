import axios from 'axios';
import {API_URL, APP_ID, API_CHANNEL} from '../constants/api';
import {FETCH_CHANNELS} from '../constants/actionTypes';
import {AUTH_EMAIL, AUTH_TOKEN} from '../constants/storageKeys';
import {uuid} from '../utils/uuidGenerator';

export const createChannel = (name) => {
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
            payload: res.data.channels
        })
    }
};

export const fetchChannels = () => {
    const token = localStorage.getItem(AUTH_TOKEN);
    return async dispatch => {
          const res = await axios({
              method: 'get',
              url: `${API_URL}/app/${APP_ID}`,
              headers: {
                  'Accept': 'application/json',
                  'Authorization': `bearer ${token}`
              }
          });

          dispatch({
              type: FETCH_CHANNELS,
              payload: res.data.channels
          })
      };
};