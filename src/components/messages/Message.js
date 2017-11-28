import React, {Component} from 'react';
import {connect} from 'react-redux';
import {deleteMessage} from '../../actions/messageActions';

class Message extends Component {
    render() {
        let {message, user} = this.props;
        return (
            <div className='fixed-action-btn horizontal click-to-toggle messageWrapper'>
                <a>
                    <div className={`chip message ${this.props.myMessage}`}>
                        <img src={user.avatarUrl} title={user.name}/>
                        <p className='messageText'>{message.value}</p>
                    </div>
                </a>
                <ul>
                    {this.props.myMessage && this._renderDeleteButton()}
                    {this.props.myMessage && this._renderEditButton()}
                    <li>
                        <a className='btn-floating blue darken-2' title='Delete'>
                            <i className='material-icons'>thumb_up</i>
                        </a>
                    </li>
                    <li><a className='btn-floating blue darken-2' title='Delete'><i className='material-icons'>thumb_down</i></a></li>

                </ul>
            </div>

        );
    }

    _renderDeleteButton() {
        return (<li>
            <a className='btn-floating red darken-2' title='Delete' onClick={() => this._deleteMessage()}>
                <i className='material-icons'>delete</i>
            </a>
        </li>);
    }

    _renderEditButton() {
        return <li><a className='btn-floating yellow darken-2' title='Delete'><i className='material-icons'>edit</i></a></li>;
    }

    _deleteMessage() {
        this.props.deleteMessage(this.props.message.id);
    }
}

export default connect(null, {deleteMessage})(Message);