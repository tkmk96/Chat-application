import React, {Component} from 'react';

class Message extends Component {
    render() {
        let {message, user} = this.props;
        return (
            <div>
                <div className={`chip message ${this.props.myMessage}`}>
                    <img src={user.avatarUrl} title={user.name}/>
                    <p className='messageText'>{message.value}</p>
                </div>
            </div>

        );
    }
}

export default Message;