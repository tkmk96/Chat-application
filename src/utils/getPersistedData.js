import {AUTH_EMAIL, AUTH_TOKEN} from '../constants/storageKeys';

export const getPersistedData = () => {
    const token = localStorage.getItem(AUTH_TOKEN);
    const email = localStorage.getItem(AUTH_EMAIL);
    return { authToken: token, user: {email}};
};