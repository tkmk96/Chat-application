import React, {Component} from 'react';
import FormField from '../FormField';
import {reduxForm, Field, reset} from 'redux-form';
import {inviteUser} from '../../actions/channelActions';
import {connect} from 'react-redux';

class ChannelEditForm extends Component {
    render() {
        return (
            <form className='col s6' onSubmit={this.props.handleSubmit(this._invite.bind(this))}>
                <Field name='email' component={FormField} placeholder='Email' type='text'/>
                <button className='waves-effect waves-light btn' type='submit'>
                    Invite
                </button>
                {/*<button type='button' onClick={this.props.onCancel}*/}
                {/*className='waves-effect waves-light red btn right'>Cancel*/}
                {/*</button>*/}
            </form>
        );
    }

    _invite(values) {
        this.props.inviteUser(this.props.channel, values.email);
    }
}

function afterSubmit(result, dispatch) {
    dispatch(reset('channelEditForm'));
}

export default reduxForm({
    form: 'channelEditForm',
    onSubmitSuccess: afterSubmit
})(
    connect(null, {inviteUser})(ChannelEditForm)
);