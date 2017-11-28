import React, {Component} from 'react';
import {connect} from 'react-redux';
import {deleteMessage, reactToMessage} from '../../actions/messageActions';
import {DISLIKE, LIKE} from '../../constants/reactionTypes';

class Message extends Component {
    render() {
        const {message, user, myMessage, email} = this.props;
        const {likes, dislikes} = message.customData;
        return (
            <div className='fixed-action-btn horizontal click-to-toggle messageWrapper'>
                <a>
                    <div className={`chip message ${myMessage}`}>
                        <img src={user.avatarUrl} title={user.name}/>
                        <p className='messageText'>{message.value}</p>
                    </div>
                </a>
                <ul>
                    {myMessage && this._renderDeleteButton()}
                    {myMessage && this._renderEditButton()}
                    {!myMessage && !likes[email] && this._renderLikeButton()}
                    {!myMessage && !dislikes[email] && this._renderDislikeButton()}
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
        return <li><a className='btn-floating yellow darken-2' title='Edit'><i className='material-icons'>edit</i></a></li>;
    }

    _renderLikeButton() {
        return (<li>
            <a className='btn-floating blue darken-2' title='Like' onClick={() => this._likeMessage()}>
                <i className='material-icons'>thumb_up</i>
            </a>
        </li>);
    }

    _renderDislikeButton() {
        return (
            <li>
                <a className='btn-floating blue darken-2' title='Dislike' onClick={() => this._dislikeMessage()}>
                    <i className='material-icons'>thumb_down</i>
                </a>
            </li>
        );
    }

    _deleteMessage() {
        this.props.deleteMessage(this.props.message.id);
    }

    _likeMessage() {
        this.props.reactToMessage(this.props.message, LIKE);
    }

    _dislikeMessage() {
        this.props.reactToMessage(this.props.message, DISLIKE);
    }
}

function mapStateToProps({user}) {
    return {
        email: user.email
    };
}

export default connect(mapStateToProps, {deleteMessage, reactToMessage})(Message);