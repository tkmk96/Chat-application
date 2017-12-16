import {createChannelFactory} from "../channelActions";
import {FETCH_CHANNELS, LOADING_CREATE_CHANNEL} from "../../constants/actionTypes";
import {filterAndConvertChannels} from "../../utils/convert";

test('dispatches actions in correct order', async done => {
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

    expect(dispatch.mock.calls[0][0]).toEqual(expected[0]);
    expect(dispatch.mock.calls[1][0]).toEqual(expected[1]);
    expect(dispatch.mock.calls[2][0]).toEqual(expected[2]);
    done();
});
