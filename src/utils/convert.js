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
        return channel.customData.users.indexOf(email) > -1 ||
            channel.customData.admins.indexOf(email) > -1 ||
            channel.customData.owners.indexOf(email) > -1;
    });
    return convertChannelsArray(filtered);
};