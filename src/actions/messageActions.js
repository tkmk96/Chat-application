import axios from 'axios';
import {List} from 'immutable';
import {uuid} from '../utils/uuidGenerator';
import {API_URL, APP_ID} from '../constants/api';
import {LOADING_ACTIVE_CHANNEL} from '../constants/actionTypes';
import {LIKE} from '../constants/reactionTypes';

import {fetchFileUrl, createFile} from './userActions';
import {setActiveChannel} from '.';


export const createMessage = (text, inputFiles) => {
    return async (dispatch, getState) => {
        dispatch({
            type: LOADING_ACTIVE_CHANNEL,
            payload: true
        });
        const token = getState().authToken;
        const email = getState().user.email;
        const activeChannel = getState().activeChannel;

        const images = [];
        const files = [];

        await Promise.all (inputFiles.map (async file => {
            const isImage = file.type.startsWith('image');
            const data = await createFile(file, token);
            const fileUrl = await fetchFileUrl(data.id, token);
            return {id: data.id, name: data.name, fileUrl, isImage}
        }))
        .then(values => {
            values.forEach(({id, name, fileUrl, isImage}) => {
                const file = {id, name, fileUrl};
                isImage ? images.push(file) : files.push(file);
            });
        });

        const customData = {likes: {}, dislikes: {} };

        if(images.length > 0){
            customData.images = List(images);
        }
        if(files.length > 0){
            customData.files = List(files);
        }

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
                createdBy: email,
                customData: JSON.stringify(customData)
            }
        });
        dispatch(setActiveChannel(activeChannel.id));
    }
};

export const deleteMessage = (id) => {
    return async (dispatch, getState) => {
        dispatch({
            type: LOADING_ACTIVE_CHANNEL,
            payload: true
        });
        const token = getState().authToken;
        const activeChannel = getState().activeChannel;

        const res = await axios({
            method: 'delete',
            url: `${API_URL}/app/${APP_ID}/channel/${activeChannel.id}/message/${id}`,
            headers: {
                'Accept': 'application/json',
                'Authorization': `bearer ${token}`
            }
        });
        dispatch(setActiveChannel(activeChannel.id));
    }
};

export const editMessage = (message) => {
    return async (dispatch, getState) => {
        dispatch({
            type: LOADING_ACTIVE_CHANNEL,
            payload: true
        });
        const token = getState().authToken;
        const activeChannel = getState().activeChannel;
        message.customData = JSON.stringify(message.customData);

        const res = await axios({
            method: 'put',
            url: `${API_URL}/app/${APP_ID}/channel/${activeChannel.id}/message/${message.id}`,
            headers: {
                'Accept': 'application/json',
                'Authorization': `bearer ${token}`
            },
            data: message
        });
        dispatch(setActiveChannel(activeChannel.id));
    }
};

export const reactToMessage = (message, reaction) => {
    return async (dispatch, getState) => {
        dispatch({
            type: LOADING_ACTIVE_CHANNEL,
            payload: true
        });
        const email = getState().user.email;
        const newMessage = {...message};
        if (reaction === LIKE) {
            newMessage.customData.likes[email] = 'y';
            delete newMessage.customData.dislikes[email];
        }
        else {
            newMessage.customData.dislikes[email] = 'y';
            delete newMessage.customData.likes[email];
        }

        dispatch(editMessage(newMessage));
    }
};
