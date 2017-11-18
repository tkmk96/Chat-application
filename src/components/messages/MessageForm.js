import React, {Component} from 'react';
import {reduxForm, Field, reset} from 'redux-form';
import { connect } from 'react-redux';
import {createMessage} from '../../actions/messageActions';

class MessageForm extends Component {
    render() {
        return(
            <div style={{marginTop: '15px'}}>
                <form onSubmit={this.props.handleSubmit(this._onSubmit.bind(this))}>
                    <Field name='message' component='textarea' />
                    <button className='waves-effect waves-light btn right' type='submit'>Send</button>
                </form>
            </div>
        );
    }

    _onSubmit(values) {
        this.props.createMessage(values.message);

    }
}

const afterSubmit = (result, dispatch) =>
    dispatch(reset('messageForm'));

export default reduxForm({
    form: 'messageForm',
    onSubmitSuccess: afterSubmit,
})(
    connect(null, {createMessage})(MessageForm)
);