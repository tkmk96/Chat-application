import React, {Component} from 'react';
import { connect } from 'react-redux';
import Message from './Message';
import * as ReactDOM from 'react-dom';

class MessageList extends Component {
    render() {
        const {activeChannel} = this.props;
        return(
            <div className='messageList' ref={(list) => this.list = list }>
                {this._renderMessages(activeChannel.messages)}
            </div>
        );
    }

    componentDidMount() {
        this.list.scrollTop = this.list.scrollHeight;
    }

    componentDidUpdate() {
        this.list.scrollTop = this.list.scrollHeight;
    }

    _renderMessages(messages) {
        return messages.map(message => {
            const myMessage = message.createdBy === this.props.user.email;
            return <Message key={message.id} text={message.value} myMessage={myMessage ? 'myMessage' : ''}/>;
        });
    }
}

function mapStateToProps({activeChannel, user}) {
    return {
        user,
        activeChannel
    };
}
export default connect(mapStateToProps)(MessageList);