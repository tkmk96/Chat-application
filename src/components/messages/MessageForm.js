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
            showDropzone: false,
            files: []
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
                {this.state.files.length !== 0 && this._renderFilesList()}
                {this.state.showDropzone && this._renderDropzone()}
            </div>
        );
    }

    _renderDropzone() {
        return (
            <div className="" title="Drag & drop or select manually">
                <div className="text-center avatar-dropzone waves-light">
                    <Dropzone
                        className="dropzone"
                        multiple={true}
                        disablePreview={true}
                        maxSize={1048576}
                        onDrop={this._addFiles.bind(this)}
                    >
                        <i className="large material-icons">cloud_upload</i>
                        <br/>Upload file
                    </Dropzone>
                </div>
            </div>
        );
    }

    _renderFilesList(){
        const files = this.state.files.map( file => {
            return <li key={file.name}>{file.name}</li>;
        });

        return (
            <div>
                <ul>
                    {files}
                </ul>
            </div>
        );
    }

    _toggleDropzone() {
        this.setState(prevState => {
            return {showDropzone: !prevState.showDropzone};
        });
    }

    _addFiles(files, rejectedFiles){
        this.setState( prevState => {
            return {files: [...prevState.files, ...files]};
        });

        if(rejectedFiles.length > 0) {
            alert("Files must be smaller than 1MB");
        }
        else {
            this._toggleDropzone();
        }
    }

    _onChange(value) {
        this.setState({value});
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