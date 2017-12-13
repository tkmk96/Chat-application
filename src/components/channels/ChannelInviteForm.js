import React, {Component} from 'react';
import FormField from '../generic/FormField';
import {reduxForm, Field, reset} from 'redux-form';
import {changePrivilege} from '../../actions/channelActions';
import {connect} from 'react-redux';

class ChannelInviteForm extends Component {
    render() {
        return (
            <form className='col s6' onSubmit={this.props.handleSubmit(({email}) => this.props.onInvite(email))}>
                <Field name='email' component={FormField} placeholder='Email' type='text'/>
                <button className='waves-effect waves-light btn' type='submit'>
                    Invite
                </button>
            </form>
        );
    }

    _invite(values) {
        this.props.changePrivilege(this.props.channel, values.email, 'user');
    }
}

function afterSubmit(result, dispatch) {
    dispatch(reset('channelEditForm'));
}

export default reduxForm({
    form: 'channelEditForm',
    onSubmitSuccess: afterSubmit
})(
    connect(null, {changePrivilege})(ChannelInviteForm)
);