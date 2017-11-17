import React, {Component} from 'react';
import { connect } from 'react-redux';
import {reduxForm, Field } from 'redux-form';
import {Link} from 'react-router-dom';
import { createChannel } from '../../actions/channelActions';

const renderField = ({input, label, type, meta: {touched, error}}) => {
    return (
        <div className='form-group'>
            <label className='control-label' htmlFor={input.name}>{label}</label>
            <input id={input.name} className='form-control' type={type} {...input}/>
            <div className='text-danger'>{touched && error}</div>
        </div>
    );
};

class ChannelForm extends Component {
    render() {
        return(
            <div className='col-md-8'>
                <h5>Create a new channel:</h5>
                <form onSubmit={this.props.handleSubmit(this._onSubmit.bind(this))}>
                    <Field name='name' label='Name' component={renderField} type='text'/>
                    <button className='waves-effect waves-light btn' type='submit'>Save</button>
                    <Link to='/'>
                        <button className='waves-effect waves-light red btn'>Cancel</button>
                    </Link>
                </form>
            </div>
        );
    }

    _onSubmit(values) {
        this.props.createChannel(values.name);
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