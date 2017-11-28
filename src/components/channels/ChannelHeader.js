import React, {Component} from 'react';
import {connect} from 'react-redux';

import {changePrivilege, removeChannel} from '../../actions/channelActions';



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
            <a onClick={this.props.onDetail} className='btn-floating btn-large red'>
                <i className='material-icons'>undo</i>
            </a>
        );
    }

    _renderDetailButton(){
        return (
            <a className='btn-floating blue' title='Detail' onClick={this.props.onDetail}>
                <i className='material-icons'>info_outline</i>
            </a>
        );
    }
    _renderEditButton(){
        return (
            <a className='btn-floating blue' title='Edit' onClick={this.props.onDetail}>
                <i className='material-icons'>build</i>
            </a>
        );
    }

    _renderLeaveButton(){
        return (
            <li>
                <a className='btn-floating yellow darken-2' title='Leave' onClick={() => this._leaveChannel()}>
                    <i className='material-icons'>cancel</i>
                </a>
            </li>
        );
    }

    _renderDeleteButton(){
        return (
            <li>
                <a className='btn-floating red darken-2' title='Delete' onClick={() => this._removeChannel()}>
                    <i className='material-icons'>delete</i>
                </a>
            </li>
        );
    }

    _renderChannelPageButtons(){
        return (
            <div className='fixed-action-btn horizontal click-to-toggle channelMenuBtn' style={{position: 'absolute'}}>
                <a className='btn-floating btn-large red'>
                    <i className='material-icons'>menu</i>
                </a>
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
        this.props.removeChannel(this.props.activeChannel.id)
    }

}

function mapStateToProps({activeChannel, user}) {
    return {
        userEmail: user.email,
        activeChannel
    };
}

export default connect(mapStateToProps, {removeChannel, changePrivilege})(ChannelHeader);