import React, {Component} from 'react';

class Message extends Component {
    render() {
        let {message, user} = this.props;
        return(
            <div className={this.props.myMessage}>
                <div className='chip' style={{fontSize: '17px'}}>
                    <img src={user.avatarUrl} />
                    {message.value}
                </div>
            </div>

        );
    }
}

export default Message;