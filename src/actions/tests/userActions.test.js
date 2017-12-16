/*eslint no-undef:0*/
import {
    FETCH_ALL_USERS, FETCH_AUTH_TOKEN, FETCH_USER, LOADING_LOGIN,
    LOADING_REGISTER
} from '../../constants/actionTypes';
import {checkCalls} from '../../utils/testUtils';
import {AUTH_EMAIL, AUTH_TOKEN} from '../../constants/storageKeys';
import {loginUserFactory, registerUserFactory} from '../userActions';

test('register user > actions dispatch in correct order', async done => {
    const email = 'email';
    const customData = {name: 'janko', password: 'test'};
    const history = {push: jest.fn()};
    const token = 'token';
    const expected = [
        { type: LOADING_REGISTER, payload: true },
        { type: FETCH_USER, payload:  {email, ...customData}},
        { type: FETCH_AUTH_TOKEN, payload: token},
        { type: LOADING_REGISTER, payload: false }
    ];

    const dispatch = jest.fn();

    const registerUser = registerUserFactory({
        fetch: () => Promise.resolve(),
        fetchToken: (email) => Promise.resolve(token)
    });
    await registerUser(email, customData, history)(dispatch);

    checkCalls(dispatch, expected);
    expect(localStorage.setItem.mock.calls[0][0]).toEqual(AUTH_EMAIL);
    expect(localStorage.setItem.mock.calls[0][1]).toEqual(email);

    expect(localStorage.setItem.mock.calls[1][0]).toEqual(AUTH_TOKEN);
    expect(localStorage.setItem.mock.calls[1][1]).toEqual(token);

    expect(history.push.mock.calls[0][0]).toEqual('/');

    done();
});

test('login user > actions dispatch in correct order', async done => {
    const email = 'email';
    const customData = {name: 'janko', password: 'test'};
    const user = {email, ...customData};
    const history = {push: jest.fn()};
    const token = 'token';
    const expected = [
        { type: LOADING_LOGIN, payload: true },
        { type: FETCH_AUTH_TOKEN, payload: token},
        { type: FETCH_ALL_USERS, payload: [user]},
        { type: FETCH_USER, payload: user},
        { type: LOADING_LOGIN, payload: false }
    ];

    const dispatch = jest.fn();

    const loginUser = loginUserFactory({
        fetch: () => Promise.resolve(),
        fetchToken: (email) => Promise.resolve(token),
        fetchData: (email, token) => Promise.resolve({email, customData: JSON.stringify(customData)}),
        fetchAllUsers: (token) => { return {type: FETCH_ALL_USERS, payload: [user]};}
    });
    await loginUser(email, 'test', history)(dispatch);

    checkCalls(dispatch, expected);
    expect(localStorage.setItem.mock.calls[0][0]).toEqual(AUTH_TOKEN);
    expect(localStorage.setItem.mock.calls[0][1]).toEqual(token);

    expect(localStorage.setItem.mock.calls[1][0]).toEqual(AUTH_EMAIL);
    expect(localStorage.setItem.mock.calls[1][1]).toEqual(email);

    expect(history.push.mock.calls[0][0]).toEqual('/');

    done();
});
