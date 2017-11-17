import React, {Component} from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';

import {AUTH_EMAIL, AUTH_TOKEN} from '../constants/storageKeys';
import { fetchUserData } from '../actions';

import Registration from './Registration';
import Login from './Login';
import Header from './Header';
import ChannelList from './channels/ChannelList';
import ChannelForm from './channels/ChannelForm';

class App extends Component {

    componentDidMount() {
        const token = localStorage.getItem(AUTH_TOKEN);
        const email = localStorage.getItem(AUTH_EMAIL);
        if (token && email) {
            this.props.fetchUserData(email, token);
        }
    }

    render() {
        return (
            <div className='container'>
                <BrowserRouter>
                    <div>
                        <Route path='/' component={Header}/>
                        <Route exact path='/' component={ChannelList}/>
                        <Route path='/register' component={Registration}/>
                        <Route path='/login' component={Login}/>
                        <Route path='/channels/new' component={ChannelList}/>
                        <Route path='/channels/new' component={ChannelForm}/>
                    </div>
                </BrowserRouter>
            </div>
        );
    }
}


export default connect(null, { fetchUserData })(App);