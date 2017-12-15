import axios from 'axios';
import {changePrivilegeFactory, createChannelFactory, editChannelFactory,
    fetchChannelsFactory, removeChannelFactory, setActiveChannelFactory} from './channelActions';

export const createChannel = createChannelFactory(axios);
export const setActiveChannel = setActiveChannelFactory(axios);
export const editChannel = editChannelFactory({fetch: axios, setActiveChannel});
export const changePrivilege = changePrivilegeFactory({fetch: axios, editChannel});
export const fetchChannels = fetchChannelsFactory({fetch: axios, setActiveChannel});
export const removeChannel = removeChannelFactory({fetch: axios, setActiveChannel});
