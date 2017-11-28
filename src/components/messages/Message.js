import React, {Component} from 'react';
import {connect} from 'react-redux';
import {deleteMessage, reactToMessage} from '../../actions/messageActions';
import {DISLIKE, LIKE} from '../../constants/reactionTypes';
import IconButton from '../generic/IconButton';

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
            <IconButton className='red darken-2' title='Delete' onClick={() => this._deleteMessage()} iconName='delete'/>
        </li>);
    }

    _renderEditButton() {
        return <li><IconButton className='yellow darken-2' title='Edit' iconName='edit'/></li>;
    }

    _renderLikeButton() {
        return (<li>
            <IconButton className='blue darken-2' title='Like' onClick={() => this._likeMessage()} iconName='thumb_up'/>
        </li>);
    }

    _renderDislikeButton() {
        return (
            <li>
                <IconButton className='blue darken-2' title='Dislike' onClick={() => this._dislikeMessage()} iconName='thumb_down'/>
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