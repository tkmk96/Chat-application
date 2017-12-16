import axios from 'axios';
import {
    changePrivilegeFactory, createChannelFactory, editChannelFactory,
    fetchChannelsFactory, inviteUserFactory, removeChannelFactory, setActiveChannelFactory
} from './channelActions';

import {
    editUserNameFactory, fetchAllUsersFactory, fetchUserDataFactory, loginUserFactory,
    registerUserFactory, uploadAvatarFactory, fetchTokenFactory, fetchDataFactory, fetchFileUrlFactory, updateUserDataFactory
} from './userActions';

import {createMessageFactory, deleteMessageFactory, editMessageFactory, reactToMessageFactory} from './messageActions';

export const createChannel = createChannelFactory(axios);
export const setActiveChannel = setActiveChannelFactory(axios);
export const editChannel = editChannelFactory({fetch: axios, setActiveChannel});
export const changePrivilege = changePrivilegeFactory(editChannel);
export const inviteUser = inviteUserFactory(editChannel);
export const fetchChannels = fetchChannelsFactory({fetch: axios, setActiveChannel});
export const removeChannel = removeChannelFactory({fetch: axios, setActiveChannel});

export const fetchToken = fetchTokenFactory(axios);
export const fetchData = fetchDataFactory(axios);
export const fetchFileUrl = fetchFileUrlFactory(axios);
export const updateUserData = updateUserDataFactory(axios);
export const registerUser = registerUserFactory({fetch: axios, fetchToken});
export const fetchUserData = fetchUserDataFactory({fetchData});
export const fetchAllUsers = fetchAllUsersFactory(axios);
export const loginUser = loginUserFactory({fetchToken, fetchData, fetchAllUsers});
export const editUserName = editUserNameFactory({updateUserData});
export const uploadAvatar = uploadAvatarFactory({fetch: axios, fetchFileUrl, updateUserData});

export const createMessage = createMessageFactory({fetch: axios, setActiveChannel});
export const deleteMessage = deleteMessageFactory({fetch: axios, setActiveChannel});
export const editMessage = editMessageFactory({fetch: axios, setActiveChannel});
export const reactToMessage = reactToMessageFactory({editMessage});
