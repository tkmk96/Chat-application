import axios from 'axios';
import {changePrivilegeFactory, createChannelFactory, editChannelFactory,
    fetchChannelsFactory, removeChannelFactory, setActiveChannelFactory} from './channelActions';

import {editUserNameFactory, fetchAllUsersFactory, fetchUserDataFactory, loginUserFactory,
    registerUserFactory, uploadAvatarFactory} from './userActions';

import {createMessageFactory, deleteMessageFactory, editMessageFactory, reactToMessageFactory} from './messageActions';

export const createChannel = createChannelFactory(axios);
export const setActiveChannel = setActiveChannelFactory(axios);
export const editChannel = editChannelFactory({fetch: axios, setActiveChannel});
export const changePrivilege = changePrivilegeFactory({fetch: axios, editChannel});
export const fetchChannels = fetchChannelsFactory({fetch: axios, setActiveChannel});
export const removeChannel = removeChannelFactory({fetch: axios, setActiveChannel});

export const registerUser = registerUserFactory(axios);
export const fetchUserData = fetchUserDataFactory(axios);
export const fetchAllUsers = fetchAllUsersFactory(axios);
export const editUserName = editUserNameFactory(axios);
export const uploadAvatar = uploadAvatarFactory(axios);
export const loginUser = loginUserFactory({fetch: axios, fetchAllUsers});

export const createMessage = createMessageFactory({fetch: axios, setActiveChannel});
export const deleteMessage = deleteMessageFactory({fetch: axios, setActiveChannel});
export const editMessage = editMessageFactory({fetch: axios, setActiveChannel});
export const reactToMessage = reactToMessageFactory({editMessage});
