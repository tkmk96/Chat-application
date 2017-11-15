import React, {Component} from 'react';
import Registration from './Registration';
import Login from './Login';
import { BrowserRouter, Route } from 'react-router-dom';

export default () => {
    return (
        <div className='container'>
            <BrowserRouter>
                <div>
                    <Route path='/register' component={Registration}/>
                    <Route path='/login' component={Login}/>
                </div>
            </BrowserRouter>
        </div>
    );
};