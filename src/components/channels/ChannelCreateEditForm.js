import React, {Component} from 'react';
import {connect} from 'react-redux';
import {reduxForm, Field} from 'redux-form';
import {createChannel} from '../../actions';
import FormField from '../generic/FormField';
import PropTypes from 'prop-types';

class ChannelForm extends Component {
    static propTypes = {
        className: PropTypes.string,
        handleSubmit: PropTypes.func.isRequired,
        onSubmit: PropTypes.func.isRequired,
        onCancel: PropTypes.func,
    };
    render() {
        return (
            <form className={this.props.className} onSubmit={this.props.handleSubmit((values) => this.props.onSubmit(values.name))}>
                <Field name='name' component={FormField} placeholder='Name' type='text'/>
                <button className='waves-effect waves-light btn' type='submit'>
                    Save
                </button>
                {this.props.onCancel &&
                <button type='button' onClick={this.props.onCancel} className='waves-effect waves-light red btn right'>
                    Cancel
                </button>
                }
            </form>
        );
    }
}

function validate(values) {
    const errors = {};

    if (!values.name) {
        errors.name = 'Please provide a name';
    }

    return errors;
}

export default reduxForm({
    validate
})(
    connect(null, {createChannel})(ChannelForm)
);