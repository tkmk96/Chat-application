import React, {Component} from 'react';
import {Modifier, EditorState} from 'draft-js';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

class AnnotationForm extends Component {
    static propTypes = {
        users: PropTypes.object.isRequired,
        activeChannel: PropTypes.object.isRequired,
        editor: PropTypes.object.isRequired,
        onSubmit: PropTypes.func.isRequired
    };

    constructor(props) {
        super(props);

        this.state = {
            value: '',
        };
    }

    render() {
        return (
            <form className='annotationForm' onSubmit={(e) => this._onSubmit(e)}>
                <select value={this.state.value} onChange={(e) => this._onAnnotationChange(e)}>
                    <option value='' disabled >Select your option</option>
                    {this._renderOptions(this.props.activeChannel.customData.users)}
                </select>
                <button type='submit' className='waves-effect waves-light btn right' disabled={this.state.value === ''}>
                    Add
                </button>
            </form>

        );
    }

    _onAnnotationChange(e) {
        this.setState({value: e.target.value});
    }

    _renderOptions(users) {
        return Object.keys(users).map(user => {
            const name = this.props.users[user].name;
            return <option key={user} value={name}>{name}</option>;
        });
    }

    _onSubmit(e) {
        e.preventDefault();
        if (this.state.value === '') {
            return;
        }

        const editor = this._createAnnotationEntity(this.state.value);
        this.props.onSubmit(editor);
        this.setState({value: ''});
    }

    _createAnnotationEntity(value){
        let editorState = this.props.editor;
        let contentState = editorState.getCurrentContent();

        contentState = contentState.createEntity(
            'TOKEN',
            'IMMUTABLE',
            {className: 'annotation'}
        );

        const entityKey = contentState.getLastCreatedEntityKey();
        editorState = EditorState.set(editorState, { currentContent: contentState });

        const name = `@${value}`;
        contentState = Modifier.replaceText(contentState, editorState.getSelection(), name, null, entityKey);
        editorState = EditorState.push(editorState, contentState, 'insert-characters');
        return editorState;
    }
}

function mapStateToProps({users, activeChannel}) {
    return {users, activeChannel};
}

export default connect(mapStateToProps, null)(AnnotationForm);
