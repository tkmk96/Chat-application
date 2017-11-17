import React, {Component} from 'react';
import MessageList from './MessageList';
import MessageForm from './MessageForm';

class MessagePanel extends Component {
    render() {
        return(
            <div className='col s8'>
                <MessageList/>
                <MessageForm/>
            </div>
        );
    }
}

export default MessagePanel;