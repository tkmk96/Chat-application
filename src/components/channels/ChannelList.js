import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import Channel from './Channel';
import {fetchChannels} from '../../actions/channelActions';
import ChannelForm from './ChannelForm';

class ChannelList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            newChannel: false
        };
    }

    componentDidMount() {
        this.props.fetchChannels();
    }

    render() {
        return (
            <div className='row'>
                <div className='col s4'>
                    {this.state.newChannel ?
                        <ChannelForm toggleNewChannel={() => this._toggleNewChannel()}/>
                        :
                        <div className='center'>
                            <button
                                onClick={() => this.setState({newChannel: true})}
                                className='btn-floating btn-large blue lighten-3'>
                                <i className='material-icons'>add</i>
                            </button>
                        </div>
                    }
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

    _renderChannels() {
        return this.props.channels.map(channel => {
            return <Channel key={channel.name} {...channel} />;
        });
    }
}

function mapStateToProps({channels}) {
    return {
        channels
    };
}

export default connect(mapStateToProps, {fetchChannels})(ChannelList);