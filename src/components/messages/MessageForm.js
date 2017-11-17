import React, {Component} from 'react';
import {reduxForm, Field} from 'redux-form';
import { connect } from 'react-redux';
import {createMessage} from '../../actions/messageActions';
import FormField from '../FormField';

const renderTextArea = (field) => {
    return <textarea></textarea>;
};

class MessageForm extends Component {
    render() {
        return(
            <div>
                <form onSubmit={this.props.handleSubmit(this._onSubmit.bind(this))}>
                    <Field name='message' component='textarea' />
                    <button className='waves-effect waves-light btn' type='submit'>Send</button>
                </form>
            </div>
        );
    }

    _onSubmit(values) {
        this.props.createMessage(values.message);
    }
}

export default reduxForm({
    form: 'messageForm'
})(
    connect(null, {createMessage})(MessageForm)
);