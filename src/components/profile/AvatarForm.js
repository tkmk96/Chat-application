import React, {Component} from 'react';
import {connect} from 'react-redux';
import Dropzone from 'react-dropzone';

import {uploadAvatar} from '../../actions/index';

class AvatarForm extends Component {
    _handleFiles(files){
        this.props.uploadAvatar(files[0]);
    }

    render(){
        return (
            <div className="profile-avatar profile-panel">
                <h5>Edit avatar:</h5>
                <div className="text-center avatar-dropzone">
                    <Dropzone
                        accept="image/gif, image/png, image/jpeg, image/bmp"
                        className="dropzone"
                        multiple={false}
                        onDrop={this._handleFiles.bind(this)}
                    >
                        <i className="large material-icons">cloud_upload</i>
                    </Dropzone>
                </div>
            </div>

        );
    }
}

export default connect(null, {uploadAvatar})(AvatarForm);
