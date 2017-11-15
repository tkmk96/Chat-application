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

export default reduxForm({
    form: 'registrationForm'
})(RegistrationForm);