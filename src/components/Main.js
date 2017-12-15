import React, {Component} from 'react';
import ChannelList from './channels/ChannelList';
import MessagePanel from './messages/MessagePanel';
import {connect} from 'react-redux';
import {fetchChannels} from '../actions';
import ChannelHeader from './channels/ChannelHeader';
import ChannelDetail from './channels/ChannelDetail';
import * as role from '../constants/channelRoles';
import {Loader} from './generic/Loader';

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
        return (
            <div className='row'>
                <Loader show={this.props.loading}>
                    <ChannelList/>
                    <div className='col s8 messagePanel'>
                        {this.props.activeChannel &&
                        <div>
                            {this._renderHeader()}
                            {this._renderContent()}
                        </div>
                        }
                    </div>
                </Loader>
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
                isOwner={this.props.isOwner}
                isAdmin={this.props.isAdmin}
            />
        );
    }

    _renderContent() {
        if (this.state.showDetail) {
            return (
                <ChannelDetail channel={this.props.activeChannel}
                               userEmail={this.props.userEmail}
                               isOwner={this.props.isOwner}
                               isAdmin={this.props.isAdmin}
                />
            );
        }
        return <MessagePanel/>;
    }
}


function mapStateToProps({activeChannel, user, loading}) {
    const userRole = activeChannel && activeChannel.customData.users[user.email];
    const isOwner = userRole === role.OWNER;
    const isAdmin = userRole === role.ADMIN;
    const userEmail = user.email;

    return {
        activeChannel,
        userEmail,
        isOwner,
        isAdmin,
        loading: loading.createChannel || loading.deleteChannel || loading.activeChannel
    };
}

export default connect(mapStateToProps, {fetchChannels})(Main);