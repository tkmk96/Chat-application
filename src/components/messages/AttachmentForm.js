import React, {Component} from 'react';
import Dropzone from './Dropzone';
import PropTypes from 'prop-types';
import Immutable from 'immutable';

class AttachmentForm extends Component {
    static propTypes = {
        onDrop: PropTypes.func.isRequired,
        files: PropTypes.instanceOf(Immutable.List).isRequired,
        disabled: PropTypes.bool.isRequired
    };

    constructor(props) {
        super(props);
        this.state = {
            showDropzone: false,
        };
    }

    render() {
        return(
            <div style={{display: 'inline'}}>
                <button className='waves-effect grey lighten-3 btn' style={{color: 'black'}}
                    onClick={this._toggleDropzone.bind(this)}
                    disabled={this.props.disabled}
                >
                    <i className='tiny material-icons'>note_add</i>
                </button>
                {this.props.files.length !== 0 && this._renderFilesList()}
                {this.state.showDropzone && <Dropzone onDrop={(files, rejected) => this.props.onDrop(files, rejected)}/>}
            </div>
        );
    }

    _toggleDropzone() {
        this.setState(prevState => {
            return {showDropzone: !prevState.showDropzone};
        });
    }

    _renderFilesList() {
        const files = this.props.files.map(file => {
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
}

export default AttachmentForm;