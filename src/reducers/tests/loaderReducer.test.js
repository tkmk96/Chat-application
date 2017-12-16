import {
    FETCH_CHANNELS, LOADING_ACTIVE_CHANNEL, LOADING_CHANGE_AVATAR, LOADING_CHANGE_USER_NAME,
    LOADING_CREATE_CHANNEL, LOADING_DELETE_CHANNEL, LOADING_EDIT_CHANNEL, LOADING_LOGIN, LOADING_REGISTER
} from '../../constants/actionTypes';
import {loading} from '../loaderReducer';

/*eslint no-undef:0*/
test('loading reducer > returns original state as default', async done => {

    const state = {
        changeUserName: false,
        changeAvatar: false,
        createChannel: false,
        deleteChannel: false,
        activeChannel: false,
        editChannel: false,
        login: false,
        register: false
    };
    const action = {
        type: FETCH_CHANNELS,
        payload: {}
    };

    const newState = loading(state, action);
    expect(newState).toEqual(state);

    done();
});

test('loading reducer > sets changeUserName', async done => {

    const state = {
        changeUserName: false,
        changeAvatar: false,
        createChannel: false,
        deleteChannel: false,
        activeChannel: false,
        editChannel: false,
        login: false,
        register: false
    };
    const action = {
        type: LOADING_CHANGE_USER_NAME,
        payload: true
    };

    const newState = loading(state, action);
    expect(newState).toEqual({...state, changeUserName: true});

    done();
});

test('loading reducer > sets changeAvatar', async done => {

    const state = {
        changeUserName: false,
        changeAvatar: false,
        createChannel: false,
        deleteChannel: false,
        activeChannel: false,
        editChannel: false,
        login: false,
        register: false
    };
    const action = {
        type: LOADING_CHANGE_AVATAR,
        payload: true
    };

    const newState = loading(state, action);
    expect(newState).toEqual({...state, changeAvatar: true});

    done();
});

test('loading reducer > sets createChannel', async done => {

    const state = {
        changeUserName: false,
        changeAvatar: false,
        createChannel: false,
        deleteChannel: false,
        activeChannel: false,
        editChannel: false,
        login: false,
        register: false
    };
    const action = {
        type: LOADING_CREATE_CHANNEL,
        payload: true
    };

    const newState = loading(state, action);
    expect(newState).toEqual({...state, createChannel: true});

    done();
});

test('loading reducer > sets deleteChannel', async done => {

    const state = {
        changeUserName: false,
        changeAvatar: false,
        createChannel: false,
        deleteChannel: false,
        activeChannel: false,
        editChannel: false,
        login: false,
        register: false
    };
    const action = {
        type: LOADING_DELETE_CHANNEL,
        payload: true
    };

    const newState = loading(state, action);
    expect(newState).toEqual({...state, deleteChannel: true});

    done();
});

test('loading reducer > sets activeChannel', async done => {

    const state = {
        changeUserName: false,
        changeAvatar: false,
        createChannel: false,
        deleteChannel: false,
        activeChannel: false,
        editChannel: false,
        login: false,
        register: false
    };
    const action = {
        type: LOADING_ACTIVE_CHANNEL,
        payload: true
    };

    const newState = loading(state, action);
    expect(newState).toEqual({...state, activeChannel: true});

    done();
});
test('loading reducer > sets editChannel', async done => {

    const state = {
        changeUserName: false,
        changeAvatar: false,
        createChannel: false,
        deleteChannel: false,
        activeChannel: false,
        editChannel: false,
        login: false,
        register: false
    };
    const action = {
        type: LOADING_EDIT_CHANNEL,
        payload: true
    };

    const newState = loading(state, action);
    expect(newState).toEqual({...state, editChannel: true});

    done();
});
test('loading reducer > sets login', async done => {

    const state = {
        changeUserName: false,
        changeAvatar: false,
        createChannel: false,
        deleteChannel: false,
        activeChannel: false,
        editChannel: false,
        login: false,
        register: false
    };
    const action = {
        type: LOADING_LOGIN,
        payload: true
    };

    const newState = loading(state, action);
    expect(newState).toEqual({...state, login: true});

    done();
});

test('loading reducer > sets register', async done => {

    const state = {
        changeUserName: false,
        changeAvatar: false,
        createChannel: false,
        deleteChannel: false,
        activeChannel: false,
        editChannel: false,
        login: false,
        register: false
    };
    const action = {
        type: LOADING_REGISTER,
        payload: true
    };

    const newState = loading(state, action);
    expect(newState).toEqual({...state, register: true});

    done();
});
