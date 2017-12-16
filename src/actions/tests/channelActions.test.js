import {
    changePrivilegeFactory,
    createChannelFactory, editChannelFactory, fetchChannelsFactory, inviteUserFactory, removeChannelFactory,
    setActiveChannelFactory
} from '../channelActions';
import {
    FETCH_CHANNELS, LOADING_ACTIVE_CHANNEL, LOADING_CREATE_CHANNEL, LOADING_DELETE_CHANNEL, LOADING_EDIT_CHANNEL,
    SET_ACTIVE_CHANNEL, ZERO_CHANNELS
} from '../../constants/actionTypes';
import {filterAndConvertChannels, parseMessages} from '../../utils/convert';
import {List} from 'immutable';

import {checkCalls} from '../../utils/testUtils';
import {SubmissionError} from 'redux-form';

/* eslint-disable no-undef */
test('testing create channel > actions dispatch in correct order', async done => {
    const name = 'test channel';
    const customData = {creator: 'email', users: {email: 'owner'}};
    const channels = [{id: 1, name, customData: JSON.stringify(customData)}];
    const channelsResult = filterAndConvertChannels(channels, 'email');

    const expected = [
        { type: LOADING_CREATE_CHANNEL, payload: true },
        { type: FETCH_CHANNELS, payload:  channelsResult},
        { type: LOADING_CREATE_CHANNEL, payload: false }
    ];

    const dispatch = jest.fn();
    const getState = () => ({
        authToken: 'token',
        user: {email: 'email'}
    });

    const createChannel = createChannelFactory(() => Promise.resolve({data: {channels}}));
    await createChannel(name)(dispatch, getState);

    checkCalls(dispatch, expected);
    done();
});

test('testing edit channel > actions dispatch in correct order', async done => {
    const name = 'edited channel';
    const customData = {creator: 'email', users: {email: 'owner'}};
    const channel = {id: 1, name: 'original', messages: [], customData};

    const channels = [{id: 1, name, customData: JSON.stringify(customData)}];
    const channelsResult = filterAndConvertChannels(channels, 'email');

    const expected = [
        { type: LOADING_EDIT_CHANNEL, payload: true },
        { type: FETCH_CHANNELS, payload: channelsResult},
        { type: SET_ACTIVE_CHANNEL, payload: 1},
        { type: LOADING_EDIT_CHANNEL, payload: false }
    ];

    const dispatch = jest.fn();
    const getState = () => ({
        authToken: 'token',
        user: {email: 'email'}
    });

    const editChannel = editChannelFactory({
        fetch: () => Promise.resolve({data: {channels}}),
        setActiveChannel: () => {
            return {type: SET_ACTIVE_CHANNEL, payload: 1};
        }});
    await editChannel(channel)(dispatch, getState);

    checkCalls(dispatch, expected);

    done();
});

test('testing edit channel > actions dispatch in correct order, user left his last channel', async done => {
    const name = 'edited channel';
    const customData = {creator: 'email2', users: {email2: 'owner', email: 'user'}};

    const channel = {id: 1, name: 'original', messages: [], customData};

    const customDataEdited = {creator: 'email2', users: {email2: 'owner'}};
    const channels = [{id: 1, name, customData: JSON.stringify(customDataEdited)}];
    const channelsResult = filterAndConvertChannels(channels, 'email');

    const expected = [
        { type: LOADING_EDIT_CHANNEL, payload: true },
        { type: FETCH_CHANNELS, payload: channelsResult},
        { type: ZERO_CHANNELS},
        { type: LOADING_EDIT_CHANNEL, payload: false }
    ];

    const dispatch = jest.fn();
    const getState = () => ({
        authToken: 'token',
        user: {email: 'email'}
    });

    const editChannel = editChannelFactory({
        fetch: () => Promise.resolve({data: {channels}}),
        setActiveChannel: () => Promise.resolve()});
    await editChannel(channel)(dispatch, getState);

    checkCalls(dispatch, expected);

    done();
});

test('testing remove channel > actions dispatch in correct order', async done => {
    const customData1 = {creator: 'email', users: {email: 'owner'}};
    const customData2 = {creator: 'email2', users: {email2: 'owner', email: 'user'}};

    const channel1 = {id: 1, name: 'removed', messages: [], customData: JSON.stringify(customData1)};
    const channel2 = {id: 2, name: 'channel2', messages: [], customData: JSON.stringify(customData2)};

    const channels = [channel1, channel2];
    const channelsResult = filterAndConvertChannels([channel2], 'email');

    const expected = [
        { type: LOADING_DELETE_CHANNEL, payload: true },
        { type: FETCH_CHANNELS, payload: channelsResult},
        { type: SET_ACTIVE_CHANNEL, payload: 2},
        { type: LOADING_DELETE_CHANNEL, payload: false }
    ];

    const dispatch = jest.fn();
    const getState = () => ({
        authToken: 'token',
        user: {email: 'email'}
    });

    const removeChannel = removeChannelFactory({
        fetch: () => Promise.resolve({data: {channels: channels.filter((channel) => channel.id !== 1)}}),
        setActiveChannel: () => {
            return {type: SET_ACTIVE_CHANNEL, payload: 2};
        }});
    await removeChannel(channels)(dispatch, getState);

    checkCalls(dispatch, expected);

    done();
});

