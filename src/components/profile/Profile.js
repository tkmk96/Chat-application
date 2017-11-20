import React, {Component} from 'react';
import {connect} from 'react-redux';

import ProfileForm from './ProfileForm';
import AvatarForm from './AvatarForm';

class Profile extends Component {
    render(){
        return (
            <div className="row">
                <div className="col s6 offset-s3">
                    <div className="profile-avatar">
                        <img src={this.props.user.avatarUrl} alt="avatar"/>
                    </div>
                    <div className="profile-info profile-panel">
                        <div>
                            <h5>Profile info: </h5>
                        </div>
                        <h6>Email: {this.props.user.email}</h6>
                        <h6>Name: {this.props.user.name}</h6>
                    </div>

                    <ProfileForm/>

                    <AvatarForm/>
                </div>

            </div>
        );
    }
}

function mapStateToProps({user}) {
    return {user};
}

export default connect(mapStateToProps, null)(Profile);