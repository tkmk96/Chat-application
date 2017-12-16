import {createChannelFactory, editChannelFactory, fetchChannelsFactory, removeChannelFactory} from "../channelActions";
import {
    FETCH_CHANNELS, LOADING_CREATE_CHANNEL, LOADING_DELETE_CHANNEL, LOADING_EDIT_CHANNEL,
    SET_ACTIVE_CHANNEL, ZERO_CHANNELS
} from "../../constants/actionTypes";
import {filterAndConvertChannels} from "../../utils/convert";

import {checkCalls} from "../../utils/testUtils";

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
        { type: SET_ACTIVE_CHANNEL, payload:  {...channelsResult['1'], messages: []}},
        { type: LOADING_EDIT_CHANNEL, payload: false }
    ];

    const dispatch = jest.fn();
    const getState = () => ({
        authToken: 'token',
        user: {email: 'email'}
    });

    const editChannel = editChannelFactory({
        fetch: () => Promise.resolve({data: {channels}}),
        setActiveChannel: (id) => Promise.resolve()});
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
        setActiveChannel: (id) => Promise.resolve()});
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
        setActiveChannel: () => { return { type: SET_ACTIVE_CHANNEL, payload: 2}}});
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
        setActiveChannel: () => { return { type: SET_ACTIVE_CHANNEL, payload: 1}}});
    await fetchChannels()(dispatch, getState);

    checkCalls(dispatch, expected);

    done();
});


