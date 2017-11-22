import React, {Component} from 'react';
import ChannelForm from './ChannelForm';
import FormField from '../FormField';
import {reduxForm, Field} from 'redux-form';

class ChannelEdit extends Component {
    render() {
        return (
            <div className='row'>
                <div>

                    <ChannelForm className='col s6' name={this.props.name} />

                    <form className='col s6' onSubmit={this.props.handleSubmit(this._invite)}>
                        <Field name='invite' component={FormField} placeholder='Email' type='text'/>
                        <button className='waves-effect waves-light btn' type='submit'>
                            Invite
                        </button>
                        {/*<button type='button' onClick={this.props.onCancel}*/}
                                {/*className='waves-effect waves-light red btn right'>Cancel*/}
                        {/*</button>*/}
                    </form>
                </div>

                <div className='col s12'>
                    <div className='divider' style={{margin: '25px 0'}}/>
                    <h5>Users:</h5>
                </div>

            </div>
        );
    }

    _invite(values) {
        console.log(values);
    }
}

export default reduxForm({
    form: 'channelEditForm'
})(ChannelEdit);