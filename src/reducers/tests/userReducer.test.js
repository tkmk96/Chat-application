import {FETCH_ALL_USERS, FETCH_AUTH_TOKEN, FETCH_CHANNELS, FETCH_USER, LOGOUT_USER} from '../../constants/actionTypes';
import {fetchedAllUsers, fetchedAuthToken, fetchedUser} from '../userReducer';

/*eslint no-undef:0*/
test('fetchedUser reducer > returns original state as default', async done => {

    const state = {
        email: 'test',
        name: 'test',
        password: 'test',
        avatarUrl: 'url'
    };
    const action = {
        type: FETCH_CHANNELS,
        payload: {}
    };

    const newState = fetchedUser(state, action);
    expect(newState).toEqual(state);

    done();
});

test('fetchedUser reducer > sets user', async done => {

    const user = {
        email: 'test',
        name: 'test',
        password: 'test',
        avatarUrl: 'url'
    };
    const action = {
        type: FETCH_USER,
        payload: user
    };

    const newState = fetchedUser({}, action);
    expect(newState).toEqual(user);

    done();
});

test('fetchedUser reducer > user logs out', async done => {

    const user = {
        email: 'test',
        name: 'test',
        password: 'test',
        avatarUrl: 'url'
    };
    const action = {
        type: LOGOUT_USER
    };

    const newState = fetchedUser(user, action);
    expect(newState).toEqual({});

    done();
});

test('fetchedAllUsers reducer > returns original state as default', async done => {

    const user = {
        email: 'test@abc.com',
        name: 'test',
        password: 'test',
        avatarUrl: 'url'
    };
    const state = {'test@abc.com': user};
    const action = {
        type: FETCH_CHANNELS,
        payload: {}
    };

    const newState = fetchedAllUsers(state, action);
    expect(newState).toEqual(state);

    done();
});

test('fetchedAllUsers reducer > fetches all users', async done => {

    const user = {
        email: 'test@abc.com',
        name: 'test',
        password: 'test',
        avatarUrl: 'url'
    };
    const state = {'test@abc.com': user};
    const action = {
        type: FETCH_ALL_USERS,
        payload: state
    };

    const newState = fetchedAllUsers({}, action);
    expect(newState).toEqual(state);

    done();
});

test('fetchedAllUsers reducer > fetches logged user', async done => {

    const user = {
        email: 'test@abc.com',
        name: 'test',
        password: 'test',
        avatarUrl: 'url'
    };
    const loggedUser = {
        email: 'test2@abc.com',
        name: 'test2',
        password: 'test2',
        avatarUrl: 'url'
    };
    const state = {'test@abc.com': user, 'test2@abc.com': loggedUser};
    let payload = {...loggedUser, name: 'honza'};
    const action = {
        type: FETCH_USER,
        payload: payload
    };

    const newState = fetchedAllUsers(state, action);
    expect(newState).toEqual({...state, 'test2@abc.com': payload});

    done();
});

test('fetchedAllUsers reducer > user logs out', async done => {

    const user = {
        email: 'test@abc.com',
        name: 'test',
        password: 'test',
        avatarUrl: 'url'
    };
    const state = {'test@abc.com': user};
    const action = {
        type: LOGOUT_USER
    };

    const newState = fetchedAllUsers(state, action);
    expect(newState).toEqual({});

    done();
});

test('fetchedAuthToken reducer > returns original state as default', async done => {

    const state = {'authToken': 'token'};
    const action = {
        type: FETCH_CHANNELS,
        payload: {}
    };

    const newState = fetchedAuthToken(state, action);
    expect(newState).toEqual(state);

    done();
});

test('fetchedAuthToken reducer > sets token', async done => {

    const state = {'authToken': 'token'};
    const action = {
        type: FETCH_AUTH_TOKEN,
        payload: state
    };

    const newState = fetchedAuthToken({}, action);
    expect(newState).toEqual(state);

    done();
});

test('fetchedAuthToken reducer > user logs out', async done => {

    const state = {'authToken': 'token'};
    const action = {
        type: LOGOUT_USER
    };

    const newState = fetchedAuthToken(state, action);
    expect(newState).toEqual(null);

    done();
});

