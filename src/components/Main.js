import React, {Component} from 'react';
import ChannelList from './channels/ChannelList';
import MessagePanel from './messages/MessagePanel';
import {connect} from 'react-redux';
import {fetchChannels} from '../actions/channelActions';
import ChannelHeader from './channels/ChannelHeader';
import ChannelEdit from './channels/ChannelEdit';

class Main extends Component {

    constructor(props) {
        super(props);
        this.state = {
            edit: false,
        };
    }

    componentDidMount() {
        this.props.fetchChannels();
    }

    render() {
        return(
            <div className='row'>
                <ChannelList />
                <div className='col s8 messagePanel'>
                    {this.props.activeChannel &&
                    <div>
                        <ChannelHeader
                            name={this.props.activeChannel.name}
                            onEdit={() => this._toggleEdit()}/>
                        {this._renderContent()}
                    </div>
                    }
                </div>
            </div>
        );
    }

    _toggleEdit() {
        this.setState(prevState => {
            return {edit: !prevState.edit};
        });
    }

    _renderContent() {
        if (this.state.edit) {
            return <ChannelEdit channel={this.props.activeChannel} onCancel={() => this._toggleEdit()} />;
        }
        return <MessagePanel/>;
    }
}


function mapStateToProps({activeChannel}) {
    return {
        activeChannel
    };
}
export default connect(mapStateToProps, {fetchChannels})(Main);