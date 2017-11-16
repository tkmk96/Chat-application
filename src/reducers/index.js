import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import {fetchedAuthToken, registeredUser} from './authReducer';

export default combineReducers({
    form: formReducer,
    user: registeredUser,
    authToken: fetchedAuthToken
});