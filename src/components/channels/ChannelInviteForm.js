import React, {Component} from 'react';
import FormField from '../generic/FormField';
import {reduxForm, Field, reset} from 'redux-form';
import {inviteUser} from '../../actions';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

/*eslint no-useless-escape:0*/
const RE = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

class ChannelInviteForm extends Component {
    static propTypes = {
        channel: PropTypes.object.isRequired,
        handleSubmit: PropTypes.func.isRequired,
        inviteUser: PropTypes.func.isRequired,
    };
    render() {
        return (
            <form className='col s6' onSubmit={this.props.handleSubmit(({email}) => this._invite(email))}>
                <Field name='email' component={FormField} placeholder='Email' type='text'/>
                <button className='waves-effect waves-light btn' type='submit'>
                    Invite
                </button>
            </form>
        );
    }

    _invite(email) {
        if (email) {
            return this.props.inviteUser(this.props.channel, email);
        }
    }
}

function afterSubmit(result, dispatch) {
    dispatch(reset('channelEditForm'));
}

function validate(values) {
    const errors = {};

    if (!RE.test(values.email)) {
        errors.email = 'Please provide a valid email.';
    }

    if (!values.email) {
        errors.email = 'Please provide an email';
    }

    return errors;
}

export default reduxForm({
    form: 'channelEditForm',
    onSubmitSuccess: afterSubmit,
    validate
})(
    connect(null, {inviteUser})(ChannelInviteForm)
);