import React, {Component} from 'react';
import ChannelList from './channels/ChannelList';
import MessagePanel from './messages/MessagePanel';

class Main extends Component {

    render() {
        return(
            <div className='row'>
                <ChannelList />
                <MessagePanel/>
            </div>
        );
    }
}

export default Main;