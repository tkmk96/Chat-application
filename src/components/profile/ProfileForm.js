import React, {Component} from 'react';
import {connect} from 'react-redux';
import { reduxForm, Field, reset} from 'redux-form';
import PropTypes from 'prop-types';

import {editUserName} from '../../actions';
import FormField from '../generic/FormField';

class ProfileForm extends Component {
    static propTypes = {
        editUserName: PropTypes.func.isRequired,
        handleSubmit: PropTypes.func.isRequired
    };
    render(){
        const field = {
            label: 'Name',
            name: 'name',
            type: 'text',
        };

        return (
            <div className="profile-edit">
                <div>
                    <form onSubmit={this.props.handleSubmit(this._onSubmit.bind(this))}>
                        <div className='profile-edit-name'>
                            <Field key={field.name} component={FormField} {...field} />
                        </div>
                        <div className='center'>
                            <button className='waves-effect waves-light btn' type='submit'>
                                <i className="small material-icons">edit</i> Edit
                            </button>
                        </div>

                    </form>
                </div>
            </div>
        );
    }

    _onSubmit(values) {
        const {name} = values;
        this.props.editUserName(name);

    }
}

function validate({name}){
    const errors = {};

    if (!name || name.length < 3){
        errors.name = 'Name must contain at least 3 characters!';
    }

    return errors;
}

function mapStateToProps({user}) {
    return {name: user.name};
}

const afterSubmit = (result, dispatch) =>
    dispatch(reset('editProfileForm'));

export default reduxForm({
    form: 'editProfileForm',
    validate,
    onSubmitSuccess: afterSubmit,
})(
    connect(mapStateToProps, { editUserName})(ProfileForm)
);