import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import {fetchedAllUsers, fetchedAuthToken, fetchedUser} from './userReducer';
import {activeChannel, fetchChannel} from './channelReducer';

export default combineReducers({
    form: formReducer,
    user: fetchedUser,
    authToken: fetchedAuthToken,
    channels: fetchChannel,
    activeChannel: activeChannel,
    users: fetchedAllUsers
});