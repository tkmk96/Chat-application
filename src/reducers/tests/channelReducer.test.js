import {FETCH_CHANNELS, LOGOUT_USER, SET_ACTIVE_CHANNEL, ZERO_CHANNELS} from '../../constants/actionTypes';
import {activeChannel, fetchChannels} from '../channelReducer';

test('fetchChannels reducer > sets state correctly', async done => {

    const customData = {creator: 'email', users: {email: 'owner'}};
    const channel = {id: 1, name: 'channel', customData};
    const channels = {'1': channel};
    const action = {
        type: FETCH_CHANNELS,
        payload: channels
    };

    const newState = fetchChannels({}, action);
    expect(newState).toEqual(channels);

    done();
});

test('fetchChannels reducer > user logs out', async done => {

    const customData = {creator: 'email', users: {email: 'owner'}};
    const channel = {id: 1, name: 'channel', customData};
    const channels = {'1': channel};
    const action = {
        type: LOGOUT_USER
    };

    const newState = fetchChannels(channels, action);
    expect(newState).toEqual({});

    done();
});

test('fetchChannels reducer > returns original state as default', async done => {

    const customData = {creator: 'email', users: {email: 'owner'}};
    const channel = {id: 1, name: 'channel', customData};
    const state = {'1': channel};
    const action = {
        type: ZERO_CHANNELS
    };

    const newState = fetchChannels(state, action);
    expect(newState).toEqual(state);

    done();
});

test('activeChannel reducer > sets active channel', async done => {

    const customData = {creator: 'email', users: {email: 'owner'}};
    const oldState = {id: 1, name: 'channel', messages: [], customData};

    let second = {createdAt: new Date(2017, 5, 15, 9, 32, 15), value: 'cau'};
    let first = {createdAt: new Date(2017, 5, 15, 7, 30, 45), value: 'ahoooj'};
    const messages = [second, first];
    const newActiveChannel = {id: 2, name: 'active', messages, customData};
    const action = {
        type: SET_ACTIVE_CHANNEL,
        payload: newActiveChannel
    };

    const state = {...newActiveChannel, messages: [first, second]};

    const newState = activeChannel(oldState, action);
    expect(newState).toEqual(state);

    done();
});

test('activeChannel reducer > returns original state as default', async done => {

    const customData = {creator: 'email', users: {email: 'owner'}};
    const state = {id: 1, name: 'channel', messages: [], customData};
    const action = {
        type: FETCH_CHANNELS,
        payload: {}
    };

    const newState = activeChannel(state, action);
    expect(newState).toEqual(state);

    done();
});

test('activeChannel reducer > user logs out', async done => {

    const customData = {creator: 'email', users: {email: 'owner'}};
    const state = {id: 1, name: 'channel', messages: [], customData};
    const action = {
        type: LOGOUT_USER
    };

    const newState = activeChannel(state, action);
    expect(newState).toEqual(null);

    done();
});

test('activeChannel reducer > zero channels', async done => {

    const customData = {creator: 'email', users: {email: 'owner'}};
    const state = {id: 1, name: 'channel', messages: [], customData};
    const action = {
        type: ZERO_CHANNELS
    };

    const newState = activeChannel(state, action);
    expect(newState).toEqual(null);

    done();
});
