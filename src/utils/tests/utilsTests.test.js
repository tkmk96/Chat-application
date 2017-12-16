import {parseMessages, filterAndConvertChannels, convertUsersArray} from '../convert';


/* eslint-disable no-undef */
test('testing utility function > parse messages', async done => {
    const customData = {likes: {}, dislikes: {}};
    const message = {id: 1, createdBy: 'email', value: '<p>some wise words</p>', customData: JSON.stringify(customData)};
    const expected = {...message, customData};
    expect(parseMessages([message])[0]).toEqual(expected);
    done();
});

test('testing utility function > filter and convert channels', async done => {
    const customData1 = {creator: 'email', users: {email: 'owner', email2: 'user'}};
    const channel1 = {id: 1, name: 'channel', messages: [], customData: JSON.stringify(customData1)};

    const customData2 = {creator: 'email2', users: {email2: 'owner'}};
    const channel2 = {id: 2, name: 'notmychannel', messages: [], customData: JSON.stringify(customData2)};

    const expectedChannel = {...channel1, customData: customData1};
    const expected = {'1': expectedChannel};

    expect(filterAndConvertChannels([channel1, channel2], 'email')).toEqual(expected);
    done();
});

test('testing utility function > convert user array', async done => {
    const customData1 = {name: 'user1', password: 'pass'};
    const user1 = {email: 'email1', customData: JSON.stringify(customData1)};

    const customData2 = {name: 'user2', password: 'ssap'};
    const user2 = {email: 'email2', customData: JSON.stringify(customData2)};

    const expected = {
        email1: {email: 'email1', ...customData1},
        email2: {email: 'email2', ...customData2}
    };

    expect(convertUsersArray([user1, user2])).toEqual(expected);
    done();
});
