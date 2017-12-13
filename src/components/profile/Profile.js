import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Loader} from '../generic/Loader';
import ProfileForm from './ProfileForm';
import AvatarForm from './AvatarForm';

class Profile extends Component {
    render(){
        const {changeUserName, changeAvatar} = this.props.loading;
        return (
            <div className="profile-page">
                <div className="row profile-avatar-row">
                    <div className="col s4 offset-s1">
                        <Loader show={changeAvatar}>
                            <div className="profile-avatar-img" style={{backgroundImage: `url("${this.props.user.avatarUrl}")`}}>
                                {/*<img src={this.props.user.avatarUrl} alt="avatar"/>*/}
                            </div>
                            <AvatarForm/>
                        </Loader>
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
                        <Loader show={changeUserName}
                        >
                            <ProfileForm/>
                        </Loader>
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps({user, loading}) {
    return {user, loading};
}

export default connect(mapStateToProps, null)(Profile);