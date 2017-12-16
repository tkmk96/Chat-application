import React, {Component} from 'react';
import {connect} from 'react-redux';
import {createMessage, editMessage} from '../../actions';
import RichTextEditor from 'react-rte';
import {EditorState, CompositeDecorator} from 'draft-js';
import {stateToHTML} from 'draft-js-export-html';
import {stateFromHTML} from 'draft-js-import-html';
import AnnotationForm from './AnnotationForm';
import AttachmentForm from './AttachmentForm';
import {UserAnnotation} from './UserAnnotation';
import {List} from 'immutable';

class MessageForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            value: createEmptyEditor(),
            annotatedValue: '',
            showAnnotationForm: false,
            files: List()
        };
    }

    componentWillReceiveProps(props) {
        if (props.editedMessage) {
            const {images, files} = props.editedMessage.customData;
            this.setState({value: createEditorWithContent(props.editedMessage.value)});
            let newFiles = List();
            if (images) {
                newFiles = newFiles.concat(images);
            }
            if (files) {
                newFiles = newFiles.concat(files);
            }
            this.setState({files: newFiles});
        }
    }

    render() {
        const {value} = this.state;
        return (
            <div style={{marginTop: '15px'}}>
                <form onSubmit={this._onSubmit.bind(this)} style={{marginBottom: '10px'}}>
                    <RichTextEditor toolbarConfig={toolbarConfig} value={value} onChange={this._onChange.bind(this)}/>
                    {this.props.editedMessage ? this._renderEditButtons() : this._renderSendBtn()}
                </form>
                <button className='waves-effect grey lighten-3 btn' style={{color: 'black', marginRight: '10px'}}
                    onClick={this._toggleAnnotationForm.bind(this)}>
                    @
                </button>
                <AttachmentForm
                    disabled={this.props.editedMessage !== undefined}
                    files={this.state.files}
                    onDrop={(files, rejected) => this._addFiles(files, rejected)}
                />

                {this.state.showAnnotationForm &&
                <AnnotationForm
                    onSubmit={this._onAnnotationSubmit.bind(this)}
                    editor={this._getEditorState()}
                />
                }
            </div>
        );
    }

    _renderSendBtn() {
        return (
            <button className='waves-effect waves-light btn right' type='submit'
                disabled={!this.state.value._editorState.getCurrentContent().hasText() && this.state.files.length === 0}
            >
                Send
            </button>
        );
    }

    _renderEditButtons() {
        const {images, files} = this.props.editedMessage.customData;
        const disabled = !this.state.value._editorState.getCurrentContent().hasText() && !files && !images;
        return (
            <div>
                <button className='waves-effect waves-light btn right'
                    onClick={this._onEditMessage.bind(this)}
                    disabled={disabled}
                >
                    Edit
                </button>
                <button className='waves-effect waves-light red btn right' style={{marginRight: '10px'}}
                    onClick={this._onEditCancel.bind(this)}
                >
                    Cancel
                </button>
            </div>
        );
    }

    _onEditCancel() {
        this.setState({files: [], value: createEmptyEditor()});
        this.props.clearEditedMessage();
    }

    _toggleAnnotationForm() {
        this.setState(prevState => {
            return {showAnnotationForm: !prevState.showAnnotationForm};
        });
    }

    _addFiles(files, rejectedFiles) {
        this.setState(prevState => {
            return {files: prevState.files.concat(files)};
        });

        if (rejectedFiles.length > 0) {
            alert('Files must be smaller than 1MB');
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
        const content = this._getEditorState().getCurrentContent();
        if (content.hasText() || this.state.files.length > 0) {
            const message = stateToHTML(content, optionsToHtml);
            this.props.createMessage(message, this.state.files);

            this.setState({
                value: createEmptyEditor(),
                files: List()
            });
        }
    }

    _onEditMessage() {
        const content = this._getEditorState().getCurrentContent();
        const {editedMessage} = this.props;
        const {images, files} = editedMessage.customData;
        if (content.hasText() || files || images) {
            const text = stateToHTML(content, optionsToHtml);
            const newMessage = {...editedMessage};
            newMessage.value = text;
            this.props.editMessage(newMessage);

            this.setState({
                value: createEmptyEditor(),
                files: List()
            });
        }
        this.props.clearEditedMessage();
    }

    _onAnnotationSubmit(editorState) {
        this.state.value._editorState = editorState;
        this._toggleAnnotationForm();
    }


    _getEditorState() {
        return this.state.value._editorState;
    }

}


const toolbarConfig = {
    display: ['INLINE_STYLE_BUTTONS', 'LINK_BUTTONS', 'HISTORY_BUTTONS'],
    INLINE_STYLE_BUTTONS: [
        {label: 'Bold', style: 'BOLD', className: 'custom-css-class'},
        {label: 'Italic', style: 'ITALIC'},
        {label: 'Underline', style: 'UNDERLINE'}
    ]
};


const optionsToHtml = {
    entityStyleFn: (entity) => {
        const entityType = entity.get('type').toLowerCase();
        const {className} = entity.getData();
        if (entityType === 'token' && className === 'annotation') {
            return {
                element: 'span',
                attributes: {
                    className: className,
                },
            };
        }
    },
};

const optionsFromHtml = {
    customInlineFn: (element, {Entity}) => {
        if (element.tagName === 'SPAN' && element.className === 'annotation') {
            return Entity('TOKEN', {className: element.getAttribute('class')}, 'IMMUTABLE');
        }
    },
};

function createDecorator() {
    return new CompositeDecorator([
        {
            strategy: findTokenEntities,
            component: UserAnnotation,
        },
    ]);
}

function createEmptyEditor() {
    const decorator = createDecorator();
    const editor = RichTextEditor.createEmptyValue();
    editor._editorState = EditorState.createEmpty(decorator);
    return editor;
}

function createEditorWithContent(html) {
    const decorator = createDecorator();
    const editor = RichTextEditor.createEmptyValue();
    const contentState = stateFromHTML(html, optionsFromHtml);
    editor._editorState = EditorState.createWithContent(contentState, decorator);
    return editor;
}

function findTokenEntities(contentBlock, callback, contentState) {
    contentBlock.findEntityRanges(
        (character) => {
            const entityKey = character.getEntity();
            return (
                entityKey !== null &&
                contentState.getEntity(entityKey).getType() === 'TOKEN'
            );
        },
        callback
    );
}

export default connect(null, {createMessage, editMessage})(MessageForm);