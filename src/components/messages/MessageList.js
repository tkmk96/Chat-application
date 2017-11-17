import React, {Component} from 'react';
import { connect } from 'react-redux';
import Message from './Message';

class MessageList extends Component {
    render() {
        return(
            <div>
                {this._renderMessages()}
            </div>
        );
    }

    _renderMessages() {
        return this.props.messages.map(message => {
            return <Message key={message.id} text={message.value}/>;
        });
    }
}

function mapStateToProps({activeChannel}) {
    return {
        messages: activeChannel.messages
    };
}
export default connect(mapStateToProps)(MessageList);