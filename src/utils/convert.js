const convertChannelsArray = (channels) => {
    const channelsObject = {};
    channels.forEach(channel => {
        channelsObject[channel.id] =  channel;
    });
    return channelsObject;
};

export const filterAndConvertChannels = (channels, email) => {
    const filtered = channels.filter(channel => {
        channel.customData = JSON.parse(channel.customData);
        return channel.customData.users.hasOwnProperty(email);
    });
    return convertChannelsArray(filtered);
};

export const convertUsersArray = (users) => {
    const usersObject = {};
    users.forEach(({email, customData}) => {
        usersObject[email] = {email, ...JSON.parse(customData)};
    });
    return usersObject;
};