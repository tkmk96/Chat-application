import React, {Component} from 'react';
import ChannelRenameForm from './ChannelCreateEditForm';
import {editChannel, changePrivilege} from '../../actions/channelActions';
import {connect} from 'react-redux';
import ChannelInviteForm from './ChannelInviteForm';

import * as role from '../../constants/channelRoles';

class ChannelDetail extends Component {
    render() {
        if(this.props.owner || this.props.admin){
            return this._renderDetailWithEdit();
        }
        return this._renderJustDetail();
    }

    _renderJustDetail(){
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

    _renderDetailWithEdit(){
        return (
            <div className='row'>
                <div>
                    {this.props.owner &&
                        <ChannelRenameForm
                            form='channelRenameForm'
                            className='col s6'
                            name={this.props.channel.name}
                            onSubmit={(name) => this._rename(name)}
                        />
                    }

                    {(this.props.owner || this.props.admin) &&
                        <ChannelInviteForm onInvite={(email) => this._changePrivilege(email, role.USER)} channel={this.props.channel}/>
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
                <div key={email} className='row'>
                    <div className='col s6' style={{overflowX: 'auto', textAlign: 'end'}}>
                        <img src={this.props.users[email].avatarUrl} className='channel-detail-avatar'/>
                        <span style={{fontSize: '1.2em'}}>
                            {email}
                        </span>
                        {userRole !== role.USER && <i style={{marginLeft: '3px'}}>({userRole})</i>}
                    </div>
                    {userRole === role.USER ? this._renderIconsForUser(email) : this._renderIconsForOwner(email)}
                </div>
            );
        });
    }

    _renderUserNames(){
        const {users} = this.props.channel.customData;
        return Object.entries(users).map(([email, userRole]) => {
            return (
                <div key={email}>
                    <div className='col s12' style={{overflowX: 'auto', textAlign: 'center'}}>
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
            <div className='col s6' style={{marginBottom: '10px'}}>
                <a className='btn-floating red' title='Remove user' style={{marginRight: '10px'}}
                    onClick={() => this._changePrivilege(email, null)}>
                    <i className='material-icons'>delete</i>
                </a>

                {this.props.owner &&
                    <a className='btn-floating green' title='Make owner' style={{marginRight: '10px'}}
                        onClick={() => this._changePrivilege(email, role.OWNER)}>
                        <i className='material-icons'>verified_user</i>
                    </a>
                }
                {this.props.owner &&
                    <a className='btn-floating yellow' title='Make admin' style={{marginRight: '10px'}}
                        onClick={() => this._changePrivilege(email, role.ADMIN)}>
                        <i className='material-icons'>child_care</i>
                    </a>
                }

            </div>
        );
    }

    _renderIconsForOwner(email) {
        if(!this.props.owner || this.props.userEmail === email){
            return <div className='col s6' style={{marginBottom: '10px'}}><br/></div>;
        }
        return (
            <div className='col s6' style={{marginBottom: '10px'}}>
                <a className='btn-floating red' title='Remove user' style={{marginRight: '10px'}}
                    onClick={() => this._changePrivilege(email, null)}>
                    <i className='material-icons'>delete</i>
                </a>
                <a
                    className='btn-floating red'
                    title='Remove privileges'
                    style={{marginRight: '10px'}}
                    onClick={() => this._changePrivilege(email, 'user')}
                >
                    <i className='material-icons'>remove_circle</i>
                </a>
            </div>
        );
    }

}

function mapStateToProps({users}) {
    return {users};
}

export default connect(mapStateToProps, {editChannel, changePrivilege})(ChannelDetail);