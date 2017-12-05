import React, {Component} from 'react';
import { connect } from 'react-redux';
import {createMessage} from '../../actions/messageActions';
import RichTextEditor from 'react-rte';

const toolbarConfig = {
    display: ['INLINE_STYLE_BUTTONS', 'LINK_BUTTONS', 'HISTORY_BUTTONS'],
    INLINE_STYLE_BUTTONS: [
        {label: 'Bold', style: 'BOLD', className: 'custom-css-class'},
        {label: 'Italic', style: 'ITALIC'},
        {label: 'Underline', style: 'UNDERLINE'}
    ]
};

class MessageForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            value: RichTextEditor.createEmptyValue()
        };
    }

    render() {
        return(
            <div style={{marginTop: '15px'}}>
                <form onSubmit={this._onSubmit.bind(this)}>
                    <RichTextEditor toolbarConfig={toolbarConfig}  value={this.state.value} onChange={this._onChange.bind(this)}/>
                    <button className='waves-effect waves-light btn right' type='submit'>Send</button>
                </form>
            </div>
        );
    }

    _onChange(value) {
        this.setState({value});
    }

    _onSubmit(e) {
        e.preventDefault();
        const value = this.state.value.toString('html');
        if (value !== '') {
            this.props.createMessage(value);
            this.setState({value: RichTextEditor.createEmptyValue()});
        }
    }
}

export default connect(null, {createMessage})(MessageForm);