import React, {Component} from 'react';
import { connect } from 'react-redux';
import {createMessage} from '../../actions/messageActions';
import RichTextEditor from 'react-rte';
import Dropzone from 'react-dropzone';

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
            value: RichTextEditor.createEmptyValue(),
            showDropzone: false
        };
    }

    render() {
        const {value} = this.state;
        return(
            <div style={{marginTop: '15px'}}>
                <form onSubmit={this._onSubmit.bind(this)}>
                    <RichTextEditor toolbarConfig={toolbarConfig}  value={value} onChange={this._onChange.bind(this)}/>
                    <button className='waves-effect waves-light btn right' type='submit' disabled={!value._editorState.getCurrentContent().hasText()}>
                        Send
                    </button>
                </form>
                <button onClick={this._toggleDropzone.bind(this)}>File</button>
                <button onClick={this._button.bind(this)}>@</button>
                {this.state.showDropzone && this._renderDropzone()}
            </div>
        );
    }

    _renderDropzone() {
        return (
            <div className="profile-avatar" title="Drag & drop or select manually">
                <div className="text-center avatar-dropzone waves-light">
                    <Dropzone
                        className="dropzone"
                        multiple={true}
                        // onDrop={this._handleFiles.bind(this)}
                    >
                        <i className="large material-icons">cloud_upload</i>
                        <br/>Upload file
                    </Dropzone>
                </div>
            </div>
        );
    }

    _toggleDropzone() {
        this.setState(prevState => {
            return {showDropzone: !prevState.showDropzone};
        });
    }

    _onChange(value) {
        this.setState({value});
    }

    _button(){
        console.log(this._getEditorState().getSelection());
    }

    _onSubmit(e) {
        e.preventDefault();
        const {value} = this.state;
        if (this._getEditorState().getCurrentContent().hasText()) {
            this.props.createMessage(value.toString('html'));
            this.setState({value: RichTextEditor.createEmptyValue()});
        }
    }

    _getEditorState() {
        return this.state.value._editorState;
    }
}

export default connect(null, {createMessage})(MessageForm);