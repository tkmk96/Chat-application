import React, {Component} from 'react';
import ChannelForm from './ChannelForm';
import {editChannel} from '../../actions/channelActions';
import {connect} from 'react-redux';
import ChannelEditForm from './ChannelEditForm';

class ChannelEdit extends Component {
    render() {
        return (
            <div className='row'>
                <div>

                    <ChannelForm
                        form='channelRenameForm'
                        className='col s6'
                        name={this.props.channel.name}
                        onSubmit={(name) => this._rename(name)}
                    />

                    <ChannelEditForm channel={this.props.channel}/>
                </div>

                <div className='col s12'>
                    <div className='divider' style={{margin: '25px 0'}}/>
                    {/*<div className='section'>*/}
                        {/*<h5>Owners:</h5>*/}
                        {/*<ul>*/}
                            {/*{this._renderUsers(owners)}*/}
                        {/*</ul>*/}
                    {/*</div>*/}
                    {/*<div className='divider'/>*/}
                    {/*<div className='section'>*/}
                        {/*<h5>Admins:</h5>*/}
                        {/*<ul>*/}
                            {/*{this._renderUsers(admins)}*/}
                        {/*</ul>*/}
                    {/*</div>*/}
                    {/*<div className='divider'/>*/}
                    <div className='section'>
                        <h5>Users:</h5>
                        <ul>
                            {this._renderUsers()}
                        </ul>
                    </div>
                </div>

            </div>
        );
    }

    _rename(name) {
        this.props.editChannel({...this.props.channel, name});
    }

    _renderUsers() {
        const {users} = this.props.channel.customData;
        return Object.entries(users).map(([key, value]) => {
            return <li key={key}>{key}</li>;
        });
    }
}

export default connect(null, {editChannel})(ChannelEdit);