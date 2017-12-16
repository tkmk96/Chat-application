import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import {fetchedAllUsers, fetchedAuthToken, fetchedUser} from './userReducer';
import {activeChannel, fetchChannels} from './channelReducer';
import {loading} from './loaderReducer';

export default combineReducers({
    form: formReducer,
    user: fetchedUser,
    authToken: fetchedAuthToken,
    channels: fetchChannels,
    activeChannel: activeChannel,
    users: fetchedAllUsers,
    loading: loading
});