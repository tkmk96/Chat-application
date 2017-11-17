import React, {Component} from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';

import { fetchUserData } from '../actions';

import Registration from './Registration';
import Header from './Header';
import Main from './Main';
import Profile from './profile/Profile';

class App extends Component {

    componentWillMount() {
        this.props.fetchUserData();
    }

    render() {
        return (
            <div className='container'>
                <BrowserRouter>
                    <div>
                        <Route path='/' component={Header}/>
                        <Route exact path='/' component={Main}/>
                        <Route exact path='/profile' component={Profile}/>
                        <Route path='/register' component={Registration}/>
                    </div>
                </BrowserRouter>
            </div>
        );
    }
}


export default connect(null, { fetchUserData })(App);