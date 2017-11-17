import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import { connect } from 'react-redux';
import ChannelList from './channels/ChannelList';
import Login from './Login';
import MessagePanel from './messages/MessagePanel';

class Main extends Component {

    render() {
        if (!this.props.token) {
            return <Login/>;
        }
        return(
            <div className='row'>
                <ChannelList />
                <MessagePanel/>
            </div>
        );
    }
}

function mapStateToProps({authToken}) {
    return {
        token: authToken
    };
}

export default connect(mapStateToProps)(Main);