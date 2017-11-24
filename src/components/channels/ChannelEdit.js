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

                    <ChannelEditForm channel={this.props.channel} />
                </div>

                <div className='col s12'>
                    <div className='divider' style={{margin: '25px 0'}}/>
                    <h5>Users:</h5>
                </div>

            </div>
        );
    }

    _rename(name) {
        this.props.editChannel({...this.props.channel, name});
    }
}

export default connect(null, {editChannel})(ChannelEdit);