import React, {Component} from 'react';
import MessageList from './MessageList';
import MessageForm from './MessageForm';
import {connect} from 'react-redux';

class MessagePanel extends Component {
    render() {
        return (
            <div>
                <div>
                    <MessageList/>
                    <MessageForm/>
                </div>
            </div>
        );
    }
}

function mapStateToProps({activeChannel}) {
    return {
        activeChannel
    };
}

export default connect(mapStateToProps)(MessagePanel);