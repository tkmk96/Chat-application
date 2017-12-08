import React, {Component} from 'react';
import {connect} from 'react-redux';
import {deleteMessage, reactToMessage} from '../../actions/messageActions';
import {DISLIKE, LIKE} from '../../constants/reactionTypes';
import IconButton from '../generic/IconButton';

class Message extends Component {
    render() {
        const {message, user, myMessage, email} = this.props;
        const {likes, dislikes, images, files} = message.customData;
        const numberOfLikes = Object.keys(likes).length;
        const numberOfDislikes = Object.keys(dislikes).length;
        return (
            <div>
                <div className='fixed-action-btn horizontal click-to-toggle messageWrapper col s10'>
                    <a>
                        <div className={`chip message ${myMessage}`}>
                            <img src={user.avatarUrl} title={user.name}/>
                            <div className='messageText' dangerouslySetInnerHTML={{__html: message.value}}/>
                        </div>
                    </a>
                    <ul>
                        {myMessage && this._renderDeleteButton()}
                        {myMessage && this._renderEditButton()}
                        {!myMessage && !likes[email] && this._renderLikeButton()}
                        {!myMessage && !dislikes[email] && this._renderDislikeButton()}
                    </ul>
                </div>
                <div className='col s2'>
                    {numberOfDislikes > 0 &&
                    <span className='like'><i
                        className='material-icons'>thumb_down</i> {numberOfDislikes} </span>
                    }
                    {numberOfLikes > 0 &&
                    <span className='like'><i
                        className='material-icons'>thumb_up</i> {numberOfLikes} </span>
                    }
                </div>
                <div style={{clear: 'both'}}></div>
                <div className='message-files'>
                    {files && this._renderFiles(files)}
                    {images && this._renderImages(images)}
                </div>
            </div>

        );
    }

    _renderImages(images){
        const imageItems = images.map( ({id, name, fileUrl}, index) => {
            return (
                <div className={`col s5 message-img ${index % 2 !== 0 ? 'clear' : ''}`} key={id}>
                    <a href={fileUrl}>
                        <img src={fileUrl} title={name} />
                    </a>
                </div>
            );
        });

        return (
            <div className='message-img-row'>
                {imageItems}
            </div>
        );
    }

    _renderFiles(files){
        const fileItems = files.map( ({id, name, fileUrl}) => {
            return (
                <span className='message-att' key={id}>
                    <a href={fileUrl}>
                        {name}
                    </a>
                </span>
            );
        });

        return (
            <div className='message-att-list'>
                {fileItems}
            </div>
        );
    }

    _renderDeleteButton() {
        return (<li>
            <IconButton className='red darken-2' title='Delete' onClick={() => this._deleteMessage()} iconName='delete'/>
        </li>);
    }

    _renderEditButton() {
        return <li>
            <IconButton className='yellow darken-2' title='Edit' onClick={() => this.props.onEdit(this.props.message.id)} iconName='edit'/>
        </li>;
    }

    _renderLikeButton() {
        return (<li>
            <IconButton className='blue darken-2 pulse' title='Like' onClick={() => this._likeMessage()} iconName='thumb_up'/>
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