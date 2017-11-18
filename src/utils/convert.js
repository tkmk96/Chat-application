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
        return channel.customData.creator === email;
    });
    return convertChannelsArray(filtered);
};