import React, {Component} from 'react';
import {connect} from 'react-redux';
import {reduxForm, Field} from 'redux-form';
import {Link} from 'react-router-dom';
import {createChannel} from '../../actions/channelActions';
import FormField from '../FormField';

class ChannelForm extends Component {
    render() {
        return (
            <div>
                <form onSubmit={this.props.handleSubmit(this._onSubmit.bind(this))}>
                    <Field name='name' label='Name' component={FormField} type='text'/>
                    <button className='waves-effect waves-light btn' type='submit'>Save</button>
                    <button onClick={this.props.toggleNewChannel} className='waves-effect waves-light red btn'>Cancel</button>
                </form>
            </div>
        );
    }

    _onSubmit(values) {
        this.props.createChannel(values.name);
        this.props.toggleNewChannel();
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