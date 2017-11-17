import React, {Component} from 'react';
import {connect} from 'react-redux';
import { reduxForm, Field} from 'redux-form';

import {editUser} from '../../actions/index';
import FormField from '../FormField';




class ProfileForm extends Component {
    componentDidMount () {
        this.props.initialize({ name: this.props.name });

    }

    render(){
        const field = {
            label: 'Name',
            name: 'name',
            type: 'text',
        };

        return (
            <div className='row'>
                <div className='col s8 offset-s2'>
                    <h4 className='center'>Your profile</h4>
                    <div className='divider'/>
                    <form onSubmit={this.props.handleSubmit(this._onSubmit.bind(this))}>
                        <Field key={field.name} component={FormField} {...field} />
                        <button className='waves-effect waves-light btn' type='submit'>Save changes</button>
                    </form>
                </div>
            </div>
        );
    }

    _renderFields() {
        return formFields.map(field => {
            return <Field key={field.name} component={FormField} {...field} />;
        });
    }

    _onSubmit(values) {
        const {name} = values;
        this.props.editUser(name, this.props.history);

    }
}

function validate({name}){
    const errors = {};

    if (!name || name.length < 5){
        errors.name = 'Name must contain at least 5 characters!';
    }

    return errors;
}

function mapStateToProps({user}) {
    return {name: user.name};
}


export default reduxForm({
    form: 'editProfileForm',
    validate,
})(
    connect(mapStateToProps, { editUser})(ProfileForm)
);