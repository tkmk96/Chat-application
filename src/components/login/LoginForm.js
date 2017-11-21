import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link, withRouter} from 'react-router-dom';
import { reduxForm, Field } from 'redux-form';

import RegistrationField from '../FormField';
import {loginUser} from '../../actions/index';

const RE = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const formFields = [
    { label: 'Email', name: 'email', type: 'text'},
    { label: 'Password', name: 'password', type: 'password'},
];


class LoginForm extends Component {
    _renderFields() {
        return formFields.map(field => {
            return <Field key={field.name} component={RegistrationField} {...field} />;
        });
    }

    _onSubmit(values){
        const {email, password} = values;
        return this.props.loginUser(email, password, this.props.history);
    }

    render(){
        return (
            <div className='row'>
                <div className='col s6 offset-s3'>
                    <h4 className='center'>Login</h4>
                    <div className='divider'/>
                    <form onSubmit={this.props.handleSubmit(this._onSubmit.bind(this))}>
                        {this._renderFields()}
                        <button className='waves-effect waves-light btn' type='submit'>Go</button>
                        <Link className='right' to='/register'>New channeler!</Link>
                    </form>
                </div>
            </div>
        );
    }
}

function validate(values) {
    const errors = {};

    if (!RE.test(values.email)) {
        errors.email = 'Please provide a valid email.';
    }

    if (!values.password) {
        errors.password = 'Please provide a value.';
    }

    return errors;
}

export default reduxForm({
    form: 'loginForm',
    validate
})(
    connect(null, { loginUser})(withRouter(LoginForm))
);