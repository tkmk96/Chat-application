import React, {Component} from 'react';
import ChannelRenameForm from './ChannelCreateEditForm';
import {editChannel, changePrivilege} from '../../actions/channelActions';
import {connect} from 'react-redux';
import ChannelEditForm from './ChannelEditForm';

class ChannelEdit extends Component {
    render() {
        return (
            <div className='row'>
                <div>

                    <ChannelRenameForm
                        form='channelRenameForm'
                        className='col s6'
                        name={this.props.channel.name}
                        onSubmit={(name) => this._rename(name)}
                    />

                    <ChannelEditForm onInvite={(email) => this._changePrivilege(email, 'user')} channel={this.props.channel}/>
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
        return Object.entries(users).map(([key, value]) => {
            return (
                <div key={key}>
                    <div className='col s6' style={{overflowX: 'auto', textAlign: 'end'}}>
                        <span style={{fontSize: '1.2em'}}>
                            {key}
                        </span>
                        {value !== 'user' && <i style={{marginLeft: '3px'}}>({value})</i>}
                    </div>
                    {value === 'user' ? this._renderUserIcons(key) : this._renderOwnerIcons(key)}
                </div>
            );
        });
    }

    _renderUserIcons(email) {
        return (
            <div className='col s6' style={{marginBottom: '10px'}}>
                <a className='btn-floating red' title='Remove user' style={{marginRight: '10px'}}
                    onClick={() => this._changePrivilege(email, 'none')}
                >
                    <i className='material-icons'>delete</i>
                </a>

                <a className='btn-floating green' title='Make owner' style={{marginRight: '10px'}}
                    onClick={() => this._changePrivilege(email, 'owner')}

                >
                    <i className='material-icons'>verified_user</i>
                </a>

                <a className='btn-floating yellow' title='Make admin' style={{marginRight: '10px'}}
                    onClick={() => this._changePrivilege(email, 'admin')}

                >
                    <i className='material-icons'>child_care</i>
                </a>
            </div>
        );
    }

    _renderOwnerIcons(email) {
        return (
            <div className='col s6' style={{marginBottom: '10px'}}>
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

export default connect(null, {editChannel, changePrivilege})(ChannelEdit);