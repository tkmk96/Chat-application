import {createChannelFactory} from "./channelActions";
import {FETCH_CHANNELS, LOADING_CREATE_CHANNEL} from "../constants/actionTypes";
import {filterAndConvertChannels} from "../utils/convert";

test('dispatches actions in correct order', async done => {
    const name = 'test channel';
    let customData = {creator: 'email', users: {email: 'owner'}};
    const channels = [{id: 1, name, customData: JSON.stringify(customData)}];
    const channels2 = [{id: 1, name, customData: JSON.stringify(customData)}];
    const channelsResult = filterAndConvertChannels(channels2, 'email');

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

    expect(dispatch.mock.calls[0][0]).toEqual(expected[0]);
    expect(dispatch.mock.calls[1][0]).toEqual(expected[1]);
    expect(dispatch.mock.calls[2][0]).toEqual(expected[2]);

    // expect(dispatch).toHaveBeenCalledWith({
    //     type: LOADING_CREATE_CHANNEL,
    //     payload: true
    // });
    //
    // expect(dispatch).toHaveBeenCalledWith({
    //     type: FETCH_CHANNELS,
    //     payload: channels
    // });
    //
    // expect(dispatch).toHaveBeenLastCalledWith({
    //     type: LOADING_CREATE_CHANNEL,
    //     payload: false
    // });
    done();
});

// describe('userActions', () => {
//     it('Login successful, creates AUTHENTICATION_PENDING and AUTHENTICATION_SUCCESS', async () => {
//         // prepare
//         const expected = [
//             { type: LOADING_CREATE_CHANNEL },
//             { type: FETCH_CHANNELS }
//         ];
//
//         // mock the axios.post method, so it will just resolve the Promise.
//         axios.post = jest.fn((url) => {
//             return Promise.resolve();
//         });
//         // mock the dispatch and getState functions from Redux thunk.
//         const dispatch = jest.fn(),
//             getState = jest.fn(() => {url: 'https://endpoint.local'});
//
//         // execute
//         await loginButtonPressed('test_user', 'test_password')(dispatch, getState);
//
//         // verify
//         expect(dispatch.mock.calls[0][0]).toEqual(expected[0]);
//         expect(dispatch.mock.calls[1][0]).toEqual(expected[1]);
//     });