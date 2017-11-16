import React, {Component} from 'react';
import { reduxForm, Field } from 'redux-form';
import { Link } from 'react-router-dom';
import RegistrationField from './RegistrationField';

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
                {this._renderFields()}
                <button className='btn btn-primary'>Create a new Channeler!</button>
                <Link to='/login'>I have channeled before</Link>
            </div>
        );
    }

    _renderFields() {
        return formFields.map(field => {
            return <Field key={field.name} component={RegistrationField} {...field} />;
        });
    }
}

function validate(values) {
    const errors = {};

    if (!values.name) {
        errors.name = 'Please provide a value.';
    }

    if (!values.email) {
        errors.email = 'Please provide a value.';
    }

    if (!values.password) {
        errors.password = 'Please provide a value.';
    }

    if (!values.repeatPassword) {
        errors.repeatPassword = 'Please provide a value.';
    }

    if (values.password !== values.repeatPassword) {
        errors.repeatPassword = 'Passwords must be the same!';
    }
    return errors;
}

export default reduxForm({
    form: 'registrationForm',
    validate
})(RegistrationForm);