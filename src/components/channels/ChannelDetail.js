import React, {Component} from 'react';
import ChannelRenameForm from './ChannelCreateEditForm';
import {editChannel, changePrivilege} from '../../actions';
import {connect} from 'react-redux';
import ChannelInviteForm from './ChannelInviteForm';

import Icon from '../generic/IconButton';

import * as role from '../../constants/channelRoles';
import {Loader} from '../generic/Loader';

class ChannelDetail extends Component {
    render() {
        return (
            <Loader show={this.props.loading}>
                {(this.props.isOwner || this.props.isAdmin) && this._renderDetailWithEdit()}
                {!this.props.isOwner && !this.props.isAdmin && this._renderJustDetail()}
            </Loader>
        );
    }

    _renderJustDetail() {
        return (
            <div className='row'>
                <h4 className='center'>Users:</h4>
                <div className='divider' style={{marginBottom: '15px'}}/>
                <div>
                    {this._renderUserNames()}
                </div>
            </div>
        );
    }

    _renderDetailWithEdit() {
        return (
            <div className='row'>
                <div>
                    {this.props.isOwner &&
                    <ChannelRenameForm
                        form='channelRenameForm'
                        className='col s6'
                        name={this.props.channel.name}
                        onSubmit={(name) => this._rename(name)}
                    />
                    }

                    {(this.props.isOwner || this.props.isAdmin) &&
                    <ChannelInviteForm onInvite={(email) => this._changePrivilege(email, role.USER)}
                                       channel={this.props.channel}/>
                    }
                </div>

                <div className='col s12'>
                    <div className='divider' style={{margin: '25px 0'}}/>
                    <div className='section'>
                        <h4 className='center'>Users:</h4>
                        <div className='divider' style={{marginBottom: '15px'}}/>
                        <div>
                            {this._renderUsers()}
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    _rename(name) {
        this.props.editChannel({...this.props.channel, name});
    }

    _changePrivilege(email, privilege) {
        this.props.changePrivilege(this.props.channel, email, privilege);
    }

    _renderUsers() {
        const {users} = this.props.channel.customData;
        return Object.entries(users).map(([email, userRole]) => {
            return (
                <div key={email}>
                    <div className='row' style={{marginBottom: 0}}>
                        <div className='col s7 channel-detail-user'>
                            <img src={this.props.users[email].avatarUrl} className='channel-detail-avatar'/>
                            <span style={{fontSize: '1.2em'}}>
                                {email}
                            </span>
                            {userRole !== role.USER && <i style={{marginLeft: '3px'}}>({userRole})</i>}
                        </div>
                        {userRole === role.USER ? this._renderIconsForUser(email) : this._renderIconsForOwner(email)}
                    </div>
                    <div className='divider'/>
                </div>

            );
        });
    }

    _renderUserNames() {
        const {users} = this.props.channel.customData;
        return Object.entries(users).map(([email, userRole]) => {
            return (
                <div key={email}>
                    <div className='col s7 offset-s5 channel-detail-user'>
                        <img src={this.props.users[email].avatarUrl} className='channel-detail-avatar'/>
                        <span style={{fontSize: '1.2em'}}>
                            {this.props.users[email].name}
                        </span>
                        {userRole !== 'user' && <i style={{marginLeft: '3px'}}>({userRole})</i>}
                    </div>
                </div>
            );
        });
    }

    _renderIconsForUser(email) {
        return (
            <div style={{paddingTop: '10px', textAlign: 'end'}}>
                {this.props.isOwner &&
                <Icon
                    title='Make owner'
                    iconName='verified_user'
                    className='green accent-4'
                    style={{marginRight: '10px'}}
                    onClick={() => this._changePrivilege(email, role.OWNER)}
                />

                }
                {this.props.isOwner &&
                <Icon
                    title='Make admin'
                    iconName='star'
                    className='light-green accent-4'
                    style={{marginRight: '10px'}}
                    onClick={() => this._changePrivilege(email, role.ADMIN)}
                />
                }

                <Icon
                    title='Remove user'
                    iconName='close'
                    className='red'
                    style={{marginRight: '10px'}}
                    onClick={() => this._changePrivilege(email, null)}
                />
            </div>
        );
    }

    _renderIconsForOwner(email) {
        if (!this.props.isOwner || this.props.userEmail === email) {
            return null;
        }
        return (
            <div style={{paddingTop: '10px', textAlign: 'end'}}>
                <Icon
                    title='Remove privileges'
                    iconName='no_encryption'
                    className='deep-orange lighten-1'
                    style={{marginRight: '10px'}}
                    onClick={() => this._changePrivilege(email, role.USER)}
                />
                <Icon
                    title='Remove user'
                    iconName='close'
                    className='red'
                    style={{marginRight: '10px'}}
                    onClick={() => this._changePrivilege(email, null)}
                />
            </div>
        );
    }

}

function mapStateToProps({users, loading}) {
    return {users, loading: loading.editChannel};
}

export default connect(mapStateToProps, {editChannel, changePrivilege})(ChannelDetail);