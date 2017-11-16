import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import { reduxForm, Field } from 'redux-form';

import RegistrationField from './RegistrationField';

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
        console.log(values);
    }

    render(){
        return (
            <div className='col-md-6 col-md-offset-3'>
                <h3>Registration</h3>
                <form onSubmit={this.props.handleSubmit(this._onSubmit.bind(this))}>
                    {this._renderFields()}
                    <button className='btn btn-primary' type='submit'>Go</button>
                    <Link style={{marginLeft: '20px'}} to='/register'>New channeler!</Link>
                </form>
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
})(LoginForm);