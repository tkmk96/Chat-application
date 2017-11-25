import React, {Component} from 'react';
import ChannelList from './channels/ChannelList';
import MessagePanel from './messages/MessagePanel';
import {connect} from 'react-redux';
import {fetchChannels} from '../actions/channelActions';
import ChannelHeader from './channels/ChannelHeader';
import ChannelEdit from './channels/ChannelEdit';
import * as role from '../constants/channelRoles';

class Main extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showDetail: false,
        };
        //this._renderHeader = this._renderHeader.bind(this);
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
                        {this._renderHeader()}
                        {this._renderContent()}
                    </div>
                    }
                </div>
            </div>
        );
    }

    _toggleDetail() {
        this.setState(prevState => {
            return {showDetail: !prevState.showDetail};
        });
    }

    _renderHeader() {
        return (
            <ChannelHeader
                name={this.props.activeChannel.name}
                onDetail={() => this._toggleDetail()}
                detail={this.state.showDetail}
                owner={this.props.owner}
                admin={this.props.admin}
            />
        );
    }

    _renderContent() {
        if (this.state.showDetail) {
            return <ChannelEdit channel={this.props.activeChannel} onCancel={() => this._toggleDetail()} />;
        }
        return <MessagePanel/>;
    }
}


function mapStateToProps({activeChannel, user}) {
    const userRole = activeChannel && activeChannel.customData.users[user.email];
    const owner = userRole === role.OWNER;
    const admin = userRole === role.ADMIN;

    return {
        activeChannel,
        owner,
        admin
    };
}
export default connect(mapStateToProps, {fetchChannels})(Main);