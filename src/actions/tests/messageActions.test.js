import {checkCalls} from '../../utils/testUtils';
import {LOADING_ACTIVE_CHANNEL, SET_ACTIVE_CHANNEL} from '../../constants/actionTypes';
import {createMessageFactory, deleteMessageFactory, editMessageFactory, reactToMessageFactory} from '../messageActions';
import {LIKE} from '../../constants/reactionTypes';

test('create message > actions dispatch in correct order', async done => {
    const customDataChannel = {creator: 'email', users: {email: 'owner'}};

    const activeChannel = {id: 1, name: 'channel', messages: [], customData: JSON.stringify(customDataChannel)};


    const expected = [
        { type: LOADING_ACTIVE_CHANNEL, payload: true },
        { type: SET_ACTIVE_CHANNEL, payload: 1}
    ];

    const dispatch = jest.fn();
    const getState = () => ({
        authToken: 'token',
        activeChannel,
        user: {email: 'email'}
    });

    const createMessage = createMessageFactory({
        fetch: () => Promise.resolve(),
        setActiveChannel: () => { return { type: SET_ACTIVE_CHANNEL, payload: 1}}});
    await createMessage('text', [])(dispatch, getState);

    checkCalls(dispatch, expected);

    done();
});

test('edit message > actions dispatch in correct order', async done => {
    const customDataChannel = {creator: 'email', users: {email: 'owner'}};
    const customDataMessage = {likes: {}, dislikes: {}};

    const message = {id: 1, value: 'ahoj', createdBy: 'email', customData: customDataMessage};
    const editedMessage = {id: 1, value: 'caau', createdBy: 'email', customData: JSON.stringify(customDataMessage)};
    const activeChannel = {id: 1, name: 'channel', messages: [message], customData: JSON.stringify(customDataChannel)};

    const expected = [
        { type: LOADING_ACTIVE_CHANNEL, payload: true },
        { type: SET_ACTIVE_CHANNEL, payload: 1}
    ];

    const dispatch = jest.fn();
    const getState = () => ({
        authToken: 'token',
        activeChannel
    });

    const editMessage = editMessageFactory({
        fetch: () => Promise.resolve(),
        setActiveChannel: () => { return { type: SET_ACTIVE_CHANNEL, payload: 1}}});
    await editMessage(editedMessage)(dispatch, getState);

    checkCalls(dispatch, expected);

    done();
});

test('react to message > actions dispatch in correct order', async done => {
    const customDataMessage = {likes: {}, dislikes: {}};
    const message = {id: 1, value: 'ahoj', createdBy: 'email', customData: customDataMessage};

    const expected = [
        { type: LOADING_ACTIVE_CHANNEL, payload: true },
        { type: SET_ACTIVE_CHANNEL, payload: 1}
    ];

    const dispatch = jest.fn();
    const getState = () => ({
        user: {email: 'email'}
    });

    const reactToMessage = reactToMessageFactory({
        editMessage: () => { return { type: SET_ACTIVE_CHANNEL, payload: 1}}});
    await reactToMessage(message, LIKE)(dispatch, getState);

    checkCalls(dispatch, expected);

    done();
});

test('delete message > actions dispatch in correct order', async done => {
    const customDataChannel = {creator: 'email', users: {email: 'owner'}};
    const customDataMessage = {likes: {}, dislikes: {}};

    const message = {id: 1, value: 'ahoj', createdBy: 'email', customData: customDataMessage};
    const activeChannel = {id: 1, name: 'channel', messages: [message], customData: customDataChannel};

    const expected = [
        { type: LOADING_ACTIVE_CHANNEL, payload: true },
        { type: SET_ACTIVE_CHANNEL, payload: 1}
    ];

    const dispatch = jest.fn();
    const getState = () => ({
        authToken: 'token',
        activeChannel
    });

    const deleteMessage = deleteMessageFactory({
        fetch: () => Promise.resolve(),
        setActiveChannel: () => { return { type: SET_ACTIVE_CHANNEL, payload: 1}}});
    await deleteMessage(1)(dispatch, getState);

    checkCalls(dispatch, expected);

    done();
});