import React, {Component} from 'react';
import ChannelList from './channels/ChannelList';
import MessagePanel from './messages/MessagePanel';
import {connect} from 'react-redux';
import {fetchChannels} from '../actions/channelActions';
import ChannelHeader from './channels/ChannelHeader';
import ChannelDetail from './channels/ChannelDetail';
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
            return (
                <ChannelDetail channel={this.props.activeChannel}
                    userEmail={this.props.userEmail}
                    owner={this.props.owner}
                    admin={this.props.admin}
                />
            );
        }
        return <MessagePanel/>;
    }
}


function mapStateToProps({activeChannel, user}) {
    const userRole = activeChannel && activeChannel.customData.users[user.email];
    const owner = userRole === role.OWNER;
    const admin = userRole === role.ADMIN;
    const userEmail = user.email;

    return {
        activeChannel,
        userEmail,
        owner,
        admin
    };
}
export default connect(mapStateToProps, {fetchChannels})(Main);