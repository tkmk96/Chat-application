import React, {Component} from 'react';
import { reduxForm, Field } from 'redux-form';
import { Link, withRouter } from 'react-router-dom';
import RegistrationField from './RegistrationField';
import { registerUser } from '../actions';
import {connect} from 'react-redux';

const RE = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const formFields = [
    { label: 'Name', name: 'name', type: 'text'},
    { label: 'Email', name: 'email', type: 'text'},
    { label: 'Password', name: 'password', type: 'password'},
    { label: 'Repeat Password', name: 'repeatPassword', type: 'password'}
];

class RegistrationForm extends Component {
    render() {
        return (
            <div className='col-md-6 col-md-offset-3'>
                <h3>Registration</h3>
                <form onSubmit={this.props.handleSubmit(this._onSubmit.bind(this))}>
                    {this._renderFields()}
                    <button className='btn btn-primary' type='submit'>Create a new Channeler!</button>
                    <Link className='pull-right' to='/login'>I have channeled before</Link>
                </form>
            </div>
        );
    }

    _renderFields() {
        return formFields.map(field => {
            return <Field key={field.name} component={RegistrationField} {...field} />;
        });
    }

    _onSubmit(values) {
        const {name, password} = values;
        this.props.registerUser(values.email, {name, password}, this.props.history);

    }
}

function validate(values) {
    const errors = {};

    if (!values.name) {
        errors.name = 'Please provide a value.';
    }

    if (!values.password) {
        errors.password = 'Please provide a value.';
    }

    if (!values.repeatPassword) {
        errors.repeatPassword = 'Please provide a value.';
    }

    if (!RE.test(values.email)) {
        errors.email = 'Please provide a valid email.';
    }

    if (values.password !== values.repeatPassword) {
        errors.repeatPassword = 'Passwords must be the same.';
    }
    return errors;
}

export default reduxForm({
    form: 'registrationForm',
    validate
})(
    connect(null, { registerUser})(withRouter(RegistrationForm))
);