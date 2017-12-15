import React, {Component} from 'react';
import {connect} from 'react-redux';

import {changePrivilege, removeChannel} from '../../actions';
import Icon from '../generic/IconButton';


class ChannelHeader extends Component {
    render(){
        return (
            <div style={{marginBottom: '10px'}}>
                <h5 className='channelHeader'>{this.props.name}</h5>

                {this.props.detail ? this._renderDetailPageButtons() : this._renderChannelPageButtons()}


                <div className='divider' style={{marginTop: '25px'}}/>
            </div>
        );
    }

    _renderDetailPageButtons(){
        return (
            <Icon
                title='Back to messages'
                iconName='undo'
                className='btn-large red'
                onClick={this.props.onDetail}
            />
        );
    }

    _renderDetailButton(){
        return (
            <Icon
                title='Detail'
                iconName='info_outline'
                className='blue'
                onClick={this.props.onDetail}
            />
        );
    }
    _renderEditButton(){
        return (
            <Icon
                title='Settings'
                iconName='settings'
                className='blue'
                onClick={this.props.onDetail}
            />
        );
    }

    _renderLeaveButton(){
        return (
            <li>
                <Icon
                    title='Leave channel'
                    iconName='close'
                    className='deep-orange lighten-1'
                    onClick={() => this._leaveChannel()}
                />
            </li>
        );
    }

    _renderDeleteButton(){
        return (
            <li>
                <Icon
                    title='Remove channel'
                    iconName='delete'
                    className='red darken-2'
                    onClick={() => this._removeChannel()}
                />
            </li>
        );
    }

    _renderChannelPageButtons(){
        return (
            <div className='fixed-action-btn horizontal click-to-toggle channelMenuBtn' style={{position: 'absolute'}}>
                <Icon
                    title={this.props.detail ? 'Close menu' : 'Open menu'}
                    iconName='menu'
                    className='btn-large red'
                />
                <ul>
                    {this.props.isOwner && this._renderDeleteButton()}
                    {!this.props.isOwner && this._renderLeaveButton()}
                    <li>
                        {this.props.isOwner || this.props.isAdmin ? this._renderEditButton() : this._renderDetailButton()}
                    </li>


                </ul>
            </div>
        );
    }

    _leaveChannel(){
        this.props.changePrivilege(this.props.activeChannel, this.props.userEmail, null);
    }

    _removeChannel(){
        this.props.removeChannel(this.props.activeChannel.id);
    }

}

function mapStateToProps({activeChannel, user}) {
    return {
        userEmail: user.email,
        activeChannel
    };
}

export default connect(mapStateToProps, {removeChannel, changePrivilege})(ChannelHeader);