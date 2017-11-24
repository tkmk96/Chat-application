import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import Channel from './Channel';
import {fetchChannels, createChannel} from '../../actions/channelActions';
import ChannelForm from './ChannelForm';

class ChannelList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            newChannel: false
        };
    }


    render() {
        return (
            <div className='col s4'>
                {this.state.newChannel ?
                    <div style={{marginBottom: '20px', marginTop: '40px'}}>
                        <ChannelForm
                            form='channelCreateForm'
                            onCancel={() => this._toggleNewChannel()}
                            onSubmit={(name) => this._onSubmitForm(name)}
                        />
                    </div>
                    :
                    <div className='center' style={{margin: '10px 0'}}>
                        <button
                            onClick={() => this.setState({newChannel: true})}
                            className='btn-floating btn-large blue lighten-3'
                        >
                            <i className='material-icons'>add</i>
                        </button>
                    </div>
                }
                <div className='channelsList'>
                    {this._renderChannels()}
                </div>
            </div>

        );
    }

    _toggleNewChannel() {
        this.setState(prevState => {
            return {newChannel: !prevState.newChannel};
        });
    }

    _onSubmitForm(name) {
        this.props.createChannel(name);
        this._toggleNewChannel();
    }

    _renderChannels() {
        const {channels} = this.props;
        return Object.entries(channels).map(([key, value]) => {
            return <Channel key={key} {...value} />;
        });

    }
}

function mapStateToProps({channels}) {
    return {
        channels
    };
}

export default connect(mapStateToProps, {fetchChannels, createChannel})(ChannelList);