test('testing fetch channels > actions dispatch in correct order', async done => {
    const customData1 = {creator: 'email', users: {email: 'owner'}};
    const customData2 = {creator: 'email2', users: {email2: 'owner', email: 'user'}};

    const channel1 = {id: 1, name: 'removed', messages: [], customData: JSON.stringify(customData1)};
    const channel2 = {id: 2, name: 'channel2', messages: [], customData: JSON.stringify(customData2)};

    const channels = [channel1, channel2];
    const channelsResult = filterAndConvertChannels(channels, 'email');

    const expected = [
        { type: FETCH_CHANNELS, payload: channelsResult},
        { type: SET_ACTIVE_CHANNEL, payload: 1},
    ];

    const dispatch = jest.fn();
    const getState = () => ({
        authToken: 'token',
        user: {email: 'email'}
    });

    const fetchChannels = fetchChannelsFactory({
        fetch: () => Promise.resolve({data: {channels: channels}}),
        setActiveChannel: () => {
            return { type: SET_ACTIVE_CHANNEL, payload: 1};
        }
    });
    await fetchChannels()(dispatch, getState);

    checkCalls(dispatch, expected);

    done();
});

test('testing set active channel > actions dispatch in correct order', async done => {
    const customData1 = {creator: 'email', users: {email: 'owner'}};
    const channel1 = {id: 1, name: 'removed', messages: [], customData: JSON.stringify(customData1)};
    const channels = filterAndConvertChannels([channel1], 'email');

    const customData = {likes: {}, dislikes: {}};
    const messages = [{id: 1, createdBy: 'email', value: '<p>some wise words</p>', customData: JSON.stringify(customData)}];
    const messagesResult = parseMessages(messages);

    const expected = [
        { type: LOADING_ACTIVE_CHANNEL, payload: true },
        { type: SET_ACTIVE_CHANNEL, payload: {...channels['1'], messages: List(messagesResult)}},
        { type: LOADING_ACTIVE_CHANNEL, payload: false }
    ];

    const dispatch = jest.fn();
    const getState = () => ({
        authToken: 'token',
        channels
    });

    const setActiveChannel = setActiveChannelFactory( () => Promise.resolve({data: messages}) );
    await setActiveChannel(1)(dispatch, getState);

    checkCalls(dispatch, expected);

    done();
});

test('testing change privilege > actions dispatch in correct order', async done => {
    const customData = {creator: 'email', users: {email: 'owner', email2: 'user'}};
    const channel = {id: 1, name: 'channel', messages: [], customData};

    const newCustomData = {creator: 'email', users: {email: 'owner', email2: 'admin'}};

    const expected = [
        { ...channel, customData: newCustomData }
    ];

    const dispatch = jest.fn();
    const editChannel = jest.fn();

    const changePrivilege = changePrivilegeFactory(
        editChannel
    );
    await changePrivilege(channel, 'email2', 'admin')(dispatch);

    checkCalls(editChannel, expected);

    done();
});

test('testing invite user > actions dispatch in correct order', async done => {
    const customData = {creator: 'email', users: {email: 'owner'}};
    const channel = {id: 1, name: 'channel', messages: [], customData};

    const newCustomData = {creator: 'email', users: {email: 'owner', email2: 'user'}};

    const expected = [
        { ...channel, customData: newCustomData }
    ];

    const dispatch = jest.fn();
    const getState = () => ({
        users: {'email': {name: 'jano'}, 'email2': {name: 'honza'}},
    });
    const editChannel = jest.fn();

    const inviteUser = inviteUserFactory(
        editChannel
    );
    await inviteUser(channel, 'email2')(dispatch, getState);

    checkCalls(editChannel, expected);

    done();
});

test('testing invite user > inviting existing user throws exception', async done => {
    const customData = {creator: 'email', users: {email: 'owner'}};
    const channel = {id: 1, name: 'channel', messages: [], customData};

    const dispatch = jest.fn();
    const getState = () => ({
        users: {'email': {name: 'jano'}, 'email2': {name: 'honza'}},
    });
    const editChannel = jest.fn();

    const inviteUser = inviteUserFactory(
        editChannel
    );

    let threw = false;
    try {
        await inviteUser(channel, 'email')(dispatch, getState);
    } catch(ex) {
        threw = ex instanceof SubmissionError;
    }
    expect(threw).toBe(true);
    done();
});


