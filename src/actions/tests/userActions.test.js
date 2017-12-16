/*eslint no-undef:0*/
import {
    FETCH_ALL_USERS, FETCH_AUTH_TOKEN, FETCH_USER, LOADING_CHANGE_AVATAR, LOADING_CHANGE_USER_NAME, LOADING_LOGIN,
    LOADING_REGISTER
} from '../../constants/actionTypes';
import {checkCalls} from '../../utils/testUtils';
import {AUTH_EMAIL, AUTH_TOKEN} from '../../constants/storageKeys';
import {
    editUserNameFactory, fetchAllUsersFactory, fetchUserDataFactory, loginUserFactory,
    registerUserFactory, uploadAvatarFactory
} from '../userActions';
import {convertUsersArray} from '../../utils/convert';

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
    expect(localStorage.setItem).toHaveBeenCalledWith(AUTH_TOKEN, token);
    expect(localStorage.setItem).toHaveBeenCalledWith(AUTH_EMAIL, email);

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
    expect(localStorage.setItem).toHaveBeenCalledWith(AUTH_TOKEN, token);
    expect(localStorage.setItem).toHaveBeenCalledWith(AUTH_EMAIL, email);
    expect(history.push.mock.calls[0][0]).toEqual('/');

    done();
});

test('fetch user data > actions dispatch in correct order', async done => {
    const email = 'email';
    const customData = {name: 'janko', password: 'test'};
    const user = {email, ...customData};
    const expected = [
        { type: FETCH_USER, payload: user},
    ];

    const dispatch = jest.fn();
    const getState = () => ({
        user: {email: 'email'},
        authToken: 'token'
    });

    const fetchUserData = fetchUserDataFactory({
        fetchData: (email, token) => Promise.resolve({email, customData: JSON.stringify(customData)})
    });
    await fetchUserData()(dispatch, getState);

    checkCalls(dispatch, expected);

    done();
});

test('fetch all users > actions dispatch in correct order', async done => {
    const email = 'email';
    const customData = {name: 'janko', password: 'test'};
    const user = {email, customData: JSON.stringify(customData)};
    const expected = [
        { type: FETCH_ALL_USERS, payload: convertUsersArray([user])},
    ];

    const dispatch = jest.fn();

    const fetchAllUsers = fetchAllUsersFactory(() => Promise.resolve({data: [user]}));
    await fetchAllUsers('token')(dispatch);

    checkCalls(dispatch, expected);

    done();
});

test('edit user name > actions dispatch in correct order', async done => {
    const email = 'email';
    const newUser = {email, customData: JSON.stringify({name: 'honza', password: 'test'})};
    const expected = [
        { type: LOADING_CHANGE_USER_NAME, payload: true},
        { type: FETCH_USER, payload: {email, name: 'honza', password: 'test'}},
    ];

    const dispatch = jest.fn();
    const getState = () => ({
        authToken: 'token'
    });

    const editUserName = editUserNameFactory({updateUserData: () => Promise.resolve({...newUser})});
    await editUserName('honza')(dispatch, getState);

    checkCalls(dispatch, expected);

    done();
});

test('upload avatar > actions dispatch in correct order', async done => {
    const email = 'email';
    const newUser = {email, customData: JSON.stringify({name: 'honza', password: 'test', avatarUrl: 'url'})};
    const expected = [
        { type: LOADING_CHANGE_AVATAR, payload: true},
        { type: FETCH_USER, payload: {email, name: 'honza', password: 'test', avatarUrl: 'url'}},
        { type: LOADING_CHANGE_AVATAR, payload: false},
    ];

    const dispatch = jest.fn();
    const getState = () => ({
        authToken: 'token'
    });

    const uploadAvatar = uploadAvatarFactory({
        fetch: () => Promise.resolve({data: [{id: 1}]}),
        fetchFileUrl: () => { return 'url';},
        updateUserData: () => Promise.resolve({...newUser}),
    });
    await uploadAvatar('file')(dispatch, getState);

    checkCalls(dispatch, expected);

    done();
});
