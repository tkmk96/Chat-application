import React, {Component} from 'react';
import {connect} from 'react-redux';
import {createMessage} from '../../actions/messageActions';
import RichTextEditor from 'react-rte';
import Dropzone from 'react-dropzone';
import {Modifier, EditorState} from 'draft-js';

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
            annotatedValue: '',
            showDropzone: false,
            showAnnotationForm: false,
            files: []
        };
    }

    componentDidUpdate(){
        if (this.focusElement){
            this.focusElement.focus();
        }
    }

    render() {
        const {value} = this.state;
        return (
            <div style={{marginTop: '15px'}}>
                <form onSubmit={this._onSubmit.bind(this)} style={{marginBottom: '10px'}}>
                    <RichTextEditor toolbarConfig={toolbarConfig} value={value} onChange={this._onChange.bind(this)}/>
                </form>
                <button className='waves-effect waves-light btn right' type='submit'
                    disabled={!value._editorState.getCurrentContent().hasText() && this.state.files.length === 0}
                >
                    Send
                </button>
                <button className='waves-effect grey lighten-3 btn' style={{color: 'black'}}
                    onClick={this._toggleDropzone.bind(this)}>
                    <i className='tiny material-icons'>note_add</i>
                </button>
                <button className='waves-effect grey lighten-3 btn' style={{color: 'black', marginLeft: '10px'}}
                    onClick={this._toggleAnnotationForm.bind(this)}>
                    @
                </button>
                {this.state.files.length !== 0 && this._renderFilesList()}
                {this.state.showAnnotationForm && this._renderAnnotationForm()}
                {this.state.showDropzone && this._renderDropzone()}
            </div>
        );
    }

    _renderDropzone() {
        return (
            <div className="" title="Drag & drop or select manually">
                <div className="text-center avatar-dropzone waves-light" tabIndex='0' ref={ (e) => this.focusElement = e}>
                    <Dropzone
                        className="dropzone"
                        multiple={true}
                        disablePreview={true}
                        maxSize={1048576}
                        onDrop={this._addFiles.bind(this)}
                    >
                        <i className="large material-icons">note_add</i>
                        <br/>Upload file
                    </Dropzone>
                </div>
            </div>
        );
    }

    _renderFilesList() {
        const files = this.state.files.map(file => {
            return (
                <li className='messageFormFile' key={file.name}>
                    <i className="small material-icons">attach_file</i>
                    {file.name}
                </li>
            );
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

    _toggleAnnotationForm() {
        this.setState(prevState => {
            return {showAnnotationForm: !prevState.showAnnotationForm};
        });
    }

    _addFiles(files, rejectedFiles) {
        this.setState(prevState => {
            return {files: [...prevState.files, ...files]};
        });

        if (rejectedFiles.length > 0) {
            alert("Files must be smaller than 1MB");
        }
        else {
            this._toggleDropzone();
        }
    }

    _onChange(value) {
        this.setState({value});
    }

    _onAnnotationChange(e) {
        this.setState({annotatedValue: e.target.value});
    }

    _onSubmit(e) {
        e.preventDefault();
        const {value} = this.state;
        if (this._getEditorState().getCurrentContent().hasText() || this.state.files.length > 0) {
            this.props.createMessage(value.toString('html'), this.state.files);
            this.setState({
                value: RichTextEditor.createEmptyValue(),
                files: []
            });
        }
    }

    _onAnnotationSubmit(e) {
        e.preventDefault();



        this.setState({annotatedValue: ''});
    }

    _getEditorState() {
        return this.state.value._editorState;
    }

    _renderAnnotationForm() {
        return (
            <form className='annotationForm' autoFocus={true} onSubmit={this._onAnnotationSubmit.bind(this)}>
                <select value={this.state.annotatedValue} onChange={this._onAnnotationChange.bind(this)}
                    ref={ (e) => this.focusElement = e}
                >
                    <option value='' disabled >Select your option</option>
                    {this._renderOptions(this.props.activeChannel.customData.users)}
                </select>
                <button type='submit' className='waves-effect waves-light btn right'>Add</button>
            </form>

        );
    }

    _renderOptions(users) {
        return Object.keys(users).map(user => {
            return <option key={user} value={user}>{this.props.users[user].name}</option>;
        });
    }
}

function mapStateToProps({users, activeChannel}) {
    return {users, activeChannel};
}

export default connect(mapStateToProps, {createMessage})(MessageForm);