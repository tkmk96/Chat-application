import React, {Component} from 'react';
import {connect} from 'react-redux';
import {reduxForm, Field} from 'redux-form';
import {createChannel} from '../../actions/channelActions';
import FormField from '../FormField';

class ChannelForm extends Component {
    render() {
        return (
            <div>
                <form onSubmit={this.props.handleSubmit((values) => this.props.onSubmit(values.name))} >
                    <Field name='name' component={FormField} placeholder='Name' type='text' />
                    <button className='waves-effect waves-light btn' type='submit'>
                        Save
                    </button>
                    <button type='button' onClick={this.props.onCancel} className='waves-effect waves-light red btn right'>Cancel</button>
                </form>
            </div>
        );
    }

}


function validate(values) {
    const errors = {};

    if (!values.name) {
        errors.name = 'Please provide a name.';
    }

    return errors;
}

export default reduxForm({
    form: 'channelForm',
    validate
})(
    connect(null, {createChannel})(ChannelForm)
);