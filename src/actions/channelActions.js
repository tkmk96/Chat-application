import axios from 'axios';
import {API_URL, APP_ID, API_CHANNEL} from '../constants/api';
import {ACTIVE_CHANNEL, FETCH_CHANNELS} from '../constants/actionTypes';
import {uuid} from '../utils/uuidGenerator';

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
            payload: res.data.channels
        })
    }
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

          dispatch({
              type: FETCH_CHANNELS,
              payload: res.data.channels
          })
      };
};

export const setActiveChannel = (channelId) => {
    return {
        type: ACTIVE_CHANNEL,
        payload: channelId
    }
};