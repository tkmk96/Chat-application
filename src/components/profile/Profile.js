import React, {Component} from 'react';
import {connect} from 'react-redux';

import ProfileForm from './ProfileForm';
import AvatarForm from './AvatarForm';

class Profile extends Component {
    render(){
        return (
            <div className="profile-page">
                <div className="row profile-avatar-row">
                    <div className="col s4 offset-s1">
                        <div className="profile-avatar-img" style={{backgroundImage: `url("${this.props.user.avatarUrl}")`}}>
                            {/*<img src={this.props.user.avatarUrl} alt="avatar"/>*/}
                        </div>
                        <AvatarForm/>
                    </div>

                    <div className="col s5 offset-s1">
                        <div className="profile-info">
                            <div className="profile-info-field">
                                <h5>Email: </h5>
                                <p>
                                    {this.props.user.email}
                                </p>
                            </div>
                            <div className="profile-info-field">
                                <h5>Name: </h5>
                                <p>
                                    {this.props.user.name}
                                </p>
                            </div>
                        </div>
                        <ProfileForm/>
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps({user}) {
    return {user};
}

export default connect(mapStateToProps, null)(Profile);