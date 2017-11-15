import React, {Component} from 'react';
import Registration from './Registration';
import { BrowserRouter, Route } from 'react-router-dom';

export default () => {
    return (
        <div className='container'>
            <BrowserRouter>
                <div>
                    <Route path='/register' component={Registration}/>
                </div>
            </BrowserRouter>
        </div>
    );
};