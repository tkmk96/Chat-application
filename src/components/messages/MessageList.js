import React, {Component} from 'react';
import { connect } from 'react-redux';
import Message from './Message';
import {editMessage} from '../../actions';
import PropTypes from 'prop-types';

class MessageList extends Component {
    static propTypes = {
        user: PropTypes.object.isRequired,
        activeChannel: PropTypes.object.isRequired,
        users: PropTypes.object.isRequired,
        onEdit: PropTypes.func.isRequired,
        editMessage: PropTypes.func.isRequired
    };

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
            return <Message
                key={message.id}
                message={message}
                user={this.props.users[message.createdBy]}
                myMessage={myMessage ? 'myMessage' : ''}
                onEdit={() => this.props.onEdit(message)}
            />;
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