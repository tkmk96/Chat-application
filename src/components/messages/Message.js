import React, {Component} from 'react';
import PersonImg from '../../../static/assets/person.jpg';

class Message extends Component {
    render() {
        return(
            <div className={this.props.myMessage}>
                <div className='chip'>
                    <img src={PersonImg} />
                    {this.props.text}
                </div>
            </div>

        );
    }
}

export default Message;