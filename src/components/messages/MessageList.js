import React, {Component} from 'react';
import { connect } from 'react-redux';
import Message from './Message';
import MessageEdit from './MessageEdit';
import {editMessage} from '../../actions/messageActions';

class MessageList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            editedMessageId: null
        };
    }

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
            if (this.state.editedMessageId === message.id) {
                return <MessageEdit key={message.id} message={message} onEdit={(message) => this._onEditMessage(message)}/>;
            }
            else {
                const myMessage = message.createdBy === this.props.user.email;
                return <Message
                    key={message.id}
                    message={message}
                    user={this.props.users[message.createdBy]}
                    myMessage={myMessage ? 'myMessage' : ''}
                    onEdit={(id) => this.setState({editedMessageId: id})}
                />;
            }

        });
    }

    _onEditMessage(message) {
        this.props.editMessage(message);
        this.setState({editedMessageId: null});
    }
}

function mapStateToProps({activeChannel, user, users}) {
    return {
        user,
        activeChannel,
        users
    };
}
export default connect(mapStateToProps, {editMessage})(MessageList);