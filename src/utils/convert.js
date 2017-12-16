const convertChannelsArray = (channels) => {
    const channelsObject = {};
    channels.forEach(channel => {
        channelsObject[channel.id] =  channel;
    });
    return channelsObject;
};

export const filterAndConvertChannels = (channels, email) => {
    const parsed = channels.map(channel => {
        return {
            ...channel,
            customData: JSON.parse(channel.customData)
        };
    });

    const filtered = parsed.filter(channel => {
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

export const parseMessages = (messages) => {
    messages.forEach(message => {
        message.customData = JSON.parse(message.customData);
    });
    return messages;
};