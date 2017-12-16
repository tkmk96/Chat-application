import React, {Component} from 'react';
import DropzoneReact from 'react-dropzone';
import PropTypes from 'prop-types';

class Dropzone extends Component {
    static propTypes = {
        onDrop: PropTypes.func.isRequired
    };
    render() {
        return (
            <div title='Drag & drop or select manually'>
                <div className='text-center avatar-dropzone waves-light' tabIndex='0'>
                    <DropzoneReact
                        className='dropzone'
                        multiple={true}
                        disablePreview={true}
                        maxSize={1048576}
                        onDrop={(files, rejected) => this.props.onDrop(files, rejected)}
                    >
                        <i className='large material-icons'>note_add</i>
                        <br/>Upload file
                    </DropzoneReact>
                </div>
            </div>
        );
    }
}

export default Dropzone;