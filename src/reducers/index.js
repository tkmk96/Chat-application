import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import {fetchedAuthToken, loggedUser} from './authReducer';
import {fetchChannel} from './channelReducer';
import {fetchMessages} from './messageReducer';

export default combineReducers({
    form: formReducer,
    user: loggedUser,
    authToken: fetchedAuthToken,
    channels: fetchChannel,
    messages: fetchMessages
});