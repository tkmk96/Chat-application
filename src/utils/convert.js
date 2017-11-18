export const convertChannelsArray = (channels) => {
    const channelsObject = {};
    channels.forEach(channel => {
        channelsObject[channel.id] =  channel;
    });
    return channelsObject;
};